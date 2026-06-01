import { useState, useMemo } from 'react'
import { Search, Sword, Package, ChevronDown, ChevronRight } from 'lucide-react'
import { cn } from '../../lib/utils'
import { Badge } from '../ui/Badge'
import type { Item, Weapon } from '../../types'

interface Props {
  items: Item[]
  weapons: Weapon[]
}

type Tab = 'items' | 'weapons'

const SECTION_COLORS: Record<string, 'teal' | 'amber' | 'indigo' | 'emerald' | 'slate' | 'violet'> = {
  Recovery:               'teal',
  Status:                 'amber',
  Battle:                 'indigo',
  'Save Point':           'emerald',
  'GF Recovery':          'violet',
  'GF Ability Learning':  'violet',
  Ammunition:             'indigo',
  Tool:                   'slate',
  'Blue Magic':           'teal',
  Compatibility:          'emerald',
  Various:                'slate',
  'Stat Boosting':        'amber',
  Magazine:               'slate',
}

const CHARACTER_ORDER = ['Squall', 'Rinoa', 'Zell', 'Irvine', 'Quistis', 'Selphie']
const GUEST_ORDER = ['Seifer', 'Laguna', 'Kiros', 'Ward']
const WEAPON_TYPE_TO_CHAR: Record<string, string> = {
  GUNBLADE:       'Squall',
  'BLASTER EDGE': 'Rinoa',
  GLOVE:          'Zell',
  GUN:            'Irvine',
  WHIP:           'Quistis',
  NUNCHAKU:       'Selphie',
  HYPERION:       'Seifer',
  'MACHINE GUN':  'Laguna',
  KATAL:          'Kiros',
  HARPOON:        'Ward',
}
const CHAR_COLORS: Record<string, 'teal' | 'amber' | 'indigo' | 'emerald' | 'slate' | 'violet'> = {
  Squall:  'teal',
  Rinoa:   'violet',
  Zell:    'indigo',
  Irvine:  'amber',
  Quistis: 'emerald',
  Selphie: 'slate',
  Seifer:  'amber',
  Laguna:  'teal',
  Kiros:   'indigo',
  Ward:    'slate',
}

// ─── Item card (compact, expandable) ─────────────────────────────────────────

function ItemCard({ item }: { item: Item }) {
  const [open, setOpen] = useState(false)
  const hasDetail = !!(item.obtain || item.refineFrom.length || item.refineTo.length)

  return (
    <div
      className={cn(
        'rounded-lg border transition-colors',
        open ? 'border-slate-600/60 bg-white/[0.03]' : 'border-slate-700/40 bg-slate-800/30',
        hasDetail && 'cursor-pointer hover:border-slate-600/50 hover:bg-white/[0.02]'
      )}
      onClick={() => hasDetail && setOpen(o => !o)}
    >
      <div className="p-3">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-sm font-medium text-slate-100 leading-tight">{item.name}</span>
              {hasDetail && (
                open
                  ? <ChevronDown size={10} className="text-slate-500 shrink-0" />
                  : <ChevronRight size={10} className="text-slate-500 shrink-0" />
              )}
            </div>
            {item.useDesc && (
              <p className="text-xs text-slate-500 mt-0.5 leading-snug line-clamp-2">{item.useDesc}</p>
            )}
          </div>
          <div className="shrink-0 text-right space-y-0.5">
            {item.buy  != null && <div className="text-xs font-mono text-teal-400">{item.buy.toLocaleString()}g</div>}
            {item.sell != null && <div className="text-xs font-mono text-slate-600">{item.sell.toLocaleString()}g</div>}
          </div>
        </div>
      </div>

      {open && hasDetail && (
        <div className="px-3 pb-3 pt-0 space-y-1.5 border-t border-slate-700/40 mt-0 pt-2">
          {item.obtain && (
            <div className="flex gap-2 text-xs">
              <span className="text-slate-600 shrink-0 w-16">Obtain</span>
              <span className="text-slate-300">{item.obtain}</span>
            </div>
          )}
          {item.refineFrom.length > 0 && (
            <div className="flex gap-2 text-xs">
              <span className="text-slate-600 shrink-0 w-16">From</span>
              <span className="text-slate-400">{item.refineFrom.join('; ')}</span>
            </div>
          )}
          {item.refineTo.length > 0 && (
            <div className="flex gap-2 text-xs">
              <span className="text-slate-600 shrink-0 w-16">Refines to</span>
              <span className="text-emerald-400">{item.refineTo.join('; ')}</span>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

// ─── Section group: header + 2-col grid ──────────────────────────────────────

function ItemSection({
  section,
  items,
  collapsible,
}: {
  section: string
  items: Item[]
  collapsible: boolean
}) {
  const [collapsed, setCollapsed] = useState(false)
  const color = SECTION_COLORS[section] ?? 'slate'

  return (
    <div>
      <button
        onClick={() => collapsible && setCollapsed(c => !c)}
        className={cn(
          'w-full flex items-center gap-2 mb-2 group',
          collapsible && 'cursor-pointer'
        )}
      >
        <Badge variant={color}>{section}</Badge>
        <span className="text-xs text-slate-600">{items.length}</span>
        {collapsible && (
          collapsed
            ? <ChevronRight size={12} className="text-slate-600 group-hover:text-slate-400 transition-colors" />
            : <ChevronDown  size={12} className="text-slate-600 group-hover:text-slate-400 transition-colors" />
        )}
      </button>
      {!collapsed && (
        <div className="grid grid-cols-2 gap-2 mb-5">
          {items.map(it => <ItemCard key={it.id} item={it} />)}
        </div>
      )}
    </div>
  )
}

// ─── Weapon card ──────────────────────────────────────────────────────────────

function WeaponCard({ weapon }: { weapon: Weapon }) {
  return (
    <div className="rounded-lg border border-slate-700/40 bg-slate-800/30 p-3">
      <div className="flex items-start justify-between gap-2 mb-2">
        <span className="text-sm font-medium text-slate-100">{weapon.name}</span>
        <div className="shrink-0 text-right">
          <div className="text-xs font-mono text-amber-300">+{weapon.strBonus} Str</div>
          {weapon.hitBonus > 0 && <div className="text-xs font-mono text-sky-400">+{weapon.hitBonus} Hit</div>}
          <div className="text-xs font-mono text-slate-600">{weapon.price.toLocaleString()}g</div>
        </div>
      </div>
      <div className="flex flex-wrap gap-1">
        {weapon.materials.map((m, i) => (
          <span key={i} className="text-xs text-slate-400 bg-slate-700/50 border border-slate-600/40 rounded px-1.5 py-0.5">
            {m}
          </span>
        ))}
      </div>
      {weapon.weaponsMonthly && (
        <p className="text-xs text-slate-600 mt-1.5">Weapons Mon. {weapon.weaponsMonthly}</p>
      )}
    </div>
  )
}

function WeaponSection({
  character,
  weapons,
  guest,
}: {
  character: string
  weapons: Weapon[]
  guest?: boolean
}) {
  const color = CHAR_COLORS[character] ?? 'slate'
  const label = guest
    ? `${character} (guest)`
    : `${weapons.length} upgrade${weapons.length !== 1 ? 's' : ''}`
  return (
    <div className="mb-5">
      <div className="flex items-center gap-2 mb-2">
        <Badge variant={color}>{character}</Badge>
        <span className="text-xs text-slate-600">{label}</span>
        {guest && <span className="text-xs text-slate-700 italic">non-upgradeable</span>}
      </div>
      <div className="grid grid-cols-2 gap-2">
        {weapons.map(w => <WeaponCard key={w.id} weapon={w} />)}
      </div>
    </div>
  )
}

// ─── Main view ────────────────────────────────────────────────────────────────

export function ItemsView({ items, weapons }: Props) {
  const [tab, setTab]       = useState<Tab>('items')
  const [query, setQuery]   = useState('')
  const [section, setSection] = useState('all')

  const sections = useMemo(() => ['all', ...new Set(items.map(i => i.section))], [items])

  const filteredItems = useMemo(() => {
    const q = query.toLowerCase()
    return items.filter(it => {
      if (section !== 'all' && it.section !== section) return false
      if (!q) return true
      return (
        it.name.toLowerCase().includes(q) ||
        it.obtain.toLowerCase().includes(q) ||
        it.useDesc.toLowerCase().includes(q) ||
        it.refineFrom.some(r => r.toLowerCase().includes(q)) ||
        it.refineTo.some(r => r.toLowerCase().includes(q))
      )
    })
  }, [items, query, section])

  const filteredWeapons = useMemo(() => {
    const q = query.toLowerCase()
    if (!q) return weapons
    return weapons.filter(w =>
      w.name.toLowerCase().includes(q) ||
      w.materials.some(m => m.toLowerCase().includes(q)) ||
      (WEAPON_TYPE_TO_CHAR[w.type] ?? '').toLowerCase().includes(q)
    )
  }, [weapons, query])

  // Group items by section for "All" view
  const groupedItems = useMemo(() => {
    const map: Record<string, Item[]> = {}
    for (const it of filteredItems) {
      ;(map[it.section] ??= []).push(it)
    }
    // preserve original section order
    return sections.filter(s => s !== 'all' && map[s]?.length).map(s => ({ section: s, items: map[s] }))
  }, [filteredItems, sections])

  // Group weapons by character (main party and guests separately)
  const { groupedWeapons, groupedGuests } = useMemo(() => {
    const map: Record<string, Weapon[]> = {}
    for (const w of filteredWeapons) {
      const char = WEAPON_TYPE_TO_CHAR[w.type] ?? 'Other'
      ;(map[char] ??= []).push(w)
    }
    return {
      groupedWeapons: CHARACTER_ORDER.filter(c => map[c]?.length).map(c => ({ character: c, weapons: map[c] })),
      groupedGuests:  GUEST_ORDER.filter(c => map[c]?.length).map(c => ({ character: c, weapons: map[c] })),
    }
  }, [filteredWeapons])

  const tabBtn = (t: Tab) => cn(
    'flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-lg border transition-colors',
    tab === t
      ? 'bg-teal-900/50 border-teal-600/50 text-teal-200'
      : 'bg-slate-800/40 border-slate-700/40 text-slate-500 hover:text-slate-300'
  )

  const isSearching = query.trim().length > 0

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
            placeholder={
              tab === 'items'
                ? 'Search by name, use, obtain method…'
                : 'Search by name, material, or character…'
            }
            className="w-full bg-slate-800/60 border border-slate-700/60 rounded-lg pl-8 pr-3 py-2 text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-teal-500/40"
          />
        </div>

        {/* Section filter — items only, hidden during search */}
        {tab === 'items' && !isSearching && (
          <div className="flex flex-wrap gap-1">
            {sections.map(s => (
              <button
                key={s}
                onClick={() => setSection(s)}
                className={cn(
                  'px-2 py-0.5 rounded text-xs border transition-colors',
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

      {/* Content */}
      <div className="glass-panel p-4">
        {tab === 'items' && (
          <>
            {/* Result count */}
            <div className="text-xs text-slate-600 mb-4">
              {isSearching
                ? `${filteredItems.length} result${filteredItems.length !== 1 ? 's' : ''}`
                : section !== 'all'
                  ? `${filteredItems.length} items in ${section}`
                  : `${items.length} items across ${sections.length - 1} sections`
              }
            </div>

            {filteredItems.length === 0 ? (
              <p className="py-8 text-center text-sm text-slate-600">No items match "{query}"</p>
            ) : isSearching || section !== 'all' ? (
              /* Flat grid when filtered/searching */
              <div className="grid grid-cols-2 gap-2">
                {filteredItems.map(it => <ItemCard key={it.id} item={it} />)}
              </div>
            ) : (
              /* Grouped view with collapsible sections */
              groupedItems.map(({ section: s, items: si }) => (
                <ItemSection key={s} section={s} items={si} collapsible={true} />
              ))
            )}
          </>
        )}

        {tab === 'weapons' && (
          <>
            <div className="text-xs text-slate-600 mb-4">
              {isSearching
                ? `${filteredWeapons.length} weapon${filteredWeapons.length !== 1 ? 's' : ''}`
                : `${weapons.length} weapons total — ${weapons.length - 4} upgradeable + 4 guest`
              }
            </div>

            {filteredWeapons.length === 0 ? (
              <p className="py-8 text-center text-sm text-slate-600">No weapons match "{query}"</p>
            ) : isSearching ? (
              <div className="grid grid-cols-2 gap-2">
                {filteredWeapons.map(w => <WeaponCard key={w.id} weapon={w} />)}
              </div>
            ) : (
              <>
                {groupedWeapons.map(({ character, weapons: cw }) => (
                  <WeaponSection key={character} character={character} weapons={cw} />
                ))}
                {groupedGuests.length > 0 && (
                  <>
                    <div className="border-t border-slate-700/40 pt-4 mb-4">
                      <p className="text-xs text-slate-600 mb-3">Guest &amp; temporary characters — weapons cannot be purchased or upgraded</p>
                      {groupedGuests.map(({ character, weapons: cw }) => (
                        <WeaponSection key={character} character={character} weapons={cw} guest />
                      ))}
                    </div>
                  </>
                )}
              </>
            )}
          </>
        )}
      </div>
    </div>
  )
}
