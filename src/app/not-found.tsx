import Link from "next/link";
import Button from "@/components/Button";

export default function NotFound() {
  return (
    <section className="container-page flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
      <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand">
        404
      </p>
      <h1 className="mt-3 text-4xl">Page not found</h1>
      <p className="mt-3 max-w-md text-muted">
        The page you are looking for may have been moved or no longer exists.
      </p>
      <div className="mt-8 flex gap-3">
        <Button href="/">Go Home</Button>
        <Button href="/packages" variant="outline">
          Browse Packages
        </Button>
      </div>
      <Link href="/contact" className="mt-4 text-sm text-brand hover:underline">
        Need help? Contact us
      </Link>
    </section>
  );
}
