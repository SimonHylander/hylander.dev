import type { MDXContent } from "mdx/types";
import { z } from "zod";

/** The three positioning pillars from PRODUCT.md. Every entry supports one. */
const pillars = ["integrations", "architecture", "ai-native"] as const;

export type Pillar = (typeof pillars)[number];

export const pillarLabels = {
  integrations: "Integrations",
  architecture: "Architecture that survives change",
  "ai-native": "AI-native engineering",
} satisfies Record<Pillar, string>;

/** Shape of `export const metadata` in every case study and post. `date` is the publish date. */
const entryMetadataSchema = z.object({
  title: z.string().min(1),
  summary: z.string().min(1),
  date: z.iso.date(),
  pillar: z.enum(pillars),
  stack: z.array(z.string()),
  metric: z.string().optional(),
});

export type EntryMetadata = z.infer<typeof entryMetadataSchema>;

type MdxModule = { default: MDXContent; metadata?: unknown };

/**
 * Turns imported MDX modules, keyed by slug, into validated entries sorted newest first.
 * Invalid metadata throws at import time, so a bad entry fails the build.
 */
export function defineCollection(modules: Record<string, MdxModule>) {
  const entries = Object.entries(modules)
    .map(([slug, module]) => {
      const result = entryMetadataSchema.safeParse(module.metadata);
      if (!result.success) {
        throw new Error(`Invalid metadata in "${slug}.mdx":\n${z.prettifyError(result.error)}`);
      }
      return { slug, ...result.data, Content: module.default };
    })
    .sort((a, b) => b.date.localeCompare(a.date));

  return {
    entries,
    find: (slug: string) => entries.find((entry) => entry.slug === slug),
  };
}

export type Entry = ReturnType<typeof defineCollection>["entries"][number];
