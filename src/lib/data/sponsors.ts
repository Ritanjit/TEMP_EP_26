/**
 * Sponsor data for the gallery
 * Images are hosted on imgbox for CDN delivery
 */

export interface Sponsor {
  image: string;
  text: string;
}

export const sponsors: Sponsor[] = [
  {
    image: "https://uploads.backendservices.in/storage/internship/artifex/images/176908685870080.png",
    text: "Decathlon"
  },
  {
    image: "https://uploads.backendservices.in/storage/internship/artifex/images/176908688777643.png",
    text: "Frint"
  },
  {
    image: "https://uploads.backendservices.in/storage/internship/artifex/images/176908690046259.png",
    text: "G Plus"
  },
  {
    image: "https://uploads.backendservices.in/storage/internship/artifex/images/176908691076124.png",
    text: "HP"
  },
  {
    image: "https://uploads.backendservices.in/storage/internship/artifex/images/176908692110178.png",
    text: "SBI"
  }
];

// Export image URLs for preloading
export const SPONSOR_IMAGE_URLS = sponsors.map(s => s.image);
