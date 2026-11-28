import { Link } from "@tanstack/react-router";

export function NotFound() {
  return (
    <section aria-labelledby="not-found" className="reading space-y-4 pt-14 pb-24 sm:pt-20">
      {/* React hoists this into <head>. Route head() does not run for a page that does not exist. */}
      <meta name="robots" content="noindex" />
      <p className="font-mono text-meta text-muted">404</p>
      <h1 id="not-found" className="text-hero font-bold tracking-[-0.02em] sm:text-hero-lg">
        Page not found
      </h1>
      <p className="text-muted">
        This page does not exist. Go to the{" "}
        <Link to="/" className="link">
          home page
        </Link>
        .
      </p>
    </section>
  );
}
