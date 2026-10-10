import Image from "next/image";
import { Clock, MapPin, Star } from "lucide-react";
import type { TourPackage } from "@/types";
import { formatPrice } from "@/data/company";
import { getDiscountPercent } from "@/data/packages";
import Button from "./Button";
import FavoriteButton from "./FavoriteButton";
import Reveal from "./Reveal";

export default function PackageCard({
  tour,
  delay = 0,
}: {
  tour: TourPackage;
  delay?: number;
}) {
  const discount = getDiscountPercent(tour);

  return (
    <Reveal as="article" delay={delay} className="h-full">
      <div className="group card-lift flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-white">
        <div className="relative h-52 overflow-hidden">
          <Image
            src={tour.image}
            alt={tour.name}
            fill
            className="img-zoom object-cover"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
          <span className="absolute left-3 top-3 rounded-full bg-white/95 px-3 py-1 text-xs font-semibold text-foreground">
            {tour.duration}
          </span>
          {tour.badge ? (
            <span className="absolute right-3 top-3 rounded-full bg-accent px-3 py-1 text-xs font-bold uppercase tracking-wide text-stone-900">
              {tour.badge}
            </span>
          ) : null}
          {discount ? (
            <span className="absolute bottom-3 left-3 rounded-full bg-brand px-3 py-1 text-xs font-bold text-white">
              {discount}% OFF
            </span>
          ) : null}
        </div>
        <div className="flex flex-1 flex-col p-5">
          <div className="flex items-center gap-2 text-sm">
            <span className="inline-flex items-center gap-1 font-semibold text-foreground">
              <Star className="h-4 w-4 fill-accent text-accent" />
              {tour.rating.toFixed(1)}
            </span>
            <span className="text-muted">({tour.reviewCount} reviews)</span>
            <span className="ml-auto rounded-full bg-surface-2 px-2 py-0.5 text-[11px] font-medium uppercase tracking-wide text-muted">
              {tour.category === "international" ? "Intl" : "India"}
            </span>
          </div>
          <h3 className="mt-2 text-xl text-foreground">{tour.name}</h3>
          <div className="mt-2 flex flex-wrap gap-3 text-sm text-muted">
            <span className="inline-flex items-center gap-1">
              <MapPin className="h-4 w-4 text-brand" />
              {tour.destination}
            </span>
            <span className="inline-flex items-center gap-1">
              <Clock className="h-4 w-4 text-brand" />
              {tour.duration}
            </span>
          </div>
          <ul className="mt-4 space-y-1.5 text-sm text-muted">
            {tour.highlights.slice(0, 3).map((item) => (
              <li key={item} className="flex gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
                {item}
              </li>
            ))}
          </ul>
          <div className="mt-auto pt-5">
            <p className="text-xs uppercase tracking-wide text-muted">
              Starting from
            </p>
            <div className="mb-1 flex flex-wrap items-baseline gap-2">
              <p className="text-2xl font-semibold text-brand">
                {formatPrice(tour.startingPrice)}
                <span className="text-sm font-normal text-muted"> / person</span>
              </p>
              {tour.originalPrice ? (
                <p className="text-sm text-muted line-through">
                  {formatPrice(tour.originalPrice)}
                </p>
              ) : null}
            </div>
            {tour.emiFrom ? (
              <p className="mb-4 text-xs font-medium text-success">
                EMI from {formatPrice(tour.emiFrom)}/month · Travel now, pay later
              </p>
            ) : (
              <div className="mb-4" />
            )}
            <div className="flex flex-wrap gap-2">
              <Button href={`/packages/${tour.slug}`} size="sm" className="flex-1">
                View Details
              </Button>
              <Button
                href={`/contact?package=${tour.slug}`}
                variant="outline"
                size="sm"
                className="flex-1"
              >
                Enquire Now
              </Button>
            </div>
            <div className="mt-2">
              <FavoriteButton
                packageSlug={tour.slug}
                className="w-full justify-center"
              />
            </div>
          </div>
        </div>
      </div>
    </Reveal>
  );
}
