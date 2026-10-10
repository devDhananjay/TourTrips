"use client";

import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useSiteSettings } from "./SiteSettingsProvider";

type LogoProps = {
  className?: string;
  size?: "sm" | "md" | "lg";
  priority?: boolean;
  /** Show circular crop only (for compact spots) */
  markOnly?: boolean;
};

const sizes = {
  sm: { height: 40, width: 74 },
  md: { height: 52, width: 96 },
  lg: { height: 64, width: 118 },
};

const markSizes = {
  sm: 40,
  md: 52,
  lg: 64,
};

export default function Logo({
  className,
  size = "md",
  priority = false,
  markOnly = false,
}: LogoProps) {
  const { company } = useSiteSettings();

  if (markOnly) {
    const mark = markSizes[size];
    return (
      <Link
        href="/"
        className={cn("inline-flex items-center", className)}
        aria-label={`${company.name} home`}
      >
        <span
          className="relative shrink-0 overflow-hidden rounded-full bg-white shadow-sm ring-1 ring-black/5"
          style={{ width: mark, height: mark }}
        >
          <Image
            src={company.logoMark || "/logo-square.jpg"}
            alt={`${company.name} logo`}
            width={mark}
            height={mark}
            priority={priority}
            className="h-full w-full object-cover"
          />
        </span>
      </Link>
    );
  }

  const s = sizes[size];

  return (
    <Link
      href="/"
      className={cn("inline-flex items-center", className)}
      aria-label={`${company.name} home`}
    >
      <Image
        src={company.logo}
        alt={`${company.name} logo`}
        width={s.width}
        height={s.height}
        priority={priority}
        className="h-auto w-auto object-contain"
        style={{ height: s.height, width: "auto" }}
      />
    </Link>
  );
}
