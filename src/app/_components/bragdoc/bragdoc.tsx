"use client"

import { motion, MotionValue, useScroll } from "framer-motion";
import { useRef } from "react";
import { BragDoc, Achivement } from "~/data/bragdoc";
import { cn } from "~/lib/utils";
import { styles } from "~/styles";

export default function BragdocList({ bragdoc }: { bragdoc: BragDoc }) {
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
                  <h2 className={styles.sectionHeadText}>Brag Document</h2>
              </div>
  
              <div className="flex-1 flex flex-col items-start pt-16">
                {bragdoc.achievements.map((achievement, index) => (
                    <BragdocItem key={index} achievement={achievement} index={index} scrollProgress={scrollYProgress} />
                ))}
              </div>
          </div>
        </motion.section>
      </>
    );
}


function BragdocItem({ achievement, index, scrollProgress }: { achievement: Achivement; index: number; scrollProgress: MotionValue<number> }) {
    const isEven = index % 2 === 0;

    return (
        <motion.div
            className={cn("w-full flex", isEven ? "justify-start" : "justify-end")}
        >
            <div className={cn("border-none w-full flex flex-col", isEven ? "justify-start" : "justify-end")}>
                <div className={cn(`group flex w-full justify-start items-start py-24 px-16 hover:no-underline`, 
                    isEven ? "bg-purple-900 border-1 border-purple-200" : "bg-purple-200 border-purple-200")}>
                    <div className={cn("flex items-center gap-4 w-full", !isEven && "justify-end")}>
                        <div
                            className={cn(`flex flex-col gap-4 text-left text-5xl transition-opacity duration-700 ease-in-out`, isEven ? "text-red-100" : "text-purple-900")}
                        >
                            <p className="flex gap-4 text-xl text-inherit">
                                {achievement.company} 
                            </p>

                            <h3 className="flex items-center gap-4 text-inherit">
                                <span className="text-5xl font-bold text-inherit">{achievement.name}</span>
                            </h3>

                            <div className="flex flex-col gap-4 text-sm transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down text-inherit">
                                <h5 className="flex gap-2 items-center text-lg text-inherit">{achievement.description}</h5>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

