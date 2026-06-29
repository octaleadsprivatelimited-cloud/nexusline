import { createFileRoute } from "@tanstack/react-router";
import { Mail, MapPin, Phone } from "lucide-react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact | Acme" },
      { name: "description", content: "Get in touch with the Acme team." },
    ],
  }),
  component: Contact,
});

function Contact() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-24">
      <h1 className="text-4xl font-bold tracking-tight text-foreground">Contact</h1>
      <p className="mt-4 text-lg text-muted-foreground">
        We would love to hear from you. Reach out using any of the channels below.
      </p>
      <div className="mt-10 grid gap-6 sm:grid-cols-3">
        <div className="rounded-xl border border-border bg-card p-6 text-card-foreground">
          <Mail className="h-6 w-6 text-primary" />
          <p className="mt-3 text-sm font-medium">Email</p>
          <p className="mt-1 text-sm text-muted-foreground">hello@acme.co</p>
        </div>
        <div className="rounded-xl border border-border bg-card p-6 text-card-foreground">
          <Phone className="h-6 w-6 text-primary" />
          <p className="mt-3 text-sm font-medium">Phone</p>
          <p className="mt-1 text-sm text-muted-foreground">+1 (555) 123-4567</p>
        </div>
        <div className="rounded-xl border border-border bg-card p-6 text-card-foreground">
          <MapPin className="h-6 w-6 text-primary" />
          <p className="mt-3 text-sm font-medium">Office</p>
          <p className="mt-1 text-sm text-muted-foreground">123 Market St, SF</p>
        </div>
      </div>
    </div>
  );
}
