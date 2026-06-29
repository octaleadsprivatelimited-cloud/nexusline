import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Check } from "lucide-react";
import cubiclesImg from "@/assets/service-cubicles.jpg";
import lockersImg from "@/assets/service-lockers.jpg";
import officeImg from "@/assets/service-office.jpg";
import claddingImg from "@/assets/service-cladding.jpg";

export const Route = createFileRoute("/services")({
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

const services = [
  {
    title: "HPL Toilet Cubicles",
    img: cubiclesImg,
    body: "Floor-to-ceiling and standard-height cubicles in 12 mm compact HPL, with stainless steel hardware and concealed fixings.",
    bullets: ["12mm compact-grade HPL", "Marine-grade stainless hardware", "200+ finishes & woodgrains"],
  },
  {
    title: "HPL Urinal Partitions & Screens",
    img: cubiclesImg,
    body: "Sanitary urinal screens with chamfered edges and anti-vandal fixings — engineered for high-traffic public restrooms.",
    bullets: ["Hygienic, non-porous surface", "Floor & wall mounting options", "Custom heights & widths"],
  },
  {
    title: "HPL Lockers",
    img: lockersImg,
    body: "Modular locker walls for gyms, hotels, staff rooms and schools — keyed, combination or RFID locking.",
    bullets: ["1-12 compartment configurations", "Ventilated or solid doors", "Cam, RFID & digital locks"],
  },
  {
    title: "Office Cubicles & Partitions",
    img: officeImg,
    body: "Acoustic workstations and meeting pods built around your floorplate, brand palette and workplace strategy.",
    bullets: ["Acoustic-rated panels", "Cable management built-in", "Glass, fabric & HPL combinations"],
  },
  {
    title: "HPL Doors & Wooden Works",
    img: cubiclesImg,
    body: "Solid HPL doors, framed joinery and bespoke wooden works installed by our in-house carpentry crew.",
    bullets: ["Fire-rated options", "Custom ironmongery", "Site-finished and pre-finished"],
  },
  {
    title: "HPL Desks, Tabletops & Benches",
    img: lockersImg,
    body: "Hard-wearing tabletops, benches and changing-room seating in HPL with steel or timber frames.",
    bullets: ["Scratch & heat resistant", "Indoor & semi-outdoor grade", "Custom edge profiles"],
  },
  {
    title: "Wall Cladding",
    img: claddingImg,
    body: "Architectural wall panelling in HPL, veneer and acoustic finishes for lobbies, retail and hospitality.",
    bullets: ["Concealed fixing systems", "Curved & faceted geometries", "Acoustic backing available"],
  },
  {
    title: "Interior & Exterior Decor",
    img: claddingImg,
    body: "End-to-end interior fit-out and exterior HPL facade detailing — one accountable partner, full handover.",
    bullets: ["Design + build", "MEP coordination", "Snag-free handover"],
  },
];

function Services() {
  return (
    <>
      <section className="border-b border-border/60">
        <div className="mx-auto max-w-7xl px-6 pb-20 pt-28">
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

      <section className="mx-auto max-w-7xl px-6 py-24">
        <div className="grid gap-10 md:grid-cols-2">
          {services.map((s) => (
            <article key={s.title} className="border border-border/60 bg-card">
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={s.img}
                  alt={s.title}
                  width={1280}
                  height={960}
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="p-8">
                <h2 className="font-serif text-2xl text-foreground">{s.title}</h2>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{s.body}</p>
                <ul className="mt-5 space-y-2 text-sm text-muted-foreground">
                  {s.bullets.map((b) => (
                    <li key={b} className="flex items-start gap-2">
                      <Check className="mt-0.5 h-4 w-4 text-primary" /> {b}
                    </li>
                  ))}
                </ul>
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
      </section>
    </>
  );
}