import { useMemo, useState } from 'react'
import { Search, X } from 'lucide-react'
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
const TYPE_LABELS: Record<string, string> = { all: 'All', monster: 'Monster', boss: 'Boss', gf: 'GF', player: 'Player' }
const asset = (path: string) => `${import.meta.env.BASE_URL}${path.replace(/^\/+/, '')}`

function formatCardMod(mod: string): string {
  return mod.replace(/^(.*?)\s*\[(\d+):(\d+)\]$/, (_, item, from, to) => {
    const fromNum = parseInt(from)
    const toNum = parseInt(to)
    return `${fromNum} card${fromNum > 1 ? 's' : ''} → ${toNum}× ${item.trim()}`
  })
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
  const [query, setQuery] = useState('')

  const obtained = cards.filter(c => completedItems[c.id]).length
  const levels = [...new Set(cards.map(c => c.level))].sort((a, b) => a - b)

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return cards.filter(c => {
      if (filterLevel !== 'all' && c.level !== parseInt(filterLevel)) return false
      if (filterType !== 'all' && c.type !== filterType) return false
      if (hideObtained && completedItems[c.id]) return false
      if (!q) return true
      return (
        c.name.toLowerCase().includes(q) ||
        c.type.toLowerCase().includes(q) ||
        (c.elemental?.toLowerCase().includes(q) ?? false) ||
        (c.location?.toLowerCase().includes(q) ?? false) ||
        (c.cardMod?.toLowerCase().includes(q) ?? false) ||
        (c.howToGet?.toLowerCase().includes(q) ?? false)
      )
    }).sort((a, b) => a.level - b.level || a.name.localeCompare(b.name))
  }, [cards, completedItems, filterLevel, filterType, hideObtained, query])

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
        <div className="relative">
          <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" />
          <input
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search card, player, location, or Card Mod result..."
            className="w-full bg-slate-800/60 border border-slate-700/60 rounded-lg pl-8 pr-8 py-2 text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-indigo-500/40"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300"
              aria-label="Clear card search"
            >
              <X size={13} />
            </button>
          )}
        </div>
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
              <button key={t} onClick={() => setFilterType(t)} className={filterBtn(filterType === t)}>
                {TYPE_LABELS[t] ?? t}
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
        {filtered.length === 0 ? (
          <p className="py-8 text-center text-sm text-slate-600">No cards match "{query}"</p>
        ) : (
          <div className="grid grid-cols-1 xl:grid-cols-2">
            {filtered.map((c) => (
            <div key={c.id} className={cn(
              'px-4 py-2.5 flex items-start gap-3 border-b border-slate-800/50',
              'xl:[&:nth-child(odd)]:border-r xl:[&:nth-child(odd)]:border-slate-800/40',
              completedItems[c.id] && 'opacity-30'
            )}>
              <Checkbox checked={!!completedItems[c.id]} onChange={() => onToggleItem(c.id)} className="shrink-0" />
              {c.image ? (
                <div className="flex flex-col items-center shrink-0">
                  <img
                    src={asset(c.image)}
                    alt={`${c.name} card`}
                    width={c.imageWidth ?? 216}
                    height={c.imageHeight ?? 222}
                    loading="lazy"
                    className="w-14 h-14 object-contain rounded-md border border-slate-700/60 bg-slate-950/60"
                  />
                  <div className="flex gap-1 mt-1 text-[9px] font-mono text-teal-400/80 justify-center">
                    <span title="Top">{c.top === 10 ? 'A' : c.top}</span>
                    <span className="text-slate-600">/</span>
                    <span title="Left">{c.left === 10 ? 'A' : c.left}</span>
                    <span className="text-slate-600">/</span>
                    <span title="Right">{c.right === 10 ? 'A' : c.right}</span>
                    <span className="text-slate-600">/</span>
                    <span title="Bottom">{c.bottom === 10 ? 'A' : c.bottom}</span>
                  </div>
                </div>
              ) : (
                <CardFace top={c.top} left={c.left} right={c.right} bottom={c.bottom} />
              )}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className={cn('text-sm font-medium', completedItems[c.id] ? 'line-through text-slate-600' : 'text-slate-100')}>
                    {c.name}
                  </span>
                  <Badge variant={TYPE_VARIANTS[c.type]}>{c.type}</Badge>
                  {c.elemental && <Badge variant="amber">{c.elemental}</Badge>}
                </div>
                <div className="mt-0.5 space-y-0.5">
                  {c.location && (
                    <p className="text-xs text-slate-500 leading-relaxed break-words [overflow-wrap:anywhere]">
                      <span className="text-slate-600">Win from:</span> {c.location}
                    </p>
                  )}
                  {c.cardMod && (
                    <p className="text-xs text-slate-500 leading-relaxed break-words [overflow-wrap:anywhere]">
                      <span className="text-slate-600">Card Mod:</span> {formatCardMod(c.cardMod)}
                    </p>
                  )}
                  {!c.location && !c.cardMod && c.howToGet && (
                    <p className="text-xs text-slate-500 leading-relaxed break-words [overflow-wrap:anywhere]">
                      <span className="text-slate-600">How to get:</span> {c.howToGet}
                    </p>
                  )}
                </div>
              </div>
              <span className="text-xs text-slate-700 shrink-0 font-mono">L{c.level}</span>
            </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
