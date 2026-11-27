/**
 * The "How I work with AI" loop on the home page: Simon's Grok product team takes a change from spec to
 * merge, with the engineer building it in T3 Code. Bots follow Simon's Grok bot list.
 */

export const request = "Add a section on how I work with AI.";

/**
 * Each bot's open-bot-avatar body: overlapping circles in a 100 by 100 box, after the avatars in Simon's
 * Grok app. Colors are matched in lightness to sit on plum. The engineering manager, who hands out the
 * work, takes lilac, the site's one accent.
 */
export const bots = [
  {
    id: "pm",
    name: "Product Manager",
    color: "#ea6a6a",
    body: "M20 40A20 20 0 1 1 60 40A20 20 0 1 1 20 40ZM42 38A20 20 0 1 1 82 38A20 20 0 1 1 42 38ZM48 60A20 20 0 1 1 88 60A20 20 0 1 1 48 60ZM25 66A19 19 0 1 1 63 66A19 19 0 1 1 25 66ZM16 54A16 16 0 1 1 48 54A16 16 0 1 1 16 54Z",
    eyes: { x: 50, y: 42, spacing: 15, scale: 1.1 },
  },
  {
    id: "designer",
    name: "Designer",
    color: "#51bd85",
    body: "M17 36A19 19 0 1 1 55 36A19 19 0 1 1 17 36ZM45 34A19 19 0 1 1 83 34A19 19 0 1 1 45 34ZM47 64A19 19 0 1 1 85 64A19 19 0 1 1 47 64ZM17 66A19 19 0 1 1 55 66A19 19 0 1 1 17 66ZM30 50A20 20 0 1 1 70 50A20 20 0 1 1 30 50Z",
    eyes: { x: 48, y: 48, spacing: 15, scale: 1.1 },
  },
  {
    id: "em",
    name: "Engineering Manager",
    color: "#d9b5fe",
    body: "M18 44A22 22 0 1 1 62 44A22 22 0 1 1 18 44ZM42 38A20 20 0 1 1 82 38A20 20 0 1 1 42 38ZM48 58A20 20 0 1 1 88 58A20 20 0 1 1 48 58ZM23 64A19 19 0 1 1 61 64A19 19 0 1 1 23 64ZM32 54A22 22 0 1 1 76 54A22 22 0 1 1 32 54Z",
    eyes: { x: 50, y: 42, spacing: 15, scale: 1.1 },
  },
  {
    id: "engineer",
    name: "Engineer",
    color: "#4fbcb3",
    body: "M19.5 72.1A30 23 -28 1 1 72.5 43.9A30 23 -28 1 1 19.5 72.1ZM44 38A18 18 0 1 1 80 38A18 18 0 1 1 44 38Z",
    eyes: { x: 52, y: 44, spacing: 15, scale: 1.1 },
  },
  {
    id: "reviewer",
    name: "Code Reviewer",
    color: "#6da9e7",
    body: "M12 52A38 38 0 1 1 88 52A38 38 0 1 1 12 52Z",
    eyes: { x: 56, y: 40, spacing: 15, scale: 1.1 },
  },
  {
    id: "qa",
    name: "QA Engineer",
    color: "#b47f51",
    body: "M14.5 58.3A36 26 -10 1 1 85.5 45.7A36 26 -10 1 1 14.5 58.3Z",
    eyes: { x: 46, y: 46, spacing: 15, scale: 1.1 },
  },
] as const;

export type Bot = (typeof bots)[number];
export type BotId = Bot["id"];

/** The engineer's thread in T3 Code. */
export const thread = { title: "Add the AI section", branch: "ai-section" };

/** An earlier thread from this site's history, already merged, below the new one. */
export const settledThread = { title: "Tighten the Treddy.se case study prose", branch: "treddy-se" };

export type BotStatus = "idle" | "busy" | "waiting" | "done";
export type ThreadStatus = "hidden" | "working" | "review" | "changes" | "passed" | "merged";
/** Where a handoff dot starts or lands: a bot, or the thread in T3 Code. */
export type Stop = BotId | "thread";

type BotState = { status: BotStatus; note: string };

export type Snapshot = {
  request: boolean;
  bots: Record<BotId, BotState>;
  thread: ThreadStatus;
};

type Frame = {
  /** Time since the previous frame. */
  ms: number;
  request?: boolean;
  bots?: Partial<Record<BotId, BotState>>;
  thread?: ThreadStatus;
  /** A handoff dot sent in this frame. */
  send?: readonly [Stop, Stop];
};

const start: Snapshot = {
  request: false,
  bots: {
    pm: { status: "idle", note: "Ready" },
    designer: { status: "idle", note: "Ready" },
    em: { status: "idle", note: "Ready" },
    engineer: { status: "idle", note: "Ready" },
    reviewer: { status: "idle", note: "Ready" },
    qa: { status: "idle", note: "Ready" },
  },
  thread: "hidden",
};

const frames: readonly Frame[] = [
  { ms: 0 },
  { ms: 700, request: true },
  {
    ms: 1100,
    bots: { pm: { status: "busy", note: "Writing the spec" }, designer: { status: "busy", note: "Sketching the layout" } },
  },
  {
    ms: 1600,
    send: ["designer", "pm"],
    bots: { designer: { status: "done", note: "Layout added to the spec" }, pm: { status: "busy", note: "Finishing the spec" } },
  },
  { ms: 1300, send: ["pm", "em"], bots: { pm: { status: "done", note: "Spec sent to engineering" } } },
  { ms: 700, bots: { em: { status: "busy", note: "Planning the work" } } },
  { ms: 1300, send: ["em", "engineer"], bots: { em: { status: "done", note: "Delegated to Engineer" } } },
  { ms: 700, send: ["engineer", "thread"], bots: { engineer: { status: "busy", note: "Building in T3 Code" } } },
  { ms: 700, thread: "working" },
  {
    ms: 1800,
    send: ["engineer", "reviewer"],
    thread: "review",
    bots: { engineer: { status: "waiting", note: "Waiting for review" } },
  },
  { ms: 700, bots: { reviewer: { status: "busy", note: "Reviewing the pull request" } } },
  {
    ms: 1500,
    send: ["reviewer", "engineer"],
    thread: "changes",
    bots: { reviewer: { status: "waiting", note: "Asked for changes" } },
  },
  { ms: 700, thread: "working", bots: { engineer: { status: "busy", note: "Fixing the review comments" } } },
  {
    ms: 1500,
    send: ["engineer", "reviewer"],
    thread: "review",
    bots: { engineer: { status: "waiting", note: "Pushed the fixes" } },
  },
  { ms: 700, bots: { reviewer: { status: "busy", note: "Reviewing again" } } },
  {
    ms: 1300,
    send: ["reviewer", "qa"],
    thread: "passed",
    bots: { reviewer: { status: "done", note: "Merge gate passed" }, engineer: { status: "done", note: "Review passed" } },
  },
  { ms: 700, bots: { qa: { status: "busy", note: "Testing on mobile and desktop" } } },
  { ms: 1800, thread: "merged", bots: { qa: { status: "done", note: "Tests pass, merged" } } },
];

/** How long the last frame holds before the loop starts over. */
export const hold = 3200;

/** Each frame as the full state it leaves on screen, plus its delay and any handoff it sends. */
export const steps = frames.reduce<{ ms: number; send?: readonly [Stop, Stop]; snapshot: Snapshot }[]>((acc, frame) => {
  const previous = acc.at(-1)?.snapshot ?? start;
  const snapshot: Snapshot = {
    request: frame.request ?? previous.request,
    bots: { ...previous.bots, ...frame.bots },
    thread: frame.thread ?? previous.thread,
  };
  return [...acc, { ms: frame.ms, send: frame.send, snapshot }];
}, []);
