import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import claddingImg from "@/assets/service-cladding.jpg";
import cubiclesImg from "@/assets/service-cubicles.jpg";
import { ScrollingNumber } from "@/components/ScrollingNumber";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Us — Premium HPL & Joinery Manufacturers | Nexus Line Dubai" },
      { name: "description", content: "Learn about Nexus Line Furniture, the leading commercial HPL toilet cubicle, locker, and custom joinery manufacturer in Dubai & Ajman, serving the UAE with premium European laminates for over 7 years." },
      { name: "keywords", content: "HPL manufacturer Dubai, restroom partition factory UAE, local joinery workshop, Nexus Line Furniture about, commercial fitout manufacturer UAE" },
      { property: "og:title", content: "About Us — Premium HPL & Joinery Manufacturers | Nexus Line Dubai" },
      { property: "og:description", content: "Learn about Nexus Line Furniture, the leading commercial HPL toilet cubicle, locker, and custom joinery manufacturer in Dubai & Ajman, serving the UAE." },
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
          src={cubiclesImg}
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

      <section className="relative isolate overflow-hidden">
        <img
          src={cubiclesImg}
          alt=""
          aria-hidden
          className="absolute inset-0 -z-10 h-full w-full object-cover opacity-[0.05]"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-background via-background/95 to-background" />
        <div className="absolute inset-x-0 top-1/3 -z-10 h-[420px] bg-[radial-gradient(ellipse_at_center,_color-mix(in_oklab,_var(--primary)_18%,_transparent),_transparent_70%)]" />
        <div className="mx-auto grid max-w-7xl gap-16 px-6 py-24 lg:grid-cols-2">
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
          <div className="grid grid-cols-4 gap-x-2 gap-y-4 pt-6 sm:gap-x-6">
            {[
              { k: "7+", v: "Years experience" },
              { k: "250+", v: "Projects" },
              { k: "10K m²", v: "HPL installed" },
              { k: "20+", v: "Specialists" },
            ].map((s) => (
              <div key={s.v} className="min-w-0">
                <ScrollingNumber value={s.k} className="block whitespace-nowrap font-serif text-xl leading-tight text-primary sm:text-3xl" />
                <div className="mt-2 text-[10px] uppercase leading-snug tracking-[0.15em] text-muted-foreground sm:text-xs sm:tracking-[0.25em]">{s.v}</div>
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
        </div>
      </section>
    </>
  );
}
