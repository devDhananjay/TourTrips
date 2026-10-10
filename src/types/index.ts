export type Destination = {
  id: string;
  slug: string;
  name: string;
  shortDescription: string;
  description: string;
  image: string;
  startingPrice: number;
  region: string;
  bestTime: string;
  highlights: string[];
};

export type ItineraryDay = {
  day: number;
  title: string;
  description: string;
};

export type PackageFAQ = {
  question: string;
  answer: string;
};

export type PackageCategory = "domestic" | "international";
export type TripType =
  | "honeymoon"
  | "family"
  | "adventure"
  | "spiritual"
  | "leisure";

export type TourPackage = {
  id: string;
  slug: string;
  name: string;
  destination: string;
  destinationSlug: string;
  duration: string;
  nights: number;
  days: number;
  startingPrice: number;
  /** Strike-through MRP for offer pricing (SOTC-style). */
  originalPrice?: number;
  /** Suggested EMI / month starting amount. */
  emiFrom?: number;
  category: PackageCategory;
  tripType: TripType;
  rating: number;
  reviewCount: number;
  badge?: string;
  image: string;
  gallery: string[];
  highlights: string[];
  overview: string;
  itinerary: ItineraryDay[];
  inclusions: string[];
  exclusions: string[];
  hotels: string[];
  transportation: string[];
  importantInfo: string[];
  faqs: PackageFAQ[];
  featured?: boolean;
};

export type Testimonial = {
  id: string;
  name: string;
  location: string;
  rating: number;
  review: string;
  image: string;
  trip: string;
};

export type Service = {
  id: string;
  title: string;
  description: string;
  icon: string;
};
