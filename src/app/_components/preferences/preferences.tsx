"use client";

import { motion, MotionValue, useScroll } from "framer-motion";
import { useRef } from "react";
import { twMerge } from "tailwind-merge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "~/components/ui/accordion";
import { Job } from "~/data/experience";
import { cn } from "~/lib/utils";
import { styles } from "~/styles";

export default function Preferences({ jobs }: { jobs: Job[] }) {
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
                <h2 className={styles.sectionHeadText}>How I Like To Build</h2>
            </div>

            <p className="text-center text-md">For fullstack development I prefer working with a modular tech stack centered around the following tools</p>

            <div className="flex flex-col gap-4 p-8">
                <div className="flex items-center justify-center gap-4">
                    <div className="flex flex-col items-center gap-2 p-4 text-purple-900">
                        <i className="text-purple-200 text-5xl devicon-nextjs-plain"></i>
                        <p className="text-xl">Next.js</p>
                    </div>

                    <div className="flex flex-col items-center gap-2 p-4 text-purple-900">
                        <i className="text-react text-5xl devicon-react-plain"></i>
                        <p className="text-xl">React</p>    
                    </div>

                    <div className="flex flex-col items-center gap-2 p-4 text-purple-900">
                        <i className="text-react text-5xl devicon-trpc-plain"></i>
                        <p className="text-xl">TRPC</p>    
                    </div>

                    <div className="flex flex-col items-center gap-2 p-4 text-purple-900">
                        <img alt="" className="w-[50px] rounded-full overflow-hidden border-2 border-black dark:border-none" src="https://tanstack.com/assets/logo-color-100w-br5_Ikqp.png"/>
                        <p className="text-xl">Tanstack</p>    
                    </div>

                    <div className="flex flex-col items-center gap-2 p-4 text-purple-900">
                        <i className="text-react text-5xl devicon-tailwindcss-plain"></i>
                        <p className="text-xl">TailwindCSS</p>    
                    </div>
                </div>

                <div className="flex items-center justify-center gap-4">
                    <div className="flex flex-col items-center gap-2 p-4 text-purple-900">
                        <img alt="" className="w-[50px] rounded-full overflow-hidden border-2 border-black dark:border-none" src="https://cursor.com/_next/static/media/placeholder-logo.737626f1.webp"/>
                        <p className="text-xl">Cursor</p>
                    </div>

                    <div className="flex flex-col items-center gap-2 p-4 text-purple-900">
                    <svg fill="currentColor" viewBox="0 0 40 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" class="size-10 translate-x-[-0.5px]"><path d="M23.3919 0H32.9188C36.7819 0 39.9136 3.13165 39.9136 6.99475V16.0805H36.0006V6.99475C36.0006 6.90167 35.9969 6.80925 35.9898 6.71766L26.4628 16.079C26.4949 16.08 26.5272 16.0805 26.5595 16.0805H36.0006V19.7762H26.5595C22.6964 19.7762 19.4788 16.6139 19.4788 12.7508V3.68923H23.3919V12.7508C23.3919 12.9253 23.4054 13.0977 23.4316 13.2668L33.1682 3.6995C33.0861 3.6927 33.003 3.68923 32.9188 3.68923H23.3919V0Z"></path><path d="M13.7688 19.0956L0 3.68759H5.53933L13.6231 12.7337V3.68759H17.7535V17.5746C17.7535 19.6705 15.1654 20.6584 13.7688 19.0956Z"></path></svg>
                        <p className="text-xl">V0</p>    
                    </div>
                </div>
            </div>

            <div className="flex flex-col gap-1 p-8">
                <p className="text-md">My go-to starting point for fullstack projects is <a href="https://create.t3.gg/" target="_blank" className="text-red-200">create-t3-app</a>, which provides a clean foundation and scales well with project complexity.</p>
                <p className="text-md">I use <a href="https://next.js.com" target="_blank">Next.js</a> for its powerful features like routing, code splitting, data fetching, caching, streaming, and server-side rendering. Even for client-heavy apps, having a server-side middleware layer often proves useful before interacting with APIs.</p>
                <p className="text-md"><a href="https://trpc.io/" target="_blank" className="text-red-200">tRPC</a> is the most productive way I’ve found to build APIs in a fullstack TypeScript app. It’s also easy to decouple later if I need to separate the API layer.</p>
                <p className="text-md">I'm a big fan of the <a href="https://tanstack.com/" target="_blank" className="text-red-200">TanStack</a> ecosystem and rarely build a project without reaching for tools like <a href="https://tanstack.com/query" target="_blank" className="text-red-200">Query</a>, <a href="https://tanstack.com/form" target="_blank" className="text-red-200">Form</a>, <a href="https://tanstack.com/table" target="_blank" className="text-red-200">Table</a>, or <a href="https://tanstack.com/virtual" target="_blank" className="text-red-200">Virtual</a>.</p>
                <p className="text-md">For styling and rapid UI iteration, I use <a href="https://tailwindcss.com/" target="_blank" className="text-red-200">Tailwind CSS</a>, and when building component libraries, I prefer a headless solutions like <a href="https://ui.shadcn.com/" target="_blank" className="text-red-200">shadcn/ui</a> or <a href="https://www.radix-ui.com/" target="_blank" className="text-red-200">Radix</a> (Keeping an eye on <a href="https://base-ui.com/" className="text-red-200">Base UI</a> at the moment).</p>
                <p className="text-md">For fast prototyping and product iteration, I rely on tools like <a href="https://cursor.com/" target="_blank" className="text-red-200">Cursor</a>, <a href="https://v0.dev/" target="_blank" className="text-red-200">V0.dev</a>, and <a href="https://mobbin.com/" target="_blank  " className="text-red-200">Mobbin.com</a> to guide design and UX decisions.</p>  
                <p className="text-md">Modularity and developer experience are core to how I build, and I prioritize technologies that keep me and my teams flexible without sacrificing scalability</p>
            </div>

            <div className="flex flex-col gap-1 p-8">
                <p className="text-md">I prefer building with a serverless-first mindset because it allows me to move fast, ship features quickly, and scale effortlessly without managing infrastructure.</p>
                <p className="text-md"><a href="https://aws.amazon.com/lambda/" target="_blank" className="text-red-200">AWS Lambda</a> and modern frameworks like <a href="https://sst.dev/" target="_blank" className="text-red-200">SST</a> make it easy to focus on scaling products and teams with cost efficiency in mind. That said, I'm pragmatic — for workloads that require persistent compute, such as AI loads, WebSockets, or long-lived background tasks, I'm not afraid to bring in server-based solutions where they make sense.</p>
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

