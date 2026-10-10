"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { Search, X } from "lucide-react";
import { destinations } from "@/data/destinations";
import { packages } from "@/data/packages";
import { formatPrice } from "@/data/company";
import { cn } from "@/lib/utils";

export default function SiteSearch() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!open) return;
    const t = window.setTimeout(() => inputRef.current?.focus(), 20);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.clearTimeout(t);
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  const q = query.trim().toLowerCase();

  const results = useMemo(() => {
    if (q.length < 1) {
      return {
        destinations: destinations.slice(0, 4),
        packages: packages.filter((p) => p.featured).slice(0, 4),
      };
    }
    return {
      destinations: destinations
        .filter(
          (d) =>
            d.name.toLowerCase().includes(q) ||
            d.region.toLowerCase().includes(q) ||
            d.shortDescription.toLowerCase().includes(q) ||
            d.highlights.some((h) => h.toLowerCase().includes(q)),
        )
        .slice(0, 6),
      packages: packages
        .filter(
          (p) =>
            p.name.toLowerCase().includes(q) ||
            p.destination.toLowerCase().includes(q) ||
            p.category.toLowerCase().includes(q) ||
            p.tripType.toLowerCase().includes(q) ||
            p.highlights.some((h) => h.toLowerCase().includes(q)),
        )
        .slice(0, 6),
    };
  }, [q]);

  const hasResults =
    results.destinations.length > 0 || results.packages.length > 0;

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-stone-100 text-stone-800 transition hover:bg-brand-soft hover:text-brand"
        aria-label="Search destinations and packages"
      >
        <Search className="h-4 w-4" />
      </button>

      {open ? (
        <div className="fixed inset-0 z-[80]">
          <button
            type="button"
            className="absolute inset-0 bg-stone-950/45"
            aria-label="Close search"
            onClick={() => setOpen(false)}
          />
          <div className="relative mx-auto mt-16 w-[min(720px,calc(100%-1.5rem))] overflow-hidden rounded-2xl border border-border bg-white shadow-2xl">
            <div className="flex items-center gap-3 border-b border-border px-4 py-3">
              <Search className="h-5 w-5 shrink-0 text-brand" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search destinations, packages, trip styles…"
                className="w-full bg-transparent text-base outline-none placeholder:text-muted"
                aria-label="Search"
              />
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-full p-1.5 text-muted hover:bg-stone-100 hover:text-foreground"
                aria-label="Close"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="max-h-[min(70vh,520px)] overflow-y-auto p-3">
              {!hasResults ? (
                <p className="px-3 py-8 text-center text-sm text-muted">
                  No matches for “{query}”. Try Goa, Dubai, honeymoon…
                </p>
              ) : (
                <div className="space-y-4">
                  {results.destinations.length > 0 ? (
                    <section>
                      <p className="px-2 pb-2 text-[11px] font-semibold uppercase tracking-wide text-muted">
                        Destinations
                      </p>
                      <ul className="space-y-1">
                        {results.destinations.map((d) => (
                          <li key={d.id}>
                            <Link
                              href={`/packages?destination=${d.slug}`}
                              onClick={() => setOpen(false)}
                              className={cn(
                                "flex items-center gap-3 rounded-xl px-2 py-2 transition hover:bg-brand-soft",
                              )}
                            >
                              <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-lg">
                                <Image
                                  src={d.image}
                                  alt=""
                                  fill
                                  className="object-cover"
                                  sizes="48px"
                                />
                              </div>
                              <div className="min-w-0 flex-1">
                                <p className="truncate font-semibold text-foreground">
                                  {d.name}
                                </p>
                                <p className="truncate text-xs text-muted">
                                  {d.region} · from {formatPrice(d.startingPrice)}
                                </p>
                              </div>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </section>
                  ) : null}

                  {results.packages.length > 0 ? (
                    <section>
                      <p className="px-2 pb-2 text-[11px] font-semibold uppercase tracking-wide text-muted">
                        Packages
                      </p>
                      <ul className="space-y-1">
                        {results.packages.map((p) => (
                          <li key={p.id}>
                            <Link
                              href={`/packages/${p.slug}`}
                              onClick={() => setOpen(false)}
                              className="flex items-center gap-3 rounded-xl px-2 py-2 transition hover:bg-brand-soft"
                            >
                              <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-lg">
                                <Image
                                  src={p.image}
                                  alt=""
                                  fill
                                  className="object-cover"
                                  sizes="48px"
                                />
                              </div>
                              <div className="min-w-0 flex-1">
                                <p className="truncate font-semibold text-foreground">
                                  {p.name}
                                </p>
                                <p className="truncate text-xs text-muted">
                                  {p.destination} · {p.duration} ·{" "}
                                  {formatPrice(p.startingPrice)}
                                </p>
                              </div>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </section>
                  ) : null}

                  <div className="border-t border-border px-2 pt-3">
                    <Link
                      href={
                        q
                          ? `/packages?q=${encodeURIComponent(q)}`
                          : "/packages"
                      }
                      onClick={() => setOpen(false)}
                      className="block rounded-xl bg-brand px-4 py-2.5 text-center text-sm font-semibold text-white hover:bg-brand-dark"
                    >
                      View all packages
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
