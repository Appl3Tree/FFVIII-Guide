import { useMemo, useState } from 'react'
import { ChevronDown, Cloud, GitMerge, HardDrive, Loader2 } from 'lucide-react'
import { cn } from '../../lib/utils'
import type { ProgressLabel } from '../../lib/progressLabels'
import type { SyncConflict, SyncConflictChoice } from '../../hooks/useTracker'

interface Props {
  conflict: SyncConflict
  formatLabel: (key: string) => ProgressLabel
  onResolve: (choice: SyncConflictChoice) => Promise<void>
}

const choices: Array<{ id: SyncConflictChoice; label: string; icon: React.ReactNode }> = [
  { id: 'local', label: 'Use Local', icon: <HardDrive size={14} /> },
  { id: 'cloud', label: 'Use Cloud', icon: <Cloud size={14} /> },
  { id: 'merge', label: 'Merge Both', icon: <GitMerge size={14} /> },
]

function DifferenceList({ title, keys, formatLabel }: { title: string; keys: string[]; formatLabel: (key: string) => ProgressLabel }) {
  return (
    <section className="min-w-0">
      <h3 className="mb-2 text-[11px] font-bold uppercase tracking-wide text-slate-500">{title}</h3>
      {keys.length ? (
        <ul className="max-h-44 space-y-1 overflow-y-auto pr-1">
          {keys.map(key => {
            const label = formatLabel(key)
            return (
              <li key={key} className="rounded-md border border-slate-800/70 bg-slate-900/45 px-2 py-1.5 text-xs leading-relaxed text-slate-300">
                <span className="font-medium text-slate-100">{label.category}:</span> {label.name}
                {label.subName ? <span className="text-slate-500"> - {label.subName}</span> : null}
              </li>
            )
          })}
        </ul>
      ) : (
        <p className="rounded-md border border-slate-800/70 bg-slate-900/30 px-2 py-2 text-xs text-slate-500">No checked items.</p>
      )}
    </section>
  )
}

export function SyncConflictModal({ conflict, formatLabel, onResolve }: Props) {
  const [selected, setSelected] = useState<SyncConflictChoice>('merge')
  const [showDiffs, setShowDiffs] = useState(false)
  const [busy, setBusy] = useState(false)
  const selectedCount = conflict.counts[selected]

  const sortedOnlyLocal = useMemo(() => [...conflict.onlyLocal].sort(), [conflict.onlyLocal])
  const sortedOnlyCloud = useMemo(() => [...conflict.onlyCloud].sort(), [conflict.onlyCloud])

  async function resolve() {
    setBusy(true)
    try {
      await onResolve(selected)
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center px-4 py-6">
      <div className="absolute inset-0 bg-black/75" />
      <div className="relative w-full max-w-2xl rounded-xl border border-slate-700/70 bg-slate-950 p-4 shadow-2xl shadow-black/70">
        <header className="mb-4">
          <h2 className="text-base font-semibold text-slate-100">Choose progress source</h2>
          <p className="mt-1 max-w-[70ch] text-sm leading-relaxed text-slate-400">
            Local and cloud progress both have checked items and do not match. Pick what should be saved to Firebase for this guide.
          </p>
        </header>

        <div className="grid gap-2 sm:grid-cols-3">
          {choices.map(choice => (
            <button
              key={choice.id}
              type="button"
              onClick={() => setSelected(choice.id)}
              className={cn(
                'rounded-lg border px-3 py-3 text-left transition-colors focus-visible:ring-2 focus-visible:ring-teal-500/40',
                selected === choice.id
                  ? 'border-teal-500/70 bg-teal-950/30 text-teal-100'
                  : 'border-slate-800 bg-slate-900/35 text-slate-300 hover:border-slate-700'
              )}
            >
              <span className="flex items-center gap-2 text-sm font-semibold">
                {choice.icon}
                {choice.label}
              </span>
              <span className="mt-1 block text-xs text-slate-500">
                Keeps {conflict.counts[choice.id]} checked item{conflict.counts[choice.id] === 1 ? '' : 's'}
              </span>
            </button>
          ))}
        </div>

        <button
          type="button"
          onClick={() => setShowDiffs(value => !value)}
          className="mt-4 inline-flex items-center gap-1.5 text-xs font-medium text-slate-400 transition-colors hover:text-teal-300"
        >
          <ChevronDown size={13} className={cn('transition-transform', showDiffs && 'rotate-180')} />
          Show differences
        </button>

        {showDiffs && (
          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            <DifferenceList title="Only local" keys={sortedOnlyLocal} formatLabel={formatLabel} />
            <DifferenceList title="Only cloud" keys={sortedOnlyCloud} formatLabel={formatLabel} />
          </div>
        )}

        <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-slate-800/70 pt-4">
          <p className="text-xs text-slate-500">
            Selected choice keeps {selectedCount} checked item{selectedCount === 1 ? '' : 's'}.
          </p>
          <button
            type="button"
            onClick={resolve}
            disabled={busy}
            className="glass-button-teal inline-flex items-center justify-center gap-2 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {busy && <Loader2 size={14} className="animate-spin" />}
            Save choice
          </button>
        </div>
      </div>
    </div>
  )
}
