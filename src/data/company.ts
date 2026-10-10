export const company = {
  name: "Yogo Voyage",
  tagline: "Explore the World, Create Memories",
  description:
    "Yogo Voyage is a trusted Indian travel agency crafting memorable domestic and international journeys. From Goa beaches to Himalayan escapes and Dubai city breaks, we design trips that feel personal, seamless, and truly worth remembering.",
  phone: "+91 93108 26295",
  phoneRaw: "919310826295",
  email: "info@yogovoyage.com",
  whatsapp: "919310826295",
  address: "412, Horizon Plaza, Connaught Place, New Delhi – 110001, India",
  workingHours: "Mon – Sat: 9:00 AM – 7:00 PM",
  logo: "/logo.jpg",
  logoMark: "/logo-square.jpg",
  favicon: "/favicon.png",
  social: {
    facebook: "https://facebook.com",
    instagram: "https://instagram.com",
    twitter: "https://twitter.com",
    youtube: "https://youtube.com",
  },
};

export const navLinks = [
  { href: "/", label: "Home" },
  { href: "/destinations", label: "Destinations" },
  { href: "/packages", label: "Tour Packages" },
  { href: "/about", label: "About Us" },
  { href: "/services", label: "Services" },
  { href: "/contact", label: "Contact" },
];

export const budgetOptions = [
  "Under ₹20,000",
  "₹20,000 – ₹50,000",
  "₹50,000 – ₹1,00,000",
  "Above ₹1,00,000",
];

export function formatPrice(amount: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}

export const trustStats = [
  { value: "50+", label: "Curated packages" },
  { value: "10+", label: "Top destinations" },
  { value: "24/7", label: "Trip support" },
  { value: "100%", label: "Custom itineraries" },
];

export const seasonalDeals = [
  {
    id: "summer",
    title: "Summer escapes",
    description: "Cool hill stations & beach getaways with early-bird hotel rates.",
    tag: "Up to 20% off",
    href: "/packages?tripType=leisure",
    image:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&q=80",
  },
  {
    id: "monsoon",
    title: "Monsoon moods",
    description: "Kerala backwaters & lush valleys when the rains turn India green.",
    tag: "Seasonal deals",
    href: "/packages?destination=kerala",
    image:
      "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=1200&q=80",
  },
  {
    id: "honeymoon",
    title: "Honeymoon specials",
    description: "Romantic stays, private transfers and handpicked experiences.",
    tag: "Couples favourite",
    href: "/packages?tripType=honeymoon",
    image:
      "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=1200&q=80",
  },
];

export function whatsappLink(message?: string): string {
  const text = encodeURIComponent(
    message || "Hi Yogo Voyage! I would like to enquire about a trip.",
  );
  return `https://wa.me/${company.whatsapp}?text=${text}`;
}
