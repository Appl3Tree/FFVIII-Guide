import { useState, useEffect, useCallback } from 'react'
import { BookOpen, CheckSquare, CreditCard, Sparkles, Search, Menu, X, FlaskConical, Package, Skull } from 'lucide-react'
import { cn } from './lib/utils'
import { useTracker } from './hooks/useTracker'
import { useSearch } from './hooks/useSearch'
import { Sidebar } from './components/layout/Sidebar'
import { ContextPanel } from './components/layout/ContextPanel'
import { BottomNav } from './components/layout/BottomNav'
import { CommandPalette } from './components/ui/CommandPalette'
import { GuideView } from './components/views/GuideView'
import { ChecklistView } from './components/views/ChecklistView'
import { GFView } from './components/views/GFView'
import { CardView } from './components/views/CardView'
import { RefinementView } from './components/views/RefinementView'
import { ItemsView } from './components/views/ItemsView'
import { BestiaryView } from './components/views/BestiaryView'
import type { MasterData, ViewMode } from './types'
import masterDataRaw from './data/ff8_master.json'

const data = masterDataRaw as unknown as MasterData

const DISC_COLORS: Record<number, string> = {
  1: 'text-teal-400', 2: 'text-indigo-400', 3: 'text-violet-400', 4: 'text-amber-400',
}

const DESKTOP_TABS: { id: ViewMode; icon: React.ReactNode; label: string }[] = [
  { id: 'guide',       icon: <BookOpen size={13} />,      label: 'Guide' },
  { id: 'checklist',   icon: <CheckSquare size={13} />,   label: 'Checklist' },
  { id: 'cards',       icon: <CreditCard size={13} />,    label: 'Cards' },
  { id: 'gfs',         icon: <Sparkles size={13} />,      label: 'GFs' },
  { id: 'refinement',  icon: <FlaskConical size={13} />,  label: 'Refine' },
  { id: 'items',       icon: <Package size={13} />,       label: 'Items' },
  { id: 'bestiary',    icon: <Skull size={13} />,         label: 'Bestiary' },
]

export default function App() {
  const [view, setView] = useState<ViewMode>('guide')
  const [activeChapterId, setActiveChapterId] = useState(
    data.chapters.find(c => c.id === 'r0-about')?.id ?? data.chapters[0]?.id ?? ''
  )
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const tracker = useTracker()
  const search = useSearch(data)

  const activeChapterIdx = data.chapters.findIndex(c => c.id === activeChapterId)
  const activeChapter    = data.chapters[activeChapterIdx] ?? data.chapters[0]
  const prevChapter      = activeChapterIdx > 0 ? data.chapters[activeChapterIdx - 1] : null
  const nextChapter      = activeChapterIdx < data.chapters.length - 1 ? data.chapters[activeChapterIdx + 1] : null

  // Cmd+K
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        search.openSearch()
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [search])

  // ← / → arrow-key chapter navigation (guide view only, not while typing)
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (view !== 'guide') return
      if (search.open) return
      const tag = (e.target as HTMLElement).tagName
      if (tag === 'INPUT' || tag === 'TEXTAREA' || (e.target as HTMLElement).isContentEditable) return
      if (e.key === 'ArrowLeft'  && prevChapter) setActiveChapterId(prevChapter.id)
      if (e.key === 'ArrowRight' && nextChapter) setActiveChapterId(nextChapter.id)
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [view, prevChapter, nextChapter, search.open])

  const handleSearchSelect = useCallback((result: { type: string; chapterId?: string; id: string }) => {
    search.closeSearch()
    if (result.type === 'chapter') {
      setActiveChapterId(result.id)
      setView('guide')
    } else if (result.chapterId) {
      setActiveChapterId(result.chapterId)
      setView('guide')
    } else if (result.type === 'card') {
      setView('cards')
    } else if (result.type === 'gf') {
      setView('gfs')
    } else if (result.type === 'refinement') {
      setView('refinement')
    } else if (result.type === 'item' || result.type === 'weapon') {
      setView('items')
    } else if (result.type === 'enemy') {
      setView('bestiary')
    }
  }, [search])

  const handleSelectChapter = useCallback((id: string) => {
    setActiveChapterId(id)
    setView('guide')
    setSidebarOpen(false)
  }, [])

  const navigateToChapter = useCallback((id: string) => {
    setActiveChapterId(id)
    setView('guide')
  }, [])

  const navigateChapter = useCallback((id: string) => {
    setActiveChapterId(id)
  }, [])

  const chapterProgress = useCallback((chapterId: string) => {
    return tracker.getProgress('chapter', data, chapterId)
  }, [tracker])

  return (
    <div className="min-h-screen">
      {/* ── Desktop: 3-column layout ── */}
      <div className="hidden lg:grid h-screen" style={{ gridTemplateColumns: 'clamp(200px,16vw,280px) 1fr clamp(220px,18vw,320px)' }}>

        {/* Column 1: Navigation */}
        <div className="glass-panel border-r border-slate-700/60 rounded-none flex flex-col overflow-hidden">
          <div className="px-4 py-3 border-b border-slate-700/40 shrink-0">
            <h1 className="text-sm font-bold tracking-tight">
              <span className="text-slate-400">FF</span><span className="text-white font-black">VIII</span>
              <span className="text-slate-500 font-normal ml-1">Guide</span>
            </h1>
          </div>
          <Sidebar
            chapters={data.chapters}
            activeChapterId={activeChapterId}
            onSelectChapter={handleSelectChapter}
            getChapterProgress={chapterProgress}
            className="flex-1 overflow-y-auto"
          />
          <div className="px-3 py-2 border-t border-slate-700/40 shrink-0">
            <button
              onClick={search.openSearch}
              className="w-full flex items-center gap-2 px-3 py-2 rounded-lg border border-slate-700/40 text-slate-600 hover:text-slate-300 hover:border-slate-600 transition-colors text-xs"
            >
              <Search size={11} />
              <span>Search…</span>
              <kbd className="ml-auto text-[10px] bg-slate-800/60 border border-slate-700 rounded px-1">⌘K</kbd>
            </button>
          </div>
        </div>

        {/* Column 2: Main content */}
        <div className="flex flex-col overflow-hidden">
          {/* Sticky header */}
          <header className="shrink-0 bg-slate-950/80 backdrop-blur-sm">
            <div className="flex items-center gap-0 px-4 border-b border-slate-700/40">
              {DESKTOP_TABS.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setView(tab.id)}
                  className={cn(
                    'relative flex items-center gap-1.5 px-3 py-2 text-xs transition-colors',
                    view === tab.id
                      ? 'text-teal-300 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-teal-400 after:rounded-t'
                      : 'text-slate-500 hover:text-slate-300'
                  )}
                >
                  {tab.icon}{tab.label}
                </button>
              ))}
            </div>
            {view === 'guide' && activeChapter && (
              <div className="px-4 py-1.5 flex items-center gap-3 text-xs border-b border-slate-700/30">
                <span className={cn('font-semibold', activeChapter.disc === 0 ? 'text-sky-400' : DISC_COLORS[activeChapter.disc])}>
                  {activeChapter.disc === 0 ? 'Reference' : `Disc ${activeChapter.disc}`}
                </span>
                <span className="text-slate-700">·</span>
                <span className="text-slate-400 truncate">{activeChapter.title}</span>
              </div>
            )}
          </header>
          <main className="flex-1 overflow-y-auto px-6 py-5">
            {renderView()}
          </main>
        </div>

        {/* Column 3: Contextual progress */}
        <div className="border-l border-slate-700/60 overflow-hidden flex flex-col">
          <ContextPanel
            chapter={view === 'guide' ? (activeChapter ?? null) : null}
            data={data}
            completedItems={tracker.state.completedItems}
            onToggleItem={tracker.toggleItem}
          />
        </div>
      </div>

      {/* ── Mobile ── */}
      <div className="lg:hidden flex flex-col h-dvh">
        <header className="sticky top-0 z-30 glass-panel border-b border-slate-700/50 rounded-none px-4 py-3 flex items-center justify-between">
          <div className="min-w-0">
            <h1 className="text-sm font-bold tracking-tight leading-tight">
              <span className="text-slate-400">FF</span><span className="text-white font-black">VIII</span>
              <span className="text-slate-500 font-normal ml-1">Guide</span>
            </h1>
            {view === 'guide' && activeChapter && (
              <p className={cn('text-[10px] truncate max-w-[220px]', activeChapter.disc === 0 ? 'text-sky-400' : DISC_COLORS[activeChapter.disc])}>
                {activeChapter.disc === 0 ? 'Reference' : `Disc ${activeChapter.disc}`} · {activeChapter.title}
              </p>
            )}
          </div>
          <div className="flex items-center gap-1">
            <button onClick={search.openSearch} className="p-2 text-slate-500 hover:text-slate-200 transition-colors">
              <Search size={16} />
            </button>
            {view === 'guide' && (
              <button onClick={() => setSidebarOpen(s => !s)} className="p-2 text-slate-500 hover:text-slate-200 transition-colors">
                {sidebarOpen ? <X size={16} /> : <Menu size={16} />}
              </button>
            )}
          </div>
        </header>

        {sidebarOpen && view === 'guide' && (
          <div className="fixed inset-0 z-40 flex">
            <div className="absolute inset-0 bg-black/70" onClick={() => setSidebarOpen(false)} />
            <div className="relative w-64 glass-panel h-full overflow-y-auto rounded-none border-r border-slate-700/60">
              <Sidebar
                chapters={data.chapters}
                activeChapterId={activeChapterId}
                onSelectChapter={handleSelectChapter}
                getChapterProgress={chapterProgress}
              />
            </div>
          </div>
        )}

        <main className="flex-1 overflow-y-auto px-4 py-4 pb-20">
          {renderView()}
        </main>

        <BottomNav active={view} onChange={setView} onSearch={search.openSearch} />
      </div>

      <CommandPalette
        open={search.open}
        query={search.query}
        results={search.results}
        onQueryChange={search.setQuery}
        onClose={search.closeSearch}
        onSelect={handleSearchSelect}
      />
    </div>
  )

  function renderView() {
    switch (view) {
      case 'guide':
        return activeChapter ? (
          <GuideView
            chapter={activeChapter}
            completedItems={tracker.state.completedItems}
            onToggleItem={tracker.toggleItem}
            enemies={data.lookup.enemies}
            prevChapter={prevChapter}
            nextChapter={nextChapter}
            onNavigate={navigateChapter}
          />
        ) : null

      case 'checklist':
        return (
          <ChecklistView
            data={data}
            completedItems={tracker.state.completedItems}
            onToggleItem={tracker.toggleItem}
            onNavigateToChapter={navigateToChapter}
          />
        )

      case 'gfs':
        return (
          <GFView
            gfs={data.lookup.gfs}
            completedItems={tracker.state.completedItems}
            onToggleItem={tracker.toggleItem}
          />
        )

      case 'cards':
        return (
          <CardView
            cards={data.lookup.cards}
            completedItems={tracker.state.completedItems}
            onToggleItem={tracker.toggleItem}
          />
        )

      case 'refinement':
        return <RefinementView refinement={data.lookup.refinement} />

      case 'items':
        return <ItemsView items={data.lookup.items} weapons={data.lookup.weapons} />

      case 'bestiary':
        return <BestiaryView enemies={data.lookup.enemies} />

      default:
        return null
    }
  }
}
