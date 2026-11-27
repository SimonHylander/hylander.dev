import { AgentLoop } from "./agent-loop";

/** "How I work with AI": the heading and one paragraph beside the Grok to T3 Code loop. */
export function AiWorkflowSection() {
  return (
    <section
      id="ai"
      aria-labelledby="ai-heading"
      className="grid scroll-mt-16 gap-10 border-t border-line py-16 md:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] md:gap-16 md:py-24"
    >
      <div>
        <h2 id="ai-heading" className="text-claim font-semibold tracking-[-0.025em] text-balance">
          How I work with AI
        </h2>
        <p className="mt-5 max-w-[38ch] text-muted">
          My Grok bots run the work, and each one does its part in its own T3 Code thread. Nothing merges until code
          review passes and QA has checked the change in the browser.
        </p>
      </div>
      <AgentLoop />
    </section>
  );
}
