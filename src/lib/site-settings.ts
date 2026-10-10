import {
  company as staticCompany,
  trustStats as staticTrustStats,
} from "@/data/company";
import { services as staticServices, whyChooseUs as staticWhy } from "@/data/services";
import { testimonials as staticTestimonials } from "@/data/testimonials";
import { prisma } from "@/lib/db";

export type SiteSocial = {
  facebook: string;
  instagram: string;
  twitter: string;
  youtube: string;
};

export type SiteCompany = {
  name: string;
  tagline: string;
  description: string;
  phone: string;
  phoneRaw: string;
  email: string;
  whatsapp: string;
  address: string;
  workingHours: string;
  logo: string;
  logoMark: string;
  favicon: string;
  social: SiteSocial;
};

export type HomeExperience = {
  id: string;
  tag: string;
  title: string;
  href: string;
  image: string;
};

export type HomeStory = {
  id: string;
  tag: string;
  title: string;
  href: string;
  image: string;
  featured?: boolean;
};

export type HomeSectionCopy = {
  eyebrow: string;
  title: string;
  description: string;
};

export type HomeContent = {
  hero: { image: string; alt: string };
  international: HomeSectionCopy;
  india: HomeSectionCopy;
  thingsToDo: {
    eyebrow: string;
    title: string;
    items: HomeExperience[];
  };
  getInspired: {
    eyebrow: string;
    title: string;
    stories: HomeStory[];
  };
  enquiry: {
    eyebrow: string;
    title: string;
    body: string;
    bullets: string[];
  };
  customizeCta: {
    eyebrow: string;
    title: string;
    body: string;
  };
  whyChooseUs: HomeSectionCopy & {
    items: Array<{ title: string; description: string; icon: string }>;
  };
  trustStats: Array<{ value: string; label: string }>;
  services: HomeSectionCopy & {
    items: Array<{
      id: string;
      title: string;
      description: string;
      icon: string;
    }>;
  };
  testimonials: HomeSectionCopy & {
    items: Array<{
      id: string;
      name: string;
      location: string;
      rating: number;
      trip: string;
      review: string;
      image: string;
    }>;
  };
  bottomCta: {
    image: string;
    title: string;
    body: string;
  };
  newsletter: {
    title: string;
    body: string;
  };
};

export type SiteSettingsData = {
  company: SiteCompany;
  home: HomeContent;
  updatedAt?: string;
};

export const defaultHomeContent = (): HomeContent => ({
  hero: {
    image:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=2000&q=85",
    alt: "Sunset beach travel destination",
  },
  international: {
    eyebrow: "International",
    title: "International Places & Packages",
    description:
      "Dubai, Bali, Thailand, Singapore and Maldives — short-haul and dream escapes with visa guidance.",
  },
  india: {
    eyebrow: "India holidays",
    title: "Popular Destinations in India",
    description:
      "From coastal Goa to royal Rajasthan and Himalayan escapes — journeys travellers love.",
  },
  thingsToDo: {
    eyebrow: "Experiences",
    title: "Things to do",
    items: [
      {
        id: "culture",
        tag: "Culture",
        title: "Immerse yourself in culture",
        href: "/packages?destination=rajasthan",
        image:
          "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=1200&q=80",
      },
      {
        id: "adventure",
        tag: "Adventure",
        title: "Chase your next adventure",
        href: "/packages?tripType=adventure",
        image:
          "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=80",
      },
      {
        id: "relaxation",
        tag: "Relaxation",
        title: "Unwind in style",
        href: "/packages?tripType=leisure",
        image:
          "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&q=80",
      },
    ],
  },
  getInspired: {
    eyebrow: "Inspiration",
    title: "Get inspired to explore",
    stories: [
      {
        id: "1",
        tag: "Featured",
        title: "Stay longer with special hotel deals",
        href: "/services",
        image:
          "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&q=80",
        featured: true,
      },
      {
        id: "2",
        tag: "Culture",
        title: "Explore royal Rajasthan trails",
        href: "/packages?destination=rajasthan",
        image:
          "https://images.unsplash.com/photo-1477587458883-47145ed94245?w=1200&q=80",
      },
      {
        id: "3",
        tag: "Dining",
        title: "Taste Kerala’s coastal flavours",
        href: "/packages?destination=kerala",
        image:
          "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=1200&q=80",
      },
      {
        id: "4",
        tag: "Family",
        title: "Find unforgettable adventures for kids",
        href: "/packages?tripType=family",
        image:
          "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1200&q=80",
      },
    ],
  },
  enquiry: {
    eyebrow: "Free travel quote",
    title: "Tell us your dream trip — we'll craft the itinerary",
    body: "Share destination, dates, travellers and budget. A Yogo Voyage expert will reply with transparent pricing, hotel options and a personalised plan.",
    bullets: [
      "No obligation quote",
      "Flexible dates & custom stays",
      "EMI / travel-now-pay-later guidance",
    ],
  },
  customizeCta: {
    eyebrow: "Customize DIY",
    title: "Build your own holiday — your dates, budget & pace",
    body: "Tell us where you want to go, how many travellers and what matters most. We craft a personal itinerary with hotels, transfers and experiences — just like a DIY holiday planner, with expert support.",
  },
  whyChooseUs: {
    eyebrow: "Why Yogo Voyage",
    title: "Why Choose Us",
    description:
      "We combine destination expertise with personalised planning so your holiday feels effortless.",
    items: staticWhy.map((item) => ({ ...item })),
  },
  trustStats: staticTrustStats.map((s) => ({ ...s })),
  services: {
    eyebrow: "Travel Experience",
    title: "Services Built Around Your Journey",
    description:
      "Whether it is a honeymoon, family holiday or corporate offsite — we cover the complete travel spectrum.",
    items: staticServices.map((s) => ({ ...s })),
  },
  testimonials: {
    eyebrow: "Traveller Stories",
    title: "Customer Testimonials",
    description:
      "Real feedback from travellers who explored India and the world with us.",
    items: staticTestimonials.map((t) => ({ ...t })),
  },
  bottomCta: {
    image:
      "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1600&q=80",
    title: "Ready to Plan Your Next Adventure?",
    body: "Speak with a Yogo Voyage travel expert and get a customised itinerary tailored to your dates, budget and preferences.",
  },
  newsletter: {
    title: "Get Travel Inspiration",
    body: "Subscribe for seasonal deals, destination guides and early-bird package offers.",
  },
});

export function defaultSiteSettings(): SiteSettingsData {
  return {
    company: {
      name: staticCompany.name,
      tagline: staticCompany.tagline,
      description: staticCompany.description,
      phone: staticCompany.phone,
      phoneRaw: staticCompany.phoneRaw,
      email: staticCompany.email,
      whatsapp: staticCompany.whatsapp,
      address: staticCompany.address,
      workingHours: staticCompany.workingHours,
      logo: staticCompany.logo,
      logoMark: staticCompany.logoMark,
      favicon: staticCompany.favicon,
      social: { ...staticCompany.social },
    },
    home: defaultHomeContent(),
  };
}

function mergeHome(raw: unknown): HomeContent {
  const base = defaultHomeContent();
  if (!raw || typeof raw !== "object") return base;
  const h = raw as Partial<HomeContent>;
  return {
    hero: { ...base.hero, ...(h.hero || {}) },
    international: { ...base.international, ...(h.international || {}) },
    india: { ...base.india, ...(h.india || {}) },
    thingsToDo: {
      ...base.thingsToDo,
      ...(h.thingsToDo || {}),
      items: Array.isArray(h.thingsToDo?.items)
        ? h.thingsToDo.items
        : base.thingsToDo.items,
    },
    getInspired: {
      ...base.getInspired,
      ...(h.getInspired || {}),
      stories: Array.isArray(h.getInspired?.stories)
        ? h.getInspired.stories
        : base.getInspired.stories,
    },
    enquiry: {
      ...base.enquiry,
      ...(h.enquiry || {}),
      bullets: Array.isArray(h.enquiry?.bullets)
        ? h.enquiry.bullets
        : base.enquiry.bullets,
    },
    customizeCta: { ...base.customizeCta, ...(h.customizeCta || {}) },
    whyChooseUs: {
      ...base.whyChooseUs,
      ...(h.whyChooseUs || {}),
      items: Array.isArray(h.whyChooseUs?.items)
        ? h.whyChooseUs.items
        : base.whyChooseUs.items,
    },
    trustStats: Array.isArray(h.trustStats) ? h.trustStats : base.trustStats,
    services: {
      ...base.services,
      ...(h.services || {}),
      items: Array.isArray(h.services?.items)
        ? h.services.items
        : base.services.items,
    },
    testimonials: {
      ...base.testimonials,
      ...(h.testimonials || {}),
      items: Array.isArray(h.testimonials?.items)
        ? h.testimonials.items
        : base.testimonials.items,
    },
    bottomCta: { ...base.bottomCta, ...(h.bottomCta || {}) },
    newsletter: { ...base.newsletter, ...(h.newsletter || {}) },
  };
}

export function rowToSiteSettings(row: {
  name: string;
  tagline: string;
  description: string;
  phone: string;
  phoneRaw: string;
  email: string;
  whatsapp: string;
  address: string;
  workingHours: string;
  logo: string;
  logoMark: string;
  favicon: string;
  socialJson: string;
  homeJson: string;
  updatedAt?: Date;
}): SiteSettingsData {
  const defaults = defaultSiteSettings();
  let social = defaults.company.social;
  try {
    social = { ...social, ...JSON.parse(row.socialJson) };
  } catch {
    /* keep defaults */
  }
  let homeRaw: unknown = null;
  try {
    homeRaw = JSON.parse(row.homeJson);
  } catch {
    homeRaw = null;
  }

  return {
    company: {
      name: row.name || defaults.company.name,
      tagline: row.tagline || defaults.company.tagline,
      description: row.description || defaults.company.description,
      phone: row.phone || defaults.company.phone,
      phoneRaw: row.phoneRaw || defaults.company.phoneRaw,
      email: row.email || defaults.company.email,
      whatsapp: row.whatsapp || defaults.company.whatsapp,
      address: row.address || defaults.company.address,
      workingHours: row.workingHours || defaults.company.workingHours,
      logo: row.logo || defaults.company.logo,
      logoMark: row.logoMark || defaults.company.logoMark,
      favicon: row.favicon || defaults.company.favicon,
      social,
    },
    home: mergeHome(homeRaw),
    updatedAt: row.updatedAt?.toISOString(),
  };
}

export async function ensureSiteSettingsRow() {
  const defaults = defaultSiteSettings();
  const existing = await prisma.siteSettings.findUnique({
    where: { id: "default" },
  });
  if (existing) return existing;

  return prisma.siteSettings.create({
    data: {
      id: "default",
      name: defaults.company.name,
      tagline: defaults.company.tagline,
      description: defaults.company.description,
      phone: defaults.company.phone,
      phoneRaw: defaults.company.phoneRaw,
      email: defaults.company.email,
      whatsapp: defaults.company.whatsapp,
      address: defaults.company.address,
      workingHours: defaults.company.workingHours,
      logo: defaults.company.logo,
      logoMark: defaults.company.logoMark,
      favicon: defaults.company.favicon,
      socialJson: JSON.stringify(defaults.company.social),
      homeJson: JSON.stringify(defaults.home),
    },
  });
}

export async function getSiteSettings(): Promise<SiteSettingsData> {
  try {
    const row = await ensureSiteSettingsRow();
    return rowToSiteSettings(row);
  } catch {
    return defaultSiteSettings();
  }
}

export function buildWhatsappLink(
  whatsapp: string,
  message?: string,
  brandName = "Yogo Voyage",
): string {
  const text = encodeURIComponent(
    message || `Hi ${brandName}! I would like to enquire about a trip.`,
  );
  return `https://wa.me/${whatsapp}?text=${text}`;
}

export function settingsToDbPayload(data: SiteSettingsData) {
  const c = data.company;
  return {
    name: c.name.trim(),
    tagline: c.tagline.trim(),
    description: c.description.trim(),
    phone: c.phone.trim(),
    phoneRaw: c.phoneRaw.trim().replace(/\D/g, "") || c.phoneRaw.trim(),
    email: c.email.trim(),
    whatsapp: c.whatsapp.trim().replace(/\D/g, "") || c.whatsapp.trim(),
    address: c.address.trim(),
    workingHours: c.workingHours.trim(),
    logo: c.logo.trim(),
    logoMark: c.logoMark.trim(),
    favicon: c.favicon.trim(),
    socialJson: JSON.stringify({
      facebook: c.social.facebook.trim(),
      instagram: c.social.instagram.trim(),
      twitter: c.social.twitter.trim(),
      youtube: c.social.youtube.trim(),
    }),
    homeJson: JSON.stringify(data.home),
  };
}
