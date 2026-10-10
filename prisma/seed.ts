import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { destinations } from "../src/data/destinations";
import { packages } from "../src/data/packages";
import { defaultSiteSettings } from "../src/lib/site-settings";

const prisma = new PrismaClient();

async function main() {
  const adminHash = await bcrypt.hash("Admin@Yogo2026", 10);
  const userHash = await bcrypt.hash("User@Yogo2026", 10);

  const site = defaultSiteSettings();
  await prisma.siteSettings.upsert({
    where: { id: "default" },
    update: {},
    create: {
      id: "default",
      name: site.company.name,
      tagline: site.company.tagline,
      description: site.company.description,
      phone: site.company.phone,
      phoneRaw: site.company.phoneRaw,
      email: site.company.email,
      whatsapp: site.company.whatsapp,
      address: site.company.address,
      workingHours: site.company.workingHours,
      logo: site.company.logo,
      logoMark: site.company.logoMark,
      favicon: site.company.favicon,
      socialJson: JSON.stringify(site.company.social),
      homeJson: JSON.stringify(site.home),
    },
  });

  await prisma.user.upsert({
    where: { email: "admin@yogovoyage.com" },
    update: {},
    create: {
      email: "admin@yogovoyage.com",
      name: "Yogo Super Admin",
      phone: "9310826295",
      passwordHash: adminHash,
      role: "SUPERADMIN",
    },
  });

  await prisma.user.upsert({
    where: { email: "traveller@yogovoyage.com" },
    update: {},
    create: {
      email: "traveller@yogovoyage.com",
      name: "Demo Traveller",
      phone: "9876543210",
      passwordHash: userHash,
      role: "USER",
    },
  });

  for (const d of destinations) {
    await prisma.destination.upsert({
      where: { slug: d.slug },
      update: {
        name: d.name,
        shortDescription: d.shortDescription,
        description: d.description,
        image: d.image,
        startingPrice: d.startingPrice,
        region: d.region,
        bestTime: d.bestTime,
        highlights: JSON.stringify(d.highlights),
        published: true,
      },
      create: {
        slug: d.slug,
        name: d.name,
        shortDescription: d.shortDescription,
        description: d.description,
        image: d.image,
        startingPrice: d.startingPrice,
        region: d.region,
        bestTime: d.bestTime,
        highlights: JSON.stringify(d.highlights),
        published: true,
      },
    });
  }

  for (const p of packages) {
    const dest = await prisma.destination.findUnique({
      where: { slug: p.destinationSlug },
    });
    await prisma.package.upsert({
      where: { slug: p.slug },
      update: {
        name: p.name,
        destinationName: p.destination,
        destinationSlug: p.destinationSlug,
        destinationId: dest?.id,
        duration: p.duration,
        nights: p.nights,
        days: p.days,
        startingPrice: p.startingPrice,
        originalPrice: p.originalPrice ?? null,
        emiFrom: p.emiFrom ?? null,
        category: p.category,
        tripType: p.tripType,
        rating: p.rating,
        reviewCount: p.reviewCount,
        badge: p.badge ?? null,
        featured: Boolean(p.featured),
        image: p.image,
        gallery: JSON.stringify(p.gallery),
        highlights: JSON.stringify(p.highlights),
        overview: p.overview,
        itinerary: JSON.stringify(p.itinerary),
        inclusions: JSON.stringify(p.inclusions),
        exclusions: JSON.stringify(p.exclusions),
        hotels: JSON.stringify(p.hotels),
        transportation: JSON.stringify(p.transportation),
        importantInfo: JSON.stringify(p.importantInfo),
        faqs: JSON.stringify(p.faqs),
        published: true,
      },
      create: {
        slug: p.slug,
        name: p.name,
        destinationName: p.destination,
        destinationSlug: p.destinationSlug,
        destinationId: dest?.id,
        duration: p.duration,
        nights: p.nights,
        days: p.days,
        startingPrice: p.startingPrice,
        originalPrice: p.originalPrice ?? null,
        emiFrom: p.emiFrom ?? null,
        category: p.category,
        tripType: p.tripType,
        rating: p.rating,
        reviewCount: p.reviewCount,
        badge: p.badge ?? null,
        featured: Boolean(p.featured),
        image: p.image,
        gallery: JSON.stringify(p.gallery),
        highlights: JSON.stringify(p.highlights),
        overview: p.overview,
        itinerary: JSON.stringify(p.itinerary),
        inclusions: JSON.stringify(p.inclusions),
        exclusions: JSON.stringify(p.exclusions),
        hotels: JSON.stringify(p.hotels),
        transportation: JSON.stringify(p.transportation),
        importantInfo: JSON.stringify(p.importantInfo),
        faqs: JSON.stringify(p.faqs),
        published: true,
      },
    });
  }

  console.log("Seed complete.");
  console.log("Superadmin: admin@yogovoyage.com / Admin@Yogo2026");
  console.log("User: traveller@yogovoyage.com / User@Yogo2026");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
