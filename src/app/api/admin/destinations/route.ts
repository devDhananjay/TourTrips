import { NextResponse } from "next/server";
import { z } from "zod";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/db";

async function assertAdmin() {
  const session = await getSession();
  if (!session || session.role !== "SUPERADMIN") {
    return null;
  }
  return session;
}

export async function GET() {
  if (!(await assertAdmin())) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }
  const destinations = await prisma.destination.findMany({
    orderBy: { updatedAt: "desc" },
    include: { _count: { select: { packages: true } } },
  });
  return NextResponse.json({ destinations });
}

const schema = z.object({
  id: z.string().optional(),
  slug: z.string().min(2),
  name: z.string().min(2),
  shortDescription: z.string().min(5),
  description: z.string().min(10),
  image: z.string().min(4),
  startingPrice: z.number().int().positive(),
  region: z.string().min(2),
  bestTime: z.string().min(2),
  highlights: z.array(z.string()).default([]),
  published: z.boolean().optional(),
});

export async function POST(req: Request) {
  if (!(await assertAdmin())) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  try {
    const body = schema.parse(await req.json());
    const data = {
      slug: body.slug.trim().toLowerCase(),
      name: body.name.trim(),
      shortDescription: body.shortDescription.trim(),
      description: body.description.trim(),
      image: body.image.trim(),
      startingPrice: body.startingPrice,
      region: body.region.trim(),
      bestTime: body.bestTime.trim(),
      highlights: JSON.stringify(body.highlights),
      published: body.published ?? true,
    };

    const destination = body.id
      ? await prisma.destination.update({ where: { id: body.id }, data })
      : await prisma.destination.create({ data });

    return NextResponse.json({ ok: true, destination });
  } catch {
    return NextResponse.json(
      { error: "Could not save destination." },
      { status: 400 },
    );
  }
}

export async function PATCH(req: Request) {
  if (!(await assertAdmin())) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const body = z
    .object({
      id: z.string(),
      published: z.boolean().optional(),
      startingPrice: z.number().int().positive().optional(),
    })
    .parse(await req.json());

  const destination = await prisma.destination.update({
    where: { id: body.id },
    data: {
      published: body.published,
      startingPrice: body.startingPrice,
    },
  });

  return NextResponse.json({ ok: true, destination });
}

export async function DELETE(req: Request) {
  if (!(await assertAdmin())) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }
  const id = new URL(req.url).searchParams.get("id");
  if (!id) {
    return NextResponse.json({ error: "id required" }, { status: 400 });
  }
  await prisma.destination.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
