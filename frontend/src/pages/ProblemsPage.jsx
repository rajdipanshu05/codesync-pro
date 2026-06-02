import { useEffect, useMemo, useState } from 'react'
import { Search } from 'lucide-react'
import { useProblemStore } from '../store/problemStore'
import ProblemCard from '../components/problems/ProblemCard.jsx'
import Navbar from '../components/common/Navbar.jsx'

const DIFFICULTIES = ['All', 'Easy', 'Medium', 'Hard']

const ProblemList = () => {
  const { problems, getProblems, isLoading } = useProblemStore()
  const [search, setSearch] = useState('')
  const [difficulty, setDifficulty] = useState('All')

  useEffect(() => {
    getProblems()
  }, [])

  const filteredProblems = useMemo(() => {
    return (problems || []).filter(p => {
      const matchesSearch = p.title.toLowerCase().includes(search.toLowerCase())
      const matchesDiff = difficulty === 'All' || p.difficulty === difficulty
      return matchesSearch && matchesDiff
    })
  }, [problems, search, difficulty])

  if (isLoading) {
    return <div className='text-center text-zinc-500 py-20'>Loading...</div>
  }

  return (
    <div className='max-w-4xl mx-auto px-4 py-10 space-y-6'>

      {/* HEADER */}
      <div>
        <h1 className='text-3xl font-bold text-white'>Practice Problems</h1>
        <p className='text-zinc-500 mt-1 text-sm'>Solve challenges and sharpen your skills</p>
      </div>

      {/* FILTERS */}
      <div className='flex flex-col sm:flex-row gap-3'>
        <div className='flex items-center gap-2 flex-1 bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-2.5'>
          <Search size={15} className='text-zinc-500 shrink-0' />
          <input
            type='text'
            placeholder='Search problems...'
            value={search}
            onChange={e => setSearch(e.target.value)}
            className='bg-transparent outline-none text-white text-sm w-full placeholder:text-zinc-600'
          />
        </div>

        <div className='flex gap-1.5 bg-zinc-900 border border-zinc-800 rounded-xl p-1.5'>
          {DIFFICULTIES.map(d => (
            <button
              key={d}
              onClick={() => setDifficulty(d)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all
                ${difficulty === d
                  ? 'bg-zinc-700 text-white'
                  : 'text-zinc-500 hover:text-zinc-300'
                }`}
            >
              {d}
            </button>
          ))}
        </div>
      </div>

      {/* LIST */}
      <div>
        <div className='hidden md:grid grid-cols-[1fr_130px_220px] px-4 py-2 text-xs font-medium text-zinc-600 uppercase tracking-wider'>
          <span>Problem</span>
          <span className='px-70'>Difficulty</span>
        </div>

        <div className='flex flex-col gap-1.5 mt-1'>
          {filteredProblems.length === 0
            ? <p className='text-center text-zinc-600 text-sm py-16'>No problems found.</p>
            : filteredProblems.map(problem => (
                <ProblemCard key={problem.id} problem={problem} />
              ))
          }
        </div>
      </div>

      {/* COUNT */}
      <p className='text-xs text-zinc-600 text-center'>
        {filteredProblems.length} of {(problems || []).length} problems
      </p>

    </div>
  )
}

export default ProblemList