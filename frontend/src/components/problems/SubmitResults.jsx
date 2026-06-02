import React from 'react'

const SubmitResults = ({
  results,
  isLoading,
  isOpen,
  onToggle
}) => {
  const getVerdict = status => {
    switch (status) {
      case 'wrong_answer':
        return {
          title: 'Wrong Answer',
          color: 'text-red-400',
          bg: 'bg-red-500/10'
        }

      case 'runtime_error':
        return {
          title: 'Runtime Error',
          color: 'text-red-400',
          bg: 'bg-red-500/10'
        }

      case 'compile_error':
        return {
          title: 'Compile Error',
          color: 'text-red-400',
          bg: 'bg-red-500/10'
        }

      case 'time_limit_exceeded':
        return {
          title: 'Time Limit Exceeded',
          color: 'text-yellow-400',
          bg: 'bg-yellow-500/10'
        }

      default:
        return {
          title: 'Failed',
          color: 'text-red-400',
          bg: 'bg-red-500/10'
        }
    }
  }

  const failedCase = results?.results?.find(tc => !tc.passed)

  const verdict = results?.allPassed
    ? {
        title: 'Accepted',
        color: 'text-emerald-400',
        bg: 'bg-emerald-500/10'
      }
    : getVerdict(failedCase?.status)

  return (
    <div className='border-t border-zinc-800 bg-zinc-950'>
      {/* Header */}
      <div
        onClick={onToggle}
        className='flex items-center justify-between px-4 py-2 cursor-pointer select-none hover:bg-zinc-900 transition-colors'
      >
        <span className='text-xs font-semibold text-zinc-400'>
          Submit Results
        </span>

        <span className='text-xs text-zinc-600'>
          {isOpen ? '▲' : '▼'}
        </span>
      </div>

      {/* Body */}
      {isOpen && (
        <div className='max-h-80 overflow-y-auto px-4 pb-4'>
          {/* Loading */}
          {isLoading && (
            <div className='flex items-center gap-2.5 text-zinc-500 text-xs py-3'>
              <div className='w-3.5 h-3.5 border-2 border-zinc-700 border-t-white rounded-full animate-spin' />
              Submitting solution...
            </div>
          )}

          {/* Error */}
          {!isLoading && results?.error && (
            <div className='mt-3 rounded-lg bg-red-500/10 border border-red-500/20 p-4'>
              <p className='text-red-400 text-sm font-medium'>
                {results.error}
              </p>
            </div>
          )}

          {/* Results */}
          {!isLoading &&
            results &&
            !results.error && (
              <>
                {/* Verdict Banner */}
                <div
                  className={`mt-3 rounded-lg border border-zinc-800 p-4 ${verdict.bg}`}
                >
                  <div className='flex items-center justify-between'>
                    <div>
                      <h3
                        className={`text-lg font-semibold ${verdict.color}`}
                      >
                        {results.allPassed
                          ? '🎉 Accepted'
                          : `❌ ${verdict.title}`}
                      </h3>

                      <p className='text-zinc-400 text-sm mt-1'>
                        {results.summary} test cases passed
                      </p>
                    </div>

                    <span className='text-xs text-zinc-500'>
                      Hidden Tests
                    </span>
                  </div>
                </div>

                {/* Accepted */}
                {results.allPassed && (
                  <div className='mt-4 rounded-lg border border-emerald-500/20 bg-emerald-500/5 p-4'>
                    <p className='text-emerald-400 font-medium'>
                      Congratulations! Your solution passed all hidden test
                      cases.
                    </p>
                  </div>
                )}

                {/* Wrong Answer */}
                {!results.allPassed &&
                  failedCase?.status === 'wrong_answer' && (
                    <div className='mt-4 space-y-4'>
                      <div className='rounded-lg bg-zinc-900 border border-zinc-800 p-4'>
                        <p className='text-zinc-500 text-xs uppercase mb-2'>
                          Input
                        </p>

                        <pre className='text-sm text-zinc-300 overflow-x-auto whitespace-pre-wrap'>
                          {JSON.stringify(failedCase.input, null, 2)}
                        </pre>
                      </div>

                      <div className='rounded-lg bg-zinc-900 border border-zinc-800 p-4'>
                        <p className='text-zinc-500 text-xs uppercase mb-2'>
                          Expected Output
                        </p>

                        <pre className='text-sm text-emerald-400 overflow-x-auto whitespace-pre-wrap'>
                          {JSON.stringify(
                            failedCase.expectedOutput,
                            null,
                            2
                          )}
                        </pre>
                      </div>

                      <div className='rounded-lg bg-zinc-900 border border-zinc-800 p-4'>
                        <p className='text-zinc-500 text-xs uppercase mb-2'>
                          Your Output
                        </p>

                        <pre className='text-sm text-red-400 overflow-x-auto whitespace-pre-wrap'>
                          {JSON.stringify(
                            failedCase.actualOutput,
                            null,
                            2
                          )}
                        </pre>
                      </div>
                    </div>
                  )}

                {/* Runtime / Compile Error */}
                {!results.allPassed &&
                  (failedCase?.status === 'runtime_error' ||
                    failedCase?.status === 'compile_error') && (
                    <div className='mt-4 rounded-lg bg-red-500/10 border border-red-500/20 p-4'>
                      <p className='text-red-400 text-xs uppercase mb-2'>
                        Error
                      </p>

                      <pre className='text-sm text-red-300 whitespace-pre-wrap overflow-x-auto'>
                        {failedCase.error}
                      </pre>
                    </div>
                  )}

                {/* TLE */}
                {!results.allPassed &&
                  failedCase?.status === 'time_limit_exceeded' && (
                    <div className='mt-4 rounded-lg bg-yellow-500/10 border border-yellow-500/20 p-4'>
                      <p className='text-yellow-400 font-medium'>
                        Time Limit Exceeded
                      </p>

                      <p className='text-zinc-400 text-sm mt-1'>
                        Your solution took too long to execute on the hidden
                        test cases.
                      </p>
                    </div>
                  )}
              </>
            )}
        </div>
      )}
    </div>
  )
}

export default SubmitResults