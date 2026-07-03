import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, Check } from "lucide-react";
import { useState } from "react";
import { getService, type ServiceDetail as ServiceData } from "@/lib/services-data";

export const Route = createFileRoute("/services/$slug")({
  loader: ({ params }) => {
    const service = getService(params.slug);
    if (!service) throw notFound();
    return { service };
  },
  head: ({ loaderData }) => {
    const s = loaderData?.service;
    const title = s ? `${s.title} — Nexus Line Furniture` : "Service — Nexus Line Furniture";
    const desc = s?.tagline ?? "HPL cubicles, lockers and interiors across the UAE.";
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
        { property: "og:type", content: "article" },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: title },
        { name: "twitter:description", content: desc },
        ...(s
          ? [
              { property: "og:url", content: `/services/${s.slug}` },
              { property: "og:image", content: s.img },
              { name: "twitter:image", content: s.img },
            ]
          : []),
      ],
      links: s ? [{ rel: "canonical", href: `/services/${s.slug}` }] : [],
    };
  },
  notFoundComponent: () => (
    <div className="mx-auto max-w-3xl px-6 py-32 text-center">
      <h1 className="font-serif text-4xl">Service not found</h1>
      <Link to="/services" className="mt-6 inline-block text-primary hover:underline">
        Back to all services
      </Link>
    </div>
  ),
  errorComponent: ({ error, reset }) => (
    <div className="mx-auto max-w-3xl px-6 py-32 text-center">
      <h1 className="font-serif text-3xl">Something went wrong</h1>
      <p className="mt-3 text-sm text-muted-foreground">{error.message}</p>
      <button onClick={reset} className="mt-6 text-primary hover:underline">Try again</button>
    </div>
  ),
  component: ServiceDetail,
});

function ServiceDetail() {
  const { service } = Route.useLoaderData() as { service: ServiceData };

  return (
    <>
      <section className="relative isolate overflow-hidden border-b border-border/60 bg-card">
        <div className="absolute inset-0 -z-10 bg-muted">
          <img src={service.img} alt="" className="h-full w-full object-cover" />
          <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-background to-transparent" />
        </div>
        <div className="mx-auto max-w-7xl px-6 pb-20 pt-28">
          <div className="max-w-fit border border-border/50 bg-white/70 p-8 shadow-xl backdrop-blur-md sm:p-12">
            <Link
              to="/services"
              className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-muted-foreground hover:text-primary"
            >
              <ArrowLeft className="h-3.5 w-3.5" /> All Services
            </Link>
            <h1 className="mt-6 max-w-4xl font-serif text-5xl leading-[1.05] text-foreground md:text-6xl">
              {service.title}
            </h1>
            <p className="mt-5 max-w-2xl text-lg font-medium text-foreground">{service.tagline}</p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="grid gap-14 lg:grid-cols-[1.4fr_1fr]">
          <div>
            <span className="text-xs uppercase tracking-[0.3em] text-primary">Overview</span>
            <div className="mt-5 space-y-5 text-base leading-relaxed text-muted-foreground">
              {service.overview.map((p) => <p key={p}>{p}</p>)}
            </div>

            <h2 className="mt-14 font-serif text-3xl text-foreground">Applications</h2>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {service.applications.map((a) => (
                <li key={a} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <Check className="mt-0.5 h-4 w-4 text-primary" /> {a}
                </li>
              ))}
            </ul>

            <h2 className="mt-14 font-serif text-3xl text-foreground">Our Process</h2>
            <ol className="mt-6 space-y-5">
              {service.process.map((p, i) => (
                <li key={p.step} className="flex gap-5 border-l border-border/60 pl-5">
                  <span className="text-xs font-medium uppercase tracking-[0.25em] text-primary">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="font-serif text-lg text-foreground">{p.step}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">{p.detail}</p>
                  </div>
                </li>
              ))}
            </ol>

            {service.faqs.length > 0 && (
              <>
                <h2 className="mt-14 font-serif text-3xl text-foreground">FAQs</h2>
                <div className="mt-6 space-y-5">
                  {service.faqs.map((f) => (
                    <div key={f.q} className="border border-border/60 bg-card p-6">
                      <h3 className="font-serif text-lg text-foreground">{f.q}</h3>
                      <p className="mt-2 text-sm text-muted-foreground">{f.a}</p>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>

          <aside className="space-y-8 lg:sticky lg:top-28 lg:self-start">
            <div className="border border-border/60 bg-card p-8">
              <span className="text-xs uppercase tracking-[0.3em] text-primary">Specifications</span>
              <dl className="mt-5 divide-y divide-border/60">
                {service.specs.map((s) => (
                  <div key={s.label} className="flex justify-between gap-4 py-3 text-sm">
                    <dt className="text-muted-foreground">{s.label}</dt>
                    <dd className="text-right font-medium text-foreground">{s.value}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <QuoteForm serviceTitle={service.title} />
          </aside>
        </div>
      </section>
    </>
  );
}

function QuoteForm({ serviceTitle }: { serviceTitle: string }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [sent, setSent] = useState(false);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedName = name.trim().slice(0, 100);
    const trimmedPhone = phone.trim().slice(0, 30);
    if (!trimmedName || !trimmedPhone) return;
    const text = encodeURIComponent(
      `Hi Nexus Line Furniture,\n\nI'd like a quote for: ${serviceTitle}\nName: ${trimmedName}\nPhone: ${trimmedPhone}`,
    );
    window.open(`https://wa.me/971568277869?text=${text}`, "_blank", "noopener");
    setSent(true);
  };

  return (
    <div className="border border-primary bg-primary/5 p-8">
      <h3 className="font-serif text-2xl text-foreground">Request a Quote</h3>
      <p className="mt-2 text-sm text-muted-foreground">
        Leave your name and number — our team replies within 24 hours.
      </p>
      <form onSubmit={onSubmit} className="mt-5 space-y-3">
        <input
          type="text"
          required
          maxLength={100}
          placeholder="Your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none"
        />
        <input
          type="tel"
          required
          maxLength={30}
          pattern="[0-9+\-\s()]{6,30}"
          placeholder="Phone number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-full border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none"
        />
        <button
          type="submit"
          className="w-full border border-primary bg-primary px-6 py-3 text-[11px] font-medium uppercase tracking-[0.25em] text-primary-foreground transition-colors hover:bg-transparent hover:text-primary"
        >
          {sent ? "Sent — we'll be in touch" : "Request Quote"}
        </button>
      </form>
    </div>
  );
}