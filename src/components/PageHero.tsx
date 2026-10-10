import Image from "next/image";
import { cn } from "@/lib/utils";

type PageHeroProps = {
  title: string;
  description?: string;
  image: string;
  className?: string;
};

export default function PageHero({
  title,
  description,
  image,
  className,
}: PageHeroProps) {
  return (
    <section className={cn("relative isolate overflow-hidden", className)}>
      <div className="absolute inset-0">
        <Image
          src={image}
          alt=""
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-stone-950/80 via-stone-950/55 to-stone-950/30" />
      </div>
      <div className="container-page relative py-20 md:py-28">
        <h1 className="max-w-3xl text-4xl text-white md:text-5xl">{title}</h1>
        {description ? (
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-stone-200 md:text-lg">
            {description}
          </p>
        ) : null}
      </div>
    </section>
  );
}
