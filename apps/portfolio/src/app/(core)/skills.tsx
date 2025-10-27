"use client";

import { SectionHeader } from "~/components/ui/section-header";
import { Job } from "~/data/experience";
import { cn } from "~/lib/utils";

interface SkillCategory {
  title: string;
  skills: string[];
}

const skillCategories: SkillCategory[] = [
  {
    title: "Full-Stack Development",
    skills: [
      "TypeScript (Node.js, Next.js, React, Vue, Svelte, Tanstack)",
      "Golang",
      "Java",
      "PHP",
      "tRPC",
      "Redis",
      "SQL/NoSQL (MySQL, PostgreSQL, Oracle, Elasticsearch)",
      "Drizzle ORM",
      "TailwindCSS",
    ],
  },
  {
    title: "Architectural Leadership",
    skills: [
      "System Design",
      "Cloud-Native Architectures (AWS)",
      "Microservices",
      "Serverless",
      "Domain-Driven Design",
      "API Design",
      "Scalability",
      "Observability (OpenTracing, Envoy, Jaeger)",
    ],
  },
  {
    title: "Technical Strategy",
    skills: [
      "Platform Modernization",
      "Technical Roadmap Definition",
      "Technology Selection & Adoption",
      "Performance Optimization",
    ],
  },
  {
    title: "Team & Organizational Impact",
    skills: [
      "Mentorship (Junior-Senior)",
      "Process Optimization",
      "Developer Productivity",
    ],
  },
  {
    title: "Cloud & DevOps",
    skills: [
      "AWS (Lambda, SQS, ECS, S3, RDS, CloudFront)",
      "Vercel",
      "Docker",
      "CI/CD Pipelines",
      "Infrastructure as Code (Pulumi, CDK, SLS, SST)",
      "Canary Rollouts",
      "Feature Flagging",
    ],
  },
];

export default function Skills() {
  return (
    <>
      <section
        className={`relative z-0 mx-auto px-8 flex flex-col gap-8 mt-16 md:mt-64`}
      >
        <SectionHeader title="Skills" />

        <div
          className={
            "grid grid-cols-1 gap-0 w-full border border-secondary shadow-md"
          }
        >
          {skillCategories.map((category, index) => (
            <CategorySkill
              key={index}
              category={category}
              isEven={index % 2 === 0}
            />
          ))}
        </div>
      </section>
    </>
  );
}

function CategorySkill({
  category,
  isEven,
}: {
  category: SkillCategory;
  isEven: boolean;
}) {
  return (
    <div className={cn("w-full flex")}>
      <div className={cn("border-none w-full flex flex-col")}>
        <div
          className={cn(
            `group flex w-full justify-start items-start cursor-pointer p-4 md:p-16 hover:no-underline`,
            isEven
              ? "bg-background text-background border-1 border-secondary"
              : "bg-secondary text-background border-secondary"
          )}
        >
          <div className={cn("flex items-center gap-4 w-full")}>
            <div
              className={cn(
                `flex flex-col gap-4 text-left text-2xl md:text-4xl transition-opacity duration-700 ease-in-out`,
                isEven ? "text-secondary" : "text-background"
              )}
            >
              <h3 className="flex items-center gap-4 text-inherit">
                <span className="text-2xl md:text-4xl font-bold text-inherit">
                  {category.title}
                </span>
              </h3>

              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1.5 bg-secondary/50 text-sm rounded-md border border-border/30 hover:border-primary/50 transition-colors"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
