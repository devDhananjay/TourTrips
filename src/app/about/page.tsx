import type { Metadata } from "next";
import Image from "next/image";
import Button from "@/components/Button";
import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";
import { company } from "@/data/company";
import { whyChooseUs } from "@/data/services";
import IconBadge from "@/components/IconBadge";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about Yogo Voyage — an Indian travel agency helping travellers explore destinations with curated packages and personalised planning.",
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        title="About Yogo Voyage"
        description="We are a Delhi-based travel agency passionate about crafting meaningful journeys across India and the world."
        image="https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1600&q=80"
      />

      <section className="section-pad">
        <div className="container-page grid items-center gap-10 lg:grid-cols-2">
          <div className="relative h-[360px] overflow-hidden rounded-3xl md:h-[440px]">
            <Image
              src="https://images.unsplash.com/photo-1526772662000-3f88f10405ff?w=1200&q=80"
              alt="Travel planning team collaborating"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
          <div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-brand">
              Our Story
            </p>
            <h2 className="text-3xl md:text-4xl">
              Travel, thoughtfully planned
            </h2>
            <p className="mt-4 leading-relaxed text-muted">
              Yogo Voyage started with a simple belief — holidays should feel
              personal, transparent and stress-free. Over the years we have
              helped families, couples and corporate groups explore destinations
              like Goa, Kashmir, Kerala, Rajasthan and Dubai with carefully
              designed itineraries.
            </p>
            <p className="mt-4 leading-relaxed text-muted">
              Today, our destination specialists combine local knowledge with
              reliable logistics so you can focus on the moments that matter —
              sunsets, road trips, celebrations and shared adventures.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href="/packages">Browse Packages</Button>
              <Button href="/contact" variant="outline">
                Speak to an Expert
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="section-pad bg-surface">
        <div className="container-page">
          <SectionHeading
            title="What Drives Us"
            description="Quality stays, honest advice and journeys that feel uniquely yours."
          />
          <div className="grid gap-5 md:grid-cols-3">
            {[
              {
                title: "Our Mission",
                text: "To make premium travel accessible through transparent pricing and personalised planning.",
              },
              {
                title: "Our Vision",
                text: "To be India’s most trusted companion for domestic and international holidays.",
              },
              {
                title: "Our Promise",
                text: "Clear communication, dependable partners and support whenever you need us.",
              },
            ].map((item) => (
              <article
                key={item.title}
                className="rounded-2xl border border-border bg-white p-6"
              >
                <h3 className="text-xl">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  {item.text}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad">
        <div className="container-page">
          <SectionHeading title="Why Travellers Trust Us" />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
            {whyChooseUs.map((item) => (
              <article
                key={item.title}
                className="rounded-2xl border border-border bg-surface p-5"
              >
                <div className="mb-3 text-brand">
                  <IconBadge name={item.icon} />
                </div>
                <h3 className="text-lg">{item.title}</h3>
                <p className="mt-2 text-sm text-muted">{item.description}</p>
              </article>
            ))}
          </div>
          <div className="mt-10 rounded-2xl border border-border bg-brand-soft p-6 text-center md:p-8">
            <p className="text-lg text-foreground">
              Based in {company.address.split(",")[2] || "New Delhi"} · Serving
              travellers across India
            </p>
            <Button href="/contact" className="mt-5">
              Start Planning Today
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
