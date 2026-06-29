import { Link } from "@tanstack/react-router";
import { Menu, X, Phone } from "lucide-react";
import { useState } from "react";

const links = [
  { to: "/", label: "Home" },
  { to: "/services", label: "Services" },
  { to: "/projects", label: "Projects" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
] as const;

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/85 backdrop-blur-md">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
        <Link to="/" className="flex items-baseline gap-2">
          <span className="font-serif text-2xl font-semibold tracking-tight text-foreground">
            Nexus<span className="text-primary"> Line</span>
          </span>
          <span className="hidden text-[10px] uppercase tracking-[0.3em] text-muted-foreground sm:inline">
            Furniture
          </span>
        </Link>

        <nav className="hidden items-center gap-9 lg:flex">
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              activeProps={{ className: "text-primary" }}
              className="text-[13px] uppercase tracking-[0.18em] text-muted-foreground transition-colors hover:text-primary"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <a
            href="tel:+971000000000"
            className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-muted-foreground hover:text-primary"
          >
            <Phone className="h-3.5 w-3.5" /> +971 00 000 0000
          </a>
          <Link
            to="/contact"
            className="rounded-none border border-primary bg-primary px-5 py-2.5 text-[11px] font-medium uppercase tracking-[0.2em] text-primary-foreground transition-colors hover:bg-transparent hover:text-primary"
          >
            Get a Quote
          </Link>
        </div>

        <button
          className="lg:hidden"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-border/60 px-6 py-6 lg:hidden">
          <nav className="flex flex-col gap-5">
            {links.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setOpen(false)}
                className="text-sm uppercase tracking-[0.2em] text-muted-foreground hover:text-primary"
              >
                {link.label}
              </Link>
            ))}
            <Link
              to="/contact"
              onClick={() => setOpen(false)}
              className="mt-2 inline-flex w-fit border border-primary bg-primary px-5 py-2.5 text-[11px] uppercase tracking-[0.2em] text-primary-foreground"
            >
              Get a Quote
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
