import { pillarLabels, type Entry } from "@/content/collection";
import { formatDate } from "@/lib/format";

/** Renders one case study or post: header from metadata, MDX body, then the stack. */
export function EntryArticle({ entry }: { entry: Entry }) {
  const { Content } = entry;

  return (
    <article className="space-y-6">
      <header className="space-y-2">
        <p className="text-sm">
          {pillarLabels[entry.pillar]} · <time dateTime={entry.date}>{formatDate(entry.date)}</time>
        </p>
        <h1 className="text-3xl">{entry.title}</h1>
        <p>{entry.summary}</p>
        {entry.metric && (
          <p>
            <strong>{entry.metric}</strong>
          </p>
        )}
      </header>
      <div className="space-y-4">
        <Content />
      </div>
      {entry.stack.length > 0 && (
        <section className="space-y-2">
          <h2>Stack</h2>
          <ul className="flex flex-wrap gap-x-4">
            {entry.stack.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>
      )}
    </article>
  );
}
