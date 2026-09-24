import type { Enemy } from '../types'

export type CanonicalValue = {
  text?: string
  lines?: string[]
  collapsibles?: Array<{ label?: string; text?: string; lines?: string[] }>
  links?: Array<{ text?: string; url?: string }>
}

export type CanonicalField = {
  key?: string
  label?: string
  percent?: number | null
  value?: CanonicalValue
}

export type CanonicalBand = {
  label?: string
  min_level: number
  max_level: number
  fields?: CanonicalField[]
  entries?: Array<{ name?: string }>
  field?: CanonicalField
  result_text?: string
}

export interface CanonicalBestiaryRecord {
  id: string
  name?: string
  base_name?: string
  roster_section?: string
  page_type?: string
  source_url?: string
  canonical_page_url?: string
  page_title?: string
  source_section?: string
  processing_status?: string
  stats_section_present?: boolean
  unresolved_detail?: string
  unresolved_reason?: string
  level?: { min?: number; max?: number; fixed?: boolean }
  classification?: {
    fields?: CanonicalField[]
    tables?: Array<{ title?: string; headers?: string[]; rows?: string[][] }>
    type_from_page?: string
  }
  elements?: { entries?: Array<{ key?: string; label?: string; value?: CanonicalValue }> }
  statuses?: { entries?: Array<{ label?: string; value?: CanonicalValue }> }
  draw?: CanonicalBand[]
  abilities?: CanonicalBand[]
  items?: { level_bands?: CanonicalBand[] }
  stats?: { rows?: Array<{ values?: Record<string, number | string> }> }
  cards?: { fields?: CanonicalField[] }
  devour?: CanonicalBand[] | { field?: CanonicalField; result_text?: string }
  rewards?: { fields?: CanonicalField[]; ap?: string; exp_column?: string }
  formulas?: Record<string, { label?: string; source_text?: string }>
  source_notes?: string[]
}

export type CanonicalBestiaryData = { enemies: CanonicalBestiaryRecord[] }
type CanonicalRecord = CanonicalBestiaryRecord

const EXPLICIT_ID_MAP: Record<string, string> = {
  'enemy-blobra': 'blobra',
  'enemy-bgh251f2-1': 'bgh251f2-from-missile-base',
  'enemy-bgh251f2-2': 'bgh251f2-from-fishermans-horizon',
  'enemy-droma': 'droma-assists-trauma',
  'enemy-edea-1': 'edea',
  'enemy-edea-2': 'edea',
  'enemy-esthar-soldier-cyborg': 'esthar-soldier-1',
  'enemy-esthar-soldier': 'esthar-soldier',
  'enemy-fujin': 'fujin',
  'enemy-fujin-2': 'fujin',
  'enemy-helix': 'helix-assists-ultimecia',
  'enemy-left-orb': 'left-orb-part-of-norg-pod',
  'enemy-left-probe': 'left-probe-part-of-mobile-type-8',
  'enemy-norg-pod': 'norg-pod-assists-norg',
  'enemy-propagator': 'propagator-purple',
  'enemy-raijin-1': 'raijin',
  'enemy-raijin-2': 'raijin',
  'enemy-raijin-3': 'raijin',
  'enemy-raldo': 'raldo-assists-granaldo',
  'enemy-right-orb': 'right-orb-part-of-norg-pod',
  'enemy-right-probe': 'right-probe-part-of-mobile-type-8',
  'enemy-rinoa': 'rinoa-hostage-of-adel',
  'enemy-seifer-1': 'seifer',
  'enemy-seifer-2': 'seifer',
  'enemy-seifer-3': 'seifer',
  'enemy-seifer-4': 'seifer',
  'enemy-ultimecia-1': 'ultimecia',
  'enemy-ultimecia-griever': 'ultimecia-griver-form-a',
  'enemy-ultimecia-final': 'ultimecia-final-boss',
  'enemy-ultimecia-final-lower': 'ultimecia-final-boss',
  'enemy-biggs-1': 'biggs',
  'enemy-biggs-2': 'biggs',
  'enemy-red-bat': 'red-bat',
  'enemy-wedge-1': 'wedge',
  'enemy-wedge-2': 'wedge',
}

function cleanText(value: string | undefined) {
  return value
    ?.replace(/\s+/g, ' ')
    .replace(/%\)(?=[A-Z])/g, '%) ')
    .replace(/:(?=[A-Z])/g, ': ')
    .trim() ?? ''
}

function valueText(value: CanonicalValue | undefined) {
  if (!value) return ''
  if (value.collapsibles?.length) {
    return value.collapsibles
      .map(item => cleanText(`${item.label ?? ''} ${item.text ?? ''}`))
      .filter(Boolean)
      .join('; ')
  }
  return cleanText(value.lines?.join(' ') || value.text)
}

function fieldText(fields: CanonicalField[] | undefined, key: string) {
  return valueText(fields?.find(field => field.key === key)?.value)
}

function fieldByLabel(fields: CanonicalField[] | undefined, label: string) {
  const needle = label.toLowerCase()
  return fields?.find(field => field.label?.toLowerCase().startsWith(needle))
}

function entriesForBand(band: CanonicalBand) {
  return [...new Set((band.entries ?? []).flatMap(entry =>
    (entry.name ?? '').split(',').map(value => cleanText(value.replace(/\[note\s+\d+\]/gi, ''))),
  ).filter(Boolean))]
}

function percentToLegacyValue(value: string) {
  const normalizedValue = value.trim().toLowerCase()
  if (normalizedValue === 'miss' || normalizedValue === '0%') return 'immune'
  if (normalizedValue.startsWith('-')) return 'absorb'
  const percent = Number.parseFloat(normalizedValue)
  if (!Number.isFinite(percent) || percent === 100) return 'normal'
  const multiplier = percent / 100
  return `x ${String(multiplier).replace('.', ',')}`
}

function canonicalElementalData(record: CanonicalRecord, fallback: Enemy['elementals']) {
  const next = { ...fallback }
  for (const entry of record.elements?.entries ?? []) {
    if (!entry.key || !entry.value) continue
    const key = entry.key.toLowerCase() as keyof Enemy['elementals']
    if (key in next || ['fire', 'ice', 'thunder', 'earth', 'poison', 'wind', 'water', 'holy', 'gravity'].includes(key)) {
      next[key] = percentToLegacyValue(valueText(entry.value))
    }
  }
  return next
}

function canonicalBands(record: CanonicalRecord, fieldLabel: string) {
  return (record.items?.level_bands ?? [])
    .map(band => {
      const field = fieldByLabel(band.fields, fieldLabel)
      if (!field) return null
      const value = valueText(field.value)
      if (!value || /^nothing$/i.test(value)) return null
      return {
        lvMin: band.min_level,
        lvMax: band.max_level,
        value,
        chance: field.percent == null ? null : `${field.percent}%`,
      }
    })
    .filter((band): band is { lvMin: number; lvMax: number; value: string; chance: string | null } => Boolean(band))
}

function canonicalAbilities(record: CanonicalRecord) {
  return (record.abilities ?? []).map(band => ({
    lvMin: band.min_level,
    lvMax: band.max_level,
    abilities: entriesForBand(band),
  })).filter(band => band.abilities.length > 0)
}

function canonicalStats(record: CanonicalRecord) {
  return (record.stats?.rows ?? []).flatMap(row => {
    const values = row.values ?? {}
    const number = (key: string) => Number(values[key] ?? 0)
    const level = number('Lv')
    if (!level) return []
    return [{
      level,
      hp: number('HP'),
      str: number('STR'),
      mag: number('MAG'),
      vit: number('VIT'),
      spr: number('SPR'),
      spd: number('SPD'),
      eva: number('EVA'),
      exp: number('EXP'),
    }]
  })
}

function canonicalStatusNote(record: CanonicalRecord) {
  const relevant = (record.statuses?.entries ?? [])
    .map(entry => ({ label: cleanText(entry.label), value: valueText(entry.value) }))
    .filter(entry => entry.label && entry.value && !/^immune$/i.test(entry.value) && !/^0%$/i.test(entry.value))
    .slice(0, 8)
  return relevant.map(entry => `${entry.label}: ${entry.value}`).join(' · ')
}

function canonicalStatusEffects(record: CanonicalRecord) {
  return (record.statuses?.entries ?? [])
    .map(entry => ({ name: cleanText(entry.label), chance: valueText(entry.value) }))
    .filter(entry => entry.name && entry.chance && !/^none$/i.test(entry.chance))
}

function canonicalCardResults(record: CanonicalRecord) {
  const fields = record.cards?.fields ?? []
  const cardField = fields.find(field => field.key === 'card')
  const cardLines = cardField?.value?.lines ?? (cardField?.value?.text ? [cardField.value.text] : [])
  const outcomes = cardLines.flatMap(line => line.split(/(?<=\))(?=[A-Z])/).map(value => value.trim())).filter(Boolean)
    .map(value => {
      const match = value.match(/^(.*?)\s*\((\d+(?:\.\d+)?%)\)$/)
      return match ? { name: match[1].trim(), chance: match[2] } : { name: value }
    })
  const dropField = fields.find(field => field.key?.startsWith('card_drop_'))
  const dropLines = dropField?.value?.lines ?? (dropField?.value?.text ? [dropField.value.text] : [])
  const dropName = dropLines.join(' ').trim()
  const dropChance = dropField?.percent == null ? undefined : `${dropField.percent}%`
  const canTurnIntoCard = !outcomes.some(outcome => /can't turn into a card/i.test(outcome.name))
  const hasCardDrop = dropName && !/^(?:nothing|none|---)$/i.test(dropName) && dropField?.percent !== 0

  return {
    common: canTurnIntoCard ? outcomes[0] : undefined,
    rare: canTurnIntoCard ? outcomes[1] : undefined,
    drop: hasCardDrop ? { name: dropName, chance: dropChance } : undefined,
  }
}

function canonicalCards(record: CanonicalRecord) {
  const fields = record.cards?.fields ?? []
  const win = fieldText(fields, 'card')
  const drop = fields.find(field => field.key?.startsWith('card_drop_'))
  return {
    cards: win ? { common: win, rare: null } : undefined,
    cardDrop: valueText(drop?.value) || undefined,
  }
}

function findCanonicalRecord(enemy: Enemy, records: CanonicalRecord[]) {
  const canonicalId = EXPLICIT_ID_MAP[enemy.id] ?? enemy.id.replace(/^enemy-/, '')
  return records.find(record => record.id === canonicalId) ?? null
}

export function canonicalRecordForEnemy(enemy: Enemy, data: CanonicalBestiaryData) {
  return findCanonicalRecord(enemy, data.enemies)
}

function mergeCanonicalEnemy(enemy: Enemy, record: CanonicalRecord | null): Enemy {
  if (!record) return enemy

  const stats = canonicalStats(record)
  const firstStat = stats[0]
  const lastStat = stats[stats.length - 1]
  const drawMagicByLevel = (record.draw ?? []).map(band => ({
    lvMin: band.min_level,
    lvMax: band.max_level,
    spells: entriesForBand(band),
  })).filter(band => band.spells.length > 0)
  const abilitiesByLevel = canonicalAbilities(record)
  const mugBands = canonicalBands(record, 'Mug')
  const dropBands = canonicalBands(record, 'Item drop')
  const devourBands = canonicalBands(record, 'Devour')
  const classification = record.classification?.fields
  const location = fieldText(classification, 'location')
  const scan = fieldText(classification, 'scan')
  const ap = Number(fieldText(classification, 'ap'))
  const cards = canonicalCards(record)
  const elementals = canonicalElementalData(record, enemy.elementals)
  const statusNote = canonicalStatusNote(record)
  const statusEffects = canonicalStatusEffects(record)
  const weak = Object.entries(elementals).filter(([, value]) => value && /^x\s*(1[.,]5|[2-9])/i.test(value)).map(([key]) => key).join(', ')
  const resist = Object.entries(elementals).filter(([, value]) => value && (value === 'absorb' || value === 'immune' || /^x\s*0[.,]/i.test(value))).map(([key]) => key).join(', ')
  const canonicalDrawMagic = drawMagicByLevel.flatMap(band => band.spells).filter((spell, index, list) => list.indexOf(spell) === index)
  const canonicalAbilitiesList = abilitiesByLevel.flatMap(band => band.abilities).filter((ability, index, list) => list.indexOf(ability) === index)

  return {
    ...enemy,
    lvMin: record.level?.min ?? enemy.lvMin,
    lvMax: record.level?.max ?? enemy.lvMax,
    hpMin: firstStat?.hp ?? enemy.hpMin,
    hpMax: lastStat?.hp ?? enemy.hpMax,
    ap: Number.isFinite(ap) && ap > 0 ? ap : enemy.ap,
    exp: firstStat?.exp ?? enemy.exp,
    elementals,
    elementalWeaknesses: weak || enemy.elementalWeaknesses,
    elementalResistances: resist || enemy.elementalResistances,
    statusVulnerabilitiesNote: statusNote || enemy.statusVulnerabilitiesNote,
    statusEffects: statusEffects.length ? statusEffects : enemy.statusEffects,
    whereFound: enemy.whereFound || location || undefined,
    drawMagic: canonicalDrawMagic.length ? canonicalDrawMagic : enemy.drawMagic,
    drawMagicByLevel: drawMagicByLevel.length ? drawMagicByLevel : enemy.drawMagicByLevel,
    abilities: canonicalAbilitiesList.length ? canonicalAbilitiesList : enemy.abilities,
    abilitiesByLevel: abilitiesByLevel.length ? abilitiesByLevel : enemy.abilitiesByLevel,
    statsByLevel: stats.length ? stats : enemy.statsByLevel,
    mug: mugBands[0]?.value ?? enemy.mug,
    mugByLevel: mugBands.length ? mugBands.map(({ lvMin, lvMax, value, chance }) => ({ lvMin, lvMax, value, chance })) : enemy.mugByLevel,
    mugChance: mugBands[0]?.chance ?? enemy.mugChance,
    drop: dropBands[0]?.value ?? enemy.drop,
    dropByLevel: dropBands.length ? dropBands.map(({ lvMin, lvMax, value, chance }) => ({ lvMin, lvMax, value, chance })) : enemy.dropByLevel,
    dropChance: dropBands[0]?.chance ?? enemy.dropChance,
    devour: devourBands[0]?.value ?? enemy.devour,
    devourByLevel: devourBands.length ? devourBands.map(({ lvMin, lvMax, value }) => ({ lvMin, lvMax, value })) : enemy.devourByLevel,
    cards: cards.cards ?? enemy.cards,
    cardDrop: cards.cardDrop ?? enemy.cardDrop,
    cardResults: canonicalCardResults(record),
    scan: scan || enemy.scan,
  }
}

/**
 * Keeps Guide encounter IDs and prose stable while replacing intrinsic enemy
 * fields with the canonical bestiary record. Unmapped or incomplete records
 * intentionally fall back to the existing Guide value.
 */
export function createCanonicalEnemyLookup(existingEnemies: Enemy[], data: CanonicalBestiaryData) {
  return existingEnemies.map(enemy => mergeCanonicalEnemy(enemy, findCanonicalRecord(enemy, data.enemies)))
}

export function unresolvedCanonicalEnemyIds(existingEnemies: Enemy[], data: CanonicalBestiaryData) {
  return existingEnemies.filter(enemy => !findCanonicalRecord(enemy, data.enemies)).map(enemy => enemy.id)
}
