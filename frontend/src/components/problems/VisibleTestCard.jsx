import React from 'react'

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
const VisibleTestCard = ({ example, index }) => (
  <div className='border border-zinc-800 rounded-xl overflow-hidden mb-2'>
    <div className='flex items-center px-3 py-2 bg-zinc-900'>
      <span className='text-xs font-semibold text-zinc-500'>Test Case {index + 1}</span>
    </div>
    <div className='px-3 py-2.5 flex flex-col gap-1.5'>
      <InfoRow label='Input'    value={fmt(example.input)} />
      <InfoRow label='Expected' value={fmt(example.output)} />
    </div>
  </div>
)


export default VisibleTestCard
