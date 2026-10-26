import { z } from "zod";

/**
 * Server environment, validated once on import. Import only from server code.
 * A blank value counts as unset, so `ANTHROPIC_API_KEY=` in a .env file turns the feature off.
 */
const serverEnvSchema = z.object({
  /** Enables "Ask about my work". Without it the section and its ⌘K command are hidden and the route returns 503. */
  ANTHROPIC_API_KEY: z
    .string()
    .optional()
    .transform((key) => key?.trim() || undefined),
});

export const env = serverEnvSchema.parse(process.env);
