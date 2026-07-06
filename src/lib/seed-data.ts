import { addDoc, collection, getDocs, serverTimestamp } from "firebase/firestore";
import { db } from "./firebase";
import { services as staticServices } from "./services-data";
import { seedProjects } from "./projects-data";
import { urlToCompressedDataUrl } from "./image-to-data-url";

export type SeedProgress = (msg: string) => void;

export async function seedServices(onProgress?: SeedProgress) {
  if (!db) throw new Error("Firestore not configured");
  const snap = await getDocs(collection(db, "services"));
  const existingSlugs = new Set<string>();
  snap.forEach((d) => {
    const slug = (d.data() as { slug?: string }).slug;
    if (slug) existingSlugs.add(slug);
  });

  let added = 0;
  let skipped = 0;
  for (const s of staticServices) {
    if (existingSlugs.has(s.slug)) {
      skipped++;
      continue;
    }
    onProgress?.(`Compressing ${s.title}…`);
    let imageUrl = "";
    try {
      imageUrl = await urlToCompressedDataUrl(s.img);
    } catch (err) {
      console.warn(`Image failed for ${s.slug}`, err);
    }
    await addDoc(collection(db, "services"), {
      slug: s.slug,
      title: s.title,
      tagline: s.tagline,
      category: s.category,
      body: s.body,
      bullets: s.bullets,
      overview: s.overview,
      specs: s.specs,
      applications: s.applications,
      process: s.process,
      faqs: s.faqs,
      imageUrl,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
    added++;
  }
  return { added, skipped };
}

export async function seedProjectsData(onProgress?: SeedProgress) {
  if (!db) throw new Error("Firestore not configured");
  const snap = await getDocs(collection(db, "projects"));
  const existingTitles = new Set<string>();
  snap.forEach((d) => {
    const t = (d.data() as { title?: string }).title;
    if (t) existingTitles.add(t);
  });

  let added = 0;
  let skipped = 0;
  for (const p of seedProjects) {
    if (existingTitles.has(p.title)) {
      skipped++;
      continue;
    }
    onProgress?.(`Compressing ${p.title}…`);
    let imageUrl = "";
    try {
      imageUrl = await urlToCompressedDataUrl(p.img);
    } catch (err) {
      console.warn(`Image failed for ${p.title}`, err);
    }
    await addDoc(collection(db, "projects"), {
      title: p.title,
      category: p.category,
      location: p.location,
      description: "",
      imageUrl,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
    added++;
  }
  return { added, skipped };
}