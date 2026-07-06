import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Inbox, Boxes, FolderKanban } from "lucide-react";

export const Route = createFileRoute("/admin/")({
  component: Dashboard,
});

function Dashboard() {
  const [counts, setCounts] = useState({ enquiries: 0, services: 0, projects: 0 });
  const [error, setError] = useState("");

  useEffect(() => {
    if (!db) return;
    const subscribe = (name: keyof typeof counts) =>
      onSnapshot(
        collection(db, name),
        (snap) => {
          setError("");
          setCounts((current) => ({ ...current, [name]: snap.size }));
        },
        (err) => {
          console.error(`Failed to load ${name} count`, err);
          setError("Firestore permissions are blocking admin counts. Publish the updated rules below.");
        },
      );

    const unsubs = [subscribe("enquiries"), subscribe("services"), subscribe("projects")];
    return () => unsubs.forEach((unsub) => unsub());
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
      {error && (
        <p className="border border-destructive/40 bg-destructive/10 px-4 py-3 text-sm text-destructive">
          {error}
        </p>
      )}
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
