import { cn } from '../../lib/utils'
import { ProgressBar } from '../ui/ProgressBar'
import type { Chapter } from '../../types'

interface Props {
  chapters: Chapter[]
  activeChapterId: string
  onSelectChapter: (id: string) => void
  getChapterProgress: (chapterId: string) => number
  className?: string
}

const discAccents: Record<number, { label: string; color: string; dot: string; active: string; prog: 'teal' | 'indigo' | 'violet' | 'amber' }> = {
  0: { label: 'Reference', color: 'text-sky-400',    dot: 'bg-sky-400',    active: 'bg-sky-900/40 border-sky-600/40 text-sky-100',        prog: 'teal'   },
  1: { label: 'Disc 1',    color: 'text-teal-400',   dot: 'bg-teal-400',   active: 'bg-teal-900/40 border-teal-600/40 text-teal-100',     prog: 'teal'   },
  2: { label: 'Disc 2',    color: 'text-indigo-400', dot: 'bg-indigo-400', active: 'bg-indigo-900/40 border-indigo-600/40 text-indigo-100', prog: 'indigo' },
  3: { label: 'Disc 3',    color: 'text-violet-400', dot: 'bg-violet-400', active: 'bg-violet-900/40 border-violet-600/40 text-violet-100', prog: 'violet' },
  4: { label: 'Disc 4',    color: 'text-amber-400',  dot: 'bg-amber-400',  active: 'bg-amber-900/30 border-amber-600/40 text-amber-100',   prog: 'amber'  },
}

export function Sidebar({ chapters, activeChapterId, onSelectChapter, getChapterProgress, className }: Props) {
  const byDisc = chapters.reduce<Record<number, Chapter[]>>((acc, ch) => {
    acc[ch.disc] = acc[ch.disc] ?? []
    acc[ch.disc].push(ch)
    return acc
  }, {})

  const discs = [...new Set(chapters.map(c => c.disc))].sort()

  return (
    <nav className={cn('flex flex-col gap-0.5 overflow-y-auto py-2', className)}>
      <div className="px-3 pb-1.5">
        <p className="text-[10px] font-semibold uppercase tracking-widest text-slate-600">Chapters</p>
      </div>

      {discs.map((disc, discIdx) => {
        const accent = discAccents[disc] ?? discAccents[1]
        return (
          <div key={disc} className="mb-1">
            {discIdx > 0 && (
              <div className="mx-3 mb-1.5 h-px bg-slate-700/50" />
            )}
            <div className={cn('px-3 py-1 flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-widest', accent.color)}>
              <span className={cn('w-1.5 h-1.5 rounded-full shrink-0', accent.dot)} />
              {accent.label}
            </div>
            {(byDisc[disc] ?? []).map(ch => {
              const progress = getChapterProgress(ch.id)
              const isActive = ch.id === activeChapterId

              return (
                <button
                  key={ch.id}
                  onClick={() => onSelectChapter(ch.id)}
                  className={cn(
                    'w-full text-left px-3 py-1.5 rounded-lg text-xs transition-all duration-150 mx-1 my-0.5',
                    isActive
                      ? cn('border', accent.active)
                      : 'text-slate-400 hover:bg-slate-800/60 hover:text-slate-200'
                  )}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="truncate">{ch.title}</span>
                    {progress > 0 && (
                      <span className={cn('shrink-0 text-[10px]', progress === 100 ? 'text-emerald-400' : 'text-slate-600')}>
                        {progress === 100 ? '✓' : `${progress}%`}
                      </span>
                    )}
                  </div>
                  {progress > 0 && progress < 100 && (
                    <ProgressBar value={progress} className="mt-1" color={accent.prog} />
                  )}
                </button>
              )
            })}
          </div>
        )
      })}
    </nav>
  )
}
