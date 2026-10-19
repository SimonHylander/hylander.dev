import { defineCollection } from "../collection";
import * as treddy from "./treddy.mdx";

/** Case studies at /work/[slug]. Register each MDX file here; the key is the slug. */
export const work = defineCollection({ treddy });
