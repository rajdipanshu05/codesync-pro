// Props:
// results   — API response (null jab tak run nahi kiya)
// type      — 'run' | 'submit'
// isLoading — boolean
// examples  — currentProblem.examples (default visible test cases ke liye)
// isOpen    — boolean (toggle state)
// onToggle  — function

import TestCaseCard from './TestCaseCard'
import VisibleTestCard from './VisibleTestCard'

const RunResults = ({
  results,
  type,
  isLoading,
  examples,
  isOpen,
  onToggle
}) => {
  
  return (
    <div className='border-t border-zinc-800 bg-zinc-950'>
      {/* Toggle header — hamesha dikhta hai */}
      <div
        onClick={onToggle}
        className='flex items-center justify-between px-4 py-2 cursor-pointer select-none hover:bg-zinc-900 transition-colors'
      >
        <span className='text-xs font-semibold text-zinc-400'>
          {type === 'submit' ? 'Submit Results' : 'Test Results'}
        </span>
        <span className='text-xs text-zinc-600'>{isOpen ? '▲' : '▼'}</span>
      </div>

      {/* Panel body */}
      {isOpen && (
        <div className='max-h-72 overflow-y-auto px-4 pb-3'>
          {/* Loading */}
          {isLoading && (
            <div className='flex items-center gap-2.5 text-zinc-500 text-xs py-2'>
              <div className='w-3.5 h-3.5 border-2 border-zinc-700 border-t-white rounded-full animate-spin' />
              {type === 'submit' ? 'Submitting...' : 'Running test cases...'}
            </div>
          )}

          {/* Results after run/submit */}
          {!isLoading &&
            results &&
            (() => {
              const { summary, allPassed, results: cases } = results
              const bannerText = allPassed ? 'text-emerald-400' : 'text-red-400'
              const bannerBg = allPassed ? 'bg-emerald-500/10' : 'bg-red-500/10'
              const bannerMsg =
                type === 'submit'
                  ? allPassed
                    ? '🎉 Accepted'
                    : `${summary} test cases passed`
                  : allPassed
                  ? 'All test cases passed!'
                  : `${summary} test cases passed`
              return (
                <>
                  <div
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg ${bannerBg} mb-2.5`}
                  >
                    <span className={`text-xs font-semibold ${bannerText}`}>
                      {bannerMsg}
                    </span>
                    <span className='text-xs text-zinc-600 ml-auto'>
                      {type === 'submit' ? 'Hidden tests' : 'Sample tests'}
                    </span>
                  </div>
                  {cases?.map(tc => (
                    <TestCaseCard key={tc.testCase} result={tc} />
                  ))}
                </>
              )
            })()}

          {/* Default — run se pehle visible test cases */}
          {!isLoading &&
            !results &&
            examples?.map((ex, i) => (
              <VisibleTestCard key={i} example={ex} index={i} />
            ))}
        </div>
      )}
    </div>
  )
}

export default RunResults
