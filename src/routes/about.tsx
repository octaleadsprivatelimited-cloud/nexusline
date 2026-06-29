import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import claddingImg from "@/assets/service-cladding.jpg";
import heroAbout from "@/assets/hero-about.jpg";
import { ScrollingNumber } from "@/components/ScrollingNumber";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Nexus Line Furniture" },
      { name: "description", content: "Nexus Line Furniture is a Dubai-based HPL specialist designing and manufacturing premium cubicles, lockers and interior joinery across the UAE." },
      { property: "og:title", content: "About — Nexus Line Furniture" },
      { property: "og:description", content: "A Dubai-based HPL specialist crafting premium cubicles, lockers and interiors." },
      { property: "og:url", content: "/about" },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: About,
});

function About() {
  return (
    <>
      <section className="relative isolate overflow-hidden border-b border-border/60">
        <img
          src={heroAbout}
          alt="Nexus Line Furniture workshop"
          width={1920}
          height={1080}
          className="absolute inset-0 -z-10 h-full w-full object-cover"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-background/95 via-background/80 to-background/40" />
        <div className="mx-auto max-w-7xl px-6 pb-24 pt-32 md:pb-32 md:pt-40">
          <span className="text-xs uppercase tracking-[0.3em] text-primary">About the studio</span>
          <h1 className="mt-6 max-w-4xl font-serif text-5xl leading-[1.05] text-foreground md:text-6xl">
            A workshop built on craftsmanship, calibrated by engineering.
          </h1>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-16 px-6 py-24 lg:grid-cols-2">
        <img
          src={claddingImg}
          alt="Nexus Line Furniture workshop detail"
          width={1280}
          height={960}
          loading="lazy"
          className="h-full w-full object-cover"
        />
        <div className="space-y-6 text-base leading-relaxed text-muted-foreground">
          <p>
            Nexus Line Furniture was founded in Dubai by a team of joiners,
            engineers and interior architects united by a single belief: the
            difference between a good fit-out and a great one lives in the
            millimetre.
          </p>
          <p>
            From our in-house workshop we manufacture and install HPL toilet
            cubicles, lockers, office partitions, doors, benches and bespoke
            wall cladding for hospitality, corporate, healthcare, education
            and luxury residential projects across the United Arab Emirates.
          </p>
          <p>
            Every project is delivered by a single accountable team —
            survey, CAD, CNC, assembly, finishing and installation — so the
            line you draw on day one is the line we hand back to you on
            handover.
          </p>
          <div className="grid grid-cols-4 gap-3 pt-6 sm:gap-6">
            {[
              { k: "12+", v: "Years in the UAE" },
              { k: "850+", v: "Projects" },
              { k: "60K m²", v: "HPL installed" },
              { k: "40+", v: "Specialists" },
            ].map((s) => (
              <div key={s.v}>
                <ScrollingNumber value={s.k} className="block font-serif text-2xl text-primary sm:text-3xl" />
                <div className="mt-1 text-[10px] uppercase tracking-[0.2em] text-muted-foreground sm:text-xs sm:tracking-[0.25em]">{s.v}</div>
              </div>
            ))}
          </div>
          <Link
            to="/contact"
            className="mt-6 inline-flex items-center gap-3 border border-primary bg-primary px-7 py-3.5 text-[11px] font-medium uppercase tracking-[0.25em] text-primary-foreground transition-colors hover:bg-transparent hover:text-primary"
          >
            Work with us <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
