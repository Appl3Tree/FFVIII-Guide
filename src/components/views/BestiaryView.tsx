import { useEffect, useMemo, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { BadgeCheck, BookOpen, ChevronDown, Circle, CircleCheck, MapPin, Search, Shield, Skull, Sparkles, Swords } from 'lucide-react'
import { cn } from '../../lib/utils'
import { canonicalRecordForEnemy, type CanonicalBand, type CanonicalBestiaryData, type CanonicalBestiaryRecord, type CanonicalField, type CanonicalValue } from '../../lib/bestiaryData'
import { enemyDefeatedTrackerId } from '../../lib/playerState'
import bestiaryRaw from '../../data/ff8_bestiary.json'
import type { Enemy } from '../../types'

interface Props {
  enemies: Enemy[]
  completedItems: Record<string, boolean>
  onSetItem: (id: string, next: boolean) => void
}

type BestiaryRecord = CanonicalBestiaryRecord & {
  source_url?: string
  canonical_page_url?: string
  page_title?: string
  source_section?: string
  processing_status?: string
  stats_section_present?: boolean
  unresolved_detail?: string
  unresolved_reason?: string
}

type Category = 'All' | 'Enemies' | 'Bosses' | 'Chocobo World'

const canonicalData = bestiaryRaw as unknown as CanonicalBestiaryData
const ELEMENT_ORDER = ['Fire', 'Ice', 'Thunder', 'Earth', 'Poison', 'Wind', 'Water', 'Holy', 'Gravity']
const STAT_COLUMNS = ['HP', 'STR', 'MAG', 'VIT', 'SPR', 'SPD', 'EVA', 'EXP']
const CATEGORIES: Category[] = ['All', 'Enemies', 'Bosses', 'Chocobo World']
const asset = (path: string) => `${import.meta.env.BASE_URL}${path.replace(/^\/+/, '')}`

function recordName(record: BestiaryRecord) {
  const name = record.name || record.base_name || record.id
  const prefix = name + ' ('
  const title = record.page_title || ''
  const variant = title.startsWith(prefix) && title.endsWith(')') ? title.slice(prefix.length, -1) : ''
  return variant && !/final fantasy|\bcard\b/i.test(variant) ? name + ' (' + variant + ')' : name
}

function recordCategory(record: BestiaryRecord): Exclude<Category, 'All'> {
  if (record.roster_section === 'Chocobo World') return 'Chocobo World'
  if (/boss/i.test(record.page_type || '')) return 'Bosses'
  return 'Enemies'
}

function levelName(min?: number, max?: number) {
  if (min == null && max == null) return 'Level data unavailable'
  if (min === max) return 'Lv ' + min
  return 'Lv ' + (min ?? '?') + '–' + (max ?? '?')
}

function bandName(band: CanonicalBand) {
  return levelName(band.min_level, band.max_level)
}

function valueLines(value?: CanonicalValue): string[] {
  if (!value) return []
  const lines = Array.isArray(value.lines) ? value.lines : []
  if (lines.length) return lines.map(line => String(line).trim()).filter(Boolean)
  return value.text ? [value.text.trim()] : []
}

function valueText(value?: CanonicalValue) {
  return valueLines(value).join(' · ')
}

function fieldText(fields: CanonicalField[] | undefined, key: string) {
  return valueText(fields?.find(field => field.key === key)?.value)
}

function findField(fields: CanonicalField[] | undefined, matcher: (field: CanonicalField) => boolean) {
  return fields?.find(matcher)
}

function selectedBands<T extends CanonicalBand>(bands: T[] | undefined, target: number | null) {
  if (!bands?.length) return []
  if (target == null) return bands
  return bands.filter(band =>
    band.min_level == null || band.max_level == null ||
    (target >= band.min_level && target <= band.max_level),
  )
}

function linesForBand(band: CanonicalBand) {
  const lines = valueLines(band.field?.value)
  if (lines.length) return lines
  return (band.entries ?? []).map(entry => entry.name || '').filter(Boolean)
}

function searchCorpus(record: BestiaryRecord) {
  const parts = [record.id, recordName(record), record.base_name, record.page_type, record.roster_section]
  const addFields = (fields?: CanonicalField[]) => {
    for (const field of fields ?? []) {
      parts.push(field.label || '', ...valueLines(field.value))
      for (const item of field.value?.collapsibles ?? []) {
        parts.push(item.label || '', ...(Array.isArray(item.lines) ? item.lines : []), item.text || '')
      }
    }
  }
  addFields(record.classification?.fields)
  addFields(record.cards?.fields)
  addFields(record.rewards?.fields)
  parts.push(...(record.elements?.entries ?? []).flatMap(entry => [entry.label || '', valueText(entry.value)]))
  parts.push(...(record.statuses?.entries ?? []).flatMap(entry => [entry.label || '', valueText(entry.value)]))
  for (const band of [...(record.draw ?? []), ...(record.abilities ?? [])]) parts.push(...linesForBand(band))
  for (const band of record.items?.level_bands ?? []) addFields(band.fields)
  const devourBands = Array.isArray(record.devour) ? record.devour : record.devour ? [record.devour] : []
  for (const band of devourBands) parts.push(band.result_text || '', valueText(band.field?.value))
  return parts.filter(Boolean).join(' ').toLocaleLowerCase()
}

function statRows(record: BestiaryRecord) {
  return record.stats?.rows ?? []
}

function rowValues(row: { values?: Record<string, number | string> }) {
  return row.values ?? {}
}

function numberRange(rows: Array<{ values?: Record<string, number | string> }>, key: string) {
  const values = rows
    .map(row => Number(rowValues(row)[key]))
    .filter(value => Number.isFinite(value))
  if (!values.length) return '—'
  const min = Math.min(...values)
  const max = Math.max(...values)
  return min === max ? String(min) : String(min) + '–' + String(max)
}

function formatPercent(value?: number | null) {
  if (value == null) return ''
  return Number.isInteger(value) ? value + '%' : value.toFixed(2).replace(/0+$/, '').replace(/\.$/, '') + '%'
}

function affinityMeaning(raw: string) {
  const percent = Number.parseFloat(raw)
  if (!Number.isFinite(percent)) return raw
  if (percent < 0) return 'Absorbs'
  if (percent === 0) return 'Nullifies'
  if (percent > 100) return 'Weak'
  if (percent > 0 && percent < 100) return 'Resists'
  return 'Normal'
}

function affinityTone(raw: string) {
  const meaning = affinityMeaning(raw)
  if (meaning === 'Weak') return 'border-rose-400/20 bg-rose-400/[0.08] text-rose-200'
  if (meaning === 'Resists') return 'border-sky-400/20 bg-sky-400/[0.07] text-sky-200'
  if (meaning === 'Nullifies') return 'border-violet-300/20 bg-violet-300/[0.07] text-violet-200'
  if (meaning === 'Absorbs') return 'border-emerald-300/20 bg-emerald-300/[0.07] text-emerald-200'
  return 'border-slate-700/70 bg-slate-900/45 text-slate-400'
}

function aliasesFor(record: BestiaryRecord, enemies: Enemy[]) {
  return enemies.filter(enemy => canonicalRecordForEnemy(enemy, canonicalData)?.id === record.id)
}

function imageForRecord(record: BestiaryRecord) {
  return `/images/bestiary/${record.id}.webp`
}

function SectionTitle({ icon, title, note }: { icon?: React.ReactNode; title: string; note?: string }) {
  return (
    <div className="mb-3 flex items-center gap-2 border-b border-slate-800/80 pb-2">
      {icon && <span className="text-violet-300/90">{icon}</span>}
      <h2 className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-200">{title}</h2>
      {note && <span className="ml-auto text-[10px] text-slate-500">{note}</span>}
    </div>
  )
}

function BandRows({ bands, target, render }: {
  bands: CanonicalBand[]
  target: number | null
  render: (band: CanonicalBand) => React.ReactNode
}) {
  const visible = selectedBands(bands, target)
  if (!visible.length) return <p className="text-xs text-slate-500">No data recorded.</p>
  return (
    <div className="divide-y divide-slate-800/70">
      {visible.map((band, index) => (
        <div key={(band.label || bandName(band)) + '-' + index} className="grid grid-cols-[5.5rem_minmax(0,1fr)] gap-3 py-2 first:pt-0 last:pb-0">
          <span className="pt-0.5 font-mono text-[10px] text-slate-500">{target == null ? bandName(band) : 'Lv ' + target}</span>
          <div className="min-w-0 text-xs leading-relaxed text-slate-200">{render(band)}</div>
        </div>
      ))}
    </div>
  )
}

function BandSection({ title, note, bands, target, empty, render }: {
  title: string
  note?: string
  bands: CanonicalBand[]
  target: number | null
  empty?: string
  render: (band: CanonicalBand) => React.ReactNode
}) {
  if (!bands.length && !empty) return null
  return (
    <section className="min-w-0 rounded-lg border border-slate-800/70 bg-slate-950/35 p-3.5 sm:p-4">
      <SectionTitle title={title} note={note} />
      {bands.length
        ? <BandRows bands={bands} target={target} render={render} />
        : <p className="text-xs leading-relaxed text-slate-400">{empty}</p>}
    </section>
  )
}

function plainValue(value?: CanonicalValue) {
  const lines = valueLines(value)
  return lines.length ? lines : []
}

function outcomeLines(value?: CanonicalValue) {
  return plainValue(value)
    .flatMap(line => line.replace(/\)(?=[A-Z0-9])/g, ')\n').split('\n'))
    .map(line => line.trim())
    .filter(line => line && !/^expand$/i.test(line) && !/^\[MaxDepth\]$/i.test(line))
}

function ItemDrop({ band }: { band: CanonicalBand }) {
  const field = (band.fields ?? []).find(candidate => /^item drop/i.test(candidate.label || ''))
  if (!field) return <span className="text-slate-500">No item drop data.</span>
  const dropChance = formatPercent(field.percent)
  const alternatives = field.value?.collapsibles ?? []
  const normalTable = alternatives.find(item => /normal/i.test(item.label || ''))
  const rareTable = alternatives.find(item => /rare item/i.test(item.label || ''))
  const defaultLines = outcomeLines(field.value)
  return (
    <div className="space-y-2.5">
      <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
        <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">Drop chance</span>
        <span className="font-medium text-slate-200">{dropChance || 'Not stated'}</span>
      </div>
      {normalTable ? (
        <div>
          <p className="mb-1 text-[10px] font-semibold uppercase tracking-wider text-violet-200/75">Normal table</p>
          <OutcomeList lines={outcomeLines(normalTable as CanonicalValue)} />
        </div>
      ) : (
        <OutcomeList lines={defaultLines} />
      )}
      {rareTable && (
        <details className="rounded-md border border-violet-300/10 bg-violet-300/[0.035] px-2.5 py-2">
          <summary className="flex min-h-7 cursor-pointer list-none items-center gap-2 text-[11px] font-medium text-violet-200 marker:hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-300/70">
            <ChevronDown size={13} className="shrink-0 text-violet-300" />
            Rare Item ability table
          </summary>
          <div className="pt-1.5"><OutcomeList lines={outcomeLines(rareTable as CanonicalValue)} /></div>
        </details>
      )}
    </div>
  )
}

function OutcomeList({ lines }: { lines: string[] }) {
  if (!lines.length || (lines.length === 1 && /^nothing$/i.test(lines[0]))) {
    return <p className="text-xs text-slate-500">{lines[0] || 'No outcomes listed.'}</p>
  }
  return (
    <ul className="space-y-1">
      {lines.map((line, index) => (
        <li key={line + index} className="flex items-baseline gap-2 text-xs leading-relaxed text-slate-200">
          <span className="text-violet-300/70">·</span>
          <span>{line}</span>
        </li>
      ))}
    </ul>
  )
}

function ItemBands({ record, title, matcher, target }: {
  record: BestiaryRecord
  title: 'Mug' | 'Drops' | 'Other information'
  matcher: (field: CanonicalField) => boolean
  target: number | null
}) {
  const bands = (record.items?.level_bands ?? [])
    .map(band => ({ ...band, selectedField: (band.fields ?? []).find(matcher) }))
    .filter(band => band.selectedField)
  const normalisedBands: CanonicalBand[] = bands.map(band => ({
    label: band.label,
    min_level: band.min_level,
    max_level: band.max_level,
    fields: [band.selectedField as CanonicalField],
  }))
  const visible = selectedBands(normalisedBands, target)
  if (!visible.length) return null
  return (
    <BandSection
      title={title}
      bands={visible}
      target={target}
      render={band => {
        const field = band.fields?.[0]
        if (title === 'Drops') return <ItemDrop band={band} />
        const lines = outcomeLines(field?.value)
        if (title === 'Mug') {
          return (
            <div>
              <div className="mb-1 flex items-center gap-2 text-[10px] font-semibold uppercase tracking-wider text-slate-500">
                <span>Mug success</span><span className="text-slate-300">{formatPercent(field?.percent) || 'Not stated'}</span>
              </div>
              <OutcomeList lines={lines} />
            </div>
          )
        }
        return <OutcomeList lines={lines} />
      }}
    />
  )
}

function CardData({ record }: { record: BestiaryRecord }) {
  const fields = record.cards?.fields ?? []
  const cardResult = findField(fields, field => field.key === 'card')
  const cardDrop = findField(fields, field => (field.key || '').startsWith('card_drop_'))
  const cardOutcomes = outcomeLines(cardResult?.value)
  const hasCard = !!cardResult && cardOutcomes.length > 0
  const hasDrop = !!cardDrop && outcomeLines(cardDrop.value).some(line => !/^(nothing|none|---)$/i.test(line))
  if (!hasCard && !hasDrop) return null
  return (
    <section className="min-w-0 rounded-lg border border-slate-800/70 bg-slate-950/35 p-3.5 sm:p-4">
      <SectionTitle icon={<BookOpen size={14} />} title="Cards" />
      <div className="grid gap-3 sm:grid-cols-2">
        {hasCard && (
          <div>
            <p className="mb-1.5 text-[10px] font-semibold uppercase tracking-wider text-slate-500">Card command result</p>
            <ul className="space-y-1">
              {cardOutcomes.map((line, index) => (
                <li key={line + index} className="flex items-baseline gap-2 text-xs leading-relaxed text-slate-200">
                  <span className="w-[4.75rem] shrink-0 text-[9px] font-semibold uppercase tracking-wider text-slate-500">
                    {cardOutcomes.length > 1 ? (index === 0 ? 'Common card' : index === 1 ? 'Rare card' : 'Other result') : 'Result'}
                  </span>
                  <span>{line}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
        {hasDrop && (
          <div>
            <p className="mb-1.5 text-[10px] font-semibold uppercase tracking-wider text-slate-500">
              Post-battle card drop{cardDrop?.percent != null ? ' · ' + formatPercent(cardDrop.percent) : ''}
            </p>
            <OutcomeList lines={outcomeLines(cardDrop?.value)} />
          </div>
        )}
      </div>
    </section>
  )
}

function StatusTable({ record }: { record: BestiaryRecord }) {
  const entries = record.statuses?.entries ?? []
  if (!entries.length) return null
  return (
    <details className="rounded-lg border border-slate-800/70 bg-slate-950/35 p-3.5 sm:p-4">
      <summary className="flex min-h-8 cursor-pointer list-none items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-300/70">
        <ChevronDown size={14} className="text-violet-300" />
        Status susceptibility
        <span className="ml-auto text-[10px] font-normal normal-case tracking-normal text-slate-500">{entries.length} effects</span>
      </summary>
      <div className="mt-3 grid grid-cols-2 gap-1.5 sm:grid-cols-3 lg:grid-cols-4">
        {entries.map((entry, index) => (
          <div key={(entry.label || 'status') + index} className="flex min-h-9 items-center justify-between gap-2 rounded-md border border-slate-800/65 bg-black/15 px-2.5 py-1.5 text-[11px]">
            <span className="text-slate-300">{entry.label || 'Status'}</span>
            <span className="font-mono text-slate-400">{valueText(entry.value) || '—'}</span>
          </div>
        ))}
      </div>
    </details>
  )
}

function FullStats({ record, target }: { record: BestiaryRecord; target: number | null }) {
  const rows = statRows(record)
  if (!rows.length) return null
  const current = target == null ? null : rows.find(row => Number(rowValues(row).Lv) === target)
  return (
    <section className="rounded-lg border border-slate-800/70 bg-slate-950/35 p-3.5 sm:p-4">
      <SectionTitle icon={<Swords size={14} />} title="Combat stats" note={target == null ? 'All levels' : 'Target level ' + target} />
      {target != null && current ? (
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          {STAT_COLUMNS.map(key => (
            <div key={key} className={cn('rounded-md border border-slate-800/70 bg-black/15 px-3 py-2', key === 'HP' && 'col-span-2 sm:col-span-1')}>
              <div className="text-[9px] font-semibold uppercase tracking-wider text-slate-500">{key}</div>
              <div className={cn('mt-0.5 font-mono text-sm text-slate-100', key === 'HP' && 'text-lg font-semibold text-violet-100')}>{rowValues(current)[key] ?? '—'}</div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-x-4 gap-y-2 sm:grid-cols-4">
          {STAT_COLUMNS.map(key => (
            <div key={key} className="flex items-baseline justify-between gap-2 border-b border-slate-800/60 pb-1.5 last:border-0">
              <span className={cn('text-[10px] font-semibold uppercase tracking-wider text-slate-500', key === 'HP' && 'text-violet-200/80')}>{key}</span>
              <span className={cn('font-mono text-xs text-slate-200', key === 'HP' && 'text-sm font-semibold text-violet-100')}>{numberRange(rows, key)}</span>
            </div>
          ))}
        </div>
      )}
      <details className="mt-3 border-t border-slate-800/70 pt-2.5">
        <summary className="flex min-h-8 cursor-pointer list-none items-center gap-2 text-[11px] text-slate-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-300/70">
          <ChevronDown size={13} className="text-violet-300" />
          Full level table <span className="text-slate-500">({rows.length} levels)</span>
        </summary>
        <div className="mt-2 max-h-80 overflow-auto rounded-md border border-slate-800/70">
          <table className="w-full min-w-[34rem] border-collapse text-left text-[10px]">
            <thead className="sticky top-0 bg-slate-900 text-slate-400">
              <tr>{['Lv', ...STAT_COLUMNS].map(label => <th key={label} className="px-2.5 py-2 font-semibold">{label}</th>)}</tr>
            </thead>
            <tbody>
              {rows.map((row, index) => {
                const values = rowValues(row)
                return (
                  <tr key={String(values.Lv || index)} className={cn('border-t border-slate-800/60', target === Number(values.Lv) && 'bg-violet-400/10')}>
                    {['Lv', ...STAT_COLUMNS].map(key => <td key={key} className="px-2.5 py-1.5 font-mono text-slate-300">{values[key] ?? '—'}</td>)}
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </details>
      {record.formulas && Object.keys(record.formulas).length > 0 && (
        <details className="mt-3 border-t border-slate-800/70 pt-2.5">
          <summary className="flex min-h-8 cursor-pointer list-none items-center gap-2 text-[11px] text-slate-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-300/70">
            <ChevronDown size={13} className="text-violet-300" /> Stat formulas
          </summary>
          <dl className="mt-2 grid gap-x-4 gap-y-1 sm:grid-cols-2">
            {Object.values(record.formulas).map((formula, index) => (
              <div key={(formula.label || 'formula') + index} className="flex items-baseline gap-2 text-[10px]">
                <dt className="w-9 shrink-0 text-slate-400">{formula.label || 'Stat'}</dt>
                <dd className="font-mono text-slate-500">{formula.source_text || '—'}</dd>
              </div>
            ))}
          </dl>
        </details>
      )}
    </section>
  )
}

function EnemyDossier({ record, aliases, completedItems, onSetItem }: {
  record: BestiaryRecord
  aliases: Enemy[]
  completedItems: Record<string, boolean>
  onSetItem: Props['onSetItem']
}) {
  const [targetText, setTargetText] = useState('')
  useEffect(() => setTargetText(''), [record.id])
  const min = record.level?.min
  const max = record.level?.max
  const levelMin = min ?? 1
  const levelMax = max ?? 100
  const rowData = statRows(record)
  const canTarget = Boolean(record.level && rowData.length && min != null && max != null && !record.level.fixed && min < max)
  const inputLevel = Number.parseInt(targetText, 10)
  const target = targetText && Number.isFinite(inputLevel) ? Math.min(levelMax, Math.max(levelMin, inputLevel)) : null
  const trackerIds = aliases.length ? aliases.map(enemy => enemy.id) : [record.id]
  const defeated = trackerIds.some(id => completedItems[enemyDefeatedTrackerId(id)])
  const classification = record.classification?.fields ?? []
  const scan = fieldText(classification, 'scan')
  const locationField = findField(classification, field => field.key === 'location')
  const rawClassText = fieldText(classification, 'class')
  const classText = /^(?:none|---|n\/a)$/i.test(rawClassText) ? '' : rawClassText
  const rawAp = fieldText(classification, 'ap') || record.rewards?.ap || ''
  const ap = /^(?:none|---|n\/a)$/i.test(rawAp) ? '' : rawAp
  const levelDescription = !record.level
    ? ''
    : record.level.fixed || (min != null && max != null && min === max)
      ? 'Fixed level'
      : 'Level range'
  const affinityEntries = record.elements?.entries ?? []
  const elementalByName = new Map(affinityEntries.map(entry => [entry.label || entry.key || '', valueText(entry.value)]))
  const drawBands = record.draw ?? []
  const abilityBands = record.abilities ?? []
  const devourBands = Array.isArray(record.devour) ? record.devour : []
  const devourEmpty = !Array.isArray(record.devour) && (record.devour?.result_text || valueText(record.devour?.field?.value))
  const itemInfoFields = classification.filter(field => field.key === 'info' && valueLines(field.value).some(line => !/^(?:none|---|n\/a)$/i.test(line)))
  const otherInfoItemBands = (record.items?.level_bands ?? [])
    .map(band => ({ ...band, fields: (band.fields ?? []).filter(field => /other information/i.test(field.label || '') && valueLines(field.value).some(line => !/^(?:none|---|n\/a)$/i.test(line))) }))
    .filter(band => band.fields?.length)
  const activeTrackerKeys = trackerIds.map(enemyDefeatedTrackerId)
  const enemyImage = imageForRecord(record)
  const rawTitle = record.page_type?.replace(/^Type\s*/i, '') || 'Enemy record'
  const rosterLabel = recordCategory(record) === 'Enemies' ? 'Regular enemy' : recordCategory(record)
  const identityLabel = recordCategory(record) === 'Chocobo World' ? rosterLabel : rawTitle
  const hpLabel = rowData.length ? (target == null ? numberRange(rowData, 'HP') : numberRange(rowData.filter(row => Number(rowValues(row).Lv) === target), 'HP')) : ''
  const expLabel = rowData.length ? (target == null ? numberRange(rowData, 'EXP') : numberRange(rowData.filter(row => Number(rowValues(row).Lv) === target), 'EXP')) : ''

  function toggleDefeated() {
    const next = !defeated
    activeTrackerKeys.forEach(key => onSetItem(key, next))
  }

  return (
    <article className="min-w-0">
      <header className="relative overflow-hidden rounded-xl border border-violet-300/15 bg-gradient-to-br from-violet-950/35 via-slate-950/80 to-slate-950/50 px-4 py-4 sm:px-5 sm:py-5">
        <div aria-hidden="true" className="pointer-events-none absolute -right-12 -top-20 h-48 w-48 rounded-full border border-violet-300/[0.07]" />
        <div aria-hidden="true" className="pointer-events-none absolute -right-5 -top-12 h-32 w-32 rounded-full border border-violet-300/[0.06]" />
        <div className="relative flex items-start gap-3.5">
          <div className="flex h-[3.5rem] w-[3.5rem] shrink-0 items-center justify-center overflow-hidden rounded-lg border border-violet-200/15 bg-black/25 text-violet-200/80 sm:h-[4.25rem] sm:w-[4.25rem]">
            {enemyImage ? (
              <img src={asset(enemyImage)} alt={`${recordName(record)} enemy`} className="h-full w-full object-contain p-1" loading="lazy" />
            ) : (
              <Skull size={25} strokeWidth={1.4} aria-hidden="true" />
            )}
          </div>
          <div className="min-w-0 flex-1">
            <div className="mb-1.5 flex flex-wrap items-center gap-x-2 gap-y-1 text-[9px] font-semibold uppercase tracking-[0.19em] text-violet-200/70">
              <span>{identityLabel}</span>
              {classText && <span className="text-slate-500">· {classText}</span>}
            </div>
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div className="min-w-0">
                <h1 className="font-serif text-2xl font-semibold tracking-wide text-slate-50 sm:text-[1.8rem]">{recordName(record)}</h1>
                {scan && <p className="mt-1 max-w-3xl text-xs leading-relaxed text-slate-300/80">{scan}</p>}
              </div>
              <button
                type="button"
                onClick={toggleDefeated}
                aria-pressed={defeated}
                className={cn(
                  'inline-flex min-h-10 shrink-0 items-center gap-2 rounded-md border px-3 text-xs font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-200 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950',
                  defeated
                    ? 'border-emerald-300/25 bg-emerald-400/10 text-emerald-200 hover:bg-emerald-400/15'
                    : 'border-slate-700/80 bg-slate-950/55 text-slate-300 hover:border-violet-200/35 hover:text-white',
                )}
              >
                {defeated ? <CircleCheck size={16} /> : <Circle size={16} />}
                {defeated ? 'Defeated' : 'Mark defeated'}
              </button>
            </div>
            <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-2 border-t border-white/[0.06] pt-3">
              <div className="flex min-h-8 items-center gap-2 text-xs">
                <span className="text-[9px] font-semibold uppercase tracking-wider text-slate-500">Enemy level</span>
                <span className="font-mono font-medium text-violet-100">{levelName(min, max)}</span>
                {levelDescription && <span className="text-[10px] text-slate-500">{levelDescription}</span>}
              </div>
              {!canTarget ? (
                <span className="h-4 w-px bg-slate-700/70" />
              ) : (
                <label className="flex min-h-8 items-center gap-2">
                  <span className="text-[9px] font-semibold uppercase tracking-wider text-slate-500">Target level</span>
                  <input
                    type="number"
                    min={min}
                    max={max}
                    inputMode="numeric"
                    value={targetText}
                    onChange={event => setTargetText(event.target.value)}
                    onBlur={() => {
                      if (!targetText) return
                      const parsed = Number.parseInt(targetText, 10)
                      if (Number.isFinite(parsed)) setTargetText(String(Math.min(levelMax, Math.max(levelMin, parsed))))
                    }}
                    aria-label={'Target enemy level for ' + recordName(record)}
                    className="h-8 w-[4.25rem] rounded border border-slate-700/80 bg-black/25 px-2 font-mono text-xs text-slate-100 outline-none transition focus:border-violet-300/60 focus:ring-2 focus:ring-violet-300/20"
                  />
                  <button
                    type="button"
                    onClick={() => setTargetText('')}
                    disabled={!targetText}
                    className="min-h-8 rounded px-2 text-[10px] text-slate-400 underline decoration-slate-600 underline-offset-2 hover:text-slate-100 disabled:cursor-default disabled:opacity-40"
                  >
                    All levels
                  </button>
                </label>
              )}
              <span className="h-4 w-px bg-slate-700/70" />
              {hpLabel && <div className="flex items-center gap-2 text-xs">
                <span className="text-[9px] font-semibold uppercase tracking-wider text-slate-500">HP</span>
                <span className="font-mono text-slate-100">{hpLabel}</span>
                <span className="text-[10px] text-slate-500">{target == null ? 'range' : 'at Lv ' + target}</span>
              </div>}
              {ap && <>
                <span className="h-4 w-px bg-slate-700/70" />
                <div className="flex items-center gap-2 text-xs">
                  <span className="text-[9px] font-semibold uppercase tracking-wider text-slate-500">AP</span>
                  <span className="font-mono font-semibold text-amber-200">{ap}</span>
                </div>
              </>}
              {expLabel && expLabel !== '—' && <>
                <span className="h-4 w-px bg-slate-700/70" />
                <div className="flex items-center gap-2 text-xs">
                  <span className="text-[9px] font-semibold uppercase tracking-wider text-slate-500">EXP</span>
                  <span className="font-mono text-slate-300">{expLabel}</span>
                </div>
              </>}
            </div>
          </div>
        </div>
      </header>

      {record.processing_status === 'unresolved' && (
        <div className="mt-3 rounded-lg border border-amber-200/15 bg-amber-200/[0.045] p-3 text-xs leading-relaxed text-amber-100/80">
          {record.unresolved_detail || 'The source does not provide a complete stats record for this enemy.'}
        </div>
      )}

      <div className="mt-3 grid gap-3 lg:grid-cols-2">
        <section className="min-w-0 rounded-lg border border-slate-800/70 bg-slate-950/35 p-3.5 sm:p-4">
          <SectionTitle icon={<Shield size={14} />} title="Elemental affinity" note="Damage modifier" />
          {affinityEntries.length ? (
            <div className="grid grid-cols-2 gap-1.5 sm:grid-cols-3">
              {ELEMENT_ORDER.map(name => {
                const entry = affinityEntries.find(candidate => candidate.key?.toLowerCase() === name.toLowerCase())
                const raw = elementalByName.get(name) || valueText(entry?.value) || '—'
                const meaning = raw === '—' ? 'Not listed' : affinityMeaning(raw)
                return (
                  <div key={name} className={cn('flex min-h-9 items-center justify-between gap-2 rounded-md border px-2.5 py-1.5', raw === '—' ? 'border-slate-800/70 bg-black/10 text-slate-500' : affinityTone(raw))}>
                    <span className="text-[11px] font-medium">{name}</span>
                    <span className="flex items-center gap-1.5 text-[10px]">
                      <span className="font-mono">{raw}</span>
                      <span className="opacity-80">{meaning}</span>
                    </span>
                  </div>
                )
              })}
            </div>
          ) : <p className="text-xs text-slate-500">No elemental affinity data recorded.</p>}
        </section>
        <div className="min-w-0 rounded-lg border border-slate-800/70 bg-slate-950/35 p-3.5 sm:p-4">
          <SectionTitle icon={<MapPin size={14} />} title="Where found" />
          {locationField ? (
            <details>
              <summary className="flex min-h-8 cursor-pointer list-none items-center gap-2 text-xs text-slate-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-300/70">
                <ChevronDown size={13} className="text-violet-300" />
                Show location list <span className="text-slate-500">({valueLines(locationField.value).length} entries)</span>
              </summary>
              <ul className="mt-2 space-y-1.5 border-l border-slate-700/80 pl-3.5">
                {valueLines(locationField.value).map((line, index) => (
                  <li key={line + index} className="text-[11px] leading-relaxed text-slate-400">{line}</li>
                ))}
              </ul>
            </details>
          ) : <p className="text-xs text-slate-500">No location information recorded.</p>}
        </div>
      </div>

      <div className="mt-3">
        <FullStats record={record} target={target} />
      </div>

      <div className="mt-3 grid gap-3 lg:grid-cols-2">
        <BandSection
          title="Draw"
          note={target == null ? 'All level bands' : 'Available at target level'}
          bands={drawBands}
          target={target}
          empty="No Draw data recorded."
          render={band => {
            const lines = linesForBand(band)
            return lines.length ? <span>{lines.join(' · ')}</span> : <span className="text-slate-500">No Draws listed.</span>
          }}
        />
        <BandSection
          title="Abilities & attacks"
          bands={abilityBands}
          target={target}
          empty="No ability data recorded."
          render={band => {
            const lines = linesForBand(band)
            return lines.length ? <span>{lines.join(' · ')}</span> : <span className="text-slate-500">No abilities listed.</span>
          }}
        />
      </div>

      <div className="mt-3 grid gap-3 lg:grid-cols-2">
        <ItemBands record={record} title="Mug" matcher={field => /^mug/i.test(field.label || '')} target={target} />
        <ItemBands record={record} title="Drops" matcher={field => /^item drop/i.test(field.label || '')} target={target} />
      </div>

      <div className="mt-3 grid gap-3 lg:grid-cols-2">
        <CardData record={record} />
        {Array.isArray(record.devour) && record.devour.length > 0 ? (
          <BandSection
            title="Devour"
            bands={devourBands}
            target={target}
            render={band => <span>{band.result_text || valueText(band.field?.value) || linesForBand(band).join(' · ') || 'No result recorded.'}</span>}
          />
        ) : devourEmpty ? (
          <section className="rounded-lg border border-slate-800/70 bg-slate-950/35 p-3.5 sm:p-4">
            <SectionTitle title="Devour" />
            <p className="text-xs text-slate-200">{String(devourEmpty)}</p>
          </section>
        ) : null}
      </div>

      {(itemInfoFields.length > 0 || otherInfoItemBands.length > 0) && (
        <div className="mt-3 grid gap-3 lg:grid-cols-2">
          {itemInfoFields.length > 0 && (
            <section className="rounded-lg border border-slate-800/70 bg-slate-950/35 p-3.5 sm:p-4">
              <SectionTitle title="Other information" />
              <div className="space-y-2 text-xs leading-relaxed text-slate-300">
                {itemInfoFields.flatMap(field => valueLines(field.value)).map((line, index) => <p key={line + index}>{line}</p>)}
              </div>
            </section>
          )}
          {otherInfoItemBands.length > 0 && (
            <BandSection
              title="Additional level notes"
              bands={otherInfoItemBands}
              target={target}
              render={band => <span>{(band.fields ?? []).flatMap(field => valueLines(field.value)).join(' · ')}</span>}
            />
          )}
        </div>
      )}

      <div className="mt-3">
        <StatusTable record={record} />
      </div>
    </article>
  )
}

export function BestiaryView({ enemies, completedItems, onSetItem }: Props) {
  const reduceMotion = useReducedMotion()
  const [category, setCategory] = useState<Category>('Enemies')
  const [searchText, setSearchText] = useState('')
  const [selectedId, setSelectedId] = useState('')
  const allRecords = canonicalData.enemies as BestiaryRecord[]
  const guideAliases = useMemo(() => new Map(allRecords.map(record => [record.id, aliasesFor(record, enemies)])), [allRecords, enemies])
  const records = useMemo(() => [...allRecords].sort((left, right) => recordName(left).localeCompare(recordName(right))), [allRecords])
  const filteredRecords = useMemo(() => {
    const query = searchText.trim().toLocaleLowerCase()
    return records.filter(record => {
      if (category !== 'All' && recordCategory(record) !== category) return false
      if (!query) return true
      return searchCorpus(record).includes(query)
    })
  }, [records, category, searchText])
  const selected = filteredRecords.find(record => record.id === selectedId) ?? filteredRecords[0] ?? null
  const defeatedCount = allRecords.filter(record => {
    const aliases = guideAliases.get(record.id) ?? []
    const ids = aliases.length ? aliases.map(enemy => enemy.id) : [record.id]
    return ids.some(id => completedItems[enemyDefeatedTrackerId(id)])
  }).length

  useEffect(() => {
    if (selected && selected.id !== selectedId) setSelectedId(selected.id)
  }, [selected, selectedId])

  const aliases = selected ? guideAliases.get(selected.id) ?? [] : []
  const currentRecord = selected

  return (
    <div className="mx-auto w-full max-w-[78rem] px-3 pb-8 pt-4 sm:px-5 lg:px-6">
      <div className="mb-4 flex flex-wrap items-end justify-between gap-3 border-b border-slate-800/70 pb-4">
        <div>
          <div className="mb-1 flex items-center gap-2 text-[9px] font-semibold uppercase tracking-[0.2em] text-violet-300/75">
            <Sparkles size={12} /> Field guide · Reference archive
          </div>
          <h1 className="font-serif text-2xl font-semibold tracking-wide text-slate-50 sm:text-[1.8rem]">Bestiary</h1>
          <p className="mt-1 max-w-xl text-xs leading-relaxed text-slate-400">Complete enemy records across every level band, with an optional level focus.</p>
        </div>
        <div className="flex items-center gap-2 rounded-md border border-slate-800/70 bg-slate-950/45 px-3 py-2 text-[11px]">
          <BadgeCheck size={14} className="text-emerald-300/80" />
          <span className="font-mono text-slate-100">{defeatedCount}</span>
          <span className="text-slate-500">/ {allRecords.length} defeated</span>
        </div>
      </div>

      <div className="mb-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div role="tablist" aria-label="Bestiary category" className="flex max-w-full items-center gap-1 overflow-x-auto rounded-md border border-slate-800/70 bg-slate-950/45 p-1">
          {CATEGORIES.map(item => (
            <button
              key={item}
              type="button"
              role="tab"
              aria-selected={category === item}
              onClick={() => setCategory(item)}
              className={cn(
                'min-h-8 shrink-0 rounded px-2.5 text-[10px] font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-300/70',
                category === item ? 'bg-violet-300/15 text-violet-100' : 'text-slate-400 hover:bg-slate-800/60 hover:text-slate-200',
              )}
            >
              {item}
              {item !== 'All' && <span className="ml-1.5 font-mono text-[9px] text-slate-500">{records.filter(record => recordCategory(record) === item).length}</span>}
            </button>
          ))}
        </div>
        <label className="relative block w-full sm:max-w-[21rem]">
          <Search size={14} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
          <input
            type="search"
            value={searchText}
            onChange={event => setSearchText(event.target.value)}
            placeholder="Search names, magic, items, abilities…"
            aria-label="Search bestiary"
            className="h-10 w-full rounded-md border border-slate-800/80 bg-slate-950/65 pl-9 pr-3 text-xs text-slate-100 outline-none placeholder:text-slate-600 transition focus:border-violet-300/45 focus:ring-2 focus:ring-violet-300/15"
          />
        </label>
      </div>

      {filteredRecords.length === 0 || !currentRecord ? (
        <div className="rounded-lg border border-slate-800/70 bg-slate-950/30 p-8 text-center text-sm text-slate-400">No enemies match this search.</div>
      ) : (
        <>
          <label className="mb-3 block lg:hidden">
            <span className="mb-1 block text-[9px] font-semibold uppercase tracking-[0.16em] text-slate-500">Selected enemy</span>
            <select
              value={currentRecord.id}
              onChange={event => setSelectedId(event.target.value)}
              aria-label="Choose an enemy"
              className="h-10 w-full rounded-md border border-slate-800/80 bg-slate-950/75 px-3 text-xs text-slate-100 outline-none focus:border-violet-300/45 focus:ring-2 focus:ring-violet-300/20"
            >
              {filteredRecords.map(record => <option key={record.id} value={record.id}>{recordName(record)} · {levelName(record.level?.min, record.level?.max)}</option>)}
            </select>
          </label>
          <div className="grid min-w-0 items-start gap-3 lg:grid-cols-[15rem_minmax(0,1fr)] xl:grid-cols-[17rem_minmax(0,1fr)]">
            <aside className="sticky top-2 hidden max-h-[calc(100vh-13rem)] min-w-0 overflow-hidden rounded-lg border border-slate-800/70 bg-slate-950/45 lg:block">
              <div className="flex items-center justify-between border-b border-slate-800/80 px-3 py-2.5">
                <span className="text-[9px] font-semibold uppercase tracking-[0.18em] text-slate-400">Enemy index</span>
                <span className="font-mono text-[10px] text-slate-600">{filteredRecords.length}</span>
              </div>
              <nav aria-label="Enemy records" className="max-h-[calc(100vh-16.2rem)] overflow-y-auto p-1">
                {filteredRecords.map(record => {
                  const aliasesForEntry = guideAliases.get(record.id) ?? []
                  const ids = aliasesForEntry.length ? aliasesForEntry.map(enemy => enemy.id) : [record.id]
                  const isDefeated = ids.some(id => completedItems[enemyDefeatedTrackerId(id)])
                  const isSelected = record.id === currentRecord.id
                  const enemyImage = imageForRecord(record)
                  return (
                    <button
                      type="button"
                      key={record.id}
                      onClick={() => setSelectedId(record.id)}
                      aria-current={isSelected ? 'true' : undefined}
                      className={cn(
                        'flex min-h-11 w-full items-center gap-2 rounded px-2.5 py-1.5 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-violet-300/70',
                        isSelected ? 'bg-violet-300/[0.11] text-white' : 'text-slate-400 hover:bg-slate-900/85 hover:text-slate-200',
                      )}
                    >
                      <span className="relative flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded border border-slate-800 bg-black/25">
                        {enemyImage
                          ? <img src={asset(enemyImage)} alt="" className="h-full w-full object-contain p-0.5" loading="lazy" />
                          : <Skull size={12} className="text-slate-600" aria-hidden="true" />}
                        <span className="absolute -bottom-px -right-px rounded-tl bg-slate-950/90 p-0.5">
                          {isDefeated ? <CircleCheck size={10} className="text-emerald-300/90" /> : <Circle size={10} className="text-slate-600" />}
                        </span>
                      </span>
                      <span className="min-w-0 flex-1 truncate text-[11px]">{recordName(record)}</span>
                      <span className="shrink-0 font-mono text-[9px] text-slate-600">{record.level?.fixed || record.level?.min === record.level?.max ? 'Lv ' + (record.level?.min ?? '?') : (record.level?.min ?? '?') + '–' + (record.level?.max ?? '?')}</span>
                    </button>
                  )
                })}
              </nav>
            </aside>
            <div className="min-w-0">
              <motion.div
                key={currentRecord.id}
                initial={reduceMotion ? false : { opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: reduceMotion ? 0 : 0.16, ease: 'easeOut' }}
              >
                <EnemyDossier
                  record={currentRecord}
                  aliases={aliases}
                  completedItems={completedItems}
                  onSetItem={onSetItem}
                />
              </motion.div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
