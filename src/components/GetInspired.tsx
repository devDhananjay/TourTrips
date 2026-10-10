import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Reveal from "./Reveal";

const stories = [
  {
    id: "1",
    tag: "Featured",
    title: "Stay longer with special hotel deals",
    href: "/services",
    image:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&q=80",
    featured: true,
  },
  {
    id: "2",
    tag: "Culture",
    title: "Explore royal Rajasthan trails",
    href: "/packages?destination=rajasthan",
    image:
      "https://images.unsplash.com/photo-1477587458883-47145ed94245?w=1200&q=80",
  },
  {
    id: "3",
    tag: "Dining",
    title: "Taste Kerala’s coastal flavours",
    href: "/packages?destination=kerala",
    image:
      "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=1200&q=80",
  },
  {
    id: "4",
    tag: "Family",
    title: "Find unforgettable adventures for kids",
    href: "/packages?tripType=family",
    image:
      "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1200&q=80",
  },
];

export default function GetInspired() {
  const [featured, ...rest] = stories;

  return (
    <section className="section-pad bg-white">
      <div className="container-page">
        <Reveal className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand">
              Inspiration
            </p>
            <h2 className="mt-2 text-3xl text-foreground md:text-4xl">
              Get inspired to explore
            </h2>
          </div>
          <Link
            href="/destinations"
            className="inline-flex items-center gap-1 text-sm font-semibold uppercase tracking-wide text-brand transition hover:gap-2"
          >
            See all <ArrowRight className="h-4 w-4" />
          </Link>
        </Reveal>

        <div className="grid gap-5 lg:grid-cols-[1.35fr_1fr]">
          <Reveal>
            <Link
              href={featured.href}
              className="group relative block min-h-[360px] overflow-hidden rounded-[1.75rem] lg:min-h-full"
            >
              <Image
                src={featured.image}
                alt={featured.title}
                fill
                className="img-zoom object-cover"
                sizes="(max-width: 1024px) 100vw, 60vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-stone-950/20 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-6 md:p-8">
                <span className="rounded-md border border-white/40 bg-white/15 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-white backdrop-blur-sm">
                  {featured.tag}
                </span>
                <h3 className="mt-3 max-w-md text-2xl font-bold text-white md:text-3xl">
                  {featured.title}
                </h3>
              </div>
            </Link>
          </Reveal>

          <div className="grid gap-5">
            {rest.map((item, index) => (
              <Reveal key={item.id} delay={80 + index * 70}>
                <Link
                  href={item.href}
                  className="group grid min-h-[120px] overflow-hidden rounded-3xl border border-border bg-surface sm:grid-cols-[140px_1fr]"
                >
                  <div className="relative min-h-[120px]">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="img-zoom object-cover"
                      sizes="140px"
                    />
                  </div>
                  <div className="flex flex-col justify-center p-4">
                    <span className="text-[11px] font-semibold uppercase tracking-wide text-brand">
                      {item.tag}
                    </span>
                    <h3 className="mt-1 text-lg font-semibold text-foreground transition group-hover:text-brand">
                      {item.title}
                    </h3>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
