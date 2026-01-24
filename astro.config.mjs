import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import netlify from '@astrojs/netlify';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  // Server mode for SSR (Astro 5.x removed 'hybrid' mode)
  // Add `export const prerender = true;` to pages that can be static for better performance
  output: 'server',
  server: {
    port: 3000,
  },

  // Integrations
  integrations: [
    react(), // React Islands support for 3D and interactive components
  ],

  // Netlify deployment adapter for SSR
  adapter: netlify(),

  // Vite configuration for Tailwind CSS v4
  vite: {
    plugins: [tailwindcss()],
  },
});
