import Link from "next/link";
import { career, type PartialDate } from "@/content/career";
import { formatYears } from "@/lib/format";

const year = (date: PartialDate) => Number(date.slice(0, 4));
const first = Math.min(...career.map(({ start }) => year(start)));
const now = new Date().getFullYear();
// The axis runs two years past the current one, so the current job has room for its label.
const last = now + 2;

/**
 * Career on the home page: one column per year from the first job, each job spanning its years,
 * oldest first. The current job runs to the end of the axis. Below `md` it is a plain list.
 */
export function CareerTimeline() {
  const jobs = career.toReversed();

  return (
    <section id="career" aria-labelledby="career-heading" className="scroll-mt-20 border-t border-line py-16 md:py-24">
      <div className="flex items-baseline justify-between gap-4">
        <h2 id="career-heading" className="text-claim font-semibold tracking-[-0.025em]">
          {now - first} years, {career.length} companies
        </h2>
        <Link
          href="/cv"
          className="shrink-0 rounded-md border border-line px-3.5 py-2 text-sm font-medium transition-colors duration-200 ease-out hover:border-muted hover:bg-plum-2"
        >
          Full CV
        </Link>
      </div>
      <ol
        style={{ gridTemplateColumns: `repeat(${last - first}, minmax(0, 1fr))` }}
        className="mt-10 flex flex-col gap-6 md:grid md:gap-0"
      >
        {jobs.map((job) => {
          const span = `${year(job.start) - first + 1} / ${(job.end ? year(job.end) : last) - first + 1}`;
          return (
            <li
              key={`${job.company}-${job.start}`}
              style={{ gridColumn: span }}
              className="grid grid-cols-[minmax(0,1fr)_auto] gap-x-3 md:block md:border-l md:border-line md:px-3"
            >
              <span
                aria-hidden
                className={`col-span-2 mb-3 block h-1.5 rounded-full ${job.end ? "bg-plum-3" : "bg-lilac"}`}
              />
              <span className="block font-medium">{job.company}</span>
              <span className="col-start-1 block text-sm text-muted">{job.role}</span>
              <span className="col-start-2 row-start-2 block font-mono text-meta text-muted tabular-nums md:mt-1.5">
                {formatYears(job)}
              </span>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
