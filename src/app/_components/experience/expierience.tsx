"use client";

import { motion, MotionValue, useScroll } from "framer-motion";
import { useRef } from "react";
import { twMerge } from "tailwind-merge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "~/components/ui/accordion";
import { Job } from "~/data/experience";
import { cn } from "~/lib/utils";
import { styles } from "~/styles";

export default function JobSlider({ jobs }: { jobs: Job[] }) {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  return (
    <>  
      <motion.section
        ref={containerRef}
        className={`relative z-0 mx-auto flex flex-col gap-4`}
      >
        <div className="flex flex-col">
            <div className="flex flex-col items-center justify-center py-8">
                <h2 className={styles.sectionHeadText}>Work Experience</h2>
            </div>

            <div className="flex-1 flex items-start pt-16">
                <Accordion type="single" collapsible className={twMerge(`grid grid-cols-1 gap-0 w-full`)}>
                    {jobs.map((job, index) => (
                        <JobItem key={index} job={job} index={index} scrollProgress={scrollYProgress} />
                    ))}
                </Accordion>
            </div>
        </div>
      </motion.section>
    </>
  );
};

function JobItem({ job, index, scrollProgress }: { job: Job; index: number; scrollProgress: MotionValue<number> }) {
    const isEven = index % 2 === 0;

    /* const startRange = (index * 0.25);  // Each item takes 25% of the scroll
    const endRange = startRange + 0.2;   // Animation happens over 20% of the scroll

    const x = useTransform(
        scrollProgress,
        [startRange, endRange],
        isEven ? ["-100%", "0%"] : ["100%", "0%"]
    ); */

    return (
        <motion.div
            className={cn("w-full flex", isEven ? "justify-start" : "justify-end")}
        >
            <AccordionItem value={`job-${index}`} className={cn("border-none w-full flex flex-col", isEven ? "justify-start" : "justify-end")}>
                <AccordionTrigger className={cn(`group flex w-full justify-start items-start cursor-pointer py-24 px-16 hover:no-underline`, 
                    isEven ? "bg-purple-900 border-1 border-purple-200" : "bg-purple-200 border-purple-200")}>
                    <div className={cn("flex items-center gap-4 w-full", !isEven && "justify-end")}>
                        <div
                            className={cn(`flex flex-col gap-4 text-left text-5xl transition-opacity duration-700 ease-in-out`, isEven ? "text-red-100" : "text-purple-900")}
                        >
                            <h3 className="flex items-center gap-4 text-inherit">
                                <span className="text-5xl font-bold text-inherit">{job.title}</span>
                                <span className="text-xl text-inherit">{job.period}</span>
                            </h3>

                            <p className="flex gap-4 text-xl text-inherit">
                                {job.role} 
                            </p>
                        </div>
                    </div>
                </AccordionTrigger>

                <AccordionContent className="flex flex-col gap-4 text-sm transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
                    <div className="flex flex-col items-center justify-center gap-2 p-8">
                        <h4 className="text-4xl font-bold">Projects</h4>

                        <div className="grid grid-cols-1 gap-8 justify-center items-center w-full">
                            {job.projects.map((project, index) => (
                                <div key={index} className="flex flex-col gap-2 w-full">
                                    <h5 className="flex gap-2 items-center text-lg font-bold text-red-200">{project.name} <span className="text-sm ">{project.date}</span></h5>
                                    <p className="text-sm">{project.technologies}</p>
                                    
                                    <ul className="list-disc list-inside">
                                        {project.points?.map((point, index) => (
                                            <li key={index}>{point}</li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </div>
                </AccordionContent>
            </AccordionItem>
        </motion.div>
    );
}

