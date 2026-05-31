/**
 * buildMaster.mjs — Zero-Loss Data Compiler (Strict Mode)
 * Produces src/data/ff8_master.json
 *
 * Strict bans: ASCII art (maps, banners, borders), metadata noise (views,
 * author signatures, forum artifacts). Item/weapon/refinement lists MUST be
 * preserved and reworded.
 *
 * Output schema:
 *   { meta, chapters[], checklists: { achievements[], missables[] },
 *     lookup: { gfs[], cards[], refinement[], items[], weapons[], enemies[] } }
 */
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs'
import { load as cheerioLoad } from 'cheerio'
import { createHash } from 'crypto'
import { CHAPTER_CONTENT, CHAPTER_ENCOUNTERS, REFERENCE_CHAPTERS } from './chapterContent.mjs'

const EXT  = new URL('../external/', import.meta.url).pathname
const DIST = new URL('../src/data/', import.meta.url).pathname
const TMP  = new URL('../temp/', import.meta.url).pathname

const read = (f) => readFileSync(EXT + f, 'utf8')

function ensureDir(p) {
  if (!existsSync(p)) mkdirSync(p, { recursive: true })
}
ensureDir(TMP)

// ─── Stable ID helpers ────────────────────────────────────────────────────────
function slugify(s) {
  return s.toLowerCase()
    .replace(/\+/g, '-plus')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}
function stableId(prefix, title) {
  const h = createHash('md5').update(title).digest('hex').slice(0, 6)
  return `${prefix}-${slugify(title)}-${h}`
}

// ─── 34 Official FFVIII Remastered Achievements (Steam ground truth) ─────────
// Source verified against: lylat Steam Achievement Guide + AS Perfection Challenge
// Excluded achievements (not in Remastered): Contrived Finish, 10000 Kills, Collector
const ACHIEVEMENTS_34 = [
  // Cumulative — begin tracking from Disc 1 start
  { id: 'ach-magic-miner',  title: 'Magic Miner',    description: 'Draw magic 100 times from draw points throughout the game. Activate the Move-Find ability (Siren) to reveal hidden field draw points. Begin drawing every draw point encountered from the start.', type: 'cumulative', disc: 1, chapterHint: 'd1-preparing-for-the-exam' },
  { id: 'ach-magician',     title: 'Magician',        description: 'Draw (Stock) magic from enemies 100 times in battle. Junction the Draw command to a character before each encounter to ensure actions are counted. Draw from every enemy throughout the game.', type: 'cumulative', disc: 1, chapterHint: 'd1-preparing-for-the-exam' },
  { id: 'ach-100-kills',    title: '100 Kills',       description: 'Defeat 100 enemies. Achieved through standard story progression. If using the No Encounters booster or running from battles, disable it during normal play to accrue kills naturally.', type: 'cumulative', disc: 1, chapterHint: 'd1-preparing-for-the-exam' },
  { id: 'ach-1000-kills',   title: '1000 Kills',      description: 'Defeat 1,000 enemies. Achieved through normal progression by disc 3. If short, grind at the Island Closest to Hell (northeast of Esthar) after obtaining Ragnarok — enemies are weak to Quistis\'s Degenerator.', type: 'cumulative', disc: 3, chapterHint: 'd3-back-on-earth' },

  // GF unlocks
  { id: 'ach-quezacotl',  title: 'Quezacotl',  description: 'Unlock Guardian Force Quezacotl. Interact with the desk in Squall\'s classroom, select "Turn on the power," then "Tutorials." Quistis forces acquisition at the front gate if missed.', type: 'gf', disc: 1, chapterHint: 'd1-preparing-for-the-exam' },
  { id: 'ach-shiva',      title: 'Shiva',      description: 'Unlock Guardian Force Shiva. Obtained simultaneously with Quezacotl via the classroom desk tutorial sequence at Balamb Garden.', type: 'gf', disc: 1, chapterHint: 'd1-preparing-for-the-exam' },
  { id: 'ach-ifrit',      title: 'Ifrit',      description: 'Unlock Guardian Force Ifrit. Defeat Ifrit in the Fire Cavern east of Balamb Garden within the chosen time limit. A 10-minute limit is sufficient.', type: 'gf', disc: 1, chapterHint: 'd1-preparing-for-the-exam' },
  { id: 'ach-siren',      title: 'Siren',      description: 'Unlock Guardian Force Siren. Draw Siren from Elvoret atop the Dollet Radio Tower. Missable — only opportunity in the game.', type: 'gf', disc: 1, chapterHint: 'd1-the-seed-exam' },
  { id: 'ach-diablos',    title: 'Diablos',    description: 'Unlock Guardian Force Diablos. Use the Magical Lamp (received from Cid after graduation) to trigger the Diablos battle. Save beforehand; cast Demi twice to reduce its HP, then defeat it.', type: 'gf', disc: 1, chapterHint: 'd1-after-the-exam' },
  { id: 'ach-brothers',   title: 'Brothers',   description: 'Unlock Guardian Force Brothers (Sacred + Minotaur). Complete the Tomb of the Unknown King northeast of Deling City. At every 4-way crossroad, take the right-hand route to reach each directional chamber.', type: 'gf', disc: 1, chapterHint: 'd1-deling-city' },
  { id: 'ach-carbuncle',  title: 'Carbuncle',  description: 'Unlock Guardian Force Carbuncle. Draw from the Iguion bosses during the Deling City assassination attempt. Both Iguions must still be present when the draw occurs.', type: 'gf', disc: 1, chapterHint: 'd1-deling-city' },
  { id: 'ach-leviathan',  title: 'Leviathan',  description: 'Unlock Guardian Force Leviathan. Missable — draw from NORG aboard Balamb Garden. Damage the pod to expose NORG\'s body, then draw Leviathan immediately.', type: 'gf', disc: 2, chapterHint: 'd2-return-to-balamb-garden' },
  { id: 'ach-tonberry',   title: 'Tonberry',   description: 'Unlock Guardian Force Tonberry. Defeat at least 20 Tonberries in the Centra Ruins to trigger the Tonberry King encounter; GF awarded upon victory. The Tonberry King will appear the next time a Tonberry battle ends in the correct scene, so keep hunting until it appears.', type: 'gf', disc: 2, chapterHint: 'd2-exploring-the-world' },
  { id: 'ach-pandemona',  title: 'Pandemona',  description: 'Unlock Guardian Force Pandemona. Missable — draw from Fujin during the boss fight in Balamb Town.', type: 'gf', disc: 2, chapterHint: 'd2-return-to-balamb' },
  { id: 'ach-cerberus',   title: 'Cerberus',   description: 'Unlock Guardian Force Cerberus. Located in the main hall of Galbadia Garden — interact to initiate battle. Missable — must be obtained before proceeding past this point.', type: 'gf', disc: 2, chapterHint: 'd2-battle-of-the-gardens' },
  { id: 'ach-alexander',  title: 'Alexander',  description: 'Unlock Guardian Force Alexander. Missable — defeat Seifer in the auditorium, then draw Alexander from Edea before she is defeated.', type: 'gf', disc: 2, chapterHint: 'd2-battle-of-the-gardens' },
  { id: 'ach-cactuar',    title: 'Cactuar',    description: 'Unlock Guardian Force Cactuar. After obtaining Ragnarok, locate Cactuar Island (small island off the eastern coast of the Esthar continent). Interact with Jumbo Cactuar on the world map to begin the encounter.', type: 'gf', disc: 3, chapterHint: 'd3-back-on-earth' },
  { id: 'ach-doomtrain',  title: 'Doomtrain',  description: 'Unlock Guardian Force Doomtrain. Acquire the Solomon Ring from Tears\' Point (near Esthar). Collect 6× Remedy+, 6× Steel Pipe, and 6× Malboro Tentacle, then use the Solomon Ring from the Items menu.', type: 'gf', disc: 3, chapterHint: 'd3-esthar' },
  { id: 'ach-bahamut',    title: 'Bahamut',    description: 'Unlock Guardian Force Bahamut. Navigate to the core of the Deep Sea Research Center (southwest of Esthar). At the steam room panel choose: "It\'s not our will to fight" → "Never" → the bottom option. Awarded upon victory.', type: 'gf', disc: 3, chapterHint: 'd3-back-on-earth' },
  { id: 'ach-eden',       title: 'Eden',       description: 'Unlock Guardian Force Eden. Draw from Ultima Weapon deep in the Deep Sea Research Center after defeating Bahamut. Last opportunity: draw from Tiamat in Ultimecia\'s Castle on Disc 4.', type: 'gf', disc: 3, chapterHint: 'd3-back-on-earth' },

  // Story / side-quest
  { id: 'ach-first-salary',      title: 'First Salary',      description: 'Receive the first SeeD salary. Awarded automatically after the Training Center incident and the return to the dormitory.', type: 'story', disc: 1, chapterHint: 'd1-after-the-exam' },
  { id: 'ach-timber-maniacs',    title: 'Timber Maniacs',    description: 'Collect all 12 Timber Maniacs magazines. Locations span the full game: Balamb Hotel, Timber Maniacs Office, Timber Hotel, Deling City Hotel, Dollet Hotel, Dollet Pub, FH Inn, FH rail dead-end house, Shumi Village, Trabia Garden Graveyard, Edea\'s Orphanage, White SeeD Ship.', type: 'story', disc: 3, chapterHint: 'd3-the-aftermath' },
  { id: 'ach-card-player',       title: 'Card Player',       description: 'Play a game of Triple Triad. Press Square near any NPC who accepts card challenges to initiate a match.', type: 'story', disc: 2, chapterHint: 'd2-return-to-balamb-garden' },
  { id: 'ach-loser',             title: 'Loser',             description: 'Lose a rare card (Level 5+) in a Triple Triad match via the Trade Rule. Intentionally losing to the Queen of Cards in Balamb is the standard method.', type: 'story', disc: 2, chapterHint: 'd2-return-to-balamb-garden' },
  { id: 'ach-cards-club-master', title: 'Cards Club Master', description: 'Defeat every CC Group member at Triple Triad. Order: Jack (Main Hall) → Joker (Training Center docks) → Club (Dormitory corridor) → Diamond (below Directory) → Spade (2F, post-Norg) → Heart (Bridge, challenge Xu) → King (dormitory bed rest event, post-Kadowaki hint).', type: 'story', disc: 2, chapterHint: 'd2-fishermans-horizon' },
  { id: 'ach-chocobo',           title: 'Chocobo',           description: 'Capture a Chocobo. Visit the Beginner Forest (northernmost continent near Shumi Village). Purchase ChocoWhis for 1,000 Gil, then use the whistle in the upper-left corner where only one Chicobo appears.', type: 'story', disc: 2, chapterHint: 'd2-trabia-garden' },
  { id: 'ach-ragnarok',          title: 'Ragnarok',          description: 'Acquire the Ragnarok airship. Obtained automatically during the Lunar Base sequence on Disc 3. After Lunatic Pandora launches, board the Ragnarok and clear the color-coded monster pairs in sequence to prevent revival.', type: 'story', disc: 3, chapterHint: 'd3-lunar-base' },
  { id: 'ach-handyman',          title: 'Handyman',          description: 'Upgrade any weapon at a Junk Shop using the Remodel command. The first full Junk Shop access is at Fisherman\'s Horizon. The Lionheart (Squall\'s ultimate weapon) requires 1× Adamantine, 4× Dragon Fang, and 12× Pulse Ammo.', type: 'story', disc: 2, chapterHint: 'd2-fishermans-horizon' },
  { id: 'ach-obel-lake-secret',  title: 'Obel Lake Secret',  description: 'Complete the Obel Lake side quest. Hum at the lake peninsula (Trabia continent) → find Mr. Monkey near Dollet → collect 4 stone inscriptions across the world map → decode "TREASUREATMINDEISLE" → retrieve Luck-J Scroll at Minde Isle. Must be completed before Disc 4.', type: 'story', disc: 3, chapterHint: 'd3-back-on-earth' },
  { id: 'ach-ufo',               title: 'UFO',               description: 'Complete PuPu\'s side quest. Witness UFO sightings at: Mandy Beach, Kashkabald Desert, Winhill Bluffs, Heath Peninsula, and Grandidi Forest. Return to the original Balamb Garden crash site with 5× Elixir and the Item command junctioned; give PuPu all 5 Elixirs.', type: 'story', disc: 3, chapterHint: 'd3-back-on-earth' },
  { id: 'ach-omega-destroyed',   title: 'Omega Destroyed',   description: 'Defeat Omega Weapon in Ultimecia\'s Castle. Station the primary party near the chapel, switch to the reserve party, ring the bell in the room before the art gallery to spawn Omega, then engage with the primary party. Card Mod the Gilgamesh Card → 10× Holy War for full party invincibility.', type: 'story', disc: 4, chapterHint: 'd4-ultimecia-castle' },
  { id: 'ach-end-of-game',       title: 'End of Game',       description: 'Complete Final Fantasy VIII Remastered. Defeat Ultimecia at the culmination of the Time Compression sequence.', type: 'story', disc: 4, chapterHint: 'd4-the-final-battle' },
  { id: 'ach-top-rank',          title: 'Top Rank',          description: 'Reach SeeD Rank A (maximum). Pass SeeD Tests 1–30 via Menu → Tutorial → TEST. All 30 test answers are available in the SeeD Test guide (Split Infinity). Best done starting from Disc 2 when tests unlock.', type: 'story', disc: 2, chapterHint: 'd2-return-to-balamb-garden' },
  { id: 'ach-maximum-hp',        title: 'Maximum HP',        description: 'Reach 9,999 HP on any character. Junction HP+80% (from Diablos/Brothers) and HP+40%/HP+20% abilities. Grind levels at the Island Closest to Hell (northeast of Esthar) after obtaining Ragnarok for simultaneous AP and EXP.', type: 'story', disc: 3, chapterHint: 'd3-back-on-earth' },
]

const ACH_BY_CHAPTER = ACHIEVEMENTS_34.reduce((m, a) => {
  if (a.chapterHint) { m[a.chapterHint] = m[a.chapterHint] ?? []; m[a.chapterHint].push(a) }
  return m
}, {})

// ─── ASCII art / noise detection ─────────────────────────────────────────────
// STRICT policy: eliminate all decorative borders, text maps, and metadata.
const NOISE_PATTERNS = [
  /^Oo[*=-]/,                        // Oo*=-*=- decorative borders
  /^=[-=*]{10,}/,                    // ==== dividers
  /^-{10,}/,                         // ---- dividers
  /^~{5,}/,                          // ~~~~~ dividers
  /^\|\|.*\{[A-Z0-9-]+\}.*\|\|/,     // section tags ||{TAG}||
  /^\.={5,}/,                        // .====
  /^\|={5,}/,                        // |====
  /^'={5,}/,                         // '====
  /^\|[-=]{10,}\|/,                  // |---| table borders
  /^LV RANGE\s*\|/,                  // enemy stat block header row
  /^LV\s+\|\s+HP\s+\|\s+Strength/,  // enemy basic stats header
  /^FIRE\s+\|\s+ICE\s+\|\s+THNDR/,  // elemental affinities header
  /^KO\s+\|\s+POI\s+\|\s+PTR/,      // status affinities header
  /^DOO\s+\|\s+PET/,                 // status affinities continued
  /^[- ]{3,}(CHECKLIST|WALKTHROUGH|SECTION)/i,
  /^Views:|^By:|^Comments:|^Contributed by:/i,
  /https?:\/\/\S+/,                  // URLs
  /YouTube™ Video:/i,
  /^Page \d+/i,
  /^\s*WORK IN PROGRESS/i,
  /^\s*\*HIGHLY\* OPTIONAL:/i,
  /^\[PERFECT GAME NOTES?\]/i,
  /^~{3,}.*~{3,}$/,                  // ~~~text~~~ decorative lines
]

function isNoise(line) {
  const t = line.trim()
  if (!t) return false
  for (const p of NOISE_PATTERNS) if (p.test(t)) return true
  // Lines ≥20 chars that are <50% alphanumeric+space → ASCII art (maps, corridors)
  const alpha = (t.match(/[a-zA-Z0-9 ]/g) ?? []).length
  if (t.length >= 20 && alpha / t.length < 0.5) return true
  return false
}

// ASCII map block detector: .--- ... '--- bounding boxes used as text maps
// Also catches embedded openers like "====  .---..." (chocobo forest maps).
// Must NOT match ".=====..." boss box openers (those start with "." not "=").
function isMapBorderOpen(line)  { return /^\s*\.-{3,}/.test(line) || /^={5,}\s.*\.-{3,}/.test(line) }
function isMapBorderClose(line) { return /^\s*'-{3,}/.test(line) }

// ─── Voice rewriter (Modern Technical Wiki) ──────────────────────────────────
function rewriteVoice(text) {
  return text
    .replace(/\bI suggest\b/gi, 'It is recommended')
    .replace(/\bI recommend\b/gi, 'Recommended:')
    .replace(/\bI'm not saying\b/gi, 'Note:')
    .replace(/\b(I|me)\b(?!\s*Mag-RF)/g, '')
    .replace(/\b(my|our|we|us)\b/gi, '')
    .replace(/\bI\s+/g, '')
    .replace(/\bbasically\b/gi, '')
    .replace(/\bjust so you know\b/gi, '')
    .replace(/\blike the guy said\b/gi, '')
    .replace(/\bguess what\?/gi, '')
    .replace(/\byou'?re free to explore them if you wish\b/gi, 'exploration is optional')
    .replace(/\bwhich is quite generous in comparison to\b/gi, 'compared to')
    .replace(/\bdon'?t forget to\b/gi, 'Ensure')
    .replace(/\bdon'?t worry about\b/gi, 'Note:')
    .replace(/\balot\b/gi, 'a great deal of')
    .replace(/\ba lot\b/gi, 'significantly')
    .replace(/\bbenificial\b/gi, 'beneficial')
    .replace(/\bcarfully\b/gi, 'carefully')
    .replace(/  +/g, ' ')
    .trim()
}

// ─── Boss box extractor ───────────────────────────────────────────────────────
function extractBossBox(lines, startIdx) {
  const raw = []
  let i = startIdx
  while (i < lines.length && !lines[i].startsWith("'==")) {
    raw.push(lines[i])
    i++
  }
  const text = raw.join('\n')

  const nameM   = text.match(/\|Name:\s*([^|]+?)\s*\|/)
  const lvM     = text.match(/Level Range:\s*([\d]+(?:\s*[-~]\s*[\d]+)?)/)
  const hpM     = text.match(/HP Range:\s*([\d,]+(?:\s*[-~]\s*[\d,]+)?)/)
  const apM     = text.match(/\|\s*AP:\s*(\d+)/)
  const expM    = text.match(/\|\s*EXP:\s*(\d[\d,]*)/)
  const elemM   = text.match(/Elemental Weakness(?:es)?:\s*([^\n|]+?)(?:\s*\||$)/m)
  const statusM = text.match(/Status Weakness(?:es)?:\s*([^\n|]+?)(?:\s*\||$)/m)
  const stealM  = text.match(/STEAL LIST[^:]*:\s*([^\n|]+?)(?:\s*\||$)/m)
  const cardM   = text.match(/Card Drop:\s*([^\n|]+?)(?:\s*\||$)/m)

  if (!nameM) return { end: i + 1, md: '' }

  const clean = (s) => s?.trim().replace(/\s+/g, ' ') ?? ''

  // SI source gives authoritative full-range HP for bosses where AS only covers Lv 1-10
  const BOSS_HP_OVERRIDES = { 'Adel': '6,000 - 51,000' }

  // Correct draw list errors in the AS walkthrough (verified against FF8 wiki)
  const BOSS_DRAW_OVERRIDES = {
    // AS incorrectly lists Cura for all tiers; wiki confirms Cure→Cura→Curaga scaling
    'Diablos': 'Lv 1-19: Cure, Demi | Lv 20-29: Cura, Demi | Lv 30+: Curaga, Demi, Holy, Flare',
  }

  const bossName = clean(nameM[1])
  const hpVal = BOSS_HP_OVERRIDES[bossName] ?? (hpM ? clean(hpM[1]) : null)

  // Capture all draw tier lines (Lvl 1-19 / Lvl 20-29 / Lvl 30+)
  const drawTierRe = /(?:DRAW LIST[^|]*?|(?<=\n)\s*\|)\s*(Lvl\s+[\d+\-]+\s*:\s*[A-Za-z][^\n|]+?)(?:\s*\|)/g
  const allDrawTiers = [...text.matchAll(drawTierRe)]
    .map(m => clean(m[1]))
    .filter(s => s.startsWith('Lvl') || s.startsWith('lvl'))
  // Build draw string: if all tiers have same spells → collapse to one; else show all
  let draw = ''
  if (BOSS_DRAW_OVERRIDES[bossName]) {
    draw = BOSS_DRAW_OVERRIDES[bossName]
  } else if (allDrawTiers.length > 0) {
    const spellsOnly = allDrawTiers.map(t => t.replace(/^Lvl\s+[\d+\-]+\s*:\s*/i, '').trim())
    const allSame = spellsOnly.every(s => s === spellsOnly[0])
    if (allSame) {
      draw = spellsOnly[0]  // single clean list, no level label needed
    } else {
      draw = allDrawTiers.join(' | ')  // show all tiers: "Lvl 1-19: Fire | Lvl 30+: Firaga"
    }
  }

  let md = `**Boss: ${bossName}**`
  if (lvM) md += ` (Lv ${clean(lvM[1])})`
  if (hpVal) md += ` — HP: ${hpVal}`
  if (apM) md += ` | AP: ${apM[1]}`
  if (expM && expM[1] !== '0') md += ` | EXP: ${expM[1]}`

  const bullets = []
  const elem   = elemM   ? clean(elemM[1])   : ''
  const status = statusM ? clean(statusM[1]) : ''
  const steal  = stealM  ? clean(stealM[1])  : ''
  const card   = cardM   ? clean(cardM[1])   : ''

  if (elem   && elem   !== '---') bullets.push(`Weakness: ${elem}`)
  if (status && status !== '---') bullets.push(`Status weak: ${status}`)
  if (draw   && draw   !== '---') bullets.push(`Draw: ${draw}`)
  if (steal  && steal  !== '---') bullets.push(`Steal: ${steal}`)
  if (card   && card   !== '---' && !/none/i.test(card)) bullets.push(`Card drop: ${card}`)

  if (bullets.length) md += '\n- ' + bullets.join('\n- ')

  return { end: i + 1, md }
}

// ─── Walkthrough prose parser ─────────────────────────────────────────────────
function parseWalkthroughProse() {
  const raw   = read('Walkthroughs/Absolute_Steve-Walkthrough.txt')
  const lines = raw.split('\n')

  const chapterRe       = /\|\|\s*\{(\d+)\}\s+(.+?)\s*\|\|/
  const checklistBorder = /Oo\*=-.*oO/

  const chapters = {}
  let currentChIdx = null
  let buffer       = []
  let inChecklistBox   = false
  let inBossBox        = false
  let inMapBlock       = false
  let checklistCount   = 0

  const flushParagraph = () => {
    if (!currentChIdx) return
    const text = buffer.filter(l => l.trim()).join(' ').trim()
    if (text.length > 30) {
      const rw = rewriteVoice(text)
      if (rw.length > 20) chapters[currentChIdx].paragraphs.push(rw)
    }
    buffer = []
  }

  let i = 0
  while (i < lines.length) {
    const line = lines[i]
    const trim = line.trim()

    // ── Chapter header ──────────────────────────────────────────────────────
    const chMatch = trim.match(chapterRe)
    if (chMatch) {
      if (currentChIdx) flushParagraph()
      currentChIdx   = parseInt(chMatch[1])
      inChecklistBox = true
      checklistCount = 0
      inBossBox      = false
      inMapBlock     = false
      if (!chapters[currentChIdx]) {
        chapters[currentChIdx] = {
          title: chMatch[2].replace(/CHECKLIST\s*$/, '').trim(),
          paragraphs: [],
        }
      }
      i++; continue
    }

    if (!currentChIdx) { i++; continue }

    // ── Skip checklist preamble box (until 2nd Oo*= border) ────────────────
    if (inChecklistBox) {
      if (checklistBorder.test(trim)) {
        checklistCount++
        if (checklistCount >= 2) inChecklistBox = false
      }
      i++; continue
    }

    // ── ASCII map block (between .--- and '--- delimiters) ─────────────────
    if (isMapBorderOpen(line)) { inMapBlock = true; i++; continue }
    if (inMapBlock) {
      if (isMapBorderClose(line)) inMapBlock = false
      i++; continue
    }

    // ── Boss stat box (.=== ... '===) ───────────────────────────────────────
    if (trim.startsWith('.===')) {
      flushParagraph()
      const { end, md } = extractBossBox(lines, i)
      if (md) chapters[currentChIdx].paragraphs.push(md)
      i = end; continue
    }
    if (inBossBox) {
      if (trim.startsWith("'==")) inBossBox = false
      i++; continue
    }

    // ── Skip global noise ───────────────────────────────────────────────────
    if (isNoise(line)) { i++; continue }

    // ── [OPTIONAL] / [PERFECT GAME] markers = paragraph break ──────────────
    if (trim.match(/^\[OPTIONAL\]|^\[PERFECT GAME/i)) { flushParagraph(); i++; continue }

    // ── Empty line = paragraph break ────────────────────────────────────────
    if (!trim) { flushParagraph(); i++; continue }

    buffer.push(trim)
    i++
  }
  if (currentChIdx) flushParagraph()

  return chapters
}

// ─── Story chapter whitelist (35 canonical chapters) ─────────────────────────
const STORY_CHAPTERS = [
  { id: 'd1-preparing-for-the-exam',        title: 'Preparing for the Exam',           disc: 1 },
  { id: 'd1-the-seed-exam',                 title: 'The SeeD Exam',                    disc: 1 },
  { id: 'd1-after-the-exam',                title: 'After the Exam',                   disc: 1 },
  { id: 'd1-the-timber-mission',            title: 'The Timber Mission',               disc: 1 },
  { id: 'd1-dollet-exploration',            title: 'Dollet Exploration',               disc: 1 },
  { id: 'd1-journey-to-galbadia-garden',    title: 'Journey to Galbadia Garden',       disc: 1 },
  { id: 'd1-galbadia-garden',               title: 'Galbadia Garden',                  disc: 1 },
  { id: 'd1-deling-city',                   title: 'Deling City',                      disc: 1 },
  { id: 'd2-winhill',                       title: 'Winhill',                          disc: 2 },
  { id: 'd2-the-escape',                    title: 'The Escape',                       disc: 2 },
  { id: 'd2-missile-base',                  title: 'Missile Base',                     disc: 2 },
  { id: 'd2-return-to-balamb-garden',       title: 'Return to Balamb Garden',          disc: 2 },
  { id: 'd2-fishermans-horizon',            title: "Fisherman's Horizon",              disc: 2 },
  { id: 'd2-the-garden-festival',           title: 'The Garden Festival',              disc: 2 },
  { id: 'd2-exploring-the-world',           title: 'Exploring the World',              disc: 2 },
  { id: 'd2-return-to-balamb',              title: 'Return to Balamb',                 disc: 2 },
  { id: 'd2-trabia-garden',                 title: 'Trabia Garden',                    disc: 2 },
  { id: 'd2-battle-of-the-gardens',         title: 'Battle of the Gardens',            disc: 2 },
  { id: 'd3-the-aftermath',                 title: 'The Aftermath',                    disc: 3 },
  { id: 'd3-trabia-canyon',                 title: 'Trabia Canyon',                    disc: 3 },
  { id: 'd3-picking-up-the-trail',          title: 'Picking Up the Trail',             disc: 3 },
  { id: 'd3-journey-to-the-silent-country', title: 'Journey to the Silent Country',    disc: 3 },
  { id: 'd3-the-resistance',                title: 'The Resistance',                   disc: 3 },
  { id: 'd3-esthar',                        title: 'Esthar',                           disc: 3 },
  { id: 'd3-siege-of-esthar',               title: 'Siege of Esthar',                  disc: 3 },
  { id: 'd3-lunar-base',                    title: 'Lunar Base',                       disc: 3 },
  { id: 'd3-ragnarok',                      title: 'Ragnarok',                         disc: 3 },
  { id: 'd3-back-on-earth',                 title: 'Back on Earth',                    disc: 3 },
  { id: 'd3-the-final-mission',             title: 'The Final Mission',                disc: 3 },
  { id: 'd4-the-awakening',                 title: 'The Awakening',                    disc: 4 },
  { id: 'd4-commencement-room',             title: 'Commencement Room',                disc: 4 },
  { id: 'd4-ultimecia-castle',              title: "Ultimecia's Castle",               disc: 4 },
  { id: 'd4-final-preparations',            title: 'Final Preparations',               disc: 4 },
  { id: 'd4-the-final-battle',              title: 'The Final Battle',                 disc: 4 },
]

// AS chapter index → bover chapter id
const AS_MAP = {
  'd1-preparing-for-the-exam':         1,
  'd1-the-seed-exam':                  2,
  'd1-after-the-exam':                 3,
  'd1-the-timber-mission':             4,
  'd1-dollet-exploration':             5,
  'd1-journey-to-galbadia-garden':     6,
  'd1-deling-city':                    7,
  'd2-winhill':                        8,
  'd2-the-escape':                     9,
  'd2-missile-base':                   10,
  'd2-return-to-balamb-garden':        11,
  'd2-fishermans-horizon':             12,
  'd2-the-garden-festival':            13,
  'd2-return-to-balamb':               14,
  'd2-trabia-garden':                  15,
  'd2-battle-of-the-gardens':          16,
  'd3-the-aftermath':                  17,
  'd3-esthar':                         18,
  'd3-lunar-base':                     19,
  'd3-ragnarok':                       20,
  'd3-the-final-mission':              21,
  'd4-ultimecia-castle':               22,
}

// SI mission number → story chapter id(s)
const SI_MAP = {
  'd1-galbadia-garden':                7,   // "Reach Galbadia Garden"
  'd2-exploring-the-world':           13,   // "The Mobile Garden" — open world period
  // SM#16 is only ~35 lines (barely useful); SM#17 contains the actual Trabia Canyon
  // dream sequence content AND the White SeeD ship — both chapters share this section
  'd3-trabia-canyon':                 17,   // SM#17 has the Trabia Canyon Laguna dream
  'd3-picking-up-the-trail':          17,   // "Find White Seed Ship"
  'd3-journey-to-the-silent-country': 18,   // "Make Way to Esthar"
  'd3-the-resistance':                19,   // "Find Ellone" — Esthar city exploration (SM#19A)
  'd3-siege-of-esthar':               20,   // "Board Loony Panda"
  'd3-back-on-earth':                 23,   // '"Defeat" Loony Panda'
  // d4 sub-chapters intentionally omitted from SI_MAP — the entire SM#24 was
  // being assigned to all four identically. d4-ultimecia-castle has AS {22} content;
  // the sub-chapters will show only their achievement/missable checkpoints.
}

// ─── SI Walkthrough prose parser ──────────────────────────────────────────────
function parseSIWalkthrough() {
  const raw   = read('Walkthroughs/Split_Infinity-Walkthrough.txt')
  const lines = raw.split('\n')
  const missionRe = /^SEED MISSION #(\d+)/

  const missions = {}   // number → { paragraphs[] }
  let currentMission = null
  let buffer = []
  let inEnemyBlock = false
  let enemyBlockLines = 0

  const flushParagraph = () => {
    if (!currentMission) return
    const text = buffer.filter(l => l.trim()).join(' ').trim()
    if (text.length > 30) {
      const rw = rewriteVoice(text)
      if (rw.length > 20) missions[currentMission].paragraphs.push(rw)
    }
    buffer = []
  }

  for (let i = 0; i < lines.length; i++) {
    const line  = lines[i]
    const trim  = line.trim()

    // Mission section header
    const mMatch = trim.match(missionRe)
    if (mMatch) {
      flushParagraph()
      currentMission = parseInt(mMatch[1])
      inEnemyBlock   = false
      enemyBlockLines = 0
      if (!missions[currentMission]) missions[currentMission] = { paragraphs: [] }
      continue
    }

    if (!currentMission) continue

    // Enemy/boss stat block detection: NAME*1 ----- (20+ dashes) followed by LV RANGE
    if (/^[A-Z][A-Za-z0-9 '*()\[\]\/\-\.]{1,60}-{15,}/.test(trim) && i + 1 < lines.length) {
      const nextTrim = lines[i + 1].trim()
      if (/^LV RANGE\s*\|/.test(nextTrim)) {
        flushParagraph()
        inEnemyBlock   = true
        enemyBlockLines = 0
        // Emit a compact boss summary
        const bossName = trim.replace(/-+$/, '').trim()
        // Parse stats from data line: "LV_range | HP_range | AP | ..."
        const datLine  = lines[i + 2]?.trim() ?? ''
        const parts    = datLine.split('|').map(s => s.trim())
        const lvM  = parts[0]?.match(/^(\d+\s*~\s*\d+|\d+)/)
        const hpM  = parts[1]?.match(/([\d,]+\s*~\s*[\d,]+|[\d,]+)/)
        const apM  = parts[2]?.match(/^(\d+)/)
        // Look ahead for draw magic and mug (strip devour column after second |)
        let draw = '', mug = ''
        for (let j = i; j < Math.min(i + 40, lines.length); j++) {
          const l = lines[j]
          if (/DRAWABLE MAGIC/i.test(l) && j + 1 < lines.length) {
            const dm = lines[j + 1].trim()
              .replace(/^L\s*[\d~\s]+\|/, '')  // strip level prefix
              .replace(/\|.*$/, '')              // strip devour column
              .trim()
            if (dm && dm !== '---' && dm !== "Couldn't Devour!") draw = dm
          }
          if (/MUGGED ITEMS/i.test(l) && j + 1 < lines.length) {
            const mm = lines[j + 1].trim()
              .replace(/^L\s*[\d~\s]+\|/, '')
              .replace(/\|.*$/, '')
              .trim()
            if (mm && mm !== '---' && !/has nothing/i.test(mm)) mug = mm
          }
          if (/^SCAN/i.test(lines[j]?.trim() ?? '')) break
        }
        let summary = `**Boss: ${bossName}**`
        if (lvM) summary += ` (Lv ${lvM[1]})`
        if (hpM) summary += ` — HP: ${hpM[1]}`
        if (apM) summary += ` | AP: ${apM[1]}`
        const blist = []
        if (draw && draw !== '---') blist.push(`Draw: ${draw}`)
        if (mug  && mug  !== '---') blist.push(`Mug: ${mug}`)
        if (blist.length) summary += '\n- ' + blist.join('\n- ')
        missions[currentMission].paragraphs.push(summary)
        continue
      }
    }

    if (inEnemyBlock) {
      // Exit enemy block on a blank line after enough rows, or section-level header
      enemyBlockLines++
      if (!trim) {
        if (enemyBlockLines > 8) { inEnemyBlock = false; enemyBlockLines = 0 }
      }
      if (/^-{3,}$/.test(trim) || /^={3,}$/.test(trim)) {
        inEnemyBlock = false; enemyBlockLines = 0
      }
      continue
    }

    // Skip noise
    if (isNoise(line)) continue

    // Location headers like [B-Garden - Classroom] → paragraph breaks, keep as context
    if (/^\[.+\]$/.test(trim)) {
      flushParagraph()
      buffer.push(trim)
      continue
    }

    // Sub-headers like "--- New Guardian Force ---" → paragraph break + label
    if (/^-{3,}\s*New\s/i.test(trim) || /^-{3,}\s*Triple Triad/i.test(trim)) {
      flushParagraph()
      const label = trim.replace(/^-+\s*/, '').replace(/\s*-+$/, '').trim()
      if (label.length > 3) missions[currentMission].paragraphs.push(`**${label}**`)
      continue
    }

    // Skip separator lines
    if (/^[-=~*]{4,}$/.test(trim)) { flushParagraph(); continue }

    // Blank line = paragraph break
    if (!trim) { flushParagraph(); continue }

    buffer.push(trim)
  }
  if (currentMission) flushParagraph()

  return missions
}

// ─── Boss lookup (name → full markdown) ──────────────────────────────────────
// Bosses not present in the AS/SI walkthrough boss boxes are defined here.
const MANUAL_BOSS_ENTRIES = {
  'droma':    '**Boss: Droma** (Lv 1-56) — HP: 1,010 - 3,128 | AP: 0\n- Draw: Esuna, Dispel\n- Mug: Meteor Stone',
  'norg pod': '**Boss: NORG POD** (Lv 1-27) — HP: 2,000 (fixed) | AP: 0\n- Draw: Lvl 1-19: Cure / Lvl 20-27: Cura\n- Thunder resistant (×0.5) · Poison immune',
  // Edea's first fight (Disc 1, Deling City parade) has different stats from the second fight
  // The AS walkthrough names both "Edea" so the second overwrites the first in the auto-lookup
  'edea (disc 1)': '**Boss: Edea** (Lv 1-20) — HP: 1,300-7,000 | AP: 20\n- Draw: Cura, Dispel, Life, Double\n- Drop: Elixir\n- No elemental weakness; immune to most statuses',

  // Seifer appears four times; the AS lookup only keeps the 4th fight entry.
  // Manual entries restore accurate data for the first three encounters.
  'seifer (disc 1)': '**Boss: Seifer** (Lv 1-20) — HP: 176-1,150 | AP: 0\n- Draw: Lv 1-19: Fire, Cure, Life | Lv 20: Fira, Cura, Life\n- Steal: Hero\n- Weakness: Poison ×1.5, Wind ×2',
  'seifer (2nd)':    '**Boss: Seifer** (Lv 1-31) — HP: 1,300-10,300 | AP: 20\n- Draw: Lv 1-19: Fire, Thunder, Dispel, Haste | Lv 20-29: Fira, Thundara, Dispel, Haste | Lv 30-31: Firaga, Thundaga, Dispel, Haste\n- Steal: Mega-Phoenix × 8 | Drop: Mega-Potion × 8\n- Weakness: Poison ×1.5',
  'seifer (3rd)':    '**Boss: Seifer** (Lv 1-32) — HP: 1,200-7,400 | AP: 20\n- Draw: Lv 1-19: Fire, Thunder, Dispel, Haste | Lv 20-29: Fira, Thundara, Dispel, Haste | Lv 30-32: Firaga, Thundaga, Dispel, Haste\n- Steal/Drop: Hero (common) or Holy War (rare)\n- Weakness: Poison ×1.5',

  // Raijin appears three times; the AS lookup keeps only the 3rd fight entry (Disc 3).
  // First fight: level-uncapped (1-100), fought alone then with G-Soldiers
  'raijin (1st)': '**Boss: Raijin** (Lv 1-100) — HP: 400-40,000 | AP: 10\n- Draw: Thunder, Thundara, Shell, Protect\n- Steal: 2× Str Up | Drop: 1× Str Up\n- Weakness: Poison ×1.5',
  // Second fight: level-capped at 29, guaranteed Combat King 002 drop
  'raijin (2nd)': '**Boss: Raijin** (Lv 1-29) — HP: 400-11,600 | AP: 10\n- Draw: Thunder, Thundara, Shell, Protect\n- Steal: 2× Str Up | Fixed drop: Combat King 002\n- Weakness: Poison ×1.5',

  // Fujin appears twice; the AS lookup keeps only the 2nd fight entry (Disc 3).
  // First fight: with Raijin in Balamb, level-capped at 29, Pandemona draw
  'fujin (1st)': '**Boss: Fujin** (Lv 1-29) — HP: 300-8,700 | AP: 10\n- Draw: Aero, Cura, Life, Pandemona\n- Steal: Megalixir or Hero | Drop: Megalixir\n- Weakness: Poison ×1.5',

  // BGH251F2 appears twice; the AS lookup keeps only the 2nd fight entry (FH).
  // First fight: Missile Base, Lv 1-22, fixed drop Weapons Monthly June Issue
  'bgh251f2 (1st)': '**Boss: BGH251F2** (Lv 1-22) — HP: 4,200-8,400 | AP: 10\n- Draw: Shell, Protect, Stop\n- Fixed drop: Weapons Monthly June Issue\n- Weakness: Lightning ×1.5, Earth ×1.5, Water ×1.5',
}

function buildBossLookup(wt, si) {
  const lookup = {}
  const bossRe = /^\*\*Boss:\s*(.+?)\*\*/

  // SI paragraphs fill gaps (lowest priority)
  for (const mission of Object.values(si)) {
    for (const para of mission.paragraphs) {
      const m = para.match(bossRe)
      if (m) {
        const key = m[1].trim().toLowerCase()
        if (!lookup[key]) lookup[key] = para
      }
    }
  }
  // AS paragraphs override SI
  for (const chData of Object.values(wt)) {
    for (const para of chData.paragraphs) {
      const m = para.match(bossRe)
      if (m) lookup[m[1].trim().toLowerCase()] = para
    }
  }
  // MANUAL_BOSS_ENTRIES have highest priority — override everything
  Object.assign(lookup, MANUAL_BOSS_ENTRIES)
  return lookup
}

// Add comma formatting to bare 4+ digit numbers in HP/AP fields of boss card text
function formatBossCardNumbers(text) {
  // Format numbers in HP range: — HP: XXXX-XXXXX or — HP: XXXXX
  return text.replace(/(?<![,\d])(\d{4,})(?![,\d])/g, (_, n) => {
    return parseInt(n).toLocaleString('en-US')
  })
}

function resolveBossPlaceholders(content, bossLookup) {
  return content.replace(/\{\{BOSS:([^}]+)\}\}/g, (match, name) => {
    const key = name.trim().toLowerCase()
    const entry = bossLookup[key]
    if (!entry) return match
    return formatBossCardNumbers(entry)
  })
}

// ─── Keyword map for achievement paragraph injection ──────────────────────────
function keywordsForAchievement(a) {
  const titleKw = a.title.toLowerCase().split(/\s+/)
  const extra = {
    'ach-quezacotl':       ['computer', 'tutorial', 'desk'],
    'ach-shiva':           ['computer', 'tutorial', 'desk'],
    'ach-ifrit':           ['ifrit', 'fire cavern'],
    'ach-siren':           ['elvoret', 'radio tower', 'siren'],
    'ach-first-salary':    ['salary', 'seed mission', 'cid'],
    'ach-diablos':         ['magical lamp', 'diablos'],
    'ach-brothers':        ['tomb', 'sacred', 'brothers'],
    'ach-carbuncle':       ['iguion', 'carbuncle', 'assassination'],
    'ach-leviathan':       ['norg', 'leviathan'],
    'ach-card-player':     ['triple triad', 'card'],
    'ach-loser':           ['queen of cards', 'rare card', 'lose'],
    'ach-cards-club-master': ['cc group', 'card master', 'king'],
    'ach-tonberry':        ['tonberry', 'centra ruins'],
    'ach-pandemona':       ['fujin', 'pandemona'],
    'ach-cerberus':        ['cerberus'],
    'ach-alexander':       ['edea', 'alexander'],
    'ach-chocobo':         ['chocobo', 'chicobo'],
    'ach-cactuar':         ['cactuar', 'jumbo'],
    'ach-doomtrain':       ['solomon ring', 'doomtrain'],
    'ach-bahamut':         ['bahamut', 'deep sea', 'core'],
    'ach-eden':            ['eden', 'ultima weapon'],
    'ach-ragnarok':        ['ragnarok', 'lunar'],
    'ach-handyman':        ['remodel', 'lionheart', 'weapon shop'],
    'ach-timber-maniacs':  ['timber maniacs', 'magazine'],
    'ach-obel-lake-secret':['obel lake', 'minde isle'],
    'ach-ufo':             ['pupu', 'ufo', 'elixir'],
    'ach-omega-destroyed': ['omega weapon', 'omega'],
    'ach-end-of-game':     ['ultimecia', 'time compression', 'final'],
    'ach-top-rank':        ['seed rank', 'seed test', 'rank a'],
    'ach-maximum-hp':      ['maximum hp', 'hp+80%', 'island closest'],
    'ach-1000-kills':      ['island closest to hell', '1000', 'kills'],
    'ach-magic-miner':     ['draw point', 'draw magic'],
    'ach-magician':        ['draw', 'stock', 'enemies'],
    'ach-100-kills':       ['100', 'enemies'],
  }
  return [...titleKw, ...(extra[a.id] ?? [])]
}

// ─── Chapter assembly ─────────────────────────────────────────────────────────
function assembleChapters(wt, si, bossLookup) {
  const usedAsIdx = new Set()

  return STORY_CHAPTERS.map((ch, i) => {
    let rawParagraphs = []

    if (CHAPTER_CONTENT[ch.id]) {
      // Curated content takes priority over AS/SI parser output
      rawParagraphs = CHAPTER_CONTENT[ch.id]
    } else {
      // Fallback: AS walkthrough
      const asIdx = AS_MAP[ch.id] ?? null
      if (asIdx && !usedAsIdx.has(asIdx)) {
        usedAsIdx.add(asIdx)
        rawParagraphs = wt[asIdx]?.paragraphs ?? []
      }
      // Fallback: SI walkthrough
      if (rawParagraphs.length === 0) {
        const siIdx = SI_MAP[ch.id] ?? null
        if (siIdx) rawParagraphs = si[siIdx]?.paragraphs ?? []
      }
    }

    let content = rawParagraphs.join('\n\n')

    // Resolve {{BOSS:Name}} placeholders in curated content
    if (content.includes('{{BOSS:')) {
      content = resolveBossPlaceholders(content, bossLookup)
    }

    // Use resolved content for accurate keyword matching
    const resolvedParas = content.split('\n\n').filter(p => p.trim().length > 0)

    const achForChapter = ACH_BY_CHAPTER[ch.id] ?? []
    const checkpoints = achForChapter.map(a => {
      let idx = 0
      const kw = keywordsForAchievement(a)
      for (let pi = 0; pi < resolvedParas.length; pi++) {
        if (kw.some(k => resolvedParas[pi].toLowerCase().includes(k))) { idx = pi; break }
      }
      return { id: a.id, type: 'achievement', label: a.title, description: a.description, index: idx, achievementType: a.type }
    })

    const encounters = CHAPTER_ENCOUNTERS[ch.id] ?? []

    return { ...ch, index: i + 1, content, checkpoints, encounters }
  })
}

// ─── Missable parser ──────────────────────────────────────────────────────────
function parseMissables() {
  const txt = read('Missables/bover_87-Missable_Items.txt')
  const missables = []
  const nameRe = /^([A-Z][^\n:]{3,50}):\s*(.+)/

  let currentName = null, currentDesc = []

  const flush = () => {
    if (!currentName) return
    const desc = currentDesc.join(' ').trim()
    if (desc.length > 20) missables.push({ id: stableId('miss', currentName), title: currentName, description: rewriteVoice(desc) })
    currentName = null; currentDesc = []
  }

  for (const line of txt.split('\n')) {
    const t = line.trim()
    if (!t || isNoise(line)) continue
    if (/^[A-Z\-=]{20,}$/.test(t)) continue

    const m = t.match(nameRe)
    if (m && !t.includes('http') && !t.match(/^(Note|Also|See|If|The|This|When)/)) {
      flush()
      currentName = m[1].trim()
      currentDesc = [m[2].trim()]
    } else if (currentName && t.length > 5) {
      currentDesc.push(t)
    }
  }
  flush()
  return missables
}

// ─── Missable chapter injection ───────────────────────────────────────────────
const MISSABLE_CHAPTER_MAP = {
  'siren':            'd1-the-seed-exam',
  'x-atm':            'd1-the-seed-exam',
  'battle-meter':     'd1-after-the-exam',
  'magical-lamp':     'd1-after-the-exam',
  'angelo-recover':   'd1-the-timber-mission',
  'angelo-reverse':   'd1-the-timber-mission',
  'girl-next-door':   'd1-the-timber-mission',
  'pet-nametag-2':    'd1-the-timber-mission',
  'pet-nametag':      'd2-the-escape',
  'location-displayer': 'd1-galbadia-garden',
  'carbuncle':        'd1-deling-city',
  'gayla':            'd1-the-timber-mission',
  'timber':           'd1-the-timber-mission',
  'leviathan':        'd2-return-to-balamb-garden',
  'eyes-on-me':       'd2-winhill',
  'pandemona':        'd2-return-to-balamb',
  'master-fisherman': 'd2-fishermans-horizon',
  'occult-fan-iii':   'd2-fishermans-horizon',
  'alexander':        'd2-battle-of-the-gardens',
  'cerberus':         'd2-battle-of-the-gardens',
  'irvine':           'd2-the-garden-festival',
  'white-seed':       'd3-the-aftermath',
  'occult-fan-iv':    'd3-esthar',
  'end-of-disc':      'd3-back-on-earth',
  'obel':             'd3-ragnarok',
  'pupu':             'd3-ragnarok',
  'eden':             'd4-ultimecia-castle',
  'omega':            'd4-ultimecia-castle',
  'ultima-weapon':    'd4-ultimecia-castle',
  'missed-gfs':       'd4-ultimecia-castle',
  'zone':             'd3-the-aftermath',
}

function injectMissables(chapters, missables) {
  // Reference chapters (disc 0) are informational — never assign missables to them
  const storyChapters = chapters.filter(c => c.disc !== 0)

  for (const m of missables) {
    const slug = m.id.replace('miss-', '').toLowerCase()
    let targetId = null

    for (const [key, chId] of Object.entries(MISSABLE_CHAPTER_MAP)) {
      if (slug.includes(key)) { targetId = chId; break }
    }
    if (!targetId) {
      const kw = m.title.toLowerCase().split(/\s+/).filter(w => w.length > 3)
      for (const ch of storyChapters) {
        if (kw.some(k => ch.content.toLowerCase().includes(k))) { targetId = ch.id; break }
      }
    }
    if (!targetId) targetId = storyChapters[0]?.id

    const ch = chapters.find(c => c.id === targetId)
    if (!ch) continue

    const paras = ch.content.split('\n\n')
    let idx = 0
    const kw = m.title.toLowerCase().split(/\s+/)
    for (let pi = 0; pi < paras.length; pi++) {
      if (kw.some(k => k.length > 3 && paras[pi].toLowerCase().includes(k))) { idx = pi; break }
    }

    ch.checkpoints.push({ id: m.id, type: 'missable', label: m.title, description: m.description, index: idx })
  }
  return chapters
}

// ─── GF parser ────────────────────────────────────────────────────────────────
function parseGFs() {
  const txt   = read('Walkthroughs/Absolute_Steve-Guardian_Forces.txt')
  const lines = txt.split('\n')
  const gfs   = []
  let name = null, attack = '', element = '', locLines = [], abilities = []
  let inLocation = false

  const flush = () => {
    if (!name) return
    gfs.push({ id: slugify(name), name, element: element || '---', attack,
      location: locLines.join(' ').replace(/\s+/g, ' ').trim().slice(0, 200),
      abilities: abilities.slice(0, 30) })
    name = null; attack = ''; element = ''; locLines = []; abilities = []; inLocation = false
  }

  for (const line of lines) {
    const t = line.trim()
    const nameM = t.match(/^\|Name:\s*(.+?)\s*\|/)
    if (nameM) { flush(); name = nameM[1].trim(); continue }
    if (!name) continue

    const atkM  = t.match(/^\|Attack:\s*(.+?)\s*\|/)
    const elemM = t.match(/^\|Element:\s*(.+?)\s*\|/)
    const locM  = t.match(/^\|Location:\s*(.+?)\s*\|/)

    // Parse ability from the RIGHT side of the row BEFORE any `continue` below,
    // because Attack/Element/Location rows share their line with an ability column.
    const abEarly = t.match(/\|\|\s*\*?([A-Za-z][A-Za-z0-9 +\-%\/]{1,24}?)\s*\|\s*(\d+|---)\s*\|\s*(.*?)\s*\|/)
    if (abEarly) {
      const aName = abEarly[1].trim()
      const ap    = abEarly[2] === '---' ? 0 : parseInt(abEarly[2])
      const unlocks = abEarly[3].trim().replace(/^---$/, '')
      if (aName && !aName.match(/^Level|^Atk|^---/) && aName.length > 1) {
        abilities.push({ name: aName, ap, unlocks })
      }
    }

    if (atkM)  { attack = atkM[1]; inLocation = false; continue }
    if (elemM) { element = elemM[1].trim(); inLocation = false; continue }
    if (locM)  { locLines.push(locM[1]); inLocation = true; continue }

    if (inLocation && t.startsWith('|') && !t.match(/^\|[-=]+\|/) && !t.match(/^\|Level\|/)) {
      // Extract text from the LEFT side of the row:
      //   - before || (ability separator) if present, else before the second |
      const leftPart = t.includes('||') ? t.split('||')[0] : t.replace(/\|[^|]*$/, '')
      const inner = leftPart.replace(/^\|/, '').trim()
      // Stop if left cell is fully empty — location block is finished
      if (!inner) { inLocation = false; continue }
      // Skip separator/header lines
      if (inner.match(/^[-=]+$/) || inner.match(/^(Attack|Element|Name):/)) continue
      locLines.push(inner)
      continue
    }

    if (t.startsWith("'--")) {
      // Some closing rows have ability data on the right side: '---...'| AbilityName | AP | Unlocks |
      const abClose = t.match(/'[^']+'\s*\|\s*([A-Za-z][A-Za-z0-9 +\-%\/]{1,24}?)\s*\|\s*(\d+|---)\s*\|\s*(.*?)\s*\|/)
      if (abClose) {
        const aName = abClose[1].trim()
        const ap    = abClose[2] === '---' ? 0 : parseInt(abClose[2])
        const unlocks = abClose[3].trim().replace(/^---$/, '')
        if (aName && !aName.match(/^Level|^Atk|^---/) && aName.length > 1) {
          abilities.push({ name: aName, ap, unlocks })
        }
      }
      inLocation = false; continue
    }

    // Trailing right-panel ability rows that have no left-panel content (e.g. Tonberry's Call Shop)
    // These lines start with | but have no || double-pipe separator.
    if (!t.includes('||') && t.match(/^\|\s+[A-Za-z]/)) {
      const abTrail = t.match(/^\|\s*([A-Za-z][A-Za-z0-9 +\-%\/]{1,24}?)\s*\|\s*(\d+|---)\s*\|\s*(.*?)\s*\|/)
      if (abTrail) {
        const aName = abTrail[1].trim()
        const ap    = abTrail[2] === '---' ? 0 : parseInt(abTrail[2])
        const unlocks = abTrail[3].trim().replace(/^---$/, '')
        if (aName && !aName.match(/^Level|^Atk|^---|^Ability Name/) && aName.length > 1) {
          abilities.push({ name: aName, ap, unlocks })
        }
      }
    }
  }
  flush()

  // Correct known errors in the AS Guardian Forces source data (verified against FF8 wiki)
  const GF_ABILITY_FIXES = {
    'Alexander': [
      // AS lists two "Spr +40%" rows; the 60 AP one is actually Spr +20%
      { match: { name: 'Spr +40%', ap: 60 }, fix: { name: 'Spr +20%' } },
    ],
    'Carbuncle': [
      // AS marks HP-J as "Already learned" (AP=0) but wiki confirms it costs 50 AP
      { match: { name: 'HP-J', ap: 0 }, fix: { ap: 50 } },
    ],
    'Cerberus': [
      // AS lists ST-Def-J at 160 AP; SI confirms it is 100 AP
      { match: { name: 'ST-Def-J', ap: 160 }, fix: { ap: 100 } },
    ],
    'Siren': [
      // AS used the original JP value of 160 AP for ST-Atk-J; in all other releases it is Already Learned
      { match: { name: 'ST Atk-J', ap: 160 }, fix: { ap: 0 } },
    ],
  }
  for (const gf of gfs) {
    const fixes = GF_ABILITY_FIXES[gf.name]
    if (!fixes) continue
    for (const { match, fix } of fixes) {
      const ab = gf.abilities.find(a =>
        (!match.name || a.name === match.name) && (match.ap == null || a.ap === match.ap))
      if (ab) Object.assign(ab, fix)
    }
  }

  // Correct element errors in AS source data (verified against FF8 wiki)
  // AS lists Alexander as "---" (non-elemental) but it is Holy-elemental per the wiki
  const GF_ELEMENT_OVERRIDES = {
    'Alexander': 'Holy',
  }
  for (const gf of gfs) {
    if (GF_ELEMENT_OVERRIDES[gf.name]) gf.element = GF_ELEMENT_OVERRIDES[gf.name]
  }

  // Normalise ability names to match in-game/wiki compact format (AS source uses expanded forms)
  for (const gf of gfs) {
    for (const ab of gf.abilities) {
      ab.name = ab.name
        .replace(/^GF HP \+/, 'GFHP+')
        .replace(/^Spr \+/, 'Spr+')
        .replace(/^Str \+/, 'Str+')
        .replace(/^Mag \+/, 'Mag+')
        .replace(/^Vit \+/, 'Vit+')
        .replace(/^Spd \+/, 'Spd+')
        .replace(/^Luck \+/, 'Luck+')
        .replace(/^Eva \+/, 'Eva+')
        .replace(/^Hit \+/, 'Hit+')
        .replace(/^SumMag \+/, 'SumMag+')
        .replace(/^Sum Mag \+/, 'SumMag+')       // Eden variant: "Sum Mag +10%" -> "SumMag+10%"
        .replace(/^SumMag\+(\d+)$/, 'SumMag+$1%') // Alexander: missing trailing %
        .replace(/^HP \+/, 'HP+')                // "HP +20%" -> "HP+20%"
        .replace(/^GF Abl /, 'GFAbl ')           // Eden: "GF Abl Med-RF" -> "GFAbl Med-RF"
        .replace(/^GF Recov /, 'GFRecov ')       // Leviathan: "GF Recov Med-RF" -> "GFRecov Med-RF"
        .replace(/^ST Atk-J$/, 'ST-Atk-J')      // Siren: space -> hyphen
        .replace(/^ST Def-J$/, 'ST-Def-J')       // Siren: space -> hyphen
        .replace(/^ST Def-Jx(\d)$/, 'ST-Def-Jx$1') // Siren: space -> hyphen
        .replace(/^Elem-Defx(\d)$/, 'Elem-Def-Jx$1')  // "Elem-Defx2" -> "Elem-Def-Jx2"
        .replace(/^Elem-Def-J x(\d)$/, 'Elem-Def-Jx$1') // Pandemona: space before x
        .replace(/^ST-Defx(\d)$/, 'ST-Def-Jx$1')
        .replace(/^Expend x/, 'Expendx')         // "Expend x2-1" -> "Expendx2-1"
        .replace(/^Move HP Up$/, 'Move-HP Up')   // Bahamut
        .replace(/^Move HP-Up$/, 'Move-HP Up')   // Cactuar
        .replace(/^Auto Protect$/, 'Auto-Protect') // Bahamut
        .replace(/^Auto Haste$/, 'Auto-Haste')   // Cerberus
        .replace(/^Auto Potion$/, 'Auto-Potion') // Leviathan
        .replace(/^Sell High$/, 'Sell-High')     // Tonberry
    }
  }

  return gfs.filter(g => g.name.length > 1 && g.name.length < 25)
}

// ─── Card parser ──────────────────────────────────────────────────────────────
function parseCards() {
  const txt   = read('Walkthroughs/Absolute_Steve-Triple_Triad_Card_Game.txt')
  const lines = txt.split('\n')
  const cards = []
  let leftLevel = 1, rightLevel = 2, inCardSection = false

  const parseCardColumn = (topLine, midLine, btmLine, level) => {
    const topM = topLine.match(/\|\s+(\d+|A)\s+\|\s+Card Name:\s*(.+)/)
    if (!topM) return null
    const T    = topM[1] === 'A' ? 10 : parseInt(topM[1])
    const name = topM[2].trim().replace(/\s{2,}.*$/, '').replace(/\|.*$/, '').trim()

    const midM = midLine.match(/\|(\d+|A)\s+(\d+|A)\|/)
    if (!midM) return null
    const L = midM[1] === 'A' ? 10 : parseInt(midM[1])
    const R = midM[2] === 'A' ? 10 : parseInt(midM[2])

    const btmM = btmLine.match(/\|\s+(\d+|A)\s+\|/)
    const B    = btmM ? (btmM[1] === 'A' ? 10 : parseInt(btmM[1])) : 0

    const modM  = midLine.match(/Card Mod:\s*(.+)/)
    const elemM = btmLine.match(/Elemental:\s*(.+)/)
    const howToGet  = modM  ? modM[1].trim().replace(/\s{2,}.*$/, '').replace(/\|.*$/, '').trim() : ''
    const elemental = elemM ? elemM[1].trim().replace(/\s{2,}.*$/, '').replace(/\|.*$/, '').trim() : null

    const type = level <= 7 ? 'monster' : level === 8 ? 'boss' : level === 9 ? 'gf' : 'player'
    if (!name || name.length > 35) return null
    return { id: `card-${slugify(name)}`, name, level, type,
      top: T, left: L, right: R, bottom: B,
      howToGet: howToGet.slice(0, 80), elemental: elemental === '---' ? null : elemental }
  }

  const splitColumns = (line) => {
    const sepM = line.match(/^(.+?\|)\s+(\|.+)$/)
    if (sepM && sepM[2].includes('|')) return [sepM[1], sepM[2]]
    return [line, '']
  }

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]
    if (/Level\s+\d+[^:]*Cards/.test(line)) {
      const matches = [...line.matchAll(/Level\s+(\d+)/g)]
      if      (matches.length >= 2) { leftLevel = parseInt(matches[0][1]); rightLevel = parseInt(matches[1][1]) }
      else if (matches.length === 1) { leftLevel = parseInt(matches[0][1]); rightLevel = leftLevel }
      inCardSection = true; continue
    }
    if (!inCardSection || !line.includes('Card Name:')) continue

    const [leftTop, rightTop] = splitColumns(line)
    const [leftMid, rightMid] = splitColumns(lines[i + 1] ?? '')
    const [leftBtm, rightBtm] = splitColumns(lines[i + 2] ?? '')

    const lc = parseCardColumn(leftTop, leftMid, leftBtm, leftLevel)
    if (lc) cards.push(lc)
    if (rightTop.includes('Card Name:')) {
      const rc = parseCardColumn(rightTop, rightMid, rightBtm, rightLevel)
      if (rc) cards.push(rc)
    }
  }

  // Correct known errors in the AS Triple Triad source data (verified against FF8 wiki)
  const CARD_MOD_OVERRIDES = {
    'Selphie':    '[1:3] Elem Guard',       // AS says [1:100]; wiki confirms 3× Elem Guard
    'Squall':     '[1:3] Three Stars',      // AS says [1:10]; wiki confirms 3× Three Stars
    'PuPu':       '[1:1] Hungry Cookpot',   // AS wraps "Cookpot" to a second line; parser misses it
    'Cockatrice': '[1:5] Cockatrice Pinion',// AS wraps "Pinion" to a second line; parser misses it
    'Forbidden':  '[1:1] Betrayal Sword',   // AS wraps "Sword" to a second line; parser misses it
    'Iguion':     '[1:1] Cockatrice Pinion',// AS wraps "Pinion" to a second line; parser misses it
  }
  cards.forEach(c => { if (CARD_MOD_OVERRIDES[c.name]) c.howToGet = CARD_MOD_OVERRIDES[c.name] })

  // Correct card name misspellings in AS source (verified against FF8 in-game text)
  const CARD_NAME_OVERRIDES = {
    'Quetzacotl': 'Quezacotl', // AS uses extended "Quetzalcoatl" spelling; in-game card is "Quezacotl"
  }
  cards.forEach(c => { if (CARD_NAME_OVERRIDES[c.name]) { c.name = CARD_NAME_OVERRIDES[c.name]; c.id = `card-${slugify(c.name)}` } })

  const seen = new Set()
  return cards.filter(c => { if (seen.has(c.name)) return false; seen.add(c.name); return true })
}

// ─── Refinement parser ────────────────────────────────────────────────────────
function parseRefinement() {
  const txt = read('Walkthroughs/Split_Infinity-Refinement_Charts.txt')
  const abilityRe = /^([A-Za-z][\w\s\-\/]+RF|Card Mod|Tool RF|GFRecov Med-RF|Mid Mag-RF|High Mag-RF|Forbid Med-RF|Forbid Mag-RF|Full-life RF|Recover|Recov Med-RF|Amnesia Greens RF|GF Mag-RF|Item RF|Ammo-RF|Str Mag-RF|Med LV Up|Med LV UP)/i
  const rowRe = /^\s*(\d+)\s+\|\s+(.+?)\s+\|\s+(\d+)\s+\|\s+(.+?)\s*$/
  const refinement = []
  let current = null

  for (const line of txt.split('\n')) {
    const t = line.trim()
    if (!t || isNoise(line)) continue
    const am = t.match(abilityRe)
    if (am) { current = { ability: am[0].trim(), entries: [] }; refinement.push(current); continue }
    if (!current) continue
    const rm = t.match(rowRe)
    if (rm) current.entries.push({ fromQty: parseInt(rm[1]), from: rm[2].trim(), toQty: parseInt(rm[3]), to: rm[4].trim().replace(/\*\d+$/, '') })
  }

  const filtered = refinement.filter(r => r.entries.length > 0)

  // SI source spelling inconsistencies — fix to match canonical in-game names
  // (verified against AS source and wiki)
  const REFINE_FROM_FIX = { 'GeroGero': 'Gerogero' }
  const REFINE_TO_FIX   = { 'LuvLuv G': 'LuvLuvG' }
  for (const r of filtered) {
    for (const e of r.entries) {
      if (REFINE_FROM_FIX[e.from]) e.from = REFINE_FROM_FIX[e.from]
      if (REFINE_TO_FIX[e.to])     e.to   = REFINE_TO_FIX[e.to]
    }
  }

  return filtered
}

// ─── Items parser (AS box-table format) ──────────────────────────────────────
// Format: |Name: ITEM_NAME  |Use description                          |  buy|
//         |                 |Obtain:     description                  |  sell|
//         |                 |Refine from: ITEM [qty:qty] (Ability)    |      |
//         |                 |Refine into: ITEM [qty:qty] (Ability)    |      |
//         |-----------------|------------------------------------------|------|
function parseItems() {
  const txt   = read('Walkthroughs/Absolute_Steve-Lists_Items_and_Refining.txt')
  const lines = txt.split('\n')
  const items = []

  // Current section label (Recovery, Battle, etc.)
  let section = 'General'
  const sectionRe = /^\s{15,}([A-Z][A-Za-z ]+Items[^:]*|Magazine Items|Ammunition Items|Tool Items|Blue Magic Items|Compatibility Items|Stat Boosting Items):/

  let currentItem = null

  const flush = () => {
    if (!currentItem || !currentItem.name) return
    // Clean up
    currentItem.useDesc    = currentItem.useDesc.join(' ').replace(/\s+/g, ' ').trim().slice(0, 200)
    currentItem.obtain     = currentItem.obtain.join('; ').replace(/\s+/g, ' ').trim().slice(0, 200)
    currentItem.refineFrom = currentItem.refineFrom.map(s => s.trim()).filter(Boolean)
    currentItem.refineTo   = currentItem.refineTo.map(s => s.trim()).filter(Boolean)
    items.push(currentItem)
    currentItem = null
  }

  let lastField = 'useDesc'  // tracks which field continuation lines belong to

  const startItem = (name, firstDesc, buyStr) => {
    flush()
    const buy  = buyStr ? parseInt(buyStr.replace(/,/g, '')) : null
    lastField = 'useDesc'
    currentItem = {
      id: `item-${slugify(name)}`,
      name: name.trim(),
      section,
      buy:  isNaN(buy) ? null : buy,
      sell: null,
      useDesc: firstDesc ? [firstDesc.trim()] : [],
      obtain:  [],
      refineFrom: [],
      refineTo: [],
    }
  }

  for (const line of lines) {
    const t = line.trim()

    // Section header
    const secM = line.match(sectionRe)
    if (secM) { section = secM[1].replace(/Items?$/, '').trim(); continue }

    if (!t || t.match(/^[.'-][-=]+/) || t.match(/^[|]{1}[-=]+/)) continue

    // Name line: |Name          |Use description                 |  100|
    // Has 3+ pipes, the first cell is not blank, doesn't start with empty first cell
    const nameM = line.match(/^\|([A-Za-z][^|]{2,30}?)\s*\|(.{10,}?)\s*\|\s*([\d,]+|-{3}|-)\s*\|?\s*$/)
    if (nameM && nameM[1].trim() && !nameM[1].trim().match(/^Name:|^=+$/)) {
      const maybeObtain  = nameM[2].trim().match(/^Obtain:/i)
      const maybeRefFrom = nameM[2].trim().match(/^Refine from:/i)
      const maybeRefTo   = nameM[2].trim().match(/^Refine into:/i)
      if (!maybeObtain && !maybeRefFrom && !maybeRefTo) {
        startItem(nameM[1], nameM[2], nameM[3] === '-' || nameM[3] === '---' ? null : nameM[3])
        continue
      }
    }

    // Continuation lines: |              |Obtain:      Description       |      |
    const contM = line.match(/^\|\s*\|\s*(.+?)\s*\|\s*[\d,-]*\s*\|?\s*$/)
    if (contM && currentItem) {
      const val = contM[1].trim()
      if (!val || val.match(/^=+$/) || val.match(/^-+$/)) continue

      const obtM  = val.match(/^Obtain:\s*(.+)/i)
      const rfmM  = val.match(/^Refine from:\s*(.+)/i)
      const rtoM  = val.match(/^Refine into:\s*(.+)/i)
      const sell2 = line.match(/\|\s*([\d,]+)\s*\|\s*$/)

      // Capture sell price whenever present on this line (sell is 2nd numeric col)
      if (sell2 && currentItem.sell === null) {
        const n = parseInt(sell2[1].replace(/,/g, ''))
        if (!isNaN(n)) currentItem.sell = n
      }

      if (obtM)  { currentItem.obtain.push(obtM[1].trim()); lastField = 'obtain'; continue }
      if (rfmM)  { currentItem.refineFrom.push(rfmM[1].trim()); lastField = 'refineFrom'; continue }
      if (rtoM)  { currentItem.refineTo.push(rtoM[1].trim()); lastField = 'refineTo'; continue }

      // Continued line without keyword — append to whichever field we were last filling
      if (val && val.length > 3 && !val.match(/^Note:/i)) {
        if (lastField === 'refineFrom' && currentItem.refineFrom.length > 0)
          currentItem.refineFrom.push(val)
        else if (lastField === 'refineTo' && currentItem.refineTo.length > 0)
          currentItem.refineTo.push(val)
        else if (lastField === 'obtain' && currentItem.obtain.length > 0)
          currentItem.obtain[currentItem.obtain.length - 1] += ' ' + val
        else
          currentItem.useDesc.push(val)
      }
      continue
    }

    // Sell price row: |              |                                        |   50|
    if (currentItem && line.match(/^\|\s*\|\s*\|\s*([\d,]+)\s*\|/)) {
      const n = parseInt(line.match(/\|\s*([\d,]+)\s*\|/)[1].replace(/,/g, ''))
      if (!isNaN(n) && currentItem.sell === null) currentItem.sell = n
    }
  }
  flush()

  // Post-process fixes for known source-file quirks
  // 1. Multi-line item names in the AS source — parser reads only the first-line fragment
  const ITEM_NAME_FIXES = {
    'Demolition': 'Demolition Ammo',
    'Hundred':    'Hundred Needles',
    'Cockatrice': 'Cockatrice Pinion',
    'Mesmerize':  'Mesmerize Blade',
    'Malboro':    'Malboro Tentacle',
    'Power':      'Power Generator',
    "Sorceress'": "Sorceress' Letter",
  }
  // 2. Buy price overrides for items only purchasable via Familiar (not in AS source's price column)
  const ITEM_BUY_FIXES  = { 'Spd-J Scroll': 10000, 'Force Armlet': 20000 }
  // 2b. Sell price overrides where AS source captures incorrect values or misses the sell price
  //     - Demolition Ammo: sell line is on an unparsed continuation row (AS source quirk)
  //     - Force Armlet: AS source has 75 but SI source and wiki confirm 5000
  const ITEM_SELL_FIXES = {
    'Demolition Ammo':  40,
    'Force Armlet':   5000,
    'Hundred Needles': 10000,
    'Cockatrice Pinion': 50,
    'Mesmerize Blade':   50,
    'Malboro Tentacle': 100,
    'Power Generator':  200,
    "Sorceress' Letter": 125,
  }

  for (const it of items) {
    if (ITEM_NAME_FIXES[it.name]) {
      it.name = ITEM_NAME_FIXES[it.name]
      it.id   = `item-${slugify(it.name)}`
    }
    if (it.buy === null && ITEM_BUY_FIXES[it.name] !== undefined) {
      it.buy = ITEM_BUY_FIXES[it.name]
    }
  }
  // Apply sell fixes after name fixes have been applied
  for (const it of items) {
    if (ITEM_SELL_FIXES[it.name] !== undefined) {
      it.sell = ITEM_SELL_FIXES[it.name]
    }
  }

  // 3. Fast Ammo is absent from the AS items list entirely — add it manually
  const hasFastAmmo = items.some(it => it.name === 'Fast Ammo')
  if (!hasFastAmmo) {
    items.push({
      id: 'item-fast-ammo',
      name: 'Fast Ammo',
      section: 'Ammunition',
      buy: 100,
      sell: 5,
      useDesc: "Used in Irvine's Shot Limit Break.",
      obtain: ['Buy from any Junk Shop; buy from Esthar Shop, Esthar Shop!!! (Familiar required) for 100 gil.'],
      refineFrom: [],
      refineTo: [],
    })
  }

  // 4. Normalize Giant's Ring vs Giant Ring naming (wiki uses Giant's Ring)
  for (const it of items) {
    if (it.name === 'Giant Ring') {
      it.name = "Giant's Ring"
      it.id   = 'item-giants-ring'
    }
  }

  // 5. Pet Pals Vol.N -> Pet Pals Vol. N (add space before volume number, matching wiki)
  for (const it of items) {
    const m = it.name.match(/^(Pet Pals Vol\.)(\d)$/)
    if (m) {
      it.name = m[1] + ' ' + m[2]
      it.id   = 'item-' + slugify(it.name)
    }
  }

  // 6. Phoenix Pinion is absent from the AS item list — add it manually
  if (!items.some(it => it.name === 'Phoenix Pinion')) {
    items.push({
      id: 'item-phoenix-pinion',
      name: 'Phoenix Pinion',
      section: 'Attack',
      buy: null,
      sell: 5,
      useDesc: "Summons GF Phoenix in battle, dealing fire-based magic damage to all enemies and reviving any KO'd allies with roughly 12.5% of their max HP.",
      obtain: ['Obtain from Shumi Village (complete the Sculptor sidequest); found in Winhill (Chocobo Road); Lunatic Pandora; D-District Prison 5th floor card player (rare).'],
      refineFrom: ['Mega Phoenix (Tool-RF: 3-1)'],
      refineTo: ['Phoenix Spirit (GFAbl Med-RF: 20-1)'],
    })
  }

  const seenItemIds = new Set()
  return items
    .filter(it => it.name.length > 1 && it.name.length < 40 && !it.name.match(/^Name:/))
    .filter(it => { if (seenItemIds.has(it.id)) return false; seenItemIds.add(it.id); return true })
}

// ─── Weapons parser (SI table format) ────────────────────────────────────────
// Each weapon is a 3-line record:
//   WEAPON NAME                  | 6x M-Stone Piece       | -
//                                | 2x Screw               | -
//   +11 Str  |+255%Hit | 100     | Weapons Monthly March Issue
function parseWeapons() {
  const txt   = read('Walkthroughs/Split_Infinity-Weapon_Remodeling.txt')
  const lines = txt.split('\n')
  const weapons = []

  // Weapon type groups (from section headers)
  let weaponType = 'Unknown'
  const typeRe = /^([A-Z][A-Z ]+)\s+UPGRADES AND CHARACTERISTICS/

  // Base hit rates per weapon type (character's base hit when using that weapon class).
  // SI source lists hit-rate bonuses over these bases; we compute the absolute hit rate
  // (matching values shown in the in-game status screen and on the wiki).
  const HIT_BASE = { GUNBLADE: 0, GLOVE: 98, GUN: 105, WHIP: 103, PINWHEEL: 99, NUNCHAKU: 98 }

  // Pattern: WEAPON NAME (all caps or title-case) followed by | BASE ITEM 1 | BASE ITEM 3
  const nameLine = /^([A-Z][A-Z 0-9']+?)\s+\|\s+(.+?)\s+\|\s+(.*)$/
  // Allow optional whitespace between the sign and digits in Hit (e.g. "+  0%Hit")
  const statLine = /^\s*([+-]\d+\s*Str)\s+\|\s*([+-]\s*\d+%Hit)\s+\|\s*([\d]+)\s+\|\s*(.+)$/

  let pending = null // partially collected weapon

  const flush = () => {
    if (pending && pending.name) weapons.push(pending)
    pending = null
  }

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]
    const t    = line.trim()

    if (!t) continue
    if (t.match(/^[-=]{5,}/) || t.match(/^-\s+-\s+-/)) continue  // dividers

    const typeM = line.match(typeRe)
    if (typeM) { flush(); weaponType = typeM[1].trim(); continue }

    const nameM = t.match(nameLine)
    if (nameM && t.match(/^[A-Z][A-Z 0-9']+\s+\|/)) {
      flush()
      const item1 = nameM[2].trim()
      const item3 = nameM[3].trim()
      const nextLine = lines[i + 1] ?? ''
      const nextParts = nextLine.split('|')
      const item2 = nextParts[1]?.trim() ?? ''
      const item4 = nextParts[2]?.trim() ?? ''

      const wName = nameM[1].trim().replace(/\s+/g, ' ')
        .toLowerCase().replace(/\b[a-z]/g, c => c.toUpperCase())
      pending = {
        id: `weapon-${slugify(wName)}`,
        name: wName,
        type: weaponType,
        materials: [item1, item2, item3, item4]
          .map(s => s.replace(/^-$/, '').trim())
          .filter(Boolean),
        strBonus: 0,
        hitBonus: 0,
        price: 0,
        weaponsMonthly: '',
      }
      continue
    }

    const statM = t.match(statLine)
    if (statM && pending) {
      pending.strBonus     = parseInt(statM[1]) || 0
      // Strip spaces from hit value (e.g. "+  0%Hit" → "+0%Hit") before parsing,
      // then add the weapon type's base hit rate to get the absolute hit rate.
      const rawHit = parseInt(statM[2].replace(/\s/g, '')) || 0
      pending.hitBonus     = Math.min(255, (HIT_BASE[weaponType] ?? 0) + rawHit)
      pending.price        = parseInt(statM[3]) || 0
      pending.weaponsMonthly = statM[4].trim()
      flush()
      continue
    }
  }
  flush()

  const filtered = weapons.filter(w =>
    w.name && w.materials.length > 0 &&
    !w.name.match(/\bName$/i) &&
    !w.materials.some(m => /^BASE ITEM/i.test(m))
  )

  // Fix name capitalisation: title-case logic uppercases "The" → restore lowercase articles
  const WEAPON_NAME_FIXES = { 'Save The Queen': 'Save the Queen' }
  // SI source uses section header "PINWHEEL" for Rinoa's weapon category; rename to in-game term
  const WEAPON_TYPE_FIXES = { 'PINWHEEL': 'BLASTER EDGE' }

  filtered.forEach(w => {
    if (WEAPON_NAME_FIXES[w.name]) {
      w.name = WEAPON_NAME_FIXES[w.name]
      w.id   = `weapon-${slugify(w.name)}`
    }
    if (WEAPON_TYPE_FIXES[w.type]) w.type = WEAPON_TYPE_FIXES[w.type]
  })

  return filtered
}

// ─── Enemy / Bestiary parser (Split_Infinity-Bestiary.txt) ───────────────────
function parseEnemies() {
  const txt  = read('Walkthroughs/Split_Infinity-Bestiary.txt')
  const DIV  = '-'.repeat(79)
  const enemies = []

  // Status abbreviation tables (rows 1 & 2 of STATUS AFFINITIES block)
  const STATUS_ROW1 = ['KO','POI','PTR','DAR','SIL','BER','ZOM','SLE','HAS','SLO','STO','REG','REF']
  const STATUS_ROW2 = ['DOO','PET','FLO','CON','DRA','DGN','PRO','SHE','AUR','INV','DOU','TRI','VI0']
  const STATUS_NAMES = {
    KO:'Death',  POI:'Poison',  PTR:'Petrify',  DAR:'Blind',   SIL:'Silence',
    BER:'Berserk', ZOM:'Zombie', SLE:'Sleep',  HAS:'Haste',   SLO:'Slow',
    STO:'Stop',  REG:'Regen',  REF:'Reflect',
    DOO:'Doom',  PET:'The End', FLO:'Float',   CON:'Confuse', DRA:'Drain',
    DGN:'Degenerator', PRO:'Protect', SHE:'Shell', AUR:'Aura', INV:'Invisible',
    DOU:'Double', TRI:'Triple', VI0:'Vit0',
  }
  // Combat-relevant statuses a player would try to inflict on an enemy
  const COMBAT_STATUS = new Set(['KO','POI','PTR','DAR','SIL','BER','ZOM','SLE','SLO','STO','DOO','CON','DGN'])

  // File structure: DIVIDER / NAME / DIVIDER / STATS / DIVIDER / NAME / DIVIDER / STATS ...
  // Splitting by '\nDIV\n' yields alternating name blocks (1 line) and stats blocks.
  const blocks = txt.split('\n' + DIV + '\n')

  for (let bi = 0; bi < blocks.length - 1; bi++) {
    // A name block is a single line of ALL CAPS (no embedded newlines)
    const rawName = blocks[bi].trim()
    if (!rawName || rawName.includes('\n')) continue
    if (!rawName.match(/^[A-Z][A-Z0-9 '\-]{1,38}$/)) continue
    if (rawName.match(/^=+|BESTIARY|TABLE OF/)) continue

    // Stats are in the immediately following block
    const block = blocks[bi + 1]
    if (!block) continue

    // ── Header row: LV RANGE header line carries Common card ────────────────
    const hdrM = block.match(/LV RANGE[^\n]*Common card:\s*([^\n|]+?)(?:\s*\|\s*LV-UD)?[\n|]/)
    // Data row: actual numbers + Rare card + LV-UD flag
    const datM = block.match(/(\d+)\s*~\s*(\d+)\*?\d*\s*\|\s*([\d,]+)\s*~\s*([\d,]+)\*?\d*\s*\|\s*(\d+)\s*\|\s*Rare card\s*:\s*([^\n|]+?)\s*\|\s*(yes|no)/)

    if (!datM) continue // skip blocks without recognisable stat rows (TOC, headers, etc.)

    const expM = block.match(/EXP:\s*([\d,]+)/)

    // ── Elemental affinities: header row is FIRE | ICE | …, value row is x N | x N | … ──
    const elemNames = ['fire', 'ice', 'thunder', 'earth', 'poison', 'wind', 'water', 'holy', 'gravity']
    const elementals = {}
    const elemValM = block.match(/ELEMENTAL AFFINITIES[-\s]*\nFIRE[^\n]+\n([^\n]+)/)
    if (elemValM) {
      const vals = elemValM[1].split('|').map(v => v.trim())
      elemNames.forEach((name, idx) => {
        const v = vals[idx] ?? ''
        // Store anything notable (not standard x 1 or x1)
        if (v && v !== 'x 1' && v !== 'x1' && v !== '') elementals[name] = v
      })
    }

    // ── Drawable magic: lines in DRAWABLE MAGIC section before MUGGED ITEMS ──
    const drawSection = block.match(/DRAWABLE MAGIC[\s\S]+?(?=Base chance:\s*[\*\d]+\s*\/256\s*[-]+\s*MUGGED|$)/)
    const drawMagic = drawSection
      ? [...new Set(
          [...drawSection[0].matchAll(/L[\s\d~]+\|\s*([^\n|]+)/g)]
            .flatMap(m => m[1].split(',').map(s => s.trim()))
            .filter(s => s && !/^Couldn|^Delicious|^Refreshing|^Feel|^Hmm/i.test(s) && s !== '---')
        )]
      : []

    // ── Mug items: first level-range line in MUGGED ITEMS section ────────────
    const mugM = block.match(/MUGGED ITEMS[-\s]*\n(L[\s\d~]+\|\s*[^\n]+)/)
    const mug  = mugM ? mugM[1].replace(/^L[\s\d~]+\|\s*/, '').trim() : null

    // ── Drop items: first level-range line in DROPPED ITEMS section ──────────
    const dropM = block.match(/DROPPED ITEMS[^\n]*\n(L[\s\d~]+\|\s*[^\n]+)/)
    const drop  = dropM ? dropM[1].replace(/^L[\s\d~]+\|\s*/, '').trim() : null

    // ── Card drop from DROPPED ITEMS header line ──────────────────────────────
    const cardDropM = block.match(/Card drop:\s*([^\n\|]+)/)
    const cardDrop  = cardDropM ? cardDropM[1].trim() : null

    // ── Scan text ─────────────────────────────────────────────────────────────
    const scanM = block.match(/SCAN[-\s]*\n([\s\S]+?)(?:-{5}|ATTACK LIST|$)/)
    const scan  = scanM
      ? scanM[1].split('\n').map(l => l.trim()).filter(Boolean).join(' ').slice(0, 300)
      : ''

    const commonCard = hdrM ? hdrM[1].trim().replace(/Can'?t turn into a card!?/i, '').trim() || null : null
    const rareCard   = datM[6].trim().replace(/Can'?t turn into a card!?/i, '').trim() || null

    // ── Status affinities ──────────────────────────────────────────────────────
    // Parse which combat-relevant statuses the enemy is immune to ("-")
    // and which it is susceptible to (non-zero value).
    const statusImmune     = []
    const statusVulnerable = []
    const row1M = block.match(/^KO\s+\|[^\n]+\n([^\n]+)/m)
    if (row1M) {
      const vals = row1M[1].split('|').map(v => v.trim())
      STATUS_ROW1.forEach((abbr, idx) => {
        if (!COMBAT_STATUS.has(abbr)) return
        const v = vals[idx] ?? '-'
        if (v === '-')               statusImmune.push(STATUS_NAMES[abbr])
        else if (v && v !== '0')     statusVulnerable.push(STATUS_NAMES[abbr])
      })
    }
    const row2M = block.match(/^DOO\s+\|[^\n]+\n([^\n]+)/m)
    if (row2M) {
      const vals = row2M[1].split('|').map(v => v.trim())
      STATUS_ROW2.forEach((abbr, idx) => {
        if (!COMBAT_STATUS.has(abbr)) return
        const v = vals[idx] ?? '-'
        if (v === '-')               statusImmune.push(STATUS_NAMES[abbr])
        else if (v && v !== '0')     statusVulnerable.push(STATUS_NAMES[abbr])
      })
    }

    // ── Devour ─────────────────────────────────────────────────────────────────
    // The DRAWABLE MAGIC / DEVOUR TASTE block has three columns per row:
    //   L range | draw magic spells | devour taste text
    // We extract only the third column (devour taste) and use the highest-level
    // entry's taste (most informative for players fighting end-game).
    // null = enemy cannot be devoured at any level.
    let devour = null
    const devourSectionM = block.match(/DEVOUR TASTE[-\s]+\n([\s\S]+?)(?:Base chance:|[-]{5,})/)
    if (devourSectionM) {
      const devourTastes = devourSectionM[1].split('\n')
        .map(l => l.trim())
        .filter(l => /^L[\s\d~]+\|/.test(l))
        .map(l => {
          // "L range | draw magic | devour taste"  ← third | section is taste
          const parts = l.split('|')
          return parts[2]?.trim() ?? null
        })
        .filter(t => t && !/Couldn'?t Devour/i.test(t))
      if (devourTastes.length > 0) {
        devour = devourTastes[devourTastes.length - 1]  // highest-level result
      }
    }

    // ── Abilities ──────────────────────────────────────────────────────────────
    // Extract attack/ability names from the ATTACK LIST section.
    const abilities = []
    const abilSectionM = block.match(/ATTACK LIST[-\s]+\n([\s\S]+?)(?:-{5,}|$)/)
    if (abilSectionM) {
      for (const line of abilSectionM[1].split('\n')) {
        // Match "N. (Attack Name) -" or "N. Attack Name -"
        const am = line.match(/^\s*\d+\.\s+(?:\(([^)]+)\)|([A-Za-z][A-Za-z0-9 '\/\-]+?))\s+-/)
        if (am) {
          const name = (am[1] || am[2]).trim()
          if (name && name.length > 1 && !abilities.includes(name)) abilities.push(name)
        }
      }
    }

    // Title-case the name for display (e.g. ABYSS WORM → Abyss Worm)
    const displayName = rawName.toLowerCase().replace(/\b[a-z]/g, c => c.toUpperCase())

    enemies.push({
      id:   `enemy-${slugify(rawName)}`,
      name: displayName,
      lvMin: parseInt(datM[1]),
      lvMax: parseInt(datM[2]),
      hpMin: parseInt(datM[3].replace(/,/g, '')),
      hpMax: parseInt(datM[4].replace(/,/g, '')),
      ap:    parseInt(datM[5]),
      exp:   expM ? parseInt(expM[1].replace(/,/g, '')) : 0,
      lvUp:  datM[7] === 'yes',
      cards: { common: commonCard, rare: rareCard },
      elementals,
      statusImmune,
      statusVulnerable,
      drawMagic,
      devour,
      abilities,
      mug,
      drop,
      cardDrop,
      scan,
    })
  }

  return enemies.filter(e => e.name.length > 1 && e.name.length < 45)
}

// ─── Main ─────────────────────────────────────────────────────────────────────
console.log('── FFVIII Master Data Builder (Strict Mode) ──\n')
console.log(`Inventory: ${ACHIEVEMENTS_34.length} achievements verified:`)
ACHIEVEMENTS_34.forEach((a, i) =>
  console.log(`  ${String(i + 1).padStart(2)}. ${a.title.padEnd(22)} [${a.type.padEnd(10)}] → ${a.chapterHint ?? 'cumulative'}`)
)

// ── Parse walkthrough ─────────────────────────────────────────────────────────
console.log('\nParsing walkthrough prose (strict ASCII map stripping)...')
const wt = parseWalkthroughProse()
console.log(`  AS chapters found: ${Object.keys(wt).length}`)

// ── Before / After sample ─────────────────────────────────────────────────────
console.log('\n── SAMPLE: Balamb Garden Before/After ──')
const ch1Raw = wt[1]
if (ch1Raw) {
  console.log('  AFTER (rewritten, map stripped) — first 2 paragraphs:')
  ch1Raw.paragraphs.slice(0, 2).forEach((p, i) =>
    console.log(`  [${i}] ${p.slice(0, 140)}${p.length > 140 ? '…' : ''}`)
  )
  // Map lines look like "| Cafetaria  Dormitory" (pipe-leading) — prose refs are fine
  const hasMapLeak = ch1Raw.paragraphs.some(p =>
    /\|\s+(Cafetaria|Infirmary|Dormitory|Parking Lot)/.test(p) ||
    /\|\s+Quad\s+-\s+-\s+Lobby/.test(p)
  )
  console.log(hasMapLeak
    ? '  ⚠️  MAP TEXT LEAKED into paragraphs — check isMapBlock logic'
    : '  ✓  ASCII map fully stripped from chapter 1')
  const hasItems = ch1Raw.paragraphs.some(p => p.toLowerCase().includes('occult fan') || p.toLowerCase().includes('potions'))
  console.log(hasItems
    ? '  ✓  Item references (Occult Fan I / starting inventory) preserved'
    : '  ⚠️  No item references found — check paragraph extraction')
}

// ── Parse SI walkthrough (fallback content for unmapped chapters) ─────────────
console.log('\nParsing SI walkthrough prose (fallback)...')
const si = parseSIWalkthrough()
console.log(`  SI missions found: ${Object.keys(si).length}`)

// ── Build boss lookup map ─────────────────────────────────────────────────────
console.log('\nBuilding boss lookup...')
const bossLookup = buildBossLookup(wt, si)
console.log(`  Boss entries indexed: ${Object.keys(bossLookup).length}`)

// ── Assemble chapters ─────────────────────────────────────────────────────────
console.log('\nAssembling chapters...')
let chapters = assembleChapters(wt, si, bossLookup)
const curatedCount  = STORY_CHAPTERS.filter(ch => CHAPTER_CONTENT[ch.id]).length

// ── Prepend reference chapters (disc 0) ───────────────────────────────────────
const refChapters = REFERENCE_CHAPTERS.map((r, i) => ({
  id:          r.id,
  title:       r.title,
  disc:        0,
  index:       i + 1,
  content:     r.content,
  checkpoints: [],
  encounters:  [],
}))
// Index story chapters per-disc (1, 2, 3… within each disc)
const discCounts = {}
chapters = chapters.map(ch => {
  discCounts[ch.disc] = (discCounts[ch.disc] ?? 0) + 1
  return { ...ch, index: discCounts[ch.disc] }
})
chapters = [...refChapters, ...chapters]
console.log(`  Reference chapters: ${refChapters.length}`)
const withContent   = chapters.filter(c => c.content.length > 0).length
const unresolvedChs = chapters.filter(c => c.content.includes('{{BOSS:'))
console.log(`  ${withContent}/${chapters.length} chapters with content (${curatedCount} curated, ${chapters.length - curatedCount} parser fallback)`)
if (unresolvedChs.length > 0) {
  console.log(`  ⚠️  Unresolved {{BOSS:}} placeholders in: ${unresolvedChs.map(c => c.id).join(', ')}`)
  unresolvedChs.forEach(c => {
    const hits = [...c.content.matchAll(/\{\{BOSS:([^}]+)\}\}/g)].map(m => m[1])
    console.log(`     ${c.id}: ${hits.join(', ')}`)
  })
} else {
  console.log('  ✓ All {{BOSS:}} placeholders resolved')
}

// ── Parse missables ───────────────────────────────────────────────────────────
console.log('\nParsing missables...')
const missables = parseMissables()
console.log(`  Missables: ${missables.length}`)
chapters = injectMissables(chapters, missables)

// ── Parse lookup tables ────────────────────────────────────────────────────────
console.log('\nParsing lookup tables...')
const gfs       = parseGFs()
const cards     = parseCards()
const refinement = parseRefinement()
const items     = parseItems()
const weapons   = parseWeapons()
const enemies   = parseEnemies()
console.log(`  GFs: ${gfs.length}`)
console.log(`  Cards: ${cards.length}`)
console.log(`  Refinement abilities: ${refinement.length}`)
console.log(`  Items: ${items.length}`)
console.log(`  Weapons: ${weapons.length}`)
console.log(`  Enemies: ${enemies.length}`)

// ─── Disc-by-disc batch save ──────────────────────────────────────────────────
console.log('\nBatch saving disc files...')
for (const disc of [1, 2, 3, 4]) {
  const discChapters = chapters.filter(c => c.disc === disc)
  const discAchs     = ACHIEVEMENTS_34.filter(a => a.disc === disc)
  const discMisses   = missables.filter(m =>
    discChapters.some(c => c.checkpoints.some(cp => cp.id === m.id))
  )

  const tempData = {
    disc,
    chapters: discChapters,
    achievements: discAchs,
    missables: discMisses,
  }
  const tempPath = `${TMP}temp_disc${disc}.json`
  writeFileSync(tempPath, JSON.stringify(tempData, null, 2))
  console.log(`  ✓ temp_disc${disc}.json — ${discChapters.length} chapters, ${discAchs.length} achievements, ${discMisses.length} missables`)
}

// ─── Assemble final output ────────────────────────────────────────────────────
const output = {
  meta: {
    generated:       new Date().toISOString(),
    achievementCount: ACHIEVEMENTS_34.length,
    chapterCount:     chapters.length,
    missableCount:    missables.length,
    itemCount:        items.length,
    weaponCount:      weapons.length,
  },
  chapters: chapters.map(({ slug: _s, ...rest }) => rest),
  checklists: {
    achievements: ACHIEVEMENTS_34,
    missables,
  },
  lookup: { gfs, cards, refinement, items, weapons, enemies },
}

const outPath = `${DIST}ff8_master.json`
ensureDir(DIST)
writeFileSync(outPath, JSON.stringify(output, null, 2))
const kb = (JSON.stringify(output).length / 1024).toFixed(1)
console.log(`\n✓ Wrote ${outPath}`)
console.log(`  Size: ${kb} KB`)
console.log(`\nDone. ${chapters.length} chapters | ${ACHIEVEMENTS_34.length} achievements | ${missables.length} missables`)
console.log(`      ${gfs.length} GFs | ${cards.length} cards | ${items.length} items | ${weapons.length} weapons | ${enemies.length} enemies`)
