import { HeatmapGrid } from "@/components/heatmap-grid";
import type { ContributionDay } from "@/lib/contributions";

/**
 * "Shipping": Simon's public GitHub contributions for the last 12 months. Renders nothing when
 * `SHOW_HEATMAP` is off or the calendar could not be fetched, which the home loader reports as null.
 */
export function ActivityHeatmap({ days }: { days: ContributionDay[] | null }) {
  if (!days) return null;
  const total = days.reduce((sum, { count }) => sum + count, 0);

  return (
    <section aria-labelledby="shipping-heading" className="pb-16 md:pb-24">
      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 pb-3">
        <h2 id="shipping-heading" className="section-heading">
          Shipping
        </h2>
        <p className="font-mono text-meta text-muted tabular-nums">
          {total.toLocaleString("en")} contributions in 12 months
        </p>
      </div>
      <HeatmapGrid days={days} defaultNote="Most of my code is in private repositories. The projects below describe it." />
    </section>
  );
}
