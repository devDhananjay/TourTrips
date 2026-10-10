export default function TripMarquee() {
  const items = [
    "Goa beaches",
    "Manali snow",
    "Kashmir valleys",
    "Rajasthan forts",
    "Kerala backwaters",
    "Dubai skyline",
    "Honeymoon escapes",
    "Family holidays",
    "Adventure trails",
    "Custom DIY trips",
  ];
  const loop = [...items, ...items];

  return (
    <div className="border-y border-white/15 bg-stone-950/35 py-3 backdrop-blur-sm">
      <div className="trip-marquee">
        <div className="trip-marquee-track text-sm font-semibold uppercase tracking-[0.2em] text-white/90">
          {loop.map((item, i) => (
            <span key={`${item}-${i}`} className="inline-flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              {item}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
