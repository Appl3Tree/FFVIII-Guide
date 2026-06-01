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
}

export interface AreaEncounter {
  area: string                    // e.g. "Forest near Fire Cavern"
  enemies: AreaEncounterEnemy[]
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
}

export interface GuardianForce {
  id: string
  name: string
  element: string
  attack: string
  location: string
  abilities: GFAbility[]
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
  weaponsMonthly: string
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
  lvMin: number
  lvMax: number
  hpMin: number
  hpMax: number
  ap: number
  exp: number
  lvUp: boolean
  cards: { common: string | null; rare: string | null }
  elementals: Partial<Record<'fire' | 'ice' | 'thunder' | 'earth' | 'poison' | 'wind' | 'water' | 'holy' | 'gravity', string>>
  drawMagic: string[]
  mug: string | null
  drop: string | null
  cardDrop: string | null
  scan: string
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

export type ViewMode = 'guide' | 'checklist' | 'cards' | 'gfs' | 'abilities' | 'refinement' | 'items' | 'bestiary'
