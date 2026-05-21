---
name: hylander.dev
description: Neo-brutalist portfolio for a playful, builder-curious senior engineer
colors:
  plum-night: "oklch(0.182 0.046 286.89)"
  lavender-mist: "oklch(90.2% 0.063 306.7)"
  aubergine-ink: "#261a2a"
  lilac-accent: "oklch(0.8325 0.107 306.71)"
  bench-white: "#ffffff"
  shadow-plum: "#261a2a"
  shadow-lilac: "#dab2ff"
typography:
  display:
    fontFamily: "Poppins, sans-serif"
    fontSize: "clamp(2.5rem, 5vw, 3rem)"
    fontWeight: 700
    lineHeight: 1.1
    letterSpacing: "normal"
  headline:
    fontFamily: "Poppins, sans-serif"
    fontSize: "clamp(1.5rem, 3vw, 2.25rem)"
    fontWeight: 700
    lineHeight: 1.2
  title:
    fontFamily: "Poppins, sans-serif"
    fontSize: "1.25rem"
    fontWeight: 700
    lineHeight: 1.3
  body:
    fontFamily: "Poppins, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.5
  label:
    fontFamily: "Fira Code, monospace"
    fontSize: "0.875rem"
    fontWeight: 500
    lineHeight: 1.4
    letterSpacing: "0.02em"
rounded:
  sm: "0.25rem"
  md: "0.4rem"
  lg: "0.5rem"
spacing:
  xs: "0.5rem"
  sm: "1rem"
  md: "1.5rem"
  lg: "2rem"
  xl: "4rem"
  section: "4rem"
components:
  button-primary:
    backgroundColor: "{colors.aubergine-ink}"
    textColor: "{colors.lavender-mist}"
    rounded: "{rounded.md}"
    padding: "1rem 1.5rem"
  button-primary-hover:
    backgroundColor: "{colors.aubergine-ink}"
    textColor: "{colors.lavender-mist}"
    rounded: "{rounded.md}"
    padding: "1rem 1.5rem"
  nav-tile:
    backgroundColor: "{colors.bench-white}"
    textColor: "{colors.aubergine-ink}"
    rounded: "{rounded.md}"
    padding: "1rem"
  nav-tile-hover:
    backgroundColor: "{colors.lavender-mist}"
    textColor: "{colors.aubergine-ink}"
    rounded: "{rounded.md}"
    padding: "1rem"
---

# Design System: hylander.dev

## Overview

**Creative North Star: "The Builder's Bench"**

A portfolio visual system that feels like a well-used workbench: warm craft, curious experiments, and tools laid out with intention. Surfaces are plum-dark and lavender-bright in deliberate contrast; structure comes from grids, borders, and stacked offset shadows rather than soft SaaS blur. The system rejects generic template polish and neon hacker clichés in favor of tactile, ownable neo-brutalism.

Density is moderate: long-form proof sections (experience, skills) use full-width alternating bands; signature chrome (navigation, section headers) carries the strongest shadow vocabulary. Motion is responsive, not choreographed: Framer Motion accents (e.g. about imagery) respect reduced motion.

**Key Characteristics:**

- Deep plum night backgrounds with lavender mist type and borders
- Hard offset shadows (5px/10px stack) on navigation and key chrome
- Poppins-forward hierarchy with Fira Code for technical labels
- Alternating `background` / `secondary` rows for list-like proof sections
- Technology brand colors reserved for stack icons and inline tech emphasis only

## Colors

The palette is committed purple-lavender: the surface is moody plum, the voice is bright mist, and aubergine ink anchors borders and shadow stacks.

### Primary

- **Plum Night** (oklch(0.182 0.046 286.89)): Page background (`--background`). Sets the nighttime bench mood; all sections inherit unless explicitly banded.
- **Aubergine Ink** (#261a2a): Primary brand fill (`--primary`), shadow stack base, nav depth. Used for buttons, logo tile contrast, and the first layer of offset shadows.

### Secondary

- **Lavender Mist** (oklch(90.2% 0.063 306.7)): Foreground text, secondary fills, section header titles, alternating experience/skills bands. Carries most readable copy on dark ground.
- **Lilac Accent** (oklch(0.8325 0.107 306.71)): Borders (`--border`), rings, hover accents. Structural lines and focus, not large fills.

### Neutral

- **Bench White** (#ffffff): Navigation shell background. A deliberate break from plum night so the nav reads as a physical object on the desk.
- **Shadow Plum / Shadow Lilac** (#261a2a / #dab2ff): Second-layer offset shadow colors in navigation (`5px 5px` plum, `10px 10px` lilac). Never use as text colors.

### Named Rules

**The Two-Shadow Rule.** Signature offset depth uses exactly two hard layers (plum then lilac). Do not add a third drop shadow or soften into diffuse blur on nav-level chrome.

**The Tech Color Rule.** Per-technology hues (`--color-typescript`, `--color-go`, etc.) appear only on devicons and inline tech emphasis, never as page-wide accents or gradient fills.

## Typography

**Display Font:** Poppins (sans-serif)
**Body Font:** Poppins (sans-serif)
**Label/Mono Font:** Fira Code (monospace)
**Serif Accent:** Lora (available in tokens; use sparingly for editorial moments if introduced)

**Character:** Round, friendly sans with confident bold weights. Hierarchy is scale- and weight-driven (≥1.25 ratio between hero and body). Mono appears for stack labels and code-adjacent moments, not body copy.

### Hierarchy

- **Display** (700, clamp(2.5rem, 5vw, 3rem), 1.1): Hero name and primary identity (`about` h1, contact headline).
- **Headline** (700, clamp(1.5rem, 3vw, 2.25rem), 1.2): Section headers via `SectionHeader`, job titles in experience rows.
- **Title** (700, 1.25rem, 1.3): Project names, card titles, sub-section labels.
- **Body** (400, ~17px / 1.0625rem, 1.5): Bio paragraphs, bullet points, contact supporting copy. Cap line length at 65–75ch in prose blocks.
- **Label** (500, 0.875rem Fira Code, 0.02em tracking): Technology tags, metadata, period strings.

### Named Rules

**The Bold Step Rule.** Every section title jumps at least one clear step above body (section headers at 2xl–4xl vs body at base/lg). Flat type scales are forbidden.

## Elevation

Depth is **structural offset**, not ambient blur. The navigation uses stacked hard shadows; section headers and bordered grids use `shadow-md` from the token scale (3px 3px 0 lilac-tinted). Content rows rely on alternating plum/lavender bands before reaching for shadow.

### Shadow Vocabulary

- **Offset stack (nav)** (`5px 5px 0 #261a2a, 10px 10px 0 #dab2ff`): Primary chrome only. Makes the nav feel lifted off the bench.
- **Token shadow-md** (`3px 3px 0` lilac-tinted): Section headers, experience/skills containers, contact buttons.
- **Flat bands**: Experience and skills rows alternate `bg-background` / `bg-secondary` with 1px `border-secondary` seams instead of card float.

### Named Rules

**The Hard Edge Rule.** Shadows have zero or minimal blur (`--shadow-blur: 0px`). If a shadow looks like a 2014 soft drop, remove the blur and use offset stacks or tonal bands instead.

## Components

Tactile and bold: chunky borders, confident type, obvious hit targets.

### Buttons

- **Shape:** Medium radius (0.4rem / `rounded-md`).
- **Primary:** Aubergine ink fill, lavender mist text, `shadow-md`, generous vertical padding on contact CTAs (`py-4`).
- **Outline:** Background fill with border; contact uses `bg-primary` override on outline variant for contrast on plum page.
- **Hover / Focus:** `hover:bg-primary/90` or accent swap on outline; `focus-visible:ring-ring/50` with 3px ring. No bounce or elastic easing.

### Chips

- **Style:** `bg-secondary/50`, small rounded-md, `border-border/30`, hover `border-primary/50` (skills technology tags).
- **State:** Static list items, not filter toggles.

### Cards / Containers

- **Corner Style:** `rounded` / 0.4rem default; project cards full-bleed imagery inside bordered card shell.
- **Background:** `bg-card` on shell; project title band uses `bg-secondary` with `text-primary` bold title.
- **Shadow Strategy:** `shadow-sm` on card primitive; project grid relies more on image weight than float.
- **Border:** `border-secondary` on section wrappers.
- **Internal Padding:** Card content often `p-0` for image-forward project tiles.

### Inputs / Fields

- **Style:** Not heavily used on portfolio surface yet; inherit shadcn outline pattern when added (background fill, border, md radius).
- **Focus:** Ring token at 3px, no glow bloom.

### Navigation

- **Style:** White bench shell, 1px secondary border, dual offset shadow stack, grid `logo | links`.
- **Typography:** `text-xl` link labels; devicon social tiles at 2xl.
- **Default / Hover:** Nav items `bg-background`; hover inverts to `bg-secondary` + `text-primary`.
- **Mobile:** `max-w-[280px]` constraint; wrap link grid with 2px gaps.

### Alternating proof rows (Experience / Skills)

- **Character:** Full-width list, zero gap, shared outer border + `shadow-md`.
- **Even rows:** `bg-background` with `text-secondary` headings.
- **Odd rows:** `bg-secondary` with `text-background` headings.
- **Padding:** `p-4` mobile, `p-16` desktop on job rows.

## Do's and Don'ts

### Do:

- **Do** use OKLCH tokens from `packages/ui/src/styles/globals.css` as the single source of truth for fills and borders.
- **Do** stack exactly two offset shadows on signature chrome (plum base, lilac second layer).
- **Do** alternate background/secondary bands for long proof lists before adding card grids.
- **Do** keep Poppins hierarchy bold between section titles and body copy.
- **Do** respect `prefers-reduced-motion` for Framer Motion and CSS transitions.

### Don't:

- **Don't** use generic SaaS portfolio patterns: hero metrics, identical icon-card grids, gradient text, or decorative glass cards.
- **Don't** adopt dark-mode neon hacker aesthetics or meaningless purple gradient washes.
- **Don't** ship obvious AI slop: glassmorphism as default, side-stripe accent borders, modal-first interactions, interchangeable template brutalism.
- **Don't** paste corporate resume PDF layouts: stock icon rows, flat undifferentiated grids, no point of view.
- **Don't** soften nav shadows into diffuse blur or add a third shadow layer.
- **Don't** use `background-clip: text` gradient fills for emphasis; use weight and size.
- **Don't** use pure `#000` or `#fff` except bench white on nav; tint neutrals toward plum hue.
