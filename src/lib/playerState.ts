import type { CharacterProfile, GFAbility, GuardianForce, MagicSpell, TrackerState } from '../types'

export const MAGIC_STOCK_ASSUMPTION = 100
export const MIN_CHARACTER_LEVEL = 1
export const MAX_CHARACTER_LEVEL = 100
export const MAX_ACTIVE_PARTY_SIZE = 3

export function gfAbilityKey(gfId: string, abilityName: string) {
  return `${gfId}:${abilityName}`
}

export function enemyDefeatedTrackerId(enemyId: string) {
  return `enemy-defeated:${enemyId}`
}

export function clampCharacterLevel(value: number) {
  if (!Number.isFinite(value)) return MIN_CHARACTER_LEVEL
  return Math.min(MAX_CHARACTER_LEVEL, Math.max(MIN_CHARACTER_LEVEL, Math.round(value)))
}

export function activeCharacterIds(state: Pick<TrackerState, 'activeParty'>, characters: CharacterProfile[]) {
  return characters
    .filter(character => state.activeParty[character.id])
    .map(character => character.id)
}

export function characterLevel(state: Pick<TrackerState, 'characterLevels'>, characterId: string) {
  return clampCharacterLevel(state.characterLevels[characterId] ?? MIN_CHARACTER_LEVEL)
}

export function isMagicCompleted(
  state: Pick<TrackerState, 'magicCompletedByCharacter'>,
  characterId: string,
  spellId: string,
) {
  return !!state.magicCompletedByCharacter[characterId]?.[spellId]
}

export function isGFAbilityLearned(
  state: Pick<TrackerState, 'learnedGFAbilities'>,
  gfId: string,
  abilityName: string,
) {
  return !!state.learnedGFAbilities[gfAbilityKey(gfId, abilityName)]
}

export function isBlueMagicLearned(
  state: Pick<TrackerState, 'learnedBlueMagic'>,
  abilityId: string,
) {
  return !!state.learnedBlueMagic[abilityId]
}

function normalized(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, '')
}

function findAbilityMatches(item: string, abilities: GFAbility[]) {
  const base = item.replace(/\s*\([^)]*\)\s*$/, '').trim()
  const exact = abilities.filter(ability => ability.name === base)
  if (exact.length) return exact

  if (/\babilities$/i.test(base)) {
    const prefix = base.replace(/\s*abilities$/i, '').replace(/%$/, '')
    return abilities.filter(ability => ability.name.startsWith(prefix))
  }

  if (/^other junctions$/i.test(base)) {
    return abilities.filter(ability => /(?:-J|^Ability x[34])/i.test(ability.name))
  }

  if (/^everything else$/i.test(base)) return abilities
  return abilities.filter(ability => normalized(ability.name) === normalized(base))
}

/**
 * Expands the existing human-readable GF learning path into concrete abilities.
 * The source data remains authoritative; this only resolves its grouping labels
 * so the tracker can show and persist individual learned abilities.
 */
export function recommendedGFAbilities(gf: GuardianForce): GFAbility[] {
  if (!gf.learningOrder?.length) return gf.abilities

  const ordered: GFAbility[] = []
  const seen = new Set<string>()
  for (const item of gf.learningOrder) {
    for (const ability of findAbilityMatches(item, gf.abilities)) {
      if (!seen.has(ability.name)) {
        seen.add(ability.name)
        ordered.push(ability)
      }
    }
  }

  for (const ability of gf.abilities) {
    if (!seen.has(ability.name)) ordered.push(ability)
  }

  return ordered
}

export function magicById(magic: MagicSpell[]) {
  return new Map(magic.map(spell => [spell.id, spell]))
}

export function magicByName(magic: MagicSpell[]) {
  const map = new Map<string, MagicSpell>()
  for (const spell of magic) {
    map.set(normalized(spell.name), spell)
    if (spell.sourceName) map.set(normalized(spell.sourceName), spell)
  }
  return map
}

export function charactersNeedingSpell(
  spellName: string,
  characters: CharacterProfile[],
  magic: MagicSpell[],
  state: Pick<TrackerState, 'magicCompletedByCharacter'>,
) {
  const spell = magicByName(magic).get(normalized(spellName))
  if (!spell) return []
  return characters.filter(character => !isMagicCompleted(state, character.id, spell.id))
}

export function remainingMagicForCharacter(
  characterId: string,
  magic: MagicSpell[],
  state: Pick<TrackerState, 'magicCompletedByCharacter'>,
) {
  return magic.filter(spell => !isMagicCompleted(state, characterId, spell.id))
}

export function recommendedGFProgress(
  gfs: GuardianForce[],
  state: Pick<TrackerState, 'learnedGFAbilities'>,
  acquiredGFIds?: ReadonlySet<string>,
) {
  return gfs.filter(gf => !acquiredGFIds || acquiredGFIds.has(gf.id)).map(gf => {
    const abilities = recommendedGFAbilities(gf)
    const learned = abilities.filter(ability => isGFAbilityLearned(state, gf.id, ability.name)).length
    return {
      gf,
      abilities,
      learned,
      remaining: abilities.length - learned,
    }
  })
}
