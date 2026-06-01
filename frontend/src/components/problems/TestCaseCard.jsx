const statusConfig = {
  accepted:            { icon: '✓', label: 'Passed',        text: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20' },
  wrong_answer:        { icon: '✗', label: 'Wrong Answer',  text: 'text-red-400',     bg: 'bg-red-500/10',     border: 'border-red-500/20'     },
  runtime_error:       { icon: '!', label: 'Runtime Error', text: 'text-red-400',     bg: 'bg-red-500/10',     border: 'border-red-500/20'     },
  compile_error:       { icon: '!', label: 'Compile Error', text: 'text-red-400',     bg: 'bg-red-500/10',     border: 'border-red-500/20'     },
  time_limit_exceeded: { icon: '⏱', label: 'TLE',           text: 'text-amber-400',   bg: 'bg-amber-500/10',   border: 'border-amber-500/20'   },
  error:               { icon: '!', label: 'Error',         text: 'text-red-400',     bg: 'bg-red-500/10',     border: 'border-red-500/20'     },
}

const fmt = (val) => {
  if (val === null || val === undefined) return '—'
  if (typeof val === 'object') return JSON.stringify(val)
  return String(val)
}

const InfoRow = ({ label, value, valueClass }) => (
  <div className='flex gap-2 text-xs'>
    <span className='text-zinc-600 min-w-[84px] shrink-0'>{label}</span>
    <span className={`font-mono break-all ${valueClass || 'text-zinc-400'}`}>{value}</span>
  </div>
)

const TestCaseCard = ({ result }) => {
  const cfg = statusConfig[result.status] || statusConfig.error
  return (
    <div className={`border ${cfg.border} rounded-xl overflow-hidden mb-2`}>
      <div className={`flex items-center gap-2 px-3 py-2 ${cfg.bg}`}>
        <span
          className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold shrink-0 text-white ${cfg.bg} border ${cfg.border}`}
        >
          {cfg.icon}
        </span>
        <span className={`text-xs font-semibold ${cfg.text}`}>
          Test Case {result.testCase}
        </span>
        <span className='text-xs text-zinc-500 ml-auto'>{cfg.label}</span>
      </div>
      <div className='px-3 py-2.5 flex flex-col gap-1.5'>
        <InfoRow label='Input' value={fmt(result.input)} />
        <InfoRow label='Expected' value={fmt(result.expectedOutput)} />
        {result.status === 'accepted' && result.actualOutput !== null && (
          <InfoRow
            label='Your Output'
            value={fmt(result.actualOutput)}
            valueClass='text-emerald-400'
          />
        )}
        {result.status === 'wrong_answer' && (
          <InfoRow
            label='Your Output'
            value={fmt(result.actualOutput)}
            valueClass='text-red-400'
          />
        )}
        {result.error && (
          <div className='mt-1 px-2.5 py-1.5 bg-red-500/5 rounded-lg font-mono text-xs text-red-400 break-all'>
            {result.error}
          </div>
        )}
      </div>
    </div>
  )
}
export default TestCaseCard
