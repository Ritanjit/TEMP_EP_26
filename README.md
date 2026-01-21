# Euphuism 2026 Website

> 🎭 The official website for GCU's Annual Cultural Fest - Built with Astro + React

![Astro](https://img.shields.io/badge/Astro-5.0-BC52EE?logo=astro)
![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.7-3178C6?logo=typescript)
![Tailwind](https://img.shields.io/badge/Tailwind-4.0-38B2AC?logo=tailwindcss)

---

## 📖 Table of Contents

1. [Quick Start](#-quick-start)
2. [Tech Stack Overview](#-tech-stack-overview)
3. [Project Structure](#-project-structure)
4. [Understanding Astro](#-understanding-astro)
5. [React Islands Explained](#-react-islands-explained)
6. [Working with FrontQL](#-working-with-frontql)
7. [Pages & Routing](#-pages--routing)
8. [Components Guide](#-components-guide)
9. [Adding New Features](#-adding-new-features)
10. [Deployment](#-deployment)
11. [Common Issues](#-common-issues)

---

## 🚀 Quick Start

```bash
# 1. Install dependencies
pnpm install

# 2. Copy environment variables
copy .env.example .env.local

# 3. Start development server
pnpm dev

# 4. Open in browser
# http://localhost:4321
```

---

## 🛠 Tech Stack Overview

| Technology | Purpose | Why We Use It |
|------------|---------|---------------|
| **Astro** | Core framework | Fast static pages, SEO-friendly, handles 10k+ visitors |
| **React** | Interactive components | 3D models, forms, mobile menu |
| **TypeScript** | Type safety | Catch errors early, better code completion |
| **Tailwind v4** | Styling | Fast, utility-first CSS |
| **FrontQL** | Database | Cloud SQL database with frontend access |
| **Vercel** | Deployment | Easy deploy from GitHub |

### The "Islands Architecture"

Astro generates **static HTML** by default. When you need interactivity (like a 3D model or form), you add a **"React Island"** - a small piece of JavaScript that only loads where needed.

```
┌──────────────────────────────────────────────┐
│  Static HTML (fast, no JavaScript)           │
│  ┌────────────────┐                          │
│  │  React Island  │ ← JavaScript only here   │
│  │   (3D Model)   │                          │
│  └────────────────┘                          │
│  More static HTML...                         │
└──────────────────────────────────────────────┘
```

---

## 📁 Project Structure

```
euphuism-2026/
├── public/                      # Static files (images, fonts, 3D models)
│   ├── favicon.svg             # Site favicon
│   └── vite.svg                # Vite logo asset
│
├── src/
│   ├── apis/                   # 🔌 FrontQL database calls
│   │   ├── Api.ts              # Core API service (DON'T MODIFY)
│   │   ├── auth.ts             # Authentication functions (login, logout)
│   │   ├── auth.json           # Auth configuration
│   │   ├── tokens.json         # Token storage
│   │   ├── server.js           # FrontQL server configuration
│   │   ├── events.ts           # Event-related API calls
│   │   ├── sponsors.ts         # Sponsor API calls
│   │   ├── team.ts             # Team/committee API calls
│   │   └── index.ts            # Exports all API modules
│   │
│   ├── components/
│   │   ├── astro/              # 📄 Static components (.astro)
│   │   │   ├── Navbar.astro    # Static navbar
│   │   │   └── Footer.astro    # Site footer
│   │   │
│   │   └── react/              # ⚛️ Interactive components (.tsx)
│   │       ├── 3d/             # Three.js / R3F components
│   │       │   └── Hero3D.tsx  # 3D hero section
│   │       │
│   │       ├── forms/          # Form components
│   │       │   └── LoginForm.tsx  # Generic login form
│   │       │
│   │       ├── Admin/          # 🔐 Admin panel components
│   │       │   ├── Admin.tsx          # Admin wrapper component
│   │       │   ├── LoginForm.tsx      # Admin login form
│   │       │   ├── ProtectedRoute.tsx # Auth route guard
│   │       │   └── pages/             # Admin page components
│   │       │       ├── Home.tsx       # Dashboard home
│   │       │       ├── Events.tsx     # Events manager
│   │       │       ├── Sponsors.tsx   # Sponsors manager
│   │       │       ├── Gallery.tsx    # Gallery manager
│   │       │       ├── Media.tsx      # Media manager
│   │       │       └── Users.tsx      # Users manager
│   │       │
│   │       ├── Navbar.tsx      # Mobile menu navbar
│   │       └── index.ts        # Component exports
│   │
│   ├── layouts/                # 📐 Page templates
│   │   ├── BaseLayout.astro    # Main layout (SEO, header, footer)
│   │   └── AdminLayout.tsx     # Admin panel layout (React)
│   │
│   ├── pages/                  # 📍 All pages (file-based routing!)
│   │   ├── index.astro         # Homepage (/)
│   │   ├── sponsors.astro      # Sponsors page (/sponsors)
│   │   ├── webdev.astro        # WebDev team (/webdev)
│   │   ├── 404.astro           # 404 page
│   │   ├── events/
│   │   │   ├── index.astro     # All events (/events)
│   │   │   └── [slug].astro    # Single event (/events/dance-night)
│   │   └── admin/
│   │       └── [...path].astro # Catch-all admin route (SPA)
│   │
│   ├── globals.css             # 🎨 Global styles & Tailwind
│   └── env.d.ts                # TypeScript environment types
│
├── astro.config.mjs            # ⚙️ Astro configuration
├── tsconfig.json               # TypeScript settings
├── package.json                # Dependencies & scripts
├── pnpm-lock.yaml              # pnpm lockfile
├── required_pages_list.json    # Required pages configuration
└── .env.example                # Environment variables template
```

---

## 🎯 Understanding Astro

### Astro Files (.astro)

Astro files have **two sections**:

```astro
---
// 1. FRONTMATTER (JavaScript/TypeScript)
// Runs at BUILD TIME (not in browser)
// Fetch data, import components, define variables

import BaseLayout from '../layouts/BaseLayout.astro';
const pageTitle = "Hello World";
const events = await fetch('/api/events').then(r => r.json());
---

<!-- 2. TEMPLATE (HTML-like) -->
<BaseLayout title={pageTitle}>
  <h1>{pageTitle}</h1>
  
  {events.map(event => (
    <div>{event.name}</div>
  ))}
</BaseLayout>
```

### Key Differences from React

| React | Astro |
|-------|-------|
| `className` | `class` |
| `onClick={fn}` | Not available (use React Island) |
| `useState` | Not available (use React Island) |
| Components run in browser | Components run at build time |

---

## 🏝 React Islands Explained

### When to Use React vs Astro Components

| Use Astro (.astro) | Use React (.tsx) |
|--------------------|------------------|
| Static content | 3D models |
| Text, images | Forms with validation |
| Navigation links | Interactive animations |
| Cards, lists | Mobile menu toggle |
| Any content that doesn't change | Anything with `useState` |

### How to Use a React Island

```astro
---
// Inside an .astro file
import Hero3D from '../components/react/3d/Hero3D';
import Navbar from '../components/react/Navbar';
---

<!-- client:load = Load JavaScript immediately -->
<Hero3D client:load />

<!-- client:visible = Load when scrolled into view -->
<Section client:visible />

<!-- client:idle = Load when browser is idle -->
<Form client:idle />
```

### Client Directives Cheat Sheet

| Directive | When to Use |
|-----------|-------------|
| `client:load` | 3D models, above-the-fold content |
| `client:visible` | Below-the-fold content, lazy loading |
| `client:idle` | Forms, non-critical interactivity |
| `client:only="react"` | Component that uses browser-only APIs |

---

## 🔌 Working with FrontQL

### Fetching Data in Astro Pages (Build Time)

```astro
---
// This runs at BUILD time, not in browser
import { getEvents } from '../apis/events';

const events = await getEvents();
---

<ul>
  {events.map(event => (
    <li>{event.title}</li>
  ))}
</ul>
```

### Fetching Data in React Components (Client Side)

```tsx
// This runs in the BROWSER
import { useState, useEffect } from 'react';
import Api from '../apis/Api';

function EventList() {
  const [events, setEvents] = useState([]);
  
  useEffect(() => {
    Api.get('/euphuism-events').then(setEvents);
  }, []);
  
  return (
    <ul>
      {events.map(event => <li>{event.title}</li>)}
    </ul>
  );
}
```

### Adding a New API Endpoint

1. Create a new file in `src/apis/`:

```typescript
// src/apis/registrations.ts
import Api from './Api';

export async function registerForEvent(eventId: number, data: any) {
  return await Api.post('/registrations', {
    body: { event_id: eventId, ...data }
  });
}
```

2. Export it from `src/apis/index.ts`:

```typescript
export * from './registrations';
```

---

## 📍 Pages & Routing

Astro uses **file-based routing**. The file path = the URL.

| File | URL |
|------|-----|
| `src/pages/index.astro` | `/` |
| `src/pages/events/index.astro` | `/events` |
| `src/pages/events/[slug].astro` | `/events/dance-night` |
| `src/pages/admin/index.astro` | `/admin` |

### Dynamic Routes

The `[slug].astro` pattern creates dynamic pages:

```astro
---
// src/pages/events/[slug].astro

// 1. Define all possible slugs at build time
export async function getStaticPaths() {
  const events = await getEvents();
  return events.map(event => ({
    params: { slug: event.slug },
    props: { event }
  }));
}

// 2. Get the specific event data
const { event } = Astro.props;
---

<h1>{event.title}</h1>
```

---

## 🧩 Components Guide

### Creating an Astro Component

```astro
---
// src/components/astro/EventCard.astro

interface Props {
  title: string;
  date: string;
  image?: string;
}

const { title, date, image = '/default-event.jpg' } = Astro.props;
---

<article class="event-card bg-[var(--color-bg-card)] rounded-xl">
  <img src={image} alt={title} />
  <h3>{title}</h3>
  <p>{date}</p>
</article>
```

### Creating a React Component

```tsx
// src/components/react/CountdownTimer.tsx

import { useState, useEffect } from 'react';

interface Props {
  targetDate: string;
}

export default function CountdownTimer({ targetDate }: Props) {
  const [timeLeft, setTimeLeft] = useState('');
  
  useEffect(() => {
    const timer = setInterval(() => {
      // Calculate time left
      setTimeLeft(/* ... */);
    }, 1000);
    return () => clearInterval(timer);
  }, [targetDate]);
  
  return <div className="countdown">{timeLeft}</div>;
}
```

Use it in Astro:

```astro
---
import CountdownTimer from '../components/react/CountdownTimer';
---

<CountdownTimer client:load targetDate="2026-03-15" />
```

---

## ➕ Adding New Features

### Adding a New Page

1. Create file in `src/pages/`:
```astro
---
// src/pages/gallery.astro
import BaseLayout from '../layouts/BaseLayout.astro';
---

<BaseLayout title="Gallery">
  <h1>Photo Gallery</h1>
  <!-- Your content -->
</BaseLayout>
```

2. It's automatically available at `/gallery`

### Adding a New React Island

1. Create component in `src/components/react/`:
```tsx
// src/components/react/ImageGallery.tsx
export default function ImageGallery() {
  // Interactive gallery code
}
```

2. Use in any Astro page:
```astro
---
import ImageGallery from '../components/react/ImageGallery';
---

<ImageGallery client:visible />
```

---

## ⚡ Prerender Optimization (Performance)

This project uses **Astro 5 with SSR mode** deployed on Vercel. To optimize for 10k+ visitors, pages are configured with prerender directives:

- **Static pages** (`prerender = true`): Pre-built at deploy time → served instantly from CDN
- **Dynamic pages** (`prerender = false`): Server-rendered on each request → needed for auth/real-time data

### Page Rendering Strategy

| Page | Route | Prerender | Reason |
|------|-------|-----------|--------|
| `index.astro` | `/` | ✅ Static | Landing page with parallax hero & 3D model |
| `404.astro` | `/404` | ✅ Static | Error page - instant loading required |
| `sponsors.astro` | `/sponsors` | ✅ Static | Sponsor showcase - rarely changes |
| `webdev.astro` | `/webdev` | ✅ Static | Team page - rarely changes |
| `events/index.astro` | `/events` | ✅ Static | Events listing - built at deploy time |
| `events/[slug].astro` | `/events/*` | ✅ Static | Event details via `getStaticPaths()` |
| `admin/[...path].astro` | `/admin/*` | ❌ SSR | Auth-protected admin panel |

### Adding New Pages

When creating a new page, add the appropriate directive at the top of the frontmatter:

```astro
---
// For static content (landing pages, info pages, etc.)
export const prerender = true;

// ... rest of imports
---
```

```astro
---
// For dynamic content (auth, user-specific data, real-time features)
export const prerender = false;

// ... rest of imports
---
```

> **Tip**: Default to `prerender = true` unless your page needs authentication, real-time data, or user-specific content.

---

## 🚢 Deployment

### Deploy to Vercel

1. Push code to GitHub
2. Connect repo to Vercel
3. Vercel auto-detects Astro and deploys

### Environment Variables

Set these in Vercel dashboard:
- `VITE_DATABASE`
- `VITE_FQ_BASE_URL`
- `PUBLIC_SITE_URL`

---

## 🐛 Common Issues

### "Cannot find module" error
```bash
pnpm install  # Run install again
```

### React component not working
Make sure you added a `client:*` directive:
```astro
<!-- ❌ Wrong - no JavaScript loaded -->
<MyComponent />

<!-- ✅ Correct -->
<MyComponent client:load />
```

### Styles not applying
Check that `globals.css` is imported in your layout.

### 3D model not loading
- Put `.glb` files in `public/models/`
- Use path `/models/your-model.glb` (not `./public/...`)

---

## 👥 Team

Built by the GCU Euphuism 2026 WebDev Committee.

---

## 📚 Resources

- [Astro Docs](https://docs.astro.build)
- [React Three Fiber](https://docs.pmnd.rs/react-three-fiber)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [FrontQL Docs](https://frontql.dev)
