import { createFileRoute } from "@tanstack/react-router";
import { profile } from "@/content/profile";
import { renderOgImage } from "@/lib/og-image";

export const Route = createFileRoute("/opengraph-image")({
  server: {
    handlers: {
      GET: () => renderOgImage({ eyebrow: new URL(profile.url).host, title: profile.name, description: profile.positioning }),
    },
  },
});
