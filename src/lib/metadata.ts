import { profile } from "@/content/profile";

type PageHeadInput = {
  /** Omit for the home page, which uses the bare site name. */
  title?: string;
  description: string;
  path: string;
  /** ISO date. Marks the page as an Open Graph article. */
  publishedTime?: string;
  /** The page's Open Graph image route. Pages without one share none. */
  image?: { path: string; alt: string };
};

/**
 * Head tags for one page: title, description, canonical, Open Graph and Twitter. TanStack Router
 * dedupes meta by name and property, so a child route's tags replace the root's.
 */
export function pageHead({ title, description, path, publishedTime, image }: PageHeadInput) {
  const ogTitle = title ?? profile.name;
  // Next wrote the home page's URL without a trailing slash. Keep it, so canonicals do not change.
  const url = path === "/" ? new URL(profile.url).origin : new URL(path, profile.url).href;
  const imageTags = image
    ? [
        { property: "og:image", content: new URL(image.path, profile.url).href },
        { property: "og:image:type", content: "image/png" },
        { property: "og:image:width", content: "1200" },
        { property: "og:image:height", content: "630" },
        { property: "og:image:alt", content: image.alt },
        { name: "twitter:image", content: new URL(image.path, profile.url).href },
        { name: "twitter:image:alt", content: image.alt },
        { name: "twitter:image:type", content: "image/png" },
        { name: "twitter:image:width", content: "1200" },
        { name: "twitter:image:height", content: "630" },
      ]
    : [];

  return {
    meta: [
      { title: title ? `${title} | ${profile.name}` : profile.name },
      { name: "description", content: description },
      { property: "og:title", content: ogTitle },
      { property: "og:description", content: description },
      { property: "og:url", content: url },
      { property: "og:site_name", content: profile.name },
      ...(publishedTime
        ? [
            { property: "og:type", content: "article" },
            { property: "article:published_time", content: publishedTime },
          ]
        : [{ property: "og:type", content: "website" }]),
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: ogTitle },
      { name: "twitter:description", content: description },
      ...imageTags,
    ],
    links: [{ rel: "canonical", href: url }],
  };
}
