import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import { company } from "@/data/company";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `Privacy Policy for ${company.name}.`,
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <PageHero
        title="Privacy Policy"
        description="How we collect, use and protect your information when you enquire or browse our website."
        image="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1600&q=80"
      />
      <section className="section-pad">
        <div className="container-page prose-custom max-w-3xl space-y-8 text-muted">
          <p>
            This Privacy Policy explains how {company.name} (&quot;we&quot;,
            &quot;us&quot;) handles personal information shared through our
            website, enquiry forms, phone, email or WhatsApp.
          </p>
          <div>
            <h2 className="mb-3 text-2xl text-foreground">Information We Collect</h2>
            <p>
              We may collect your name, phone number, email address, travel
              preferences, destination interest, travel dates, number of
              travellers and messages you send us. Technical data such as browser
              type and basic analytics may also be collected.
            </p>
          </div>
          <div>
            <h2 className="mb-3 text-2xl text-foreground">How We Use Information</h2>
            <ul className="list-disc space-y-2 pl-5">
              <li>To respond to enquiries and prepare travel quotations</li>
              <li>To process bookings and coordinate travel services</li>
              <li>To send trip updates and, if you opt in, newsletters</li>
              <li>To improve our website and customer experience</li>
            </ul>
          </div>
          <div>
            <h2 className="mb-3 text-2xl text-foreground">Sharing of Data</h2>
            <p>
              We share necessary details only with trusted partners such as
              hotels, transport providers or airlines to fulfil your booking. We
              do not sell personal data.
            </p>
          </div>
          <div>
            <h2 className="mb-3 text-2xl text-foreground">Data Security</h2>
            <p>
              We take reasonable administrative and technical measures to protect
              your information. However, no online transmission is completely
              secure.
            </p>
          </div>
          <div>
            <h2 className="mb-3 text-2xl text-foreground">Your Choices</h2>
            <p>
              You may request access, correction or deletion of your enquiry data
              by emailing{" "}
              <a className="text-brand underline" href={`mailto:${company.email}`}>
                {company.email}
              </a>
              .
            </p>
          </div>
          <div>
            <h2 className="mb-3 text-2xl text-foreground">Contact</h2>
            <p>
              For privacy-related questions, contact us at {company.email} or{" "}
              {company.phone}. Address: {company.address}.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
