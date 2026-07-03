import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, ArrowUpRight, Award, Hammer, Layers, Sparkles } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import heroImg from "@/assets/hero.jpg";
import cubiclesImg from "@/assets/service-cubicles.jpg";
import lockersImg from "@/assets/service-lockers.jpg";
import officeImg from "@/assets/service-office.jpg";
import claddingImg from "@/assets/service-cladding.jpg";
import urinalImg from "@/assets/service-urinal.jpeg";
import desksImg from "@/assets/service-desks.jpg";
import vanitiesImg from "@/assets/service-vanities.jpeg";
import kitchenImg from "@/assets/service-kitchen.jpeg";
import solidSurfaceImg from "@/assets/service-solid-surface.jpeg";
import ipsImg from "@/assets/service-ips.jpg";
import carpetImg from "@/assets/service-carpet.jpg";
import benchImg from "@/assets/service-hpl-bench.jpg";
import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";

const heroSlides = [cubiclesImg, vanitiesImg, kitchenImg, solidSurfaceImg, urinalImg];

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Nexus Line Furniture — Toilet Cubicles, Lockers, Vanities & Joinery in Dubai" },
      { name: "description", content: "Toilet cubicles, lockers, vanities, urinal partitions, kitchen cabinets, carpet tiles, wall cladding, IPS panels and solid surface worktops — manufactured and installed across the UAE." },
      { property: "og:title", content: "Nexus Line Furniture — Cubicles, Lockers, Vanities & Joinery" },
      { property: "og:description", content: "Cubicles, lockers, vanities, kitchen cabinets, wall cladding, IPS panels and solid surface worktops across the UAE." },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Index,
});

const services = [
  { title: "Toilet Cubicles", slug: "toilet-cubicles", img: cubiclesImg, blurb: "Moisture-proof, vandal-resistant cubicle systems engineered for hotels, malls and offices." },
  { title: "Lockers", slug: "lockers", img: lockersImg, blurb: "Bespoke locker walls for gyms, staff rooms, schools and clubhouses — built to outlast." },
  { title: "Vanities", slug: "vanities", img: vanitiesImg, blurb: "Custom washroom vanities and counters — coordinated with your cubicle finish." },
  { title: "Urinal Partitions", slug: "urinal-partitions", img: urinalImg, blurb: "Hygienic urinal screens with sealed edges, built for high-traffic public restrooms." },
  { title: "Kitchen Cabinets", slug: "kitchen-cabinets", img: kitchenImg, blurb: "Modular kitchen cabinetry in HPL, acrylic and lacquer with Hafele / Blum hardware." },
  { title: "Carpet Tiles", slug: "carpet-tiles", img: carpetImg, blurb: "Heavy-contract modular carpet tiles, supplied and installed for offices and schools." },
  { title: "Wall Cladding", slug: "wall-cladding", img: claddingImg, blurb: "Architectural wall panelling on concealed sub-frames — HPL, veneer and acoustic finishes." },
  { title: "IPS Panels", slug: "ips-panels", img: ipsImg, blurb: "Integrated Plumbing System panels — concealed pipework with full service access." },
  { title: "Solid Surface Worktops", slug: "solid-surface-worktops", img: solidSurfaceImg, blurb: "Seamless Corian-style worktops, vanities and reception counters with integrated basins." },
  { title: "HPL Benches", slug: "hpl-benches", img: benchImg, blurb: "Heavy-duty modular changing room benches fabricated from compact HPL for wet areas." },
];

function Index() {
  return (
    <>
      {/* Hero */}
      <HeroDoor />

      {/* Stats strip */}
      <section className="relative isolate overflow-hidden border-y border-border/60 bg-card/40">
        <img src={officeImg} alt="" aria-hidden="true" className="absolute inset-0 -z-10 h-full w-full object-cover opacity-[0.07]" />
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-r from-background via-background/80 to-background" />
        <div className="relative mx-auto grid max-w-7xl grid-cols-2 gap-y-8 px-6 py-12 md:grid-cols-4">
          {[
            { k: "7+", v: "Years experience" },
            { k: "250+", v: "Projects delivered" },
            { k: "10K m²", v: "HPL installed" },
            { k: "20+", v: "Specialists" },
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
      <section className="relative isolate overflow-hidden">
        <img src={cubiclesImg} alt="" aria-hidden="true" className="absolute inset-0 -z-10 h-full w-full object-cover opacity-[0.05]" />
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-b from-background via-background/95 to-background" />
        <div className="relative mx-auto max-w-7xl px-6 py-28">
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
                to="/services/$slug"
                params={{ slug: s.slug }}
                key={s.title}
                className="group relative block overflow-hidden border border-border/60 bg-card"
              >
                <div className="aspect-[4/3] overflow-hidden bg-muted/10">
                  <img
                    src={s.img}
                    alt={s.title}
                    width={1280}
                    height={960}
                    loading="lazy"
                    className="h-full w-full object-contain transition-transform duration-700 group-hover:scale-105"
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
        </div>
      </section>

      {/* Why us */}
      <section className="relative isolate overflow-hidden border-t border-border/60 bg-card/30">
        <img src={claddingImg} alt="" aria-hidden="true" className="absolute inset-0 -z-10 h-full w-full object-cover opacity-[0.06]" />
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-b from-background via-background/85 to-background" />
        <div aria-hidden="true" className="pointer-events-none absolute -right-40 top-20 -z-10 h-[480px] w-[480px] rounded-full bg-primary/10 blur-3xl" />
        <div className="relative mx-auto max-w-7xl px-6 py-28">
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
                { icon: Layers, title: "Genuine HPL panels", body: "0.8–25 mm HPL from certified European mills, rated for moisture, impact and fire." },
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
        <div className="relative isolate overflow-hidden border border-primary/30 bg-background p-12 md:p-20">
          <img src={cubiclesImg} alt="" aria-hidden="true" className="absolute inset-0 -z-10 h-full w-full object-cover opacity-[0.12]" />
          <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-r from-background via-background/90 to-background/70" />
          <div aria-hidden="true" className="pointer-events-none absolute -left-32 -top-32 -z-10 h-[420px] w-[420px] rounded-full bg-primary/15 blur-3xl" />
          <div className="relative grid items-center gap-10 md:grid-cols-[1.5fr_1fr]">
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

function HeroDoor() {
  const [idx, setIdx] = useState(0);
  const reduce = useReducedMotion();
  useEffect(() => {
    if (reduce) return;
    const id = setInterval(() => setIdx((i) => (i + 1) % heroSlides.length), 5000);
    return () => clearInterval(id);
  }, [reduce]);
  return (
    <section className="relative isolate min-h-[88svh] overflow-hidden bg-background [perspective:1800px] sm:min-h-[92vh]">
      {/* Crossfading background slideshow */}
      <AnimatePresence>
        <motion.img
          key={idx}
          src={heroSlides[idx]}
          alt="Luxury HPL interiors by Nexus Line Furniture"
          width={1920}
          height={1280}
          initial={reduce ? false : { opacity: 0, scale: 1.1 }}
          animate={reduce ? { opacity: 1, scale: 1 } : { opacity: 1, scale: 1 }}
          exit={reduce ? { opacity: 1 } : { opacity: 0 }}
          transition={reduce ? { duration: 0 } : { opacity: { duration: 1.4 }, scale: { duration: 6, ease: "linear" } }}
          className="absolute inset-0 h-full w-full object-cover"
        />
      </AnimatePresence>


      {/* Foreground content */}
      <div className="relative z-10 mx-auto flex min-h-[88svh] max-w-7xl flex-col justify-end px-5 pb-12 pt-24 sm:min-h-[92vh] sm:px-6 sm:pb-20 sm:pt-32">
        <div className="max-w-fit border border-border/50 bg-white/60 p-6 backdrop-blur-md shadow-2xl sm:p-10">
          <span className="text-[10px] uppercase tracking-[0.35em] text-primary sm:text-xs sm:tracking-[0.4em]">
            HPL Specialists · United Arab Emirates
          </span>

          <h1 className="mt-5 max-w-4xl font-serif text-2xl font-medium leading-[1.1] text-foreground sm:mt-6 sm:text-4xl md:text-5xl lg:text-5xl">
            <span className="block">Restroom cubicles,</span>
            <span className="block">worktops &amp;</span>
            <span className="block italic text-primary">
              interior solutions.
            </span>
          </h1>

          <p className="mt-6 max-w-xl text-sm leading-relaxed text-muted-foreground sm:mt-8 sm:text-base md:text-lg">
            Nexus Line Furniture designs, manufactures and installs toilet
            cubicles, lockers, vanities, kitchen cabinets,
            wall cladding, IPS panels and solid surface worktops
            for landmark projects across Dubai and the wider GCC.
          </p>

          <div className="mt-8 flex flex-row flex-nowrap items-center gap-3 sm:mt-10 sm:gap-4">
            <Link
              to="/contact"
              className="group inline-flex flex-1 items-center justify-center gap-2 border border-[#1d4fd7] bg-[#1d4fd7] px-4 py-3 text-[11px] font-medium uppercase tracking-[0.18em] text-white transition-colors hover:bg-[#163fb0] sm:flex-none sm:justify-start sm:gap-3 sm:px-7 sm:py-3.5 sm:tracking-[0.25em]"
            >
              Request a Quote
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              to="/projects"
              className="inline-flex flex-1 items-center justify-center gap-2 border border-[#f5c518] bg-[#f5c518] px-4 py-3 text-[11px] font-medium uppercase tracking-[0.18em] text-[#0b1e3f] transition-colors hover:bg-[#e0b314] sm:flex-none sm:justify-start sm:gap-3 sm:px-7 sm:py-3.5 sm:tracking-[0.25em]"
            >
              View Projects
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
