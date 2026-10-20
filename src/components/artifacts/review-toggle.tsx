"use client";

import { useState } from "react";

/**
 * AI code review: senior review time before, and with AI pre-review. The switch shrinks the second
 * bar to 20%, the 80% cut on record. Bars scale with a transform, so nothing reflows.
 */
export function ReviewToggle() {
  const [on, setOn] = useState(false);
  const rows = [
    { label: "Before", share: 100 },
    { label: "With AI pre-review", share: on ? 20 : 100 },
  ];

  return (
    <div className="space-y-5">
      <div className="space-y-4">
        {rows.map(({ label, share }) => (
          <div key={label} className="space-y-1.5">
            <div className="flex justify-between text-sm text-muted">
              <span>{label}</span>
              <span aria-live="polite" className="font-mono text-meta text-ink tabular-nums">
                {share}%
              </span>
            </div>
            <div aria-hidden className="h-2.5 overflow-hidden rounded-full bg-plum-3">
              <div
                style={{ transform: `scaleX(${share / 100})` }}
                className="h-full origin-left bg-lilac transition-transform duration-700 ease-out"
              />
            </div>
          </div>
        ))}
      </div>
      <button
        type="button"
        data-requires-js
        aria-pressed={on}
        onClick={() => setOn(!on)}
        className="group inline-flex items-center gap-2.5 text-sm text-ink"
      >
        <span
          aria-hidden
          className={`relative h-[22px] w-9 rounded-full transition-colors duration-250 ease-out ${on ? "bg-lilac" : "bg-plum-3"}`}
        >
          <span
            className={`absolute top-[3px] left-[3px] size-4 rounded-full transition-[translate,background-color] duration-250 ease-out ${on ? "translate-x-3.5 bg-plum" : "bg-ink"}`}
          />
        </span>
        AI pre-review
      </button>
    </div>
  );
}
