import { Link, type LinkOptions } from "@tanstack/react-router";

/** Quiet link back to a section of the home page, above an article's title. */
export function BackLink({ link, children }: { link: LinkOptions; children: string }) {
  return (
    <Link
      {...link}
      className="group inline-flex items-center gap-1.5 text-sm text-muted transition-colors duration-200 ease-out hover:text-ink"
    >
      <span aria-hidden className="transition-transform duration-300 ease-out group-hover:-translate-x-0.5">
        ←
      </span>
      {children}
    </Link>
  );
}
