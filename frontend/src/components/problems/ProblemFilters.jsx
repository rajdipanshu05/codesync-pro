import { Search } from 'lucide-react'

const DIFFICULTIES = ['All', 'Easy', 'Medium', 'Hard']

const ProblemFilters = ({
  search,
  setSearch,
  difficulty,
  setDifficulty
}) => {
  return (
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
            ${
              difficulty === d
                ? 'bg-zinc-700 text-white'
                : 'text-zinc-500 hover:text-zinc-300'
            }`}
          >
            {d}
          </button>
        ))}
      </div>
    </div>
  )
}

export default ProblemFilters