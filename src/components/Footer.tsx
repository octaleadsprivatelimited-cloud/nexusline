import { Link } from "@tanstack/react-router";
import { Mail, Phone, MapPin } from "lucide-react";

export function Footer() {
  return (
    <footer className="w-full border-t border-border/60 bg-background">
      <div className="mx-auto max-w-7xl px-6 py-16">
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
                <MapPin className="mt-0.5 h-4 w-4 text-primary" /> Dubai, United Arab Emirates
              </li>
              <li>
                <a href="tel:+971568277869" className="flex items-start gap-2 hover:text-primary">
                  <Phone className="mt-0.5 h-4 w-4 text-primary" /> +971 56 827 7869
                </a>
              </li>
              <li className="flex items-start gap-2">
                <Mail className="mt-0.5 h-4 w-4 text-primary" /> sales@nexuslinefurniture.ae
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-border/60 pt-6 sm:flex-row">
          <p className="whitespace-nowrap text-[10px] uppercase tracking-[0.15em] text-muted-foreground sm:text-xs sm:tracking-[0.2em]">
            &copy; {new Date().getFullYear()} Nexus Line Furniture. All rights reserved.
          </p>
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
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
