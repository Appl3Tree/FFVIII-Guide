import { useState, useCallback, useEffect, useRef } from 'react'
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut as firebaseSignOut,
  type User,
} from 'firebase/auth'
import { doc, getDoc, serverTimestamp, setDoc } from 'firebase/firestore'
import type { MasterData, TrackerState } from '../types'
import { auth, db, firebaseEnabled, googleProvider, GUIDE_SLUG } from '../lib/firebase'

const STORAGE_KEY = 'ffviii-tracker-v2'
const SYNC_DEBOUNCE_MS = 1000

type AuthStatus = 'disabled' | 'loading' | 'signed-out' | 'signed-in'
type SyncStatus =
  | 'local'
  | 'loading-cloud'
  | 'syncing'
  | 'saved'
  | 'issue'
  | 'conflict'

export type SyncConflictChoice = 'local' | 'cloud' | 'merge'

export interface SyncConflict {
  localChecked: Record<string, boolean>
  cloudChecked: Record<string, boolean>
  mergedChecked: Record<string, boolean>
  onlyLocal: string[]
  onlyCloud: string[]
  counts: {
    local: number
    cloud: number
    merge: number
  }
}

const defaultState: TrackerState = {
  completedItems: {},
  notes: {},
}

function activeChecked(checked: Record<string, boolean>) {
  return Object.fromEntries(Object.entries(checked).filter(([, value]) => value)) as Record<string, boolean>
}

function checkedCount(checked: Record<string, boolean>) {
  return Object.values(checked).filter(Boolean).length
}

function checkedKeys(checked: Record<string, boolean>) {
  return Object.keys(activeChecked(checked)).sort()
}

function sameChecked(left: Record<string, boolean>, right: Record<string, boolean>) {
  const leftKeys = checkedKeys(left)
  const rightKeys = checkedKeys(right)
  return leftKeys.length === rightKeys.length && leftKeys.every((key, index) => key === rightKeys[index])
}

function difference(left: Record<string, boolean>, right: Record<string, boolean>) {
  const rightActive = activeChecked(right)
  return checkedKeys(left).filter(key => !rightActive[key])
}

function toConflict(localChecked: Record<string, boolean>, cloudChecked: Record<string, boolean>): SyncConflict {
  const local = activeChecked(localChecked)
  const cloud = activeChecked(cloudChecked)
  const mergedChecked = activeChecked({ ...cloud, ...local })

  return {
    localChecked: local,
    cloudChecked: cloud,
    mergedChecked,
    onlyLocal: difference(local, cloud),
    onlyCloud: difference(cloud, local),
    counts: {
      local: checkedCount(local),
      cloud: checkedCount(cloud),
      merge: checkedCount(mergedChecked),
    },
  }
}

function parseChecked(value: unknown): Record<string, boolean> {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return {}
  return activeChecked(value as Record<string, boolean>)
}

function errorMessage(error: unknown, fallback: string) {
  return error instanceof Error ? error.message : fallback
}

function loadState(): TrackerState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return defaultState
    const parsed = JSON.parse(raw) as Partial<TrackerState>
    return {
      completedItems: parseChecked(parsed.completedItems),
      notes: parsed.notes && typeof parsed.notes === 'object' && !Array.isArray(parsed.notes) ? parsed.notes as Record<string, string> : {},
    }
  } catch {
    return defaultState
  }
}

function guideDocRef(uid: string) {
  if (!db) throw new Error('Firebase is not configured.')
  return doc(db, 'users', uid, 'guides', GUIDE_SLUG)
}

async function saveCheckedToCloud(uid: string, checked: Record<string, boolean>) {
  await setDoc(guideDocRef(uid), {
    checked: activeChecked(checked),
    guideSlug: GUIDE_SLUG,
    schemaVersion: 1,
    updatedAt: serverTimestamp(),
  })
}

export function useTracker() {
  const [state, setState] = useState<TrackerState>(loadState)
  const [user, setUser] = useState<User | null>(null)
  const [authStatus, setAuthStatus] = useState<AuthStatus>(firebaseEnabled ? 'loading' : 'disabled')
  const [syncStatus, setSyncStatus] = useState<SyncStatus>(firebaseEnabled ? 'local' : 'local')
  const [authError, setAuthError] = useState<string | null>(null)
  const [syncConflict, setSyncConflict] = useState<SyncConflict | null>(null)
  const stateRef = useRef(state)
  const userRef = useRef<User | null>(null)
  const syncStatusRef = useRef(syncStatus)
  const syncBlockedRef = useRef(false)
  const savingRef = useRef(false)
  const debounceRef = useRef<number | null>(null)

  useEffect(() => {
    stateRef.current = state
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  }, [state])

  useEffect(() => {
    userRef.current = user
  }, [user])

  useEffect(() => {
    syncStatusRef.current = syncStatus
  }, [syncStatus])

  useEffect(() => {
    if (!firebaseEnabled || !auth) return

    return onAuthStateChanged(auth, async nextUser => {
      if (debounceRef.current) window.clearTimeout(debounceRef.current)
      setUser(nextUser)
      userRef.current = nextUser
      setAuthError(null)
      setSyncConflict(null)
      syncBlockedRef.current = false

      if (!nextUser) {
        setAuthStatus('signed-out')
        setSyncStatus('local')
        return
      }

      setAuthStatus('signed-in')
      setSyncStatus('loading-cloud')

      try {
        const snapshot = await getDoc(guideDocRef(nextUser.uid))
        const cloudChecked = parseChecked(snapshot.exists() ? snapshot.data().checked : {})
        const localChecked = activeChecked(stateRef.current.completedItems)
        const localEmpty = checkedCount(localChecked) === 0
        const cloudEmpty = checkedCount(cloudChecked) === 0

        if (localEmpty && !cloudEmpty) {
          setState(current => ({ ...current, completedItems: cloudChecked }))
          setSyncStatus('saved')
        } else if (!localEmpty && cloudEmpty) {
          setSyncStatus('syncing')
          await saveCheckedToCloud(nextUser.uid, localChecked)
          setSyncStatus('saved')
        } else if (sameChecked(localChecked, cloudChecked)) {
          setSyncStatus('saved')
        } else if (!localEmpty && !cloudEmpty) {
          syncBlockedRef.current = true
          setSyncConflict(toConflict(localChecked, cloudChecked))
          setSyncStatus('conflict')
        } else {
          setSyncStatus('saved')
        }
      } catch (error) {
        console.error('Cloud progress load failed:', errorMessage(error, 'Unknown Firebase error.'))
        setSyncStatus('issue')
      }
    })
  }, [])

  useEffect(() => {
    const currentUser = userRef.current
    if (!firebaseEnabled || !currentUser || syncBlockedRef.current || syncStatusRef.current === 'loading-cloud') return
    if (debounceRef.current) window.clearTimeout(debounceRef.current)

    debounceRef.current = window.setTimeout(async () => {
      try {
        savingRef.current = true
        setSyncStatus('syncing')
        await saveCheckedToCloud(currentUser.uid, stateRef.current.completedItems)
        setSyncStatus('saved')
      } catch (error) {
        console.error('Cloud progress save failed:', errorMessage(error, 'Unknown Firebase error.'))
        setSyncStatus('issue')
      } finally {
        savingRef.current = false
      }
    }, SYNC_DEBOUNCE_MS)

    return () => {
      if (!savingRef.current && debounceRef.current) window.clearTimeout(debounceRef.current)
    }
  }, [state.completedItems])

  const setCheck = useCallback((key: string, next?: boolean) => {
    setState(current => {
      const currentlyChecked = !!current.completedItems[key]
      const nextChecked = typeof next === 'boolean' ? next : !currentlyChecked
      const completedItems = { ...current.completedItems }
      if (nextChecked) completedItems[key] = true
      else delete completedItems[key]
      return { ...current, completedItems }
    })
  }, [])

  const toggleItem = useCallback((id: string) => {
    setCheck(id)
  }, [setCheck])

  const isCompleted = useCallback((id: string) => {
    return !!state.completedItems[id]
  }, [state.completedItems])

  const updateNote = useCallback((id: string, value: string) => {
    setState(current => ({
      ...current,
      notes: { ...current.notes, [id]: value },
    }))
  }, [])

  const deleteNote = useCallback((id: string) => {
    setState(current => {
      const nextNotes = { ...current.notes }
      delete nextNotes[id]
      return { ...current, notes: nextNotes }
    })
  }, [])

  const getProgress = useCallback((
    category: 'achievements' | 'missables' | 'gfs' | 'cards' | 'chapter',
    data: MasterData,
    chapterId?: string,
  ): number => {
    let ids: string[] = []

    if (category === 'achievements') {
      ids = data.chapters
        .flatMap(ch => ch.checkpoints)
        .filter(cp => cp.type === 'achievement')
        .map(cp => cp.id)
    } else if (category === 'missables') {
      ids = data.chapters
        .flatMap(ch => ch.checkpoints)
        .filter(cp => cp.type === 'missable')
        .map(cp => cp.id)
    } else if (category === 'gfs') {
      ids = data.lookup.gfs.map(g => g.id)
    } else if (category === 'cards') {
      ids = data.lookup.cards.map(c => c.id)
    } else if (category === 'chapter' && chapterId) {
      const ch = data.chapters.find(c => c.id === chapterId)
      ids = ch?.checkpoints.map(cp => cp.id) ?? []
    }

    if (!ids.length) return 0
    const done = ids.filter(id => state.completedItems[id]).length
    return Math.round((done / ids.length) * 100)
  }, [state.completedItems])

  const resetAll = useCallback(() => setState(defaultState), [])

  const signInWithEmail = useCallback(async (email: string, password: string) => {
    setAuthError(null)
    if (!auth) throw new Error('Firebase is not configured.')
    try {
      await signInWithEmailAndPassword(auth, email, password)
    } catch (error) {
      const message = errorMessage(error, 'Unable to sign in.')
      setAuthError(message)
      throw error
    }
  }, [])

  const createAccountWithEmail = useCallback(async (email: string, password: string) => {
    setAuthError(null)
    if (!auth) throw new Error('Firebase is not configured.')
    try {
      await createUserWithEmailAndPassword(auth, email, password)
    } catch (error) {
      const message = errorMessage(error, 'Unable to create account.')
      setAuthError(message)
      throw error
    }
  }, [])

  const resetPassword = useCallback(async (email: string) => {
    setAuthError(null)
    if (!auth) throw new Error('Firebase is not configured.')
    try {
      await sendPasswordResetEmail(auth, email)
    } catch (error) {
      const message = errorMessage(error, 'Unable to send reset email.')
      setAuthError(message)
      throw error
    }
  }, [])

  const signInWithGoogle = useCallback(async () => {
    setAuthError(null)
    if (!auth || !googleProvider) throw new Error('Firebase is not configured.')
    try {
      await signInWithPopup(auth, googleProvider)
    } catch (error) {
      const message = errorMessage(error, 'Unable to continue with Google.')
      setAuthError(message)
      throw error
    }
  }, [])

  const signOut = useCallback(async () => {
    setAuthError(null)
    if (!auth) return
    await firebaseSignOut(auth)
  }, [])

  const resolveSyncConflict = useCallback(async (choice: SyncConflictChoice) => {
    if (!syncConflict || !userRef.current) return
    const selected =
      choice === 'local'
        ? syncConflict.localChecked
        : choice === 'cloud'
          ? syncConflict.cloudChecked
          : syncConflict.mergedChecked

    syncBlockedRef.current = false
    setSyncConflict(null)
    setState(current => ({ ...current, completedItems: activeChecked(selected) }))
    setSyncStatus('syncing')

    try {
      await saveCheckedToCloud(userRef.current.uid, selected)
      setSyncStatus('saved')
    } catch (error) {
      console.error('Cloud progress conflict resolution failed:', errorMessage(error, 'Unknown Firebase error.'))
      setSyncStatus('issue')
    }
  }, [syncConflict])

  return {
    state,
    checked: state.completedItems,
    setCheck,
    toggleItem,
    isCompleted,
    getProgress,
    updateNote,
    deleteNote,
    resetAll,
    user,
    authStatus,
    syncStatus,
    authError,
    syncConflict,
    signInWithEmail,
    createAccountWithEmail,
    resetPassword,
    signInWithGoogle,
    signOut,
    resolveSyncConflict,
  }
}
