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
              <li><Link to="/admin" className="hover:text-primary">Admin</Link></li>
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
              <li>
                <a
                  href="https://wa.me/message/D2BSHZZKL4GWH1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-2 hover:text-primary"
                >
                  <svg className="mt-0.5 h-4 w-4 text-primary" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.457L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.42 9.864-9.864.002-2.637-1.03-5.115-2.906-6.99C16.255 1.876 13.779 1.082 11.99 1.082 6.55 1.082 2.122 5.511 2.119 10.95c-.001 1.714.453 3.39 1.317 4.873l-.994 3.634 3.725-.976zm11.516-7.093c-.307-.153-1.815-.896-2.096-.997-.281-.1-.486-.15-.69.15-.205.3-.79.996-.969 1.2-.178.204-.356.23-.663.077-1.282-.64-2.14-1.082-2.983-2.533-.222-.38.222-.353.637-1.18.069-.13.035-.24-.017-.343-.053-.102-.486-1.173-.665-1.603-.175-.42-.367-.363-.506-.37-.13-.007-.28-.008-.43-.008-.15 0-.393.056-.6.282-.206.226-.787.77-0.787 1.878s.804 2.18 0.916 2.33c.112.15 1.582 2.415 3.832 3.387.535.23 0.954.368 1.28.472.537.171 1.026.147 1.412.09.43-.063 1.815-.742 2.072-1.42.257-.678.257-1.26.18-1.378-.078-.117-.281-.194-.588-.347z"/>
                  </svg>
                  <span>Message Abdul Wahed on WhatsApp</span>
                </a>
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
