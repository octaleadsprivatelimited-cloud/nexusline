import { initializeApp, type FirebaseApp } from "firebase/app";
import { getAuth, type Auth, type User } from "firebase/auth";
import { getFirestore, type Firestore } from "firebase/firestore";

declare const __FIREBASE_GOOGLE_API_KEY__: string | undefined;

const firebaseApiKey = (
  import.meta.env.VITE_FIREBASE_API_KEY ||
  __FIREBASE_GOOGLE_API_KEY__ ||
  ""
).trim();

// Firebase web config is safe to expose in client code — security is enforced
// by Firestore/Storage rules + the ADMIN_UID check below.
const firebaseConfig = {
  apiKey: firebaseApiKey,
  authDomain: "nexus-ad2f4.firebaseapp.com",
  projectId: "nexus-ad2f4",
  storageBucket: "nexus-ad2f4.firebasestorage.app",
  messagingSenderId: "665645205956",
  appId: "1:665645205956:web:856f2615f56d5098f07c91",
  measurementId: "G-99KNL5VKRB",
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
}

export const auth = authInstance;
export const db = dbInstance;
export { app };
