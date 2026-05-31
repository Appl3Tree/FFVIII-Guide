import { useState, useMemo } from 'react'
import { Search, Flame, Snowflake, Zap, Mountain, Wind, Droplets, Sun, Star } from 'lucide-react'
import { cn } from '../../lib/utils'
import { Badge } from '../ui/Badge'
import type { Enemy } from '../../types'

interface Props {
  enemies: Enemy[]
}

const ELEM_ICONS: Record<string, React.ReactNode> = {
  fire:     <Flame size={11} />,
  ice:      <Snowflake size={11} />,
  thunder:  <Zap size={11} />,
  earth:    <Mountain size={11} />,
  wind:     <Wind size={11} />,
  water:    <Droplets size={11} />,
  holy:     <Sun size={11} />,
  gravity:  <Star size={11} />,
  poison:   <span className="text-[10px]">☠</span>,
}

const ELEM_LABEL: Record<string, string> = {
  fire: 'Fire', ice: 'Ice', thunder: 'Thunder', earth: 'Earth',
  poison: 'Poison', wind: 'Wind', water: 'Water', holy: 'Holy', gravity: 'Gravity',
}

function elemColor(val: string): string {
  if (val.includes('(-1)'))  return 'text-green-400'   // absorbs
  if (val === 'immune')      return 'text-slate-400'   // immune
  if (val === 'mag-miss')    return 'text-slate-400'   // magic always misses
  if (val === 'no')          return 'text-slate-400'   // gravity immune
  if (val.includes('4'))     return 'text-red-500'     // ×4 extreme weakness
  if (val.includes('2'))     return 'text-red-400'     // ×2 weakness
  if (val.includes('3'))     return 'text-red-400'     // ×3 weakness
  if (val.includes('1,5'))   return 'text-orange-400'  // ×1.5
  if (val.includes('0,5'))   return 'text-blue-400'    // ×0.5 resist
  if (val === 'yes')         return 'text-amber-400'   // gravity works
  return 'text-slate-400'
}

function elemLabel(val: string): string {
  if (val.includes('(-1)')) return 'Absorb'
  if (val === 'immune')     return 'Immune'
  if (val === 'mag-miss')   return 'Miss'
  if (val === 'no')         return 'Immune'
  if (val === 'yes')        return 'Vuln'
  return val.replace('x ', '×')
}

function EnemyRow({ enemy }: { enemy: Enemy }) {
  const [open, setOpen] = useState(false)

  const notableElems = Object.entries(enemy.elementals)

  return (
    <div className={cn('border-b border-slate-800/50 last:border-0', open && 'bg-white/[0.02]')}>
      <button
        onClick={() => setOpen(e => !e)}
        className="w-full flex items-start gap-3 px-4 py-2.5 text-left hover:bg-white/5 transition-colors"
      >
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-sm font-medium text-slate-100">{enemy.name}</span>
            {enemy.lvUp
              ? <Badge variant="teal">Lv {enemy.lvMin}–{enemy.lvMax}</Badge>
              : <Badge variant="slate">Lv {enemy.lvMin}</Badge>
            }
            {notableElems.map(([elem, val]) => (
              <span key={elem} className={cn('flex items-center gap-0.5 text-[10px] font-mono', elemColor(val))}>
                {ELEM_ICONS[elem]}{elemLabel(val)}
              </span>
            ))}
          </div>
          {enemy.scan && (
            <p className="text-xs text-slate-500 mt-0.5 truncate">{enemy.scan}</p>
          )}
        </div>
        <div className="shrink-0 text-right text-xs font-mono space-y-0.5">
          <div className="text-slate-300">{enemy.hpMin.toLocaleString()}–{enemy.hpMax.toLocaleString()} HP</div>
          <div className="text-slate-600">{enemy.ap} AP{enemy.exp > 0 ? ` · ${enemy.exp} EXP` : ''}</div>
        </div>
      </button>

      {open && (
        <div className="px-4 pb-3 space-y-1.5 text-xs">
          {enemy.drawMagic.length > 0 && (
            <div className="flex gap-2">
              <span className="text-slate-600 shrink-0 w-16">Draw</span>
              <span className="text-violet-300">{enemy.drawMagic.join(', ')}</span>
            </div>
          )}
          {enemy.mug && (
            <div className="flex gap-2">
              <span className="text-slate-600 shrink-0 w-16">Mug</span>
              <span className="text-amber-300">{enemy.mug}</span>
            </div>
          )}
          {enemy.drop && (
            <div className="flex gap-2">
              <span className="text-slate-600 shrink-0 w-16">Drop</span>
              <span className="text-slate-400">{enemy.drop}</span>
            </div>
          )}
          {(enemy.cards.common || enemy.cards.rare) && (
            <div className="flex gap-2">
              <span className="text-slate-600 shrink-0 w-16">Cards</span>
              <span className="text-indigo-300">
                {[enemy.cards.common, enemy.cards.rare].filter(Boolean).join(' / ')}
              </span>
            </div>
          )}
          {enemy.cardDrop && enemy.cardDrop !== 'none' && (
            <div className="flex gap-2">
              <span className="text-slate-600 shrink-0 w-16">Card drop</span>
              <span className="text-indigo-400">{enemy.cardDrop}</span>
            </div>
          )}
          {notableElems.length > 0 && (
            <div className="flex gap-2 flex-wrap">
              <span className="text-slate-600 shrink-0 w-16">Elements</span>
              <span className="flex flex-wrap gap-1.5">
                {notableElems.map(([elem, val]) => (
                  <span key={elem} className={cn('flex items-center gap-0.5', elemColor(val))}>
                    {ELEM_ICONS[elem]}
                    <span>{ELEM_LABEL[elem]}: {elemLabel(val)}</span>
                  </span>
                ))}
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export function BestiaryView({ enemies }: Props) {
  const [query, setQuery] = useState('')

  const filtered = useMemo(() => {
    const q = query.toLowerCase()
    if (!q) return enemies
    return enemies.filter(e =>
      e.name.toLowerCase().includes(q) ||
      e.drawMagic.some(m => m.toLowerCase().includes(q)) ||
      (e.mug?.toLowerCase().includes(q)) ||
      (e.drop?.toLowerCase().includes(q)) ||
      (e.cards.common?.toLowerCase().includes(q)) ||
      (e.cards.rare?.toLowerCase().includes(q)) ||
      (e.scan?.toLowerCase().includes(q))
    )
  }, [enemies, query])

  return (
    <div className="space-y-3 pb-6 w-full">
      <div className="glass-panel p-4 space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-semibold text-slate-100">Bestiary</h2>
          <span className="text-xs text-slate-500">{enemies.length} enemies</span>
        </div>
        <div className="relative">
          <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
          <input
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search by name, draw magic, drops, cards…"
            className="w-full bg-slate-800/60 border border-slate-700/60 rounded-lg pl-8 pr-3 py-2 text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-teal-500/40"
          />
        </div>
      </div>

      <div className="glass-panel overflow-hidden">
        <div className="px-4 py-2 border-b border-slate-700/40 text-xs text-slate-500">
          {filtered.length} of {enemies.length} enemies · click row for draw/drop/card details
        </div>
        {filtered.length === 0
          ? <p className="px-4 py-8 text-center text-sm text-slate-600">No enemies match "{query}"</p>
          : <div className="grid grid-cols-1 xl:grid-cols-2">{filtered.map(e => <EnemyRow key={e.id} enemy={e} />)}</div>
        }
      </div>
    </div>
  )
}
