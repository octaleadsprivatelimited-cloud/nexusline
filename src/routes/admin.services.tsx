import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { toast } from "sonner";
import { Plus, Trash2, Upload } from "lucide-react";
import { db } from "@/lib/firebase";
import { fileToCompressedDataUrl } from "@/lib/image-to-data-url";

export const Route = createFileRoute("/admin/services")({
  component: Services,
});

type ServiceDoc = {
  id: string;
  title?: string;
  slug?: string;
  tagline?: string;
  imageUrl?: string;
};

function Services() {
  const [items, setItems] = useState<ServiceDoc[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<ServiceDoc | null>(null);

  useEffect(() => {
    if (!db) {
      setLoading(false);
      return;
    }
    const q = query(collection(db, "services"), orderBy("title"));
    return onSnapshot(
      q,
      (snap) => {
        setItems(snap.docs.map((d) => ({ id: d.id, ...(d.data() as Omit<ServiceDoc, "id">) })));
        setLoading(false);
      },
      (err) => {
        console.error(err);
        toast.error("Firestore permissions are blocking services. Publish the updated rules.");
        setLoading(false);
      },
    );
  }, []);

  const seed = async () => {
    if (!db) return;
    if (!confirm(`Import ${seedServices.length} services from services-data.ts?`)) return;
    try {
      const batch = writeBatch(db);
      for (const s of seedServices) {
        batch.set(doc(db, "services", s.slug), {
          title: s.title,
          slug: s.slug,
          tagline: s.tagline,
          imageUrl: s.img,
          updatedAt: serverTimestamp(),
        });
      }
      await batch.commit();
      toast.success("Seeded services");
    } catch (err) {
      console.error(err);
      toast.error("Seed failed. Check that the updated Firestore rules are published.");
    }
  };

  const remove = async (id: string) => {
    if (!db) return;
    if (!confirm("Delete this service?")) return;
    await deleteDoc(doc(db, "services", id));
    toast.success("Deleted");
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-serif text-3xl">Services</h1>
          <p className="mt-1 text-sm text-muted-foreground">{items.length} services</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={seed}
            className="flex items-center gap-2 border border-border px-4 py-2 text-xs uppercase tracking-widest"
          >
            <Database className="h-4 w-4" /> Seed from code
          </button>
          <button
            onClick={() =>
              setEditing({ id: "", title: "", slug: "", tagline: "", imageUrl: "" })
            }
            className="flex items-center gap-2 bg-primary px-4 py-2 text-xs uppercase tracking-widest text-primary-foreground"
          >
            <Plus className="h-4 w-4" /> New service
          </button>
        </div>
      </div>

      {loading ? (
        <p className="text-sm text-muted-foreground">Loading…</p>
      ) : items.length === 0 ? (
        <div className="border border-dashed border-border/60 p-10 text-center text-sm text-muted-foreground">
          No services yet. Click "Seed from code" to import existing ones.
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((s) => (
            <div key={s.id} className="border border-border/60 bg-card">
              {s.imageUrl && (
                <img
                  src={s.imageUrl}
                  alt={s.title}
                  className="h-40 w-full object-cover"
                />
              )}
              <div className="space-y-2 p-4">
                <p className="font-medium">{s.title}</p>
                <p className="text-xs text-muted-foreground">/services/{s.slug}</p>
                <p className="line-clamp-2 text-xs text-muted-foreground">{s.tagline}</p>
                <div className="flex gap-2 pt-2">
                  <button
                    onClick={() => setEditing(s)}
                    className="border border-border px-3 py-1 text-xs uppercase tracking-widest"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => remove(s.id)}
                    className="ml-auto flex items-center gap-1 px-3 py-1 text-xs text-destructive"
                  >
                    <Trash2 className="h-3 w-3" /> Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {editing && (
        <ServiceEditor
          value={editing}
          onClose={() => setEditing(null)}
          onSaved={() => setEditing(null)}
        />
      )}
    </div>
  );
}

function ServiceEditor({
  value,
  onClose,
  onSaved,
}: {
  value: ServiceDoc;
  onClose: () => void;
  onSaved: () => void;
}) {
  const [form, setForm] = useState(value);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);

  const upload = async (file: File) => {
    setUploading(true);
    try {
      const dataUrl = await fileToCompressedDataUrl(file);
      setForm((f) => ({ ...f, imageUrl: dataUrl }));
      toast.success("Image uploaded");
    } catch (err) {
      console.error(err);
      toast.error(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setUploading(false);
    }
  };

  const save = async () => {
    if (!db) return;
    if (!form.title || !form.slug) {
      toast.error("Title and slug are required");
      return;
    }
    setSaving(true);
    try {
      const payload = {
        title: form.title,
        slug: form.slug,
        tagline: form.tagline ?? "",
        imageUrl: form.imageUrl ?? "",
        updatedAt: serverTimestamp(),
      };
      if (form.id) {
        await setDoc(doc(db, "services", form.id), payload, { merge: true });
      } else {
        await addDoc(collection(db, "services"), { ...payload, createdAt: serverTimestamp() });
      }
      toast.success("Saved");
      onSaved();
    } catch (err) {
      console.error(err);
      toast.error("Save failed");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
      <div className="w-full max-w-lg space-y-4 border border-border/60 bg-card p-6">
        <div className="flex items-center justify-between">
          <h2 className="font-serif text-xl">{form.id ? "Edit service" : "New service"}</h2>
          <button onClick={onClose} className="text-sm text-muted-foreground">
            Close
          </button>
        </div>
        <Input
          label="Title"
          value={form.title ?? ""}
          onChange={(v) => setForm({ ...form, title: v })}
        />
        <Input
          label="Slug"
          value={form.slug ?? ""}
          onChange={(v) => setForm({ ...form, slug: v })}
        />
        <div>
          <label className="text-xs uppercase tracking-[0.25em] text-muted-foreground">
            Tagline
          </label>
          <textarea
            value={form.tagline ?? ""}
            onChange={(e) => setForm({ ...form, tagline: e.target.value })}
            rows={3}
            className="mt-2 w-full border border-border bg-background px-4 py-3 text-sm outline-none focus:border-primary"
          />
        </div>
        <div>
          <label className="text-xs uppercase tracking-[0.25em] text-muted-foreground">
            Image
          </label>
          {form.imageUrl && (
            <img
              src={form.imageUrl}
              alt=""
              className="mt-2 h-32 w-full object-cover"
            />
          )}
          <label className="mt-2 flex cursor-pointer items-center gap-2 border border-dashed border-border px-4 py-3 text-xs uppercase tracking-widest">
            <Upload className="h-4 w-4" />
            {uploading ? "Uploading…" : "Upload image"}
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                const f = e.target.files?.[0];
                if (f) upload(f);
              }}
            />
          </label>
        </div>
        <div className="flex justify-end gap-2 pt-2">
          <button onClick={onClose} className="px-4 py-2 text-xs uppercase tracking-widest">
            Cancel
          </button>
          <button
            onClick={save}
            disabled={saving}
            className="bg-primary px-4 py-2 text-xs uppercase tracking-widest text-primary-foreground disabled:opacity-50"
          >
            {saving ? "Saving…" : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
}

function Input({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div>
      <label className="text-xs uppercase tracking-[0.25em] text-muted-foreground">{label}</label>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-2 w-full border border-border bg-background px-4 py-3 text-sm outline-none focus:border-primary"
      />
    </div>
  );
}
