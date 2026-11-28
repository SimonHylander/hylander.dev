import { AgentLoop } from "./agent-loop";

/** "How I work with AI": the heading and one paragraph beside the Grok to T3 Code loop. */
export function AiWorkflowSection() {
  return (
    <section
      id="ai"
      aria-labelledby="ai-heading"
      className="grid scroll-mt-16 gap-10 border-t border-line py-16 md:py-24 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-16"
    >
      <div>
        <h2 id="ai-heading" className="text-claim font-semibold tracking-[-0.025em] text-balance">
          How I work with AI
        </h2>
        <p className="mt-5 max-w-[38ch] text-muted">
          I use a team of Grok bots that plans work and hands it to my remote T3 Code environments. They build and
          verify each planned change end to end, so I can spend my time on the decisions that need me.
        </p>
      </div>
      <AgentLoop />
    </section>
  );
}
