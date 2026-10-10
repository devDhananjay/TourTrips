import type { Destination, TourPackage } from "@/types";
import { prisma } from "@/lib/db";
import { destinations as staticDestinations } from "@/data/destinations";
import { packages as staticPackages } from "@/data/packages";

function parseJson<T>(value: string, fallback: T): T {
  try {
    return JSON.parse(value) as T;
  } catch {
    return fallback;
  }
}

export function mapDbDestination(d: {
  id: string;
  slug: string;
  name: string;
  shortDescription: string;
  description: string;
  image: string;
  startingPrice: number;
  region: string;
  bestTime: string;
  highlights: string;
}): Destination {
  return {
    id: d.id,
    slug: d.slug,
    name: d.name,
    shortDescription: d.shortDescription,
    description: d.description,
    image: d.image,
    startingPrice: d.startingPrice,
    region: d.region,
    bestTime: d.bestTime,
    highlights: parseJson<string[]>(d.highlights, []),
  };
}

export function mapDbPackage(p: {
  id: string;
  slug: string;
  name: string;
  destinationName: string;
  destinationSlug: string;
  duration: string;
  nights: number;
  days: number;
  startingPrice: number;
  originalPrice: number | null;
  emiFrom: number | null;
  category: string;
  tripType: string;
  rating: number;
  reviewCount: number;
  badge: string | null;
  featured: boolean;
  image: string;
  gallery: string;
  highlights: string;
  overview: string;
  itinerary: string;
  inclusions: string;
  exclusions: string;
  hotels: string;
  transportation: string;
  importantInfo: string;
  faqs: string;
}): TourPackage {
  return {
    id: p.id,
    slug: p.slug,
    name: p.name,
    destination: p.destinationName,
    destinationSlug: p.destinationSlug,
    duration: p.duration,
    nights: p.nights,
    days: p.days,
    startingPrice: p.startingPrice,
    originalPrice: p.originalPrice ?? undefined,
    emiFrom: p.emiFrom ?? undefined,
    category: p.category as TourPackage["category"],
    tripType: p.tripType as TourPackage["tripType"],
    rating: p.rating,
    reviewCount: p.reviewCount,
    badge: p.badge ?? undefined,
    featured: p.featured,
    image: p.image,
    gallery: parseJson(p.gallery, []),
    highlights: parseJson(p.highlights, []),
    overview: p.overview,
    itinerary: parseJson(p.itinerary, []),
    inclusions: parseJson(p.inclusions, []),
    exclusions: parseJson(p.exclusions, []),
    hotels: parseJson(p.hotels, []),
    transportation: parseJson(p.transportation, []),
    importantInfo: parseJson(p.importantInfo, []),
    faqs: parseJson(p.faqs, []),
  };
}

export async function getPublishedDestinations(): Promise<Destination[]> {
  try {
    const rows = await prisma.destination.findMany({
      where: { published: true },
      orderBy: { name: "asc" },
    });
    if (rows.length) return rows.map(mapDbDestination);
  } catch {
    /* fall back to static */
  }
  return staticDestinations;
}

export async function getPublishedPackages(): Promise<TourPackage[]> {
  try {
    const rows = await prisma.package.findMany({
      where: { published: true },
      orderBy: { startingPrice: "asc" },
    });
    if (rows.length) return rows.map(mapDbPackage);
  } catch {
    /* fall back to static */
  }
  return staticPackages;
}

export async function getPackageBySlugDb(
  slug: string,
): Promise<TourPackage | undefined> {
  try {
    const row = await prisma.package.findFirst({
      where: { slug, published: true },
    });
    if (row) return mapDbPackage(row);
  } catch {
    /* fall back */
  }
  return staticPackages.find((p) => p.slug === slug);
}
