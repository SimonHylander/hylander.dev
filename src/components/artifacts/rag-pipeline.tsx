"use client";

import { useEffect, useEffectEvent, useRef, useState } from "react";

const steps = ["scrape", "embed", "retrieve", "answer"] as const;

/**
 * Uppgraderingspaket: the RAG pipeline as four chips that light up in order, 280ms apart, each time
 * the artifact comes into view (a home row opening counts). Replay runs it again. Under reduced
 * motion every chip lights at once.
 */
export function RagPipeline() {
  const [lit, setLit] = useState(0);
  const rootRef = useRef<HTMLDivElement>(null);
  const timers = useRef<number[]>([]);

  const run = () => {
    // One array for the component's lifetime, so the effect cleanup sees the latest timers.
    timers.current.forEach((timer) => window.clearTimeout(timer));
    timers.current.length = 0;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setLit(steps.length);
      return;
    }
    setLit(0);
    timers.current.push(...steps.map((_, index) => window.setTimeout(() => setLit(index + 1), 280 * (index + 1))));
  };

  const onVisible = useEffectEvent(run);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) onVisible();
      },
      { threshold: 0.6 },
    );
    observer.observe(root);
    const pending = timers.current;
    return () => {
      observer.disconnect();
      pending.forEach((timer) => window.clearTimeout(timer));
    };
  }, []);

  return (
    <div ref={rootRef} className="flex flex-wrap items-center justify-between gap-3">
      <ol aria-label="Pipeline steps" className="flex flex-wrap items-center gap-1.5 font-mono text-meta">
        {steps.map((step, index) => (
          <li key={step} className="flex items-center gap-1.5">
            {index > 0 && (
              <span aria-hidden className="text-line">
                →
              </span>
            )}
            <span
              className={`rounded-sm px-2 py-1 font-medium transition-colors duration-300 ease-out ${index < lit ? "bg-lilac text-plum" : "bg-plum-3 text-muted"}`}
            >
              {step}
            </span>
          </li>
        ))}
      </ol>
      <button
        type="button"
        data-requires-js
        onClick={run}
        className="rounded-sm border border-line px-2 font-mono text-meta leading-6 text-muted transition-colors duration-200 ease-out hover:border-lilac hover:text-lilac"
      >
        Replay
      </button>
    </div>
  );
}
