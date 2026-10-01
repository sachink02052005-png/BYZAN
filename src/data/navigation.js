/**
 * Central route + navigation configuration.
 *
 * Every path in the app is defined here once. Router definitions, links,
 * the navbar, and the footer import from this file rather than hard-coding
 * strings, so renaming a route is a one-line change.
 */

export const ROUTES = Object.freeze({
  home: '/',
  shop: '/shop',
  collections: '/collections',
  bespoke: '/bespoke',
  about: '/about',
  contact: '/contact',
  // Dev-only reference page for the design system. Not linked from the UI
  // and not registered in production builds (see App.jsx).
  designSystem: '/design-system',
})

/**
 * Primary navigation links, in display order.
 * Consumed by the Navbar (desktop + mobile menu) and later the Footer.
 */
export const NAV_LINKS = Object.freeze([
  { label: 'Shop', to: ROUTES.shop },
  { label: 'Collections', to: ROUTES.collections },
  { label: 'Bespoke', to: ROUTES.bespoke },
  { label: 'About', to: ROUTES.about },
])
