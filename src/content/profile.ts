import { currentJob } from "./career";

const role = "Senior Software Engineer";
const location = "Stockholm";
/** The home page hero. The accent part renders in lilac. */
const headline = { lead: "Just let me", accent: "cook." };
/** What Simon builds, in one line. Metadata, the OG image, the CV and Ask use it through `positioning`. */
const pitch = "I build integration platforms, web apps and AI tools.";

/** Site identity. Metadata, JSON-LD, the header, the contact footer and the OG images all read from here. */
export const profile = {
  name: "Simon Hylander",
  role,
  headline,
  positioning: `${role} in ${location}. ${pitch}`,
  location,
  currentJob,
  email: "hylandersimon@gmail.com",
  /** Heading of the contact footer on every page. */
  contactPrompt: "Email me",
  url: "https://hylander.dev",
  socials: [
    { label: "GitHub", href: "https://github.com/SimonHylander" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/simonhylander" },
    { label: "X", href: "https://x.com/simon_hylander" },
  ],
} as const;

/**
 * Shows the GitHub contribution heatmap ("Shipping") between the hero and the work. Private
 * Proposales work is not counted, so the calendar is sparse before Oct 2026.
 */
export const SHOW_HEATMAP = true;
