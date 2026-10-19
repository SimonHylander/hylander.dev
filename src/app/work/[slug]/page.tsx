import { notFound } from "next/navigation";
import { EntryArticle } from "@/components/entry-article";
import { work } from "@/content/work";
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

export default async function WorkPage({ params }: PageProps<"/work/[slug]">) {
  const entry = work.find((await params).slug);
  if (!entry) notFound();
  return <EntryArticle entry={entry} />;
}
