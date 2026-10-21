import { askSourceIds } from "@/lib/ask-sources";
import { env } from "@/lib/env";
import { AskBox } from "./ask-box";

/**
 * "Ask about my work" on the home page. Renders nothing unless ANTHROPIC_API_KEY is set. The home
 * page is static, so the check runs at build time. Hidden without JavaScript and in print.
 */
export function AskSection() {
  if (!env.ANTHROPIC_API_KEY) return null;

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
        <AskBox sources={askSourceIds} />
      </div>
    </section>
  );
}
