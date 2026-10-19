import type { CaseStudySlug } from "./work";

/** A system Simon has integrated. `work` lists the case studies that cover it. */
type System<Id extends string = string> = {
  id: Id;
  label: string;
  work: readonly CaseStudySlug[];
};

// Graph order: the first node sits at the top, the rest follow clockwise.
// OPERA Cloud and Mews are Proposales work, which has no public case study yet.
const definitions = [
  { id: "opera", label: "OPERA Cloud", work: [] },
  { id: "bankid", label: "BankID", work: ["treddy"] },
  { id: "swish", label: "Swish", work: ["treddy"] },
  { id: "stripe", label: "Stripe", work: ["treddy"] },
  { id: "cloudfront", label: "CloudFront", work: ["byggdagboken-migration"] },
  { id: "llm", label: "LLM + RAG", work: ["ai-code-review", "uppgraderingspaket"] },
  { id: "mews", label: "Mews", work: [] },
] as const satisfies readonly System[];

export type SystemId = (typeof definitions)[number]["id"];

/** Nodes of the integration graph on the home page. */
export const systems: readonly System<SystemId>[] = definitions;
