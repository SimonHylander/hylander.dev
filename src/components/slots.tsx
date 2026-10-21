import { ActivityHeatmap } from "@/components/activity-heatmap";
import { WorkArtifact, type Placement } from "@/components/artifacts";
import type { CaseStudySlug } from "@/content/work";

/*
 * Where the interactive pieces plug into the pages. Each one enhances text that already reads
 * without it, and renders nothing when it has nothing to show.
 */

/** Activity heatmap, between the hero and the work. Hidden when `SHOW_HEATMAP` is false. */
export function ActivityHeatmapSlot() {
  return <ActivityHeatmap />;
}

/** Per-case-study artifact: beside its pillar section on the home page and above the case study prose. */
export function WorkArtifactSlot({ slug, placement }: { slug: CaseStudySlug; placement: Placement }) {
  return <WorkArtifact slug={slug} placement={placement} />;
}
