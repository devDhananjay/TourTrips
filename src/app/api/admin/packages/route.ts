import { NextResponse } from "next/server";
import { z } from "zod";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/db";

async function assertAdmin() {
  const session = await getSession();
  if (!session || session.role !== "SUPERADMIN") return null;
  return session;
}

export async function GET() {
  if (!(await assertAdmin())) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }
  const packages = await prisma.package.findMany({
    orderBy: { updatedAt: "desc" },
  });
  return NextResponse.json({ packages });
}

const schema = z.object({
  id: z.string().optional(),
  slug: z.string().min(2),
  name: z.string().min(2),
  destinationName: z.string().min(2),
  destinationSlug: z.string().min(2),
  duration: z.string().min(2),
  nights: z.number().int().min(1),
  days: z.number().int().min(1),
  startingPrice: z.number().int().positive(),
  originalPrice: z.number().int().positive().optional().nullable(),
  emiFrom: z.number().int().positive().optional().nullable(),
  category: z.enum(["domestic", "international"]),
  tripType: z.string().min(2),
  rating: z.number().min(0).max(5).optional(),
  reviewCount: z.number().int().optional(),
  badge: z.string().optional().nullable(),
  featured: z.boolean().optional(),
  published: z.boolean().optional(),
  image: z.string().min(4),
  overview: z.string().min(10),
  highlights: z.array(z.string()).default([]),
  gallery: z.array(z.string()).default([]),
  inclusions: z.array(z.string()).default([]),
  exclusions: z.array(z.string()).default([]),
  hotels: z.array(z.string()).optional(),
  transportation: z.array(z.string()).optional(),
  importantInfo: z.array(z.string()).optional(),
});

export async function POST(req: Request) {
  if (!(await assertAdmin())) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  try {
    const body = schema.parse(await req.json());
    const dest = await prisma.destination.findUnique({
      where: { slug: body.destinationSlug.trim().toLowerCase() },
    });

    const shared = {
      slug: body.slug.trim().toLowerCase(),
      name: body.name.trim(),
      destinationName: body.destinationName.trim(),
      destinationSlug: body.destinationSlug.trim().toLowerCase(),
      destinationId: dest?.id ?? null,
      duration: body.duration.trim(),
      nights: body.nights,
      days: body.days,
      startingPrice: body.startingPrice,
      originalPrice: body.originalPrice ?? null,
      emiFrom: body.emiFrom ?? null,
      category: body.category,
      tripType: body.tripType,
      rating: body.rating ?? 4.5,
      reviewCount: body.reviewCount ?? 0,
      badge: body.badge || null,
      featured: body.featured ?? false,
      published: body.published ?? true,
      image: body.image,
      gallery: JSON.stringify(body.gallery.length ? body.gallery : [body.image]),
      highlights: JSON.stringify(body.highlights),
      overview: body.overview,
      inclusions: JSON.stringify(body.inclusions),
      exclusions: JSON.stringify(body.exclusions),
      hotels: JSON.stringify(
        body.hotels?.length
          ? body.hotels
          : ["As per selected package category"],
      ),
      transportation: JSON.stringify(
        body.transportation?.length
          ? body.transportation
          : ["Private/SIC transfers as per plan"],
      ),
      importantInfo: JSON.stringify(
        body.importantInfo?.length
          ? body.importantInfo
          : ["Passport / ID required for all travellers"],
      ),
    };

    if (body.id) {
      const tour = await prisma.package.update({
        where: { id: body.id },
        data: shared,
      });
      return NextResponse.json({ ok: true, package: tour });
    }

    const tour = await prisma.package.create({
      data: {
        ...shared,
        itinerary: JSON.stringify([
          {
            day: 1,
            title: "Arrival",
            description: "Airport transfer and hotel check-in.",
          },
        ]),
        faqs: JSON.stringify([
          {
            question: "Can this package be customised?",
            answer: "Yes — share dates and preferences with our team.",
          },
        ]),
      },
    });

    return NextResponse.json({ ok: true, package: tour });
  } catch (e) {
    const message =
      e instanceof z.ZodError ? "Invalid package data." : "Save failed.";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}

export async function PATCH(req: Request) {
  if (!(await assertAdmin())) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const body = z
    .object({
      id: z.string(),
      startingPrice: z.number().int().positive().optional(),
      originalPrice: z.number().int().positive().nullable().optional(),
      emiFrom: z.number().int().positive().nullable().optional(),
      featured: z.boolean().optional(),
      published: z.boolean().optional(),
      badge: z.string().nullable().optional(),
    })
    .parse(await req.json());

  const tour = await prisma.package.update({
    where: { id: body.id },
    data: {
      startingPrice: body.startingPrice,
      originalPrice: body.originalPrice,
      emiFrom: body.emiFrom,
      featured: body.featured,
      published: body.published,
      badge: body.badge,
    },
  });

  return NextResponse.json({ ok: true, package: tour });
}

export async function DELETE(req: Request) {
  if (!(await assertAdmin())) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }
  const id = new URL(req.url).searchParams.get("id");
  if (!id) {
    return NextResponse.json({ error: "id required" }, { status: 400 });
  }
  await prisma.package.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
