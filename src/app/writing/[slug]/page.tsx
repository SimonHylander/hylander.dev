import { notFound } from "next/navigation";
import { EntryArticle } from "@/components/entry-article";
import { writing } from "@/content/writing";
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

export default async function WritingPage({ params }: PageProps<"/writing/[slug]">) {
  const entry = writing.find((await params).slug);
  if (!entry) notFound();
  return <EntryArticle entry={entry} />;
}
