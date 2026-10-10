"use client";

import Image from "next/image";
import { FormEvent, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import {
  LayoutDashboard,
  MapPin,
  Package,
  IndianRupee,
  Users,
  Plus,
  Pencil,
  Trash2,
  Search,
  X,
  Eye,
  EyeOff,
  Star,
  Upload,
  Home,
} from "lucide-react";
import Button from "@/components/Button";
import { formatPrice } from "@/data/company";
import { cn } from "@/lib/utils";
import type { SiteSettingsData } from "@/lib/site-settings";
import SiteSettingsEditor from "./SiteSettingsEditor";

type DestinationRow = {
  id: string;
  slug: string;
  name: string;
  shortDescription: string;
  description: string;
  image: string;
  startingPrice: number;
  region: string;
  bestTime: string;
  highlights: string[];
  published: boolean;
  packageCount: number;
  updatedAt: string;
};

type PackageRow = {
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
  published: boolean;
  image: string;
  overview: string;
  highlights: string[];
  gallery: string[];
  inclusions: string[];
  exclusions: string[];
  hotels: string[];
  transportation: string[];
  importantInfo: string[];
  updatedAt: string;
};

type UserRow = {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  role: string;
  createdAt: string;
  favorites: number;
  savedPlans: number;
  pastTrips: number;
};

type Tab =
  | "dashboard"
  | "site"
  | "destinations"
  | "packages"
  | "pricing"
  | "users";

const emptyDest = {
  id: "",
  slug: "",
  name: "",
  shortDescription: "",
  description: "",
  image:
    "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&q=80",
  startingPrice: "19999",
  region: "International",
  bestTime: "October – March",
  highlights: "",
  published: true,
};

const emptyPkg = {
  id: "",
  slug: "",
  name: "",
  destinationName: "",
  destinationSlug: "",
  duration: "4N / 5D",
  nights: "4",
  days: "5",
  startingPrice: "24999",
  originalPrice: "",
  emiFrom: "",
  category: "domestic",
  tripType: "leisure",
  badge: "",
  featured: true,
  published: true,
  image:
    "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&q=80",
  gallery: "",
  overview: "A curated holiday package designed by Yogo Voyage.",
  highlights: "",
  inclusions: "Hotel stay, Breakfast, Transfers",
  exclusions: "Flights, Personal expenses",
};

function splitCsv(value: string) {
  return value
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export default function AdminClient({
  stats,
  destinations,
  packages,
  users,
  siteSettings,
}: {
  stats: {
    destinations: number;
    packages: number;
    users: number;
    favorites: number;
    plans: number;
    livePackages: number;
    featuredPackages: number;
  };
  destinations: DestinationRow[];
  packages: PackageRow[];
  users: UserRow[];
  siteSettings: SiteSettingsData;
}) {
  const router = useRouter();
  const [tab, setTab] = useState<Tab>("dashboard");
  const [query, setQuery] = useState("");
  const [toast, setToast] = useState("");
  const [saving, setSaving] = useState(false);

  const [destOpen, setDestOpen] = useState(false);
  const [pkgOpen, setPkgOpen] = useState(false);
  const [destForm, setDestForm] = useState(emptyDest);
  const [pkgForm, setPkgForm] = useState(emptyPkg);

  function notify(msg: string) {
    setToast(msg);
    window.setTimeout(() => setToast(""), 2800);
  }

  const filteredDestinations = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return destinations;
    return destinations.filter(
      (d) =>
        d.name.toLowerCase().includes(q) ||
        d.region.toLowerCase().includes(q) ||
        d.slug.toLowerCase().includes(q),
    );
  }, [destinations, query]);

  const filteredPackages = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return packages;
    return packages.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.destinationName.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.slug.toLowerCase().includes(q),
    );
  }, [packages, query]);

  const filteredUsers = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return users;
    return users.filter(
      (u) =>
        u.name.toLowerCase().includes(q) ||
        u.email.toLowerCase().includes(q) ||
        (u.phone || "").includes(q),
    );
  }, [users, query]);

  function openCreateDest() {
    setDestForm(emptyDest);
    setDestOpen(true);
  }

  function openEditDest(d: DestinationRow) {
    setDestForm({
      id: d.id,
      slug: d.slug,
      name: d.name,
      shortDescription: d.shortDescription,
      description: d.description,
      image: d.image,
      startingPrice: String(d.startingPrice),
      region: d.region,
      bestTime: d.bestTime,
      highlights: d.highlights.join(", "),
      published: d.published,
    });
    setDestOpen(true);
  }

  function openCreatePkg() {
    setPkgForm(emptyPkg);
    setPkgOpen(true);
  }

  function openEditPkg(p: PackageRow) {
    setPkgForm({
      id: p.id,
      slug: p.slug,
      name: p.name,
      destinationName: p.destinationName,
      destinationSlug: p.destinationSlug,
      duration: p.duration,
      nights: String(p.nights),
      days: String(p.days),
      startingPrice: String(p.startingPrice),
      originalPrice: p.originalPrice ? String(p.originalPrice) : "",
      emiFrom: p.emiFrom ? String(p.emiFrom) : "",
      category: p.category,
      tripType: p.tripType,
      badge: p.badge || "",
      featured: p.featured,
      published: p.published,
      image: p.image,
      gallery: p.gallery.filter((url) => url !== p.image).join(", "),
      overview: p.overview,
      highlights: p.highlights.join(", "),
      inclusions: p.inclusions.join(", "),
      exclusions: p.exclusions.join(", "),
    });
    setPkgOpen(true);
  }

  async function saveDestination(e: FormEvent) {
    e.preventDefault();
    setSaving(true);
    const res = await fetch("/api/admin/destinations", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: destForm.id || undefined,
        slug: destForm.slug || slugify(destForm.name),
        name: destForm.name,
        shortDescription: destForm.shortDescription,
        description: destForm.description,
        image: destForm.image,
        startingPrice: Number(destForm.startingPrice),
        region: destForm.region,
        bestTime: destForm.bestTime,
        highlights: splitCsv(destForm.highlights),
        published: destForm.published,
      }),
    });
    setSaving(false);
    if (!res.ok) {
      notify("Destination save failed.");
      return;
    }
    notify(destForm.id ? "Destination updated." : "Destination added.");
    setDestOpen(false);
    router.refresh();
  }

  async function savePackage(e: FormEvent) {
    e.preventDefault();
    setSaving(true);
    const res = await fetch("/api/admin/packages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: pkgForm.id || undefined,
        slug: pkgForm.slug || slugify(pkgForm.name),
        name: pkgForm.name,
        destinationName: pkgForm.destinationName,
        destinationSlug:
          pkgForm.destinationSlug || slugify(pkgForm.destinationName),
        duration: pkgForm.duration,
        nights: Number(pkgForm.nights),
        days: Number(pkgForm.days),
        startingPrice: Number(pkgForm.startingPrice),
        originalPrice: pkgForm.originalPrice
          ? Number(pkgForm.originalPrice)
          : null,
        emiFrom: pkgForm.emiFrom ? Number(pkgForm.emiFrom) : null,
        category: pkgForm.category,
        tripType: pkgForm.tripType,
        badge: pkgForm.badge || null,
        featured: pkgForm.featured,
        published: pkgForm.published,
        image: pkgForm.image,
        overview: pkgForm.overview,
        highlights: splitCsv(pkgForm.highlights),
        gallery: [
          pkgForm.image,
          ...splitCsv(pkgForm.gallery).filter((url) => url !== pkgForm.image),
        ],
        inclusions: splitCsv(pkgForm.inclusions),
        exclusions: splitCsv(pkgForm.exclusions),
      }),
    });
    setSaving(false);
    if (!res.ok) {
      notify("Package save failed.");
      return;
    }
    notify(pkgForm.id ? "Package updated." : "Package added.");
    setPkgOpen(false);
    router.refresh();
  }

  async function deleteDestination(id: string) {
    if (!confirm("Delete this destination?")) return;
    await fetch(`/api/admin/destinations?id=${id}`, { method: "DELETE" });
    notify("Destination deleted.");
    router.refresh();
  }

  async function deletePackage(id: string) {
    if (!confirm("Delete this package?")) return;
    await fetch(`/api/admin/packages?id=${id}`, { method: "DELETE" });
    notify("Package deleted.");
    router.refresh();
  }

  async function patchPackage(
    id: string,
    patch: Record<string, string | number | boolean | null>,
  ) {
    const res = await fetch("/api/admin/packages", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, ...patch }),
    });
    if (res.ok) {
      notify("Package updated.");
      router.refresh();
    } else {
      notify("Update failed.");
    }
  }

  async function patchDestination(
    id: string,
    patch: Record<string, string | number | boolean>,
  ) {
    const res = await fetch("/api/admin/destinations", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, ...patch }),
    });
    if (res.ok) {
      notify("Destination updated.");
      router.refresh();
    } else {
      notify("Update failed.");
    }
  }

  const nav = [
    { id: "dashboard" as const, label: "Dashboard", icon: LayoutDashboard },
    { id: "site" as const, label: "Home & Contact", icon: Home },
    { id: "destinations" as const, label: "Destinations", icon: MapPin },
    { id: "packages" as const, label: "Packages", icon: Package },
    { id: "pricing" as const, label: "Pricing", icon: IndianRupee },
    { id: "users" as const, label: "Users", icon: Users },
  ];

  return (
    <div className="grid gap-6 lg:grid-cols-[240px_1fr]">
      <aside className="h-fit rounded-2xl border border-stone-200 bg-white p-3 shadow-sm">
        <nav className="space-y-1">
          {nav.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => {
                  setTab(item.id);
                  setQuery("");
                }}
                className={cn(
                  "flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-semibold transition",
                  tab === item.id
                    ? "bg-brand text-white"
                    : "text-stone-700 hover:bg-brand-soft hover:text-brand",
                )}
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </button>
            );
          })}
        </nav>
      </aside>

      <div className="min-w-0 space-y-5">
        {toast ? (
          <div className="rounded-xl border border-brand/20 bg-brand-soft px-4 py-3 text-sm font-medium text-brand">
            {toast}
          </div>
        ) : null}

        {tab === "dashboard" ? (
          <div className="space-y-5">
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {[
                { label: "Destinations", value: stats.destinations },
                { label: "Packages", value: stats.packages },
                { label: "Live packages", value: stats.livePackages },
                { label: "Featured", value: stats.featuredPackages },
                { label: "Users", value: stats.users },
                { label: "Favourites saved", value: stats.favorites },
                { label: "Travel plans", value: stats.plans },
              ].map((card) => (
                <div
                  key={card.label}
                  className="rounded-2xl border border-stone-200 bg-white p-5 shadow-sm"
                >
                  <p className="text-xs font-semibold uppercase tracking-wide text-muted">
                    {card.label}
                  </p>
                  <p className="mt-2 text-3xl font-bold text-foreground">
                    {card.value}
                  </p>
                </div>
              ))}
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-2xl border border-stone-200 bg-white p-5 shadow-sm">
                <div className="mb-4 flex items-center justify-between">
                  <h2 className="text-lg font-bold">Quick actions</h2>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Button type="button" onClick={openCreateDest}>
                    <Plus className="h-4 w-4" /> Add destination
                  </Button>
                  <Button type="button" onClick={openCreatePkg}>
                    <Plus className="h-4 w-4" /> Add package
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setTab("pricing")}
                  >
                    Manage pricing
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setTab("site")}
                  >
                    Edit home & contact
                  </Button>
                </div>
              </div>
              <div className="rounded-2xl border border-stone-200 bg-white p-5 shadow-sm">
                <h2 className="mb-3 text-lg font-bold">Recent packages</h2>
                <ul className="space-y-2">
                  {packages.slice(0, 5).map((p) => (
                    <li
                      key={p.id}
                      className="flex items-center justify-between gap-3 rounded-xl bg-surface px-3 py-2 text-sm"
                    >
                      <span className="truncate font-medium">{p.name}</span>
                      <span className="shrink-0 text-muted">
                        {formatPrice(p.startingPrice)}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ) : null}

        {tab !== "dashboard" && tab !== "site" ? (
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="relative min-w-[240px] flex-1">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={`Search ${tab}...`}
                className="w-full rounded-xl border border-border bg-white py-2.5 pl-10 pr-3 text-sm outline-none focus:border-brand"
              />
            </div>
            {tab === "destinations" ? (
              <Button type="button" onClick={openCreateDest}>
                <Plus className="h-4 w-4" /> Add destination
              </Button>
            ) : null}
            {tab === "packages" ? (
              <Button type="button" onClick={openCreatePkg}>
                <Plus className="h-4 w-4" /> Add package
              </Button>
            ) : null}
          </div>
        ) : null}

        {tab === "site" ? <SiteSettingsEditor initial={siteSettings} /> : null}

        {tab === "destinations" ? (
          <div className="overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm">
            <div className="overflow-x-auto">
              <table className="min-w-full text-left text-sm">
                <thead className="bg-surface text-xs uppercase tracking-wide text-muted">
                  <tr>
                    <th className="px-4 py-3">Destination</th>
                    <th className="px-4 py-3">Region</th>
                    <th className="px-4 py-3">From</th>
                    <th className="px-4 py-3">Packages</th>
                    <th className="px-4 py-3">Status</th>
                    <th className="px-4 py-3">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredDestinations.map((d) => (
                    <tr key={d.id} className="border-t border-stone-100">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <div className="relative h-12 w-12 overflow-hidden rounded-lg">
                            <Image
                              src={d.image}
                              alt=""
                              fill
                              className="object-cover"
                              sizes="48px"
                            />
                          </div>
                          <div>
                            <p className="font-semibold">{d.name}</p>
                            <p className="text-xs text-muted">{d.slug}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3">{d.region}</td>
                      <td className="px-4 py-3">
                        {formatPrice(d.startingPrice)}
                      </td>
                      <td className="px-4 py-3">{d.packageCount}</td>
                      <td className="px-4 py-3">
                        <button
                          type="button"
                          onClick={() =>
                            patchDestination(d.id, {
                              published: !d.published,
                            })
                          }
                          className={cn(
                            "inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold",
                            d.published
                              ? "bg-green-50 text-green-700"
                              : "bg-stone-100 text-stone-600",
                          )}
                        >
                          {d.published ? (
                            <Eye className="h-3.5 w-3.5" />
                          ) : (
                            <EyeOff className="h-3.5 w-3.5" />
                          )}
                          {d.published ? "Live" : "Hidden"}
                        </button>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex gap-2">
                          <button
                            type="button"
                            onClick={() => openEditDest(d)}
                            className="rounded-lg border border-border p-2 hover:border-brand hover:text-brand"
                            aria-label="Edit"
                          >
                            <Pencil className="h-4 w-4" />
                          </button>
                          <button
                            type="button"
                            onClick={() => deleteDestination(d.id)}
                            className="rounded-lg border border-border p-2 hover:border-red-300 hover:text-red-600"
                            aria-label="Delete"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {filteredDestinations.length === 0 ? (
              <p className="p-8 text-center text-muted">No destinations found.</p>
            ) : null}
          </div>
        ) : null}

        {tab === "packages" ? (
          <div className="overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm">
            <div className="overflow-x-auto">
              <table className="min-w-full text-left text-sm">
                <thead className="bg-surface text-xs uppercase tracking-wide text-muted">
                  <tr>
                    <th className="px-4 py-3">Package</th>
                    <th className="px-4 py-3">Destination</th>
                    <th className="px-4 py-3">Category</th>
                    <th className="px-4 py-3">Price</th>
                    <th className="px-4 py-3">Flags</th>
                    <th className="px-4 py-3">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredPackages.map((p) => (
                    <tr key={p.id} className="border-t border-stone-100">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <div className="relative h-12 w-12 overflow-hidden rounded-lg">
                            <Image
                              src={p.image}
                              alt=""
                              fill
                              className="object-cover"
                              sizes="48px"
                            />
                          </div>
                          <div>
                            <p className="font-semibold">{p.name}</p>
                            <p className="text-xs text-muted">
                              {p.duration} · {p.tripType}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3">{p.destinationName}</td>
                      <td className="px-4 py-3 capitalize">{p.category}</td>
                      <td className="px-4 py-3">
                        <p className="font-semibold">
                          {formatPrice(p.startingPrice)}
                        </p>
                        {p.originalPrice ? (
                          <p className="text-xs text-muted line-through">
                            {formatPrice(p.originalPrice)}
                          </p>
                        ) : null}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex flex-wrap gap-1">
                          <button
                            type="button"
                            onClick={() =>
                              patchPackage(p.id, { published: !p.published })
                            }
                            className={cn(
                              "rounded-full px-2 py-0.5 text-[11px] font-semibold",
                              p.published
                                ? "bg-green-50 text-green-700"
                                : "bg-stone-100 text-stone-600",
                            )}
                          >
                            {p.published ? "Live" : "Hidden"}
                          </button>
                          <button
                            type="button"
                            onClick={() =>
                              patchPackage(p.id, { featured: !p.featured })
                            }
                            className={cn(
                              "inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-semibold",
                              p.featured
                                ? "bg-amber-50 text-amber-700"
                                : "bg-stone-100 text-stone-600",
                            )}
                          >
                            <Star className="h-3 w-3" />
                            {p.featured ? "Featured" : "Normal"}
                          </button>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex gap-2">
                          <button
                            type="button"
                            onClick={() => openEditPkg(p)}
                            className="rounded-lg border border-border p-2 hover:border-brand hover:text-brand"
                            aria-label="Edit"
                          >
                            <Pencil className="h-4 w-4" />
                          </button>
                          <button
                            type="button"
                            onClick={() => deletePackage(p.id)}
                            className="rounded-lg border border-border p-2 hover:border-red-300 hover:text-red-600"
                            aria-label="Delete"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {filteredPackages.length === 0 ? (
              <p className="p-8 text-center text-muted">No packages found.</p>
            ) : null}
          </div>
        ) : null}

        {tab === "pricing" ? (
          <div className="overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm">
            <div className="border-b border-stone-100 px-4 py-3">
              <h2 className="font-bold">Price management</h2>
              <p className="text-sm text-muted">
                Edit price / MRP / EMI inline — changes save on blur.
              </p>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full text-left text-sm">
                <thead className="bg-surface text-xs uppercase tracking-wide text-muted">
                  <tr>
                    <th className="px-4 py-3">Package</th>
                    <th className="px-4 py-3">Starting</th>
                    <th className="px-4 py-3">MRP</th>
                    <th className="px-4 py-3">EMI / month</th>
                    <th className="px-4 py-3">Badge</th>
                    <th className="px-4 py-3">Edit full</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredPackages.map((p) => (
                    <tr key={p.id} className="border-t border-stone-100">
                      <td className="px-4 py-3">
                        <p className="font-semibold">{p.name}</p>
                        <p className="text-xs text-muted">
                          {p.destinationName}
                        </p>
                      </td>
                      <td className="px-4 py-3">
                        <input
                          type="number"
                          defaultValue={p.startingPrice}
                          className="w-28 rounded-lg border border-border px-2 py-1.5"
                          onBlur={(e) =>
                            patchPackage(p.id, {
                              startingPrice: Number(e.target.value),
                            })
                          }
                        />
                      </td>
                      <td className="px-4 py-3">
                        <input
                          type="number"
                          defaultValue={p.originalPrice ?? ""}
                          placeholder="MRP"
                          className="w-28 rounded-lg border border-border px-2 py-1.5"
                          onBlur={(e) =>
                            patchPackage(p.id, {
                              originalPrice: e.target.value
                                ? Number(e.target.value)
                                : null,
                            })
                          }
                        />
                      </td>
                      <td className="px-4 py-3">
                        <input
                          type="number"
                          defaultValue={p.emiFrom ?? ""}
                          placeholder="EMI"
                          className="w-28 rounded-lg border border-border px-2 py-1.5"
                          onBlur={(e) =>
                            patchPackage(p.id, {
                              emiFrom: e.target.value
                                ? Number(e.target.value)
                                : null,
                            })
                          }
                        />
                      </td>
                      <td className="px-4 py-3">
                        <input
                          defaultValue={p.badge ?? ""}
                          placeholder="Badge"
                          className="w-36 rounded-lg border border-border px-2 py-1.5"
                          onBlur={(e) =>
                            patchPackage(p.id, {
                              badge: e.target.value || null,
                            })
                          }
                        />
                      </td>
                      <td className="px-4 py-3">
                        <Button
                          type="button"
                          size="sm"
                          variant="outline"
                          onClick={() => openEditPkg(p)}
                        >
                          Edit
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : null}

        {tab === "users" ? (
          <div className="overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm">
            <div className="overflow-x-auto">
              <table className="min-w-full text-left text-sm">
                <thead className="bg-surface text-xs uppercase tracking-wide text-muted">
                  <tr>
                    <th className="px-4 py-3">User</th>
                    <th className="px-4 py-3">Phone</th>
                    <th className="px-4 py-3">Role</th>
                    <th className="px-4 py-3">Favourites</th>
                    <th className="px-4 py-3">Plans</th>
                    <th className="px-4 py-3">Trips</th>
                    <th className="px-4 py-3">Joined</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map((u) => (
                    <tr key={u.id} className="border-t border-stone-100">
                      <td className="px-4 py-3">
                        <p className="font-semibold">{u.name}</p>
                        <p className="text-xs text-muted">{u.email}</p>
                      </td>
                      <td className="px-4 py-3">{u.phone || "—"}</td>
                      <td className="px-4 py-3">
                        <span
                          className={cn(
                            "rounded-full px-2.5 py-1 text-xs font-semibold",
                            u.role === "SUPERADMIN"
                              ? "bg-brand-soft text-brand"
                              : "bg-stone-100 text-stone-700",
                          )}
                        >
                          {u.role}
                        </span>
                      </td>
                      <td className="px-4 py-3">{u.favorites}</td>
                      <td className="px-4 py-3">{u.savedPlans}</td>
                      <td className="px-4 py-3">{u.pastTrips}</td>
                      <td className="px-4 py-3 text-muted">
                        {new Date(u.createdAt).toLocaleDateString("en-IN")}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : null}
      </div>

      {destOpen ? (
        <Modal
          title={destForm.id ? "Edit destination" : "Add destination"}
          onClose={() => setDestOpen(false)}
          footer={
            <>
              <Button
                type="button"
                variant="outline"
                onClick={() => setDestOpen(false)}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                form="destination-form"
                disabled={saving}
              >
                {saving ? "Saving..." : destForm.id ? "Update" : "Add"}
              </Button>
            </>
          }
        >
          <form
            id="destination-form"
            onSubmit={saveDestination}
            className="space-y-5"
          >
            <Section title="Basic details">
              <div className="grid gap-3 sm:grid-cols-2">
                <Field
                  label="Name"
                  value={destForm.name}
                  onChange={(v) =>
                    setDestForm((f) => ({
                      ...f,
                      name: v,
                      slug: f.id ? f.slug : slugify(v),
                    }))
                  }
                  required
                />
                <Field
                  label="Slug"
                  value={destForm.slug}
                  onChange={(v) => setDestForm((f) => ({ ...f, slug: v }))}
                  required
                />
                <Field
                  label="Region"
                  value={destForm.region}
                  onChange={(v) => setDestForm((f) => ({ ...f, region: v }))}
                  required
                />
                <Field
                  label="Best time"
                  value={destForm.bestTime}
                  onChange={(v) => setDestForm((f) => ({ ...f, bestTime: v }))}
                  required
                />
                <Field
                  label="Starting price"
                  value={destForm.startingPrice}
                  onChange={(v) =>
                    setDestForm((f) => ({ ...f, startingPrice: v }))
                  }
                  type="number"
                  required
                />
              </div>
            </Section>

            <Section title="Cover image">
              <ImageUrlField
                label="Image URL"
                value={destForm.image}
                onChange={(v) => setDestForm((f) => ({ ...f, image: v }))}
                required
              />
              <ImagePreview urls={[destForm.image]} />
            </Section>

            <Section title="Descriptions">
              <Field
                label="Short description"
                value={destForm.shortDescription}
                onChange={(v) =>
                  setDestForm((f) => ({ ...f, shortDescription: v }))
                }
                textarea
                required
              />
              <Field
                label="Full description"
                value={destForm.description}
                onChange={(v) => setDestForm((f) => ({ ...f, description: v }))}
                textarea
                required
              />
              <Field
                label="Highlights (comma separated)"
                value={destForm.highlights}
                onChange={(v) => setDestForm((f) => ({ ...f, highlights: v }))}
                textarea
              />
              <label className="inline-flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={destForm.published}
                  onChange={(e) =>
                    setDestForm((f) => ({ ...f, published: e.target.checked }))
                  }
                />
                Published / Live on website
              </label>
            </Section>
          </form>
        </Modal>
      ) : null}

      {pkgOpen ? (
        <Modal
          title={pkgForm.id ? "Edit package" : "Add package"}
          onClose={() => setPkgOpen(false)}
          wide
          footer={
            <>
              <Button
                type="button"
                variant="outline"
                onClick={() => setPkgOpen(false)}
              >
                Cancel
              </Button>
              <Button type="submit" form="package-form" disabled={saving}>
                {saving
                  ? "Saving..."
                  : pkgForm.id
                    ? "Update package"
                    : "Add package"}
              </Button>
            </>
          }
        >
          <form id="package-form" onSubmit={savePackage} className="space-y-5">
            <Section title="Basic details">
              <div className="grid gap-3 sm:grid-cols-2">
                <Field
                  label="Package name"
                  value={pkgForm.name}
                  onChange={(v) =>
                    setPkgForm((f) => ({
                      ...f,
                      name: v,
                      slug: f.id ? f.slug : slugify(v),
                    }))
                  }
                  required
                />
                <Field
                  label="Slug"
                  value={pkgForm.slug}
                  onChange={(v) => setPkgForm((f) => ({ ...f, slug: v }))}
                  required
                />
                <label className="form-field">
                  <span>Destination</span>
                  <select
                    className="form-control"
                    value={pkgForm.destinationSlug}
                    onChange={(e) => {
                      const d = destinations.find(
                        (x) => x.slug === e.target.value,
                      );
                      setPkgForm((f) => ({
                        ...f,
                        destinationSlug: e.target.value,
                        destinationName: d?.name || f.destinationName,
                      }));
                    }}
                    required
                  >
                    <option value="">Select destination</option>
                    {destinations.map((d) => (
                      <option key={d.id} value={d.slug}>
                        {d.name}
                      </option>
                    ))}
                  </select>
                </label>
                <Field
                  label="Destination name"
                  value={pkgForm.destinationName}
                  onChange={(v) =>
                    setPkgForm((f) => ({
                      ...f,
                      destinationName: v,
                      destinationSlug: f.destinationSlug || slugify(v),
                    }))
                  }
                  required
                />
              </div>
            </Section>

            <Section title="Duration & pricing">
              <div className="grid gap-3 sm:grid-cols-3">
                <Field
                  label="Duration"
                  value={pkgForm.duration}
                  onChange={(v) => setPkgForm((f) => ({ ...f, duration: v }))}
                  required
                />
                <Field
                  label="Nights"
                  value={pkgForm.nights}
                  onChange={(v) => setPkgForm((f) => ({ ...f, nights: v }))}
                  type="number"
                  required
                />
                <Field
                  label="Days"
                  value={pkgForm.days}
                  onChange={(v) => setPkgForm((f) => ({ ...f, days: v }))}
                  type="number"
                  required
                />
                <Field
                  label="Starting price"
                  value={pkgForm.startingPrice}
                  onChange={(v) =>
                    setPkgForm((f) => ({ ...f, startingPrice: v }))
                  }
                  type="number"
                  required
                />
                <Field
                  label="MRP / original"
                  value={pkgForm.originalPrice}
                  onChange={(v) =>
                    setPkgForm((f) => ({ ...f, originalPrice: v }))
                  }
                  type="number"
                />
                <Field
                  label="EMI from"
                  value={pkgForm.emiFrom}
                  onChange={(v) => setPkgForm((f) => ({ ...f, emiFrom: v }))}
                  type="number"
                />
              </div>
            </Section>

            <Section title="Category & visibility">
              <div className="grid gap-3 sm:grid-cols-3">
                <label className="form-field">
                  <span>Category</span>
                  <select
                    className="form-control"
                    value={pkgForm.category}
                    onChange={(e) =>
                      setPkgForm((f) => ({ ...f, category: e.target.value }))
                    }
                  >
                    <option value="domestic">Domestic</option>
                    <option value="international">International</option>
                  </select>
                </label>
                <label className="form-field">
                  <span>Trip type</span>
                  <select
                    className="form-control"
                    value={pkgForm.tripType}
                    onChange={(e) =>
                      setPkgForm((f) => ({ ...f, tripType: e.target.value }))
                    }
                  >
                    <option value="leisure">Leisure</option>
                    <option value="honeymoon">Honeymoon</option>
                    <option value="family">Family</option>
                    <option value="adventure">Adventure</option>
                  </select>
                </label>
                <Field
                  label="Badge"
                  value={pkgForm.badge}
                  onChange={(v) => setPkgForm((f) => ({ ...f, badge: v }))}
                />
              </div>
              <div className="mt-3 flex flex-wrap gap-4 text-sm">
                <label className="inline-flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={pkgForm.featured}
                    onChange={(e) =>
                      setPkgForm((f) => ({ ...f, featured: e.target.checked }))
                    }
                  />
                  Featured on homepage
                </label>
                <label className="inline-flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={pkgForm.published}
                    onChange={(e) =>
                      setPkgForm((f) => ({ ...f, published: e.target.checked }))
                    }
                  />
                  Published / Live
                </label>
              </div>
            </Section>

            <Section title="Images">
              <ImageUrlField
                label="Main cover image URL"
                value={pkgForm.image}
                onChange={(v) => setPkgForm((f) => ({ ...f, image: v }))}
                required
              />
              <p className="text-xs text-muted">Main cover preview</p>
              <ImagePreview urls={[pkgForm.image]} large />
              <ImageUrlField
                label="Extra gallery image URLs (comma separated)"
                value={pkgForm.gallery}
                onChange={(v) => setPkgForm((f) => ({ ...f, gallery: v }))}
                textarea
                multiple
              />
              <p className="text-xs text-muted">Gallery preview</p>
              <ImagePreview urls={splitCsv(pkgForm.gallery)} />
            </Section>

            <Section title="Content">
              <Field
                label="Overview"
                value={pkgForm.overview}
                onChange={(v) => setPkgForm((f) => ({ ...f, overview: v }))}
                textarea
                required
              />
              <Field
                label="Highlights (comma separated)"
                value={pkgForm.highlights}
                onChange={(v) => setPkgForm((f) => ({ ...f, highlights: v }))}
                textarea
              />
              <Field
                label="Inclusions (comma separated)"
                value={pkgForm.inclusions}
                onChange={(v) => setPkgForm((f) => ({ ...f, inclusions: v }))}
                textarea
              />
              <Field
                label="Exclusions (comma separated)"
                value={pkgForm.exclusions}
                onChange={(v) => setPkgForm((f) => ({ ...f, exclusions: v }))}
                textarea
              />
            </Section>
          </form>
        </Modal>
      ) : null}
    </div>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-2xl border border-stone-200 bg-stone-50/70 p-4">
      <h3 className="mb-3 text-sm font-bold uppercase tracking-wide text-brand">
        {title}
      </h3>
      <div className="space-y-3">{children}</div>
    </section>
  );
}

function ImagePreview({
  urls,
  large = false,
}: {
  urls: string[];
  large?: boolean;
}) {
  const list = [...new Set(urls.map((u) => u.trim()).filter(Boolean))];
  if (!list.length) {
    return (
      <div className="rounded-xl border border-dashed border-stone-300 bg-white px-4 py-8 text-center text-sm text-muted">
        Paste a URL or upload an image to preview
      </div>
    );
  }

  return (
    <div
      className={cn(
        "grid gap-3",
        large ? "grid-cols-1" : "grid-cols-2 sm:grid-cols-3",
      )}
    >
      {list.map((url) => (
        <PreviewThumb key={url} url={url} large={large} />
      ))}
    </div>
  );
}

function PreviewThumb({ url, large }: { url: string; large?: boolean }) {
  const [failed, setFailed] = useState(false);

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-xl border border-stone-200 bg-white",
        large ? "h-48 sm:h-56" : "h-28",
      )}
    >
      {failed ? (
        <div className="flex h-full items-center justify-center bg-stone-100 px-3 text-center text-xs text-muted">
          Could not load image
        </div>
      ) : (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={url}
          alt="Preview"
          className="h-full w-full object-cover"
          onError={() => setFailed(true)}
        />
      )}
    </div>
  );
}

function Modal({
  title,
  onClose,
  children,
  footer,
  wide = false,
}: {
  title: string;
  onClose: () => void;
  children: React.ReactNode;
  footer?: React.ReactNode;
  wide?: boolean;
}) {
  return (
    <div className="fixed inset-0 z-[90] flex items-center justify-center p-3 sm:p-6">
      <button
        type="button"
        className="absolute inset-0 bg-stone-950/55"
        aria-label="Close modal"
        onClick={onClose}
      />
      <div
        className={cn(
          "relative flex max-h-[92vh] w-full flex-col overflow-hidden rounded-2xl border border-border bg-white shadow-2xl",
          wide ? "max-w-4xl" : "max-w-2xl",
        )}
      >
        <div className="flex shrink-0 items-center justify-between border-b border-border px-5 py-4">
          <h2 className="text-xl font-bold">{title}</h2>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full p-1.5 hover:bg-stone-100"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="min-h-0 flex-1 overflow-y-auto p-5">{children}</div>
        {footer ? (
          <div className="flex shrink-0 justify-end gap-2 border-t border-border bg-stone-50 px-5 py-4">
            {footer}
          </div>
        ) : null}
      </div>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  required,
  textarea,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  required?: boolean;
  textarea?: boolean;
  type?: string;
}) {
  return (
    <label className={cn("form-field", textarea && "form-field-tall")}>
      <span>{label}</span>
      {textarea ? (
        <textarea
          className="form-control"
          rows={3}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          required={required}
        />
      ) : (
        <input
          type={type}
          className="form-control"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          required={required}
        />
      )}
    </label>
  );
}

function ImageUrlField({
  label,
  value,
  onChange,
  required,
  textarea,
  multiple = false,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  required?: boolean;
  textarea?: boolean;
  multiple?: boolean;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  async function uploadFiles(files: FileList | null) {
    if (!files?.length) return;
    setUploading(true);
    setError("");
    try {
      const uploaded: string[] = [];
      for (const file of Array.from(files)) {
        const body = new FormData();
        body.append("file", file);
        const res = await fetch("/api/admin/upload", {
          method: "POST",
          body,
        });
        const data = (await res.json()) as { url?: string; error?: string };
        if (!res.ok || !data.url) {
          throw new Error(data.error || "Upload failed");
        }
        uploaded.push(data.url);
      }

      if (multiple) {
        const existing = splitCsv(value);
        onChange([...existing, ...uploaded].join(", "));
      } else {
        onChange(uploaded[0]);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  }

  return (
    <div className="space-y-2">
      <Field
        label={label}
        value={value}
        onChange={onChange}
        required={required}
        textarea={textarea}
      />
      <div className="flex flex-wrap items-center gap-2">
        <input
          ref={inputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp,image/gif"
          multiple={multiple}
          className="hidden"
          onChange={(e) => uploadFiles(e.target.files)}
        />
        <Button
          type="button"
          variant="outline"
          size="sm"
          disabled={uploading}
          onClick={() => inputRef.current?.click()}
        >
          <Upload className="h-4 w-4" />
          {uploading
            ? "Uploading..."
            : multiple
              ? "Upload images"
              : "Upload from computer"}
        </Button>
        <span className="text-xs text-muted">
          JPG / PNG / WEBP / GIF · max 5MB
        </span>
      </div>
      {error ? <p className="text-xs font-medium text-red-600">{error}</p> : null}
    </div>
  );
}
