import { Fragment, useState, useLayoutEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, ChevronLeft, Trophy, AlertTriangle, Skull, Swords, ShoppingBag, ChevronRight } from 'lucide-react'
import { cn } from '../../lib/utils'
import { Checkbox } from '../ui/Checkbox'
import { Badge } from '../ui/Badge'
import type { Chapter, Checkpoint, AreaEncounter, Enemy } from '../../types'

const DISC_HEADER: Record<number, { border: string; text: string; gradient: string; badge: string }> = {
  0: { border: 'border-sky-500',    text: 'text-sky-400',    gradient: 'rgba(14,165,233,0.05)',  badge: 'bg-sky-900/60 border-sky-500/40 text-sky-300' },
  1: { border: 'border-teal-500',   text: 'text-teal-400',   gradient: 'rgba(20,184,166,0.05)',  badge: 'bg-teal-900/60 border-teal-500/40 text-teal-300' },
  2: { border: 'border-indigo-500', text: 'text-indigo-400', gradient: 'rgba(99,102,241,0.05)',  badge: 'bg-indigo-900/60 border-indigo-500/40 text-indigo-300' },
  3: { border: 'border-violet-500', text: 'text-violet-400', gradient: 'rgba(139,92,246,0.05)',  badge: 'bg-violet-900/60 border-violet-500/40 text-violet-300' },
  4: { border: 'border-amber-500',  text: 'text-amber-400',  gradient: 'rgba(245,158,11,0.05)',  badge: 'bg-amber-900/60 border-amber-500/40 text-amber-300' },
}

const ENCOUNTERS_RE = /^\{\{ENCOUNTERS:(\d+)\}\}$/

interface Props {
  chapter: Chapter
  completedItems: Record<string, boolean>
  onToggleItem: (id: string) => void
  enemies?: Enemy[]
  prevChapter?: Chapter | null
  nextChapter?: Chapter | null
  onNavigate?: (id: string) => void
}

// ─── Inline rendering ─────────────────────────────────────────────────────────

function renderInline(text: string) {
  const parts = text.split(/(\*\*[^*]+\*\*)/)
  if (parts.length === 1) return <>{text}</>
  return (
    <>
      {parts.map((part, i) =>
        part.startsWith('**') && part.endsWith('**')
          ? <strong key={i} className="text-white font-semibold">{part.slice(2, -2)}</strong>
          : <span key={i}>{part}</span>
      )}
    </>
  )
}

// ─── Tag pills ────────────────────────────────────────────────────────────────

const SPELL_COLORS: Record<string, string> = {
  fire: 'bg-orange-950/50 border-orange-700/40 text-orange-300',
  fira: 'bg-orange-950/50 border-orange-700/40 text-orange-300',
  firaga: 'bg-orange-950/50 border-orange-700/40 text-orange-300',
  blizzard: 'bg-sky-950/50 border-sky-700/40 text-sky-300',
  blizzara: 'bg-sky-950/50 border-sky-700/40 text-sky-300',
  blizzaga: 'bg-sky-950/50 border-sky-700/40 text-sky-300',
  thunder: 'bg-yellow-950/50 border-yellow-700/40 text-yellow-300',
  thundara: 'bg-yellow-950/50 border-yellow-700/40 text-yellow-300',
  thundaga: 'bg-yellow-950/50 border-yellow-700/40 text-yellow-300',
  water: 'bg-cyan-950/50 border-cyan-700/40 text-cyan-300',
  flare: 'bg-rose-950/50 border-rose-700/40 text-rose-300',
  ultima: 'bg-purple-950/50 border-purple-700/40 text-purple-200',
  meteor: 'bg-pink-950/50 border-pink-700/40 text-pink-300',
  holy: 'bg-yellow-100/10 border-yellow-200/20 text-yellow-100',
  aura: 'bg-teal-950/50 border-teal-600/40 text-teal-300',
  cure: 'bg-emerald-950/50 border-emerald-700/40 text-emerald-300',
  cura: 'bg-emerald-950/50 border-emerald-700/40 text-emerald-300',
  curaga: 'bg-emerald-950/50 border-emerald-700/40 text-emerald-300',
  death: 'bg-slate-900/80 border-slate-600/60 text-slate-300',
  bio: 'bg-green-950/50 border-green-700/40 text-green-300',
  demi: 'bg-neutral-900/60 border-neutral-600/40 text-neutral-300',
  gravity: 'bg-neutral-900/60 border-neutral-600/40 text-neutral-300',
  pain: 'bg-purple-950/50 border-purple-700/40 text-purple-300',
  meltdown: 'bg-red-950/60 border-red-700/40 text-red-300',
  triple: 'bg-violet-950/50 border-violet-600/40 text-violet-200',
  double: 'bg-indigo-950/50 border-indigo-700/40 text-indigo-300',
}

function SpellPill({ name, variant = 'draw' }: { name: string; variant?: 'draw' | 'mug' | 'gf' }) {
  const key = name.toLowerCase().replace(/[^a-z]/g, '')
  const spellColor = SPELL_COLORS[key]
  const fallbacks = {
    draw: 'bg-violet-950/40 border-violet-700/40 text-violet-200',
    mug:  'bg-amber-950/40 border-amber-700/40 text-amber-200',
    gf:   'bg-emerald-950/40 border-emerald-700/40 text-emerald-200',
  }
  return (
    <span className={cn(
      'inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-medium border whitespace-nowrap',
      spellColor ?? fallbacks[variant]
    )}>
      {name}
    </span>
  )
}

// ─── Refinement chain renderer ────────────────────────────────────────────────

function isChainLine(text: string): boolean {
  // Strip bullet/number prefix before testing
  const stripped = text.replace(/^[-\s\d.·]+/, '').trim()
  const parts = stripped.split(' → ')
  return (
    parts.length >= 3 &&
    parts.every(p => p.trim().length >= 1 && p.trim().length <= 75)
  )
}

function ChainLine({ raw }: { raw: string }) {
  // Find the actual start of the chain in the text
  const stripped = raw.replace(/^[-\s\d.·]+/, '')
  const parts = stripped.split(' → ')

  return (
    <div className="flex items-center flex-wrap gap-1 py-0.5 pl-1">
      {parts.map((part, i) => {
        const isLast = i === parts.length - 1
        const clean = part.trim()
        return (
          <Fragment key={i}>
            <span className={cn(
              'inline-flex items-center px-2 py-1 rounded-md text-xs font-medium border leading-tight',
              isLast
                ? 'bg-teal-900/30 border-teal-700/40 text-teal-200'
                : 'bg-slate-800/70 border-slate-700/40 text-slate-200'
            )}>
              {renderInline(clean)}
            </span>
            {!isLast && (
              <ChevronRight size={11} className="text-slate-600 shrink-0" />
            )}
          </Fragment>
        )
      })}
    </div>
  )
}

// ─── Shop / price-list renderer ───────────────────────────────────────────────

interface ShopItem { name: string; price: number }

// Matches "item name (N Gil)" or "item name: N Gil"
const PRICE_RE = /([^·,;\n([\]]{2,40}?)\s*\(\s*(\d[\d,]*)\s*Gil\s*\)/gi

function extractPrices(text: string): ShopItem[] {
  const results: ShopItem[] = []
  const seen = new Set<string>()
  for (const m of text.matchAll(PRICE_RE)) {
    const name = m[1].trim().replace(/^\*+|\*+$/g, '').replace(/^[-·\s]+/, '').trim()
    if (name.length < 2 || seen.has(name.toLowerCase())) continue
    seen.add(name.toLowerCase())
    results.push({ name, price: parseInt(m[2].replace(/,/g, '')) })
  }
  return results
}

function hasEnoughPrices(text: string): boolean {
  return (text.match(PRICE_RE) ?? []).length >= 3
}

function ShopGrid({ items, label }: { items: ShopItem[]; label?: string }) {
  const [open, setOpen] = useState(false)

  return (
    <div className="rounded-xl border border-emerald-900/40 bg-emerald-950/15 overflow-hidden">
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center gap-2.5 px-4 py-2.5 hover:bg-emerald-900/10 transition-colors text-left"
      >
        <ShoppingBag size={12} className="text-emerald-400 shrink-0" />
        <span className="text-xs font-semibold text-emerald-300 uppercase tracking-wide flex-1">
          {label ?? 'Shop Inventory'}
        </span>
        <span className="text-xs text-slate-500">{items.length} items</span>
        <ChevronDown
          size={12}
          className={cn('text-slate-500 transition-transform duration-200', open && 'rotate-180')}
        />
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.18, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="px-3 pb-3 pt-1 grid grid-cols-2 gap-1.5">
              {items.map((item, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between px-2.5 py-1.5 rounded-lg bg-slate-800/50 border border-slate-700/30 text-xs gap-2 min-w-0"
                >
                  <span className="text-slate-200 font-medium truncate">{item.name}</span>
                  <span className="text-emerald-400/80 font-mono shrink-0">{item.price.toLocaleString()}</span>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// ─── Key-value pipe table (e.g. salary table, junction values) ────────────────

function isKVTable(text: string): boolean {
  const parts = text.split(' | ')
  if (parts.length < 4) return false
  return parts.filter(p => /^[^:]+:\s*.+/.test(p.trim())).length >= parts.length - 1
}

function KVTable({ text }: { text: string }) {
  const parts = text.split(' | ').map(p => {
    const colon = p.indexOf(':')
    if (colon < 0) return null
    return { key: p.slice(0, colon).trim(), val: p.slice(colon + 1).trim() }
  }).filter(Boolean) as Array<{ key: string; val: string }>

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-1 py-0.5">
      {parts.map((p, i) => (
        <div key={i} className="flex items-center justify-between px-2.5 py-1 rounded bg-slate-800/40 border border-slate-700/25 text-xs gap-2">
          <span className="text-slate-400 shrink-0">{p.key}</span>
          <span className="text-slate-200 font-medium font-mono">{p.val}</span>
        </div>
      ))}
    </div>
  )
}

// ─── Line / block rendering ───────────────────────────────────────────────────

function autoSplitProse(text: string): string[] {
  if (text.length <= 320 || text.startsWith('- ') || text.match(/^\d+\./)) return [text]
  const parts = text.split(/(?<=[.!?])\s+(?=[A-Z*([\d])/)
  if (parts.length <= 1) return [text]
  const chunks: string[] = []
  let cur = ''
  for (const part of parts) {
    if (cur && cur.length + 1 + part.length > 350) { chunks.push(cur); cur = part }
    else { cur = cur ? cur + ' ' + part : part }
  }
  if (cur) chunks.push(cur)
  return chunks.length > 1 ? chunks : [text]
}

function renderLines(lines: string[]) {
  const anyBullets = lines.some(l => l.startsWith('- ') || l.match(/^\d+\.\s/))
  const allBullets = anyBullets && lines.every(l => l.startsWith('- ') || l.match(/^\d+\.\s/))

  if (allBullets) {
    return (
      <ul className="space-y-1.5 pl-1">
        {lines.map((line, i) => {
          const isNum = /^\d+\.\s/.test(line)
          const content = isNum ? line.replace(/^\d+\.\s/, '') : line.slice(2)
          const isChain = isChainLine(content)
          return (
            <li key={i} className="flex items-start gap-2 text-sm text-slate-300 leading-relaxed">
              {!isChain && (
                <span className={cn('shrink-0 mt-0.5 font-mono text-[11px] w-4 text-right', isNum ? 'text-slate-500' : 'text-teal-500/60')}>
                  {isNum ? line.match(/^(\d+)\./)?.[1] + '.' : '▹'}
                </span>
              )}
              <span className={isChain ? 'flex-1' : 'flex-1'}>
                {isChain ? <ChainLine raw={content} /> : renderInline(content)}
              </span>
            </li>
          )
        })}
      </ul>
    )
  }

  if (anyBullets) {
    return (
      <div className="space-y-1.5">
        {lines.map((line, i) => {
          const isBullet = line.startsWith('- ') || line.match(/^\d+\.\s/)
          if (isBullet) {
            const content = line.replace(/^-\s|^\d+\.\s/, '')
            const isChain = isChainLine(content)
            return (
              <div key={i} className="flex items-start gap-2 text-sm text-slate-300 leading-relaxed">
                {!isChain && <span className="text-teal-500/60 shrink-0 mt-0.5">▹</span>}
                <span className="flex-1">
                  {isChain ? <ChainLine raw={content} /> : renderInline(content)}
                </span>
              </div>
            )
          }
          return (
            <p key={i} className="text-sm text-slate-300 leading-relaxed">{renderInline(line)}</p>
          )
        })}
      </div>
    )
  }

  if (lines.length === 1) {
    const line = lines[0]
    if (isChainLine(line)) return <ChainLine raw={line} />
    if (isKVTable(line))   return <KVTable text={line} />
    return <p className="text-sm text-slate-300 leading-relaxed max-w-[80ch]">{renderInline(line)}</p>
  }
  return (
    <div className="space-y-2">
      {lines.map((line, i) => {
        if (isChainLine(line)) return <ChainLine key={i} raw={line} />
        if (isKVTable(line))   return <KVTable key={i} text={line} />
        return <p key={i} className="text-sm text-slate-300 leading-relaxed max-w-[80ch]">{renderInline(line)}</p>
      })}
    </div>
  )
}

// ─── Callout paragraph block ──────────────────────────────────────────────────

const CALLOUT_RE = /^\*\*([^*]{5,})\*\*\s*(?:[:—]|\([^)]+\):)/
const WARNING_WORDS = /warning|critical|missable|important|note/i
const SHOP_WORDS    = /shop|store|sell|purchase|available.*gil|buy/i
const COLLAPSE_AT   = 10   // lines before adding Show more

function renderParagraphBlock(text: string) {
  const calloutMatch = text.match(CALLOUT_RE)

  if (calloutMatch) {
    const title    = calloutMatch[1]
    const rest     = text.slice(calloutMatch[0].length).trim()
    const rawLines = rest.split('\n').filter(l => l.trim().length > 0)
    const lines    = rawLines.flatMap(l => autoSplitProse(l))

    const isWarning = WARNING_WORDS.test(title)
    const isShop    = SHOP_WORDS.test(title)

    // Shop callout → shop card if the body has priced items
    if (isShop && hasEnoughPrices(rest)) {
      const items = extractPrices(rest)
      if (items.length >= 3) return <ShopGrid items={items} label={title} />
    }

    // Price-heavy callout (shop mentioned inline even without "shop" title)
    if (hasEnoughPrices(rest)) {
      const items = extractPrices(rest)
      if (items.length >= 4) return <ShopGrid items={items} label={title} />
    }

    return (
      <CollapsibleCallout
        title={title}
        lines={lines}
        isWarning={isWarning}
        collapseAt={COLLAPSE_AT}
      />
    )
  }

  // Plain paragraph
  const rawLines = text.split('\n').filter(l => l.trim().length > 0)

  // Detect shop-style plain paragraph
  if (hasEnoughPrices(text)) {
    const items = extractPrices(text)
    if (items.length >= 4) return <ShopGrid items={items} />
  }

  const lines = rawLines.flatMap(l => autoSplitProse(l))
  return renderLines(lines)
}

// ─── Collapsible callout ──────────────────────────────────────────────────────

function CollapsibleCallout({
  title,
  lines,
  isWarning,
  collapseAt,
}: {
  title: string
  lines: string[]
  isWarning: boolean
  collapseAt: number
}) {
  const [expanded, setExpanded] = useState(false)
  const needsCollapse = lines.length > collapseAt
  const visible = needsCollapse && !expanded ? lines.slice(0, collapseAt) : lines

  return (
    <div className={isWarning ? 'callout-amber' : 'callout-teal'}>
      <p className={cn(
        'text-xs font-bold uppercase tracking-wide mb-2',
        isWarning ? 'text-amber-400' : 'text-teal-400'
      )}>
        {title}
      </p>
      {visible.length > 0 && renderLines(visible)}
      {needsCollapse && (
        <button
          onClick={() => setExpanded(e => !e)}
          className={cn(
            'mt-2 flex items-center gap-1 text-xs font-medium transition-colors',
            isWarning ? 'text-amber-500 hover:text-amber-300' : 'text-teal-500 hover:text-teal-300'
          )}
        >
          <ChevronDown size={11} className={cn('transition-transform duration-200', expanded && 'rotate-180')} />
          {expanded ? 'Show less' : `Show ${lines.length - collapseAt} more lines`}
        </button>
      )}
    </div>
  )
}

// ─── Checkpoint card ──────────────────────────────────────────────────────────

function CheckpointCard({ cp, completed, onToggle }: {
  cp: Checkpoint
  completed: boolean
  onToggle: () => void
}) {
  const isAch = cp.type === 'achievement'
  const [open, setOpen] = useState(!completed)

  return (
    <div className={cn(
      'rounded-xl border overflow-hidden transition-opacity duration-200',
      isAch ? 'bg-amber-950/20 border-yellow-600/40' : 'bg-amber-950/30 border-amber-600/50',
      completed && 'opacity-50',
    )}>
      <div className="flex items-start gap-3 px-4 py-3">
        <Checkbox checked={completed} onChange={onToggle} className="mt-0.5 shrink-0" />
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 flex-wrap">
              {isAch
                ? <Trophy size={13} className="text-yellow-400 shrink-0" />
                : <AlertTriangle size={13} className="text-amber-400 shrink-0" />
              }
              <span className={cn(
                'text-sm font-semibold',
                completed ? 'line-through text-slate-500' : isAch ? 'text-yellow-200' : 'text-amber-200'
              )}>
                {cp.label}
              </span>
              {cp.achievementType && (
                <Badge variant={achTypeBadge(cp.achievementType)}>{cp.achievementType}</Badge>
              )}
            </div>
            <button onClick={() => setOpen(o => !o)} className="text-slate-600 hover:text-slate-400 shrink-0">
              <ChevronDown size={13} className={cn('transition-transform duration-200', open && 'rotate-180')} />
            </button>
          </div>

          <AnimatePresence initial={false}>
            {open && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.18, ease: 'easeInOut' }}
                className="overflow-hidden"
              >
                <p className={cn(
                  'text-xs leading-relaxed mt-2',
                  isAch ? 'text-yellow-100/70' : 'text-amber-100/70'
                )}>
                  {cp.description}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}

function achTypeBadge(t: string) {
  const map: Record<string, 'violet' | 'teal' | 'emerald' | 'amber' | 'indigo'> = {
    gf: 'violet', cumulative: 'teal', story: 'emerald', missable: 'amber',
  }
  return map[t] ?? 'indigo'
}

// ─── Area encounter card ──────────────────────────────────────────────────────

function AreaEncounterCard({ area, enemies }: { area: AreaEncounter; enemies: Enemy[] }) {
  const enemyMap = new Map(enemies.map(e => [e.id, e]))
  const [expanded, setExpanded] = useState(false)

  return (
    <div className="rounded-xl border border-violet-800/30 bg-violet-950/20 overflow-hidden">
      {/* Header */}
      <button
        onClick={() => setExpanded(e => !e)}
        className="w-full flex items-center gap-2 px-4 py-2 bg-violet-900/20 border-b border-violet-800/20 hover:bg-violet-900/30 transition-colors text-left"
      >
        <Swords size={11} className="text-violet-400 shrink-0" />
        <span className="text-xs text-violet-300 font-semibold uppercase tracking-wider flex-1">{area.area}</span>
        <span className="text-[10px] text-violet-600">{area.enemies.length} enemies</span>
        <ChevronDown size={11} className={cn('text-violet-600 transition-transform duration-200 ml-1', expanded && 'rotate-180')} />
      </button>

      {/* Enemy rows — always show a compact summary; expand shows full details */}
      <div className="divide-y divide-violet-900/20">
        {area.enemies.map((ae, ei) => {
          const enemy = enemyMap.get(ae.id)
          return (
            <EnemyRow key={ei} ae={ae} enemy={enemy ?? null} showFull={expanded} />
          )
        })}
      </div>
    </div>
  )
}

function EnemyRow({
  ae,
  enemy,
  showFull,
}: {
  ae: { id: string; name: string; notes?: string; lvMin?: number; lvMax?: number }
  enemy: Enemy | null
  showFull: boolean
}) {
  const [noteOpen, setNoteOpen] = useState(false)
  const notes = ae.notes ?? ''
  const noteLong = notes.length > 90

  const dispLvMin = ae.lvMin ?? enemy?.lvMin ?? 1
  const dispLvMax = ae.lvMax ?? enemy?.lvMax ?? 1
  const showRange = ae.lvMin !== undefined ? dispLvMin !== dispLvMax : (enemy?.lvUp ?? false)

  const draws  = enemy?.drawMagic ?? []
  const mugRaw = enemy?.mug && enemy.mug !== 'has nothing' ? enemy.mug.split(',')[0].trim() : null

  return (
    <div className="px-4 py-2.5 text-xs space-y-1.5">
      {/* Name + stats row */}
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <div className="flex items-center gap-2 min-w-0">
          <span className="text-slate-100 font-semibold">{ae.name}</span>
          {enemy && (
            <span className="text-slate-600 font-mono text-[10px]">
              {showRange ? `Lv ${dispLvMin}–${dispLvMax}` : `Lv ${dispLvMin}`}
              {' · '}{enemy.hpMin.toLocaleString()} HP
            </span>
          )}
        </div>
        {/* Elemental weakness badges (shown when expanded) */}
        {showFull && enemy && (() => {
          const weaks = Object.entries(enemy.elementals)
            .filter(([, v]) => v && /^x\s*[2-9]/i.test(v))
            .map(([k]) => k)
          return weaks.length > 0 ? (
            <div className="flex gap-1 flex-wrap">
              {weaks.map(w => (
                <span key={w} className="px-1.5 py-0.5 rounded text-[10px] bg-red-950/40 border border-red-700/40 text-red-300 font-medium capitalize">
                  {w}
                </span>
              ))}
            </div>
          ) : null
        })()}
      </div>

      {/* Draw / Mug pills */}
      {(draws.length > 0 || mugRaw) && (
        <div className="flex items-start gap-x-3 gap-y-1 flex-wrap">
          {draws.length > 0 && (
            <div className="flex items-center gap-1 flex-wrap">
              <span className="text-violet-400 font-medium text-[10px] uppercase tracking-wide shrink-0">Draw</span>
              <div className="flex gap-1 flex-wrap">
                {(showFull ? draws : draws.slice(0, 4)).map(s => (
                  <SpellPill key={s} name={s} variant="draw" />
                ))}
                {!showFull && draws.length > 4 && (
                  <span className="text-violet-600 text-[10px] self-center">+{draws.length - 4}</span>
                )}
              </div>
            </div>
          )}
          {mugRaw && (
            <div className="flex items-center gap-1">
              <span className="text-amber-400 font-medium text-[10px] uppercase tracking-wide shrink-0">Mug</span>
              <SpellPill name={mugRaw} variant="mug" />
            </div>
          )}
        </div>
      )}

      {/* Notes */}
      {notes && (
        <div className="text-[11px] text-slate-500 leading-relaxed">
          {noteLong && !noteOpen
            ? (
              <>
                {notes.slice(0, 90)}…{' '}
                <button
                  onClick={() => setNoteOpen(true)}
                  className="text-slate-400 hover:text-slate-200 underline underline-offset-2"
                >
                  more
                </button>
              </>
            )
            : (
              <>
                {notes}
                {noteLong && (
                  <button
                    onClick={() => setNoteOpen(false)}
                    className="ml-1 text-slate-500 hover:text-slate-300 underline underline-offset-2"
                  >
                    less
                  </button>
                )}
              </>
            )
          }
        </div>
      )}
    </div>
  )
}

// ─── Boss stat block ──────────────────────────────────────────────────────────

function bulletColor(key: string): string {
  const k = key.toLowerCase()
  if (k === 'draw')        return 'text-violet-300'
  if (k === 'steal' || k === 'mug') return 'text-amber-300'
  if (k === 'weakness')    return 'text-red-400'
  if (k === 'status weak') return 'text-orange-400'
  if (k === 'card drop')   return 'text-indigo-300'
  if (k === 'exp')         return 'text-teal-400'
  return 'text-slate-400'
}

function BossStatBlock({ text }: { text: string }) {
  const lines = text.split('\n')
  const header  = lines[0]
  const bullets = lines.slice(1).filter(l => l.startsWith('- '))

  const nameMatch = header.match(/\*\*Boss:\s*(.+?)\*\*/)
  const lvMatch   = header.match(/\(Lv\s+([^)]+)\)/)
  const hpMatch   = header.match(/HP:\s*([\d,\s~\-]+?)(?:\s*\||$)/)
  const apMatch   = header.match(/AP:\s*(\d+)/)
  const expMatch  = header.match(/EXP:\s*([\d,]+)/)
  const name      = nameMatch?.[1] ?? 'Boss'

  return (
    <div className="px-4 py-3 space-y-2">
      <div className="flex items-center gap-2 flex-wrap">
        <Skull size={13} className="text-red-400 shrink-0" />
        <span className="text-base font-bold text-red-200">{name}</span>
        {lvMatch && <Badge variant="slate">Lv {lvMatch[1].trim()}</Badge>}
        {hpMatch && <span className="text-xs font-mono text-slate-400">{hpMatch[1].trim()} HP</span>}
        {apMatch && <span className="text-xs font-mono text-slate-500">{apMatch[1]} AP</span>}
        {expMatch && expMatch[1] !== '0' && (
          <span className="text-xs font-mono text-teal-600">{expMatch[1]} EXP</span>
        )}
      </div>

      {bullets.length > 0 && (
        <>
          <div className="h-px bg-gradient-to-r from-red-800/50 to-transparent" />
          <div className="space-y-1.5">
            {bullets.map((b, i) => {
              const rest     = b.slice(2)
              const colonIdx = rest.indexOf(': ')
              const key      = colonIdx >= 0 ? rest.slice(0, colonIdx) : rest
              const val      = colonIdx >= 0 ? rest.slice(colonIdx + 2) : ''

              // Draw list → individual spell pills
              if (key.toLowerCase() === 'draw' && val) {
                // Check for level-conditional draws (contains "|" or "Lv")
                const isConditional = /Lv\s*\d|[|]/.test(val)
                if (!isConditional) {
                  const spells = val.split(/,\s*/).map(s => s.trim()).filter(Boolean)
                  return (
                    <div key={i} className="flex items-start gap-2 text-xs">
                      <span className="text-slate-500 shrink-0 w-[72px] text-right pt-0.5">Draw</span>
                      <div className="flex gap-1 flex-wrap">
                        {spells.map(s => <SpellPill key={s} name={s} variant="draw" />)}
                      </div>
                    </div>
                  )
                }
                // Conditional draws — render as level-banded segments
                const bands = val.split('|').map(s => s.trim())
                return (
                  <div key={i} className="flex items-start gap-2 text-xs">
                    <span className="text-slate-500 shrink-0 w-[72px] text-right pt-0.5">Draw</span>
                    <div className="space-y-1 flex-1">
                      {bands.map((band, bi) => {
                        const lvIdx  = band.match(/^(Lv\s*[\d\-\+]+):\s*/)
                        const lvTag  = lvIdx ? lvIdx[1] : null
                        const spellPart = lvIdx ? band.slice(lvIdx[0].length) : band
                        const spells = spellPart.split(/,\s*/).map(s => s.trim()).filter(Boolean)
                        return (
                          <div key={bi} className="flex items-center gap-1.5 flex-wrap">
                            {lvTag && (
                              <span className="text-[10px] text-slate-600 font-mono shrink-0">{lvTag}:</span>
                            )}
                            {spells.map(s => <SpellPill key={s} name={s} variant="draw" />)}
                          </div>
                        )
                      })}
                    </div>
                  </div>
                )
              }

              // Weakness → red badges
              if (key.toLowerCase() === 'weakness' && val) {
                const weaks = val.split(/,\s*/).map(s => s.trim()).filter(Boolean)
                return (
                  <div key={i} className="flex items-start gap-2 text-xs">
                    <span className="text-slate-500 shrink-0 w-[72px] text-right pt-0.5">Weak</span>
                    <div className="flex gap-1 flex-wrap">
                      {weaks.map(w => (
                        <span key={w} className="px-1.5 py-0.5 rounded text-[10px] font-medium border bg-red-950/40 border-red-700/40 text-red-300">
                          {w}
                        </span>
                      ))}
                    </div>
                  </div>
                )
              }

              // Default bullet
              return (
                <div key={i} className="flex gap-3 text-xs">
                  <span className="text-slate-500 shrink-0 w-[72px] text-right">{key}</span>
                  <span className={cn(bulletColor(key), 'flex-1')}>{renderInline(val)}</span>
                </div>
              )
            })}
          </div>
        </>
      )}
    </div>
  )
}

// ─── Boss section (stat blocks + strategy) ────────────────────────────────────

function BossSection({ bosses, strategy }: { bosses: string[]; strategy: string | null }) {
  let strategyLabel = 'Strategy'
  let strategyBody  = ''
  if (strategy) {
    const m = strategy.match(/^Strategy(\s*\([^)]+\))?\s*:\s*/)
    if (m) { strategyLabel = 'Strategy' + (m[1] ?? ''); strategyBody = strategy.slice(m[0].length) }
    else    { strategyBody = strategy }
  }
  const strategyLines = strategyBody
    ? strategyBody.split('\n').filter(l => l.trim()).flatMap(autoSplitProse)
    : []

  return (
    <div className="rounded-xl border border-red-900/50 bg-gradient-to-br from-red-950/40 to-slate-900/60 overflow-hidden">
      {bosses.map((bossText, i) => (
        <div key={i}>
          {i > 0 && <div className="mx-4 h-px bg-red-900/30" />}
          <BossStatBlock text={bossText} />
        </div>
      ))}
      {strategy && (
        <>
          <div className="flex items-center gap-3 px-4 py-2 border-t border-red-900/40 bg-red-950/20">
            <span className="text-[10px] font-bold uppercase tracking-widest text-red-400/80">
              {strategyLabel}
            </span>
            <div className="flex-1 h-px bg-gradient-to-r from-red-700/40 to-transparent" />
          </div>
          <div className="px-4 pb-4 pt-2">
            {renderLines(strategyLines)}
          </div>
        </>
      )}
    </div>
  )
}

// ─── Paragraph grouping ───────────────────────────────────────────────────────

type DisplayItem =
  | { type: 'para'; idx: number }
  | { type: 'boss-group'; indices: number[]; bosses: string[]; strategy: string | null }

function groupParas(paras: string[]): DisplayItem[] {
  const items: DisplayItem[] = []
  let i = 0
  while (i < paras.length) {
    if (paras[i].startsWith('**Boss:')) {
      const bosses: string[] = []
      const indices: number[] = []
      while (i < paras.length && paras[i].startsWith('**Boss:')) {
        bosses.push(paras[i]); indices.push(i); i++
      }
      let strategy: string | null = null
      if (i < paras.length && /^Strategy[\s(:]/.test(paras[i])) {
        strategy = paras[i]; indices.push(i); i++
      }
      items.push({ type: 'boss-group', indices, bosses, strategy })
    } else {
      items.push({ type: 'para', idx: i }); i++
    }
  }
  return items
}

function buildParagraphsWithCheckpoints(content: string, checkpoints: Checkpoint[]) {
  const paras = content.split('\n\n').filter(p => p.trim().length > 0)
  if (!paras.length) return { paras: [], checkpointMap: {} as Record<number, Checkpoint[]> }
  const checkpointMap: Record<number, Checkpoint[]> = {}
  for (const cp of checkpoints) {
    const idx = Math.min(cp.index, paras.length - 1)
    checkpointMap[idx] = checkpointMap[idx] ?? []
    checkpointMap[idx].push(cp)
  }
  return { paras, checkpointMap }
}

// ─── Main GuideView ───────────────────────────────────────────────────────────

const DISC_NAV_COLORS: Record<number, { border: string; text: string; label: string }> = {
  0: { border: 'border-sky-700/50',    text: 'text-sky-400',    label: 'Reference' },
  1: { border: 'border-teal-700/50',   text: 'text-teal-400',   label: 'Disc 1' },
  2: { border: 'border-indigo-700/50', text: 'text-indigo-400', label: 'Disc 2' },
  3: { border: 'border-violet-700/50', text: 'text-violet-400', label: 'Disc 3' },
  4: { border: 'border-amber-700/50',  text: 'text-amber-400',  label: 'Disc 4' },
}

export function GuideView({ chapter, completedItems, onToggleItem, enemies = [], prevChapter, nextChapter, onNavigate }: Props) {
  const rootRef = useRef<HTMLDivElement>(null)

  // Scroll the nearest overflow-y-auto ancestor to the top whenever the
  // chapter changes.  useLayoutEffect fires after the DOM mutation but
  // before the browser paints, so the user never sees the old position.
  useLayoutEffect(() => {
    // Reset the nearest overflow-scroll ancestor (desktop <main>, and mobile
    // <main> now that its container is h-dvh-constrained).
    let el: HTMLElement | null = rootRef.current?.parentElement ?? null
    while (el) {
      const { overflowY } = getComputedStyle(el)
      if ((overflowY === 'auto' || overflowY === 'scroll') && el.scrollHeight > el.clientHeight) {
        el.scrollTop = 0
        break
      }
      el = el.parentElement
    }
    // Belt-and-suspenders: also reset window scroll in case any layout path
    // still ends up with the document as the scroll container.
    window.scrollTo(0, 0)
  }, [chapter.id])

  const { paras, checkpointMap } = buildParagraphsWithCheckpoints(chapter.content, chapter.checkpoints)
  const totalCps = chapter.checkpoints.length
  const doneCps  = chapter.checkpoints.filter(cp => completedItems[cp.id]).length
  const encounters = chapter.encounters ?? []

  const discStyle = DISC_HEADER[chapter.disc] ?? DISC_HEADER[1]

  return (
    <div ref={rootRef} className="space-y-4 pb-8 w-full">
      {/* Chapter header */}
      <div
        className={cn('glass-panel p-5 border-t-2', discStyle.border)}
        style={{ backgroundImage: `linear-gradient(to bottom, ${discStyle.gradient}, transparent)` }}
      >
        <div className="flex items-start justify-between gap-3 mb-2">
          <div>
            <div className="flex items-center gap-2 mb-1.5 flex-wrap">
              <span className={cn('text-xs px-2 py-0.5 rounded-full border font-medium', discStyle.badge)}>
                {chapter.disc === 0 ? 'Reference' : `Disc ${chapter.disc}`}
              </span>
              {chapter.disc > 0 && (
                <span className="text-xs text-slate-500">Ch. {chapter.index}</span>
              )}
              {totalCps > 0 && (
                <span className="text-xs text-slate-500">{doneCps}/{totalCps} checkpoints</span>
              )}
            </div>
            <h1 className="text-xl font-bold text-slate-100 leading-tight">{chapter.title}</h1>
          </div>
        </div>
        {totalCps > 0 && (
          <div className="h-1 rounded-full bg-slate-800/60 overflow-hidden mt-3">
            <div
              className={cn('h-full rounded-full bg-gradient-to-r transition-all duration-300',
                chapter.disc === 0 ? 'from-sky-600 to-sky-400' :
                chapter.disc === 1 ? 'from-teal-600 to-teal-400' :
                chapter.disc === 2 ? 'from-indigo-600 to-indigo-400' :
                chapter.disc === 3 ? 'from-violet-600 to-violet-400' :
                'from-amber-600 to-amber-400'
              )}
              style={{ width: `${Math.round((doneCps / totalCps) * 100)}%` }}
            />
          </div>
        )}
      </div>

      {/* Content */}
      {paras.length > 0 ? (
        <div className="space-y-4">
          {groupParas(paras).map((item, di) => {
            if (item.type === 'boss-group') {
              const groupCps = item.indices.flatMap(idx => checkpointMap[idx] ?? [])
              return (
                <div key={di} className="space-y-3">
                  <BossSection bosses={item.bosses} strategy={item.strategy} />
                  {groupCps.map(cp => (
                    <CheckpointCard key={cp.id} cp={cp} completed={!!completedItems[cp.id]} onToggle={() => onToggleItem(cp.id)} />
                  ))}
                </div>
              )
            }

            const { idx } = item
            const para = paras[idx]
            const encMatch = para.match(ENCOUNTERS_RE)
            const encIndex = encMatch ? parseInt(encMatch[1], 10) : -1
            const area = encIndex >= 0 ? encounters[encIndex] : null

            return (
              <div key={di} className="space-y-3">
                {area
                  ? <AreaEncounterCard area={area} enemies={enemies} />
                  : renderParagraphBlock(para)
                }
                {(checkpointMap[idx] ?? []).map(cp => (
                  <CheckpointCard key={cp.id} cp={cp} completed={!!completedItems[cp.id]} onToggle={() => onToggleItem(cp.id)} />
                ))}
              </div>
            )
          })}
        </div>
      ) : (
        chapter.checkpoints.length > 0 ? (
          <div className="space-y-3">
            {chapter.checkpoints.map(cp => (
              <CheckpointCard key={cp.id} cp={cp} completed={!!completedItems[cp.id]} onToggle={() => onToggleItem(cp.id)} />
            ))}
          </div>
        ) : (
          <div className="glass-panel-sm px-4 py-8 text-center text-slate-600 text-sm">
            No walkthrough content for this chapter.
          </div>
        )
      )}

      {/* ── Chapter navigation ── */}
      {(prevChapter || nextChapter) && (
        <div className="flex gap-3 pt-2 border-t border-slate-700/40 mt-2">
          {prevChapter ? (
            <button
              onClick={() => onNavigate?.(prevChapter.id)}
              className={cn(
                'flex-1 flex items-center gap-3 px-4 py-3 rounded-xl border bg-slate-800/30 hover:bg-slate-800/60 text-left transition-colors group',
                DISC_NAV_COLORS[prevChapter.disc]?.border ?? 'border-slate-700/50'
              )}
            >
              <ChevronLeft size={16} className="text-slate-500 group-hover:text-slate-300 shrink-0 transition-colors" />
              <div className="min-w-0">
                <div className="text-[10px] text-slate-600 uppercase tracking-wider font-medium">
                  {DISC_NAV_COLORS[prevChapter.disc]?.label ?? `Disc ${prevChapter.disc}`}
                </div>
                <div className={cn(
                  'text-sm font-semibold truncate transition-colors group-hover:text-white',
                  DISC_NAV_COLORS[prevChapter.disc]?.text ?? 'text-slate-300'
                )}>
                  {prevChapter.title}
                </div>
              </div>
            </button>
          ) : (
            <div className="flex-1" />
          )}

          {nextChapter ? (
            <button
              onClick={() => onNavigate?.(nextChapter.id)}
              className={cn(
                'flex-1 flex items-center justify-end gap-3 px-4 py-3 rounded-xl border bg-slate-800/30 hover:bg-slate-800/60 text-right transition-colors group',
                DISC_NAV_COLORS[nextChapter.disc]?.border ?? 'border-slate-700/50'
              )}
            >
              <div className="min-w-0">
                <div className="text-[10px] text-slate-600 uppercase tracking-wider font-medium">
                  {DISC_NAV_COLORS[nextChapter.disc]?.label ?? `Disc ${nextChapter.disc}`}
                </div>
                <div className={cn(
                  'text-sm font-semibold truncate transition-colors group-hover:text-white',
                  DISC_NAV_COLORS[nextChapter.disc]?.text ?? 'text-slate-300'
                )}>
                  {nextChapter.title}
                </div>
              </div>
              <ChevronRight size={16} className="text-slate-500 group-hover:text-slate-300 shrink-0 transition-colors" />
            </button>
          ) : (
            <div className="flex-1" />
          )}
        </div>
      )}
    </div>
  )
}
