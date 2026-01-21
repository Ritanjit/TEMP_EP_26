import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AnimatedBackground } from './AnimatedBackground';
import { PreloaderText } from './PreloaderText';

/**
 * Preloader.tsx
 * 
 * Main orchestrator component for "The Whispering Soil" pre-loader.
 * Manages loading progress, visibility, and exit animations.
 */

interface PreloaderProps {
    /** Minimum duration to show preloader in ms (default: 8000ms for full story) */
    minDuration?: number;
    /** Skip preloader for returning visitors (checks localStorage) */
    skipForReturningVisitors?: boolean;
    /** Callback when preloader exits */
    onComplete?: () => void;
}

const STORAGE_KEY = 'euphuism2026_preloader_seen';
// REPLACE THIS URL with your actual music file path
const BACKGROUND_MUSIC_URL = 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-13.mp3';

export const Preloader: React.FC<PreloaderProps> = ({
    minDuration = 8000,
    skipForReturningVisitors = false,
    onComplete
}) => {
    const [progress, setProgress] = useState(0);
    const [isVisible, setIsVisible] = useState(true);
    const [isExiting, setIsExiting] = useState(false);
    const [isMusicPlaying, setIsMusicPlaying] = useState(false);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    // Initial check for skipped preloader
    useEffect(() => {
        if (skipForReturningVisitors && typeof window !== 'undefined') {
            const hasSeen = localStorage.getItem(STORAGE_KEY);
            if (hasSeen) {
                setIsVisible(false);
                onComplete?.();
                return;
            }
        }
    }, [skipForReturningVisitors, onComplete]);

    // Initialize Audio
    useEffect(() => {
        if (!isVisible) return;
        
        audioRef.current = new Audio(BACKGROUND_MUSIC_URL);
        audioRef.current.loop = true;
        
        return () => {
            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current = null;
            }
        };
    }, [isVisible]);

    // Simulate loading progress
    useEffect(() => {
        if (!isVisible || isExiting) return;

        const startTime = Date.now();
        let animationFrame: number;

        const updateProgress = () => {
            const elapsed = Date.now() - startTime;
            const totalDuration = minDuration;

            // Calculate progress based on elapsed time
            let newProgress = Math.min((elapsed / totalDuration) * 25, 100);

            // Apply easing for more natural feel
            newProgress = easeOutQuart(newProgress / 100) * 120;

            setProgress(newProgress);

            if (newProgress < 100) {
                animationFrame = requestAnimationFrame(updateProgress);
            } else {
                handleComplete();
            }
        };

        animationFrame = requestAnimationFrame(updateProgress);

        return () => {
            if (animationFrame) cancelAnimationFrame(animationFrame);
        };
    }, [isVisible, minDuration, isExiting]);

    const easeOutQuart = (x: number): number => {
        return 1 - Math.pow(1 - x, 4);
    };

    const handleComplete = useCallback(() => {
        if (isExiting) return;
        
        if (typeof window !== 'undefined') {
            localStorage.setItem(STORAGE_KEY, 'true');
        }

        setIsExiting(true);

        // Fade out music if playing
        if (audioRef.current && isMusicPlaying) {
            const fadeOut = setInterval(() => {
                if (audioRef.current && audioRef.current.volume > 0.1) {
                    audioRef.current.volume -= 0.1;
                } else {
                    clearInterval(fadeOut);
                    audioRef.current?.pause();
                }
            }, 100);
        }

        setTimeout(() => {
            setIsVisible(false);
            onComplete?.();
        }, 800);
    }, [onComplete, isMusicPlaying, isExiting]);

    const skipStory = () => {
        setProgress(100);
        handleComplete();
    };

    const toggleMusic = () => {
        if (!audioRef.current) return;

        if (isMusicPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play().catch(e => console.error("Audio play failed:", e));
        }
        setIsMusicPlaying(!isMusicPlaying);
    };

    if (!isVisible) return null;

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    className="fixed inset-0 z-[9999]"
                    initial={{ y: 0 }}
                    exit={{ y: '-100%' }}
                    transition={{
                        duration: 0.8,
                        ease: [0.22, 1, 0.36, 1]
                    }}
                    style={{ willChange: 'transform' }}
                >
                    <AnimatedBackground />
                    <PreloaderText progress={progress} />

                    {/* Preloader Controls */}
                    <div className="absolute top-4 lg:top-8 right-4 lg:right-8 z-50 flex flex-col-reverse lg:flex-row items-end lg:items-center gap-8 lg:gap-7">
                        {/* Music Button with Water Ripple Effect */}
                        <div className="relative flex items-center justify-center" style={{ width: '40px', height: '40px' }}>
                            {/* Water Ripple Rings - only show when NOT playing */}
                            {!isMusicPlaying && (
                                <>
                                    <motion.div
                                        className="absolute rounded-full"
                                        style={{ 
                                            width: '40px', 
                                            height: '40px',
                                            border: '2px solid var(--euphuism-beige)' 
                                        }}
                                        initial={{ scale: 1, opacity: 0 }}
                                        animate={{
                                            scale: [1, 1.6, 2.2],
                                            opacity: [0, 0.5, 0],
                                        }}
                                        transition={{
                                            duration: 2,
                                            repeat: Infinity,
                                            ease: "easeOut",
                                            repeatDelay: 0,
                                        }}
                                    />
                                    <motion.div
                                        className="absolute rounded-full"
                                        style={{ 
                                            width: '40px', 
                                            height: '40px',
                                            border: '2px solid var(--euphuism-beige)' 
                                        }}
                                        initial={{ scale: 1, opacity: 0 }}
                                        animate={{
                                            scale: [1, 1.5, 2],
                                            opacity: [0, 0.4, 0],
                                        }}
                                        transition={{
                                            duration: 2,
                                            repeat: Infinity,
                                            delay: 0.8,
                                            ease: "easeOut",
                                            repeatDelay: 0,
                                        }}
                                    />
                                </>
                            )}

                            <motion.button
                                onClick={toggleMusic}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="relative z-10 flex items-center justify-center cursor-pointer transition-all duration-300 group"
                                style={{
                                    width: '40px',
                                    height: '40px',
                                    borderRadius: '50%',
                                    backgroundColor: 'transparent',
                                    border: '2px solid var(--euphuism-beige)',
                                }}
                                aria-label={isMusicPlaying ? "Pause Music" : "Play Music"}
                                title={!isMusicPlaying ? "🎵 Click to play music" : "Pause music"}
                            >
                                {/* Hover background fill */}
                                <span 
                                    className="absolute inset-0 rounded-full transition-all duration-300 opacity-0 group-hover:opacity-100"
                                    style={{ backgroundColor: 'var(--euphuism-beige)' }}
                                />
                                {/* Icon */}
                                {isMusicPlaying ? (
                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="relative z-10 transition-colors duration-300" style={{ stroke: 'var(--euphuism-beige)' }}><rect x="6" y="4" width="4" height="16" className="group-hover:stroke-[var(--euphuism-green)]"></rect><rect x="14" y="4" width="4" height="16" className="group-hover:stroke-[var(--euphuism-green)]"></rect></svg>
                                ) : (
                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="relative z-10 transition-colors duration-300" style={{ stroke: 'var(--euphuism-beige)' }}><polygon points="5 3 19 12 5 21 5 3" className="group-hover:stroke-[var(--euphuism-green)]"></polygon></svg>
                                )}
                            </motion.button>
                        </div>

                        {/* Skip Story Button - Transparent with hover fill */}
                        <button
                            onClick={skipStory}
                            className="relative inline-flex items-center justify-center overflow-hidden tracking-wider rounded-md cursor-pointer transition-all duration-300 group"
                            style={{
                                backgroundColor: 'transparent',
                                border: '2px solid var(--euphuism-beige)',
                                height: '40px',
                                paddingLeft: '20px',
                                paddingRight: '20px',
                            }}
                        >
                            {/* Hover background fill */}
                            <span 
                                className="absolute inset-0 transition-all duration-300 opacity-0 group-hover:opacity-100"
                                style={{ backgroundColor: 'var(--euphuism-beige)' }}
                            />
                            {/* Button text */}
                            <span 
                                className="relative text-sm font-bold uppercase flex items-center gap-2 transition-colors duration-300"
                                style={{ color: 'var(--euphuism-beige)' }}
                            >
                                <span className="group-hover:text-[var(--euphuism-green)]">Skip Story</span>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-all duration-300 group-hover:translate-x-1" style={{ stroke: 'var(--euphuism-beige)' }}><polyline points="13 17 18 12 13 7" className="group-hover:stroke-[var(--euphuism-green)]"></polyline><polyline points="6 17 11 12 6 7" className="group-hover:stroke-[var(--euphuism-green)]"></polyline></svg>
                            </span>
                        </button>
                    </div>

                    {/* Exit flash effect */}
                    {/* <AnimatePresence>
                        {isExiting && (
                            <motion.div
                                className="absolute inset-0 z-50 pointer-events-none"
                                initial={{ opacity: 100 }}
                                animate={{ opacity: [100, 0] }}
                                transition={{ duration: 5, times: [0, 1] }}
                                style={{ backgroundColor: 'var(--euphuism-beige)' }}
                            />
                        )}
                    </AnimatePresence> */}
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default Preloader;
