import { useState, useMemo } from 'react'
import { Search, X } from 'lucide-react'
import { cn } from '../../lib/utils'
import type { RefinementAbility } from '../../types'

interface Props {
  refinement: RefinementAbility[]
}

// ── Category definitions ─────────────────────────────────────────────────────

type Category = 'all' | 'magic' | 'items' | 'ammo' | 'gf' | 'cardmod'

const CATEGORIES: { id: Category; label: string; abilities: string[] }[] = [
  { id: 'all',     label: 'All',         abilities: [] },
  {
    id: 'magic',   label: 'Magic RF',
    abilities: ['T Mag-RF','I Mag-RF','F Mag-RF','L Mag-RF','Mid Mag-RF','High Mag-RF','Time Mag-RF','ST Mag-RF','Supt Mag-RF','Forbid Mag-RF'],
  },
  {
    id: 'items',   label: 'Items & Meds',
    abilities: ['Recov Med-RF','ST Med-RF','Med LV UP','Forbid Med-RF'],
  },
  {
    id: 'ammo',    label: 'Ammo',
    abilities: ['Ammo-RF'],
  },
  {
    id: 'gf',      label: 'GF & Tools',
    abilities: ['GFRecov Med-RF','GFAbl Med-RF','Tool-RF'],
  },
  { id: 'cardmod', label: 'Card Mod',    abilities: ['Card Mod'] },
]

// ── Card Mod level groups ─────────────────────────────────────────────────────

type CardGroup = 'all' | 'monster' | 'boss' | 'gfcard' | 'player'

const CARD_GROUP_META: { id: CardGroup; label: string; sub: { label: string; cards: string[] }[] }[] = [
  {
    id: 'monster', label: 'Monster',
    sub: [
      { label: 'L1', cards: ['Geezard','Funguar','Bite Bug','Red Bat','Blobra','Gayla','Gesper','Fastitocalon-F','Blood Soul','Caterchipillar','Cockatrice'] },
      { label: 'L2', cards: ['Grat','Buel','Mesmerize','Glacial Eye','Belhelmel','Thrustaevis','Anacondaur','Creeps','Grendel','Jelleye','Grand Mantis'] },
      { label: 'L3', cards: ['Forbidden','Armadodo','Tri-Face','Fastitocalon','Snow Lion','Ochu','SAM08G','Death Claw','Cactuar','Tonberry','Abyss Worm'] },
      { label: 'L4', cards: ['Turtapod','Vysage','T-Rexaur','Bomb','Blitz','Wendigo','Torama','Imp','Blue Dragon','Adamantoise','Hexadragon'] },
      { label: 'L5', cards: ['Iron Giant','Behemoth','Chimera','PuPu','Elastoid','GIM47N','Malboro','Ruby Dragon','Elnoyle','Tonberry King','Wedge, Biggs'] },
    ],
  },
  {
    id: 'boss', label: 'Boss',
    sub: [
      { label: 'L6', cards: ['Fujin, Raijin','Elvoret','X-ATM092','Granaldo','Gerogero','Iguion','Abadon','Trauma','Oilboyle','Shumi Tribe','Krysta'] },
      { label: 'L7', cards: ['Propagator','Jumbo Cactuar','Tri-Point','Gargantua','Mobile Type 8','Sphinxara','Tiamat','BGH251F2','Red Giant','Catoblepas','Ultima Weapon'] },
    ],
  },
  {
    id: 'gfcard', label: 'GF',
    sub: [
      { label: 'L8', cards: ['Chubby Chocobo','Angelo','Gilgamesh','MiniMog','Chicobo','Quezacotl','Shiva','Ifrit','Siren','Sacred','Minotaur'] },
      { label: 'L9', cards: ['Carbuncle','Diablos','Leviathan','Odin','Pandemona','Cerberus','Alexander','Phoenix','Bahamut','Doomtrain','Eden'] },
    ],
  },
  {
    id: 'player', label: 'Player',
    sub: [
      { label: 'L10', cards: ['Ward','Kiros','Laguna','Selphie','Quistis','Irvine','Zell','Rinoa','Edea','Seifer','Squall'] },
    ],
  },
]

// ── Per-ability accent colours ────────────────────────────────────────────────

const ABILITY_ACCENT: Record<string, { text: string; badge: string }> = {
  'T Mag-RF':      { text: 'text-yellow-400',  badge: 'bg-yellow-400/10 text-yellow-400 border-yellow-400/25' },
  'I Mag-RF':      { text: 'text-sky-400',     badge: 'bg-sky-400/10 text-sky-400 border-sky-400/25' },
  'F Mag-RF':      { text: 'text-orange-400',  badge: 'bg-orange-400/10 text-orange-400 border-orange-400/25' },
  'L Mag-RF':      { text: 'text-emerald-400', badge: 'bg-emerald-400/10 text-emerald-400 border-emerald-400/25' },
  'Mid Mag-RF':    { text: 'text-violet-400',  badge: 'bg-violet-400/10 text-violet-400 border-violet-400/25' },
  'High Mag-RF':   { text: 'text-rose-400',    badge: 'bg-rose-400/10 text-rose-400 border-rose-400/25' },
  'Time Mag-RF':   { text: 'text-indigo-400',  badge: 'bg-indigo-400/10 text-indigo-400 border-indigo-400/25' },
  'ST Mag-RF':     { text: 'text-purple-400',  badge: 'bg-purple-400/10 text-purple-400 border-purple-400/25' },
  'Supt Mag-RF':   { text: 'text-teal-400',    badge: 'bg-teal-400/10 text-teal-400 border-teal-400/25' },
  'Forbid Mag-RF': { text: 'text-red-400',     badge: 'bg-red-400/10 text-red-400 border-red-400/25' },
  'Recov Med-RF':  { text: 'text-green-400',   badge: 'bg-green-400/10 text-green-400 border-green-400/25' },
  'ST Med-RF':     { text: 'text-amber-400',   badge: 'bg-amber-400/10 text-amber-400 border-amber-400/25' },
  'Med LV UP':     { text: 'text-cyan-400',    badge: 'bg-cyan-400/10 text-cyan-400 border-cyan-400/25' },
  'Forbid Med-RF': { text: 'text-pink-400',    badge: 'bg-pink-400/10 text-pink-400 border-pink-400/25' },
  'Ammo-RF':       { text: 'text-orange-300',  badge: 'bg-orange-300/10 text-orange-300 border-orange-300/25' },
  'Tool-RF':       { text: 'text-slate-300',   badge: 'bg-slate-300/10 text-slate-300 border-slate-300/25' },
  'GFRecov Med-RF':{ text: 'text-lime-400',    badge: 'bg-lime-400/10 text-lime-400 border-lime-400/25' },
  'GFAbl Med-RF':  { text: 'text-violet-300',  badge: 'bg-violet-300/10 text-violet-300 border-violet-300/25' },
  'Card Mod':      { text: 'text-yellow-300',  badge: 'bg-yellow-300/10 text-yellow-300 border-yellow-300/25' },
}
const fallbackAccent = { text: 'text-teal-400', badge: 'bg-teal-400/10 text-teal-400 border-teal-400/25' }

// ── Recipe row ────────────────────────────────────────────────────────────────

function RecipeRow({
  from, fromQty, to, toQty, striped,
}: { from: string; fromQty: number; to: string; toQty: number; striped?: boolean }) {
  return (
    <div className={cn('flex items-center gap-2 px-3 py-1.5 text-xs', striped && 'bg-slate-800/25')}>
      <span className="text-slate-500 font-mono w-5 text-right shrink-0">{fromQty}×</span>
      <span className="text-slate-200 flex-1 min-w-0 truncate">{from}</span>
      <span className="text-slate-600 shrink-0">→</span>
      <span className="text-emerald-300 font-medium flex-1 min-w-0 truncate text-right">
        {toQty}× {to}
      </span>
    </div>
  )
}

// ── Ability panel (always-expanded) ──────────────────────────────────────────

function AbilityPanel({ ability, entries }: { ability: string; entries: RefinementAbility['entries'] }) {
  const accent = ABILITY_ACCENT[ability] ?? fallbackAccent
  return (
    <div className="glass-panel overflow-hidden">
      <div className="flex items-center justify-between px-3 py-2 bg-slate-800/50 border-b border-slate-700/40">
        <span className={cn('text-xs font-semibold', accent.text)}>{ability}</span>
        <span className="text-[10px] text-slate-600">{entries.length}</span>
      </div>
      {entries.map((e, i) => (
        <RecipeRow key={i} striped={i % 2 === 1} {...e} />
      ))}
    </div>
  )
}

// ── Main component ────────────────────────────────────────────────────────────

export function RefinementView({ refinement }: Props) {
  const [query,      setQuery]      = useState('')
  const [category,   setCategory]   = useState<Category>('all')
  const [cardGroup,  setCardGroup]  = useState<CardGroup>('all')
  const [expanded,   setExpanded]   = useState<Set<string>>(new Set())

  const abilityMap = useMemo(
    () => new Map(refinement.map(r => [r.ability, r])),
    [refinement],
  )
  const cardMod = abilityMap.get('Card Mod')!
  const cardEntryMap = useMemo(
    () => new Map(cardMod.entries.map(e => [e.from, e])),
    [cardMod],
  )

  // ── Search results: flat rows across all abilities ──────────────────────────
  const searchResults = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (q.length < 2) return []
    const out: Array<{ ability: string; from: string; fromQty: number; to: string; toQty: number }> = []
    for (const r of refinement) {
      for (const e of r.entries) {
        if (e.from.toLowerCase().includes(q) || e.to.toLowerCase().includes(q)) {
          out.push({ ability: r.ability, ...e })
        }
      }
    }
    return out
  }, [query, refinement])

  const isSearching = query.trim().length >= 2

  // ── Toggle for "All" accordion ──────────────────────────────────────────────
  function toggleExpand(ability: string) {
    setExpanded(prev => {
      const next = new Set(prev)
      next.has(ability) ? next.delete(ability) : next.add(ability)
      return next
    })
  }

  // ── Card Mod: which sub-groups to render ────────────────────────────────────
  const cardGroupsToShow = cardGroup === 'all'
    ? CARD_GROUP_META
    : CARD_GROUP_META.filter(g => g.id === cardGroup)

  // ── Render helpers ──────────────────────────────────────────────────────────

  function renderSearchMode() {
    if (searchResults.length === 0) {
      return (
        <p className="text-center py-10 text-slate-500 text-sm">
          No recipes match <span className="text-slate-300">"{query}"</span>
        </p>
      )
    }
    return (
      <div className="glass-panel overflow-hidden">
        <div className="px-3 py-2 bg-slate-800/50 border-b border-slate-700/40 flex items-center justify-between">
          <span className="text-xs text-slate-400">{searchResults.length} result{searchResults.length !== 1 ? 's' : ''}</span>
        </div>
        {searchResults.map((r, i) => {
          const accent = ABILITY_ACCENT[r.ability] ?? fallbackAccent
          return (
            <div key={i} className={cn('flex items-center gap-2 px-3 py-1.5 text-xs', i % 2 === 1 && 'bg-slate-800/25')}>
              <span className="text-slate-500 font-mono w-5 text-right shrink-0">{r.fromQty}×</span>
              <span className="text-slate-200 flex-1 min-w-0 truncate">{r.from}</span>
              <span className="text-slate-600 shrink-0">→</span>
              <span className="text-emerald-300 font-medium flex-1 min-w-0 truncate">{r.toQty}× {r.to}</span>
              <span className={cn('text-[10px] px-1.5 py-0.5 rounded border font-medium shrink-0 hidden sm:inline', accent.badge)}>
                {r.ability}
              </span>
            </div>
          )
        })}
      </div>
    )
  }

  function renderCategoryAbilities(abilities: string[]) {
    const panels = abilities.map(a => abilityMap.get(a)).filter(Boolean) as RefinementAbility[]
    return (
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-3">
        {panels.map(r => (
          <AbilityPanel key={r.ability} ability={r.ability} entries={r.entries} />
        ))}
      </div>
    )
  }

  function renderCardMod() {
    return (
      <div className="space-y-3">
        {/* Group filter pills */}
        <div className="flex flex-wrap gap-1.5">
          {(['all', 'monster', 'boss', 'gfcard', 'player'] as CardGroup[]).map(id => {
            const meta = id === 'all' ? null : CARD_GROUP_META.find(g => g.id === id)
            const totalCards = id === 'all' ? 110 : (meta?.sub.flatMap(s => s.cards).length ?? 0)
            const label = id === 'all' ? 'All' : meta?.label ?? id
            const isActive = cardGroup === id
            return (
              <button
                key={id}
                onClick={() => setCardGroup(id)}
                className={cn(
                  'px-3 py-1 rounded text-xs border transition-colors',
                  isActive
                    ? 'bg-yellow-400/15 text-yellow-300 border-yellow-400/30'
                    : 'text-slate-500 border-slate-700/50 hover:text-slate-200 hover:border-slate-600',
                )}
              >
                {label}
                <span className="ml-1 opacity-60">({totalCards})</span>
              </button>
            )
          })}
        </div>

        {/* Card groups */}
        {cardGroupsToShow.map(group => (
          <div key={group.id}>
            {cardGroup === 'all' && (
              <p className="text-[10px] font-semibold uppercase tracking-widest text-slate-600 mb-2 px-0.5">
                {group.label} Cards
              </p>
            )}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3">
              {group.sub.map(level => (
                <div key={level.label} className="glass-panel overflow-hidden">
                  <div className="flex items-center justify-between px-3 py-2 bg-slate-800/50 border-b border-slate-700/40">
                    <span className="text-xs font-semibold text-yellow-300">{level.label}</span>
                    <span className="text-[10px] text-slate-600">{level.cards.length} cards</span>
                  </div>
                  {level.cards.map((cardName, i) => {
                    const entry = cardEntryMap.get(cardName)
                    if (!entry) return null
                    return (
                      <div key={cardName} className={cn('flex items-center gap-2 px-3 py-1.5 text-xs', i % 2 === 1 && 'bg-slate-800/25')}>
                        <span className="text-slate-300 flex-1 min-w-0 truncate">
                          {entry.fromQty > 1 && (
                            <span className="text-slate-500 font-mono mr-1">{entry.fromQty}×</span>
                          )}
                          {cardName}
                        </span>
                        <span className="text-slate-600 shrink-0">→</span>
                        <span className="text-emerald-300 font-medium shrink-0 text-right">
                          {entry.toQty > 1 && <span className="font-mono">{entry.toQty}× </span>}
                          {entry.to}
                        </span>
                      </div>
                    )
                  })}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    )
  }

  function renderAllAccordion() {
    const nonCard = refinement.filter(r => r.ability !== 'Card Mod')
    return (
      <div className="space-y-3">
        {/* Non-Card Mod: collapsible grid */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-2">
          {nonCard.map(r => {
            const accent = ABILITY_ACCENT[r.ability] ?? fallbackAccent
            const isOpen = expanded.has(r.ability)
            return (
              <div key={r.ability} className="glass-panel overflow-hidden">
                <button
                  onClick={() => toggleExpand(r.ability)}
                  className="w-full flex items-center justify-between px-3 py-2.5 hover:bg-white/5 transition-colors"
                >
                  <span className={cn('text-xs font-semibold', accent.text)}>{r.ability}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] text-slate-600">{r.entries.length} recipes</span>
                    <svg
                      className={cn('w-3 h-3 text-slate-600 transition-transform duration-150', isOpen && 'rotate-180')}
                      viewBox="0 0 12 12" fill="none"
                    >
                      <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </button>
                {isOpen && (
                  <div className="border-t border-slate-700/40">
                    {r.entries.map((e, i) => (
                      <RecipeRow key={i} striped={i % 2 === 1} {...e} />
                    ))}
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {/* Card Mod: compact summary with expand */}
        <div className="glass-panel overflow-hidden">
          <button
            onClick={() => toggleExpand('Card Mod')}
            className="w-full flex items-center justify-between px-3 py-2.5 hover:bg-white/5 transition-colors"
          >
            <span className="text-xs font-semibold text-yellow-300">Card Mod</span>
            <div className="flex items-center gap-2">
              <span className="text-[10px] text-slate-600">110 recipes</span>
              <svg
                className={cn('w-3 h-3 text-slate-600 transition-transform duration-150', expanded.has('Card Mod') && 'rotate-180')}
                viewBox="0 0 12 12" fill="none"
              >
                <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </button>
          {expanded.has('Card Mod') && (
            <div className="border-t border-slate-700/40 p-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-2">
                {CARD_GROUP_META.flatMap(g => g.sub).map(level => (
                  <div key={level.label} className="bg-slate-800/40 rounded-lg overflow-hidden border border-slate-700/40">
                    <div className="px-2 py-1.5 border-b border-slate-700/40">
                      <span className="text-[10px] font-semibold text-yellow-300">{level.label}</span>
                    </div>
                    {level.cards.map((cardName, i) => {
                      const entry = cardEntryMap.get(cardName)
                      if (!entry) return null
                      return (
                        <div key={cardName} className={cn('flex items-start gap-1 px-2 py-1 text-[10px]', i % 2 === 1 && 'bg-slate-800/30')}>
                          <span className="text-slate-400 min-w-0 flex-1 truncate leading-tight">
                            {entry.fromQty > 1 && <span className="text-slate-500">{entry.fromQty}×</span>} {cardName}
                          </span>
                          <span className="text-emerald-400 shrink-0 font-medium text-right leading-tight">
                            {entry.toQty > 1 && `${entry.toQty}×`}{entry.to}
                          </span>
                        </div>
                      )
                    })}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    )
  }

  // ── Render ────────────────────────────────────────────────────────────────

  function renderBody() {
    if (isSearching) return renderSearchMode()
    if (category === 'cardmod') return renderCardMod()
    if (category !== 'all') {
      const cat = CATEGORIES.find(c => c.id === category)!
      return renderCategoryAbilities(cat.abilities)
    }
    return renderAllAccordion()
  }

  return (
    <div className="space-y-3 pb-6 w-full">
      {/* Search + category pills */}
      <div className="space-y-2.5">
        {/* Search */}
        <div className="relative">
          <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" />
          <input
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search any item or spell…"
            className="w-full bg-slate-800/60 border border-slate-700/60 rounded-lg pl-8 pr-8 py-2 text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-teal-500/40"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300"
            >
              <X size={13} />
            </button>
          )}
        </div>

        {/* Category pills */}
        {!isSearching && (
          <div className="flex flex-wrap gap-1.5">
            {CATEGORIES.map(cat => (
              <button
                key={cat.id}
                onClick={() => setCategory(cat.id)}
                className={cn(
                  'px-3 py-1 rounded-full text-xs border transition-colors',
                  category === cat.id
                    ? 'bg-teal-500/15 text-teal-300 border-teal-500/30'
                    : 'text-slate-500 border-slate-700/50 hover:text-slate-200 hover:border-slate-600',
                )}
              >
                {cat.label}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Body */}
      {renderBody()}
    </div>
  )
}
