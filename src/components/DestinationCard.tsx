import Image from "next/image";
import Link from "next/link";
import { MapPin } from "lucide-react";
import type { Destination } from "@/types";
import { formatPrice } from "@/data/company";
import Button from "./Button";
import Reveal from "./Reveal";

export default function DestinationCard({
  destination,
  delay = 0,
}: {
  destination: Destination;
  delay?: number;
}) {
  return (
    <Reveal as="article" delay={delay}>
      <div className="group card-lift overflow-hidden rounded-2xl border border-border bg-white">
        <div className="relative h-56 overflow-hidden">
          <Image
            src={destination.image}
            alt={`${destination.name} travel destination`}
            fill
            className="img-zoom object-cover"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
          <div className="absolute bottom-3 left-3 flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1 text-xs font-semibold text-foreground">
            <MapPin className="h-3.5 w-3.5 text-brand" />
            {destination.region}
          </div>
        </div>
        <div className="p-5">
          <h3 className="text-xl text-foreground">{destination.name}</h3>
          <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted">
            {destination.shortDescription}
          </p>
          <div className="mt-4 flex items-center justify-between gap-3">
            <div>
              <p className="text-xs uppercase tracking-wide text-muted">
                Starting from
              </p>
              <p className="text-lg font-semibold text-brand">
                {formatPrice(destination.startingPrice)}
              </p>
            </div>
            <Button href={`/packages?destination=${destination.slug}`} size="sm">
              View Packages
            </Button>
          </div>
          <Link
            href={`/destinations#${destination.slug}`}
            className="mt-3 inline-block text-sm font-medium text-foreground underline-offset-4 hover:text-brand hover:underline"
          >
            Explore {destination.name}
          </Link>
        </div>
      </div>
    </Reveal>
  );
}
