import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, ArrowUpRight, Award, Hammer, Layers, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import heroImg from "@/assets/hero.jpg";
import cubiclesImg from "@/assets/service-cubicles.jpg";
import lockersImg from "@/assets/service-lockers.jpg";
import officeImg from "@/assets/service-office.jpg";
import claddingImg from "@/assets/service-cladding.jpg";
import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";

const heroSlides = [heroImg, cubiclesImg, officeImg, claddingImg, lockersImg];

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
      <HeroDoor />

      {/* Stats strip */}
      <section className="relative isolate overflow-hidden border-y border-border/60 bg-card/40">
        <img src={officeImg} alt="" aria-hidden="true" className="absolute inset-0 -z-10 h-full w-full object-cover opacity-[0.07]" />
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-r from-background via-background/80 to-background" />
        <div className="relative mx-auto grid max-w-7xl grid-cols-2 gap-y-8 px-6 py-12 md:grid-cols-4">
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
  useEffect(() => {
    const id = setInterval(() => setIdx((i) => (i + 1) % heroSlides.length), 5000);
    return () => clearInterval(id);
  }, []);
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
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ opacity: { duration: 1.4 }, scale: { duration: 6, ease: "linear" } }}
          className="absolute inset-0 h-full w-full object-cover"
        />
      </AnimatePresence>
      <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-background/40 to-background" />

      {/* Two doors that swing open */}
      <motion.div
        initial={{ rotateY: 0 }}
        animate={{ rotateY: -105 }}
        transition={{ duration: 1.8, delay: 0.4, ease: [0.65, 0, 0.35, 1] }}
        style={{ transformOrigin: "left center", backfaceVisibility: "hidden" }}
        className="absolute inset-y-0 left-0 z-20 w-1/2 overflow-hidden border-r border-primary/30 shadow-2xl"
      >
        <img
          src={heroImg}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-[200%] object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background/40 via-transparent to-foreground/30" />
        <div className="absolute right-4 top-1/2 h-16 w-1.5 -translate-y-1/2 rounded-full bg-primary/80 shadow-lg" />
      </motion.div>

      <motion.div
        initial={{ rotateY: 0 }}
        animate={{ rotateY: 105 }}
        transition={{ duration: 1.8, delay: 0.4, ease: [0.65, 0, 0.35, 1] }}
        style={{ transformOrigin: "right center", backfaceVisibility: "hidden" }}
        className="absolute inset-y-0 right-0 z-20 w-1/2 overflow-hidden border-l border-primary/30 shadow-2xl"
      >
        <img
          src={heroImg}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-[200%] -translate-x-1/2 object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-l from-background/40 via-transparent to-foreground/30" />
        <div className="absolute left-4 top-1/2 h-16 w-1.5 -translate-y-1/2 rounded-full bg-primary/80 shadow-lg" />
      </motion.div>

      {/* Center seam light */}
      <motion.div
        initial={{ opacity: 0, scaleY: 0.6 }}
        animate={{ opacity: [0, 1, 0], scaleY: 1 }}
        transition={{ duration: 1.6, delay: 0.3, times: [0, 0.4, 1] }}
        className="absolute inset-y-0 left-1/2 z-30 w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-primary to-transparent"
      />

      {/* Foreground content */}
      <div className="relative z-10 mx-auto flex min-h-[88svh] max-w-7xl flex-col justify-end px-5 pb-12 pt-24 sm:min-h-[92vh] sm:px-6 sm:pb-20 sm:pt-32">
        <span className="text-[10px] uppercase tracking-[0.35em] text-primary sm:text-xs sm:tracking-[0.4em]">
          HPL Specialists · United Arab Emirates
        </span>

        <h1 className="mt-5 max-w-4xl font-serif text-[2.5rem] font-medium leading-[1.05] text-foreground sm:mt-6 sm:text-6xl md:text-7xl lg:text-[88px]">
          {["Cubicles, lockers", "& interiors,"].map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
          <span className="block italic text-primary">
            crafted in line.
          </span>
        </h1>

        <p className="mt-6 max-w-xl text-sm leading-relaxed text-muted-foreground sm:mt-8 sm:text-base md:text-lg">
          Nexus Line Furniture designs, manufactures and installs premium HPL
          toilet cubicles, lockers, office partitions and architectural
          joinery for landmark projects across Dubai and the wider GCC.
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
    </section>
  );
}
