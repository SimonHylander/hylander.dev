"use client";

import { Variants } from "framer-motion";

export { motion, useScroll, useTransform } from "framer-motion";

export const fadeInLeft = (delay?: number): Variants => {
  return {
    hidden: {
      x: 50,
      opacity: 0,
    },
    show: {
      x: 0,
      opacity: 0.5,
      transition: {
        type: "spring",
        duration: 1.25,
        delay,
      },
    },
  };
};
