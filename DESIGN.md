---
name: hylander.dev
description: Proof-first dark portfolio for a senior engineer. Plum and lavender, one lilac accent, the work shown working.
colors:
  plum: "oklch(0.17 0.035 290)"
  plum-2: "oklch(0.21 0.04 292)"
  plum-3: "oklch(0.27 0.045 295)"
  ink: "oklch(0.93 0.035 306)"
  muted: "oklch(0.72 0.04 302)"
  lilac: "oklch(0.83 0.107 306.71)"
  line: "oklch(0.34 0.05 298)"
typography:
  display:
    fontFamily: "Familjen Grotesk, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(2.25rem, 1.1rem + 3.2vw, 3.75rem)"
    fontWeight: 600
    lineHeight: 1.04
    letterSpacing: "-0.03em"
  claim:
    fontFamily: "Familjen Grotesk, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(1.625rem, 1.15rem + 1.5vw, 2.375rem)"
    fontWeight: 600
    lineHeight: 1.12
    letterSpacing: "-0.025em"
  hero:
    fontFamily: "Familjen Grotesk, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.875rem"
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: "-0.02em"
  title:
    fontFamily: "Familjen Grotesk, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 600
    lineHeight: 1.4
  section:
    fontFamily: "Familjen Grotesk, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.9375rem"
    fontWeight: 500
    lineHeight: 1.5
  body:
    fontFamily: "Familjen Grotesk, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.6
  meta:
    fontFamily: "Geist Mono, ui-monospace, monospace"
    fontSize: "0.8125rem"
    fontWeight: 400
    lineHeight: 1.4
rounded:
  sm: "6px"
  md: "10px"
  lg: "12px"
  full: "9999px"
spacing:
  row: "14px"
  block: "32px"
  section: "96px"
  page-x: "48px"
  page: "72.5rem"
  measure: "44rem"
components:
  mark:
    backgroundColor: "{colors.lilac}"
    textColor: "{colors.plum}"
    rounded: "{rounded.full}"
    size: "32px"
  button-ghost:
    backgroundColor: "{colors.plum}"
    textColor: "{colors.muted}"
    rounded: "{rounded.md}"
    padding: "4px 4px 4px 10px"
  button-ghost-hover:
    backgroundColor: "{colors.plum-2}"
    textColor: "{colors.ink}"
    rounded: "{rounded.md}"
  kbd:
    backgroundColor: "{colors.plum-3}"
    textColor: "{colors.ink}"
    typography: "{typography.meta}"
    rounded: "{rounded.sm}"
    padding: "0 6px"
  chip:
    backgroundColor: "{colors.plum-2}"
    textColor: "{colors.ink}"
    typography: "{typography.meta}"
    rounded: "{rounded.sm}"
    padding: "2px 8px"
  palette:
    backgroundColor: "{colors.plum-2}"
    textColor: "{colors.ink}"
    rounded: "{rounded.lg}"
    width: "34rem"
  palette-option-active:
    backgroundColor: "{colors.plum-3}"
    textColor: "{colors.ink}"
    rounded: "{rounded.sm}"
    padding: "8px 10px"
  toast:
    backgroundColor: "{colors.plum-2}"
    textColor: "{colors.ink}"
    rounded: "{rounded.md}"
    padding: "8px 14px"
---

# Design System: hylander.dev

## Overview

**North star: the proof is on the page.** A hiring manager sees what Simon has built before scrolling, and the work running as they scroll: one section per positioning pillar, each with its claim, its case studies and a live artifact beside them. It keeps the precision of rauno.me, paco.me and emilkowal.ski, at a larger scale. Every interactive piece enhances text that already reads on its own.

The scene: a hiring manager opens the link from LinkedIn in the evening, on a laptop, and gives it two minutes. Dark plum is calm at that hour and makes the single lilac accent carry the eye to what matters.

**Key characteristics:**

- The home page uses the full 72.5rem width in two columns from `md`. Articles (case studies, posts, `/cv`, 404) keep a centered 44rem column through the `reading` class.
- Full-width hairlines separate sections. Rows inside a section are hairline-separated too. The case study deck is the one place that uses cards.
- Two large sizes carry the hierarchy: Display for the hero and the contact prompt, Claim for section headings. Everything else stays at body size.
- Mono only for dates, metadata, keys and code.
- Motion is short and purposeful, and none of it gates content.

**Layout rhythm.** Sticky 64px top bar. Hero 64px (mobile) to 96px (desktop) below it, and 96px above the first hairline. Sections 64px (mobile) to 96px (desktop) of padding on each side of their hairline. Page gutter 20px mobile, 32px from `sm`, 48px from `lg`.

**Home order.** Hero with the "What I have built" list, then the case study deck, the AI pillar section (Integrations and Architecture have none), then Writing once a post is published, Ask when its key is set, the career timeline, and the contact footer.

**Slots.** `src/components/slots.tsx` places the interactive pieces: the activity heatmap (between the hero and the work, off while `SHOW_HEATMAP` is false) and a per-case-study artifact (beside its pillar section on the home page and above the case study prose).

## Colors

Restrained strategy: tinted plum neutrals and one accent. The accent covers well under 10% of any screen.

### Primary

- **Plum** (`--plum`): page background.
- **Lilac** (`--lilac`): the only accent. The SH mark, the hero's accent phrase and primary button, the "Now" dot, the Treddy API node, the current job on the timeline, artifact fills, the metric on a case study, focus outlines, link hover, text selection.

### Neutral

- **Plum 2** (`--plum-2`): raised surfaces: the palette, the toast, stack chips, ghost button hover.
- **Plum 3** (`--plum-3`): pressed and track surfaces: the active palette option, `kbd`, inline code.
- **Ink** (`--ink`): primary text. 15.5:1 on plum.
- **Muted** (`--muted`): secondary text, section headings, metadata. 7.6:1 on plum, 6.1:1 on plum 3.
- **Line** (`--line`): hairlines and borders only. Never text.

### Named Rules

**The One Accent Rule.** Lilac marks one idea per view. In the hero that idea is the accent phrase and the button that acts on it. If two lilac ideas compete, one of them becomes ink.

**The Token-Only Rule.** `globals.css` resets Tailwind's palette (`--color-*: initial`), so only the seven tokens exist as color utilities.

**Print.** `@media print` remaps the tokens to white, black and grays, so `/cv` prints as a plain document.

## Typography

**Sans:** Familjen Grotesk (400 to 700), body and headings. A grotesk with some ink-trap character: precise without being cold.
**Mono:** Geist Mono (400, 500), only for dates, years, metadata, `kbd` and code.

Both load through `next/font/google` as `--font-familjen` and `--font-geist-mono`.

### Hierarchy

- **Display** (600, 36px to 60px fluid, line-height 1.04, -0.03em, `text-wrap: balance`): the hero headline and the contact prompt.
- **Claim** (600, 26px to 38px fluid, line-height 1.12, -0.025em): pillar section headings, the career heading, Writing and Ask.
- **Hero** (700, 26px mobile, 30px from `sm`, line-height 1.2, -0.02em, `text-wrap: balance`): page titles on articles.
- **Title** (600, 18px): `h2` inside case study prose, job headings on `/cv`.
- **Section** (500, 15px, muted, sentence case): "What I have built" and "Stack". Never uppercase, never tracked.
- **Body** (400, 16px, 1.6; prose 1.7): paragraphs. Prose caps at 65ch.
- **Meta** (Geist Mono 400, 13px, tabular numbers): years, dates, chips, `kbd`.

### Named Rules

**The No-Eyebrow Rule.** Sections do not get kicker labels above their headings. A pillar heading carries its label inline: the pillar name in ink, then the claim in muted, in one `h2`.

## Elevation

Flat. No drop shadows, no gradients, no blur, no glass. Depth comes from three plum steps (plum, plum 2, plum 3) and 1px `line` borders. The palette's backdrop is plum at 75% opacity, with no blur.

### Named Rules

**The Flat Rule.** If something needs to stand out, raise it one plum step or give it a hairline. Never a shadow.

## Components

### Buttons

- **Primary** ("See the work"): lilac fill, plum text, 500, `rounded-md`, 10px by 16px. Hover brightens. One per page.
- **Outline** ("Get in touch", "Full CV"): 1px line border, ink 500, `rounded-md`. Hover fills plum 2 and the border turns muted.
- **Ghost** (top bar links, "Jump to ⌘K"): muted text, no border, `rounded-md`. Hover fills plum 2 and turns the text ink.
- **Small outline** ("Copy" in the footer): 1px line border, mono 13px, `rounded-sm`. Hover turns border and text lilac.
- Controls that need JavaScript carry `data-requires-js` and are hidden by a `<noscript>` rule.

### Chips

- **Stack chip:** plum 2 fill, 1px line border, Geist Mono 13px, `rounded-sm`. Static list items.

### Cards / Containers

Lists are rows divided by hairlines. The only cards are in the case study deck. The other bounded surfaces are the palette and the toast (plum 2, line border, `rounded-lg` and `rounded-md`) and the artifact panels (plum 2, no border, `rounded-lg`, 20px to 24px padding).

### Inputs / Fields

- **Palette input:** transparent, no border, a hairline below, 16px, muted placeholder. The open dialog carries focus, so the input has no outline of its own.

### Navigation

- **Top bar:** sticky, 64px, plum at 90% opacity. The SH mark (32px lilac circle, plum 11px bold text) links home on the left. On the right: Work, CV and Contact as ghost links, then "Jump to ⌘K", which opens the palette. Work and CV hide below `sm`; the key hint hides below `sm` and reads "Ctrl K" off Apple platforms.
- **Contact footer** (every page, `#contact`): the contact prompt in Display, the email as a `mailto:` link with a Copy button (toast confirms), then the location and GitHub, LinkedIn and X in muted.
- **Focus:** every focusable element shows a 2px lilac outline, offset 2px.

### Built list (signature)

Beside the hero from `md`, below it on mobile. A "What I have built" section heading over one hairline row per case study: its `tagline` at 17px (turns lilac on hover), the `company` and years in muted 14px below, and a "→" that shifts 2px. Each row opens its case study. The lines stay high level; numbers and mechanisms live in the case studies.

### Pillar section (signature)

One per pillar, copy from `pillarCopy` in `src/content/pillars.ts`. Text column: the Claim heading, the thesis (muted 17px, 46ch), and the pillar's case studies as hairline rows (title in ink 500 with a "→", both turning lilac and shifting on hover, and years in mono). Artifact column: the showcase case study's artifact, sticky 96px from the top on desktop. The second section flips the columns.

### Command palette (signature)

A native modal `<dialog>` (focus trap, Escape, focus restore). A combobox input over a grouped listbox: Actions, Pages, Case studies, Elsewhere. Arrow keys move, Enter runs, a click outside closes. Commands come from `src/lib/commands.ts`, which reads the content modules.

### Partner graph (signature)

The Treddy artifact. A 16:10 box with the lilac "Treddy API" pill in the center and the partners from `src/content/partners.ts` on an ellipse around it (plum 3 rounded rects, Geist Mono 12px muted labels), joined by 1px line edges. Labels are HTML over an SVG of edges, so they keep their size at any width. Hovering or focusing a partner turns its border and edge lilac and names its role in the caption below. While on screen, a lilac dot travels a random edge every 700ms (`cubic-bezier(.45, 0, .2, 1)`, 1.1s), out as a request or back as a webhook, paused when the tab is hidden and absent under reduced motion. Each partner's role is also in visually hidden text.

### Career timeline

The home page's career section. A "12 years, 5 companies" Claim heading (computed from `career.ts`) with a "Full CV" outline button, then one grid column per year from the first job to two years past now. Each job spans its years with a 6px band on top (plum 3; lilac for the current job, which runs to the end of the axis), a 1px line on its left, then company (500), role (muted 14px) and years (mono). Below `md` it is a plain list with the years on the right.

### Artifacts

A plum 2 `rounded-lg` panel with a small header (title in ink 500, hint in mono muted), one per case study: the Treddy partner graph, the route-level canary split (range input and a caption on what moves the traffic), before and after review-time bars with an "AI pre-review" switch, and the RAG pipeline chips with Replay. Controls carry `data-requires-js`; the server-rendered state reads without them.

### Case study deck (signature)

The first section under `#work`, from `src/components/work-deck.tsx`. A "Case studies" Claim heading with ← → buttons, then one card per case study. A card is plum 2 with a line border and `rounded-lg`: position ("01 / 04") and pillar in mono, a zoomed, inert preview of the artifact on plum, then title, tagline, company and years.

- **From `md`: helix.** The cards sit on a spiral (`.helix-card` in `globals.css`): 34° apart around a vertical axis 32rem behind the front card, 4rem lower per step, fading with distance. One `--progress` value picks the front card. The wheel (over the deck), a drag, the arrow buttons and keyboard focus move it, eased per frame and snapped to a whole card. At the first and last card the wheel scrolls the page again. Clicking a card brings it forward and never opens the dialog. The helix is centered at 40% of the width. On the right, a side panel (plum 2, line border, `rounded-lg`, 19rem) summarises the front card: position and years, pillar and company in mono, title, tagline, the metric in lilac, and a lilac "Open" button, the only way to open the dialog from the helix.
- **Below `md`: row.** A full-bleed scroll-snapped row. Where scroll-driven animations exist, cards turn up to 32° and fade toward the edges. A click opens the dialog.
- **Dialog.** Each card links to its case study, so without JavaScript it navigates. With JavaScript a modal `<dialog>` opens and a view transition morphs the card into it (420ms, `--ease`). It shows the live artifact beside the position, title, summary, meta row, stack chips and a primary "Read the case study" button, with the other case studies below. Arrow keys and the ← → buttons move between them, and closing morphs back into the card.
- **Reduced motion.** The helix jumps instead of easing, the row stays flat and the morph is skipped.

### Activity heatmap

Off while `SHOW_HEATMAP` is false: the calendar is nearly empty before Oct 2026. "Shipping": a 7-row table, one 9px `rounded-[2px]` cell per day and one column per week, 2px gaps. Five levels: plum 2, `oklch(0.42 0.07 304)`, `oklch(0.55 0.09 305)`, `oklch(0.7 0.1 306)`, lilac. These three in-between steps are the only off-token colors and exist only for this ramp. The grid is one tab stop with arrow-key movement; hovering or focusing a day writes its count into the muted note below. On narrow screens the scroller opens on the latest week (a right-to-left scroller, so no JavaScript is needed).

### Case study meta row

A `dl` between two hairlines: Role, Years (mono), Pillar, Result. The Result value is the case study's one lilac element.

### Motion

- Ease: `cubic-bezier(.22, 1, .36, 1)` everywhere (`--ease`, Tailwind `ease-out`).
- Hero: one CSS-only rise (6px, 700ms, 70ms stagger: headline, name, "Now" line, buttons and the list heading, then the list).
- "Now" dot: a soft ping every 2.4s.
- Partner graph pulses: 1.1s on `cubic-bezier(.45, 0, .2, 1)`, one every 700ms. Canary split 450ms, review bars 700ms, pipeline chips 280ms apart.
- Palette 200ms, toast 240ms, hover shifts 300ms.
- `prefers-reduced-motion: reduce` collapses every animation and transition and removes the ping.

## Do's and Don'ts

### Do:

- **Do** use the seven tokens through Tailwind (`bg-plum-2`, `text-muted`, `border-line`).
- **Do** separate list items with 1px `line` hairlines.
- **Do** keep mono to dates, metadata, keys and code.
- **Do** make every interactive piece optional: the text must read without JavaScript.
- **Do** give every case study a single lilac highlight: its metric.

### Don't:

- **Don't** add drop shadows, gradients, gradient text, glass or blur.
- **Don't** use side-stripe borders, or cards outside the case study deck.
- **Don't** put uppercase eyebrow labels above sections.
- **Don't** introduce a second accent color or Tailwind's default palette.
- **Don't** animate content into visibility with JavaScript.
- **Don't** use `#000` or `#fff` on screen. Print is the exception.
