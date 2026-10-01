# BYZAN

Storefront for BYZAN, a premium affordable Italian-inspired menswear brand
(men's suits, ₹8,000 – ₹25,000). Cinematic, scroll-driven storytelling with a
conversion-focused shop.

## Stack

| Area          | Choice                                                    |
| ------------- | --------------------------------------------------------- |
| Framework     | React 19 + Vite                                           |
| Routing       | React Router (lazy-loaded pages)                          |
| Styling       | Tailwind CSS 4, tokens defined in `src/index.css`         |
| Scroll motion | GSAP + ScrollTrigger, Lenis smooth scroll                 |
| UI motion     | Framer Motion (menus, drawers, hover states)              |
| Icons         | Lucide React                                              |
| Fonts         | Cormorant Garamond (display), Jost (UI), via Google Fonts |

## Scripts

| Command           | Purpose                      |
| ----------------- | ---------------------------- |
| `npm run dev`     | Start the dev server         |
| `npm run build`   | Production build to `dist/`  |
| `npm run preview` | Preview the production build |
| `npm run lint`    | Run ESLint                   |

The import alias `@/` points to `src/` (for example `@/lib/gsap`).

## Project structure

```
src/
├── main.jsx                 Entry point: Router + SmoothScrollProvider
├── App.jsx                  Route table only
├── index.css                Tailwind import, design tokens (@theme), base styles
│
├── layouts/
│   └── MainLayout.jsx       Shared shell: skip link, Navbar, <main>, footer slot
│
├── pages/                   One component per route
│   ├── Home / Shop / Collections / Bespoke / About / Contact
│   ├── NotFound
│   └── DesignSystem         Dev-only style guide (/design-system)
│
├── components/
│   ├── brand/               BrandMark (SVG), glyph data, useBrandMarkExpand
│   ├── layout/              Navbar, MobileMenu
│   ├── hero/                Hero components (placeholder for now)
│   ├── ui/                  Button, Reveal (shared primitives)
│   ├── PageFallback.jsx     Suspense fallback for lazy pages
│   └── ScrollToTop.jsx      Scroll reset + ScrollTrigger refresh on navigation
│
├── providers/
│   └── SmoothScrollProvider.jsx   Lenis, driven by GSAP's ticker
│
├── hooks/                   useMediaQuery, useReducedMotion, useLenis,
│                            useScrollLock, useScrollDirection
│
├── lib/
│   ├── gsap.js              The only place GSAP is imported and configured
│   ├── motion.js            Easing / duration / stagger tokens
│   ├── animations.js        revealOnScroll, parallax, drawLine, scrubTimeline
│   ├── lenisStore.js        Holds the active Lenis instance
│   ├── cn.js                Class-name joiner
│   └── format.js            ₹ price formatting (en-IN)
│
├── data/
│   ├── navigation.js        ROUTES + NAV_LINKS (single source of truth)
│   └── site.js              Brand constants
│
└── assets/                  Bundled images and other static files
```

## Conventions

- **Routes:** define every path once in `src/data/navigation.js`. Never hard-code
  path strings in components.
- **GSAP:** import only from `@/lib/gsap`, never from `gsap` directly, so plugins
  and defaults are registered exactly once. Create tweens inside `useGSAP()` so
  they clean up automatically.
- **Motion:** animate only `transform` and `opacity`. Every animated component
  must respect `useReducedMotion()`.
- **Design tokens:** colours, fonts, type scale and easings come from the
  `@theme` block in `src/index.css`. Do not use raw hex values in components.
- **Tailwind classes** must appear as complete strings in source; never build
  class names by concatenation.
- **Copy and product data:** do not commit placeholder marketing copy or fake
  products. Real content goes in `src/data/`.

## Design system reference

Run `npm run dev` and open `/design-system` for a live reference of colours,
typography, buttons, reveal animations and the BrandMark. The route is
registered only in development and is excluded from production builds.

## Deployment note

This is a single-page app with client-side routing. The host must rewrite all
unknown paths to `index.html`; otherwise refreshing on `/shop` returns a 404.
