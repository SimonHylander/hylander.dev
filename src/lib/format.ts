import type { Job, PartialDate } from "@/content/career";

type Period = Pick<Job, "start" | "end">;

const monthYear = new Intl.DateTimeFormat("en", { month: "short", year: "numeric", timeZone: "UTC" });
const fullDate = new Intl.DateTimeFormat("en", { dateStyle: "medium", timeZone: "UTC" });

/** "2024" stays "2024", "2024-05" becomes "May 2024". */
export function formatPartialDate(date: PartialDate) {
  return date.includes("-") ? monthYear.format(new Date(`${date}-01T00:00:00Z`)) : date;
}

/** "May 2024 – Feb 2026", or "Feb 2026 – present" for a job without an end. */
export function formatPeriod({ start, end }: Period) {
  return `${formatPartialDate(start)} – ${end ? formatPartialDate(end) : "present"}`;
}

/** Year-only period for compact lists: "2024–2026", "2026–now", or "2024" when it starts and ends in one year. */
export function formatYears({ start, end }: Period) {
  const from = start.slice(0, 4);
  const to = end ? end.slice(0, 4) : "now";
  return from === to ? from : `${from}–${to}`;
}

/** Formats an ISO date ("2026-10-19") from entry metadata. */
export function formatDate(isoDate: string) {
  return fullDate.format(new Date(`${isoDate}T00:00:00Z`));
}
