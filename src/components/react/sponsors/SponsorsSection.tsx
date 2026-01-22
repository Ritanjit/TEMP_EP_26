/**
 * SponsorsSection.tsx - Sponsors Section with "Our Sponsors" heading
 * 
 * Container component for the sponsors gallery.
 * Uses Euphuism color palette and Cubao font for heading.
 * Responsive: Uses gamusa.png for desktop, gamusa2.png for mobile.
 */

import { useState, useEffect } from "react";
import SponsorGallery from "./SponsorGallery";

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

    return (
        <section
            id="sponsors"
            style={{
                width: '100%',
                minHeight: '60vh',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'flex-start', // Changed from center to move content up
                paddingTop: isMobile ? '2.5rem' : '4rem', // Top padding to position content
                paddingBottom: '4rem',
                position: 'relative',
                backgroundImage: isMobile ? 'url("/bg/gamusa2.png")' : 'url("/bg/gamusa.png")',
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'contain',
                backgroundPosition: 'top',
            }}
        >
            {/* Section Heading */}
            {/* 
       * SPACING: Adjust marginBottom to control gap between heading and gallery
       * - 0.5rem = minimal gap
       * - 1rem = small gap
       * - 2rem = medium gap
       * - 3rem = large gap
       */}
            <h2
                style={{
                    fontFamily: 'var(--font-heading)',
                    // Mobile: 1.5rem, Desktop: scales between 2rem and 3.5rem
                    fontSize: isMobile ? '1.5rem' : 'clamp(3rem, 2vw, 3.5rem)',
                    color: 'var(--euphuism-orange)', // Euphuism Orange
                    textAlign: 'center',
                    marginBottom: isMobile ? '-8rem' : '-5rem', // ← Mobile: less gap, Desktop: normal gap
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em',
                }}
                className="w-[79vw] md:w-full"
            >
                Our Event Partners :)
            </h2>

            {/* Gallery Container */}
            <div
                style={{
                    width: '100%',
                    height: '350px',
                    position: 'relative',
                }}
                className="flex justify-center"
            >
                <SponsorGallery />
            </div>
        </section>
    );
}
