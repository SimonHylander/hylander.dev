import type { MDXModule } from "mdx/types";
import { defineCollection, postSchema } from "../collection";

/**
 * Drafts render in `pnpm dev` and in builds with VITE_SHOW_DRAFTS=1. Vite replaces this condition at
 * build time and drops the false branch, so a production bundle holds no draft text. Keep the check
 * inline: Rolldown does not fold it when it is imported from another module.
 */
const drafts: Record<string, MDXModule> =
  import.meta.env.DEV || import.meta.env.VITE_SHOW_DRAFTS === "1"
    ? { "effect-in-a-rag-pipeline": await import("./effect-in-a-rag-pipeline.mdx") }
    : {};

/** Posts at /writing/[slug]. Register each MDX file here, newest first; the key is the slug. Drafts go in `drafts`. */
export const writing = defineCollection(postSchema, { ...drafts });

export type Post = (typeof writing.entries)[number];
