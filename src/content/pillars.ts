import type { Pillar } from "./collection";
import type { CaseStudySlug } from "./work";

type PillarCopy = {
  /** Follows the pillar label in the section heading. */
  claim: string;
  thesis: string;
  /** The case study whose artifact sits beside the section. */
  showcase: CaseStudySlug;
};

/** Home page section per pillar. The case studies listed in each come from their `pillar` field. */
export const pillarCopy = {
  integrations: {
    claim: "Ten years of connecting systems that were never designed to talk to each other.",
    thesis: "Identity, payments and shipping. I put one typed API in front of them, so the product talks to one thing.",
    showcase: "treddy",
  },
  architecture: {
    claim: "I migrate live products without stopping them.",
    thesis:
      "The Byggdagboken web client moved from PHP and Angular.js to Next.js one route at a time, behind canaries, while customers kept working.",
    showcase: "byggdagboken-migration",
  },
  "ai-native": {
    claim: "I use agents to raise the quality bar, not lower it.",
    thesis: "Contributors iterate with an AI reviewer before a person looks. Seniors review what is left.",
    showcase: "ai-code-review",
  },
} satisfies Record<Pillar, PillarCopy>;

type Result = {
  /** [before, emphasis, after]. The emphasis renders in semibold ink. */
  claim: readonly [string, string, string];
  where: string;
  /** The case study that backs the claim. Its years are shown, and the row links to its pillar section. */
  slug: CaseStudySlug;
  pillar: Pillar;
};

/** Claims in the hero's Results list. Each one is a public row of the proof inventory in PRODUCT.md. */
export const results = [
  {
    claim: ["Cut senior review time by ", "80%", " with AI code review."],
    where: "Byggdagboken",
    slug: "ai-code-review",
    pillar: "ai-native",
  },
  {
    claim: ["", "Zero major incidents", " after I introduced new release routines."],
    where: "Byggdagboken",
    slug: "byggdagboken-migration",
    pillar: "architecture",
  },
  {
    claim: ["", "6 partner integrations", " behind one API and webhook layer."],
    where: "Treddy",
    slug: "treddy",
    pillar: "integrations",
  },
] as const satisfies readonly Result[];
