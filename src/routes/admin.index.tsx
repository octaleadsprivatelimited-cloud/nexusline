import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { collection, getCountFromServer } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Inbox, Boxes, FolderKanban } from "lucide-react";

export const Route = createFileRoute("/admin/")({
  component: Dashboard,
});

function Dashboard() {
  const [counts, setCounts] = useState({ enquiries: 0, services: 0, projects: 0 });

  useEffect(() => {
    (async () => {
      if (!db) return;
      try {
        const [e, s, p] = await Promise.all([
          getCountFromServer(collection(db, "enquiries")),
          getCountFromServer(collection(db, "services")),
          getCountFromServer(collection(db, "projects")),
        ]);
        setCounts({
          enquiries: e.data().count,
          services: s.data().count,
          projects: p.data().count,
        });
      } catch (err) {
        console.warn("Failed to load counts", err);
      }
    })();
  }, []);

  const cards = [
    { label: "Enquiries", value: counts.enquiries, icon: Inbox, to: "/admin/enquiries" },
    { label: "Services", value: counts.services, icon: Boxes, to: "/admin/services" },
    { label: "Projects", value: counts.projects, icon: FolderKanban, to: "/admin/projects" },
  ] as const;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-serif text-3xl">Dashboard</h1>
        <p className="mt-1 text-sm text-muted-foreground">Overview of your site data.</p>
      </div>
      <div className="grid gap-4 sm:grid-cols-3">
        {cards.map((c) => (
          <Link
            key={c.label}
            to={c.to}
            className="group border border-border/60 bg-card p-6 transition-colors hover:border-primary"
          >
            <div className="flex items-center justify-between">
              <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">
                {c.label}
              </p>
              <c.icon className="h-4 w-4 text-primary" />
            </div>
            <p className="mt-4 font-serif text-4xl">{c.value}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
