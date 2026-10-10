export default function TrustStats({
  stats,
}: {
  stats: Array<{ value: string; label: string }>;
}) {
  return (
    <section className="border-b border-border bg-surface">
      <div className="container-page grid grid-cols-2 gap-6 py-8 md:grid-cols-4 md:py-10">
        {stats.map((stat) => (
          <div key={stat.label} className="text-center md:text-left">
            <p className="text-3xl font-bold text-brand md:text-4xl">
              {stat.value}
            </p>
            <p className="mt-1 text-sm text-muted">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
