import Link from "next/link";
import { notFound } from "next/navigation";
import { BackLink } from "@/components/back-link";
import { WorkArtifactSlot } from "@/components/slots";
import { pillarLabels } from "@/content/collection";
import { work, type CaseStudy } from "@/content/work";
import { formatYears } from "@/lib/format";
import { pageMetadata } from "@/lib/metadata";

export const dynamicParams = false;

export function generateStaticParams() {
  return work.entries.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps<"/work/[slug]">) {
  const entry = work.find((await params).slug);
  if (!entry) notFound();
  return pageMetadata({
    title: entry.title,
    description: entry.summary,
    path: `/work/${entry.slug}`,
    publishedTime: entry.date,
  });
}

// One case study: header and meta from metadata, the MDX body, the stack, then prev/next.
export default async function WorkPage({ params }: PageProps<"/work/[slug]">) {
  const { slug } = await params;
  const index = work.entries.findIndex((entry) => entry.slug === slug);
  const entry = work.entries[index];
  if (!entry) notFound();
  const { Content } = entry;

  const meta = [
    { label: "Role", value: entry.role, className: "text-ink" },
    entry.period && { label: "Years", value: formatYears(entry.period), className: "font-mono text-ink tabular-nums" },
    { label: "Pillar", value: pillarLabels[entry.pillar], className: "text-ink" },
    entry.metric && { label: "Result", value: entry.metric, className: "font-medium text-lilac" },
  ].filter((item) => !!item);

  return (
    <article className="reading pt-10 pb-24 sm:pt-14">
      <BackLink href="/#work">Work</BackLink>

      <header className="mt-8 space-y-3">
        <h1 className="text-hero font-bold tracking-[-0.02em] text-balance sm:text-hero-lg">{entry.title}</h1>
        <p className="max-w-[60ch] text-[1.0625rem] text-muted">{entry.summary}</p>
      </header>

      <dl className="mt-8 grid grid-cols-2 gap-x-6 gap-y-4 border-y border-line py-4 sm:grid-cols-4">
        {meta.map(({ label, value, className }) => (
          <div key={label} className="min-w-0 space-y-0.5">
            <dt className="text-meta text-muted">{label}</dt>
            <dd className={`text-sm ${className}`}>{value}</dd>
          </div>
        ))}
      </dl>

      <WorkArtifactSlot slug={entry.slug} placement="page" />

      <div className="prose mt-10">
        <Content />
      </div>

      {entry.stack.length > 0 && (
        <section aria-labelledby="stack-heading" className="mt-12">
          <h2 id="stack-heading" className="section-heading">
            Stack
          </h2>
          <ul className="mt-3 flex flex-wrap gap-2">
            {entry.stack.map((item) => (
              <li key={item} className="rounded-sm border border-line bg-plum-2 px-2 py-0.5 font-mono text-meta text-ink">
                {item}
              </li>
            ))}
          </ul>
        </section>
      )}

      <CaseStudyPager previous={work.entries[index - 1]} next={work.entries[index + 1]} />
    </article>
  );
}

/** Previous and next case study, in home page order. */
function CaseStudyPager({ previous, next }: { previous?: CaseStudy; next?: CaseStudy }) {
  const links = [
    previous && { entry: previous, label: "Previous", align: "" },
    next && { entry: next, label: "Next", align: "sm:col-start-2 sm:text-right" },
  ].filter((link) => !!link);

  return (
    <nav aria-label="Projects" className="mt-16 grid gap-4 border-t border-line pt-6 sm:grid-cols-2">
      {links.map(({ entry, label, align }) => (
        <Link key={label} href={`/work/${entry.slug}`} className={`group space-y-0.5 ${align}`}>
          <span className="block text-meta text-muted">{label}</span>
          <span className="block font-medium transition-colors duration-200 ease-out group-hover:text-lilac">
            {entry.title}
          </span>
        </Link>
      ))}
    </nav>
  );
}
