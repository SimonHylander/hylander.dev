import { ActivityHeatmap } from "@/components/activity-heatmap";
import { WorkArtifact, type Placement } from "@/components/artifacts";
import type { CaseStudySlug } from "@/content/work";
import type { ContributionDay } from "@/lib/contributions";

/*
 * Where the interactive pieces plug into the pages. Each one enhances text that already reads
 * without it, and renders nothing when it has nothing to show.
 */

/** Activity heatmap, between the hero and the work. Hidden when `SHOW_HEATMAP` is false. */
export function ActivityHeatmapSlot({ days }: { days: ContributionDay[] | null }) {
  return <ActivityHeatmap days={days} />;
}

/** Per-case-study artifact, above the case study prose. */
export function WorkArtifactSlot({ slug, placement }: { slug: CaseStudySlug; placement: Placement }) {
  return <WorkArtifact slug={slug} placement={placement} />;
}
