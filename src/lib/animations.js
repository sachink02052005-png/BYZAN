import { gsap, ScrollTrigger } from '@/lib/gsap'
import { DURATION, TRIGGER } from '@/lib/motion'

/**
 * Reusable BYZAN animation utilities.
 *
 * Contract:
 *  - Call these ONLY inside a `useGSAP()` callback (or a gsap.context),
 *    so every tween and ScrollTrigger they create is cleaned up
 *    automatically on unmount / route change.
 *  - They animate only `transform` and `opacity` (GPU-friendly).
 *  - They never check reduced motion. The caller decides whether to call
 *    them (see the <Reveal> component for the pattern).
 */

/** Starting/ending states for the standard reveal vocabulary. */
export const REVEAL_PRESETS = Object.freeze({
  fade: {
    from: { autoAlpha: 0 },
    to: { autoAlpha: 1 },
  },
  'fade-up': {
    from: { autoAlpha: 0, y: 36 },
    to: { autoAlpha: 1, y: 0 },
  },
  'fade-down': {
    from: { autoAlpha: 0, y: -36 },
    to: { autoAlpha: 1, y: 0 },
  },
  // Slides text up out of a clipped parent (parent needs overflow:hidden).
  mask: {
    from: { yPercent: 110 },
    to: { yPercent: 0 },
  },
  // Image reveal: subtle settle-in from a slightly enlarged state.
  'scale-in': {
    from: { autoAlpha: 0, scale: 1.08 },
    to: { autoAlpha: 1, scale: 1 },
  },
})

/**
 * Animate `targets` into view when `trigger` scrolls into range.
 *
 *   revealOnScroll(el.children, { trigger: el, variant: 'fade-up', stagger: 0.1 })
 */
export function revealOnScroll(
  targets,
  {
    trigger,
    variant = 'fade-up',
    delay = 0,
    duration = DURATION.slow,
    stagger = 0,
    start = TRIGGER.base,
    once = true,
  } = {},
) {
  const preset = REVEAL_PRESETS[variant] ?? REVEAL_PRESETS['fade-up']

  return gsap.fromTo(targets, preset.from, {
    ...preset.to,
    duration,
    delay,
    stagger,
    ease: 'luxe',
    scrollTrigger: {
      trigger: trigger ?? targets,
      start,
      toggleActions: once ? 'play none none none' : 'play none none reverse',
    },
  })
}

/**
 * Parallax: moves `target` by `distance` px (negative = up) across the
 * time `trigger` is in view. Scrubbed, so it follows the scrollbar 1:1.
 */
export function parallax(target, { trigger, distance = -80, start = 'top bottom', end = 'bottom top' } = {}) {
  return gsap.fromTo(
    target,
    { y: -distance / 2 },
    {
      y: distance / 2,
      ease: 'none',
      scrollTrigger: { trigger: trigger ?? target, start, end, scrub: true },
    },
  )
}

/**
 * Draws a horizontal line (hairline / underline) from left to right.
 * Target should have `transform-origin: left` (Tailwind: origin-left).
 */
export function drawLine(target, { trigger, delay = 0, duration = DURATION.slow, start = TRIGGER.base } = {}) {
  return gsap.fromTo(
    target,
    { scaleX: 0 },
    {
      scaleX: 1,
      duration,
      delay,
      ease: 'cinema',
      scrollTrigger: { trigger: trigger ?? target, start, toggleActions: 'play none none none' },
    },
  )
}

/**
 * Binds a (paused) timeline to scroll progress. This is the primitive the
 * hero "Journey of a Suit" will be built on.
 *
 *   const tl = gsap.timeline()
 *   tl.to(...).to(...)
 *   scrubTimeline(tl, { trigger: stageEl, end: '+=600%', pin: true })
 */
export function scrubTimeline(
  timeline,
  { trigger, start = 'top top', end = 'bottom bottom', scrub = 0.8, pin = false, ...rest } = {},
) {
  timeline.pause()
  return ScrollTrigger.create({ animation: timeline, trigger, start, end, scrub, pin, ...rest })
}
