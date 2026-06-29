import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/services/$")({
  head: () => ({
    meta: [
      { title: "Service not found — Nexus Line Furniture" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: ServicesNotFound,
});

function ServicesNotFound() {
  return (
    <section className="mx-auto max-w-3xl px-6 py-32 text-center">
      <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">404</p>
      <h1 className="mt-4 font-serif text-4xl sm:text-5xl">Service not found</h1>
      <p className="mt-4 text-muted-foreground">
        The service you're looking for doesn't exist or has been moved.
      </p>
      <div className="mt-8 flex justify-center gap-3">
        <Link
          to="/services"
          className="rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground hover:opacity-90"
        >
          Browse all services
        </Link>
        <Link
          to="/contact"
          className="rounded-md border border-border px-5 py-2.5 text-sm font-medium hover:bg-accent"
        >
          Contact us
        </Link>
      </div>
    </section>
  );
}