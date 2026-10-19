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
```

## Content

All content lives in `src/content/`. Pages only render it.

- `profile.ts`: name, positioning line, contact, socials, site URL.
- `career.ts`: jobs, newest first. The job without `end` is the current one.
- `work/`: case studies, rendered at `/work/[slug]`.
- `writing/`: posts, rendered at `/writing/[slug]`.
- `collection.ts`: the metadata schemas for case studies and posts.
- `systems.ts`: the nodes of the integration graph and the case studies each one relates to. Slugs are typed, so a typo fails typecheck.
- `diagrams.ts`: the architecture diagrams that case studies build up with `<BuildDiagram>`.

Routes, the sitemap, the ⌘K palette (`src/lib/commands.ts`) and Open Graph images all read from these modules.

## Design

Tokens live in `src/app/globals.css` and are documented in `DESIGN.md`. `src/components/slots.tsx` plugs the interactive pieces into the pages:

- **Integration graph** (`integration-graph.tsx`): nodes from `systems.ts`. Hover state is shared with the work rows through `src/lib/graph-focus.ts`.
- **Artifacts** (`artifacts/`): one small interactive piece per case study, registered by slug in `artifacts/index.tsx`.
- **Activity heatmap** (`activity-heatmap.tsx`): GitHub contributions for the last 12 months, refreshed daily. Set `GITHUB_TOKEN` (no scopes needed) to use the GraphQL API; without it the public calendar page is parsed. If both fail the section is hidden and the build logs a warning. `SHOW_HEATMAP` in `profile.ts` turns it off.

## Add a case study

1. Create `src/content/work/<slug>.mdx`. Start with a metadata export, then the sections from `PRODUCT.md` (Problem, My role, Constraints, Decisions, Result):

   ```mdx
   export const metadata = {
     title: "Treddy partner platform",
     summary: "One sentence.",
     date: "2026-10-19",          // publish date, ISO
     pillar: "integrations",      // "integrations" | "architecture" | "ai-native"
     tagline: "6 partner integrations", // muted label beside the title on the home page
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
