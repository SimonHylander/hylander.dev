import type { Route } from "next";
import { profile } from "@/content/profile";
import { work } from "@/content/work";

/** Static routes and hashes plus case study pages. Plain `Route` excludes dynamic segments. */
type InternalHref = Route<`/work/${string}`>;

/** One entry in the ⌘K palette. Plain data, so the server can build the list and pass it to the client. */
export type Command = { id: string; label: string; group: string } & (
  | { kind: "copy-email" }
  | { kind: "route"; href: InternalHref }
  | { kind: "external"; href: string }
);

/** Every palette command, derived from the content modules. */
export function getCommands() {
  return [
    { id: "copy-email", label: "Copy email", group: "Actions", kind: "copy-email" },
    { id: "work", label: "Selected work", group: "Pages", kind: "route", href: "/#work" },
    { id: "writing", label: "Writing", group: "Pages", kind: "route", href: "/#writing" },
    { id: "cv", label: "CV", group: "Pages", kind: "route", href: "/cv" },
    ...work.entries.map(
      ({ slug, title }) =>
        ({ id: `work-${slug}`, label: title, group: "Case studies", kind: "route", href: `/work/${slug}` }) satisfies Command,
    ),
    ...profile.socials.map(
      ({ label, href }) => ({ id: label, label, group: "Elsewhere", kind: "external", href }) satisfies Command,
    ),
  ] satisfies Command[];
}
