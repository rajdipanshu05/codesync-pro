import { useEffect, useState } from 'react'
import ProblemCard from './ProblemCard'
import { useProblemStore } from '../../store/problemStore'

const ProblemList = () => {
  const { problems, getProblems, isLoading } = useProblemStore()
  useEffect(() => {
    getProblems()
  }, [])

  if (isLoading) {
    return (
      <div className='text-center text-zinc-400 py-10'>Loading problems...</div>
    )
  }
  
  console.log(problems)
  return (

    <div className='grid gap-4'>
      {problems?.map(problem => (
        <ProblemCard key={problem.id} problem={problem} />
      ))}
    </div>
  )
}

export default ProblemList
