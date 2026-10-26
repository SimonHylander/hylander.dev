"use client";

import Link from "next/link";
import {
  useEffect,
  useEffectEvent,
  useRef,
  useState,
  type KeyboardEvent,
  type MouseEvent,
  type ReactNode,
} from "react";
import { flushSync } from "react-dom";
import type { CaseStudySlug } from "@/content/work";

type Item = {
  slug: CaseStudySlug;
  title: string;
  card: ReactNode;
  /** Side panel text while the card is in front of the helix. */
  summary: ReactNode;
  detail: ReactNode;
};

/** Shared by the clicked card and the dialog, so the browser morphs one into the other. */
const morph = "work-card";

/** From `md` the cards sit on a helix. Below it they are a swipeable row. */
const helixQuery = "(min-width: 48rem)";
const reducedMotion = "(prefers-reduced-motion: reduce)";

/** Wheel and drag distance, in pixels, that turns the helix by one card. */
const wheelPerCard = 400;
const dragPerCard = 260;

/** Runs `update` in a view transition when the browser supports them and motion is allowed. */
function transition(update: () => void) {
  if (!document.startViewTransition || matchMedia(reducedMotion).matches) {
    update();
    return null;
  }
  return document.startViewTransition(update);
}

const button =
  "grid size-9 place-items-center rounded-md border border-line text-muted transition-colors duration-200 ease-out hover:border-muted hover:bg-plum-2 hover:text-ink";

/**
 * The case study cards and the dialog that shows one of them large. Cards are plain links, so
 * without JavaScript they open the case study page.
 *
 * From `md` the cards sit on a helix (`.helix-card` in globals.css). One number, `--progress`,
 * says which card is in front. The wheel, a drag, the arrow buttons and focus set a target, and
 * each frame eases `--progress` toward it. Clicking a card brings it to the front. A side panel
 * summarises the front card, and only its Open button opens the dialog. Below `md` the cards are
 * a scroll-snapped row with no panel, so a click opens the dialog directly.
 *
 * The dialog morphs out of the card. Arrow keys and the list at the bottom move between case
 * studies, and closing morphs back into the card for the case study that was open last.
 */
export function WorkDeckViewer({ heading, items }: { heading: ReactNode; items: Item[] }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const trackRef = useRef<HTMLUListElement>(null);
  const cardRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const [open, setOpen] = useState<number | null>(null);
  const current = open === null ? undefined : items[open];
  const [front, setFront] = useState(0);
  const helix = useRef({ progress: 0, target: 0, frame: 0, snap: 0 });
  const drag = useRef<{ x: number; from: number; moved: boolean } | null>(null);
  const dragged = useRef(false);
  const last = items.length - 1;

  const render = (progress: number) => {
    trackRef.current?.style.setProperty("--progress", String(progress));
    setFront(Math.round(progress));
  };

  // Eases progress toward the target, then stops. Instant under reduced motion.
  const tick = () => {
    const state = helix.current;
    const gap = state.target - state.progress;
    state.progress =
      matchMedia(reducedMotion).matches || Math.abs(gap) < 0.001 ? state.target : state.progress + gap * 0.14;
    render(state.progress);
    state.frame = state.progress === state.target ? 0 : requestAnimationFrame(tick);
  };

  const turnTo = (target: number) => {
    const state = helix.current;
    state.target = Math.min(Math.max(target, 0), last);
    if (!state.frame) state.frame = requestAnimationFrame(tick);
  };

  const onWheel = useEffectEvent((event: WheelEvent) => {
    if (!matchMedia(helixQuery).matches) return;
    const state = helix.current;
    const delta = Math.abs(event.deltaX) > Math.abs(event.deltaY) ? event.deltaX : event.deltaY;
    // At the first and last card the wheel scrolls the page again.
    if ((delta < 0 && state.target <= 0) || (delta > 0 && state.target >= last)) return;
    event.preventDefault();
    turnTo(state.target + delta / wheelPerCard);
    clearTimeout(state.snap);
    state.snap = window.setTimeout(() => turnTo(Math.round(state.target)), 140);
  });

  // React's onWheel is passive, so it cannot stop the page from scrolling.
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const listener = (event: WheelEvent) => onWheel(event);
    track.addEventListener("wheel", listener, { passive: false });
    return () => track.removeEventListener("wheel", listener);
  }, []);

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
    // The open case study may differ from the clicked card. Bring its card forward to morph into.
    if (open !== null && matchMedia(helixQuery).matches) {
      const state = helix.current;
      cancelAnimationFrame(state.frame);
      Object.assign(state, { progress: open, target: open, frame: 0 });
      render(open);
    } else {
      card?.scrollIntoView({ block: "nearest", inline: "center" });
    }
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
    if (dragged.current) dragged.current = false;
    else if (matchMedia(helixQuery).matches) turnTo(index);
    else show(index);
  };

  const onDialogKeyDown = (event: KeyboardEvent<HTMLDialogElement>) => {
    // Inputs inside an artifact (the canary range) use the arrow keys themselves.
    if (open === null || event.target instanceof HTMLInputElement) return;
    if (event.key === "ArrowLeft") go(open - 1);
    if (event.key === "ArrowRight") go(open + 1);
  };

  const step = (direction: 1 | -1) => {
    if (matchMedia(helixQuery).matches) return turnTo(Math.round(helix.current.target) + direction);
    const card = cardRefs.current[0];
    if (card)
      trackRef.current?.scrollBy({
        left: direction * card.offsetWidth,
        behavior: "smooth",
      });
  };

  const endDrag = () => {
    if (drag.current?.moved) turnTo(Math.round(helix.current.target));
    dragged.current = drag.current?.moved ?? false;
    drag.current = null;
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

      <div className="relative">
        <ul
          ref={trackRef}
          onPointerDown={(event) => {
            if (event.button !== 0 || !matchMedia(helixQuery).matches) return;
            drag.current = {
              x: event.clientX,
              from: helix.current.target,
              moved: false,
            };
          }}
          onPointerMove={(event) => {
            const state = drag.current;
            if (!state) return;
            const dx = event.clientX - state.x;
            if (!state.moved && Math.abs(dx) > 6) {
              state.moved = true;
              // Capture only once it is a drag, so a plain click still lands on the card.
              event.currentTarget.setPointerCapture(event.pointerId);
            }
            if (state.moved) turnTo(state.from - dx / dragPerCard);
          }}
          onPointerUp={endDrag}
          onPointerCancel={endDrag}
          className="mx-[calc(50%-50vw)] mt-8 [scrollbar-width:none] max-md:flex max-md:snap-x max-md:snap-mandatory max-md:gap-5 max-md:overflow-x-auto max-md:px-[calc(50%-min(10.5rem,39vw))] max-md:py-6 md:relative md:mt-6 md:[perspective:1800px] md:h-[40rem] md:cursor-grab md:overflow-hidden md:select-none md:active:cursor-grabbing"
        >
          {items.map((item, index) => (
            <li key={item.slug} style={{ "--i": index }} className="deck-card helix-card flex shrink-0 snap-center">
              <Link
                ref={(element) => {
                  cardRefs.current[index] = element;
                }}
                href={`/work/${item.slug}`}
                draggable={false}
                onClick={(event) => onCardClick(event, index)}
                onFocus={(event) => {
                  // Keyboard focus brings the card forward. A click decides that itself in onCardClick.
                  if (matchMedia(helixQuery).matches && event.currentTarget.matches(":focus-visible")) turnTo(index);
                }}
                className="group flex w-[min(21rem,78vw)] flex-col rounded-lg border border-line bg-plum-2 p-3 transition-colors duration-200 ease-out hover:border-muted"
              >
                {item.card}
              </Link>
            </li>
          ))}
        </ul>

        <aside
          aria-label="Case study in front"
          className="absolute top-1/2 right-0 z-20 w-[19rem] -translate-y-1/2 rounded-lg border border-line bg-plum-2 p-5 max-md:hidden"
        >
          <div key={items[front]?.slug} className="[animation:fade-in_240ms_var(--ease)]">
            {items[front]?.summary}
          </div>
          <div className="mt-6 flex items-center justify-between gap-4">
            <span className="text-sm text-muted">Live demo inside.</span>
            <button
              type="button"
              data-requires-js
              onClick={() => show(front)}
              className="rounded-md bg-lilac px-3.5 py-2 text-sm font-medium text-plum transition-[filter] duration-200 ease-out hover:brightness-110"
            >
              Open ↗
            </button>
          </div>
        </aside>
      </div>

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
