import { Link } from "@tanstack/react-router";
import { Mail, Phone, MapPin } from "lucide-react";
import footerBg from "@/assets/hero-contact.jpg";

export function Footer() {
  return (
    <footer className="relative isolate w-full overflow-hidden border-t border-border/60 bg-background">
      <img
        src={footerBg}
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 h-full w-full object-cover opacity-[0.08]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-background via-background/85 to-background"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-32 left-1/2 -z-10 h-[420px] w-[820px] -translate-x-1/2 rounded-full bg-primary/10 blur-3xl"
      />
      <div className="relative mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-12 md:grid-cols-4">
          <div className="md:col-span-2">
            <Link to="/" className="font-serif text-2xl font-semibold text-foreground">
              Nexus<span className="text-primary"> Line</span> Furniture
            </Link>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-muted-foreground">
              Crafting premium HPL cubicles, lockers, partitions and interior
              joinery for landmark projects across the United Arab Emirates.
            </p>
          </div>

          <div>
            <h4 className="font-serif text-sm uppercase tracking-[0.25em] text-primary">
              Explore
            </h4>
            <ul className="mt-5 space-y-3 text-sm text-muted-foreground">
              <li><Link to="/services" className="hover:text-primary">Services</Link></li>
              <li><Link to="/projects" className="hover:text-primary">Projects</Link></li>
              <li><Link to="/about" className="hover:text-primary">About</Link></li>
              <li><Link to="/contact" className="hover:text-primary">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-serif text-sm uppercase tracking-[0.25em] text-primary">
              Reach Us
            </h4>
            <ul className="mt-5 space-y-3 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4 text-primary" /> Dubai & Ajman, United Arab Emirates
              </li>
              <li>
                <a href="tel:+971505097864" className="flex items-start gap-2 hover:text-primary">
                  <Phone className="mt-0.5 h-4 w-4 text-primary" /> +971 50 509 7864
                </a>
              </li>
              <li className="flex items-start gap-2">
                <Mail className="mt-0.5 h-4 w-4 text-primary" /> sales@nexuslinefurniture.ae
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 overflow-hidden border-t border-border/60 pt-6 sm:flex-row">
          <p
            className="whitespace-nowrap uppercase text-muted-foreground"
            style={{
              fontSize: "clamp(0.625rem, 1.6vw, 0.75rem)",
              letterSpacing: "clamp(0.1em, 0.4vw, 0.2em)",
            }}
          >
            &copy; {new Date().getFullYear()} Nexus Line Furniture. All rights reserved.
          </p>
          <p
            className="whitespace-nowrap uppercase text-muted-foreground"
            style={{
              fontSize: "clamp(0.625rem, 1.6vw, 0.75rem)",
              letterSpacing: "clamp(0.1em, 0.4vw, 0.2em)",
            }}
          >
            Developed by{" "}
            <a
              href="https://www.octaleads.com"
              target="_blank"
              rel="noopener"
              className="text-primary hover:underline"
            >
              Octaleads Pvt Ltd.
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
