import { useEffect, useMemo, useState } from 'react'
import { useProblemStore } from '../store/problemStore'

import ProblemCard from '../components/problems/ProblemCard'
import ProblemHeader from '../components/problems/ProblemHeader'
import ProblemFilters from '../components/problems/ProblemFilters'
import ProblemsSkeleton from '../components/problems/ProblemsSkeleton'

const ProblemList = () => {
  const { problems, getProblems, isLoading } = useProblemStore()

  const [search, setSearch] = useState('')
  const [difficulty, setDifficulty] = useState('All')

  useEffect(() => {
    getProblems()
  }, [])

  const filteredProblems = useMemo(() => {
    return (problems || []).filter(problem => {
      const matchesSearch = problem.title
        .toLowerCase()
        .includes(search.toLowerCase())

      const matchesDifficulty =
        difficulty === 'All' ||
        problem.difficulty === difficulty

      return matchesSearch && matchesDifficulty
    })
  }, [problems, search, difficulty])

  if (isLoading) {
    return (
      <ProblemsSkeleton/>
    )
  }

  return (
    <div className='min-h-screen bg-zinc-950'>


      <div className='max-w-5xl mx-auto px-4 py-8 space-y-6'>
        <ProblemHeader />

        <ProblemFilters
          search={search}
          setSearch={setSearch}
          difficulty={difficulty}
          setDifficulty={setDifficulty}
        />

        <div>
          <div className='hidden md:grid grid-cols-[1fr_80px] px-4 py-2 text-xs font-medium text-zinc-600 uppercase tracking-wider'>
            <span>Problem</span>
            <span>Difficulty</span>
          </div>

          <div className='flex flex-col gap-1.5 mt-1'>
            {filteredProblems.length === 0 ? (
              <p className='text-center text-zinc-600 text-sm py-16'>
                No problems found.
              </p>
            ) : (
              filteredProblems.map(problem => (
                <ProblemCard
                  key={problem.id}
                  problem={problem}
                />
              ))
            )}
          </div>
        </div>

        <p className='text-xs text-zinc-600 text-center'>
          {filteredProblems.length} of {problems.length} problems
        </p>
      </div>
    </div>
  )
}

export default ProblemList