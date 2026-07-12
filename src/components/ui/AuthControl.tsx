import { useState } from 'react'
import { createPortal } from 'react-dom'
import { AlertCircle, CheckCircle2, Cloud, Info, Loader2, LogOut, Mail, X } from 'lucide-react'
import { cn } from '../../lib/utils'
import { firebaseEnabled } from '../../lib/firebase'
import type { useTracker } from '../../hooks/useTracker'

type Tracker = ReturnType<typeof useTracker>

interface Props {
  tracker: Tracker
}

const syncLabels: Record<Tracker['syncStatus'], string> = {
  local: 'Progress saved locally',
  'loading-cloud': 'Loading cloud progress',
  syncing: 'Syncing to cloud',
  saved: 'Cloud progress saved',
  issue: 'Cloud sync issue',
  conflict: 'Choose progress source',
}

function cleanAuthError(message: string | null) {
  if (!message) return null
  return message
    .replace(/^Firebase:\s*/i, '')
    .replace(/\s*\(auth\/[^)]+\)\.?$/i, '')
    .trim()
}

export function AuthControl({ tracker }: Props) {
  const [open, setOpen] = useState(false)
  const [mode, setMode] = useState<'signin' | 'create'>('signin')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [localError, setLocalError] = useState<string | null>(null)
  const [notice, setNotice] = useState<string | null>(null)
  const [busy, setBusy] = useState(false)
  const signedIn = !!tracker.user
  const label = signedIn ? tracker.user?.email ?? 'Signed in' : 'Progress saved locally'
  const status = signedIn ? syncLabels[tracker.syncStatus] : firebaseEnabled ? 'Sign in to sync' : 'Local only'
  const tooltip = signedIn
    ? 'Signed-in progress is synced to Firebase under your account. Firestore security rules restrict each user to their own guide progress.'
    : 'Progress is saved locally in this browser by default. Sign in to sync progress to your account through Firebase.'
  const error = localError ?? cleanAuthError(tracker.authError)
  const dialog = open ? createPortal(
    <div className="fixed inset-0 z-[100] flex items-center justify-center px-4 py-6">
      <button className="absolute inset-0 cursor-default bg-black/70" aria-label="Close sign in dialog" onClick={() => setOpen(false)} />
      <form onSubmit={submitEmail} className="relative w-full max-w-sm rounded-xl border border-slate-700/70 bg-slate-950 p-4 shadow-2xl shadow-black/60">
        <div className="mb-4 flex items-start justify-between gap-3">
          <div>
            <h2 className="text-sm font-semibold text-slate-100">Sync progress</h2>
            <p className="mt-1 text-xs leading-relaxed text-slate-500">Sign in to sync checked progress through Firebase.</p>
          </div>
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Cancel sign in"
            className="rounded-md p-1 text-slate-500 transition-colors hover:text-slate-200 focus-visible:ring-2 focus-visible:ring-teal-500/40"
          >
            <X size={16} />
          </button>
        </div>

        <div className="mb-3 grid grid-cols-2 gap-1 rounded-lg border border-slate-800 bg-slate-900/60 p-1">
          <button
            type="button"
            onClick={() => setMode('signin')}
            className={cn('rounded-md px-2 py-1.5 text-xs transition-colors', mode === 'signin' ? 'bg-slate-700/80 text-slate-100' : 'text-slate-500 hover:text-slate-300')}
          >
            Use existing
          </button>
          <button
            type="button"
            onClick={() => setMode('create')}
            className={cn('rounded-md px-2 py-1.5 text-xs transition-colors', mode === 'create' ? 'bg-slate-700/80 text-slate-100' : 'text-slate-500 hover:text-slate-300')}
          >
            Create account
          </button>
        </div>

        <label className="mb-2 block">
          <span className="mb-1 block text-[11px] font-medium uppercase tracking-wide text-slate-500">Email</span>
          <input
            type="email"
            value={email}
            onChange={event => setEmail(event.target.value)}
            required
            autoComplete="email"
            className="w-full rounded-lg border border-slate-700/60 bg-slate-900/80 px-3 py-2 text-sm text-slate-100 outline-none placeholder:text-slate-600 focus:border-teal-500/70"
          />
        </label>
        <label className="mb-3 block">
          <span className="mb-1 block text-[11px] font-medium uppercase tracking-wide text-slate-500">Password</span>
          <input
            type="password"
            value={password}
            onChange={event => setPassword(event.target.value)}
            required
            minLength={6}
            autoComplete={mode === 'signin' ? 'current-password' : 'new-password'}
            className="w-full rounded-lg border border-slate-700/60 bg-slate-900/80 px-3 py-2 text-sm text-slate-100 outline-none placeholder:text-slate-600 focus:border-teal-500/70"
          />
        </label>

        {error && (
          <div className="mb-3 flex items-start gap-2 rounded-lg border border-red-900/60 bg-red-950/25 px-3 py-2 text-xs leading-relaxed text-red-200">
            <AlertCircle size={13} className="mt-0.5 shrink-0" />
            {error}
          </div>
        )}
        {notice && (
          <div className="mb-3 rounded-lg border border-teal-900/60 bg-teal-950/25 px-3 py-2 text-xs text-teal-200">
            {notice}
          </div>
        )}

        <div className="grid gap-2">
          <button
            type="submit"
            disabled={busy}
            className="glass-button-teal inline-flex items-center justify-center gap-2 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {busy ? <Loader2 size={14} className="animate-spin" /> : <Mail size={14} />}
            {mode === 'signin' ? 'Sign in with email' : 'Create account'}
          </button>
          <button
            type="button"
            onClick={handleGoogle}
            disabled={busy}
            className="glass-button inline-flex items-center justify-center gap-2 disabled:cursor-not-allowed disabled:opacity-60"
          >
            Continue with Google
          </button>
        </div>

        <div className="mt-3 flex items-center justify-between gap-2">
          <button type="button" onClick={handleResetPassword} className="text-xs text-slate-500 transition-colors hover:text-teal-300">
            Reset password
          </button>
          <button type="button" onClick={() => setOpen(false)} className="text-xs text-slate-500 transition-colors hover:text-slate-300">
            Cancel
          </button>
        </div>
      </form>
    </div>,
    document.body,
  ) : null

  async function submitEmail(event: React.FormEvent) {
    event.preventDefault()
    setLocalError(null)
    setNotice(null)
    if (!firebaseEnabled) {
      setLocalError('Firebase is not configured for this build.')
      return
    }
    if (password.length < 6) {
      setLocalError('Password must be at least 6 characters.')
      return
    }
    setBusy(true)
    try {
      if (mode === 'signin') await tracker.signInWithEmail(email, password)
      else await tracker.createAccountWithEmail(email, password)
      setOpen(false)
    } catch {
      // The tracker exposes a compact Firebase auth error.
    } finally {
      setBusy(false)
    }
  }

  async function handleResetPassword() {
    setLocalError(null)
    setNotice(null)
    if (!firebaseEnabled) {
      setLocalError('Firebase is not configured for this build.')
      return
    }
    if (!email.trim()) {
      setLocalError('Enter your email address first.')
      return
    }
    setBusy(true)
    try {
      await tracker.resetPassword(email)
      setNotice('Password reset email sent.')
    } catch {
      // The tracker exposes a compact Firebase auth error.
    } finally {
      setBusy(false)
    }
  }

  async function handleGoogle() {
    setLocalError(null)
    setNotice(null)
    if (!firebaseEnabled) {
      setLocalError('Firebase is not configured for this build.')
      return
    }
    setBusy(true)
    try {
      await tracker.signInWithGoogle()
      setOpen(false)
    } catch {
      // The tracker exposes a compact Firebase auth error.
    } finally {
      setBusy(false)
    }
  }

  return (
    <>
      <div className="relative flex min-w-0 items-center gap-1.5">
        <button
          type="button"
          onClick={() => signedIn ? undefined : setOpen(true)}
          className={cn(
            'group flex h-8 min-w-0 max-w-full items-center gap-1.5 rounded-lg border px-2 text-left text-xs transition-colors focus-visible:ring-2 focus-visible:ring-teal-500/40',
            signedIn
              ? 'border-teal-700/45 bg-teal-950/20 text-teal-100'
              : 'border-slate-700/50 bg-slate-900/55 text-slate-300 hover:border-slate-600 hover:text-slate-100'
          )}
          aria-label={signedIn ? 'Cloud progress account' : 'Open sign in dialog'}
        >
          {tracker.syncStatus === 'syncing' || tracker.syncStatus === 'loading-cloud'
            ? <Loader2 size={13} className="shrink-0 animate-spin text-teal-300" />
            : signedIn
              ? <Cloud size={13} className="shrink-0 text-teal-300" />
              : <CheckCircle2 size={13} className="shrink-0 text-slate-500" />}
          <span className="min-w-0 truncate font-medium">{label}</span>
          {signedIn && (
            <span className="hidden shrink-0 text-[10px] text-slate-500 xl:inline">
              {status}
            </span>
          )}
          {!signedIn && firebaseEnabled && (
            <span className="hidden shrink-0 text-[10px] text-teal-400 xl:inline">
              Sign in
            </span>
          )}
          <span
            aria-hidden="true"
            className={cn(
              'ml-auto h-1.5 w-1.5 shrink-0 rounded-full',
              tracker.syncStatus === 'issue'
                ? 'bg-red-400'
                : tracker.syncStatus === 'conflict'
                  ? 'bg-amber-300'
                  : signedIn
                    ? 'bg-teal-300'
                    : 'bg-slate-600'
            )}
          />
          <span className="sr-only">
            {status}
          </span>
        </button>
        <div className="group relative">
          <button
            type="button"
            aria-label="Progress sync information"
            className="rounded-md p-1 text-slate-500 transition-colors hover:text-slate-200 focus-visible:ring-2 focus-visible:ring-teal-500/40"
          >
            <Info size={13} />
          </button>
          <div className="pointer-events-none absolute right-0 top-full z-[90] mt-2 hidden w-64 rounded-lg border border-slate-700/70 bg-slate-950/95 px-3 py-2 text-xs leading-relaxed text-slate-300 shadow-2xl shadow-black/50 group-hover:block group-focus-within:block">
            {tooltip}
          </div>
        </div>
        {signedIn && (
          <button
            type="button"
            onClick={tracker.signOut}
            aria-label="Sign out"
            className="rounded-md p-1.5 text-slate-500 transition-colors hover:text-slate-200 focus-visible:ring-2 focus-visible:ring-teal-500/40"
          >
            <LogOut size={13} />
          </button>
        )}
      </div>

      {dialog}
    </>
  )
}
