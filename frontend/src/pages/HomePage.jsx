import Navbar from '../components/common/Navbar'

import JoinRoomCard from '../components/room/JoinRoomCard'

const HomePage = () => {
  return (
    <div
      className='
        min-h-screen
        bg-zinc-950
        text-white
      '
    >
      <Navbar />

      <div
        className='
          max-w-6xl
          mx-auto
          px-6
          py-16
        '
      >
        {/* HERO */}
        <div
          className='
            text-center
            mb-16
          '
        >
          <h1
            className='
              text-5xl
              font-bold
              mb-6
            '
          >
            Real-Time Collaborative Coding
          </h1>

          <p
            className='
              text-zinc-400
              text-lg
              max-w-2xl
              mx-auto
            '
          >
            Create coding rooms, collaborate instantly, and execute code
            together in real-time.
          </p>
        </div>

        {/* ROOM CARDS */}
        <JoinRoomCard />
      </div>
    </div>
  )
}

export default HomePage
