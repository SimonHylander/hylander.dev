import { currentJob } from "./career";

const role = "Senior TypeScript engineer";
const location = "Stockholm";
/** The home page hero. The accent part renders in lilac. */
const headline = { lead: "I build integration platforms, web apps and", accent: "AI tools." };

/** Site identity. Metadata, JSON-LD, the header, the contact footer and the OG images all read from here. */
export const profile = {
  name: "Simon Hylander",
  role,
  headline,
  positioning: `${role} in ${location}. ${headline.lead} ${headline.accent}`,
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
 * Shows the GitHub contribution heatmap ("Shipping") between the hero and the work. Off because the
 * calendar is nearly empty before Oct 2026: private Proposales work is not counted. Turn it on once
 * GitHub counts private contributions.
 */
export const SHOW_HEATMAP = false;
