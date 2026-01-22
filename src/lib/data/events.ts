/**
 * Key Events Data for About + Events Parallax Section
 * 
 * Each event has:
 * - title: Event name (shows on hover)
 * - link: URL to event page (optional, can be "#" for placeholder)
 * - thumbnail: Image URL for the event
 * 
 * Currently using Aceternity placeholder images.
 * Replace with actual Euphuism event images when available.
 */

export interface KeyEvent {
    title: string;
    link: string;
    thumbnail: string;
}

export const keyEvents: KeyEvent[] = [
    // Row 1 - Day 1: Technical Events
    {
        title: "Gaming",
        link: "#",
        thumbnail: "https://uploads.backendservices.in/storage/internship/artifex/images/176910828465616.png",
    },
    {
        title: "Circuitronics",
        link: "#",
        thumbnail: "https://uploads.backendservices.in/storage/internship/artifex/images/176910828465616.png",
    },
    {
        title: "Robo Race",
        link: "#",
        thumbnail: "https://uploads.backendservices.in/storage/internship/artifex/images/176910828465616.png",
    },
    {
        title: "Robo Soccer",
        link: "#",
        thumbnail: "https://uploads.backendservices.in/storage/internship/artifex/images/176910828465616.png",
    },
    {
        title: "Hackathon",
        link: "#",
        thumbnail: "https://uploads.backendservices.in/storage/internship/artifex/images/176910828465616.png",
    },

    // Row 2 - Day 2: Cultural Events
    {
        title: "Street Battle",
        link: "#",
        thumbnail: "https://uploads.backendservices.in/storage/internship/artifex/images/176910828465616.png",
    },
    {
        title: "Bhaona",
        link: "#",
        thumbnail: "https://uploads.backendservices.in/storage/internship/artifex/images/176910828465616.png",
    },
    {
        title: "Singing",
        link: "#",
        thumbnail: "https://uploads.backendservices.in/storage/internship/artifex/images/176910828465616.png",
    },
    {
        title: "GCU Bihu",
        link: "#",
        thumbnail: "https://uploads.backendservices.in/storage/internship/artifex/images/176910828465616.png",
    },
    {
        title: "Essay Writing",
        link: "#",
        thumbnail: "https://uploads.backendservices.in/storage/internship/artifex/images/176910828465616.png",
    },

    // Row 3 - Fun Events
    {
        title: "Fun Games",
        link: "#",
        thumbnail: "https://uploads.backendservices.in/storage/internship/artifex/images/176910828465616.png",
    },
    {
        title: "Go As You Like",
        link: "#",
        thumbnail: "https://uploads.backendservices.in/storage/internship/artifex/images/176910828465616.png",
    },
    {
        title: "Battle of Bands",
        link: "#",
        thumbnail: "https://uploads.backendservices.in/storage/internship/artifex/images/176910828465616.png",
    },
    {
        title: "Cartoon Art Competition",
        link: "#",
        thumbnail: "https://uploads.backendservices.in/storage/internship/artifex/images/176910828465616.png",
    },
    {
        title: "Photography",
        link: "#",
        thumbnail: "https://uploads.backendservices.in/storage/internship/artifex/images/176910828465616.png",
    },
];

// Export image URLs for preloading
export const EVENT_IMAGE_URLS = keyEvents.map(e => e.thumbnail);
