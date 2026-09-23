import type { ReactNode } from 'react'
import { ChevronRight } from 'lucide-react'
import { cn } from '../../lib/utils'

interface Props {
  items: ReactNode[]
  label?: string
  className?: string
}

/** A compact, wrapping path used for ability orders and item refinement routes. */
export function SequenceSteps({ items, label, className }: Props) {
  if (items.length < 2) return null

  return (
    <span className={cn('inline-flex min-w-0 max-w-full flex-wrap items-center gap-x-1 gap-y-1.5 align-middle', className)}>
      {label && (
        <span className="mr-1 text-[10px] font-semibold uppercase tracking-wide text-violet-300">
          {label}
        </span>
      )}
      {items.map((item, index) => (
        <span key={index} className="contents">
          <span className={cn(
            'inline-flex min-w-0 max-w-full items-baseline gap-1.5 rounded-md border px-2 py-1 text-[11px] leading-tight',
            index === items.length - 1
              ? 'border-teal-700/45 bg-teal-950/25 text-teal-100'
              : 'border-slate-700/55 bg-slate-900/55 text-slate-200',
          )}>
            <span className="shrink-0 font-mono text-[9px] text-slate-500">{String(index + 1).padStart(2, '0')}</span>
            <span className="min-w-0 break-words [overflow-wrap:anywhere]">{item}</span>
          </span>
          {index < items.length - 1 && <ChevronRight size={12} className="shrink-0 text-slate-600" aria-hidden="true" />}
        </span>
      ))}
    </span>
  )
}
