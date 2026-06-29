import { createFileRoute } from "@tanstack/react-router";
import { Mail, MapPin, Phone, ArrowRight } from "lucide-react";
import { useState } from "react";

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
      <section className="border-b border-border/60">
        <div className="mx-auto max-w-7xl px-6 pb-20 pt-28">
          <span className="text-xs uppercase tracking-[0.3em] text-primary">Get in touch</span>
          <h1 className="mt-6 max-w-4xl font-serif text-5xl leading-[1.05] text-foreground md:text-6xl">
            Let's discuss your project.
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground">
            Share a few details and our team will respond within one business
            day with a tailored quote and, where helpful, a free site visit.
          </p>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-16 px-6 py-24 lg:grid-cols-[1fr_1.3fr]">
        <div className="space-y-8">
          {[
            { icon: MapPin, label: "Studio", value: "Dubai, United Arab Emirates" },
            { icon: Phone, label: "Phone", value: "+971 56 827 7869" },
            { icon: Mail, label: "Email", value: "sales@nexuslinefurniture.ae" },
          ].map(({ icon: Icon, label, value }) => (
            <div key={label} className="border-b border-border/60 pb-6">
              <div className="flex items-center gap-3 text-xs uppercase tracking-[0.25em] text-primary">
                <Icon className="h-4 w-4" /> {label}
              </div>
              <p className="mt-3 font-serif text-2xl text-foreground">{value}</p>
            </div>
          ))}
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            setSent(true);
          }}
          className="space-y-6 border border-border/60 bg-card p-8 md:p-10"
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
