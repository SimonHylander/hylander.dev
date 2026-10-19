import type { Metadata } from "next";
import Link from "next/link";
import { AskSection } from "@/components/ask-section";
import { ActivityHeatmapSlot, IntegrationGraphSlot, WorkArtifactSlot } from "@/components/slots";
import { WorkRow } from "@/components/work-row";
import { career, currentJob } from "@/content/career";
import { profile } from "@/content/profile";
import { work } from "@/content/work";
import { writing } from "@/content/writing";
import { formatDate, formatYears } from "@/lib/format";

export const metadata: Metadata = { alternates: { canonical: "/" } };

// Section order follows the content map in PRODUCT.md. Contact lives in the footer.
export default function HomePage() {
  return (
    <>
      <section aria-labelledby="intro" className="flex flex-col gap-10 pt-14 pb-4 sm:pt-20 md:flex-row md:items-center md:gap-8">
        <div className="max-w-[36rem] space-y-5">
          <p className="reveal font-medium text-muted">
            {profile.name}
          </p>
          <h1
            id="intro"
            className="reveal text-hero font-bold tracking-[-0.02em] text-balance text-ink [--reveal-step:1] sm:text-hero-lg"
          >
            {profile.positioning}
          </h1>
          <p className="reveal flex items-center gap-3 text-muted [--reveal-step:2]">
            <span aria-hidden className="ping relative size-2 shrink-0 rounded-full bg-lilac" />
            <span>
              <span className="text-ink">Now</span> {currentJob.team} at {currentJob.company}, {profile.location}
            </span>
          </p>
        </div>
        <IntegrationGraphSlot />
      </section>

      <ActivityHeatmapSlot />

      <section id="work" aria-labelledby="work-heading" className="mt-16 scroll-mt-8">
        <h2 id="work-heading" className="section-heading pb-2">
          Selected work
        </h2>
        <ul className="border-t border-line">
          {work.entries.map((entry) => (
            <WorkRow
              key={entry.slug}
              slug={entry.slug}
              title={entry.title}
              tagline={entry.tagline}
              summary={entry.summary}
              years={entry.period && formatYears(entry.period)}
            >
              <WorkArtifactSlot slug={entry.slug} placement="row" />
            </WorkRow>
          ))}
        </ul>
      </section>

      <section id="writing" aria-labelledby="writing-heading" className="mt-16 scroll-mt-8">
        <h2 id="writing-heading" className="section-heading pb-2">
          Writing
        </h2>
        {writing.entries.length > 0 ? (
          <ul className="border-t border-line">
            {writing.entries.map((entry) => (
              <li key={entry.slug} className="border-b border-line">
                <Link
                  href={`/writing/${entry.slug}`}
                  className="flex items-baseline justify-between gap-4 py-3.5 transition-colors duration-200 ease-out hover:text-lilac"
                >
                  <span className="font-medium">{entry.title}</span>
                  <time dateTime={entry.date} className="font-mono text-meta text-muted tabular-nums">
                    {formatDate(entry.date)}
                  </time>
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-muted">Nothing published yet.</p>
        )}
      </section>

      <AskSection />

      <section id="career" aria-labelledby="career-heading" className="mt-16 scroll-mt-8">
        <h2 id="career-heading" className="section-heading pb-2">
          Career
        </h2>
        <ul className="border-t border-line">
          {career.map((job) => (
            <li
              key={`${job.company}-${job.start}`}
              className="grid grid-cols-[minmax(0,1fr)_auto] items-baseline gap-x-4 border-b border-line py-3"
            >
              <span className="flex flex-wrap items-baseline gap-x-3">
                <span className="font-medium">{job.company}</span>
                <span className="text-sm text-muted">{job.role}</span>
              </span>
              <span className="font-mono text-meta text-muted tabular-nums">{formatYears(job)}</span>
            </li>
          ))}
        </ul>
        <Link href="/cv" className="link mt-4 inline-block text-sm">
          Full CV <span aria-hidden>→</span>
        </Link>
      </section>
    </>
  );
}
