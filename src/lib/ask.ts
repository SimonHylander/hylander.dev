import { z } from "zod";

/*
 * Shared by the /api/ask route and the AskBox client component. Keep this module free of `@/`
 * imports and server-only code: the browser bundles it and `node --test` runs it directly.
 */

/** A page the answer can cite. The id is the page's URL path. */
export type SourceId = "/" | "/cv" | `/work/${string}`;

/** Body of POST /api/ask. */
export const askInputSchema = z.object(
  {
    question: z
      .string({ error: "Send a question." })
      .trim()
      .min(3, "Ask a question of at least 3 characters.")
      .max(300, "Keep the question under 300 characters."),
  },
  { error: 'Send a JSON body like {"question": "..."}.' },
);

/** JSON body of every non-streaming /api/ask response. */
export const askErrorSchema = z.object({ error: z.string() });

const sourcesLine = /^sources:(.*)$/i;

/**
 * Splits a streamed answer into its prose and the cited pages. The model ends an answer with
 * `Sources: /work/x, /cv`; only ids in `known` survive, so a made-up path never becomes a link.
 * A trailing partial line such as "Sour" is hidden while the stream is still arriving.
 */
export function parseAnswer(text: string, known: readonly SourceId[]) {
  const lines = text.trimEnd().split("\n");
  const last = lines.at(-1)?.trim() ?? "";
  const match = sourcesLine.exec(last);
  const isPartialMarker = last.length > 0 && "sources:".startsWith(last.toLowerCase());
  if (!match && !isPartialMarker) return { body: text.trim(), sources: [] };

  const cited = (match?.[1] ?? "").split(",").map((id) => id.trim());
  return {
    body: lines.slice(0, -1).join("\n").trim(),
    sources: known.filter((id) => cited.includes(id)),
  };
}
