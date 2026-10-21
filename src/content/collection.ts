import type { MDXContent } from "mdx/types";
import { z } from "zod";
import type { PartialDate } from "./career";

/** The three positioning pillars from PRODUCT.md, in home page order. Every entry supports one. */
export const pillars = ["integrations", "architecture", "ai-native"] as const;

export type Pillar = (typeof pillars)[number];

export const pillarLabels = {
  integrations: "Integrations",
  architecture: "Architecture",
  "ai-native": "AI",
} satisfies Record<Pillar, string>;

const partialDate = z.custom<PartialDate>((value) => typeof value === "string" && /^\d{4}(-\d{2})?$/.test(value), {
  message: 'Expected "YYYY" or "YYYY-MM"',
});

/** Shape of `export const metadata` in every post. `date` is the publish date. */
export const postSchema = z.object({
  title: z.string().min(1),
  summary: z.string().min(1),
  date: z.iso.date(),
  pillar: z.enum(pillars),
  /** Drafts render in `next dev` and with SHOW_DRAFTS=1, and are left out of production builds. */
  draft: z.boolean().default(false),
});

const showDrafts = process.env.NODE_ENV === "development" || process.env.SHOW_DRAFTS === "1";

/** Shape of `export const metadata` in every case study. */
export const caseStudySchema = postSchema.extend({
  /** What was built, in one short line. The home page lists it beside the hero. */
  tagline: z.string().min(1),
  /** The company or product the work was for, shown with the years under the tagline. */
  company: z.string().min(1),
  role: z.string().min(1),
  /** When the work happened. Omit until the dates are confirmed. */
  period: z.object({ start: partialDate, end: partialDate.optional() }).optional(),
  stack: z.array(z.string()),
  metric: z.string().optional(),
});

type MdxModule = { default: MDXContent; metadata?: unknown };

/**
 * Turns imported MDX modules, keyed by slug, into validated entries in registration order.
 * Each entry's `slug` is typed as the union of registered keys.
 * Invalid metadata throws at import time, so a bad entry fails the build. Drafts are dropped
 * unless drafts are shown, so every list, route and the sitemap skip them.
 */
export function defineCollection<Schema extends z.ZodType<z.output<typeof postSchema>>, Slug extends string>(
  schema: Schema,
  modules: Record<Slug, MdxModule>,
) {
  // Object.entries widens keys to string. Keeping them as `Slug` lets other modules type slug references.
  const entries = (Object.entries(modules) as [Slug, MdxModule][]).map(([slug, module]) => {
    const result = schema.safeParse(module.metadata);
    if (!result.success) {
      throw new Error(`Invalid metadata in "${slug}.mdx":\n${z.prettifyError(result.error)}`);
    }
    return { slug, ...result.data, Content: module.default };
  }).filter((entry) => showDrafts || !entry.draft);

  return {
    entries,
    find: (slug: string) => entries.find((entry) => entry.slug === slug),
  };
}
