# Migrating hylander.dev to TanStack Start

This is the playbook for moving the site from Next.js 16 (App Router) to TanStack Start on Vercel. Every step was run once as a dry run on branch `spike/tanstack-start`. The decision trail is in [`decisions.tsv`](./decisions.tsv).

## Definition of done

The migration is done when all of these hold against a Vercel preview of the TanStack Start branch:

1. `node scripts/parity.ts diff parity/next-local.json <preview snapshot>` reports no differences except the accepted ones listed under [Accepted differences](#accepted-differences).
2. `docs/tanstack-start/smoke.ts` passes all checks.
3. `docs/tanstack-start/pixels.ts` reports every page and every Open Graph image identical, except screenshot pixels on case studies.
4. The Vercel-only checks in [Phase 4](#phase-4-vercel-cutover) pass on the preview.

## Versions

Pinned in the spike on 2026-11-28:

| Package | Version |
| --- | --- |
| `@tanstack/react-start` | 1.169.7 |
| `@tanstack/react-router` | 1.170.46 |
| `nitro` | 3.0.261103-rc (only an RC is published) |
| `vite` | 8.4.0 |
| `@vitejs/plugin-react` | 6.3.0 |
| `@mdx-js/rollup` | 3.1.1 |
| `@tailwindcss/vite` | 4.3.5 |
| `vite-imagetools` | 12.0.2 |
| `satori` / `@resvg/resvg-js` | 0.29.0 / 2.6.2. `next/og` bundles satori 0.29.0. Version 0.63.2 drops the card footer. |
| `@fontsource-variable/familjen-grotesk` / `@fontsource/geist-mono` | 5.3.0 / 5.3.0 |

## Phase 0: Harness (this PR)

Lands on Next.js before any migration code.

- `scripts/parity.ts` snapshots every URL in the sitemap plus the redirects, the 404, robots, the favicon and each Open Graph image. It records status, redirect target, title, meta tags, canonical and icon links, JSON-LD, headings, visible text and links. `diff` exits 1 on any difference.
- `docs/tanstack-start/smoke.ts` checks hydration errors, client navigation, the ⌘K palette, fonts and the home loader in Chrome.
- `docs/tanstack-start/pixels.ts` compares full-page screenshots at 1280 and 390 px, and the Open Graph PNGs pixel by pixel.
- The browser scripts need `playwright-core@1.65.1`, `pngjs@7.0.0` and `pixelmatch@7.1.0`. Install those in a scratch directory and run copies of the scripts from there, as the header of `smoke.ts` shows. Node does not resolve ESM imports through `NODE_PATH`. `tsconfig.json` excludes `docs/` so `next build` does not type-check them.
- All three scripts read `VERCEL_BYPASS` to reach a protected preview.
- `parity/next-local.json` is the baseline: `pnpm build && pnpm start`, then `node scripts/parity.ts snapshot http://localhost:3000 parity/next-local.json`.

Take the baseline from a local build of the base commit, not from production. Production can run a different commit.

Gate: a second snapshot of the same build diffs to zero. The heatmap total is masked because it is live data.

## Phase 1: Swap the toolchain

One PR. It removes Next.js and adds Vite, TanStack Start and Nitro. The site does not build between this phase and the end of Phase 2, so Phases 1 and 2 ship as one PR, reviewed as two commits.

1. Dependencies:

   ```sh
   pnpm remove next @next/mdx @mdx-js/loader eslint-config-next @tailwindcss/postcss
   pnpm add @tanstack/react-start @tanstack/react-router @tanstack/router-plugin nitro satori@0.29.0 @resvg/resvg-js \
     @fontsource-variable/familjen-grotesk @fontsource/geist-mono
   pnpm add -D vite @vitejs/plugin-react @mdx-js/rollup @tailwindcss/vite vite-imagetools \
     typescript-eslint eslint-plugin-react-hooks @tanstack/eslint-plugin-router
   ```

   List `@tanstack/router-plugin` explicitly. Vercel's framework detection requires it in `package.json`.
2. Delete `next.config.ts`, `postcss.config.mjs`, `next-env.d.ts` and `src/instrumentation-client.ts`.
3. Scripts: `dev: vite dev`, `build: vite build`, `start: node .output/server/index.mjs`, `typecheck: tsc --noEmit`.
4. `tsconfig.json`: drop the `next` plugin and the `.next/types` includes. Add `vite/client` to `types`.
5. `.gitignore`: add `.output/`, `.nitro/`, `.tanstack/`.
6. `eslint.config.mjs`: `typescript-eslint` recommended, `react-hooks` flat recommended and `@tanstack/eslint-plugin-router` flat recommended.
7. `vite.config.ts`, in this plugin order: the MDX wrapper, `imagetools`, `tailwindcss`, `tanstackStart`, `nitro`, `viteReact`. Copy it from the spike. It carries five fixes that came out of the dry run:
   - **MDX wrapper.** `@mdx-js/rollup` drops the query string before it matches files, so it also compiles `?raw` imports. The wrapper skips ids ending in `?raw`.
   - **ISR rules, not prerendering.** `"/**": { isr: true }`, `"/": { isr: 86400 }`, `"/api/ask": { isr: false }` and `"/_serverFn/**": { isr: false }`. TanStack's prerender crawler writes `/` as a static file through the `/#work` link, which freezes the heatmap. Nitro ISR is the same Vercel mechanism Next uses for `revalidate`.
   - **Redirects use `status: 308`.** `statusCode` type-checks but is ignored, and Nitro emits 307s.
   - **One `maxDuration: 30` for every function** (`vercel.functions`). Nitro places `functionRules` routes after the ISR catch-all, so a per-route rule for `/api/ask` never applies.
   - **BotID proxy rules.** Copy the two `149e9513-…` route rules from `node_modules/botid/dist/nuxt/module.mjs`. They replace `withBotId` from `botid/next/config`.

   Leave `preset` unset. Nitro builds `node-server` locally and `vercel` on Vercel.
8. `vercel.json`: `{ "framework": "tanstack-start" }`.

## Phase 2: Port the app

Each item names the file in the spike to copy or the edit to make.

### Entry points

- `src/router.tsx`: `getRouter()` with `defaultNotFoundComponent: NotFound` and the `Register` declaration.
- `src/client.tsx`: `initBotId(...)` from the old `instrumentation-client.ts`, then `hydrateRoot(document, <StartClient />)`.
- Commit `src/routeTree.gen.ts`. `tsc` needs it, and only `vite dev` or `vite build` generates it.

### Routes

| Next.js | TanStack Start |
| --- | --- |
| `app/layout.tsx` | `routes/__root.tsx`: `shellComponent` holds `<html>`, `HeadContent`, `Scripts`, `Toaster`, `Analytics` from `@vercel/analytics/react`. `component` holds the header, `<main>` and footer. |
| `app/page.tsx` | `routes/index.tsx`. The loader calls a `createServerFn` that returns the heatmap days. |
| `app/cv/page.tsx` | `routes/cv.tsx` |
| `app/work/[slug]/page.tsx` | `routes/work/$slug.tsx`. The loader throws `notFound()` for unknown slugs and returns the entry index. |
| `app/writing/[slug]/page.tsx` | `routes/writing/$slug.tsx` |
| `app/not-found.tsx` | `components/not-found.tsx`. It renders `<meta name="robots" content="noindex">`, which React hoists into `<head>`. Route `head()` does not run for unmatched paths. |
| `app/api/ask/route.ts` | `routes/api/ask.ts` with `server.handlers.POST`. Pass `{ advancedOptions: { headers: Object.fromEntries(request.headers) } }` to `checkBotId`. |
| `app/sitemap.ts`, `app/robots.ts` | `routes/sitemap[.]xml.ts`, `routes/robots[.]txt.ts`. These are server routes that build the XML and text by hand. |
| `opengraph-image.tsx` (both) | `routes/opengraph-image.ts`, `routes/work/$slug/opengraph-image.ts` with the same URLs. They are server routes that return the PNG. |

### Metadata

`lib/metadata.ts` becomes `pageHead()`. Write the home URL as `https://hylander.dev` with no trailing slash, as Next did, so the canonical does not change. It returns `{ meta, links }` with every tag Next generated: title with the `| Simon Hylander` suffix, description, canonical, `og:*`, `article:published_time` and `twitter:*`, plus the `og:image` and `twitter:image` width, height, type and alt. The root route sets the site defaults through `pageHead()`. TanStack dedupes meta by name and property, so a child's tags replace the root's.

Escape `<` in the JSON-LD with `<`, as the old layout did.

### Server-only code

- Add `import "@tanstack/react-start/server-only"` to `lib/env.ts`, `lib/contributions.ts`, `lib/ask-sources.ts` and `lib/og-image.tsx`. A client import of these files then fails the build.
- Read the environment only inside `createServerFn` handlers and server routes.
- The root loader calls `getAskSources`, a server function that returns the source ids, or `null` without `ANTHROPIC_API_KEY`. Set `staleTime: Infinity` so client navigations do not refetch it. `getCommands(askEnabled)` and `AskSection({ sources })` take the result as an argument instead of reading `env`.
- `ActivityHeatmap` takes `days` as a prop. Remove `next: { revalidate }` from the fetches. The ISR rule on `/` caches the server render for a day. A client navigation to `/` calls the `getHeatmap` server function directly, and `/_serverFn/**` bypasses ISR. So the handler calls `setResponseHeader("Cache-Control", "public, max-age=0, s-maxage=86400, stale-while-revalidate=86400")` to let the CDN cache that call for a day too. Without it, every client visit to `/` fetches from GitHub.
- `ask-sources.ts` reads the case study MDX with `import.meta.glob("../content/work/*.mdx", { query: "?raw", import: "default", eager: true })`. This replaces `readFileSync` and `outputFileTracingIncludes`.

### Drafts

Next rendered MDX on the server, so a draft never reached the browser. Every module the client imports now ships in its JS, and `getCommands` imports the writing index. A runtime `draft` filter therefore leaves the draft's full text in the client bundle. The spike's first build did exactly that.

- Register drafts in `src/content/writing/index.ts` (and the work index, if it ever has one) inside `import.meta.env.DEV || import.meta.env.VITE_SHOW_DRAFTS === "1" ? { slug: await import("./slug.mdx") } : {}`. Vite replaces that condition at build time and drops the false branch.
- Keep the condition inline. Rolldown does not fold a `showDrafts` constant imported from another module, and it still emits the draft as a public chunk.
- `collection.ts` uses the same `import.meta.env` check. `SHOW_DRAFTS=1` becomes `VITE_SHOW_DRAFTS=1`.
- Gate: `grep -rl "<draft title>" .output` finds nothing after `pnpm build`, and finds the draft after `VITE_SHOW_DRAFTS=1 pnpm build`.

### Open Graph images

Do not use `@vercel/og`. Version 1.0.3 calls `require("fs")` inside Nitro's ESM bundle and crashes the server at startup. Render with `satori@0.29.0`, then `@resvg/resvg-js`, and return `new Response(png, { headers: { "Content-Type": "image/png" } })`. Pin satori: 0.29.0 matches `next/og` to the pixel, and 0.63.2 pushes the host footer off the card.

### Links and navigation

- `next/link` becomes `Link` from `@tanstack/react-router`.
  - `href="/cv"` becomes `to="/cv"`.
  - `` href={`/work/${slug}`} `` becomes `to="/work/$slug" params={{ slug }}`.
  - `href="/#work"` becomes `to="/" hash="work"`.
- `Command` and `BackLink` carry `LinkOptions` built with `linkOptions(...)` instead of a Next `Route` string.
- `useRouter().push(href)` becomes `useNavigate()(link)`.
- `AskBox` maps a `SourceId` to link options in `sourceLink(id)`.

### Images and fonts

- `next/image` in the header becomes `<img width height fetchPriority="high">`.
- `Figure` takes `{ src, width, height }`. `vite-imagetools` `defaultDirectives` turns every PNG under `src/content/` into WebP, at most 1408 px wide, imported as metadata. The MDX files do not change. Total screenshot weight drops from 1 MB of PNG to 138 KB.
- `next/font/google` becomes Fontsource. Import the fonts at the top of `globals.css`. Name the families in `--font-sans` and `--font-mono`. Preload the Latin Familjen woff2 through a `?url` import in the root `head()`.
- Move `globals.css` and `code.css` to `src/` and link the stylesheet with `import css from "../globals.css?url"`.

## Phase 3: Verify locally

Run each gate in order. Do not start the next one until the current one passes.

| Gate | Command | Expected |
| --- | --- | --- |
| Types | `pnpm typecheck` | 0 errors |
| Lint | `pnpm lint` | 0 problems |
| Unit | `pnpm test` | 5 pass |
| Vercel output | `NITRO_PRESET=vercel pnpm build`, then read `.vercel/output/config.json` | 308 on the 6 retired paths. ISR routes for `/` (`expiration: 86400`) and the catch-all. `/api/ask` and `/_serverFn/**` route to `__server`. `maxDuration: 30`. |
| Parity | `pnpm build && PORT=3202 pnpm start`, snapshot, then diff against `parity/next-local.json` | Only the [accepted differences](#accepted-differences) |
| Browser | `smoke.ts http://localhost:3202` | 10/10 PASS |
| Drafts | `grep -rl "<draft title>" .output` | No match |
| Pixels | `pixels.ts <next> <start> <dir>` | Every page and OG image identical. Case studies differ only in screenshot pixels. |

The spike passed every gate. Gzipped HTML and JS went down on every page: `/` from 275 KB to 208 KB, `/cv` from 191 KB to 153 KB, `/work/treddy-se` from 195 KB to 158 KB. Every page now ships all published MDX in the entry chunk, because `getCommands` and the home page import the content index. This is cheaper than the Next.js runtime at four case studies. Revisit it if the content grows.

## Phase 4: Vercel cutover

1. Push the branch. Vercel builds a preview. The commit status shows whether the build passed.
2. Snapshot the preview with `VERCEL_BYPASS=<Protection Bypass for Automation secret> node scripts/parity.ts snapshot <preview-url> parity/start-preview.json`, then diff it against the baseline. Create the secret in the Vercel project under Settings → Deployment Protection.
3. Check these on the preview. Local builds cannot exercise them:
   - `/` returns `x-vercel-cache: HIT` on a second request, and its `age` grows past a deploy-time render.
   - The `getHeatmap` server function call made on a client navigation to `/` returns `x-vercel-cache: HIT` on a second visit.
   - `POST /api/ask` from the page returns a streamed answer. A `curl` without BotID headers returns 403.
   - The 11th request within a minute returns 429, which confirms the Firewall rule `ask` still applies.
   - Vercel Analytics records a page view after a client-side navigation.
   - `/does-not-exist` returns status 404.
4. Merge. Vercel promotes the build. To roll back, use Instant Rollback to the last Next.js deployment.
5. After merge, snapshot production and diff it against the preview snapshot. Expect zero differences.

## Phase 5: Clean up

A separate PR after the cutover:

- `README.md`: replace the Next.js setup, scripts and the BotID and `next start` notes.
- `AGENTS.md`: remove the block that `next dev` writes.
- Delete `docs/tanstack-start/` and `parity/` once production matches.

## Accepted differences

| Difference | Why |
| --- | --- |
| `/cv` gains the site's `og:image` and `twitter:image` tags | TanStack merges parent head tags. A share card on `/cv` is an improvement. |
| Screenshot pixels and a 0.17 px layout offset on `/work/treddy-se` | Next serves resized srcset variants with slightly rounded aspect ratios. Start serves one WebP at the source aspect ratio. |

## Risks

| ID | Risk | Mitigation |
| --- | --- | --- |
| R1 | `nitro` is an RC (`3.0.261103-rc`) and the TanStack docs mark `nitro/vite` as under active development. | Pin exact versions. The parity and smoke gates catch regressions on upgrade. |
| R2 | ISR, BotID, the rate limit and Analytics are verified only in the build output, not on Vercel. | Phase 4 step 3 checks each one on the preview before merge. |
| R3 | The real `/api/ask` stream is unverified. No API key was available, so a probe route checked the streaming path instead. | Phase 4 step 3. |
| R4 | All published MDX ships in the client entry chunk. | It is measured smaller than Next today. Split the content index if it grows. Drafts are excluded by the Drafts gate. |
