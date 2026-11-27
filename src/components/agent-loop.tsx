"use client";

import { renderAvatarSvg, type AvatarDefinition } from "open-bot-avatar";
import { mountAvatar, type AvatarOptions, type MountedAvatar } from "open-bot-avatar/dom";
import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  bots,
  hold,
  pullRequest,
  request,
  stepMs,
  steps,
  threads,
  type Bot,
  type BotId,
  type BotStatus,
  type ThreadStatus,
  type View,
} from "@/content/ai-workflow";
import { tools } from "@/content/tools";

const reducedMotion = "(prefers-reduced-motion: reduce)";
const lastStep = steps.length - 1;
const t3Mark = tools.find(({ name }) => name === "T3 Code");
/** Plum, the eye color in Simon's Grok avatars. */
const eyeColor = "#0f0c1d";

const looks = {
  idle: { state: "idle", mood: "neutral" },
  busy: { state: "working", mood: "neutral" },
  waiting: { state: "waiting", mood: "neutral" },
  done: { state: "idle", mood: "happy" },
} as const satisfies Record<BotStatus, Pick<AvatarOptions, "state" | "mood">>;

const definition = ({ id, name, body, eyes }: Bot): AvatarDefinition => ({ version: 1, id, name, body: { path: body }, eyes });

/** A flat still of the bot, about 1 KB, for the server, no-JS and the small badges. */
const still = (bot: Bot, status: BotStatus, size: number) =>
  renderAvatarSvg(definition(bot), { ...looks[status], color: bot.color, eyeColor, size, depth: 0, reducedMotion: true });

/**
 * One live open-bot-avatar. The server renders the finished state as a flat still, which the live avatar
 * replaces on mount. The still never changes, so React never writes over the live avatar.
 */
function BotAvatar({ bot, status }: { bot: Bot; status: BotStatus }) {
  const host = useRef<HTMLDivElement>(null);
  const avatar = useRef<MountedAvatar | null>(null);
  const [fallback] = useState(() => still(bot, steps[lastStep]!.snapshot.bots[bot.id].status, 40));

  useEffect(() => {
    if (!host.current) return;
    const mounted = mountAvatar(host.current, { definition: definition(bot), color: bot.color, eyeColor, label: "" });
    avatar.current = mounted;
    return () => {
      mounted.destroy();
      avatar.current = null;
    };
  }, [bot]);

  useEffect(() => avatar.current?.update(looks[status]), [status]);

  return (
    <div
      ref={host}
      aria-hidden
      className={`size-10 shrink-0 transition-opacity duration-500 ease-out ${status === "idle" ? "opacity-60" : ""}`}
      dangerouslySetInnerHTML={{ __html: fallback }}
    />
  );
}

const badges = new Map(bots.map((bot) => [bot.id, still(bot, "done", 16)]));

function Badge({ id }: { id: BotId }) {
  return <span className="flex h-lh shrink-0 items-center [&>svg]:size-4" dangerouslySetInnerHTML={{ __html: badges.get(id) ?? "" }} />;
}

const pullRequestIcon = (
  <>
    <circle cx="18" cy="18" r="3" />
    <circle cx="6" cy="6" r="3" />
    <path d="M13 6h3a2 2 0 0 1 2 2v7M6 9v12" />
  </>
);
const checkIcon = <path d="M5 12.5l4.5 4.5L19 7.5" />;
const mergeIcon = (
  <>
    <circle cx="18" cy="18" r="3" />
    <circle cx="6" cy="6" r="3" />
    <path d="M6 21V9a9 9 0 0 0 9 9" />
  </>
);

const labels = {
  done: { label: "Done", tone: "text-muted", icon: checkIcon },
  pr: { label: "Pull request", tone: "text-ink", icon: pullRequestIcon },
  changes: { label: "Changes requested", tone: "text-ink", icon: pullRequestIcon },
  approved: { label: "Approved", tone: "text-ink", icon: checkIcon },
  passed: { label: "Merge gate passed", tone: "text-ink", icon: checkIcon },
  merged: { label: "Merged", tone: "text-ink", icon: mergeIcon },
} satisfies Record<Exclude<ThreadStatus, "working">, { label: string; tone: string; icon: ReactNode }>;

function Icon({ children }: { children: ReactNode }) {
  return (
    <svg aria-hidden viewBox="0 0 24 24" className="size-3.5 shrink-0 fill-none stroke-current stroke-2 [stroke-linecap:round] [stroke-linejoin:round]">
      {children}
    </svg>
  );
}

function Status({ status }: { status: ThreadStatus }) {
  if (status === "working") {
    return (
      <span className="flex shrink-0 items-center gap-1.5 text-meta text-lilac">
        <svg aria-hidden viewBox="0 0 16 16" className="size-3.5 animate-[spin_3s_linear_infinite] fill-none stroke-current stroke-[1.5]">
          <circle cx="8" cy="8" r="6.25" strokeDasharray="2.4 2.5" />
        </svg>
        Working
      </span>
    );
  }
  const { label, tone, icon } = labels[status];
  return (
    <span key={status} className={`flex shrink-0 items-center gap-1.5 text-meta whitespace-nowrap ${tone} motion-safe:animate-[fade-in_400ms_var(--ease)]`}>
      <Icon>{icon}</Icon>
      {label}
    </span>
  );
}

function Toggle({ on }: { on: boolean }) {
  return (
    <span className={`flex h-[1.4em] w-[2.4em] shrink-0 rounded-full p-[0.2em] ${on ? "justify-end bg-lilac" : "bg-current/25"}`}>
      <span className="aspect-square h-full rounded-full bg-ink" />
    </span>
  );
}

/**
 * The sample settings page the team changes, sized in em so the browser preview and the screenshot
 * thumbnails share it. Before the change it is light with no dark mode row. After, dark mode is on.
 */
function SettingsPage({ after, checking = false, className }: { after: boolean; checking?: boolean; className: string }) {
  const rows: { label: string; value: ReactNode; checked?: boolean }[] = [
    { label: "Notifications", value: <Toggle on /> },
    ...(after ? [{ label: "Dark mode", value: <Toggle on />, checked: checking }] : []),
    { label: "Language", value: <span className="opacity-60">English</span> },
  ];
  return (
    <div className={`rounded-[0.5em] p-[1.2em] transition-colors duration-500 ease-out ${after ? "bg-plum text-ink" : "bg-ink text-plum"} ${className}`}>
      <p className="text-[1.3em] font-semibold">Settings</p>
      <ul className="mt-[0.8em]">
        {rows.map(({ label, value, checked }) => (
          <li
            key={label}
            className={`flex items-center justify-between gap-[0.8em] border-t border-current/15 py-[0.8em] ${checked ? "rounded-[0.3em] outline-1 outline-offset-[0.2em] outline-lilac outline-dashed" : ""}`}
          >
            <span className="truncate">{label}</span>
            {value}
          </li>
        ))}
      </ul>
    </div>
  );
}

function ThreadList({ statuses }: { statuses: Partial<Record<BotId, ThreadStatus>> }) {
  return (
    <ul className="border-t border-line">
      {bots.map(({ id }) => {
        const status = statuses[id];
        return (
          <li
            key={id}
            className={`flex gap-3 border-b border-line py-2.5 transition-[opacity,translate] duration-500 ease-out ${status ? "" : "-translate-y-1.5 opacity-0"}`}
          >
            <Badge id={id} />
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-ink">{threads[id].title}</p>
              <div className="mt-0.5 flex items-center justify-between gap-3">
                <span className="truncate font-mono text-[0.75rem] text-muted">{threads[id].branch}</span>
                {status && <Status status={status} />}
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}

/** The T3 Code browser with QA testing the new toggle, at desktop width and then phone width. */
function BrowserPreview({ mobile }: { mobile: boolean }) {
  return (
    <div className="overflow-hidden rounded-md border border-line motion-safe:animate-[fade-in_400ms_var(--ease)]">
      <div className="flex items-center gap-2 border-b border-line bg-plum-3 px-3 py-2">
        <span className="truncate text-meta text-muted">localhost:3000/settings</span>
        <span className="ml-auto shrink-0 text-meta text-muted tabular-nums">{mobile ? "390" : "1280"}px</span>
      </div>
      <div className="flex justify-center bg-plum-3/40 p-4">
        <div key={String(mobile)} className={`motion-safe:animate-[fade-in_400ms_var(--ease)] ${mobile ? "w-3/5" : "w-full"}`}>
          <SettingsPage after checking className={mobile ? "text-[9px]" : "text-[12px]"} />
        </div>
      </div>
      <div className="flex items-center gap-2 border-t border-line px-3 py-2 text-meta text-muted">
        <Badge id="qa" />
        <span className="truncate">QA Engineer is testing the toggle</span>
      </div>
    </div>
  );
}

/** The merged pull request on GitHub, with QA's before and after screenshots. */
function PullRequestView() {
  return (
    <div className="motion-safe:animate-[fade-in_400ms_var(--ease)]">
      <p className="text-sm font-medium text-ink">
        {pullRequest.title} <span className="text-muted">#{pullRequest.number}</span>
      </p>
      <div className="mt-2 flex items-center gap-2 text-meta text-muted">
        <span className="flex items-center gap-1 rounded-full bg-lilac px-2 py-0.5 font-medium text-plum">
          <Icon>{mergeIcon}</Icon>
          Merged
        </span>
        <span className="truncate font-mono text-[0.75rem]">{pullRequest.branch}</span>
      </div>
      <div className="mt-4 overflow-hidden rounded-md border border-line">
        <div className="flex items-center gap-2 border-b border-line bg-plum-3 px-3 py-2 text-meta">
          <Badge id="qa" />
          <span className="font-medium text-ink">QA Engineer</span>
          <span className="text-muted">commented</span>
        </div>
        <div className="p-3">
          <p className="text-sm text-ink">Tested at 1280px and 390px. The toggle works and the theme stays on reload.</p>
          <div className="mt-3 grid grid-cols-2 gap-3">
            {[false, true].map((after) => (
              <div key={String(after)}>
                <p className="mb-1.5 text-meta text-muted">{after ? "After" : "Before"}</p>
                <SettingsPage after={after} className="text-[7px]" />
              </div>
            ))}
          </div>
        </div>
      </div>
      <p className="mt-3 flex items-center gap-1.5 text-meta text-muted">
        <Icon>{checkIcon}</Icon>
        Code Reviewer approved and the merge gate passed
      </p>
    </div>
  );
}

const paneTitle = { threads: "Code", desktop: "Code browser", mobile: "Code browser", pr: "GitHub" } satisfies Record<View, string>;

function Pane({ view, statuses }: { view: View; statuses: Partial<Record<BotId, ThreadStatus>> }) {
  if (view === "pr") return <PullRequestView />;
  if (view === "threads") return <ThreadList statuses={statuses} />;
  return <BrowserPreview mobile={view === "mobile"} />;
}

/**
 * Simon's Grok product team taking a change from spec to merge, each bot working in its own T3 Code thread,
 * one captioned step at a time with the bot at work highlighted. Loops while on screen, the tab is in front,
 * motion is allowed and the visitor has not paused it. Renders the finished state on the server, without
 * JavaScript and under reduced motion.
 */
export function AgentLoop() {
  const [step, setStep] = useState(lastStep);
  const [paused, setPaused] = useState(false);
  const stepRef = useRef(step);
  const panelRef = useRef<HTMLDivElement>(null);
  const { caption, snapshot } = steps[step] ?? steps[lastStep]!;

  useEffect(() => {
    const panel = panelRef.current;
    if (!panel) return;
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
          sync();
        }, next === 0 ? (started ? hold : 1200) : stepMs);
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
    observer.observe(panel);
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
      <div ref={panelRef} className="rounded-lg bg-plum-2 p-5 sm:p-6">
        <div aria-hidden className="mb-5 border-b border-line pb-4">
          <p className="text-meta text-muted tabular-nums">
            Step {step + 1} of {steps.length}
          </p>
          <p key={step} className="mt-1 min-h-[2lh] text-sm text-ink motion-safe:animate-[fade-in_400ms_var(--ease)] sm:min-h-lh">
            {caption}
          </p>
        </div>
        <div className="grid gap-6 sm:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] sm:gap-0">
          <div className="sm:pr-6">
            <p className="flex h-7 items-center text-sm text-muted">Grok</p>
            <div aria-hidden>
              <div className="mt-3 border-b border-line pb-3">
                <p className="text-meta text-muted">Simon</p>
                <p className="mt-0.5 text-sm text-ink">{request}</p>
              </div>
              <ul className="mt-2">
                {bots.map((bot) => {
                  const { status, note } = snapshot.bots[bot.id];
                  return (
                    <li
                      key={bot.id}
                      className={`-mx-2 flex items-center gap-3 rounded-md px-2 py-2 transition-colors duration-500 ease-out ${status === "busy" ? "bg-plum-3" : ""}`}
                    >
                      <BotAvatar bot={bot} status={status} />
                      <div className="min-w-0">
                        <p className={`truncate text-sm font-medium transition-colors duration-500 ease-out ${status === "idle" ? "text-muted" : "text-ink"}`}>
                          {bot.name}
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
              {t3Mark && snapshot.view !== "pr" && (
                <>
                  <svg aria-hidden viewBox={t3Mark.viewBox} className="h-3 w-auto fill-current">
                    <path d={t3Mark.path} />
                  </svg>
                  <span className="sr-only">T3</span>
                </>
              )}
              {paneTitle[snapshot.view]}
            </p>
            <div aria-hidden className="mt-3 min-h-96 sm:min-h-0">
              <Pane view={snapshot.view} statuses={snapshot.threads} />
            </div>
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
        {request} Simon sends the request to his product team of Grok bots, and each bot does its part in its own T3
        Code thread. The product manager and the designer write the spec, the engineering manager plans the work, and
        the engineer builds the toggle and opens a pull request. The code reviewer asks for changes, the engineer fixes
        them, and the merge gate passes. The QA engineer tests the settings page in the T3 Code browser at desktop and
        phone width, then posts before and after screenshots on the pull request on GitHub, and it merges. Each step
        has a caption, and the bot at work is highlighted.
      </figcaption>
    </figure>
  );
}
