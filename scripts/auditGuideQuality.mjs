import fs from 'node:fs'
import path from 'node:path'

const root = process.cwd()
const data = JSON.parse(fs.readFileSync(path.join(root, 'src/data/ff8_master.json'), 'utf8'))

const CALLOUT_RE = /^\{\{CALLOUT:([a-z-]+)\|([^}]+)\}\}/
const VALID_CALLOUTS = new Set([
  'achievement',
  'boss',
  'card',
  'character',
  'controls',
  'drawing',
  'enemy',
  'gf',
  'hint',
  'item',
  'loot',
  'map',
  'mechanics',
  'missable',
  'note',
  'perfect',
  'perfect-game',
  'point',
  'preparation',
  'refinement',
  'relationship',
  'route',
  'shop',
  'sidequest',
  'spoiler',
  'status',
  'story',
  'training',
  'treasure',
  'warning',
])

const SOURCE_TERMS = [
  ['game', 'faqs'],
  ['game', 'spot'],
  ['bo', 'ver'],
  ['source', ' guide'],
  ['source', ' content'],
  ['older', ' guide'],
  ['724', '31'],
  ['507', '75'],
  ['517', '41'],
  ['372', '11'],
].map(parts => parts.join(''))
const SOURCE_RE = new RegExp(SOURCE_TERMS.join('|'), 'i')
const TYPO_RE = /\b(teh|hte|recieve|seperate|occured|untill|becuase|definately|wich|alot)\b/i
const REFERENCE_COPY_RE = /\bclick here\b|irregardless|charcter/i
const PLACEHOLDER_TERMS = [
  'TBD',
  'TODO',
  'FIXME',
  'placeholder',
  ['unknown', ' source'].join(''),
  ['source', ' gift'].join(''),
]
const PLACEHOLDER_RE = new RegExp(`\\b(${PLACEHOLDER_TERMS.join('|')})\\b`, 'i')
const MARKDOWN_SEPARATOR_RE = /^\|?\s*:?-{3,}:?\s*(?:\|\s*:?-{3,}:?\s*)+\|?$/
const CONTROL_CHAR_RE = /[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/

const failures = []
const warnings = []

function addFailure(id, type, message, sample = '') {
  failures.push({ id, type, message, sample: sample.replace(/\s+/g, ' ').slice(0, 220) })
}

function addWarning(id, type, message, sample = '') {
  warnings.push({ id, type, message, sample: sample.replace(/\s+/g, ' ').slice(0, 220) })
}

function paragraphs(content) {
  return (content ?? '').split('\n\n').map(p => p.trim()).filter(Boolean)
}

function isMarkdownTable(lines) {
  if (lines.length < 3) return false
  if (!lines[0].includes('|') || !lines[1].includes('|')) return false
  const separatorCells = lines[1].trim().replace(/^\|/, '').replace(/\|$/, '').split('|')
  return separatorCells.length >= 2 && separatorCells.every(cell => /^:?-{3,}:?$/.test(cell.trim()))
}

function findTableBlocks(lines) {
  const blocks = []
  for (let i = 0; i + 2 < lines.length; i += 1) {
    if (isMarkdownTable(lines.slice(i, i + 3))) {
      let end = i + 2
      while (end + 1 < lines.length && lines[end + 1].includes('|')) end += 1
      blocks.push({ start: i, end, lines: lines.slice(i, end + 1) })
      i = end
    }
  }
  return blocks
}

function countAdjacentDuplicateBands(enemy, field, valueKey) {
  const bands = enemy[field] ?? []
  let count = 0
  for (let i = 1; i < bands.length; i += 1) {
    const prev = bands[i - 1]
    const cur = bands[i]
    if (prev.lvMax + 1 !== cur.lvMin) continue
    const same = valueKey === 'spells'
      ? JSON.stringify(prev.spells) === JSON.stringify(cur.spells)
      : prev.value === cur.value
    if (same) count += 1
  }
  return count
}

const CHECKPOINT_ANCHOR_STOP_WORDS = new Set([
  'the',
  'and',
  'from',
  'with',
  'before',
  'after',
  'during',
  'into',
  'draw',
  'card',
  'missable',
  'achievement',
  'task',
  'scene',
  'point',
  'route',
  'setup',
  'battle',
  'boss',
  'obtain',
  'unlock',
  'use',
  'return',
  'complete',
  'optional',
  'first',
])

function anchorTokens(text) {
  return String(text)
    .toLowerCase()
    .replace(/[^a-z0-9+#? -]/g, ' ')
    .split(/\s+/)
    .filter(token => token.length >= 4 && !CHECKPOINT_ANCHOR_STOP_WORDS.has(token))
}

for (const chapter of data.chapters) {
  const paras = paragraphs(chapter.content)
  const seen = new Map()

  paras.forEach((para, index) => {
    const paraNum = index + 1
    const lines = para.split('\n').map(line => line.trim()).filter(Boolean)
    const directive = para.match(CALLOUT_RE)

    if (directive && !VALID_CALLOUTS.has(directive[1])) {
      addFailure(chapter.id, 'invalid-callout-kind', `Unknown callout kind "${directive[1]}" at paragraph ${paraNum}.`, para)
    }

    if (para.startsWith('{{CALLOUT:') && !directive) {
      addFailure(chapter.id, 'malformed-callout', `Malformed callout directive at paragraph ${paraNum}.`, para)
    }

    if (SOURCE_RE.test(para)) {
      addFailure(chapter.id, 'source-reference', `Source/reference wording leaked at paragraph ${paraNum}.`, para)
    }

    if (PLACEHOLDER_RE.test(para)) {
      addFailure(chapter.id, 'placeholder-copy', `Placeholder copy remains at paragraph ${paraNum}.`, para)
    }

    if (CONTROL_CHAR_RE.test(para)) {
      addFailure(chapter.id, 'control-character', `Hidden control character at paragraph ${paraNum}.`, para)
    }

    if (TYPO_RE.test(para)) {
      addFailure(chapter.id, 'typo-smell', `Common typo smell at paragraph ${paraNum}.`, para.match(TYPO_RE)?.[0] ?? para)
    }

    const tableBlocks = findTableBlocks(lines)
    const separatorOnly = lines.some(line => MARKDOWN_SEPARATOR_RE.test(line))
    if (separatorOnly && tableBlocks.length === 0) {
      addFailure(chapter.id, 'malformed-markdown-table', `Markdown separator appears without a valid table at paragraph ${paraNum}.`, para)
    }

    if (!directive && !para.startsWith('**Boss:') && !para.startsWith('Strategy') && !tableBlocks.length && para.length > 900) {
      addWarning(chapter.id, 'long-plain-paragraph', `Plain paragraph ${paraNum} is very long and may need splitting or formatting.`, para)
    }

    if (directive && para.length > 1800 && !tableBlocks.length && !lines.some(line => /^[-*]\s|^\d+\.\s/.test(line))) {
      addWarning(chapter.id, 'dense-callout', `Callout "${directive[2]}" is very dense without bullets or a table.`, para)
    }

    const dedupeKey = para.toLowerCase().replace(/\s+/g, ' ').slice(0, 260)
    if (dedupeKey.length > 140 && seen.has(dedupeKey)) {
      addFailure(chapter.id, 'duplicate-paragraph', `Paragraph ${paraNum} duplicates paragraph ${seen.get(dedupeKey)}.`, para)
    } else {
      seen.set(dedupeKey, paraNum)
    }
  })

  for (let i = 0; i < paras.length; i += 1) {
    if (!paras[i].startsWith('**Boss:')) continue
    let j = i + 1
    while (j < paras.length && paras[j].startsWith('**Boss:')) j += 1
    const next = paras[j] ?? ''
    if (!next.startsWith('Strategy')) {
      addWarning(chapter.id, 'boss-without-immediate-strategy', `Boss block at paragraph ${i + 1} is not followed by a Strategy block.`, paras[i])
    }
    i = j
  }
}

function auditNestedReferenceText(value, pathParts = []) {
  if (typeof value === 'string') {
    const id = pathParts.join('.') || 'lookup'
    if (SOURCE_RE.test(value)) {
      addFailure(id, 'source-reference', 'Source/reference wording leaked in reference data.', value)
    }
    if (PLACEHOLDER_RE.test(value)) {
      addFailure(id, 'placeholder-copy', 'Placeholder copy remains in reference data.', value)
    }
    if (CONTROL_CHAR_RE.test(value)) {
      addFailure(id, 'control-character', 'Hidden control character remains in reference data.', value)
    }
    if (TYPO_RE.test(value) || REFERENCE_COPY_RE.test(value)) {
      addFailure(id, 'reference-copy-smell', 'Reference prose has typo/source-shaped wording.', value)
    }
    if (value.length > 700) {
      addWarning(id, 'dense-reference-prose', 'Reference prose is very long and may need splitting or UI formatting.', value)
    }
    return
  }

  if (Array.isArray(value)) {
    value.forEach((item, index) => auditNestedReferenceText(item, [...pathParts, String(index)]))
    return
  }

  if (value && typeof value === 'object') {
    Object.entries(value).forEach(([key, item]) => auditNestedReferenceText(item, [...pathParts, key]))
  }
}

auditNestedReferenceText(data.lookup, ['lookup'])

const sidequestSourcePath = path.join(root, 'src/data/sidequests.ts')
const sidequestSource = fs.existsSync(sidequestSourcePath) ? fs.readFileSync(sidequestSourcePath, 'utf8') : ''
if (sidequestSource) {
  if (SOURCE_RE.test(sidequestSource)) {
    addFailure('sidequests', 'source-reference', 'Source/reference wording leaked in sidequest data.')
  }
  if (PLACEHOLDER_RE.test(sidequestSource)) {
    addFailure('sidequests', 'placeholder-copy', 'Placeholder copy remains in sidequest data.')
  }
  if (TYPO_RE.test(sidequestSource)) {
    addFailure('sidequests', 'typo-smell', 'Common typo smell remains in sidequest data.', sidequestSource.match(TYPO_RE)?.[0] ?? '')
  }
}

function auditControlCharacters(value, pathParts = []) {
  if (typeof value === 'string') {
    if (CONTROL_CHAR_RE.test(value)) {
      addFailure(pathParts.join('.') || 'data', 'control-character', 'Hidden control character remains in guide data.', value)
    }
    return
  }

  if (Array.isArray(value)) {
    value.forEach((item, index) => auditControlCharacters(item, [...pathParts, String(index)]))
    return
  }

  if (value && typeof value === 'object') {
    Object.entries(value).forEach(([key, item]) => auditControlCharacters(item, [...pathParts, key]))
  }
}

auditControlCharacters(data, ['data'])

const chapterById = new Map(data.chapters.map(chapter => [chapter.id, chapter]))
const checkpointById = new Map()
const missableCheckpointTitles = new Map()
const EXPECTED_MISSABLE_ROUTE = [
  'Siren',
  'X-ATM092',
  'Battle Meter, Magical Lamp',
  'Angelo Recover, Angelo Reverse',
  'Girl Next Door',
  'Pet Nametag #2',
  'Location Displayer',
  'Carbuncle',
  'Eyes on Me',
  'Pet Nametag #1',
  'Character Report',
  'Leviathan',
  "Master Fisherman's Quest, Occult Fan III",
  'Pandemona',
  'Cerberus',
  'Alexander',
  'Esthar / Time Compression tutorial entries',
  'Timber Maniacs',
  'Zone',
  'Occult Fan IV',
  'End of Disc 3',
  'Missed GFs',
  'Eden',
  'Ultima Weapon, Omega Weapon',
  'PuPu Card',
]
for (const chapter of data.chapters) {
  const chapterParas = paragraphs(chapter.content)
  for (const checkpoint of chapter.checkpoints ?? []) {
    checkpointById.set(checkpoint.id, { chapter, checkpoint })
    if (checkpoint.type === 'missable') {
      missableCheckpointTitles.set(String(checkpoint.label).toLowerCase(), { chapter, checkpoint })
    }
  }

  for (const checkpoint of chapter.checkpoints ?? []) {
    if (!chapterParas.length) continue
    const idx = Math.min(checkpoint.index, chapterParas.length - 1)
    const nearbyText = [chapterParas[idx - 1], chapterParas[idx], chapterParas[idx + 1]].filter(Boolean).join(' ').toLowerCase()
    const labelTokens = anchorTokens(checkpoint.label)
    const descriptionTokens = anchorTokens(checkpoint.description).slice(0, 12)
    const labelHit = labelTokens.some(token => nearbyText.includes(token))
    const descriptionHit = descriptionTokens.some(token => nearbyText.includes(token))
    if (!labelHit && !descriptionHit) {
      addFailure(
        chapter.id,
        'checkpoint-anchor-mismatch',
        `Checkpoint "${checkpoint.label}" is not anchored near matching route text at paragraph ${idx + 1}.`,
        checkpoint.description,
      )
    }
  }
}

for (const match of sidequestSource.matchAll(/chapterId:\s*'([^']+)'/g)) {
  if (!chapterById.has(match[1])) {
    addFailure('sidequests', 'invalid-sidequest-placement', `Sidequest placement references unknown chapter: ${match[1]}`)
  }
}

const missables = data.checklists?.missables ?? []
const missableTitles = missables.map(missable => missable.title)
if (missableTitles.length !== EXPECTED_MISSABLE_ROUTE.length) {
  addFailure('missables', 'missable-route-count', `Expected ${EXPECTED_MISSABLE_ROUTE.length} route missables, found ${missableTitles.length}.`, missableTitles.join(' | '))
}
EXPECTED_MISSABLE_ROUTE.forEach((title, index) => {
  if (missableTitles[index] !== title) {
    addFailure('missables', 'missable-route-order', `Missable route item ${index + 1} should be "${title}" but found "${missableTitles[index] ?? 'missing'}".`, missableTitles.join(' | '))
  }
})
const missableIdSet = new Set()
for (const missable of missables) {
  if (missableIdSet.has(missable.id)) {
    addFailure('missables', 'duplicate-missable-id', `Duplicate global missable id: ${missable.id}`, missable.title)
  }
  missableIdSet.add(missable.id)

  if (!missable.chapterId || !chapterById.has(missable.chapterId)) {
    addFailure('missables', 'unanchored-missable', `Global missable is not anchored to a valid chapter: ${missable.title}`, missable.description)
    continue
  }
  if (typeof missable.disc !== 'number') {
    addFailure('missables', 'unanchored-missable-disc', `Global missable has no disc number: ${missable.title}`, missable.description)
  }

  const ownerChapter = chapterById.get(missable.chapterId)
  const idMatch = checkpointById.get(missable.id)
  const titleMatch = missableCheckpointTitles.get(String(missable.title).toLowerCase())
  const chapterText = `${ownerChapter?.content ?? ''}\n${JSON.stringify(ownerChapter?.checkpoints ?? [])}`
  const titleWords = String(missable.title).split(/[,/&]+/).map(word => word.trim()).filter(word => word.length >= 4)
  const titleMentioned = titleWords.some(word => chapterText.toLowerCase().includes(word.toLowerCase()))
  if (!idMatch && !titleMatch && !titleMentioned) {
    addFailure('missables', 'missable-not-visible-in-owner-chapter', `Global missable is not visible in its owner chapter: ${missable.title}`, `${missable.chapterId}: ${missable.description}`)
  }
}

const visualSource = fs.existsSync(path.join(root, 'src/components/views/VisualAids.tsx'))
  ? fs.readFileSync(path.join(root, 'src/components/views/VisualAids.tsx'), 'utf8')
  : ''
const dataSource = JSON.stringify(data)
const assetRefs = new Set()
for (const text of [visualSource, dataSource]) {
  for (const match of text.matchAll(/images\/[A-Za-z0-9_./'’() -]+\.(?:png|jpe?g|webp|gif)/g)) {
    assetRefs.add(match[0].replace(/['")\s]+$/g, ''))
  }
}

for (const ref of assetRefs) {
  if (!fs.existsSync(path.join(root, 'public', ref))) {
    addFailure('assets', 'missing-image-asset', `Referenced image does not exist: ${ref}`)
  }
}

let duplicateBandOpportunities = 0
for (const enemy of data.lookup.enemies) {
  duplicateBandOpportunities += countAdjacentDuplicateBands(enemy, 'drawMagicByLevel', 'spells')
  duplicateBandOpportunities += countAdjacentDuplicateBands(enemy, 'mugByLevel', 'value')
  duplicateBandOpportunities += countAdjacentDuplicateBands(enemy, 'dropByLevel', 'value')
  duplicateBandOpportunities += countAdjacentDuplicateBands(enemy, 'devourByLevel', 'value')
}

const report = {
  generatedAt: new Date().toISOString(),
  chapters: data.chapters.length,
  failures,
  warnings,
  metrics: {
    referencedImages: assetRefs.size,
    duplicateEnemyLevelBandOpportunitiesHandledAtRender: duplicateBandOpportunities,
  },
}

fs.mkdirSync(path.join(root, 'tmp'), { recursive: true })
fs.writeFileSync(path.join(root, 'tmp/guide-quality-audit.json'), JSON.stringify(report, null, 2))

if (failures.length) {
  console.error(`Guide quality audit failed: ${failures.length} failure(s), ${warnings.length} warning(s).`)
  for (const failure of failures.slice(0, 50)) {
    console.error(`- ${failure.id} ${failure.type}: ${failure.message}`)
  }
  process.exit(1)
}

console.log(`Guide quality audit passed: ${data.chapters.length} chapters, ${warnings.length} warning(s).`)
if (warnings.length) {
  console.log(`Review warnings in tmp/guide-quality-audit.json.`)
}
