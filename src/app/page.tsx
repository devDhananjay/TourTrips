import Image from "next/image";
import { ArrowRight, MessageCircle } from "lucide-react";
import Button from "@/components/Button";
import CustomizeTripCTA from "@/components/CustomizeTripCTA";
import DestinationCard from "@/components/DestinationCard";
import FindYourWay from "@/components/FindYourWay";
import GetInspired from "@/components/GetInspired";
import HeroEnquiryForm from "@/components/HeroEnquiryForm";
import HeroQuickLinks from "@/components/HeroQuickLinks";
import HeroSearch from "@/components/HeroSearch";
import IconBadge from "@/components/IconBadge";
import NewsletterForm from "@/components/NewsletterForm";
import SeasonWhenToGo from "@/components/SeasonWhenToGo";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";
import TestimonialCard from "@/components/TestimonialCard";
import ThingsToDo from "@/components/ThingsToDo";
import TrendingPackages from "@/components/TrendingPackages";
import TrustStats from "@/components/TrustStats";
import {
  getDomesticDestinations,
  getInternationalDestinations,
} from "@/data/destinations";
import { getPublishedDestinations } from "@/lib/content";
import {
  buildWhatsappLink,
  getSiteSettings,
} from "@/lib/site-settings";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const [publishedDestinations, settings] = await Promise.all([
    getPublishedDestinations(),
    getSiteSettings(),
  ]);
  const { company, home } = settings;
  const heroDestinations = publishedDestinations.map((d) => ({
    slug: d.slug,
    name: d.name,
    region: d.region,
  }));

  return (
    <>
      <section className="relative isolate min-h-[78vh] overflow-hidden md:min-h-[82vh]">
        <div className="absolute inset-0">
          <Image
            src={home.hero.image}
            alt={home.hero.alt}
            fill
            priority
            className="hero-kenburns object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-stone-950/55 via-stone-950/35 to-stone-950/70" />
          <div className="hero-shimmer" />
          <div className="float-orb float-orb-2 left-[8%] top-[22%] h-28 w-28 bg-accent/30" />
          <div className="float-orb float-orb-3 right-[12%] top-[30%] h-36 w-36 bg-brand/25" />
          <div className="float-orb bottom-[18%] left-[20%] h-20 w-20 bg-white/20" />
        </div>

        <div className="container-page relative flex min-h-[78vh] flex-col justify-center pb-14 pt-10 md:min-h-[82vh] md:pb-16 md:pt-14">
          <h1 className="sr-only">
            {company.name} — {company.tagline}
          </h1>
          <HeroSearch destinations={heroDestinations} />
          <HeroQuickLinks />
        </div>
      </section>

      <section className="section-pad section-glow relative overflow-hidden bg-brand-soft">
        <div className="float-orb float-orb-2 right-[8%] top-[12%] h-28 w-28 bg-brand/15" />
        <div className="float-orb bottom-[10%] left-[6%] h-24 w-24 bg-accent/20" />
        <div className="container-page relative">
          <Reveal>
            <SectionHeading
              eyebrow={home.international.eyebrow}
              title={home.international.title}
              description={home.international.description}
            />
          </Reveal>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {getInternationalDestinations().map((destination, index) => (
              <DestinationCard
                key={destination.id}
                destination={destination}
                delay={index * 80}
              />
            ))}
          </div>
          <div className="mt-10 text-center">
            <Button href="/packages?category=international">
              View International Packages <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

      <ThingsToDo
        eyebrow={home.thingsToDo.eyebrow}
        title={home.thingsToDo.title}
        items={home.thingsToDo.items}
      />
      <FindYourWay />
      <GetInspired
        eyebrow={home.getInspired.eyebrow}
        title={home.getInspired.title}
        stories={home.getInspired.stories}
      />
      <TrendingPackages />
      <SeasonWhenToGo />

      <section className="section-pad section-glow bg-surface">
        <div className="container-page">
          <Reveal>
            <SectionHeading
              eyebrow={home.india.eyebrow}
              title={home.india.title}
              description={home.india.description}
            />
          </Reveal>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {getDomesticDestinations().map((destination, index) => (
              <DestinationCard
                key={destination.id}
                destination={destination}
                delay={index * 80}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-soft via-white to-accent-soft" />
        <div className="float-orb float-orb-2 right-[6%] top-[18%] h-32 w-32 bg-brand/15" />
        <div className="container-page relative grid items-center gap-10 lg:grid-cols-[1fr_1.05fr]">
          <Reveal className="max-w-xl">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand">
              {home.enquiry.eyebrow}
            </p>
            <h2 className="mt-3 text-3xl text-foreground md:text-4xl">
              {home.enquiry.title}
            </h2>
            <p className="mt-4 text-muted">{home.enquiry.body}</p>
            <ul className="mt-6 space-y-2 text-sm text-foreground">
              {home.enquiry.bullets.map((bullet) => (
                <li key={bullet}>• {bullet}</li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={120}>
            <HeroEnquiryForm />
          </Reveal>
        </div>
      </section>

      <CustomizeTripCTA
        eyebrow={home.customizeCta.eyebrow}
        title={home.customizeCta.title}
        body={home.customizeCta.body}
        whatsappHref={buildWhatsappLink(
          company.whatsapp,
          `Hi ${company.name}! I want to customise a DIY holiday package.`,
          company.name,
        )}
      />

      <section className="section-pad bg-brand-soft">
        <div className="container-page">
          <SectionHeading
            eyebrow={home.whyChooseUs.eyebrow}
            title={home.whyChooseUs.title}
            description={home.whyChooseUs.description}
          />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
            {home.whyChooseUs.items.map((item, index) => (
              <Reveal key={item.title} as="article" delay={index * 70}>
                <div className="card-lift rounded-2xl border border-blue-100 bg-white p-5">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-brand text-white">
                    <IconBadge name={item.icon} />
                  </div>
                  <h3 className="text-lg text-foreground">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    {item.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <TrustStats stats={home.trustStats} />

      <section className="section-pad">
        <div className="container-page">
          <SectionHeading
            eyebrow={home.services.eyebrow}
            title={home.services.title}
            description={home.services.description}
          />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {home.services.items.map((service, index) => (
              <Reveal key={service.id} as="article" delay={index * 60}>
                <div className="card-lift rounded-2xl border border-border bg-surface p-5">
                  <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-accent-soft text-accent">
                    <IconBadge name={service.icon} className="h-5 w-5" />
                  </div>
                  <h3 className="text-lg text-foreground">{service.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    {service.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Button href="/services">
              Explore Services <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

      <section className="section-pad bg-surface">
        <div className="container-page">
          <SectionHeading
            eyebrow={home.testimonials.eyebrow}
            title={home.testimonials.title}
            description={home.testimonials.description}
          />
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {home.testimonials.items.map((t, index) => (
              <TestimonialCard key={t.id} testimonial={t} delay={index * 80} />
            ))}
          </div>
        </div>
      </section>

      <section className="relative isolate overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={home.bottomCta.image}
            alt={home.bottomCta.title}
            fill
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-stone-950/75" />
        </div>
        <div className="container-page relative py-20 text-center text-white">
          <h2 className="text-3xl md:text-4xl">{home.bottomCta.title}</h2>
          <p className="mx-auto mt-4 max-w-2xl text-stone-200">
            {home.bottomCta.body}
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Button href="/contact" size="lg" variant="accent">
              Talk to Our Travel Expert
            </Button>
            <Button
              href={buildWhatsappLink(
                company.whatsapp,
                `Hi! I want to plan my next trip with ${company.name}.`,
                company.name,
              )}
              size="lg"
              variant="outline"
              target="_blank"
              rel="noopener noreferrer"
              className="border-white/40 bg-white/10 text-white hover:bg-white hover:text-foreground"
            >
              <MessageCircle className="h-4 w-4" />
              WhatsApp Us
            </Button>
          </div>
        </div>
      </section>

      <section className="section-pad">
        <div className="container-page">
          <div className="relative overflow-hidden rounded-3xl border border-border bg-surface-2 px-6 py-12 md:px-12">
            <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-brand/10" />
            <div className="absolute -bottom-16 left-10 h-48 w-48 rounded-full bg-accent/10" />
            <div className="relative mx-auto max-w-2xl text-center">
              <h2 className="text-3xl text-foreground md:text-4xl">
                {home.newsletter.title}
              </h2>
              <p className="mt-3 text-muted">{home.newsletter.body}</p>
              <div className="relative mx-auto mt-8 max-w-xl">
                <NewsletterForm />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
