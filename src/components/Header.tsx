"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import {
  ChevronDown,
  Heart,
  Map,
  Menu,
  Phone,
  UserRound,
  X,
} from "lucide-react";
import { company, navLinks } from "@/data/company";
import { destinations } from "@/data/destinations";
import { cn } from "@/lib/utils";
import Logo from "./Logo";
import SiteSearch from "./SiteSearch";

const topLeftLinks = [
  { href: "/packages?category=domestic", label: "India Holidays" },
  { href: "/packages?category=international", label: "International" },
  { href: "/destinations", label: "Destinations" },
];

const topRightLinks = [
  { href: "/about", label: "About Us" },
  { href: "/contact", label: "Contact" },
];

const primaryNav = [
  {
    label: "Things to do",
    href: "/services",
    children: [
      { href: "/packages?tripType=leisure", label: "Leisure escapes" },
      { href: "/packages?tripType=adventure", label: "Adventure" },
      { href: "/packages?tripType=honeymoon", label: "Honeymoon" },
      { href: "/packages?tripType=family", label: "Family holidays" },
    ],
  },
  {
    label: "Where to go",
    href: "/destinations",
    children: destinations.map((d) => ({
      href: `/packages?destination=${d.slug}`,
      label: d.name,
    })),
  },
  {
    label: "Plan your trip",
    href: "/contact",
    children: [
      { href: "/packages", label: "Tour packages" },
      { href: "/contact", label: "Get a free quote" },
      { href: "/services", label: "Travel services" },
      { href: "/about", label: "Why Yogo Voyage" },
    ],
  },
  {
    label: "Packages",
    href: "/packages",
  },
];

export default function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const isAdmin = pathname?.startsWith("/admin");

  useEffect(() => {
    if (isAdmin) return;
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isAdmin]);

  useEffect(() => {
    if (isAdmin) return;
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open, isAdmin]);

  if (isAdmin) {
    return null;
  }

  return (
    <header
      className={cn(
        "sticky top-0 z-50 bg-white transition-shadow duration-300",
        scrolled ? "shadow-[0_8px_30px_rgba(15,23,42,0.08)]" : "shadow-none",
      )}
    >
      {/* Top utility bar */}
      <div className="hidden border-b border-stone-200/80 bg-white lg:block">
        <div className="container-page flex h-9 items-center justify-between text-[12px] text-stone-600">
          <div className="flex items-center gap-5">
            {topLeftLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="transition hover:text-brand"
              >
                {link.label}
              </Link>
            ))}
          </div>
          <div className="flex items-center gap-5">
            {topRightLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="transition hover:text-brand"
              >
                {link.label}
              </Link>
            ))}
            <a
              href={`tel:${company.phoneRaw}`}
              className="inline-flex items-center gap-1.5 font-medium text-stone-700 transition hover:text-brand"
            >
              <Phone className="h-3.5 w-3.5" />
              {company.phone}
            </a>
          </div>
        </div>
      </div>

      {/* Main nav */}
      <div className="border-b border-stone-200/80">
        <div className="container-page grid h-[4.5rem] grid-cols-[auto_1fr_auto] items-center gap-4 md:h-[5.25rem]">
          <Logo priority size="md" />

          <nav className="hidden items-center justify-center gap-1 xl:flex">
            {primaryNav.map((item) => {
              const hasChildren = Boolean(item.children?.length);
              const isOpen = activeMenu === item.label;

              return (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() =>
                    hasChildren ? setActiveMenu(item.label) : setActiveMenu(null)
                  }
                  onMouseLeave={() => setActiveMenu(null)}
                >
                  <Link
                    href={item.href}
                    className={cn(
                      "inline-flex items-center gap-1.5 px-3 py-2 text-[13px] font-bold uppercase tracking-[0.08em] text-brand transition",
                      isOpen && "text-brand-dark",
                    )}
                  >
                    {item.label}
                    {hasChildren ? (
                      <ChevronDown
                        className={cn(
                          "h-3.5 w-3.5 transition",
                          isOpen && "rotate-180",
                        )}
                      />
                    ) : null}
                  </Link>
                  <span
                    className={cn(
                      "absolute inset-x-3 -bottom-0.5 h-[3px] rounded-full bg-brand transition",
                      isOpen ? "opacity-100" : "opacity-0",
                    )}
                  />

                  {hasChildren && isOpen ? (
                    <div className="absolute left-1/2 top-full z-50 w-56 -translate-x-1/2 pt-3">
                      <div className="overflow-hidden rounded-2xl border border-stone-200 bg-white py-2 shadow-[0_18px_50px_rgba(15,23,42,0.12)]">
                        {item.children!.map((child) => (
                          <Link
                            key={child.href + child.label}
                            href={child.href}
                            className="block px-4 py-2.5 text-sm font-medium text-stone-700 transition hover:bg-brand-soft hover:text-brand"
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  ) : null}
                </div>
              );
            })}
          </nav>

          <div className="hidden items-center justify-end gap-3 xl:flex">
            <Link
              href="/account?tab=favorites"
              className="inline-flex items-center gap-2.5 rounded-xl px-2 py-1.5 transition hover:bg-stone-50"
            >
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-red-500 text-white shadow-sm shadow-red-500/30">
                <Heart className="h-3.5 w-3.5 fill-white" />
              </span>
              <span className="leading-tight">
                <span className="block text-[13px] font-bold text-stone-800">
                  Wishlist
                </span>
                <span className="block text-[11px] text-stone-500">
                  Save favourites
                </span>
              </span>
            </Link>
            <SiteSearch />
            <Link
              href="/destinations"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-stone-100 text-stone-800 transition hover:bg-brand-soft hover:text-brand"
              aria-label="Browse destinations"
            >
              <Map className="h-4 w-4" />
            </Link>
            <Link
              href="/account"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-stone-100 text-stone-800 transition hover:bg-brand-soft hover:text-brand"
              aria-label="My account"
            >
              <UserRound className="h-4 w-4" />
            </Link>
          </div>

          <div className="ml-auto flex items-center gap-2 xl:hidden">
            <Link
              href="/account?tab=favorites"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-red-500 text-white"
              aria-label="Wishlist"
            >
              <Heart className="h-4 w-4 fill-white" />
            </Link>
            <SiteSearch />
            <Link
              href="/account"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-stone-100 text-stone-800"
              aria-label="My account"
            >
              <UserRound className="h-4 w-4" />
            </Link>
            <button
              type="button"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-stone-100 text-stone-800"
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {open ? (
        <div className="border-b border-stone-200 bg-white xl:hidden">
          <nav className="container-page flex max-h-[75vh] flex-col gap-1 overflow-y-auto py-4">
            {primaryNav.map((item) => (
              <div key={item.label} className="border-b border-stone-100 py-2">
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="block px-2 py-2 text-sm font-bold uppercase tracking-wide text-brand"
                >
                  {item.label}
                </Link>
                {item.children?.map((child) => (
                  <Link
                    key={child.href + child.label}
                    href={child.href}
                    onClick={() => setOpen(false)}
                    className="block rounded-lg px-3 py-2 text-sm text-stone-600 hover:bg-brand-soft hover:text-brand"
                  >
                    {child.label}
                  </Link>
                ))}
              </div>
            ))}
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-xl px-3 py-3 text-base font-medium text-foreground hover:bg-brand-soft hover:text-brand"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/account?tab=favorites"
              onClick={() => setOpen(false)}
              className="inline-flex items-center gap-3 rounded-xl px-3 py-3 text-base font-medium text-foreground hover:bg-brand-soft hover:text-brand"
            >
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-red-500 text-white">
                <Heart className="h-3.5 w-3.5 fill-white" />
              </span>
              <span>
                <span className="block font-bold">Wishlist</span>
                <span className="block text-sm text-muted">Save favourites</span>
              </span>
            </Link>
            <a
              href={`tel:${company.phoneRaw}`}
              className="mt-2 rounded-xl bg-brand px-4 py-3 text-center text-sm font-semibold text-white"
            >
              Call {company.phone}
            </a>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
