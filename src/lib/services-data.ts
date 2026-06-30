import cubiclesImg from "@/assets/service-cubicles.jpg";
import lockersImg from "@/assets/service-lockers.jpg";
import claddingImg from "@/assets/service-cladding.jpg";
import urinalImg from "@/assets/service-urinal.jpg";
import vanitiesImg from "@/assets/service-vanities.jpg";
import kitchenImg from "@/assets/service-kitchen.jpg";
import officeFurnitureImg from "@/assets/service-office-furniture.jpg";
import carpetImg from "@/assets/service-carpet.jpg";
import ipsImg from "@/assets/service-ips.jpg";
import labImg from "@/assets/service-lab.jpg";
import solidSurfaceImg from "@/assets/service-solid-surface.jpg";

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
    img: cubiclesImg,
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
    img: doorsImg,
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
    slug: "office-furniture",
    title: "Office Furniture",
    tagline: "Workstations, executive desks, meeting tables and storage units.",
    category: "office",
    img: desksImg,
    body: "Complete office furniture packages — workstations, executive desks, meeting tables, credenzas and storage — manufactured and installed in-house.",
    bullets: ["Workstations & executive desks", "Meeting & boardroom tables", "Storage, credenzas & pedestals"],
    overview: [
      "Turnkey office furniture for corporate fit-outs across the UAE — coordinated with your partition system, branding and cable management strategy.",
    ],
    specs: [
      { label: "Tops", value: "HPL, veneer or solid surface" },
      { label: "Frames", value: "Powder-coated steel, height options" },
      { label: "Storage", value: "Pedestals, credenzas, tambour units" },
      { label: "Cable Mgmt", value: "Integrated trays and grommets" },
    ],
    applications: ["Corporate HQs", "Coworking", "Executive offices", "Boardrooms"],
    process: [
      { step: "Space Plan", detail: "Layout aligned to headcount and workflow." },
      { step: "Fabrication", detail: "Tops, frames and storage built to spec." },
      { step: "Install", detail: "Delivered and assembled on site." },
    ],
    faqs: [
      { q: "Can you match an existing furniture range?", a: "Yes — we replicate tops, edges and frame colours so additions sit alongside existing pieces seamlessly." },
    ],
  },
  {
    slug: "carpet-tiles",
    title: "Carpet Tiles",
    tagline: "Commercial-grade modular carpet tiles, supplied and installed.",
    category: "interiors",
    img: officeImg,
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
    img: cubiclesImg,
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
    slug: "lab-furniture",
    title: "Lab Furniture",
    tagline: "Laboratory benches, fume hoods and storage built for science.",
    category: "office",
    img: desksImg,
    body: "Laboratory benches, fume hood enclosures, sink units and storage — built with chemical-resistant tops and powder-coated steel frames.",
    bullets: ["Chemical-resistant tops", "Fume hoods & sink units", "Powder-coated steel frames"],
    overview: [
      "Purpose-built lab furniture for schools, universities, R&D centres and quality-control labs — engineered for chemical resistance, ventilation and ergonomics.",
    ],
    specs: [
      { label: "Worktop", value: "Phenolic resin / epoxy / compact HPL" },
      { label: "Frames", value: "Powder-coated steel, C-frame or H-frame" },
      { label: "Storage", value: "Under-bench cabinets, reagent shelves" },
      { label: "Services", value: "Integrated gas, water & power" },
    ],
    applications: ["Schools & universities", "Research labs", "QC & testing labs", "Hospital labs"],
    process: [
      { step: "Lab Planning", detail: "Workflow, services and ventilation reviewed." },
      { step: "Fabrication", detail: "Tops, cabinets and frames built to spec." },
      { step: "Install", detail: "Services connected via licensed sub-contractors." },
    ],
    faqs: [
      { q: "What worktop do you recommend?", a: "For wet chemistry, phenolic resin or epoxy — they handle solvents, acids and constant moisture. Compact HPL suits dry labs and prep areas." },
    ],
  },
  {
    slug: "solid-surface-worktops",
    title: "Solid Surface Worktops",
    tagline: "Seamless Corian-style worktops, vanities and reception counters.",
    category: "interiors",
    img: claddingImg,
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
];

export const getService = (slug: string) =>
  services.find((s) => s.slug === slug);