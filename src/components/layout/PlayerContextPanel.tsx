import { Check, ChevronDown, ChevronRight, Users, WandSparkles, Zap } from 'lucide-react'
import { useMemo, useState } from 'react'
import { cn } from '../../lib/utils'
import { formatPossibleLevels, type PartyLevelContext } from '../../lib/enemyLevelData'
import {
  characterLevel,
  isGFAbilityLearned,
  isMagicCompleted,
  recommendedGFProgress,
} from '../../lib/playerState'
import { orderedStoryChapters } from '../../lib/progression'
import type { Chapter, CharacterProfile, GuardianForce, MagicSpell, TrackerState } from '../../types'

interface Props {
  characters: CharacterProfile[]
  magic: MagicSpell[]
  gfs: GuardianForce[]
  chapters: Chapter[]
  availableMagicIds: ReadonlySet<string>
  visibleGFIds: ReadonlySet<string>
  state: TrackerState
  partyContext: PartyLevelContext
  onToggleParty: (characterId: string) => void
  onSetLevel: (characterId: string, level: number) => void
  onToggleMagic: (characterId: string, spellId: string) => void
  onToggleGFAbility: (gfId: string, abilityName: string) => void
  onSetProgressionChapter: (chapterId: string) => void
}

type OpenPanel = 'party' | 'magic' | 'gf' | null
type MagicFilter = 'needed' | 'all'
type GFDisplay = 'remaining' | 'all'

function shortName(name: string) {
  return name.split(' ')[0]
}

function temporaryGuest(character: CharacterProfile) {
  return character.profile.Availability === 'Temporary guest'
}

export function PlayerContextPanel({
  characters,
  magic,
  gfs,
  chapters,
  availableMagicIds,
  visibleGFIds,
  state,
  partyContext,
  onToggleParty,
  onSetLevel,
  onToggleMagic,
  onToggleGFAbility,
  onSetProgressionChapter,
}: Props) {
  const [openPanel, setOpenPanel] = useState<OpenPanel>(null)
  const [magicCharacterId, setMagicCharacterId] = useState(partyContext.activeCharacterIds[0] ?? characters[0]?.id ?? '')
  const [magicFilter, setMagicFilter] = useState<MagicFilter>('needed')
  const [magicQuery, setMagicQuery] = useState('')
  const [showAllMagic, setShowAllMagic] = useState(false)
  const [selectedGFId, setSelectedGFId] = useState(() => {
    const firstRemaining = recommendedGFProgress(gfs, state, visibleGFIds).find(progress => progress.remaining > 0)
    return firstRemaining?.gf.id ?? gfs.find(gf => visibleGFIds.has(gf.id))?.id ?? ''
  })
  const [gfDisplay, setGFDisplay] = useState<GFDisplay>('remaining')
  const [showAllAbilities, setShowAllAbilities] = useState(false)

  const activeCharacters = partyContext.activeCharacterIds
    .map(id => characters.find(character => character.id === id))
    .filter((character): character is CharacterProfile => Boolean(character))
  const gfProgress = useMemo(() => recommendedGFProgress(gfs, state, visibleGFIds), [gfs, state, visibleGFIds])
  const selectedGFProgress = gfProgress.find(progress => progress.gf.id === selectedGFId) ?? gfProgress[0]
  const selectedMagicCharacter = characters.find(character => character.id === magicCharacterId) ?? activeCharacters[0] ?? characters[0]
  const progressionChapters = orderedStoryChapters(chapters)
  const progressionChapter = progressionChapters.find(chapter => chapter.id === state.progressionChapterId) ?? progressionChapters[0]

  const activeMagicNeeds = activeCharacters.map(character => ({
    character,
    remaining: magic.filter(spell => availableMagicIds.has(spell.id) && !isMagicCompleted(state, character.id, spell.id)).length,
  }))
  const magicToDoCount = activeMagicNeeds.reduce((total, entry) => total + entry.remaining, 0)
  const gfToDo = gfProgress.filter(progress => progress.remaining > 0)
  const magicRows = useMemo(() => {
    if (!selectedMagicCharacter) return []
    const query = magicQuery.trim().toLowerCase()
    return magic.filter(spell => {
      if (magicFilter === 'needed' && (!availableMagicIds.has(spell.id) || isMagicCompleted(state, selectedMagicCharacter.id, spell.id))) return false
      return !query || spell.name.toLowerCase().includes(query)
    })
  }, [magic, magicFilter, magicQuery, selectedMagicCharacter, state, availableMagicIds])

  const abilityRows = selectedGFProgress
    ? selectedGFProgress.abilities.filter(ability => gfDisplay === 'all' || !isGFAbilityLearned(state, selectedGFProgress.gf.id, ability.name))
    : []
  const visibleMagicRows = magicRows.slice(0, showAllMagic || magicQuery ? magicRows.length : 8)
  const visibleAbilityRows = abilityRows.slice(0, showAllAbilities ? abilityRows.length : 7)

  function togglePanel(panel: Exclude<OpenPanel, null>) {
    setOpenPanel(current => current === panel ? null : panel)
  }

  return (
    <section className="glass-panel overflow-hidden">
      <div className="p-3">
        <div className="flex items-start justify-between gap-2">
          <div className="flex min-w-0 items-center gap-2 text-[10px] font-semibold uppercase tracking-widest text-teal-300">
            <Users size={12} />
            <span>Player context</span>
          </div>
          <span className="shrink-0 font-mono text-[10px] text-teal-300">{activeCharacters.length}/3 active</span>
        </div>

        <div className="mt-2 flex flex-wrap gap-1">
          {activeCharacters.map(character => {
            const cannotRemove = activeCharacters.length <= 1
            return (
              <span key={character.id} className="inline-flex items-center gap-1 rounded-md border border-teal-700/40 bg-teal-950/35 px-1.5 py-1 text-[11px] text-teal-100">
                <span>{shortName(character.name)}</span>
                <span className="font-mono text-[10px] text-teal-300">Lv {characterLevel(state, character.id)}</span>
                <button
                  type="button"
                  aria-label={`Remove ${character.name} from active party`}
                  disabled={cannotRemove}
                  onClick={() => onToggleParty(character.id)}
                  className={cn('ml-0.5 rounded px-0.5 text-teal-500 hover:bg-teal-900/60 hover:text-teal-100', cannotRemove && 'cursor-not-allowed opacity-30')}
                >
                  ×
                </button>
              </span>
            )
          })}
        </div>

        {progressionChapter && (
          <label className="mt-2 flex min-w-0 items-center gap-2 rounded-md border border-slate-800 bg-slate-950/30 px-2 py-1.5 text-[10px] text-slate-500">
            <span className="shrink-0 uppercase tracking-wide text-slate-600">Progress</span>
            <select
              aria-label="Current Guide progression"
              value={progressionChapter.id}
              onChange={event => onSetProgressionChapter(event.target.value)}
              className="min-w-0 flex-1 bg-transparent text-[10px] text-slate-300 outline-none"
            >
              {progressionChapters.map(chapter => (
                <option key={chapter.id} value={chapter.id}>
                  Disc {chapter.disc} · {chapter.title}
                </option>
              ))}
            </select>
          </label>
        )}

        <div className="mt-2 grid grid-cols-2 gap-1.5 font-mono text-[10px]">
          <div className="rounded border border-slate-800 bg-slate-950/35 px-2 py-1.5">
            <span className="block text-slate-600">Enemy levels</span>
            <span className="text-teal-200">{formatPossibleLevels(partyContext.possibleLevels)}</span>
          </div>
          <div className="rounded border border-slate-800 bg-slate-950/35 px-2 py-1.5">
            <span className="block text-slate-600">Party average</span>
            <span className="text-slate-200">{partyContext.averageLevel.toFixed(1)} · base {partyContext.baseLevel}</span>
          </div>
        </div>

        <div className="mt-2 grid grid-cols-2 gap-1">
          <ContextActionButton
            active={openPanel === 'party'}
            label="Party"
            detail={`${activeCharacters.length}/3`}
            icon={<Users size={11} />}
            onClick={() => togglePanel('party')}
          />
          <ContextActionButton
            active={openPanel === 'magic'}
            label="Magic"
            detail={activeCharacters.length ? `${magicToDoCount} left` : '—'}
            icon={<WandSparkles size={11} />}
            onClick={() => togglePanel('magic')}
          />
          <ContextActionButton
            active={openPanel === 'gf'}
            label="GF paths"
            detail={gfProgress.length === 0 ? 'None acquired' : gfToDo.length ? `${gfToDo.length} left` : 'Done'}
            icon={<Zap size={11} />}
            onClick={() => togglePanel('gf')}
          />
        </div>

        {openPanel === 'party' && (
          <div className="mt-2 border-t border-slate-800/80 pt-2">
            <div className="mb-1 flex items-center justify-between gap-2">
              <p className="text-[10px] text-slate-500">Tap the check to swap members; level changes recalculate enemy context.</p>
              <ChevronDown size={12} className="shrink-0 text-teal-400" />
            </div>
            <div className="max-h-52 divide-y divide-slate-800/60 overflow-y-auto rounded-md border border-slate-800/70 bg-slate-950/25">
              {characters.map(character => {
                const active = !!state.activeParty[character.id]
                const cannotAdd = !active && activeCharacters.length >= 3
                const cannotRemove = active && activeCharacters.length <= 1
                return (
                  <div key={character.id} className="flex min-w-0 items-center gap-2 px-2 py-1.5">
                    <button
                      type="button"
                      aria-pressed={active}
                      aria-label={`${active ? 'Remove' : 'Add'} ${character.name} ${active ? 'from' : 'to'} active party`}
                      disabled={cannotAdd || cannotRemove}
                      onClick={() => onToggleParty(character.id)}
                      className={cn(
                        'flex h-4 w-4 shrink-0 items-center justify-center rounded border transition-colors',
                        active ? 'border-teal-400 bg-teal-500 text-slate-950' : 'border-slate-600 bg-slate-950 text-transparent',
                        (cannotAdd || cannotRemove) && 'cursor-not-allowed opacity-35',
                      )}
                    >
                      <Check size={10} strokeWidth={3} />
                    </button>
                    <span className={cn('min-w-0 flex-1 truncate text-[11px]', active ? 'text-slate-200' : 'text-slate-500')}>
                      {shortName(character.name)}
                      {temporaryGuest(character) && <span className="ml-1 text-[9px] text-slate-700">guest</span>}
                    </span>
                    <label className="flex shrink-0 items-center gap-1 text-[10px] text-slate-600">
                      Lv
                      <input
                        aria-label={`${character.name} level`}
                        type="number"
                        min={1}
                        max={100}
                        value={characterLevel(state, character.id)}
                        onChange={event => onSetLevel(character.id, Number(event.target.value))}
                        className="w-10 rounded border border-slate-700/70 bg-slate-950/70 px-1 py-0.5 text-center font-mono text-[10px] text-slate-200 outline-none focus:border-teal-500/60"
                      />
                    </label>
                  </div>
                )
              })}
            </div>
            <p className="mt-1.5 text-[10px] text-slate-600">A fourth member is disabled while the party is full.</p>
          </div>
        )}

        {openPanel === 'magic' && (
          <div className="mt-2 border-t border-slate-800/80 pt-2">
            <div className="flex items-center gap-1 overflow-x-auto pb-1">
              {characters.map(character => (
                <button
                  type="button"
                  key={character.id}
                  onClick={() => {
                    setMagicCharacterId(character.id)
                    setShowAllMagic(false)
                  }}
                  className={cn(
                    'shrink-0 rounded-md border px-2 py-1 text-[10px] transition-colors',
                    selectedMagicCharacter?.id === character.id
                      ? 'border-violet-500/50 bg-violet-950/40 text-violet-100'
                      : 'border-slate-800 bg-slate-950/30 text-slate-500 hover:text-slate-300',
                  )}
                >
                  {shortName(character.name)}
                </button>
              ))}
            </div>
            <div className="mt-1.5 flex gap-1">
              <input
                value={magicQuery}
                onChange={event => {
                  setMagicQuery(event.target.value)
                  setShowAllMagic(false)
                }}
                placeholder="Find magic…"
                className="min-w-0 flex-1 rounded-md border border-slate-800 bg-slate-950/60 px-2 py-1.5 text-[11px] text-slate-200 outline-none placeholder:text-slate-600 focus:border-violet-500/60"
              />
              <FilterButton label="To-do" active={magicFilter === 'needed'} onClick={() => { setMagicFilter('needed'); setShowAllMagic(false) }} />
              <FilterButton label="All" active={magicFilter === 'all'} onClick={() => { setMagicFilter('all'); setShowAllMagic(false) }} />
            </div>
            {selectedMagicCharacter && (
              <p className="mt-1.5 text-[10px] text-slate-600">
                {selectedMagicCharacter.name}: {magicRows.length} {magicFilter === 'needed' ? 'needed now' : 'listed'} · completed magic counts as 100 stock.
              </p>
            )}
            <div className="mt-1 max-h-52 divide-y divide-slate-800/60 overflow-y-auto rounded-md border border-slate-800/70 bg-slate-950/25">
              {selectedMagicCharacter && visibleMagicRows.map(spell => {
                const completed = isMagicCompleted(state, selectedMagicCharacter.id, spell.id)
                return (
                  <label key={spell.id} className={cn('flex cursor-pointer items-center gap-2 px-2 py-1.5', completed && 'opacity-55')}>
                    <input
                      type="checkbox"
                      checked={completed}
                      onChange={() => onToggleMagic(selectedMagicCharacter.id, spell.id)}
                      className="accent-violet-400"
                    />
                    <span className={cn('min-w-0 flex-1 truncate text-[11px]', completed ? 'text-slate-500 line-through' : 'text-slate-200')}>{spell.name}</span>
                  </label>
                )
              })}
              {magicRows.length === 0 && <p className="px-2 py-3 text-center text-[11px] text-slate-600">No magic matches this view.</p>}
            </div>
            {magicRows.length > visibleMagicRows.length && (
              <button type="button" onClick={() => setShowAllMagic(value => !value)} className="mt-1.5 flex w-full items-center justify-center gap-1 text-[10px] text-violet-300 hover:text-violet-200">
                {showAllMagic ? 'Show fewer' : `Show all ${magicRows.length}`}
                {showAllMagic ? <ChevronDown size={11} /> : <ChevronRight size={11} />}
              </button>
            )}
          </div>
        )}

        {openPanel === 'gf' && (
          <div className="mt-2 border-t border-slate-800/80 pt-2">
            {gfProgress.length === 0 ? (
              <p className="rounded-md border border-slate-800 bg-slate-950/25 px-2 py-3 text-[11px] leading-relaxed text-slate-600">
                Mark a GF acquired in the GFs section to start its recommended learning path here.
              </p>
            ) : <select
              aria-label="GF learning path"
              value={selectedGFProgress?.gf.id ?? ''}
              onChange={event => {
                setSelectedGFId(event.target.value)
                setShowAllAbilities(false)
              }}
              className="w-full rounded-md border border-slate-800 bg-slate-950/60 px-2 py-1.5 text-[11px] text-slate-200 outline-none focus:border-emerald-500/60"
            >
              {gfProgress.map(progress => (
                <option key={progress.gf.id} value={progress.gf.id}>
                  {progress.gf.name} · {progress.remaining ? `${progress.remaining} remaining` : 'complete'}
                </option>
              ))}
            </select>}
            {gfProgress.length > 0 && <div className="mt-1.5 flex gap-1">
              <FilterButton label="Remaining" active={gfDisplay === 'remaining'} onClick={() => { setGFDisplay('remaining'); setShowAllAbilities(false) }} />
              <FilterButton label="All" active={gfDisplay === 'all'} onClick={() => { setGFDisplay('all'); setShowAllAbilities(false) }} />
              {selectedGFProgress && <span className="ml-auto self-center font-mono text-[10px] text-emerald-300">{selectedGFProgress.remaining} left</span>}
            </div>}
            {gfProgress.length > 0 && <div className="mt-1 max-h-52 divide-y divide-slate-800/60 overflow-y-auto rounded-md border border-slate-800/70 bg-slate-950/25">
              {selectedGFProgress && visibleAbilityRows.map(ability => {
                const learned = isGFAbilityLearned(state, selectedGFProgress.gf.id, ability.name)
                return (
                  <button
                    type="button"
                    key={ability.name}
                    aria-pressed={learned}
                    onClick={() => onToggleGFAbility(selectedGFProgress.gf.id, ability.name)}
                    className="flex w-full items-center gap-2 px-2 py-1.5 text-left hover:bg-slate-900/70"
                  >
                    <span className={cn('flex h-4 w-4 shrink-0 items-center justify-center rounded border', learned ? 'border-emerald-400 bg-emerald-500 text-slate-950' : 'border-slate-600 text-transparent')}>
                      <Check size={10} strokeWidth={3} />
                    </span>
                    <span className={cn('min-w-0 flex-1 truncate text-[11px]', learned ? 'text-slate-500 line-through' : 'text-slate-200')}>{ability.name}</span>
                    <span className="shrink-0 text-[9px] text-slate-700">{ability.ap > 0 ? `${ability.ap} AP` : 'pre'}</span>
                  </button>
                )
              })}
              {selectedGFProgress && abilityRows.length === 0 && <p className="px-2 py-3 text-center text-[11px] text-emerald-300/70">All recommended abilities learned.</p>}
            </div>}
            {gfProgress.length > 0 && abilityRows.length > visibleAbilityRows.length && (
              <button type="button" onClick={() => setShowAllAbilities(value => !value)} className="mt-1.5 flex w-full items-center justify-center gap-1 text-[10px] text-emerald-300 hover:text-emerald-200">
                {showAllAbilities ? 'Show fewer' : `Show all ${abilityRows.length}`}
                {showAllAbilities ? <ChevronDown size={11} /> : <ChevronRight size={11} />}
              </button>
            )}
          </div>
        )}

        {activeMagicNeeds.length > 0 && (
          <p className="mt-2 text-[10px] leading-relaxed text-slate-600">
            Magic to-do: <span className="text-violet-300/80">{activeMagicNeeds.map(entry => `${shortName(entry.character.name)} (${entry.remaining})`).join(' · ')}</span>
          </p>
        )}

        {gfToDo.length > 0 && (
          <p className="mt-2 text-[10px] leading-relaxed text-slate-600">
            GF to-do: <span className="text-emerald-300/80">{gfToDo.slice(0, 3).map(progress => `${progress.gf.name} (${progress.remaining})`).join(' · ')}</span>
            {gfToDo.length > 3 && ` · +${gfToDo.length - 3} more`}
          </p>
        )}
      </div>
    </section>
  )
}

function ContextActionButton({ label, detail, icon, active, onClick }: {
  label: string
  detail: string
  icon: React.ReactNode
  active: boolean
  onClick: () => void
}) {
  return (
    <button
      type="button"
      aria-expanded={active}
      onClick={onClick}
      className={cn(
        'min-w-0 rounded-md border px-1.5 py-1.5 text-left transition-colors',
        active ? 'border-teal-500/50 bg-teal-950/35 text-teal-100' : 'border-slate-800 bg-slate-950/30 text-slate-500 hover:border-slate-700 hover:text-slate-300',
      )}
    >
      <span className="flex items-center gap-1 text-[10px] font-medium">
        {icon}
        <span className="truncate">{label}</span>
      </span>
      <span className="mt-0.5 block truncate font-mono text-[9px] text-slate-600">{detail}</span>
    </button>
  )
}

function FilterButton({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'shrink-0 rounded-md border px-2 py-1 text-[10px] transition-colors',
        active ? 'border-violet-500/50 bg-violet-950/35 text-violet-100' : 'border-slate-800 bg-slate-950/30 text-slate-500 hover:text-slate-300',
      )}
    >
      {label}
    </button>
  )
}
