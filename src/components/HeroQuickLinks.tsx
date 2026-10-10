import Link from "next/link";
import {
  Gift,
  MapPinned,
  Route,
  Sparkles,
  CreditCard,
} from "lucide-react";

const items = [
  {
    href: "/destinations",
    label: "Where2Go",
    hint: "Inspiration",
    icon: MapPinned,
  },
  {
    href: "/packages",
    label: "How2Go",
    hint: "Packages",
    icon: Route,
  },
  {
    href: "/services",
    label: "Travel extras",
    hint: "Flights & hotels",
    icon: CreditCard,
  },
  {
    href: "/contact",
    label: "Custom trip",
    hint: "DIY planner",
    icon: Sparkles,
  },
  {
    href: "/packages?tripType=honeymoon",
    label: "Offers",
    hint: "Seasonal deals",
    icon: Gift,
  },
];

export default function HeroQuickLinks() {
  return (
    <div className="hero-quicklinks relative z-0 mx-auto mt-9 w-full max-w-[920px] rounded-full border border-white/60 bg-white/90 px-2.5 py-1.5 shadow-[0_12px_40px_rgba(15,23,42,0.22)] backdrop-blur-md md:px-4">
      <div className="flex gap-0.5 overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:justify-between">
        {items.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.label}
              href={item.href}
              className="flex min-w-[96px] items-center gap-1.5 rounded-full px-2.5 py-1.5 transition hover:bg-brand-soft"
            >
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gradient-to-b from-white to-brand-soft text-brand shadow-sm">
                <Icon className="h-3.5 w-3.5" />
              </span>
              <span className="leading-tight">
                <span className="block text-xs font-semibold text-foreground">
                  {item.label}
                </span>
                <span className="block text-[10px] text-muted">{item.hint}</span>
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
