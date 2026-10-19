---
name: hylander.dev
description: Quiet, precise dark index for a senior engineer. Plum and lavender, one lilac accent, craft in the details.
colors:
  plum: "oklch(0.17 0.035 290)"
  plum-2: "oklch(0.21 0.04 292)"
  plum-3: "oklch(0.27 0.045 295)"
  ink: "oklch(0.93 0.035 306)"
  muted: "oklch(0.72 0.04 302)"
  lilac: "oklch(0.83 0.107 306.71)"
  line: "oklch(0.34 0.05 298)"
typography:
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
  section: "64px"
  page-x: "24px"
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

**North star: a precise index.** The site reads like a well-kept index of one engineer's work: a short positioning line, a list of case studies, a career list. It sits in the lane of rauno.me, paco.me and emilkowal.ski. Craft shows in the details (a pinging dot, a "+" that rotates to "×", a ⌘K palette), and every interactive piece enhances text that already reads on its own.

The scene: a hiring manager opens the link from LinkedIn in the evening, on a laptop, and gives it two minutes. Dark plum is calm at that hour and makes the single lilac accent carry the eye to what matters.

**Key characteristics:**

- One column, max 44rem, left aligned. No cards, no grids of tiles.
- Hairline-separated rows instead of containers.
- Hierarchy from weight and color, not size jumps: section headings are 15px muted, the hero is the only large type.
- Mono only for dates, metadata, keys and code.
- Motion is short and purposeful, and none of it gates content.

**Layout rhythm.** Header 24px from the top. Hero 56px (mobile) to 80px (desktop) below it. Sections 64px apart. Rows 14px vertical padding. Footer 96px below the last section. Page gutter 20px mobile, 24px from `sm`.

**Slots.** `src/components/slots.tsx` places the interactive pieces: the integration graph (beside the hero from `md`, below it on mobile), the activity heatmap (between the hero and Selected work), and a per-case-study artifact (in the expanded home row and above the case study prose).

## Colors

Restrained strategy: tinted plum neutrals and one accent. The accent covers well under 10% of any screen.

### Primary

- **Plum** (`--plum`): page background.
- **Lilac** (`--lilac`): the only accent. The SH mark, the "Now" dot, an open row's "×", the metric on a case study, focus outlines, link hover, text selection.

### Neutral

- **Plum 2** (`--plum-2`): raised surfaces: the palette, the toast, stack chips, ghost button hover.
- **Plum 3** (`--plum-3`): pressed and track surfaces: the active palette option, `kbd`, inline code.
- **Ink** (`--ink`): primary text. 15.5:1 on plum.
- **Muted** (`--muted`): secondary text, section headings, metadata. 7.6:1 on plum, 6.1:1 on plum 3.
- **Line** (`--line`): hairlines and borders only. Never text.

### Named Rules

**The One Accent Rule.** Lilac marks a single thing per view that deserves the eye. If two lilac elements compete, one of them becomes ink.

**The Token-Only Rule.** `globals.css` resets Tailwind's palette (`--color-*: initial`), so only the seven tokens exist as color utilities.

**Print.** `@media print` remaps the tokens to white, black and grays, so `/cv` prints as a plain document.

## Typography

**Sans:** Familjen Grotesk (400 to 700), body and headings. A grotesk with some ink-trap character: precise without being cold.
**Mono:** Geist Mono (400, 500), only for dates, years, metadata, `kbd` and code.

Both load through `next/font/google` as `--font-familjen` and `--font-geist-mono`.

### Hierarchy

- **Hero** (700, 26px mobile, 30px from `sm`, line-height 1.2, -0.02em, `text-wrap: balance`): the positioning line on `/`, page titles elsewhere.
- **Title** (600, 18px): `h2` inside case study prose, job headings on `/cv`.
- **Section** (500, 15px, muted, sentence case): "Selected work", "Writing", "Career", "Stack". Never uppercase, never tracked.
- **Body** (400, 16px, 1.6; prose 1.7): paragraphs. Prose caps at 65ch.
- **Meta** (Geist Mono 400, 13px, tabular numbers): years, dates, chips, `kbd`.

### Named Rules

**The No-Eyebrow Rule.** Sections do not get kicker labels above their headings. The heading is already quiet.

## Elevation

Flat. No drop shadows, no gradients, no blur, no glass. Depth comes from three plum steps (plum, plum 2, plum 3) and 1px `line` borders. The palette's backdrop is plum at 75% opacity, with no blur.

### Named Rules

**The Flat Rule.** If something needs to stand out, raise it one plum step or give it a hairline. Never a shadow.

## Components

### Buttons

- **Ghost** ("Jump to ⌘K"): muted text, no border, `rounded-md`. Hover fills plum 2 and turns the text ink.
- **Small outline** ("Copy" in the footer): 1px line border, mono 13px, `rounded-sm`. Hover turns border and text lilac.
- Controls that need JavaScript carry `data-requires-js` and are hidden by a `<noscript>` rule.

### Chips

- **Stack chip:** plum 2 fill, 1px line border, Geist Mono 13px, `rounded-sm`. Static list items.

### Cards / Containers

None. Lists are rows divided by hairlines. The bounded surfaces are the palette and the toast (plum 2, line border, `rounded-lg` and `rounded-md`) and the artifact panels (plum 2, no border, `rounded-md`).

### Inputs / Fields

- **Palette input:** transparent, no border, a hairline below, 16px, muted placeholder. The open dialog carries focus, so the input has no outline of its own.

### Navigation

- **Top bar:** the SH mark (32px lilac circle, plum 11px bold text) links home on the left. "Jump to ⌘K" opens the palette on the right; the key hint hides below `sm` and reads "Ctrl K" off Apple platforms.
- **Footer:** the email as a `mailto:` link with a Copy button (toast confirms), then GitHub, LinkedIn and X in muted.
- **Focus:** every focusable element shows a 2px lilac outline, offset 2px.

### Work row (signature)

A hairline row: title (ink 500), tagline (muted 14px), years (mono 13px), and a 12px "+" icon. The row's button has `aria-expanded`; the panel animates `grid-template-rows` from `0fr` to `1fr` in 320ms on the site ease, and the "+" rotates 45° to "×" in lilac. The panel holds the summary, "Read the case study →", and the artifact slot. Without JavaScript every panel is open.

### Command palette (signature)

A native modal `<dialog>` (focus trap, Escape, focus restore). A combobox input over a grouped listbox: Actions, Pages, Case studies, Elsewhere. Arrow keys move, Enter runs, a click outside closes. Commands come from `src/lib/commands.ts`, which reads the content modules.

### Integration graph (signature)

An SVG beside the hero, max 300px wide: the lilac SH circle with seven nodes on an ellipse (plum 2 rounded rects, Geist Mono 10.5px muted labels) joined by 1px line edges. Hovering or focusing a node turns it and its edge lilac and lights the titles of related work rows. Hovering a row lights its nodes. While idle and on screen, a lilac dot travels a random edge every 650ms (`cubic-bezier(.45, 0, .2, 1)`, 1.1s), paused when the tab is hidden and absent under reduced motion. A visually hidden caption lists each system and its case studies.

### Artifacts

A plum 2 `rounded-md` panel with a small header (title in ink, hint in mono muted), one per case study: the route-level canary split (range input), the review-time bar with an "AI pre-review" switch, the RAG pipeline chips with Replay, and the Treddy partner graph. Controls carry `data-requires-js`; the server-rendered state reads without them.

### Activity heatmap

"Shipping": a 7-row table, one 9px `rounded-[2px]` cell per day and one column per week, 2px gaps. Five levels: plum 2, `oklch(0.42 0.07 304)`, `oklch(0.55 0.09 305)`, `oklch(0.7 0.1 306)`, lilac. These three in-between steps are the only off-token colors and exist only for this ramp. The grid is one tab stop with arrow-key movement; hovering or focusing a day writes its count into the muted note below. On narrow screens the scroller opens on the latest week (a right-to-left scroller, so no JavaScript is needed).

### Case study meta row

A `dl` between two hairlines: Role, Years (mono), Pillar, Result. The Result value is the case study's one lilac element.

### Motion

- Ease: `cubic-bezier(.22, 1, .36, 1)` everywhere (`--ease`, Tailwind `ease-out`).
- Hero: one CSS-only rise (6px, 700ms, 70ms stagger over three lines).
- "Now" dot: a soft ping every 2.4s.
- Graph pulses: 1.1s on `cubic-bezier(.45, 0, .2, 1)`, one every 650ms. Canary split 450ms, review bar 700ms, pipeline chips 280ms apart.
- Palette 200ms, toast 240ms, row 320ms.
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
- **Don't** use side-stripe borders or cards.
- **Don't** put uppercase eyebrow labels above sections.
- **Don't** introduce a second accent color or Tailwind's default palette.
- **Don't** animate content into visibility with JavaScript.
- **Don't** use `#000` or `#fff` on screen. Print is the exception.
