"use client";

import Link from "next/link";
import { useRef, useState, type KeyboardEvent, type MouseEvent, type ReactNode } from "react";
import { flushSync } from "react-dom";
import type { CaseStudySlug } from "@/content/work";

type Item = { slug: CaseStudySlug; title: string; card: ReactNode; detail: ReactNode };

/** Shared by the clicked card and the dialog, so the browser morphs one into the other. */
const morph = "work-card";

/** Runs `update` in a view transition when the browser supports them and motion is allowed. */
function transition(update: () => void) {
  if (!document.startViewTransition || matchMedia("(prefers-reduced-motion: reduce)").matches) {
    update();
    return null;
  }
  return document.startViewTransition(update);
}

const button =
  "grid size-9 place-items-center rounded-md border border-line text-muted transition-colors duration-200 ease-out hover:border-muted hover:bg-plum-2 hover:text-ink";

/**
 * The track of case study cards and the dialog that shows one of them large. Cards are plain
 * links, so without JavaScript they open the case study page. A plain click opens the dialog,
 * morphing the card into it. Arrow keys and the list at the bottom move between case studies,
 * and closing morphs back into the card for the case study that was open last.
 */
export function WorkDeckViewer({ heading, items }: { heading: ReactNode; items: Item[] }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const trackRef = useRef<HTMLUListElement>(null);
  const cardRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const [open, setOpen] = useState<number | null>(null);
  const current = open === null ? undefined : items[open];

  const show = (index: number) => {
    const card = cardRefs.current[index];
    if (card) card.style.viewTransitionName = morph;
    transition(() => {
      if (card) card.style.viewTransitionName = "";
      flushSync(() => setOpen(index));
      dialogRef.current?.showModal();
    });
  };

  const close = () => {
    const card = open === null ? undefined : cardRefs.current[open];
    // The open case study may differ from the clicked card. Bring its card into view to morph into.
    card?.scrollIntoView({ block: "nearest", inline: "center" });
    const clear = () => card && (card.style.viewTransitionName = "");
    const running = transition(() => {
      dialogRef.current?.close();
      if (card) card.style.viewTransitionName = morph;
    });
    if (running) running.finished.finally(clear);
    else clear();
  };

  const go = (index: number) => transition(() => flushSync(() => setOpen((index + items.length) % items.length)));

  const onCardClick = (event: MouseEvent<HTMLAnchorElement>, index: number) => {
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    show(index);
  };

  const onDialogKeyDown = (event: KeyboardEvent<HTMLDialogElement>) => {
    // Inputs inside an artifact (the canary range) use the arrow keys themselves.
    if (open === null || event.target instanceof HTMLInputElement) return;
    if (event.key === "ArrowLeft") go(open - 1);
    if (event.key === "ArrowRight") go(open + 1);
  };

  const step = (direction: 1 | -1) => {
    const card = cardRefs.current[0];
    if (card) trackRef.current?.scrollBy({ left: direction * card.offsetWidth, behavior: "smooth" });
  };

  return (
    <>
      <div className="flex items-end justify-between gap-6">
        {heading}
        <div data-requires-js className="flex shrink-0 gap-2 max-sm:hidden">
          <button type="button" aria-label="Scroll back" onClick={() => step(-1)} className={button}>
            ←
          </button>
          <button type="button" aria-label="Scroll forward" onClick={() => step(1)} className={button}>
            →
          </button>
        </div>
      </div>

      <ul
        ref={trackRef}
        className="mx-[calc(50%-50vw)] mt-8 flex snap-x snap-mandatory gap-5 overflow-x-auto px-[calc(50%-min(10.5rem,39vw))] py-6 [scrollbar-width:none] md:mt-10"
      >
        {items.map((item, index) => (
          <li key={item.slug} className="deck-card flex shrink-0 snap-center">
            <Link
              ref={(element) => {
                cardRefs.current[index] = element;
              }}
              href={`/work/${item.slug}`}
              onClick={(event) => onCardClick(event, index)}
              className="group flex w-[min(21rem,78vw)] flex-col rounded-lg border border-line bg-plum-2 p-3 transition-colors duration-200 ease-out hover:border-muted"
            >
              {item.card}
            </Link>
          </li>
        ))}
      </ul>

      <dialog
        ref={dialogRef}
        aria-labelledby={current && `deck-${current.slug}`}
        onCancel={(event) => {
          event.preventDefault();
          close();
        }}
        onClose={() => {
          if (open !== null) cardRefs.current[open]?.focus({ preventScroll: true });
          setOpen(null);
        }}
        onClick={(event) => {
          if (event.target === event.currentTarget) close();
        }}
        onKeyDown={onDialogKeyDown}
        className="fixed inset-0 m-auto max-h-[calc(100dvh-2rem)] w-[min(64rem,calc(100vw-2rem))] overflow-y-auto overscroll-contain rounded-lg border border-line bg-plum p-0 text-ink backdrop:bg-plum/75 [view-transition-name:work-card]"
      >
        {current && open !== null && (
          <div className="p-5 sm:p-8">
            <div className="mb-6 flex justify-end gap-2">
              <button type="button" aria-label="Previous case study" onClick={() => go(open - 1)} className={button}>
                ←
              </button>
              <button type="button" aria-label="Next case study" onClick={() => go(open + 1)} className={button}>
                →
              </button>
              <button type="button" aria-label="Close" onClick={close} className={button}>
                ✕
              </button>
            </div>

            {current.detail}

            <nav aria-label="Case studies" className="mt-8 border-t border-line pt-5">
              <ul className="grid grid-cols-2 gap-2 lg:grid-cols-4">
                {items.map((item, index) => (
                  <li key={item.slug} className="flex">
                    <button
                      type="button"
                      aria-current={index === open}
                      onClick={() => go(index)}
                      className="w-full rounded-md border border-line px-3 py-2.5 text-left text-sm transition-colors duration-200 ease-out hover:bg-plum-2 aria-[current=true]:border-muted aria-[current=true]:bg-plum-2"
                    >
                      <span className="block font-mono text-meta text-muted tabular-nums">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      {item.title}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        )}
      </dialog>
    </>
  );
}
