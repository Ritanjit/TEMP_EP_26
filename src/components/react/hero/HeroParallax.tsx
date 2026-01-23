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

import { useEffect, useState, useRef, useCallback, useMemo } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';

export default function HeroParallax() {
  // Use a motion value that we'll update manually based on scroll
  const scrollProgress = useMotionValue(0);
  const [isClient, setIsClient] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
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

    // Check if mobile on mount and resize
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 980);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);

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
      window.removeEventListener('resize', checkMobile);
    };
  }, [handleScroll]);

  // Transform values for parallax effects
  // Trees: Move outward (0 to ±300px) + fade out (1 to 0)
  const treeLeftX = useTransform(scrollProgress, [0, 0.8], [0, -300]);
  const treeRightX = useTransform(scrollProgress, [0, 0.8], [0, 300]);
  const treeOpacity = useTransform(scrollProgress, [0, 0.6], [1, 0]);

  // Backdrop: Zoom in (1 to 1.4)
  const backdropScale = useTransform(scrollProgress, [0, 1], [1, 1.4]);

  // Logo: Start hidden behind backdrop at bottom, rises up and zooms as scroll progresses
  // Mobile: Faster animation (0.3), larger end scale (1.5)
  // Desktop: Slightly slower (0.4), moderate scale (1.2)
  const logoAnimationEnd = isMobile ? 0.3 : 0.4;
  const logoY = useTransform(scrollProgress, [0, logoAnimationEnd], ['50vh', '-120%']);
  const logoScale = useTransform(scrollProgress, [0, logoAnimationEnd], [0, isMobile ? 1.5 : 1.2]);
  const logoZIndex = useTransform(scrollProgress, [0, 0.2], [5, 15]);

  // Track when logo should become sticky (after parallax completes)
  const [isLogoSticky, setIsLogoSticky] = useState(false);

  // Update sticky state based on scroll progress (matches animation end)
  useEffect(() => {
    const unsubscribe = scrollProgress.on('change', (value) => {
      setIsLogoSticky(value >= (isMobile ? 0.3 : 0.4));
    });
    return () => unsubscribe();
  }, [scrollProgress, isMobile]);

  // Scroll indicator fade out
  const scrollIndicatorOpacity = useTransform(scrollProgress, [0, 0.15], [1, 0]);

  // Hero decorative image: Randomly select between bihu.png and rhino.png on page load
  // Using useMemo to ensure random selection only happens once per page load
  const heroDecoImage = useMemo(() => {
    const images = ['/hero/bihu.png', '/hero/rhino.png'];
    return images[Math.floor(Math.random() * images.length)];
  }, []);

  // Hero decorative image: Scale down + fade out + move down as user scrolls
  // z-index 25 = above trees (20) but below logo's final z-index (100)
  const heroDecoScale = useTransform(scrollProgress, [0, 0.5], [1, 0.3]);
  const heroDecoOpacity = useTransform(scrollProgress, [0, 0.4], [1, 0]);
  const heroDecoY = useTransform(scrollProgress, [0, 0.5], [0, 200]);

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
        height: '100vh', // Extra height for scroll-linked animation
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
          // Reduce height on mobile to decrease gap with backdrop
          height: isMobile ? '45vh' : '100vh',
          width: '100%',
          overflow: 'hidden',
          backgroundColor: '#EFE6C1', // Beige fallback
          // When logo is sticky/fixed, elevate this wrapper above sponsors section (z-index: 30)
          // This solves the stacking context issue where logo was trapped in this wrapper's context
          zIndex: isLogoSticky ? 50 : 'auto',
        }}
      >
        {/* Backdrop Layer 1 - Tea field scenery */}
        <motion.div
          style={{
            position: 'absolute',
            inset: 0,
            scale: backdropScale,
            transformOrigin: 'center center',
            zIndex: 10, // Logo starts at z-index 5, so it's hidden behind this
          }}
        >
          <img
            src="/hero/backdrop1.png"
            alt="Scenic tea field backdrop"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center bottom',
            }}
          />
        </motion.div>

        {/* Backdrop Layer 2 - Tea field + mountain scenery */}
        <motion.div
          style={{
            position: 'absolute',
            inset: 0,
            scale: backdropScale,
            transformOrigin: 'center center',
            zIndex: 5, // Logo starts at z-index 5, so it's hidden behind this
          }}
        >
          <img
            src="/hero/backdrop2.png"
            alt="Scenic tea field & mountains backdrop"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center bottom',
            }}
          />
        </motion.div>

        {/* Logo - Starts hidden behind backdrop 1, rises up and becomes sticky at top */}
        <motion.div
          className={isLogoSticky ? 'animate__animated animate__slideInDown -translate-x-50/100' : ''}
          style={{
            position: isLogoSticky ? 'fixed' : 'absolute',
            // When sticky: positioned at top; When parallax: positioned at bottom
            ...(isLogoSticky
              ? { top: isMobile ? '10px' : '20px', bottom: 'auto' }
              : { bottom: '10%', top: 'auto' }
            ),
            left: '50%',
            x: '-50%',
            // When sticky: no Y transform; When parallax: use animated Y
            y: isLogoSticky ? 0 : logoY,
            // Keep scale at 1 (end value of parallax) when sticky for seamless transition
            scale: isLogoSticky ? 1 : logoScale,
            zIndex: isLogoSticky ? 1000 : logoZIndex, // 1000 = above sponsors (30)
            // Custom animation duration for slideInDown
            '--animate-duration': '0.5s',
          } as React.CSSProperties}
        >
          <img
            src="/Euphuism26 logo m2.png"
            alt="Euphuism 2026 - Roots & Resilience"
            style={{
              // Desktop: Sticky = smaller (300px), Parallax = larger (min(85vw, 650px))
              // Mobile: Always min(60vw, 400px)
              width: isMobile
                ? 'min(60vw, 400px)'
                : (isLogoSticky ? '300px' : 'min(85vw, 650px)'),
              height: 'auto',
              filter: 'drop-shadow(0 4px 20px rgba(0,0,0,0.3))',
              transition: 'width 0.5s ease-in-out', // Smooth transition for size change
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

        {/* Hero Decorative Image - Randomly selected between bihu.png and rhino.png */}
        <motion.div
          style={{
            position: 'absolute',
            bottom: 0,
            left: '50%',
            x: '-50%',
            y: heroDecoY,
            scale: heroDecoScale,
            opacity: heroDecoOpacity,
            zIndex: 25, // Above trees (20), below logo's final z-index (100)
            transformOrigin: 'bottom center',
          }}
        >
          <img
            src={heroDecoImage}
            alt="Assamese cultural element"
            style={{
              width: isMobile ? 'min(80vw, 350px)' : 'min(50vw, 500px)',
              height: 'auto',
              filter: 'drop-shadow(0 4px 20px rgba(0,0,0,0.2))',
            }}
          />
        </motion.div>
      </div>
    </div>
  );
}
