import { HeatmapGrid } from "@/components/heatmap-grid";
import { profile, SHOW_HEATMAP } from "@/content/profile";
import { getContributions } from "@/lib/contributions";

const github = profile.socials.find(({ label }) => label === "GitHub");

/**
 * "Shipping": Simon's public GitHub contributions for the last 12 months. Renders nothing when
 * `SHOW_HEATMAP` is off or the calendar could not be fetched.
 */
export async function ActivityHeatmap() {
  if (!SHOW_HEATMAP || !github) return null;
  const days = await getContributions(new URL(github.href).pathname.slice(1));
  if (!days) return null;
  const total = days.reduce((sum, { count }) => sum + count, 0);

  return (
    <section aria-labelledby="shipping-heading" className="mt-16">
      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 pb-3">
        <h2 id="shipping-heading" className="section-heading">
          Shipping
        </h2>
        <p className="font-mono text-meta text-muted tabular-nums">
          {total.toLocaleString("en")} contributions in 12 months
        </p>
      </div>
      <HeatmapGrid days={days} defaultNote="Most of my code is in private repositories. The case studies below describe it." />
    </section>
  );
}
