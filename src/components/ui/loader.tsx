"use client";
import { motion } from "framer-motion";
import React from "react";

/**
 * LoaderThree - Animated SVG bolt/lightning loader
 * Uses path animation for a sleek loading effect
 */
export const LoaderThree = () => {
    return (
        <motion.svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-20 w-20 stroke-lime-900"
        >
            <motion.path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <motion.path
                initial={{ pathLength: 0, fill: "var(--euphuism-beige)" }}
                animate={{ pathLength: 1, fill: "var(--euphuism-beige)" }}
                transition={{
                    duration: 2,
                    ease: "easeInOut",
                    repeat: Infinity,
                    repeatType: "reverse",
                }}
                d="M13 3l0 7l6 0l-8 11l0 -7l-6 0l8 -11"
            />
        </motion.svg>
    );
};

/**
 * LoaderFive - Shimmer text loading effect
 * Each character animates with a wave-like shimmer
 */
export const LoaderFive = ({ text }: { text: string }) => {
    return (
        <div className="font-[family-name:var(--font-heading)] font-bold text-2xl text-[var(--euphuism-green)] [--shadow-color:var(--color-neutral-500)] dark:[--shadow-color:var(--color-neutral-100)]">
            {text.split("").map((char, i) => (
                <motion.span
                    key={i}
                    className="inline-block"
                    initial={{ scale: 1, opacity: 0.5 }}
                    animate={{
                        scale: [1, 1.1, 1],
                        textShadow: [
                            "0 0 0 var(--shadow-color)",
                            "0 0 1px var(--shadow-color)",
                            "0 0 0 var(--shadow-color)",
                        ],
                        opacity: [0.5, 1, 0.5],
                    }}
                    transition={{
                        duration: 0.5,
                        repeat: Infinity,
                        repeatType: "loop",
                        delay: i * 0.05,
                        ease: "easeInOut",
                        repeatDelay: 2,
                    }}
                >
                    {char === " " ? "\u00A0" : char}
                </motion.span>
            ))}
        </div>
    );
};
