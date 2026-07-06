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

export const Route = createFileRoute("/admin/projects")({
  component: Projects,
});

type ProjectDoc = {
  id: string;
  title?: string;
  category?: string;
  location?: string;
  description?: string;
  imageUrl?: string;
};

function Projects() {
  const [items, setItems] = useState<ProjectDoc[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<ProjectDoc | null>(null);

  useEffect(() => {
    if (!db) {
      setLoading(false);
      return;
    }
    const q = query(collection(db, "projects"), orderBy("title"));
    return onSnapshot(
      q,
      (snap) => {
        setItems(snap.docs.map((d) => ({ id: d.id, ...(d.data() as Omit<ProjectDoc, "id">) })));
        setLoading(false);
      },
      (err) => {
        console.error(err);
        toast.error("Firestore permissions are blocking projects. Publish the updated rules.");
        setLoading(false);
      },
    );
  }, []);

  const remove = async (id: string) => {
    if (!db) return;
    if (!confirm("Delete this project?")) return;
    await deleteDoc(doc(db, "projects", id));
    toast.success("Deleted");
  };

  const seed = async () => {
    if (!db) return;
    if (!confirm(`Import ${seedProjects.length} projects from the website?`)) return;
    try {
      const batch = writeBatch(db);
      for (const p of seedProjects) {
        const id = p.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
        batch.set(doc(db, "projects", id), {
          title: p.title,
          category: p.category,
          location: p.location,
          description: "",
          imageUrl: p.img,
          updatedAt: serverTimestamp(),
        });
      }
      await batch.commit();
      toast.success("Seeded projects");
    } catch (err) {
      console.error(err);
      toast.error("Seed failed. Check that the updated Firestore rules are published.");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-serif text-3xl">Projects</h1>
          <p className="mt-1 text-sm text-muted-foreground">{items.length} projects</p>
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
              setEditing({ id: "", title: "", category: "", location: "", description: "" })
            }
            className="flex items-center gap-2 bg-primary px-4 py-2 text-xs uppercase tracking-widest text-primary-foreground"
          >
            <Plus className="h-4 w-4" /> New project
          </button>
        </div>
      </div>

      {loading ? (
        <p className="text-sm text-muted-foreground">Loading…</p>
      ) : items.length === 0 ? (
        <div className="border border-dashed border-border/60 p-10 text-center text-sm text-muted-foreground">
          No projects yet.
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((p) => (
            <div key={p.id} className="border border-border/60 bg-card">
              {p.imageUrl && (
                <img src={p.imageUrl} alt={p.title} className="h-40 w-full object-cover" />
              )}
              <div className="space-y-2 p-4">
                <p className="font-medium">{p.title}</p>
                <p className="text-xs text-muted-foreground">
                  {p.category} {p.location ? `· ${p.location}` : ""}
                </p>
                <p className="line-clamp-2 text-xs text-muted-foreground">{p.description}</p>
                <div className="flex gap-2 pt-2">
                  <button
                    onClick={() => setEditing(p)}
                    className="border border-border px-3 py-1 text-xs uppercase tracking-widest"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => remove(p.id)}
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
        <ProjectEditor value={editing} onClose={() => setEditing(null)} />
      )}
    </div>
  );
}

function ProjectEditor({ value, onClose }: { value: ProjectDoc; onClose: () => void }) {
  const [form, setForm] = useState(value);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);

  const upload = async (file: File) => {
    setUploading(true);
    try {
      const dataUrl = await fileToCompressedDataUrl(file);
      setForm((f) => ({ ...f, imageUrl: dataUrl }));
      toast.success("Uploaded");
    } catch (err) {
      console.error(err);
      toast.error(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setUploading(false);
    }
  };

  const save = async () => {
    if (!db) return;
    if (!form.title) return toast.error("Title required");
    setSaving(true);
    try {
      const payload = {
        title: form.title,
        category: form.category ?? "",
        location: form.location ?? "",
        description: form.description ?? "",
        imageUrl: form.imageUrl ?? "",
        updatedAt: serverTimestamp(),
      };
      if (form.id) await setDoc(doc(db, "projects", form.id), payload, { merge: true });
      else await addDoc(collection(db, "projects"), { ...payload, createdAt: serverTimestamp() });
      toast.success("Saved");
      onClose();
    } catch (err) {
      console.error(err);
      toast.error("Save failed");
    } finally {
      setSaving(false);
    }
  };

  const Field = (label: string, key: keyof ProjectDoc, textarea = false) => (
    <div>
      <label className="text-xs uppercase tracking-[0.25em] text-muted-foreground">{label}</label>
      {textarea ? (
        <textarea
          rows={4}
          value={(form[key] as string) ?? ""}
          onChange={(e) => setForm({ ...form, [key]: e.target.value })}
          className="mt-2 w-full border border-border bg-background px-4 py-3 text-sm outline-none focus:border-primary"
        />
      ) : (
        <input
          value={(form[key] as string) ?? ""}
          onChange={(e) => setForm({ ...form, [key]: e.target.value })}
          className="mt-2 w-full border border-border bg-background px-4 py-3 text-sm outline-none focus:border-primary"
        />
      )}
    </div>
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
      <div className="w-full max-w-lg space-y-4 border border-border/60 bg-card p-6">
        <div className="flex items-center justify-between">
          <h2 className="font-serif text-xl">{form.id ? "Edit project" : "New project"}</h2>
          <button onClick={onClose} className="text-sm text-muted-foreground">Close</button>
        </div>
        {Field("Title", "title")}
        {Field("Category", "category")}
        {Field("Location", "location")}
        {Field("Description", "description", true)}
        <div>
          <label className="text-xs uppercase tracking-[0.25em] text-muted-foreground">Image</label>
          {form.imageUrl && (
            <img src={form.imageUrl} alt="" className="mt-2 h-32 w-full object-cover" />
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
          <button onClick={onClose} className="px-4 py-2 text-xs uppercase tracking-widest">Cancel</button>
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
