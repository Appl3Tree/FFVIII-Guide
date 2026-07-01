import { useState, useCallback, useEffect } from 'react'
import type { TrackerState, MasterData } from '../types'

const STORAGE_KEY = 'ffviii-tracker-v2'

const defaultState: TrackerState = {
  completedItems: {},
  notes: {},
}

function loadState(): TrackerState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return defaultState
    return { ...defaultState, ...JSON.parse(raw) }
  } catch {
    return defaultState
  }
}

export function useTracker() {
  const [state, setState] = useState<TrackerState>(loadState)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  }, [state])

  const toggleItem = useCallback((id: string) => {
    setState(s => ({
      ...s,
      completedItems: { ...s.completedItems, [id]: !s.completedItems[id] },
    }))
  }, [])

  const isCompleted = useCallback((id: string) => {
    return !!state.completedItems[id]
  }, [state.completedItems])

  const updateNote = useCallback((id: string, value: string) => {
    setState(s => ({
      ...s,
      notes: { ...s.notes, [id]: value },
    }))
  }, [])

  const deleteNote = useCallback((id: string) => {
    setState(s => {
      const nextNotes = { ...s.notes }
      delete nextNotes[id]
      return { ...s, notes: nextNotes }
    })
  }, [])

  const getProgress = useCallback((
    category: 'achievements' | 'missables' | 'gfs' | 'cards' | 'chapter',
    data: MasterData,
    chapterId?: string,
  ): number => {
    let ids: string[] = []

    if (category === 'achievements') {
      ids = data.chapters
        .flatMap(ch => ch.checkpoints)
        .filter(cp => cp.type === 'achievement')
        .map(cp => cp.id)
    } else if (category === 'missables') {
      ids = data.chapters
        .flatMap(ch => ch.checkpoints)
        .filter(cp => cp.type === 'missable')
        .map(cp => cp.id)
    } else if (category === 'gfs') {
      ids = data.lookup.gfs.map(g => g.id)
    } else if (category === 'cards') {
      ids = data.lookup.cards.map(c => c.id)
    } else if (category === 'chapter' && chapterId) {
      const ch = data.chapters.find(c => c.id === chapterId)
      ids = ch?.checkpoints.map(cp => cp.id) ?? []
    }

    if (!ids.length) return 0
    const done = ids.filter(id => state.completedItems[id]).length
    return Math.round((done / ids.length) * 100)
  }, [state.completedItems])

  const resetAll = useCallback(() => setState(defaultState), [])

  return { state, toggleItem, isCompleted, getProgress, updateNote, deleteNote, resetAll }
}
