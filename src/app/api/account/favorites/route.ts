import { NextResponse } from "next/server";
import { z } from "zod";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/db";

export async function GET() {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Please log in." }, { status: 401 });
  }

  const favorites = await prisma.favorite.findMany({
    where: { userId: session.id },
    include: { package: true },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json({ favorites });
}

const postSchema = z.object({
  packageId: z.string().optional(),
  packageSlug: z.string().optional(),
});

async function resolvePackageId(input: {
  packageId?: string;
  packageSlug?: string;
}) {
  if (input.packageId) {
    const byId = await prisma.package.findUnique({
      where: { id: input.packageId },
    });
    if (byId) return byId.id;
  }
  if (input.packageSlug) {
    const bySlug = await prisma.package.findUnique({
      where: { slug: input.packageSlug },
    });
    if (bySlug) return bySlug.id;
  }
  return null;
}

export async function POST(req: Request) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Please log in." }, { status: 401 });
  }

  const body = postSchema.parse(await req.json());
  const packageId = await resolvePackageId(body);
  if (!packageId) {
    return NextResponse.json({ error: "Package not found." }, { status: 404 });
  }

  const favorite = await prisma.favorite.upsert({
    where: {
      userId_packageId: { userId: session.id, packageId },
    },
    update: {},
    create: { userId: session.id, packageId },
  });

  return NextResponse.json({ ok: true, favorite });
}

export async function DELETE(req: Request) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Please log in." }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const packageIdParam = searchParams.get("packageId");
  const packageSlug = searchParams.get("packageSlug");
  const packageId = await resolvePackageId({
    packageId: packageIdParam || undefined,
    packageSlug: packageSlug || undefined,
  });
  if (!packageId) {
    return NextResponse.json({ error: "packageId required" }, { status: 400 });
  }

  await prisma.favorite.deleteMany({
    where: { userId: session.id, packageId },
  });

  return NextResponse.json({ ok: true });
}
