import type { ComponentType } from "react";
import { PartnerGraph } from "@/components/partner-graph";
import type { CaseStudySlug } from "@/content/work";
import { CanarySplit } from "./canary-split";
import { RagPipeline } from "./rag-pipeline";
import { ReviewToggle } from "./review-toggle";

/** Where an artifact renders: beside a pillar section on the home page, or above the case study prose. */
export type Placement = "home" | "page";

type Artifact = {
  title: string;
  /** Mono label at the right of the header. */
  hint: string;
  Body: ComponentType;
};

/** One small interactive piece per case study. A case study without an entry renders none. */
const artifacts: Partial<Record<CaseStudySlug, Artifact>> = {
  treddy: { title: "Behind the Treddy API", hint: "hover a partner", Body: PartnerGraph },
  "byggdagboken-migration": { title: "Route-level canary", hint: "/projects", Body: CanarySplit },
  "ai-code-review": { title: "Senior review time", hint: "per change", Body: ReviewToggle },
  uppgraderingspaket: { title: "Price matching", hint: "RAG pipeline", Body: RagPipeline },
};

/** The artifact for `slug` in a plum-2 panel with a title and a mono hint. */
export function WorkArtifact({ slug, placement }: { slug: CaseStudySlug; placement: Placement }) {
  const artifact = artifacts[slug];
  if (!artifact) return null;
  const { title, hint, Body } = artifact;
  // On the home page the panel sits under the section's h2. On the case study page it sits beside the prose h2s.
  const Heading = placement === "home" ? "h3" : "h2";

  return (
    <div className={`rounded-lg bg-plum-2 p-5 sm:p-6 ${placement === "page" ? "mt-8" : ""}`}>
      <div className="mb-5 flex items-baseline justify-between gap-3">
        <Heading className="text-sm font-medium text-ink">{title}</Heading>
        <span className="font-mono text-meta text-muted">{hint}</span>
      </div>
      <Body />
    </div>
  );
}
