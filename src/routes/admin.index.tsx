import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Inbox, Boxes, FolderKanban, Images } from "lucide-react";
import { toast } from "sonner";
import { seedServices, seedProjectsData } from "@/lib/seed-data";

export const Route = createFileRoute("/admin/")({
  component: Dashboard,
});

function Dashboard() {
  const [counts, setCounts] = useState({ enquiries: 0, services: 0, projects: 0, gallery: 0 });
  const [error, setError] = useState("");
  const [seeding, setSeeding] = useState<null | string>(null);

  useEffect(() => {
    if (!db) return;
    const firestore = db;
    const subscribe = (name: keyof typeof counts) =>
      onSnapshot(
        collection(firestore, name),
        (snap) => {
          setError("");
          setCounts((current) => ({ ...current, [name]: snap.size }));
        },
        (err) => {
          console.error(`Failed to load ${name} count`, err);
          setError("Firestore permissions are blocking admin counts. Publish the updated Firestore rules.");
        },
      );

    const unsubs = [
      subscribe("enquiries"),
      subscribe("services"),
      subscribe("projects"),
      subscribe("gallery"),
    ];
    return () => unsubs.forEach((unsub) => unsub());
  }, []);

  const cards = [
    { label: "Enquiries", value: counts.enquiries, icon: Inbox, to: "/admin/enquiries" },
    { label: "Services", value: counts.services, icon: Boxes, to: "/admin/services" },
    { label: "Projects", value: counts.projects, icon: FolderKanban, to: "/admin/projects" },
    { label: "Gallery", value: counts.gallery, icon: Images, to: "/admin/gallery" },
  ] as const;

  const runSeed = async (
    label: string,
    fn: (p: (m: string) => void) => Promise<{ added: number; skipped: number }>,
  ) => {
    setSeeding(`Seeding ${label}…`);
    try {
      const { added, skipped } = await fn((m) => setSeeding(m));
      toast.success(`${label}: ${added} added, ${skipped} skipped`);
    } catch (err) {
      console.error(err);
      toast.error(err instanceof Error ? err.message : "Seed failed");
    } finally {
      setSeeding(null);
    }
  };

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
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
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

      <div className="border border-border/60 bg-card p-6">
        <h2 className="font-serif text-xl">Seed sample data</h2>
        <p className="mt-1 text-xs text-muted-foreground">
          Imports the services and projects that ship with the website into Firestore.
          Existing docs (matched by slug/title) are skipped. Images are auto-compressed.
        </p>
        <div className="mt-4 flex flex-wrap items-center gap-2">
          <button
            disabled={!!seeding}
            onClick={() => runSeed("services", seedServices)}
            className="border border-primary px-4 py-2 text-xs uppercase tracking-widest text-primary disabled:opacity-50"
          >
            Seed services
          </button>
          <button
            disabled={!!seeding}
            onClick={() => runSeed("projects", seedProjectsData)}
            className="border border-primary px-4 py-2 text-xs uppercase tracking-widest text-primary disabled:opacity-50"
          >
            Seed projects
          </button>
          <button
            disabled={!!seeding}
            onClick={async () => {
              await runSeed("services", seedServices);
              await runSeed("projects", seedProjectsData);
            }}
            className="bg-primary px-4 py-2 text-xs uppercase tracking-widest text-primary-foreground disabled:opacity-50"
          >
            Seed everything
          </button>
          {seeding && (
            <span className="text-xs text-muted-foreground">{seeding}</span>
          )}
        </div>
      </div>
    </div>
  );
}
