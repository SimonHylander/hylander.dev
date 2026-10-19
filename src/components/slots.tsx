import type { FC } from "react";
import type { CaseStudy } from "@/content/work";

/*
 * Reserved places for the layer-4 interactive pieces. Each renders nothing today, so the pages
 * read complete without them. Fill one in place; the pages already render it where it belongs.
 */

/** Integration graph, beside the hero on desktop. */
export function IntegrationGraphSlot() {
  return null;
}

/** Activity heatmap, between the hero and Selected work. */
export function ActivityHeatmapSlot() {
  return null;
}

/** Per-case-study artifact: inside the expanded home row and above the case study prose. */
export const WorkArtifactSlot: FC<Pick<CaseStudy, "slug">> = () => null;
