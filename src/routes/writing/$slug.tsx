import { createFileRoute, notFound } from "@tanstack/react-router";
import { BackLink } from "@/components/back-link";
import { writing } from "@/content/writing";
import { formatDate } from "@/lib/format";
import { pageHead } from "@/lib/metadata";

export const Route = createFileRoute("/writing/$slug")({
  loader: ({ params }) => {
    const entry = writing.find(params.slug);
    if (!entry) throw notFound();
    return entry.slug;
  },
  head: ({ loaderData: slug }) => {
    const entry = slug === undefined ? undefined : writing.find(slug);
    if (!entry) return {};
    return pageHead({
      title: entry.title,
      description: entry.summary,
      path: `/writing/${entry.slug}`,
      publishedTime: entry.date,
    });
  },
  component: WritingPage,
});

// One post: title, date and summary, then the MDX body.
function WritingPage() {
  const entry = writing.find(Route.useLoaderData());
  if (!entry) throw notFound();
  const { Content } = entry;

  return (
    <article className="reading pt-10 pb-24 sm:pt-14">
      <BackLink link={{ to: "/", hash: "writing" }}>Writing</BackLink>
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
