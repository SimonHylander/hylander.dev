import { createFileRoute } from "@tanstack/react-router";
import { profile } from "@/content/profile";

const body = `User-Agent: *
Allow: /

Sitemap: ${new URL("/sitemap.xml", profile.url).href}
`;

export const Route = createFileRoute("/robots.txt")({
  server: { handlers: { GET: () => new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8" } }) } },
});
