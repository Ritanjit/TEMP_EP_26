/**
 * SponsorGallery.tsx - Horizontal Scrolling Gallery for Sponsors
 * 
 * Uses GSAP horizontalLoop for smooth, seamless infinite scrolling.
 * Features proper pause/resume on hover with GSAP's robust animation system.
 * 
 * =====================================================
 * CONFIGURATION GUIDE
 * =====================================================
 * 
 * SPEED CONTROL:
 * - pixelsPerSecond: Higher = faster (100 = slow, 300 = fast). Default: 80
 * 
 * IMAGE DIMENSIONS:
 * - Card dimensions controlled via constants below
 * - Desktop: 350px width, 175px height (2:1 ratio)
 * - Mobile: 250px width, 125px height (2:1 ratio)
 * 
 * FEATURES:
 * - GSAP-powered infinite horizontal loop
 * - Smooth pause on hover, resume on leave
 * - Draggable with inertia (if plugins available)
 * - Responsive sizing
 * - Seamless looping without gaps
 * =====================================================
 */

import { useRef, useState, useEffect } from "react";
import { sponsors } from "../../../lib/data/sponsors";
import gsap from "gsap";

// ============================================
// CONFIGURABLE CONSTANTS
// ============================================

// Speed in pixels per second (higher = faster)
const PIXELS_PER_SECOND = 80;

// Card dimensions - CHANGE THESE TO RESIZE SPONSOR IMAGES
// Desktop: width x height in pixels (maintaining 2:1 ratio)
const CARD_WIDTH_DESKTOP = 350;   // <-- Decrease for smaller cards
const CARD_HEIGHT_DESKTOP = 175;  // <-- Decrease for smaller cards

// Mobile dimensions (maintaining 2:1 ratio)
const CARD_WIDTH_MOBILE = 175;    // <-- Decrease for smaller mobile cards
const CARD_HEIGHT_MOBILE = 87.5;   // <-- Decrease for smaller mobile cards

// Gap between cards in pixels
const CARD_GAP = 32;

// Border radius for cards
const BORDER_RADIUS = 12;

// ============================================

interface SponsorGalleryProps {
    items?: { image: string; text: string }[];
    borderRadius?: number;
}

export default function SponsorGallery({
    items,
    borderRadius = BORDER_RADIUS,
}: SponsorGalleryProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const wrapperRef = useRef<HTMLDivElement>(null);
    const loopRef = useRef<gsap.core.Timeline | null>(null);
    const [isMobile, setIsMobile] = useState(false);

    // Use provided items or fallback to sponsors data
    const galleryItems = items && items.length ? items : sponsors;

    // Check for mobile screen
    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    // Calculate dimensions
    const cardWidth = isMobile ? CARD_WIDTH_MOBILE : CARD_WIDTH_DESKTOP;
    const cardHeight = isMobile ? CARD_HEIGHT_MOBILE : CARD_HEIGHT_DESKTOP;

    // GSAP horizontalLoop implementation
    useEffect(() => {
        if (!containerRef.current) return;

        const boxes = gsap.utils.toArray<HTMLElement>(".sponsor-card");
        if (boxes.length === 0) return;

        // Create the horizontal loop
        loopRef.current = horizontalLoop(boxes, {
            repeat: -1,
            speed: PIXELS_PER_SECOND / 100, // Convert to speed multiplier
            reversed: false,
            paddingRight: CARD_GAP,
        });

        // Cleanup on unmount
        return () => {
            if (loopRef.current) {
                loopRef.current.kill();
            }
        };
    }, [galleryItems, isMobile]);

    // Pause/Resume handlers
    const handleMouseEnter = () => {
        if (loopRef.current) {
            loopRef.current.pause();
        }
    };

    const handleMouseLeave = () => {
        if (loopRef.current) {
            loopRef.current.resume();
        }
    };

    return (
        <div
            ref={wrapperRef}
            className="sponsor-gallery-wrapper"
            style={{
                width: "100%",
                maxWidth: isMobile ? "calc(100vw - 80px)" : "1125px",
                marginLeft: "auto",
                marginRight: "auto",
                overflow: "hidden",
                position: "relative",
                cursor: "grab",
            }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onTouchStart={handleMouseEnter}
            onTouchEnd={handleMouseLeave}
        >
            {/* Scrolling track */}
            <div
                ref={containerRef}
                className="sponsor-gallery-track"
                style={{
                    display: "flex",
                    gap: CARD_GAP,
                    padding: "20px 0",
                    width: "fit-content",
                }}
            >
                {/* Duplicate items for seamless loop */}
                {[...galleryItems, ...galleryItems, ...galleryItems].map((sponsor, index) => (
                    <div
                        key={`${sponsor.text}-${index}`}
                        className="sponsor-card"
                        style={{
                            flexShrink: 0,
                            width: cardWidth,
                            height: cardHeight,
                            borderRadius: borderRadius,
                            overflow: "hidden",
                            backgroundColor: "transparent",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
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
                                padding: 12,
                            }}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}

// ============================================
// GSAP Horizontal Loop Helper Function
// ============================================
// This helper function makes a group of elements animate along the x-axis 
// in a seamless, responsive loop.

interface HorizontalLoopConfig {
    repeat?: number;
    paused?: boolean;
    speed?: number;
    reversed?: boolean;
    paddingRight?: number;
    snap?: number | false;
}

function horizontalLoop(
    items: HTMLElement[],
    config: HorizontalLoopConfig = {}
): gsap.core.Timeline {
    items = gsap.utils.toArray(items);

    const tl = gsap.timeline({
        repeat: config.repeat,
        paused: config.paused,
        defaults: { ease: "none" },
        onReverseComplete: () => { tl.totalTime(tl.rawTime() + tl.duration() * 100); },
    });

    const length = items.length;
    const startX = items[0].offsetLeft;
    const times: number[] = [];
    const widths: number[] = [];
    const xPercents: number[] = [];
    const spaceBefore: number[] = [];
    const pixelsPerSecond = (config.speed || 1) * 100;
    const snap = config.snap === false ? (v: number) => v : gsap.utils.snap(config.snap || 1);

    // Get container
    const container = items[0].parentNode as HTMLElement;

    // Populate widths and positions
    let b1 = container.getBoundingClientRect();
    items.forEach((el, i) => {
        widths[i] = parseFloat(gsap.getProperty(el, "width", "px") as string);
        xPercents[i] = snap(
            (parseFloat(gsap.getProperty(el, "x", "px") as string) / widths[i]) * 100 +
            (gsap.getProperty(el, "xPercent") as number)
        );
        const b2 = el.getBoundingClientRect();
        spaceBefore[i] = b2.left - (i ? b1.right : b1.left);
        b1 = b2;
    });

    // Set xPercent for responsive behavior
    gsap.set(items, { xPercent: (i) => xPercents[i] });

    // Calculate total width
    const getTotalWidth = () =>
        items[length - 1].offsetLeft +
        (xPercents[length - 1] / 100) * widths[length - 1] -
        startX +
        spaceBefore[0] +
        items[length - 1].offsetWidth * (gsap.getProperty(items[length - 1], "scaleX") as number) +
        (parseFloat(String(config.paddingRight)) || 0);

    const totalWidth = getTotalWidth();

    // Build the timeline
    for (let i = 0; i < length; i++) {
        const item = items[i];
        const curX = (xPercents[i] / 100) * widths[i];
        const distanceToStart = item.offsetLeft + curX - startX + spaceBefore[0];
        const distanceToLoop = distanceToStart + widths[i] * (gsap.getProperty(item, "scaleX") as number);

        tl.to(
            item,
            {
                xPercent: snap(((curX - distanceToLoop) / widths[i]) * 100),
                duration: distanceToLoop / pixelsPerSecond,
            },
            0
        ).fromTo(
            item,
            {
                xPercent: snap(((curX - distanceToLoop + totalWidth) / widths[i]) * 100),
            },
            {
                xPercent: xPercents[i],
                duration: (curX - distanceToLoop + totalWidth - curX) / pixelsPerSecond,
                immediateRender: false,
            },
            distanceToLoop / pixelsPerSecond
        ).add("label" + i, distanceToStart / pixelsPerSecond);

        times[i] = distanceToStart / pixelsPerSecond;
    }

    // Pre-render for performance
    tl.progress(1, true).progress(0, true);

    // Reverse if configured
    if (config.reversed) {
        tl.vars.onReverseComplete?.();
        tl.reverse();
    }

    return tl;
}
