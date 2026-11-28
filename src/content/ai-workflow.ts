/**
 * The "How I work with AI" loop on the home page: Simon's Grok product team takes a dark mode toggle for a
 * sample settings page from spec to merge. Each bot does its part in its own T3 Code thread, QA checks the
 * page in the T3 Code browser, and the pull request on GitHub ends with QA's before and after screenshots.
 * Bots follow Simon's Grok bot list.
 */

export const request = "Add a dark mode toggle to settings.";

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

/** The T3 Code thread each bot starts, listed in bot order. */
export const threads = {
  pm: { title: "Spec the dark mode toggle", branch: "spec/dark-mode" },
  designer: { title: "Design the toggle", branch: "design/dark-mode" },
  em: { title: "Plan the dark mode work", branch: "plan/dark-mode" },
  engineer: { title: "Build the dark mode toggle", branch: "dark-mode-toggle" },
  reviewer: { title: "Review pull request #42", branch: "review/42" },
  qa: { title: "Test dark mode in the browser", branch: "qa/dark-mode" },
} satisfies Record<BotId, { title: string; branch: string }>;

/** The pull request the engineer opens, shown on GitHub at the end. */
export const pullRequest = { title: "Add a dark mode toggle", number: 42, branch: "dark-mode-toggle" };

export type BotStatus = "idle" | "busy" | "waiting" | "done";
export type ThreadStatus = "working" | "done" | "pr" | "changes" | "approved" | "passed" | "merged";
/** What the right pane shows: the T3 Code threads, its browser at desktop or phone width, or the pull request. */
export type View = "threads" | "desktop" | "mobile" | "pr";

type BotState = { status: BotStatus; note: string };

export type Snapshot = {
  bots: Record<BotId, BotState>;
  threads: Partial<Record<BotId, ThreadStatus>>;
  view: View;
};

type Frame = {
  /** What happens in this step, shown above the panes. */
  caption: string;
  bots?: Partial<Record<BotId, BotState>>;
  threads?: Partial<Record<BotId, ThreadStatus>>;
  view?: View;
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
  threads: {},
  view: "threads",
};

const frames: readonly Frame[] = [
  { caption: "Simon asks his Grok team for a dark mode toggle." },
  {
    caption: "The product manager and designer each start a T3 Code thread for the spec.",
    threads: { pm: "working", designer: "working" },
    bots: { pm: { status: "busy", note: "Writing the spec" }, designer: { status: "busy", note: "Designing the toggle" } },
  },
  {
    caption: "The engineering manager plans the work in its own thread and hands it to the engineer.",
    threads: { pm: "done", designer: "done", em: "working" },
    bots: {
      pm: { status: "done", note: "Spec is ready" },
      designer: { status: "done", note: "Design is ready" },
      em: { status: "busy", note: "Planning the work" },
    },
  },
  {
    caption: "The engineer builds the toggle in a T3 Code thread and opens a pull request.",
    threads: { em: "done", engineer: "working" },
    bots: { em: { status: "done", note: "Handed to Engineer" }, engineer: { status: "busy", note: "Building the toggle" } },
  },
  {
    caption: "The code reviewer reviews the pull request in its thread and asks for changes.",
    threads: { engineer: "pr", reviewer: "changes" },
    bots: { engineer: { status: "waiting", note: "Waiting for review" }, reviewer: { status: "busy", note: "Reviewing pull request #42" } },
  },
  {
    caption: "The engineer fixes the review comments in the same thread.",
    threads: { engineer: "working" },
    bots: { reviewer: { status: "waiting", note: "Asked for changes" }, engineer: { status: "busy", note: "Fixing the comments" } },
  },
  {
    caption: "The code reviewer approves, and the merge gate passes.",
    threads: { engineer: "passed", reviewer: "approved" },
    bots: { engineer: { status: "waiting", note: "Pushed the fixes" }, reviewer: { status: "busy", note: "Reviewing again" } },
  },
  {
    caption: "The QA engineer opens the page in the T3 Code browser and tests the toggle.",
    view: "desktop",
    threads: { qa: "working" },
    bots: {
      reviewer: { status: "done", note: "Approved" },
      engineer: { status: "done", note: "Merge gate passed" },
      qa: { status: "busy", note: "Testing at 1280px" },
    },
  },
  {
    caption: "It checks the same page at phone width and takes screenshots.",
    view: "mobile",
    bots: { qa: { status: "busy", note: "Testing at 390px" } },
  },
  {
    caption: "QA posts before and after screenshots on the pull request, and it merges.",
    view: "pr",
    threads: { qa: "done", engineer: "merged" },
    bots: { qa: { status: "done", note: "Tests pass" }, engineer: { status: "done", note: "Pull request merged" } },
  },
];

/** How long each step shows. */
export const stepMs = 2800;
/** How long the last step holds before the loop starts over. */
export const hold = 5000;

/** Each frame as the full state it leaves on screen, with its caption. */
export const steps = frames.reduce<{ caption: string; snapshot: Snapshot }[]>((acc, frame) => {
  const previous = acc.at(-1)?.snapshot ?? start;
  const snapshot: Snapshot = {
    bots: { ...previous.bots, ...frame.bots },
    threads: { ...previous.threads, ...frame.threads },
    view: frame.view ?? previous.view,
  };
  return [...acc, { caption: frame.caption, snapshot }];
}, []);
