/** "YYYY" or "YYYY-MM". Precision follows what the source data knows. */
export type PartialDate = `${number}` | `${number}-${number}`;

/** One job on the CV. A job without `end` is the current one. */
export type Job = {
  company: string;
  role: string;
  team?: string;
  start: PartialDate;
  end?: PartialDate;
  summary?: string;
  highlights: string[];
  stack: string[];
};

/** The current job. The profile and the home page read the current role from here. */
export const currentJob = {
  company: "Proposales",
  role: "Full Stack Engineer",
  team: "Growth / Integrations",
  start: "2026-02",
  summary: "Building AI enhanced workflows and sales automation for hotels",
  highlights: [],
  stack: [],
} satisfies Job;

/** Full career history, newest first. Rendered in full on /cv and as a short list on the home page. */
export const career: readonly Job[] = [
  currentJob,
  {
    company: "Byggdagboken",
    role: "Senior Software Engineer",
    team: "Client engineering lead",
    start: "2024-05",
    end: "2026-02",
    highlights: [
      "Owned client engineering for the native apps and the web client. Led a small app team and owned the delivery roadmap.",
      "Migrated the web platform from PHP and Angular.js to Next.js with a strangler fig, releasing each route behind a canary in CloudFront Functions.",
      "Introduced AI code review so contributors iterate before they submit. Senior review time dropped by 80%.",
      "Introduced new release routines. The releases that followed had zero major incidents.",
      "Re-architected the native apps and the web client to be local-first.",
      "Built a backend-for-frontend that aggregates data for the native apps.",
      "Built sign-in on OAuth2 and OpenID Connect with PKCE, so the web client and the apps share one identity.",
      "Automated the localization pipeline and built a translation tool for JSON, XML and xcstrings. We launched 10 new languages.",
    ],
    stack: [
      "TypeScript",
      "Node.js",
      "Next.js",
      "React",
      "Lambda",
      "MySQL",
      "Drizzle",
      "Tailwind CSS",
      "TanStack",
      "Java",
      "PHP",
    ],
  },
  {
    company: "Skoglit",
    role: "Senior Software Engineer (consultant)",
    start: "2018",
    end: "2024",
    highlights: [
      "Worked as lead developer across client projects and mentored interns and junior developers.",
      "Led architecture and development for a startup that reduces fraud in online marketplaces, including its payment flows.",
      "Built address search for the municipality of Ljusdal, so residents can look up their bin collection days.",
      "Built a project management system, internal tools and dashboards for a private water and sewage company.",
      "Built a platform that runs sales competitions as games.",
    ],
    stack: [
      "TypeScript",
      "Node.js",
      "Next.js",
      "React",
      "Vue",
      "Svelte",
      "PHP",
      "Java",
      "Quarkus",
      "Hibernate",
      "MySQL",
      "AWS",
    ],
  },
  {
    company: "Docu Group Sweden",
    role: "Software Developer",
    start: "2016",
    end: "2018",
    highlights: [
      "Built an order and customer system for the group's magazine and advertising sales.",
      "Built and maintained websites for a media company.",
      "Built a WooCommerce shop for digital goods and merchandise.",
      "Maintained about 10 internal Java and PHP systems on my own.",
    ],
    stack: [
      "PHP",
      "Symfony",
      "Doctrine",
      "MySQL",
      "Oracle PL/SQL",
      "jQuery",
      "Java",
      "SOAP",
      "REST",
      "Hibernate",
      "Linux",
      "Bash",
    ],
  },
  {
    company: "Docu Nordic",
    role: "Junior Developer",
    start: "2014",
    end: "2016",
    highlights: [
      "Worked on a SOAP platform that delivered the group's core data to businesses across Europe.",
      "Built a REST middleware API over the internal systems and databases.",
      "Built reports and statistics for internal use.",
      "Built integrations with third-party services.",
    ],
    stack: [
      "PHP",
      "Symfony",
      "Doctrine",
      "MySQL",
      "Oracle PL/SQL",
      "jQuery",
      "Java",
      "SOAP",
      "REST",
      "Hibernate",
      "Linux",
      "Bash",
    ],
  },
];
