import { Link } from "@tanstack/react-router";
import { Menu, X, Phone, ChevronDown } from "lucide-react";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import logo from "@/assets/nexus-logo.png";
import { services } from "@/lib/services-data";

const links = [
  { to: "/", label: "Home" },
  { to: "/projects", label: "Projects" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
] as const;

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-[#000932] text-white backdrop-blur-md">
      <div className="relative mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:h-16 sm:px-6">
        <Link to="/" aria-label="Nexus Line Furniture — home" className="flex items-center">
          <img
            src={logo}
            alt="Nexus Line Furniture"
            className="h-10 w-auto sm:h-12 object-contain"
          />
        </Link>

        <nav className="hidden items-center gap-7 lg:flex">
          <Link to="/" activeProps={{ className: "!text-white" }} className="text-[12px] uppercase tracking-[0.16em] text-white/70 transition-colors hover:text-white">Home</Link>
          <div
            className="relative"
            onMouseEnter={() => setServicesOpen(true)}
            onMouseLeave={() => setServicesOpen(false)}
          >
            <Link
              to="/services"
              activeProps={{ className: "!text-white" }}
              className="flex items-center gap-1 text-[12px] uppercase tracking-[0.16em] text-white/70 transition-colors hover:text-white"
            >
              Services <ChevronDown className="h-3 w-3" />
            </Link>
            <AnimatePresence>
              {servicesOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  transition={{ duration: 0.18 }}
                  className="absolute left-1/2 top-full z-50 w-[320px] -translate-x-1/2 border border-white/10 bg-[#000932] py-2 shadow-2xl"
                >
                  {services.map((s) => (
                    <Link
                      key={s.slug}
                      to="/services/$slug"
                      params={{ slug: s.slug }}
                      onClick={() => setServicesOpen(false)}
                      className="block px-5 py-2.5 text-[12px] uppercase tracking-[0.15em] text-white/75 hover:bg-white/5 hover:text-white"
                    >
                      {s.title}
                    </Link>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          {links.slice(1).map((link) => (
            <Link
              key={link.to}
              to={link.to}
              activeProps={{ className: "!text-white" }}
              className="text-[12px] uppercase tracking-[0.16em] text-white/70 transition-colors hover:text-white"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <a
            href="tel:+971505097864"
            className="flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-white/80 hover:text-white"
          >
            <Phone className="h-3.5 w-3.5" /> +971 50 509 7864
          </a>
          <Link
            to="/contact"
            className="rounded-none border border-white bg-white px-4 py-2 text-[10px] font-medium uppercase tracking-[0.18em] text-[#000932] transition-colors hover:bg-transparent hover:text-white"
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
            className="absolute left-0 right-0 top-full origin-top overflow-hidden border-b border-white/10 bg-[#000932] text-white shadow-xl lg:hidden"
          >
            <nav className="flex flex-col gap-5 px-6 py-6">
              <motion.div
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.05, duration: 0.25 }}
              >
                <Link to="/" onClick={() => setOpen(false)} className="text-sm uppercase tracking-[0.2em] text-white/80 hover:text-white">Home</Link>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1, duration: 0.25 }}
              >
                <button
                  onClick={() => setMobileServicesOpen((v) => !v)}
                  className="flex w-full items-center justify-between text-sm uppercase tracking-[0.2em] text-white/80 hover:text-white"
                >
                  Services <ChevronDown className={`h-4 w-4 transition-transform ${mobileServicesOpen ? "rotate-180" : ""}`} />
                </button>
                <AnimatePresence>
                  {mobileServicesOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="mt-3 flex flex-col gap-3 border-l border-white/15 pl-4">
                        <Link to="/services" onClick={() => setOpen(false)} className="text-[11px] uppercase tracking-[0.18em] text-white/60 hover:text-white">All Services</Link>
                        {services.map((s) => (
                          <Link
                            key={s.slug}
                            to="/services/$slug"
                            params={{ slug: s.slug }}
                            onClick={() => setOpen(false)}
                            className="text-[11px] uppercase tracking-[0.18em] text-white/70 hover:text-white"
                          >
                            {s.title}
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
              {links.slice(1).map((link, i) => (
                <motion.div
                  key={link.to}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.15 + i * 0.05, duration: 0.25 }}
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
                  className="mt-2 inline-flex w-fit border border-white bg-white px-5 py-2.5 text-[11px] uppercase tracking-[0.2em] text-[#000932]"
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
