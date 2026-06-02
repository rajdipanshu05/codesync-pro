import React from 'react'

const ProblemDetailsSkeleton = () => {
  const sk = 'animate-pulse bg-zinc-800 rounded'

  return (
    <div className='min-h-dvh bg-zinc-950 text-white flex flex-col'>

      {/* TOPBAR */}
      <header className='flex items-center justify-between px-5 py-3 border-b border-zinc-800 bg-zinc-950'>
        <div className={`${sk} w-24 h-4 rounded`} />
        <div className='flex items-center gap-2'>
          <div className={`${sk} w-10 h-4 rounded`} />
          <div className={`${sk} w-14 h-5 rounded-md`} />
          <div className={`${sk} w-20 h-5 rounded-md`} />
        </div>
      </header>

      {/* MAIN SPLIT */}
      <div className='flex flex-col lg:flex-row flex-1'>

        {/* LEFT PANEL */}
        <div className='w-full lg:w-[42%] border-b lg:border-b-0 lg:border-r border-zinc-800 p-4 lg:p-6 space-y-6'>

          {/* Title */}
          <div className={`${sk} w-40 h-6 rounded`} />

          {/* Statement lines */}
          <div className='space-y-2'>
            <div className={`${sk} w-full h-4 rounded`} />
            <div className={`${sk} w-full h-4 rounded`} />
            <div className={`${sk} w-3/4 h-4 rounded`} />
          </div>

          {/* Example 1 */}
          <div className='bg-zinc-900 border border-zinc-800 rounded-xl p-4 space-y-3'>
            <div className={`${sk} w-16 h-3 rounded`} />
            <div className='space-y-2'>
              <div className={`${sk} w-64 h-4 rounded`} />
              <div className={`${sk} w-32 h-4 rounded`} />
              <div className={`${sk} w-72 h-4 rounded`} />
            </div>
          </div>

          {/* Example 2 */}
          <div className='bg-zinc-900 border border-zinc-800 rounded-xl p-4 space-y-3'>
            <div className={`${sk} w-16 h-3 rounded`} />
            <div className='space-y-2'>
              <div className={`${sk} w-56 h-4 rounded`} />
              <div className={`${sk} w-28 h-4 rounded`} />
            </div>
          </div>

          {/* Constraints */}
          <div className='space-y-3'>
            <div className={`${sk} w-24 h-3 rounded`} />
            <div className='space-y-2'>
              {[140, 180, 160, 200].map((w, i) => (
                <div key={i} className='flex items-center gap-2'>
                  <div className={`${sk} w-1.5 h-1.5 rounded-full shrink-0`} />
                  <div className={`${sk} h-4 rounded`} style={{ width: w }} />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div className='w-full lg:flex-1 flex flex-col min-h-[500px] lg:min-h-0'>

          {/* Lang tabs + actions bar */}
          <div className='flex items-center justify-between border-b border-zinc-800 bg-zinc-900 px-4 py-2'>
            <div className='flex items-center gap-1'>
              {['w-16', 'w-12', 'w-12'].map((w, i) => (
                <div key={i} className={`${sk} ${w} h-7 rounded-lg`} />
              ))}
            </div>
            <div className='flex items-center gap-2'>
              <div className={`${sk} w-20 h-7 rounded-lg`} />
              <div className={`${sk} w-24 h-7 rounded-lg`} />
            </div>
          </div>

          {/* Editor area */}
          <div className='h-[450px] lg:flex-1 bg-zinc-950 p-4 space-y-3'>
            {[60, 80, 45, 70, 55].map((w, i) => (
              <div key={i} className='flex items-center gap-4'>
                <div className={`${sk} w-5 h-4 rounded shrink-0`} />
                <div className={`${sk} h-4 rounded`} style={{ width: `${w}%` }} />
              </div>
            ))}
          </div>

          {/* Test Results panel */}
          <div className='border-t border-zinc-800 bg-zinc-900'>
            <div className='flex items-center justify-between px-4 py-3 border-b border-zinc-800'>
              <div className={`${sk} w-24 h-4 rounded`} />
              <div className={`${sk} w-4 h-4 rounded`} />
            </div>
            <div className='p-3 space-y-2'>
              {[1, 2].map(i => (
                <div key={i} className='border border-zinc-800 rounded-xl p-4 space-y-3'>
                  <div className={`${sk} w-20 h-3 rounded`} />
                  <div className='flex items-center justify-between'>
                    <div className={`${sk} w-12 h-3 rounded`} />
                    <div className={`${sk} w-48 h-3 rounded`} />
                  </div>
                  <div className='flex items-center justify-between'>
                    <div className={`${sk} w-16 h-3 rounded`} />
                    <div className={`${sk} w-12 h-3 rounded`} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom bar */}
          <div className='flex items-center justify-between px-4 py-3 border-t border-zinc-800 bg-zinc-900'>
            <div className={`${sk} w-20 h-4 rounded`} />
            <div className='flex items-center gap-2'>
              <div className={`${sk} w-20 h-9 rounded-xl`} />
              <div className={`${sk} w-24 h-9 rounded-xl`} />
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default ProblemDetailsSkeleton