import type { Route } from "next";
import { profile } from "@/content/profile";
import { work } from "@/content/work";
import { writing } from "@/content/writing";
import { env } from "@/lib/env";

/** Static routes and hashes plus case study pages. Plain `Route` excludes dynamic segments. */
type InternalHref = Route<`/work/${string}`>;

/** One entry in the ⌘K palette. Plain data, so the server can build the list and pass it to the client. */
export type Command = { id: string; label: string; group: string } & (
  | { kind: "copy-email" }
  | { kind: "route"; href: InternalHref }
  /** Focuses the element with `target` as its id, or goes to `href` when this page does not have it. */
  | { kind: "focus"; target: string; href: InternalHref }
  | { kind: "external"; href: string }
);

/** Every palette command, derived from the content modules. */
export function getCommands() {
  return [
    { id: "copy-email", label: "Copy email", group: "Actions", kind: "copy-email" },
    ...(env.ANTHROPIC_API_KEY ? [{ id: "ask", label: "Ask about my work", group: "Actions", kind: "focus", target: "ask-input", href: "/#ask" } satisfies Command] : []),
    { id: "work", label: "Work", group: "Pages", kind: "route", href: "/#work" },
    // The home page only has a Writing section once a post is published.
    ...(writing.entries.length > 0 ? [{ id: "writing", label: "Writing", group: "Pages", kind: "route", href: "/#writing" } satisfies Command] : []),
    { id: "cv", label: "CV", group: "Pages", kind: "route", href: "/cv" },
    ...work.entries.map(
      ({ slug, title }) =>
        ({ id: `work-${slug}`, label: title, group: "Projects", kind: "route", href: `/work/${slug}` }) satisfies Command,
    ),
    ...profile.socials.map(
      ({ label, href }) => ({ id: label, label, group: "Elsewhere", kind: "external", href }) satisfies Command,
    ),
  ] satisfies Command[];
}
