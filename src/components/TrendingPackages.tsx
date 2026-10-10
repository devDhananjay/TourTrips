"use client";

import { useState } from "react";
import PackageCard from "@/components/PackageCard";
import SectionHeading from "@/components/SectionHeading";
import Button from "@/components/Button";
import { packages } from "@/data/packages";
import type { PackageCategory } from "@/types";
import { ArrowRight } from "lucide-react";

const tabs: { id: PackageCategory | "all"; label: string }[] = [
  { id: "international", label: "International" },
  { id: "domestic", label: "India & Around" },
  { id: "all", label: "Recommended" },
];

export default function TrendingPackages() {
  const [active, setActive] = useState<(typeof tabs)[number]["id"]>(
    "international",
  );

  const list =
    active === "all"
      ? [
          ...packages.filter((p) => p.featured && p.category === "international"),
          ...packages.filter((p) => p.featured && p.category === "domestic"),
        ].slice(0, 6)
      : packages.filter((p) => p.category === active).slice(0, 6);

  return (
    <section className="section-pad">
      <div className="container-page">
        <SectionHeading
          eyebrow="Recommended packages"
          title="Trending holidays travellers are booking"
          description="Browse domestic and international favourites with transparent starting prices, ratings and flexible EMI options."
        />

        <div className="mb-8 flex flex-wrap gap-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActive(tab.id)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                active === tab.id
                  ? "bg-brand text-white"
                  : "border border-border bg-white text-stone-700 hover:border-brand hover:text-brand"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {list.map((tour, index) => (
            <PackageCard key={tour.id} tour={tour} delay={index * 70} />
          ))}
        </div>

        <div className="mt-10 text-center">
          <Button
            href={
              active === "all"
                ? "/packages"
                : `/packages?category=${active}`
            }
            variant="outline"
          >
            View All Packages <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  );
}
