"use client";
import { useEffect } from "react";
import { motion, stagger, useAnimate } from "framer-motion";
import { cn } from "../../lib/utils";

export const TextGenerateEffect = ({
    sentences,
    className,
    filter = true,
    duration = 0.5,
    staggerDelay = 0.8, // Delay between each sentence
}: {
    sentences: string[]; // Array of sentences instead of single string
    className?: string;
    filter?: boolean;
    duration?: number;
    staggerDelay?: number;
}) => {
    const [scope, animate] = useAnimate();

    useEffect(() => {
        animate(
            "div.sentence",
            {
                opacity: 1,
                filter: filter ? "blur(0px)" : "none",
            },
            {
                duration: duration ? duration : 2,
                delay: stagger(staggerDelay), // Delay between sentences
            }
        );
    }, [scope.current, animate, filter, duration, staggerDelay]);

    const renderSentences = () => {
        return (
            <motion.div ref={scope} className="space-y-4 sm:space-y-6">
                {sentences.map((sentence, idx) => {
                    return (
                        <div
                            key={idx}
                            className="sentence opacity-0"
                            style={{
                                filter: filter ? "blur(10px)" : "none",
                                color: "var(--euphuism-beige)",
                            }}
                        >
                            {sentence}
                        </div>
                    );
                })}
            </motion.div>
        );
    };

    return (
        <div className={cn("font-medium", className)}>
            <div className="leading-relaxed tracking-wide">
                {renderSentences()}
            </div>
        </div>
    );
};
