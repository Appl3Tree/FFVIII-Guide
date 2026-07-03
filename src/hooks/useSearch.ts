import { useState, useMemo, useCallback } from 'react'
import type { MasterData, Sidequest } from '../types'

export interface SearchResult {
  id: string
  type: 'chapter' | 'achievement' | 'missable' | 'task' | 'sidequest' | 'card' | 'gf' | 'ability' | 'refinement' | 'magic' | 'item' | 'weapon' | 'enemy'
  title: string
  subtitle: string
  chapterId?: string
}

type RankedSearchResult = SearchResult & {
  score: number
  order: number
}

const TYPE_PRIORITY: Record<SearchResult['type'], number> = {
  gf: 14,
  card: 13,
  enemy: 12,
  refinement: 11,
  chapter: 10,
  sidequest: 9,
  magic: 8,
  item: 7,
  weapon: 7,
  achievement: 6,
  missable: 6,
  task: 5,
  ability: 12,
}

function normalizeSearchText(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim()
}

function fieldScore(query: string, value: string | null | undefined, weight: number) {
  if (!value) return 0

  const normalized = normalizeSearchText(value)
  if (!normalized) return 0

  if (normalized === query) return weight + 120
  if (normalized.startsWith(query)) return weight + 90
  if (normalized.split(' ').some(word => word === query)) return weight + 70
  if (normalized.split(' ').some(word => word.startsWith(query))) return weight + 45
  if (normalized.includes(query)) return weight + 20

  return 0
}

export function buildSearchResults(data: MasterData, sidequests: Sidequest[] = [], rawQuery: string): SearchResult[] {
  const q = normalizeSearchText(rawQuery)
  if (q.length < 2) return []

  const out: RankedSearchResult[] = []
  let order = 0

  const addResult = (result: SearchResult, score: number) => {
    if (score <= 0) return
    out.push({
      ...result,
      score: score + TYPE_PRIORITY[result.type],
      order: order++,
    })
  }

  // Chapters — title only (content matching floods results)
  for (const ch of data.chapters) {
    const score = fieldScore(q, ch.title, 100)
    if (score) {
      addResult({
        id: ch.id,
        type: 'chapter',
        title: ch.title,
        subtitle: ch.disc === 0 ? 'Reference' : `Disc ${ch.disc} · Ch. ${ch.index}`,
      }, score)
    }
  }

  // Checkpoints (achievements + missables)
  for (const ch of data.chapters) {
    for (const cp of ch.checkpoints) {
      const score = Math.max(
        fieldScore(q, cp.label, 70),
        fieldScore(q, cp.description, 15)
      )
      if (score) {
        addResult({
          id: cp.id,
          type: cp.type,
          title: cp.label,
          subtitle: cp.description.slice(0, 70) + (cp.description.length > 70 ? '…' : ''),
          chapterId: ch.id,
        }, score)
      }
    }
  }

  // Sidequests
  for (const sidequest of sidequests) {
    const haystack = [
      sidequest.summary,
      sidequest.available,
      sidequest.deadline,
      sidequest.rewards.join(' '),
      sidequest.route.join(' '),
    ].join(' ')
    const score = Math.max(
      fieldScore(q, sidequest.title, 100),
      fieldScore(q, sidequest.category, 45),
      fieldScore(q, haystack, 15)
    )
    if (score) {
      addResult({
        id: sidequest.id,
        type: 'sidequest',
        title: sidequest.title,
        subtitle: `${sidequest.category} · ${sidequest.available.slice(0, 55)}`,
        chapterId: sidequest.placements[0]?.chapterId,
      }, score)
    }
  }

  // Abilities
  if (data.lookup.abilities?.length) {
    for (const ab of data.lookup.abilities) {
      const score = Math.max(
        fieldScore(q, ab.name, 100),
        fieldScore(q, ab.description, 18),
        fieldScore(q, ab.availableTo, 12),
        fieldScore(q, ab.taughtBy, 12)
      )
      if (score) {
        addResult({
          id: ab.id,
          type: 'ability',
          title: ab.name,
          subtitle: `${ab.category}${ab.ap && ab.ap !== 'N/A' ? ` · ${ab.ap} AP` : ''}${ab.taughtBy && ab.taughtBy !== 'N/A' ? ` · ${ab.taughtBy}` : ''}`,
        }, score)
      }
    }
  } else {
    for (const g of data.lookup.gfs) {
      for (const ab of g.abilities) {
        const score = fieldScore(q, ab.name, 100)
        if (score) {
          const existing = out.find(r => r.type === 'ability' && r.id === `ability-${ab.name}`)
          if (existing) {
            existing.subtitle += `, ${g.name}`
            existing.score = Math.max(existing.score, score + TYPE_PRIORITY.ability)
          } else {
            addResult({
              id: `ability-${ab.name}`,
              type: 'ability',
              title: ab.name,
              subtitle: g.name,
            }, score)
          }
        }
      }
    }
  }

  // GFs
  for (const g of data.lookup.gfs) {
    const score = Math.max(
      fieldScore(q, g.name, 110),
      fieldScore(q, g.location, 18)
    )
    if (score) {
      addResult({
        id: g.id,
        type: 'gf',
        title: g.name,
        subtitle: `${g.element} · ${g.location.slice(0, 50)}`,
      }, score)
    }
  }

  // Cards
  for (const c of data.lookup.cards) {
    const score = Math.max(
      fieldScore(q, c.name, 110),
      fieldScore(q, c.howToGet, 14)
    )
    if (score) {
      addResult({
        id: c.id,
        type: 'card',
        title: c.name,
        subtitle: `L${c.level} ${c.type}${c.howToGet ? ' · ' + c.howToGet.slice(0, 40) : ''}`,
      }, score)
    }
  }

  // Refinement
  for (const r of data.lookup.refinement) {
    const abilityScore = fieldScore(q, r.ability, 100)
    if (abilityScore) {
      addResult({ id: r.ability, type: 'refinement', title: r.ability, subtitle: `${r.entries.length} recipes` }, abilityScore)
    }
    for (const e of r.entries) {
      const score = Math.max(
        fieldScore(q, e.from, 80),
        fieldScore(q, e.to, 80)
      )
      if (score) {
        addResult({
          id: `ref-${r.ability}-${e.from}`,
          type: 'refinement',
          title: `${e.fromQty}× ${e.from} → ${e.toQty}× ${e.to}`,
          subtitle: r.ability,
        }, score)
      }
    }
  }

  // Magic
  for (const spell of data.lookup.magic ?? []) {
    const score = Math.max(
      fieldScore(q, spell.name, 100),
      fieldScore(q, spell.castEffect, 18),
      fieldScore(q, spell.acquisition['Refine From'], 14),
      fieldScore(q, spell.acquisition['Refine Into'], 14)
    )
    if (score) {
      addResult({
        id: spell.id,
        type: 'magic',
        title: spell.name,
        subtitle: `Magic · ${spell.castEffect.slice(0, 55)}`,
        chapterId: 'r0-magic-reference',
      }, score)
    }
  }

  // Items
  for (const it of data.lookup.items) {
    const obtain = Array.isArray(it.obtain) ? it.obtain.join('; ') : (it.obtain ?? '')
    const score = Math.max(
      fieldScore(q, it.name, 100),
      fieldScore(q, obtain, 14)
    )
    if (score) {
      addResult({
        id: it.id,
        type: 'item',
        title: it.name,
        subtitle: `${it.section}${obtain ? ' · ' + obtain.slice(0, 45) : ''}`,
      }, score)
    }
  }

  // Weapons
  for (const w of data.lookup.weapons) {
    const score = Math.max(
      fieldScore(q, w.name, 100),
      ...(w.sourceAliases ?? []).map(alias => fieldScore(q, alias, 75)),
      ...w.materials.map(material => fieldScore(q, material, 45))
    )
    if (score) {
      addResult({
        id: w.id,
        type: 'weapon',
        title: w.name,
        subtitle: `${w.type} · ${w.materials.slice(0, 3).join(', ')}`,
      }, score)
    }
  }

  // Enemies
  for (const e of data.lookup.enemies) {
    const score = Math.max(
      fieldScore(q, e.name, 110),
      ...e.drawMagic.map((m: string) => fieldScore(q, m, 35)),
      fieldScore(q, e.mug, 20),
      fieldScore(q, e.drop, 20),
      fieldScore(q, e.cards?.common, 25),
      fieldScore(q, e.cards?.rare, 25)
    )
    if (score) {
      addResult({
        id: e.id,
        type: 'enemy',
        title: e.name,
        subtitle: `Lv ${e.lvMin}–${e.lvMax} · HP ${e.hpMin.toLocaleString()}–${e.hpMax.toLocaleString()} · ${e.ap} AP`,
      }, score)
    }
  }

  return out
    .sort((a, b) => b.score - a.score || a.order - b.order)
    .slice(0, 24)
    .map(({ score: _score, order: _order, ...result }) => result)
}

export function useSearch(data: MasterData, sidequests: Sidequest[] = []) {
  const [query, setQuery] = useState('')
  const [open, setOpen] = useState(false)

  const results = useMemo<SearchResult[]>(
    () => buildSearchResults(data, sidequests, query),
    [query, data, sidequests]
  )

  const openSearch = useCallback(() => setOpen(true), [])
  const closeSearch = useCallback(() => { setOpen(false); setQuery('') }, [])

  return { query, setQuery, results, open, openSearch, closeSearch }
}
