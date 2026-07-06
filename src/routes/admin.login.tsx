import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { FirebaseError } from "firebase/app";
import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { toast } from "sonner";
import { auth, isAdminUser } from "@/lib/firebase";
import { useAdminAuth } from "@/lib/use-admin-auth";

export const Route = createFileRoute("/admin/login")({
  component: Login,
});

function Login() {
  const navigate = useNavigate();
  const { isAdmin } = useAdminAuth();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (isAdmin) navigate({ to: "/admin" });
  }, [isAdmin, navigate]);

  const handleGoogleSignIn = async () => {
    setError("");
    if (!auth) {
      const message = "Firebase API key is missing or invalid in the app config.";
      setError(message);
      toast.error(message);
      return;
    }
    setBusy(true);
    try {
      const provider = new GoogleAuthProvider();
      provider.setCustomParameters({ prompt: "select_account" });
      const cred = await signInWithPopup(auth, provider);
      
      if (!isAdminUser(cred.user)) {
        const message = "Access denied. Only nexuslineft@gmail.com is authorized.";
        setError(message);
        toast.error(message);
        await signOut(auth);
      } else {
        toast.success("Welcome back");
        navigate({ to: "/admin" });
      }
    } catch (err: unknown) {
      const msg = getFirebaseLoginError(err);
      setError(msg);
      toast.error(msg);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-6">
      <div className="w-full max-w-sm space-y-6 border border-border/60 bg-card p-8 text-center">
        <div className="text-left">
          <p className="text-[10px] uppercase tracking-[0.3em] text-primary">Nexus Line</p>
          <h1 className="mt-1 font-serif text-2xl">Admin sign in</h1>
        </div>
        {error && (
          <p className="border border-destructive/40 bg-destructive/10 px-3 py-2 text-left text-xs text-destructive">
            {error}
          </p>
        )}
        <button
          type="button"
          onClick={handleGoogleSignIn}
          disabled={busy}
          className="flex w-full items-center justify-center gap-3 border border-border bg-background hover:bg-muted py-3.5 text-xs font-medium uppercase tracking-[0.2em] text-foreground transition-colors disabled:opacity-50 cursor-pointer"
        >
          <svg className="h-4 w-4" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="currentColor"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="currentColor"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
            />
            <path
              fill="currentColor"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            />
          </svg>
          {busy ? "Connecting…" : "Sign in with Google"}
        </button>
        <Link to="/" className="block text-xs text-muted-foreground hover:text-primary">
          ← Back to site
        </Link>
      </div>
    </div>
  );
}

function getFirebaseLoginError(err: unknown) {
  if (err instanceof FirebaseError) {
    switch (err.code) {
      case "auth/api-key-not-valid":
      case "auth/invalid-api-key":
        return "Firebase rejected the API key. Use the Web app API key from Firebase project settings.";
      case "auth/operation-not-allowed":
        return "Google sign-in is not enabled in Firebase Authentication.";
      case "auth/popup-closed-by-user":
        return "Sign-in popup was closed before completing.";
      case "auth/too-many-requests":
        return "Too many attempts. Wait a moment and try again.";
      default:
        return err.message;
    }
  }
  return err instanceof Error ? err.message : "Sign in failed";
}

