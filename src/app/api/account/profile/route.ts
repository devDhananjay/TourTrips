import { NextResponse } from "next/server";
import { z } from "zod";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/db";

const schema = z.object({
  name: z.string().min(2),
  phone: z.string().optional(),
});

export async function PATCH(req: Request) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Please log in." }, { status: 401 });
  }

  try {
    const body = schema.parse(await req.json());
    const user = await prisma.user.update({
      where: { id: session.id },
      data: {
        name: body.name.trim(),
        phone: body.phone?.trim() || null,
      },
      select: { id: true, name: true, email: true, phone: true, role: true },
    });
    return NextResponse.json({ ok: true, user });
  } catch {
    return NextResponse.json({ error: "Could not update profile." }, { status: 400 });
  }
}
