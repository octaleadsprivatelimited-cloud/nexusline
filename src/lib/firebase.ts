import { initializeApp, type FirebaseApp } from "firebase/app";
import { getAuth, type Auth } from "firebase/auth";
import { getFirestore, type Firestore } from "firebase/firestore";
import { getStorage, type FirebaseStorage } from "firebase/storage";

// Firebase web config is safe to expose in client code — security is enforced
// by Firestore/Storage rules + the ADMIN_UID check below.
const firebaseConfig = {
  apiKey: "AIzaSyC-REPLACE_WITH_YOUR_WEB_API_KEY",
  authDomain: "nexus-ad2f4.firebaseapp.com",
  projectId: "nexus-ad2f4",
  storageBucket: "nexus-ad2f4.firebasestorage.app",
  messagingSenderId: "665645205956",
  appId: "1:665645205956:web:856f2615f56d5098f07c91",
  measurementId: "G-99KNL5VKRB",
};

// TODO: paste the UID of your Firebase Auth admin user here.
// Find it in Firebase Console → Authentication → Users → User UID.
export const ADMIN_UID = "";

export const isFirebaseConfigured =
  !firebaseConfig.apiKey.includes("REPLACE_WITH_YOUR_WEB_API_KEY");

let app: FirebaseApp | null = null;
let authInstance: Auth | null = null;
let dbInstance: Firestore | null = null;
let storageInstance: FirebaseStorage | null = null;

if (isFirebaseConfigured) {
  app = initializeApp(firebaseConfig);
  authInstance = getAuth(app);
  dbInstance = getFirestore(app);
  storageInstance = getStorage(app);
}

export const auth = authInstance;
export const db = dbInstance;
export const storage = storageInstance;
export { app };
