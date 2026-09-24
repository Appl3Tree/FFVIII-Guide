import type { Chapter, Enemy, GuardianForce, MagicSpell } from '../types'
import { BLUE_MAGIC } from '../data/blueMagic'
import { contextualDrawMagic, resolveEnemyLevelContext, type PartyLevelContext } from './enemyLevelData'
import { magicByName } from './playerState'

function chapterOrder(a: Chapter, b: Chapter) {
  return a.disc - b.disc || a.index - b.index
}

export function orderedStoryChapters(chapters: Chapter[]) {
  return chapters.filter(chapter => chapter.disc > 0).sort(chapterOrder)
}

export function defaultProgressionChapterId(chapters: Chapter[]) {
  return orderedStoryChapters(chapters)[0]?.id ?? chapters[0]?.id ?? ''
}

export function validProgressionChapterId(chapters: Chapter[], chapterId: unknown) {
  return typeof chapterId === 'string' && orderedStoryChapters(chapters).some(chapter => chapter.id === chapterId)
    ? chapterId
    : defaultProgressionChapterId(chapters)
}

export interface ProgressionAvailability {
  orderedChapters: Chapter[]
  reachedChapters: Chapter[]
  reachedChapterIds: ReadonlySet<string>
  hasReached: (availabilityChapterId?: string | null) => boolean
}

/**
 * Resolves the selected story point once so progression-aware features share
 * the same chronological ordering and never need chapter-name comparisons.
 */
export function createProgressionAvailability(chapters: Chapter[], selectedChapterId: string): ProgressionAvailability {
  const orderedChapters = orderedStoryChapters(chapters)
  const selectedIndex = Math.max(0, orderedChapters.findIndex(chapter => chapter.id === selectedChapterId))
  const reachedChapters = orderedChapters.slice(0, selectedIndex + 1)
  const reachedChapterIds = new Set(reachedChapters.map(chapter => chapter.id))

  return {
    orderedChapters,
    reachedChapters,
    reachedChapterIds,
    hasReached: availabilityChapterId => typeof availabilityChapterId === 'string' && reachedChapterIds.has(availabilityChapterId),
  }
}

export function gfIdsAvailableByProgression(
  chapters: Chapter[],
  chapterId: string,
  gfs: GuardianForce[],
) {
  const progression = createProgressionAvailability(chapters, chapterId)
  return new Set(
    gfs
      .filter(gf => progression.hasReached(gf.availabilityChapterId))
      .map(gf => gf.id),
  )
}

/**
 * Blue Magic to-do counts follow the first acquisition opportunity explicitly
 * established by the Guide. Learned future abilities remain learned, while
 * unavailable items do not inflate the current actionable count.
 */
export function blueMagicAvailableByProgression(chapters: Chapter[], chapterId: string) {
  const progression = createProgressionAvailability(chapters, chapterId)
  return new Set(
    BLUE_MAGIC
      .filter(ability => ability.knownByDefault || progression.hasReached(ability.availableFromChapterId))
      .map(ability => ability.id),
  )
}

function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

function containsGameName(text: string, name: string) {
  const pattern = new RegExp(`(?:^|[^a-z])${escapeRegExp(name.toLowerCase())}(?:$|[^a-z])`, 'i')
  return pattern.test(text)
}

/**
 * Returns magic that has a structured acquisition path at or before the
 * selected story chapter. It deliberately only consumes explicit Draw Point
 * prose and structured encounter Draw data; unstructured recommendations are
 * not treated as proof that a spell is currently obtainable.
 */
export function magicAvailableByProgression(
  chapters: Chapter[],
  chapterId: string,
  enemies: Enemy[],
  magic: MagicSpell[],
  party: PartyLevelContext,
) {
  const spellMap = magicByName(magic)
  const available = new Set<string>()
  const progression = createProgressionAvailability(chapters, chapterId)
  const enemyMap = new Map(enemies.map(enemy => [enemy.id, enemy]))

  for (const chapter of progression.reachedChapters) {
    for (const paragraph of chapter.content.split(/\n\s*\n/)) {
      const availableDrawPointSentences = paragraph
        .split(/(?<=[.!?])\s+|\n+/)
        .filter(sentence => /draw\s+point/i.test(sentence) && !/\b(?:later|future)\b/i.test(sentence))
      for (const sentence of availableDrawPointSentences) {
        for (const spell of magic) {
          if (containsGameName(sentence, spell.name)) available.add(spell.id)
        }
      }
    }

    for (const encounter of chapter.encounters ?? []) {
      for (const areaEnemy of encounter.enemies) {
        const enemy = enemyMap.get(areaEnemy.id)
        if (!enemy) continue
        const context = resolveEnemyLevelContext(enemy, party, {
          lvMin: areaEnemy.lvMin,
          lvMax: areaEnemy.lvMax,
        })
        const drawOptions = areaEnemy.drawMagic?.length
          ? areaEnemy.drawMagic
          : contextualDrawMagic(enemy, context.levels).map(option => option.value)
        for (const draw of drawOptions) {
          const spell = spellMap.get(draw.toLowerCase().replace(/[^a-z0-9]+/g, ''))
          if (spell) available.add(spell.id)
        }
      }
    }
  }

  return available
}
