import cubiclesImg from "@/assets/service-cubicles.jpg";
import lockersImg from "@/assets/service-lockers.jpg";
import claddingImg from "@/assets/service-cladding.jpg";
import urinalImg from "@/assets/service-urinal.jpeg";
import vanitiesImg from "@/assets/service-vanities.jpeg";
import kitchenImg from "@/assets/service-kitchen.jpeg";
import carpetImg from "@/assets/service-carpet.jpg";
import ipsImg from "@/assets/service-ips.jpg";
import labImg from "@/assets/service-lab.jpg";
import solidSurfaceImg from "@/assets/service-solid-surface.jpeg";
import benchImg from "@/assets/service-hpl-bench.jpg";

export type ServiceDetail = {
  slug: string;
  title: string;
  tagline: string;
  category: "washroom" | "office" | "interiors";
  img: string;
  body: string;
  bullets: string[];
  overview: string[];
  specs: { label: string; value: string }[];
  applications: string[];
  process: { step: string; detail: string }[];
  faqs: { q: string; a: string }[];
};

export const services: ServiceDetail[] = [
  {
    slug: "toilet-cubicles",
    title: "Toilet Cubicles",
    tagline: "Compact-grade washroom cubicles built to outlast the building.",
    category: "washroom",
    img: cubiclesImg,
    body: "Floor-to-ceiling and standard-height cubicles in 12–25 mm compact HPL, with SS 304 / 316 stainless steel hardware and concealed fixings.",
    bullets: ["12–25mm compact HPL panels", "SS 304 / 316 stainless steel hardware", "200+ finishes & woodgrains"],
    overview: [
      "Our toilet cubicles are fabricated from 12–25 mm compact-grade High Pressure Laminate — a fully waterproof, impact-resistant panel ideal for high-traffic UAE washrooms.",
      "Each cubicle is fully prefabricated in our Dubai workshop, then installed on site by our in-house crew with SS 304 / 316 stainless steel hardware that won't corrode in humid conditions.",
    ],
    specs: [
      { label: "Panel Thickness", value: "12 mm – 25 mm compact HPL" },
      { label: "Standard Height", value: "2000 mm (custom up to 2700 mm)" },
      { label: "Hardware", value: "SS 304 / 316 grade" },
      { label: "Finishes", value: "200+ solid colours & woodgrains" },
      { label: "Warranty", value: "10 years on panels" },
      { label: "Fire Rating", value: "Class B-s2,d0 (on request)" },
    ],
    applications: ["Offices & corporate towers", "Schools & universities", "Malls & retail", "Hotels & hospitality", "Airports & transit hubs", "Hospitals & clinics"],
    process: [
      { step: "Site Survey", detail: "Free measurement and feasibility visit anywhere in the UAE." },
      { step: "Design & Quote", detail: "3D layout, finish board and a transparent itemised quotation." },
      { step: "Workshop Fabrication", detail: "CNC cutting and edge sealing under controlled conditions." },
      { step: "Installation", detail: "Clean, snag-free installation by our own carpentry crew." },
    ],
    faqs: [
      { q: "How long does fabrication take?", a: "Typical lead time is 2–3 weeks from approved drawings, depending on quantity and finish availability." },
      { q: "Can you match an existing colour?", a: "Yes — we stock Greenlam, Merino and Wilsonart compact ranges and can source bespoke shades on request." },
    ],
  },
  {
    slug: "lockers",
    title: "Lockers",
    tagline: "Modular locker walls for gyms, hotels, staff rooms and schools.",
    category: "washroom",
    img: lockersImg,
    body: "Modular locker walls for gyms, hotels, staff rooms and schools — keyed, combination or RFID locking.",
    bullets: ["1-12 compartment configurations", "Ventilated or solid doors", "Cam, RFID & digital locks"],
    overview: [
      "Waterproof HPL lockers built to handle wet areas, sweat and daily abuse — perfect for gyms, pools, hotels and back-of-house staff rooms.",
      "Configure 1 to 12 compartments per column, with sloping or flat tops and your choice of locking mechanism.",
    ],
    specs: [
      { label: "Body Thickness", value: "12 mm compact HPL" },
      { label: "Door Thickness", value: "12 mm compact HPL" },
      { label: "Compartments", value: "1, 2, 3, 4, 6 or 12 tier" },
      { label: "Locks", value: "Cam, combination, RFID, digital keypad" },
      { label: "Ventilation", value: "Slotted or perforated doors" },
    ],
    applications: ["Gyms & wellness centres", "Hotels & resorts", "Schools & universities", "Offices", "Industrial staff rooms"],
    process: [
      { step: "Configuration", detail: "Choose tier count, lock type and finish." },
      { step: "Fabrication", detail: "Prefabricated in modular runs." },
      { step: "Installation", detail: "Wall-anchored on adjustable plinths." },
    ],
    faqs: [
      { q: "Are these lockers waterproof?", a: "Yes — compact HPL is fully waterproof, making it ideal for wet changing rooms and pool decks." },
    ],
  },
  {
    slug: "vanities",
    title: "Vanities & Washroom Counters",
    tagline: "Bespoke vanity units in HPL, solid surface and stone composites.",
    category: "washroom",
    img: vanitiesImg,
    body: "Bespoke vanity units and washroom counters fabricated to match your cubicle finish — with under-mount or vessel basin cut-outs.",
    bullets: ["Solid surface or HPL tops", "Under-mount basin cut-outs", "Concealed brackets & aprons"],
    overview: [
      "Custom washroom vanities engineered to coordinate with your cubicles and cladding — fabricated from solid surface, compact HPL or stone composite tops on concealed steel sub-frames.",
    ],
    specs: [
      { label: "Top Material", value: "Solid surface / 12 mm HPL / quartz" },
      { label: "Basin Mounting", value: "Under-mount, vessel or integrated" },
      { label: "Apron / Skirt", value: "HPL or matching top material" },
      { label: "Sub-frame", value: "Powder-coated steel, wall-anchored" },
    ],
    applications: ["Hotel washrooms", "Office floors", "Malls & retail", "Schools"],
    process: [
      { step: "Survey", detail: "Site dimensions, plumbing rough-ins and basin selection." },
      { step: "Fabrication", detail: "CNC-cut tops and seamless joints in our workshop." },
      { step: "Install", detail: "Sub-frame anchored, top set and sealed to wall." },
    ],
    faqs: [
      { q: "Can vanities match our cubicle finish?", a: "Yes — we fabricate vanities from the same HPL or solid surface range as your cubicles for a coordinated look." },
    ],
  },
  {
    slug: "urinal-partitions",
    title: "Urinal Partitions & Screens",
    tagline: "Hygienic urinal screens engineered for high-traffic restrooms.",
    category: "washroom",
    img: urinalImg,
    body: "Sanitary urinal screens with chamfered edges and anti-vandal fixings — engineered for high-traffic public restrooms.",
    bullets: ["Hygienic, non-porous surface", "Floor & wall mounting options", "Custom heights & widths"],
    overview: [
      "Compact HPL urinal screens with chamfered, sealed edges that resist moisture, graffiti and impact — the right call for malls, schools and transit washrooms.",
      "Available in wall-mounted, floor-mounted and floor-to-ceiling configurations with anti-vandal stainless fixings.",
    ],
    specs: [
      { label: "Panel Thickness", value: "12 mm – 25 mm compact HPL" },
      { label: "Standard Size", value: "400 × 900 mm (custom available)" },
      { label: "Mounting", value: "Wall, floor or pedestal" },
      { label: "Edge", value: "Sealed & chamfered" },
    ],
    applications: ["Schools", "Stadiums & arenas", "Malls", "Mosques", "Public restrooms"],
    process: [
      { step: "Site Survey", detail: "Measurement and mounting feasibility." },
      { step: "Fabrication", detail: "CNC-cut and edge-sealed in our workshop." },
      { step: "Installation", detail: "Fixed with concealed stainless brackets." },
    ],
    faqs: [
      { q: "Are the screens easy to clean?", a: "Yes — the non-porous HPL surface is wipe-clean and resistant to standard washroom chemicals." },
    ],
  },
  {
    slug: "wall-cladding",
    title: "Wall Cladding",
    tagline: "Architectural wall panelling for lobbies, retail and hospitality.",
    category: "interiors",
    img: claddingImg,
    body: "Architectural wall panelling in HPL, veneer and acoustic finishes for lobbies, retail and hospitality.",
    bullets: ["Concealed fixing systems", "Curved & faceted geometries", "Acoustic backing available"],
    overview: [
      "Feature wall cladding in HPL, veneer and acoustic finishes — installed on concealed sub-frame systems that allow access for services behind the wall.",
    ],
    specs: [
      { label: "Panel Thickness", value: "8–12 mm" },
      { label: "Fixing", value: "Concealed Z-clip / sub-frame" },
      { label: "Finishes", value: "HPL, veneer, fluted, acoustic" },
      { label: "Fire Rating", value: "Class B-s2,d0 (on request)" },
    ],
    applications: ["Hotel lobbies", "Retail flagships", "Corporate receptions", "Restaurants & cafés"],
    process: [
      { step: "Design", detail: "Pattern, jointing and finish development." },
      { step: "Sub-frame", detail: "Aluminium grid set out to tolerance." },
      { step: "Panel Install", detail: "Panels clipped on for serviceability." },
    ],
    faqs: [
      { q: "Can panels be removed for maintenance?", a: "Yes — the concealed clip system allows individual panels to be lifted off without damage." },
    ],
  },
  {
    slug: "kitchen-cabinets",
    title: "Kitchen Cabinets",
    tagline: "Modular kitchen cabinetry for residential and commercial kitchens.",
    category: "interiors",
    img: kitchenImg,
    body: "Modular kitchen cabinetry in HPL, acrylic and lacquer finishes — built around your appliance plan and ergonomics.",
    bullets: ["HPL, acrylic & lacquer finishes", "Hafele / Blum hardware", "Soft-close drawers & lift-ups"],
    overview: [
      "Full kitchen fit-outs for villas, apartments and commercial kitchens — fabricated in our workshop with European hardware and finished to showroom standards.",
    ],
    specs: [
      { label: "Carcass", value: "18 mm moisture-resistant MDF / plywood" },
      { label: "Shutters", value: "HPL, acrylic, lacquer or veneer" },
      { label: "Hardware", value: "Hafele, Blum, Hettich" },
      { label: "Worktops", value: "Quartz, solid surface or HPL" },
    ],
    applications: ["Villas & apartments", "Staff pantries", "Commercial kitchens", "Show kitchens"],
    process: [
      { step: "Design", detail: "3D layout with appliance and plumbing coordination." },
      { step: "Fabrication", detail: "Modular carcasses and shutters CNC-cut." },
      { step: "Install", detail: "Site fit, alignment and worktop install." },
    ],
    faqs: [
      { q: "Do you supply appliances?", a: "We coordinate with your chosen appliance supplier and provide cut-outs and service points to spec." },
    ],
  },
  {
    slug: "carpet-tiles",
    title: "Carpet Tiles",
    tagline: "Commercial-grade modular carpet tiles, supplied and installed.",
    category: "interiors",
    img: carpetImg,
    body: "Commercial-grade modular carpet tiles supplied and installed — easy to replace, ideal for raised-floor offices and high-traffic spaces.",
    bullets: ["Heavy-contract grade", "Hundreds of colours & patterns", "Tackifier or full-stick install"],
    overview: [
      "We supply and install loop-pile and cut-pile carpet tiles from leading manufacturers — perfect for offices, classrooms and back-of-house areas where modular replacement matters.",
    ],
    specs: [
      { label: "Tile Size", value: "500 × 500 mm (standard)" },
      { label: "Backing", value: "Bitumen or PVC, dimensionally stable" },
      { label: "Grade", value: "Heavy contract / 33+" },
      { label: "Install", value: "Tackifier adhesive (lift-up replaceable)" },
    ],
    applications: ["Offices", "Coworking", "Schools", "Hotels back-of-house"],
    process: [
      { step: "Sample & Spec", detail: "Sample boards and pattern lay options." },
      { step: "Sub-floor Prep", detail: "Levelling and moisture check." },
      { step: "Install", detail: "Quarter-turn or monolithic lay." },
    ],
    faqs: [
      { q: "Can damaged tiles be replaced individually?", a: "Yes — that's the main advantage of modular tiles vs broadloom carpet. We hold attic stock for clients on request." },
    ],
  },
  {
    slug: "ips-panels",
    title: "IPS Panels",
    tagline: "Integrated Plumbing System panels for concealed washroom services.",
    category: "washroom",
    img: ipsImg,
    body: "Integrated Plumbing System (IPS) panels in compact HPL — concealing pipework while allowing full service access.",
    bullets: ["Concealed pipework", "Removable access panels", "Coordinated with cubicles"],
    overview: [
      "IPS panels hide plumbing behind a clean, full-height HPL wall while keeping every valve, cistern and trap accessible via removable service panels.",
    ],
    specs: [
      { label: "Panel Material", value: "12 mm compact HPL" },
      { label: "Access", value: "Removable face panels with security fixings" },
      { label: "Sub-frame", value: "Galvanised steel / aluminium" },
      { label: "Coordination", value: "Matched to cubicle range" },
    ],
    applications: ["Offices", "Schools", "Malls", "Hotels", "Airports"],
    process: [
      { step: "Coordination", detail: "MEP layout reviewed with the plumber." },
      { step: "Sub-frame", detail: "Steel grid set out for access points." },
      { step: "Panel Install", detail: "HPL faces fixed with concealed brackets." },
    ],
    faqs: [
      { q: "Can maintenance teams reach the pipework?", a: "Yes — every IPS run includes removable access panels at cisterns, valves and traps." },
    ],
  },
  {
    slug: "solid-surface-worktops",
    title: "Solid Surface Worktops",
    tagline: "Seamless Corian-style worktops, vanities and reception counters.",
    category: "interiors",
    img: solidSurfaceImg,
    body: "Seamless solid surface worktops, vanity tops and reception counters — fabricated with invisible joints and integrated basins.",
    bullets: ["Seamless invisible joints", "Integrated basins & sinks", "Repairable & non-porous"],
    overview: [
      "Solid surface (Corian-style) fabrication for worktops, vanities, reception desks and feature counters — joined seamlessly and finished with curves, coves and integrated basins.",
    ],
    specs: [
      { label: "Material", value: "12 mm acrylic solid surface" },
      { label: "Joints", value: "Seamless, sanded flush" },
      { label: "Edges", value: "Square, bullnose, waterfall, coved" },
      { label: "Repairs", value: "Scratches sandable on site" },
    ],
    applications: ["Reception counters", "Vanities", "Bar tops", "Hospital & lab worktops"],
    process: [
      { step: "Template", detail: "On-site template for exact fit." },
      { step: "Fabrication", detail: "CNC routing and seamless joining." },
      { step: "Install", detail: "Set, sealed and polished on site." },
    ],
    faqs: [
      { q: "How is it different from quartz or stone?", a: "Solid surface is fully repairable and seamless — scratches and minor damage can be sanded out, and joins are invisible. Quartz is harder but joints are always visible." },
    ],
  },
  {
    slug: "hpl-benches",
    title: "HPL Benches",
    tagline: "Waterproof, heavy-duty HPL benches for locker rooms and gyms.",
    category: "washroom",
    img: benchImg,
    body: "Heavy-duty modular changing room benches fabricated from compact High Pressure Laminate (HPL). Designed for high-traffic gym locker rooms and wet areas.",
    bullets: ["Fully waterproof & impact resistant", "Stainless steel or powder-coated legs", "Custom sizes and configurations"],
    overview: [
      "Our HPL benches are engineered specifically for wet and humid environments like gym locker rooms, pool changing areas, and industrial staff rooms.",
      "Fabricated from 12mm or thicker compact HPL with heavy-duty metal frameworks, they provide a hygienic, non-porous seating solution that won't warp, rot, or degrade."
    ],
    specs: [
      { label: "Seat Material", value: "12 mm – 20 mm compact HPL" },
      { label: "Framework", value: "Powder-coated steel or SS 304/316" },
      { label: "Design", value: "Slatted or solid top, optional shoe racks" },
      { label: "Moisture Resistance", value: "100% Waterproof" }
    ],
    applications: ["Gyms & fitness centers", "Swimming pools & spas", "Schools & university sports facilities", "Industrial staff locker rooms"],
    process: [
      { step: "Design & Measurement", detail: "Assessing space to maximize seating capacity and flow." },
      { step: "Fabrication", detail: "CNC cutting of HPL and frame fabrication." },
      { step: "Installation", detail: "Secure anchoring to floors or walls." }
    ],
    faqs: [
      { q: "Can these be installed in wet areas like shower rooms?", a: "Yes, compact HPL is completely waterproof, making it the perfect material for wet area seating." },
      { q: "Can we integrate shoe racks under the benches?", a: "Absolutely. We can custom-design the metal framework to include shoe racks or cubbies beneath the bench seats." }
    ]
  }
];

export const getService = (slug: string) =>
  services.find((s) => s.slug === slug);