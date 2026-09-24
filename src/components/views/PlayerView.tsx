import { useMemo, useState } from 'react'
import { Check, Users, WandSparkles, Zap } from 'lucide-react'
import { cn } from '../../lib/utils'
import { Checkbox } from '../ui/Checkbox'
import { Badge } from '../ui/Badge'
import { ProgressBar } from '../ui/ProgressBar'
import { BlueMagicTracker } from '../ui/BlueMagicTracker'
import {
  activeCharacterIds,
  characterLevel,
  charactersNeedingSpell,
  isGFAbilityLearned,
  isMagicCompleted,
  recommendedGFAbilities,
} from '../../lib/playerState'
import { createPartyLevelContext, formatPossibleLevels } from '../../lib/enemyLevelData'
import type { CharacterProfile, GuardianForce, Item, MagicSpell, TrackerState } from '../../types'

interface Props {
  characters: CharacterProfile[]
  magic: MagicSpell[]
  gfs: GuardianForce[]
  items: Item[]
  availableMagicIds: ReadonlySet<string>
  availableBlueMagicIds: ReadonlySet<string>
  visibleGFIds: ReadonlySet<string>
  state: TrackerState
  onToggleMagic: (characterId: string, spellId: string) => void
  onToggleGFAbility: (gfId: string, abilityName: string) => void
  onToggleBlueMagic: (abilityId: string, next?: boolean) => void
  onSetLevel: (characterId: string, level: number) => void
  onToggleParty: (characterId: string) => void
}

type MagicFilter = 'needed' | 'all'

function shortName(name: string) {
  return name.split(' ')[0]
}

function isTemporary(character: CharacterProfile) {
  return character.profile.Availability === 'Temporary guest'
}

export function PlayerView({
  characters,
  magic,
  gfs,
  items,
  availableMagicIds,
  availableBlueMagicIds,
  visibleGFIds,
  state,
  onToggleMagic,
  onToggleGFAbility,
  onToggleBlueMagic,
  onSetLevel,
  onToggleParty,
}: Props) {
  const firstCharacterId = characters[0]?.id ?? ''
  const [selectedCharacterId, setSelectedCharacterId] = useState(firstCharacterId)
  const [magicFilter, setMagicFilter] = useState<MagicFilter>('needed')
  const [magicQuery, setMagicQuery] = useState('')
  const [selectedGFId, setSelectedGFId] = useState(gfs[0]?.id ?? '')
  const activeIds = activeCharacterIds(state, characters)
  const party = createPartyLevelContext(activeIds, state.characterLevels)
  const selectedCharacter = characters.find(character => character.id === selectedCharacterId) ?? characters[0]
  const visibleGFs = gfs.filter(gf => visibleGFIds.has(gf.id))
  const selectedGF = visibleGFs.find(gf => gf.id === selectedGFId) ?? visibleGFs[0]

  const visibleMagic = useMemo(() => {
    const query = magicQuery.trim().toLowerCase()
    return magic.filter(spell => {
      if (magicFilter === 'needed' && selectedCharacter && (!availableMagicIds.has(spell.id) || isMagicCompleted(state, selectedCharacter.id, spell.id))) return false
      return !query || spell.name.toLowerCase().includes(query)
    })
  }, [magic, magicFilter, magicQuery, selectedCharacter, state, availableMagicIds])

  const selectedMagicDone = selectedCharacter
    ? magic.filter(spell => isMagicCompleted(state, selectedCharacter.id, spell.id)).length
    : 0

  const selectedGFAbilities = selectedGF ? recommendedGFAbilities(selectedGF) : []
  const selectedGFLearned = selectedGF
    ? selectedGFAbilities.filter(ability => isGFAbilityLearned(state, selectedGF.id, ability.name)).length
    : 0

  return (
    <div className="space-y-4 pb-8 w-full">
      <section className="glass-panel border-t-2 border-teal-500/70 p-4">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-teal-300">
              <Users size={13} /> Player state
            </div>
            <h1 className="mt-1 text-xl font-bold text-slate-100">Party context</h1>
            <p className="mt-1 max-w-2xl text-sm leading-relaxed text-slate-400">
              Set the save file’s levels and current battle party. Enemy context uses only these active characters.
            </p>
          </div>
          <div className="min-w-[13rem] rounded-lg border border-teal-700/35 bg-teal-950/20 px-3 py-2 text-right">
            <div className="text-[10px] font-semibold uppercase tracking-wide text-teal-400">Enemy context</div>
            <div className="mt-1 font-mono text-sm text-slate-100">
              {party.activeLevels.length ? `Avg ${party.averageLevel.toFixed(1)} · base ${party.baseLevel}` : 'No active party'}
            </div>
            <div className="mt-0.5 text-xs text-teal-200">Possible levels: {formatPossibleLevels(party.possibleLevels)}</div>
          </div>
        </div>

        <div className="mt-4 grid gap-2 sm:grid-cols-2 xl:grid-cols-3">
          {characters.map(character => {
            const active = !!state.activeParty[character.id]
            const cannotAdd = !active && activeIds.length >= 3
            const cannotRemove = active && activeIds.length <= 1
            return (
              <div key={character.id} className={cn(
                'flex min-w-0 items-center gap-2 rounded-lg border px-3 py-2 transition-colors',
                active ? 'border-teal-600/45 bg-teal-950/20' : 'border-slate-800/80 bg-slate-950/30'
              )}>
                <button
                  type="button"
                  aria-pressed={active}
                  aria-label={`${active ? 'Remove' : 'Add'} ${character.name} ${active ? 'from' : 'to'} active party`}
                  disabled={cannotAdd || cannotRemove}
                  onClick={() => onToggleParty(character.id)}
                  className={cn(
                    'flex h-5 w-5 shrink-0 items-center justify-center rounded border transition-colors',
                    active ? 'border-teal-400 bg-teal-500 text-slate-950' : 'border-slate-600 bg-slate-950 text-transparent',
                    (cannotAdd || cannotRemove) && 'cursor-not-allowed opacity-40'
                  )}
                >
                  <Check size={12} strokeWidth={3} />
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedCharacterId(character.id)}
                  className="min-w-0 flex-1 text-left"
                >
                  <span className={cn('block truncate text-sm font-medium', selectedCharacter?.id === character.id ? 'text-white' : 'text-slate-300')}>
                    {character.name}
                  </span>
                  <span className="block text-[10px] text-slate-600">{isTemporary(character) ? 'Temporary guest' : character.profile['How Joins']}</span>
                </button>
                <label className="flex shrink-0 items-center gap-1 text-[10px] text-slate-600">
                  Lv
                  <input
                    aria-label={`${character.name} level`}
                    type="number"
                    min={1}
                    max={100}
                    value={characterLevel(state, character.id)}
                    onChange={event => onSetLevel(character.id, Number(event.target.value))}
                    className="w-12 rounded border border-slate-700/70 bg-slate-950/70 px-1.5 py-1 text-center font-mono text-xs text-slate-200 outline-none focus:border-teal-500/60"
                  />
                </label>
              </div>
            )
          })}
        </div>
        <p className="mt-2 text-[11px] text-slate-600">
          {activeIds.length}/3 active · select up to three. A fourth character is disabled while the party is full.
        </p>
      </section>

      <BlueMagicTracker
        items={items}
        state={state}
        onToggle={onToggleBlueMagic}
        availableAbilityIds={availableBlueMagicIds}
        variant="full"
      />

      <section className="glass-panel overflow-hidden">
        <div className="border-b border-slate-700/40 px-4 py-3">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-violet-300">
                <WandSparkles size={13} /> Magic stocks
              </div>
              <p className="mt-1 text-sm text-slate-400">Completion means {100} copies for junction calculations.</p>
            </div>
            {selectedCharacter && <span className="font-mono text-sm text-violet-200">{selectedMagicDone}/{magic.length}</span>}
          </div>
          <div className="mt-3 flex gap-1 overflow-x-auto">
            {characters.map(character => (
              <button
                type="button"
                key={character.id}
                onClick={() => setSelectedCharacterId(character.id)}
                className={cn(
                  'shrink-0 rounded-md border px-2.5 py-1.5 text-xs transition-colors',
                  selectedCharacter?.id === character.id
                    ? 'border-violet-500/45 bg-violet-950/35 text-violet-100'
                    : 'border-slate-800 bg-slate-950/30 text-slate-500 hover:text-slate-300'
                )}
              >
                {shortName(character.name)}
              </button>
            ))}
          </div>
          <div className="mt-3 flex flex-col gap-2 sm:flex-row">
            <input
              value={magicQuery}
              onChange={event => setMagicQuery(event.target.value)}
              placeholder="Filter magic…"
              className="min-w-0 flex-1 rounded-lg border border-slate-700/55 bg-slate-950/65 px-3 py-2 text-sm text-slate-200 outline-none placeholder:text-slate-600 focus:border-violet-500/60"
            />
            <div className="flex rounded-lg border border-slate-700/45 bg-slate-950/45 p-1">
              {(['needed', 'all'] as MagicFilter[]).map(filter => (
                <button
                  type="button"
                  key={filter}
                  onClick={() => setMagicFilter(filter)}
                  className={cn(
                    'rounded-md px-3 py-1 text-xs capitalize transition-colors',
                    magicFilter === filter ? 'bg-violet-500/20 text-violet-100' : 'text-slate-500 hover:text-slate-300'
                  )}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="max-h-[34rem] overflow-y-auto divide-y divide-slate-800/60">
          {selectedCharacter && visibleMagic.map(spell => {
            const completed = isMagicCompleted(state, selectedCharacter.id, spell.id)
            const needers = charactersNeedingSpell(spell.name, characters, magic, state)
            return (
              <div key={spell.id} className={cn('flex items-start gap-3 px-4 py-2.5', completed && 'opacity-50')}>
                <Checkbox checked={completed} onChange={() => onToggleMagic(selectedCharacter.id, spell.id)} className="mt-0.5 shrink-0" />
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className={cn('text-sm', completed ? 'text-slate-500 line-through' : 'text-slate-200')}>{spell.name}</span>
                    {needers.length > 0 && <span className="text-[10px] text-amber-300/80">Needs: {needers.map(character => shortName(character.name)).join(', ')}</span>}
                  </div>
                </div>
              </div>
            )
          })}
          {selectedCharacter && visibleMagic.length === 0 && (
            <p className="px-4 py-8 text-center text-sm text-slate-600">No magic matches this view.</p>
          )}
        </div>
      </section>

      <section className="glass-panel overflow-hidden">
        <div className="border-b border-slate-700/40 px-4 py-3">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-emerald-300">
            <Zap size={13} /> GF learning paths
          </div>
          <p className="mt-1 text-sm text-slate-400">Recommended abilities are expanded from each GF’s existing learning order and prerequisites.</p>
        </div>
        <div className="grid gap-2 p-3 sm:grid-cols-2 xl:grid-cols-3">
          {visibleGFs.map(gf => {
            const abilities = recommendedGFAbilities(gf)
            const learned = abilities.filter(ability => isGFAbilityLearned(state, gf.id, ability.name)).length
            const selected = selectedGF?.id === gf.id
            return (
              <button
                type="button"
                key={gf.id}
                onClick={() => setSelectedGFId(gf.id)}
                className={cn(
                  'rounded-lg border px-3 py-2 text-left transition-colors',
                  selected ? 'border-emerald-500/45 bg-emerald-950/25' : 'border-slate-800 bg-slate-950/25 hover:border-slate-700'
                )}
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="text-sm font-medium text-slate-200">{gf.name}</span>
                  <span className="font-mono text-[11px] text-emerald-300">{learned}/{abilities.length}</span>
                </div>
                <ProgressBar value={abilities.length ? Math.round((learned / abilities.length) * 100) : 0} color="emerald" />
                <div className="mt-1 text-[10px] text-slate-600">{abilities.length - learned} recommended remaining</div>
              </button>
            )
          })}
          {visibleGFs.length === 0 && (
            <p className="col-span-full rounded-lg border border-slate-800 bg-slate-950/25 px-3 py-4 text-sm text-slate-600">
              Mark a GF acquired in the GFs section or advance the Guide progression to its availability point to track its recommended learning path here.
            </p>
          )}
        </div>

        {selectedGF && (
          <div className="border-t border-slate-700/40 px-4 py-3">
            <div className="flex items-center justify-between gap-2">
              <div>
                <h2 className="text-sm font-semibold text-slate-100">{selectedGF.name} abilities</h2>
                <p className="mt-0.5 text-xs text-slate-500">{selectedGFLearned}/{selectedGFAbilities.length} learned · ordered from the existing path</p>
              </div>
              <Badge variant="emerald">{selectedGFAbilities.length - selectedGFLearned} remaining</Badge>
            </div>
            <div className="mt-3 grid gap-1 sm:grid-cols-2">
              {selectedGFAbilities.map((ability, index) => {
                const learned = isGFAbilityLearned(state, selectedGF.id, ability.name)
                return (
                  <button
                    type="button"
                    key={ability.name}
                    onClick={() => onToggleGFAbility(selectedGF.id, ability.name)}
                    className={cn(
                      'flex items-start gap-2 rounded-md border px-2.5 py-2 text-left transition-colors',
                      learned ? 'border-emerald-700/25 bg-emerald-950/10' : 'border-slate-800 bg-slate-950/25 hover:border-slate-700'
                    )}
                  >
                    <span className={cn('mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded border', learned ? 'border-emerald-400 bg-emerald-500 text-slate-950' : 'border-slate-600 text-transparent')}>
                      <Check size={10} strokeWidth={3} />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className={cn('block text-xs', learned ? 'text-slate-500 line-through' : 'text-slate-200')}>{index + 1}. {ability.name}</span>
                      <span className="mt-0.5 block text-[10px] text-slate-600">{ability.ap > 0 ? `${ability.ap} AP` : 'Pre-learned'}{ability.requires ? ` · Requires ${ability.requires}` : ''}</span>
                    </span>
                  </button>
                )
              })}
            </div>
          </div>
        )}
      </section>
    </div>
  )
}
