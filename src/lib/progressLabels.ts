import type { MasterData, Sidequest } from '../types'

export interface ProgressLabel {
  category: string
  name: string
  subName?: string
}

function titleCase(value: string) {
  return value
    .replace(/[-_]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .replace(/\b\w/g, letter => letter.toUpperCase())
}

function fallbackLabel(key: string): ProgressLabel {
  const [category = 'Progress', ...rest] = key.split('-')
  const name = rest.length ? rest.join('-') : key
  return {
    category: titleCase(category),
    name: titleCase(name),
  }
}

export function createProgressLabeler(data: MasterData, sidequests: Sidequest[]) {
  const labels = new Map<string, ProgressLabel>()

  data.chapters.forEach(chapter => {
    chapter.checkpoints.forEach(checkpoint => {
      const checklist =
        checkpoint.type === 'achievement'
          ? data.checklists.achievements.find(item => item.id === checkpoint.id)
          : data.checklists.missables.find(item => item.id === checkpoint.id)

      labels.set(checkpoint.id, {
        category: checkpoint.type === 'achievement' ? 'Achievement' : checkpoint.type === 'missable' ? 'Missable' : 'Task',
        name: checklist?.title ?? checkpoint.label,
        subName: chapter.title,
      })
    })
  })

  data.lookup.gfs.forEach(gf => {
    labels.set(gf.id, {
      category: 'Guardian Force',
      name: gf.name,
    })
  })

  data.lookup.cards.forEach(card => {
    labels.set(card.id, {
      category: 'Card',
      name: card.name,
    })
  })

  sidequests.forEach(sidequest => {
    labels.set(`sidequest-${sidequest.id}`, {
      category: 'Sidequest',
      name: sidequest.title,
    })
  })

  return (key: string) => labels.get(key) ?? fallbackLabel(key)
}
