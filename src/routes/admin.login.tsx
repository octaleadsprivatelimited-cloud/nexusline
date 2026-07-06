import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { toast } from "sonner";
import { auth, ADMIN_UID, isFirebaseConfigured } from "@/lib/firebase";
import { useAdminAuth } from "@/lib/use-admin-auth";

export const Route = createFileRoute("/admin/login")({
  component: Login,
});

function Login() {
  const navigate = useNavigate();
  const { user, isAdmin } = useAdminAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (user && isAdmin) navigate({ to: "/admin" });
  }, [user, isAdmin, navigate]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!auth) {
      toast.error("Firebase is not configured");
      return;
    }
    setBusy(true);
    try {
      const cred = await signInWithEmailAndPassword(auth, email, password);
      if (ADMIN_UID && cred.user.uid !== ADMIN_UID) {
        toast.error("This account isn't the admin");
      } else {
        toast.success("Welcome back");
        navigate({ to: "/admin" });
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Sign in failed";
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
        {!isFirebaseConfigured && (
          <p className="border border-destructive/40 bg-destructive/10 p-3 text-xs text-destructive">
            Firebase env vars are missing. Add them to .env then restart the dev server.
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
          disabled={busy || !isFirebaseConfigured}
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
