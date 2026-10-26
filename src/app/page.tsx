import type { Metadata } from "next";
import Link from "next/link";
import { AskSection } from "@/components/ask-section";
import { CareerTimeline } from "@/components/career-timeline";
import { ActivityHeatmapSlot } from "@/components/slots";
import { WorkDeck } from "@/components/work-deck";
import { profile } from "@/content/profile";
import { work } from "@/content/work";
import { writing } from "@/content/writing";
import { formatDate, formatYears } from "@/lib/format";

export const metadata: Metadata = { alternates: { canonical: "/" } };

// Section order follows the content map in PRODUCT.md. Contact is the footer, on every page.
export default function HomePage() {
  const { currentJob } = profile;

  return (
    <>
      <section
        aria-labelledby="intro"
        className="grid gap-14 pt-16 pb-16 sm:pt-24 md:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] md:items-end md:gap-16 md:pb-24 lg:gap-20"
      >
        <div>
          <h1 id="intro" className="reveal text-display font-semibold tracking-[-0.03em] text-balance">
            {profile.headline.lead} <span className="text-lilac">{profile.headline.accent}</span>
          </h1>
          <p className="reveal mt-7 text-lg text-muted [--reveal-step:1]">
            <span className="font-medium text-ink">{profile.name}</span>. {profile.role} in {profile.location}.
          </p>
          <p className="reveal mt-2.5 flex items-center gap-3 text-lg text-muted [--reveal-step:2]">
            <span aria-hidden className="ping relative size-2 shrink-0 rounded-full bg-lilac" />
            <span>
              Now on {currentJob.team} at {currentJob.company}
            </span>
          </p>
          <p className="reveal mt-9 flex flex-wrap gap-3 [--reveal-step:3]">
            <a
              href="#work"
              className="rounded-md bg-lilac px-4 py-2.5 font-medium text-plum transition-[filter] duration-200 ease-out hover:brightness-110"
            >
              See the work
            </a>
            <a
              href="#contact"
              className="rounded-md border border-line px-4 py-2.5 font-medium transition-colors duration-200 ease-out hover:border-muted hover:bg-plum-2"
            >
              Get in touch
            </a>
          </p>
        </div>
        <Built />
      </section>

      <ActivityHeatmapSlot />

      <div id="work" className="scroll-mt-16">
        <WorkDeck />
      </div>

      {writing.entries.length > 0 && (
        <section id="writing" aria-labelledby="writing-heading" className="scroll-mt-20 border-t border-line py-16 md:py-24">
          <h2 id="writing-heading" className="text-claim font-semibold tracking-[-0.025em]">
            Writing
          </h2>
          <ul className="mt-8 max-w-[44rem] border-t border-line">
            {writing.entries.map((entry) => (
              <li key={entry.slug} className="border-b border-line">
                <Link
                  href={`/writing/${entry.slug}`}
                  className="flex items-baseline justify-between gap-4 py-4 transition-colors duration-200 ease-out hover:text-lilac"
                >
                  <span className="font-medium">{entry.title}</span>
                  <time dateTime={entry.date} className="font-mono text-meta text-muted tabular-nums">
                    {formatDate(entry.date)}
                  </time>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      <AskSection />

      <CareerTimeline />
    </>
  );
}

/** Everything in `work`, one line each, beside the hero. Each row opens its case study. */
function Built() {
  return (
    <section aria-labelledby="built-heading">
      <h2 id="built-heading" className="reveal section-heading pb-3.5 [--reveal-step:3]">
        What I have built
      </h2>
      <ul className="reveal border-t border-line [--reveal-step:4]">
        {work.entries.map((entry) => (
          <li key={entry.slug} className="border-b border-line">
            <Link
              href={`/work/${entry.slug}`}
              className="group grid grid-cols-[minmax(0,1fr)_auto] items-center gap-x-4 py-[1.125rem]"
            >
              <span className="text-[1.0625rem]/snug transition-colors duration-200 ease-out group-hover:text-lilac">
                {entry.tagline}
              </span>
              <span
                aria-hidden
                className="row-span-2 text-muted transition-[translate,color] duration-300 ease-out group-hover:translate-x-0.5 group-hover:text-lilac"
              >
                →
              </span>
              <span className="mt-1 text-sm text-muted">
                {entry.company}
                {entry.period && `, ${formatYears(entry.period)}`}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
