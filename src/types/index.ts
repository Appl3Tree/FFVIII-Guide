// ─── Data Schema (ff8_master.json) ───────────────────────────────────────────

export interface Checkpoint {
  id: string
  type: 'achievement' | 'missable' | 'task'
  label: string
  description: string
  index: number  // paragraph index within chapter.content
  achievementType?: 'gf' | 'cumulative' | 'story'
}

export interface AreaEncounterEnemy {
  id: string        // matches enemy.id in lookup.enemies
  name: string      // display name (denormalised)
  notes?: string    // e.g. "Lv20+ for Dragon Fang", "Fixed Lv5", "6 AP guaranteed"
  lvMin?: number    // override global lvMin (use for fixed-level areas)
  lvMax?: number    // override global lvMax (use for fixed-level / capped areas)
  hp?: number        // exact HP for a fixed-level encounter
  drawMagic?: string[] // rare curated override; prefer Enemy.drawMagicByLevel when available
  mug?: string | null  // rare curated override; null hides when unavailable in context
}

export interface AreaEncounter {
  area: string                    // e.g. "Forest near Fire Cavern"
  enemies: AreaEncounterEnemy[]
  mugAvailable?: boolean          // false when the guide context occurs before Mug is available
}

export interface Chapter {
  id: string
  title: string
  disc: number
  index: number    // 1-based chapter number within its disc (resets to 1 each disc)
  content: string  // prose, paragraphs separated by \n\n
  checkpoints: Checkpoint[]
  encounters?: AreaEncounter[]    // toggleable area encounter panel data
}

export interface GFAbility {
  name: string
  ap: number
  unlocks?: string
  requires?: string
}

export interface GuardianForce {
  id: string
  name: string
  element: string
  attack: string
  location: string
  abilities: GFAbility[]
  learningOrder?: string[]
}

export interface Card {
  id: string
  name: string
  level: number
  type: 'monster' | 'boss' | 'gf' | 'player'
  top: number
  left: number
  right: number
  bottom: number
  howToGet: string
  cardMod?: string
  location?: string | null
  image?: string
  imageWidth?: number
  imageHeight?: number
  elemental: string | null
}

export interface RefinementEntry {
  fromQty: number
  from: string
  toQty: number
  to: string
}

export interface RefinementAbility {
  ability: string
  entries: RefinementEntry[]
}

export interface MagicSpell {
  id: string
  name: string
  sourceName?: string
  statJunctions: Record<'HP' | 'Str' | 'Vit' | 'Mag' | 'Spr' | 'Spd' | 'Eva' | 'Hit' | 'Luck', string>
  elemStatus: {
    elementalAttack: string
    elementalDefense: string
    statusAttack: string
    statusDefense: string
  }
  acquisition: {
    'Refine From'?: string
    'Refine Into'?: string
    'Draw Difficulty'?: string
  }
  castEffect: string
}

export interface Item {
  id: string
  name: string
  section: string
  buy: number | null
  sell: number | null
  useDesc: string
  obtain: string
  refineFrom: string[]
  refineTo: string[]
}

export interface Weapon {
  id: string
  name: string
  type: string      // 'GUNBLADE' | 'GLOVE' | 'GUN' | 'WHIP' | 'PINWHEEL' | 'NUNCHAKU'
  materials: string[]
  strBonus: number
  hitBonus: number
  price: number
  haggleCost?: number | null
  character?: string
  sourceAliases?: string[]
  sourceMaterials?: string
  weaponsMonthlyShort?: string
  limitBreaks?: string | null
  weaponsMonthly: string
}

export interface ShopInventory {
  id: string
  name: string
  items: Array<{
    name: string
    price: number | null
    requirement: string | null
  }>
}

export interface JunctionTable {
  id: string
  name: string
  headers: string[]
  rows: string[][]
  footnotes?: string[]
}

export interface CharacterDataTable {
  id: string
  title: string
  headers: string[]
  rows: string[][]
}

export interface CharacterProfile {
  id: string
  name: string
  profile: Record<string, string>
  notes: string[]
  tables: CharacterDataTable[]
}

export interface Ability {
  id: string
  name: string
  category: 'Junction' | 'Command' | 'Character' | 'GF' | 'Menu' | 'Party'
  availableTo: string
  ap: string
  description: string
  taughtBy: string
  detailPresent?: boolean
  detailLineCount?: number
  detailCharCount?: number
}

export interface AbilitySection {
  id: string
  title: string
  paragraphs: string[]
}

export interface Achievement {
  id: string
  title: string
  description: string
  type: 'gf' | 'cumulative' | 'story'
  disc: number
  chapterHint: string | null
}

export interface Enemy {
  id: string
  name: string
  image?: string
  imageWidth?: number
  imageHeight?: number
  lvMin: number
  lvMax: number
  hpMin: number
  hpMax: number
  ap: number
  exp: number
  expFormula?: string
  lvUp: boolean
  cards: { common: string | null; rare: string | null }
  elementals: Partial<Record<'fire' | 'ice' | 'thunder' | 'earth' | 'poison' | 'wind' | 'water' | 'holy' | 'gravity', string>>
  elementalWeaknesses?: string
  elementalResistances?: string
  statusVulnerabilitiesNote?: string
  whereFound?: string
  gravityVulnerable?: boolean
  undead?: boolean
  drawMagic: string[]
  drawMagicByLevel?: Array<{ lvMin: number; lvMax: number; spells: string[] }>
  mug: string | null
  mugByLevel?: Array<{ lvMin: number; lvMax: number; value: string | null }>
  mugChance?: string | null
  drop: string | null
  dropByLevel?: Array<{ lvMin: number; lvMax: number; value: string | null }>
  dropChance?: string | null
  devour?: string | null
  devourByLevel?: Array<{ lvMin: number; lvMax: number; value: string | null }>
  cardDrop: string | null
  scan: string
}

export interface SidequestPlacement {
  chapterId: string
  afterParagraph: number
  label?: string
  summary?: string
  available?: string
  deadline?: string
  rewards?: string[]
  requirements?: string[]
  route?: string[]
  notes?: string[]
}

export interface Sidequest {
  id: string
  title: string
  category: 'Cards' | 'GFs' | 'World' | 'Character' | 'Completion' | 'Bosses'
  disc: number
  available: string
  deadline: string
  summary: string
  rewards: string[]
  requirements?: string[]
  route: string[]
  notes?: string[]
  related?: string[]
  placements: SidequestPlacement[]
}

export interface MasterData {
  meta: {
    generated: string
    achievementCount: number
    chapterCount: number
    missableCount: number
    itemCount: number
    weaponCount: number
  }
  chapters: Chapter[]
  checklists: {
    achievements: Achievement[]
    missables: Array<{ id: string; title: string; description: string }>
  }
  lookup: {
    gfs: GuardianForce[]
    cards: Card[]
    refinement: RefinementAbility[]
    magic?: MagicSpell[]
    shops?: ShopInventory[]
    junctions?: JunctionTable[]
    characters?: CharacterProfile[]
    abilities?: Ability[]
    abilitySections?: AbilitySection[]
    items: Item[]
    weapons: Weapon[]
    enemies: Enemy[]
  }
}

// ─── Tracker ─────────────────────────────────────────────────────────────────

export interface TrackerState {
  completedItems: Record<string, boolean>
  notes: Record<string, string>
}

// ─── App ─────────────────────────────────────────────────────────────────────

export type ViewMode = 'guide' | 'checklist' | 'sidequests' | 'cards' | 'gfs' | 'abilities' | 'refinement' | 'items' | 'bestiary'
