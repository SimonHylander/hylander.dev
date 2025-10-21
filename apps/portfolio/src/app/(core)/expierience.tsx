"use client";

import { SectionHeader } from "~/components/ui/section-header";
import { Job } from "~/data/experience";
import { cn } from "~/lib/utils";

import { jobs } from "~/data/experience";

export default function WorkExperience() {
  return (
    <>
      <section className={`relative z-0 mx-auto px-8 flex flex-col gap-8`}>
        <SectionHeader title="Work Experience" />

        <div className={"grid grid-cols-1 gap-0 w-full border border-secondary shadow-md"}>
          {jobs.map((job, index) => (
            <JobItem key={index} job={job} isEven={index % 2 === 0} />
          ))}
        </div>
      </section>
    </>
  );
}

function JobItem({ job, isEven }: { job: Job; isEven: boolean }) {
  return (
    <div className={cn("w-full flex")}>
      <div className={cn("border-none w-full flex flex-col")}>
        <div
          className={cn(
            `group flex w-full justify-start items-start cursor-pointer p-16 hover:no-underline`,
            isEven ? "bg-background text-background border-1 border-secondary" : "bg-secondary text-background border-secondary"
          )}
        >
          <div className={cn("flex items-center gap-4 w-full")}>
            <div className={cn(`flex flex-col gap-4 text-left text-4xl transition-opacity duration-700 ease-in-out`, isEven ? "text-secondary" : "text-background")}>
              <h3 className="flex items-center gap-4 text-inherit">
                <span className="text-4xl font-bold text-inherit">{job.title}</span>
                <span className="text-xl text-inherit">{job.period}</span>
              </h3>

              <p className="flex gap-4 text-xl text-inherit">{job.role}</p>
              <p className="flex gap-4 text-sm text-inherit">{job.technologies}</p>

              <ul className="list-disc list-inside text-inherit text-sm">
                {job.bulletPoints?.map((point, index) => (
                  <li key={index} className="text-inherit">
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
