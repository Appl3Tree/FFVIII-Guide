import { useEffect, useRef, useState, type KeyboardEvent as ReactKeyboardEvent, type PointerEvent, type ReactNode } from 'react'
import { ArrowRight, Check, ClipboardList, GripHorizontal, NotebookPen, Pencil, Pin, Plus, Trash2, X } from 'lucide-react'
import { cn } from '../../lib/utils'
import type { Chapter } from '../../types'

interface Props {
  open: boolean
  chapter: Chapter | null
  chapters: Chapter[]
  notes: Record<string, string>
  onClose: () => void
  onJumpToChapter: (id: string) => void
  onUpdateNote: (id: string, value: string) => void
  onDeleteNote: (id: string) => void
}

interface NotePanelProps {
  id: string
  title: string
  subtitle: string
  icon: ReactNode
  value: string
  placeholder: string
  accent: 'teal' | 'sky'
  editingId: string | null
  disabled?: boolean
  quickActions?: string[]
  onEdit: (id: string) => void
  onDone: () => void
  onUpdateNote: (id: string, value: string) => void
  onDeleteNote: (id: string) => void
}

type ResizeDirection = 'n' | 's' | 'e' | 'w' | 'ne' | 'nw' | 'se' | 'sw'
type NotesTab = 'page' | 'all'

const GLOBAL_NOTE_ID = 'global:priorities'
const quickNotes = [
  'Junction focus: ',
  'Cards to win: ',
  'Items to farm: ',
  'GF ability target: ',
  'Come back before: ',
]

const RESIZE_HANDLES: Array<{ direction: ResizeDirection; label: string; className: string; cursor: string }> = [
  { direction: 'n',  label: 'from top edge',         className: '-top-1 left-8 right-8 h-3',       cursor: 'n-resize' },
  { direction: 's',  label: 'from bottom edge',      className: '-bottom-1 left-8 right-8 h-3',    cursor: 's-resize' },
  { direction: 'e',  label: 'from right edge',       className: '-right-1 bottom-8 top-8 w-3',     cursor: 'e-resize' },
  { direction: 'w',  label: 'from left edge',        className: '-left-1 bottom-8 top-8 w-3',      cursor: 'w-resize' },
  { direction: 'ne', label: 'from top right corner', className: '-right-2 -top-2 h-10 w-10',       cursor: 'ne-resize' },
  { direction: 'nw', label: 'from top left corner',  className: '-left-2 -top-2 h-10 w-10',        cursor: 'nw-resize' },
  { direction: 'se', label: 'from bottom right corner', className: '-bottom-2 -right-2 h-10 w-10', cursor: 'se-resize' },
  { direction: 'sw', label: 'from bottom left corner', className: '-bottom-2 -left-2 h-10 w-10',   cursor: 'sw-resize' },
]

const accentStyles = {
  teal: {
    icon: 'text-teal-300',
    focus: 'focus:border-teal-500/50 focus:ring-teal-500/15',
    button: 'border-teal-500/40 bg-teal-950/35 text-teal-100 hover:border-teal-400/70 hover:bg-teal-900/45',
  },
  sky: {
    icon: 'text-sky-300',
    focus: 'focus:border-sky-500/50 focus:ring-sky-500/15',
    button: 'border-sky-500/40 bg-sky-950/35 text-sky-100 hover:border-sky-400/70 hover:bg-sky-900/45',
  },
} satisfies Record<string, Record<string, string>>

function chapterNoteId(chapter: Chapter | null) {
  return chapter ? `chapter:${chapter.id}` : 'chapter:none'
}

function noteHasContent(value?: string) {
  return !!value && value.trim().length > 0
}

function insertQuickNote(current: string, snippet: string) {
  const trimmed = current.trimEnd()
  return `${trimmed}${trimmed ? '\n' : ''}- ${snippet}`
}

function noteLabel(id: string) {
  if (id === GLOBAL_NOTE_ID) return 'Current priorities'
  return id.replace(/^chapter:/, '').replace(/-/g, ' ')
}

function noteChapterId(id: string) {
  return id.startsWith('chapter:') ? id.replace(/^chapter:/, '') : null
}

export function NotesDrawer({
  open,
  chapter,
  chapters,
  notes,
  onClose,
  onJumpToChapter,
  onUpdateNote,
  onDeleteNote,
}: Props) {
  const [editingId, setEditingId] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState<NotesTab>('page')
  const [position, setPosition] = useState<{ x: number; y: number } | null>(null)
  const [size, setSize] = useState<{ width: number; height: number } | null>(null)
  const panelRef = useRef<HTMLElement | null>(null)
  const dragRef = useRef<{ pointerId: number; offsetX: number; offsetY: number } | null>(null)
  const resizeRef = useRef<{
    pointerId: number
    direction: ResizeDirection
    startX: number
    startY: number
    startWidth: number
    startHeight: number
    startLeft: number
    startTop: number
  } | null>(null)
  const currentChapterNoteId = chapterNoteId(chapter)
  const globalNote = notes[GLOBAL_NOTE_ID] ?? ''
  const chapterNote = notes[currentChapterNoteId] ?? ''
  const chapterOrder = new Map(chapters.map((entry, index) => [entry.id, index]))
  const chapterById = new Map(chapters.map(entry => [entry.id, entry]))
  const allNoteEntries = Object
    .entries(notes)
    .filter(([, value]) => noteHasContent(value))
    .sort(([leftId], [rightId]) => {
      if (leftId === GLOBAL_NOTE_ID) return -1
      if (rightId === GLOBAL_NOTE_ID) return 1

      const leftChapterId = noteChapterId(leftId)
      const rightChapterId = noteChapterId(rightId)
      const leftOrder = leftChapterId ? chapterOrder.get(leftChapterId) ?? Number.MAX_SAFE_INTEGER : Number.MAX_SAFE_INTEGER
      const rightOrder = rightChapterId ? chapterOrder.get(rightChapterId) ?? Number.MAX_SAFE_INTEGER : Number.MAX_SAFE_INTEGER

      return leftOrder - rightOrder || leftId.localeCompare(rightId)
    })
  const hasCurrentPageNotes = noteHasContent(globalNote) || noteHasContent(chapterNote)

  useEffect(() => {
    if (!open) {
      setEditingId(null)
      setActiveTab('page')
    }
  }, [open])

  useEffect(() => {
    if (open) {
      const margin = 8
      const isWide = window.innerWidth >= 640
      const defaultWidth = Math.min(window.innerWidth - margin * 2, isWide ? 352 : 360)
      const defaultHeight = Math.min(window.innerHeight - margin * 2, isWide ? 500 : 320)
      const nextSize = clampPanelSize(defaultWidth, defaultHeight)
      setSize(nextSize)
      setPosition({
        x: Math.max(margin, window.innerWidth - nextSize.width - margin),
        y: isWide
          ? Math.min(64, Math.max(margin, window.innerHeight - nextSize.height - margin))
          : Math.max(margin, window.innerHeight - nextSize.height - 76),
      })
    } else {
      setPosition(null)
      setSize(null)
    }
  }, [open])

  useEffect(() => {
    if (!open) return
    const handler = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [open, onClose])

  function clampPanelPosition(nextX: number, nextY: number) {
    const panel = panelRef.current
    const rect = panel?.getBoundingClientRect()
    const width = rect?.width ?? Math.min(window.innerWidth - 16, 352)
    const height = rect?.height ?? Math.min(window.innerHeight - 96, 520)
    const margin = 8
    return {
      x: Math.min(Math.max(nextX, margin), Math.max(margin, window.innerWidth - width - margin)),
      y: Math.min(Math.max(nextY, margin), Math.max(margin, window.innerHeight - height - margin)),
    }
  }

  function clampPanelSize(nextWidth: number, nextHeight: number) {
    const margin = 8
    const maxWidth = Math.max(220, window.innerWidth - margin * 2)
    const maxHeight = Math.max(240, window.innerHeight - margin * 2)
    const minWidth = Math.min(300, maxWidth)
    const minHeight = Math.min(260, maxHeight)

    return {
      width: Math.min(Math.max(nextWidth, minWidth), maxWidth),
      height: Math.min(Math.max(nextHeight, minHeight), maxHeight),
    }
  }

  function applyPanelSize(width: number, height: number, left?: number, top?: number) {
    const nextSize = clampPanelSize(width, height)
    setSize(nextSize)
    if (typeof left === 'number' && typeof top === 'number') {
      const margin = 8
      setPosition({
        x: Math.min(Math.max(left, margin), Math.max(margin, window.innerWidth - nextSize.width - margin)),
        y: Math.min(Math.max(top, margin), Math.max(margin, window.innerHeight - nextSize.height - margin)),
      })
    }
  }

  function applyDirectedResize(
    direction: ResizeDirection,
    startWidth: number,
    startHeight: number,
    startLeft: number,
    startTop: number,
    deltaX: number,
    deltaY: number
  ) {
    const growsWest = direction.includes('w')
    const growsEast = direction.includes('e')
    const growsNorth = direction.includes('n')
    const growsSouth = direction.includes('s')
    const nextSize = clampPanelSize(
      startWidth + (growsEast ? deltaX : 0) - (growsWest ? deltaX : 0),
      startHeight + (growsSouth ? deltaY : 0) - (growsNorth ? deltaY : 0)
    )
    const nextLeft = growsWest ? startLeft + startWidth - nextSize.width : startLeft
    const nextTop = growsNorth ? startTop + startHeight - nextSize.height : startTop

    applyPanelSize(nextSize.width, nextSize.height, nextLeft, nextTop)
  }

  function handleDragStart(event: PointerEvent<HTMLElement>) {
    if (event.button !== 0) return
    const panel = panelRef.current
    if (!panel) return
    const rect = panel.getBoundingClientRect()
    dragRef.current = {
      pointerId: event.pointerId,
      offsetX: event.clientX - rect.left,
      offsetY: event.clientY - rect.top,
    }
    setPosition({ x: rect.left, y: rect.top })
    event.currentTarget.setPointerCapture(event.pointerId)
  }

  function handleResizeStart(event: PointerEvent<HTMLButtonElement>, direction: ResizeDirection) {
    if (event.button !== 0) return
    event.preventDefault()
    event.stopPropagation()

    const panel = panelRef.current
    if (!panel) return
    const rect = panel.getBoundingClientRect()
    resizeRef.current = {
      pointerId: event.pointerId,
      direction,
      startX: event.clientX,
      startY: event.clientY,
      startWidth: rect.width,
      startHeight: rect.height,
      startLeft: rect.left,
      startTop: rect.top,
    }
    setPosition({ x: rect.left, y: rect.top })
    setSize({ width: rect.width, height: rect.height })
    event.currentTarget.setPointerCapture(event.pointerId)
  }

  function handleResizeMove(event: PointerEvent<HTMLButtonElement>) {
    const resize = resizeRef.current
    if (!resize || resize.pointerId !== event.pointerId) return
    event.preventDefault()
    applyDirectedResize(
      resize.direction,
      resize.startWidth,
      resize.startHeight,
      resize.startLeft,
      resize.startTop,
      event.clientX - resize.startX,
      event.clientY - resize.startY
    )
  }

  function handleResizeEnd(event: PointerEvent<HTMLButtonElement>) {
    if (resizeRef.current?.pointerId === event.pointerId) {
      resizeRef.current = null
      event.currentTarget.releasePointerCapture(event.pointerId)
    }
  }

  function handleResizeKeyDown(event: ReactKeyboardEvent<HTMLButtonElement>, direction: ResizeDirection) {
    if (!['ArrowRight', 'ArrowLeft', 'ArrowDown', 'ArrowUp'].includes(event.key)) return
    event.preventDefault()

    const panel = panelRef.current
    if (!panel) return
    const rect = panel.getBoundingClientRect()
    const step = event.shiftKey ? 48 : 24
    const deltaX = direction.includes('e') || direction.includes('w')
      ? event.key === 'ArrowRight'
        ? step
        : event.key === 'ArrowLeft'
          ? -step
          : 0
      : 0
    const deltaY = direction.includes('n') || direction.includes('s')
      ? event.key === 'ArrowDown'
        ? step
        : event.key === 'ArrowUp'
          ? -step
          : 0
      : 0

    applyDirectedResize(direction, rect.width, rect.height, rect.left, rect.top, deltaX, deltaY)
  }

  function handleDragMove(event: PointerEvent<HTMLElement>) {
    const drag = dragRef.current
    if (!drag || drag.pointerId !== event.pointerId) return
    setPosition(clampPanelPosition(event.clientX - drag.offsetX, event.clientY - drag.offsetY))
  }

  function handleDragEnd(event: PointerEvent<HTMLElement>) {
    if (dragRef.current?.pointerId === event.pointerId) {
      dragRef.current = null
      event.currentTarget.releasePointerCapture(event.pointerId)
    }
  }

  return (
    <>
      {open && (
        <div className="pointer-events-none fixed inset-0 z-[60]">
          <aside
            ref={panelRef}
            data-notes-panel="true"
            className="pointer-events-auto fixed bottom-[calc(4.75rem+env(safe-area-inset-bottom))] right-2 flex flex-col overflow-hidden rounded-2xl border border-slate-700/70 bg-slate-950/95 shadow-2xl shadow-black/70 sm:bottom-auto sm:right-4 sm:top-16"
            style={{
              width: size ? `${size.width}px` : 'min(calc(100vw - 1rem), 22rem)',
              height: size ? `${size.height}px` : undefined,
              maxHeight: size ? undefined : 'min(68dvh, 30rem)',
              pointerEvents: 'auto',
              ...(position ? { left: position.x, top: position.y, right: 'auto', bottom: 'auto' } : {}),
            }}
          >
            <header
              className="shrink-0 cursor-grab touch-none border-b border-slate-800/80 px-3 py-2.5 active:cursor-grabbing"
              onPointerDown={handleDragStart}
              onPointerMove={handleDragMove}
              onPointerUp={handleDragEnd}
              onPointerCancel={handleDragEnd}
            >
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0">
                  <div className="flex items-center gap-2 text-teal-300">
                    <NotebookPen size={15} />
                    <h2 className="text-sm font-semibold">Player Notes</h2>
                    <GripHorizontal size={14} className="text-slate-600" aria-hidden="true" />
                  </div>
                  <p className="mt-1 text-xs leading-relaxed text-slate-500">
                    Drag header to move. Drag edges to resize.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={onClose}
                  aria-label="Close notes"
                  onPointerDown={event => event.stopPropagation()}
                  className="rounded-lg p-2 text-slate-500 transition-colors hover:bg-slate-900 hover:text-slate-200"
                >
                  <X size={16} />
                </button>
              </div>
            </header>

            <div className="min-h-0 flex-1 overflow-y-auto px-3 py-3">
              <div className="flex min-h-full flex-col gap-3">
                <div className="grid shrink-0 grid-cols-2 gap-1 rounded-xl border border-slate-800 bg-slate-950/55 p-1">
                  {([
                    ['page', 'Current Page'],
                    ['all', `All Notes${allNoteEntries.length ? ` (${allNoteEntries.length})` : ''}`],
                  ] as const).map(([tab, label]) => (
                    <button
                      key={tab}
                      type="button"
                      onClick={() => {
                        setEditingId(null)
                        setActiveTab(tab)
                      }}
                      className={cn(
                        'rounded-lg px-2 py-1.5 text-xs font-semibold transition-colors',
                        activeTab === tab
                          ? 'bg-slate-800 text-slate-100 shadow-sm'
                          : 'text-slate-500 hover:bg-slate-900/70 hover:text-slate-300'
                      )}
                    >
                      {label}
                    </button>
                  ))}
                </div>

                {activeTab === 'page' ? (
                  <>
                    <NotePanel
                      id={GLOBAL_NOTE_ID}
                      title="Current Priorities"
                      subtitle="Always visible here, regardless of guide page."
                      icon={<Pin size={13} />}
                      value={globalNote}
                      placeholder="Junction goals, cards to win, items to farm..."
                      accent="teal"
                      editingId={editingId}
                      quickActions={quickNotes}
                      onEdit={setEditingId}
                      onDone={() => setEditingId(null)}
                      onUpdateNote={onUpdateNote}
                      onDeleteNote={onDeleteNote}
                    />

                    <NotePanel
                      id={currentChapterNoteId}
                      title="This Page"
                      subtitle={chapter?.title ?? 'No guide page selected'}
                      icon={<ClipboardList size={13} />}
                      value={chapterNote}
                      placeholder="Anything to remember for this page..."
                      accent="sky"
                      editingId={editingId}
                      disabled={!chapter}
                      onEdit={setEditingId}
                      onDone={() => setEditingId(null)}
                      onUpdateNote={onUpdateNote}
                      onDeleteNote={onDeleteNote}
                    />

                    {!hasCurrentPageNotes && !editingId && (
                      <p className="mt-auto rounded-lg border border-dashed border-slate-800 px-3 py-2 text-xs leading-relaxed text-slate-500">
                        Add a priority or page note when there is something you want kept handy.
                      </p>
                    )}
                  </>
                ) : (
                  <section className="flex min-h-0 flex-1 flex-col gap-2">
                    {allNoteEntries.length === 0 ? (
                      <p className="rounded-lg border border-dashed border-slate-800 px-3 py-2 text-xs leading-relaxed text-slate-500">
                        No saved notes yet. Add one from Current Page when something is worth tracking.
                      </p>
                    ) : (
                      allNoteEntries.map(([id, value]) => {
                        const linkedChapterId = noteChapterId(id)
                        const linkedChapter = linkedChapterId ? chapterById.get(linkedChapterId) : null
                        const isGlobal = id === GLOBAL_NOTE_ID

                        return (
                          <article key={id} className="rounded-xl border border-slate-800/80 bg-slate-900/35 p-3">
                            <div className="flex items-start justify-between gap-2">
                              <div className="min-w-0">
                                <div className="flex items-center gap-2 text-slate-300">
                                  {isGlobal ? <Pin size={13} className="text-teal-300" /> : <ClipboardList size={13} className="text-sky-300" />}
                                  <h3 className="truncate text-xs font-semibold uppercase tracking-widest">
                                    {isGlobal ? 'Current Priorities' : linkedChapter?.title ?? noteLabel(id)}
                                  </h3>
                                </div>
                                <p className="mt-1 truncate text-xs text-slate-500">
                                  {isGlobal
                                    ? 'Always available'
                                    : linkedChapter
                                      ? `Disc ${linkedChapter.disc}, Chapter ${linkedChapter.index}`
                                      : 'Guide page note'}
                                </p>
                              </div>
                              <div className="flex shrink-0 items-center gap-1">
                                {linkedChapterId ? (
                                  <button
                                    type="button"
                                    onClick={() => {
                                      onJumpToChapter(linkedChapterId)
                                      setActiveTab('page')
                                    }}
                                    className="inline-flex items-center gap-1 rounded-lg border border-sky-500/30 bg-sky-950/25 px-2 py-1.5 text-[11px] font-medium text-sky-200 transition-colors hover:border-sky-400/60 hover:bg-sky-900/35"
                                  >
                                    Open
                                    <ArrowRight size={12} />
                                  </button>
                                ) : (
                                  <button
                                    type="button"
                                    onClick={() => setActiveTab('page')}
                                    className="inline-flex items-center gap-1 rounded-lg border border-teal-500/30 bg-teal-950/25 px-2 py-1.5 text-[11px] font-medium text-teal-200 transition-colors hover:border-teal-400/60 hover:bg-teal-900/35"
                                  >
                                    Edit
                                  </button>
                                )}
                                <button
                                  type="button"
                                  onClick={() => onDeleteNote(id)}
                                  className="rounded-md p-1.5 text-slate-600 transition-colors hover:bg-slate-950/70 hover:text-rose-300"
                                  aria-label={`Delete ${isGlobal ? 'current priorities' : linkedChapter?.title ?? noteLabel(id)} note`}
                                >
                                  <Trash2 size={13} />
                                </button>
                              </div>
                            </div>
                            <p className="mt-2 max-h-40 overflow-y-auto whitespace-pre-line rounded-lg border border-slate-800 bg-slate-950/45 px-3 py-2 text-sm leading-relaxed text-slate-200">
                              {value}
                            </p>
                          </article>
                        )
                      })
                    )}
                  </section>
                )}
              </div>
            </div>
            {RESIZE_HANDLES.map(handle => (
              <button
                key={handle.direction}
                type="button"
                data-resize-handle={handle.direction}
                aria-label={`Resize notes panel ${handle.label}`}
                aria-keyshortcuts="ArrowUp ArrowDown ArrowLeft ArrowRight"
                title={`Drag ${handle.label} to resize. Arrow keys also work.`}
                style={{ cursor: handle.cursor }}
                onPointerDown={event => handleResizeStart(event, handle.direction)}
                onPointerMove={handleResizeMove}
                onPointerUp={handleResizeEnd}
                onPointerCancel={handleResizeEnd}
                onKeyDown={event => handleResizeKeyDown(event, handle.direction)}
                className={cn(
                  'absolute touch-none rounded-md text-transparent outline-none transition-colors focus:bg-teal-400/20 focus:ring-2 focus:ring-teal-400/40',
                  handle.className
                )}
              >
                <span className="sr-only">{handle.label}</span>
              </button>
            ))}
          </aside>
        </div>
      )}
    </>
  )
}

function NotePanel({
  id,
  title,
  subtitle,
  icon,
  value,
  placeholder,
  accent,
  editingId,
  disabled,
  quickActions,
  onEdit,
  onDone,
  onUpdateNote,
  onDeleteNote,
}: NotePanelProps) {
  const isEditing = editingId === id
  const hasContent = noteHasContent(value)
  const styles = accentStyles[accent]
  const [selectedQuickNote, setSelectedQuickNote] = useState(quickActions?.[0] ?? '')

  useEffect(() => {
    if (!quickActions?.length) return
    if (!quickActions.includes(selectedQuickNote)) setSelectedQuickNote(quickActions[0])
  }, [quickActions, selectedQuickNote])

  return (
    <section
      className={cn(
        'flex shrink-0 flex-col rounded-xl border border-slate-800/80 bg-slate-900/35 p-3',
        isEditing && 'min-h-[18rem] flex-1 bg-slate-900/50'
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className={cn('flex items-center gap-2', styles.icon)}>
            {icon}
            <h3 className="text-xs font-semibold uppercase tracking-widest text-slate-300">{title}</h3>
          </div>
          <p className="mt-1 truncate text-xs text-slate-500">{subtitle}</p>
        </div>
        <div className="flex shrink-0 items-center gap-1">
          {hasContent && !isEditing && (
            <button
              type="button"
              onClick={() => onDeleteNote(id)}
              className="rounded-md p-1.5 text-slate-600 transition-colors hover:bg-slate-950/70 hover:text-rose-300"
              aria-label={`Clear ${title.toLowerCase()}`}
            >
              <Trash2 size={13} />
            </button>
          )}
          <button
            type="button"
            onClick={() => (isEditing ? onDone() : onEdit(id))}
            disabled={disabled}
            className={cn(
              'inline-flex items-center gap-1.5 rounded-lg border px-2 py-1.5 text-[11px] font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-45',
              isEditing ? styles.button : 'border-slate-800 bg-slate-950/40 text-slate-400 hover:border-slate-700 hover:text-slate-200'
            )}
          >
            {isEditing ? <Check size={12} /> : <Pencil size={12} />}
            {isEditing ? 'Done' : hasContent ? 'Edit' : 'Add'}
          </button>
        </div>
      </div>

      {isEditing ? (
        <div className="mt-3 flex min-h-0 flex-1 flex-col gap-2">
          <textarea
            value={value}
            onChange={event => onUpdateNote(id, event.target.value)}
            disabled={disabled}
            placeholder={placeholder}
            style={{ minHeight: '10rem' }}
            className={cn(
              'min-h-[10rem] w-full flex-1 resize-none rounded-lg border border-slate-800 bg-slate-950/70 px-3 py-2 text-sm leading-relaxed text-slate-200 placeholder:text-slate-600 focus:ring-2 disabled:cursor-not-allowed disabled:opacity-50',
              styles.focus
            )}
          />
          {quickActions && quickActions.length > 0 && (
            <div className="grid grid-cols-[minmax(0,1fr)_auto] gap-1.5">
              <select
                value={selectedQuickNote}
                onChange={event => setSelectedQuickNote(event.target.value)}
                aria-label="Choose note template"
                className="min-w-0 rounded-lg border border-slate-800 bg-slate-950/70 px-2 py-1.5 text-xs text-slate-300 outline-none transition-colors focus:border-teal-500/50 focus:ring-2 focus:ring-teal-500/15"
              >
                {quickActions.map(snippet => (
                  <option key={snippet} value={snippet}>
                    {snippet.replace(': ', '')}
                  </option>
                ))}
              </select>
              <button
                type="button"
                onClick={() => onUpdateNote(id, insertQuickNote(value, selectedQuickNote))}
                className="inline-flex items-center gap-1.5 rounded-lg border border-teal-500/35 bg-teal-950/30 px-2.5 py-1.5 text-xs font-medium text-teal-200 transition-colors hover:border-teal-400/60 hover:bg-teal-900/40"
              >
                <Plus size={12} />
                Insert
              </button>
            </div>
          )}
        </div>
      ) : (
        <div
          className={cn(
            'mt-3 rounded-lg border px-3 py-2 text-sm leading-relaxed',
            hasContent
              ? 'max-h-52 overflow-y-auto whitespace-pre-line border-slate-800 bg-slate-950/45 text-slate-200'
              : 'border-dashed border-slate-800 bg-slate-950/25 text-xs text-slate-600'
          )}
        >
          {hasContent ? value : placeholder}
        </div>
      )}
    </section>
  )
}
