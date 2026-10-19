import type { ComponentType } from "react";
import { IntegrationGraph } from "@/components/integration-graph";
import { systems } from "@/content/systems";
import type { CaseStudySlug } from "@/content/work";
import { CanarySplit } from "./canary-split";
import { RagPipeline } from "./rag-pipeline";
import { ReviewToggle } from "./review-toggle";

/** Where an artifact renders: inside an open row on the home page, or above the case study prose. */
export type Placement = "row" | "page";

type Artifact = {
  title: string;
  /** Mono label at the right of the header. */
  hint: string;
  Body: ComponentType<{ placement: Placement }>;
};

const treddyPartners = systems.filter(({ work }) => work.includes("treddy"));
const partnerLabels = treddyPartners.map(({ label }) => label);

/**
 * Treddy: the home row points at the graph above it, the case study shows a graph of only the
 * Treddy partners.
 */
function TreddyPartners({ placement }: { placement: Placement }) {
  if (placement === "row") {
    return (
      <p className="text-sm text-muted">
        Hover or focus {new Intl.ListFormat("en-GB", { type: "disjunction" }).format(partnerLabels)} in the graph
        above.
      </p>
    );
  }
  return (
    <div className="mx-auto max-w-[300px] py-2">
      <IntegrationGraph
        only={treddyPartners.map(({ id }) => id)}
        label={`Treddy partner integrations: ${partnerLabels.join(", ")}.`}
      />
    </div>
  );
}

/** One small interactive piece per case study. A case study without an entry renders none. */
const artifacts: Partial<Record<CaseStudySlug, Artifact>> = {
  treddy: {
    title: "Partner integrations",
    hint: partnerLabels.join(" · "),
    Body: TreddyPartners,
  },
  "byggdagboken-migration": { title: "Route-level canary", hint: "/projects", Body: CanarySplit },
  "ai-code-review": { title: "Senior review time", hint: "before / after", Body: ReviewToggle },
  uppgraderingspaket: { title: "Price matching", hint: "RAG pipeline", Body: RagPipeline },
};

/** The artifact for `slug` in a plum-2 panel with a title and a mono hint. */
export function WorkArtifact({ slug, placement }: { slug: CaseStudySlug; placement: Placement }) {
  const artifact = artifacts[slug];
  if (!artifact) return null;
  const { title, hint, Body } = artifact;
  // Rows already use h3 for the title. On the case study page the artifact sits beside the prose h2s.
  const Heading = placement === "row" ? "h4" : "h2";

  return (
    <div className={`rounded-md bg-plum-2 px-4 py-4 sm:px-[18px] ${placement === "page" ? "mt-8" : ""}`}>
      <div className="mb-3 flex items-baseline justify-between gap-3">
        <Heading className="text-sm text-ink">{title}</Heading>
        <span className="font-mono text-meta text-muted">{hint}</span>
      </div>
      <Body placement={placement} />
    </div>
  );
}
