import { build } from 'esbuild'

const source = `
  import data from './src/data/ff8_master.json'
  import { SIDEQUESTS } from './src/data/sidequests.ts'
  import { buildSearchResults } from './src/hooks/useSearch.ts'

  export function search(query) {
    return buildSearchResults(data, SIDEQUESTS, query)
  }
`

const bundle = await build({
  stdin: {
    contents: source,
    resolveDir: process.cwd(),
    sourcefile: 'search-relevance-entry.ts',
    loader: 'ts',
  },
  bundle: true,
  platform: 'node',
  format: 'esm',
  write: false,
  logLevel: 'silent',
})

const moduleUrl = `data:text/javascript;base64,${Buffer.from(bundle.outputFiles[0].text).toString('base64')}`
const { search } = await import(moduleUrl)

const resultKey = result => `${result.type}:${result.title}`

function findIndex(results, expected) {
  return results.findIndex(result => {
    if (expected.type && result.type !== expected.type) return false
    const title = result.title.toLowerCase()
    const expectedTitle = expected.title?.toLowerCase()
    if (!expectedTitle) return true
    if (expected.match === 'includes') return title.includes(expectedTitle)
    if (expected.match === 'startsWith') return title.startsWith(expectedTitle)
    return title === expectedTitle
  })
}

const suites = [
  {
    query: 'Ifrit',
    topIncludes: [
      { type: 'gf', title: 'Ifrit' },
      { type: 'card', title: 'Ifrit' },
      { type: 'enemy', title: 'Ifrit' },
      { type: 'refinement', title: 'Ifrit', match: 'includes' },
    ],
    before: [
      [{ type: 'gf', title: 'Ifrit' }, { type: 'achievement', title: 'Ifrit' }],
      [{ type: 'card', title: 'Ifrit' }, { type: 'ability' }],
      [{ type: 'enemy', title: 'Ifrit' }, { type: 'ability' }],
      [{ type: 'refinement', title: 'Ifrit', match: 'includes' }, { type: 'ability' }],
    ],
  },
  {
    query: 'Queza',
    topIncludes: [
      { type: 'gf', title: 'Quezacotl' },
      { type: 'card', title: 'Quezacotl' },
    ],
    before: [
      [{ type: 'gf', title: 'Quezacotl' }, { type: 'ability' }],
      [{ type: 'card', title: 'Quezacotl' }, { type: 'ability' }],
    ],
  },
  {
    query: 'Bahamut',
    topIncludes: [
      { type: 'gf', title: 'Bahamut' },
      { type: 'card', title: 'Bahamut' },
    ],
    before: [
      [{ type: 'gf', title: 'Bahamut' }, { type: 'ability' }],
      [{ type: 'card', title: 'Bahamut' }, { type: 'ability' }],
    ],
  },
  {
    query: 'Card Mod',
    topIncludes: [
      { type: 'ability', title: 'Card Mod' },
      { type: 'refinement', title: 'Card Mod' },
    ],
    before: [
      [{ type: 'ability', title: 'Card Mod' }, { type: 'item' }],
      [{ type: 'refinement', title: 'Card Mod' }, { type: 'item' }],
    ],
  },
  {
    query: 'Pulse Ammo',
    topIncludes: [
      { type: 'item', title: 'Pulse Ammo' },
      { type: 'refinement', title: 'Pulse Ammo', match: 'includes' },
      { type: 'weapon', title: 'Lion Heart' },
    ],
    before: [
      [{ type: 'item', title: 'Pulse Ammo' }, { type: 'weapon', title: 'Lion Heart' }],
    ],
  },
  {
    query: 'Str-J',
    topIncludes: [
      { type: 'ability', title: 'Str-J' },
      { type: 'item', title: 'Str-J Scroll' },
    ],
  },
  {
    query: 'Mad Rush',
    topIncludes: [
      { type: 'ability', title: 'Mad Rush' },
    ],
  },
  {
    query: 'Ultima',
    topIncludes: [
      { type: 'magic', title: 'Ultima' },
      { type: 'card', title: 'Ultima Weapon' },
      { type: 'item', title: 'Ultima Stone' },
    ],
  },
  {
    query: 'Rinoa',
    topIncludes: [
      { type: 'card', title: 'Rinoa' },
      { type: 'enemy', title: 'Rinoa (Adel battle)' },
    ],
    before: [
      [{ type: 'card', title: 'Rinoa' }, { type: 'refinement' }],
    ],
  },
  {
    query: 'Fire Cavern',
    topIncludes: [
      { type: 'gf', title: 'Ifrit' },
    ],
  },
  {
    query: 'About This Guide',
    topIncludes: [
      { type: 'chapter', title: 'About This Guide' },
    ],
  },
]

const failures = []

for (const suite of suites) {
  const results = search(suite.query)
  const top = results.slice(0, 8).map(resultKey)
  console.log(`${suite.query}: ${top.join(' | ')}`)

  for (const expected of suite.topIncludes ?? []) {
    const index = findIndex(results.slice(0, 8), expected)
    if (index === -1) {
      failures.push(`${suite.query}: expected ${JSON.stringify(expected)} in top 8`)
    }
  }

  for (const [first, second] of suite.before ?? []) {
    const firstIndex = findIndex(results, first)
    const secondIndex = findIndex(results, second)
    if (firstIndex === -1) {
      failures.push(`${suite.query}: missing before-target ${JSON.stringify(first)}`)
    } else if (secondIndex !== -1 && firstIndex > secondIndex) {
      failures.push(`${suite.query}: expected ${JSON.stringify(first)} before ${JSON.stringify(second)}`)
    }
  }
}

if (failures.length) {
  console.error(`\nSearch relevance audit failed: ${failures.length} issue(s).`)
  for (const failure of failures) console.error(`- ${failure}`)
  process.exit(1)
}

console.log(`\nSearch relevance audit passed: ${suites.length} query suites.`)
