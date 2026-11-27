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
export type ThreadStatus = "hidden" | "working" | "changes" | "passed" | "merged";

type BotState = { status: BotStatus; note: string };

export type Snapshot = {
  bots: Record<BotId, BotState>;
  thread: ThreadStatus;
};

type Frame = {
  /** What happens in this step, shown above the panes. */
  caption: string;
  bots?: Partial<Record<BotId, BotState>>;
  thread?: ThreadStatus;
};

const start: Snapshot = {
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
  { caption: "Simon asks his Grok team for a change." },
  {
    caption: "The product manager and designer write the spec together.",
    bots: { pm: { status: "busy", note: "Writing the spec" }, designer: { status: "busy", note: "Sketching the layout" } },
  },
  {
    caption: "The engineering manager plans the work and delegates it to the engineer.",
    bots: {
      pm: { status: "done", note: "Spec sent to engineering" },
      designer: { status: "done", note: "Layout added to the spec" },
      em: { status: "busy", note: "Planning the work" },
    },
  },
  {
    caption: "The engineer builds it in a T3 Code thread.",
    thread: "working",
    bots: { em: { status: "done", note: "Delegated to Engineer" }, engineer: { status: "busy", note: "Building in T3 Code" } },
  },
  {
    caption: "The code reviewer reviews the pull request and asks for changes.",
    thread: "changes",
    bots: { engineer: { status: "waiting", note: "Waiting for review" }, reviewer: { status: "busy", note: "Reviewing the pull request" } },
  },
  {
    caption: "The engineer fixes the review comments and pushes again.",
    thread: "working",
    bots: { reviewer: { status: "waiting", note: "Asked for changes" }, engineer: { status: "busy", note: "Fixing the review comments" } },
  },
  {
    caption: "The code reviewer approves, and the merge gate passes.",
    thread: "passed",
    bots: { engineer: { status: "waiting", note: "Pushed the fixes" }, reviewer: { status: "busy", note: "Reviewing again" } },
  },
  {
    caption: "The QA engineer tests the change on mobile and desktop.",
    bots: {
      reviewer: { status: "done", note: "Merge gate passed" },
      engineer: { status: "done", note: "Review passed" },
      qa: { status: "busy", note: "Testing on mobile and desktop" },
    },
  },
  {
    caption: "The tests pass, and the change merges.",
    thread: "merged",
    bots: { qa: { status: "done", note: "Tests pass" } },
  },
];

/** How long each step shows. */
export const stepMs = 2800;
/** How long the last step holds before the loop starts over. */
export const hold = 4000;

/** Each frame as the full state it leaves on screen, with its caption. */
export const steps = frames.reduce<{ caption: string; snapshot: Snapshot }[]>((acc, frame) => {
  const previous = acc.at(-1)?.snapshot ?? start;
  const snapshot: Snapshot = { bots: { ...previous.bots, ...frame.bots }, thread: frame.thread ?? previous.thread };
  return [...acc, { caption: frame.caption, snapshot }];
}, []);
