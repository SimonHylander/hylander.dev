import type { MetadataRoute } from "next";
import { profile } from "@/content/profile";
import { work } from "@/content/work";
import { writing } from "@/content/writing";

const absolute = (path: string) => new URL(path, profile.url).toString();

// Static pages plus every entry in the content indexes.
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: absolute("/") },
    { url: absolute("/cv") },
    ...work.entries.map((entry) => ({ url: absolute(`/work/${entry.slug}`), lastModified: entry.date })),
    ...writing.entries.map((entry) => ({ url: absolute(`/writing/${entry.slug}`), lastModified: entry.date })),
  ];
}
