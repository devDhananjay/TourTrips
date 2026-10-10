export type SeasonId = "winter" | "summer" | "monsoon";

export type SeasonConfig = {
  id: SeasonId;
  label: string;
  headline: string;
  description: string;
  background: string;
  packageSlugs: string[];
};

export const seasons: SeasonConfig[] = [
  {
    id: "winter",
    label: "Winter",
    headline: "Winter escapes, made memorable with Yogo Voyage!",
    description:
      "Chase snow in the Himalayas, desert sunsets in Rajasthan, or sunny international city breaks when India cools down.",
    background:
      "https://images.unsplash.com/photo-1483921020237-2ff51e8e4b22?w=1800&q=70",
    packageSlugs: [
      "kashmir-paradise-tour",
      "manali-snow-escape",
      "rajasthan-royal-circuit",
      "dubai-delight",
      "singapore-sparkle",
      "maldives-serenity",
    ],
  },
  {
    id: "summer",
    label: "Summer",
    headline: "Beat the heat with cool hills & beach getaways!",
    description:
      "Escape the plains with Himalayan breezes, coastal leisure and tropical international holidays built for summer calendars.",
    background:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1800&q=70",
    packageSlugs: [
      "manali-snow-escape",
      "goa-beach-bliss",
      "kashmir-paradise-tour",
      "bali-bliss",
      "thailand-escape",
      "maldives-serenity",
    ],
  },
  {
    id: "monsoon",
    label: "Monsoon",
    headline: "Monsoon moods, made memorable with Yogo Voyage!",
    description:
      "Let the rains rejuvenate your spirit as you explore lush valleys, Kerala backwaters and scenic green escapes.",
    background:
      "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1800&q=70",
    packageSlugs: [
      "kerala-backwater-retreat",
      "goa-beach-bliss",
      "manali-snow-escape",
      "bali-bliss",
      "thailand-escape",
      "singapore-sparkle",
    ],
  },
];
