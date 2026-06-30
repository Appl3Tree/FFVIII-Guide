import type { Enemy } from '../types'

type SpellBand = NonNullable<Enemy['drawMagicByLevel']>[number]
type ValueBand = NonNullable<Enemy['mugByLevel']>[number]

function overlaps(band: { lvMin: number; lvMax: number }, lvMin: number, lvMax: number) {
  return band.lvMin <= lvMax && band.lvMax >= lvMin
}

function unique(values: string[]) {
  return [...new Set(values.filter(Boolean))]
}

function sameSpellList(a: string[], b: string[]) {
  if (a.length !== b.length) return false
  return a.every((spell, index) => spell === b[index])
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

export function drawMagicForLevel(enemy: Enemy | null, lvMin: number, lvMax: number): string[] {
  if (!enemy) return []
  const bands = enemy.drawMagicByLevel ?? []
  const matching = bands
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
