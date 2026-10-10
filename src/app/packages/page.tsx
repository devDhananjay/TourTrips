import type { Metadata } from "next";
import PackagesClient from "./PackagesClient";
import PageHero from "@/components/PageHero";

export const metadata: Metadata = {
  title: "Tour Packages",
  description:
    "Browse curated tour packages for Goa, Manali, Kashmir, Rajasthan, Kerala, Dubai and more with Yogo Voyage.",
};

export default function PackagesPage() {
  return (
    <>
      <PageHero
        title="Tour Packages"
        description="Compare durations, destinations and starting prices — then enquire for a customised quote."
        image="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=1600&q=80"
      />
      <PackagesClient />
    </>
  );
}
