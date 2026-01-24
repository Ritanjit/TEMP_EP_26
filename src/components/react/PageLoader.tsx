/**
 * PageLoader.tsx
 * 
 * Full-screen loading overlay that shows during page transitions.
 * Uses LoaderThree (animated bolt SVG) as the loading indicator.
 * Also exports LoaderFive (shimmer text) for alternative use.
 * 
 * This component integrates with Astro's View Transitions API.
 */

import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { LoaderThree, LoaderFive } from '../ui/loader';

interface PageLoaderProps {
    /** Text to show below the loader (optional) */
    text?: string;
    /** Whether to use shimmer text loader instead of SVG loader */
    useShimmer?: boolean;
    /** Shimmer text (only used if useShimmer is true) */
    shimmerText?: string;
}

export default function PageLoader({
    text = "Loading...",
    useShimmer = false,
    shimmerText = "Loading..."
}: PageLoaderProps) {
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        // Minimum time to show loader (ms) - allows animation to complete at least once
        const MIN_LOADER_DURATION = 2000;

        // Listen for Astro View Transitions events
        // Use 'before-preparation' which fires at navigation START (before fetch)
        // This gives the loader time to render while the new page is being fetched
        const handleBeforePreparation = (event: any) => {
            setIsLoading(true);
            
            // Wrap the loader to add a minimum delay
            // This ensures the loader animation completes at least once
            const originalLoader = event.loader;
            event.loader = async () => {
                const startTime = Date.now();
                
                // Wait for original loader (page fetch) to complete
                await originalLoader();
                
                // Calculate remaining time to reach minimum duration
                const elapsed = Date.now() - startTime;
                const remainingTime = MIN_LOADER_DURATION - elapsed;
                
                // If page loaded faster than minimum, wait the remaining time
                if (remainingTime > 0) {
                    await new Promise(resolve => setTimeout(resolve, remainingTime));
                }
            };
        };

        const handleAfterSwap = () => {
            // Small delay to ensure smooth transition
            setTimeout(() => {
                setIsLoading(false);
            }, 100);
        };

        const handlePageLoad = () => {
            setIsLoading(false);
        };

        // Astro View Transitions events
        // 'before-preparation' fires at navigation start (CORRECT - gives time to show loader)
        // 'before-swap' fires right before DOM swap (TOO LATE - no time to render)
        document.addEventListener('astro:before-preparation', handleBeforePreparation);
        document.addEventListener('astro:after-swap', handleAfterSwap);
        document.addEventListener('astro:page-load', handlePageLoad);

        return () => {
            document.removeEventListener('astro:before-preparation', handleBeforePreparation);
            document.removeEventListener('astro:after-swap', handleAfterSwap);
            document.removeEventListener('astro:page-load', handlePageLoad);
        };
    }, []);

    return (
        <AnimatePresence>
            {isLoading && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[var(--euphuism-green)]/5 backdrop-blur-sm"
                >
                    {useShimmer ? (
                        <LoaderFive text={shimmerText} />
                    ) : (
                        <>
                            <LoaderThree />
                            <div className="mt-4">
                                <LoaderFive text="Euphuism 2026" />
                            </div>
                        </>
                    )}
                </motion.div>
            )}
        </AnimatePresence>
    );
}
