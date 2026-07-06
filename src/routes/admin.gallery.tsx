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
import { Plus, Trash2, Upload, Image as ImageIcon, Youtube } from "lucide-react";
import { db } from "@/lib/firebase";
import { fileToCompressedDataUrl } from "@/lib/image-to-data-url";

export const Route = createFileRoute("/admin/gallery")({
  component: AdminGallery,
});

type GalleryItem = {
  id: string;
  type: "image" | "video";
  title?: string;
  imageUrl?: string;
  youtubeUrl?: string;
};

function extractYouTubeId(url: string): string | null {
  if (!url) return null;
  try {
    const u = new URL(url);
    if (u.hostname.includes("youtu.be")) return u.pathname.slice(1) || null;
    if (u.searchParams.get("v")) return u.searchParams.get("v");
    const m = u.pathname.match(/\/(embed|shorts)\/([\w-]{6,})/);
    if (m) return m[2];
  } catch {
    const m = url.match(/[?&]v=([\w-]{6,})/);
    if (m) return m[1];
  }
  return null;
}

function AdminGallery() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<GalleryItem | null>(null);

  useEffect(() => {
    if (!db) {
      setLoading(false);
      return;
    }
    const q = query(collection(db, "gallery"), orderBy("createdAt", "desc"));
    return onSnapshot(
      q,
      (snap) => {
        setItems(
          snap.docs.map((d) => ({ id: d.id, ...(d.data() as Omit<GalleryItem, "id">) })),
        );
        setLoading(false);
      },
      (err) => {
        console.error(err);
        toast.error("Firestore permissions are blocking gallery. Publish the updated rules.");
        setLoading(false);
      },
    );
  }, []);

  const remove = async (id: string) => {
    if (!db) return;
    if (!confirm("Delete this gallery item?")) return;
    await deleteDoc(doc(db, "gallery", id));
    toast.success("Deleted");
  };

  const images = items.filter((i) => (i.type ?? "image") === "image");
  const videos = items.filter((i) => i.type === "video");

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-serif text-3xl">Gallery</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {images.length} image{images.length === 1 ? "" : "s"} · {videos.length} video
            {videos.length === 1 ? "" : "s"}
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setEditing({ id: "", type: "image", title: "" })}
            className="flex items-center gap-2 bg-primary px-4 py-2 text-xs uppercase tracking-widest text-primary-foreground"
          >
            <ImageIcon className="h-4 w-4" /> Add image
          </button>
          <button
            onClick={() => setEditing({ id: "", type: "video", title: "", youtubeUrl: "" })}
            className="flex items-center gap-2 border border-primary px-4 py-2 text-xs uppercase tracking-widest text-primary"
          >
            <Youtube className="h-4 w-4" /> Add YouTube video
          </button>
        </div>
      </div>

      {loading ? (
        <p className="text-sm text-muted-foreground">Loading…</p>
      ) : items.length === 0 ? (
        <div className="border border-dashed border-border/60 p-10 text-center text-sm text-muted-foreground">
          No gallery items yet.
        </div>
      ) : (
        <div className="space-y-10">
          {images.length > 0 && (
            <section>
              <h2 className="mb-3 text-xs uppercase tracking-[0.25em] text-muted-foreground">
                Images
              </h2>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {images.map((p) => (
                  <div key={p.id} className="border border-border/60 bg-card">
                    {p.imageUrl && (
                      <img src={p.imageUrl} alt={p.title} className="h-40 w-full object-cover" />
                    )}
                    <div className="space-y-2 p-4">
                      <p className="text-sm font-medium">{p.title || "Untitled"}</p>
                      <div className="flex gap-2 pt-1">
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
            </section>
          )}

          {videos.length > 0 && (
            <section>
              <h2 className="mb-3 text-xs uppercase tracking-[0.25em] text-muted-foreground">
                YouTube videos
              </h2>
              <div className="grid gap-4 sm:grid-cols-2">
                {videos.map((v) => {
                  const id = extractYouTubeId(v.youtubeUrl || "");
                  return (
                    <div key={v.id} className="border border-border/60 bg-card">
                      {id ? (
                        <div className="relative aspect-video w-full bg-black">
                          <iframe
                            src={`https://www.youtube.com/embed/${id}`}
                            title={v.title || "YouTube video"}
                            allowFullScreen
                            className="absolute inset-0 h-full w-full"
                          />
                        </div>
                      ) : (
                        <div className="flex aspect-video w-full items-center justify-center bg-muted text-xs text-muted-foreground">
                          Invalid YouTube URL
                        </div>
                      )}
                      <div className="space-y-2 p-4">
                        <p className="text-sm font-medium">{v.title || "Untitled"}</p>
                        <p className="truncate text-xs text-muted-foreground">{v.youtubeUrl}</p>
                        <div className="flex gap-2 pt-1">
                          <button
                            onClick={() => setEditing(v)}
                            className="border border-border px-3 py-1 text-xs uppercase tracking-widest"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => remove(v.id)}
                            className="ml-auto flex items-center gap-1 px-3 py-1 text-xs text-destructive"
                          >
                            <Trash2 className="h-3 w-3" /> Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          )}
        </div>
      )}

      {editing && <GalleryEditor value={editing} onClose={() => setEditing(null)} />}
    </div>
  );
}

function GalleryEditor({ value, onClose }: { value: GalleryItem; onClose: () => void }) {
  const [form, setForm] = useState<GalleryItem>(value);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);

  const upload = async (file: File) => {
    setUploading(true);
    try {
      const dataUrl = await fileToCompressedDataUrl(file);
      setForm((f) => ({ ...f, imageUrl: dataUrl }));
      toast.success("Image compressed & ready");
    } catch (err) {
      console.error(err);
      toast.error(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setUploading(false);
    }
  };

  const save = async () => {
    if (!db) return;
    if (form.type === "image" && !form.imageUrl) return toast.error("Upload an image first");
    if (form.type === "video") {
      if (!form.youtubeUrl) return toast.error("YouTube URL required");
      if (!extractYouTubeId(form.youtubeUrl)) return toast.error("Invalid YouTube URL");
    }
    setSaving(true);
    try {
      const payload = {
        type: form.type,
        title: form.title ?? "",
        imageUrl: form.type === "image" ? form.imageUrl ?? "" : "",
        youtubeUrl: form.type === "video" ? form.youtubeUrl ?? "" : "",
        updatedAt: serverTimestamp(),
      };
      if (form.id) {
        await setDoc(doc(db, "gallery", form.id), payload, { merge: true });
      } else {
        await addDoc(collection(db, "gallery"), { ...payload, createdAt: serverTimestamp() });
      }
      toast.success("Saved");
      onClose();
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
          <h2 className="font-serif text-xl">
            {form.id ? "Edit" : "New"} {form.type === "image" ? "image" : "video"}
          </h2>
          <button onClick={onClose} className="text-sm text-muted-foreground">
            Close
          </button>
        </div>

        <div>
          <label className="text-xs uppercase tracking-[0.25em] text-muted-foreground">
            Title (optional)
          </label>
          <input
            value={form.title ?? ""}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            className="mt-2 w-full border border-border bg-background px-4 py-3 text-sm outline-none focus:border-primary"
          />
        </div>

        {form.type === "image" ? (
          <div>
            <label className="text-xs uppercase tracking-[0.25em] text-muted-foreground">
              Image (auto-compressed)
            </label>
            {form.imageUrl && (
              <img src={form.imageUrl} alt="" className="mt-2 h-40 w-full object-cover" />
            )}
            <label className="mt-2 flex cursor-pointer items-center gap-2 border border-dashed border-border px-4 py-3 text-xs uppercase tracking-widest">
              <Upload className="h-4 w-4" />
              {uploading ? "Compressing…" : form.imageUrl ? "Replace image" : "Upload image"}
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
            <p className="mt-2 text-[11px] text-muted-foreground">
              Images are resized to max 1400px and compressed to JPEG before saving.
            </p>
          </div>
        ) : (
          <div>
            <label className="text-xs uppercase tracking-[0.25em] text-muted-foreground">
              YouTube URL
            </label>
            <input
              value={form.youtubeUrl ?? ""}
              onChange={(e) => setForm({ ...form, youtubeUrl: e.target.value })}
              placeholder="https://www.youtube.com/watch?v=..."
              className="mt-2 w-full border border-border bg-background px-4 py-3 text-sm outline-none focus:border-primary"
            />
            {form.youtubeUrl && extractYouTubeId(form.youtubeUrl) && (
              <div className="relative mt-3 aspect-video w-full bg-black">
                <iframe
                  src={`https://www.youtube.com/embed/${extractYouTubeId(form.youtubeUrl)}`}
                  title="Preview"
                  allowFullScreen
                  className="absolute inset-0 h-full w-full"
                />
              </div>
            )}
          </div>
        )}

        <div className="flex justify-end gap-2 pt-2">
          <button onClick={onClose} className="px-4 py-2 text-xs uppercase tracking-widest">
            Cancel
          </button>
          <button
            onClick={save}
            disabled={saving || uploading}
            className="bg-primary px-4 py-2 text-xs uppercase tracking-widest text-primary-foreground disabled:opacity-50"
          >
            {saving ? "Saving…" : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
}