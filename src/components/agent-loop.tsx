"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  bots,
  hold,
  request,
  settledThread,
  steps,
  threads,
  type BotId,
  type BotShape,
  type BotStatus,
  type ThreadStatus,
} from "@/content/ai-workflow";
import { tools } from "@/content/tools";

const reducedMotion = "(prefers-reduced-motion: reduce)";
const lastStep = steps.length - 1;
const t3Mark = tools.find(({ name }) => name === "T3 Code");

// Each bot is a union of circles and ellipses in a 40 by 40 box, after the avatars in Simon's Grok app.
const bodies: Record<BotShape, ReactNode> = {
  cloud: (
    <>
      <circle cx="15" cy="15" r="10" />
      <circle cx="26" cy="14" r="10" />
      <circle cx="29" cy="25" r="10" />
      <circle cx="17" cy="28" r="9.5" />
      <circle cx="11" cy="22" r="8" />
    </>
  ),
  clover: (
    <>
      <circle cx="13" cy="13" r="9.5" />
      <circle cx="27" cy="12" r="9.5" />
      <circle cx="28" cy="27" r="9.5" />
      <circle cx="13" cy="28" r="9.5" />
      <circle cx="20" cy="20" r="10" />
    </>
  ),
  pebble: (
    <>
      <ellipse cx="18" cy="24" rx="15" ry="11.5" transform="rotate(-28 18 24)" />
      <circle cx="26" cy="14" r="9" />
    </>
  ),
  potato: <ellipse cx="20" cy="21" rx="18" ry="13" transform="rotate(-10 20 21)" />,
  blob: (
    <>
      <circle cx="15" cy="17" r="11" />
      <circle cx="26" cy="14" r="10" />
      <circle cx="29" cy="24" r="10" />
      <circle cx="16" cy="27" r="9.5" />
      <circle cx="22" cy="22" r="11" />
    </>
  ),
};

const eyes: Record<BotShape, { x: number; y: number }> = {
  cloud: { x: 18, y: 12 },
  clover: { x: 16, y: 16 },
  pebble: { x: 19, y: 13 },
  potato: { x: 16, y: 14 },
  blob: { x: 18, y: 12 },
};

function BotAvatar({ id, shape, status, className = "size-10" }: { id: BotId; shape: BotShape; status: BotStatus; className?: string }) {
  const { x, y } = eyes[shape];
  return (
    <svg
      aria-hidden
      viewBox="0 0 40 40"
      style={{ color: `var(--bot-${id})`, "--i": bots.findIndex((bot) => bot.id === id) }}
      className={`${className} shrink-0 overflow-visible transition-opacity duration-500 ease-out ${status === "idle" ? "bot-asleep opacity-60" : ""} ${status === "busy" ? "bot-busy" : ""}`}
    >
      <g className="fill-current">{bodies[shape]}</g>
      <g className="bot-eyes fill-plum">
        {[x, x + 6].map((left) => (
          <rect key={left} x={left} y={y} width="3.4" height="8.5" rx="1.7" transform={`rotate(-16 ${left + 1.7} ${y + 4.25})`} />
        ))}
      </g>
    </svg>
  );
}

function Status({ status }: { status: ThreadStatus }) {
  if (status === "review") {
    return (
      <span className="flex items-center gap-1.5 text-meta text-ink">
        <svg aria-hidden viewBox="0 0 24 24" className="size-3.5 fill-none stroke-current stroke-2 [stroke-linecap:round]">
          <circle cx="18" cy="18" r="3" />
          <circle cx="6" cy="6" r="3" />
          <path d="M13 6h3a2 2 0 0 1 2 2v7M6 9v12" />
        </svg>
        Pull request
      </span>
    );
  }
  return (
    <span className="flex items-center gap-1.5 text-meta text-lilac">
      <svg aria-hidden viewBox="0 0 16 16" className="size-3.5 animate-[spin_3s_linear_infinite] fill-none stroke-current stroke-[1.5]">
        <circle cx="8" cy="8" r="6.25" strokeDasharray="2.4 2.5" />
      </svg>
      Working
    </span>
  );
}

/**
 * Sends a lilac dot from the T3 bot to a thread row, timed to land as the row appears. The arc bends 28px
 * to the left of travel: up when the panes sit side by side, sideways when they stack.
 */
function pulse(layer: HTMLElement, from: Element, to: Element) {
  const origin = layer.getBoundingClientRect();
  const a = from.getBoundingClientRect();
  const b = to.getBoundingClientRect();
  const start = { x: a.left + a.width / 2 - origin.left, y: a.top + a.height / 2 - origin.top };
  const end = { x: b.left + b.width / 2 - origin.left, y: b.top + b.height / 2 - origin.top };
  const length = Math.hypot(end.x - start.x, end.y - start.y) || 1;
  const bend = { x: ((end.y - start.y) / length) * 28, y: ((start.x - end.x) / length) * 28 };
  const at = (x: number, y: number, scale = 1) => `translate(${x}px, ${y}px) scale(${scale})`;
  const dot = document.createElement("span");
  dot.className = "absolute -top-1.5 -left-1.5 size-3 rounded-full bg-lilac";
  layer.append(dot);
  const animation = dot.animate(
    [
      { transform: at(start.x, start.y, 0.4), opacity: 0 },
      { opacity: 1, offset: 0.12 },
      { transform: at((start.x + end.x) / 2 + bend.x, (start.y + end.y) / 2 + bend.y), offset: 0.5 },
      { transform: at(end.x, end.y, 0.6), opacity: 0 },
    ],
    { duration: 800, easing: "cubic-bezier(.45, 0, .2, 1)" },
  );
  animation.onfinish = animation.oncancel = () => dot.remove();
}

/**
 * Simon's Grok product team planning a change, then the T3 bot starting threads in T3 Code. Loops
 * while on screen, the tab is in front, motion is allowed and the visitor has not paused it. Renders
 * the finished state on the server, without JavaScript and under reduced motion.
 */
export function AgentLoop() {
  const [step, setStep] = useState(lastStep);
  const [paused, setPaused] = useState(false);
  const stepRef = useRef(step);
  const layerRef = useRef<HTMLDivElement>(null);
  const t3Ref = useRef<HTMLLIElement>(null);
  const threadRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const snapshot = steps[step]?.snapshot ?? steps[lastStep]!.snapshot;

  useEffect(() => {
    const layer = layerRef.current;
    if (!layer) return;
    const motion = matchMedia(reducedMotion);
    let onScreen = false;
    let timer: number | undefined;
    let started = false;

    const go = (index: number) => {
      stepRef.current = index;
      setStep(index);
    };

    // Plays only while visible, in front, with motion allowed and not paused. Reduced motion shows the end.
    const sync = () => {
      const run = onScreen && !document.hidden && !motion.matches && !paused;
      if (run && timer === undefined) {
        const next = (stepRef.current + 1) % steps.length;
        timer = window.setTimeout(() => {
          timer = undefined;
          go(next);
          const send = steps[next]?.send;
          const target = send === undefined ? null : threadRefs.current[send];
          if (target && t3Ref.current) pulse(layer, t3Ref.current, target);
          sync();
        }, next === 0 ? (started ? hold : 1200) : steps[next]!.ms);
        started = true;
      } else if (!run && timer !== undefined) {
        window.clearTimeout(timer);
        timer = undefined;
      }
      if (motion.matches && stepRef.current !== lastStep) go(lastStep);
    };

    const observer = new IntersectionObserver(([entry]) => {
      onScreen = entry?.isIntersecting ?? false;
      sync();
    });
    observer.observe(layer);
    document.addEventListener("visibilitychange", sync);
    motion.addEventListener("change", sync);

    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", sync);
      motion.removeEventListener("change", sync);
      window.clearTimeout(timer);
    };
  }, [paused]);

  return (
    <figure className="self-start">
      <div className="relative rounded-lg bg-plum-2 p-5 sm:p-6">
        <div ref={layerRef} aria-hidden className="pointer-events-none absolute inset-0 z-10" />
        <div className="grid gap-6 sm:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] sm:gap-0">
          <div className="sm:pr-6">
            <p className="flex h-7 items-center text-sm text-muted">Grok</p>
            <div aria-hidden>
              <div
                className={`mt-3 border-b border-line pb-3 transition-[opacity,translate] duration-500 ease-out ${snapshot.request ? "" : "-translate-y-1 opacity-0"}`}
              >
                <p className="text-meta text-muted">Simon</p>
                <p className="mt-0.5 text-sm text-ink">{request}</p>
              </div>
              <ul className="mt-2">
                {bots.map(({ id, name, shape }) => {
                  const { status, note } = snapshot.bots[id];
                  return (
                    <li key={id} ref={id === "t3" ? t3Ref : undefined} className="flex items-center gap-3 py-2">
                      <BotAvatar id={id} shape={shape} status={status} />
                      <div className="min-w-0">
                        <p className={`truncate text-sm font-medium transition-colors duration-500 ease-out ${status === "idle" ? "text-muted" : "text-ink"}`}>
                          {name}
                        </p>
                        <p key={note} className="truncate text-sm text-muted motion-safe:animate-[fade-in_400ms_var(--ease)]">
                          {note}
                        </p>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>

          <div className="border-t border-line pt-6 sm:border-t-0 sm:border-l sm:pt-0 sm:pl-6">
            <p className="flex h-7 items-center gap-1.5 text-sm text-muted">
              {t3Mark && (
                <svg aria-hidden viewBox={t3Mark.viewBox} className="h-3 w-auto fill-current">
                  <path d={t3Mark.path} />
                </svg>
              )}
              <span className="sr-only">T3</span>
              Code
            </p>
            <ul aria-hidden className="mt-3 border-t border-line">
              {threads.map(({ title, branch }, index) => {
                const status = snapshot.threads[index] ?? "hidden";
                return (
                  <li
                    key={branch}
                    className={`flex gap-3 border-b border-line py-3 transition-[opacity,translate] duration-500 ease-out ${status === "hidden" ? "-translate-y-1.5 opacity-0" : ""}`}
                  >
                    <span
                      ref={(node) => {
                        threadRefs.current[index] = node;
                      }}
                      className="flex h-lh items-center text-sm"
                    >
                      <BotAvatar id="t3" shape="blob" status="done" className="size-4" />
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium text-ink">{title}</p>
                      <div className="mt-1 flex items-center justify-between gap-3">
                        <span className="truncate font-mono text-[0.75rem] text-muted">{branch}</span>
                        {status !== "hidden" && <Status status={status} />}
                      </div>
                    </div>
                  </li>
                );
              })}
              <li className="border-b border-line py-3 pl-7">
                <p className="truncate text-sm font-medium text-muted">{settledThread.title}</p>
                <div className="mt-1 flex items-center justify-between gap-3">
                  <span className="truncate font-mono text-[0.75rem] text-muted">{settledThread.branch}</span>
                  <span className="text-meta text-muted">Merged</span>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="mt-2 flex justify-end">
        <button
          type="button"
          data-requires-js
          aria-pressed={paused}
          onClick={() => setPaused(!paused)}
          className="rounded-md px-2.5 py-1.5 text-sm text-muted transition-colors duration-200 ease-out hover:bg-plum-2 hover:text-ink active:bg-plum-3 motion-reduce:hidden"
        >
          {paused ? "Play the loop" : "Pause the loop"}
        </button>
      </div>
      <figcaption className="sr-only">
        {request} Simon sends the request to his product team of Grok bots. The product manager writes a spec, the
        designer sketches the layout and the engineer splits it into two tasks. The T3 bot starts a thread for each
        task in T3 Code, where coding agents work on a branch and open a pull request. The QA engineer tests both.
      </figcaption>
    </figure>
  );
}
