"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight, Plane } from "lucide-react";
import Reveal from "./Reveal";
import { destinations } from "@/data/destinations";

const cities = [
  { id: "delhi", label: "Delhi" },
  { id: "mumbai", label: "Mumbai" },
  { id: "bengaluru", label: "Bengaluru" },
  { id: "ahmedabad", label: "Ahmedabad" },
  { id: "kolkata", label: "Kolkata" },
] as const;

/** Approximate flight hours + distance from major cities (illustrative). */
const routes: Record<string, Record<string, { hours: number; km: number }>> = {
  delhi: {
    goa: { hours: 2.5, km: 1500 },
    manali: { hours: 1.2, km: 540 },
    kashmir: { hours: 1.5, km: 870 },
    rajasthan: { hours: 1.1, km: 280 },
    kerala: { hours: 3.2, km: 2250 },
    dubai: { hours: 3.5, km: 2200 },
    bali: { hours: 7.5, km: 5800 },
    thailand: { hours: 4.5, km: 2950 },
    singapore: { hours: 5.5, km: 4150 },
    maldives: { hours: 4.0, km: 2700 },
  },
  mumbai: {
    goa: { hours: 1.2, km: 460 },
    manali: { hours: 2.4, km: 1650 },
    kashmir: { hours: 2.6, km: 1700 },
    rajasthan: { hours: 1.8, km: 1150 },
    kerala: { hours: 2.0, km: 1100 },
    dubai: { hours: 3.2, km: 1950 },
    bali: { hours: 7.0, km: 5400 },
    thailand: { hours: 4.2, km: 3000 },
    singapore: { hours: 5.2, km: 3900 },
    maldives: { hours: 3.5, km: 2500 },
  },
  bengaluru: {
    goa: { hours: 1.3, km: 560 },
    manali: { hours: 3.5, km: 2500 },
    kashmir: { hours: 3.4, km: 2550 },
    rajasthan: { hours: 2.6, km: 1700 },
    kerala: { hours: 1.2, km: 520 },
    dubai: { hours: 4.0, km: 2800 },
    bali: { hours: 6.5, km: 4900 },
    thailand: { hours: 4.0, km: 2900 },
    singapore: { hours: 4.5, km: 3200 },
    maldives: { hours: 3.8, km: 2600 },
  },
  ahmedabad: {
    goa: { hours: 1.8, km: 980 },
    manali: { hours: 2.2, km: 1200 },
    kashmir: { hours: 2.4, km: 1400 },
    rajasthan: { hours: 1.0, km: 650 },
    kerala: { hours: 2.5, km: 1600 },
    dubai: { hours: 3.0, km: 1800 },
    bali: { hours: 7.2, km: 5600 },
    thailand: { hours: 4.4, km: 3100 },
    singapore: { hours: 5.4, km: 4100 },
    maldives: { hours: 3.8, km: 2650 },
  },
  kolkata: {
    goa: { hours: 2.8, km: 1950 },
    manali: { hours: 2.5, km: 1700 },
    kashmir: { hours: 2.7, km: 1750 },
    rajasthan: { hours: 2.3, km: 1500 },
    kerala: { hours: 2.9, km: 2100 },
    dubai: { hours: 4.5, km: 3200 },
    bali: { hours: 6.0, km: 4500 },
    thailand: { hours: 3.2, km: 1600 },
    singapore: { hours: 4.5, km: 2900 },
    maldives: { hours: 4.2, km: 2800 },
  },
};

function formatHours(h: number) {
  const whole = Math.floor(h);
  const mins = Math.round((h - whole) * 60);
  if (mins === 0) return `${whole} h`;
  return `${whole} h ${mins} m`;
}

export default function FindYourWay() {
  const [from, setFrom] = useState<(typeof cities)[number]["id"]>("delhi");
  const [to, setTo] = useState("dubai");

  const result = useMemo(() => {
    return routes[from]?.[to] ?? { hours: 2.5, km: 1500 };
  }, [from, to]);

  const toLabel =
    destinations.find((d) => d.slug === to)?.name ||
    to.charAt(0).toUpperCase() + to.slice(1);

  return (
    <section className="relative overflow-hidden bg-[#f4efe6] py-[clamp(3.5rem,6vw,5.5rem)]">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 30%, rgba(26,71,137,0.12), transparent 35%), radial-gradient(circle at 80% 60%, rgba(26,71,137,0.1), transparent 40%), repeating-linear-gradient(0deg, transparent, transparent 28px, rgba(26,71,137,0.04) 28px, rgba(26,71,137,0.04) 29px), repeating-linear-gradient(90deg, transparent, transparent 28px, rgba(26,71,137,0.04) 28px, rgba(26,71,137,0.04) 29px)",
        }}
      />

      <div className="container-page relative">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl text-foreground md:text-4xl">
            Find <span className="text-brand">your way</span>
          </h2>
          <p className="mt-3 text-muted">
            Your journey starts here. Check approximate flight time to your
            dream destination.
          </p>
        </Reveal>

        <Reveal delay={120} className="relative mx-auto mt-12 max-w-3xl">
          <div className="relative min-h-[220px] rounded-[2rem] border border-brand/10 bg-white/55 p-8 shadow-[0_20px_60px_rgba(26,71,137,0.08)] backdrop-blur-sm md:p-10">
            <div className="flex flex-col items-center justify-between gap-8 md:flex-row md:gap-4">
              <div className="text-center md:text-left">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted">
                  From
                </p>
                <p className="mt-2 text-2xl font-bold text-brand">
                  {cities.find((c) => c.id === from)?.label}
                </p>
              </div>

              <div className="relative flex w-full max-w-sm flex-1 flex-col items-center px-4">
                <div className="absolute top-1/2 h-px w-full -translate-y-1/2 border-t border-dashed border-brand/40" />
                <div className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full bg-brand text-white shadow-[0_10px_30px_rgba(26,71,137,0.35)]">
                  <Plane className="h-5 w-5 -rotate-12" />
                </div>
                <p className="relative z-10 mt-3 rounded-full bg-white px-3 py-1 text-xs font-semibold text-brand shadow-sm">
                  {formatHours(result.hours)} · {result.km.toLocaleString("en-IN")} km
                </p>
              </div>

              <div className="text-center md:text-right">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted">
                  To
                </p>
                <p className="mt-2 text-2xl font-bold text-brand">{toLabel}</p>
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal delay={180} className="mx-auto mt-8 grid max-w-3xl gap-3 sm:grid-cols-[1fr_1fr_auto]">
          <label className="rounded-2xl border border-brand/10 bg-white px-4 py-3 shadow-sm">
            <span className="text-[10px] font-semibold uppercase tracking-wide text-muted">
              From
            </span>
            <select
              value={from}
              onChange={(e) =>
                setFrom(e.target.value as (typeof cities)[number]["id"])
              }
              className="mt-1 w-full appearance-none bg-transparent text-base font-semibold text-foreground outline-none"
            >
              {cities.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.label}
                </option>
              ))}
            </select>
          </label>

          <label className="rounded-2xl border border-brand/10 bg-white px-4 py-3 shadow-sm">
            <span className="text-[10px] font-semibold uppercase tracking-wide text-muted">
              Destination
            </span>
            <select
              value={to}
              onChange={(e) => setTo(e.target.value)}
              className="mt-1 w-full appearance-none bg-transparent text-base font-semibold text-foreground outline-none"
            >
              {destinations.map((d) => (
                <option key={d.slug} value={d.slug}>
                  {d.name}
                </option>
              ))}
            </select>
          </label>

          <Link
            href={`/packages?destination=${to}`}
            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-brand px-5 py-3 text-sm font-semibold text-white shadow-[0_12px_30px_rgba(26,71,137,0.28)] transition hover:bg-brand-dark"
          >
            View packages <ArrowRight className="h-4 w-4" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
