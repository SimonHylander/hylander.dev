import { tools } from "@/content/tools";

/** "Tools I build with": the heading beside a list of tools in three columns, one hairline row each. */
export function ToolsSection() {
  return (
    <section
      id="tools"
      aria-labelledby="tools-heading"
      className="grid scroll-mt-16 gap-10 border-t border-line py-16 md:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] md:gap-16 md:py-24"
    >
      <h2 id="tools-heading" className="text-claim font-semibold tracking-[-0.025em] text-balance">
        Tools I build with
      </h2>
      <ul className="grid grid-cols-2 gap-x-6 self-start border-t border-line sm:grid-cols-3">
        {tools.map((tool) => (
          <li key={tool.name} className="flex h-14 items-center gap-3 border-b border-line">
            <svg aria-hidden viewBox={tool.viewBox} className="size-5 shrink-0 fill-current text-muted">
              <path d={tool.path} fillRule={"evenOdd" in tool ? "evenodd" : undefined} />
            </svg>
            <span className="truncate font-medium">{tool.name}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
