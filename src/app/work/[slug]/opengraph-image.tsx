import { notFound } from "next/navigation";
import { pillarLabels } from "@/content/collection";
import { profile } from "@/content/profile";
import { work } from "@/content/work";
import { ogImageSize, renderOgImage } from "@/lib/og-image";

export const alt = `Case study by ${profile.name}`;
export const size = ogImageSize;
export const contentType = "image/png";

export function generateStaticParams() {
  return work.entries.map(({ slug }) => ({ slug }));
}

export default async function OpenGraphImage({ params }: { params: Promise<{ slug: string }> }) {
  const entry = work.find((await params).slug);
  if (!entry) notFound();
  return renderOgImage({ eyebrow: pillarLabels[entry.pillar], title: entry.title, description: entry.summary });
}
