import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://hylander.dev",
      lastModified: new Date(),
    },
  ];
}
