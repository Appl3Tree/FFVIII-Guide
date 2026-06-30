import { useState } from 'react'
import { BookOpen, CheckSquare, Compass, CreditCard, Ellipsis, Sparkles, Search, FlaskConical, Package, Skull, Zap } from 'lucide-react'
import { cn } from '../../lib/utils'
import type { ViewMode } from '../../types'

interface Props {
  active: ViewMode
  onChange: (v: ViewMode) => void
  onSearch: () => void
}

const primaryTabs: { id: ViewMode; label: string; icon: React.ReactNode }[] = [
  { id: 'guide',       label: 'Guide',   icon: <BookOpen size={16} /> },
  { id: 'checklist',   label: 'Checklist', icon: <CheckSquare size={16} /> },
  { id: 'sidequests',  label: 'Sidequests', icon: <Compass size={16} /> },
]

const moreTabs: { id: ViewMode; label: string; icon: React.ReactNode }[] = [
  { id: 'cards',       label: 'Cards',   icon: <CreditCard size={16} /> },
  { id: 'gfs',         label: 'GFs',      icon: <Sparkles size={16} /> },
  { id: 'abilities',   label: 'Abilities',icon: <Zap size={16} /> },
  { id: 'refinement',  label: 'Refine',   icon: <FlaskConical size={16} /> },
  { id: 'items',       label: 'Items',   icon: <Package size={16} /> },
  { id: 'bestiary',    label: 'Bestiary',icon: <Skull size={16} /> },
]

const fullTabs: { id: ViewMode; label: string; icon: React.ReactNode }[] = [
  ...primaryTabs,
  ...moreTabs,
]

export function BottomNav({ active, onChange, onSearch }: Props) {
  const [moreOpen, setMoreOpen] = useState(false)
  const moreActive = moreTabs.some(tab => tab.id === active)

  const select = (view: ViewMode) => {
    setMoreOpen(false)
    onChange(view)
  }

  return (
    <>
      {moreOpen && (
        <div className="bottom-nav-compact-overlay fixed inset-0 z-40 bg-black/50" onClick={() => setMoreOpen(false)}>
          <div
            className="absolute bottom-[calc(3.75rem+env(safe-area-inset-bottom))] left-3 right-3 rounded-xl border border-slate-700/70 bg-slate-950/95 p-2 shadow-2xl shadow-black/60"
            onClick={event => event.stopPropagation()}
          >
            <div className="grid grid-cols-3 gap-1.5">
              {moreTabs.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => select(tab.id)}
                  aria-label={tab.label}
                  className={cn(
                    'flex min-h-14 flex-col items-center justify-center gap-1 rounded-lg border px-2 py-2 text-[10px] transition-colors',
                    active === tab.id
                      ? 'border-teal-500/50 bg-teal-950/30 text-teal-300'
                      : 'border-slate-800/80 bg-slate-900/65 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                  )}
                >
                  {tab.icon}
                  <span className="leading-none">{tab.label}</span>
                </button>
              ))}
              <button
                onClick={() => { setMoreOpen(false); onSearch() }}
                aria-label="Search"
                className="flex min-h-14 flex-col items-center justify-center gap-1 rounded-lg border border-slate-800/80 bg-slate-900/65 px-2 py-2 text-[10px] text-slate-400 transition-colors hover:border-slate-700 hover:text-slate-200"
              >
                <Search size={16} />
                <span className="leading-none">Search</span>
              </button>
            </div>
          </div>
        </div>
      )}

      <nav className="bottom-nav-compact fixed bottom-0 left-0 right-0 z-50 glass-panel items-stretch rounded-none border-t border-slate-700/60 pb-[env(safe-area-inset-bottom)]">
        {primaryTabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => select(tab.id)}
            aria-label={tab.label}
            className={cn(
              'flex min-w-0 flex-1 flex-col items-center justify-center gap-0.5 px-1 py-2.5 text-[9px] transition-colors duration-150',
              active === tab.id
                ? 'text-teal-400'
                : 'text-slate-500 hover:text-slate-300'
            )}
          >
            {tab.icon}
            <span className="max-w-full truncate leading-none">{tab.label}</span>
          </button>
        ))}
        <button
          onClick={onSearch}
          aria-label="Search"
          className="flex min-w-0 flex-1 flex-col items-center justify-center gap-0.5 px-1 py-2.5 text-[9px] text-slate-500 transition-colors hover:text-slate-300"
        >
          <Search size={16} />
          <span className="max-w-full truncate leading-none">Search</span>
        </button>
        <button
          onClick={() => setMoreOpen(open => !open)}
          aria-label="More tabs"
          className={cn(
            'flex min-w-0 flex-1 flex-col items-center justify-center gap-0.5 px-1 py-2.5 text-[9px] transition-colors',
            moreActive || moreOpen ? 'text-teal-400' : 'text-slate-500 hover:text-slate-300'
          )}
        >
          <Ellipsis size={16} />
          <span className="max-w-full truncate leading-none">More</span>
        </button>
      </nav>

      <nav className="bottom-nav-full fixed bottom-0 left-0 right-0 z-50 items-stretch rounded-none border-t border-slate-700/60 bg-slate-950/95 pb-[env(safe-area-inset-bottom)] backdrop-blur-sm">
        {fullTabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => select(tab.id)}
            aria-label={tab.label}
            className={cn(
              'flex min-w-0 flex-1 flex-col items-center justify-center gap-0.5 px-1 py-2.5 text-[9px] transition-colors duration-150',
              active === tab.id
                ? 'text-teal-400'
                : 'text-slate-500 hover:text-slate-300'
            )}
          >
            {tab.icon}
            <span className="max-w-full truncate leading-none">{tab.label}</span>
          </button>
        ))}
        <button
          onClick={onSearch}
          aria-label="Search"
          className="flex min-w-0 flex-1 flex-col items-center justify-center gap-0.5 px-1 py-2.5 text-[9px] text-slate-500 transition-colors hover:text-slate-300"
        >
          <Search size={16} />
          <span className="max-w-full truncate leading-none">Search</span>
        </button>
      </nav>
    </>
  )
}
