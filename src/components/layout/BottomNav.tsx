import { BookOpen, CheckSquare, CreditCard, Sparkles, Search, FlaskConical, Package, Skull } from 'lucide-react'
import { cn } from '../../lib/utils'
import type { ViewMode } from '../../types'

interface Props {
  active: ViewMode
  onChange: (v: ViewMode) => void
  onSearch: () => void
}

const tabs: { id: ViewMode; label: string; icon: React.ReactNode }[] = [
  { id: 'guide',       label: 'Guide',   icon: <BookOpen size={16} /> },
  { id: 'checklist',   label: 'Check',   icon: <CheckSquare size={16} /> },
  { id: 'cards',       label: 'Cards',   icon: <CreditCard size={16} /> },
  { id: 'gfs',         label: 'GFs',     icon: <Sparkles size={16} /> },
  { id: 'refinement',  label: 'Refine',  icon: <FlaskConical size={16} /> },
  { id: 'items',       label: 'Items',   icon: <Package size={16} /> },
  { id: 'bestiary',    label: 'Bestiary',icon: <Skull size={16} /> },
]

export function BottomNav({ active, onChange, onSearch }: Props) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 glass-panel border-t border-slate-700/60 rounded-none flex items-stretch">
      {tabs.map(tab => (
        <button
          key={tab.id}
          onClick={() => onChange(tab.id)}
          className={cn(
            'flex-1 flex flex-col items-center justify-center gap-0.5 py-2.5 text-[10px] transition-colors duration-150',
            active === tab.id
              ? 'text-teal-400'
              : 'text-slate-500 hover:text-slate-300'
          )}
        >
          {tab.icon}
          {tab.label}
        </button>
      ))}
      <button
        onClick={onSearch}
        className="flex-1 flex flex-col items-center justify-center gap-0.5 py-2.5 text-[10px] text-slate-500 hover:text-slate-300 transition-colors"
      >
        <Search size={18} />
        Search
      </button>
    </nav>
  )
}
