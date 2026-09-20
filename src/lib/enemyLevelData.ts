import type { Enemy } from '../types'

type SpellBand = NonNullable<Enemy['drawMagicByLevel']>[number]
type ValueBand = NonNullable<Enemy['mugByLevel']>[number]

export interface PartyLevelContext {
  activeCharacterIds: string[]
  activeLevels: number[]
  averageLevel: number
  baseLevel: number
  possibleLevels: number[]
}

export interface EnemyLevelContext extends PartyLevelContext {
  levels: number[]
  levelMin: number
  levelMax: number
  source: 'normal' | 'fixed' | 'capped'
  sourceLabel: string
}

export interface ContextualOption {
  value: string
  levels: number[]
  guaranteed: boolean
}

function overlaps(band: { lvMin: number; lvMax: number }, lvMin: number, lvMax: number) {
  return band.lvMin <= lvMax && band.lvMax >= lvMin
}

function unique(values: string[]) {
  return [...new Set(values.filter(Boolean))]
}

function clampLevel(level: number, min = 1, max = 100) {
  return Math.min(max, Math.max(min, level))
}

function uniqueSorted(values: number[]) {
  return [...new Set(values)].sort((a, b) => a - b)
}

function sameSpellList(a: string[], b: string[]) {
  return a.length === b.length && a.every((spell, index) => spell === b[index])
}

/**
 * FFVIII's ordinary encounter rule: choose either floor(4/5 × average) or
 * floor(6/5 × average), then clamp the result to levels 1–100.
 */
export function possiblePartyEnemyLevels(levels: number[]) {
  const safeLevels = levels.length ? levels.map(level => clampLevel(level)) : [1]
  const averageLevel = safeLevels.reduce((sum, level) => sum + level, 0) / safeLevels.length
  const baseLevel = Math.floor(averageLevel)
  return {
    averageLevel,
    baseLevel,
    possibleLevels: uniqueSorted([
      clampLevel(Math.floor(averageLevel * 4 / 5)),
      clampLevel(Math.floor(averageLevel * 6 / 5)),
    ]),
  }
}

export function createPartyLevelContext(
  activeCharacterIds: string[],
  characterLevels: Record<string, number>,
): PartyLevelContext {
  const activeLevels = activeCharacterIds.map(id => clampLevel(characterLevels[id] ?? 1))
  const { averageLevel, baseLevel, possibleLevels } = possiblePartyEnemyLevels(activeLevels)
  return { activeCharacterIds, activeLevels, averageLevel, baseLevel, possibleLevels }
}

export function resolveEnemyLevelContext(
  enemy: Enemy | null,
  party: PartyLevelContext,
  override?: { lvMin?: number; lvMax?: number },
): EnemyLevelContext {
  const enemyMin = override?.lvMin ?? enemy?.lvMin ?? 1
  const enemyMax = override?.lvMax ?? enemy?.lvMax ?? 100
  const min = Math.min(enemyMin, enemyMax)
  const max = Math.max(enemyMin, enemyMax)

  if (min === max) {
    return {
      ...party,
      levels: [min],
      levelMin: min,
      levelMax: max,
      source: 'fixed',
      sourceLabel: 'Fixed encounter level',
    }
  }

  const levels = uniqueSorted(party.possibleLevels.map(level => clampLevel(level, min, max)))
  const isCapped = levels.length !== party.possibleLevels.length || min !== 1 || max !== 100
  return {
    ...party,
    levels,
    levelMin: min,
    levelMax: max,
    source: isCapped ? 'capped' : 'normal',
    sourceLabel: isCapped ? `Normal scaling, capped to ${min}–${max}` : 'Normal party scaling',
  }
}

export function formatPossibleLevels(levels: number[]) {
  if (!levels.length) return 'Unknown'
  if (levels.length === 1) return `${levels[0]}`
  const contiguous = levels.every((level, index) => index === 0 || level === levels[index - 1] + 1)
  return contiguous ? `${levels[0]}–${levels[levels.length - 1]}` : levels.join(' / ')
}

export function mergeDrawLevelBands(bands: SpellBand[] | undefined): SpellBand[] {
  return (bands ?? []).reduce<SpellBand[]>((merged, band) => {
    const prev = merged[merged.length - 1]
    if (prev && prev.lvMax + 1 === band.lvMin && sameSpellList(prev.spells, band.spells)) {
      prev.lvMax = band.lvMax
    } else {
      merged.push({ ...band, spells: [...band.spells] })
    }
    return merged
  }, [])
}

export function mergeValueLevelBands(bands: ValueBand[] | undefined): ValueBand[] {
  return (bands ?? []).reduce<ValueBand[]>((merged, band) => {
    const prev = merged[merged.length - 1]
    if (prev && prev.lvMax + 1 === band.lvMin && prev.value === band.value) {
      prev.lvMax = band.lvMax
    } else {
      merged.push({ ...band })
    }
    return merged
  }, [])
}

function spellsAtLevel(enemy: Enemy, level: number) {
  const band = enemy.drawMagicByLevel?.find(candidate => level >= candidate.lvMin && level <= candidate.lvMax)
  return band ? band.spells : enemy.drawMagic
}

function valueAtLevel(
  bands: ValueBand[] | undefined,
  fallback: string | null | undefined,
  level: number,
) {
  if (!bands?.length) return fallback ?? null
  const band = bands.find(candidate => level >= candidate.lvMin && level <= candidate.lvMax)
  return band?.value ?? null
}

export function drawMagicForLevel(enemy: Enemy | null, lvMin: number, lvMax: number): string[] {
  if (!enemy) return []
  const matching = (enemy.drawMagicByLevel ?? [])
    .filter((band: SpellBand) => overlaps(band, lvMin, lvMax))
    .flatMap((band: SpellBand) => band.spells)
  return matching.length > 0 ? unique(matching) : enemy.drawMagic
}

export function valueForLevel(
  bands: ValueBand[] | undefined,
  fallback: string | null | undefined,
  lvMin: number,
  lvMax: number,
) {
  if (!bands?.length) return fallback ?? null
  const matching = bands
    .filter((band: ValueBand) => overlaps(band, lvMin, lvMax))
    .map((band: ValueBand) => band.value)
    .filter((value): value is string => Boolean(value && value !== '---' && value !== 'has nothing'))
  return matching.length > 0 ? unique(matching).join('; ') : null
}

export function contextualDrawMagic(enemy: Enemy | null, levels: number[]): ContextualOption[] {
  if (!enemy || !levels.length) return []
  const values = new Map<string, number[]>()
  for (const level of levels) {
    for (const spell of spellsAtLevel(enemy, level)) {
      const knownLevels = values.get(spell) ?? []
      knownLevels.push(level)
      values.set(spell, knownLevels)
    }
  }
  return [...values.entries()].map(([value, optionLevels]) => ({
    value,
    levels: optionLevels,
    guaranteed: optionLevels.length === levels.length,
  }))
}

export function contextualValue(
  bands: ValueBand[] | undefined,
  fallback: string | null | undefined,
  levels: number[],
): ContextualOption[] {
  if (!levels.length) return []
  const values = new Map<string, number[]>()
  for (const level of levels) {
    const value = valueAtLevel(bands, fallback, level)
    if (!value || value === '---' || value === 'has nothing') continue
    const knownLevels = values.get(value) ?? []
    knownLevels.push(level)
    values.set(value, knownLevels)
  }
  return [...values.entries()].map(([value, optionLevels]) => ({
    value,
    levels: optionLevels,
    guaranteed: optionLevels.length === levels.length,
  }))
}

export function contextualEnemyAbilities(enemy: Enemy | null, levels: number[]): ContextualOption[] {
  if (!enemy || !levels.length) return []
  const values = new Map<string, number[]>()
  for (const level of levels) {
    const band = enemy.abilitiesByLevel?.find(candidate => level >= candidate.lvMin && level <= candidate.lvMax)
    const abilities = band?.abilities ?? enemy.abilities ?? []
    for (const ability of abilities) {
      const knownLevels = values.get(ability) ?? []
      knownLevels.push(level)
      values.set(ability, knownLevels)
    }
  }
  return [...values.entries()].map(([value, optionLevels]) => ({
    value,
    levels: optionLevels,
    guaranteed: optionLevels.length === levels.length,
  }))
}

export function statsForEnemyLevels(enemy: Enemy | null, levels: number[]) {
  if (!enemy?.statsByLevel?.length) return []
  return levels.flatMap(level => {
    const stat = enemy.statsByLevel?.find(candidate => candidate.level === level)
    return stat ? [stat] : []
  })
}
