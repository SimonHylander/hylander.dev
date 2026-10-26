# hylander.dev

Simon Hylander's portfolio site. A single Next.js app (App Router, statically generated) deployed on Vercel. `PRODUCT.md` is the content brief, `DESIGN.md` the design notes.

## Run

Requires Node 24 (`.nvmrc`) and pnpm.

```sh
pnpm install
pnpm dev        # http://localhost:3000
pnpm build      # production build, without drafts
SHOW_DRAFTS=1 pnpm build  # production build with drafts, to check them before publishing
pnpm lint       # ESLint
pnpm typecheck  # route types + tsc
pnpm test       # node --test on src/**/*.test.ts
```

Copy `.env.example` to `.env.local` to set environment variables locally.

## Ask about my work

A section on the home page where a visitor asks a question and gets a 2 to 4 sentence answer, in the third person, from the site's own pages, with links to the pages it used.

- **Sources.** `src/lib/ask-sources.ts` builds one source per page: `/` from `profile.ts`, `/cv` from `career.ts`, and `/work/<slug>` from each case study's metadata plus its raw MDX body (metadata export and `{/* */}` comments stripped). The source id is the page's URL path. The corpus is a few thousand tokens, so all of it goes into the system prompt. There is no retrieval step.
- **Route.** `POST /api/ask` with `{ "question": "..." }` (3 to 300 characters after trimming). It checks BotID, then the rate limit, then streams plain text from Claude Sonnet 5.5 (`claude-sonnet-5-5`, effort `low`, at most 350 output tokens) through the AI SDK. The answer ends with `Sources: /work/x, /cv`, which the client turns into links. It drops any path that is not a real page.
- **Errors.** JSON `{ "error": "..." }` with 400 (invalid question), 403 (bot), 429 (rate limited) or 503 (`ANTHROPIC_API_KEY` is not set).
- **Prompt.** The system prompt limits answers to the sources and treats the question as a question only, so instructions inside it are ignored. It is the same on every request and is marked for prompt caching.

### Environment variables

| Name | Required | Effect |
| --- | --- | --- |
| `ANTHROPIC_API_KEY` | No | Turns the feature on. Without it, the home page section and the ⌘K "Ask about my work" command are not rendered, and the route returns 503. The home page is static, so set the key before the build. |

`src/lib/env.ts` validates the server environment with zod.

### Vercel setup

1. **Rate limit rule.** In the project's Firewall, add a custom rule: **If** `@vercel/firewall` **Rate limit ID** equals `ask`, **then** Rate Limit, fixed window, 60 seconds, 10 requests, keyed on IP, action Deny. `checkRateLimit("ask")` in the route reads this rule. Without the rule the check logs `Rate-limit ID 'ask' not configured` and lets every request through.
2. **BotID.** `withBotId` in `next.config.ts` and `initBotId` in `src/instrumentation-client.ts` protect `POST /api/ask`, and the route calls `checkBotId()`. This is BotID Basic, which is free on all plans. Deep Analysis is a paid option in the Firewall settings and needs no code change.

Both checks run only on Vercel (`process.env.VERCEL`). `pnpm dev` and `pnpm start` skip them.

### Cost

Each question sends about 2,000 input tokens (the system prompt) and receives at most 350 output tokens. At Sonnet 5.5 prices ($2 per million input tokens, $10 per million output, $0.20 per million for cached input) that is at most about $0.008 per question, or about $0.004 when the system prompt is cached (5 minute TTL). With the rate limit above, one IP can spend at most about $2.40 to $4.50 an hour (600 questions). Set a monthly spend limit in the Anthropic Console as the backstop.

## Content

All content lives in `src/content/`. Pages only render it.

- `profile.ts`: name, role, headline and positioning line, contact prompt, socials, site URL.
- `career.ts`: jobs, newest first. The job without `end` is the current one.
- `work/`: case studies, rendered at `/work/[slug]`.
- `writing/`: posts, rendered at `/writing/[slug]`.
- `collection.ts`: the metadata schemas for case studies and posts.
- `partners.ts`: the systems behind the Treddy partner API, drawn by its partner graph.
- `diagrams.ts`: the architecture diagrams that case studies build up with `<BuildDiagram>`.

Routes, the sitemap, the ⌘K palette (`src/lib/commands.ts`), the Ask sources and Open Graph images all read from these modules.

## Design

Tokens live in `src/app/globals.css` and are documented in `DESIGN.md`. `src/components/slots.tsx` plugs the interactive pieces into the pages:

- **Artifacts** (`artifacts/`): one small interactive piece per case study, registered by slug in `artifacts/index.tsx`. The home page shows them in the case study deck and its dialog. The Treddy artifact is the partner graph (`partner-graph.tsx`).
- **Activity heatmap** (`activity-heatmap.tsx`): GitHub contributions for the last 12 months, refreshed daily. Set `GITHUB_TOKEN` (no scopes needed) to use the GraphQL API; without it the public calendar page is parsed. If both fail the section is hidden and the build logs a warning. `SHOW_HEATMAP` in `profile.ts` turns it off.

## Add a case study

1. Create `src/content/work/<slug>.mdx`. Start with a metadata export, then the sections from `PRODUCT.md` (Problem, My role, Constraints, Decisions, Result):

   ```mdx
   export const metadata = {
     title: "Treddy partner platform",
     summary: "One sentence.",
     date: "2026-10-19",          // publish date, ISO
     pillar: "integrations",      // "integrations" | "architecture" | "ai-native"
     tagline: "A partner platform for a fraud-prevention startup", // what was built, one short line
     company: "Treddy",           // shown with the years under the tagline
     role: "Architect",
     period: { start: "2019", end: "2021" }, // optional, "YYYY" or "YYYY-MM"
     stack: ["TypeScript"],       // rendered as the Stack section
     metric: "6 partner integrations", // optional, highlighted on the case study
   };

   ## Problem
   ```

2. Register it in `src/content/work/index.ts`. The key becomes the slug, and the registration order is the order on the home page:

   ```ts
   import * as aiCodeReview from "./ai-code-review.mdx";

   export const work = defineCollection(caseStudySchema, { treddy, "ai-code-review": aiCodeReview });
   ```

Invalid metadata fails the build. Posts work the same way in `src/content/writing/` with `postSchema` (title, summary, date, pillar, optional `draft`), registered newest first.

Leave a section out until it has content, and keep a `{/* TODO(simon): ## Section. ... */}` comment where it belongs. An empty heading renders as an empty section.

## Drafts

Set `draft: true` in a post's or case study's metadata. Drafts render in `pnpm dev`, and are left out of production builds: no route, no list entry, no sitemap entry. `SHOW_DRAFTS=1` includes them in a production build.

## Code blocks

Fenced code is highlighted at build time by Shiki through `src/lib/rehype-code.mjs`. Token colors come from the design tokens in `src/app/code.css`.

- `title="file.ts"` after the language adds a filename caption.
- `ts twoslash` runs the TypeScript compiler on the block. Hovering or tabbing to an identifier shows its type, and `// ^?` under a token prints its type as a line. A type error in the snippet fails the build. Snippets can import any installed package, such as `effect`.

  ````mdx
  ```ts twoslash title="retrieve.ts"
  import { Effect } from "effect";
  const answer = Effect.succeed(42);
  //    ^?
  ```
  ````

Turbopack caches compiled MDX, so after changing `rehype-code.mjs`, delete `.next` before building.

## Add a diagram

`<BuildDiagram>` draws an SVG diagram beside a list of steps. On wide screens with motion allowed, each step's parts appear as its text scrolls past the middle of the viewport. On small screens, with reduced motion and without JavaScript, the full diagram sits above the steps.

1. Define it in `src/content/diagrams.ts` with `defineDiagram`. Coordinates are SVG units on a 320-wide canvas. Every node and edge has a `step`, and edges must name existing node ids.
2. Use it in MDX. `BuildDiagram` and `DiagramStep` need no import. Each `DiagramStep` is one step, in order, and holds one short paragraph:

   ```mdx
   import { byggdagbokenDiagram } from "../diagrams";

   <BuildDiagram diagram={byggdagbokenDiagram}>
   <DiagramStep>

   **The monolith.** Web traffic went through CloudFront to the legacy monolith.

   </DiagramStep>
   </BuildDiagram>
   ```
