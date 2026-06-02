import { Dumbbell, Home } from 'lucide-react'
import { Link } from 'react-router-dom'

const ProblemHeader = () => {
  return (
    <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4'>
      <div>
        <div className='flex items-center gap-3'>
          <Dumbbell className='text-blue-400' size={28} />

          <div>
            <h1 className='text-3xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent'>
              Code Gym
            </h1>

            <p className='text-zinc-500 text-sm'>
              Practice. Improve. Repeat.
            </p>
          </div>
        </div>
      </div>

      <Link
        to='/'
        className='flex items-center gap-2 px-4 py-2 rounded-xl bg-zinc-900 border border-zinc-800 hover:bg-zinc-800 text-zinc-300'
      >
        <Home size={16} />
        Home
      </Link>
    </div>
  )
}

export default ProblemHeader