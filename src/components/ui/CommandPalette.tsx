import { useEffect, useRef } from 'react'
import { Search, X, BookOpen, AlertTriangle, Trophy, CreditCard, Sparkles, FlaskConical, Package, Sword, Skull } from 'lucide-react'
import { cn } from '../../lib/utils'
import type { SearchResult } from '../../hooks/useSearch'

const typeIcons: Record<SearchResult['type'], React.ReactNode> = {
  chapter:     <BookOpen size={14} />,
  missable:    <AlertTriangle size={14} />,
  achievement: <Trophy size={14} />,
  card:        <CreditCard size={14} />,
  gf:          <Sparkles size={14} />,
  refinement:  <FlaskConical size={14} />,
  item:        <Package size={14} />,
  weapon:      <Sword size={14} />,
  enemy:       <Skull size={14} />,
}

const typeColors: Record<SearchResult['type'], string> = {
  chapter:     'text-teal-400',
  missable:    'text-amber-400',
  achievement: 'text-yellow-400',
  card:        'text-indigo-400',
  gf:          'text-violet-400',
  refinement:  'text-emerald-400',
  item:        'text-sky-400',
  weapon:      'text-rose-400',
  enemy:       'text-red-400',
}

interface Props {
  open: boolean
  query: string
  results: SearchResult[]
  onQueryChange: (q: string) => void
  onClose: () => void
  onSelect: (result: SearchResult) => void
}

export function CommandPalette({ open, query, results, onQueryChange, onClose, onSelect }: Props) {
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 50)
  }, [open])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        if (!open) return
      }
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [open, onClose])

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 px-4">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-lg glass-panel shadow-2xl shadow-black/60">
        {/* Search input */}
        <div className="flex items-center gap-3 p-3 border-b border-slate-600/40">
          <Search size={16} className="text-slate-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={e => onQueryChange(e.target.value)}
            placeholder="Search chapters, cards, GFs, missables…"
            className="flex-1 bg-transparent text-white placeholder-slate-500 text-sm outline-none"
          />
          <button onClick={onClose} className="text-slate-500 hover:text-slate-300 transition-colors">
            <X size={16} />
          </button>
        </div>

        {/* Results */}
        <div className="max-h-80 overflow-y-auto py-1">
          {query.length < 2 && (
            <p className="px-4 py-6 text-center text-slate-500 text-sm">Type to search the guide…</p>
          )}
          {query.length >= 2 && results.length === 0 && (
            <p className="px-4 py-6 text-center text-slate-500 text-sm">No results for "{query}"</p>
          )}
          {results.map(r => (
            <button
              key={r.id}
              onClick={() => { onSelect(r); onClose() }}
              className="w-full flex items-start gap-3 px-4 py-2.5 hover:bg-white/5 text-left transition-colors group"
            >
              <span className={cn('mt-0.5 shrink-0', typeColors[r.type])}>{typeIcons[r.type]}</span>
              <div className="min-w-0 flex-1">
                <div className="text-sm text-white truncate">{r.title}</div>
                <div className="text-xs text-slate-500 truncate">{r.subtitle}</div>
              </div>
              <span className={cn('text-xs capitalize shrink-0 mt-0.5 opacity-60', typeColors[r.type])}>
                {r.type}
              </span>
            </button>
          ))}
        </div>

        {/* Footer */}
        <div className="px-3 py-2 border-t border-slate-600/40 flex gap-4 text-xs text-slate-600">
          <span>↵ Select</span>
          <span>Esc Close</span>
          <span>⌘K Open</span>
        </div>
      </div>
    </div>
  )
}
