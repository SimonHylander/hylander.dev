import Link from "next/link";

export default function NotFound() {
  return (
    <section aria-labelledby="not-found" className="space-y-4 pt-14 sm:pt-20">
      <p className="font-mono text-meta text-muted">404</p>
      <h1 id="not-found" className="text-hero font-bold tracking-[-0.02em] sm:text-hero-lg">
        Page not found
      </h1>
      <p className="text-muted">
        This page does not exist. Go to the{" "}
        <Link href="/" className="link">
          home page
        </Link>
        .
      </p>
    </section>
  );
}
