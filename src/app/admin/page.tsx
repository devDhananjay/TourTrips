import Link from "next/link";
import { redirect } from "next/navigation";
import { ArrowUpRight, Shield } from "lucide-react";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { getSiteSettings } from "@/lib/site-settings";
import AdminClient from "./AdminClient";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const session = await getSession();
  if (!session) redirect("/login?next=/admin");
  if (session.role !== "SUPERADMIN") redirect("/account");

  const [destinations, packages, users, favCount, planCount, siteSettings] =
    await Promise.all([
      prisma.destination.findMany({
        orderBy: { updatedAt: "desc" },
        include: { _count: { select: { packages: true } } },
      }),
      prisma.package.findMany({ orderBy: { updatedAt: "desc" } }),
      prisma.user.findMany({
        orderBy: { createdAt: "desc" },
        select: {
          id: true,
          name: true,
          email: true,
          phone: true,
          role: true,
          createdAt: true,
          _count: {
            select: { favorites: true, savedPlans: true, pastTrips: true },
          },
        },
      }),
      prisma.favorite.count(),
      prisma.savedPlan.count(),
      getSiteSettings(),
    ]);

  return (
    <div className="admin-shell min-h-screen">
      <div className="border-b border-white/10 bg-[#0f274d] text-white">
        <div className="container-page flex flex-wrap items-center justify-between gap-4 py-5 md:py-6">
          <div className="min-w-0">
            <p className="inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-sky-200/90">
              <Shield className="h-3.5 w-3.5" />
              Yogo Voyage · Superadmin
            </p>
            <h1 className="mt-1.5 text-2xl font-bold tracking-tight md:text-3xl">
              Content & pricing control
            </h1>
            <p className="mt-1 text-sm text-slate-300">
              Signed in as {session.name || session.email}
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 rounded-xl border border-white/20 bg-white/5 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              View website
              <ArrowUpRight className="h-4 w-4" />
            </Link>
            <Link
              href="/account"
              className="inline-flex items-center rounded-xl bg-white px-4 py-2.5 text-sm font-semibold text-brand transition hover:bg-sky-50"
            >
              My account
            </Link>
          </div>
        </div>
      </div>

      <div className="container-page py-6 md:py-8">
        <AdminClient
          stats={{
            destinations: destinations.length,
            packages: packages.length,
            users: users.length,
            favorites: favCount,
            plans: planCount,
            livePackages: packages.filter((p) => p.published).length,
            featuredPackages: packages.filter((p) => p.featured).length,
          }}
          destinations={destinations.map((d) => ({
            id: d.id,
            slug: d.slug,
            name: d.name,
            shortDescription: d.shortDescription,
            description: d.description,
            image: d.image,
            startingPrice: d.startingPrice,
            region: d.region,
            bestTime: d.bestTime,
            highlights: safeParse(d.highlights),
            published: d.published,
            packageCount: d._count.packages,
            updatedAt: d.updatedAt.toISOString(),
          }))}
          packages={packages.map((p) => ({
            id: p.id,
            slug: p.slug,
            name: p.name,
            destinationName: p.destinationName,
            destinationSlug: p.destinationSlug,
            duration: p.duration,
            nights: p.nights,
            days: p.days,
            startingPrice: p.startingPrice,
            originalPrice: p.originalPrice,
            emiFrom: p.emiFrom,
            category: p.category,
            tripType: p.tripType,
            rating: p.rating,
            reviewCount: p.reviewCount,
            badge: p.badge,
            featured: p.featured,
            published: p.published,
            image: p.image,
            overview: p.overview,
            highlights: safeParse(p.highlights),
            gallery: safeParse(p.gallery),
            inclusions: safeParse(p.inclusions),
            exclusions: safeParse(p.exclusions),
            hotels: safeParse(p.hotels),
            transportation: safeParse(p.transportation),
            importantInfo: safeParse(p.importantInfo),
            updatedAt: p.updatedAt.toISOString(),
          }))}
          users={users.map((u) => ({
            id: u.id,
            name: u.name,
            email: u.email,
            phone: u.phone,
            role: u.role,
            createdAt: u.createdAt.toISOString(),
            favorites: u._count.favorites,
            savedPlans: u._count.savedPlans,
            pastTrips: u._count.pastTrips,
          }))}
          siteSettings={siteSettings}
        />
      </div>
    </div>
  );
}

function safeParse(value: string): string[] {
  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}
