const ProblemsSkeleton = () => {
  const sk = 'animate-pulse bg-zinc-800 rounded'

  const rows = [
    { tags: 2, titleW: 'w-44' },
    { tags: 2, titleW: 'w-56' },
    { tags: 1, titleW: 'w-36' },
    { tags: 3, titleW: 'w-64' },
    { tags: 2, titleW: 'w-48' },
    { tags: 2, titleW: 'w-52' },
    { tags: 1, titleW: 'w-40' },
  ]

  return (
    <div className='min-h-screen bg-zinc-950'>
      <div className='max-w-5xl mx-auto px-4 py-8 space-y-6'>

        {/* ProblemHeader skeleton */}
        <div className='flex items-center justify-between'>
          <div className='flex items-center gap-3'>
            <div className={`${sk} w-10 h-10 rounded-xl`} />
            <div>
              <div className={`${sk} w-32 h-5 mb-2`} />
              <div className={`${sk} w-44 h-3`} />
            </div>
          </div>
          <div className={`${sk} w-24 h-9 rounded-xl`} />
        </div>

        {/* ProblemFilters skeleton */}
        <div className='flex flex-col sm:flex-row gap-3'>
          <div className={`${sk} flex-1 h-10 rounded-xl`} />
          <div className='flex gap-2'>
            {['w-12', 'w-16', 'w-20', 'w-14'].map((w, i) => (
              <div key={i} className={`${sk} ${w} h-10 rounded-xl`} />
            ))}
          </div>
        </div>

        {/* Table */}
        <div>
          {/* Column headers */}
          <div className='hidden md:grid grid-cols-[1fr_80px] px-4 py-2'>
            <div className={`${sk} w-16 h-3 rounded`} />
            <div className={`${sk} w-14 h-3 rounded`} />
          </div>

          {/* Problem rows */}
          <div className='flex flex-col gap-1.5 mt-1'>
            {rows.map((row, i) => (
              <div
                key={i}
                className='bg-zinc-900 border border-zinc-800 rounded-2xl px-4 py-4 grid grid-cols-[1fr_80px] items-center'
                style={{ opacity: 1 - i * 0.08 }}
              >
                <div>
                  <div className={`${sk} ${row.titleW} h-4 mb-3`} />
                  <div className='flex gap-2'>
                    {Array(row.tags).fill(0).map((_, j) => (
                      <div key={j} className={`${sk} w-16 h-5 rounded-full`} />
                    ))}
                  </div>
                </div>
                <div className={`${sk} w-12 h-3 rounded`} />
              </div>
            ))}
          </div>
        </div>

        {/* Footer count */}
        <div className='flex justify-center'>
          <div className={`${sk} w-32 h-3 rounded`} />
        </div>

      </div>
    </div>
  )
}

export default ProblemsSkeleton