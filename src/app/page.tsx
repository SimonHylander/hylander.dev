import type { Metadata } from "next";
import { AskSection } from "@/components/ask-section";
import { CareerTimeline } from "@/components/career-timeline";
import { ActivityHeatmapSlot } from "@/components/slots";
import { ToolsSection } from "@/components/tools-section";
import { WorkDeck } from "@/components/work-deck";
import { profile } from "@/content/profile";

export const metadata: Metadata = { alternates: { canonical: "/" } };

// Section order follows the content map in PRODUCT.md. Contact is the footer, on every page.
export default function HomePage() {
  const { currentJob } = profile;

  return (
    <>
      <section aria-labelledby="intro" className="pt-16 pb-16 sm:pt-24 md:pb-24">
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
      </section>

      <ActivityHeatmapSlot />

      <div id="work" className="scroll-mt-16">
        <WorkDeck />
      </div>

      <ToolsSection />

      <AskSection />

      <CareerTimeline />
    </>
  );
}
