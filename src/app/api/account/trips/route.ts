import { NextResponse } from "next/server";
import { z } from "zod";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/db";

export async function GET() {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Please log in." }, { status: 401 });
  }

  const trips = await prisma.pastTrip.findMany({
    where: { userId: session.id },
    include: { package: true },
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json({ trips });
}

const schema = z.object({
  title: z.string().min(2),
  destination: z.string().min(1),
  travelDate: z.string().optional(),
  status: z.string().optional(),
  notes: z.string().optional(),
  packageId: z.string().optional(),
});

export async function POST(req: Request) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Please log in." }, { status: 401 });
  }

  const body = schema.parse(await req.json());
  const trip = await prisma.pastTrip.create({
    data: {
      userId: session.id,
      title: body.title.trim(),
      destination: body.destination.trim(),
      travelDate: body.travelDate || null,
      status: body.status || "completed",
      notes: body.notes || null,
      packageId: body.packageId || null,
    },
  });

  return NextResponse.json({ ok: true, trip });
}

export async function DELETE(req: Request) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Please log in." }, { status: 401 });
  }

  const id = new URL(req.url).searchParams.get("id");
  if (!id) {
    return NextResponse.json({ error: "id required" }, { status: 400 });
  }

  await prisma.pastTrip.deleteMany({ where: { id, userId: session.id } });
  return NextResponse.json({ ok: true });
}
