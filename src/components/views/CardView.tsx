import { useState } from 'react'
import { cn } from '../../lib/utils'
import { Checkbox } from '../ui/Checkbox'
import { Badge } from '../ui/Badge'
import { ProgressBar } from '../ui/ProgressBar'
import type { Card } from '../../types'

interface Props {
  cards: Card[]
  completedItems: Record<string, boolean>
  onToggleItem: (id: string) => void
}

type FilterLevel = 'all' | string

const TYPE_VARIANTS: Record<Card['type'], 'slate' | 'amber' | 'indigo' | 'emerald'> = {
  monster: 'slate', boss: 'amber', gf: 'indigo', player: 'emerald',
}

function CardFace({ top, left, right, bottom }: { top: number; left: number; right: number; bottom: number }) {
  const fmt = (n: number) => n === 10 ? 'A' : String(n)
  return (
    <div className="w-12 h-12 bg-gradient-to-br from-slate-700/80 to-slate-900 border border-teal-500/40 rounded-md flex flex-col items-center justify-center text-sm font-mono relative shrink-0">
      <span className="absolute top-0.5 left-1/2 -translate-x-1/2 text-teal-300/90 leading-none">{fmt(top)}</span>
      <span className="absolute left-1 top-1/2 -translate-y-1/2 text-teal-300/90 leading-none">{fmt(left)}</span>
      <span className="absolute right-1 top-1/2 -translate-y-1/2 text-teal-300/90 leading-none">{fmt(right)}</span>
      <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 text-teal-300/90 leading-none">{fmt(bottom)}</span>
    </div>
  )
}

export function CardView({ cards, completedItems, onToggleItem }: Props) {
  const [filterLevel, setFilterLevel] = useState<FilterLevel>('all')
  const [filterType, setFilterType] = useState<'all' | Card['type']>('all')
  const [hideObtained, setHideObtained] = useState(false)

  const obtained = cards.filter(c => completedItems[c.id]).length
  const levels = [...new Set(cards.map(c => c.level))].sort((a, b) => a - b)

  const filtered = cards.filter(c => {
    if (filterLevel !== 'all' && c.level !== parseInt(filterLevel)) return false
    if (filterType !== 'all' && c.type !== filterType) return false
    if (hideObtained && completedItems[c.id]) return false
    return true
  })

  const filterBtn = (active: boolean) => cn(
    'px-2 py-1 rounded-md text-xs border transition-colors',
    active
      ? 'bg-indigo-900/60 border-indigo-600/60 text-indigo-200'
      : 'bg-slate-800/40 border-slate-700/40 text-slate-500 hover:border-slate-600 hover:text-slate-300'
  )

  return (
    <div className="space-y-3 pb-6 w-full">
      <div className="glass-panel p-4">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-base font-semibold text-slate-100">Triple Triad Cards</h2>
          <span className="text-sm font-bold text-indigo-300 font-mono">
            {obtained}<span className="text-slate-600">/{cards.length}</span>
          </span>
        </div>
        <ProgressBar value={cards.length ? Math.round((obtained / cards.length) * 100) : 0} color="indigo" />
      </div>

      <div className="glass-panel p-3 space-y-2.5">
        <div className="space-y-1.5">
          <p className="text-xs text-slate-600">Level</p>
          <div className="flex flex-wrap gap-1">
            <button onClick={() => setFilterLevel('all')} className={filterBtn(filterLevel === 'all')}>All</button>
            {levels.map(l => (
              <button key={l} onClick={() => setFilterLevel(String(l))} className={filterBtn(filterLevel === String(l))}>
                L{l}
              </button>
            ))}
          </div>
        </div>
        <div className="space-y-1.5">
          <p className="text-xs text-slate-600">Type</p>
          <div className="flex flex-wrap gap-1">
            {(['all', 'monster', 'boss', 'gf', 'player'] as const).map(t => (
              <button key={t} onClick={() => setFilterType(t)} className={cn(filterBtn(filterType === t), 'capitalize')}>
                {t}
              </button>
            ))}
          </div>
        </div>
        <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-500 hover:text-slate-300 transition-colors">
          <input type="checkbox" checked={hideObtained} onChange={e => setHideObtained(e.target.checked)} className="sr-only" />
          <span className={cn('w-3 h-3 rounded border', hideObtained ? 'border-indigo-500 bg-indigo-900/60' : 'border-slate-600')} />
          Hide obtained ({obtained})
        </label>
      </div>

      <div className="glass-panel overflow-hidden">
        <div className="px-4 py-2 border-b border-slate-700/40 text-xs text-slate-500">
          {filtered.length} of {cards.length} cards
        </div>
        <div className="grid grid-cols-1 xl:grid-cols-2">
          {filtered.map((c) => (
            <div key={c.id} className={cn(
              'px-4 py-2.5 flex items-center gap-3 border-b border-slate-800/50',
              'xl:[&:nth-child(odd)]:border-r xl:[&:nth-child(odd)]:border-slate-800/40',
              completedItems[c.id] && 'opacity-30'
            )}>
              <Checkbox checked={!!completedItems[c.id]} onChange={() => onToggleItem(c.id)} className="shrink-0" />
              <CardFace top={c.top} left={c.left} right={c.right} bottom={c.bottom} />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className={cn('text-sm font-medium', completedItems[c.id] ? 'line-through text-slate-600' : 'text-slate-100')}>
                    {c.name}
                  </span>
                  <Badge variant={TYPE_VARIANTS[c.type]}>{c.type}</Badge>
                  {c.elemental && <Badge variant="amber">{c.elemental}</Badge>}
                </div>
                {c.howToGet && <p className="text-xs text-slate-500 mt-0.5 truncate">{c.howToGet}</p>}
              </div>
              <span className="text-xs text-slate-700 shrink-0 font-mono">L{c.level}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
