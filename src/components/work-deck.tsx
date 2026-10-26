import Link from "next/link";
import { WorkArtifact, WorkArtifactPreview } from "@/components/artifacts";
import { pillarLabels } from "@/content/collection";
import { work, type CaseStudy } from "@/content/work";
import { formatYears } from "@/lib/format";
import { WorkDeckViewer } from "./work-deck-viewer";

const count = work.entries.length;
const position = (index: number) => `${String(index + 1).padStart(2, "0")} / ${String(count).padStart(2, "0")}`;

/**
 * Every case study as a card on a horizontal track. Each card links to its case study. With
 * JavaScript, a click opens the larger detail view in a dialog instead (see WorkDeckViewer).
 */
export function WorkDeck() {
  return (
    <section aria-labelledby="deck-heading" className="border-t border-line py-16 md:py-24">
      <WorkDeckViewer
        heading={
          <h2 id="deck-heading" className="text-claim font-semibold tracking-[-0.025em] text-balance">
            Projects. <span className="text-muted">Open one to see it working.</span>
          </h2>
        }
        items={work.entries.map((entry, index) => ({
          slug: entry.slug,
          title: entry.title,
          card: <Card entry={entry} index={index} />,
          summary: <Summary entry={entry} index={index} />,
          detail: <Detail entry={entry} index={index} />,
        }))}
      />
    </section>
  );
}

/** Card face: position and pillar, the artifact preview, then title, tagline, company and years. */
function Card({ entry, index }: { entry: CaseStudy; index: number }) {
  return (
    <>
      <span className="flex justify-between px-1 pb-3 font-mono text-meta text-muted tabular-nums">
        <span>{position(index)}</span>
        <span>{pillarLabels[entry.pillar]}</span>
      </span>
      <span className="grid aspect-[4/3] place-items-center overflow-hidden rounded-md bg-plum p-3">
        <WorkArtifactPreview slug={entry.slug} />
      </span>
      <span className="flex flex-1 flex-col px-1 pt-4">
        <span className="text-title font-semibold transition-colors duration-200 ease-out group-hover:text-lilac">
          {entry.title}
        </span>
        <span className="mt-1 text-sm text-muted">{entry.tagline}</span>
        <span className="mt-auto flex items-baseline justify-between gap-4 pt-5 text-sm text-muted">
          <span>
            {entry.company}
            {entry.period && <span className="font-mono text-meta tabular-nums">, {formatYears(entry.period)}</span>}
          </span>
          <span
            aria-hidden
            className="transition-[translate,color] duration-300 ease-out group-hover:translate-x-0.5 group-hover:text-lilac"
          >
            →
          </span>
        </span>
      </span>
    </>
  );
}

/** Side panel text for the front card on the helix. The viewer adds the Open button below it. */
function Summary({ entry, index }: { entry: CaseStudy; index: number }) {
  return (
    <>
      <p className="flex justify-between font-mono text-meta text-muted tabular-nums">
        <span>{position(index)}</span>
        {entry.period && <span>{formatYears(entry.period)}</span>}
      </p>
      <p className="mt-4 font-mono text-meta text-muted">
        {pillarLabels[entry.pillar]} · {entry.company}
      </p>
      <h3 className="mt-2 text-[1.75rem]/tight font-semibold tracking-[-0.02em] text-pretty">{entry.title}</h3>
      <p className="mt-2 text-muted">{entry.tagline}</p>
      {entry.metric && <p className="mt-5 border-t border-line pt-4 text-sm font-medium text-lilac">{entry.metric}</p>}
    </>
  );
}

/** The larger view: the live artifact beside the summary, the meta, the stack and a link to the full case study. */
function Detail({ entry, index }: { entry: CaseStudy; index: number }) {
  const meta = [
    { label: "Role", value: entry.role, className: "text-ink" },
    entry.period && {
      label: "Years",
      value: formatYears(entry.period),
      className: "font-mono text-ink tabular-nums",
    },
    entry.metric && {
      label: "Result",
      value: entry.metric,
      className: "font-medium text-lilac",
    },
  ].filter((item) => !!item);

  return (
    <div className="grid gap-8 md:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] md:gap-10">
      <div className="md:order-2">
        <p className="font-mono text-meta text-muted tabular-nums">
          {position(index)} · {pillarLabels[entry.pillar]}
        </p>
        <h2 id={`deck-${entry.slug}`} className="mt-3 text-claim font-semibold tracking-[-0.025em] text-balance">
          {entry.title}
        </h2>
        <p className="mt-4 text-[1.0625rem] text-muted">{entry.summary}</p>
        <dl className="mt-6 grid grid-cols-2 gap-x-6 gap-y-4 border-y border-line py-4">
          {meta.map(({ label, value, className }) => (
            <div key={label} className="min-w-0 space-y-0.5">
              <dt className="text-meta text-muted">{label}</dt>
              <dd className={`text-sm ${className}`}>{value}</dd>
            </div>
          ))}
        </dl>
        {entry.stack.length > 0 && (
          <ul aria-label="Stack" className="mt-5 flex flex-wrap gap-2">
            {entry.stack.map((item) => (
              <li
                key={item}
                className="rounded-sm border border-line bg-plum-2 px-2 py-0.5 font-mono text-meta text-ink"
              >
                {item}
              </li>
            ))}
          </ul>
        )}
        <Link
          href={`/work/${entry.slug}`}
          className="mt-7 inline-flex rounded-md bg-lilac px-4 py-2.5 font-medium text-plum transition-[filter] duration-200 ease-out hover:brightness-110"
        >
          Read the case study →
        </Link>
      </div>
      <div className="md:order-1">
        <WorkArtifact slug={entry.slug} placement="home" />
      </div>
    </div>
  );
}
