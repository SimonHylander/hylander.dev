"use client";

import { motion, useMotionValue, useTransform } from "framer-motion";

import { useEffect } from "react";

const LeftNavigation = () => {
  const scrollY = useMotionValue(0);
  const opacity = useTransform(scrollY, [1, 100], [1, 0]);

  const handleScroll = () => {
    scrollY.set(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <motion.p
      onScroll={handleScroll}
      style={{
        opacity,
      }}
      className="hover:text-red-300` flex cursor-pointer gap-1 text-[18px] font-bold text-red-200"
    >
      Hylander
      <span className="hidden sm:block">| The G.O.A.T</span>
    </motion.p>
  );
};

export default LeftNavigation;

