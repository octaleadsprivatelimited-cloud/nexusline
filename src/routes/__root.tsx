import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  useLocation,
} from "@tanstack/react-router";
import { useEffect } from "react";
import { services } from "../lib/services-data";

import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { WhatsAppFloat } from "../components/WhatsAppFloat";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  const location = useLocation();
  const isAdmin = location.pathname.startsWith("/admin");

  useEffect(() => {
    let title = "Nexus Line Furniture — Luxury HPL Cubicles & Interiors in Dubai";
    let description = "Premium HPL toilet cubicles, lockers, office partitions, doors and wall cladding manufactured and installed across the UAE.";
    let keywords = "HPL cubicles Dubai, toilet cubicles UAE, office partitions Dubai, lockers manufacturer Dubai, luxury HPL interiors";
    const canonical = `https://nexuslinefurniture.ae${location.pathname === "/" ? "" : location.pathname}`;

    const path = location.pathname.replace(/\/$/, ""); // strip trailing slash

    if (path === "/about") {
      title = "HPL Specialists in Dubai | About Nexus Line Furniture";
      description = "Founded in Dubai, Nexus Line Furniture is an HPL and joinery specialist crafting premium commercial washrooms, locker rooms, and office interiors across the UAE.";
      keywords = "HPL specialists Dubai, joinery factory Dubai, commercial washroom fitout UAE, Nexus Line Furniture";
    } else if (path === "/services") {
      title = "HPL & Joinery Services Dubai | Toilet Cubicles, Lockers & Partitions";
      description = "Explore our premium manufacturing & installation services in Dubai: HPL toilet cubicles, lockers, vanities, wall cladding, office desks, and solid surfaces.";
      keywords = "washroom counter manufacturer, HPL vanity tops Dubai, office partition wall, locker supplier UAE";
    } else if (path.startsWith("/services/")) {
      const slug = path.split("/").pop();
      const service = services.find((s) => s.slug === slug);
      if (service) {
        title = `${service.title} Manufacturer & Installer Dubai | Nexus Line`;
        description = `${service.tagline} Custom-fabricated in our Dubai workshop and installed by our in-house carpentry crew.`;
        
        if (slug === "toilet-cubicles") {
          keywords = "HPL toilet cubicles Dubai, restroom partition supplier UAE, compact laminate cubicles, toilet partitions manufacturer, commercial washroom cubicles Dubai";
        } else if (slug === "lockers") {
          keywords = "HPL lockers Dubai, staff lockers manufacturer UAE, gym changing room lockers, school storage lockers, RFID smart locker systems Dubai";
        } else if (slug === "vanities") {
          keywords = "washroom vanity counters Dubai, solid surface vanity top, custom HPL vanity units, bathroom counter manufacturer UAE, corporate washroom vanities";
        } else if (slug === "urinal-partitions") {
          keywords = "urinal screens Dubai, urinal divider partitions UAE, washroom privacy screens, HPL urinal screens, restroom partitions manufacturer";
        } else if (slug === "wall-cladding") {
          keywords = "HPL wall cladding Dubai, interior wall panelling UAE, decorative wall panels, exterior laminate cladding, lobby wall cladding Dubai";
        } else if (slug === "kitchen-cabinets") {
          keywords = "custom kitchen cabinets Dubai, modular pantry cabinets, HPL kitchen designer UAE, office pantry cabinetry, high end kitchen joinery";
        } else if (slug === "carpet-tiles") {
          keywords = "commercial carpet tiles Dubai, office flooring solutions UAE, heavy contract carpet tile, modular carpet installation, carpet tiles supplier";
        } else if (slug === "ips-panels") {
          keywords = "IPS plumbing panels Dubai, integrated plumbing system UAE, concealed washroom ducts, duct wall cladding panels, plumbing service access panels";
        } else if (slug === "solid-surface-worktops") {
          keywords = "acrylic solid surface worktops Dubai, Corian counters supplier UAE, seamless reception desks, custom solid surface joinery, non-porous washroom tops";
        } else {
          keywords = `${service.title} Dubai, ${service.title} supplier UAE, commercial ${service.title}, custom ${service.title} Dubai`;
        }
      }
    } else if (path === "/projects") {
      title = "HPL Cubicles & Joinery Projects Portfolio Dubai | Nexus Line";
      description = "Browse our portfolio of commercial, education, hospitality, and residential fitouts delivered across Dubai, Abu Dhabi, and the UAE.";
      keywords = "fitout projects Dubai, toilet cubicle installations, HPL lockers project UAE";
    } else if (path === "/contact") {
      title = "Get a Free Site Visit & Quote | Contact Nexus Line Dubai & Ajman";
      description = "Contact Nexus Line Furniture in Dubai & Ajman for a free site survey, layout drawings, and itemized quotations. Call +971 50 509 7864 or email sales@nexuslinefurniture.ae.";
      keywords = "contact HPL supplier Dubai, contact HPL supplier Ajman, custom furniture quote UAE, office fitout quote";
    }

    // Update Document Head
    document.title = title;
    
    // Update Meta Description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute("content", description);
    } else {
      metaDesc = document.createElement("meta");
      metaDesc.setAttribute("name", "description");
      metaDesc.setAttribute("content", description);
      document.head.appendChild(metaDesc);
    }

    // Update Meta Keywords
    let metaKeywords = document.querySelector('meta[name="keywords"]');
    if (metaKeywords) {
      metaKeywords.setAttribute("content", keywords);
    } else {
      metaKeywords = document.createElement("meta");
      metaKeywords.setAttribute("name", "keywords");
      metaKeywords.setAttribute("content", keywords);
      document.head.appendChild(metaKeywords);
    }

    // Update OG Title
    let ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute("content", title);

    // Update OG Description
    let ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) ogDesc.setAttribute("content", description);

    // Update OG URL
    let ogUrl = document.querySelector('meta[property="og:url"]');
    if (ogUrl) ogUrl.setAttribute("content", canonical);

    // Update Canonical Link
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (canonicalLink) {
      canonicalLink.setAttribute("href", canonical);
    } else {
      canonicalLink = document.createElement("link");
      canonicalLink.setAttribute("rel", "canonical");
      canonicalLink.setAttribute("href", canonical);
      document.head.appendChild(canonicalLink);
    }
  }, [location.pathname]);

  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex min-h-screen flex-col">
        {!isAdmin && <Navbar />}
        <main className="flex-1">
          <Outlet />
        </main>
        {!isAdmin && <Footer />}
        {!isAdmin && <WhatsAppFloat />}
      </div>
    </QueryClientProvider>
  );
}
