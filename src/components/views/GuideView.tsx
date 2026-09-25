import { useState, useLayoutEffect, useRef, useEffect, useId } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import {
  Activity,
  AlertTriangle,
  BookOpenCheck,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  CircleDot,
  EyeOff,
  Heart,
  Info,
  Keyboard,
  Lightbulb,
  MapPin,
  Search,
  ShoppingBag,
  Skull,
  Sparkles,
  Swords,
  Trophy,
  UserRound,
  Zap,
} from 'lucide-react'
import { cn } from '../../lib/utils'
import {
  contextualDrawMagic,
  contextualEnemyAbilities,
  contextualValue,
  createPartyLevelContext,
  formatPossibleLevels,
  resolveEnemyLevelContext,
  statsForEnemyLevels,
  type ContextualOption,
  type PartyLevelContext,
} from '../../lib/enemyLevelData'
import { enemyDefeatedTrackerId, isBlueMagicLearned, isMagicCompleted, magicByName } from '../../lib/playerState'
import { Checkbox } from '../ui/Checkbox'
import { Badge } from '../ui/Badge'
import { SequenceSteps } from '../ui/SequenceSteps'
import { BLUE_MAGIC_BY_ITEM_ID } from '../../data/blueMagic'
import { BlueMagicConnections, BlueMagicRouteStep, BlueMagicTracker } from '../ui/BlueMagicTracker'
import { ContextualVisualAid, ImageGrid, contextualVisualAidPlacement, getBossImages } from './VisualAids'
import { InlineSidequestBlock, sidequestTrackerId } from './SidequestView'
import type { Chapter, Checkpoint, AreaEncounter, Enemy, Item, MagicSpell, RefinementAbility, ShopInventory, JunctionTable, CharacterProfile, Sidequest, TrackerState } from '../../types'

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
  magic?: MagicSpell[]
  shops?: ShopInventory[]
  junctions?: JunctionTable[]
  characters?: CharacterProfile[]
  sidequests?: Sidequest[]
  prevChapter?: Chapter | null
  nextChapter?: Chapter | null
  onNavigate?: (id: string) => void
  characterLevels?: Record<string, number>
  activePartyIds?: string[]
  magicCompletedByCharacter?: Record<string, Record<string, boolean>>
  onToggleMagic?: (characterId: string, spellId: string, next?: boolean) => void
  items: Item[]
  refinement: RefinementAbility[]
  learnedBlueMagic: TrackerState['learnedBlueMagic']
  availableBlueMagicIds: ReadonlySet<string>
  onToggleBlueMagic: (abilityId: string, next?: boolean) => void
}

// ─── Inline rendering ─────────────────────────────────────────────────────────

function parseSequenceParts(text: string): string[] | null {
  const stripped = text.trim().replace(/^(?:[-·]\s*|\d+\.\s*)/, '').trim()
  const parts = stripped.split(/\s*(?:→|->)\s*/).map(part => part.trim())
  const readsLikeProse = /[,;]|\b(?:and|or|then|because|if|while)\b/i
  return parts.length >= 2 && parts.every(part =>
    part.length >= 1
      && part.length <= 75
      && !readsLikeProse.test(part.replace(/(\d),(?=\d{3}\b)/g, '$1')),
  )
    ? parts
    : null
}

function renderInline(text: string) {
  const parts = text.split(/(\*\*[^*]+\*\*)/)
  if (parts.length === 1) return <>{text}</>
  return (
    <>
      {parts.map((part, i) => {
        if (!part.startsWith('**') || !part.endsWith('**')) return <span key={i}>{part}</span>
        const content = part.slice(2, -2)
        const sequence = parseSequenceParts(content)
        if (sequence) {
          return (
            <SequenceSteps
              key={i}
              items={sequence.map((item, index) => <strong key={index} className="font-semibold">{item}</strong>)}
              className="mx-0.5 gap-x-0.5 gap-y-1"
            />
          )
        }
        return <strong key={i} className="text-white font-semibold">{content}</strong>
      })}
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
      'inline-flex min-w-0 max-w-full items-center px-1.5 py-0.5 rounded text-[10px] font-medium border whitespace-normal break-words [overflow-wrap:anywhere]',
      spellColor ?? fallbacks[variant]
    )}>
      {name}
    </span>
  )
}

// ─── Refinement chain renderer ────────────────────────────────────────────────

function isChainLine(text: string): boolean {
  return parseSequenceParts(text) !== null
}

function ChainLine({ raw }: { raw: string }) {
  const parts = parseSequenceParts(raw) ?? []
  return <SequenceSteps items={parts.map(part => renderInline(part))} className="py-0.5 pl-1" />
}

interface RefinementFlowContext {
  items: Item[]
  refinement: RefinementAbility[]
  learnedBlueMagic: TrackerState['learnedBlueMagic']
  onToggleBlueMagic: (abilityId: string, next?: boolean) => void
}

function normalizeFlowName(text: string) {
  return text
    .replace(/\*\*/g, '')
    .replace(/^\s*\d[\d,]*\s*(?:[x×]\s*)?/i, '')
    .trim()
    .replace(/\s+cards?$/i, '')
    .replace(/\s+/g, ' ')
    .toLowerCase()
}

function recipeBetween(from: string, to: string, refinement: RefinementAbility[]) {
  const fromName = normalizeFlowName(from).replace(/s$/, '')
  const toName = normalizeFlowName(to).replace(/s$/, '')
  return refinement.find(ability => ability.entries.some(entry =>
    normalizeFlowName(entry.from).replace(/s$/, '') === fromName
      && normalizeFlowName(entry.to).replace(/s$/, '') === toName,
  ))?.ability
}

function expandRefinementPath(parts: string[], refinement: RefinementAbility[]) {
  const expanded: Array<{ text: string; ability?: boolean }> = []
  parts.forEach((part, index) => {
    expanded.push({ text: part })
    const next = parts[index + 1]
    if (!next) return
    const ability = recipeBetween(part, next, refinement)
    if (ability) expanded.push({ text: ability, ability: true })
  })
  return expanded
}

function blueMagicForFlowStep(step: string, items: Item[]) {
  const name = normalizeFlowName(step)
  for (const [itemId, ability] of BLUE_MAGIC_BY_ITEM_ID) {
    const itemName = items.find(item => item.id === itemId)?.name
    if (itemName && normalizeFlowName(itemName) === name) return ability
  }
  return null
}

function renderFlowSteps(steps: Array<{ text: string; ability?: boolean }>) {
  return steps.map(step => step.ability
    ? <span key={`${step.text}-ability`} className="font-semibold text-violet-200">{step.text}</span>
    : <span key={step.text}>{renderInline(step.text)}</span>,
  )
}

function BlueMagicFlowStep({ ability, context }: { ability: NonNullable<ReturnType<typeof blueMagicForFlowStep>>; context: RefinementFlowContext }) {
  return (
    <BlueMagicRouteStep
      ability={ability}
      learned={isBlueMagicLearned({ learnedBlueMagic: context.learnedBlueMagic }, ability.id)}
      onToggle={() => context.onToggleBlueMagic(ability.id)}
    />
  )
}

function RefinementFlowLines({ lines, context }: { lines: string[]; context: RefinementFlowContext }) {
  const renderedBlueMagic = new Set<string>()
  return (
    <div className="space-y-2">
      {lines.map((line, index) => {
        const parts = parseSequenceParts(line)
        if (!parts) {
          const lineAbilities = [...BLUE_MAGIC_BY_ITEM_ID.entries()]
            .map(([itemId, ability]) => ({ itemId, ability, item: context.items.find(item => item.id === itemId) }))
            .filter((entry): entry is { itemId: string; ability: typeof entry.ability; item: Item } =>
              !!entry.item && !renderedBlueMagic.has(entry.ability.id) && normalizeFlowName(line).includes(normalizeFlowName(entry.item.name)),
            )
          lineAbilities.forEach(entry => renderedBlueMagic.add(entry.ability.id))
          return (
            <div key={index} className="space-y-1.5">
              {renderLines([line])}
              {lineAbilities.map(entry => <BlueMagicFlowStep key={entry.ability.id} ability={entry.ability} context={context} />)}
            </div>
          )
        }

        const route = expandRefinementPath(parts, context.refinement)
        const blueMagicIndex = route.findIndex(step => blueMagicForFlowStep(step.text, context.items))
        const routeAbility = blueMagicIndex >= 0 ? blueMagicForFlowStep(route[blueMagicIndex].text, context.items) : null
        const ability = routeAbility && !renderedBlueMagic.has(routeAbility.id) ? routeAbility : null
        if (ability) renderedBlueMagic.add(ability.id)
        const prefix = ability ? route.slice(0, blueMagicIndex + 1) : route
        const branch = ability ? route.slice(blueMagicIndex) : []
        const bullet = /^\s*(?:[-·]\s*|\d+\.\s*)/.test(line)

        return (
          <div key={index} className="rounded-md border border-violet-900/30 bg-slate-950/20 px-2.5 py-2">
            <div className="flex min-w-0 items-start gap-2">
              {bullet && <span className="mt-1 shrink-0 text-[10px] text-violet-400/75">▹</span>}
              <div className="min-w-0 flex-1 space-y-2">
                {ability ? (
                  blueMagicIndex === route.length - 1 ? (
                    <SequenceSteps
                      items={[
                        ...renderFlowSteps(prefix),
                        <BlueMagicFlowStep key={ability.id} ability={ability} context={context} />,
                      ]}
                      className="py-0.5"
                    />
                  ) : (
                    <>
                      <SequenceSteps items={renderFlowSteps(prefix)} className="py-0.5" />
                      <div className="flex min-w-0 flex-wrap items-center gap-x-2 gap-y-1.5 border-t border-slate-800/70 pt-2">
                        <BlueMagicFlowStep ability={ability} context={context} />
                        <span className="text-[10px] font-medium uppercase tracking-wide text-slate-500">or refine</span>
                        <SequenceSteps items={renderFlowSteps(branch)} className="py-0.5" />
                      </div>
                    </>
                  )
                ) : <SequenceSteps items={renderFlowSteps(route)} className="py-0.5" />}
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

// ─── Shop / price-list renderer ───────────────────────────────────────────────

interface ShopItem { name: string; price: number }

// Matches "item name (N Gil)" or "item name: N Gil"
const PRICE_RE = /([^·,;\n([\]]{2,40}?)\s*\(\s*(\d[\d,]*)\s*Gil[^)]*\)/gi

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

// ─── Markdown table renderer ─────────────────────────────────────────────────

function splitMarkdownRow(line: string): string[] {
  const trimmed = line.trim().replace(/^\|/, '').replace(/\|$/, '')
  const cells: string[] = []
  let current = ''
  let escaped = false

  for (const char of trimmed) {
    if (escaped) {
      current += char
      escaped = false
      continue
    }
    if (char === '\\') {
      escaped = true
      continue
    }
    if (char === '|') {
      cells.push(current.trim())
      current = ''
      continue
    }
    current += char
  }

  cells.push(current.trim())
  return cells
}

function isMarkdownTable(lines: string[]): boolean {
  if (lines.length < 3) return false
  const [header, separator] = lines.map(line => line.trim())
  if (!header.includes('|') || !separator.includes('|')) return false
  const separatorCells = splitMarkdownRow(separator)
  return separatorCells.length >= 2 && separatorCells.every(cell => /^:?-{3,}:?$/.test(cell))
}

function MarkdownTable({ lines }: { lines: string[] }) {
  const headers = splitMarkdownRow(lines[0])
  const rows = lines.slice(2).map(splitMarkdownRow)

  return (
    <div className="-mx-1 overflow-x-auto rounded-lg border border-slate-700/45 bg-slate-950/35">
      <table className="min-w-full border-collapse text-left text-xs">
        <thead className="bg-slate-800/70 text-slate-200">
          <tr>
            {headers.map((header, i) => (
              <th key={i} className="border-b border-r border-slate-700/50 px-3 py-2 font-semibold last:border-r-0">
                {renderInline(header)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-800/70">
          {rows.map((row, rowIndex) => (
            <tr key={rowIndex} className="odd:bg-slate-900/30 even:bg-slate-900/10">
              {headers.map((_, cellIndex) => (
                <td key={cellIndex} className="border-r border-slate-800/70 px-3 py-2 align-top text-slate-300 last:border-r-0">
                  {renderInline(row[cellIndex] ?? '')}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

type LineBlock =
  | { type: 'lines'; lines: string[] }
  | { type: 'table'; lines: string[] }

function splitLineBlocks(lines: string[]): LineBlock[] {
  const blocks: LineBlock[] = []
  let current: string[] = []

  const flushCurrent = () => {
    if (current.length > 0) {
      blocks.push({ type: 'lines', lines: current })
      current = []
    }
  }

  for (let i = 0; i < lines.length;) {
    if (i + 2 < lines.length && isMarkdownTable(lines.slice(i, i + 3))) {
      flushCurrent()
      const tableLines = [lines[i], lines[i + 1]]
      i += 2
      while (i < lines.length && lines[i].includes('|')) {
        tableLines.push(lines[i])
        i += 1
      }
      blocks.push({ type: 'table', lines: tableLines })
      continue
    }

    current.push(lines[i])
    i += 1
  }

  flushCurrent()
  return blocks
}

// ─── Platform-aware controls renderer ────────────────────────────────────────

type ControlPlatform = 'ps' | 'xbox' | 'switch' | 'pc' | 'mobile'

interface ControlPlatformMeta {
  id: ControlPlatform
  label: string
  header: string
}

interface ControlSectionData {
  title: string
  actionLabel: string
  headers: string[]
  rows: Array<Record<string, string>>
}

const CONTROL_PLATFORMS: ControlPlatformMeta[] = [
  { id: 'ps', label: 'PS', header: 'PlayStation' },
  { id: 'xbox', label: 'Xbox', header: 'Xbox (One/Series X|S)' },
  { id: 'switch', label: 'Switch', header: 'Nintendo Switch' },
  { id: 'pc', label: 'PC', header: 'PC Keyboard' },
  { id: 'mobile', label: 'Mobile', header: 'Mobile (iOS/Android)' },
]

function parseControlSections(content: string): ControlSectionData[] {
  const paragraphs = content.split('\n\n').filter(p => p.trim())
  return paragraphs.flatMap(paragraph => {
    const directiveMatch = paragraph.match(CALLOUT_DIRECTIVE_RE)
    if (!directiveMatch || directiveMatch[1] !== 'controls') return []

    const title = directiveMatch[2].trim()
    const body = paragraph.slice(directiveMatch[0].length).trim()
    const lines = body.split('\n').filter(line => line.trim())
    if (!isMarkdownTable(lines)) return []

    const headers = splitMarkdownRow(lines[0])
    const actionLabel = headers[0] ?? 'Action'
    const rows = lines.slice(2).map(line => {
      const cells = splitMarkdownRow(line)
      return Object.fromEntries(headers.map((header, i) => [header, cells[i] ?? '']))
    })

    return [{ title, actionLabel, headers, rows }]
  })
}

function findControlValue(section: ControlSectionData | undefined, actionPrefix: string, platform: ControlPlatform) {
  const platformHeader = CONTROL_PLATFORMS.find(p => p.id === platform)?.header
  const actionHeader = section?.actionLabel
  if (!section || !platformHeader || !actionHeader) return ''
  const row = section.rows.find(item => item[actionHeader]?.startsWith(actionPrefix))
  return row?.[platformHeader] ?? ''
}

function ControlsReference({ content }: { content: string }) {
  const [platform, setPlatform] = useState<ControlPlatform>('ps')
  const sections = parseControlSections(content)
  const selected = CONTROL_PLATFORMS.find(p => p.id === platform) ?? CONTROL_PLATFORMS[0]
  const field = sections.find(section => section.title === 'Field Controls')
  const battle = sections.find(section => section.title === 'Battle Controls')
  const boosters = sections.find(section => section.title === 'Remaster-Exclusive Booster Controls')
  const cardInput = findControlValue(field, 'Square:', platform)
  const menuInput = findControlValue(field, 'Circle:', platform)
  const triggerInput = findControlValue(battle, 'R1:', platform)
  const speedInput = findControlValue(boosters, '3x Speed Mode', platform)
  const assistInput = findControlValue(boosters, 'Battle Assist', platform)
  const noEncounterInput = findControlValue(boosters, 'No Encounters', platform)

  return (
    <div className="space-y-4">
      <div className="rounded-xl border border-blue-900/40 bg-slate-900/55 p-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-blue-300">
              <Keyboard size={13} />
              Controls
            </div>
            <p className="mt-1 text-sm text-slate-400">
              Showing inputs for <span className="font-semibold text-slate-200">{selected.header}</span>.
            </p>
          </div>
          <div className="flex gap-1 overflow-x-auto rounded-lg border border-slate-700/50 bg-slate-950/45 p-1">
            {CONTROL_PLATFORMS.map(option => (
              <button
                key={option.id}
                type="button"
                onClick={() => setPlatform(option.id)}
                className={cn(
                  'shrink-0 rounded-md px-3 py-1.5 text-xs font-semibold transition-colors',
                  option.id === platform
                    ? 'bg-blue-500/20 text-blue-100 ring-1 ring-blue-400/50'
                    : 'text-slate-400 hover:bg-slate-800/70 hover:text-slate-200'
                )}
                aria-pressed={option.id === platform}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {sections.map(section => (
        <ControlSection key={section.title} section={section} platform={platform} platformHeader={selected.header} />
      ))}

      <div className="grid gap-3 lg:grid-cols-3">
        <ControlNote title="Gunblade timing">
          Squall and Seifer do not roll normal weapon critical hits. Press <strong className="text-white">{triggerInput}</strong> during the attack impact window to add the gunblade trigger bonus. The same timing applies to each Renzokuken strike.
        </ControlNote>
        <ControlNote title="Triple Triad shortcut">
          Use <strong className="text-white">{cardInput}</strong> near eligible NPCs to challenge them to cards. If that input talks or examines instead, the NPC or object is not currently accepting a card challenge from that position.
        </ControlNote>
        <ControlNote title="Menu and boosters">
          Open the field menu with <strong className="text-white">{menuInput}</strong>. Remaster boosters for this platform: Speed <strong className="text-white">{speedInput}</strong>, Battle Assist <strong className="text-white">{assistInput}</strong>, No Encounters <strong className="text-white">{noEncounterInput}</strong>.
        </ControlNote>
      </div>
    </div>
  )
}

function ControlSection({
  section,
  platform,
  platformHeader,
}: {
  section: ControlSectionData
  platform: ControlPlatform
  platformHeader: string
}) {
  const visibleRows = section.rows.map(row => ({
    action: row[section.actionLabel] ?? '',
    input: row[platformHeader] ?? '',
  }))

  return (
    <section className="rounded-xl border border-blue-900/35 bg-blue-950/12">
      <div className="flex items-center gap-2 border-b border-blue-900/30 px-4 py-3">
        <Keyboard size={13} className="text-blue-300" />
        <h2 className="text-sm font-semibold text-slate-100">{section.title}</h2>
        <span className="ml-auto rounded border border-slate-700/45 bg-slate-950/50 px-2 py-0.5 text-[10px] font-mono text-slate-400">
          {CONTROL_PLATFORMS.find(option => option.id === platform)?.label}
        </span>
      </div>
      <div className="divide-y divide-slate-800/70">
        {visibleRows.map((row, i) => (
          <div key={`${section.title}-${i}`} className="grid gap-1 px-4 py-2.5 sm:grid-cols-[minmax(0,1.25fr)_minmax(0,0.75fr)] sm:items-center">
            <div className="text-sm font-medium leading-snug text-slate-200">{row.action}</div>
            <div className="text-sm leading-snug text-blue-200 sm:text-right">{row.input}</div>
          </div>
        ))}
      </div>
    </section>
  )
}

function ControlNote({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-lg border border-slate-700/45 bg-slate-900/45 px-4 py-3">
      <div className="mb-1 text-xs font-bold uppercase tracking-wide text-slate-400">{title}</div>
      <p className="text-sm leading-relaxed text-slate-300">{children}</p>
    </div>
  )
}

// ─── Magic reference renderer ────────────────────────────────────────────────

type MagicStat = 'HP' | 'Str' | 'Vit' | 'Mag' | 'Spr' | 'Spd' | 'Eva' | 'Hit' | 'Luck'

const MAGIC_STATS: MagicStat[] = ['HP', 'Str', 'Vit', 'Mag', 'Spr', 'Spd', 'Eva', 'Hit', 'Luck']

function statNumber(value: string | undefined): number {
  if (!value || value === 'XXX') return -1
  const parsed = Number(value.replace(/,/g, '').match(/\d+/)?.[0] ?? -1)
  return Number.isFinite(parsed) ? parsed : -1
}

function tidyRecipeText(value: string | undefined) {
  if (!value || value === 'None') return value ?? ''
  return value.replace(/\)(?=[A-Z0-9])/g, ') · ')
}

function MagicReference({
  content,
  spells,
  characters,
  magicCompletedByCharacter,
}: {
  content: string
  spells: MagicSpell[]
  characters: CharacterProfile[]
  magicCompletedByCharacter: Record<string, Record<string, boolean>>
}) {
  const [query, setQuery] = useState('')
  const [focusStat, setFocusStat] = useState<MagicStat>('Str')
  const [selectedCharacterId, setSelectedCharacterId] = useState(characters[0]?.id ?? '')
  const q = query.trim().toLowerCase()
  const paragraphs = content.split('\n\n').filter(p => p.trim())

  const filtered = spells
    .filter(spell => {
      if (!q) return true
      return [
        spell.name,
        spell.castEffect,
        spell.acquisition['Refine From'],
        spell.acquisition['Refine Into'],
        spell.elemStatus.elementalAttack,
        spell.elemStatus.elementalDefense,
        spell.elemStatus.statusAttack,
        spell.elemStatus.statusDefense,
      ].some(value => (value ?? '').toLowerCase().includes(q))
    })
    .sort((a, b) => statNumber(b.statJunctions[focusStat]) - statNumber(a.statJunctions[focusStat]))

  const selectedCharacter = characters.find(character => character.id === selectedCharacterId) ?? characters[0]
  const owned = selectedCharacter
    ? filtered.filter(spell => !!magicCompletedByCharacter[selectedCharacter.id]?.[spell.id])
    : []

  return (
    <div className="space-y-4">
      {paragraphs.map((paragraph, i) => (
        <div key={i}>{renderParagraphBlock(paragraph, 'r0-magic-reference')}</div>
      ))}

      <div className="rounded-xl border border-violet-900/35 bg-slate-900/55 p-4">
        <div className="flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-violet-300">
              <Zap size={13} />
              Magic Reference
            </div>
            <p className="mt-1 text-sm text-slate-400">
              Sorted by <span className="font-semibold text-slate-200">{focusStat}-J</span>
            </p>
            {selectedCharacter && (
              <p className="mt-1 text-xs text-teal-300/80">
                {selectedCharacter.name.split(' ')[0]} owned best: <span className="font-semibold">{owned[0]?.name ?? 'none marked'}</span> · 100 stock assumed
              </p>
            )}
          </div>
          <div className="relative min-w-0 xl:w-72">
            <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-600" />
            <input
              value={query}
              onChange={event => setQuery(event.target.value)}
              placeholder="Search spell, effect, refine..."
              className="w-full rounded-lg border border-slate-700/55 bg-slate-950/65 py-2 pl-9 pr-3 text-sm text-slate-200 outline-none transition-colors placeholder:text-slate-600 focus:border-violet-500/60"
            />
          </div>
        </div>

        <div className="mt-3 flex gap-1 overflow-x-auto rounded-lg border border-slate-700/45 bg-slate-950/45 p-1">
          {MAGIC_STATS.map(stat => (
            <button
              key={stat}
              type="button"
              onClick={() => setFocusStat(stat)}
              className={cn(
                'shrink-0 rounded-md px-3 py-1.5 text-xs font-semibold transition-colors',
                focusStat === stat
                  ? 'bg-violet-500/20 text-violet-100 ring-1 ring-violet-400/45'
                  : 'text-slate-400 hover:bg-slate-800/70 hover:text-slate-200'
              )}
              aria-pressed={focusStat === stat}
            >
              {stat}-J
            </button>
          ))}
        </div>
        {characters.length > 0 && (
          <div className="mt-3 flex items-center gap-2 overflow-x-auto">
            <span className="shrink-0 text-[10px] uppercase tracking-wide text-slate-600">Owned for</span>
            {characters.map(character => (
              <button
                type="button"
                key={character.id}
                onClick={() => setSelectedCharacterId(character.id)}
                className={cn(
                  'shrink-0 rounded-md border px-2.5 py-1 text-xs transition-colors',
                  selectedCharacter?.id === character.id
                    ? 'border-teal-500/45 bg-teal-950/30 text-teal-200'
                    : 'border-slate-800 bg-slate-950/30 text-slate-500 hover:text-slate-300'
                )}
              >
                {character.name.split(' ')[0]}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="grid gap-3 xl:grid-cols-2">
        {filtered.map((spell, index) => (
          <MagicSpellCard
            key={spell.id}
            spell={spell}
            focusStat={focusStat}
            owned={!!selectedCharacter && !!magicCompletedByCharacter[selectedCharacter.id]?.[spell.id]}
            theoreticalBest={index === 0}
            ownedBest={owned.length > 0 && spell.id === owned[0].id}
          />
        ))}
      </div>
    </div>
  )
}

function MagicSpellCard({ spell, focusStat, owned, theoreticalBest, ownedBest }: { spell: MagicSpell; focusStat: MagicStat; owned: boolean; theoreticalBest: boolean; ownedBest: boolean }) {
  const focusValue = spell.statJunctions[focusStat]
  const refineFrom = tidyRecipeText(spell.acquisition['Refine From'])
  const refineInto = tidyRecipeText(spell.acquisition['Refine Into'])

  return (
    <article className="rounded-xl border border-slate-700/45 bg-slate-900/45 p-4">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <h2 className={cn('text-base font-semibold', owned ? 'text-slate-100' : 'text-slate-400')}>{spell.name}</h2>
            {owned && <Badge variant="teal">owned · 100</Badge>}
            {theoreticalBest && <Badge variant="violet">theoretical best</Badge>}
            {ownedBest && <Badge variant="emerald">best owned</Badge>}
          </div>
          <p className="mt-1 text-sm leading-relaxed text-slate-400">{spell.castEffect}</p>
        </div>
        <div className="rounded-lg border border-violet-500/30 bg-violet-950/30 px-3 py-2 text-center shrink-0">
          <div className="text-[10px] font-bold uppercase tracking-wide text-violet-300">{focusStat}-J</div>
          <div className="text-sm font-mono font-semibold text-violet-100">{focusValue}</div>
        </div>
      </div>

      <div className="mt-3 grid grid-cols-3 gap-1.5 sm:grid-cols-5">
        {MAGIC_STATS.map(stat => (
          <div
            key={stat}
            className={cn(
              'rounded-md border px-2 py-1 text-xs',
              stat === focusStat
                ? 'border-violet-500/35 bg-violet-950/25'
                : 'border-slate-800/70 bg-slate-950/35'
            )}
          >
            <span className="text-slate-500">{stat}</span>
            <span className="ml-1 font-mono text-slate-200">{spell.statJunctions[stat]}</span>
          </div>
        ))}
      </div>

      <div className="mt-3 grid gap-2 text-xs">
        <MagicFact label="Refine from" value={refineFrom} />
        <MagicFact label="Refine into" value={refineInto} />
        <MagicFact label="Draw difficulty" value={spell.acquisition['Draw Difficulty']} />
        <MagicFact label="Elem Atk/Def" value={`${spell.elemStatus.elementalAttack} / ${spell.elemStatus.elementalDefense}`} />
        <MagicFact label="Status Atk/Def" value={`${spell.elemStatus.statusAttack} / ${spell.elemStatus.statusDefense}`} />
      </div>
    </article>
  )
}

function MagicFact({ label, value }: { label: string; value?: string }) {
  if (!value) return null
  return (
    <div className="grid gap-1 sm:grid-cols-[7rem_minmax(0,1fr)]">
      <span className="text-slate-600">{label}</span>
      <span className="min-w-0 text-slate-300">{value}</span>
    </div>
  )
}

// ─── Shop reference renderer ─────────────────────────────────────────────────

function ShopReference({ content, shops }: { content: string; shops: ShopInventory[] }) {
  const [query, setQuery] = useState('')
  const q = query.trim().toLowerCase()
  const paragraphs = content.split('\n\n').filter(p => p.trim())
  const filtered = shops
    .map(shop => ({
      ...shop,
      items: q
        ? shop.items.filter(item =>
            item.name.toLowerCase().includes(q) ||
            (item.requirement ?? '').toLowerCase().includes(q)
          )
        : shop.items,
    }))
    .filter(shop => shop.items.length > 0)

  return (
    <div className="space-y-4">
      {paragraphs.map((paragraph, i) => (
        <div key={i}>{renderParagraphBlock(paragraph, 'r0-shop-reference')}</div>
      ))}

      <div className="rounded-xl border border-emerald-900/35 bg-slate-900/55 p-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-emerald-300">
              <ShoppingBag size={13} />
              Shop Inventories
            </div>
          </div>
          <div className="relative min-w-0 sm:w-72">
            <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-600" />
            <input
              value={query}
              onChange={event => setQuery(event.target.value)}
              placeholder="Search item or requirement..."
              className="w-full rounded-lg border border-slate-700/55 bg-slate-950/65 py-2 pl-9 pr-3 text-sm text-slate-200 outline-none transition-colors placeholder:text-slate-600 focus:border-emerald-500/60"
            />
          </div>
        </div>
      </div>

      <div className="grid gap-3 xl:grid-cols-2">
        {filtered.map(shop => (
          <section key={shop.id} className="rounded-xl border border-slate-700/45 bg-slate-900/45 overflow-hidden">
            <div className="flex items-center justify-between gap-3 border-b border-slate-800/70 px-4 py-3">
              <h2 className="text-sm font-semibold text-slate-100">{shop.name}</h2>
            </div>
            <div className="divide-y divide-slate-800/70">
              {shop.items.map(item => (
                <div key={`${shop.id}-${item.name}`} className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 px-4 py-2 text-sm">
                  <div className="min-w-0">
                    <span className="text-slate-200">{item.name}</span>
                    {item.requirement && (
                      <span className="ml-2 rounded border border-amber-500/30 bg-amber-950/25 px-1.5 py-0.5 text-[10px] font-medium text-amber-300">
                        {item.requirement}
                      </span>
                    )}
                  </div>
                  <span className="font-mono text-xs text-emerald-300">
                    {item.price == null ? 'N/A' : `${item.price.toLocaleString()}g`}
                  </span>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  )
}

// ─── Junction reference renderer ─────────────────────────────────────────────

function JunctionReference({ content, junctions }: { content: string; junctions: JunctionTable[] }) {
  const [query, setQuery] = useState('')
  const q = query.trim().toLowerCase()
  const paragraphs = content.split('\n\n').filter(p => p.trim())
  const filtered = junctions
    .map(table => ({
      ...table,
      rows: q
        ? table.rows.filter(row => row.some(cell => cell.toLowerCase().includes(q)))
        : table.rows,
    }))
    .filter(table => table.rows.length > 0)

  return (
    <div className="space-y-4">
      {paragraphs.map((paragraph, i) => (
        <div key={i}>{renderParagraphBlock(paragraph, 'r0-junction-reference')}</div>
      ))}

      <div className="rounded-xl border border-cyan-900/35 bg-slate-900/55 p-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-cyan-300">
              <Activity size={13} />
              Junction Tables
            </div>
          </div>
          <div className="relative min-w-0 sm:w-72">
            <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-600" />
            <input
              value={query}
              onChange={event => setQuery(event.target.value)}
              placeholder="Search spell, element, status..."
              className="w-full rounded-lg border border-slate-700/55 bg-slate-950/65 py-2 pl-9 pr-3 text-sm text-slate-200 outline-none transition-colors placeholder:text-slate-600 focus:border-cyan-500/60"
            />
          </div>
        </div>
      </div>

      <div className="grid gap-3 xl:grid-cols-2">
        {filtered.map(table => (
          <section key={table.id} className="rounded-xl border border-slate-700/45 bg-slate-900/45 overflow-hidden">
            <div className="flex items-center justify-between border-b border-slate-800/70 px-4 py-3">
              <h2 className="text-sm font-semibold text-slate-100">{table.name}</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full text-left text-xs">
                <thead className="bg-slate-950/45 text-slate-400">
                  <tr>
                    {table.headers.map((header, hi) => (
                      <th key={hi} className="border-b border-slate-800/70 px-4 py-2 font-semibold">{header}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/70">
                  {table.rows.map((row, rowIndex) => (
                    <tr key={rowIndex} className="odd:bg-slate-950/20">
                      {table.headers.map((_, cellIndex) => (
                        <td key={cellIndex} className="px-4 py-2 align-top text-slate-300">
                          {row[cellIndex] ?? ''}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {table.footnotes && table.footnotes.length > 0 && (
              <div className="border-t border-slate-800/70 px-4 py-2 space-y-1">
                {table.footnotes.map((note, ni) => (
                  <p key={ni} className="text-[11px] text-slate-500 leading-relaxed">{note}</p>
                ))}
              </div>
            )}
          </section>
        ))}
      </div>
    </div>
  )
}

// ─── Character reference renderer ────────────────────────────────────────────

function CharacterReference({ content, characters }: { content: string; characters: CharacterProfile[] }) {
  const [activeId, setActiveId] = useState(characters[0]?.id ?? '')
  const paragraphs = content.split('\n\n').filter(p => p.trim())
  const active = characters.find(character => character.id === activeId) ?? characters[0]

  if (!active) {
    return (
      <div className="space-y-4">
        {paragraphs.map((paragraph, i) => (
          <div key={i}>{renderParagraphBlock(paragraph, 'r0-characters')}</div>
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {paragraphs.map((paragraph, i) => (
        <div key={i}>{renderParagraphBlock(paragraph, 'r0-characters')}</div>
      ))}

      <div className="rounded-xl border border-violet-900/35 bg-slate-900/55 p-4">
        <div className="flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-violet-300">
              <UserRound size={13} />
              Character Data
            </div>
          </div>
          <div className="flex min-w-0 flex-wrap gap-1 rounded-lg border border-slate-700/45 bg-slate-950/45 p-1">
            {characters.map(character => (
              <button
                key={character.id}
                type="button"
                onClick={() => setActiveId(character.id)}
                className={cn(
                  'shrink-0 rounded-md px-3 py-1.5 text-xs font-semibold transition-colors',
                  active.id === character.id
                    ? 'bg-violet-500/20 text-violet-100 ring-1 ring-violet-400/45'
                    : 'text-slate-400 hover:bg-slate-800/70 hover:text-slate-200'
                )}
                aria-pressed={active.id === character.id}
              >
                {character.name.split(' ')[0]}
              </button>
            ))}
          </div>
        </div>
      </div>

      <CharacterProfileCard character={active} />
    </div>
  )
}

function CharacterProfileCard({ character }: { character: CharacterProfile }) {
  const profileEntries = Object.entries(character.profile)

  return (
    <article className="space-y-4">
      <section className="rounded-xl border border-slate-700/45 bg-slate-900/45 p-4">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <h2 className="text-lg font-semibold text-slate-100">{character.name}</h2>
            <p className="mt-1 text-sm text-slate-500">
              {character.profile['Limit Break']} · {character.profile['Weapon Type']}
            </p>
          </div>
          <div className="grid gap-1.5 text-xs sm:grid-cols-2 lg:min-w-[28rem]">
            {profileEntries.map(([label, value]) => (
              <div key={label} className="grid grid-cols-[7rem_minmax(0,1fr)] gap-2 rounded-md border border-slate-800/70 bg-slate-950/35 px-2.5 py-1.5">
                <span className="text-slate-600">{label}</span>
                <span className="min-w-0 text-slate-300">{value}</span>
              </div>
            ))}
          </div>
        </div>

        {character.notes.length > 0 && (
          <div className="mt-4 grid gap-2">
            {character.notes.map(note => (
              <div key={note} className="flex gap-2 rounded-lg border border-violet-800/35 bg-violet-950/15 px-3 py-2 text-sm leading-relaxed text-slate-300">
                <Lightbulb size={13} className="mt-0.5 shrink-0 text-violet-300" />
                <span>{note}</span>
              </div>
            ))}
          </div>
        )}
      </section>

      <div className="grid gap-3">
        {character.tables.map(table => (
          <CharacterDataTableView key={table.id} table={table} />
        ))}
      </div>
    </article>
  )
}

function CharacterDataTableView({ table }: { table: CharacterProfile['tables'][number] }) {
  return (
    <section className="rounded-xl border border-slate-700/45 bg-slate-900/45 overflow-hidden">
      <div className="flex items-center justify-between border-b border-slate-800/70 px-4 py-3">
        <h3 className="text-sm font-semibold text-slate-100">{table.title}</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full text-left text-xs">
          <thead className="bg-slate-950/45 text-slate-400">
            <tr>
              {table.headers.map((header, hi) => (
                <th key={hi} className="border-b border-slate-800/70 px-4 py-2 font-semibold">{header}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/70">
            {table.rows.map((row, rowIndex) => (
              <tr key={rowIndex} className="odd:bg-slate-950/20">
                {table.headers.map((_, cellIndex) => (
                  <td key={cellIndex} className="px-4 py-2 align-top text-slate-300">
                    {row[cellIndex] ?? ''}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
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
  if (isMarkdownTable(lines)) return <MarkdownTable lines={lines} />

  const blocks = splitLineBlocks(lines)
  if (blocks.some(block => block.type === 'table')) {
    return (
      <div className="space-y-3">
        {blocks.map((block, index) => (
          block.type === 'table'
            ? <MarkdownTable key={index} lines={block.lines} />
            : <div key={index}>{renderLines(block.lines)}</div>
        ))}
      </div>
    )
  }

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
              <span className={cn('shrink-0 mt-0.5 font-mono text-[11px] w-4 text-right', isNum ? 'text-slate-500' : 'text-teal-500/60')}>
                {isNum ? line.match(/^(\d+)\./)?.[1] + '.' : '▹'}
              </span>
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
                <span className="text-teal-500/60 shrink-0 mt-0.5">▹</span>
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

type CalloutKind =
  | 'missable'
  | 'perfect'
  | 'refinement'
  | 'relationship'
  | 'sidequest'
  | 'drawing'
  | 'shop'
  | 'controls'
  | 'card'
  | 'character'
  | 'enemy'
  | 'boss'
  | 'gf'
  | 'item'
  | 'loot'
  | 'map'
  | 'mechanics'
  | 'preparation'
  | 'route'
  | 'status'
  | 'story'
  | 'achievement'
  | 'spoiler'
  | 'point'
  | 'hint'
  | 'training'
  | 'treasure'
  | 'warning'
  | 'note'

const CALLOUT_KINDS = new Set<CalloutKind>([
  'missable',
  'perfect',
  'refinement',
  'relationship',
  'sidequest',
  'drawing',
  'shop',
  'controls',
  'card',
  'character',
  'enemy',
  'boss',
  'gf',
  'item',
  'loot',
  'map',
  'mechanics',
  'preparation',
  'route',
  'status',
  'story',
  'achievement',
  'spoiler',
  'point',
  'hint',
  'training',
  'treasure',
  'warning',
  'note',
])

const CALLOUT_DIRECTIVE_RE = /^\{\{CALLOUT:([a-z-]+)\|([^}]+)\}\}\s*/
const CALLOUT_RE = /^\*\*([^*]{5,})\*\*\s*(?:[:—]|\([^)]+\):)/

interface CalloutStyle {
  icon: React.ReactNode
  className: string
  titleClass: string
  buttonClass: string
  eyebrow: string
}

const SHOP_WORDS    = /shop|store|sell|purchase|available.*gil|buy/i
const COLLAPSE_AT   = 10   // lines before adding Show more

function isCalloutKind(value: string): value is CalloutKind {
  return CALLOUT_KINDS.has(value as CalloutKind)
}

function normalizeCalloutKind(value: string): CalloutKind | null {
  if (value === 'perfect-game') return 'perfect'
  return isCalloutKind(value) ? value : null
}

function referenceCalloutKind(chapterId: string, title: string): CalloutKind | null {
  const titleKey = title.trim().toLowerCase()

  switch (chapterId) {
    case 'r0-about':
      return 'note'
    case 'r0-controls-interface':
      return 'controls'
    case 'r0-shop-reference':
      return 'shop'
    case 'r0-sidequest-index':
      return 'sidequest'
    case 'r0-characters':
      return 'character'
    case 'r0-combat-mechanics':
      return 'mechanics'
    case 'r0-status-effects':
      return 'status'
    case 'r0-junction-reference':
      return 'mechanics'
    case 'r0-seed-system':
      return titleKey.startsWith('seed test answers') ? 'note' : 'mechanics'
    case 'r0-triple-triad-rules':
      return 'card'
    case 'r0-gf-mechanics':
      return 'mechanics'
    default:
      return null
  }
}

function calloutKind(title: string, body = '', chapterId = ''): CalloutKind {
  const referenceKind = referenceCalloutKind(chapterId, title)
  if (referenceKind) return referenceKind

  const titleKey = title.trim().toLowerCase()
  if (
    chapterId === 'd4-final-preparations' &&
    (/^level \d\b/.test(titleKey) || titleKey.includes('perfect game') || titleKey.startsWith('why 0 kills'))
  ) {
    return 'perfect'
  }
  if (chapterId === 'd3-back-on-earth' && titleKey === "solomon's ring") return 'sidequest'
  if (chapterId === 'd3-the-resistance' && titleKey === 'doomtrain preparation') return 'sidequest'
  if (chapterId === 'd4-ultimecia-castle' && titleKey === 'rosetta stone') return 'point'
  if (chapterId === 'd4-commencement-room' && titleKey === 'before entering the castle') return 'warning'
  if (titleKey.startsWith('missable')) return 'missable'
  if (/cc group|queen of cards|chubby chocobo card|card collection/.test(titleKey)) return 'card'
  if (titleKey.includes('eden shortcut')) return 'hint'
  if (titleKey.includes('achievement') && !titleKey.includes('warning')) return 'achievement'
  if (/cactuar island|chocobo forests|pupu sidequest|obel lake quest|shumi village|to obtain the gf brothers/.test(titleKey)) return 'sidequest'
  if (/permanent stat-up|refinement|refine chains/.test(titleKey)) return 'refinement'
  if (/gf ability priority|blue magic|seed rank|stat-maxing|magic stocks|move-hp up|angelo search|farming|sabotage sequence|mission/.test(titleKey)) return 'mechanics'
  if (/combat notes|enemy levels/.test(titleKey)) return 'enemy'
  if (/bahamut|jumbo cactuar/.test(titleKey)) return 'enemy'
  if (/island closest/.test(titleKey)) return 'drawing'
  if (/navigating to|route|location/.test(titleKey)) return 'point'
  if (/^(guide|checklist|how to navigate|search|progress)$/.test(titleKey)) return 'note'
  const haystack = `${title} ${body.slice(0, 160)}`.toLowerCase()
  if (/spoiler/.test(haystack)) return 'spoiler'
  if (/missable/.test(haystack)) return 'missable'
  if (/warning|critical|important|alert|do not|last chance/.test(haystack)) return 'warning'
  if (/control|button|input|keyboard|gamepad|d-pad/.test(haystack)) return 'controls'
  if (SHOP_WORDS.test(title)) return 'shop'
  if (/triple triad|card rule|trade rule|queen of cards|cc group|rare card|card player|chubby chocobo card|crash site backup|card collection|abolish/.test(haystack)) return 'card'
  if (SHOP_WORDS.test(haystack)) return 'shop'
  if (/mechanic|formula|crisis level|junction|status|compatibility|salary|seed rank|battle speed|command|farming|setup|sequence|ap\b/.test(haystack)) return 'mechanics'
  if (/refinement|refine|card mod|mag-rf|med-rf/.test(haystack)) return 'refinement'
  if (/enemy|encounter|monster|bestiary|boss|guardian|blobra|jumbo cactuar|omega weapon|drop|mug|devour/.test(haystack)) return 'enemy'
  if (/perfect game/.test(haystack)) return 'perfect'
  if (/zell love|library girl|love quest|love scene/.test(haystack)) return 'relationship'
  if (/quest|candidate|queen of cards|cc group|timber maniacs|master fisherman|fisherman/.test(haystack)) return 'sidequest'
  if (/ultima drawing|draw point|drawing session/.test(haystack)) return 'drawing'
  if (/point of interest|points of interest|poi|location|route|map/.test(haystack)) return 'point'
  if (/hint|tip|recommend|strategy/.test(haystack)) return 'hint'
  return 'note'
}

function calloutStyle(kind: CalloutKind): CalloutStyle {
  switch (kind) {
    case 'missable':
      return {
        icon: <AlertTriangle size={13} />,
        className: 'rounded-lg bg-amber-950/25 border-l-[3px] border-amber-500/70 px-4 py-3 space-y-1.5',
        titleClass: 'text-amber-300',
        buttonClass: 'text-amber-500 hover:text-amber-300',
        eyebrow: 'Missable',
      }
    case 'perfect':
      return {
        icon: <Trophy size={13} />,
        className: 'rounded-lg bg-yellow-950/20 border-l-[3px] border-yellow-500/70 px-4 py-3 space-y-1.5',
        titleClass: 'text-yellow-300',
        buttonClass: 'text-yellow-500 hover:text-yellow-300',
        eyebrow: 'Perfect Game',
      }
    case 'refinement':
      return {
        icon: <Sparkles size={13} />,
        className: 'rounded-lg bg-violet-950/25 border-l-[3px] border-violet-500/70 px-4 py-3 space-y-1.5',
        titleClass: 'text-violet-300',
        buttonClass: 'text-violet-500 hover:text-violet-300',
        eyebrow: 'Refinement',
      }
    case 'relationship':
      return {
        icon: <Heart size={13} />,
        className: 'rounded-lg bg-rose-950/20 border-l-[3px] border-rose-500/70 px-4 py-3 space-y-1.5',
        titleClass: 'text-rose-300',
        buttonClass: 'text-rose-500 hover:text-rose-300',
        eyebrow: 'Sidequest',
      }
    case 'sidequest':
      return {
        icon: <BookOpenCheck size={13} />,
        className: 'rounded-lg bg-indigo-950/20 border-l-[3px] border-indigo-500/70 px-4 py-3 space-y-1.5',
        titleClass: 'text-indigo-300',
        buttonClass: 'text-indigo-500 hover:text-indigo-300',
        eyebrow: 'Sidequest',
      }
    case 'drawing':
      return {
        icon: <Zap size={13} />,
        className: 'rounded-lg bg-cyan-950/20 border-l-[3px] border-cyan-500/70 px-4 py-3 space-y-1.5',
        titleClass: 'text-cyan-300',
        buttonClass: 'text-cyan-500 hover:text-cyan-300',
        eyebrow: 'Draw Point',
      }
    case 'shop':
      return {
        icon: <ShoppingBag size={13} />,
        className: 'rounded-lg bg-emerald-950/20 border-l-[3px] border-emerald-500/70 px-4 py-3 space-y-1.5',
        titleClass: 'text-emerald-300',
        buttonClass: 'text-emerald-500 hover:text-emerald-300',
        eyebrow: 'Shop',
      }
    case 'controls':
      return {
        icon: <Keyboard size={13} />,
        className: 'rounded-lg bg-blue-950/20 border-l-[3px] border-blue-500/70 px-4 py-3 space-y-1.5',
        titleClass: 'text-blue-300',
        buttonClass: 'text-blue-500 hover:text-blue-300',
        eyebrow: 'Controls',
      }
    case 'card':
      return {
        icon: <CircleDot size={13} />,
        className: 'rounded-lg bg-fuchsia-950/20 border-l-[3px] border-fuchsia-500/70 px-4 py-3 space-y-1.5',
        titleClass: 'text-fuchsia-300',
        buttonClass: 'text-fuchsia-500 hover:text-fuchsia-300',
        eyebrow: 'Cards',
      }
    case 'character':
      return {
        icon: <UserRound size={13} />,
        className: 'rounded-lg bg-violet-950/20 border-l-[3px] border-violet-400/70 px-4 py-3 space-y-1.5',
        titleClass: 'text-violet-200',
        buttonClass: 'text-violet-400 hover:text-violet-200',
        eyebrow: 'Character',
      }
    case 'enemy':
      return {
        icon: <Swords size={13} />,
        className: 'rounded-lg bg-red-950/20 border-l-[3px] border-red-500/70 px-4 py-3 space-y-1.5',
        titleClass: 'text-red-300',
        buttonClass: 'text-red-500 hover:text-red-300',
        eyebrow: 'Enemy Intel',
      }
    case 'boss':
      return {
        icon: <Skull size={13} />,
        className: 'rounded-lg bg-red-950/25 border-l-[3px] border-red-400/80 px-4 py-3 space-y-1.5',
        titleClass: 'text-red-200',
        buttonClass: 'text-red-400 hover:text-red-200',
        eyebrow: 'Boss Prep',
      }
    case 'gf':
      return {
        icon: <Sparkles size={13} />,
        className: 'rounded-lg bg-emerald-950/20 border-l-[3px] border-emerald-400/70 px-4 py-3 space-y-1.5',
        titleClass: 'text-emerald-200',
        buttonClass: 'text-emerald-400 hover:text-emerald-200',
        eyebrow: 'GF',
      }
    case 'item':
      return {
        icon: <ShoppingBag size={13} />,
        className: 'rounded-lg bg-amber-950/20 border-l-[3px] border-amber-400/70 px-4 py-3 space-y-1.5',
        titleClass: 'text-amber-200',
        buttonClass: 'text-amber-400 hover:text-amber-200',
        eyebrow: 'Item',
      }
    case 'loot':
      return {
        icon: <ShoppingBag size={13} />,
        className: 'rounded-lg bg-orange-950/20 border-l-[3px] border-orange-400/70 px-4 py-3 space-y-1.5',
        titleClass: 'text-orange-200',
        buttonClass: 'text-orange-400 hover:text-orange-200',
        eyebrow: 'Loot',
      }
    case 'map':
      return {
        icon: <MapPin size={13} />,
        className: 'rounded-lg bg-cyan-950/20 border-l-[3px] border-cyan-400/70 px-4 py-3 space-y-1.5',
        titleClass: 'text-cyan-200',
        buttonClass: 'text-cyan-400 hover:text-cyan-200',
        eyebrow: 'Map',
      }
    case 'mechanics':
      return {
        icon: <BookOpenCheck size={13} />,
        className: 'rounded-lg bg-slate-800/70 border-l-[3px] border-slate-400/70 px-4 py-3 space-y-1.5',
        titleClass: 'text-slate-200',
        buttonClass: 'text-slate-400 hover:text-slate-200',
        eyebrow: 'Mechanics',
      }
    case 'preparation':
      return {
        icon: <Sparkles size={13} />,
        className: 'rounded-lg bg-blue-950/20 border-l-[3px] border-blue-400/70 px-4 py-3 space-y-1.5',
        titleClass: 'text-blue-200',
        buttonClass: 'text-blue-400 hover:text-blue-200',
        eyebrow: 'Preparation',
      }
    case 'route':
      return {
        icon: <MapPin size={13} />,
        className: 'rounded-lg bg-sky-950/20 border-l-[3px] border-sky-400/70 px-4 py-3 space-y-1.5',
        titleClass: 'text-sky-200',
        buttonClass: 'text-sky-400 hover:text-sky-200',
        eyebrow: 'Route',
      }
    case 'status':
      return {
        icon: <Activity size={13} />,
        className: 'rounded-lg bg-cyan-950/20 border-l-[3px] border-cyan-400/70 px-4 py-3 space-y-1.5',
        titleClass: 'text-cyan-200',
        buttonClass: 'text-cyan-400 hover:text-cyan-200',
        eyebrow: 'Status',
      }
    case 'story':
      return {
        icon: <BookOpenCheck size={13} />,
        className: 'rounded-lg bg-indigo-950/20 border-l-[3px] border-indigo-400/70 px-4 py-3 space-y-1.5',
        titleClass: 'text-indigo-200',
        buttonClass: 'text-indigo-400 hover:text-indigo-200',
        eyebrow: 'Story',
      }
    case 'achievement':
      return {
        icon: <Trophy size={13} />,
        className: 'rounded-lg bg-emerald-950/20 border-l-[3px] border-emerald-500/70 px-4 py-3 space-y-1.5',
        titleClass: 'text-emerald-300',
        buttonClass: 'text-emerald-500 hover:text-emerald-300',
        eyebrow: 'Achievement',
      }
    case 'spoiler':
      return {
        icon: <EyeOff size={13} />,
        className: 'rounded-lg bg-slate-900/70 border-l-[3px] border-slate-500/80 px-4 py-3 space-y-1.5',
        titleClass: 'text-slate-300',
        buttonClass: 'text-slate-400 hover:text-slate-200',
        eyebrow: 'Spoiler',
      }
    case 'point':
      return {
        icon: <MapPin size={13} />,
        className: 'rounded-lg bg-sky-950/20 border-l-[3px] border-sky-500/70 px-4 py-3 space-y-1.5',
        titleClass: 'text-sky-300',
        buttonClass: 'text-sky-500 hover:text-sky-300',
        eyebrow: 'Point of Interest',
      }
    case 'hint':
      return {
        icon: <Lightbulb size={13} />,
        className: 'rounded-lg bg-lime-950/15 border-l-[3px] border-lime-500/70 px-4 py-3 space-y-1.5',
        titleClass: 'text-lime-300',
        buttonClass: 'text-lime-500 hover:text-lime-300',
        eyebrow: 'Hint',
      }
    case 'training':
      return {
        icon: <Activity size={13} />,
        className: 'rounded-lg bg-teal-950/20 border-l-[3px] border-teal-400/70 px-4 py-3 space-y-1.5',
        titleClass: 'text-teal-200',
        buttonClass: 'text-teal-400 hover:text-teal-200',
        eyebrow: 'Training',
      }
    case 'treasure':
      return {
        icon: <Trophy size={13} />,
        className: 'rounded-lg bg-yellow-950/20 border-l-[3px] border-yellow-400/70 px-4 py-3 space-y-1.5',
        titleClass: 'text-yellow-200',
        buttonClass: 'text-yellow-400 hover:text-yellow-200',
        eyebrow: 'Treasure',
      }
    case 'warning':
      return {
        icon: <AlertTriangle size={13} />,
        className: 'rounded-lg bg-orange-950/20 border-l-[3px] border-orange-500/70 px-4 py-3 space-y-1.5',
        titleClass: 'text-orange-300',
        buttonClass: 'text-orange-500 hover:text-orange-300',
        eyebrow: 'Warning',
      }
    case 'note':
    default:
      return {
        icon: <Info size={13} />,
        className: 'rounded-lg bg-teal-950/20 border-l-[3px] border-teal-500/70 px-4 py-3 space-y-1.5',
        titleClass: 'text-teal-300',
        buttonClass: 'text-teal-500 hover:text-teal-300',
        eyebrow: 'Note',
      }
  }
}

function usesRefinementFlow(title: string, text: string, kind: CalloutKind) {
  if (kind === 'refinement') return true
  return /(?:card\s*mod|(?:t|i|f|l|mid|high|time|st|supt|recov|recovery|forbid|gfrecov|gfabl|med\s*lv\s*up|ammo|tool)\s*-?\s*(?:mag|med|rf|lv\s*up)|refin(?:e|ement))/i.test(`${title} ${text}`)
    && /(?:→|->)/.test(text)
}

function renderParagraphBlock(text: string, chapterId = '', flowContext?: RefinementFlowContext) {
  const directiveMatch = text.match(CALLOUT_DIRECTIVE_RE)
  if (directiveMatch) {
    const rawKind = directiveMatch[1]
    const title = directiveMatch[2].trim()
    const rest = text.slice(directiveMatch[0].length).trim()
    const rawLines = rest.split('\n').filter(l => l.trim().length > 0)
    const lines = rawLines.flatMap(l => autoSplitProse(l))
    const kind = normalizeCalloutKind(rawKind) ?? 'note'

    if (kind === 'shop' && hasEnoughPrices(rest)) {
      const items = extractPrices(rest)
      if (items.length >= 3) return <ShopGrid items={items} label={title} />
    }

    const refinementFlow = flowContext && usesRefinementFlow(title, rest, kind) ? flowContext : undefined

    return (
      <CollapsibleCallout
        title={title}
        lines={lines}
        kind={kind}
        collapseAt={COLLAPSE_AT}
        refinementFlow={refinementFlow}
      />
    )
  }

  const calloutMatch = text.match(CALLOUT_RE)

  if (calloutMatch) {
    const title    = calloutMatch[1]
    const rest     = text.slice(calloutMatch[0].length).trim()
    const rawLines = rest.split('\n').filter(l => l.trim().length > 0)
    const lines    = rawLines.flatMap(l => autoSplitProse(l))

    const isShop    = SHOP_WORDS.test(title)
    const kind      = calloutKind(title, rest, chapterId)

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

    const refinementFlow = flowContext && usesRefinementFlow(title, rest, kind) ? flowContext : undefined

    return (
      <CollapsibleCallout
        title={title}
        lines={lines}
        kind={kind}
        collapseAt={COLLAPSE_AT}
        refinementFlow={refinementFlow}
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
  if (flowContext && usesRefinementFlow('', text, 'note')) {
    return <RefinementFlowLines lines={lines} context={flowContext} />
  }
  return renderLines(lines)
}

function parseDirectiveCallout(text: string, chapterId = '') {
  const directiveMatch = text.match(CALLOUT_DIRECTIVE_RE)
  if (!directiveMatch) return null
  const rawKind = directiveMatch[1]
  const title = directiveMatch[2].trim()
  const rest = text.slice(directiveMatch[0].length).trim()
  const rawLines = rest.split('\n').filter(l => l.trim().length > 0)
  const lines = rawLines.flatMap(l => autoSplitProse(l))
  const kind = normalizeCalloutKind(rawKind) ?? calloutKind(title, rest, chapterId)
  return { title, lines, kind }
}

// ─── Collapsible callout ──────────────────────────────────────────────────────

function CollapsibleCallout({
  title,
  lines,
  kind,
  collapseAt,
  refinementFlow,
}: {
  title: string
  lines: string[]
  kind: CalloutKind
  collapseAt: number
  refinementFlow?: RefinementFlowContext
}) {
  const [expanded, setExpanded] = useState(false)
  const [revealed, setRevealed] = useState(kind !== 'spoiler')
  useEffect(() => {
    setExpanded(false)
    setRevealed(kind !== 'spoiler')
  }, [kind, title])

  const containsTable = splitLineBlocks(lines).some(block => block.type === 'table')
  const needsCollapse = !containsTable && !isMarkdownTable(lines) && lines.length > collapseAt
  const visible = revealed && needsCollapse && !expanded ? lines.slice(0, collapseAt) : lines
  const style = calloutStyle(kind)

  return (
    <div className={style.className}>
      <div className={cn('mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-wide', style.titleClass)}>
        {style.icon}
        <span>{style.eyebrow}</span>
        <span className="text-slate-600">/</span>
        <span className="normal-case tracking-normal text-slate-200">{title}</span>
      </div>
      {kind === 'spoiler' && !revealed ? (
        <div className="rounded-md border border-slate-700/50 bg-slate-950/45 px-3 py-2">
          <p className="text-sm text-slate-500 leading-relaxed">
            Spoiler content is hidden until you choose to reveal it.
          </p>
          <button
            onClick={() => setRevealed(true)}
            className={cn('mt-2 flex items-center gap-1 text-xs font-medium transition-colors', style.buttonClass)}
          >
            <EyeOff size={11} />
            Reveal spoiler
          </button>
        </div>
      ) : (
        visible.length > 0 && (refinementFlow
          ? <RefinementFlowLines lines={visible} context={refinementFlow} />
          : renderLines(visible))
      )}
      {revealed && needsCollapse && (
        <button
          onClick={() => setExpanded(e => !e)}
          className={cn(
            'mt-2 flex items-center gap-1 text-xs font-medium transition-colors',
            style.buttonClass
          )}
        >
          <ChevronDown size={11} className={cn('transition-transform duration-200', expanded && 'rotate-180')} />
          {expanded ? 'Show less' : `Show ${lines.length - collapseAt} more lines`}
        </button>
      )}
    </div>
  )
}

function ReferenceCalloutPanel({ items, chapterId, refinementFlow }: { items: string[]; chapterId: string; refinementFlow: RefinementFlowContext }) {
  const parsed = items.map(item => parseDirectiveCallout(item, chapterId)).filter(Boolean) as Array<{
    title: string
    lines: string[]
    kind: CalloutKind
  }>
  const first = parsed[0]
  if (!first) return null
  const style = calloutStyle(first.kind)

  return (
    <section className="overflow-hidden rounded-xl border border-slate-700/45 bg-slate-900/45">
      <div className="flex items-center gap-2 border-b border-slate-800/70 bg-slate-950/30 px-4 py-3">
        <span className={style.titleClass}>{style.icon}</span>
        <span className={cn('text-xs font-bold uppercase tracking-wide', style.titleClass)}>
          {style.eyebrow}
        </span>
      </div>
      <div className="divide-y divide-slate-800/70">
        {parsed.map((item, index) => (
          <ReferenceCalloutRow key={`${item.title}-${index}`} item={item} refinementFlow={refinementFlow} />
        ))}
      </div>
    </section>
  )
}

function ReferenceCalloutRow({ item, refinementFlow }: { item: { title: string; lines: string[]; kind: CalloutKind }; refinementFlow: RefinementFlowContext }) {
  const [expanded, setExpanded] = useState(false)
  const style = calloutStyle(item.kind)
  const containsTable = splitLineBlocks(item.lines).some(block => block.type === 'table')
  const needsCollapse = !containsTable && !isMarkdownTable(item.lines) && item.lines.length > 4
  const visible = needsCollapse && !expanded ? item.lines.slice(0, 4) : item.lines

  return (
    <div className="px-4 py-3">
      <div className={cn('mb-1.5 flex items-center gap-2 text-sm font-semibold', style.titleClass)}>
        {style.icon}
        <span className="text-slate-100">{item.title}</span>
      </div>
      {visible.length > 0 && (usesRefinementFlow(item.title, item.lines.join('\n'), item.kind)
        ? <RefinementFlowLines lines={visible} context={refinementFlow} />
        : renderLines(visible))}
      {needsCollapse && (
        <button
          onClick={() => setExpanded(value => !value)}
          className={cn('mt-2 flex items-center gap-1 text-xs font-medium transition-colors', style.buttonClass)}
        >
          <ChevronDown size={11} className={cn('transition-transform duration-200', expanded && 'rotate-180')} />
          {expanded ? 'Show less' : `Show ${item.lines.length - 4} more lines`}
        </button>
      )}
    </div>
  )
}

function isHeavyParagraph(text: string): boolean {
  return Boolean(
    text.match(CALLOUT_DIRECTIVE_RE) ||
    text.match(ENCOUNTERS_RE) ||
    text.startsWith('**Boss:') ||
    text.startsWith('Strategy') ||
    isMarkdownTable(text.split('\n').filter(line => line.trim()))
  )
}

function shouldRenderAsRouteStep(paras: string[], idx: number, chapterId: string): boolean {
  if (chapterId.startsWith('r0-')) return false
  const text = paras[idx]
  if (text.length > 240 || isHeavyParagraph(text)) return false
  return isHeavyParagraph(paras[idx - 1] ?? '') || isHeavyParagraph(paras[idx + 1] ?? '')
}

function RouteStep({ text }: { text: string }) {
  return (
    <div className="border-l-2 border-slate-700/70 pl-4 py-1">
      {renderParagraphBlock(text)}
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
  const isMissable = cp.type === 'missable'
  const [open, setOpen] = useState(false)
  const tone = isAch
    ? {
        wrap: 'bg-amber-950/18 border-yellow-600/35',
        icon: 'text-yellow-400',
        text: 'text-yellow-200',
        body: 'text-yellow-100/70',
        badge: 'achievement',
      }
    : isMissable
      ? {
          wrap: 'bg-amber-950/22 border-amber-600/45',
          icon: 'text-amber-400',
          text: 'text-amber-200',
          body: 'text-amber-100/70',
          badge: 'missable',
        }
      : {
          wrap: 'bg-teal-950/18 border-teal-700/35',
          icon: 'text-teal-400',
          text: 'text-teal-200',
          body: 'text-teal-100/70',
          badge: 'task',
        }

  return (
    <div className={cn(
      'rounded-lg border overflow-hidden transition-opacity duration-200',
      tone.wrap,
      completed && 'opacity-50',
    )}>
      <div className="flex items-start gap-3 px-3 py-2.5">
        <Checkbox checked={completed} onChange={onToggle} className="mt-0.5 shrink-0" />
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 flex-wrap">
              {isAch
                ? <Trophy size={13} className={cn(tone.icon, 'shrink-0')} />
                : isMissable
                  ? <AlertTriangle size={13} className={cn(tone.icon, 'shrink-0')} />
                  : <BookOpenCheck size={13} className={cn(tone.icon, 'shrink-0')} />
              }
              <span className={cn(
                'text-sm font-semibold',
                completed ? 'line-through text-slate-500' : tone.text
              )}>
                {cp.label}
              </span>
              {cp.achievementType && (
                <Badge variant={achTypeBadge(cp.achievementType)}>{cp.achievementType}</Badge>
              )}
              {!cp.achievementType && (
                <span className="text-[10px] uppercase tracking-wide text-slate-500">{tone.badge}</span>
              )}
            </div>
            <button
              onClick={() => setOpen(o => !o)}
              aria-label={`${open ? 'Hide' : 'Show'} checkpoint details for ${cp.label}`}
              className="text-slate-600 hover:text-slate-400 shrink-0"
            >
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
                  tone.body
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

function groupedCheckpoints(checkpoints: Checkpoint[]) {
  const groups: Checkpoint[][] = []
  const byLabel = new Map<string, Checkpoint[]>()
  for (const cp of checkpoints) {
    const key = cp.label.toLowerCase().replace(/\s+/g, ' ').trim()
    const group = byLabel.get(key)
    if (group) {
      group.push(cp)
    } else {
      const next = [cp]
      groups.push(next)
      byLabel.set(key, next)
    }
  }
  return groups
}

function CheckpointGroupCard({
  checkpoints,
  completedItems,
  onToggleItem,
}: {
  checkpoints: Checkpoint[]
  completedItems: Record<string, boolean>
  onToggleItem: (id: string) => void
}) {
  const [open, setOpen] = useState(false)

  if (checkpoints.length === 1) {
    const cp = checkpoints[0]
    return <CheckpointCard cp={cp} completed={!!completedItems[cp.id]} onToggle={() => onToggleItem(cp.id)} />
  }

  const completedCount = checkpoints.filter(cp => completedItems[cp.id]).length
  const completed = completedCount === checkpoints.length
  const primary = checkpoints[0]
  const hasAchievement = checkpoints.some(cp => cp.type === 'achievement')
  const hasMissable = checkpoints.some(cp => cp.type === 'missable')
  const hasTask = checkpoints.some(cp => cp.type === 'task')
  const details = [...new Set(checkpoints.map(cp => cp.description).filter(Boolean))]

  const toggleAll = () => {
    const targetComplete = !completed
    checkpoints.forEach(cp => {
      if (!!completedItems[cp.id] !== targetComplete) onToggleItem(cp.id)
    })
  }

  return (
    <div className={cn(
      'rounded-lg border overflow-hidden transition-opacity duration-200 bg-amber-950/20 border-amber-600/45',
      completed && 'opacity-50',
    )}>
      <div className="flex items-start gap-3 px-3 py-2.5">
        <Checkbox checked={completed} onChange={toggleAll} className="mt-0.5 shrink-0" />
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 flex-wrap">
              {hasAchievement
                ? <Trophy size={13} className="text-yellow-400 shrink-0" />
                : hasMissable
                  ? <AlertTriangle size={13} className="text-amber-400 shrink-0" />
                  : <BookOpenCheck size={13} className="text-teal-400 shrink-0" />
              }
              <span className={cn(
                'text-sm font-semibold',
                completed ? 'line-through text-slate-500' : 'text-amber-200'
              )}>
                {primary.label}
              </span>
              {hasAchievement && <Badge variant="violet">achievement</Badge>}
              {hasMissable && <span className="text-[10px] uppercase tracking-wide text-amber-400">missable</span>}
              {hasTask && <span className="text-[10px] uppercase tracking-wide text-teal-400">task</span>}
              {completedCount > 0 && !completed && (
                <span className="text-[10px] text-slate-500">{completedCount}/{checkpoints.length}</span>
              )}
            </div>
            <button
              onClick={() => setOpen(o => !o)}
              aria-label={`${open ? 'Hide' : 'Show'} checkpoint details for ${primary.label}`}
              className="text-slate-600 hover:text-slate-400 shrink-0"
            >
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
                <div className="space-y-1.5 mt-2">
                  {details.map((detail, index) => (
                    <p key={index} className="text-xs leading-relaxed text-amber-100/70">
                      {detail}
                    </p>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}

function CheckpointCards({
  checkpoints,
  completedItems,
  onToggleItem,
}: {
  checkpoints: Checkpoint[]
  completedItems: Record<string, boolean>
  onToggleItem: (id: string) => void
}) {
  return (
    <>
      {groupedCheckpoints(checkpoints).map(group => (
        <CheckpointGroupCard
          key={group.map(cp => cp.id).join('|')}
          checkpoints={group}
          completedItems={completedItems}
          onToggleItem={onToggleItem}
        />
      ))}
    </>
  )
}

function achTypeBadge(t: string) {
  const map: Record<string, 'violet' | 'teal' | 'emerald' | 'amber' | 'indigo'> = {
    gf: 'violet', cumulative: 'teal', story: 'emerald', missable: 'amber',
  }
  return map[t] ?? 'indigo'
}

// ─── Area encounter card ──────────────────────────────────────────────────────

function AreaEncounterCard({
  area,
  enemies,
  items,
  partyContext,
  characters,
  activePartyIds,
  magic,
  magicCompletedByCharacter,
  onToggleMagic,
  learnedBlueMagic,
  onToggleBlueMagic,
  completedItems,
  onToggleItem,
}: {
  area: AreaEncounter
  enemies: Enemy[]
  items: Item[]
  partyContext: PartyLevelContext
  characters: CharacterProfile[]
  activePartyIds: string[]
  magic: MagicSpell[]
  magicCompletedByCharacter: Record<string, Record<string, boolean>>
  onToggleMagic?: (characterId: string, spellId: string, next?: boolean) => void
  learnedBlueMagic: TrackerState['learnedBlueMagic']
  onToggleBlueMagic: (abilityId: string, next?: boolean) => void
  completedItems: Record<string, boolean>
  onToggleItem: (id: string) => void
}) {
  const [activeEnemyIndex, setActiveEnemyIndex] = useState(0)
  const enemyTabRefs = useRef<Array<HTMLButtonElement | null>>([])
  const enemyTabId = useId().replace(/:/g, '')
  const reducedMotion = useReducedMotion()
  const enemyMap = new Map(enemies.map(e => [e.id, e]))
  const activeEnemyIndexSafe = Math.min(activeEnemyIndex, Math.max(area.enemies.length - 1, 0))
  const activeEncounterEnemy = area.enemies[activeEnemyIndexSafe]
  const defeatedCount = area.enemies.filter(encounterEnemy => {
    const enemy = enemyMap.get(encounterEnemy.id)
    return enemy && completedItems[enemyDefeatedTrackerId(enemy.id)]
  }).length

  function handleEnemyTabKeyDown(event: React.KeyboardEvent<HTMLButtonElement>, index: number) {
    let nextIndex = index
    if (event.key === 'ArrowRight') nextIndex = (index + 1) % area.enemies.length
    else if (event.key === 'ArrowLeft') nextIndex = (index - 1 + area.enemies.length) % area.enemies.length
    else if (event.key === 'Home') nextIndex = 0
    else if (event.key === 'End') nextIndex = area.enemies.length - 1
    else return
    event.preventDefault()
    event.stopPropagation()
    setActiveEnemyIndex(nextIndex)
    enemyTabRefs.current[nextIndex]?.focus()
  }

  return (
    <section className="overflow-hidden rounded-xl border border-violet-800/30 bg-violet-950/20">
      <div className="flex min-w-0 flex-wrap items-center gap-x-2 gap-y-1 border-b border-violet-800/20 bg-violet-900/20 px-4 py-2">
        <Swords size={11} className="text-violet-400 shrink-0" />
        <h2 className="min-w-0 flex-1 break-words text-xs font-semibold uppercase tracking-wider text-violet-200">{area.area}</h2>
        {defeatedCount > 0 && <span className="shrink-0 text-[10px] text-teal-300">{defeatedCount} defeated</span>}
      </div>

      {area.enemies.length > 1 && (
        <div
          role="tablist"
          aria-label={`${area.area} enemies`}
          aria-orientation="horizontal"
          className="grid grid-cols-2 border-b border-violet-900/30 bg-slate-950/20 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6"
        >
          {area.enemies.map((ae, index) => {
            const enemy = enemyMap.get(ae.id)
            const isDefeated = Boolean(enemy && completedItems[enemyDefeatedTrackerId(enemy.id)])
            const isActive = activeEnemyIndexSafe === index
            return (
              <button
                key={`${ae.id}-${index}`}
                ref={element => { enemyTabRefs.current[index] = element }}
                id={`${enemyTabId}-tab-${index}`}
                type="button"
                role="tab"
                aria-selected={isActive}
                aria-controls={`${enemyTabId}-panel`}
                aria-label={`${ae.name}${isDefeated ? ', defeated' : ''}`}
                tabIndex={isActive ? 0 : -1}
                onClick={() => setActiveEnemyIndex(index)}
                onKeyDown={event => handleEnemyTabKeyDown(event, index)}
                className={cn(
                  'flex min-h-10 min-w-0 items-center justify-between gap-1.5 border-b-2 px-2 py-1.5 text-left text-[10px] font-medium leading-tight transition-colors focus-visible:z-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-violet-300 sm:px-3 sm:text-[11px]',
                  isActive
                    ? 'border-violet-400 bg-violet-900/25 text-violet-100'
                    : 'border-transparent text-slate-400 hover:bg-slate-900/70 hover:text-slate-100',
                )}
                title={ae.name}
              >
                <span className={cn('min-w-0 break-words', isDefeated && 'text-slate-500 line-through decoration-teal-500/60')}>{ae.name}</span>
                {isDefeated && <Check size={12} aria-hidden="true" className="shrink-0 text-teal-300" />}
                {isActive && <span className="sr-only">Selected</span>}
              </button>
            )
          })}
        </div>
      )}

      {activeEncounterEnemy && (() => {
        const enemy = enemyMap.get(activeEncounterEnemy.id)
        return (
          <motion.div
            id={`${enemyTabId}-panel`}
            role={area.enemies.length > 1 ? 'tabpanel' : undefined}
            aria-labelledby={area.enemies.length > 1 ? `${enemyTabId}-tab-${activeEnemyIndexSafe}` : undefined}
            tabIndex={area.enemies.length > 1 ? 0 : undefined}
            initial={reducedMotion ? false : { opacity: 0, y: 2 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reducedMotion ? 0 : 0.12, ease: 'easeOut' }}
            className="min-w-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-violet-300"
          >
            <EnemyRow
              key={`${activeEncounterEnemy.id}-${activeEnemyIndexSafe}`}
              ae={activeEncounterEnemy}
              enemy={enemy ?? null}
              mugAvailable={area.mugAvailable !== false}
              partyContext={partyContext}
              characters={characters}
              activePartyIds={activePartyIds}
              magic={magic}
              items={items}
              magicCompletedByCharacter={magicCompletedByCharacter}
              onToggleMagic={onToggleMagic}
              learnedBlueMagic={learnedBlueMagic}
              onToggleBlueMagic={onToggleBlueMagic}
              completedItems={completedItems}
              onToggleItem={onToggleItem}
            />
          </motion.div>
        )
      })()}
    </section>
  )
}

function removeStructuredEnemyNoteFacts(
  notes: string,
  structuredFields: { draw: boolean; mug: boolean; drop: boolean },
) {
  return notes
    .split(/;\s*/)
    .map(clause => clause.trim())
    .map(clause => {
      if (structuredFields.draw && /^draws?\b/i.test(clause)) return null
      if (structuredFields.mug && /^mug(?:\b|\s*&|\/)/i.test(clause)) return null
      if (structuredFields.drop && /^drops?\b/i.test(clause)) return null
      return clause
    })
    .filter((clause): clause is string => Boolean(clause))
    .join('; ')
}

interface DropRateEntry {
  item: string
  rate: string
}

interface DropRateGroup {
  label: string
  entries: DropRateEntry[]
}

function parseDropRateEntries(value: string): DropRateEntry[] {
  const entries = [...value.matchAll(/([^();]+?)\s*\((\d+(?:\.\d+)?%)\)/g)]
    .map(match => ({ item: match[1].trim(), rate: match[2] }))
    .filter(entry => entry.item.length > 0)
  return entries.length ? entries : [{ item: value.trim(), rate: '' }]
}

function parseDropRateGroups(value: string): DropRateGroup[] {
  const labeledGroups = [...value.matchAll(/(?:^|;\s*)(Normal rates|Rare Item equipped):\s*([^;]*?)(?=;\s*(?:Normal rates|Rare Item equipped):|$)/gi)]
  if (labeledGroups.length) {
    return labeledGroups.map(match => ({
      label: /^normal/i.test(match[1]) ? 'Normal' : 'Rare Item',
      entries: parseDropRateEntries(match[2]),
    }))
  }
  return [{ label: 'Drop', entries: parseDropRateEntries(value) }]
}

function DropRateList({ entries }: { entries: DropRateEntry[] }) {
  return (
    <ul className="mt-1 space-y-1">
      {entries.map((entry, index) => (
        <li key={`${entry.item}-${index}`} className="flex min-w-0 items-baseline justify-between gap-3 text-[11px] leading-snug">
          <span className="min-w-0 break-words text-slate-200">{entry.item}</span>
          {entry.rate && <span className="shrink-0 font-mono tabular-nums text-[10px] text-slate-400">{entry.rate}</span>}
        </li>
      ))}
    </ul>
  )
}

function optionScope(option: ContextualOption) {
  return option.guaranteed ? null : `Only at Lv ${formatPossibleLevels(option.levels)}`
}

function optionChances(
  bands: Array<{ lvMin: number; lvMax: number; value: string | null; chance?: string | null }> | undefined,
  option: ContextualOption,
  fallback?: string | null,
) {
  const grouped = new Map<string, number[]>()
  for (const level of option.levels) {
    const band = bands?.find(candidate => level >= candidate.lvMin && level <= candidate.lvMax && candidate.value === option.value)
    const chance = band?.chance ?? fallback
    if (!chance) continue
    const levels = grouped.get(chance) ?? []
    levels.push(level)
    grouped.set(chance, levels)
  }
  return [...grouped.entries()].map(([chance, levels]) => ({ chance, levels }))
}

function affinityGroups(enemy: Enemy | null) {
  const groups: Record<'Weak to' | 'Resists' | 'Nullifies' | 'Absorbs', string[]> = {
    'Weak to': [], Resists: [], Nullifies: [], Absorbs: [],
  }
  if (!enemy) return groups
  for (const [element, rawValue] of Object.entries(enemy.elementals ?? {})) {
    if (!rawValue) continue
    const value = rawValue.trim().toLowerCase()
    const name = `${element[0].toUpperCase()}${element.slice(1)}`
    if (/absorb/.test(value) || value === '-') {
      groups.Absorbs.push(name)
      continue
    }
    if (/immune|mag[- ]?miss|^no$|^miss$/.test(value)) {
      groups.Nullifies.push(name)
      continue
    }
    const multiplier = value.match(/x\s*([\d.,]+)/i)?.[1]
    if (!multiplier) continue
    const amount = Number(multiplier.replace(',', '.'))
    if (!Number.isFinite(amount) || amount === 1) continue
    const shownMultiplier = `×${String(amount).replace('.', '.')}`
    if (amount > 1) groups['Weak to'].push(`${name} (${shownMultiplier})`)
    else groups.Resists.push(`${name} (${shownMultiplier})`)
  }
  return groups
}

function statRange(values: number[], format: (value: number) => string = value => String(value)) {
  const min = Math.min(...values)
  const max = Math.max(...values)
  return min === max ? format(min) : `${format(min)}–${format(max)}`
}

function cardFallback(value: string | null | undefined) {
  if (!value || /^(?:none|---|nothing\b|can't turn into a card)/i.test(value.trim())) return undefined
  const entries = parseDropRateEntries(value)
  const first = entries[0]
  return first ? { name: first.item, chance: first.rate || undefined } : undefined
}

function characterFirstName(name: string) {
  return name.trim().split(/\s+/)[0] || name
}

function EnemyRow({
  ae,
  enemy,
  mugAvailable,
  partyContext,
  characters,
  activePartyIds,
  magic,
  items,
  magicCompletedByCharacter,
  onToggleMagic,
  learnedBlueMagic,
  onToggleBlueMagic,
  completedItems,
  onToggleItem,
}: {
  ae: AreaEncounter['enemies'][number]
  enemy: Enemy | null
  items: Item[]
  mugAvailable: boolean
  partyContext: PartyLevelContext
  characters: CharacterProfile[]
  activePartyIds: string[]
  magic: MagicSpell[]
  magicCompletedByCharacter: Record<string, Record<string, boolean>>
  onToggleMagic?: (characterId: string, spellId: string, next?: boolean) => void
  learnedBlueMagic: TrackerState['learnedBlueMagic']
  onToggleBlueMagic: (abilityId: string, next?: boolean) => void
  completedItems: Record<string, boolean>
  onToggleItem: (id: string) => void
}) {
  const [noteOpen, setNoteOpen] = useState(false)
  const rawNotes = ae.notes ?? ''
  const activeCharacters = activePartyIds.flatMap(id => {
    const character = characters.find(candidate => candidate.id === id)
    return character ? [character] : []
  })
  const spellsByName = magicByName(magic)

  const levelContext = enemy ? resolveEnemyLevelContext(enemy, partyContext, { lvMin: ae.lvMin, lvMax: ae.lvMax }) : null
  const drawOptions: ContextualOption[] = ae.drawMagic
    ? ae.drawMagic.map(value => ({ value, levels: levelContext?.levels ?? [], guaranteed: true }))
    : contextualDrawMagic(enemy, levelContext?.levels ?? [])
  const mugOptions = !mugAvailable
    ? []
    : Object.prototype.hasOwnProperty.call(ae, 'mug')
      ? contextualValue(undefined, ae.mug, levelContext?.levels ?? [])
      : contextualValue(enemy?.mugByLevel, enemy?.mug, levelContext?.levels ?? [])
  const dropOptions = contextualValue(enemy?.dropByLevel, enemy?.drop, levelContext?.levels ?? [])
  const notes = removeStructuredEnemyNoteFacts(rawNotes, {
    draw: drawOptions.length > 0,
    mug: mugOptions.length > 0,
    drop: dropOptions.length > 0,
  })
  const noteLong = notes.length > 110
  const abilityOptions = contextualEnemyAbilities(enemy, levelContext?.levels ?? [])
  const affinityData = affinityGroups(enemy)
  const hasAffinities = Object.values(affinityData).some(values => values.length > 0)
  const currentStats = statsForEnemyLevels(enemy, levelContext?.levels ?? [])
  const currentHpValues = [...new Set(currentStats.map(stat => stat.hp))]
  const hpText = ae.hp !== undefined
    ? ae.hp.toLocaleString()
    : currentHpValues.length > 0
      ? statRange(currentHpValues, value => value.toLocaleString())
      : enemy
        ? enemy.hpMin === enemy.hpMax
          ? enemy.hpMin.toLocaleString()
          : `${enemy.hpMin.toLocaleString()}–${enemy.hpMax.toLocaleString()}`
        : undefined
  const trackerId = enemy?.id ?? ae.id
  const defeatedId = enemyDefeatedTrackerId(trackerId)
  const defeated = Boolean(completedItems[defeatedId])
  const levelLabel = levelContext
    ? levelContext.levels.length > 1
      ? `Possible Lv ${formatPossibleLevels(levelContext.levels)}`
      : `Lv ${formatPossibleLevels(levelContext.levels)}`
    : null
  const levelSource = levelContext?.source === 'fixed'
    ? 'Fixed'
    : ae.lvMin !== undefined || ae.lvMax !== undefined
      ? 'Encounter override'
      : levelContext?.source === 'capped'
        ? `Party-scaled · capped ${levelContext.levelMin}–${levelContext.levelMax}`
        : 'Party-scaled'
  const mugBands = enemy?.mugByLevel
  const dropBands = enemy?.dropByLevel
  const cardCommon = enemy?.cardResults?.common ?? cardFallback(enemy?.cards.common)
  const cardRare = enemy?.cardResults?.rare ?? cardFallback(enemy?.cards.rare)
  const cardDrop = enemy?.cardResults?.drop ?? cardFallback(enemy?.cardDrop)
  const cardFacts = [
    cardCommon && { label: 'Common result', value: `${cardCommon.name}${cardCommon.chance ? ` (${cardCommon.chance})` : ''}` },
    cardRare && { label: 'Rare result', value: `${cardRare.name}${cardRare.chance ? ` (${cardRare.chance})` : ''}` },
    cardDrop && { label: 'Post-battle card drop', value: `${cardDrop.name}${cardDrop.chance ? ` (${cardDrop.chance})` : ''}` },
  ].filter((value): value is { label: string; value: string } => Boolean(value))
  const devourOptions = contextualValue(enemy?.devourByLevel, enemy?.devour, levelContext?.levels ?? [])
  const statusEffects = enemy?.statusEffects ?? []
  const statusImmune = statusEffects.filter(effect => /^(?:0%|immune|no effect)$/i.test(effect.chance.trim()))
  const statusVulnerable = statusEffects.filter(effect => !/^(?:0%|immune|no effect)$/i.test(effect.chance.trim()))
  const scanCaption = enemy?.scan && !/^(?:none|---)$/i.test(enemy.scan.trim()) ? enemy.scan.trim() : undefined
  const hasDetails = currentStats.length > 0 || abilityOptions.length > 0 || statusEffects.length > 0 || Boolean(enemy?.statusVulnerabilitiesNote) || devourOptions.length > 0 || Boolean(enemy?.undead || enemy?.gravityVulnerable)
  const statRows = currentStats.length > 0 ? [
    { label: 'HP', values: currentStats.map(stat => stat.hp), format: (value: number) => value.toLocaleString() },
    { label: 'STR', values: currentStats.map(stat => stat.str) },
    { label: 'MAG', values: currentStats.map(stat => stat.mag) },
    { label: 'VIT', values: currentStats.map(stat => stat.vit) },
    { label: 'SPR', values: currentStats.map(stat => stat.spr) },
    { label: 'SPD', values: currentStats.map(stat => stat.spd) },
    { label: 'EVA', values: currentStats.map(stat => stat.eva) },
    { label: 'EXP', values: currentStats.map(stat => stat.exp) },
  ].map(row => ({ ...row, value: statRange(row.values, row.format) })) : []

  return (
    <article className={cn('min-w-0 px-3 py-2 sm:px-4 sm:py-3', defeated && 'bg-teal-950/10')}>
      <div className="flex min-w-0 items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <div className="flex min-w-0 flex-wrap items-center gap-x-2 gap-y-1">
            <h3 className={cn('break-words text-sm font-semibold leading-tight', defeated ? 'text-slate-300 line-through decoration-teal-400/50' : 'text-slate-100')}>
              {ae.name}
            </h3>
            {defeated && <span className="text-[10px] font-medium text-teal-300">Defeated</span>}
          </div>
          {scanCaption && <p className="mt-0.5 text-[10px] leading-snug text-slate-500"><span className="mr-1 font-semibold uppercase tracking-wide text-slate-400">Scan</span>{scanCaption}</p>}
          <div className="mt-1 flex min-w-0 flex-wrap items-baseline gap-x-2.5 gap-y-0.5 text-[10px] leading-snug">
            {levelLabel && <span className="text-slate-200">{levelLabel} <span className="text-slate-500">· {levelSource}</span></span>}
            {hpText !== undefined && <span className="text-slate-300"><span className="text-slate-500">HP</span> <strong className="font-mono text-[11px] font-semibold tabular-nums text-slate-100">{hpText}</strong></span>}
            {enemy && <span className="text-violet-200"><span className="text-slate-500">AP</span> <strong className="font-mono tabular-nums">{enemy.ap}</strong></span>}
          </div>
        </div>
        <button
          type="button"
          role="checkbox"
          aria-checked={defeated}
          aria-label={`${defeated ? 'Unmark' : 'Mark'} ${ae.name} ${defeated ? 'as not defeated' : 'defeated'}`}
          onClick={() => onToggleItem(defeatedId)}
          className={cn(
            'inline-flex min-h-8 shrink-0 items-center justify-center gap-1.5 rounded-md border px-2 text-[10px] font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-300 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950',
            defeated
              ? 'border-teal-700/60 bg-teal-950/40 text-teal-200 hover:bg-teal-900/50'
              : 'border-slate-700 bg-slate-900/40 text-slate-300 hover:border-teal-700/70 hover:text-teal-200',
          )}
        >
          {defeated && <Check size={12} aria-hidden="true" />}
          {defeated ? 'Defeated' : 'Mark defeated'}
        </button>
      </div>

      {hasAffinities && (
        <div className="mt-1.5 flex min-w-0 flex-wrap items-baseline gap-x-2.5 gap-y-0.5 border-l-2 border-rose-500/50 pl-2 text-[10px] leading-snug">
          {Object.entries(affinityData).filter(([, values]) => values.length > 0).map(([label, values]) => (
            <span key={label} className="min-w-0 break-words">
              <strong className="font-medium text-slate-300">{label}:</strong> <span className="text-slate-400">{values.join(', ')}</span>
            </span>
          ))}
        </div>
      )}

      {(drawOptions.length > 0 || mugOptions.length > 0 || dropOptions.length > 0 || cardFacts.length > 0) && (
        <div className="mt-2 grid min-w-0 gap-x-5 gap-y-3 border-t border-slate-800/70 pt-2 sm:grid-cols-2">
          {drawOptions.length > 0 && (
            <section aria-label="Draw magic" className="min-w-0">
              <h4 className="mb-1 text-[9px] font-semibold uppercase tracking-[0.12em] text-violet-200">Draw</h4>
              {activeCharacters.length > 0 && <p className="mb-1 text-[9px] leading-snug text-slate-500">Mark stock complete for active party members.</p>}
              <ul className="grid min-w-0 grid-cols-1 gap-x-4 sm:grid-cols-2">
                {drawOptions.map(option => {
                  const spell = spellsByName.get(option.value.toLowerCase().replace(/[^a-z0-9]+/g, ''))
                  return (
                    <li key={option.value} className="flex min-w-0 items-center gap-2 border-b border-slate-800/50 py-1">
                      <span className="min-w-0 flex-1 break-words text-[10px] font-medium text-slate-100">{option.value}</span>
                      {optionScope(option) && <span className="shrink-0 text-[9px] text-amber-200">{optionScope(option)}</span>}
                      {activeCharacters.length > 0 && (
                        <div className="ml-auto flex shrink-0 items-center gap-1" aria-label={`${option.value} magic stock by active party member`}>
                          {activeCharacters.map(character => {
                            const stocked = Boolean(spell && isMagicCompleted({ magicCompletedByCharacter }, character.id, spell.id))
                            return (
                              <button
                                key={character.id}
                                type="button"
                                role="checkbox"
                                aria-checked={stocked}
                                aria-label={`${character.name}: ${option.value} ${stocked ? 'marked complete' : 'not marked complete'}`}
                                title={`${character.name} · ${option.value}`}
                                disabled={!spell || !onToggleMagic}
                                onClick={() => spell && onToggleMagic?.(character.id, spell.id, !stocked)}
                                className={cn(
                                  'flex h-8 min-w-8 items-center justify-center rounded border px-2 text-[10px] font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-300 focus-visible:ring-offset-1 focus-visible:ring-offset-slate-950 disabled:cursor-not-allowed disabled:opacity-50',
                                  stocked
                                    ? 'border-teal-600/60 bg-teal-950/50 text-teal-200'
                                    : 'border-slate-700 bg-slate-900/60 text-slate-400 hover:border-teal-700/70 hover:text-teal-200',
                                )}
                              >
                                {stocked ? <Check size={13} aria-hidden="true" /> : characterFirstName(character.name)}
                              </button>
                            )
                          })}
                        </div>
                      )}
                    </li>
                  )
                })}
              </ul>
            </section>
          )}

          {mugOptions.length > 0 && (
            <section aria-label="Mug results" className="min-w-0">
              <h4 className="mb-1 text-[9px] font-semibold uppercase tracking-[0.12em] text-amber-200">Mug</h4>
              <div className="grid min-w-0 gap-x-4 sm:grid-cols-2">
                {mugOptions.map(option => {
                  const tables = parseDropRateEntries(option.value)
                  const chanceGroups = optionChances(mugBands, option, enemy?.mugChance)
                  return (
                    <div key={option.value} className="min-w-0 border-t border-slate-800/50 py-1 first:border-t-0">
                      <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-0.5">
                        {optionScope(option) && <span className="text-[9px] text-amber-200">{optionScope(option)}</span>}
                        {chanceGroups.length > 0 && <span className="text-[9px] text-slate-500">Success {chanceGroups.map(group => `${group.chance}${group.levels.length === 1 && option.levels.length > 1 ? ` at Lv ${group.levels[0]}` : ''}`).join(' · ')}</span>}
                      </div>
                      <DropRateList entries={tables} />
                      <BlueMagicConnections
                        text={option.value}
                        items={items}
                        state={{ learnedBlueMagic }}
                        onToggle={onToggleBlueMagic}
                        sourceLabel="Mug"
                      />
                    </div>
                  )
                })}
              </div>
            </section>
          )}

          {dropOptions.length > 0 && (
            <section aria-label="Drop results" className="min-w-0">
              <h4 className="mb-1 text-[9px] font-semibold uppercase tracking-[0.12em] text-cyan-200">Drops</h4>
              <div className="grid min-w-0 gap-x-4 sm:grid-cols-2">
                {dropOptions.map(option => {
                  const tables = parseDropRateGroups(option.value)
                  const normal = tables.filter(group => group.label !== 'Rare Item')
                  const rare = tables.filter(group => group.label === 'Rare Item')
                  const chanceGroups = optionChances(dropBands, option, enemy?.dropChance)
                  return (
                    <div key={option.value} className="min-w-0 border-t border-slate-800/50 py-1 first:border-t-0">
                      <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-0.5">
                        {optionScope(option) && <span className="text-[9px] text-amber-200">{optionScope(option)}</span>}
                        {chanceGroups.length > 0 && <span className="text-[9px] text-slate-500">Drop chance {chanceGroups.map(group => `${group.chance}${group.levels.length === 1 && option.levels.length > 1 ? ` at Lv ${group.levels[0]}` : ''}`).join(' · ')}</span>}
                      </div>
                      {normal.map((group, index) => (
                        <div key={`${group.label}-${index}`}>
                          {normal.length > 1 && <p className="mt-1 text-[9px] font-medium text-slate-500">Normal</p>}
                          <DropRateList entries={group.entries} />
                        </div>
                      ))}
                      {rare.length > 0 && (
                        <details className="mt-1 border-t border-slate-800/70 pt-1">
                          <summary className="w-fit min-h-7 cursor-pointer select-none text-[10px] font-medium text-amber-200 underline decoration-amber-700/70 underline-offset-2 marker:hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300">
                            Rare Item ability table
                          </summary>
                          <p className="mt-1 text-[9px] leading-relaxed text-slate-500">Alternate results while the Rare Item ability is equipped.</p>
                          {rare.map((group, index) => <DropRateList key={`${group.label}-${index}`} entries={group.entries} />)}
                        </details>
                      )}
                      <BlueMagicConnections
                        text={option.value}
                        items={items}
                        state={{ learnedBlueMagic }}
                        onToggle={onToggleBlueMagic}
                        sourceLabel="Drop"
                      />
                    </div>
                  )
                })}
              </div>
            </section>
          )}

          {cardFacts.length > 0 && (
            <section aria-label="Card information" className="min-w-0">
              <h4 className="mb-1 text-[9px] font-semibold uppercase tracking-[0.12em] text-indigo-200">Cards</h4>
              <ul className="grid min-w-0 gap-x-4 gap-y-0.5 text-[10px] sm:grid-cols-2">
                {cardFacts.map(fact => (
                  <li key={fact.label} className="min-w-0 break-words text-slate-300">
                    <span className="text-slate-500">{fact.label}:</span> {fact.value}
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>
      )}

      {hasDetails && (
        <details className="mt-2 border-t border-slate-800/70 pt-1">
          <summary className="w-fit min-h-8 cursor-pointer select-none text-[10px] font-medium text-slate-300 underline decoration-slate-600 underline-offset-2 marker:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-300">
            Combat details, stats & status
          </summary>
          <div className="grid min-w-0 gap-x-5 gap-y-3 py-2 sm:grid-cols-2">
                {statRows.length > 0 && (
                  <section className="min-w-0 sm:col-span-2">
                    <div className="flex flex-wrap items-baseline justify-between gap-x-3">
                      <h4 className="text-[10px] font-semibold uppercase tracking-wide text-cyan-200">Stats & EXP</h4>
                      {currentStats.length > 1 && <span className="text-[9px] text-slate-500">Ranges across possible Lv {formatPossibleLevels(currentStats.map(stat => stat.level))}</span>}
                    </div>
                    <dl className="mt-1 grid grid-cols-2 gap-x-4 gap-y-0.5 sm:grid-cols-4">
                      {statRows.map(row => (
                        <div key={row.label} className="flex min-w-0 items-baseline justify-between gap-2 border-b border-slate-800/50 py-0.5 text-[10px]">
                          <dt className="shrink-0 text-slate-500">{row.label}</dt>
                          <dd className="min-w-0 break-words text-right font-mono tabular-nums text-slate-200">{row.value}</dd>
                        </div>
                      ))}
                    </dl>
                  </section>
                )}
                {abilityOptions.length > 0 && (
                  <section className="min-w-0">
                    <h4 className="text-[10px] font-semibold uppercase tracking-wide text-amber-200">Abilities & attacks</h4>
                    <ul className="mt-1 space-y-0.5 text-[10px] text-slate-300">
                      {abilityOptions.map(option => (
                        <li key={option.value} className="break-words">{option.value}{optionScope(option) && <span className="ml-1 text-[9px] text-amber-200">({optionScope(option)})</span>}</li>
                      ))}
                    </ul>
                  </section>
                )}
                {statusEffects.length > 0 ? (
                  <section className="min-w-0">
                    <h4 className="text-[10px] font-semibold uppercase tracking-wide text-rose-200">Status effects</h4>
                    {statusVulnerable.length > 0 && <p className="mt-1 break-words text-[10px] leading-relaxed text-slate-300"><span className="text-slate-500">Can affect:</span> {statusVulnerable.map(effect => `${effect.name} ${effect.chance}`).join(' · ')}</p>}
                    {statusImmune.length > 0 && <p className="mt-1 break-words text-[10px] leading-relaxed text-slate-300"><span className="text-slate-500">Unaffected:</span> {statusImmune.map(effect => effect.name).join(', ')}</p>}
                  </section>
                ) : enemy?.statusVulnerabilitiesNote ? (
                  <section className="min-w-0">
                    <h4 className="text-[10px] font-semibold uppercase tracking-wide text-rose-200">Status effects</h4>
                    <p className="mt-1 break-words text-[10px] leading-relaxed text-slate-400">{enemy.statusVulnerabilitiesNote}</p>
                  </section>
                ) : null}
                {devourOptions.length > 0 && (
                  <section className="min-w-0">
                    <h4 className="text-[10px] font-semibold uppercase tracking-wide text-emerald-200">Devour</h4>
                    <ul className="mt-1 space-y-0.5 text-[10px] text-slate-300">
                      {devourOptions.map(option => <li key={option.value} className="break-words">{option.value}{optionScope(option) && <span className="ml-1 text-[9px] text-amber-200">({optionScope(option)})</span>}</li>)}
                    </ul>
                  </section>
                )}
                {(enemy?.undead || enemy?.gravityVulnerable) && (
                  <section className="min-w-0">
                    <h4 className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">Other traits</h4>
                    <p className="mt-1 break-words text-[10px] leading-relaxed text-slate-300">
                      {[enemy.undead && 'Undead', enemy.gravityVulnerable && 'Vulnerable to Gravity'].filter(Boolean).join(' · ')}
                    </p>
                  </section>
                )}
          </div>
        </details>
      )}

      {notes && (
        <div className="mt-1.5 min-w-0 border-l-2 border-cyan-800/50 py-1 pl-2 text-[11px] leading-relaxed text-slate-400 [overflow-wrap:anywhere]">
          <div className="mb-0.5 flex items-center gap-1.5 text-[9px] font-semibold uppercase tracking-wide text-cyan-300/70">
            <Info size={10} /> Field note
          </div>
          <p className={cn(!noteOpen && noteLong && 'line-clamp-2')}>{renderInline(notes)}</p>
          {noteLong && (
            <button
              type="button"
              onClick={() => setNoteOpen(value => !value)}
              aria-expanded={noteOpen}
              className="mt-0.5 min-h-7 text-[10px] text-slate-400 underline underline-offset-2 hover:text-slate-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
            >
              {noteOpen ? 'Show less' : 'Show full note'}
            </button>
          )}
        </div>
      )}
    </article>
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

function normalizedEnemyName(name: string) {
  return name.toLowerCase().replace(/[^a-z0-9]/g, '')
}

function bossEnemyForName(name: string, enemies: Enemy[]) {
  const cleanedName = name.replace(/^\d+\s*x\s*/i, '').trim()
  const normalizedName = normalizedEnemyName(cleanedName)
  const aliases: Record<string, string> = {
    ultimeciafinalform: 'Ultimecia (final)',
    ultimecialowerportion: 'Ultimecia (appendage)',
  }
  const aliasedName = aliases[normalizedName]
  if (aliasedName) {
    const aliasKey = normalizedEnemyName(aliasedName)
    const aliasMatch = enemies.find(enemy => normalizedEnemyName(enemy.name) === aliasKey)
    if (aliasMatch) return aliasMatch
  }

  const exactMatch = enemies.find(enemy => normalizedEnemyName(enemy.name) === normalizedName)
  if (exactMatch) return exactMatch

  return enemies.find(enemy => {
    const baseName = enemy.name.replace(/\s*\([^)]*\)\s*$/, '')
    return normalizedEnemyName(baseName) === normalizedName
  })
}

function BossStatBlock({ text, chapterId, enemies, completedItems, onToggleItem }: {
  text: string
  chapterId: string
  enemies: Enemy[]
  completedItems: Record<string, boolean>
  onToggleItem: (id: string) => void
}) {
  const lines = text.split('\n')
  const header  = lines[0]
  const bullets = lines.slice(1).filter(l => l.startsWith('- '))

  const nameMatch = header.match(/\*\*Boss:\s*(.+?)\*\*/)
  const lvMatch   = header.match(/\(Lv\s+([^)]+)\)/)
  const hpMatch   = header.match(/HP:\s*([\d,\s~\-]+?)(?:\s*\||$)/)
  const apMatch   = header.match(/AP:\s*(\d+)/)
  const expMatch  = header.match(/EXP:\s*([\d,]+)/)
  const name      = nameMatch?.[1] ?? 'Boss'
  const images    = getBossImages(chapterId, name)
  const enemy     = bossEnemyForName(name, enemies)
  const defeatedId = enemy ? enemyDefeatedTrackerId(enemy.id) : null
  const defeated = defeatedId ? Boolean(completedItems[defeatedId]) : false

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
        {defeatedId && (
          <button
            type="button"
            role="checkbox"
            aria-checked={defeated}
            aria-label={`${defeated ? 'Unmark' : 'Mark'} ${name} ${defeated ? 'as not defeated' : 'defeated'}`}
            onClick={() => onToggleItem(defeatedId)}
            className={cn(
              'ml-auto inline-flex min-h-8 shrink-0 items-center justify-center gap-1.5 rounded-md border px-2 text-[10px] font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-300 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950',
              defeated
                ? 'border-teal-700/60 bg-teal-950/40 text-teal-200 hover:bg-teal-900/50'
                : 'border-slate-700 bg-slate-900/40 text-slate-300 hover:border-teal-700/70 hover:text-teal-200',
            )}
          >
            {defeated && <Check size={12} aria-hidden="true" />}
            {defeated ? 'Defeated' : 'Mark defeated'}
          </button>
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

      {images.length > 0 && (
        <div className="-mx-4 -mb-3 mt-3 border-t border-red-900/40 bg-slate-950/25">
          <ImageGrid images={images} />
        </div>
      )}
    </div>
  )
}

// ─── Boss section (stat blocks + strategy) ────────────────────────────────────

function BossSection({ chapterId, bosses, strategy, enemies, completedItems, onToggleItem }: {
  chapterId: string
  bosses: string[]
  strategy: string | null
  enemies: Enemy[]
  completedItems: Record<string, boolean>
  onToggleItem: (id: string) => void
}) {
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
          <BossStatBlock text={bossText} chapterId={chapterId} enemies={enemies} completedItems={completedItems} onToggleItem={onToggleItem} />
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
  | { type: 'callout-run'; indices: number[]; paras: string[] }

const COMPACT_REFERENCE_CHAPTERS = new Set([
  'r0-about',
  'r0-sidequest-index',
  'r0-combat-mechanics',
  'r0-status-effects',
  'r0-seed-system',
  'r0-triple-triad-rules',
  'r0-gf-mechanics',
])

function directiveRunKind(text: string): CalloutKind | null {
  const parsed = parseDirectiveCallout(text)
  return parsed?.kind ?? null
}

function groupParas(paras: string[], chapterId = ''): DisplayItem[] {
  const items: DisplayItem[] = []
  const compactReference = COMPACT_REFERENCE_CHAPTERS.has(chapterId)
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
    } else if (compactReference) {
      const kind = directiveRunKind(paras[i])
      if (kind) {
        const runParas = [paras[i]]
        const indices = [i]
        let j = i + 1
        while (j < paras.length && directiveRunKind(paras[j]) === kind) {
          runParas.push(paras[j])
          indices.push(j)
          j++
        }
        if (runParas.length >= 3) {
          items.push({ type: 'callout-run', indices, paras: runParas })
          i = j
          continue
        }
      }
      items.push({ type: 'para', idx: i }); i++
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

function buildSidequestPlacementMap(chapterId: string, paragraphCount: number, sidequests: Sidequest[]) {
  const map: Record<number, Array<{ sidequest: Sidequest; placement: Sidequest['placements'][number] }>> = {}
  if (!paragraphCount) return map
  for (const sidequest of sidequests) {
    for (const placement of sidequest.placements) {
      if (placement.chapterId !== chapterId) continue
      const idx = Math.min(Math.max(placement.afterParagraph, 0), paragraphCount - 1)
      map[idx] = map[idx] ?? []
      map[idx].push({ sidequest, placement })
    }
  }
  return map
}

function InlineSidequestBlocks({
  entries,
  completedItems,
  onToggleItem,
  items,
  learnedBlueMagic,
  onToggleBlueMagic,
}: {
  entries: Array<{ sidequest: Sidequest; placement: Sidequest['placements'][number] }>
  completedItems: Record<string, boolean>
  onToggleItem: (id: string) => void
  items: Item[]
  learnedBlueMagic: TrackerState['learnedBlueMagic']
  onToggleBlueMagic: (abilityId: string, next?: boolean) => void
}) {
  if (!entries.length) return null
  return (
    <>
      {entries.map(({ sidequest, placement }) => {
        const id = sidequestTrackerId(sidequest)
        return (
          <InlineSidequestBlock
            key={`${sidequest.id}-${placement.chapterId}-${placement.afterParagraph}`}
            sidequest={sidequest}
            placement={placement}
            completed={!!completedItems[id]}
            onToggle={() => onToggleItem(id)}
            items={items}
            state={{ learnedBlueMagic }}
            onToggleBlueMagic={onToggleBlueMagic}
          />
        )
      })}
    </>
  )
}

// ─── Main GuideView ───────────────────────────────────────────────────────────

const DISC_NAV_COLORS: Record<number, { border: string; text: string; label: string }> = {
  0: { border: 'border-sky-700/50',    text: 'text-sky-400',    label: 'Reference' },
  1: { border: 'border-teal-700/50',   text: 'text-teal-400',   label: 'Disc 1' },
  2: { border: 'border-indigo-700/50', text: 'text-indigo-400', label: 'Disc 2' },
  3: { border: 'border-violet-700/50', text: 'text-violet-400', label: 'Disc 3' },
  4: { border: 'border-amber-700/50',  text: 'text-amber-400',  label: 'Disc 4' },
}

export function GuideView({ chapter, completedItems, onToggleItem, enemies = [], magic = [], shops = [], junctions = [], characters = [], sidequests = [], prevChapter, nextChapter, onNavigate, characterLevels = {}, activePartyIds = [], magicCompletedByCharacter = {}, onToggleMagic, items, refinement, learnedBlueMagic, availableBlueMagicIds, onToggleBlueMagic }: Props) {
  const rootRef = useRef<HTMLDivElement>(null)
  const refinementFlow: RefinementFlowContext = { items, refinement, learnedBlueMagic, onToggleBlueMagic }

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
  const sidequestMap = buildSidequestPlacementMap(chapter.id, paras.length, sidequests)
  const totalCps = chapter.checkpoints.length
  const doneCps  = chapter.checkpoints.filter(cp => completedItems[cp.id]).length
  const encounters = chapter.encounters ?? []
  const partyContext = createPartyLevelContext(activePartyIds, characterLevels)

  const discStyle = DISC_HEADER[chapter.disc] ?? DISC_HEADER[1]

  return (
    <div ref={rootRef} className="space-y-4 pb-8 w-full">
      {/* Chapter header */}
      <div
        className={cn('glass-panel p-5 border-t-2', discStyle.border)}
        style={{ backgroundImage: `linear-gradient(to bottom, ${discStyle.gradient}, transparent)` }}
      >
        <div className="mb-2">
          <div className="flex items-center gap-2 mb-1.5 flex-wrap">
            <span className={cn('text-xs px-2 py-0.5 rounded-full border font-medium', discStyle.badge)}>
              {chapter.disc === 0 ? 'Reference' : `Disc ${chapter.disc}`}
            </span>
            {totalCps > 0 && (
              <span className="text-xs text-slate-500">{doneCps}/{totalCps} checkpoints</span>
            )}
          </div>
          <h1 className="text-xl font-bold text-slate-100 leading-tight">{chapter.title}</h1>
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
      {chapter.id === 'r0-controls-interface' ? (
        <ControlsReference content={chapter.content} />
      ) : chapter.id === 'r0-magic-reference' ? (
        <MagicReference content={chapter.content} spells={magic} characters={characters} magicCompletedByCharacter={magicCompletedByCharacter} />
      ) : chapter.id === 'r0-shop-reference' ? (
        <ShopReference content={chapter.content} shops={shops} />
      ) : chapter.id === 'r0-junction-reference' ? (
        <JunctionReference content={chapter.content} junctions={junctions} />
      ) : chapter.id === 'r0-characters' ? (
        <CharacterReference content={chapter.content} characters={characters} />
      ) : paras.length > 0 ? (
        <div className="space-y-4">
          {groupParas(paras, chapter.id).map((item, di) => {
            if (item.type === 'boss-group') {
              const groupCps = item.indices.flatMap(idx => checkpointMap[idx] ?? [])
              const groupSidequests = item.indices.flatMap(idx => sidequestMap[idx] ?? [])
              return (
                <div key={di} className="space-y-3">
                  <BossSection
                    chapterId={chapter.id}
                    bosses={item.bosses}
                    strategy={item.strategy}
                    enemies={enemies}
                    completedItems={completedItems}
                    onToggleItem={onToggleItem}
                  />
                  <CheckpointCards checkpoints={groupCps} completedItems={completedItems} onToggleItem={onToggleItem} />
                <InlineSidequestBlocks entries={groupSidequests} completedItems={completedItems} onToggleItem={onToggleItem} items={items} learnedBlueMagic={learnedBlueMagic} onToggleBlueMagic={onToggleBlueMagic} />
                </div>
              )
            }

            if (item.type === 'callout-run') {
              const groupCps = item.indices.flatMap(idx => checkpointMap[idx] ?? [])
              const groupSidequests = item.indices.flatMap(idx => sidequestMap[idx] ?? [])
              return (
                <div key={di} className="space-y-3">
                  <ReferenceCalloutPanel items={item.paras} chapterId={chapter.id} refinementFlow={refinementFlow} />
                  <CheckpointCards checkpoints={groupCps} completedItems={completedItems} onToggleItem={onToggleItem} />
                  <InlineSidequestBlocks entries={groupSidequests} completedItems={completedItems} onToggleItem={onToggleItem} items={items} learnedBlueMagic={learnedBlueMagic} onToggleBlueMagic={onToggleBlueMagic} />
                </div>
              )
            }

            const { idx } = item
            const para = paras[idx]
            const encMatch = para.match(ENCOUNTERS_RE)
            const encIndex = encMatch ? parseInt(encMatch[1], 10) : -1
            const area = encIndex >= 0 ? encounters[encIndex] : null
            const aidPlacement = contextualVisualAidPlacement(chapter.id, para)

            return (
              <div key={di} className="space-y-3">
                {aidPlacement === 'before' && <ContextualVisualAid chapterId={chapter.id} paragraphText={para} />}
                {area
                  ? <AreaEncounterCard
                      area={area}
                      enemies={enemies}
                      items={items}
                      partyContext={partyContext}
                      characters={characters}
                      activePartyIds={activePartyIds}
                      magic={magic}
                      magicCompletedByCharacter={magicCompletedByCharacter}
                      onToggleMagic={onToggleMagic}
                      learnedBlueMagic={learnedBlueMagic}
                      onToggleBlueMagic={onToggleBlueMagic}
                      completedItems={completedItems}
                      onToggleItem={onToggleItem}
                    />
                  : shouldRenderAsRouteStep(paras, idx, chapter.id)
                    ? <RouteStep text={para} />
                    : renderParagraphBlock(para, chapter.id, refinementFlow)
                }
                {!area && !usesRefinementFlow(
                  para.match(CALLOUT_DIRECTIVE_RE)?.[2]?.trim() ?? '',
                  para,
                  normalizeCalloutKind(para.match(CALLOUT_DIRECTIVE_RE)?.[1] ?? '')
                    ?? calloutKind(para.match(CALLOUT_RE)?.[1] ?? '', para, chapter.id),
                ) && (
                  <BlueMagicConnections
                    text={para}
                    items={items}
                    state={{ learnedBlueMagic }}
                    onToggle={onToggleBlueMagic}
                    sourceLabel="Guide"
                  />
                )}
                {chapter.id === 'r0-gf-mechanics' && idx === 19 && (
                  <BlueMagicTracker
                    items={items}
                    state={{ learnedBlueMagic }}
                    onToggle={onToggleBlueMagic}
                    availableAbilityIds={availableBlueMagicIds}
                    variant="full"
                  />
                )}
                {aidPlacement === 'after' && <ContextualVisualAid chapterId={chapter.id} paragraphText={para} />}
                <CheckpointCards checkpoints={checkpointMap[idx] ?? []} completedItems={completedItems} onToggleItem={onToggleItem} />
                <InlineSidequestBlocks entries={sidequestMap[idx] ?? []} completedItems={completedItems} onToggleItem={onToggleItem} items={items} learnedBlueMagic={learnedBlueMagic} onToggleBlueMagic={onToggleBlueMagic} />
              </div>
            )
          })}
        </div>
      ) : (
        chapter.checkpoints.length > 0 ? (
          <div className="space-y-3">
            <CheckpointCards checkpoints={chapter.checkpoints} completedItems={completedItems} onToggleItem={onToggleItem} />
          </div>
        ) : (
          <div className="glass-panel-sm px-4 py-8 text-center text-slate-600 text-sm">
            No walkthrough content for this chapter.
          </div>
        )
      )}

      {/* ── Chapter navigation ── */}
      {(prevChapter || nextChapter) && (
        <div className="flex flex-col sm:flex-row gap-3 pt-2 border-t border-slate-700/40 mt-2">
          {prevChapter ? (
            <button
              onClick={() => onNavigate?.(prevChapter.id)}
              className={cn(
                'w-full min-w-0 sm:flex-1 sm:basis-0 flex items-center gap-3 px-4 py-3 rounded-xl border bg-slate-800/30 hover:bg-slate-800/60 text-left transition-colors group',
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
            <div className="hidden sm:block sm:flex-1 sm:basis-0" />
          )}

          {nextChapter ? (
            <button
              onClick={() => onNavigate?.(nextChapter.id)}
              className={cn(
                'w-full min-w-0 sm:flex-1 sm:basis-0 flex items-center justify-end gap-3 px-4 py-3 rounded-xl border bg-slate-800/30 hover:bg-slate-800/60 text-right transition-colors group',
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
            <div className="hidden sm:block sm:flex-1 sm:basis-0" />
          )}
        </div>
      )}
    </div>
  )
}
