import { NextResponse } from "next/server";
import { z } from "zod";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/db";
import {
  ensureSiteSettingsRow,
  rowToSiteSettings,
  settingsToDbPayload,
  type SiteSettingsData,
} from "@/lib/site-settings";

async function assertAdmin() {
  const session = await getSession();
  if (!session || session.role !== "SUPERADMIN") return null;
  return session;
}

const socialSchema = z.object({
  facebook: z.string(),
  instagram: z.string(),
  twitter: z.string(),
  youtube: z.string(),
});

const companySchema = z.object({
  name: z.string().min(2),
  tagline: z.string().min(2),
  description: z.string().min(10),
  phone: z.string().min(5),
  phoneRaw: z.string().min(5),
  email: z.string().email(),
  whatsapp: z.string().min(8),
  address: z.string().min(5),
  workingHours: z.string().min(3),
  logo: z.string().min(1),
  logoMark: z.string().min(1),
  favicon: z.string().min(1),
  social: socialSchema,
});

const schema = z.object({
  company: companySchema,
  home: z.record(z.string(), z.unknown()),
});

export async function GET() {
  if (!(await assertAdmin())) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }
  const row = await ensureSiteSettingsRow();
  return NextResponse.json({ settings: rowToSiteSettings(row) });
}

export async function PUT(req: Request) {
  if (!(await assertAdmin())) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  try {
    const body = schema.parse(await req.json());
    const payload = settingsToDbPayload({
      company: body.company,
      home: body.home as SiteSettingsData["home"],
    });

    await ensureSiteSettingsRow();
    const row = await prisma.siteSettings.update({
      where: { id: "default" },
      data: payload,
    });

    return NextResponse.json({ ok: true, settings: rowToSiteSettings(row) });
  } catch {
    return NextResponse.json(
      { error: "Could not save site settings." },
      { status: 400 },
    );
  }
}
