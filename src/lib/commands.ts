import { linkOptions, type LinkOptions } from "@tanstack/react-router";
import { profile } from "@/content/profile";
import { work } from "@/content/work";
import { writing } from "@/content/writing";

/** One entry in the ⌘K palette. */
export type Command = { id: string; label: string; group: string } & (
  | { kind: "copy-email" }
  | { kind: "route"; link: LinkOptions }
  /** Focuses the element with `target` as its id, or follows `link` when this page does not have it. */
  | { kind: "focus"; target: string; link: LinkOptions }
  | { kind: "external"; href: string }
);

/** Every palette command, derived from the content modules. `askEnabled` comes from the server environment. */
export function getCommands(askEnabled: boolean) {
  return [
    { id: "copy-email", label: "Copy email", group: "Actions", kind: "copy-email" },
    ...(askEnabled ? [{ id: "ask", label: "Ask about my work", group: "Actions", kind: "focus", target: "ask-input", link: linkOptions({ to: "/", hash: "ask" }) } satisfies Command] : []),
    { id: "work", label: "Work", group: "Pages", kind: "route", link: linkOptions({ to: "/", hash: "work" }) },
    // The home page only has a Writing section once a post is published.
    ...(writing.entries.length > 0 ? [{ id: "writing", label: "Writing", group: "Pages", kind: "route", link: linkOptions({ to: "/", hash: "writing" }) } satisfies Command] : []),
    { id: "cv", label: "CV", group: "Pages", kind: "route", link: linkOptions({ to: "/cv" }) },
    ...work.entries.map(
      ({ slug, title }) =>
        ({ id: `work-${slug}`, label: title, group: "Projects", kind: "route", link: linkOptions({ to: "/work/$slug", params: { slug } }) }) satisfies Command,
    ),
    ...profile.socials.map(
      ({ label, href }) => ({ id: label, label, group: "Elsewhere", kind: "external", href }) satisfies Command,
    ),
  ] satisfies Command[];
}
