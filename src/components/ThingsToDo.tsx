import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Reveal from "./Reveal";

const experiences = [
  {
    id: "culture",
    tag: "Culture",
    title: "Immerse yourself in culture",
    href: "/packages?destination=rajasthan",
    image:
      "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=1200&q=80",
  },
  {
    id: "adventure",
    tag: "Adventure",
    title: "Chase your next adventure",
    href: "/packages?tripType=adventure",
    image:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=80",
  },
  {
    id: "relaxation",
    tag: "Relaxation",
    title: "Unwind in style",
    href: "/packages?tripType=leisure",
    image:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&q=80",
  },
];

export default function ThingsToDo() {
  return (
    <section className="section-pad bg-white">
      <div className="container-page">
        <Reveal className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand">
              Experiences
            </p>
            <h2 className="mt-2 text-3xl text-foreground md:text-4xl">
              Things to do
            </h2>
          </div>
          <Link
            href="/packages"
            className="inline-flex items-center gap-1 text-sm font-semibold uppercase tracking-wide text-brand transition hover:gap-2"
          >
            See all <ArrowRight className="h-4 w-4" />
          </Link>
        </Reveal>

        <div className="grid gap-5 md:grid-cols-3">
          {experiences.map((item, index) => (
            <Reveal key={item.id} delay={index * 100}>
              <Link
                href={item.href}
                className="group relative block min-h-[360px] overflow-hidden rounded-[1.75rem] md:min-h-[420px]"
              >
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="img-zoom object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/75 via-stone-950/25 to-stone-950/20 transition duration-500 group-hover:from-stone-950/85" />
                <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
                  <span className="rounded-md border border-white/50 bg-stone-950/35 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-white backdrop-blur-sm">
                    {item.tag}
                  </span>
                  <h3 className="mt-5 max-w-xs text-2xl font-bold leading-tight text-white md:text-3xl">
                    {item.title}
                  </h3>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
