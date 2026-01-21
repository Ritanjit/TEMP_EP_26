import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AnimatedBackground } from './AnimatedBackground';
import { PreloaderText } from './PreloaderText';
import { useImagePreloader } from '../../../hooks/useImagePreloader';

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

// Hero section images to preload during preloader story
const HERO_IMAGES_TO_PRELOAD = [
    '/hero/backdrop1.png',
    '/hero/backdrop2.png',
    '/hero/tree1.png',
    '/hero/tree2.png',
    '/hero/bihu.png',
    '/Euphuism26 logo m2.png'
];

// ============================================
// STORY START DELAY CONFIGURATION
// ============================================
// Delay (in milliseconds) before the story text starts animating.
// Increase this value to wait longer before the story begins.
// Decrease this value to start the story sooner.
// Set to 0 for no delay (immediate start).
// Default: 2000ms (2 seconds)
const STORY_START_DELAY_MS = 1500;
// ============================================

export const Preloader: React.FC<PreloaderProps> = ({
    minDuration = 8000,
    skipForReturningVisitors = false,
    onComplete
}) => {
    const [progress, setProgress] = useState(0);
    const [isVisible, setIsVisible] = useState(true);
    const [storyStarted, setStoryStarted] = useState(false);
    const [isExiting, setIsExiting] = useState(false);
    const [isMusicPlaying, setIsMusicPlaying] = useState(false);
    const [storyComplete, setStoryComplete] = useState(false);
    const [exitAnimationClass, setExitAnimationClass] = useState('');
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const preloaderRef = useRef<HTMLDivElement | null>(null);

    // Preload hero images in background while story plays
    const { isLoaded: imagesLoaded, progress: imageProgress } = useImagePreloader(HERO_IMAGES_TO_PRELOAD);

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

    // Start story after delay
    useEffect(() => {
        if (!isVisible || isExiting) return;

        // Wait for STORY_START_DELAY_MS before starting the story
        const delayTimer = setTimeout(() => {
            setStoryStarted(true);
        }, STORY_START_DELAY_MS);

        return () => clearTimeout(delayTimer);
    }, [isVisible, isExiting]);

    // Simulate loading progress (only runs after story has started)
    useEffect(() => {
        if (!isVisible || isExiting || !storyStarted) return;

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
                // Story timing complete - mark as ready
                setStoryComplete(true);
            }
        };

        animationFrame = requestAnimationFrame(updateProgress);

        return () => {
            if (animationFrame) cancelAnimationFrame(animationFrame);
        };
    }, [isVisible, minDuration, isExiting, storyStarted]);

    // Exit when BOTH story is complete AND images are loaded
    useEffect(() => {
        if (storyComplete && imagesLoaded && !isExiting) {
            handleComplete();
        }
    }, [storyComplete, imagesLoaded, isExiting]);

    const easeOutQuart = (x: number): number => {
        return 1 - Math.pow(1 - x, 4);
    };

    const handleComplete = useCallback(() => {
        if (isExiting) return;

        if (typeof window !== 'undefined') {
            localStorage.setItem(STORAGE_KEY, 'true');
        }

        setIsExiting(true);

        // Apply animate.css zoomOutUp exit animation
        setExitAnimationClass('animate__animated animate__fadeOutUp');

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

        // Listen for animation end, then hide preloader
        const element = preloaderRef.current;
        if (element) {
            const handleAnimationEnd = () => {
                setIsVisible(false);
                onComplete?.();
                element.removeEventListener('animationend', handleAnimationEnd);
            };
            element.addEventListener('animationend', handleAnimationEnd);
        } else {
            // Fallback if ref not available
            setTimeout(() => {
                setIsVisible(false);
                onComplete?.();
            }, 800);
        }
    }, [onComplete, isMusicPlaying, isExiting]);

    const skipStory = () => {
        setProgress(100);
        setStoryComplete(true);
        // If images aren't loaded yet, force complete anyway (user chose to skip)
        if (!imagesLoaded) {
            handleComplete();
        }
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
                <div
                    ref={preloaderRef}
                    className={`fixed inset-0 z-[9999] ${exitAnimationClass}`}
                    style={{
                        willChange: 'transform, opacity',
                        // Custom animate.css duration
                        '--animate-duration': '0.8s'
                    } as React.CSSProperties}
                >
                    <AnimatedBackground />
                    {storyStarted && <PreloaderText progress={progress} />}

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

                        {/* Skip Story / Loading Progress Button */}
                        {imagesLoaded ? (
                            // Skip Story Button - only shows when images are loaded
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
                        ) : (
                            // Loading Progress Button - non-functional, shows loading %
                            <div
                                className="relative inline-flex items-center justify-center overflow-hidden tracking-wider rounded-md transition-all duration-300"
                                style={{
                                    backgroundColor: 'transparent',
                                    border: '2px solid var(--euphuism-beige)',
                                    height: '40px',
                                    paddingLeft: '20px',
                                    paddingRight: '20px',
                                    opacity: 0.7,
                                    cursor: 'default',
                                }}
                            >
                                {/* Progress bar fill */}
                                <span
                                    className="absolute inset-0 transition-all duration-500 ease-out"
                                    style={{
                                        backgroundColor: 'var(--euphuism-beige)',
                                        opacity: 0.2,
                                        width: `${imageProgress}%`,
                                    }}
                                />
                                {/* Loading text */}
                                <span
                                    className="relative text-sm font-bold uppercase flex items-center gap-2"
                                    style={{ color: 'var(--euphuism-beige)' }}
                                >
                                    <span>Loading {imageProgress}%</span>
                                </span>
                            </div>
                        )}
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
                </div>
            )}
        </AnimatePresence>
    );
};

export default Preloader;
