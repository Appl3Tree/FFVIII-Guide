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
import { clampCharacterLevel, gfAbilityKey, MAX_ACTIVE_PARTY_SIZE } from '../lib/playerState'
import { BLUE_MAGIC } from '../data/blueMagic'
import { defaultProgressionChapterId, validProgressionChapterId } from '../lib/progression'

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

function createDefaultState(data: MasterData): TrackerState {
  const characters = data.lookup.characters ?? []
  return {
    completedItems: {},
    notes: {},
    magicCompletedByCharacter: {},
    learnedGFAbilities: {},
    learnedBlueMagic: Object.fromEntries(BLUE_MAGIC.filter(ability => ability.knownByDefault).map(ability => [ability.id, true])),
    characterLevels: Object.fromEntries(characters.map(character => [character.id, 1])),
    activeParty: Object.fromEntries(characters.map((character, index) => [character.id, index < 3])),
    progressionChapterId: defaultProgressionChapterId(data.chapters),
  }
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

function parseNotes(value: unknown) {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return {}
  return Object.fromEntries(
    Object.entries(value as Record<string, unknown>)
      .filter(([, item]) => typeof item === 'string')
      .map(([key, item]) => [key, item as string]),
  )
}

function parseNestedChecked(value: unknown) {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return {}
  return Object.fromEntries(
    Object.entries(value as Record<string, unknown>).map(([key, item]) => [key, parseChecked(item)]),
  )
}

function parseNumbers(value: unknown) {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return {}
  return Object.fromEntries(
    Object.entries(value as Record<string, unknown>)
      .filter(([, item]) => typeof item === 'number' && Number.isFinite(item))
      .map(([key, item]) => [key, clampCharacterLevel(item as number)]),
  )
}

function parseActiveParty(value: unknown) {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return null
  return Object.fromEntries(Object.entries(value as Record<string, unknown>).map(([key, item]) => [key, item === true]))
}

function normalizeActiveParty(data: MasterData, requested: Record<string, boolean>) {
  const characters = data.lookup.characters ?? []
  const selectedIds = characters
    .filter(character => requested[character.id])
    .slice(0, MAX_ACTIVE_PARTY_SIZE)
    .map(character => character.id)
  const ids = selectedIds.length > 0
    ? selectedIds
    : characters.slice(0, MAX_ACTIVE_PARTY_SIZE).map(character => character.id)
  return Object.fromEntries(characters.map(character => [character.id, ids.includes(character.id)]))
}

function errorMessage(error: unknown, fallback: string) {
  return error instanceof Error ? error.message : fallback
}

function parseTrackerState(value: unknown, data: MasterData): TrackerState {
  const parsed = value && typeof value === 'object' && !Array.isArray(value)
    ? value as Partial<TrackerState> & { checked?: unknown }
    : {}
  const defaults = createDefaultState(data)
  const parsedActiveParty = parseActiveParty(parsed.activeParty)
  return {
    completedItems: parseChecked(parsed.completedItems ?? parsed.checked),
    notes: parseNotes(parsed.notes),
    magicCompletedByCharacter: parseNestedChecked(parsed.magicCompletedByCharacter),
    learnedGFAbilities: parseChecked(parsed.learnedGFAbilities),
    learnedBlueMagic: {
      ...defaults.learnedBlueMagic,
      ...parseChecked(parsed.learnedBlueMagic),
    },
    characterLevels: { ...defaults.characterLevels, ...parseNumbers(parsed.characterLevels) },
    activeParty: parsedActiveParty
      ? normalizeActiveParty(data, parsedActiveParty)
      : defaults.activeParty,
    progressionChapterId: validProgressionChapterId(data.chapters, parsed.progressionChapterId),
  }
}

function stateHasPlayerProgress(state: TrackerState, data: MasterData) {
  const defaults = createDefaultState(data)
  return Object.keys(state.notes).length > 0 ||
    Object.keys(state.completedItems).length > 0 ||
    Object.keys(state.magicCompletedByCharacter).some(characterId => Object.keys(state.magicCompletedByCharacter[characterId] ?? {}).length > 0) ||
    Object.keys(state.learnedGFAbilities).length > 0 ||
    Object.keys(state.learnedBlueMagic).some(id => !defaults.learnedBlueMagic[id]) ||
    Object.entries(defaults.characterLevels).some(([id, level]) => state.characterLevels[id] !== level) ||
    Object.entries(defaults.activeParty).some(([id, active]) => state.activeParty[id] !== active)
    || state.progressionChapterId !== defaults.progressionChapterId
}

function loadState(data: MasterData): TrackerState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return createDefaultState(data)
    return parseTrackerState(JSON.parse(raw), data)
  } catch {
    return createDefaultState(data)
  }
}

function guideDocRef(uid: string) {
  if (!db) throw new Error('Firebase is not configured.')
  return doc(db, 'users', uid, 'guides', GUIDE_SLUG)
}

async function saveStateToCloud(uid: string, state: TrackerState) {
  await setDoc(guideDocRef(uid), {
    checked: activeChecked(state.completedItems),
    state,
    guideSlug: GUIDE_SLUG,
    schemaVersion: 2,
    updatedAt: serverTimestamp(),
  })
}

export function useTracker(data: MasterData) {
  const [state, setState] = useState<TrackerState>(() => loadState(data))
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
        const cloudData = snapshot.exists() ? snapshot.data() : {}
        const cloudState = parseTrackerState(cloudData.state ?? cloudData, data)
        const cloudHasPlayerState = stateHasPlayerProgress(cloudState, data)
        const cloudChecked = activeChecked(cloudState.completedItems)
        const localChecked = activeChecked(stateRef.current.completedItems)
        const localEmpty = checkedCount(localChecked) === 0
        const cloudEmpty = checkedCount(cloudChecked) === 0
        const localHasPlayerState = stateHasPlayerProgress(stateRef.current, data)

        if (localEmpty && !cloudEmpty) {
          setState(current => ({ ...current, completedItems: cloudChecked, ...(cloudHasPlayerState ? cloudState : {}) }))
          setSyncStatus('saved')
        } else if (!localEmpty && cloudEmpty) {
          setSyncStatus('syncing')
          await saveStateToCloud(nextUser.uid, stateRef.current)
          setSyncStatus('saved')
        } else if (sameChecked(localChecked, cloudChecked)) {
          if (!localHasPlayerState && cloudHasPlayerState) {
            setState(current => ({ ...current, ...cloudState }))
          } else if (localHasPlayerState && !cloudHasPlayerState) {
            setSyncStatus('syncing')
            await saveStateToCloud(nextUser.uid, stateRef.current)
          }
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
  }, [data])

  useEffect(() => {
    const currentUser = userRef.current
    if (!firebaseEnabled || !currentUser || syncBlockedRef.current || syncStatusRef.current === 'loading-cloud') return
    if (debounceRef.current) window.clearTimeout(debounceRef.current)

    debounceRef.current = window.setTimeout(async () => {
      try {
        savingRef.current = true
        setSyncStatus('syncing')
        await saveStateToCloud(currentUser.uid, stateRef.current)
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
  }, [state, data])

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

  const setMagicCompleted = useCallback((characterId: string, spellId: string, next?: boolean) => {
    setState(current => {
      const currentCharacter = current.magicCompletedByCharacter[characterId] ?? {}
      const nextCompleted = typeof next === 'boolean' ? next : !currentCharacter[spellId]
      const characterCompleted = { ...currentCharacter }
      if (nextCompleted) characterCompleted[spellId] = true
      else delete characterCompleted[spellId]
      return {
        ...current,
        magicCompletedByCharacter: {
          ...current.magicCompletedByCharacter,
          [characterId]: characterCompleted,
        },
      }
    })
  }, [])

  const setGFAbilityLearned = useCallback((gfId: string, abilityName: string, next?: boolean) => {
    setState(current => {
      const key = gfAbilityKey(gfId, abilityName)
      const nextLearned = typeof next === 'boolean' ? next : !current.learnedGFAbilities[key]
      const learnedGFAbilities = { ...current.learnedGFAbilities }
      if (nextLearned) learnedGFAbilities[key] = true
      else delete learnedGFAbilities[key]
      return { ...current, learnedGFAbilities }
    })
  }, [])

  const setBlueMagicLearned = useCallback((abilityId: string, next?: boolean) => {
    const ability = BLUE_MAGIC.find(candidate => candidate.id === abilityId)
    if (!ability || ability.knownByDefault) return
    setState(current => {
      const nextLearned = typeof next === 'boolean' ? next : !current.learnedBlueMagic[abilityId]
      const learnedBlueMagic = { ...current.learnedBlueMagic }
      if (nextLearned) learnedBlueMagic[abilityId] = true
      else delete learnedBlueMagic[abilityId]
      return { ...current, learnedBlueMagic }
    })
  }, [])

  const setCharacterLevel = useCallback((characterId: string, level: number) => {
    setState(current => ({
      ...current,
      characterLevels: {
        ...current.characterLevels,
        [characterId]: clampCharacterLevel(level),
      },
    }))
  }, [])

  const setActiveCharacter = useCallback((characterId: string, next?: boolean) => {
    let changed = false
    setState(current => {
      const active = !!current.activeParty[characterId]
      const nextActive = typeof next === 'boolean' ? next : !active
      const activeCount = Object.values(current.activeParty).filter(Boolean).length
      if (nextActive === active || (nextActive && activeCount >= MAX_ACTIVE_PARTY_SIZE) || (!nextActive && activeCount <= 1)) {
        return current
      }
      changed = true
      return {
        ...current,
        activeParty: { ...current.activeParty, [characterId]: nextActive },
      }
    })
    return changed
  }, [])

  const setProgressionChapter = useCallback((chapterId: string) => {
    const validId = validProgressionChapterId(data.chapters, chapterId)
    setState(current => ({ ...current, progressionChapterId: validId }))
  }, [data])

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

  const resetAll = useCallback(() => setState(createDefaultState(data)), [data])

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
      await saveStateToCloud(userRef.current.uid, { ...stateRef.current, completedItems: activeChecked(selected) })
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
    setMagicCompleted,
    setGFAbilityLearned,
    setBlueMagicLearned,
    setCharacterLevel,
    setActiveCharacter,
    setProgressionChapter,
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
