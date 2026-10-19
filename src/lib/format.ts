import type { Job, PartialDate } from "@/content/career";

const monthYear = new Intl.DateTimeFormat("en", { month: "short", year: "numeric", timeZone: "UTC" });
const fullDate = new Intl.DateTimeFormat("en", { dateStyle: "medium", timeZone: "UTC" });

/** "2024" stays "2024", "2024-05" becomes "May 2024". */
export function formatPartialDate(date: PartialDate) {
  return date.includes("-") ? monthYear.format(new Date(`${date}-01T00:00:00Z`)) : date;
}

/** "May 2024 – Feb 2026", or "Feb 2026 – present" for a job without an end. */
export function formatPeriod({ start, end }: Pick<Job, "start" | "end">) {
  return `${formatPartialDate(start)} – ${end ? formatPartialDate(end) : "present"}`;
}

/** Formats an ISO date ("2026-10-19") from entry metadata. */
export function formatDate(isoDate: string) {
  return fullDate.format(new Date(`${isoDate}T00:00:00Z`));
}
