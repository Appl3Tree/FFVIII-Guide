import { useMemo, useState } from 'react'
import { AlertTriangle, CheckCircle2, ChevronDown, Compass, Filter, Gift, MapPin, Search } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '../../lib/utils'
import { Checkbox } from '../ui/Checkbox'
import { Badge } from '../ui/Badge'
import type { Sidequest } from '../../types'

interface Props {
  sidequests: Sidequest[]
  completedItems: Record<string, boolean>
  onToggleItem: (id: string) => void
  onNavigateToChapter?: (id: string) => void
}

const categoryStyles: Record<Sidequest['category'], { badge: 'teal' | 'indigo' | 'violet' | 'amber' | 'emerald'; text: string; border: string }> = {
  Cards: { badge: 'violet', text: 'text-fuchsia-300', border: 'border-fuchsia-600/40' },
  GFs: { badge: 'emerald', text: 'text-emerald-300', border: 'border-emerald-600/40' },
  World: { badge: 'teal', text: 'text-teal-300', border: 'border-teal-600/40' },
  Character: { badge: 'indigo', text: 'text-indigo-300', border: 'border-indigo-600/40' },
  Completion: { badge: 'amber', text: 'text-amber-300', border: 'border-amber-600/40' },
  Bosses: { badge: 'amber', text: 'text-red-300', border: 'border-red-600/40' },
}

function trackerId(sidequest: Sidequest) {
  return `sidequest-${sidequest.id}`
}

function renderInlineText(text: string) {
  const parts = text.split(/(\*\*[^*]+\*\*)/)
  return (
    <>
      {parts.map((part, i) =>
        part.startsWith('**') && part.endsWith('**')
          ? <strong key={i} className="font-semibold text-slate-100">{part.slice(2, -2)}</strong>
          : <span key={i}>{part}</span>
      )}
    </>
  )
}

function RouteList({ steps }: { steps: string[] }) {
  return (
    <ol className="space-y-2">
      {steps.map((step, index) => (
        <li key={index} className="grid grid-cols-[1.5rem_1fr] gap-2 text-sm leading-relaxed text-slate-300">
          <span className="mt-0.5 flex h-5 w-5 items-center justify-center rounded-full border border-slate-700/70 bg-slate-900/70 text-[10px] font-semibold text-slate-500">
            {index + 1}
          </span>
          <span className="min-w-0 break-words [overflow-wrap:anywhere]">{renderInlineText(step)}</span>
        </li>
      ))}
    </ol>
  )
}

function InfoList({ title, icon, items }: { title: string; icon: React.ReactNode; items: string[] }) {
  if (!items.length) return null
  return (
    <section className="space-y-2">
      <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-slate-500">
        {icon}
        {title}
      </div>
      <div className="flex flex-wrap gap-1.5">
        {items.map((item, index) => (
          <span key={index} className="rounded-md border border-slate-700/45 bg-slate-900/60 px-2 py-1 text-xs leading-snug text-slate-300">
            {renderInlineText(item)}
          </span>
        ))}
      </div>
    </section>
  )
}

function SidequestDetail({
  sidequest,
  completed,
  onToggle,
  onNavigateToChapter,
}: {
  sidequest: Sidequest
  completed: boolean
  onToggle: () => void
  onNavigateToChapter?: (id: string) => void
}) {
  const style = categoryStyles[sidequest.category]
  const firstPlacement = sidequest.placements[0]

  return (
    <article className={cn('rounded-xl border bg-slate-950/35', style.border)}>
      <header className="border-b border-slate-800/70 px-4 py-4">
        <div className="flex items-start gap-3">
          <Checkbox checked={completed} onChange={onToggle} className="mt-1 shrink-0" />
          <div className="min-w-0 flex-1">
            <div className="mb-1.5 flex flex-wrap items-center gap-2">
              <Badge variant={style.badge}>{sidequest.category}</Badge>
              <span className="text-xs text-slate-500">Disc {sidequest.disc}</span>
              {completed && <span className="text-xs text-emerald-400">Complete</span>}
            </div>
            <h2 className="text-lg font-bold leading-tight text-slate-100">{sidequest.title}</h2>
            <p className="mt-2 max-w-[78ch] text-sm leading-relaxed text-slate-400">{sidequest.summary}</p>
          </div>
        </div>
      </header>

      <div className="space-y-5 px-4 py-4">
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="rounded-lg border border-slate-800/70 bg-slate-900/40 px-3 py-2">
            <div className="text-[10px] font-bold uppercase tracking-wide text-slate-500">Available</div>
            <p className="mt-1 text-sm text-slate-300">{sidequest.available}</p>
          </div>
          <div className="rounded-lg border border-amber-900/50 bg-amber-950/15 px-3 py-2">
            <div className="text-[10px] font-bold uppercase tracking-wide text-amber-500">Deadline</div>
            <p className="mt-1 text-sm text-amber-100/80">{sidequest.deadline}</p>
          </div>
        </div>

        <InfoList title="Rewards" icon={<Gift size={12} />} items={sidequest.rewards} />
        <InfoList title="Requirements" icon={<AlertTriangle size={12} />} items={sidequest.requirements ?? []} />

        <section className="space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-slate-500">
            <MapPin size={12} />
            Route
          </div>
          <RouteList steps={sidequest.route} />
        </section>

        {sidequest.notes?.length ? (
          <section className="rounded-lg border border-slate-800/70 bg-slate-900/35 px-3 py-3">
            <div className="mb-2 text-xs font-bold uppercase tracking-wide text-slate-500">Notes</div>
            <ul className="space-y-1.5">
              {sidequest.notes.map((note, index) => (
                <li key={index} className="text-sm leading-relaxed text-slate-400">- {renderInlineText(note)}</li>
              ))}
            </ul>
          </section>
        ) : null}

        <div className="flex flex-wrap items-center gap-2 border-t border-slate-800/70 pt-3">
          {sidequest.related?.map(item => (
            <span key={item} className="text-xs text-slate-500">{item}</span>
          ))}
          {firstPlacement && onNavigateToChapter && (
            <button
              onClick={() => onNavigateToChapter(firstPlacement.chapterId)}
              className="ml-auto inline-flex items-center gap-1.5 rounded-md border border-slate-700/50 px-2.5 py-1.5 text-xs text-slate-400 transition-colors hover:border-teal-600/60 hover:text-teal-300"
            >
              <MapPin size={11} />
              Walkthrough timing
            </button>
          )}
        </div>
      </div>
    </article>
  )
}

export function InlineSidequestBlock({
  sidequest,
  placement,
  completed,
  onToggle,
}: {
  sidequest: Sidequest
  placement?: Sidequest['placements'][number]
  completed: boolean
  onToggle: () => void
}) {
  const [open, setOpen] = useState(false)
  const style = categoryStyles[sidequest.category]
  const title = placement?.label ?? sidequest.title
  const summary = placement?.summary ?? sidequest.summary
  const available = placement?.available ?? sidequest.available
  const deadline = placement?.deadline ?? sidequest.deadline
  const rewards = (placement?.rewards ?? sidequest.rewards).slice(0, 4)
  const requirements = placement?.requirements ?? sidequest.requirements ?? []
  const route = placement?.route ?? sidequest.route
  const notes = placement?.notes ?? sidequest.notes ?? []
  const isPartial = !!placement?.route

  return (
    <section className={cn('rounded-lg border bg-indigo-950/12', style.border, completed && 'opacity-60')}>
      <div className="flex items-start gap-3 px-3 py-3">
        <Checkbox checked={completed} onChange={onToggle} className="mt-1 shrink-0" />
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <Compass size={13} className={cn(style.text, 'shrink-0')} />
            <span className="text-xs font-bold uppercase tracking-wide text-indigo-300">Optional Sidequest</span>
            <span className="text-xs text-slate-600">/</span>
            <span className="text-sm font-semibold text-slate-100">{title}</span>
            <Badge variant={style.badge}>{sidequest.category}</Badge>
          </div>
          <p className="mt-1.5 max-w-[78ch] text-sm leading-relaxed text-slate-400">{summary}</p>
          <div className="mt-2 grid gap-2 sm:grid-cols-2">
            <p className="text-xs leading-relaxed text-slate-500"><span className="font-semibold text-slate-400">Available:</span> {available}</p>
            <p className="text-xs leading-relaxed text-amber-300/80"><span className="font-semibold text-amber-300">Deadline:</span> {deadline}</p>
          </div>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {rewards.map(reward => (
              <span key={reward} className="rounded border border-slate-700/40 bg-slate-900/55 px-1.5 py-0.5 text-[10px] text-slate-400">
                {reward}
              </span>
            ))}
          </div>
          <button
            onClick={() => setOpen(value => !value)}
            className="mt-2 inline-flex items-center gap-1.5 text-xs font-medium text-indigo-400 transition-colors hover:text-indigo-200"
          >
            <ChevronDown size={12} className={cn('transition-transform duration-200', open && 'rotate-180')} />
            {open ? 'Hide sidequest steps' : isPartial ? 'Show steps for this point' : 'Show full sidequest route'}
          </button>

          <AnimatePresence initial={false}>
            {open && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.18, ease: 'easeInOut' }}
                className="overflow-hidden"
              >
                <div className="mt-3 space-y-3 border-t border-slate-800/70 pt-3">
                  {requirements.length ? (
                    <InfoList title="Requirements" icon={<AlertTriangle size={12} />} items={requirements} />
                  ) : null}
                  <RouteList steps={route} />
                  {notes.length ? (
                    <ul className="space-y-1.5">
                      {notes.map((note, index) => (
                        <li key={index} className="text-xs leading-relaxed text-slate-500">- {renderInlineText(note)}</li>
                      ))}
                    </ul>
                  ) : null}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}

export function SidequestView({ sidequests, completedItems, onToggleItem, onNavigateToChapter }: Props) {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState<'All' | Sidequest['category']>('All')
  const [disc, setDisc] = useState<'All' | number>('All')
  const [selectedId, setSelectedId] = useState(sidequests[0]?.id ?? '')

  const categories = useMemo(() => ['All', ...Array.from(new Set(sidequests.map(s => s.category)))] as Array<'All' | Sidequest['category']>, [sidequests])
  const discs = useMemo(() => ['All', ...Array.from(new Set(sidequests.map(s => s.disc))).sort((a, b) => a - b)] as Array<'All' | number>, [sidequests])
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return sidequests.filter(sidequest => {
      if (category !== 'All' && sidequest.category !== category) return false
      if (disc !== 'All' && sidequest.disc !== disc) return false
      if (!q) return true
      const haystack = [
        sidequest.title,
        sidequest.summary,
        sidequest.available,
        sidequest.deadline,
        sidequest.rewards.join(' '),
        sidequest.route.join(' '),
      ].join(' ').toLowerCase()
      return haystack.includes(q)
    })
  }, [sidequests, query, category, disc])

  const selected = filtered.find(s => s.id === selectedId) ?? filtered[0] ?? sidequests[0]

  return (
    <div className="space-y-4 pb-8">
      <header className="rounded-xl border border-slate-700/50 bg-slate-950/35 px-4 py-4">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="mb-1.5 flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-indigo-300">
              <Compass size={13} />
              Sidequests
            </div>
            <h1 className="text-xl font-bold text-slate-100">Optional Routes</h1>
            <p className="mt-1 max-w-[78ch] text-sm leading-relaxed text-slate-400">
              Full sidequest routes live here for later cleanup. The same routes appear collapsed in the walkthrough when they first become available.
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <CheckCircle2 size={13} className="text-emerald-400" />
            {sidequests.filter(s => completedItems[trackerId(s)]).length}/{sidequests.length} complete
          </div>
        </div>
      </header>

      <div className="grid gap-4 xl:grid-cols-[minmax(260px,360px)_1fr]">
        <aside className="space-y-3">
          <div className="rounded-xl border border-slate-800/70 bg-slate-950/25 p-3">
            <div className="relative">
              <Search size={13} className="absolute left-2.5 top-2.5 text-slate-600" />
              <input
                value={query}
                onChange={event => setQuery(event.target.value)}
                placeholder="Search sidequests"
                className="w-full rounded-lg border border-slate-700/50 bg-slate-900/70 py-2 pl-8 pr-3 text-sm text-slate-200 outline-none placeholder:text-slate-600 focus:border-indigo-500/60"
              />
            </div>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {categories.map(item => (
                <button
                  key={item}
                  onClick={() => setCategory(item)}
                  className={cn(
                    'rounded-md border px-2 py-1 text-xs transition-colors',
                    category === item ? 'border-indigo-500/60 bg-indigo-950/35 text-indigo-200' : 'border-slate-700/40 text-slate-500 hover:text-slate-300'
                  )}
                >
                  {item}
                </button>
              ))}
            </div>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {discs.map(item => (
                <button
                  key={item}
                  onClick={() => setDisc(item)}
                  className={cn(
                    'rounded-md border px-2 py-1 text-xs transition-colors',
                    disc === item ? 'border-teal-500/60 bg-teal-950/30 text-teal-200' : 'border-slate-700/40 text-slate-500 hover:text-slate-300'
                  )}
                >
                  {item === 'All' ? 'All discs' : `Disc ${item}`}
                </button>
              ))}
            </div>
          </div>

          <div className="overflow-hidden rounded-xl border border-slate-800/70 bg-slate-950/20">
            <div className="flex items-center gap-2 border-b border-slate-800/70 px-3 py-2 text-xs font-bold uppercase tracking-wide text-slate-500">
              <Filter size={12} />
              {filtered.length} routes
            </div>
            <div className="max-h-[62vh] overflow-y-auto divide-y divide-slate-800/60">
              {filtered.map(sidequest => {
                const style = categoryStyles[sidequest.category]
                const selectedNow = selected?.id === sidequest.id
                const done = completedItems[trackerId(sidequest)]
                return (
                  <button
                    key={sidequest.id}
                    onClick={() => setSelectedId(sidequest.id)}
                    className={cn(
                      'w-full px-3 py-3 text-left transition-colors',
                      selectedNow ? 'bg-indigo-950/25' : 'hover:bg-slate-900/50',
                      done && 'opacity-55'
                    )}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <div className={cn('text-sm font-semibold leading-tight', selectedNow ? 'text-slate-100' : 'text-slate-300')}>
                          {sidequest.title}
                        </div>
                        <div className="mt-1 flex flex-wrap items-center gap-1.5">
                          <span className={cn('text-[10px] font-medium uppercase tracking-wide', style.text)}>{sidequest.category}</span>
                          <span className="text-[10px] text-slate-600">Disc {sidequest.disc}</span>
                        </div>
                      </div>
                      {done && <CheckCircle2 size={13} className="mt-0.5 shrink-0 text-emerald-400" />}
                    </div>
                  </button>
                )
              })}
            </div>
          </div>
        </aside>

        <main>
          {selected ? (
            <SidequestDetail
              sidequest={selected}
              completed={!!completedItems[trackerId(selected)]}
              onToggle={() => onToggleItem(trackerId(selected))}
              onNavigateToChapter={onNavigateToChapter}
            />
          ) : (
            <div className="rounded-xl border border-slate-800/70 bg-slate-950/25 px-4 py-10 text-center text-sm text-slate-500">
              No sidequests match the current filters.
            </div>
          )}
        </main>
      </div>
    </div>
  )
}

export function sidequestTrackerId(sidequest: Sidequest) {
  return trackerId(sidequest)
}
