/**
 * HeroParallax.tsx - Scroll-Linked Parallax Hero Component
 * 
 * This is a REACT ISLAND - it only loads on the homepage.
 * Uses Framer Motion's useMotionValue and useTransform for smooth parallax effects.
 * 
 * USAGE in Astro:
 * ---
 * import HeroParallax from '@components/react/hero/HeroParallax';
 * ---
 * <HeroParallax client:load />
 * 
 * Parallax Effects:
 * - Trees (left/right): Move outward + fade out on scroll
 * - Backdrop: Zooms in on scroll
 * - Logo: Drops from top + slight zoom on scroll
 */

import { useEffect, useState, useRef, useCallback } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';

export default function HeroParallax() {
  // Use a motion value that we'll update manually based on scroll
  const scrollProgress = useMotionValue(0);
  const [isClient, setIsClient] = useState(false);
  const rafRef = useRef<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Memoized scroll handler for performance
  const handleScroll = useCallback(() => {
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
    }

    rafRef.current = requestAnimationFrame(() => {
      // Try multiple scroll sources for cross-browser compatibility
      const scrollY = Math.max(
        window.scrollY || 0,
        document.documentElement?.scrollTop || 0,
        document.body?.scrollTop || 0
      );

      // Get the hero section height (200vh = 2 * viewport height)
      const heroHeight = window.innerHeight * 2;
      const scrollRange = heroHeight - window.innerHeight;

      // Calculate scroll progress (0 to 1) based on how far we've scrolled through the hero
      const progress = Math.min(Math.max(scrollY / scrollRange, 0), 1);
      scrollProgress.set(progress);
    });
  }, [scrollProgress]);

  useEffect(() => {
    setIsClient(true);

    // Initial call
    handleScroll();

    // Listen for scroll events on multiple targets for cross-browser compatibility
    window.addEventListener('scroll', handleScroll, { passive: true });
    document.addEventListener('scroll', handleScroll, { passive: true });
    document.body?.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('scroll', handleScroll);
      document.body?.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  // Transform values for parallax effects
  // Trees: Move outward (0 to ±300px) + fade out (1 to 0)
  const treeLeftX = useTransform(scrollProgress, [0, 0.8], [0, -300]);
  const treeRightX = useTransform(scrollProgress, [0, 0.8], [0, 300]);
  const treeOpacity = useTransform(scrollProgress, [0, 0.6], [1, 0]);

  // Backdrop: Zoom in (1 to 1.4)
  const backdropScale = useTransform(scrollProgress, [0, 1], [1, 1.4]);

  // Logo: Start visible and drop down + zoom in as scroll progresses
  // At start (0): logo is at y=0, opacity 1, scale 0.95
  // At 0.5: logo is at y=50 (dropped slightly), scale 1.1
  const logoY = useTransform(scrollProgress, [0, 0.5], [0, 80]);
  const logoScale = useTransform(scrollProgress, [0, 0.5], [0.95, 1.2]);

  // Scroll indicator fade out
  const scrollIndicatorOpacity = useTransform(scrollProgress, [0, 0.15], [1, 0]);

  // Don't render until client-side to avoid hydration issues
  if (!isClient) {
    return (
      <div
        style={{
          height: '200vh',
          width: '100%',
          backgroundColor: '#EFE6C1'
        }}
      />
    );
  }

  return (
    <div
      ref={containerRef}
      className="hero-parallax-container"
      style={{
        height: '200vh', // Extra height for scroll-linked animation
        position: 'relative',
        width: '100%',
        overflow: 'hidden',
      }}
    >
      {/* Sticky wrapper to keep elements fixed during scroll */}
      <div
        style={{
          position: 'sticky',
          top: 0,
          height: '100vh',
          width: '100%',
          overflow: 'hidden',
          backgroundColor: '#EFE6C1', // Beige fallback
        }}
      >
        {/* Backdrop Layer - Tea field scenery */}
        <motion.div
          style={{
            position: 'absolute',
            inset: 0,
            scale: backdropScale,
            transformOrigin: 'center center',
          }}
        >
          <img
            src="/hero/backdrop.png"
            alt="Scenic tea field backdrop"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center bottom',
            }}
          />
        </motion.div>

        {/* Logo - Visible from start, drops down and zooms as user scrolls */}
        <motion.div
          style={{
            position: 'absolute',
            top: '10%',
            left: '50%',
            x: '-50%',
            y: logoY,
            scale: logoScale,
            zIndex: 10,
          }}
        >
          <img
            src="/Euphuism26 logo m2.png"
            alt="Euphuism 2026 - Roots & Resilience"
            style={{
              width: 'min(85vw, 650px)',
              height: 'auto',
              filter: 'drop-shadow(0 4px 20px rgba(0,0,0,0.3))',
            }}
          />
        </motion.div>

        {/* Left Tree */}
        <motion.div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            x: treeLeftX,
            opacity: treeOpacity,
            zIndex: 20,
          }}
        >
          <img
            src="/hero/tree1.png"
            alt=""
            aria-hidden="true"
            style={{
              height: '100vh',
              width: 'auto',
              maxWidth: '100vw',
              objectFit: 'contain',
              objectPosition: 'left top',
            }}
          />
        </motion.div>

        {/* Right Tree */}
        <motion.div
          style={{
            position: 'absolute',
            top: 0,
            right: 0,
            x: treeRightX,
            opacity: treeOpacity,
            zIndex: 20,
          }}
        >
          <img
            src="/hero/tree2.png"
            alt=""
            aria-hidden="true"
            style={{
              height: '100vh',
              width: 'auto',
              maxWidth: '100vw',
              objectFit: 'contain',
              objectPosition: 'right top',
            }}
          />
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          style={{
            position: 'absolute',
            bottom: '2rem',
            left: '50%',
            x: '-50%',
            opacity: scrollIndicatorOpacity,
            zIndex: 30,
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '0.5rem',
              color: '#2D3E10',
              fontFamily: 'var(--font-heading, system-ui)',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              fontSize: '0.875rem',
            }}
          >
            <span>Scroll to Explore</span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 5v14M5 12l7 7 7-7" />
              </svg>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
