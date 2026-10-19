import { ActivityHeatmap } from "@/components/activity-heatmap";
import { WorkArtifact, type Placement } from "@/components/artifacts";
import { IntegrationGraph } from "@/components/integration-graph";
import { systems } from "@/content/systems";
import { work, type CaseStudySlug } from "@/content/work";

/*
 * Where the layer-4 interactive pieces plug into the pages. Each one enhances text that already
 * reads without it, and renders nothing when it has nothing to show.
 */

/**
 * Integration graph beside the hero on desktop, below it on mobile. The caption repeats the
 * node-to-case-study relationships as text for screen readers.
 */
export function IntegrationGraphSlot() {
  return (
    <figure className="reveal mx-auto w-full max-w-[300px] shrink-0 [--reveal-step:3] md:mx-0 md:w-[17rem]">
      <IntegrationGraph
        label={`Systems I have integrated: ${systems.map(({ label }) => label).join(", ")}. Hover or focus one to highlight its work below.`}
      />
      <figcaption className="sr-only">
        <ul>
          {systems.map(({ id, label, work: slugs }) => (
            <li key={id}>
              {label}:{" "}
              {slugs.length > 0 ? slugs.map((slug) => work.find(slug)?.title).join(", ") : "no public case study yet"}
            </li>
          ))}
        </ul>
      </figcaption>
    </figure>
  );
}

/** Activity heatmap, between the hero and Selected work. */
export function ActivityHeatmapSlot() {
  return <ActivityHeatmap />;
}

/** Per-case-study artifact: inside the expanded home row and above the case study prose. */
export function WorkArtifactSlot({ slug, placement }: { slug: CaseStudySlug; placement: Placement }) {
  return <WorkArtifact slug={slug} placement={placement} />;
}
