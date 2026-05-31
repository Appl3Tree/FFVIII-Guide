import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, Eye, EyeOff, Trophy, AlertTriangle } from 'lucide-react'
import { cn } from '../../lib/utils'
import { Checkbox } from '../ui/Checkbox'
import { ProgressBar } from '../ui/ProgressBar'
import { Badge } from '../ui/Badge'
import type { MasterData, Checkpoint, Chapter } from '../../types'

interface Props {
  data: MasterData
  completedItems: Record<string, boolean>
  onToggleItem: (id: string) => void
  onNavigateToChapter: (id: string) => void
}

const DISC_STYLES = {
  1: { color: 'text-teal-400',   dot: 'bg-teal-400',   prog: 'teal' as const,    border: 'border-teal-700/40',   topBorder: 'border-t-2 border-teal-500/60' },
  2: { color: 'text-indigo-400', dot: 'bg-indigo-400', prog: 'indigo' as const,  border: 'border-indigo-700/40', topBorder: 'border-t-2 border-indigo-500/60' },
  3: { color: 'text-violet-400', dot: 'bg-violet-400', prog: 'violet' as const,  border: 'border-violet-700/40', topBorder: 'border-t-2 border-violet-500/60' },
  4: { color: 'text-amber-400',  dot: 'bg-amber-400',  prog: 'amber' as const,   border: 'border-amber-700/40',  topBorder: 'border-t-2 border-amber-500/60' },
}

interface CheckpointWithChapter extends Checkpoint {
  chapterId: string
  chapterTitle: string
}

function flattenCheckpoints(chapters: Chapter[]): CheckpointWithChapter[] {
  return chapters.flatMap(ch =>
    ch.checkpoints.map(cp => ({
      ...cp,
      chapterId: ch.id,
      chapterTitle: ch.title,
    }))
  )
}

function DiscSection({
  disc,
  checkpoints,
  completedItems,
  hideCompleted,
  onToggle,
  onNavigate,
}: {
  disc: number
  checkpoints: CheckpointWithChapter[]
  completedItems: Record<string, boolean>
  hideCompleted: boolean
  onToggle: (id: string) => void
  onNavigate: (id: string) => void
}) {
  const [open, setOpen] = useState(disc <= 2)
  const style = DISC_STYLES[disc as keyof typeof DISC_STYLES] ?? DISC_STYLES[1]

  const misses = checkpoints.filter(cp => cp.type === 'missable')
  const visible = checkpoints.filter(cp => !hideCompleted || !completedItems[cp.id])
  const done = checkpoints.filter(cp => completedItems[cp.id]).length
  const total = checkpoints.length

  return (
    <div className={cn('glass-panel overflow-hidden', style.topBorder)}>
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between px-4 py-3 hover:bg-white/5 transition-colors"
      >
        <div className="flex items-center gap-3">
          <span className={cn('w-2 h-2 rounded-full shrink-0', style.dot)} />
          <span className={cn('text-sm font-bold', style.color)}>Disc {disc}</span>
          <span className="text-xs text-slate-500">{done}/{total}</span>
          {misses.length > 0 && (
            <span className="text-xs text-amber-500">{misses.length} missable{misses.length !== 1 ? 's' : ''}</span>
          )}
        </div>
        <div className="flex items-center gap-3">
          <div className="w-24">
            <ProgressBar value={total ? Math.round((done / total) * 100) : 0} color={style.prog} />
          </div>
          <ChevronDown size={13} className={cn('text-slate-500 transition-transform duration-200', open && 'rotate-180')} />
        </div>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className={cn('border-t divide-y divide-slate-800/40', style.border)}>
              {visible.length === 0 && (
                <p className="px-4 py-4 text-xs text-slate-600 text-center">All done!</p>
              )}
              {visible.map(cp => (
                <CheckpointRow
                  key={cp.id}
                  cp={cp}
                  done={!!completedItems[cp.id]}
                  onToggle={onToggle}
                  onNavigate={onNavigate}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function CheckpointRow({ cp, done, onToggle, onNavigate }: {
  cp: CheckpointWithChapter
  done: boolean
  onToggle: (id: string) => void
  onNavigate: (id: string) => void
}) {
  const isAch = cp.type === 'achievement'
  return (
    <div className={cn(
      'px-4 py-3 flex items-start gap-3 border-l-2 transition-colors',
      done
        ? 'opacity-40 border-transparent'
        : isAch
          ? 'border-yellow-600/0 hover:border-yellow-600/60'
          : 'border-amber-600/0 hover:border-amber-600/60'
    )}>
      <Checkbox checked={done} onChange={() => onToggle(cp.id)} className="mt-0.5 shrink-0" />
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1.5 flex-wrap mb-0.5">
          {isAch
            ? <Trophy size={11} className="text-yellow-500 shrink-0" />
            : <AlertTriangle size={11} className="text-amber-500 shrink-0" />
          }
          <span className={cn(
            'text-sm font-medium leading-tight',
            done ? 'line-through text-slate-600' : isAch ? 'text-yellow-200' : 'text-amber-200'
          )}>
            {cp.label}
          </span>
          {cp.achievementType && (
            <Badge variant={cp.achievementType === 'gf' ? 'violet' : cp.achievementType === 'cumulative' ? 'teal' : 'emerald'}>
              {cp.achievementType}
            </Badge>
          )}
        </div>
        <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">{cp.description}</p>
        <button
          onClick={() => onNavigate(cp.chapterId)}
          className="text-xs text-teal-600 hover:text-teal-400 mt-0.5 transition-colors"
        >
          → {cp.chapterTitle}
        </button>
      </div>
    </div>
  )
}

export function ChecklistView({ data, completedItems, onToggleItem, onNavigateToChapter }: Props) {
  const [hideCompleted, setHideCompleted] = useState(false)

  const allCps = flattenCheckpoints(data.chapters)
  const allAchs = allCps.filter(cp => cp.type === 'achievement')
  const allMisses = allCps.filter(cp => cp.type === 'missable')
  const achDone = allAchs.filter(cp => completedItems[cp.id]).length
  const missDone = allMisses.filter(cp => completedItems[cp.id]).length

  const discs = [...new Set(data.chapters.map(c => c.disc))].filter(d => d > 0).sort()

  const getCpsForDisc = (disc: number) => {
    const chIds = new Set(data.chapters.filter(c => c.disc === disc).map(c => c.id))
    return allCps.filter(cp => chIds.has(cp.chapterId))
  }

  return (
    <div className="space-y-3 pb-6 w-full">
      {/* Dashboard */}
      <div className="glass-panel p-4 space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-semibold text-slate-100">Completion</h2>
          <button
            onClick={() => setHideCompleted(h => !h)}
            className={cn(
              'flex items-center gap-1.5 text-xs px-2.5 py-1.5 rounded-lg border transition-colors',
              hideCompleted
                ? 'bg-teal-900/40 border-teal-600/40 text-teal-300'
                : 'border-slate-700/40 text-slate-500 hover:text-slate-300'
            )}
          >
            {hideCompleted ? <EyeOff size={11} /> : <Eye size={11} />}
            {hideCompleted ? 'Showing incomplete' : 'Hide completed'}
          </button>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="glass-panel-sm p-3 text-center">
            <div className="text-xl font-bold text-yellow-300 font-mono">
              {achDone}<span className="text-slate-600 text-base">/{allAchs.length}</span>
            </div>
            <div className="text-xs text-slate-500 mt-0.5">Achievements</div>
            <ProgressBar
              value={allAchs.length ? Math.round((achDone / allAchs.length) * 100) : 0}
              color="teal"
              className="mt-2"
            />
          </div>
          <div className="glass-panel-sm p-3 text-center">
            <div className="text-xl font-bold text-amber-300 font-mono">
              {missDone}<span className="text-slate-600 text-base">/{allMisses.length}</span>
            </div>
            <div className="text-xs text-slate-500 mt-0.5">Missables Handled</div>
            <ProgressBar
              value={allMisses.length ? Math.round((missDone / allMisses.length) * 100) : 0}
              color="amber"
              className="mt-2"
            />
          </div>
        </div>
      </div>

      {/* Per-disc accordion */}
      {discs.map(disc => (
        <DiscSection
          key={disc}
          disc={disc}
          checkpoints={getCpsForDisc(disc)}
          completedItems={completedItems}
          hideCompleted={hideCompleted}
          onToggle={onToggleItem}
          onNavigate={onNavigateToChapter}
        />
      ))}
    </div>
  )
}
