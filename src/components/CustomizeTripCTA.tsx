import { MessageCircle, Sparkles } from "lucide-react";
import Button from "@/components/Button";
import { whatsappLink } from "@/data/company";

export default function CustomizeTripCTA() {
  return (
    <section className="section-pad">
      <div className="container-page">
        <div className="overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-brand via-brand to-brand-dark px-6 py-12 text-white md:px-12">
          <div className="grid items-center gap-8 lg:grid-cols-[1.2fr_0.8fr]">
            <div>
              <p className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-accent">
                <Sparkles className="h-3.5 w-3.5" />
                Customize DIY
              </p>
              <h2 className="mt-4 text-3xl md:text-4xl">
                Build your own holiday — your dates, budget & pace
              </h2>
              <p className="mt-3 max-w-xl text-stone-200">
                Tell us where you want to go, how many travellers and what
                matters most. We craft a personal itinerary with hotels,
                transfers and experiences — just like a DIY holiday planner,
                with expert support.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 lg:justify-end">
              <Button href="/contact" size="lg" variant="accent">
                Plan My Custom Trip
              </Button>
              <Button
                href={whatsappLink(
                  "Hi Yogo Voyage! I want to customise a DIY holiday package.",
                )}
                size="lg"
                variant="outline"
                target="_blank"
                rel="noopener noreferrer"
                className="border-white/40 bg-white/10 text-white hover:bg-white hover:text-foreground"
              >
                <MessageCircle className="h-4 w-4" />
                WhatsApp Brief
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
