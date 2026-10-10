"use client";

import {
  FormEvent,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useRouter } from "next/navigation";
import {
  Building2,
  Heart,
  Plane,
  Sparkles,
  Umbrella,
  Users,
  CalendarDays,
  MapPin,
  ArrowLeftRight,
  Plus,
  Trash2,
  CircleDot,
  Mountain,
  Palmtree,
  Search,
  ChevronDown,
  type LucideIcon,
} from "lucide-react";
import { todayISODate } from "@/lib/enquiry";
import { cn } from "@/lib/utils";

const tabs = [
  { id: "holidays", label: "Holidays", icon: Umbrella },
  { id: "flights", label: "Flights", icon: Plane },
  { id: "hotels", label: "Hotels", icon: Building2 },
  { id: "customize", label: "Customize", icon: Sparkles, badge: "DIY" },
  { id: "honeymoon", label: "Honeymoon", icon: Heart },
] as const;

const tripModes = [
  { id: "oneway", label: "One Way" },
  { id: "roundtrip", label: "Round Trip" },
  { id: "multicity", label: "Multi City" },
] as const;

const tripStyles = [
  { id: "all", label: "Regular", icon: CircleDot },
  { id: "family", label: "Family", icon: Users },
  { id: "honeymoon", label: "Honeymoon", icon: Heart },
  { id: "adventure", label: "Adventure", icon: Mountain },
  { id: "leisure", label: "Leisure", icon: Palmtree },
] as const;

const cabinOptions = [
  "Economy",
  "Premium Economy",
  "Business",
  "First Class",
] as const;

type TabId = (typeof tabs)[number]["id"];
type TripMode = (typeof tripModes)[number]["id"];

export type HeroDestination = {
  slug: string;
  name: string;
  region: string;
};

type CityLeg = {
  id: string;
  from: string;
  to: string;
  date: string;
};

function addDaysISO(iso: string, days: number) {
  const d = new Date(`${iso}T12:00:00`);
  if (Number.isNaN(d.getTime())) return todayISODate();
  d.setDate(d.getDate() + days);
  return d.toISOString().slice(0, 10);
}

function makeLeg(from: string, to: string, date: string): CityLeg {
  return {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    from,
    to,
    date,
  };
}

function HeroDestField({
  label,
  value,
  onChange,
  options,
  placeholder = "Select city",
  valueIndent = false,
}: {
  label: string;
  value: string;
  onChange: (slug: string) => void;
  options: HeroDestination[];
  placeholder?: string;
  valueIndent?: boolean;
}) {
  const rootRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const selected = options.find((d) => d.slug === value);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return options;
    return options.filter(
      (d) =>
        d.name.toLowerCase().includes(q) ||
        d.slug.toLowerCase().includes(q) ||
        d.region.toLowerCase().includes(q),
    );
  }, [options, query]);

  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) {
        setOpen(false);
        setQuery("");
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        setQuery("");
      }
    };
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDoc);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  useEffect(() => {
    if (open) {
      requestAnimationFrame(() => searchRef.current?.focus());
    }
  }, [open]);

  return (
    <div ref={rootRef} className={cn("relative", open ? "z-50" : "z-0")}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-haspopup="listbox"
        className={cn(
          "hero-field hero-field-combo relative block w-full rounded-2xl px-3.5 py-3 text-left",
          open && "border-brand/40",
        )}
      >
        <span className="flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wide text-muted">
          <MapPin className="h-3 w-3 text-brand" />
          {label}
        </span>
        <span
          className={cn(
            "mt-1.5 flex min-h-[1.65rem] items-center justify-between gap-2 text-base font-bold leading-snug",
            valueIndent && "pl-2.5",
            selected ? "text-foreground" : "text-muted",
          )}
        >
          <span className="truncate">{selected?.name || placeholder}</span>
          <ChevronDown
            className={cn(
              "h-4 w-4 shrink-0 text-brand transition",
              open && "rotate-180",
            )}
          />
        </span>
      </button>

      {open ? (
        <div className="absolute left-0 right-0 top-[calc(100%+6px)] z-[60] overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-[0_20px_50px_rgba(15,23,42,0.22)]">
          <div className="border-b border-stone-100 p-2">
            <label className="flex items-center gap-2 rounded-xl bg-stone-50 px-3 py-2">
              <Search className="h-4 w-4 shrink-0 text-brand" />
              <input
                ref={searchRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={`Search ${label.toLowerCase()}...`}
                className="w-full bg-transparent text-sm font-medium text-foreground outline-none placeholder:text-muted"
              />
            </label>
          </div>
          <ul
            role="listbox"
            aria-label={label}
            className="max-h-52 overflow-y-auto py-1"
          >
            {filtered.length === 0 ? (
              <li className="px-3.5 py-3 text-sm text-muted">No destination found</li>
            ) : (
              filtered.map((d) => {
                const active = d.slug === value;
                return (
                  <li key={d.slug}>
                    <button
                      type="button"
                      role="option"
                      aria-selected={active}
                      onClick={() => {
                        onChange(d.slug);
                        setOpen(false);
                        setQuery("");
                      }}
                      className={cn(
                        "flex w-full items-center justify-between px-3.5 py-2.5 text-left text-sm transition hover:bg-brand-soft",
                        active
                          ? "bg-brand-soft font-semibold text-brand"
                          : "text-foreground",
                      )}
                    >
                      <span>{d.name}</span>
                      <span className="text-[10px] uppercase tracking-wide text-muted">
                        {d.region === "International" ? "Intl" : "India"}
                      </span>
                    </button>
                  </li>
                );
              })
            )}
          </ul>
        </div>
      ) : null}
    </div>
  );
}

export default function HeroSearch({
  destinations,
}: {
  destinations: HeroDestination[];
}) {
  const router = useRouter();
  const minDate = todayISODate();
  const domestic = useMemo(
    () => destinations.filter((d) => d.region !== "International"),
    [destinations],
  );
  const international = useMemo(
    () => destinations.filter((d) => d.region === "International"),
    [destinations],
  );

  const defaultFrom = domestic[0]?.slug || destinations[0]?.slug || "";
  const defaultTo =
    domestic.find((d) => d.slug !== defaultFrom)?.slug ||
    domestic[1]?.slug ||
    destinations[1]?.slug ||
    "";

  const [activeTab, setActiveTab] = useState<TabId>("holidays");
  const [tripMode, setTripMode] = useState<TripMode>("oneway");
  const [scope, setScope] = useState<"domestic" | "international">("domestic");
  const [fromPlace, setFromPlace] = useState(defaultFrom);
  const [toPlace, setToPlace] = useState(defaultTo);
  const [travelDate, setTravelDate] = useState(minDate);
  const [returnDate, setReturnDate] = useState("");
  const [travellers, setTravellers] = useState("2");
  const [cabin, setCabin] = useState<(typeof cabinOptions)[number]>("Economy");
  const [style, setStyle] = useState<(typeof tripStyles)[number]["id"]>("all");
  const [legs, setLegs] = useState<CityLeg[]>(() => [
    makeLeg(defaultFrom, defaultTo, minDate),
    makeLeg(defaultTo, "", addDaysISO(minDate, 1)),
  ]);

  function nameOf(slug: string) {
    return destinations.find((d) => d.slug === slug)?.name || slug;
  }

  const scopedDestinations = useMemo(
    () => (scope === "international" ? international : domestic),
    [scope, domestic, international],
  );

  function setScopeAndDefault(next: "domestic" | "international") {
    setScope(next);
    const list = next === "international" ? international : domestic;
    if (!list.length) return;

    const nextFrom = list.some((d) => d.slug === fromPlace)
      ? fromPlace
      : list[0].slug;
    const nextTo =
      list.find((d) => d.slug !== nextFrom)?.slug || list[0].slug;

    setFromPlace(nextFrom);
    setToPlace(nextTo);
    setLegs((prev) =>
      prev.map((leg, i) => {
        const validTo = list.some((d) => d.slug === leg.to);
        const validFrom = list.some((d) => d.slug === leg.from);
        if (i === 0) {
          return {
            ...leg,
            from: validFrom ? leg.from : nextFrom,
            to: validTo ? leg.to : nextTo,
          };
        }
        const prevTo = prev[i - 1]?.to;
        return {
          ...leg,
          from: prevTo || nextFrom,
          to: validTo && leg.to !== prevTo ? leg.to : "",
        };
      }),
    );
  }

  function setTripModeSafe(mode: TripMode) {
    setTripMode(mode);
    if (mode === "multicity") {
      const firstTo = toPlace || scopedDestinations[0]?.slug || "";
      const firstFrom = fromPlace || scopedDestinations[0]?.slug || "";
      const firstDate = travelDate || minDate;
      setLegs([
        makeLeg(firstFrom, firstTo, firstDate),
        makeLeg(firstTo, "", returnDate || addDaysISO(firstDate, 1)),
      ]);
    }
  }

  function updateLeg(index: number, patch: Partial<CityLeg>) {
    setLegs((prev) => {
      const next = prev.map((leg, i) =>
        i === index ? { ...leg, ...patch } : leg,
      );
      for (let i = 1; i < next.length; i++) {
        const prevTo = next[i - 1].to;
        if (prevTo) next[i] = { ...next[i], from: prevTo };
      }
      return next;
    });
  }

  function addCity() {
    if (legs.length >= 5) return;
    const last = legs[legs.length - 1];
    const from = last.to || last.from;
    const date = last.date ? addDaysISO(last.date, 1) : minDate;
    setLegs((prev) => [...prev, makeLeg(from, "", date)]);
  }

  function removeLeg(index: number) {
    if (legs.length <= 2) return;
    setLegs((prev) => {
      const next = prev.filter((_, i) => i !== index);
      for (let i = 1; i < next.length; i++) {
        if (next[i - 1].to) {
          next[i] = { ...next[i], from: next[i - 1].to };
        }
      }
      return next;
    });
  }

  function swapFromTo() {
    const prevFrom = fromPlace;
    setFromPlace(toPlace);
    setToPlace(prevFrom);
  }

  function onSearch(e: FormEvent) {
    e.preventDefault();

    // Multi-city / customize stay as quote enquiry
    if (activeTab === "customize" || tripMode === "multicity") {
      const params = new URLSearchParams();
      params.set("trip", tripMode);
      params.set("tab", activeTab);
      params.set("travellers", travellers);
      params.set("cabin", cabin);
      if (style !== "all") params.set("style", style);

      if (tripMode === "multicity") {
        const route = legs
          .map((leg, i) => {
            const from =
              i === 0 ? nameOf(leg.from) : nameOf(legs[i - 1].to || leg.from);
            const to = leg.to ? nameOf(leg.to) : "TBD";
            const date = leg.date || "flexible";
            return `${from} → ${to} (${date})`;
          })
          .join(" | ");
        params.set("route", route);
        if (legs[0]?.to) params.set("destination", legs[0].to);
        if (legs[0]?.date) params.set("date", legs[0].date);
        params.set("from", nameOf(legs[0]?.from || fromPlace));
      } else {
        params.set("from", nameOf(fromPlace));
        if (toPlace) params.set("destination", toPlace);
        if (travelDate) params.set("date", travelDate);
        if (returnDate) params.set("return", returnDate);
      }

      router.push(`/contact?${params.toString()}`);
      return;
    }

    // Holidays / Flights / Hotels / Honeymoon → package filters (same form flow)
    const params = new URLSearchParams();
    if (toPlace) params.set("destination", toPlace);
    if (scope !== "domestic") params.set("category", scope);

    const tripType =
      activeTab === "honeymoon"
        ? "honeymoon"
        : style !== "all"
          ? style
          : null;
    if (tripType) params.set("tripType", tripType);

    if (activeTab === "flights") params.set("service", "flights");
    if (activeTab === "hotels") params.set("service", "hotels");
    if (activeTab === "holidays") params.set("service", "holidays");

    const q = params.toString();
    router.push(q ? `/packages?${q}` : "/packages");
  }

  return (
    <div
      className={cn(
        "hero-search-3d relative z-30 mx-auto mt-6 w-full md:mt-8",
        tripMode === "multicity" ? "max-w-[1040px]" : "max-w-[920px]",
      )}
    >
      <form
        onSubmit={onSearch}
        className="hero-search-card relative rounded-3xl p-3.5 md:p-5"
      >
        <div className="mb-3 flex items-center justify-between gap-3">
          <div>
            <p className="hero-brand-blink inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.2em]">
              <span className="hero-brand-dot" aria-hidden />
              Yogo Voyage
            </p>
            <p className="text-base font-semibold text-foreground md:text-lg">
              Plan your next holiday
            </p>
          </div>
          <div className="flex gap-3 text-xs font-medium">
            <label className="inline-flex cursor-pointer items-center gap-1.5">
              <input
                type="radio"
                name="scope"
                checked={scope === "domestic"}
                onChange={() => setScopeAndDefault("domestic")}
                className="accent-[var(--brand)]"
              />
              India
            </label>
            <label className="inline-flex cursor-pointer items-center gap-1.5">
              <input
                type="radio"
                name="scope"
                checked={scope === "international"}
                onChange={() => setScopeAndDefault("international")}
                className="accent-[var(--brand)]"
              />
              International
            </label>
          </div>
        </div>

        <div className="flex gap-1 overflow-x-auto border-b border-stone-200/80 pb-2.5 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => {
                  setActiveTab(tab.id);
                  if (tab.id === "honeymoon") setStyle("honeymoon");
                  if (tab.id === "holidays" && style === "honeymoon") {
                    setStyle("all");
                  }
                }}
                className={cn(
                  "relative flex min-w-[72px] flex-col items-center gap-1 rounded-xl px-2.5 py-1.5 transition",
                  active
                    ? "text-brand"
                    : "text-muted hover:bg-stone-50 hover:text-foreground",
                )}
              >
                {"badge" in tab && tab.badge ? (
                  <span className="absolute right-0.5 top-0 rounded-full bg-accent px-1 py-0.5 text-[8px] font-bold uppercase text-stone-900 shadow-sm">
                    {tab.badge}
                  </span>
                ) : null}
                <span
                  className={cn(
                    "flex h-8 w-8 items-center justify-center rounded-full border transition",
                    active
                      ? "border-brand/30 bg-gradient-to-b from-brand-soft to-white text-brand shadow-[inset_0_1px_0_rgba(255,255,255,0.9),0_4px_10px_rgba(26,71,137,0.18)]"
                      : "border-stone-200 bg-gradient-to-b from-white to-stone-50",
                  )}
                >
                  <Icon className="h-4 w-4" />
                </span>
                <span className="text-[11px] font-semibold">{tab.label}</span>
                {active ? (
                  <span className="absolute inset-x-3 -bottom-2.5 h-0.5 rounded-full bg-brand" />
                ) : null}
              </button>
            );
          })}
        </div>

        <div
          className="mt-3.5 flex flex-wrap items-center gap-0.5 rounded-full bg-stone-100/70 p-0.5"
          role="radiogroup"
          aria-label="Trip type"
        >
          {tripModes.map((mode) => {
            const active = tripMode === mode.id;
            return (
              <button
                key={mode.id}
                type="button"
                role="radio"
                aria-checked={active}
                onClick={() => setTripModeSafe(mode.id)}
                className={cn(
                  "inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-sm font-semibold transition",
                  active
                    ? "bg-white/90 text-brand"
                    : "text-muted hover:text-foreground",
                )}
              >
                <span
                  className={cn(
                    "inline-flex h-3.5 w-3.5 items-center justify-center rounded-full border",
                    active
                      ? "border-brand bg-brand"
                      : "border-stone-300 bg-transparent",
                  )}
                >
                  {active ? (
                    <span className="h-1 w-1 rounded-full bg-white" />
                  ) : null}
                </span>
                {mode.label}
              </button>
            );
          })}
        </div>

        {tripMode === "multicity" ? (
          <div className="mt-3 space-y-2.5">
            <p className="text-xs text-muted">
              Build a multi-city holiday — each stop auto-connects from the
              previous destination.
            </p>

            {legs.map((leg, index) => {
              const isLast = index === legs.length - 1;
              const showExtras = index === 0;
              const toOptions = scopedDestinations.filter(
                (d) => d.slug !== (index === 0 ? leg.from : legs[index - 1]?.to),
              );
              return (
                <div
                  key={leg.id}
                  className="overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-[0_4px_14px_rgba(15,23,42,0.04)]"
                >
                  <div className="flex items-center justify-between border-b border-stone-100 bg-gradient-to-r from-brand-soft/60 to-white px-3 py-1.5">
                    <span className="text-[11px] font-bold uppercase tracking-wide text-brand">
                      Flight / Stop {index + 1}
                    </span>
                    {legs.length > 2 ? (
                      <button
                        type="button"
                        onClick={() => removeLeg(index)}
                        className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-medium text-stone-500 transition hover:bg-red-50 hover:text-red-600"
                      >
                        <Trash2 className="h-3 w-3" />
                        Remove
                      </button>
                    ) : null}
                  </div>

                  <div
                    className={cn(
                      "grid gap-0 divide-y divide-stone-100 sm:divide-x sm:divide-y-0",
                      showExtras
                        ? "sm:grid-cols-[1.1fr_1.1fr_1fr_0.7fr_1.05fr]"
                        : isLast
                          ? "sm:grid-cols-[1.1fr_1.1fr_1fr_1.2fr]"
                          : "sm:grid-cols-[1.1fr_1.1fr_1fr]",
                    )}
                  >
                    {index === 0 ? (
                      <div className="relative">
                        <HeroDestField
                          label="From"
                          value={leg.from}
                          onChange={(slug) => updateLeg(index, { from: slug })}
                          options={scopedDestinations}
                        />
                      </div>
                    ) : (
                      <div className="px-3.5 py-3">
                        <span className="text-[10px] font-semibold uppercase tracking-wide text-muted">
                          From
                        </span>
                        <p className="mt-1.5 text-base font-bold leading-snug text-foreground">
                          {nameOf(leg.from) || "—"}
                        </p>
                      </div>
                    )}

                    <div className="relative">
                      <HeroDestField
                        label="To"
                        value={leg.to}
                        onChange={(slug) => updateLeg(index, { to: slug })}
                        options={toOptions}
                        placeholder="Select City"
                        valueIndent
                      />
                    </div>

                    <label className="hero-field relative block cursor-pointer rounded-none border-0 bg-transparent px-3.5 py-3 shadow-none">
                      <span className="flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wide text-muted">
                        <CalendarDays className="h-3 w-3 text-brand" />
                        Departure
                      </span>
                      <span className="mt-1.5 block min-h-[1.65rem] text-sm font-bold leading-snug text-foreground">
                        {leg.date || "Select date"}
                      </span>
                      <input
                        type="date"
                        min={
                          index === 0
                            ? minDate
                            : legs[index - 1]?.date || minDate
                        }
                        value={leg.date}
                        onChange={(e) =>
                          updateLeg(index, { date: e.target.value })
                        }
                        className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
                      />
                    </label>

                    {showExtras ? (
                      <>
                        <label className="px-3.5 py-3">
                          <span className="flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wide text-muted">
                            <Users className="h-3 w-3 text-brand" />
                            Travellers
                          </span>
                          <input
                            type="number"
                            min={1}
                            max={50}
                            value={travellers}
                            onChange={(e) => setTravellers(e.target.value)}
                            className="mt-1.5 block min-h-[1.65rem] w-full bg-transparent text-base font-bold leading-snug text-foreground outline-none"
                          />
                        </label>
                        <label className="relative cursor-pointer px-3.5 py-3">
                          <span className="text-[10px] font-semibold uppercase tracking-wide text-muted">
                            Cabin Class
                          </span>
                          <span className="mt-1.5 block min-h-[1.65rem] pr-4 text-sm font-bold leading-snug text-foreground">
                            {cabin}
                          </span>
                          <select
                            value={cabin}
                            onChange={(e) =>
                              setCabin(
                                e.target.value as (typeof cabinOptions)[number],
                              )
                            }
                            className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
                          >
                            {cabinOptions.map((c) => (
                              <option key={c} value={c}>
                                {c}
                              </option>
                            ))}
                          </select>
                        </label>
                      </>
                    ) : null}

                    {isLast ? (
                      <div className="flex items-center px-3 py-2.5">
                        <button
                          type="button"
                          onClick={addCity}
                          disabled={legs.length >= 5}
                          className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-dashed border-brand/50 bg-brand-soft/40 px-3 py-2.5 text-xs font-bold uppercase tracking-wide text-brand transition hover:border-brand hover:bg-brand-soft disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          <Plus className="h-4 w-4" />
                          Add another city
                        </button>
                      </div>
                    ) : null}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div
            className={cn(
              "mt-3 grid gap-2 sm:grid-cols-2",
              tripMode === "roundtrip"
                ? "lg:grid-cols-[minmax(0,2.2fr)_0.95fr_0.95fr_0.8fr]"
                : "lg:grid-cols-[minmax(0,2.3fr)_1fr_0.85fr]",
            )}
          >
            <div className="relative isolate z-20 grid gap-2 overflow-visible sm:grid-cols-2 lg:col-span-1">
              <HeroDestField
                label="From"
                value={fromPlace}
                onChange={setFromPlace}
                options={scopedDestinations}
              />

              <button
                type="button"
                aria-label="Swap cities"
                onClick={swapFromTo}
                className="absolute left-1/2 top-1/2 z-40 hidden h-9 w-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-white bg-white text-brand shadow-[0_8px_20px_rgba(26,71,137,0.35)] ring-1 ring-brand/25 transition hover:scale-110 hover:bg-brand-soft sm:flex"
              >
                <ArrowLeftRight className="h-4 w-4" />
              </button>

              <HeroDestField
                label="To"
                value={toPlace}
                onChange={setToPlace}
                options={scopedDestinations.filter((d) => d.slug !== fromPlace)}
                valueIndent
              />
            </div>

            <label className="hero-field relative block cursor-pointer rounded-2xl px-3.5 py-3">
              <span className="flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wide text-muted">
                <CalendarDays className="h-3 w-3 text-brand" />
                Departure
              </span>
              <span className="mt-1.5 block min-h-[1.65rem] text-sm font-bold leading-snug text-foreground">
                {travelDate || "Select date"}
              </span>
              <input
                type="date"
                min={minDate}
                value={travelDate}
                onChange={(e) => setTravelDate(e.target.value)}
                className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
              />
            </label>

            {tripMode === "roundtrip" ? (
              <label className="hero-field relative block cursor-pointer rounded-2xl px-3.5 py-3">
                <span className="flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wide text-muted">
                  <CalendarDays className="h-3 w-3 text-brand" />
                  Return
                </span>
                <span className="mt-1.5 block min-h-[1.65rem] text-sm font-bold leading-snug text-foreground">
                  {returnDate || "Tap to add return date"}
                </span>
                <input
                  type="date"
                  min={travelDate || minDate}
                  value={returnDate}
                  onChange={(e) => setReturnDate(e.target.value)}
                  className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
                />
              </label>
            ) : null}

            <label className="hero-field rounded-2xl px-3.5 py-3">
              <span className="flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wide text-muted">
                <Users className="h-3 w-3 text-brand" />
                Travellers
              </span>
              <input
                type="number"
                min={1}
                max={50}
                value={travellers}
                onChange={(e) => setTravellers(e.target.value)}
                className="mt-1.5 block min-h-[1.65rem] w-full bg-transparent text-base font-bold leading-snug text-foreground outline-none"
              />
            </label>
          </div>
        )}

        <div className="mt-3 flex flex-wrap items-center gap-1.5">
          <span className="mr-1 text-[10px] font-semibold uppercase tracking-wide text-muted">
            Style
          </span>
          {tripStyles.map((item) => {
            const StyleIcon = item.icon as LucideIcon;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setStyle(item.id)}
                className={cn(
                  "inline-flex items-center gap-1.5 rounded-lg border px-2.5 py-1.5 text-[11px] font-semibold transition",
                  style === item.id
                    ? "border-brand/40 bg-brand-soft text-brand shadow-sm"
                    : "border-stone-200 bg-white text-muted hover:border-brand/30",
                )}
              >
                <StyleIcon className="h-3.5 w-3.5" />
                {item.label}
              </button>
            );
          })}
        </div>

        <div className="relative -mb-7 mt-7 flex justify-center md:mt-8">
          <button
            type="submit"
            className="hero-search-btn inline-flex min-w-[190px] items-center justify-center gap-2 rounded-full bg-gradient-to-b from-[#2458a3] to-brand px-9 py-3 text-sm font-bold uppercase tracking-wide text-white transition hover:-translate-y-0.5 hover:brightness-110 active:translate-y-0"
          >
            <Plane className="h-4 w-4" />
            Search
          </button>
        </div>
      </form>
    </div>
  );
}
