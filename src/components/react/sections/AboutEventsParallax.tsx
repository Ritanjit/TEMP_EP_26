/**
 * AboutEventsParallax.tsx - About Section + Key Events with Parallax Effect
 * 
 * Based on Aceternity's Hero Parallax component.
 * Features scroll-linked rotation, translation, and opacity animations.
 * 
 * USAGE in Astro:
 * ---
 * import AboutEventsParallax from '@components/react/sections/AboutEventsParallax';
 * ---
 * <AboutEventsParallax client:load />
 * 
 * Parallax Effects:
 * - 3D perspective with rotateX and rotateZ
 * - Horizontal translation for event rows (alternating directions)
 * - Opacity fade from 0.2 → 1 on scroll
 * - Spring physics for smooth animations
 */

import React, { useRef, useState, useEffect } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  MotionValue,
} from "framer-motion";
import { keyEvents, type KeyEvent } from "@lib/data/events";

/**
 * Main AboutEventsParallax Component
 */
export default function AboutEventsParallax() {
  // Mobile detection for responsive sizing
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 980);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Split events into 3 rows of 5
  const firstRow = keyEvents.slice(0, 5);
  const secondRow = keyEvents.slice(5, 10);
  const thirdRow = keyEvents.slice(10, 15);
  
  const ref = useRef<HTMLDivElement>(null);
  
  // Track scroll progress within this section
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Spring configuration for smooth, bouncy animations
  const springConfig = { stiffness: 300, damping: 30, bounce: 100 };

  // Horizontal translation for event rows
  const translateX = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, 1000]),
    springConfig
  );
  const translateXReverse = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, -1000]),
    springConfig
  );

  // 3D rotation effects
  const rotateX = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [15, 0]),
    springConfig
  );
  const rotateZ = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [20, 0]),
    springConfig
  );

  // Opacity and vertical translation
  // Mobile: NO translateY animation to eliminate empty space
  // Desktop: Full parallax effect
  const opacity = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [0.01, 1]),
    springConfig
  );
  const translateY = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [isMobile ? 0 : -700, isMobile ? 0 : 500]),
    springConfig
  );

  return (
    <div
      ref={ref}
      className="about-events-parallax"
      style={{
        height: isMobile ? "160vh" : "400vh", // Reduced height on mobile
        paddingTop: isMobile ? "0" : "10rem",
        paddingBottom: isMobile ? "0" : "10rem",
        marginTop: isMobile ? "-50vh" : "0", // Pull up on mobile to close gap with hero
        overflow: "hidden",
        position: "relative",
        display: "flex",
        flexDirection: "column",
        alignSelf: "auto",
        perspective: "1000px",
        transformStyle: "preserve-3d",
        backgroundColor: "var(--euphuism-beige)",
      }}
    >
      {/* About Section Header */}
      <AboutHeader />

      {/* Animated Events Container */}
      <motion.div
        style={{
          rotateX,
          rotateZ,
          translateY,
          opacity,
        }}
      >
        {/* Key Events Subheading */}
        <KeyEventsHeading />

        {/* Row 1 - Moves right on scroll */}
        <motion.div
          style={{
            display: "flex",
            flexDirection: "row-reverse",
            gap: isMobile ? "2rem" : "5rem",
            marginBottom: isMobile ? "2rem" : "5rem",
          }}
        >
          {firstRow.map((event) => (
            <EventCard
              event={event}
              translate={translateX}
              key={event.title}
              isMobile={isMobile}
            />
          ))}
        </motion.div>

        {/* Row 2 - Moves left on scroll */}
        <motion.div
          style={{
            display: "flex",
            flexDirection: "row",
            gap: isMobile ? "2rem" : "5rem",
            marginBottom: isMobile ? "2rem" : "5rem",
          }}
        >
          {secondRow.map((event) => (
            <EventCard
              event={event}
              translate={translateXReverse}
              key={event.title}
              isMobile={isMobile}
            />
          ))}
        </motion.div>

        {/* Row 3 - Moves right on scroll */}
        <motion.div
          style={{
            display: "flex",
            flexDirection: "row-reverse",
            gap: isMobile ? "2rem" : "5rem",
          }}
        >
          {thirdRow.map((event) => (
            <EventCard
              event={event}
              translate={translateX}
              key={event.title}
              isMobile={isMobile}
            />
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
}

/**
 * AboutHeader - About Euphuism section content
 */
function AboutHeader() {
  return (
    <div
      style={{
        maxWidth: "80rem",
        position: "relative",
        margin: "0 auto",
        paddingTop: "2rem",
        paddingBottom: "4rem",
        paddingLeft: "1rem",
        paddingRight: "1rem",
        width: "100%",
        textAlign: "center", // Center align everything in the container
        left: 0,
        top: 0,
      }}
    >
      <h1
        style={{
          fontSize: "clamp(2rem, 5vw, 4.5rem)",
          fontWeight: "bold",
          fontFamily: "var(--font-heading)",
          color: "var(--euphuism-orange)",
          lineHeight: 1.2,
        }}
      >
        About Euphuism 2026
      </h1>
      <p
        style={{
          maxWidth: "60rem", // Increased width for desktop
          margin: "2rem auto 0", // Center the paragraph block
          fontSize: "clamp(1rem, 2vw, 1.25rem)",
          fontFamily: "var(--font-body)",
          color: "var(--euphuism-green)",
          lineHeight: 1.7,
        }}
      >
        Welcome to <strong>Euphuism 2026</strong> — the grand annual cultural extravaganza 
        of Girijananda Chowdhury University. This year's theme, <em>"Roots & Resilience"</em>, 
        celebrates the rich heritage of Assam while embracing modern creativity and expression.
        <br /><br />
        From mesmerizing folk dances to electrifying band performances, from thought-provoking 
        theatre to artistic showcases — Euphuism brings together students, artists, and 
        visionaries to create unforgettable memories.
      </p>
    </div>
  );
}

/**
 * KeyEventsHeading - Visual cue indicating the events gallery
 */
function KeyEventsHeading() {
  return (
    <div
      style={{
        textAlign: "center",
        marginBottom: "3rem",
        paddingLeft: "1rem",
        paddingRight: "1rem",
      }}
    >
      <h2
        style={{
          fontSize: "clamp(1.25rem, 3vw, 2rem)",
          fontFamily: "var(--font-heading)",
          color: "var(--euphuism-brown)",
          letterSpacing: "0.1em",
          textTransform: "uppercase",
        }}
      >
        ✨ Key Events ✨
      </h2>
      <p
        style={{
          fontSize: "clamp(0.875rem, 1.5vw, 1rem)",
          fontFamily: "var(--font-body)",
          color: "var(--euphuism-green)",
          marginTop: "0.5rem",
          opacity: 0.8,
        }}
      >
        Hover over the cards to discover our signature events
      </p>
    </div>
  );
}

/**
 * EventCard - Individual event card with hover effects
 */
function EventCard({
  event,
  translate,
  isMobile,
}: {
  event: KeyEvent;
  translate: MotionValue<number>;
  isMobile: boolean;
}) {
  return (
    <motion.div
      style={{
        x: translate,
      }}
      whileHover={{
        y: -20,
      }}
      className="event-card-wrapper"
    >
      <div
        style={{
          height: isMobile ? "14.4rem" : "24rem", // Smaller on mobile
          width: isMobile ? "18rem" : "30rem", // Smaller on mobile
          position: "relative",
          flexShrink: 0,
          borderRadius: "0.75rem",
          overflow: "hidden",
          boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
        }}
      >
        <a
          href={event.link}
          style={{
            display: "block",
            transition: "box-shadow 0.3s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.boxShadow = "0 25px 50px -12px rgba(0,0,0,0.5)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.boxShadow = "none";
          }}
        >
          <img
            src={event.thumbnail}
            height="600"
            width="600"
            style={{
              objectFit: "cover",
              objectPosition: "left top",
              position: "absolute",
              height: "100%",
              width: "100%",
              inset: 0,
            }}
            alt={event.title}
          />
        </a>

        {/* Hover Overlay */}
        <div
          className="event-overlay"
          style={{
            position: "absolute",
            inset: 0,
            height: "100%",
            width: "100%",
            opacity: 0,
            backgroundColor: "rgba(0,0,0,0.8)",
            pointerEvents: "none",
            transition: "opacity 0.3s ease",
            borderRadius: "0.75rem",
          }}
        />

        {/* Event Title (visible on hover) */}
        <h3
          className="event-title"
          style={{
            position: "absolute",
            bottom: "1rem",
            left: "1rem",
            opacity: 0,
            color: "white",
            fontFamily: "var(--font-heading)",
            fontSize: "1.5rem",
            letterSpacing: "0.05em",
            transition: "opacity 0.3s ease",
            textShadow: "0 2px 10px rgba(0,0,0,0.5)",
          }}
        >
          {event.title}
        </h3>
      </div>

      {/* CSS for hover effects */}
      <style>{`
        .event-card-wrapper:hover .event-overlay {
          opacity: 1 !important;
        }
        .event-card-wrapper:hover .event-title {
          opacity: 1 !important;
        }
      `}</style>
    </motion.div>
  );
}
