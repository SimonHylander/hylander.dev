"use client";

import { motion } from "framer-motion";

import {
  fadeInLeft
} from "~/utils/motion";


import { useMediaQuery } from "react-responsive";

export default function AboutBgImg() {
    const isMobile = useMediaQuery({ query: "(max-width: 1024px)" });

    if (isMobile) {
        return null;
    }

    return (
        <div className="relative opacity-40">
          <motion.img
            variants={fadeInLeft(0.5)}
            src="/sst.png"
            className="pointer-events-none absolute left-5 top-[240px] z-0 hidden w-[300px] rounded-xl lg:block"
          />

          <motion.img
            variants={fadeInLeft(0.5)}
            src="/sst.png"
            className="pointer-events-none absolute right-5 top-[150px] z-0 hidden w-[300px] rounded-xl lg:block"
          />
        </div>
    )
}

