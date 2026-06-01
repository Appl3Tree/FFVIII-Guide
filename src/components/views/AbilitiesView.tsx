import { useState, useMemo } from 'react'
import { cn } from '../../lib/utils'
import type { GuardianForce } from '../../types'

// ─── Ability definitions ───────────────────────────────────────────────────────
// Descriptions sourced from jegged.com/Games/Final-Fantasy-VIII/Abilities/

type AbilityCategory = 'Junction' | 'Command' | 'Character' | 'GF' | 'Menu' | 'Party'

interface AbilityDef {
  name: string
  desc: string
}

const CATEGORIES: Record<AbilityCategory, AbilityDef[]> = {
  Junction: [
    { name: 'HP-J',         desc: 'Junction magic to the HP stat.' },
    { name: 'Str-J',        desc: 'Junction magic to the Strength stat.' },
    { name: 'Vit-J',        desc: 'Junction magic to the Vitality stat.' },
    { name: 'Mag-J',        desc: 'Junction magic to the Magic stat.' },
    { name: 'Spr-J',        desc: 'Junction magic to the Spirit stat.' },
    { name: 'Spd-J',        desc: 'Junction magic to the Speed stat.' },
    { name: 'Eva-J',        desc: 'Junction magic to the Evasion stat.' },
    { name: 'Hit-J',        desc: 'Junction magic to the Hit Rate stat.' },
    { name: 'Luck-J',       desc: 'Junction magic to the Luck stat.' },
    { name: 'Elem-Atk-J',   desc: 'Junction magic to add elemental damage to physical attacks.' },
    { name: 'Elem-Def-J',   desc: 'Junction magic to elemental defense (1 element slot).' },
    { name: 'Elem-Def-Jx2', desc: 'Junction magic to elemental defense (2 element slots).' },
    { name: 'Elem-Def-Jx4', desc: 'Junction magic to elemental defense (4 element slots).' },
    { name: 'ST-Atk-J',     desc: 'Junction magic to add status effects to physical attacks.' },
    { name: 'ST-Def-J',     desc: 'Junction magic to status defense (1 status slot).' },
    { name: 'ST-Def-Jx2',   desc: 'Junction magic to status defense (2 status slots).' },
    { name: 'ST-Def-Jx4',   desc: 'Junction magic to status defense (4 status slots).' },
    { name: 'Ability x3',   desc: 'Equip up to 3 support abilities simultaneously.' },
    { name: 'Ability x4',   desc: 'Equip up to 4 support abilities simultaneously.' },
  ],
  Command: [
    { name: 'Magic',     desc: 'Cast magic spells from the character\'s stocked magic.' },
    { name: 'GF',        desc: 'Summon a junctioned Guardian Force.' },
    { name: 'Draw',      desc: 'Draw magic from enemies or draw points to stock or use immediately.' },
    { name: 'Item',      desc: 'Use items from the inventory.' },
    { name: 'Card',      desc: 'Attempt to convert a low-HP enemy into a Triple Triad card instead of defeating it.' },
    { name: 'Mug',       desc: 'Steal an item from an enemy before attacking. Replaces the Attack command.' },
    { name: 'Absorb',    desc: 'Drain HP from an enemy.' },
    { name: 'Darkside',  desc: 'Expend HP to deal heavy non-elemental damage to one enemy.' },
    { name: 'Doom',      desc: 'Inflict the Doom countdown status on one enemy.' },
    { name: 'Defend',    desc: 'Reduce physical damage taken until the character\'s next action.' },
    { name: 'Cover',     desc: 'Step in front of a party member to take an attack in their place at half damage.' },
    { name: 'Counter',   desc: 'Automatically counter-attack when struck by a physical hit.' },
    { name: 'Recover',   desc: 'Fully restore one character\'s HP.' },
    { name: 'Revive',    desc: 'Revive a KO\'d party member with a small amount of HP.' },
    { name: 'Treatment', desc: 'Remove all abnormal status effects from one party member.' },
    { name: 'Mad Rush',  desc: 'Apply Haste, Berserk, and Protect to all party members simultaneously.' },
    { name: 'LV Down',   desc: 'Lower an enemy\'s level, reducing its stats and changing possible card and item drops.' },
    { name: 'LV Up',     desc: 'Raise an enemy\'s level, increasing its stats and changing possible card and item drops.' },
    { name: 'Kamikaze',  desc: 'Deal massive damage to one enemy based on the user\'s HP, then KO the user.' },
    { name: 'Devour',    desc: 'Consume a low-HP enemy to gain a permanent stat boost or recover HP/status.' },
  ],
  Character: [
    { name: 'HP+20%',     desc: 'Increase maximum HP by 20%.' },
    { name: 'HP+40%',     desc: 'Increase maximum HP by 40%.' },
    { name: 'HP+80%',     desc: 'Increase maximum HP by 80%.' },
    { name: 'HP Bonus',   desc: 'Gain 30 extra maximum HP each time the character levels up.' },
    { name: 'Str+20%',    desc: 'Increase Strength by 20%.' },
    { name: 'Str+40%',    desc: 'Increase Strength by 40%.' },
    { name: 'Str+60%',    desc: 'Increase Strength by 60%.' },
    { name: 'Str Bonus',  desc: 'Gain +1 Strength each time the character levels up.' },
    { name: 'Vit+20%',    desc: 'Increase Vitality by 20%.' },
    { name: 'Vit+40%',    desc: 'Increase Vitality by 40%.' },
    { name: 'Vit Bonus',  desc: 'Gain +1 Vitality each time the character levels up.' },
    { name: 'Mag+20%',    desc: 'Increase Magic by 20%.' },
    { name: 'Mag+40%',    desc: 'Increase Magic by 40%.' },
    { name: 'Mag+60%',    desc: 'Increase Magic by 60%.' },
    { name: 'Mag Bonus',  desc: 'Gain +1 Magic each time the character levels up.' },
    { name: 'Spr+20%',    desc: 'Increase Spirit by 20%.' },
    { name: 'Spr+40%',    desc: 'Increase Spirit by 40%.' },
    { name: 'Spr Bonus',  desc: 'Gain +1 Spirit each time the character levels up.' },
    { name: 'Spd+20%',    desc: 'Increase Speed by 20%.' },
    { name: 'Spd+40%',    desc: 'Increase Speed by 40%.' },
    { name: 'Eva+30%',    desc: 'Increase Evasion by 30%.' },
    { name: 'Luck+50%',   desc: 'Increase Luck by 50%.' },
    { name: 'Auto-Haste',   desc: 'Automatically applies Haste at the start of every battle.' },
    { name: 'Auto-Shell',   desc: 'Automatically applies Shell at the start of every battle.' },
    { name: 'Auto-Protect', desc: 'Automatically applies Protect at the start of every battle.' },
    { name: 'Auto-Reflect', desc: 'Automatically applies Reflect at the start of every battle.' },
    { name: 'Auto-Potion',  desc: 'Automatically uses the best available recovery item when the character takes damage.' },
    { name: 'Expendx2-1',   desc: 'When under the Double status, casting a spell only consumes 1 stock instead of 2.' },
    { name: 'Expendx3-1',   desc: 'When under the Triple status, casting a spell only consumes 1 stock instead of 3.' },
    { name: 'Initiative',   desc: 'The character always acts immediately at the start of battle before any enemy.' },
    { name: 'Move-HP Up',   desc: 'Recover HP slowly while walking on the world map or field.' },
    { name: 'Med Data',     desc: 'Doubles the recovery amount of all medicines used in battle.' },
  ],
  GF: [
    { name: 'Boost',       desc: 'During a GF\'s summon animation, press the Boost button to increase damage output.' },
    { name: 'SumMag+10%',  desc: 'Increase GF attack damage by 10%.' },
    { name: 'SumMag+20%',  desc: 'Increase GF attack damage by 20%.' },
    { name: 'SumMag+30%',  desc: 'Increase GF attack damage by 30%.' },
    { name: 'SumMag+40%',  desc: 'Increase GF attack damage by 40%. (Bahamut, Doomtrain, Eden only)' },
    { name: 'GFHP+10%',   desc: 'Increase the GF\'s HP by 10%.' },
    { name: 'GFHP+20%',   desc: 'Increase the GF\'s HP by 20%.' },
    { name: 'GFHP+30%',   desc: 'Increase the GF\'s HP by 30%.' },
    { name: 'GFHP+40%',   desc: 'Increase the GF\'s HP by 40%. (Bahamut, Doomtrain, Eden only)' },
  ],
  Menu: [
    { name: 'T Mag-RF',       desc: 'Refine Thunder/Wind magic from items (Quezacotl).' },
    { name: 'I Mag-RF',       desc: 'Refine Water/Ice magic from items (Shiva).' },
    { name: 'F Mag-RF',       desc: 'Refine Fire magic from items (Ifrit).' },
    { name: 'Mid Mag-RF',     desc: 'Refine mid-level magic from lower-level magic.' },
    { name: 'High Mag-RF',    desc: 'Refine high-level magic from other magic.' },
    { name: 'L Mag-RF',       desc: 'Refine Life/Recovery magic from items.' },
    { name: 'ST Mag-RF',      desc: 'Refine status-inflicting magic from items.' },
    { name: 'Time Mag-RF',    desc: 'Refine Time/Space magic (Slow, Stop, Haste, etc.) from items.' },
    { name: 'Supt Mag-RF',    desc: 'Refine Support magic (Protect, Shell, Regen, etc.) from items.' },
    { name: 'Forbid Mag-RF',  desc: 'Refine forbidden/high-tier magic (Flare, Ultima, etc.) from items.' },
    { name: 'Recov Med-RF',   desc: 'Refine recovery items (Potions, Elixirs, etc.) from items.' },
    { name: 'GFRecov Med-RF', desc: 'Refine GF recovery items from other items.' },
    { name: 'ST Med-RF',      desc: 'Refine status-curing items from other items.' },
    { name: 'Forbid Med-RF',  desc: 'Refine forbidden/rare medicines (Hero, Holy War, etc.) from items.' },
    { name: 'GFAbl Med-RF',   desc: 'Refine items that teach new abilities to GFs.' },
    { name: 'Med LV Up',      desc: 'Convert lower-level recovery items into higher-level ones.' },
    { name: 'Card Mod',       desc: 'Convert Triple Triad cards into items. Essential for obtaining rare materials.' },
    { name: 'Ammo-RF',        desc: 'Refine ammunition for Irvine\'s Limit Break from items.' },
    { name: 'Tool-RF',        desc: 'Refine battle items (Remedy, Phoenix Down, etc.) from other items.' },
    { name: 'Call Shop',      desc: 'Access the Esthar, Balamb, or Timber shops from the menu without visiting.' },
    { name: 'Junk Shop',      desc: 'Access the Junk Shop for weapon upgrades from the menu without visiting.' },
    { name: 'Haggle',         desc: 'Reduce shop purchase prices by 25%.' },
    { name: 'Sell-High',      desc: 'Increase item sell prices by up to 50%.' },
    { name: 'Familiar',       desc: 'Unlock rare stock items that shops only sell once Tonberry\'s Familiar is active.' },
  ],
  Party: [
    { name: 'Enc-Half',  desc: 'Reduce random encounter rate by 50%.' },
    { name: 'Enc-None',  desc: 'Eliminate all random encounters on the field and world map. Requires Enc-Half first.' },
    { name: 'Move-Find', desc: 'Reveal hidden Save Points and Draw Points visible only as faint sparkles.' },
    { name: 'Alert',     desc: 'Prevent back attacks (enemies surrounding the party from behind).' },
    { name: 'Rare Item', desc: 'Increases the chance of receiving an item from an enemy at the end of battle.' },
  ],
}

// ─── Colors ────────────────────────────────────────────────────────────────────

const CATEGORY_COLORS: Record<AbilityCategory, { tab: string; badge: string; dot: string }> = {
  Junction:  { tab: 'text-sky-400',     badge: 'bg-sky-900/40 text-sky-300 border-sky-700/50',         dot: 'bg-sky-500' },
  Command:   { tab: 'text-rose-400',    badge: 'bg-rose-900/40 text-rose-300 border-rose-700/50',       dot: 'bg-rose-500' },
  Character: { tab: 'text-teal-400',    badge: 'bg-teal-900/40 text-teal-300 border-teal-700/50',       dot: 'bg-teal-500' },
  GF:        { tab: 'text-violet-400',  badge: 'bg-violet-900/40 text-violet-300 border-violet-700/50', dot: 'bg-violet-500' },
  Menu:      { tab: 'text-amber-400',   badge: 'bg-amber-900/40 text-amber-300 border-amber-700/50',    dot: 'bg-amber-500' },
  Party:     { tab: 'text-emerald-400', badge: 'bg-emerald-900/40 text-emerald-300 border-emerald-700/50', dot: 'bg-emerald-500' },
}

// ─── Types ────────────────────────────────────────────────────────────────────

interface AbilityEntry extends AbilityDef {
  category: AbilityCategory
  teachers: { gfName: string; ap: number }[]
}

interface Props {
  gfs: GuardianForce[]
}

// ─── Component ────────────────────────────────────────────────────────────────

export function AbilitiesView({ gfs }: Props) {
  const [activeCategory, setActiveCategory] = useState<AbilityCategory | 'All'>('All')
  const [filter, setFilter] = useState('')

  const abilities = useMemo<AbilityEntry[]>(() => {
    const teacherMap = new Map<string, { gfName: string; ap: number }[]>()
    for (const gf of gfs) {
      for (const ab of gf.abilities) {
        if (!teacherMap.has(ab.name)) teacherMap.set(ab.name, [])
        teacherMap.get(ab.name)!.push({ gfName: gf.name, ap: ab.ap })
      }
    }
    const result: AbilityEntry[] = []
    for (const [cat, defs] of Object.entries(CATEGORIES) as [AbilityCategory, AbilityDef[]][]) {
      for (const def of defs) {
        result.push({ ...def, category: cat, teachers: teacherMap.get(def.name) ?? [] })
      }
    }
    return result
  }, [gfs])

  const visible = useMemo(() => {
    const q = filter.trim().toLowerCase()
    return abilities.filter(ab => {
      const catMatch = activeCategory === 'All' || ab.category === activeCategory
      const textMatch = !q ||
        ab.name.toLowerCase().includes(q) ||
        ab.desc.toLowerCase().includes(q) ||
        ab.teachers.some(t => t.gfName.toLowerCase().includes(q))
      return catMatch && textMatch
    })
  }, [abilities, activeCategory, filter])

  const categories = Object.keys(CATEGORIES) as AbilityCategory[]
  const counts = useMemo(() => {
    const m: Partial<Record<AbilityCategory, number>> = {}
    for (const ab of abilities) m[ab.category] = (m[ab.category] ?? 0) + 1
    return m
  }, [abilities])

  return (
    <div className="max-w-3xl mx-auto space-y-3">
      {/* Filter + category tabs */}
      <div className="space-y-2">
        <input
          type="text"
          placeholder="Filter by ability, description, or GF…"
          value={filter}
          onChange={e => setFilter(e.target.value)}
          className="w-full bg-slate-800/60 border border-slate-700/50 rounded-lg px-3 py-1.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-teal-500/50"
        />
        <div className="flex flex-wrap gap-1.5">
          <button
            onClick={() => setActiveCategory('All')}
            className={cn(
              'px-2.5 py-1 rounded-md text-[11px] font-medium border transition-colors',
              activeCategory === 'All'
                ? 'bg-slate-700 text-slate-100 border-slate-500'
                : 'text-slate-500 border-slate-700/40 hover:text-slate-300'
            )}
          >
            All ({abilities.length})
          </button>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={cn(
                'px-2.5 py-1 rounded-md text-[11px] font-medium border transition-colors',
                activeCategory === cat
                  ? cn('bg-slate-800 border-current', CATEGORY_COLORS[cat].tab)
                  : 'text-slate-500 border-slate-700/40 hover:text-slate-300'
              )}
            >
              {cat} ({counts[cat] ?? 0})
            </button>
          ))}
        </div>
      </div>

      {/* Ability rows */}
      <div className="divide-y divide-slate-800/60">
        {visible.length === 0 && (
          <p className="text-xs text-slate-500 py-8 text-center">No abilities match.</p>
        )}
        {visible.map(ab => {
          const colors = CATEGORY_COLORS[ab.category]
          // Determine typical AP cost: non-zero is the learn cost; 0 = pre-learned on that GF
          const learnCost = ab.teachers.find(t => t.ap > 0)?.ap
          return (
            <div key={ab.name} className="py-3 grid grid-cols-[1fr_auto] gap-x-4 gap-y-1">
              <div className="space-y-0.5">
                {/* Name row */}
                <div className="flex items-center gap-2">
                  {activeCategory === 'All' && (
                    <span className={cn(
                      'shrink-0 text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded border',
                      colors.badge
                    )}>
                      {ab.category}
                    </span>
                  )}
                  <span className="text-sm font-semibold text-white">{ab.name}</span>
                  {learnCost !== undefined && (
                    <span className="text-[10px] text-slate-500">{learnCost} AP</span>
                  )}
                </div>
                {/* Description */}
                <p className="text-[11px] text-slate-400 leading-snug">{ab.desc}</p>
              </div>

              {/* GF tags — right-aligned */}
              <div className="flex flex-wrap gap-1 justify-end content-start max-w-[280px]">
                {ab.teachers.length === 0 ? (
                  <span className="text-[10px] text-slate-600 italic self-start mt-1">Item-taught only</span>
                ) : ab.teachers.map(t => (
                  <span
                    key={t.gfName}
                    className={cn(
                      'text-[10px] rounded px-1.5 py-0.5 border',
                      t.ap === 0
                        ? 'bg-slate-800/80 border-slate-600/50 text-slate-300'
                        : 'bg-slate-800/40 border-slate-700/40 text-slate-400'
                    )}
                    title={t.ap === 0 ? `${t.gfName} — pre-learned` : `${t.gfName} — ${t.ap} AP`}
                  >
                    {t.gfName}
                    {t.ap > 0 && <span className="text-slate-600 ml-1">{t.ap}</span>}
                    {t.ap === 0 && <span className="text-slate-500 ml-1">★</span>}
                  </span>
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
