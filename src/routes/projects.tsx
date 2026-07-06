import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { useCollection } from "@/lib/use-firestore-data";
import { seedProjects } from "@/lib/projects-data";
import heroImg from "@/assets/hero.jpg";
import heroProjects from "@/assets/hero-projects.jpg";
import cubiclesImg from "@/assets/service-cubicles.jpg";
import claddingImg from "@/assets/service-cladding.jpg";

export const Route = createFileRoute("/projects")({
  head: () => ({
    meta: [
      { title: "HPL Cubicles & Custom Joinery Projects Portfolio Dubai | Nexus Line UAE" },
      { name: "description", content: "Explore our completed projects portfolio featuring luxury HPL toilet cubicles, gym/school lockers, solid surface vanities, and wall cladding delivered across Dubai, Abu Dhabi, and the UAE. Fabricated in our local facility." },
      { name: "keywords", content: "restroom projects Dubai, toilet cubicle installations UAE, locker fit-outs, commercial washroom portfolio, HPL cladding projects, Greenlam cubicle portfolio, Merino partition works Dubai" },
      { property: "og:title", content: "HPL Cubicles & Custom Joinery Projects Portfolio Dubai | Nexus Line UAE" },
      { property: "og:description", content: "Completed projects portfolio featuring luxury HPL toilet cubicles, gym/school lockers, solid surface vanities, and wall cladding delivered across the UAE." },
      { property: "og:url", content: "/projects" },
    ],
    links: [{ rel: "canonical", href: "/projects" }],
  }),
  component: Projects,
});

function Projects() {
  const remote = useCollection<{
    title?: string;
    category?: string;
    location?: string;
    description?: string;
    imageUrl?: string;
  }>("projects");
  const projects =
    remote && remote.length > 0
      ? remote.map((r) => ({
          title: r.title ?? "",
          category: r.category ?? "",
          location: r.location ?? "",
          img: r.imageUrl || cubiclesImg,
        }))
      : seedProjects;
  return (
    <>
      <section className="relative isolate overflow-hidden border-b border-border/60">
        <img
          src={cubiclesImg}
          alt="Luxury hotel washroom fit-out by Nexus Line Furniture"
          width={1920}
          height={1080}
          className="absolute inset-0 -z-10 h-full w-full object-cover"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-background/95 via-background/80 to-background/40" />
        <div className="mx-auto max-w-7xl px-6 pb-24 pt-32 md:pb-32 md:pt-40">
          <span className="text-xs uppercase tracking-[0.3em] text-primary">Selected projects</span>
          <h1 className="mt-6 max-w-4xl font-serif text-5xl leading-[1.05] text-foreground md:text-6xl">
            Representative Projects from Our Engineers' Careers
          </h1>
        </div>
      </section>

      <section className="relative isolate overflow-hidden">
        <img src={cubiclesImg} alt="" aria-hidden="true" className="absolute inset-0 -z-10 h-full w-full object-cover opacity-[0.05]" />
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-b from-background via-background/90 to-background" />
        <div className="relative mx-auto max-w-7xl px-6 py-24">
        <div className="grid auto-rows-[280px] grid-cols-1 gap-4 md:grid-cols-3 md:auto-rows-[260px]">
          {projects.map((p) => (
            <div
              key={p.title}
              className={`group relative overflow-hidden border border-border/60 ${("span" in p ? (p as { span?: string }).span : undefined) ?? ""}`}
            >
              <img
                src={p.img}
                alt={p.title}
                width={1280}
                height={960}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-6">
                <div>
                  <span className="text-[10px] uppercase tracking-[0.25em] text-primary">
                    {p.category}
                  </span>
                  <h3 className="mt-2 font-serif text-2xl text-foreground">{p.title}</h3>
                  <p className="mt-1 text-xs uppercase tracking-[0.2em] text-muted-foreground">
                    {p.location}
                  </p>
                </div>
                <ArrowUpRight className="h-5 w-5 shrink-0 text-primary transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
              </div>
            </div>
          ))}
        </div>

        <div className="mt-20 text-center">
          <Link
            to="/contact"
            className="inline-flex items-center gap-3 border border-primary bg-primary px-7 py-3.5 text-[11px] font-medium uppercase tracking-[0.25em] text-primary-foreground transition-colors hover:bg-transparent hover:text-primary"
          >
            Request a Portfolio
          </Link>
        </div>
        </div>
      </section>
    </>
  );
}