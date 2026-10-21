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
    claim: "Platforms that connect a product to its partners and providers.",
    thesis: "At Treddy I designed the partner platform: one API for identity, payments and shipping, and webhooks for partners.",
    showcase: "treddy",
  },
  architecture: {
    claim: "Web platforms that change stack while they stay live.",
    thesis:
      "At Byggdagboken I led the move from a PHP monolith to Next.js, along with a backend for the native apps and one sign-in across them.",
    showcase: "byggdagboken-migration",
  },
  "ai-native": {
    claim: "AI tools for engineering teams and for the people using the product.",
    thesis:
      "I introduced AI code review at Byggdagboken and built Uppgraderingspaket, an AI price-matching search for PC hardware.",
    showcase: "ai-code-review",
  },
} satisfies Record<Pillar, PillarCopy>;
