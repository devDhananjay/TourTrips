import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { seasonalDeals } from "@/data/company";
import Reveal from "./Reveal";

export default function SeasonalDeals() {
  return (
    <section className="section-pad section-glow bg-surface">
      <div className="container-page">
        <Reveal className="mb-8 max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand">
            Seasonal offers
          </p>
          <h2 className="mt-2 text-3xl text-foreground md:text-4xl">
            Feel the season with exclusive holiday deals
          </h2>
          <p className="mt-3 text-muted">
            Limited-time themes inspired by how travellers actually plan —
            summer hills, monsoon backwaters and honeymoon escapes.
          </p>
        </Reveal>
        <div className="grid gap-5 md:grid-cols-3">
          {seasonalDeals.map((deal, index) => (
            <Reveal key={deal.id} delay={index * 90}>
              <Link
                href={deal.href}
                className="group relative isolate block overflow-hidden rounded-3xl"
              >
                <div className="relative min-h-[280px]">
                  <Image
                    src={deal.image}
                    alt={deal.title}
                    fill
                    className="img-zoom object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/45 to-transparent" />
                </div>
                <div className="absolute inset-x-0 bottom-0 p-5 text-white">
                  <span className="rounded-full bg-accent px-3 py-1 text-xs font-bold uppercase tracking-wide text-stone-900">
                    {deal.tag}
                  </span>
                  <h3 className="mt-3 text-2xl">{deal.title}</h3>
                  <p className="mt-2 text-sm text-stone-200">{deal.description}</p>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-accent">
                    Explore deals <ArrowRight className="h-4 w-4" />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
