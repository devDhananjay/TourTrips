import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import { company } from "@/data/company";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description: `Terms and conditions for using ${company.name} website and booking services.`,
};

export default function TermsPage() {
  return (
    <>
      <PageHero
        title="Terms & Conditions"
        description="Please read these terms carefully before using our website or booking travel services."
        image="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1600&q=80"
      />
      <section className="section-pad">
        <div className="container-page max-w-3xl space-y-8 text-muted">
          <p>
            By accessing the {company.name} website or submitting an enquiry, you
            agree to the following terms and conditions.
          </p>
          <div>
            <h2 className="mb-3 text-2xl text-foreground">Quotations & Bookings</h2>
            <p>
              Package prices displayed on the website are indicative starting
              prices and may vary based on travel dates, hotel availability,
              number of travellers and seasonal demand. A booking is confirmed
              only after written confirmation and receipt of the required
              payment.
            </p>
          </div>
          <div>
            <h2 className="mb-3 text-2xl text-foreground">Payments</h2>
            <p>
              Payment schedules, accepted modes and cancellation charges will be
              shared in your quotation. Delays in payment may affect hotel or
              transport availability.
            </p>
          </div>
          <div>
            <h2 className="mb-3 text-2xl text-foreground">Cancellations & Changes</h2>
            <p>
              Cancellation and rescheduling policies depend on supplier rules
              (hotels, airlines, activities). We will communicate applicable
              charges clearly before confirming changes.
            </p>
          </div>
          <div>
            <h2 className="mb-3 text-2xl text-foreground">Traveller Responsibilities</h2>
            <ul className="list-disc space-y-2 pl-5">
              <li>Ensure valid ID / passport / visa documents</li>
              <li>Review itinerary details before travel</li>
              <li>Follow local laws and hotel policies</li>
              <li>Purchase travel insurance where recommended</li>
            </ul>
          </div>
          <div>
            <h2 className="mb-3 text-2xl text-foreground">Liability</h2>
            <p>
              While we carefully select partners, we are not liable for delays,
              weather disruptions, political events, supplier defaults or losses
              beyond our reasonable control. Our role is to coordinate travel
              services in good faith.
            </p>
          </div>
          <div>
            <h2 className="mb-3 text-2xl text-foreground">Website Content</h2>
            <p>
              Images and descriptions are for illustration. Actual experiences
              may differ slightly based on season and operational conditions.
            </p>
          </div>
          <div>
            <h2 className="mb-3 text-2xl text-foreground">Contact</h2>
            <p>
              Questions about these terms? Email {company.email} or call{" "}
              {company.phone}.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
