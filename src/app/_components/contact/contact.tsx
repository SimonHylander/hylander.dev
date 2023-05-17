"use client";

import React, { ReactNode, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { styles } from "~/styles";

import { useMediaQuery } from "react-responsive";

const Contact = ({ children }: { children: ReactNode }) => {
  const isMobile = useMediaQuery({ query: "(max-width: 1024px)" });

  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end end"],
  });

  const scale = useTransform(scrollYProgress, [1, 1, 1, 1], [1.9, 1.8, 1.5, 1]);
  const x = useTransform(scrollYProgress, [0.3, 1], ["-50%", "0%"]);

  const getInTouchOpacity = useTransform(
    scrollYProgress,
    [1, 1, 0.8, 0.3],
    [1, 1, 0, 0]
  );

  const contactOpacity = useTransform(
    scrollYProgress,
    [1, 0.8, 0.5],
    [1, 0, 0]
  );

  return (
    <section
      ref={targetRef}
      className="flex flex-col justify-start lg:h-[300vh]"
    >
      <span className="hash-span" id={"contact"}>
        &nbsp;
      </span>

      <div className="leading-[1] text-red-100 lg:sticky lg:top-[16.7vh]">
        <div className="flex w-full lg:justify-center">
          <motion.div
            style={isMobile ? {} : { x, scale }}
            className="w-full bg-contact bg-no-repeat text-2xl leading-[1] text-red-100 lg:h-[924px] lg:w-[1362px]"
          >
            <div className="translate-y-centered-offset p-8 lg:absolute lg:left-0 lg:top-10 lg:w-[1362px]">
              <motion.p
                className={styles.sectionSubText}
                style={{
                  opacity: isMobile ? 1 : getInTouchOpacity,
                }}
              >
                Get in touch
              </motion.p>

              <motion.p
                className={styles.sectionHeadText}
                style={{
                  opacity: isMobile ? 1 : contactOpacity,
                }}
              >
                Contact.
              </motion.p>

              <motion.div className="mt-12 flex flex-col gap-8 text-base lg:w-6/12">
                {children}
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
