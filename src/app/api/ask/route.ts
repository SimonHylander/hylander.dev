import { anthropic, type AnthropicLanguageModelOptions } from "@ai-sdk/anthropic";
import { checkRateLimit } from "@vercel/firewall";
import { createTextStreamResponse, streamText, toTextStream } from "ai";
import { checkBotId } from "botid/server";
import { askInputSchema } from "@/lib/ask";
import { askSystemMessage } from "@/lib/ask-sources";
import { env } from "@/lib/env";

export const maxDuration = 30;

/** BotID and the Firewall rate limit only work on Vercel. Locally (`next dev`, `next start`) both are skipped. */
const onVercel = Boolean(process.env.VERCEL);

const error = (status: 400 | 403 | 429 | 503, message: string) => Response.json({ error: message }, { status });

/**
 * POST /api/ask: answers one question about Simon's work from the site's own pages and streams
 * plain text back. Errors are JSON `{ error }` with a status code; see README for the limits.
 */
export async function POST(request: Request) {
  if (!env.ANTHROPIC_API_KEY) return error(503, "Ask is not configured on this deployment.");

  if (onVercel) {
    const { isBot } = await checkBotId();
    if (isBot) return error(403, "This looks like an automated request.");

    const { rateLimited } = await checkRateLimit("ask", { request });
    if (rateLimited) return error(429, "Too many questions. Try again in a minute.");
  }

  const input = askInputSchema.safeParse(await request.json().catch(() => null));
  if (!input.success) return error(400, input.error.issues[0]?.message ?? "Send a question.");

  const result = streamText({
    model: anthropic("claude-sonnet-5-5"),
    instructions: askSystemMessage,
    prompt: `<question>${input.data.question}</question>`,
    maxOutputTokens: 350,
    abortSignal: request.signal,
    providerOptions: {
      anthropic: {
        // Short factual answers: low effort keeps thinking brief inside the 350-token cap.
        effort: "low",
        // On a safety decline, the API retries on the model it recommends for that category.
        fallbacks: "default",
      } satisfies AnthropicLanguageModelOptions,
    },
    onError: ({ error }) => console.error("[ask]", error),
  });

  return createTextStreamResponse({ stream: toTextStream({ stream: result.stream }) });
}
