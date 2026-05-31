import { useState, useMemo } from 'react'
import { Search, ChevronDown } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '../../lib/utils'
import type { RefinementAbility } from '../../types'

interface Props {
  refinement: RefinementAbility[]
}

export function RefinementView({ refinement }: Props) {
  const [query, setQuery] = useState('')
  const [expanded, setExpanded] = useState<string | null>(null)

  const filtered = useMemo(() => {
    const q = query.toLowerCase()
    if (!q) return refinement
    return refinement.filter(r =>
      r.ability.toLowerCase().includes(q) ||
      r.entries.some(e => e.from.toLowerCase().includes(q) || e.to.toLowerCase().includes(q))
    )
  }, [refinement, query])

  return (
    <div className="space-y-3 pb-6 w-full">
      <div className="glass-panel p-4">
        <h2 className="text-base font-semibold text-slate-100 mb-3">Refinement Charts</h2>
        <div className="relative">
          <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
          <input
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search items or abilities…"
            className="w-full bg-slate-800/60 border border-slate-700/60 rounded-lg pl-8 pr-3 py-2 text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-teal-500/40"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-2">
        {filtered.map(r => {
          const isOpen = expanded === r.ability
          const matchEntries = query
            ? r.entries.filter(e =>
                e.from.toLowerCase().includes(query.toLowerCase()) ||
                e.to.toLowerCase().includes(query.toLowerCase())
              )
            : r.entries

          return (
            <div key={r.ability} className="glass-panel overflow-hidden">
              <button
                onClick={() => setExpanded(isOpen ? null : r.ability)}
                className="w-full flex items-center justify-between px-4 py-3 hover:bg-white/5 transition-colors"
              >
                <span className="text-sm font-semibold text-teal-300">{r.ability}</span>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-500">{r.entries.length} recipes</span>
                  <ChevronDown size={13} className={cn('text-slate-500 transition-transform duration-200', isOpen && 'rotate-180')} />
                </div>
              </button>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.18, ease: 'easeInOut' }}
                    className="overflow-hidden"
                  >
                    <div className="border-t border-slate-700/40">
                      {matchEntries.map((e, i) => (
                        <div key={i} className={cn(
                          'px-4 py-2 flex items-center gap-3 text-xs',
                          i % 2 === 1 ? 'bg-slate-800/20' : ''
                        )}>
                          <span className="text-slate-500 font-mono w-6 text-right shrink-0">{e.fromQty}×</span>
                          <span className="text-slate-200 flex-1 min-w-0 truncate">{e.from}</span>
                          <span className="text-teal-600/80 shrink-0">→</span>
                          <span className="text-emerald-300 flex-1 min-w-0 truncate font-medium">{e.to}</span>
                          <span className="text-slate-500 font-mono w-6 shrink-0 text-right">{e.toQty}×</span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )
        })}
        {filtered.length === 0 && (
          <div className="glass-panel-sm px-4 py-8 text-center text-sm text-slate-600">
            No refinement recipes match "{query}"
          </div>
        )}
      </div>
    </div>
  )
}
