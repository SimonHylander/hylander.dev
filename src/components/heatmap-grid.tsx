"use client";

import { useRef, useState, type KeyboardEvent } from "react";
import type { ContributionDay } from "@/lib/contributions";

const levelColors = [
  "bg-plum-2",
  "bg-[oklch(0.42_0.07_304)]",
  "bg-[oklch(0.55_0.09_305)]",
  "bg-[oklch(0.7_0.1_306)]",
  "bg-lilac",
] as const;

const dayFormat = new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" });

const describe = ({ date, count }: ContributionDay) =>
  `${count.toLocaleString("en")} ${count === 1 ? "contribution" : "contributions"} on ${dayFormat.format(new Date(`${date}T00:00:00Z`))}`;

// Arrow keys move a day (up, down) or a week (left, right), like the grid reads.
const steps: Partial<Record<string, number>> = { ArrowUp: -1, ArrowDown: 1, ArrowLeft: -7, ArrowRight: 7 };

/**
 * The contribution calendar as a 7-row table, one column per week, Sunday on top. Hovering or
 * focusing a day writes its count into the note below. The grid is one tab stop; arrow keys move
 * inside it. The scroller is right-to-left, so on narrow screens it opens on the latest week
 * without JavaScript.
 */
export function HeatmapGrid({ days, defaultNote }: { days: readonly ContributionDay[]; defaultNote: string }) {
  const [note, setNote] = useState<string | null>(null);
  const [active, setActive] = useState(days.length - 1);
  const tableRef = useRef<HTMLTableElement>(null);

  const offset = days[0] ? new Date(`${days[0].date}T00:00:00Z`).getUTCDay() : 0;
  const weeks = Math.ceil((offset + days.length) / 7);
  const rows = Array.from({ length: 7 }, (_, weekday) =>
    Array.from({ length: weeks }, (_, week) => week * 7 + weekday - offset),
  );

  const show = (index: number) => {
    const day = days[index];
    if (day) setNote(describe(day));
  };

  const onKeyDown = (event: KeyboardEvent) => {
    const step = event.key === "Home" ? -active : event.key === "End" ? days.length - 1 - active : steps[event.key];
    if (step === undefined) return;
    event.preventDefault();
    const next = Math.min(days.length - 1, Math.max(0, active + step));
    setActive(next);
    tableRef.current?.querySelector<HTMLElement>(`[data-index="${next}"]`)?.focus();
  };

  return (
    <>
      <div dir="rtl" className="overflow-x-auto [scrollbar-width:none]">
        <table
          ref={tableRef}
          dir="ltr"
          role="grid"
          aria-label="Contributions per day, one column per week"
          onKeyDown={onKeyDown}
          onMouseLeave={() => setNote(null)}
          onBlur={(event) => {
            if (!event.currentTarget.contains(event.relatedTarget)) setNote(null);
          }}
          className="mr-auto -ml-[2px] w-max border-separate border-spacing-[2px]"
        >
          <tbody>
            {rows.map((row, weekday) => (
              <tr key={weekday}>
                {row.map((index) => {
                  const day = days[index];
                  if (!day) return <td key={index} className="size-[9px] min-w-[9px] p-0" />;
                  return (
                    <td
                      key={day.date}
                      data-index={index}
                      tabIndex={index === active ? 0 : -1}
                      aria-label={describe(day)}
                      onMouseEnter={() => show(index)}
                      onFocus={() => {
                        setActive(index);
                        show(index);
                      }}
                      className={`size-[9px] min-w-[9px] rounded-[2px] p-0 hover:outline hover:outline-1 hover:outline-offset-0 hover:outline-ink ${levelColors[day.level]}`}
                    />
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-2.5 min-h-[2lh] text-sm text-muted sm:min-h-[1lh]">
        {note ?? defaultNote}
      </p>
    </>
  );
}
