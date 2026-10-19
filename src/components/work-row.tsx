"use client";

import Link from "next/link";
import { useId, useState, type ReactNode } from "react";

type WorkRowProps = {
  slug: string;
  title: string;
  tagline: string;
  summary: string;
  years?: string;
  /** Rendered at the end of the expanded panel. */
  children?: ReactNode;
};

/**
 * One row of the home page's Selected work list. The header button expands the summary inline.
 * Without JavaScript every panel renders open (see the <noscript> rule in the root layout).
 */
export function WorkRow({ slug, title, tagline, summary, years, children }: WorkRowProps) {
  const [open, setOpen] = useState(false);
  const id = useId();

  return (
    <li className="border-b border-line">
      <h3>
        <button
          type="button"
          id={`${id}-button`}
          aria-expanded={open}
          aria-controls={`${id}-panel`}
          onClick={() => setOpen(!open)}
          className="group grid w-full grid-cols-[minmax(0,1fr)_auto_auto] items-baseline gap-x-4 py-3.5 text-left"
        >
          <span className="flex flex-wrap items-baseline gap-x-3 gap-y-0.5">
            <span className="font-medium text-ink">{title}</span>
            <span className="text-sm text-muted">{tagline}</span>
          </span>
          <span className="font-mono text-meta text-muted tabular-nums">{years}</span>
          <PlusIcon open={open} />
        </button>
      </h3>
      <div
        id={`${id}-panel`}
        role="region"
        aria-labelledby={`${id}-button`}
        data-open={open}
        className="disclosure-panel"
      >
        <div className="min-h-0 overflow-hidden">
          <div className="space-y-3 pr-10 pb-5">
            <p className="max-w-[60ch] text-muted">{summary}</p>
            <Link href={`/work/${slug}`} className="link inline-block text-sm">
              Read the case study <span aria-hidden>→</span>
            </Link>
            {children}
          </div>
        </div>
      </div>
    </li>
  );
}

/** "+" that turns into "×" by rotating 45°. */
function PlusIcon({ open }: { open: boolean }) {
  return (
    <svg
      data-requires-js
      aria-hidden
      viewBox="0 0 12 12"
      className={`size-3 self-center text-muted transition-[rotate,color] duration-300 ease-out group-hover:text-lilac ${open ? "rotate-45 text-lilac" : ""}`}
    >
      <path d="M6 1v10M1 6h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}
