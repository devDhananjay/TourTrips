import type { Destination } from "@/types";

export const destinations: Destination[] = [
  {
    id: "1",
    slug: "goa",
    name: "Goa",
    shortDescription:
      "Sun-kissed beaches, vibrant nightlife and Portuguese charm by the Arabian Sea.",
    description:
      "Goa is India's favourite coastal escape — golden beaches, water sports, spice plantations, and a relaxed vibe that suits couples, families and groups alike. Whether you want North Goa's energy or South Goa's quiet shores, we craft the perfect mix of leisure and adventure.",
    image:
      "https://images.unsplash.com/photo-1587922546307-776227941871?w=1200&q=80",
    startingPrice: 12999,
    region: "West India",
    bestTime: "November – March",
    highlights: [
      "Beach hopping & water sports",
      "Old Goa heritage churches",
      "Sunset cruises",
      "Local seafood & nightlife",
    ],
  },
  {
    id: "2",
    slug: "manali",
    name: "Manali",
    shortDescription:
      "Snow-capped peaks, pine forests and adventure in the heart of Himachal.",
    description:
      "Manali is a year-round Himalayan favourite with scenic valleys, Solang adventures, Hadimba Temple and cosy cafés. Ideal for honeymoons, family holidays and thrill-seekers looking for snow, treks and mountain roads.",
    image:
      "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=1200&q=80",
    startingPrice: 14999,
    region: "North India",
    bestTime: "October – June",
    highlights: [
      "Solang Valley adventures",
      "Rohtang / Atal Tunnel views",
      "Hadimba Temple",
      "Riverside stays",
    ],
  },
  {
    id: "3",
    slug: "kashmir",
    name: "Kashmir",
    shortDescription:
      "Paradise on earth — shikaras, tulips, meadows and majestic mountains.",
    description:
      "Kashmir offers unmatched beauty across Srinagar, Gulmarg, Pahalgam and Sonamarg. Glide on Dal Lake, walk through meadows, and experience warm Kashmiri hospitality with curated stays and experiences.",
    image:
      "https://images.unsplash.com/photo-1566837497312-7be7830ae9b1?w=1200&q=80",
    startingPrice: 18999,
    region: "North India",
    bestTime: "March – October",
    highlights: [
      "Dal Lake shikara ride",
      "Gulmarg gondola",
      "Pahalgam valleys",
      "Mughal gardens",
    ],
  },
  {
    id: "4",
    slug: "rajasthan",
    name: "Rajasthan",
    shortDescription:
      "Royal forts, desert sunsets and colourful culture across the Pink City and beyond.",
    description:
      "Discover Jaipur, Jodhpur, Udaipur and Jaisalmer — a land of palaces, folk music, camel safaris and heritage hotels. Perfect for culture lovers, couples and first-time travellers exploring royal India.",
    image:
      "https://images.unsplash.com/photo-1477587458883-47145ed94245?w=1200&q=80",
    startingPrice: 16999,
    region: "West India",
    bestTime: "October – March",
    highlights: [
      "Amber Fort & City Palace",
      "Udaipur lake views",
      "Desert safari in Jaisalmer",
      "Heritage hotel stays",
    ],
  },
  {
    id: "5",
    slug: "kerala",
    name: "Kerala",
    shortDescription:
      "Backwaters, tea gardens and Ayurveda in God's Own Country.",
    description:
      "Kerala blends serene houseboat stays, Munnar's tea estates, Alleppey's canals and Kovalam beaches. Ideal for honeymoons, wellness getaways and nature-focused family holidays.",
    image:
      "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=1200&q=80",
    startingPrice: 15999,
    region: "South India",
    bestTime: "September – March",
    highlights: [
      "Alleppey houseboat",
      "Munnar tea plantations",
      "Ayurveda & wellness",
      "Kathakali & local cuisine",
    ],
  },
  {
    id: "6",
    slug: "dubai",
    name: "Dubai",
    shortDescription:
      "Futuristic skyline, desert adventures and world-class shopping.",
    description:
      "Dubai is a dazzling international destination with Burj Khalifa views, desert safaris, Marina walks and luxury malls. We arrange visas guidance support, stays and curated city experiences for Indian travellers.",
    image:
      "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1200&q=80",
    startingPrice: 34999,
    region: "International",
    bestTime: "November – March",
    highlights: [
      "Burj Khalifa & Dubai Mall",
      "Desert safari with BBQ",
      "Marina & Palm views",
      "Shopping & theme parks",
    ],
  },
  {
    id: "7",
    slug: "bali",
    name: "Bali",
    shortDescription:
      "Temples, rice terraces and beach clubs on Indonesia's island of the gods.",
    description:
      "Bali blends spiritual Ubud, cliffside Uluwatu temples, Seminyak beaches and sunset Tanah Lot views. Ideal for honeymoons, wellness escapes and first-time international travellers from India.",
    image:
      "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=1200&q=80",
    startingPrice: 42999,
    region: "International",
    bestTime: "April – October",
    highlights: [
      "Ubud rice terraces & temples",
      "Uluwatu sunset",
      "Beach clubs & spa",
      "Traditional Balinese culture",
    ],
  },
  {
    id: "8",
    slug: "thailand",
    name: "Thailand",
    shortDescription:
      "Bangkok energy, Phuket beaches and island-hopping adventures.",
    description:
      "Thailand is a favourite short-haul international escape — vibrant Bangkok markets, turquoise Phuket shores and easy island day trips. Great for families, friends and couples seeking value and variety.",
    image:
      "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=1200&q=80",
    startingPrice: 29999,
    region: "International",
    bestTime: "November – February",
    highlights: [
      "Bangkok city & temples",
      "Phuket / Patong beaches",
      "Island hopping",
      "Street food & shopping",
    ],
  },
  {
    id: "9",
    slug: "singapore",
    name: "Singapore",
    shortDescription:
      "Gardens by the Bay, Sentosa fun and a polished city break.",
    description:
      "Singapore is a compact, family-friendly international city break with Gardens by the Bay, Marina Bay views, Sentosa attractions and world-class food — easy visas and seamless planning for Indian travellers.",
    image:
      "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=1200&q=80",
    startingPrice: 38999,
    region: "International",
    bestTime: "Year round",
    highlights: [
      "Gardens by the Bay",
      "Marina Bay Sands views",
      "Sentosa island",
      "Universal Studios (optional)",
    ],
  },
  {
    id: "10",
    slug: "maldives",
    name: "Maldives",
    shortDescription:
      "Overwater villas, turquoise lagoons and pure island romance.",
    description:
      "The Maldives is the ultimate honeymoon and luxury beach escape — crystal lagoons, resort islands, snorkelling and quiet sunsets. We arrange resort stays suited to your budget and celebration style.",
    image:
      "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=1200&q=80",
    startingPrice: 59999,
    region: "International",
    bestTime: "November – April",
    highlights: [
      "Beach / water villa stays",
      "Snorkelling & reef views",
      "Sunset cruises",
      "Couples spa & dining",
    ],
  },
];

export function getDestinationBySlug(slug: string): Destination | undefined {
  return destinations.find((d) => d.slug === slug);
}

export function getDomesticDestinations(): Destination[] {
  return destinations.filter((d) => d.region !== "International");
}

export function getInternationalDestinations(): Destination[] {
  return destinations.filter((d) => d.region === "International");
}
