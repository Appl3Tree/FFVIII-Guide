import { useState, useMemo } from 'react'
import { Search, Flame, Snowflake, Zap, Mountain, Wind, Droplets, Sun, Star, ChevronDown, ChevronRight } from 'lucide-react'
import { cn } from '../../lib/utils'
import { Badge } from '../ui/Badge'
import type { Enemy } from '../../types'

interface Props {
  enemies: Enemy[]
}

type Tab = 'enemies' | 'bosses'

// ─── GF spell names (highlighted in draw lists) ───────────────────────────────
const GF_NAMES = new Set([
  'Quezacotl','Shiva','Ifrit','Siren','Brothers','Diablos',
  'Carbuncle','Leviathan','Pandemona','Cerberus','Alexander',
  'Doomtrain','Bahamut','Eden',
])

// ─── Elemental helpers ────────────────────────────────────────────────────────
const ELEM_ICONS: Record<string, React.ReactNode> = {
  fire:    <Flame size={10} />,
  ice:     <Snowflake size={10} />,
  thunder: <Zap size={10} />,
  earth:   <Mountain size={10} />,
  wind:    <Wind size={10} />,
  water:   <Droplets size={10} />,
  holy:    <Sun size={10} />,
  gravity: <Star size={10} />,
  poison:  <span className="text-[9px] leading-none">☠</span>,
}
const ELEM_LABEL: Record<string, string> = {
  fire:'Fire', ice:'Ice', thunder:'Thunder', earth:'Earth',
  poison:'Poison', wind:'Wind', water:'Water', holy:'Holy', gravity:'Gravity',
}
const ELEMENTS = ['fire','ice','thunder','earth','wind','water','holy','gravity','poison']

function elemColor(val: string): string {
  if (val.includes('(-1)') || val === 'absorb') return 'text-green-400'
  if (val === 'immune' || val === 'mag-miss' || val === 'no') return 'text-slate-500'
  if (val.includes('4'))   return 'text-red-500'
  if (val.includes('2') || val.includes('3')) return 'text-red-400'
  if (val.includes('1,5') || val === 'weak') return 'text-orange-400'
  if (val.includes('0,5')) return 'text-blue-400'
  if (val === 'yes')       return 'text-amber-400'
  return 'text-slate-500'
}
function elemShort(val: string): string {
  if (val.includes('(-1)') || val === 'absorb') return 'Absorb'
  if (val === 'immune' || val === 'no')         return 'Immune'
  if (val === 'mag-miss')                        return 'Miss'
  if (val === 'yes')                             return 'Vuln'
  if (val === 'weak')                            return '×1.5'
  return val.replace('x(','×(')
}
function isWeakness(val: string): boolean {
  if (val.includes('(-1)') || val === 'absorb') return false
  if (val === 'immune' || val === 'mag-miss' || val === 'no' || val.includes('0,5')) return false
  return val.includes('2') || val.includes('3') || val.includes('4') || val.includes('1,5') || val === 'weak' || val === 'yes'
}

// ─── Boss encounter groups (ordered by disc / area) ──────────────────────────
const BOSS_GROUPS: { label: string; color: 'teal'|'amber'|'indigo'|'violet'|'emerald'|'slate'; ids: string[] }[] = [
  { label: 'Disc 1', color: 'teal', ids: [
    'enemy-ifrit',
    'enemy-biggs-1','enemy-wedge-1','enemy-elvoret','enemy-x-atm092',
    'enemy-granaldo','enemy-raldo',
    'enemy-sacred','enemy-minotaur',
    'enemy-iguion',
    'enemy-fake-president','enemy-gerogero',
    'enemy-seifer-1','enemy-edea-1',
  ]},
  { label: 'Disc 2', color: 'amber', ids: [
    'enemy-bgh251f2-1',
    'enemy-norg-pod','enemy-left-orb','enemy-right-orb','enemy-norg',
    'enemy-bgh251f2-2',
    'enemy-raijin-1','enemy-fujin','enemy-raijin-2',
    'enemy-cerberus',
    'enemy-seifer-2','enemy-seifer-3','enemy-edea-2',
  ]},
  { label: 'Disc 3', color: 'indigo', ids: [
    'enemy-propagator',
    'enemy-mobile-type-8','enemy-left-probe','enemy-right-probe',
    'enemy-fujin-2','enemy-seifer-4',
    'enemy-adel','enemy-rinoa',
  ]},
  { label: 'Optional / Sidequests', color: 'emerald', ids: [
    'enemy-odin','enemy-diablos','enemy-tonberry-king','enemy-jumbo-cactuar',
    'enemy-bahamut','enemy-ultima-weapon','enemy-omega-weapon',
    'enemy-ufo','enemy-pupu',
  ]},
  { label: 'Ultimecia Castle', color: 'violet', ids: [
    'enemy-sphinxaur','enemy-sphinxara',
    'enemy-tri-point','enemy-trauma','enemy-droma',
    'enemy-red-giant','enemy-krysta','enemy-gargantua','enemy-catoblepas','enemy-tiamat',
  ]},
  { label: 'Final Battle', color: 'slate', ids: [
    'enemy-ultimecia-1','enemy-griever','enemy-ultimecia-griever',
    'enemy-helix','enemy-ultimecia-final','enemy-ultimecia-final-lower',
  ]},
]

const BOSS_ID_SET = new Set(BOSS_GROUPS.flatMap(g => g.ids))

// ─── Draw list renderer (highlights GF names) ────────────────────────────────
function DrawList({ spells }: { spells: string[] }) {
  if (!spells.length) return null
  return (
    <span className="flex flex-wrap gap-1">
      {spells.map((s, i) => {
        const isGF = GF_NAMES.has(s)
        return (
          <span
            key={i}
            className={cn(
              'inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded text-[10px] border',
              isGF
                ? 'bg-amber-900/40 border-amber-600/50 text-amber-200 font-medium'
                : 'bg-slate-800/60 border-slate-700/40 text-violet-300'
            )}
          >
            {isGF && <Star size={8} className="text-amber-400" />}
            {s}
          </span>
        )
      })}
    </span>
  )
}

// ─── Enemy card (regular encounters) ─────────────────────────────────────────
function EnemyCard({ enemy }: { enemy: Enemy }) {
  const [open, setOpen] = useState(false)
  const notableElems = Object.entries(enemy.elementals)
  const hasDetail = !!(enemy.drawMagic.length || enemy.mug || enemy.drop || enemy.cards.common || enemy.cards.rare || enemy.cardDrop || notableElems.length || enemy.scan)

  return (
    <div
      className={cn(
        'rounded-lg border transition-colors',
        open ? 'border-slate-600/60 bg-white/[0.03]' : 'border-slate-700/40 bg-slate-800/30',
        hasDetail && 'cursor-pointer hover:border-slate-600/50 hover:bg-white/[0.02]'
      )}
      onClick={() => hasDetail && setOpen(o => !o)}
    >
      {/* Header */}
      <div className="p-3">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-1.5 flex-wrap mb-1">
              <span className="text-sm font-medium text-slate-100 leading-tight">{enemy.name}</span>
              {enemy.lvUp
                ? <Badge variant="teal">Lv {enemy.lvMin}–{enemy.lvMax}</Badge>
                : <Badge variant="slate">Lv {enemy.lvMin === enemy.lvMax ? enemy.lvMin : `${enemy.lvMin}–${enemy.lvMax}`}</Badge>
              }
              {open && <span className="text-slate-600"><ChevronDown size={10} /></span>}
              {!open && hasDetail && <span className="text-slate-600"><ChevronRight size={10} /></span>}
            </div>
            {/* Elemental row */}
            {notableElems.length > 0 && (
              <div className="flex flex-wrap gap-1.5">
                {notableElems.map(([elem, val]) => (
                  <span key={elem} className={cn('flex items-center gap-0.5 text-[10px] font-mono', elemColor(val))}>
                    {ELEM_ICONS[elem]}{elemShort(val)}
                  </span>
                ))}
              </div>
            )}
          </div>
          <div className="shrink-0 text-right">
            <div className="text-xs font-mono text-slate-300">
              {enemy.hpMin === enemy.hpMax
                ? enemy.hpMin.toLocaleString()
                : `${enemy.hpMin.toLocaleString()}–${enemy.hpMax.toLocaleString()}`} HP
            </div>
            <div className="text-xs font-mono text-slate-600">
              {enemy.ap} AP{enemy.exp > 0 ? ` · ${enemy.exp} EXP` : ''}
            </div>
          </div>
        </div>
      </div>

      {/* Expanded detail */}
      {open && (
        <div className="px-3 pb-3 pt-1 space-y-2 border-t border-slate-700/40 text-xs">
          {enemy.drawMagic.length > 0 && (
            <div className="flex gap-2">
              <span className="text-slate-600 shrink-0 w-14 pt-0.5">Draw</span>
              <DrawList spells={enemy.drawMagic} />
            </div>
          )}
          {enemy.mug && (
            <div className="flex gap-2">
              <span className="text-slate-600 shrink-0 w-14">Mug</span>
              <span className="text-amber-300">{enemy.mug}</span>
            </div>
          )}
          {enemy.drop && (
            <div className="flex gap-2">
              <span className="text-slate-600 shrink-0 w-14">Drop</span>
              <span className="text-slate-400">{enemy.drop}</span>
            </div>
          )}
          {(enemy.cards.common || enemy.cards.rare) && (
            <div className="flex gap-2">
              <span className="text-slate-600 shrink-0 w-14">Card</span>
              <span className="text-indigo-300">
                {[enemy.cards.common, enemy.cards.rare].filter(Boolean).join(' / ')}
              </span>
            </div>
          )}
          {enemy.cardDrop && enemy.cardDrop !== 'none' && (
            <div className="flex gap-2">
              <span className="text-slate-600 shrink-0 w-14">Card Drop</span>
              <span className="text-indigo-400">{enemy.cardDrop}</span>
            </div>
          )}
          {notableElems.length > 0 && (
            <div className="flex gap-2 flex-wrap pt-0.5">
              <span className="text-slate-600 shrink-0 w-14">Elements</span>
              <span className="flex flex-wrap gap-1.5">
                {notableElems.map(([elem, val]) => (
                  <span key={elem} className={cn('flex items-center gap-0.5 text-[10px]', elemColor(val))}>
                    {ELEM_ICONS[elem]}
                    <span>{ELEM_LABEL[elem]}: {elemShort(val)}</span>
                  </span>
                ))}
              </span>
            </div>
          )}
          {enemy.scan && (
            <p className="text-slate-500 leading-relaxed pt-0.5 border-t border-slate-800/60">{enemy.scan}</p>
          )}
        </div>
      )}
    </div>
  )
}

// ─── Boss card (more info always visible) ────────────────────────────────────
function BossCard({ enemy }: { enemy: Enemy }) {
  const [open, setOpen] = useState(false)
  const notableElems = Object.entries(enemy.elementals)
  const hasDraw = enemy.drawMagic.length > 0
  const hasDrop = !!(enemy.drop)
  const hasMug  = !!(enemy.mug)

  return (
    <div className="rounded-lg border border-slate-700/40 bg-slate-800/20 overflow-hidden">
      {/* Header row */}
      <div className="flex items-start gap-3 px-3 py-2.5">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-sm font-medium text-slate-100">{enemy.name}</span>
            {enemy.lvUp
              ? <Badge variant="teal">Lv {enemy.lvMin}–{enemy.lvMax}</Badge>
              : <Badge variant="slate">Lv {enemy.lvMin === enemy.lvMax ? enemy.lvMin : `${enemy.lvMin}–${enemy.lvMax}`}</Badge>
            }
          </div>
        </div>
        <div className="shrink-0 text-right">
          <div className="text-xs font-mono text-slate-200">
            {enemy.hpMin === enemy.hpMax
              ? <><span className="text-slate-500 text-[10px]">Fixed </span>{enemy.hpMin.toLocaleString()}</>
              : `${enemy.hpMin.toLocaleString()}–${enemy.hpMax.toLocaleString()}`} HP
          </div>
          <div className="text-xs font-mono text-slate-600">
            {enemy.ap > 0 ? `${enemy.ap} AP` : 'No AP'}{enemy.exp > 0 ? ` · ${enemy.exp} EXP` : ''}
          </div>
        </div>
      </div>

      {/* Draw list (always visible, GF highlighted) */}
      {hasDraw && (
        <div className="px-3 pb-2 flex gap-2 text-xs">
          <span className="text-slate-600 shrink-0 w-12 pt-0.5">Draw</span>
          <DrawList spells={enemy.drawMagic} />
        </div>
      )}

      {/* Drop + Mug (always visible if present) */}
      {(hasDrop || hasMug) && (
        <div className="px-3 pb-2 space-y-1 text-xs">
          {hasDrop && (
            <div className="flex gap-2">
              <span className="text-slate-600 shrink-0 w-12">Drop</span>
              <span className="text-slate-300">{enemy.drop}</span>
            </div>
          )}
          {hasMug && (
            <div className="flex gap-2">
              <span className="text-slate-600 shrink-0 w-12">Mug</span>
              <span className="text-amber-300">{enemy.mug}</span>
            </div>
          )}
        </div>
      )}

      {/* Card drop */}
      {enemy.cardDrop && enemy.cardDrop !== 'none' && (
        <div className="px-3 pb-2 text-xs flex gap-2">
          <span className="text-slate-600 shrink-0 w-12">Card</span>
          <span className="text-indigo-300">{enemy.cardDrop}</span>
        </div>
      )}

      {/* Expandable: elementals + scan */}
      {(notableElems.length > 0 || enemy.scan) && (
        <>
          <button
            onClick={() => setOpen(o => !o)}
            className="w-full flex items-center gap-1.5 px-3 py-1.5 text-[10px] text-slate-600 hover:text-slate-400 border-t border-slate-800/60 transition-colors"
          >
            {open ? <ChevronDown size={10} /> : <ChevronRight size={10} />}
            {open ? 'Hide' : 'Show'} details
          </button>
          {open && (
            <div className="px-3 pb-3 space-y-2 text-xs">
              {notableElems.length > 0 && (
                <div className="flex flex-wrap gap-1.5">
                  {notableElems.map(([elem, val]) => (
                    <span key={elem} className={cn('flex items-center gap-0.5 text-[10px]', elemColor(val))}>
                      {ELEM_ICONS[elem]}
                      <span>{ELEM_LABEL[elem]}: {elemShort(val)}</span>
                    </span>
                  ))}
                </div>
              )}
              {enemy.scan && (
                <p className="text-slate-500 leading-relaxed">{enemy.scan}</p>
              )}
            </div>
          )}
        </>
      )}
    </div>
  )
}

// ─── Boss group section ───────────────────────────────────────────────────────
function BossSection({
  label, color, enemies,
}: {
  label: string
  color: 'teal'|'amber'|'indigo'|'violet'|'emerald'|'slate'
  enemies: Enemy[]
}) {
  const [collapsed, setCollapsed] = useState(false)
  if (!enemies.length) return null
  return (
    <div className="mb-5">
      <button
        className="w-full flex items-center gap-2 mb-2 group"
        onClick={() => setCollapsed(c => !c)}
      >
        <Badge variant={color}>{label}</Badge>
        <span className="text-xs text-slate-600">{enemies.length} encounter{enemies.length !== 1 ? 's' : ''}</span>
        {collapsed
          ? <ChevronRight size={12} className="text-slate-600 group-hover:text-slate-400 transition-colors" />
          : <ChevronDown  size={12} className="text-slate-600 group-hover:text-slate-400 transition-colors" />
        }
      </button>
      {!collapsed && (
        <div className="space-y-2">
          {enemies.map(e => <BossCard key={e.id} enemy={e} />)}
        </div>
      )}
    </div>
  )
}

// ─── Main view ────────────────────────────────────────────────────────────────
export function BestiaryView({ enemies }: Props) {
  const [tab, setTab]         = useState<Tab>('enemies')
  const [query, setQuery]     = useState('')
  const [elemFilter, setElemFilter] = useState<string | null>(null)

  const regularEnemies = useMemo(() => enemies.filter(e => !BOSS_ID_SET.has(e.id)), [enemies])
  const bossEnemies    = useMemo(() => enemies.filter(e =>  BOSS_ID_SET.has(e.id)), [enemies])

  const isSearching = query.trim().length > 0

  // Filter regular enemies
  const filteredRegular = useMemo(() => {
    let list = regularEnemies
    if (elemFilter) {
      list = list.filter(e => {
        const val = e.elementals[elemFilter as keyof typeof e.elementals]
        return val ? isWeakness(val) : false
      })
    }
    if (isSearching) {
      const q = query.toLowerCase()
      list = list.filter(e =>
        e.name.toLowerCase().includes(q) ||
        e.drawMagic.some(m => m.toLowerCase().includes(q)) ||
        (e.mug?.toLowerCase().includes(q)) ||
        (e.drop?.toLowerCase().includes(q)) ||
        (e.cards.common?.toLowerCase().includes(q)) ||
        (e.cards.rare?.toLowerCase().includes(q)) ||
        (e.scan?.toLowerCase().includes(q))
      )
    }
    return list
  }, [regularEnemies, query, elemFilter, isSearching])

  // Filter bosses (flat list when searching)
  const filteredBosses = useMemo(() => {
    if (!isSearching) return null
    const q = query.toLowerCase()
    return bossEnemies.filter(e =>
      e.name.toLowerCase().includes(q) ||
      e.drawMagic.some(m => m.toLowerCase().includes(q)) ||
      (e.mug?.toLowerCase().includes(q)) ||
      (e.drop?.toLowerCase().includes(q)) ||
      (e.scan?.toLowerCase().includes(q))
    )
  }, [bossEnemies, query, isSearching])

  // Build ordered boss groups
  const bossGroups = useMemo(() => {
    const map = new Map(bossEnemies.map(e => [e.id, e]))
    return BOSS_GROUPS.map(g => ({
      ...g,
      enemies: g.ids.map(id => map.get(id)).filter(Boolean) as Enemy[],
    })).filter(g => g.enemies.length > 0)
  }, [bossEnemies])

  const tabBtn = (t: Tab) => cn(
    'flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-lg border transition-colors',
    tab === t
      ? 'bg-teal-900/50 border-teal-600/50 text-teal-200'
      : 'bg-slate-800/40 border-slate-700/40 text-slate-500 hover:text-slate-300'
  )

  const toggleElem = (elem: string) => setElemFilter(f => f === elem ? null : elem)

  return (
    <div className="space-y-3 pb-6 max-w-3xl mx-auto">
      {/* Header */}
      <div className="glass-panel p-4 space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-semibold text-slate-100">Bestiary</h2>
          <div className="flex gap-1.5">
            <button onClick={() => setTab('enemies')} className={tabBtn('enemies')}>
              Enemies ({regularEnemies.length})
            </button>
            <button onClick={() => setTab('bosses')} className={tabBtn('bosses')}>
              Bosses ({bossEnemies.length})
            </button>
          </div>
        </div>

        <div className="relative">
          <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
          <input
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search name, draw magic, drops, items…"
            className="w-full bg-slate-800/60 border border-slate-700/60 rounded-lg pl-8 pr-3 py-2 text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-teal-500/40"
          />
        </div>

        {/* Element weakness filter (enemies tab only) */}
        {tab === 'enemies' && !isSearching && (
          <div>
            <p className="text-[10px] text-slate-600 mb-1.5">Filter by weakness</p>
            <div className="flex flex-wrap gap-1">
              {ELEMENTS.map(elem => (
                <button
                  key={elem}
                  onClick={() => toggleElem(elem)}
                  className={cn(
                    'flex items-center gap-1 px-2 py-0.5 rounded text-[10px] border transition-colors',
                    elemFilter === elem
                      ? 'bg-red-900/40 border-red-600/50 text-red-200'
                      : 'bg-slate-800/40 border-slate-700/40 text-slate-500 hover:text-slate-300'
                  )}
                >
                  {ELEM_ICONS[elem]}
                  {ELEM_LABEL[elem]}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="glass-panel p-4">
        {/* Enemies tab */}
        {tab === 'enemies' && (
          <>
            <div className="text-xs text-slate-600 mb-4">
              {isSearching || elemFilter
                ? `${filteredRegular.length} of ${regularEnemies.length} enemies`
                : `${regularEnemies.length} random encounter enemies`
              }
              {elemFilter && !isSearching && ` · weak to ${ELEM_LABEL[elemFilter]}`}
            </div>
            {filteredRegular.length === 0 ? (
              <p className="py-8 text-center text-sm text-slate-600">No enemies match</p>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                {filteredRegular.map(e => <EnemyCard key={e.id} enemy={e} />)}
              </div>
            )}
          </>
        )}

        {/* Bosses tab */}
        {tab === 'bosses' && (
          <>
            <div className="text-xs text-slate-600 mb-4">
              {isSearching
                ? `${(filteredBosses?.length ?? 0)} of ${bossEnemies.length} bosses`
                : `${bossEnemies.length} bosses · shown in encounter order · ✦ = drawable GF`
              }
            </div>

            {isSearching ? (
              filteredBosses?.length === 0
                ? <p className="py-8 text-center text-sm text-slate-600">No bosses match "{query}"</p>
                : <div className="space-y-2">
                    {filteredBosses?.map(e => <BossCard key={e.id} enemy={e} />)}
                  </div>
            ) : (
              bossGroups.map(g => (
                <BossSection key={g.label} label={g.label} color={g.color} enemies={g.enemies} />
              ))
            )}
          </>
        )}
      </div>
    </div>
  )
}
