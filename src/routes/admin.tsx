import { createFileRoute, Link, Outlet, useNavigate, useLocation } from "@tanstack/react-router";
import { signOut } from "firebase/auth";
import {
  LayoutDashboard,
  Inbox,
  Boxes,
  FolderKanban,
  Settings,
  LogOut,
  AlertTriangle,
} from "lucide-react";
import { auth } from "@/lib/firebase";
import { useAdminAuth, demoAuth } from "@/lib/use-admin-auth";

export const Route = createFileRoute("/admin")({
  component: AdminLayout,
});

const NAV = [
  { to: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { to: "/admin/enquiries", label: "Enquiries", icon: Inbox },
  { to: "/admin/services", label: "Services", icon: Boxes },
  { to: "/admin/projects", label: "Projects", icon: FolderKanban },
  { to: "/admin/settings", label: "Settings", icon: Settings },
];

function AdminLayout() {
  const { user, loading, isAdmin, configured, isDemo, email } = useAdminAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const onLogin = location.pathname === "/admin/login";

  if (onLogin) return <Outlet />;
  if (!configured && !isDemo) return <NotConfigured />;
  if (loading) return <FullScreen>Loading…</FullScreen>;
  if (!user && !isDemo) {
    return (
      <FullScreen>
        <div className="text-center">
          <p className="mb-4 text-muted-foreground">You need to sign in.</p>
          <Link
            to="/admin/login"
            className="inline-flex items-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
          >
            Go to login
          </Link>
        </div>
      </FullScreen>
    );
  }
  if (!isAdmin) {
    return (
      <FullScreen>
        <div className="max-w-md text-center">
          <AlertTriangle className="mx-auto mb-3 h-8 w-8 text-destructive" />
          <h2 className="mb-2 font-serif text-2xl">Not authorized</h2>
          <p className="text-sm text-muted-foreground">
            This account isn't an admin. Sign in with nexuslineft@gmail.com.
          </p>
          <button
            onClick={async () => {
              if (auth && user) await signOut(auth);
              demoAuth.signOut();
              navigate({ to: "/admin/login" });
            }}
            className="mt-4 rounded-md border px-4 py-2 text-sm"
          >
            Sign out
          </button>
        </div>
      </FullScreen>
    );
  }

  return (
    <div className="flex min-h-screen bg-background">
      <aside className="hidden w-60 shrink-0 border-r border-border/60 bg-card/40 md:flex md:flex-col">
        <div className="border-b border-border/60 px-5 py-5">
          <p className="text-[10px] uppercase tracking-[0.3em] text-primary">Nexus Line</p>
          <p className="mt-1 font-serif text-lg">Admin</p>
        </div>
        <nav className="flex-1 space-y-1 p-3">
          {NAV.map((item) => {
            const active = item.exact
              ? location.pathname === item.to
              : location.pathname.startsWith(item.to);
            const Icon = item.icon;
            return (
              <Link
                key={item.to}
                to={item.to}
                className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors ${
                  active
                    ? "bg-primary text-primary-foreground"
                    : "text-foreground/80 hover:bg-muted"
                }`}
              >
                <Icon className="h-4 w-4" /> {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="border-t border-border/60 p-3">
          <p className="mb-2 truncate px-2 text-xs text-muted-foreground">
            {email}
            {isDemo && <span className="ml-1 text-primary">(demo)</span>}
          </p>
          <button
            onClick={async () => {
              if (auth && user) await signOut(auth);
              demoAuth.signOut();
              navigate({ to: "/admin/login" });
            }}
            className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm text-foreground/80 hover:bg-muted"
          >
            <LogOut className="h-4 w-4" /> Sign out
          </button>
        </div>
      </aside>
      <main className="flex-1 overflow-x-auto p-6 md:p-10">
        {isDemo && !configured && (
          <div className="mb-4 border border-primary/40 bg-primary/10 px-4 py-2 text-xs text-primary">
            Demo mode — Firebase isn't connected. Data won't persist and Firestore
            reads/writes will fail silently.
          </div>
        )}
        <Outlet />
      </main>
    </div>
  );
}

function FullScreen({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-6">
      {children}
    </div>
  );
}

function NotConfigured() {
  return (
    <FullScreen>
      <div className="max-w-lg space-y-4 border border-border/60 bg-card p-8">
        <div className="flex items-center gap-2 text-destructive">
          <AlertTriangle className="h-5 w-5" />
          <h2 className="font-serif text-xl">Firebase not configured</h2>
        </div>
        <p className="text-sm text-muted-foreground">
          The admin panel UI is ready, but the Firebase Web API key is missing or
          invalid. Add the real Firebase Web API key to the saved GOOGLE_API_KEY
          secret or to:
        </p>
        <pre className="overflow-auto rounded bg-muted p-3 text-xs">
{`VITE_FIREBASE_API_KEY=...`}
        </pre>
        <p className="text-xs text-muted-foreground">
          Then restart the dev server. Also enable Email/Password auth, Firestore,
          and Storage in the Firebase console, and paste the security rules I
          shared earlier.
        </p>
      </div>
    </FullScreen>
  );
}
