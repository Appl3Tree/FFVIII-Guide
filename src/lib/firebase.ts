import { initializeApp, type FirebaseApp } from 'firebase/app'
import { getAuth, GoogleAuthProvider, type Auth } from 'firebase/auth'
import { getFirestore, type Firestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
}

export const GUIDE_SLUG = import.meta.env.VITE_GUIDE_SLUG || 'ff8'

const requiredConfigValues = [
  firebaseConfig.apiKey,
  firebaseConfig.authDomain,
  firebaseConfig.projectId,
  firebaseConfig.storageBucket,
  firebaseConfig.messagingSenderId,
  firebaseConfig.appId,
]

export const firebaseEnabled =
  /^[a-z0-9-]+$/.test(GUIDE_SLUG) &&
  requiredConfigValues.every(value => typeof value === 'string' && value.trim().length > 0)

let app: FirebaseApp | null = null
export let auth: Auth | null = null
export let db: Firestore | null = null
export let googleProvider: GoogleAuthProvider | null = null

if (firebaseEnabled) {
  app = initializeApp(firebaseConfig)
  auth = getAuth(app)
  db = getFirestore(app)
  googleProvider = new GoogleAuthProvider()
  googleProvider.setCustomParameters({ prompt: 'select_account' })
}
