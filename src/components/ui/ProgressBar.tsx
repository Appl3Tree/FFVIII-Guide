import { cn } from '../../lib/utils'

interface Props {
  value: number  // 0-100
  className?: string
  label?: string
  color?: 'teal' | 'indigo' | 'amber' | 'emerald' | 'violet'
}

const gradients = {
  teal:    'from-teal-600 to-teal-400',
  indigo:  'from-indigo-600 to-indigo-400',
  amber:   'from-amber-600 to-amber-400',
  emerald: 'from-emerald-600 to-emerald-400',
  violet:  'from-violet-600 to-violet-400',
}

export function ProgressBar({ value, className, label, color = 'teal' }: Props) {
  return (
    <div className={cn('space-y-1', className)}>
      {label && (
        <div className="flex justify-between text-xs text-slate-400">
          <span>{label}</span>
          <span>{value}%</span>
        </div>
      )}
      <div className="h-1 rounded-full bg-slate-800/60 overflow-hidden">
        <div
          className={cn('h-full rounded-full bg-gradient-to-r transition-all duration-300', gradients[color])}
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  )
}
