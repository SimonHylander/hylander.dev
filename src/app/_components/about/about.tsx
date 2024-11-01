"use client";

import { motion, useAnimate, useScroll, useTransform } from "framer-motion";
import ServiceCard from "~/components/ServiceCard";

import { styles } from "~/styles";

import {
  fadeInLeft,
  staggerContainer,
  textFadeIn,
  textVariant,
  textVariant2,
} from "~/utils/motion";

import { useAboutStore } from "~/store/about-store";
import { Language, Library } from "~/data/about";

import { X } from "lucide-react";

import { ParentSize } from "@visx/responsive";
import { useEffect, useMemo, useRef } from "react";
import { Pack, hierarchy } from "@visx/hierarchy";
import { twMerge as tw, twMerge } from "tailwind-merge";
import Delayed from "../Delay";
import { useMediaQuery } from "react-responsive";

const About = ({ languages }: { languages: Language[] }) => {
  const { selectedCard, setSelectedCard, fadeInCard } = useAboutStore();
  const [scope, animate] = useAnimate();

  const targetRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"],
  });

  const x = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  const selectedCardRef = useRef<HTMLElement>();

  const isMobile = useMediaQuery({ query: "(max-width: 1024px)" });

  const closeCard = async () => {
    await animate(
      scope.current,
      { scale: 0.5, opacity: 0, y: "25%" },
      { duration: 0.3 }
    );

    setSelectedCard(undefined);
  };

  useEffect(() => {
    if (scope?.current && fadeInCard === true) {
      animate(
        scope.current,
        { y: "0", opacity: 1, scale: 1 },
        { duration: 0.3 }
      );
    }
  }, [scope, fadeInCard]);

  useEffect(() => {
    if (selectedCardRef?.current && selectedCard) {
      const rect = selectedCardRef.current.getBoundingClientRect();

      function isInViewport(rect: DOMRect) {
        return (
          rect.top >= 0 &&
          rect.left >= 0 &&
          rect.bottom <=
            (window.innerHeight || document.documentElement.clientHeight) &&
          rect.right <=
            (window.innerWidth || document.documentElement.clientWidth)
        );
      }

      if (!isInViewport(rect)) {
        selectedCardRef.current.scrollIntoView({
          behavior: "smooth",
          block: "end",
          inline: "nearest",
        });
      }
    }
  }, [selectedCardRef, selectedCard]);

  return (
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
        <div className="relative z-10 flex max-w-[700px] flex-col gap-8">
          <motion.div variants={textVariant()} className="flex flex-col">
            <p className={styles.sectionSubText}>Introduction</p>
            <h2 className={styles.sectionHeadText}>Simon Hylander</h2>

            <p className={`${styles.sectionSubText}`}>
              Senior Software Engineer
            </p>

            <p className="text-[17px] leading-6">
              I am a self-taught software engineer from Sweden with 10 years of
              professional experience. I have a diverse skillset in both
              frontend and backend development as well as integrations,
              architecture, documentation and some DevOps.
              I also have previous experience in being team lead and mentoring junior developers.
            </p>
          </motion.div>

          <div>
            <motion.p
              variants={textVariant2()}
              className="text-[17px] leading-6"
            >
              As Client Lead at {" "}
              <a
                href="https://byggdagboken.se/"
                target="_blank"
                rel="noreferrer"
                className="text-[#EAAA3D] hover:underline"
              >
                Byggdagboken
              </a>
              , I oversee the web and app teams, focusing on building a scalable,
              modern architecture that empowers our frontend developers to maximize productivity and
              deliver high-quality user experiences.
              I act as a key liaison between our native app team and backend services,
              ensuring seamless integration and alignment across projects to drive efficient,
              cohesive development.
            </motion.p>
          </div>
        </div>

        {!isMobile && (
          <motion.img
            style={{ x }}
            variants={fadeInLeft(0.5)}
            src="/binarysearch.png"
            className="pointer-events-none absolute right-0 top-0 z-0 hidden w-[400px] rounded-xl lg:block"
          />
        )}
        {/* <motion.div
            style={isMobile ? {} : { x, scale }}
            className="w-full bg-contact bg-no-repeat text-2xl leading-[1] text-red-100 lg:h-[924px] lg:w-[1362px]"
          ></motion.div> */}
      </div>

      <div className={`${selectedCard ? "" : "py-20"} `}>
        <div
          ref={scope}
          className="mx-auto w-[250px] translate-y-[25%] scale-50 transform opacity-50 "
        >
          {selectedCard && (
            <>
              <div
                className="relative right-2 top-6 flex justify-end"
                ref={selectedCardRef}
              >
                <button
                  type="button"
                  className={twMerge(
                    "transform rounded-full bg-white p-2 text-black transition-transform duration-200 hover:scale-110 focus:scale-100"
                  )}
                  onClick={closeCard}
                >
                  <X size={18} fill="#fff" stroke="#000" />
                </button>
              </div>
              <div className="w-full rounded-[20px] p-[1px] shadow-card">
                <div className="flex min-h-[270px] flex-col rounded-[20px] bg-gradient-to-r from-purple-900 to-purple-800 py-6">
                  <Delayed delay={100}>
                    <Libraries sponsors={selectedCard.libraries || []} />
                  </Delayed>
                </div>
              </div>
            </>
          )}
        </div>

        <div
          className={tw(
            selectedCard ? "gap-0 md:grid-cols-5" : "gap-10 md:grid-cols-4",
            `align-content-center grid grid-cols-1 items-center justify-center `
          )}
        >
          {languages
            .filter((l) =>
              selectedCard !== undefined && l.title === selectedCard.title
                ? false
                : true
            )
            .map((language, i) => {
              return (
                <ServiceCard
                  key={i}
                  language={language}
                  index={i}
                  className={`justify-self-center`}
                />
              );
            })}
        </div>
      </div>
    </motion.section>
  );
};

export default About;

function Libraries({ sponsors }: { sponsors: Library[] }) {
  const pack = useMemo(
    () => ({
      children: sponsors,
      name: "root",
      radius: 0,
      distance: 0,
    }),
    [sponsors]
  );

  const root = useMemo(
    () =>
      hierarchy(pack)
        .sum((d: any) => {
          return 1 + d.value;
        })
        .sort((a: any, b: any) => b.value - a.value),
    [pack]
  );

  return (
    <ParentSize>
      {({ width = 800 }) => {
        return width < 10 ? null : (
          <div
            style={{
              width,
              height: width,
              position: "relative",
            }}
          >
            <style
              dangerouslySetInnerHTML={{
                __html: `
              .lib-item {
                transition: all .2s ease;
                transform: translate(-50%, -50%);
              }

              .lib-item:hover {
                z-index: 10;
                transform: translate(-50%, -50%) scale(1.1);
              }

              .lib-item:hover .spon-tooltip {
                opacity: 1;
              }
            `,
              }}
            />
            <Pack root={root} size={[width, width]} padding={width * 0.005}>
              {(packData) => {
                const circles = packData.descendants().slice(1); // skip first layer
                return (
                  <div>
                    {[...circles].reverse().map((circle, i) => {
                      const tooltipX = circle.x > width / 2 ? "left" : "right";
                      const tooltipY = circle.y > width / 2 ? "top" : "bottom";

                      return (
                        <a
                          key={`circle-${i}`}
                          href={circle.data.href}
                          target="_blank"
                          rel="noreferrer"
                          className={`lib-item ` + `absolute z-0 rounded-full`}
                          style={{
                            fontSize: circle.r / 2,
                            left: circle.x,
                            top: circle.y,
                            width: circle.r * 2,
                            height: circle.r * 2,
                          }}
                        >
                          <motion.div
                            initial="hidden"
                            animate="visible"
                            variants={textFadeIn(i * 1.2)}
                            key={`circle-${i}`}
                            className={`absolute left-1/2 top-1/2 flex h-[95%] w-[95%] -translate-x-1/2 -translate-y-1/2
                              items-center justify-center 
                               text-red-200 
                              `}
                          >
                            {circle.data.name}
                          </motion.div>

                          <div
                            className={tw(
                              `spon-tooltip pointer-events-none absolute
                              flex transform flex-col items-center
                              text-white opacity-0
                            `,
                              tooltipX == "left"
                                ? `left-1/4 -translate-x-full`
                                : `right-1/4 translate-x-full`,
                              tooltipY == "top"
                                ? `top-1/4 -translate-y-full`
                                : `bottom-1/4 translate-y-full`
                            )}
                          ></div>
                        </a>
                      );
                    })}
                  </div>
                );
              }}
            </Pack>
          </div>
        );
      }}
    </ParentSize>
  );
}
