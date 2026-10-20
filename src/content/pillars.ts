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
    claim: "I have built integrations since 2014.",
    thesis:
      "At Treddy the product called one API. Behind it were BankID, Finnish Trust Network, Stripe, Swish, Ping Payments, nShift and Schenker.",
    showcase: "treddy",
  },
  architecture: {
    claim: "I replaced a PHP monolith one route at a time.",
    thesis:
      "At Byggdagboken a CloudFront Function sent a share of each route's traffic to the new Next.js client. The PHP and Angular.js monolith served the rest.",
    showcase: "byggdagboken-migration",
  },
  "ai-native": {
    claim: "I put AI review in front of human review.",
    thesis: "At Byggdagboken, contributors fixed the AI reviewer's comments before a senior engineer looked at the change.",
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
    claim: ["Built ", "6 partner integrations", " behind one API."],
    where: "Treddy",
    slug: "treddy",
    pillar: "integrations",
  },
] as const satisfies readonly Result[];
