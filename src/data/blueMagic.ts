export interface BlueMagicAbility {
  id: string
  name: string
  /** References the canonical item record in ff8_master.json. */
  learningItemId: string | null
  /** First Guide chapter that establishes a practical acquisition opportunity. */
  availableFromChapterId?: string
  knownByDefault?: boolean
}

/** Quistis's Blue Magic and its validated learning-item relationship. */
export const BLUE_MAGIC: BlueMagicAbility[] = [
  { id: 'laser-eye', name: 'Laser Eye', learningItemId: null, knownByDefault: true },
  { id: 'ultra-waves', name: 'Ultra Waves', learningItemId: 'item-spider-web', availableFromChapterId: 'd1-preparing-for-the-exam' },
  { id: 'electrocute', name: 'Electrocute', learningItemId: 'item-coral-fragment', availableFromChapterId: 'd1-deling-city' },
  { id: 'lv-death', name: 'LV?Death', learningItemId: 'item-curse-spike', availableFromChapterId: 'd1-deling-city' },
  { id: 'degenerator', name: 'Degenerator', learningItemId: 'item-black-hole', availableFromChapterId: 'd1-journey-to-galbadia-garden' },
  { id: 'aqua-breath', name: 'Aqua Breath', learningItemId: 'item-water-crystal', availableFromChapterId: 'd1-preparing-for-the-exam' },
  { id: 'micro-missiles', name: 'Micro Missiles', learningItemId: 'item-missile', availableFromChapterId: 'd2-the-escape' },
  { id: 'acid', name: 'Acid', learningItemId: 'item-mystery-fluid', availableFromChapterId: 'd3-esthar' },
  { id: 'gatling-gun', name: 'Gatling Gun', learningItemId: 'item-running-fire', availableFromChapterId: 'd2-missile-base' },
  { id: 'fire-breath', name: 'Fire Breath', learningItemId: 'item-inferno-fang', availableFromChapterId: 'd3-trabia-canyon' },
  { id: 'bad-breath', name: 'Bad Breath', learningItemId: 'item-malboro-tentacle', availableFromChapterId: 'd3-journey-to-the-silent-country' },
  { id: 'white-wind', name: 'White Wind', learningItemId: 'item-whisper', availableFromChapterId: 'd1-dollet-exploration' },
  { id: 'homing-laser', name: 'Homing Laser', learningItemId: 'item-laser-cannon', availableFromChapterId: 'd1-journey-to-galbadia-garden' },
  { id: 'mighty-guard', name: 'Mighty Guard', learningItemId: 'item-barrier', availableFromChapterId: 'd3-siege-of-esthar' },
  { id: 'ray-bomb', name: 'Ray-Bomb', learningItemId: 'item-power-generator', availableFromChapterId: 'd2-battle-of-the-gardens' },
  { id: 'shockwave-pulsar', name: 'Shockwave Pulsar', learningItemId: 'item-dark-matter', availableFromChapterId: 'd2-battle-of-the-gardens' },
]

export const BLUE_MAGIC_BY_ITEM_ID = new Map(
  BLUE_MAGIC.filter(ability => ability.learningItemId).map(ability => [ability.learningItemId as string, ability]),
)

export const BLUE_MAGIC_BY_ID = new Map(BLUE_MAGIC.map(ability => [ability.id, ability]))
