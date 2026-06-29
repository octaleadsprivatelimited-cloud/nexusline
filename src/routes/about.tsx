import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About | Acme" },
      { name: "description", content: "Learn more about Acme and our mission." },
    ],
  }),
  component: About,
});

function About() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-24">
      <h1 className="text-4xl font-bold tracking-tight text-foreground">About Us</h1>
      <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
        Acme is a modern company building simple, beautiful digital experiences.
        We believe great design should be accessible to everyone.
      </p>
      <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
        Founded in 2024, our team is passionate about creating tools and services
        that help people work smarter and live better.
      </p>
    </div>
  );
}
