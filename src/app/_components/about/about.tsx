"use client";

import { motion } from "framer-motion";

import { styles } from "~/styles";

import {
  staggerContainer,
  textVariant,
  textVariant2
} from "~/utils/motion";

import { Language } from "~/data/about";


import { useRef } from "react";
import TechCarousel from "../tech/tech-carousel";
import AboutBgImg from "./about-bg-img";

const About = ({ languages }: { languages: Language[] }) => {
  const targetRef = useRef(null);

  return (
    <>  
      <AboutBgImg />
      
      <motion.section
        ref={targetRef}
        variants={staggerContainer()}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.25 }}
        className={`relative z-0 mx-auto flex max-w-7xl flex-col gap-8 px-6 pt-10 sm:px-16 sm:pb-32`}
      >
        <span className="hash-span" id={"about"}>
          &nbsp;
        </span>

        <div className="relative">
          <div className="relative z-10 flex flex-col gap-8">
            <motion.div variants={textVariant()} className="flex flex-col">
              <h2 className={styles.sectionHeadText}>Simon Hylander</h2>

              <p className={`${styles.sectionSubText}`}>
                Senior Software Engineer / Lead Engineer
              </p>

              <p className="text-[17px] leading-6">
                With over <strong>11 years</strong> of professional experience, I have a diverse skillset over the entire stack in a number of different <strong>technologies</strong>.
              </p>

              <p className="text-[17px] leading-6">
                I am especially excited about creating <strong>scalable</strong> and <strong>performant</strong> architectures using serverless technologies, as well as <strong>developer tooling</strong> that enable teams to move fast.
              </p>
            </motion.div>

            <div>
              <motion.p
                variants={textVariant2()}
                className="text-[17px] leading-6"
              >
                As <strong>Lead Engineer</strong> at {" "}
                <a
                  href="https://byggdagboken.se/"
                  target="_blank"
                  rel="noreferrer"
                  className="text-[#EAAA3D] hover:underline"
                >
                  Byggdagboken
                </a>
                , I personally oversee the <strong>web</strong> and <strong>app</strong> teams, focusing on building a <strong>scalable</strong>, {" "}
                <strong>modern</strong> architecture that empowers our frontend developers to maximize productivity and
                deliver high-quality user experiences.
                <br/>

                Outside of this, my current focus has shifted to evolving our backend to meet growing demands for scalability, performance, and reliability.              </motion.p>
            </div>
          </div>
        </div>
      </motion.section>

      <TechCarousel languages={languages} />
    </>
  );
};

export default About;
