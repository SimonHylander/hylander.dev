"use client";

import { motion } from "framer-motion";
import { useMediaQuery } from "react-responsive";
import { fadeInLeft } from "../../utils/motion";

export default function AboutBgImg() {
  const isMobile = useMediaQuery({ query: "(max-width: 1024px)" });

  if (isMobile) {
    return null;
  }

  return (
    <div className="relative opacity-40">
      {/* <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="transition-all duration-200 pointer-events-none absolute left-5 top-5 z-0 hidden w-[300px] rounded-xl lg:block"
        >
          <div className="flex flex-col gap-1 text-center text-1xl font-bold text-foreground text-8xl">
            <i className={cn(`devicon-typescript-plain text-8xl`)}></i>
            Typescript
          </div>
        </motion.div>
  
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="transition-all duration-200 pointer-events-none absolute right-[450px] top-32 z-0 hidden w-[300px] rounded-xl lg:block"
        >
          <div className="flex flex-col gap-1 text-center text-1xl font-bold text-foreground text-8xl">
            <i className={cn(`devicon-nextjs-plain text-8xl`)}></i>
            Next.js
          </div>
        </motion.div>
  
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="transition-all duration-200 pointer-events-none absolute left-10 top-[225px] z-0 hidden w-[300px] rounded-xl lg:block"
        >
          <div className="flex flex-col gap-1 text-center text-1xl font-bold text-foreground text-8xl">
            <i className={cn(`devicon-nodejs-plain text-8xl`)}></i>
            Node.js
          </div>
        </motion.div> */}

      <motion.img variants={fadeInLeft(0.5)} src="/sst.png" alt="" className="pointer-events-none absolute left-5 top-[150px] z-0 hidden w-[300px] rounded-xl lg:block" />
    </div>
  );
}
