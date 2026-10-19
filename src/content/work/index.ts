import { caseStudySchema, defineCollection } from "../collection";
import * as aiCodeReview from "./ai-code-review.mdx";
import * as byggdagbokenMigration from "./byggdagboken-migration.mdx";
import * as treddy from "./treddy.mdx";
import * as uppgraderingspaket from "./uppgraderingspaket.mdx";

/**
 * Case studies at /work/[slug]. Register each MDX file here; the key is the slug.
 * Registration order is the order on the home page and in the prev/next links.
 */
export const work = defineCollection(caseStudySchema, {
  treddy,
  "byggdagboken-migration": byggdagbokenMigration,
  "ai-code-review": aiCodeReview,
  uppgraderingspaket,
});

export type CaseStudy = (typeof work.entries)[number];

/** Union of registered slugs. Content that points at a case study types its slug with this. */
export type CaseStudySlug = CaseStudy["slug"];
