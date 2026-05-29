import React, { useRef, useState, useEffect } from 'react'
import { io } from 'socket.io-client'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '../store/authStore'
import VideocamIcon from '@mui/icons-material/Videocam'
import VideocamOffIcon from '@mui/icons-material/VideocamOff'
import CallEndIcon from '@mui/icons-material/CallEnd'
import MicIcon from '@mui/icons-material/Mic'
import MicOffIcon from '@mui/icons-material/MicOff'
import ScreenShareIcon from '@mui/icons-material/ScreenShare'
import StopScreenShareIcon from '@mui/icons-material/StopScreenShare'

const socketUrl = 'http://localhost:8000'

const peerConfigConnections = {
  iceServers: [
    { urls: 'stun:stun.l.google.com:19302' },
    { urls: 'stun:stun1.l.google.com:19302' },
    { urls: 'stun:stun2.l.google.com:19302' },
    { urls: 'stun:stun3.l.google.com:19302' },
    {
      urls: 'turn:openrelay.metered.ca:80',
      username: 'openrelayproject',
      credential: 'openrelayproject'
    },
    {
      urls: 'turn:openrelay.metered.ca:443',
      username: 'openrelayproject',
      credential: 'openrelayproject'
    },
    {
      urls: 'turn:openrelay.metered.ca:443?transport=tcp',
      username: 'openrelayproject',
      credential: 'openrelayproject'
    }
  ],
  iceCandidatePoolSize: 10
}

const silence = () => {
  const ctx = new AudioContext()
  const oscillator = ctx.createOscillator()
  const dst = oscillator.connect(ctx.createMediaStreamDestination())
  oscillator.start()
  ctx.resume()
  return Object.assign(dst.stream.getAudioTracks()[0], { enabled: false })
}

const black = ({ width = 640, height = 480 } = {}) => {
  const canvas = Object.assign(document.createElement('canvas'), { width, height })
  canvas.getContext('2d').fillRect(0, 0, width, height)
  return Object.assign(canvas.captureStream().getVideoTracks()[0], { enabled: false })
}

const blackSilenceStream = () => new MediaStream([black(), silence()])

const addStreamToPeer = (pc, stream) => {
  stream.getTracks().forEach(track => pc.addTrack(track, stream))
}

const replaceStreamOnPeer = async (pc, newStream) => {
  const senders = pc.getSenders()
  const newTracks = newStream.getTracks()
  for (const sender of senders) {
    const newTrack = newTracks.find(t => t.kind === sender.track?.kind)
    if (newTrack) {
      await sender.replaceTrack(newTrack).catch(e => console.log('replaceTrack error:', e))
    }
  }
  if (senders.length === 0) addStreamToPeer(pc, newStream)
}

const MeetingTimer = () => {
  const [seconds, setSeconds] = useState(0)
  useEffect(() => {
    const t = setInterval(() => setSeconds(s => s + 1), 1000)
    return () => clearInterval(t)
  }, [])
  const hh = String(Math.floor(seconds / 3600)).padStart(2, '0')
  const mm = String(Math.floor((seconds % 3600) / 60)).padStart(2, '0')
  const ss = String(seconds % 60).padStart(2, '0')
  return <span className='font-mono text-xs tabular-nums' style={{ color: 'rgba(255,255,255,0.4)' }}>{hh}:{mm}:{ss}</span>
}

const VideoMeeting = ({ id }) => {
  const navigate = useNavigate()
  const { user: authUser } = useAuthStore()

  const socketRef = useRef()
  const socketIdRef = useRef()
  const localVideoref = useRef()
  const videoRef = useRef([])
  const connectionsRef = useRef({})
  const iceCandidateBuffer = useRef({})
  const isConnectedRef = useRef(false)
  const socketReady = useRef(false)
  const negotiatingRef = useRef({})
  const signalQueueRef = useRef({})

  const [videoAvailable, setVideoAvailable] = useState(true)
  const [audioAvailable, setAudioAvailable] = useState(true)
  const [screenAvailable, setScreenAvailable] = useState(false)
  const [video, setVideo] = useState()
  const [audio, setAudio] = useState()
  const [screen, setScreen] = useState()
  const [status, setStatus] = useState('validating')
  const [videos, setVideos] = useState([])

  const safeCreateOffer = async (pc, peerId) => {
    if (pc.signalingState !== 'stable') return
    if (negotiatingRef.current[peerId]) return
    negotiatingRef.current[peerId] = true
    try {
      const offer = await pc.createOffer()
      await pc.setLocalDescription(offer)
      socketRef.current.emit('signal', peerId, JSON.stringify({ sdp: pc.localDescription }))
    } catch (e) {
      console.log('safeCreateOffer error:', e)
    } finally {
      negotiatingRef.current[peerId] = false
    }
  }

  const processSignal = async (fromId, signal) => {
    const pc = connectionsRef.current[fromId]
    if (!pc) return

    if (signal.sdp) {
      if (
        (signal.sdp.type === 'offer' && pc.signalingState !== 'stable') ||
        (signal.sdp.type === 'answer' && pc.signalingState !== 'have-local-offer')
      ) return
      if (signal.sdp.type === 'offer' && negotiatingRef.current[fromId]) return

      try {
        if (signal.sdp.type === 'offer') negotiatingRef.current[fromId] = true
        await pc.setRemoteDescription(new RTCSessionDescription(signal.sdp))
        for (const candidate of (iceCandidateBuffer.current[fromId] || [])) {
          await pc.addIceCandidate(new RTCIceCandidate(candidate)).catch(() => {})
        }
        iceCandidateBuffer.current[fromId] = []
        if (signal.sdp.type === 'offer') {
          const answer = await pc.createAnswer()
          await pc.setLocalDescription(answer)
          socketRef.current.emit('signal', fromId, JSON.stringify({ sdp: pc.localDescription }))
          negotiatingRef.current[fromId] = false
        }
      } catch (e) {
        negotiatingRef.current[fromId] = false
      }
    }

    if (signal.ice) {
      if (!pc.remoteDescription) {
        iceCandidateBuffer.current[fromId] = iceCandidateBuffer.current[fromId] || []
        iceCandidateBuffer.current[fromId].push(signal.ice)
      } else {
        pc.addIceCandidate(new RTCIceCandidate(signal.ice)).catch(() => {})
      }
    }
  }

  const gotMessageFromServer = (fromId, message) => {
    if (fromId === socketIdRef.current) return
    const signal = JSON.parse(message)
    if (!connectionsRef.current[fromId]) {
      signalQueueRef.current[fromId] = signalQueueRef.current[fromId] || []
      signalQueueRef.current[fromId].push(message)
      return
    }
    processSignal(fromId, signal)
  }

  useEffect(() => {
    if (!id || !authUser) return
    connectionsRef.current = {}
    iceCandidateBuffer.current = {}
    negotiatingRef.current = {}
    signalQueueRef.current = {}
    isConnectedRef.current = false
    socketReady.current = false

    const init = async () => {
      try {
        setStatus('ready')
        await getPermissions()
        connectToSocketServer()
      } catch (e) {
        setStatus('error')
      }
    }
    init()

    return () => {
      isConnectedRef.current = false
      try { localVideoref.current?.srcObject?.getTracks().forEach(t => t.stop()) } catch (e) {}
      if (socketRef.current) socketRef.current.disconnect()
      Object.values(connectionsRef.current).forEach(pc => pc.close())
      connectionsRef.current = {}
      negotiatingRef.current = {}
      signalQueueRef.current = {}
    }
  }, [id, authUser])

  const getPermissions = async () => {
    try {
      const devices = await navigator.mediaDevices.enumerateDevices()
      const hasVideo = devices.some(d => d.kind === 'videoinput')
      const hasAudio = devices.some(d => d.kind === 'audioinput')
      setVideoAvailable(hasVideo)
      setAudioAvailable(hasAudio)
      setScreenAvailable(!!navigator.mediaDevices.getDisplayMedia)
      if (!hasVideo && !hasAudio) return
      const stream = await navigator.mediaDevices.getUserMedia({ video: hasVideo, audio: hasAudio }).catch(() => null)
      if (!stream) return
      window.localStream = stream
      if (localVideoref.current) localVideoref.current.srcObject = stream
      setVideo(false)
      setAudio(false)
    } catch (e) {}
  }

  useEffect(() => {
    if (video === undefined || audio === undefined) return
    if (!socketReady.current) return
    getUserMedia()
  }, [audio, video])

  const getUserMedia = () => {
    if ((video && videoAvailable) || (audio && audioAvailable)) {
      navigator.mediaDevices.getUserMedia({ video, audio }).then(getUserMediaSuccess).catch(() => {})
    } else {
      try { localVideoref.current?.srcObject?.getTracks().forEach(t => t.stop()) } catch (e) {}
    }
  }

  const getUserMediaSuccess = async stream => {
    try { window.localStream.getTracks().forEach(t => t.stop()) } catch (e) {}
    window.localStream = stream
    localVideoref.current.srcObject = stream
    for (const peerId in connectionsRef.current) {
      if (peerId === socketIdRef.current) continue
      await replaceStreamOnPeer(connectionsRef.current[peerId], stream)
      await safeCreateOffer(connectionsRef.current[peerId], peerId)
    }
    stream.getTracks().forEach(track => {
      track.onended = async () => {
        setVideo(false)
        setAudio(false)
        try { localVideoref.current.srcObject.getTracks().forEach(t => t.stop()) } catch (e) {}
        window.localStream = blackSilenceStream()
        localVideoref.current.srcObject = window.localStream
        for (const peerId in connectionsRef.current) {
          if (peerId === socketIdRef.current) continue
          await replaceStreamOnPeer(connectionsRef.current[peerId], window.localStream)
          await safeCreateOffer(connectionsRef.current[peerId], peerId)
        }
      }
    })
  }

  const connectToSocketServer = () => {
    if (isConnectedRef.current) return
    isConnectedRef.current = true
    socketRef.current = io(`${socketUrl}/video`, { withCredentials: true, transports: ['polling', 'websocket'] })
    socketRef.current.on('signal', gotMessageFromServer)
    socketRef.current.on('connect', () => {
      socketRef.current.emit('join-call', window.location.href)
      socketIdRef.current = socketRef.current.id
      socketReady.current = true

      socketRef.current.on('user-left', leftId => {
        if (connectionsRef.current[leftId]) {
          connectionsRef.current[leftId].close()
          delete connectionsRef.current[leftId]
          delete iceCandidateBuffer.current[leftId]
          delete negotiatingRef.current[leftId]
          delete signalQueueRef.current[leftId]
        }
        setVideos(vs => { const u = vs.filter(v => v.socketId !== leftId); videoRef.current = u; return u })
      })

      socketRef.current.on('user-joined', async (joinedId, clients) => {
        const connections = connectionsRef.current
        clients.forEach(socketListId => {
          if (connections[socketListId]) return
          const pc = new RTCPeerConnection(peerConfigConnections)
          connections[socketListId] = pc
          pc.onicecandidate = event => {
            if (event.candidate) socketRef.current.emit('signal', socketListId, JSON.stringify({ ice: event.candidate }))
          }
          pc.onconnectionstatechange = () => {
            if (pc.connectionState === 'failed') pc.restartIce()
          }
          pc.ontrack = event => {
            const stream = event.streams[0]
            if (!stream) return
            const exists = videoRef.current.find(v => v.socketId === socketListId)
            if (exists) {
              setVideos(prev => { const u = prev.map(v => v.socketId === socketListId ? { ...v, stream } : v); videoRef.current = u; return u })
            } else {
              setVideos(vs => {
                if (vs.find(v => v.socketId === socketListId)) return vs
                const u = [...vs, { socketId: socketListId, stream }]; videoRef.current = u; return u
              })
            }
          }
          const localStream = window.localStream || blackSilenceStream()
          if (!window.localStream) window.localStream = localStream
          addStreamToPeer(pc, localStream)
          const queued = signalQueueRef.current[socketListId] || []
          queued.forEach(msg => processSignal(socketListId, JSON.parse(msg)))
          signalQueueRef.current[socketListId] = []
        })
        if (joinedId === socketIdRef.current) {
          for (const id2 in connections) {
            if (id2 === socketIdRef.current) continue
            await safeCreateOffer(connections[id2], id2)
          }
        }
      })
    })
  }

  useEffect(() => {
    if (screen === undefined) return
    if (screen) getDisplayMedia()
  }, [screen])

  const getDisplayMedia = () => {
    if (!navigator.mediaDevices.getDisplayMedia) return
    navigator.mediaDevices.getDisplayMedia({ video: true, audio: true }).then(getDisplayMediaSuccess).catch(() => {})
  }

  const getDisplayMediaSuccess = async stream => {
    try { window.localStream.getTracks().forEach(t => t.stop()) } catch (e) {}
    window.localStream = stream
    localVideoref.current.srcObject = stream
    for (const peerId in connectionsRef.current) {
      if (peerId === socketIdRef.current) continue
      await replaceStreamOnPeer(connectionsRef.current[peerId], stream)
      await safeCreateOffer(connectionsRef.current[peerId], peerId)
    }
    stream.getTracks().forEach(track => {
      track.onended = () => {
        setScreen(false)
        try { localVideoref.current.srcObject.getTracks().forEach(t => t.stop()) } catch (e) {}
        window.localStream = blackSilenceStream()
        localVideoref.current.srcObject = window.localStream
        getUserMedia()
      }
    })
  }

//   const handleEndCall = () => {
//     try { localVideoref.current.srcObject.getTracks().forEach(t => t.stop()) } catch (e) {}
//     if (socketRef.current) socketRef.current.disconnect()
//     Object.values(connectionsRef.current).forEach(pc => pc.close())
//     navigate('/')
//   }

  const handleVideo = () => setVideo(v => !v)
  const handleAudio = () => setAudio(v => !v)
  const handleScreen = () => setScreen(v => !v)

  // ── Status screens ─────────────────────────────────────────────────────────
  if (status === 'validating') {
    return (
      <div className='flex flex-col items-center justify-center h-full gap-3' data-theme='dark'>
        <span className='loading loading-ring loading-md text-primary' />
        <p className='text-xs' style={{ color: 'rgba(255,255,255,0.3)' }}>Connecting…</p>
      </div>
    )
  }

  if (status === 'unauthorized') {
    return (
      <div className='flex flex-col items-center justify-center h-full gap-3 p-4 text-center' data-theme='dark'>
        <div className='rounded-full p-3' style={{ background: 'rgba(239,68,68,0.1)' }}>
          <svg className='w-6 h-6 text-error' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={1.5} d='M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z' />
          </svg>
        </div>
        <p className='text-sm font-medium text-base-content'>Access Denied</p>
        <button onClick={() => navigate('/')} className='btn btn-xs btn-error btn-outline'>Go Home</button>
      </div>
    )
  }

  if (status === 'error') {
    return (
      <div className='flex flex-col items-center justify-center h-full gap-3 p-4 text-center' data-theme='dark'>
        <p className='text-sm text-base-content'>Room not found</p>
        <button onClick={() => navigate('/')} className='btn btn-xs btn-primary'>Go Home</button>
      </div>
    )
  }

  const participantCount = videos.length + 1
  const hasRemote = videos.length > 0

  return (
    <div
      className='flex flex-col h-full'
      data-theme='dark'
      style={{ background: '#0f0f0f' }}
    >
      {/* ── Top bar ── */}
      <div
        className='flex items-center justify-between px-3 py-2 shrink-0'
        style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}
      >
        {/* Live badge */}
        <div className='flex items-center gap-1.5'>
          <span
            className='w-1.5 h-1.5 rounded-full animate-pulse'
            style={{ background: '#22c55e' }}
          />
          <span className='text-xs font-medium' style={{ color: '#22c55e' }}>Live</span>
        </div>

        {/* Participant count */}
        <div className='flex items-center gap-1' style={{ color: 'rgba(255,255,255,0.35)' }}>
          <svg className='w-3 h-3' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={1.5} d='M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z' />
          </svg>
          <span className='text-xs'>{participantCount}</span>
        </div>

        {/* Timer */}
        <MeetingTimer />
      </div>

      {/* ── Video grid ── */}
      <div className='flex-1 p-2 overflow-hidden flex flex-col gap-2 min-h-0'>
        {/* My tile */}
        <div
          className='relative rounded-xl overflow-hidden shrink-0'
          style={{
            background: '#1a1a1a',
            border: '1px solid rgba(255,255,255,0.07)',
            aspectRatio: hasRemote ? '16/9' : '4/3'
          }}
        >
          <video
            ref={localVideoref}
            autoPlay
            muted
            playsInline
            className='w-full h-full object-cover'
            style={{ opacity: video === false ? 0 : 1, transition: 'opacity 0.2s' }}
          />
          {video === false && (
            <div className='absolute inset-0 flex items-center justify-center'>
              <div
                className='flex items-center justify-center w-12 h-12 rounded-full text-lg font-bold'
                style={{ background: 'rgba(99,102,241,0.2)', color: '#818cf8' }}
              >
                {authUser?.fullName?.[0]?.toUpperCase() ?? 'Y'}
              </div>
            </div>
          )}
          {/* Name bar */}
          <div
            className='absolute bottom-0 left-0 right-0 flex items-center justify-between px-2 py-1.5'
            style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 100%)' }}
          >
            <span className='text-white text-xs font-medium flex items-center gap-1'>
              <span className='w-1.5 h-1.5 rounded-full' style={{ background: '#22c55e' }} />
              {authUser?.fullName ?? 'You'}
              <span style={{ color: 'rgba(255,255,255,0.35)' }}>(you)</span>
            </span>
            <div className='flex items-center gap-0.5'>
              {!audio && (
                <span className='flex items-center justify-center w-4 h-4 rounded' style={{ background: 'rgba(239,68,68,0.8)' }}>
                  <MicOffIcon style={{ fontSize: 10, color: '#fff' }} />
                </span>
              )}
              {!video && (
                <span className='flex items-center justify-center w-4 h-4 rounded' style={{ background: 'rgba(255,255,255,0.15)' }}>
                  <VideocamOffIcon style={{ fontSize: 10, color: '#fff' }} />
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Remote tiles */}
        {videos.map((v, i) => (
          <div
            key={v.socketId}
            className='relative rounded-xl overflow-hidden shrink-0'
            style={{
              background: '#1a1a1a',
              border: '1px solid rgba(255,255,255,0.07)',
              aspectRatio: '16/9'
            }}
          >
            <video
              autoPlay
              playsInline
              className='w-full h-full object-cover'
              ref={ref => { if (ref && v.stream) ref.srcObject = v.stream }}
            />
            <div
              className='absolute bottom-0 left-0 right-0 px-2 py-1.5'
              style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 100%)' }}
            >
              <span className='text-white text-xs font-medium flex items-center gap-1'>
                <span className='w-1.5 h-1.5 rounded-full' style={{ background: '#6366f1' }} />
                Participant {i + 1}
              </span>
            </div>
          </div>
        ))}

        {/* Waiting placeholder — only when no remote */}
        {!hasRemote && (
          <div
            className='rounded-xl flex flex-col items-center justify-center gap-2 shrink-0'
            style={{
              border: '1px dashed rgba(255,255,255,0.1)',
              aspectRatio: '16/9',
              background: 'rgba(255,255,255,0.02)'
            }}
          >
            <svg className='w-7 h-7' style={{ color: 'rgba(255,255,255,0.15)' }} fill='none' viewBox='0 0 24 24' stroke='currentColor'>
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={1} d='M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z' />
            </svg>
            <p className='text-xs' style={{ color: 'rgba(255,255,255,0.2)' }}>Waiting for others to join…</p>
          </div>
        )}
      </div>

      {/* ── Control bar ── */}
      <div
        className='shrink-0 flex items-center justify-center gap-2 py-3 px-3'
        style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
      >
        {/* Mic */}
        <button
          onClick={handleAudio}
          title={audio ? 'Mute' : 'Unmute'}
          className='flex items-center justify-center w-10 h-10 rounded-full transition-all duration-150 active:scale-95'
          style={{
            background: audio ? 'rgba(255,255,255,0.1)' : 'rgba(239,68,68,0.85)',
            border: audio ? '1px solid rgba(255,255,255,0.12)' : '1px solid rgba(239,68,68,0.5)',
            color: '#fff',
            cursor: 'pointer'
          }}
        >
          {audio ? <MicIcon style={{ fontSize: 18 }} /> : <MicOffIcon style={{ fontSize: 18 }} />}
        </button>

        {/* End call */}
        

        {/* Camera */}
        <button
          onClick={handleVideo}
          title={video ? 'Camera off' : 'Camera on'}
          className='flex items-center justify-center w-10 h-10 rounded-full transition-all duration-150 active:scale-95'
          style={{
            background: video ? 'rgba(255,255,255,0.1)' : 'rgba(239,68,68,0.85)',
            border: video ? '1px solid rgba(255,255,255,0.12)' : '1px solid rgba(239,68,68,0.5)',
            color: '#fff',
            cursor: 'pointer'
          }}
        >
          {video ? <VideocamIcon style={{ fontSize: 18 }} /> : <VideocamOffIcon style={{ fontSize: 18 }} />}
        </button>

        {/* Screen share */}
        
      </div>
    </div>
  )
}

export default VideoMeeting