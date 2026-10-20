"use client";

import { useId, useState } from "react";

// Below this share a side is too narrow for its label. Bars under 28rem need a bigger share.
const minLabelShare = 18;
const minNarrowLabelShare = 35;
const labelClass = (share: number) =>
  `px-2.5 whitespace-nowrap ${share < minNarrowLabelShare ? "@max-md:hidden" : ""}`;

/**
 * Byggdagboken migration: the share of /projects traffic on legacy versus Next.js, set with a
 * range input in steps of 5. Server-rendered at the 25% canary, so it reads without JavaScript.
 * The caption says what moves the traffic.
 */
export function CanarySplit() {
  const [next, setNext] = useState(25);
  const legacy = 100 - next;
  const inputId = useId();

  return (
    <div className="space-y-4">
      <div aria-hidden className="@container flex h-10 overflow-hidden rounded-sm font-mono text-[0.71875rem] font-medium">
        <div
          style={{ flexBasis: `${legacy}%` }}
          className="flex min-w-0 items-center overflow-hidden bg-plum-3 text-ink transition-[flex-basis] duration-450 ease-out"
        >
          {legacy >= minLabelShare && <span className={labelClass(legacy)}>legacy · {legacy}%</span>}
        </div>
        <div
          style={{ flexBasis: `${next}%` }}
          className="flex min-w-0 items-center justify-end overflow-hidden bg-lilac text-plum transition-[flex-basis] duration-450 ease-out"
        >
          {next >= minLabelShare && <span className={labelClass(next)}>Next.js · {next}%</span>}
        </div>
      </div>
      <label htmlFor={inputId} className="sr-only">
        Share of /projects traffic served by Next.js
      </label>
      <input
        id={inputId}
        data-requires-js
        type="range"
        min={0}
        max={100}
        step={5}
        value={next}
        onChange={(event) => setNext(event.currentTarget.valueAsNumber)}
        aria-valuetext={`Next.js ${next}%, legacy ${legacy}%`}
        className="block w-full accent-lilac"
      />
      <p className="text-sm text-muted">
        A CloudFront Function sends this share of <span className="font-mono text-meta">/projects</span> requests to the
        new Next.js client. The rest stays on the legacy monolith.
      </p>
    </div>
  );
}
