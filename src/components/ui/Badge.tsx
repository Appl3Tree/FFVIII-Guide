import { cn } from '../../lib/utils'

type Variant = 'teal' | 'indigo' | 'blue' | 'amber' | 'green' | 'emerald' | 'red' | 'violet' | 'purple' | 'sky' | 'slate'

const variants: Record<Variant, string> = {
  teal:   'bg-teal-900/60 text-teal-300 border-teal-500/40',
  indigo: 'bg-indigo-900/60 text-indigo-300 border-indigo-500/40',
  blue:   'bg-sky-900/60 text-sky-300 border-sky-500/40',
  amber:  'bg-amber-900/60 text-amber-300 border-amber-500/40',
  green:  'bg-emerald-900/60 text-emerald-300 border-emerald-500/40',
  emerald:'bg-emerald-900/60 text-emerald-300 border-emerald-500/40',
  red:    'bg-red-900/60 text-red-300 border-red-500/40',
  violet: 'bg-violet-900/60 text-violet-300 border-violet-500/40',
  purple: 'bg-violet-900/60 text-violet-300 border-violet-500/40',
  sky:    'bg-sky-900/60 text-sky-300 border-sky-500/40',
  slate:  'bg-slate-800/60 text-slate-300 border-slate-600/40',
}

interface Props {
  children: React.ReactNode
  variant?: Variant
  className?: string
}

export function Badge({ children, variant = 'slate', className }: Props) {
  return (
    <span className={cn('inline-flex items-center px-1.5 py-0.5 rounded-md text-xs border font-medium', variants[variant], className)}>
      {children}
    </span>
  )
}
