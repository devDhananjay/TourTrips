"use client";

import { MessageCircle } from "lucide-react";
import { usePathname } from "next/navigation";
import { useSiteSettings } from "./SiteSettingsProvider";

export default function WhatsAppButton() {
  const pathname = usePathname();
  const { whatsappLink } = useSiteSettings();
  if (pathname?.startsWith("/admin")) return null;

  return (
    <a
      href={whatsappLink()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-5 right-5 z-50 inline-flex items-center gap-2 rounded-full bg-[#25D366] px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-900/20 transition hover:scale-105 hover:bg-[#1ebe57]"
    >
      <MessageCircle className="h-5 w-5" />
      <span className="hidden sm:inline">WhatsApp</span>
    </a>
  );
}
