import { Link } from "@tanstack/react-router";
import { Menu, X, Phone } from "lucide-react";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import logo from "@/assets/nexus-logo.png.asset.json";

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
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-[#0b1e3f] text-white backdrop-blur-md">
      <div className="relative mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
        <Link to="/" aria-label="Nexus Line Furniture — home" className="flex items-center">
          <img
            src={logo.url}
            alt="Nexus Line Furniture"
            className="h-10 w-auto sm:h-12"
          />
        </Link>

        <nav className="hidden items-center gap-9 lg:flex">
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              activeProps={{ className: "!text-white" }}
              className="text-[13px] uppercase tracking-[0.18em] text-white/70 transition-colors hover:text-white"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <a
            href="tel:+971568277869"
            className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-white/80 hover:text-white"
          >
            <Phone className="h-3.5 w-3.5" /> +971 56 827 7869
          </a>
          <Link
            to="/contact"
            className="rounded-none border border-white bg-white px-5 py-2.5 text-[11px] font-medium uppercase tracking-[0.2em] text-[#0b1e3f] transition-colors hover:bg-transparent hover:text-white"
          >
            Get a Quote
          </Link>
        </div>

        <button
          className="lg:hidden text-white"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="absolute left-0 right-0 top-full origin-top overflow-hidden border-b border-white/10 bg-[#0b1e3f] text-white shadow-xl lg:hidden"
          >
            <nav className="flex flex-col gap-5 px-6 py-6">
              {links.map((link, i) => (
                <motion.div
                  key={link.to}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 + i * 0.05, duration: 0.25 }}
                >
                  <Link
                    to={link.to}
                    onClick={() => setOpen(false)}
                    className="text-sm uppercase tracking-[0.2em] text-white/80 hover:text-white"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 + links.length * 0.05, duration: 0.25 }}
              >
                <Link
                  to="/contact"
                  onClick={() => setOpen(false)}
                  className="mt-2 inline-flex w-fit border border-white bg-white px-5 py-2.5 text-[11px] uppercase tracking-[0.2em] text-[#0b1e3f]"
                >
                  Get a Quote
                </Link>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
