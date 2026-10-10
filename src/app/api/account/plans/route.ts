import { NextResponse } from "next/server";
import { z } from "zod";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/db";

export async function GET() {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Please log in." }, { status: 401 });
  }

  const plans = await prisma.savedPlan.findMany({
    where: { userId: session.id },
    orderBy: { updatedAt: "desc" },
  });
  return NextResponse.json({ plans });
}

const schema = z.object({
  title: z.string().min(2),
  destination: z.string().min(1),
  travelDate: z.string().optional(),
  travellers: z.number().int().min(1).max(50).optional(),
  budget: z.string().optional(),
  notes: z.string().optional(),
});

export async function POST(req: Request) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Please log in." }, { status: 401 });
  }

  const body = schema.parse(await req.json());
  const plan = await prisma.savedPlan.create({
    data: {
      userId: session.id,
      title: body.title.trim(),
      destination: body.destination.trim(),
      travelDate: body.travelDate || null,
      travellers: body.travellers ?? 2,
      budget: body.budget || null,
      notes: body.notes || null,
    },
  });

  return NextResponse.json({ ok: true, plan });
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

  await prisma.savedPlan.deleteMany({ where: { id, userId: session.id } });
  return NextResponse.json({ ok: true });
}
