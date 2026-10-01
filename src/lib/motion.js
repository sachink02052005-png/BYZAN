/**
 * Motion tokens for JavaScript-driven animation (GSAP + Framer Motion).
 * The CSS twins (--ease-luxe, --ease-cinema) live in src/index.css.
 * Keep the two in sync: same curve, same name.
 */

/** Cubic-bezier control points. Framer Motion consumes these arrays directly. */
export const EASE = Object.freeze({
  luxe: [0.22, 1, 0.36, 1], // soft, long ease-out: default for reveals
  cinema: [0.65, 0, 0.35, 1], // symmetrical in-out: for scrubbed / big moves
})

/** GSAP CustomEase strings built from the same points. */
export const GSAP_EASE = Object.freeze({
  luxe: 'luxe',
  cinema: 'cinema',
})

/** Durations in seconds. */
export const DURATION = Object.freeze({
  fast: 0.4,
  base: 0.7,
  slow: 1.1,
  cinematic: 1.6,
})

/** Stagger gaps in seconds. */
export const STAGGER = Object.freeze({
  tight: 0.06,
  base: 0.1,
  loose: 0.18,
})

/** Shared ScrollTrigger start positions. */
export const TRIGGER = Object.freeze({
  early: 'top 90%',
  base: 'top 85%',
  center: 'top 60%',
})
