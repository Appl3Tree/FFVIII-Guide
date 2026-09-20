import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, CheckCircle2 } from 'lucide-react'
import { cn } from '../../lib/utils'
import { Checkbox } from '../ui/Checkbox'
import { Badge } from '../ui/Badge'
import { ProgressBar } from '../ui/ProgressBar'
import { isGFAbilityLearned, recommendedGFAbilities } from '../../lib/playerState'
import type { GuardianForce, TrackerState } from '../../types'

interface Props {
  gfs: GuardianForce[]
  completedItems: Record<string, boolean>
  onToggleItem: (id: string) => void
  learnedGFAbilities: TrackerState['learnedGFAbilities']
  onToggleAbility: (gfId: string, abilityName: string) => void
}

const ELEMENT_VARIANTS: Record<string, 'teal' | 'indigo' | 'amber' | 'emerald' | 'red' | 'violet' | 'slate' | 'sky'> = {
  Lightning: 'amber', Ice: 'sky', Fire: 'red', Wind: 'emerald',
  Earth: 'amber', Water: 'teal', Holy: 'slate', Poison: 'violet', '---': 'slate', None: 'slate',
}

// Strip leading numbering like "1. " or "1) " from location strings
function cleanLocation(loc: string): string {
  return loc.replace(/^\d+\.\s*/, '').replace(/^\d+\)\s*/, '').trim()
}

export function GFView({ gfs, completedItems, onToggleItem, learnedGFAbilities, onToggleAbility }: Props) {
  const [expanded, setExpanded] = useState<string | null>(null)
  const obtained = gfs.filter(g => completedItems[g.id]).length

  return (
    <div className="space-y-3 pb-6 w-full">
      <div className="glass-panel p-4">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-base font-semibold text-slate-100">Guardian Forces</h2>
          <span className="text-sm font-bold text-violet-300 font-mono">
            {obtained}<span className="text-slate-600">/{gfs.length}</span>
          </span>
        </div>
        <ProgressBar value={gfs.length ? Math.round((obtained / gfs.length) * 100) : 0} color="violet" />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-2">
        {gfs.map(gf => {
          const obtained = !!completedItems[gf.id]
          const isExpanded = expanded === gf.id
          const elemVariant = ELEMENT_VARIANTS[gf.element] ?? 'slate'
          const learningPreview = recommendedGFAbilities(gf).slice(0, 3)
          const recommended = recommendedGFAbilities(gf)
          const learnedCount = recommended.filter(ability => isGFAbilityLearned({ learnedGFAbilities }, gf.id, ability.name)).length

          return (
            <div key={gf.id} className={cn('glass-panel overflow-hidden', obtained && 'border-emerald-600/30')}>
              <div className="flex items-center gap-3 px-4 py-3">
                <Checkbox checked={obtained} onChange={() => onToggleItem(gf.id)} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    {obtained && <CheckCircle2 size={13} className="text-emerald-400 shrink-0" />}
                    <span className={cn('font-semibold text-sm', obtained ? 'text-slate-500 line-through' : 'text-slate-100')}>
                      {gf.name}
                    </span>
                    {gf.element !== '---' && gf.element !== 'None' && gf.element !== '—' && (
                      <Badge variant={elemVariant}>{gf.element}</Badge>
                    )}
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5 leading-relaxed break-words [overflow-wrap:anywhere]">{cleanLocation(gf.location)}</p>
                  {learningPreview.length > 0 && (
                    <div className="mt-1 flex flex-wrap items-center gap-1">
                      <span className="text-[10px] uppercase tracking-wide text-slate-600">Learn</span>
                      {learningPreview.map((item, idx) => (
                        <span
                          key={`${gf.id}-${item.name}-${idx}`}
                          className="inline-flex items-center rounded border border-violet-700/25 bg-violet-950/20 px-1.5 py-0.5 text-[10px] leading-tight text-violet-200"
                        >
                          {idx + 1}. {item.name}
                        </span>
                      ))}
                      <span className="text-[10px] text-emerald-300/80">{learnedCount}/{recommended.length}</span>
                    </div>
                  )}
                </div>
                <button
                  onClick={() => setExpanded(isExpanded ? null : gf.id)}
                  className="text-slate-500 hover:text-slate-300 transition-colors shrink-0"
                  aria-label={`${isExpanded ? 'Hide' : 'Show'} ${gf.name} details`}
                  title={`${isExpanded ? 'Hide' : 'Show'} ${gf.name} details`}
                >
                  <ChevronDown size={14} className={cn('transition-transform duration-200', isExpanded && 'rotate-180')} />
                </button>
              </div>

              <AnimatePresence initial={false}>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.18, ease: 'easeInOut' }}
                    className="overflow-hidden"
                  >
                    <div className="border-t border-slate-700/40 px-4 py-3 space-y-3">
                      <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-xs">
                        <div><span className="text-slate-600">Attack: </span><span className="text-slate-300 break-words [overflow-wrap:anywhere]">{gf.attack}</span></div>
                        <div><span className="text-slate-600">Element: </span><span className="text-slate-300">{gf.element === '---' || gf.element === 'None' ? 'Non-elemental' : gf.element}</span></div>
                      </div>
                      {gf.learningOrder && gf.learningOrder.length > 0 && (
                        <div className="text-xs">
                          <p className="text-slate-600 mb-1.5">Suggested learning order</p>
                          <div className="flex flex-wrap gap-1">
                            {gf.learningOrder.map((item, idx) => (
                              <span
                                key={`${item}-${idx}`}
                                className="inline-flex items-center rounded-md border border-violet-700/30 bg-violet-950/20 px-2 py-0.5 text-[10px] text-violet-200"
                              >
                                {idx + 1}. {item}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                      {gf.abilities.length > 0 && (
                        <div>
                          <p className="text-xs text-slate-600 mb-1.5">Abilities ({gf.abilities.length})</p>
                          <div className="grid grid-cols-1 gap-1 max-h-52 overflow-y-auto">
                            {recommended.map((ab, idx) => {
                              const learned = isGFAbilityLearned({ learnedGFAbilities }, gf.id, ab.name)
                              return (
                                <button
                                  type="button"
                                  key={idx}
                                  onClick={() => onToggleAbility(gf.id, ab.name)}
                                  className={cn('flex w-full flex-wrap items-start justify-between gap-1.5 rounded-md px-2.5 py-1.5 text-left text-xs transition-colors', learned ? 'bg-emerald-950/20' : 'bg-slate-800/40 hover:bg-slate-800/70')}
                                >
                                  <span className={cn('break-words [overflow-wrap:anywhere]', learned ? 'text-slate-500 line-through' : 'text-slate-300')}>
                                    {learned && <CheckCircle2 size={11} className="mr-1 inline text-emerald-400" />}
                                    {ab.name}
                                  </span>
                                  <span className="flex flex-wrap items-center justify-end gap-x-2 gap-y-0.5 text-slate-500">
                                    <span>{ab.ap > 0 ? `${ab.ap} AP` : 'Pre-learned'}</span>
                                    {ab.requires && <span className="text-teal-500/70">Requires {ab.requires}</span>}
                                  </span>
                                </button>
                              )
                            })}
                          </div>
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )
        })}
      </div>
    </div>
  )
}
