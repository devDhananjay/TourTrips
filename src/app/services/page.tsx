import type { Metadata } from "next";
import Button from "@/components/Button";
import IconBadge from "@/components/IconBadge";
import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";
import { services } from "@/data/services";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Domestic and international tours, honeymoon packages, family holidays, corporate trips, hotels, flights and cab bookings.",
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        title="Our Travel Services"
        description="End-to-end travel solutions for leisure travellers, honeymooners, families and corporate groups."
        image="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1600&q=80"
      />

      <section className="section-pad">
        <div className="container-page">
          <SectionHeading
            title="Everything You Need for a Smooth Journey"
            description="From itinerary design to transport and stays — we coordinate the complete experience."
          />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((service) => (
              <article
                key={service.id}
                className="card-lift rounded-2xl border border-border bg-white p-6"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-brand text-white">
                  <IconBadge name={service.icon} />
                </div>
                <h3 className="text-xl">{service.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  {service.description}
                </p>
              </article>
            ))}
          </div>

          <div className="mt-12 rounded-3xl bg-stone-950 px-6 py-10 text-center text-white md:px-10">
            <h2 className="text-3xl">Need a custom travel plan?</h2>
            <p className="mx-auto mt-3 max-w-2xl text-stone-300">
              Tell us your destination, dates and budget — we will design a
              package that fits your style of travel.
            </p>
            <Button href="/contact" className="mt-6" variant="accent" size="lg">
              Request a Custom Quote
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
