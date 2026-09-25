import { Check, Circle, Sparkles } from 'lucide-react'
import { useMemo, useState } from 'react'
import { BLUE_MAGIC, type BlueMagicAbility } from '../../data/blueMagic'
import { isBlueMagicLearned } from '../../lib/playerState'
import { cn } from '../../lib/utils'
import type { Item, TrackerState } from '../../types'

interface BlueMagicStateProps {
  items: Item[]
  state: Pick<TrackerState, 'learnedBlueMagic'>
  onToggle: (abilityId: string, next?: boolean) => void
}

function itemNameFor(ability: BlueMagicAbility, items: Item[]) {
  return ability.learningItemId
    ? items.find(item => item.id === ability.learningItemId)?.name ?? 'Learning item'
    : null
}

export function BlueMagicLearnedToggle({
  ability,
  itemName,
  learned,
  onToggle,
  compact = false,
  sourceLabel,
}: {
  ability: BlueMagicAbility
  itemName: string | null
  learned: boolean
  onToggle: () => void
  compact?: boolean
  sourceLabel?: string
}) {
  return (
    <div className={cn(
      'flex min-w-0 items-center justify-between gap-2 rounded-md border border-teal-700/25 bg-teal-950/15',
      compact ? 'px-2 py-1.5' : 'px-2.5 py-2',
      learned && 'border-emerald-700/20 bg-emerald-950/10 opacity-70',
    )}>
      <div className="min-w-0">
        <div className="flex min-w-0 items-center gap-1.5">
          <Sparkles size={11} aria-hidden="true" className="shrink-0 text-teal-300" />
          <span className="shrink-0 text-[9px] font-semibold uppercase tracking-wider text-teal-300/80">Blue Magic{sourceLabel ? ` · ${sourceLabel}` : ''}</span>
          <span className={cn('min-w-0 truncate font-medium', compact ? 'text-[11px]' : 'text-xs', learned ? 'text-slate-400' : 'text-slate-100')}>
            {ability.name}
          </span>
        </div>
        <p className="ml-[1.2rem] mt-0.5 text-[10px] leading-snug text-slate-500">
          {itemName ? <>Learned with: <span className="text-slate-300">{itemName}</span></> : 'Known by default'}
        </p>
      </div>
      <button
        type="button"
        role="checkbox"
        aria-checked={learned}
        aria-label={`${ability.name} ${learned ? 'learned' : 'not learned'}`}
        title={learned ? 'Mark as not learned' : 'Mark as learned'}
        disabled={ability.knownByDefault}
        onClick={onToggle}
        className={cn(
          'inline-flex min-h-8 shrink-0 items-center gap-1.5 rounded border px-2 text-[10px] font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-300 disabled:cursor-default',
          learned
            ? 'border-emerald-600/45 bg-emerald-950/35 text-emerald-200'
            : 'border-slate-700 bg-slate-950/50 text-slate-400 hover:border-teal-600/50 hover:text-teal-100',
        )}
      >
        {learned ? <Check size={11} strokeWidth={3} /> : <Circle size={11} />}
        {learned ? 'Learned' : 'Mark learned'}
      </button>
    </div>
  )
}

/** Compact learned-state control for a Blue Magic result embedded in a route. */
export function BlueMagicRouteStep({
  ability,
  learned,
  onToggle,
}: {
  ability: BlueMagicAbility
  learned: boolean
  onToggle: () => void
}) {
  return (
    <span className="inline-flex min-w-0 flex-wrap items-center gap-x-1.5 gap-y-1">
      <Sparkles size={11} aria-hidden="true" className="shrink-0 text-teal-300" />
      <span className="text-[9px] font-semibold uppercase tracking-wider text-teal-300/80">Blue Magic</span>
      <span className="font-semibold text-teal-50">{ability.name}</span>
      <button
        type="button"
        role="checkbox"
        aria-checked={learned}
        aria-label={`${ability.name} ${learned ? 'learned' : 'not learned'}`}
        title={learned ? 'Mark as not learned' : 'Mark as learned'}
        onClick={onToggle}
        className={cn(
          'inline-flex min-h-7 items-center gap-1 rounded border px-1.5 text-[10px] font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-300',
          learned
            ? 'border-emerald-600/45 bg-emerald-950/35 text-emerald-200'
            : 'border-slate-700 bg-slate-950/50 text-slate-400 hover:border-teal-600/50 hover:text-teal-100',
        )}
      >
        {learned ? <Check size={10} strokeWidth={3} /> : <Circle size={10} />}
        {learned ? 'Learned' : 'Mark learned'}
      </button>
    </span>
  )
}

export function BlueMagicConnections({
  text,
  items,
  state,
  onToggle,
  compact = true,
  sourceLabel,
}: BlueMagicStateProps & { text: string; compact?: boolean; sourceLabel?: string }) {
  const normalized = text.toLowerCase().replace(/\s+/g, ' ')
  const references = BLUE_MAGIC.filter(ability => {
    const itemName = itemNameFor(ability, items)
    if (!itemName) return false
    const escaped = itemName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
    return new RegExp(`(?:^|[^a-z0-9])${escaped}(?:s)?(?:$|[^a-z0-9])`, 'i').test(normalized)
  })
  if (!references.length) return null

  return (
    <div className={cn('mt-2 grid gap-1.5', (references.length > 2 || !compact) && 'sm:grid-cols-2')}>
      {references.map(ability => (
        <BlueMagicLearnedToggle
          key={ability.id}
          ability={ability}
          itemName={itemNameFor(ability, items)}
          learned={isBlueMagicLearned(state, ability.id)}
          onToggle={() => onToggle(ability.id)}
          compact={compact}
          sourceLabel={sourceLabel}
        />
      ))}
    </div>
  )
}

export function BlueMagicTracker({
  items,
  state,
  onToggle,
  availableAbilityIds,
  variant = 'full',
}: BlueMagicStateProps & {
  availableAbilityIds: ReadonlySet<string>
  variant?: 'compact' | 'full'
}) {
  const [showAll, setShowAll] = useState(variant === 'full')
  const learnedCount = BLUE_MAGIC.filter(ability => isBlueMagicLearned(state, ability.id)).length
  const actionable = BLUE_MAGIC.filter(ability =>
    availableAbilityIds.has(ability.id) && !isBlueMagicLearned(state, ability.id),
  )
  const rows = useMemo(() => {
    if (!showAll) return actionable
    const priority = (ability: BlueMagicAbility) => {
      if (isBlueMagicLearned(state, ability.id)) return 2
      return availableAbilityIds.has(ability.id) ? 0 : 1
    }
    return [...BLUE_MAGIC].sort((left, right) => priority(left) - priority(right))
  }, [actionable, availableAbilityIds, showAll, state])

  return (
    <section className={cn(
      'overflow-hidden rounded-lg border border-teal-700/30 bg-slate-950/25',
      variant === 'full' && 'glass-panel border-t-2 border-t-teal-500/70',
    )}>
      <div className={cn('flex items-start justify-between gap-3 border-b border-slate-800/70', variant === 'full' ? 'px-4 py-3' : 'px-3 py-2.5')}>
        <div className="min-w-0">
          <div className="flex items-center gap-1.5 text-teal-300">
            <Sparkles size={13} />
            <h2 className="text-xs font-semibold uppercase tracking-widest">Quistis · Blue Magic</h2>
          </div>
          <p className="mt-1 text-[10px] text-slate-500">
            {learnedCount}/{BLUE_MAGIC.length} learned · {actionable.length} available to learn now
          </p>
        </div>
        {variant === 'compact' && (
          <button
            type="button"
            aria-expanded={showAll}
            onClick={() => setShowAll(value => !value)}
            className="shrink-0 rounded px-1.5 py-1 text-[10px] font-medium text-teal-300 hover:bg-teal-950/50 hover:text-teal-100"
          >
            {showAll ? 'To do' : `All ${BLUE_MAGIC.length}`}
          </button>
        )}
      </div>
      {rows.length ? (
        <div className={cn('grid gap-1.5 p-2.5', variant === 'full' && 'sm:grid-cols-2 sm:p-3')}>
          {rows.map(ability => (
            <BlueMagicLearnedToggle
              key={ability.id}
              ability={ability}
              itemName={itemNameFor(ability, items)}
              learned={isBlueMagicLearned(state, ability.id)}
              onToggle={() => onToggle(ability.id)}
              compact={variant === 'compact'}
            />
          ))}
        </div>
      ) : (
        <p className="px-3 py-4 text-center text-[11px] text-slate-500">
          {showAll ? 'No Blue Magic abilities are listed.' : 'No currently available abilities remain to learn.'}
        </p>
      )}
      {showAll && variant === 'compact' && (
        <div className="border-t border-slate-800/70 px-3 py-2 text-[10px] text-slate-600">
          Item availability does not mark an ability learned. Use the toggle after teaching it to Quistis.
        </div>
      )}
    </section>
  )
}
