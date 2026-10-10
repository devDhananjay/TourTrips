import Image from "next/image";
import { Star } from "lucide-react";
import type { Testimonial } from "@/types";
import Reveal from "./Reveal";

export default function TestimonialCard({
  testimonial,
  delay = 0,
}: {
  testimonial: Testimonial;
  delay?: number;
}) {
  return (
    <Reveal as="article" delay={delay}>
      <div className="card-lift rounded-2xl border border-border bg-white p-6">
        <div className="mb-4 flex gap-1 text-amber-500">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={`h-4 w-4 ${i < testimonial.rating ? "fill-current" : "text-stone-300"}`}
            />
          ))}
        </div>
        <p className="text-sm leading-relaxed text-stone-700">
          “{testimonial.review}”
        </p>
        <div className="mt-5 flex items-center gap-3">
          <div className="relative h-12 w-12 overflow-hidden rounded-full">
            <Image
              src={testimonial.image}
              alt={testimonial.name}
              fill
              className="object-cover"
              sizes="48px"
            />
          </div>
          <div>
            <p className="font-semibold text-foreground">{testimonial.name}</p>
            <p className="text-xs text-muted">
              {testimonial.location} · {testimonial.trip}
            </p>
          </div>
        </div>
      </div>
    </Reveal>
  );
}
