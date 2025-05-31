"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Language } from "~/data/about";
import { cn } from "~/lib/utils";

export default function TechCarousel({ languages }: { languages: Language[] }) {
    const [width, setWidth] = useState(0);
    const carousel = languages.length * 400;

    useEffect(() => {
        setWidth(carousel);
    }, [carousel]);

    return (
        <div className="relative w-full overflow-hidden mt-16">
            <motion.div 
                className="flex"
                animate={{
                    x: [0, -width],
                }}
                transition={{
                    duration: 120,
                    ease: "linear",
                    repeat: Infinity,
                }}
                style={{
                    width: `${width}px`,
                }}
            >
                {[...languages, ...languages, ...languages].map((language, i) => (
                    <LanguageItem
                        key={i}
                        language={language}
                    />
                ))}
            </motion.div>
        </div>
    );
}

function LanguageItem({ language }: { language: Language }  ) {
    return (
        <div className="inline-flex items-center px-4 w-[400px]">
            <div className={cn("w-full")}>
                <div className="flex items-center justify-center">
                    <h3 className="flex flex-col gap-1 text-center text-1xl font-bold text-red-100">
                        {language.title && (
                            <i
                                className={cn(
                                    `devicon-${language.icon}-plain text-${language.icon}`,
                                    `text-5xl text-${language.icon} transition-all duration-200`
                                )}
                            ></i>
                        )}
                        {language.title}
                    </h3>
                </div>
            </div>
        </div>
    );
}