import type { Metadata } from "next";
import Image from "next/image";
import Button from "@/components/Button";
import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";
import { destinations } from "@/data/destinations";
import { formatPrice } from "@/data/company";

export const metadata: Metadata = {
  title: "Destinations",
  description:
    "Explore popular travel destinations including Goa, Manali, Kashmir, Rajasthan, Kerala, Dubai, Bali, Thailand, Singapore and Maldives with Yogo Voyage.",
};

export default function DestinationsPage() {
  return (
    <>
      <PageHero
        title="Travel Destinations"
        description="Browse handpicked destinations for beaches, mountains, heritage circuits and international city breaks."
        image="https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=1600&q=80"
      />

      <section className="section-pad">
        <div className="container-page">
          <SectionHeading
            title="Where Will You Go Next?"
            description="Each destination page highlights the best experiences, ideal travel season and package starting prices."
          />
          <div className="space-y-10">
            {destinations.map((destination, index) => (
              <article
                key={destination.id}
                id={destination.slug}
                className="scroll-mt-28 overflow-hidden rounded-3xl border border-border bg-white shadow-sm"
              >
                <div
                  className={`grid lg:grid-cols-2 ${index % 2 === 1 ? "lg:[&>div:first-child]:order-2" : ""}`}
                >
                  <div className="relative min-h-[280px]">
                    <Image
                      src={destination.image}
                      alt={destination.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                  </div>
                  <div className="p-6 md:p-8">
                    <p className="text-sm font-semibold uppercase tracking-[0.16em] text-brand">
                      {destination.region}
                    </p>
                    <h2 className="mt-2 text-3xl">{destination.name}</h2>
                    <p className="mt-3 leading-relaxed text-muted">
                      {destination.description}
                    </p>
                    <p className="mt-4 text-sm text-muted">
                      <span className="font-semibold text-foreground">
                        Best time:
                      </span>{" "}
                      {destination.bestTime}
                    </p>
                    <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                      {destination.highlights.map((item) => (
                        <li
                          key={item}
                          className="rounded-xl bg-surface px-3 py-2 text-sm text-stone-700"
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
                    <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
                      <div>
                        <p className="text-xs uppercase tracking-wide text-muted">
                          Packages from
                        </p>
                        <p className="text-2xl font-semibold text-brand">
                          {formatPrice(destination.startingPrice)}
                        </p>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        <Button
                          href={`/packages?destination=${destination.slug}`}
                        >
                          View Packages
                        </Button>
                        <Button href="/contact" variant="outline">
                          Enquire
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
