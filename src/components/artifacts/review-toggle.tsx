"use client";

import { useState } from "react";

/**
 * AI code review: senior review time as a bar at 100%. The "AI pre-review" switch shrinks it to
 * 20%, the 80% cut on record. The bar scales with a transform, so nothing reflows.
 */
export function ReviewToggle() {
  const [on, setOn] = useState(false);
  const share = on ? 20 : 100;

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-3">
        <div aria-hidden className="h-2.5 flex-1 overflow-hidden rounded-full bg-plum-3">
          <div
            style={{ transform: `scaleX(${share / 100})` }}
            className="h-full origin-left bg-lilac transition-transform duration-700 ease-out"
          />
        </div>
        <span aria-live="polite" className="w-[4ch] text-right font-mono text-meta text-muted tabular-nums">
          {share}%
        </span>
      </div>
      <button
        type="button"
        data-requires-js
        aria-pressed={on}
        onClick={() => setOn(!on)}
        className="group inline-flex items-center gap-2 text-sm text-ink"
      >
        <span
          aria-hidden
          className={`relative h-[18px] w-[30px] rounded-full transition-colors duration-250 ease-out ${on ? "bg-lilac" : "bg-plum-3"}`}
        >
          <span
            className={`absolute top-[3px] left-[3px] size-3 rounded-full transition-[translate,background-color] duration-250 ease-out ${on ? "translate-x-3 bg-plum" : "bg-ink"}`}
          />
        </span>
        AI pre-review
      </button>
    </div>
  );
}
