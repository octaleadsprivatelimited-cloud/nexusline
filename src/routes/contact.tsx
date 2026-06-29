import { createFileRoute } from "@tanstack/react-router";
import { Mail, MapPin, Phone, ArrowRight, Clock } from "lucide-react";
import { useState } from "react";
import heroContact from "@/assets/hero-contact.jpg";
import claddingImg from "@/assets/service-cladding.jpg";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Nexus Line Furniture" },
      { name: "description", content: "Request a quote or site visit from Nexus Line Furniture — HPL cubicles, lockers and interiors across the UAE." },
      { property: "og:title", content: "Contact — Nexus Line Furniture" },
      { property: "og:description", content: "Request a quote or site visit across the UAE." },
      { property: "og:url", content: "/contact" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: Contact,
});

function Contact() {
  const [sent, setSent] = useState(false);

  return (
    <>
      <section className="relative isolate overflow-hidden border-b border-border/60">
        <img
          src={heroContact}
          alt="Nexus Line Furniture studio reception"
          width={1920}
          height={1080}
          className="absolute inset-0 -z-10 h-full w-full object-cover"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-background/95 via-background/80 to-background/40" />
        <div className="mx-auto max-w-7xl px-5 pb-16 pt-24 sm:px-6 sm:pb-24 sm:pt-32 md:pt-40">
          <span className="text-[11px] uppercase tracking-[0.3em] text-primary sm:text-xs">Get in touch</span>
          <h1 className="mt-4 max-w-4xl font-serif text-[2.25rem] leading-[1.1] text-foreground sm:mt-6 sm:text-5xl md:text-6xl">
            Let's discuss your project.
          </h1>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:mt-6 sm:text-base">
            Share a few details and our team will respond within one business
            day with a tailored quote and, where helpful, a free site visit.
          </p>
        </div>
      </section>

      <section className="relative isolate overflow-hidden">
        <img src={claddingImg} alt="" aria-hidden="true" className="absolute inset-0 -z-10 h-full w-full object-cover opacity-[0.05]" />
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-b from-background via-background/92 to-background" />
        <div className="relative mx-auto grid max-w-7xl gap-10 px-5 py-14 sm:px-6 sm:py-24 lg:grid-cols-[1fr_1.3fr] lg:gap-16">
        <div className="order-2 space-y-6 sm:space-y-8 lg:order-1">
          <div className="border-l-2 border-primary bg-card/40 p-6">
            <p className="text-xs uppercase tracking-[0.25em] text-primary">Speak with our team</p>
            <p className="mt-3 font-serif text-2xl leading-snug text-foreground">
              Planning a fit-out? Call us for a free consultation and same-day quote.
            </p>
          </div>
          {[
            { icon: MapPin, label: "Studio", value: "Dubai, United Arab Emirates", href: undefined as string | undefined },
            { icon: Phone, label: "Phone", value: "+971 56 827 7869", href: "tel:+971568277869" },
            { icon: Mail, label: "Email", value: "sales@nexuslinefurniture.ae", href: "mailto:sales@nexuslinefurniture.ae" },
          ].map(({ icon: Icon, label, value, href }) => (
            <div key={label} className="border-b border-border/60 pb-6">
              <div className="flex items-center gap-3 text-xs uppercase tracking-[0.25em] text-primary">
                <Icon className="h-4 w-4" /> {label}
              </div>
              {href ? (
                <a href={href} className="mt-3 block font-serif text-2xl text-foreground hover:text-primary">{value}</a>
              ) : (
                <p className="mt-3 font-serif text-2xl text-foreground">{value}</p>
              )}
            </div>
          ))}
          <div className="border-b border-border/60 pb-6">
            <div className="flex items-center gap-3 text-xs uppercase tracking-[0.25em] text-primary">
              <Clock className="h-4 w-4" /> Business Hours
            </div>
            <dl className="mt-3 space-y-1.5 text-sm text-muted-foreground">
              <div className="flex justify-between gap-6">
                <dt>Saturday – Thursday</dt>
                <dd className="text-foreground">9:00 AM – 7:00 PM</dd>
              </div>
              <div className="flex justify-between gap-6">
                <dt>Friday</dt>
                <dd className="text-foreground">Closed</dd>
              </div>
            </dl>
          </div>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            setSent(true);
          }}
          className="order-1 space-y-5 border border-border/60 bg-card p-5 sm:space-y-6 sm:p-8 md:p-10 lg:order-2"
        >
          <div className="grid gap-6 sm:grid-cols-2">
            <Field label="Name" name="name" />
            <Field label="Company" name="company" required={false} />
            <Field label="Email" name="email" type="email" />
            <Field label="Phone" name="phone" />
          </div>
          <Field label="Project type" name="type" placeholder="e.g. HPL toilet cubicles for a hotel" />
          <div>
            <label className="text-xs uppercase tracking-[0.25em] text-muted-foreground">
              Project details
            </label>
            <textarea
              name="message"
              rows={5}
              required
              className="mt-2 w-full border border-border bg-background px-4 py-3 text-sm text-foreground outline-none focus:border-primary"
            />
          </div>
          <button
            type="submit"
            className="inline-flex items-center gap-3 border border-primary bg-primary px-7 py-3.5 text-[11px] font-medium uppercase tracking-[0.25em] text-primary-foreground transition-colors hover:bg-transparent hover:text-primary"
          >
            Send Enquiry <ArrowRight className="h-4 w-4" />
          </button>
          {sent && (
            <p className="text-sm text-primary">
              Thank you — your enquiry has been received. We'll be in touch shortly.
            </p>
          )}
        </form>
      </section>
    </>
  );
}

function Field({
  label,
  name,
  type = "text",
  required = true,
  placeholder,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
}) {
  return (
    <div>
      <label className="text-xs uppercase tracking-[0.25em] text-muted-foreground">
        {label}
      </label>
      <input
        type={type}
        name={name}
        required={required}
        placeholder={placeholder}
        className="mt-2 w-full border border-border bg-background px-4 py-3 text-sm text-foreground outline-none focus:border-primary"
      />
    </div>
  );
}
