/**
 * AllEventsPage.tsx - Complete Events Collection with Day-wise Organization
 * 
 * Features:
 * - Day-wise event grouping (Day 1, Day 2, Day 3)
 * - Category color coding (Music, Tech, Art, Academic, Fun)
 * - GSAP scroll-triggered animations
 * - Parallax watermark effect
 * - Grain texture overlay
 * 
 * USAGE in Astro:
 * ---
 * import AllEventsPage from '@components/react/sections/AllEventsPage';
 * ---
 * <AllEventsPage client:load />
 */

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";

// Color palette matching Euphuism theme
const colors = {
  green: "#2D3E10",
  beige: "#EFE6C1",
  brown: "#843535",
  darkOrange: "#D03503",
  blue: "#2663EC",
  lightPink: "#F4A8B5",
  darkPink: "#FF5E90",
};

// Event categories for color coding
const categories: Record<string, string[]> = {
  Music: ["Master The Mic – Singing", "Rap Battle", "Glitters", "NAKASH AZIZ – Live Concert", "T.R.A.P (Main Stage Show)", "Bihu Performance"],
  Tech: ["Gaming Competition", "GCU Hackathon", "Circuitronics", "Robo Rift – Robo War", "Programming Competition", "Project Competition"],
  Art: ["Nritya Drishti – Dance Competition", "Drama Competition", "Sketch / Cartoon Art", "Artsylens – Photography", "Handicraft", "Kavyadhvani – Poetry"],
  Academic: ["Brainiacs – Quiz", "Rhetoro Rumble – Debate", "Faculty Program"],
  Fun: ["Fun Games", "Cosplay", "Street Battle", "Model Competition", "Student Performance", "Final Year Night"],
};

const categoryColors: Record<string, string> = {
  Music: colors.darkPink,
  Tech: colors.blue,
  Art: colors.brown,
  Academic: colors.green,
  Fun: colors.darkOrange,
};

// Event images using reliable CDN
const eventImages: Record<string, string> = {
  "Inauguration": "https://picsum.photos/seed/inauguration/900/700",
  "Nritya Drishti – Dance Competition": "https://picsum.photos/seed/dance/900/700",
  "Model Competition": "https://picsum.photos/seed/model/900/700",
  "Bihu Performance": "https://picsum.photos/seed/bihu/900/700",
  "Student Performance": "https://picsum.photos/seed/student/900/700",
  "Glitters": "https://picsum.photos/seed/glitters/900/700",
  "Gaming Competition": "https://picsum.photos/seed/gaming/900/700",
  "Fun Games": "https://picsum.photos/seed/fungames/900/700",
  "GCU Hackathon": "https://picsum.photos/seed/hackathon/900/700",
  "Brainiacs – Quiz": "https://picsum.photos/seed/quiz/900/700",
  "Master The Mic – Singing": "https://picsum.photos/seed/singing/900/700",
  "Rhetoro Rumble – Debate": "https://picsum.photos/seed/debate/900/700",
  "Faculty Program": "https://picsum.photos/seed/faculty/900/700",
  "Rap Battle": "https://picsum.photos/seed/rap/900/700",
  "Handicraft": "https://picsum.photos/seed/handicraft/900/700",
  "Artsylens – Photography": "https://picsum.photos/seed/photo/900/700",
  "Sketch / Cartoon Art": "https://picsum.photos/seed/sketch/900/700",
  "Cosplay": "https://picsum.photos/seed/cosplay/900/700",
  "Circuitronics": "https://picsum.photos/seed/circuit/900/700",
  "Bridge Masters Clash": "https://picsum.photos/seed/bridge/900/700",
  "Robo Rift – Robo War": "https://picsum.photos/seed/robot/900/700",
  "T.R.A.P (Main Stage Show)": "https://picsum.photos/seed/stage/900/700",
  "Programming Competition": "https://picsum.photos/seed/programming/900/700",
  "Drama Competition": "https://picsum.photos/seed/drama/900/700",
  "Final Year Night": "https://picsum.photos/seed/night/900/700",
  "Project Competition": "https://picsum.photos/seed/project/900/700",
  "Kavyadhvani – Poetry": "https://picsum.photos/seed/poetry/900/700",
  "Street Battle": "https://picsum.photos/seed/street/900/700",
  "NAKASH AZIZ – Live Concert": "https://picsum.photos/seed/concert/900/700",
};

interface DayEvents {
  day: string;
  events: string[];
}

const allEventNames = Object.keys(eventImages);
const eventsPerDay = Math.ceil(allEventNames.length / 4);

const days: DayEvents[] = [
  { day: "Day 1", events: allEventNames.slice(0, eventsPerDay) },
  { day: "Day 2", events: allEventNames.slice(eventsPerDay, eventsPerDay * 2) },
  { day: "Day 3", events: allEventNames.slice(eventsPerDay * 2, eventsPerDay * 3) },
  { day: "Day 4", events: allEventNames.slice(eventsPerDay * 3) },
];

function getCategory(event: string): string {
  for (const key in categories) {
    if (categories[key].includes(event)) return key;
  }
  return "Fun";
}

export default function AllEventsPage() {
  const containerRef = useRef<HTMLDivElement>(null);

  // GSAP cinematic transitions
  useEffect(() => {
    const cards = gsap.utils.toArray(".event-card") as HTMLElement[];
    if (cards.length > 0) {
      gsap.fromTo(
        cards,
        { opacity: 0, y: 120, scale: 0.9 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.4,
          ease: "power4.out",
          stagger: 0.08,
        }
      );
    }
  }, []);

  return (
    <div 
      className="all-events-page"
      style={{ 
        backgroundColor: colors.beige,
        minHeight: "100vh",
        position: "relative",
      }}
    >
      {/* Grain texture overlay */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          pointerEvents: "none",
          zIndex: 20,
          backgroundImage: "url('https://www.transparenttextures.com/patterns/asfalt-dark.png')",
          opacity: 0.08,
        }}
      />


      {/* Main content */}
      <div 
        ref={containerRef} 
        style={{
          position: "relative",
          zIndex: 10,
          paddingTop: "2rem",
          paddingBottom: "4rem",
        }}
      >
        {/* Page Header */}
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          style={{ 
            fontSize: "clamp(2.5rem, 6vw, 4rem)",
            textAlign: "center",
            padding: "3rem 1rem 2rem",
            fontFamily: "var(--font-heading)",
            color: colors.green,
          }}
        >
          All Events
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          style={{
            textAlign: "center",
            fontFamily: "var(--font-body)",
            color: colors.brown,
            fontSize: "clamp(1rem, 2vw, 1.25rem)",
            maxWidth: "600px",
            margin: "0 auto 3rem",
            padding: "0 1rem",
          }}
        >
          Explore all events across four exciting days of Euphuism 2026
        </motion.p>

        {/* Day-wise sections */}
        {days.map((day, i) => (
          <section 
            key={i} 
            style={{
              padding: "2rem 1.5rem 4rem",
              maxWidth: "1400px",
              margin: "0 auto",
            }}
          >
            {/* Section divider */}
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: false, margin: "-100px" }}
              transition={{ duration: 1, ease: "easeOut" }}
              style={{
                height: "3px",
                width: "100%",
                marginBottom: "2rem",
                transformOrigin: "left",
                backgroundColor: colors.darkPink,
              }}
            />

            <motion.h2
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, margin: "-50px" }}
              transition={{ duration: 0.6 }}
              style={{ 
                fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
                marginBottom: "2rem",
                fontFamily: "var(--font-heading)",
                color: colors.brown,
              }}
            >
              {day.day}
            </motion.h2>

            {/* Events Grid */}
            <div 
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
                gap: "2rem",
              }}
            >
              {day.events.map((event, idx) => {
                const category = getCategory(event);
                const tagColor = categoryColors[category];

                return (
                  <motion.div
                    key={idx}
                    className="event-card"
                    whileHover={{ scale: 1.05, y: -8 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    style={{
                      borderRadius: "1rem",
                      boxShadow: "0 10px 40px rgba(0,0,0,0.15)",
                      padding: "1rem",
                      cursor: "pointer",
                      overflow: "hidden",
                      background: `linear-gradient(135deg, ${colors.lightPink}40, ${colors.beige})`,
                      border: `2px solid ${colors.darkPink}40`,
                    }}
                  >
                    {/* Event Image */}
                    <div 
                      style={{
                        position: "relative",
                        height: "11rem",
                        width: "100%",
                        borderRadius: "0.75rem",
                        marginBottom: "1rem",
                        overflow: "hidden",
                      }}
                    >
                      <img
                        src={eventImages[event]}
                        alt={event}
                        loading="lazy"
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          transition: "transform 0.7s ease",
                        }}
                        onMouseEnter={(e) => {
                          (e.target as HTMLImageElement).style.transform = "scale(1.1)";
                        }}
                        onMouseLeave={(e) => {
                          (e.target as HTMLImageElement).style.transform = "scale(1)";
                        }}
                      />

                      {/* Category badge */}
                      <span
                        style={{
                          position: "absolute",
                          top: "0.75rem",
                          left: "0.75rem",
                          padding: "0.25rem 0.75rem",
                          fontSize: "0.75rem",
                          borderRadius: "9999px",
                          color: "white",
                          backgroundColor: tagColor,
                          fontFamily: "var(--font-body)",
                          fontWeight: 600,
                        }}
                      >
                        {category}
                      </span>
                    </div>

                    {/* Event Title */}
                    <h3 
                      style={{ 
                        fontSize: "1.125rem",
                        fontFamily: "var(--font-heading)",
                        color: colors.green,
                        marginBottom: "0.5rem",
                      }}
                    >
                      {event}
                    </h3>

                    {/* Read more link */}
                    <p 
                      style={{ 
                        fontSize: "0.875rem",
                        fontFamily: "var(--font-body)",
                        color: colors.brown,
                        opacity: 0.8,
                      }}
                    >
                      View details →
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </section>
        ))}

        {/* Back to Home Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{
            display: "flex",
            justifyContent: "center",
            padding: "2rem",
          }}
        >
          <a
            href="/"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              padding: "1rem 2rem",
              borderRadius: "9999px",
              backgroundColor: colors.green,
              color: colors.beige,
              fontFamily: "var(--font-heading)",
              fontSize: "1rem",
              textDecoration: "none",
              transition: "all 0.3s ease",
              boxShadow: "0 4px 20px rgba(45, 62, 16, 0.3)",
            }}
            onMouseEnter={(e) => {
              (e.target as HTMLAnchorElement).style.transform = "translateY(-2px)";
              (e.target as HTMLAnchorElement).style.boxShadow = "0 8px 30px rgba(45, 62, 16, 0.4)";
            }}
            onMouseLeave={(e) => {
              (e.target as HTMLAnchorElement).style.transform = "translateY(0)";
              (e.target as HTMLAnchorElement).style.boxShadow = "0 4px 20px rgba(45, 62, 16, 0.3)";
            }}
          >
            ← Back to Home
          </a>
        </motion.div>
      </div>
    </div>
  );
}
