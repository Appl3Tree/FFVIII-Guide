import type { Chapter, Enemy, MagicSpell } from '../types'
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
  const ordered = orderedStoryChapters(chapters)
  const selectedIndex = Math.max(0, ordered.findIndex(chapter => chapter.id === chapterId))
  const enemyMap = new Map(enemies.map(enemy => [enemy.id, enemy]))

  for (const chapter of ordered.slice(0, selectedIndex + 1)) {
    for (const paragraph of chapter.content.split(/\n\s*\n/)) {
      if (!/draw\s+point/i.test(paragraph)) continue
      for (const spell of magic) {
        if (containsGameName(paragraph, spell.name)) available.add(spell.id)
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
