import { useEffect, useState } from "react";
import { onAuthStateChanged, type User } from "firebase/auth";
import { auth, ADMIN_UID, isFirebaseConfigured } from "./firebase";

const DEMO_KEY = "nl_demo_admin";

export const demoAuth = {
  signIn: (email: string) => {
    localStorage.setItem(DEMO_KEY, email);
    window.dispatchEvent(new Event("nl-demo-auth"));
  },
  signOut: () => {
    localStorage.removeItem(DEMO_KEY);
    window.dispatchEvent(new Event("nl-demo-auth"));
  },
  get email() {
    return typeof window !== "undefined" ? localStorage.getItem(DEMO_KEY) : null;
  },
};

export const DEMO_CREDENTIALS = { email: "admin@demo.com", password: "demo1234" };

export function useAdminAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [demoEmail, setDemoEmail] = useState<string | null>(
    typeof window !== "undefined" ? localStorage.getItem(DEMO_KEY) : null,
  );

  useEffect(() => {
    const onDemo = () => setDemoEmail(localStorage.getItem(DEMO_KEY));
    window.addEventListener("nl-demo-auth", onDemo);
    window.addEventListener("storage", onDemo);
    if (!isFirebaseConfigured || !auth) {
      setLoading(false);
      return () => {
        window.removeEventListener("nl-demo-auth", onDemo);
        window.removeEventListener("storage", onDemo);
      };
    }
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setLoading(false);
    });
    return () => {
      unsub();
      window.removeEventListener("nl-demo-auth", onDemo);
      window.removeEventListener("storage", onDemo);
    };
  }, []);

  const isDemo = !!demoEmail;
  const isAdmin = isDemo || (!!user && !!ADMIN_UID && user.uid === ADMIN_UID);
  const effectiveEmail = demoEmail ?? user?.email ?? null;
  return {
    user,
    loading,
    isAdmin,
    isDemo,
    email: effectiveEmail,
    configured: isFirebaseConfigured,
  };
}
