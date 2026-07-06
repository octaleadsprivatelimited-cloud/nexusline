import { initializeApp, type FirebaseApp } from "firebase/app";
import { getAnalytics, isSupported as analyticsIsSupported } from "firebase/analytics";
import { getAuth, type Auth, type User } from "firebase/auth";
import { getFirestore, type Firestore } from "firebase/firestore";

declare const __FIREBASE_GOOGLE_API_KEY__: string | undefined;

const FIREBASE_WEB_API_KEY = "AIzaSyC-vrVtdCzRWJ5VXZfHq8PEXLQhizIPrYU";

function normalizeFirebaseApiKey(value: unknown) {
  if (typeof value !== "string") return "";
  const trimmed = value.trim();
  if (!trimmed || trimmed.includes("@secret:") || !trimmed.startsWith("AIza")) {
    return "";
  }
  return trimmed;
}

const firebaseApiKey = (
  normalizeFirebaseApiKey(import.meta.env.VITE_FIREBASE_API_KEY) ||
  normalizeFirebaseApiKey(__FIREBASE_GOOGLE_API_KEY__) ||
  FIREBASE_WEB_API_KEY
).trim();

// Firebase web config is safe to expose in client code — security is enforced
// by Firestore/Storage rules + the ADMIN_UID check below.
const firebaseConfig = {
  apiKey: firebaseApiKey,
  authDomain: "nexus-c5968.firebaseapp.com",
  projectId: "nexus-c5968",
  storageBucket: "nexus-c5968.firebasestorage.app",
  messagingSenderId: "627875249203",
  appId: "1:627875249203:web:460736eb58371965143746",
  measurementId: "G-7Z6445BGLB",
};

// UID of the original Firebase Auth admin user. Email fallback allows the
// Firebase-created admin account to keep working if Firebase recreated the UID.
export const ADMIN_UID = "Jfv4gYT89QQ6dX13iFjojjZTtUp1";
export const ADMIN_EMAIL = "nexuslineft@gmail.com";

export function isAdminUser(user: User | null | undefined) {
  if (!user) return false;
  return user.uid === ADMIN_UID || user.email?.toLowerCase() === ADMIN_EMAIL;
}

export const isFirebaseConfigured =
  firebaseConfig.apiKey.startsWith("AIza") &&
  !firebaseConfig.apiKey.includes("REPLACE_WITH") &&
  !firebaseConfig.apiKey.includes("@secret:");

let app: FirebaseApp | null = null;
let authInstance: Auth | null = null;
let dbInstance: Firestore | null = null;

if (isFirebaseConfigured) {
  app = initializeApp(firebaseConfig);
  authInstance = getAuth(app);
  dbInstance = getFirestore(app);
  if (typeof window !== "undefined") {
    analyticsIsSupported()
      .then((ok) => {
        if (ok && app) getAnalytics(app);
      })
      .catch(() => {});
  }
}

export const auth = authInstance;
export const db = dbInstance;
export { app };
