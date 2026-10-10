"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, CloudRain, Snowflake, Sun } from "lucide-react";
import { formatPrice } from "@/data/company";
import { getPackageBySlug } from "@/data/packages";
import { seasons, type SeasonId } from "@/data/seasons";
import { cn } from "@/lib/utils";

const seasonIcons: Record<SeasonId, typeof Snowflake> = {
  winter: Snowflake,
  summer: Sun,
  monsoon: CloudRain,
};

function currentSeasonDefault(): SeasonId {
  const month = new Date().getMonth(); // 0–11
  if (month >= 5 && month <= 8) return "monsoon"; // Jun–Sep
  if (month >= 2 && month <= 4) return "summer"; // Mar–May
  return "winter";
}

export default function SeasonWhenToGo() {
  const [active, setActive] = useState<SeasonId>("monsoon");
  const scrollerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setActive(currentSeasonDefault());
  }, []);

  const season = seasons.find((s) => s.id === active) ?? seasons[2];
  const tours = season.packageSlugs
    .map((slug) => getPackageBySlug(slug))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));

  const scrollBy = (dir: -1 | 1) => {
    const el = scrollerRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * Math.min(320, el.clientWidth * 0.75), behavior: "smooth" });
  };

  return (
    <section className="relative isolate overflow-hidden py-16 md:py-20">
      <div className="absolute inset-0">
        <Image
          key={season.id}
          src={season.background}
          alt=""
          fill
          className="object-cover opacity-35 transition-opacity duration-500"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-white/85 via-white/80 to-white/90" />
      </div>

      <div className="container-page relative">
        <h2 className="text-center text-3xl text-foreground md:text-4xl">
          Not Sure When to Go or Where to Go?
        </h2>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          {seasons.map((s) => {
            const Icon = seasonIcons[s.id];
            const isActive = active === s.id;
            return (
              <button
                key={s.id}
                type="button"
                onClick={() => setActive(s.id)}
                className={cn(
                  "inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold transition",
                  isActive
                    ? "bg-brand text-white shadow-md"
                    : "bg-stone-900 text-white hover:bg-stone-800",
                )}
              >
                <Icon className="h-4 w-4" aria-hidden />
                {s.label}
              </button>
            );
          })}
        </div>

        <div className="mt-10 grid gap-5 lg:grid-cols-[minmax(240px,300px)_1fr] lg:items-stretch">
          <div className="flex flex-col justify-center rounded-2xl bg-stone-100/95 p-7 md:p-8">
            <h3 className="text-2xl leading-snug text-foreground md:text-[1.65rem]">
              {season.headline}
            </h3>
            <p className="mt-4 text-sm leading-relaxed text-muted md:text-[15px]">
              {season.description}
            </p>
          </div>

          <div className="relative min-w-0">
            <button
              type="button"
              aria-label="Previous packages"
              onClick={() => scrollBy(-1)}
              className="absolute left-0 top-1/2 z-10 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-white/90 text-foreground shadow-md backdrop-blur md:flex"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              aria-label="Next packages"
              onClick={() => scrollBy(1)}
              className="absolute right-0 top-1/2 z-10 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-white/90 text-foreground shadow-md backdrop-blur md:flex"
            >
              <ChevronRight className="h-5 w-5" />
            </button>

            <div
              ref={scrollerRef}
              className="flex gap-4 overflow-x-auto scroll-smooth pb-2 md:px-12 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            >
              {tours.map((tour) => (
                <Link
                  key={tour.id}
                  href={`/packages/${tour.slug}`}
                  className="group w-[240px] shrink-0 overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-border transition hover:-translate-y-0.5 hover:shadow-md sm:w-[260px]"
                >
                  <div className="relative h-40 overflow-hidden">
                    <Image
                      src={tour.image}
                      alt={tour.name}
                      fill
                      className="object-cover transition duration-500 group-hover:scale-105"
                      sizes="260px"
                    />
                  </div>
                  <div className="p-4">
                    <h4 className="line-clamp-2 min-h-[2.75rem] text-[15px] font-semibold leading-snug text-foreground">
                      {tour.name}
                    </h4>
                    <div className="mt-3 flex items-end justify-between gap-2 border-t border-border/70 pt-3 text-sm">
                      <span className="text-muted">{tour.days} Days</span>
                      <span className="font-semibold text-foreground">
                        {formatPrice(tour.startingPrice)}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
