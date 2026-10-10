import Link from "next/link";
import { redirect } from "next/navigation";
import { Heart, MapPin, Plane, UserRound } from "lucide-react";
import { getCurrentUser, getSession } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { formatPrice } from "@/data/company";
import AccountClient from "./AccountClient";

export const dynamic = "force-dynamic";

const accountTabs = ["profile", "favorites", "plans", "trips"] as const;
type AccountTab = (typeof accountTabs)[number];

export default async function AccountPage({
  searchParams,
}: {
  searchParams: Promise<{ tab?: string }>;
}) {
  const params = await searchParams;
  const tabParam = params.tab;
  const initialTab: AccountTab = accountTabs.includes(tabParam as AccountTab)
    ? (tabParam as AccountTab)
    : "profile";

  const nextPath =
    initialTab === "profile"
      ? "/account"
      : `/account?tab=${initialTab}`;

  const session = await getSession();
  if (!session) redirect(`/login?next=${encodeURIComponent(nextPath)}`);

  const user = await getCurrentUser();
  if (!user) redirect(`/login?next=${encodeURIComponent(nextPath)}`);

  const [favorites, plans, trips] = await Promise.all([
    prisma.favorite.findMany({
      where: { userId: user.id },
      include: { package: true },
      orderBy: { createdAt: "desc" },
    }),
    prisma.savedPlan.findMany({
      where: { userId: user.id },
      orderBy: { updatedAt: "desc" },
    }),
    prisma.pastTrip.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: "desc" },
    }),
  ]);

  return (
    <section className="section-pad bg-surface">
      <div className="container-page space-y-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand">
              My account
            </p>
            <h1 className="mt-2 text-3xl text-foreground md:text-4xl">
              Hi, {user.name}
            </h1>
            <p className="mt-2 text-muted">{user.email}</p>
          </div>
          {user.role === "SUPERADMIN" ? (
            <Link
              href="/admin"
              className="rounded-xl bg-brand px-4 py-2.5 text-sm font-semibold text-white hover:bg-brand-dark"
            >
              Open Superadmin
            </Link>
          ) : null}
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              icon: UserRound,
              label: "Profile",
              value: user.phone || "Add phone",
            },
            { icon: Heart, label: "Favourites", value: String(favorites.length) },
            { icon: MapPin, label: "Saved plans", value: String(plans.length) },
            { icon: Plane, label: "Past trips", value: String(trips.length) },
          ].map((item) => (
            <div
              key={item.label}
              className="rounded-2xl border border-border bg-white p-5"
            >
              <item.icon className="h-5 w-5 text-brand" />
              <p className="mt-3 text-xs font-semibold uppercase tracking-wide text-muted">
                {item.label}
              </p>
              <p className="mt-1 text-xl font-semibold text-foreground">
                {item.value}
              </p>
            </div>
          ))}
        </div>

        <AccountClient
          user={user}
          favorites={favorites.map((f) => ({
            id: f.id,
            packageId: f.packageId,
            name: f.package.name,
            slug: f.package.slug,
            destination: f.package.destinationName,
            price: formatPrice(f.package.startingPrice),
            image: f.package.image,
          }))}
          plans={plans}
          trips={trips}
          initialTab={initialTab}
        />
      </div>
    </section>
  );
}
