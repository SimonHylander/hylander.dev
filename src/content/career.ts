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
      "Established full ownership and led direction for all client-side engineering, native apps, and web client UX, directly influencing product roadmap and significantly improving user satisfaction.",
      "Led a strategic re-architecture of the web platform, implementing a strangler-fig migration from a monolithic legacy system to a modern web client. Designed and deployed route-level canary rollouts via CloudFront Functions.",
      "Transformed engineering code review processes by integrating AI Code Reviews, enabling pre-submission iteration that slashed senior engineer review time by 80%. This initiative significantly enhanced contributor growth and accelerated overall engineering throughput.",
      "Built a robust BFF layer to streamline client data access and aggregation, improving performance and reducing client-side complexity.",
      "Designed and implemented a secure OAuth2/OpenID-based authentication system to unify identity across platforms.",
      "Developed an internal tool to manage translations with support for multiple formats (JSON, XML, xcstrings), giving the team fine-grained control over internationalization.",
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
      "Led the technical architecture and development of a startup focused on fraud reduction in online marketplaces, delivering secure and smart payment flows with a strong emphasis on accessibility and user trust.",
      "Built a module for the municipality of Ljusdal to allow residents to search for their address and get an overview of collection days for their garbage bins.",
      "Developed a project management system, internal tools and dashboards for a company specialized in private sewage and water.",
      "Developed a platform focused on gamification of sales competitions.",
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
      "Built a system to manage orders and customers for one of the organization's businesses focusing on the sale of magazines and advertisements.",
      "Developed and maintained several websites for a medium-sized media company.",
      "Built a webshop using WooCommerce for selling digital goods and merchandise.",
      "Solo maintained about 10 internal Java/PHP based systems.",
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
      "Worked on a SOAP platform focused on delivering the organization's core data to numerous different European businesses.",
      "Developed a middleware REST API for the organization's internal systems and databases.",
      "Custom reports and statistics for internal use.",
      "Integrations with third-party services.",
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
