import { notFound } from "next/navigation";
import { BackLink } from "@/components/back-link";
import { writing } from "@/content/writing";
import { formatDate } from "@/lib/format";
import { pageMetadata } from "@/lib/metadata";

export const dynamicParams = false;

export function generateStaticParams() {
  return writing.entries.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps<"/writing/[slug]">) {
  const entry = writing.find((await params).slug);
  if (!entry) notFound();
  return pageMetadata({
    title: entry.title,
    description: entry.summary,
    path: `/writing/${entry.slug}`,
    publishedTime: entry.date,
  });
}

// One post: title, date and summary, then the MDX body.
export default async function WritingPage({ params }: PageProps<"/writing/[slug]">) {
  const entry = writing.find((await params).slug);
  if (!entry) notFound();
  const { Content } = entry;

  return (
    <article className="pt-10 sm:pt-14">
      <BackLink href="/#writing">Writing</BackLink>
      <header className="mt-8 space-y-3">
        <time dateTime={entry.date} className="block font-mono text-meta text-muted">
          {formatDate(entry.date)}
        </time>
        <h1 className="text-hero font-bold tracking-[-0.02em] text-balance sm:text-hero-lg">{entry.title}</h1>
        <p className="max-w-[60ch] text-[1.0625rem] text-muted">{entry.summary}</p>
      </header>
      <div className="prose mt-10 border-t border-line pt-8">
        <Content />
      </div>
    </article>
  );
}
