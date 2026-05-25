import Editor from '@monaco-editor/react'
import { LogOut } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useEditorStore } from '../../store/editorStore'
import LanguageSelector from './LanguageSelector'
import ThemeSelector from './ThemeSelector'
import RunButton from './RunButton'
import InputBox from './InputBox'
import OutputBox from './OutputBox'
import { socket } from '../../lib/socket'
import { useParams } from 'react-router-dom'
import { useEffect, useRef, useCallback, useState } from 'react'
import { useRoomStore } from '../../store/roomStore'

// Default heights
const MIN_IO_HEIGHT = 80
const MAX_IO_HEIGHT = 320
const DEFAULT_IO_HEIGHT = 220

const CodeEditor = () => {
  const navigate = useNavigate()
  const { roomId } = useParams()
  const { roomName } = useRoomStore()
  const { code, setCode, language, theme } = useEditorStore()

  // ── Resizable IO panel ──────────────────────────────────────────────
  const [ioHeight, setIoHeight] = useState(DEFAULT_IO_HEIGHT)
  const dragHRef = useRef(null)
  const dragHState = useRef(null)

  const onDragHMouseDown = useCallback(
    e => {
      dragHState.current = { startY: e.clientY, startH: ioHeight }
      document.body.style.cursor = 'ns-resize'
      document.body.style.userSelect = 'none'

      const onMove = e => {
        if (!dragHState.current) return
        const delta = dragHState.current.startY - e.clientY
        const newH = Math.min(
          MAX_IO_HEIGHT,
          Math.max(MIN_IO_HEIGHT, dragHState.current.startH + delta)
        )
        setIoHeight(newH)
      }
      const onUp = () => {
        dragHState.current = null
        document.body.style.cursor = ''
        document.body.style.userSelect = ''
        document.removeEventListener('mousemove', onMove)
        document.removeEventListener('mouseup', onUp)
      }
      document.addEventListener('mousemove', onMove)
      document.addEventListener('mouseup', onUp)
    },
    [ioHeight]
  )

  // ── Socket: receive code ────────────────────────────────────────────
  useEffect(() => {
    socket.on('receive-code', incomingCode => {
      setCode(incomingCode)
    })
    return () => {
      socket.off('receive-code')
    }
  }, [])

  // ── Keyboard shortcut: Ctrl+Enter = Run ────────────────────────────
  useEffect(() => {
    const handleShortcut = e => {
      if (e.ctrlKey && e.key === 'Enter') {
        e.preventDefault()
        document.getElementById('run-code-btn')?.click()
      }
    }
    window.addEventListener('keydown', handleShortcut)
    return () => window.removeEventListener('keydown', handleShortcut)
  }, [])

  // ── Leave room ─────────────────────────────────────────────────────
  const handleLeaveRoom = () => {
    socket.emit('leave-room', { roomId })
    navigate('/')
  }

  return (
    <div className='flex-1 flex flex-col overflow-hidden'>
      {/* ── TOPBAR ── */}
      {/* ── TOPBAR ── */}
      <div className='border-b border-zinc-800 px-4 sm:px-6 bg-zinc-950 flex-shrink-0'>
        {/* Single row on md+, two rows on mobile */}
        <div className='flex flex-col md:flex-row md:items-center md:justify-between md:h-16 gap-0'>
          {/* ROW 1 (mobile) / LEFT (desktop) */}
          <div className='flex items-center justify-between md:justify-start gap-3 h-12 md:h-auto'>
            <h2 className='text-base sm:text-lg font-semibold text-white truncate max-w-[140px] sm:max-w-xs'>
              {roomName}
            </h2>

            {/* Leave button — mobile only (row 1) */}
            <button
              onClick={handleLeaveRoom}
              className='flex md:hidden items-center gap-1.5 px-3 py-1.5 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/20 transition-all cursor-pointer text-sm'
            >
              <LogOut size={15} />
              <span>Leave</span>
            </button>
          </div>

          {/* ROW 2 (mobile) / RIGHT (desktop) */}
          <div className='flex items-center gap-2 sm:gap-3 pb-2 md:pb-0 overflow-x-auto scrollbar-none'>
            <LanguageSelector />
            <ThemeSelector />
            <RunButton />

            {/* Leave button — md+ only */}
            <button
              onClick={handleLeaveRoom}
              className='hidden md:flex items-center gap-2 px-4 py-2 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/20 transition-all cursor-pointer flex-shrink-0'
            >
              <LogOut size={18} />
              Leave
            </button>
          </div>
        </div>
      </div>

      {/* ── EDITOR ── */}
      <div className='flex-1 p-5 overflow-hidden'>
        <div className='h-full overflow-hidden rounded-2xl border border-zinc-800'>
          <Editor
            height='100%'
            language={language}
            theme={theme}
            value={code}
            onChange={value => {
              const newCode = value || ''
              setCode(newCode)
              socket.emit('code-change', { roomId, code: newCode })
            }}
            options={{
              minimap: { enabled: false },
              fontSize: 14,
              smoothScrolling: true,
              padding: { top: 16 }
            }}
          />
        </div>
      </div>

      {/* ── DRAG HANDLE (editor ↕ IO) ── */}
      <div
        ref={dragHRef}
        onMouseDown={onDragHMouseDown}
        className='h-2 sm:h-2 flex-shrink-0 flex items-center justify-center cursor-ns-resize group border-t border-zinc-800 hover:border-indigo-500/40 transition-colors touch-none'
        title='Drag to resize'
      >
        <div className='w-8 h-1 rounded-full bg-zinc-700 group-hover:bg-indigo-500/60 transition-colors' />
      </div>

      {/* ── INPUT / OUTPUT ── */}
      <div
        className='border-t border-zinc-800 p-3 sm:p-5 grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-5 flex-shrink-0 overflow-y-auto'
        style={{ height: ioHeight }}
      >
        <InputBox />
        <OutputBox />
      </div>
    </div>
  )
}

export default CodeEditor
