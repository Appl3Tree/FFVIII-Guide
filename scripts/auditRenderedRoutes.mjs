import fs from 'node:fs'
import http from 'node:http'
import os from 'node:os'
import path from 'node:path'
import { spawn } from 'node:child_process'

const root = process.cwd()
const data = JSON.parse(fs.readFileSync(path.join(root, 'src/data/ff8_master.json'), 'utf8'))
const baseUrl = process.env.APP_URL ?? 'http://localhost:5173/FFVIII-Guide/'
const port = Number(process.env.CHROME_DEBUG_PORT ?? 9223)
const chromePath = process.env.CHROME_PATH
  ?? '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'

const targets = [
  ...data.chapters.map(chapter => ({
    kind: 'chapter',
    id: chapter.id,
    url: `${baseUrl}?audit=headless-render&chapter=${encodeURIComponent(chapter.id)}`,
  })),
  ...['checklist', 'sidequests', 'cards', 'gfs', 'abilities', 'refinement', 'items', 'bestiary'].map(view => ({
    kind: 'view',
    id: view,
    url: `${baseUrl}?audit=headless-render&view=${view}&chapter=r0-about`,
  })),
]

function getJson(route) {
  return new Promise((resolve, reject) => {
    const req = http.get({ hostname: '127.0.0.1', port, path: route }, res => {
      let body = ''
      res.setEncoding('utf8')
      res.on('data', chunk => { body += chunk })
      res.on('end', () => {
        try {
          resolve(JSON.parse(body))
        } catch (error) {
          reject(error)
        }
      })
    })
    req.on('error', reject)
    req.setTimeout(1500, () => {
      req.destroy(new Error('Chrome debug endpoint timeout'))
    })
  })
}

async function waitForChrome() {
  const started = Date.now()
  while (Date.now() - started < 10000) {
    try {
      await getJson('/json/list')
      return
    } catch {
      await new Promise(resolve => setTimeout(resolve, 150))
    }
  }
  throw new Error('Chrome debug endpoint did not become available')
}

async function cdpConnect() {
  const pages = await getJson('/json/list')
  const page = pages.find(candidate => candidate.type === 'page') ?? pages[0]
  if (!page?.webSocketDebuggerUrl) throw new Error('No Chrome page websocket target')

  const ws = new WebSocket(page.webSocketDebuggerUrl)
  await new Promise((resolve, reject) => {
    ws.addEventListener('open', resolve, { once: true })
    ws.addEventListener('error', reject, { once: true })
  })

  let id = 0
  const pending = new Map()
  ws.addEventListener('message', event => {
    const msg = JSON.parse(event.data)
    if (msg.id && pending.has(msg.id)) {
      const { resolve, reject } = pending.get(msg.id)
      pending.delete(msg.id)
      msg.error ? reject(new Error(JSON.stringify(msg.error))) : resolve(msg.result)
    }
  })

  return {
    ws,
    send(method, params = {}) {
      return new Promise((resolve, reject) => {
        const callId = ++id
        pending.set(callId, { resolve, reject })
        ws.send(JSON.stringify({ id: callId, method, params }))
      })
    },
  }
}

const layoutExpression = `(() => {
  const visible = (el) => {
    const style = getComputedStyle(el);
    if (style.display === 'none' || style.visibility === 'hidden' || Number(style.opacity) === 0) return false;
    const r = el.getBoundingClientRect();
    return r.width > 0 && r.height > 0 && r.bottom >= 0 && r.right >= 0 && r.top <= innerHeight && r.left <= innerWidth;
  };
  const label = el => (el.innerText || el.getAttribute('alt') || el.getAttribute('aria-label') || el.className || el.tagName || '').toString().replace(/\\s+/g, ' ').trim().slice(0, 180);
  const offenders = [];
  for (const el of Array.from(document.querySelectorAll('body, main, section, article, div, table, pre, p, span, button, img'))) {
    if (!visible(el)) continue;
    const r = el.getBoundingClientRect();
    const viewportExcess = Math.ceil(r.right - innerWidth);
    if (viewportExcess > 2 || r.left < -2) {
      offenders.push({ tag: el.tagName, className: String(el.className).slice(0, 180), text: label(el), rect: { left: Math.round(r.left), right: Math.round(r.right), width: Math.round(r.width) }, viewportExcess });
    }
    if (offenders.length >= 8) break;
  }
  const visibleImages = Array.from(document.images).filter(visible);
  const brokenVisibleImages = visibleImages.filter(img => img.currentSrc && img.complete && img.naturalWidth === 0).map(img => ({ alt: img.alt, src: img.currentSrc })).slice(0, 10);
  const rawBodyText = document.body.innerText || '';
  const bodyText = rawBodyText.replace(/\\s+/g, ' ').trim();
  const sourceShapedIssues = [];
  const markdownSeparator = rawBodyText.match(/\\|\\s*:?-{3,}:?\\s*(?:\\|\\s*:?-{3,}:?\\s*)+\\|?/);
  if (markdownSeparator) {
    sourceShapedIssues.push({
      type: 'raw-markdown-table',
      text: markdownSeparator[0].replace(/\\s+/g, ' ').trim().slice(0, 180),
    });
  }

  const duplicateLevelBandIssues = [];
  const longParagraphIssues = Array.from(document.querySelectorAll('p'))
    .filter(visible)
    .map(p => (p.innerText || '').replace(/\\s+/g, ' ').trim())
    .filter(text => text.length > 700)
    .map(text => ({ text: text.slice(0, 220), length: text.length }))
    .slice(0, 10);
  const lines = rawBodyText.split('\\n').map(line => line.trim()).filter(Boolean);
  const levelRe = /^Lv\\s+(\\d+)\\s*[-–]\\s*(\\d+)$/;
  const stopLine = /^(Draw|Mug|Drop|Devour|More|Card|Weak|Resist|Status|Found|Enemies|Bosses|Search|Filter by weakness)$/i;
  const collectBandValue = (start) => {
    const values = [];
    let i = start + 1;
    while (i < lines.length && !levelRe.test(lines[i]) && !stopLine.test(lines[i])) {
      if (!/^\\d[\\d,–-]*\\s+HP$/.test(lines[i]) && !/^\\d+\\s+AP/.test(lines[i])) values.push(lines[i]);
      i += 1;
    }
    return { values, nextIndex: i };
  };
  for (let i = 0; i < lines.length - 2 && duplicateLevelBandIssues.length < 10; i += 1) {
    const first = lines[i].match(levelRe);
    if (!first) continue;
    const firstValue = collectBandValue(i);
    const nextLine = lines[firstValue.nextIndex];
    const second = nextLine?.match(levelRe);
    if (!second) continue;
    const secondValue = collectBandValue(firstValue.nextIndex);
    const firstMax = Number(first[2]);
    const secondMin = Number(second[1]);
    if (
      firstMax + 1 === secondMin &&
      firstValue.values.length > 0 &&
      firstValue.values.join('\\u0001') === secondValue.values.join('\\u0001')
    ) {
      duplicateLevelBandIssues.push({
        first: lines[i],
        second: nextLine,
        value: firstValue.values.join(' / ').slice(0, 180),
      });
    }
  }

  return {
    url: location.href,
    bodyTextLength: bodyText.length,
    bodyTextSample: bodyText.slice(0, 160),
    docOverflow: Math.ceil(document.documentElement.scrollWidth - document.documentElement.clientWidth),
    bodyOverflow: Math.ceil(document.body.scrollWidth - document.body.clientWidth),
    viewport: { width: innerWidth, height: innerHeight },
    offenders,
    visibleImageCount: visibleImages.length,
    brokenVisibleImages,
    sourceShapedIssues,
    duplicateLevelBandIssues,
    longParagraphIssues,
  };
})()`

const delay = ms => new Promise(resolve => setTimeout(resolve, ms))

async function evalValue(send, expression) {
  const result = await send('Runtime.evaluate', { expression, returnByValue: true })
  if (result.exceptionDetails) throw new Error(JSON.stringify(result.exceptionDetails))
  return result.result.value
}

async function waitForApp(send) {
  const started = Date.now()
  while (Date.now() - started < 8000) {
    const ready = await evalValue(send, `(() => ({ state: document.readyState, text: (document.body?.innerText || '').length, root: !!document.querySelector('#root') && document.querySelector('#root').children.length }))()`)
    if ((ready.state === 'interactive' || ready.state === 'complete') && ready.text > 100 && ready.root > 0) return
    await delay(100)
  }
}

async function auditTarget(send, target, viewport) {
  await send('Emulation.setDeviceMetricsOverride', {
    width: viewport.width,
    height: viewport.height,
    deviceScaleFactor: 1,
    mobile: viewport.mobile,
  })
  await send('Page.navigate', { url: target.url })
  await waitForApp(send)
  await delay(150)

  const top = await evalValue(send, layoutExpression)
  await evalValue(send, `(() => { const scrollers = [document.scrollingElement, ...Array.from(document.querySelectorAll('*')).filter(el => el.scrollHeight > el.clientHeight + 20)]; for (const el of scrollers) try { el.scrollTop = Math.floor((el.scrollHeight - el.clientHeight) / 2); } catch {} window.scrollTo(0, Math.floor((document.documentElement.scrollHeight - innerHeight) / 2)); return true; })()`)
  await delay(100)
  const middle = await evalValue(send, layoutExpression)
  await evalValue(send, `(() => { const scrollers = [document.scrollingElement, ...Array.from(document.querySelectorAll('*')).filter(el => el.scrollHeight > el.clientHeight + 20)]; for (const el of scrollers) try { el.scrollTop = el.scrollHeight; } catch {} window.scrollTo(0, document.documentElement.scrollHeight); return true; })()`)
  await delay(150)
  const bottom = await evalValue(send, layoutExpression)
  const allBrokenImages = await evalValue(send, `Array.from(document.images).filter(img => img.currentSrc && img.complete && img.naturalWidth === 0).map(img => ({ alt: img.alt, src: img.currentSrc })).slice(0, 20)`)
  const states = { top, middle, bottom }
  const failed = Object.values(states).some(state =>
    state.bodyTextLength < 200 ||
    state.docOverflow > 2 ||
    state.bodyOverflow > 2 ||
    state.offenders.length ||
    state.brokenVisibleImages.length ||
    state.sourceShapedIssues.length ||
    state.longParagraphIssues.length ||
    (target.kind === 'view' && target.id === 'bestiary' && state.duplicateLevelBandIssues.length)
  ) || allBrokenImages.length > 0

  return { ...target, viewport, failed, states, allBrokenImages }
}

async function auditResponsiveNav(send) {
  const navUrl = `${baseUrl}?audit=headless-render&chapter=r0-about`
  const visibleExpression = `
    const visible = (el) => {
      if (!el) return false;
      const style = getComputedStyle(el);
      if (style.display === 'none' || style.visibility === 'hidden' || Number(style.opacity) === 0) return false;
      const r = el.getBoundingClientRect();
      return r.width > 0 && r.height > 0 && r.bottom >= 0 && r.right >= 0 && r.top <= innerHeight && r.left <= innerWidth;
    };
  `
  const results = []

  await send('Emulation.setDeviceMetricsOverride', {
    width: 1100,
    height: 720,
    deviceScaleFactor: 1,
    mobile: false,
  })
  await send('Page.navigate', { url: navUrl })
  await waitForApp(send)
  await delay(150)
  await evalValue(send, `(() => { document.querySelector('button[aria-label="More sections"]')?.click(); return true; })()`)
  await delay(100)
  const desktopState = await evalValue(send, `(() => {
    ${visibleExpression}
    const menu = document.querySelector('[data-testid="desktop-more-menu"]');
    const buttons = Array.from(menu?.querySelectorAll('button') ?? []).filter(visible);
    const coveredButtons = buttons.map(button => {
      const r = button.getBoundingClientRect();
      const x = Math.round(r.left + r.width / 2);
      const y = Math.round(r.top + r.height / 2);
      const top = document.elementFromPoint(x, y);
      return button.contains(top) ? null : {
        label: (button.innerText || button.getAttribute('aria-label') || '').trim(),
        coveredBy: (top?.innerText || top?.getAttribute?.('aria-label') || top?.className || top?.tagName || '').toString().replace(/\\s+/g, ' ').trim().slice(0, 160),
      };
    }).filter(Boolean);
    return {
      viewport: { width: innerWidth, height: innerHeight },
      menuVisible: visible(menu),
      menuLabels: buttons.map(button => (button.innerText || '').replace(/\\s+/g, ' ').trim()),
      coveredButtons,
    };
  })()`)
  results.push({
    kind: 'nav',
    id: 'desktop-compact-more-stacking',
    viewport: { name: 'desktop-compact', width: 1100, height: 720, mobile: false },
    failed: !desktopState.menuVisible || desktopState.menuLabels.length !== DESKTOP_MORE_COUNT || desktopState.coveredButtons.length > 0,
    states: { opened: desktopState },
  })

  await send('Emulation.setDeviceMetricsOverride', {
    width: 390,
    height: 844,
    deviceScaleFactor: 1,
    mobile: true,
  })
  await send('Page.navigate', { url: navUrl })
  await waitForApp(send)
  await delay(150)
  await evalValue(send, `(() => { document.querySelector('.bottom-nav-compact button[aria-label="More tabs"]')?.click(); return true; })()`)
  await delay(100)
  const mobileState = await evalValue(send, `(() => {
    ${visibleExpression}
    const menu = document.querySelector('[data-testid="mobile-more-menu"]');
    const menuButtons = Array.from(menu?.querySelectorAll('button') ?? []).filter(visible);
    const compactSearch = document.querySelector('.bottom-nav-compact button[aria-label="Search"]');
    return {
      viewport: { width: innerWidth, height: innerHeight },
      menuVisible: visible(menu),
      menuLabels: menuButtons.map(button => (button.innerText || button.getAttribute('aria-label') || '').replace(/\\s+/g, ' ').trim()),
      bottomSearchVisible: visible(compactSearch),
    };
  })()`)
  results.push({
    kind: 'nav',
    id: 'mobile-more-no-search-duplicate',
    viewport: { name: 'mobile', width: 390, height: 844, mobile: true },
    failed: !mobileState.menuVisible || !mobileState.bottomSearchVisible || mobileState.menuLabels.includes('Search'),
    states: { opened: mobileState },
  })

  return results
}

const DESKTOP_MORE_COUNT = 5

const userDataDir = fs.mkdtempSync(path.join(os.tmpdir(), 'ffviii-guide-render-audit-'))
let chrome

try {
  if (!fs.existsSync(chromePath)) {
    throw new Error(`Chrome not found at ${chromePath}. Set CHROME_PATH to run rendered audit.`)
  }

  chrome = spawn(chromePath, [
    '--headless=new',
    `--remote-debugging-port=${port}`,
    `--user-data-dir=${userDataDir}`,
    '--disable-gpu',
    '--no-first-run',
    '--no-default-browser-check',
    'about:blank',
  ], { stdio: 'ignore' })

  await waitForChrome()
  const { ws, send } = await cdpConnect()
  await send('Runtime.enable')

  const viewports = [
    { name: 'mobile', width: 390, height: 844, mobile: true },
    { name: 'desktop', width: 1280, height: 720, mobile: false },
  ]
  const results = []

  for (const viewport of viewports) {
    for (const target of targets) {
      try {
        results.push(await auditTarget(send, target, viewport))
      } catch (error) {
        results.push({ ...target, viewport, failed: true, error: String(error?.stack ?? error) })
      }
    }
  }
  try {
    results.push(...await auditResponsiveNav(send))
  } catch (error) {
    results.push({
      kind: 'nav',
      id: 'responsive-nav',
      viewport: { name: 'interactive', width: 0, height: 0, mobile: false },
      failed: true,
      error: String(error?.stack ?? error),
    })
  }

  await send('Emulation.clearDeviceMetricsOverride')
  ws.close()

  const failures = results.filter(result => result.failed)
  const report = {
    generatedAt: new Date().toISOString(),
    targetCount: targets.length,
    resultCount: results.length,
    failureCount: failures.length,
    failures,
    results,
  }
  fs.mkdirSync(path.join(root, 'tmp'), { recursive: true })
  fs.writeFileSync(path.join(root, 'tmp/headless-render-audit.json'), JSON.stringify(report, null, 2))

  if (failures.length) {
    console.error(`Rendered route audit failed: ${failures.length} issue(s).`)
    for (const failure of failures.slice(0, 50)) {
      console.error(`- ${failure.viewport.name} ${failure.kind}:${failure.id}${failure.error ? ` ${failure.error}` : ''}`)
    }
    process.exit(1)
  }

  console.log(`Rendered route audit passed: ${targets.length} targets, ${results.length} viewport states.`)
} finally {
  if (chrome && !chrome.killed) chrome.kill('SIGTERM')
  try {
    fs.rmSync(userDataDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 })
  } catch {
    // Chrome can release profile files a moment after the process exits.
  }
}
