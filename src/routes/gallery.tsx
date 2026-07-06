import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "@/lib/firebase";

export const Route = createFileRoute("/gallery")({
  component: GalleryPage,
});

type GalleryItem = {
  id: string;
  type?: "image" | "video";
  title?: string;
  imageUrl?: string;
  youtubeUrl?: string;
  createdAt?: { seconds: number } | null;
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

function GalleryPage() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);

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
        setLoading(false);
      },
    );
  }, []);

  const images = useMemo(
    () => items.filter((i) => (i.type ?? "image") === "image" && i.imageUrl),
    [items],
  );
  const videos = useMemo(
    () => items.filter((i) => i.type === "video" && i.youtubeUrl),
    [items],
  );

  return (
    <div className="bg-background">
      <section className="border-b border-border/60 bg-[#000932] py-20 text-white">
        <div className="mx-auto max-w-7xl px-6 text-center">
          <p className="text-[10px] uppercase tracking-[0.35em] text-white/60">Gallery</p>
          <h1 className="mt-4 font-serif text-4xl sm:text-5xl">Our Work in Focus</h1>
          <p className="mx-auto mt-4 max-w-2xl text-sm text-white/70">
            A curated look at Nexus Line installations, craftsmanship and completed projects across the UAE.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16">
        {loading ? (
          <p className="text-sm text-muted-foreground">Loading gallery…</p>
        ) : images.length === 0 && videos.length === 0 ? (
          <p className="text-center text-sm text-muted-foreground">
            Gallery content coming soon.
          </p>
        ) : (
          <>
            {images.length > 0 && (
              <div>
                <h2 className="mb-6 font-serif text-2xl">Photos</h2>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {images.map((img) => (
                    <figure key={img.id} className="group overflow-hidden border border-border/60 bg-card">
                      <img
                        src={img.imageUrl}
                        alt={img.title || "Gallery image"}
                        loading="lazy"
                        className="h-64 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      {img.title && (
                        <figcaption className="px-4 py-3 text-xs uppercase tracking-[0.2em] text-muted-foreground">
                          {img.title}
                        </figcaption>
                      )}
                    </figure>
                  ))}
                </div>
              </div>
            )}

            {videos.length > 0 && (
              <div className="mt-16">
                <h2 className="mb-6 font-serif text-2xl">Videos</h2>
                <div className="grid gap-6 sm:grid-cols-2">
                  {videos.map((v) => {
                    const id = extractYouTubeId(v.youtubeUrl || "");
                    if (!id) return null;
                    return (
                      <div key={v.id} className="border border-border/60 bg-card">
                        <div className="relative aspect-video w-full">
                          <iframe
                            src={`https://www.youtube.com/embed/${id}`}
                            title={v.title || "YouTube video"}
                            loading="lazy"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            className="absolute inset-0 h-full w-full"
                          />
                        </div>
                        {v.title && (
                          <p className="px-4 py-3 text-xs uppercase tracking-[0.2em] text-muted-foreground">
                            {v.title}
                          </p>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </>
        )}
      </section>
    </div>
  );
}