import { useState, useEffect, useCallback, useMemo } from 'react'
import { BookOpen, CheckSquare, Compass, CreditCard, Ellipsis, Sparkles, Search, Menu, X, FlaskConical, Package, Skull, Zap, NotebookPen } from 'lucide-react'
import { cn } from './lib/utils'
import { useTracker } from './hooks/useTracker'
import { useSearch } from './hooks/useSearch'
import { Sidebar } from './components/layout/Sidebar'
import { ContextPanel } from './components/layout/ContextPanel'
import { BottomNav } from './components/layout/BottomNav'
import { CommandPalette } from './components/ui/CommandPalette'
import { NotesDrawer } from './components/ui/NotesDrawer'
import { SupportLinks } from './components/ui/SupportLinks'
import { AuthControl } from './components/ui/AuthControl'
import { SyncConflictModal } from './components/ui/SyncConflictModal'
import { GuideView } from './components/views/GuideView'
import { ChecklistView } from './components/views/ChecklistView'
import { SidequestView } from './components/views/SidequestView'
import { GFView } from './components/views/GFView'
import { CardView } from './components/views/CardView'
import { RefinementView } from './components/views/RefinementView'
import { ItemsView } from './components/views/ItemsView'
import { BestiaryView } from './components/views/BestiaryView'
import { AbilitiesView } from './components/views/AbilitiesView'
import type { MasterData, ViewMode } from './types'
import masterDataRaw from './data/ff8_master.json'
import { SIDEQUESTS } from './data/sidequests'
import { createProgressLabeler } from './lib/progressLabels'

const data = masterDataRaw as unknown as MasterData
const VIEW_MODES: ViewMode[] = ['guide', 'checklist', 'sidequests', 'cards', 'gfs', 'abilities', 'refinement', 'items', 'bestiary']
const initialChapterId =
  typeof window !== 'undefined'
    ? new URLSearchParams(window.location.search).get('chapter')
    : null
const initialView =
  typeof window !== 'undefined'
    ? new URLSearchParams(window.location.search).get('view')
    : null

const DISC_COLORS: Record<number, string> = {
  1: 'text-teal-400', 2: 'text-indigo-400', 3: 'text-violet-400', 4: 'text-amber-400',
}

const DESKTOP_PRIMARY_TABS: { id: ViewMode; icon: React.ReactNode; label: string }[] = [
  { id: 'guide',       icon: <BookOpen size={13} />,      label: 'Guide' },
  { id: 'checklist',   icon: <CheckSquare size={13} />,   label: 'Checklist' },
  { id: 'sidequests',  icon: <Compass size={13} />,       label: 'Sidequests' },
  { id: 'cards',       icon: <CreditCard size={13} />,    label: 'Cards' },
]

const DESKTOP_MORE_TABS: { id: ViewMode; icon: React.ReactNode; label: string }[] = [
  { id: 'gfs',         icon: <Sparkles size={13} />,      label: 'GFs' },
  { id: 'abilities',   icon: <Zap size={13} />,           label: 'Abilities' },
  { id: 'refinement',  icon: <FlaskConical size={13} />,  label: 'Refine' },
  { id: 'items',       icon: <Package size={13} />,       label: 'Items' },
  { id: 'bestiary',    icon: <Skull size={13} />,         label: 'Bestiary' },
]

const DESKTOP_FULL_TABS: { id: ViewMode; icon: React.ReactNode; label: string }[] = [
  ...DESKTOP_PRIMARY_TABS,
  ...DESKTOP_MORE_TABS,
]

export default function App() {
  const [view, setView] = useState<ViewMode>(
    VIEW_MODES.includes(initialView as ViewMode) ? initialView as ViewMode : 'guide'
  )
  const [activeChapterId, setActiveChapterId] = useState(
    data.chapters.find(c => c.id === initialChapterId)?.id ??
    data.chapters.find(c => c.id === 'r0-about')?.id ??
    data.chapters[0]?.id ??
    ''
  )
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [desktopMoreOpen, setDesktopMoreOpen] = useState(false)
  const [notesOpen, setNotesOpen] = useState(false)

  const tracker = useTracker()
  const search = useSearch(data, SIDEQUESTS)
  const formatProgressLabel = useMemo(() => createProgressLabeler(data, SIDEQUESTS), [])

  const activeChapterIdx = data.chapters.findIndex(c => c.id === activeChapterId)
  const activeChapter    = data.chapters[activeChapterIdx] ?? data.chapters[0]
  const prevChapter      = activeChapterIdx > 0 ? data.chapters[activeChapterIdx - 1] : null
  const nextChapter      = activeChapterIdx < data.chapters.length - 1 ? data.chapters[activeChapterIdx + 1] : null
  const hasNotes = Object.values(tracker.state.notes).some(value => value.trim().length > 0)

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    params.set('chapter', activeChapterId)
    if (view === 'guide') params.delete('view')
    else params.set('view', view)

    const query = params.toString()
    const nextUrl = `${window.location.pathname}${query ? `?${query}` : ''}${window.location.hash}`
    const currentUrl = `${window.location.pathname}${window.location.search}${window.location.hash}`
    if (nextUrl !== currentUrl) window.history.replaceState(null, '', nextUrl)
  }, [activeChapterId, view])

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

  // Local-only render audit hook. This lets browser automation render every
  // guide chapter directly without relying on scroll/keyboard timing.
  useEffect(() => {
    if (!['localhost', '127.0.0.1'].includes(window.location.hostname)) return
    const w = window as typeof window & {
      __FF8_CHAPTERS__?: Array<{ id: string; title: string; disc: number }>
      __FF8_SET_CHAPTER__?: (id: string) => void
    }
    w.__FF8_CHAPTERS__ = data.chapters.map(({ id, title, disc }) => ({ id, title, disc }))
    w.__FF8_SET_CHAPTER__ = (id: string) => {
      setActiveChapterId(id)
      setView('guide')
    }
    return () => {
      delete w.__FF8_CHAPTERS__
      delete w.__FF8_SET_CHAPTER__
    }
  }, [])

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
    } else if (result.type === 'sidequest') {
      setView('sidequests')
    } else if (result.chapterId) {
      setActiveChapterId(result.chapterId)
      setView('guide')
    } else if (result.type === 'card') {
      setView('cards')
    } else if (result.type === 'gf') {
      setView('gfs')
    } else if (result.type === 'ability') {
      setView('abilities')
    } else if (result.type === 'refinement') {
      setView('refinement')
    } else if (result.type === 'magic') {
      setActiveChapterId('r0-magic-reference')
      setView('guide')
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

  const selectView = useCallback((nextView: ViewMode) => {
    setDesktopMoreOpen(false)
    setView(nextView)
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
          <div className="flex items-center justify-between gap-3 px-4 py-3 border-b border-slate-700/40 shrink-0">
            <h1 className="text-sm font-bold tracking-tight">
              <span className="text-slate-400">FF</span><span className="text-white font-black">VIII</span>
              <span className="text-slate-500 font-normal ml-1">Guide</span>
            </h1>
            <SupportLinks compact />
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
          <header className="relative z-50 shrink-0 bg-slate-950/80 backdrop-blur-sm">
            <div className="desktop-tabs-compact relative items-center gap-0 px-4 border-b border-slate-700/40">
              {DESKTOP_PRIMARY_TABS.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => selectView(tab.id)}
                  className={cn(
                    'relative flex items-center gap-1.5 px-3 py-2 text-xs transition-colors whitespace-nowrap',
                    view === tab.id
                      ? 'text-teal-300 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-teal-400 after:rounded-t'
                      : 'text-slate-500 hover:text-slate-300'
                  )}
                >
                  {tab.icon}{tab.label}
                </button>
              ))}
              <div className="relative">
                <button
                  aria-label="More sections"
                  onClick={() => setDesktopMoreOpen(open => !open)}
                  className={cn(
                    'relative flex items-center gap-1.5 px-3 py-2 text-xs transition-colors whitespace-nowrap',
                    DESKTOP_MORE_TABS.some(tab => tab.id === view) || desktopMoreOpen
                      ? 'text-teal-300 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-teal-400 after:rounded-t'
                      : 'text-slate-500 hover:text-slate-300'
                  )}
                >
                  <Ellipsis size={13} />
                  More
                </button>
                {desktopMoreOpen && (
                  <div data-testid="desktop-more-menu" className="absolute left-0 top-full z-[80] mt-1 w-44 overflow-hidden rounded-lg border border-slate-700/70 bg-slate-950/95 shadow-2xl shadow-black/50">
                    {DESKTOP_MORE_TABS.map(tab => (
                      <button
                        key={tab.id}
                        onClick={() => selectView(tab.id)}
                        className={cn(
                          'flex w-full items-center gap-2 px-3 py-2 text-left text-xs transition-colors',
                          view === tab.id
                            ? 'bg-teal-950/30 text-teal-300'
                            : 'text-slate-400 hover:bg-slate-900/80 hover:text-slate-200'
                        )}
                      >
                        {tab.icon}
                        {tab.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              <div className="ml-auto w-[15rem] min-w-0 py-1">
                <AuthControl tracker={tracker} />
              </div>
            </div>
            <div className="desktop-tabs-full items-center gap-0 px-4 border-b border-slate-700/40">
              {DESKTOP_FULL_TABS.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => selectView(tab.id)}
                  className={cn(
                    'relative flex items-center gap-1.5 px-3 py-2 text-xs transition-colors whitespace-nowrap',
                    view === tab.id
                      ? 'text-teal-300 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-teal-400 after:rounded-t'
                      : 'text-slate-500 hover:text-slate-300'
                  )}
                >
                  {tab.icon}{tab.label}
                </button>
              ))}
              <div className="ml-auto w-[15rem] min-w-0 py-1">
                <AuthControl tracker={tracker} />
              </div>
            </div>
            {view === 'guide' && activeChapter && (
              <div className="px-4 py-1.5 flex items-center gap-3 text-xs border-b border-slate-700/30">
                <span className={cn('font-semibold', activeChapter.disc === 0 ? 'text-sky-400' : DISC_COLORS[activeChapter.disc])}>
                  {activeChapter.disc === 0 ? 'Reference' : `Disc ${activeChapter.disc}`}
                </span>
                <span className="text-slate-700">·</span>
                <span className="text-slate-400 leading-relaxed break-words [overflow-wrap:anywhere]">{activeChapter.title}</span>
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
            onOpenNotes={() => setNotesOpen(true)}
            hasNotes={hasNotes}
          />
        </div>
      </div>

      {/* ── Mobile ── */}
      <div className="lg:hidden flex flex-col h-dvh">
        <header className="sticky top-0 z-30 glass-panel border-b border-slate-700/50 rounded-none px-4 py-3 flex items-center justify-between">
          <div className="min-w-0 flex-1 pr-2">
            <div className="flex items-center gap-2">
              <h1 className="text-sm font-bold tracking-tight leading-tight">
                <span className="text-slate-400">FF</span><span className="text-white font-black">VIII</span>
                <span className="text-slate-500 font-normal ml-1">Guide</span>
              </h1>
              <SupportLinks compact />
            </div>
            {view === 'guide' && activeChapter && (
              <p className={cn('text-[10px] leading-tight max-w-[260px] break-words [overflow-wrap:anywhere]', activeChapter.disc === 0 ? 'text-sky-400' : DISC_COLORS[activeChapter.disc])}>
                {activeChapter.disc === 0 ? 'Reference' : `Disc ${activeChapter.disc}`} · {activeChapter.title}
              </p>
            )}
            <div className="mt-2 max-w-[13.5rem]">
              <AuthControl tracker={tracker} />
            </div>
          </div>
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => setNotesOpen(true)}
              aria-label={hasNotes ? 'Open notes with saved notes' : 'Open notes'}
              className={cn(
                'relative p-2 transition-colors',
                hasNotes ? 'text-teal-300 hover:text-teal-200' : 'text-slate-500 hover:text-slate-200'
              )}
            >
              <NotebookPen size={16} />
              {hasNotes && <span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-teal-300" />}
            </button>
            <button
              type="button"
              onClick={search.openSearch}
              aria-label="Open search"
              className="p-2 text-slate-500 hover:text-slate-200 transition-colors"
            >
              <Search size={16} />
            </button>
            {view === 'guide' && (
              <button
                type="button"
                onClick={() => setSidebarOpen(s => !s)}
                aria-label={sidebarOpen ? 'Close guide menu' : 'Open guide menu'}
                className="p-2 text-slate-500 hover:text-slate-200 transition-colors"
              >
                {sidebarOpen ? <X size={16} /> : <Menu size={16} />}
              </button>
            )}
          </div>
        </header>

        {sidebarOpen && view === 'guide' && (
          <div className="fixed inset-0 z-[70] flex">
            <div className="absolute inset-0 bg-black/70" onClick={() => setSidebarOpen(false)} />
            <div className="relative flex h-dvh w-64 flex-col overflow-hidden rounded-none border-r border-slate-700/60 glass-panel">
              <Sidebar
                chapters={data.chapters}
                activeChapterId={activeChapterId}
                onSelectChapter={handleSelectChapter}
                getChapterProgress={chapterProgress}
                className="min-h-0 flex-1"
              />
            </div>
          </div>
        )}

        <main
          className="flex-1 overflow-y-auto px-4 pt-4"
          style={{ paddingBottom: 'calc(6.5rem + env(safe-area-inset-bottom))' }}
        >
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

      <NotesDrawer
        open={notesOpen}
        chapter={activeChapter ?? null}
        chapters={data.chapters}
        notes={tracker.state.notes}
        onClose={() => setNotesOpen(false)}
        onJumpToChapter={navigateToChapter}
        onUpdateNote={tracker.updateNote}
        onDeleteNote={tracker.deleteNote}
      />

      {tracker.syncConflict && (
        <SyncConflictModal
          conflict={tracker.syncConflict}
          formatLabel={formatProgressLabel}
          onResolve={tracker.resolveSyncConflict}
        />
      )}
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
            magic={data.lookup.magic ?? []}
            shops={data.lookup.shops ?? []}
            junctions={data.lookup.junctions ?? []}
            characters={data.lookup.characters ?? []}
            sidequests={SIDEQUESTS}
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

      case 'sidequests':
        return (
          <SidequestView
            sidequests={SIDEQUESTS}
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

      case 'abilities':
        return <AbilitiesView gfs={data.lookup.gfs} abilities={data.lookup.abilities ?? []} abilitySections={data.lookup.abilitySections ?? []} />

      case 'bestiary':
        return <BestiaryView enemies={data.lookup.enemies} />

      default:
        return null
    }
  }
}
