"use client";

import Link from "next/link";
import {
  Building2,
  Heart,
  Plane,
  Sparkles,
  Umbrella,
} from "lucide-react";

const items = [
  { href: "/packages", label: "Holidays", icon: Umbrella, hint: "Packages" },
  { href: "/services", label: "Flights", icon: Plane, hint: "Assistance" },
  { href: "/services", label: "Hotels", icon: Building2, hint: "Stays" },
  { href: "/contact", label: "Customize", icon: Sparkles, hint: "DIY trip", badge: "DIY" },
  { href: "/packages?tripType=honeymoon", label: "Honeymoon", icon: Heart, hint: "Couples" },
];

export default function ServiceQuickNav() {
  return (
    <section className="border-b border-border bg-white">
      <div className="container-page py-5">
        <div className="flex gap-3 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:justify-center sm:gap-6">
          {items.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.label}
                href={item.href}
                className="group relative flex min-w-[88px] flex-col items-center gap-2 rounded-2xl px-3 py-2 text-center transition hover:bg-brand-soft"
              >
                {"badge" in item && item.badge ? (
                  <span className="absolute right-2 top-1 rounded-full bg-accent px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-stone-900">
                    {item.badge}
                  </span>
                ) : null}
                <span className="flex h-14 w-14 items-center justify-center rounded-full border border-border bg-surface text-brand transition group-hover:border-brand group-hover:bg-brand group-hover:text-white">
                  <Icon className="h-6 w-6" />
                </span>
                <span className="text-sm font-semibold text-foreground">
                  {item.label}
                </span>
                <span className="text-[11px] text-muted">{item.hint}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
