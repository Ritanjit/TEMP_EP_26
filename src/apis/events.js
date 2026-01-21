/**
 * Events API Module
 * 
 * All API calls related to events go here.
 * Import these functions in your Astro pages or React components.
 */

// import Api from './Api';

// // Fetch all events
// export async function getEvents() {
//   return await Api.get('/euphuism-events');
// }

// // Fetch single event by slug
// export async function getEventBySlug(slug: string) {
//   return await Api.get('/euphuism-events', {
//     filter: { slug: slug },
//   });
// }

// // Fetch event by ID
// export async function getEventById(id: number) {
//   return await Api.get(`/euphuism-events/${id}`);
// }


import Api from "./Api";

const data = {
  title: "John",
  imageUrl: "john@example.com",
  rules: "No rules",
  eventType: "solo",
};

export async function createEvent({ title, imageUrl, rules, eventType }) {
  const response = await Api.post("/events", {
    body: {
      title,
      imageUrl,
      rules,
      eventType,
    },
    fields: "title, imageUrl, rules, eventType"
  });

  console.log('Event created successfully? Ans:', response);
  return response;
}