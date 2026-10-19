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
    <section id="ask" aria-labelledby="ask-heading" data-requires-js className="mt-16 scroll-mt-8 print:hidden">
      <h2 id="ask-heading" className="section-heading pb-2">
        Ask about my work
      </h2>
      <AskBox sources={askSourceIds} />
    </section>
  );
}
