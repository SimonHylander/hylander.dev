import { createFileRoute } from "@tanstack/react-router";
import { profile } from "@/content/profile";
import { work } from "@/content/work";
import { writing } from "@/content/writing";

const absolute = (path: string) => new URL(path, profile.url).toString();

// Static pages plus every entry in the content indexes.
const urls = (): { url: string; lastModified?: string }[] => [
    { url: absolute("/") },
    { url: absolute("/cv") },
    ...work.entries.map((entry) => ({ url: absolute(`/work/${entry.slug}`), lastModified: entry.date })),
    ...writing.entries.map((entry) => ({ url: absolute(`/writing/${entry.slug}`), lastModified: entry.date })),
];

const xml = () =>
  `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls()
  .map(({ url, lastModified }) => `<url>\n<loc>${url}</loc>${lastModified ? `\n<lastmod>${lastModified}</lastmod>` : ""}\n</url>`)
  .join("\n")}
</urlset>
`;

export const Route = createFileRoute("/sitemap.xml")({
  server: { handlers: { GET: () => new Response(xml(), { headers: { "Content-Type": "application/xml" } }) } },
});
