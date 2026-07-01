import { Trophy, AlertTriangle, NotebookPen } from 'lucide-react'
import { cn } from '../../lib/utils'
import { Checkbox } from '../ui/Checkbox'
import { ProgressBar } from '../ui/ProgressBar'
import type { Chapter, MasterData } from '../../types'

interface Props {
  chapter: Chapter | null
  data: MasterData
  completedItems: Record<string, boolean>
  onToggleItem: (id: string) => void
  onOpenNotes: () => void
  hasNotes: boolean
}

const DISC_COLORS_PANEL: Record<number, { label: string; text: string; bar: 'teal' | 'indigo' | 'violet' | 'amber' }> = {
  1: { label: 'Disc 1', text: 'text-teal-400',   bar: 'teal' },
  2: { label: 'Disc 2', text: 'text-indigo-400', bar: 'indigo' },
  3: { label: 'Disc 3', text: 'text-violet-400', bar: 'violet' as const },
  4: { label: 'Disc 4', text: 'text-amber-400',  bar: 'amber' },
}

export function ContextPanel({ chapter, data, completedItems, onToggleItem, onOpenNotes, hasNotes }: Props) {
  const allCps = data.chapters.flatMap(ch => ch.checkpoints)
  const allAchs = allCps.filter(cp => cp.type === 'achievement')
  const allMisses = allCps.filter(cp => cp.type === 'missable')
  const achDone = allAchs.filter(cp => completedItems[cp.id]).length
  const missDone = allMisses.filter(cp => completedItems[cp.id]).length
  const gfDone = data.lookup.gfs.filter(g => completedItems[g.id]).length
  const cardDone = data.lookup.cards.filter(c => completedItems[c.id]).length

  const discs = [...new Set(data.chapters.map(c => c.disc))].filter(d => d > 0).sort()
  const discBreakdown = discs.map(disc => {
    const cps = data.chapters.filter(c => c.disc === disc).flatMap(c => c.checkpoints)
    const done = cps.filter(cp => completedItems[cp.id]).length
    return { disc, done, total: cps.length }
  })

  return (
    <aside className="flex h-full min-h-0 flex-col overflow-hidden px-3 py-3">
      <div className="flex shrink-0 items-center justify-between gap-2 px-1">
        <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400">Progress</h2>
        <button
          type="button"
          onClick={onOpenNotes}
          aria-label={hasNotes ? 'Open notes with saved notes' : 'Open notes'}
          className={cn(
            'relative inline-flex items-center gap-1.5 rounded-lg border px-2 py-1.5 text-[11px] font-medium transition-colors',
            hasNotes
              ? 'border-teal-500/40 bg-teal-950/30 text-teal-200 hover:border-teal-400/60 hover:bg-teal-900/40'
              : 'border-slate-800 bg-slate-900/45 text-slate-500 hover:border-slate-700 hover:text-slate-300'
          )}
        >
          <NotebookPen size={13} />
          <span>Notes</span>
          {hasNotes && <span className="absolute -right-1 -top-1 h-2 w-2 rounded-full bg-teal-300" />}
        </button>
      </div>

      <div className="mt-3 min-h-0 flex-1 space-y-3 overflow-y-auto pr-1">
        {chapter && chapter.checkpoints.length > 0 && (
          <div className="glass-panel p-0 overflow-hidden">
            <div className="px-3 py-2 border-b border-slate-700/40">
              <p className="text-[10px] font-semibold uppercase tracking-widest text-slate-600">
                This Chapter
              </p>
              <p className="text-xs text-slate-400 mt-0.5 leading-relaxed break-words [overflow-wrap:anywhere]">{chapter.title}</p>
            </div>
            <div className="divide-y divide-slate-800/40 max-h-[clamp(7rem,34vh,16rem)] overflow-y-auto">
              {chapter.checkpoints.map(cp => {
                const done = !!completedItems[cp.id]
                const isAch = cp.type === 'achievement'
                return (
                  <div key={cp.id} className={cn('px-3 py-2 flex items-start gap-2', done && 'opacity-40')}>
                    <Checkbox checked={done} onChange={() => onToggleItem(cp.id)} className="shrink-0 mt-0.5" />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-1 mb-0.5">
                        {isAch
                          ? <Trophy size={10} className="text-yellow-500 shrink-0" />
                          : <AlertTriangle size={10} className="text-amber-500 shrink-0" />
                        }
                        <span className={cn(
                          'text-xs font-medium leading-tight',
                          done ? 'line-through text-slate-600' : isAch ? 'text-yellow-200' : 'text-amber-200'
                        )}>
                          {cp.label}
                        </span>
                      </div>
                      <p className="text-[10px] text-slate-500 leading-relaxed break-words [overflow-wrap:anywhere]">{cp.description}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        <div className="glass-panel p-3 space-y-2.5">
          <p className="text-[10px] font-semibold uppercase tracking-widest text-slate-600">Overall</p>
          <StatRow label="Achievements" done={achDone} total={allAchs.length} color="teal" />
          <StatRow label="Missables" done={missDone} total={allMisses.length} color="amber" />
          <StatRow label="GFs" done={gfDone} total={data.lookup.gfs.length} color="violet" />
          <StatRow label="Cards" done={cardDone} total={data.lookup.cards.length} color="indigo" />
        </div>

        <div className="glass-panel p-3 space-y-2">
          <p className="text-[10px] font-semibold uppercase tracking-widest text-slate-600">By Disc</p>
          {discBreakdown.map(({ disc, done, total }) => {
            const style = DISC_COLORS_PANEL[disc] ?? DISC_COLORS_PANEL[1]
            return (
              <div key={disc}>
                <div className="flex justify-between text-xs mb-1">
                  <span className={cn('font-semibold', style.text)}>{style.label}</span>
                  <span className="text-slate-500 font-mono">
                    {done}/{total}
                    {total > 0 && <span className="text-slate-600 ml-1">({Math.round((done / total) * 100)}%)</span>}
                  </span>
                </div>
                <ProgressBar value={total ? Math.round((done / total) * 100) : 0} color={style.bar} />
              </div>
            )
          })}
        </div>
      </div>
    </aside>
  )
}

function StatRow({ label, done, total, color }: {
  label: string; done: number; total: number
  color: 'teal' | 'amber' | 'indigo' | 'emerald' | 'violet'
}) {
  const pct = total ? Math.round((done / total) * 100) : 0
  return (
    <div>
      <div className="flex justify-between text-xs mb-1">
        <span className="text-slate-400">{label}</span>
        <span className="text-slate-500 font-mono">
          {done}/{total}
          {total > 0 && <span className="text-slate-600 ml-1">({pct}%)</span>}
        </span>
      </div>
      <ProgressBar value={pct} color={color} />
    </div>
  )
}
