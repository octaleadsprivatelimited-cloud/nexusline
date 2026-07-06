import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { FirebaseError } from "firebase/app";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { toast } from "sonner";
import { auth, isAdminUser } from "@/lib/firebase";
import { useAdminAuth } from "@/lib/use-admin-auth";

export const Route = createFileRoute("/admin/login")({
  component: Login,
});

function Login() {
  const navigate = useNavigate();
  const { isAdmin } = useAdminAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (isAdmin) navigate({ to: "/admin" });
  }, [isAdmin, navigate]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!auth) {
      const message = "Firebase API key is missing or invalid in the app config.";
      setError(message);
      toast.error(message);
      return;
    }
    setBusy(true);
    try {
      const cred = await signInWithEmailAndPassword(auth, email, password);
      if (!isAdminUser(cred.user)) {
        const message = "This account isn't the admin";
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
      <form
        onSubmit={submit}
        className="w-full max-w-sm space-y-5 border border-border/60 bg-card p-8"
      >
        <div>
          <p className="text-[10px] uppercase tracking-[0.3em] text-primary">Nexus Line</p>
          <h1 className="mt-1 font-serif text-2xl">Admin sign in</h1>
        </div>
        {error && (
          <p className="border border-destructive/40 bg-destructive/10 px-3 py-2 text-xs text-destructive">
            {error}
          </p>
        )}
        <div>
          <label className="text-xs uppercase tracking-[0.25em] text-muted-foreground">
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="mt-2 w-full border border-border bg-background px-4 py-3 text-sm outline-none focus:border-primary"
          />
        </div>
        <div>
          <label className="text-xs uppercase tracking-[0.25em] text-muted-foreground">
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="mt-2 w-full border border-border bg-background px-4 py-3 text-sm outline-none focus:border-primary"
          />
        </div>
        <button
          type="submit"
          disabled={busy}
          className="w-full bg-primary px-4 py-3 text-xs font-medium uppercase tracking-[0.25em] text-primary-foreground disabled:opacity-50"
        >
          {busy ? "Signing in…" : "Sign in"}
        </button>
        <Link to="/" className="block text-center text-xs text-muted-foreground hover:text-primary">
          ← Back to site
        </Link>
      </form>
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
        return "Email/password login is not enabled in Firebase Authentication.";
      case "auth/invalid-credential":
      case "auth/user-not-found":
      case "auth/wrong-password":
        return "Invalid admin email or password.";
      case "auth/too-many-requests":
        return "Too many attempts. Wait a moment and try again.";
      default:
        return err.message;
    }
  }
  return err instanceof Error ? err.message : "Sign in failed";
}
