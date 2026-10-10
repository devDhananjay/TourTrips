import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Clock, MapPin } from "lucide-react";
import Button from "@/components/Button";
import ContactForm from "@/components/ContactForm";
import { formatPrice, whatsappLink } from "@/data/company";
import { getDiscountPercent, getPackageBySlug, packages } from "@/data/packages";
import { Suspense } from "react";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return packages.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const tour = getPackageBySlug(slug);
  if (!tour) return { title: "Package Not Found" };
  return {
    title: tour.name,
    description: tour.overview,
  };
}

export default async function PackageDetailsPage({ params }: Props) {
  const { slug } = await params;
  const tour = getPackageBySlug(slug);
  if (!tour) notFound();

  return (
    <>
      <section className="relative isolate overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={tour.image}
            alt={tour.name}
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/55 to-stone-950/25" />
        </div>
        <div className="container-page relative py-24 md:py-32">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-accent">
            Package Details
          </p>
          <h1 className="max-w-3xl text-4xl text-white md:text-5xl">
            {tour.name}
          </h1>
          <div className="mt-4 flex flex-wrap gap-4 text-stone-200">
            <span className="inline-flex items-center gap-1.5">
              <MapPin className="h-4 w-4" />
              {tour.destination}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Clock className="h-4 w-4" />
              {tour.duration}
            </span>
            <span className="font-semibold text-white">
              From {formatPrice(tour.startingPrice)} / person
            </span>
            {tour.originalPrice ? (
              <span className="text-stone-300 line-through">
                {formatPrice(tour.originalPrice)}
              </span>
            ) : null}
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button href="#enquiry" size="lg" variant="accent">
              Book / Enquire Now
            </Button>
            <Button
              href={whatsappLink(
                `Hi! I want to enquire about the ${tour.name} package.`,
              )}
              size="lg"
              variant="outline"
              target="_blank"
              rel="noopener noreferrer"
              className="border-white/40 bg-white/10 text-white hover:bg-white hover:text-foreground"
            >
              WhatsApp Enquire
            </Button>
          </div>
        </div>
      </section>

      <section className="section-pad">
        <div className="container-page grid gap-10 lg:grid-cols-[1.4fr_0.8fr]">
          <div className="space-y-10">
            <div className="grid gap-3 sm:grid-cols-3">
              {tour.gallery.map((img, i) => (
                <div
                  key={img}
                  className={`relative overflow-hidden rounded-2xl ${i === 0 ? "sm:col-span-2 sm:row-span-2 min-h-[260px]" : "min-h-[140px]"}`}
                >
                  <Image
                    src={img}
                    alt={`${tour.name} gallery ${i + 1}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 40vw"
                  />
                </div>
              ))}
            </div>

            <section>
              <h2 className="text-2xl md:text-3xl">Overview</h2>
              <p className="mt-3 leading-relaxed text-muted">{tour.overview}</p>
              <ul className="mt-5 grid gap-2 sm:grid-cols-2">
                {tour.highlights.map((item) => (
                  <li
                    key={item}
                    className="rounded-xl border border-border bg-surface px-4 py-3 text-sm"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </section>

            <section>
              <h2 className="text-2xl md:text-3xl">Day-by-Day Itinerary</h2>
              <div className="mt-5 space-y-4">
                {tour.itinerary.map((day) => (
                  <article
                    key={day.day}
                    className="rounded-2xl border border-border bg-white p-5"
                  >
                    <p className="text-sm font-semibold uppercase tracking-wide text-brand">
                      Day {day.day}
                    </p>
                    <h3 className="mt-1 text-xl">{day.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted">
                      {day.description}
                    </p>
                  </article>
                ))}
              </div>
            </section>

            <div className="grid gap-6 md:grid-cols-2">
              <section className="rounded-2xl border border-border bg-surface p-5">
                <h2 className="text-xl">Inclusions</h2>
                <ul className="mt-3 space-y-2 text-sm text-muted">
                  {tour.inclusions.map((item) => (
                    <li key={item}>• {item}</li>
                  ))}
                </ul>
              </section>
              <section className="rounded-2xl border border-border bg-surface p-5">
                <h2 className="text-xl">Exclusions</h2>
                <ul className="mt-3 space-y-2 text-sm text-muted">
                  {tour.exclusions.map((item) => (
                    <li key={item}>• {item}</li>
                  ))}
                </ul>
              </section>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <section>
                <h2 className="text-xl">Hotels</h2>
                <ul className="mt-3 space-y-2 text-sm text-muted">
                  {tour.hotels.map((item) => (
                    <li key={item}>• {item}</li>
                  ))}
                </ul>
              </section>
              <section>
                <h2 className="text-xl">Transportation</h2>
                <ul className="mt-3 space-y-2 text-sm text-muted">
                  {tour.transportation.map((item) => (
                    <li key={item}>• {item}</li>
                  ))}
                </ul>
              </section>
            </div>

            <section>
              <h2 className="text-2xl">Important Information</h2>
              <ul className="mt-3 space-y-2 text-sm text-muted">
                {tour.importantInfo.map((item) => (
                  <li key={item}>• {item}</li>
                ))}
              </ul>
            </section>

            <section>
              <h2 className="text-2xl">FAQ</h2>
              <div className="mt-4 space-y-3">
                {tour.faqs.map((faq) => (
                  <details
                    key={faq.question}
                    className="rounded-2xl border border-border bg-white p-4"
                  >
                    <summary className="cursor-pointer font-semibold text-foreground">
                      {faq.question}
                    </summary>
                    <p className="mt-2 text-sm leading-relaxed text-muted">
                      {faq.answer}
                    </p>
                  </details>
                ))}
              </div>
            </section>
          </div>

          <aside className="lg:sticky lg:top-24 lg:self-start" id="enquiry">
            <div className="mb-4 rounded-2xl border border-border bg-brand-soft p-5">
              <p className="text-sm text-muted">Starting price</p>
              <div className="flex flex-wrap items-baseline gap-2">
                <p className="text-3xl font-semibold text-brand">
                  {formatPrice(tour.startingPrice)}
                </p>
                {tour.originalPrice ? (
                  <p className="text-base text-muted line-through">
                    {formatPrice(tour.originalPrice)}
                  </p>
                ) : null}
              </div>
              <p className="text-sm text-muted">per person · {tour.duration}</p>
              {getDiscountPercent(tour) ? (
                <p className="mt-2 text-sm font-semibold text-success">
                  Save {getDiscountPercent(tour)}% on this package
                </p>
              ) : null}
              {tour.emiFrom ? (
                <p className="mt-2 rounded-xl bg-white/80 px-3 py-2 text-sm text-foreground">
                  EMI from{" "}
                  <span className="font-semibold text-brand">
                    {formatPrice(tour.emiFrom)}/month
                  </span>
                  <span className="block text-xs text-muted">
                    Travel now, pay later · subject to bank offers
                  </span>
                </p>
              ) : null}
              <Button href="#enquiry-form" className="mt-4 w-full">
                Book / Enquire Now
              </Button>
            </div>
            <div id="enquiry-form">
              <Suspense fallback={<div className="p-6 text-sm text-muted">Loading form...</div>}>
                <ContactForm packageName={tour.name} />
              </Suspense>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
