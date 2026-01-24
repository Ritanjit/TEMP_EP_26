/**
 * AllEventsPage.tsx - Complete Events Collection with Day-wise Organization
 * 
 * Features:
 * - Day-wise event grouping (Day 1, Day 2, Day 3, Day 4)
 * - Category color coding (Music, Tech, Art, Academic, Fun)
 * - Search bar to filter events by name
 * - Category dropdown filter
 * - Whisk-style scroll animation (tilt → straighten + scale)
 * - Grain texture overlay
 * 
 * USAGE in Astro:
 * ---
 * import AllEventsPage from '@components/react/sections/AllEventsPage';
 * ---
 * <AllEventsPage client:load />
 */

import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

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

const categoryOptions = ["All", "Music", "Tech", "Art", "Academic", "Fun"];

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

// ============================================
// WHISK-STYLE ANIMATION CONSTANTS
// ============================================
const INITIAL_TILT = 8; // degrees
const SCROLL_SCALE_END = 0.88; // scale at full scroll
const SCROLL_THRESHOLD = 0.05; // 0-35% of scroll triggers animation
// ============================================

// Individual Event Card Component with Whisk-style animation
interface EventCardProps {
  event: string;
  scrollProgress: any;
}

function EventCard({ event, scrollProgress }: EventCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const category = getCategory(event);
  const tagColor = categoryColors[category];

  // Transform scroll progress to animation values
  const cardScale = useTransform(scrollProgress, [0, SCROLL_THRESHOLD], [1, SCROLL_SCALE_END]);
  const cardRotate = useTransform(scrollProgress, [0, SCROLL_THRESHOLD], [INITIAL_TILT, 0]);

  return (
    <motion.div
      className="event-card"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        scale: cardScale,
        rotate: isHovered ? 0 : cardRotate,
        borderRadius: "1rem",
        boxShadow: "0 10px 40px rgba(0,0,0,0.15)",
        padding: "1rem",
        cursor: "pointer",
        overflow: "hidden",
        background: `linear-gradient(135deg, ${colors.lightPink}40, ${colors.beige})`,
        border: `2px solid ${colors.brown}40`,
        transformOrigin: "center center",
        transition: isHovered ? "rotate 0.3s ease" : undefined,
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
            transform: isHovered ? "scale(1.1)" : "scale(1)",
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
}

export default function AllEventsPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Scroll tracking for Whisk animation
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

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
          zIndex: 10,
          backgroundImage: "url('https://www.transparenttextures.com/patterns/skulls.png')",
          opacity: 1,
        }}
      />

      {/* Main content */}
      <div
        ref={containerRef}
        style={{
          position: "relative",
          zIndex: 20,
          paddingTop: "2rem",
          paddingBottom: "4rem",
        }}
      >
        {/* Page Header */}
        <h1
          style={{
            fontSize: "clamp(2.5rem, 6vw, 4rem)",
            textAlign: "center",
            padding: "3rem 1rem 1rem",
            fontFamily: "var(--font-heading)",
            color: colors.green,
          }}
        >
          All Events
        </h1>

        <p
          style={{
            textAlign: "center",
            fontFamily: "var(--font-body)",
            color: colors.brown,
            fontSize: "clamp(1rem, 2vw, 1.25rem)",
            maxWidth: "800px",
            margin: "0 auto 2rem",
            padding: "0 1rem",
          }}
        >
          Explore all events across four exciting days of Euphuism 2026
        </p>

        {/* Search & Filter Bar */}
        <div
          style={{
            maxWidth: "800px",
            margin: "0 auto 3rem",
            padding: "0 1.5rem",
            display: "flex",
            flexDirection: "row",
            gap: "1rem",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          {/* Search Input */}
          <div
            style={{
              position: "relative",
              flex: "1 1 300px",
              maxWidth: "400px",
            }}
          >
            <input
              type="text"
              placeholder="Search events..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: "100%",
                padding: "0.875rem 1rem 0.875rem 3rem",
                borderRadius: "9999px",
                border: `2px solid ${colors.green}40`,
                backgroundColor: `${colors.beige}`,
                fontFamily: "var(--font-body)",
                fontSize: "1rem",
                color: colors.green,
                outline: "none",
                boxShadow: "0 4px 20px rgba(45, 62, 16, 0.1)",
                transition: "all 0.3s ease",
              }}
              onFocus={(e) => {
                e.target.style.borderColor = colors.green;
                e.target.style.boxShadow = "0 4px 25px rgba(45, 62, 16, 0.2)";
              }}
              onBlur={(e) => {
                e.target.style.borderColor = `${colors.green}40`;
                e.target.style.boxShadow = "0 4px 20px rgba(45, 62, 16, 0.1)";
              }}
            />
            {/* Search Icon */}
            <svg
              style={{
                position: "absolute",
                left: "1rem",
                top: "50%",
                transform: "translateY(-50%)",
                width: "1.25rem",
                height: "1.25rem",
                color: colors.green,
                opacity: 0.6,
              }}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>

          {/* Category Filter Dropdown */}
          <div
            ref={dropdownRef}
            style={{
              position: "relative",
              minWidth: "180px",
            }}
          >
            {/* Dropdown Button */}
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              style={{
                width: "100%",
                padding: "0.875rem 2.5rem 0.875rem 1.25rem",
                borderRadius: "9999px",
                border: `2px solid ${isDropdownOpen ? colors.brown : colors.brown + "40"}`,
                backgroundColor: colors.beige,
                fontFamily: "var(--font-body)",
                fontSize: "1rem",
                color: colors.brown,
                fontWeight: 500,
                cursor: "pointer",
                outline: "none",
                boxShadow: isDropdownOpen
                  ? "0 4px 25px rgba(132, 53, 53, 0.2)"
                  : "0 4px 20px rgba(132, 53, 53, 0.1)",
                transition: "all 0.3s ease",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                textAlign: "left",
              }}
            >
              <span>{selectedCategory === "All" ? "All Categories" : selectedCategory}</span>
              <svg
                style={{
                  position: "absolute",
                  right: "1rem",
                  width: "1rem",
                  height: "1rem",
                  transition: "transform 0.3s ease",
                  transform: isDropdownOpen ? "rotate(180deg)" : "rotate(0deg)",
                }}
                fill="none"
                stroke={colors.brown}
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            {/* Dropdown Menu */}
            <div
              style={{
                position: "absolute",
                top: "calc(100% + 0.5rem)",
                left: "0",
                right: "0",
                backgroundColor: colors.beige,
                borderRadius: "1rem",
                border: `2px solid ${colors.brown}40`,
                boxShadow: "0 8px 30px rgba(132, 53, 53, 0.15)",
                overflow: "hidden",
                zIndex: 100,
                opacity: isDropdownOpen ? 1 : 0,
                visibility: isDropdownOpen ? "visible" : "hidden",
                transform: isDropdownOpen ? "translateY(0)" : "translateY(-10px)",
                transition: "all 0.3s ease",
              }}
            >
              {categoryOptions.map((cat, index) => (
                <button
                  key={cat}
                  onClick={() => {
                    setSelectedCategory(cat);
                    setIsDropdownOpen(false);
                  }}
                  style={{
                    width: "100%",
                    padding: "0.75rem 1.25rem",
                    backgroundColor:
                      selectedCategory === cat ? `${colors.brown}15` : "transparent",
                    border: "none",
                    borderBottom:
                      index < categoryOptions.length - 1
                        ? `1px solid ${colors.brown}20`
                        : "none",
                    fontFamily: "var(--font-body)",
                    fontSize: "0.95rem",
                    color: colors.brown,
                    fontWeight: selectedCategory === cat ? 600 : 400,
                    cursor: "pointer",
                    textAlign: "left",
                    transition: "all 0.2s ease",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                  }}
                  onMouseEnter={(e) => {
                    if (selectedCategory !== cat) {
                      (e.target as HTMLButtonElement).style.backgroundColor = `${colors.brown}10`;
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (selectedCategory !== cat) {
                      (e.target as HTMLButtonElement).style.backgroundColor = "transparent";
                    }
                  }}
                >
                  {/* Category color indicator */}
                  {cat !== "All" && (
                    <span
                      style={{
                        width: "0.5rem",
                        height: "0.5rem",
                        borderRadius: "50%",
                        backgroundColor: categoryColors[cat],
                      }}
                    />
                  )}
                  {cat === "All" ? "All Categories" : cat}
                  {/* Checkmark for selected */}
                  {selectedCategory === cat && (
                    <svg
                      style={{
                        marginLeft: "auto",
                        width: "1rem",
                        height: "1rem",
                      }}
                      fill="none"
                      stroke={colors.brown}
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Day-wise sections */}
        {days.map((day, i) => {
          // Filter events based on search and category
          const filteredEvents = day.events.filter(event => {
            const matchesSearch = event.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesCategory = selectedCategory === "All" || getCategory(event) === selectedCategory;
            return matchesSearch && matchesCategory;
          });

          // Skip day if no events match
          if (filteredEvents.length === 0) return null;

          return (
            <section
              key={i}
              style={{
                padding: "2rem 1.5rem 4rem",
                maxWidth: "1400px",
                margin: "0 auto",
              }}
            >

              <h2
                style={{
                  fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
                  marginBottom: "2rem",
                  fontFamily: "var(--font-heading)",
                  color: colors.brown,
                }}
              >
                {day.day}
              </h2>

              {/* Events Grid */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
                  gap: "2rem",
                }}
              >
                {filteredEvents.map((event, idx) => (
                  <EventCard
                    key={idx}
                    event={event}
                    scrollProgress={scrollYProgress}
                  />
                ))}
              </div>
            </section>
          );
        })}

        {/* No results message */}
        {days.every(day =>
          day.events.filter(event => {
            const matchesSearch = event.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesCategory = selectedCategory === "All" || getCategory(event) === selectedCategory;
            return matchesSearch && matchesCategory;
          }).length === 0
        ) && (
            <div
              style={{
                textAlign: "center",
                padding: "4rem 2rem",
                fontFamily: "var(--font-body)",
                color: colors.brown,
                fontSize: "1.25rem",
              }}
            >
              <p>No events found matching your search.</p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("All");
                }}
                style={{
                  marginTop: "1rem",
                  padding: "0.75rem 1.5rem",
                  borderRadius: "9999px",
                  backgroundColor: colors.green,
                  color: colors.beige,
                  fontFamily: "var(--font-heading)",
                  fontSize: "1rem",
                  cursor: "pointer",
                  border: "none",
                  transition: "all 0.3s ease",
                }}
              >
                Clear Filters
              </button>
            </div>
          )}

        {/* Back to Home Button */}
        <div
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
        </div>
      </div>
    </div>
  );
}
