import type { Route } from "next";
import Link from "next/link";

/** Quiet link back to a section of the home page, above an article's title. */
export function BackLink({ href, children }: { href: Route; children: string }) {
  return (
    <Link
      href={href}
      className="group inline-flex items-center gap-1.5 text-sm text-muted transition-colors duration-200 ease-out hover:text-ink"
    >
      <span aria-hidden className="transition-transform duration-300 ease-out group-hover:-translate-x-0.5">
        ←
      </span>
      {children}
    </Link>
  );
}
