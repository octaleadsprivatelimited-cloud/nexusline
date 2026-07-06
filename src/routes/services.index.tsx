import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Check } from "lucide-react";
import { services } from "@/lib/services-data";
import { useCollection } from "@/lib/use-firestore-data";
import cubiclesImg from "@/assets/service-cubicles.jpg";
import claddingImg from "@/assets/service-cladding.jpg";

export const Route = createFileRoute("/services/")({
  head: () => ({
    meta: [
      { title: "Services — HPL Cubicles, Lockers & Interiors | Nexus Line Furniture" },
      { name: "description", content: "HPL toilet cubicles, urinal partitions, lockers, office cubicles, doors, benches and wall cladding — designed and installed across the UAE." },
      { property: "og:title", content: "Services — Nexus Line Furniture" },
      { property: "og:description", content: "HPL cubicles, lockers, office partitions and wall cladding across the UAE." },
      { property: "og:url", content: "/services" },
    ],
    links: [{ rel: "canonical", href: "/services" }],
  }),
  component: Services,
});

function Services() {
  const remote = useCollection<{ title?: string; slug?: string; tagline?: string; imageUrl?: string }>("services");
  const overrides = new Map((remote ?? []).map((r) => [r.slug ?? r.id, r]));
  const merged = services.map((s) => {
    const o = overrides.get(s.slug);
    return o
      ? { ...s, title: o.title ?? s.title, tagline: o.tagline ?? s.tagline, img: o.imageUrl || s.img, body: o.tagline ?? s.body }
      : s;
  });
  // Include any Firestore-only services (not in seed) at the end.
  const seedSlugs = new Set(services.map((s) => s.slug));
  const extras = (remote ?? [])
    .filter((r) => (r.slug ?? r.id) && !seedSlugs.has((r.slug ?? r.id) as string))
    .map((r) => ({
      slug: (r.slug ?? r.id) as string,
      title: r.title ?? "",
      body: r.tagline ?? "",
      bullets: [] as string[],
      img: r.imageUrl || cubiclesImg,
    }));
  const list = [...merged, ...extras];
  return (
    <>
      <section className="relative isolate overflow-hidden border-b border-border/60">
        <img
          src={cubiclesImg}
          alt="HPL cubicle, locker and partition finishes"
          width={1920}
          height={1080}
          className="absolute inset-0 -z-10 h-full w-full object-cover"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-background/95 via-background/80 to-background/40" />
        <div className="mx-auto max-w-7xl px-6 pb-24 pt-32 md:pb-32 md:pt-40">
          <span className="text-xs uppercase tracking-[0.3em] text-primary">Services</span>
          <h1 className="mt-6 max-w-4xl font-serif text-5xl leading-[1.05] text-foreground md:text-6xl">
            Everything HPL, end-to-end.
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground">
            From a single cubicle block to a full multi-floor fit-out — our
            workshop and installation crews cover every category below across
            the United Arab Emirates.
          </p>
        </div>
      </section>

      <section className="relative isolate overflow-hidden">
        <img src={claddingImg} alt="" aria-hidden="true" className="absolute inset-0 -z-10 h-full w-full object-cover opacity-[0.06]" />
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-b from-background via-background/90 to-background" />
        <div className="relative mx-auto max-w-7xl px-6 py-24">
        <div className="grid gap-10 md:grid-cols-2">
          {list.map((s) => (
            <article key={s.slug} className="flex flex-col border border-border/60 bg-card">
              <div className="aspect-[4/3] overflow-hidden bg-muted/10">
                <img
                  src={s.img}
                  alt={s.title}
                  width={1280}
                  height={960}
                  loading="lazy"
                  className="h-full w-full object-contain"
                />
              </div>
              <div className="flex flex-1 flex-col p-8">
                <h2 className="font-serif text-2xl text-foreground">{s.title}</h2>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{s.body}</p>
                <ul className="mt-5 space-y-2 text-sm text-muted-foreground">
                  {s.bullets.map((b) => (
                    <li key={b} className="flex items-start gap-2">
                      <Check className="mt-0.5 h-4 w-4 text-primary" /> {b}
                    </li>
                  ))}
                </ul>
                <Link
                  to="/services/$slug"
                  params={{ slug: s.slug }}
                  className="mt-6 inline-flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.25em] text-primary hover:underline"
                >
                  View details <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-20 flex flex-col items-center gap-6 border border-border/60 bg-card/50 p-12 text-center">
          <h2 className="font-serif text-3xl text-foreground md:text-4xl">
            Not sure which fits your project?
          </h2>
          <p className="max-w-xl text-sm text-muted-foreground">
            Send us your drawings or simply describe the space — we'll come back
            with a recommendation and a transparent estimate.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-3 border border-primary bg-primary px-7 py-3.5 text-[11px] font-medium uppercase tracking-[0.25em] text-primary-foreground transition-colors hover:bg-transparent hover:text-primary"
          >
            Talk to a Specialist <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        </div>
      </section>
    </>
  );
}