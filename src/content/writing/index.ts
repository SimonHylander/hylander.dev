import { defineCollection, postSchema } from "../collection";

/** Posts at /writing/[slug]. Register each MDX file here, newest first; the key is the slug. */
export const writing = defineCollection(postSchema, {});

export type Post = (typeof writing.entries)[number];
