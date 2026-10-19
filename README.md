# hylander.dev

Simon Hylander's portfolio site. A single Next.js app (App Router, statically generated) deployed on Vercel. `PRODUCT.md` is the content brief, `DESIGN.md` the design notes.

## Run

Requires Node 24 (`.nvmrc`) and pnpm.

```sh
pnpm install
pnpm dev        # http://localhost:3000
pnpm build      # production build
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

Invalid metadata fails the build. Posts work the same way in `src/content/writing/` with `postSchema` (title, summary, date, pillar), registered newest first.
