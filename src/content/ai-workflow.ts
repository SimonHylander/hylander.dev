/**
 * The "How I work with AI" loop on the home page: Simon's Grok product team plans a change, and the T3
 * bot hands the code to T3 Code as threads. Bots and their order follow Simon's Grok bot list.
 */

export const request = "Add a section on how I work with AI.";

/**
 * Each bot's open-bot-avatar body: overlapping circles in a 100 by 100 box, after the avatars in Simon's
 * Grok app. Colors are matched in lightness to sit on plum. T3 takes lilac, the site's one accent.
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
    id: "engineer",
    name: "Engineer",
    color: "#4fbcb3",
    body: "M19.5 72.1A30 23 -28 1 1 72.5 43.9A30 23 -28 1 1 19.5 72.1ZM44 38A18 18 0 1 1 80 38A18 18 0 1 1 44 38Z",
    eyes: { x: 52, y: 44, spacing: 15, scale: 1.1 },
  },
  {
    id: "qa",
    name: "QA Engineer",
    color: "#b47f51",
    body: "M14.5 58.3A36 26 -10 1 1 85.5 45.7A36 26 -10 1 1 14.5 58.3Z",
    eyes: { x: 46, y: 46, spacing: 15, scale: 1.1 },
  },
  {
    id: "t3",
    name: "T3",
    color: "#d9b5fe",
    body: "M18 44A22 22 0 1 1 62 44A22 22 0 1 1 18 44ZM42 38A20 20 0 1 1 82 38A20 20 0 1 1 42 38ZM48 58A20 20 0 1 1 88 58A20 20 0 1 1 48 58ZM23 64A19 19 0 1 1 61 64A19 19 0 1 1 23 64ZM32 54A22 22 0 1 1 76 54A22 22 0 1 1 32 54Z",
    eyes: { x: 50, y: 42, spacing: 15, scale: 1.1 },
  },
] as const;

export type Bot = (typeof bots)[number];
export type BotId = Bot["id"];

/** Threads the T3 bot starts, top first. */
export const threads = [
  { title: "Build the AI section", branch: "ai-section" },
  { title: "Animate the Grok bots", branch: "grok-bots" },
] as const;

/** An earlier thread from this site's history, already merged, below the new ones. */
export const settledThread = { title: "Tighten the Treddy.se case study prose", branch: "treddy-se" };

export type BotStatus = "idle" | "busy" | "done";
export type ThreadStatus = "hidden" | "working" | "review";

type BotState = { status: BotStatus; note: string };

export type Snapshot = {
  request: boolean;
  bots: Record<BotId, BotState>;
  threads: Record<number, ThreadStatus>;
};

type Frame = {
  /** Time since the previous frame. */
  ms: number;
  request?: boolean;
  bots?: Partial<Record<BotId, BotState>>;
  threads?: Record<number, ThreadStatus>;
  /** Index of the thread the T3 bot sends work to in this frame. */
  send?: number;
};

const start: Snapshot = {
  request: false,
  bots: {
    pm: { status: "idle", note: "Ready" },
    designer: { status: "idle", note: "Ready" },
    engineer: { status: "idle", note: "Ready" },
    qa: { status: "idle", note: "Ready" },
    t3: { status: "idle", note: "Connected to T3 Code" },
  },
  threads: { 0: "hidden", 1: "hidden" },
};

const frames: readonly Frame[] = [
  { ms: 0 },
  { ms: 700, request: true },
  { ms: 1100, bots: { pm: { status: "busy", note: "Writing the spec" } } },
  {
    ms: 1500,
    bots: { pm: { status: "done", note: "Spec is ready" }, designer: { status: "busy", note: "Sketching the layout" } },
  },
  {
    ms: 1500,
    bots: {
      designer: { status: "done", note: "Layout is ready" },
      engineer: { status: "busy", note: "Splitting it into two tasks" },
    },
  },
  {
    ms: 1500,
    bots: {
      engineer: { status: "done", note: "Asked T3 for two threads" },
      t3: { status: "busy", note: "Starting two threads" },
    },
  },
  { ms: 600, send: 0 },
  { ms: 700, send: 1, threads: { 0: "working" } },
  { ms: 700, threads: { 1: "working" }, bots: { t3: { status: "done", note: "Two threads working" } } },
  {
    ms: 2200,
    threads: { 0: "review" },
    bots: { qa: { status: "busy", note: "Testing the first pull request" } },
  },
  {
    ms: 1400,
    threads: { 1: "review" },
    bots: { qa: { status: "busy", note: "Testing the second pull request" } },
  },
  {
    ms: 1400,
    bots: { qa: { status: "done", note: "Both pass on mobile" }, t3: { status: "done", note: "Two pull requests open" } },
  },
];

/** How long the last frame holds before the loop starts over. */
export const hold = 3200;

/** Each frame as the full state it leaves on screen, plus its delay and any thread it sends work to. */
export const steps = frames.reduce<{ ms: number; send?: number; snapshot: Snapshot }[]>((acc, frame) => {
  const previous = acc.at(-1)?.snapshot ?? start;
  const snapshot: Snapshot = {
    request: frame.request ?? previous.request,
    bots: { ...previous.bots, ...frame.bots },
    threads: { ...previous.threads, ...frame.threads },
  };
  return [...acc, { ms: frame.ms, send: frame.send, snapshot }];
}, []);
