import type { SourceId } from "@/lib/ask";
import { AskBox } from "./ask-box";

/**
 * "Ask about my work" on the home page. `sources` is null unless ANTHROPIC_API_KEY is set, and then
 * the section renders nothing. Hidden without JavaScript and in print.
 */
export function AskSection({ sources }: { sources: SourceId[] | null }) {
  if (!sources) return null;

  return (
    <section
      id="ask"
      aria-labelledby="ask-heading"
      data-requires-js
      className="scroll-mt-20 border-t border-line py-16 md:py-24 print:hidden"
    >
      <h2 id="ask-heading" className="text-claim font-semibold tracking-[-0.025em]">
        Ask about my work
      </h2>
      <div className="mt-8 max-w-[44rem]">
        <AskBox sources={sources} />
      </div>
    </section>
  );
}
