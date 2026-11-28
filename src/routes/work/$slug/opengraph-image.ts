import { createFileRoute } from "@tanstack/react-router";
import { pillarLabels } from "@/content/collection";
import { work } from "@/content/work";
import { renderOgImage } from "@/lib/og-image";

export const Route = createFileRoute("/work/$slug/opengraph-image")({
  server: {
    handlers: {
      GET: ({ params }) => {
        const entry = work.find(params.slug);
        if (!entry) return new Response("Not found", { status: 404 });
        return renderOgImage({ eyebrow: pillarLabels[entry.pillar], title: entry.title, description: entry.summary });
      },
    },
  },
});
