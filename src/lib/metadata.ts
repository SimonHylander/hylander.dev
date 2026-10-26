import type { Metadata } from "next";
import { profile } from "@/content/profile";

type PageMetadataInput = {
  title: string;
  description: string;
  path: string;
  /** ISO date. Marks the page as an Open Graph article. */
  publishedTime?: string;
};

/**
 * Metadata for one page. Next replaces a parent's `openGraph` instead of merging it,
 * so every page sets its own title, description and URL here.
 */
export function pageMetadata({ title, description, path, publishedTime }: PageMetadataInput): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      siteName: profile.name,
      title,
      description,
      url: path,
      ...(publishedTime ? { type: "article", publishedTime } : { type: "website" }),
    },
  };
}
