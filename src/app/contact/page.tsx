import type { Metadata } from "next";
import { Suspense } from "react";
import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import Button from "@/components/Button";
import ContactForm from "@/components/ContactForm";
import PageHero from "@/components/PageHero";
import {
  buildWhatsappLink,
  getSiteSettings,
} from "@/lib/site-settings";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Contact Yogo Voyage for tour package enquiries, custom itineraries and booking support.",
};

export default async function ContactPage() {
  const { company } = await getSiteSettings();

  return (
    <>
      <PageHero
        title="Contact Us"
        description="Have a destination in mind? Share your travel plans and our experts will get back with options."
        image="https://images.unsplash.com/photo-1423666639041-f56000c27a9a?w=1600&q=80"
      />

      <section className="section-pad">
        <div className="container-page grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="space-y-5">
            <div className="rounded-2xl border border-border bg-surface p-6">
              <h2 className="text-2xl">Get in Touch</h2>
              <ul className="mt-5 space-y-4 text-sm">
                <li className="flex gap-3">
                  <Phone className="mt-0.5 h-5 w-5 text-brand" />
                  <div>
                    <p className="font-semibold text-foreground">Phone</p>
                    <a
                      href={`tel:${company.phoneRaw}`}
                      className="text-muted hover:text-brand"
                    >
                      {company.phone}
                    </a>
                  </div>
                </li>
                <li className="flex gap-3">
                  <Mail className="mt-0.5 h-5 w-5 text-brand" />
                  <div>
                    <p className="font-semibold text-foreground">Email</p>
                    <a
                      href={`mailto:${company.email}`}
                      className="text-muted hover:text-brand"
                    >
                      {company.email}
                    </a>
                  </div>
                </li>
                <li className="flex gap-3">
                  <MapPin className="mt-0.5 h-5 w-5 text-brand" />
                  <div>
                    <p className="font-semibold text-foreground">Address</p>
                    <p className="text-muted">{company.address}</p>
                  </div>
                </li>
              </ul>
              <p className="mt-5 text-sm text-muted">{company.workingHours}</p>
              <Button
                href={buildWhatsappLink(
                  company.whatsapp,
                  undefined,
                  company.name,
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 w-full"
                variant="accent"
              >
                <MessageCircle className="h-4 w-4" />
                WhatsApp Enquiry
              </Button>
            </div>

            <div className="overflow-hidden rounded-2xl border border-border">
              <iframe
                title={`${company.name} office location map`}
                src="https://maps.google.com/maps?q=Connaught%20Place%20New%20Delhi&t=&z=14&ie=UTF8&iwloc=&output=embed"
                className="h-72 w-full"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

          <Suspense
            fallback={
              <div className="rounded-2xl border border-border p-6 text-muted">
                Loading contact form...
              </div>
            }
          >
            <ContactForm />
          </Suspense>
        </div>
      </section>
    </>
  );
}
