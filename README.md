# FFVIII Guide

A Vite/React companion guide for Final Fantasy VIII Remastered.

## Local Development

Install dependencies and start Vite:

```sh
npm ci
npm run dev
```

Progress is saved to localStorage by default. To enable Firebase Auth and Firestore sync locally, copy `.env.example` to `.env.local` and fill in the Firebase Web SDK values. Do not commit `.env.local` or real Firebase values.

## Deployment

This repo deploys to GitHub Pages through GitHub Actions in `.github/workflows/deploy.yml`. Add the Firebase Web SDK values as repository secrets:

- `VITE_FIREBASE_API_KEY`
- `VITE_FIREBASE_AUTH_DOMAIN`
- `VITE_FIREBASE_PROJECT_ID`
- `VITE_FIREBASE_STORAGE_BUCKET`
- `VITE_FIREBASE_MESSAGING_SENDER_ID`
- `VITE_FIREBASE_APP_ID`
- `VITE_FIREBASE_MEASUREMENT_ID`

`VITE_GUIDE_SLUG` is set to `ff8` in the workflow. The workflow runs `npm ci`, `npm run typecheck`, and `npm run build`, then uploads `dist` to GitHub Pages.

## Firebase Security

Firebase Web SDK config values are public after build; that is normal. Security comes from Firebase Auth, Firestore rules, authorized domains, API key restrictions, and optionally App Check.

Publish the Firestore rules in `firestore.rules` to Firebase before enabling sync. Also restrict the Firebase API key in Google Cloud Console by HTTP referrer to the deployed GitHub Pages URL and local development origins, verify Firebase Auth authorized domains, and consider enabling Firebase App Check for Firestore. Email verification is not required for this low-risk progress tracker, but consider requiring it if you later add higher-risk account features.
