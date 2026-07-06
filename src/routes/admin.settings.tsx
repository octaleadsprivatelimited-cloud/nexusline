import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { doc, onSnapshot, setDoc, serverTimestamp } from "firebase/firestore";
import { toast } from "sonner";
import { db } from "@/lib/firebase";

export const Route = createFileRoute("/admin/settings")({
  component: Settings,
});

type SiteSettings = {
  companyName?: string;
  phone?: string;
  email?: string;
  address?: string;
  heroTitle?: string;
  heroSubtitle?: string;
};

const DOC_ID = "site";

const SEED_SETTINGS: SiteSettings = {
  companyName: "Nexus Line Furniture",
  phone: "+971 50 509 7864",
  email: "sales@nexuslinefurniture.ae",
  address: "Dubai & Ajman, United Arab Emirates",
  heroTitle: "Restroom cubicles, worktops & interior solutions.",
  heroSubtitle:
    "Nexus Line Furniture designs, manufactures and installs toilet cubicles, lockers, vanities, kitchen cabinets, wall cladding, IPS panels and solid surface worktops for landmark projects across Dubai and the wider GCC.",
};

function Settings() {
  const [form, setForm] = useState<SiteSettings>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [seeding, setSeeding] = useState(false);
  const [exists, setExists] = useState(false);

  useEffect(() => {
    if (!db) {
      setLoading(false);
      return;
    }
    return onSnapshot(
      doc(db, "settings", DOC_ID),
      (snap) => {
        if (snap.exists()) {
          setForm(snap.data() as SiteSettings);
          setExists(true);
        } else {
          setExists(false);
        }
        setLoading(false);
      },
      (err) => {
        console.error(err);
        toast.error("Firestore permissions are blocking settings. Publish the updated rules.");
        setLoading(false);
      },
    );
  }, []);

  const save = async () => {
    if (!db) return;
    setSaving(true);
    try {
      await setDoc(
        doc(db, "settings", DOC_ID),
        { ...form, updatedAt: serverTimestamp() },
        { merge: true },
      );
      toast.success("Settings saved");
    } catch (err) {
      console.error(err);
      toast.error("Save failed");
    } finally {
      setSaving(false);
    }
  };

  const seed = async () => {
    if (!db) return;
    setSeeding(true);
    try {
      await setDoc(
        doc(db, "settings", DOC_ID),
        { ...SEED_SETTINGS, updatedAt: serverTimestamp() },
        { merge: true },
      );
      toast.success("Seeded site settings from website defaults");
    } catch (err) {
      console.error(err);
      toast.error("Seed failed — check Firestore rules");
    } finally {
      setSeeding(false);
    }
  };

  const F = (label: string, key: keyof SiteSettings, textarea = false) => (
    <div>
      <label className="text-xs uppercase tracking-[0.25em] text-muted-foreground">{label}</label>
      {textarea ? (
        <textarea
          rows={3}
          value={form[key] ?? ""}
          onChange={(e) => setForm({ ...form, [key]: e.target.value })}
          className="mt-2 w-full border border-border bg-background px-4 py-3 text-sm outline-none focus:border-primary"
        />
      ) : (
        <input
          value={form[key] ?? ""}
          onChange={(e) => setForm({ ...form, [key]: e.target.value })}
          className="mt-2 w-full border border-border bg-background px-4 py-3 text-sm outline-none focus:border-primary"
        />
      )}
    </div>
  );

  return (
    <div className="max-w-2xl space-y-6">
      <div>
        <h1 className="font-serif text-3xl">Site settings</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Company details and hero copy. Frontend reads from Firestore.
        </p>
      </div>
      <button
        onClick={seed}
        disabled={seeding}
        className="border border-border px-4 py-2 text-xs uppercase tracking-widest hover:bg-muted disabled:opacity-50"
      >
        {seeding ? "Seeding…" : exists ? "Reset to website defaults" : "Seed from website defaults"}
      </button>
      {loading ? (
        <p className="text-sm text-muted-foreground">Loading…</p>
      ) : (
        <div className="space-y-5 border border-border/60 bg-card p-6">
          {F("Company name", "companyName")}
          {F("Phone", "phone")}
          {F("Email", "email")}
          {F("Address", "address")}
          {F("Hero title", "heroTitle")}
          {F("Hero subtitle", "heroSubtitle", true)}
          <button
            onClick={save}
            disabled={saving}
            className="bg-primary px-6 py-3 text-xs uppercase tracking-widest text-primary-foreground disabled:opacity-50"
          >
            {saving ? "Saving…" : "Save settings"}
          </button>
        </div>
      )}
    </div>
  );
}
