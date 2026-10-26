import { tools } from "@/content/tools";

/** "Tools I build with": the heading beside a grid of one tile per tool, marks in ink. */
export function ToolsSection() {
  return (
    <section
      id="tools"
      aria-labelledby="tools-heading"
      className="grid scroll-mt-16 gap-10 border-t border-line py-16 md:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] md:gap-16 md:py-24"
    >
      <h2 id="tools-heading" className="text-claim font-semibold tracking-[-0.025em] text-balance">
        Tools I build with.
      </h2>
      <ul className="grid grid-cols-3 gap-3 sm:gap-4">
        {tools.map((tool) => (
          <li
            key={tool.name}
            className="group flex aspect-[5/4] flex-col items-center justify-center gap-3 rounded-lg border border-line bg-plum-2 p-3 transition-colors duration-200 ease-out hover:border-muted"
          >
            <svg
              aria-hidden
              viewBox={tool.viewBox}
              className="size-8 fill-current text-ink transition-colors duration-200 ease-out group-hover:text-lilac sm:size-9"
            >
              <path d={tool.path} fillRule={"evenOdd" in tool ? "evenodd" : undefined} />
            </svg>
            <span className="text-center text-sm font-medium">{tool.name}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
