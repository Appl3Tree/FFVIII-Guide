import { useState, useMemo } from 'react'
import { Search, Sword, Package } from 'lucide-react'
import { cn } from '../../lib/utils'
import { Badge } from '../ui/Badge'
import type { Item, Weapon } from '../../types'

interface Props {
  items: Item[]
  weapons: Weapon[]
}

type Tab = 'items' | 'weapons'

const SECTION_COLORS: Record<string, 'teal' | 'amber' | 'indigo' | 'emerald' | 'slate' | 'violet'> = {
  Recovery:     'teal',
  Status:       'amber',
  Battle:       'indigo',
  'Save Point': 'emerald',
  'GF Recovery':'violet',
  'GF Ability Learning': 'violet',
  Ammunition:   'indigo',
  Tool:         'slate',
  'Blue Magic': 'teal',
  Compatibility:'emerald',
  Various:      'slate',
  'Stat Boosting': 'amber',
  Magazine:     'slate',
}

const WEAPON_TYPE_COLORS: Record<string, 'teal' | 'amber' | 'indigo' | 'emerald' | 'slate' | 'violet'> = {
  GUNBLADE: 'teal',
  GLOVE:    'indigo',
  GUN:      'amber',
  WHIP:     'violet',
  PINWHEEL: 'emerald',
  NUNCHAKU: 'slate',
}

function ItemRow({ item }: { item: Item }) {
  const [expanded, setExpanded] = useState(false)
  const color = SECTION_COLORS[item.section] ?? 'slate'
  const hasDetail = item.obtain || item.refineFrom.length > 0 || item.refineTo.length > 0

  return (
    <div className={cn('border-b border-slate-800/50 last:border-0', expanded && 'bg-white/[0.02]')}>
      <button
        onClick={() => hasDetail && setExpanded(e => !e)}
        className={cn(
          'w-full flex items-center gap-3 px-4 py-2.5 text-left',
          hasDetail && 'hover:bg-white/5 transition-colors'
        )}
      >
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-sm text-slate-100 font-medium">{item.name}</span>
            <Badge variant={color}>{item.section}</Badge>
          </div>
          {item.useDesc && (
            <p className="text-xs text-slate-500 mt-0.5 truncate">{item.useDesc}</p>
          )}
        </div>
        <div className="shrink-0 flex items-center gap-3 text-xs font-mono">
          {item.buy  != null && <span className="text-teal-400">{item.buy.toLocaleString()}g</span>}
          {item.sell != null && <span className="text-slate-600">{item.sell.toLocaleString()}g</span>}
        </div>
      </button>

      {expanded && hasDetail && (
        <div className="px-4 pb-3 space-y-1.5 text-xs">
          {item.obtain && (
            <div className="flex gap-2">
              <span className="text-slate-600 shrink-0 w-20">Obtain</span>
              <span className="text-slate-300">{item.obtain}</span>
            </div>
          )}
          {item.refineFrom.length > 0 && (
            <div className="flex gap-2">
              <span className="text-slate-600 shrink-0 w-20">Refine from</span>
              <span className="text-slate-400">{item.refineFrom.join('; ')}</span>
            </div>
          )}
          {item.refineTo.length > 0 && (
            <div className="flex gap-2">
              <span className="text-slate-600 shrink-0 w-20">Refine into</span>
              <span className="text-emerald-400">{item.refineTo.join('; ')}</span>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

function WeaponRow({ weapon }: { weapon: Weapon }) {
  const color = WEAPON_TYPE_COLORS[weapon.type] ?? 'slate'
  const character: Record<string, string> = {
    GUNBLADE: 'Squall', GLOVE: 'Zell', GUN: 'Irvine',
    WHIP: 'Quistis', PINWHEEL: 'Selphie', NUNCHAKU: 'Rinoa',
  }

  return (
    <div className="border-b border-slate-800/50 last:border-0 px-4 py-2.5 flex items-start gap-3">
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap mb-1">
          <span className="text-sm text-slate-100 font-medium">{weapon.name}</span>
          <Badge variant={color}>{character[weapon.type] ?? weapon.type}</Badge>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {weapon.materials.map((m, i) => (
            <span key={i} className="text-xs text-slate-400 bg-slate-800/60 border border-slate-700/40 rounded px-1.5 py-0.5">
              {m}
            </span>
          ))}
        </div>
      </div>
      <div className="shrink-0 text-right">
        <div className="text-xs font-mono text-amber-300">+{weapon.strBonus} Str</div>
        <div className="text-xs font-mono text-slate-600">{weapon.price.toLocaleString()}g</div>
      </div>
    </div>
  )
}

export function ItemsView({ items, weapons }: Props) {
  const [tab, setTab] = useState<Tab>('items')
  const [query, setQuery] = useState('')
  const [section, setSection] = useState('all')

  const sections = useMemo(() => ['all', ...new Set(items.map(i => i.section))], [items])

  const filteredItems = useMemo(() => {
    const q = query.toLowerCase()
    return items.filter(it => {
      if (section !== 'all' && it.section !== section) return false
      if (q && !it.name.toLowerCase().includes(q) && !it.obtain.toLowerCase().includes(q)) return false
      return true
    })
  }, [items, query, section])

  const filteredWeapons = useMemo(() => {
    const q = query.toLowerCase()
    if (!q) return weapons
    return weapons.filter(w =>
      w.name.toLowerCase().includes(q) || w.materials.some(m => m.toLowerCase().includes(q))
    )
  }, [weapons, query])

  const tabBtn = (t: Tab) => cn(
    'flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-lg border transition-colors',
    tab === t
      ? 'bg-teal-900/50 border-teal-600/50 text-teal-200'
      : 'bg-slate-800/40 border-slate-700/40 text-slate-500 hover:text-slate-300'
  )

  return (
    <div className="space-y-3 pb-6 max-w-3xl mx-auto">
      {/* Header */}
      <div className="glass-panel p-4 space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-semibold text-slate-100">Items & Weapons</h2>
          <div className="flex gap-1.5">
            <button onClick={() => setTab('items')} className={tabBtn('items')}>
              <Package size={12} /> Items ({items.length})
            </button>
            <button onClick={() => setTab('weapons')} className={tabBtn('weapons')}>
              <Sword size={12} /> Weapons ({weapons.length})
            </button>
          </div>
        </div>
        <div className="relative">
          <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
          <input
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder={tab === 'items' ? 'Search items, obtain methods…' : 'Search weapons, materials…'}
            className="w-full bg-slate-800/60 border border-slate-700/60 rounded-lg pl-8 pr-3 py-2 text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-teal-500/40"
          />
        </div>

        {/* Section filter (items only) */}
        {tab === 'items' && (
          <div className="flex flex-wrap gap-1">
            {sections.map(s => (
              <button
                key={s}
                onClick={() => setSection(s)}
                className={cn(
                  'px-2 py-0.5 rounded text-xs border transition-colors capitalize',
                  section === s
                    ? 'bg-teal-900/50 border-teal-600/50 text-teal-200'
                    : 'bg-slate-800/40 border-slate-700/40 text-slate-500 hover:text-slate-300'
                )}
              >
                {s === 'all' ? 'All' : s}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* List */}
      <div className="glass-panel overflow-hidden">
        <div className="px-4 py-2 border-b border-slate-700/40 text-xs text-slate-500">
          {tab === 'items'
            ? `${filteredItems.length} of ${items.length} items`
            : `${filteredWeapons.length} of ${weapons.length} weapons`
          }
        </div>

        {tab === 'items' && (
          filteredItems.length === 0
            ? <p className="px-4 py-8 text-center text-sm text-slate-600">No items match "{query}"</p>
            : filteredItems.map(it => <ItemRow key={it.id} item={it} />)
        )}

        {tab === 'weapons' && (
          filteredWeapons.length === 0
            ? <p className="px-4 py-8 text-center text-sm text-slate-600">No weapons match "{query}"</p>
            : filteredWeapons.map(w => <WeaponRow key={w.id} weapon={w} />)
        )}
      </div>
    </div>
  )
}
