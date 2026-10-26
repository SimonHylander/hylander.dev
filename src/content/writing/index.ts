import { defineCollection, postSchema } from "../collection";
import * as effectInARagPipeline from "./effect-in-a-rag-pipeline.mdx";

/** Posts at /writing/[slug]. Register each MDX file here, newest first; the key is the slug. */
export const writing = defineCollection(postSchema, {
  "effect-in-a-rag-pipeline": effectInARagPipeline,
});

export type Post = (typeof writing.entries)[number];
