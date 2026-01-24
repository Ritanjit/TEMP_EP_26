/**
 * Events API Module
 * 
 * All API calls related to events go here.
 * Import these functions in your Astro pages or React components.
 */

import Api from './Api';

// Fetch all events
export async function getEvents() {
  return await Api.get('/euphuism-events');
}

// Fetch single event by slug
export async function getEventBySlug(slug: string) {
  return await Api.get('/euphuism-events', {
    filter: { slug: slug },
  });
}

// Fetch event by ID
export async function getEventById(id: number) {
  return await Api.get(`/euphuism-events/${id}`);
}
