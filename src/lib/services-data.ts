import cubiclesImg from "@/assets/service-cubicles.jpg";
import lockersImg from "@/assets/service-lockers.jpg";
import officeImg from "@/assets/service-office.jpg";
import claddingImg from "@/assets/service-cladding.jpg";

export type ServiceDetail = {
  slug: string;
  title: string;
  tagline: string;
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
    slug: "hpl-toilet-cubicles",
    title: "HPL Toilet Cubicles",
    tagline: "Compact-grade washroom cubicles built to outlast the building.",
    img: cubiclesImg,
    body: "Floor-to-ceiling and standard-height cubicles in 12 mm compact HPL, with stainless steel hardware and concealed fixings.",
    bullets: ["12mm compact-grade HPL", "Marine-grade stainless hardware", "200+ finishes & woodgrains"],
    overview: [
      "Our toilet cubicles are fabricated from 12 mm compact-grade High Pressure Laminate — a fully waterproof, impact-resistant panel ideal for high-traffic UAE washrooms.",
      "Each cubicle is fully prefabricated in our Sharjah workshop, then installed on site by our in-house crew with marine-grade stainless steel hardware that won't corrode in humid conditions.",
    ],
    specs: [
      { label: "Panel Thickness", value: "12 mm / 13 mm compact HPL" },
      { label: "Standard Height", value: "2000 mm (custom up to 2700 mm)" },
      { label: "Hardware", value: "SS 316 marine-grade" },
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
    slug: "hpl-urinal-partitions",
    title: "HPL Urinal Partitions & Screens",
    tagline: "Hygienic urinal screens engineered for high-traffic restrooms.",
    img: cubiclesImg,
    body: "Sanitary urinal screens with chamfered edges and anti-vandal fixings — engineered for high-traffic public restrooms.",
    bullets: ["Hygienic, non-porous surface", "Floor & wall mounting options", "Custom heights & widths"],
    overview: [
      "Compact HPL urinal screens with chamfered, sealed edges that resist moisture, graffiti and impact — the right call for malls, schools and transit washrooms.",
      "Available in wall-mounted, floor-mounted and floor-to-ceiling configurations with anti-vandal stainless fixings.",
    ],
    specs: [
      { label: "Panel Thickness", value: "12 mm compact HPL" },
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
    slug: "hpl-lockers",
    title: "HPL Lockers",
    tagline: "Modular locker walls for gyms, hotels, staff rooms and schools.",
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
    slug: "office-cubicles-partitions",
    title: "Office Cubicles & Partitions",
    tagline: "Acoustic workstations and meeting pods, built around your floorplate.",
    img: officeImg,
    body: "Acoustic workstations and meeting pods built around your floorplate, brand palette and workplace strategy.",
    bullets: ["Acoustic-rated panels", "Cable management built-in", "Glass, fabric & HPL combinations"],
    overview: [
      "Bespoke workstation systems combining HPL, fabric-wrapped acoustic panels and glazing — designed around how your teams actually work.",
      "All cabling and power routing is concealed inside the partition system for a clean, future-proof finish.",
    ],
    specs: [
      { label: "Panel Heights", value: "1200 / 1600 / 2100 mm" },
      { label: "Acoustic Rating", value: "Up to 35 dB reduction" },
      { label: "Materials", value: "HPL, fabric, glass, veneer" },
      { label: "Power", value: "Integrated raceway & GPOs" },
    ],
    applications: ["Open-plan offices", "Call centres", "Coworking spaces", "Meeting pods & phone booths"],
    process: [
      { step: "Workplace Audit", detail: "Headcount, density and acoustic needs." },
      { step: "Space Planning", detail: "2D and 3D layouts with finish samples." },
      { step: "Installation", detail: "Phased install around live operations." },
    ],
    faqs: [
      { q: "Can you work after hours?", a: "Yes — we routinely install over weekends and night shifts to minimise downtime." },
    ],
  },
  {
    slug: "hpl-doors-wooden-works",
    title: "HPL Doors & Wooden Works",
    tagline: "Solid HPL doors, framed joinery and bespoke carpentry.",
    img: cubiclesImg,
    body: "Solid HPL doors, framed joinery and bespoke wooden works installed by our in-house carpentry crew.",
    bullets: ["Fire-rated options", "Custom ironmongery", "Site-finished and pre-finished"],
    overview: [
      "Heavy-duty HPL doors and custom joinery handled entirely by our in-house carpentry team — from a single bathroom door to a full hotel guest-room package.",
    ],
    specs: [
      { label: "Door Leaf", value: "40–55 mm HPL faced" },
      { label: "Fire Rating", value: "30 / 60 / 90 minutes (optional)" },
      { label: "Frames", value: "Steel, aluminium or hardwood" },
      { label: "Ironmongery", value: "Dorma, Hafele, Yale" },
    ],
    applications: ["Hotel guest rooms", "Offices & meeting rooms", "Service & utility doors", "Residential villas"],
    process: [
      { step: "Sample Approval", detail: "Finish and ironmongery samples on site." },
      { step: "Fabrication", detail: "Engineered cores with HPL facing." },
      { step: "Installation", detail: "Hung, adjusted and ironmongery fitted." },
    ],
    faqs: [
      { q: "Do you supply civil-defence compliant fire doors?", a: "Yes — certified 30/60/90-minute door sets with full documentation." },
    ],
  },
  {
    slug: "hpl-desks-tabletops-benches",
    title: "HPL Desks, Tabletops & Benches",
    tagline: "Hard-wearing tabletops, benches and changing-room seating.",
    img: lockersImg,
    body: "Hard-wearing tabletops, benches and changing-room seating in HPL with steel or timber frames.",
    bullets: ["Scratch & heat resistant", "Indoor & semi-outdoor grade", "Custom edge profiles"],
    overview: [
      "Worktops, canteen tables, lab benches and changing-room seating in compact HPL — engineered for environments where standard MDF or wood would fail.",
    ],
    specs: [
      { label: "Top Thickness", value: "12–25 mm compact HPL" },
      { label: "Frames", value: "Powder-coated steel or timber" },
      { label: "Edge Profiles", value: "Square, bevelled, bullnose" },
      { label: "Grade", value: "Indoor & semi-outdoor" },
    ],
    applications: ["Canteens & break rooms", "Laboratories", "Changing rooms", "Outdoor terraces", "Education furniture"],
    process: [
      { step: "Spec", detail: "Top size, edge profile and frame style." },
      { step: "Fabrication", detail: "CNC-cut tops, welded frames." },
      { step: "Delivery", detail: "Assembled on site." },
    ],
    faqs: [
      { q: "Are the tops heat resistant?", a: "Compact HPL handles short-term contact with hot pots and lab equipment without scorching." },
    ],
  },
  {
    slug: "wall-cladding",
    title: "Wall Cladding",
    tagline: "Architectural wall panelling for lobbies, retail and hospitality.",
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
    slug: "interior-exterior-decor",
    title: "Interior & Exterior Decor",
    tagline: "End-to-end fit-out and exterior HPL facade detailing.",
    img: claddingImg,
    body: "End-to-end interior fit-out and exterior HPL facade detailing — one accountable partner, full handover.",
    bullets: ["Design + build", "MEP coordination", "Snag-free handover"],
    overview: [
      "We act as a single accountable contractor for fit-out projects — from concept and approvals through MEP coordination, joinery and final handover.",
    ],
    specs: [
      { label: "Scope", value: "Design + Build" },
      { label: "MEP", value: "Coordinated with sub-contractors" },
      { label: "Approvals", value: "Authority drawings included" },
      { label: "Handover", value: "Snag-free, with O&M manuals" },
    ],
    applications: ["Office fit-outs", "Retail roll-outs", "F&B venues", "Villa interiors", "Exterior HPL facades"],
    process: [
      { step: "Concept", detail: "Mood boards and 3D walkthroughs." },
      { step: "Approvals", detail: "Landlord and authority submissions." },
      { step: "Build", detail: "Joinery, MEP and finishes on programme." },
      { step: "Handover", detail: "Snag list closed before key handover." },
    ],
    faqs: [
      { q: "Do you handle authority approvals?", a: "Yes — Dubai Municipality, Trakhees, DCD and free-zone approvals are part of our standard service." },
    ],
  },
];

export const getService = (slug: string) =>
  services.find((s) => s.slug === slug);