import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  updateDoc,
} from "firebase/firestore";
import { toast } from "sonner";
import { Trash2 } from "lucide-react";
import { db } from "@/lib/firebase";

export const Route = createFileRoute("/admin/enquiries")({
  component: Enquiries,
});

type Enquiry = {
  id: string;
  name?: string;
  email?: string;
  phone?: string;
  company?: string;
  type?: string;
  message?: string;
  status?: "new" | "contacted" | "closed";
  createdAt?: { toDate: () => Date } | null;
};

const STATUSES: Enquiry["status"][] = ["new", "contacted", "closed"];

function Enquiries() {
  const [items, setItems] = useState<Enquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"all" | NonNullable<Enquiry["status"]>>("all");

  useEffect(() => {
    if (!db) return;
    const q = query(collection(db, "enquiries"), orderBy("createdAt", "desc"));
    const unsub = onSnapshot(
      q,
      (snap) => {
        setItems(snap.docs.map((d) => ({ id: d.id, ...(d.data() as Omit<Enquiry, "id">) })));
        setLoading(false);
      },
      (err) => {
        console.error(err);
        toast.error("Failed to load enquiries");
        setLoading(false);
      },
    );
    return () => unsub();
  }, []);

  const filtered = filter === "all" ? items : items.filter((i) => i.status === filter);

  const setStatus = async (id: string, status: NonNullable<Enquiry["status"]>) => {
    if (!db) return;
    await updateDoc(doc(db, "enquiries", id), { status });
    toast.success("Status updated");
  };

  const remove = async (id: string) => {
    if (!db) return;
    if (!confirm("Delete this enquiry?")) return;
    await deleteDoc(doc(db, "enquiries", id));
    toast.success("Deleted");
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-serif text-3xl">Enquiries</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {items.length} total · live-updating from Firestore
          </p>
        </div>
        <div className="flex gap-1 border border-border/60 p-1">
          {(["all", ...STATUSES] as const).map((s) => (
            <button
              key={s}
              onClick={() => setFilter(s as typeof filter)}
              className={`px-3 py-1.5 text-xs uppercase tracking-widest ${
                filter === s ? "bg-primary text-primary-foreground" : "text-muted-foreground"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <p className="text-sm text-muted-foreground">Loading…</p>
      ) : filtered.length === 0 ? (
        <div className="border border-dashed border-border/60 p-10 text-center text-sm text-muted-foreground">
          No enquiries yet.
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((e) => (
            <details key={e.id} className="border border-border/60 bg-card">
              <summary className="flex cursor-pointer items-center justify-between gap-4 p-4">
                <div className="min-w-0 flex-1">
                  <p className="truncate font-medium">{e.name || "Anonymous"}</p>
                  <p className="truncate text-xs text-muted-foreground">
                    {e.email} {e.phone ? `· ${e.phone}` : ""} {e.type ? `· ${e.type}` : ""}
                  </p>
                </div>
                <span
                  className={`shrink-0 px-2 py-1 text-[10px] uppercase tracking-widest ${
                    e.status === "closed"
                      ? "bg-muted text-muted-foreground"
                      : e.status === "contacted"
                        ? "bg-amber-500/20 text-amber-700 dark:text-amber-300"
                        : "bg-primary text-primary-foreground"
                  }`}
                >
                  {e.status ?? "new"}
                </span>
                <span className="shrink-0 text-xs text-muted-foreground">
                  {e.createdAt?.toDate ? e.createdAt.toDate().toLocaleDateString() : ""}
                </span>
              </summary>
              <div className="space-y-3 border-t border-border/60 p-4">
                {e.company && (
                  <p className="text-sm">
                    <span className="text-muted-foreground">Company:</span> {e.company}
                  </p>
                )}
                <p className="whitespace-pre-wrap text-sm">{e.message}</p>
                <div className="flex flex-wrap items-center gap-2 pt-2">
                  {STATUSES.map((s) => (
                    <button
                      key={s}
                      onClick={() => setStatus(e.id, s!)}
                      disabled={e.status === s}
                      className="border border-border px-3 py-1 text-xs uppercase tracking-widest disabled:opacity-40"
                    >
                      Mark {s}
                    </button>
                  ))}
                  <button
                    onClick={() => remove(e.id)}
                    className="ml-auto flex items-center gap-1 px-3 py-1 text-xs text-destructive"
                  >
                    <Trash2 className="h-3 w-3" /> Delete
                  </button>
                </div>
              </div>
            </details>
          ))}
        </div>
      )}
    </div>
  );
}
