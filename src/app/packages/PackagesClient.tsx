"use client";

import { useMemo } from "react";
import { useSearchParams } from "next/navigation";
import PackageCard from "@/components/PackageCard";
import SectionHeading from "@/components/SectionHeading";
import { destinations } from "@/data/destinations";
import { packages } from "@/data/packages";
import type { PackageCategory, TripType } from "@/types";
import { Suspense } from "react";

const tripTypes: { id: TripType | "all"; label: string }[] = [
  { id: "all", label: "All styles" },
  { id: "leisure", label: "Leisure" },
  { id: "honeymoon", label: "Honeymoon" },
  { id: "family", label: "Family" },
  { id: "adventure", label: "Adventure" },
];

const categories: { id: PackageCategory | "all"; label: string }[] = [
  { id: "all", label: "All trips" },
  { id: "domestic", label: "India & Around" },
  { id: "international", label: "International" },
];

function PackagesGrid() {
  const searchParams = useSearchParams();
  const destination = searchParams.get("destination") || "all";
  const category = (searchParams.get("category") || "all") as
    | PackageCategory
    | "all";
  const tripType = (searchParams.get("tripType") || "all") as TripType | "all";
  const q = (searchParams.get("q") || "").trim().toLowerCase();

  const filtered = useMemo(() => {
    return packages.filter((p) => {
      if (destination !== "all" && p.destinationSlug !== destination) return false;
      if (category !== "all" && p.category !== category) return false;
      if (tripType !== "all" && p.tripType !== tripType) return false;
      if (q) {
        const hay = [
          p.name,
          p.destination,
          p.category,
          p.tripType,
          p.badge || "",
          ...p.highlights,
        ]
          .join(" ")
          .toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
  }, [destination, category, tripType, q]);

  function hrefFor(next: {
    destination?: string;
    category?: string;
    tripType?: string;
  }) {
    const params = new URLSearchParams();
    const d = next.destination ?? destination;
    const c = next.category ?? category;
    const t = next.tripType ?? tripType;
    if (d !== "all") params.set("destination", d);
    if (c !== "all") params.set("category", c);
    if (t !== "all") params.set("tripType", t);
    const q = params.toString();
    return q ? `/packages?${q}` : "/packages";
  }

  return (
    <section className="section-pad">
      <div className="container-page">
        <SectionHeading
          title="Find Your Perfect Package"
          description="Filter by India vs international, trip style, destination — with clear starting prices and EMI options."
        />

        <div className="mb-4">
          <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted">
            Category
          </p>
          <div className="flex flex-wrap gap-2">
            {categories.map((c) => (
              <FilterChip
                key={c.id}
                href={hrefFor({ category: c.id })}
                active={category === c.id}
                label={c.label}
              />
            ))}
          </div>
        </div>

        <div className="mb-4">
          <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted">
            Trip style
          </p>
          <div className="flex flex-wrap gap-2">
            {tripTypes.map((t) => (
              <FilterChip
                key={t.id}
                href={hrefFor({ tripType: t.id })}
                active={tripType === t.id}
                label={t.label}
              />
            ))}
          </div>
        </div>

        <div className="mb-8">
          <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted">
            Destination
          </p>
          <div className="flex flex-wrap gap-2">
            <FilterChip
              href={hrefFor({ destination: "all" })}
              active={destination === "all"}
              label="All"
            />
            {destinations.map((d) => (
              <FilterChip
                key={d.slug}
                href={hrefFor({ destination: d.slug })}
                active={destination === d.slug}
                label={d.name}
              />
            ))}
          </div>
        </div>

        {filtered.length === 0 ? (
          <p className="rounded-2xl border border-border bg-surface p-8 text-center text-muted">
            No packages match these filters yet. Enquire and we will craft a
            custom itinerary for your dates and budget.
          </p>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filtered.map((tour, index) => (
              <PackageCard key={tour.id} tour={tour} delay={index * 60} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function FilterChip({
  href,
  label,
  active,
}: {
  href: string;
  label: string;
  active: boolean;
}) {
  return (
    <a
      href={href}
      className={`rounded-full px-4 py-2 text-sm font-medium transition ${
        active
          ? "bg-brand text-white"
          : "border border-border bg-white text-stone-700 hover:border-brand hover:text-brand"
      }`}
    >
      {label}
    </a>
  );
}

export default function PackagesClient() {
  return (
    <Suspense
      fallback={
        <div className="container-page section-pad text-center text-muted">
          Loading packages...
        </div>
      }
    >
      <PackagesGrid />
    </Suspense>
  );
}
