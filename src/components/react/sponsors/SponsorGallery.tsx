/**
 * SponsorGallery.tsx - Horizontal Scrolling Gallery for Sponsors
 * 
 * Uses CSS animations for smooth, hardware-accelerated scrolling.
 * Replaced OGL/WebGL implementation with simpler CSS marquee for better image quality.
 * 
 * =====================================================
 * CONFIGURATION GUIDE
 * =====================================================
 * 
 * SPEED CONTROL:
 * - Animation duration: Lower = faster (10s fast, 40s slow). Default: 25s
 * 
 * IMAGE DIMENSIONS:
 * - Card width/height controlled via CSS variables
 * - Desktop: 500px width, 250px height
 * - Mobile: 300px width, 150px height
 * 
 * FEATURES:
 * - Infinite auto-scroll (CSS animation)
 * - Pause on hover/touch
 * - Drag to scroll manually
 * - Resume auto-scroll after inactivity
 * - Responsive sizing
 * - Rounded corners
 * =====================================================
 */

import { useRef, useState, useEffect, useCallback } from "react";
import { sponsors } from "../../../lib/data/sponsors";

// ============================================
// CONFIGURABLE CONSTANTS
// ============================================

// Animation duration in seconds (higher = slower)
const ANIMATION_DURATION = 25;

// Card dimensions
const CARD_WIDTH_DESKTOP = 500;
const CARD_HEIGHT_DESKTOP = 250;
const CARD_WIDTH_MOBILE = 300;
const CARD_HEIGHT_MOBILE = 150;

// Gap between cards
const CARD_GAP = 24;

// Border radius
const BORDER_RADIUS = 12;

// ============================================

interface SponsorGalleryProps {
  items?: { image: string; text: string }[];
  borderRadius?: number;
  scrollSpeed?: number;
  scrollEase?: number;
}

export default function SponsorGallery({
  items,
  borderRadius = BORDER_RADIUS,
}: SponsorGalleryProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const resumeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  // Use provided items or fallback to sponsors data
  const galleryItems = items && items.length ? items : sponsors;

  // Duplicate items for seamless infinite loop
  const duplicatedItems = [...galleryItems, ...galleryItems, ...galleryItems];

  // Check for mobile screen
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Clear resume timeout on unmount
  useEffect(() => {
    return () => {
      if (resumeTimeoutRef.current) {
        clearTimeout(resumeTimeoutRef.current);
      }
    };
  }, []);

  // Resume auto-scroll after inactivity
  const scheduleResume = useCallback(() => {
    if (resumeTimeoutRef.current) {
      clearTimeout(resumeTimeoutRef.current);
    }
    resumeTimeoutRef.current = setTimeout(() => {
      setIsPaused(false);
    }, 2000);
  }, []);

  // Mouse/Touch handlers for drag scrolling
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setIsPaused(true);
    setStartX(e.pageX - (containerRef.current?.offsetLeft || 0));
    setScrollLeft(containerRef.current?.scrollLeft || 0);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !containerRef.current) return;
    e.preventDefault();
    const x = e.pageX - (containerRef.current.offsetLeft || 0);
    const walk = (x - startX) * 1.5;
    containerRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    scheduleResume();
  };

  const handleMouseLeave = () => {
    if (isDragging) {
      setIsDragging(false);
      scheduleResume();
    }
  };

  // Touch handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    setIsPaused(true);
    setStartX(e.touches[0].pageX - (containerRef.current?.offsetLeft || 0));
    setScrollLeft(containerRef.current?.scrollLeft || 0);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!containerRef.current) return;
    const x = e.touches[0].pageX - (containerRef.current.offsetLeft || 0);
    const walk = (x - startX) * 1.5;
    containerRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleTouchEnd = () => {
    scheduleResume();
  };

  // Hover handlers
  const handleMouseEnter = () => {
    if (!isDragging) {
      setIsPaused(true);
    }
  };

  const handleContainerMouseLeave = () => {
    if (!isDragging) {
      scheduleResume();
    }
  };

  // Calculate dimensions
  const cardWidth = isMobile ? CARD_WIDTH_MOBILE : CARD_WIDTH_DESKTOP;
  const cardHeight = isMobile ? CARD_HEIGHT_MOBILE : CARD_HEIGHT_DESKTOP;

  // Calculate total width for animation
  const singleSetWidth = galleryItems.length * (cardWidth + CARD_GAP);

  return (
    <div
      ref={containerRef}
      className="sponsor-gallery-container"
      style={{
        width: "100%",
        maxWidth: "1125px",
        height: cardHeight + 40,
        overflow: "hidden",
        cursor: isDragging ? "grabbing" : "grab",
        position: "relative",
      }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Scrolling track */}
      <div
        ref={trackRef}
        className="sponsor-gallery-track"
        style={{
          display: "flex",
          gap: CARD_GAP,
          animation: isPaused
            ? "none"
            : `marquee ${ANIMATION_DURATION}s linear infinite`,
          animationPlayState: isPaused ? "paused" : "running",
          width: "fit-content",
          paddingTop: 20,
          paddingBottom: 20,
        }}
      >
        {duplicatedItems.map((sponsor, index) => (
          <div
            key={`${sponsor.text}-${index}`}
            className="sponsor-card"
            style={{
              flexShrink: 0,
              width: cardWidth,
              height: cardHeight,
              borderRadius: borderRadius,
              overflow: "hidden",
              boxShadow: "0 8px 32px rgba(0, 0, 0, 0.15)",
              transition: "transform 0.3s ease, box-shadow 0.3s ease",
              backgroundColor: "#fff",
            }}
            onMouseEnter={(e) => {
              if (!isDragging) {
                e.currentTarget.style.transform = "translateY(-8px) scale(1.02)";
                e.currentTarget.style.boxShadow = "0 16px 48px rgba(0, 0, 0, 0.25)";
              }
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0) scale(1)";
              e.currentTarget.style.boxShadow = "0 8px 32px rgba(0, 0, 0, 0.15)";
            }}
          >
            <img
              src={sponsor.image}
              alt={sponsor.text}
              loading="lazy"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "contain",
                padding: 16,
              }}
            />
          </div>
        ))}
      </div>

      {/* CSS Animation Keyframes */}
      <style>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-${singleSetWidth}px);
          }
        }

        .sponsor-gallery-track:hover {
          animation-play-state: paused;
        }

        .sponsor-card {
          will-change: transform;
        }
      `}</style>
    </div>
  );
}
