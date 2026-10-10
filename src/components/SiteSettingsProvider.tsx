"use client";

import { createContext, useContext, useMemo } from "react";
import {
  buildWhatsappLink,
  defaultSiteSettings,
  type HomeContent,
  type SiteCompany,
  type SiteSettingsData,
} from "@/lib/site-settings";

type SiteContextValue = {
  company: SiteCompany;
  home: HomeContent;
  whatsappLink: (message?: string) => string;
  updatedAt?: string;
};

const SiteSettingsContext = createContext<SiteContextValue | null>(null);

export function SiteSettingsProvider({
  value,
  children,
}: {
  value?: SiteSettingsData | null;
  children: React.ReactNode;
}) {
  const data = value || defaultSiteSettings();
  const ctx = useMemo<SiteContextValue>(
    () => ({
      company: data.company,
      home: data.home,
      updatedAt: data.updatedAt,
      whatsappLink: (message?: string) =>
        buildWhatsappLink(data.company.whatsapp, message, data.company.name),
    }),
    [data],
  );

  return (
    <SiteSettingsContext.Provider value={ctx}>
      {children}
    </SiteSettingsContext.Provider>
  );
}

export function useSiteSettings(): SiteContextValue {
  const ctx = useContext(SiteSettingsContext);
  if (!ctx) {
    const fallback = defaultSiteSettings();
    return {
      company: fallback.company,
      home: fallback.home,
      whatsappLink: (message?: string) =>
        buildWhatsappLink(
          fallback.company.whatsapp,
          message,
          fallback.company.name,
        ),
    };
  }
  return ctx;
}
