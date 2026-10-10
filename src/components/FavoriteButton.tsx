"use client";

import { useState } from "react";
import { Heart } from "lucide-react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

export default function FavoriteButton({
  packageId,
  packageSlug,
  className,
}: {
  packageId?: string;
  packageSlug: string;
  className?: string;
}) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [saved, setSaved] = useState(false);

  async function toggle() {
    setBusy(true);
    const res = await fetch("/api/account/favorites", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ packageId, packageSlug }),
    });
    setBusy(false);
    if (res.status === 401) {
      router.push("/login?next=/account");
      return;
    }
    if (res.ok) setSaved(true);
  }

  return (
    <button
      type="button"
      disabled={busy}
      onClick={toggle}
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border border-border bg-white px-3 py-1.5 text-xs font-semibold text-stone-700 transition hover:border-brand hover:text-brand disabled:opacity-60",
        saved && "border-brand bg-brand-soft text-brand",
        className,
      )}
      aria-label="Save to favourites"
    >
      <Heart className={cn("h-3.5 w-3.5", saved && "fill-brand")} />
      {saved ? "Saved" : "Favourite"}
    </button>
  );
}
