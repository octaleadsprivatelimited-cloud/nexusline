import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, ArrowUpRight, Award, Hammer, Layers, Sparkles } from "lucide-react";
import heroImg from "@/assets/hero.jpg";
import cubiclesImg from "@/assets/service-cubicles.jpg";
import lockersImg from "@/assets/service-lockers.jpg";
import officeImg from "@/assets/service-office.jpg";
import claddingImg from "@/assets/service-cladding.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Nexus Line Furniture — Luxury HPL Cubicles & Interiors in Dubai" },
      { name: "description", content: "Premium HPL toilet cubicles, lockers, office partitions, doors and wall cladding designed, manufactured and installed across the UAE." },
      { property: "og:title", content: "Nexus Line Furniture — Luxury HPL Cubicles & Interiors" },
      { property: "og:description", content: "Premium HPL toilet cubicles, lockers, partitions and wall cladding across the UAE." },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Index,
});

const services = [
  { title: "HPL Toilet Cubicles", img: cubiclesImg, blurb: "Moisture-proof, vandal-resistant cubicle systems engineered for hotels, malls and offices.", href: "/services" },
  { title: "HPL Lockers", img: lockersImg, blurb: "Bespoke locker walls for gyms, staff rooms, schools and clubhouses — built to outlast.", href: "/services" },
  { title: "Office Cubicles & Partitions", img: officeImg, blurb: "Acoustic workstations and partitions tailored to your floorplate and brand language.", href: "/services" },
  { title: "Wall Cladding & Interiors", img: claddingImg, blurb: "Sculpted wall panelling, doors and joinery — a single workshop for the entire fit-out.", href: "/services" },
];

function Index() {
  return (
    <>
      {/* Hero */}
      <section className="relative isolate overflow-hidden">
        <img
          src={heroImg}
          alt="Luxury HPL cubicle interior by Nexus Line Furniture"
          width={1920}
          height={1280}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/50 to-background" />
        <div className="relative mx-auto flex min-h-[88vh] max-w-7xl flex-col justify-end px-6 pb-20 pt-32">
          <span className="text-xs uppercase tracking-[0.4em] text-primary">
            HPL Specialists · United Arab Emirates
          </span>
          <h1 className="mt-6 max-w-4xl font-serif text-5xl font-medium leading-[1.05] text-foreground sm:text-6xl md:text-7xl lg:text-[88px]">
            Cubicles, lockers &amp; interiors,
            <span className="block italic text-primary">crafted in line.</span>
          </h1>
          <p className="mt-8 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
            Nexus Line Furniture designs, manufactures and installs premium HPL
            toilet cubicles, lockers, office partitions and architectural
            joinery for landmark projects across Dubai and the wider GCC.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Link
              to="/contact"
              className="group inline-flex items-center gap-3 border border-primary bg-primary px-7 py-3.5 text-[11px] font-medium uppercase tracking-[0.25em] text-primary-foreground transition-colors hover:bg-transparent hover:text-primary"
            >
              Request a Quote
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              to="/projects"
              className="inline-flex items-center gap-3 border border-border px-7 py-3.5 text-[11px] font-medium uppercase tracking-[0.25em] text-foreground transition-colors hover:border-primary hover:text-primary"
            >
              View Projects
            </Link>
          </div>
        </div>
      </section>

      {/* Stats strip */}
      <section className="border-y border-border/60 bg-card/40">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-y-8 px-6 py-12 md:grid-cols-4">
          {[
            { k: "12+", v: "Years of craft" },
            { k: "850+", v: "Projects delivered" },
            { k: "60K m²", v: "HPL installed" },
            { k: "100%", v: "In-house production" },
          ].map((s) => (
            <div key={s.v} className="text-center md:text-left">
              <div className="font-serif text-4xl text-primary md:text-5xl">{s.k}</div>
              <div className="mt-2 text-xs uppercase tracking-[0.25em] text-muted-foreground">
                {s.v}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Services */}
      <section className="mx-auto max-w-7xl px-6 py-28">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <span className="text-xs uppercase tracking-[0.3em] text-primary">What we do</span>
            <h2 className="mt-4 font-serif text-4xl leading-tight text-foreground md:text-5xl">
              A complete HPL &amp; joinery workshop under one roof.
            </h2>
          </div>
          <Link
            to="/services"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-primary hover:text-foreground"
          >
            All services <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-14 grid gap-8 md:grid-cols-2">
          {services.map((s) => (
            <Link
              to={s.href}
              key={s.title}
              className="group relative block overflow-hidden border border-border/60 bg-card"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={s.img}
                  alt={s.title}
                  width={1280}
                  height={960}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="flex items-start justify-between gap-4 p-8">
                <div>
                  <h3 className="font-serif text-2xl text-foreground">{s.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{s.blurb}</p>
                </div>
                <ArrowUpRight className="mt-1 h-5 w-5 shrink-0 text-primary transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Why us */}
      <section className="border-t border-border/60 bg-card/30">
        <div className="mx-auto max-w-7xl px-6 py-28">
          <div className="grid gap-16 lg:grid-cols-[1fr_1.2fr]">
            <div>
              <span className="text-xs uppercase tracking-[0.3em] text-primary">Why Nexus Line</span>
              <h2 className="mt-4 font-serif text-4xl leading-tight text-foreground md:text-5xl">
                Engineered for the harshest commercial environments — and the most discerning clients.
              </h2>
            </div>
            <div className="grid gap-10 sm:grid-cols-2">
              {[
                { icon: Hammer, title: "In-house manufacturing", body: "Our Dubai workshop controls every cut, edge and finish — no third-party guesswork." },
                { icon: Layers, title: "Genuine HPL panels", body: "0.8–12 mm HPL from certified European mills, rated for moisture, impact and fire." },
                { icon: Award, title: "Site-trained installers", body: "Dedicated crews handle survey, delivery and fit-out — single point of accountability." },
                { icon: Sparkles, title: "Bespoke finishes", body: "Over 200 woodgrains, solids and metallics — colour-matched to your interior scheme." },
              ].map(({ icon: Icon, title, body }) => (
                <div key={title}>
                  <Icon className="h-6 w-6 text-primary" />
                  <h3 className="mt-4 font-serif text-xl text-foreground">{title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-6 py-28">
        <div className="relative overflow-hidden border border-primary/30 bg-background p-12 md:p-20">
          <div className="grid items-center gap-10 md:grid-cols-[1.5fr_1fr]">
            <h2 className="font-serif text-4xl leading-tight text-foreground md:text-5xl">
              Have a project in mind? <span className="italic text-primary">Let's draw the lines.</span>
            </h2>
            <div className="flex flex-col items-start gap-4 md:items-end">
              <Link
                to="/contact"
                className="inline-flex items-center gap-3 border border-primary bg-primary px-7 py-3.5 text-[11px] font-medium uppercase tracking-[0.25em] text-primary-foreground transition-colors hover:bg-transparent hover:text-primary"
              >
                Start a Conversation <ArrowRight className="h-4 w-4" />
              </Link>
              <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">
                Free site visit across UAE
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
