/**
 * The "How I work with AI" loop on the home page: Simon's Grok product team plans a change, and the T3
 * bot hands the code to T3 Code as threads. Bots and their order follow Simon's Grok bot list.
 */

export const request = "Add a section on how I work with AI.";

export const bots = [
  { id: "pm", name: "Product Manager", shape: "cloud" },
  { id: "designer", name: "Designer", shape: "clover" },
  { id: "engineer", name: "Engineer", shape: "pebble" },
  { id: "qa", name: "QA Engineer", shape: "potato" },
  { id: "t3", name: "T3", shape: "blob" },
] as const;

export type BotId = (typeof bots)[number]["id"];
export type BotShape = (typeof bots)[number]["shape"];

/** Threads the T3 bot starts, top first. */
export const threads = [
  { title: "Build the AI section", branch: "ai-section" },
  { title: "Animate the Grok bots", branch: "grok-bots" },
] as const;

/** An earlier thread from this site's history, already merged, below the new ones. */
export const settledThread = { title: "Tighten the Treddy.se case study prose", branch: "treddy-se" };

export type BotStatus = "idle" | "busy" | "done";
export type ThreadStatus = "hidden" | "working" | "review";

type Bot = { status: BotStatus; note: string };

export type Snapshot = {
  request: boolean;
  bots: Record<BotId, Bot>;
  threads: Record<number, ThreadStatus>;
};

type Frame = {
  /** Time since the previous frame. */
  ms: number;
  request?: boolean;
  bots?: Partial<Record<BotId, Bot>>;
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
