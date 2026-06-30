import { useState, useMemo, useCallback } from 'react'
import type { MasterData, Sidequest } from '../types'

export interface SearchResult {
  id: string
  type: 'chapter' | 'achievement' | 'missable' | 'task' | 'sidequest' | 'card' | 'gf' | 'ability' | 'refinement' | 'magic' | 'item' | 'weapon' | 'enemy'
  title: string
  subtitle: string
  chapterId?: string
}

export function useSearch(data: MasterData, sidequests: Sidequest[] = []) {
  const [query, setQuery] = useState('')
  const [open, setOpen] = useState(false)

  const results = useMemo<SearchResult[]>(() => {
    const q = query.trim().toLowerCase()
    if (q.length < 2) return []

    const out: SearchResult[] = []

    // Chapters — title only (content matching floods results)
    for (const ch of data.chapters) {
      if (ch.title.toLowerCase().includes(q)) {
        out.push({
          id: ch.id,
          type: 'chapter',
          title: ch.title,
          subtitle: ch.disc === 0 ? 'Reference' : `Disc ${ch.disc} · Ch. ${ch.index}`,
        })
      }
    }

    // Checkpoints (achievements + missables)
    for (const ch of data.chapters) {
      for (const cp of ch.checkpoints) {
        if (cp.label.toLowerCase().includes(q) || cp.description.toLowerCase().includes(q)) {
          out.push({
            id: cp.id,
            type: cp.type,
            title: cp.label,
            subtitle: cp.description.slice(0, 70) + (cp.description.length > 70 ? '…' : ''),
            chapterId: ch.id,
          })
        }
      }
    }

    // Sidequests
    for (const sidequest of sidequests) {
      const haystack = [
        sidequest.title,
        sidequest.category,
        sidequest.summary,
        sidequest.available,
        sidequest.deadline,
        sidequest.rewards.join(' '),
        sidequest.route.join(' '),
      ].join(' ').toLowerCase()
      if (haystack.includes(q)) {
        out.push({
          id: sidequest.id,
          type: 'sidequest',
          title: sidequest.title,
          subtitle: `${sidequest.category} · ${sidequest.available.slice(0, 55)}`,
          chapterId: sidequest.placements[0]?.chapterId,
        })
      }
    }

    // Abilities
    if (data.lookup.abilities?.length) {
      for (const ab of data.lookup.abilities) {
        if (
          ab.name.toLowerCase().includes(q) ||
          ab.description.toLowerCase().includes(q) ||
          ab.availableTo.toLowerCase().includes(q) ||
          ab.taughtBy.toLowerCase().includes(q)
        ) {
          out.push({
            id: ab.id,
            type: 'ability',
            title: ab.name,
            subtitle: `${ab.category}${ab.ap && ab.ap !== 'N/A' ? ` · ${ab.ap} AP` : ''}${ab.taughtBy && ab.taughtBy !== 'N/A' ? ` · ${ab.taughtBy}` : ''}`,
          })
        }
      }
    } else {
      for (const g of data.lookup.gfs) {
        for (const ab of g.abilities) {
          if (ab.name.toLowerCase().includes(q)) {
            const existing = out.find(r => r.type === 'ability' && r.id === `ability-${ab.name}`)
            if (existing) {
              existing.subtitle += `, ${g.name}`
            } else {
              out.push({
                id: `ability-${ab.name}`,
                type: 'ability',
                title: ab.name,
                subtitle: g.name,
              })
            }
          }
        }
      }
    }

    // GFs
    for (const g of data.lookup.gfs) {
      if (g.name.toLowerCase().includes(q) || g.location.toLowerCase().includes(q)) {
        out.push({
          id: g.id,
          type: 'gf',
          title: g.name,
          subtitle: `${g.element} · ${g.location.slice(0, 50)}`,
        })
      }
    }

    // Cards
    for (const c of data.lookup.cards) {
      if (c.name.toLowerCase().includes(q)) {
        out.push({
          id: c.id,
          type: 'card',
          title: c.name,
          subtitle: `L${c.level} ${c.type}${c.howToGet ? ' · ' + c.howToGet.slice(0, 40) : ''}`,
        })
      }
    }

    // Refinement
    for (const r of data.lookup.refinement) {
      if (r.ability.toLowerCase().includes(q)) {
        out.push({ id: r.ability, type: 'refinement', title: r.ability, subtitle: `${r.entries.length} recipes` })
      }
      for (const e of r.entries) {
        if (e.from.toLowerCase().includes(q) || e.to.toLowerCase().includes(q)) {
          out.push({
            id: `ref-${r.ability}-${e.from}`,
            type: 'refinement',
            title: `${e.fromQty}× ${e.from} → ${e.toQty}× ${e.to}`,
            subtitle: r.ability,
          })
        }
      }
    }

    // Magic
    for (const spell of data.lookup.magic ?? []) {
      if (
        spell.name.toLowerCase().includes(q) ||
        spell.castEffect.toLowerCase().includes(q) ||
        (spell.acquisition['Refine From'] ?? '').toLowerCase().includes(q) ||
        (spell.acquisition['Refine Into'] ?? '').toLowerCase().includes(q)
      ) {
        out.push({
          id: spell.id,
          type: 'magic',
          title: spell.name,
          subtitle: `Magic · ${spell.castEffect.slice(0, 55)}`,
          chapterId: 'r0-magic-reference',
        })
      }
    }

    // Items
    for (const it of data.lookup.items) {
      const obtain = Array.isArray(it.obtain) ? it.obtain.join('; ') : (it.obtain ?? '')
      if (it.name.toLowerCase().includes(q) || obtain.toLowerCase().includes(q)) {
        out.push({
          id: it.id,
          type: 'item',
          title: it.name,
          subtitle: `${it.section}${obtain ? ' · ' + obtain.slice(0, 45) : ''}`,
        })
      }
    }

    // Weapons
    for (const w of data.lookup.weapons) {
      if (
        w.name.toLowerCase().includes(q) ||
        (w.sourceAliases ?? []).some(alias => alias.toLowerCase().includes(q)) ||
        w.materials.some(m => m.toLowerCase().includes(q))
      ) {
        out.push({
          id: w.id,
          type: 'weapon',
          title: w.name,
          subtitle: `${w.type} · ${w.materials.slice(0, 3).join(', ')}`,
        })
      }
    }

    // Enemies
    for (const e of data.lookup.enemies) {
      if (
        e.name.toLowerCase().includes(q) ||
        e.drawMagic.some((m: string) => m.toLowerCase().includes(q)) ||
        (e.mug?.toLowerCase().includes(q)) ||
        (e.drop?.toLowerCase().includes(q)) ||
        (e.cards?.common?.toLowerCase().includes(q)) ||
        (e.cards?.rare?.toLowerCase().includes(q))
      ) {
        out.push({
          id: e.id,
          type: 'enemy',
          title: e.name,
          subtitle: `Lv ${e.lvMin}–${e.lvMax} · HP ${e.hpMin.toLocaleString()}–${e.hpMax.toLocaleString()} · ${e.ap} AP`,
        })
      }
    }

    return out.slice(0, 24)
  }, [query, data, sidequests])

  const openSearch = useCallback(() => setOpen(true), [])
  const closeSearch = useCallback(() => { setOpen(false); setQuery('') }, [])

  return { query, setQuery, results, open, openSearch, closeSearch }
}
