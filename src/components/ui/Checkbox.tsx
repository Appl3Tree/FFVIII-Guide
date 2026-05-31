import { cn } from '../../lib/utils'

interface Props {
  checked: boolean
  onChange: () => void
  label?: string
  className?: string
}

export function Checkbox({ checked, onChange, label, className }: Props) {
  return (
    <label className={cn('flex items-start gap-2 cursor-pointer group', className)}>
      <div
        onClick={onChange}
        className={cn(
          'mt-0.5 w-4 h-4 shrink-0 rounded border-2 transition-all duration-150 flex items-center justify-center',
          checked
            ? 'bg-blue-500 border-blue-400'
            : 'bg-black/40 border-slate-500/60 group-hover:border-slate-400'
        )}
      >
        {checked && (
          <svg viewBox="0 0 10 8" className="w-2.5 h-2.5 text-white fill-current">
            <path d="M1 4l3 3 5-6" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </div>
      {label && (
        <span className={cn('text-sm leading-tight', checked ? 'line-through text-slate-500' : 'text-slate-200')}>
          {label}
        </span>
      )}
    </label>
  )
}
