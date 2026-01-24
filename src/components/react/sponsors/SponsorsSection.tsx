/**
 * SponsorsSection.tsx - Sponsors Section with "Our Sponsors" heading
 * 
 * Container component for the sponsors gallery.
 * Uses Euphuism color palette and Cubao font for heading.
 * Responsive: Uses gamusa.png for desktop, gamusa2.png for mobile.
 */

import { useState, useEffect } from "react";
import SponsorGallery from "./SponsorGallery";

// ============================================
// CONFIGURABLE CONSTANTS
// ============================================

// Aspect ratios matching background images
const DESKTOP_ASPECT_RATIO = 5 / 1;
const MOBILE_ASPECT_RATIO = 16 / 9;

// Gap between heading and gallery section
const SECTION_SPACING = "2rem";

// ============================================

export default function SponsorsSection() {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const aspectRatio = isMobile ? MOBILE_ASPECT_RATIO : DESKTOP_ASPECT_RATIO;

    return (
        <div style={{ width: '100%' }}>
            {/* Section Heading */}
            <h2
                style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: isMobile ? '1.25rem' : 'clamp(2rem, 2.5vw, 3rem)',
                    color: 'var(--euphuism-orange)',
                    textAlign: 'center',
                    margin: `0 0 ${SECTION_SPACING} 0`,
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em',
                    zIndex: 20,
                }}
            >
                Our Event Partners :)
            </h2>

            {/* Gallery Background Section */}
            <section
                id="sponsors"
                style={{
                    width: '100%',
                    aspectRatio: aspectRatio,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'relative',
                    backgroundImage: isMobile ? 'url("/bg/gamusa2.png")' : 'url("/bg/gamusa.png")',
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: '100% 100%',
                    backgroundPosition: 'center',
                    overflow: 'hidden',
                    marginBottom: '5rem',
                    zIndex: 20,
                }}
            >
                {/* Gallery Container */}
                <div
                    style={{
                        width: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <SponsorGallery />
                </div>
            </section>
        </div>
    );
}
