import { currentJob } from "./career";

/** Site identity. Metadata, JSON-LD, the footer and the OG images all read from here. */
export const profile = {
  name: "Simon Hylander",
  positioning:
    "Senior TypeScript engineer in Stockholm. I build integration platforms and AI workflows on foundations that last.",
  location: "Stockholm",
  currentJob,
  email: "hylandersimon@gmail.com",
  url: "https://hylander.dev",
  socials: [
    { label: "GitHub", href: "https://github.com/SimonHylander" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/simonhylander" },
    { label: "X", href: "https://x.com/simon_hylander" },
  ],
} as const;
