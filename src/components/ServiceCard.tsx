import { Tilt } from "react-tilt";
import { motion, useAnimate } from "framer-motion";
import { useEffect, useState } from "react";
import { fadeIn } from "~/utils/motion";
import { useAboutStore } from "~/store/about-store";
import { Language } from "~/data/about";

import { twMerge as tw } from "tailwind-merge";

type ServiceCardProps = {
  index?: number;
  language: Language;
  className?: string;
};

const ServiceCard = ({ index, language, className }: ServiceCardProps) => {
  const { initiallyLoaded, setInitiallyLoaded, selectedCard, setSelectedCard } =
    useAboutStore();
  const [scope, animate] = useAnimate();

  const [isHover, setHover] = useState(false);
  const [isVisible, setVisible] = useState(false);

  const handleMouseEnter = () => {
    setHover(true);
  };

  const handleMouseLeave = () => {
    setHover(false);
  };

  const handleClick = () => {
    setSelectedCard(language);
  };

  useEffect(() => {
    if (!isVisible && isHover) {
      setTimeout(() => {
        setVisible(true);
      }, 1000);
    }
  }, [isHover, isVisible]);

  useEffect(() => {
    /* const direction = left.includes(index ?? 0) ? "left" : "right";

    animate(scope.current, {
      hidden: {
        x: direction === "left" ? 100 : direction === "right" ? -100 : 0,
        y: 0,
        opacity: 0,
      },
      show: {
        x: 0,
        y: 0,
        opacity: 1,
        transition: {
          type: "spring",
          delay: delay(),
          duration: 1,
          ease: "easeOut",
        },
      },
    }); */

    if (scope.current) {
      if (!initiallyLoaded) {
        animate(
          scope.current,
          {
            opacity: 1,
            x: 100,
            scale: selectedCard ? 0.8 : 1,
          },
          {
            duration: 0.3,
            delay: delay(),
          }
        );
        setInitiallyLoaded(true);
      } else {
        animate(
          scope.current,
          {
            opacity: 1,
            x: 0,
            scale: 1,
          },
          {
            duration: 0.3,
          }
        );
      }
    }
  }, []);

  useEffect(() => {
    animate(
      scope.current,
      {
        x: 0,
        scale: selectedCard ? 0.8 : 1,
      },
      {
        duration: 0.3,
      }
    );
  }, [selectedCard]);

  const left = [0, 1, 4];

  const delay = () => {
    switch (index) {
      case 0:
        return 0.5;
      case 1:
        return 0.7;
      case 2:
        return 1;
      case 3:
        return 1.2;
      case 4:
        return 1.4;
      case 5:
        return 1.5;
    }

    return 0;
  };

  return (
    <Tilt
      className={tw(
        "xs:w-[250px] w-full",
        className,
        selectedCard
          ? ""
          : index === 4
          ? "md:col-start-2"
          : index === 5
          ? "md:col-start-3"
          : ""
      )}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        ref={scope}
        initial="hidden"
        variants={{
          hidden: {
            opacity: 0,
          },
        }}
        className="w-full rounded-[20px] p-[1px] shadow-card"
      >
        <button
          onClick={handleClick}
          className={tw(
            selectedCard ? "" : "px-12",
            `group flex min-h-[270px] w-[95%] cursor-pointer flex-col items-center justify-evenly rounded-[20px] bg-gradient-to-r from-purple-900 to-purple-800 py-5`
          )}
        >
          <h3
            className={`flex flex-col gap-2 text-center text-2xl font-bold text-red-100 transition-opacity duration-700 ease-in-out`}
          >
            {language.title && (
              <i
                className={tw(
                  `devicon-${language.icon}-plain group-hover:text-${language.icon}`,
                  "text-[5rem]  text-red-100 transition-all duration-200"
                )}
              ></i>
            )}
            {language.title}
          </h3>
        </button>
      </motion.div>
    </Tilt>
  );
};

export default ServiceCard;
