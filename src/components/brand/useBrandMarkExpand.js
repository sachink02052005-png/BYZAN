import { gsap, useGSAP } from '@/lib/gsap'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { MONOGRAM_CENTER_SHIFT, MONOGRAM_WIDTH } from '@/components/brand/glyphs'

/**
 * Makes a <BrandMark /> start as the lone "B" and expand into the full
 * BYZAN wordmark as the page scrolls.
 *
 *   const ref = useRef(null)
 *   useBrandMarkExpand(ref, { enabled: isHome })
 *   <BrandMark ref={ref} />
 *
 * How it works (all scrubbed to the scrollbar, no React re-renders):
 *  1. The whole letter group starts shifted so the B sits at the centre of
 *     the SVG box, then eases to 0 so the finished wordmark is centred.
 *  2. Y, Z, A, N start hidden at the B's right edge and slide out to their
 *     slots, staggered, opening up the letter-spacing.
 *
 * Progressive enhancement: with JS off, reduced motion, or `enabled=false`
 * nothing is applied and the mark simply renders as the full wordmark.
 *
 * Options
 *  - enabled  turn the effect on/off (revertOnUpdate restores the SVG)
 *  - trigger  element/selector whose scroll drives it (default: the page)
 *  - start / end  ScrollTrigger positions (default: first 320px of scroll)
 *  - scrub    smoothing in seconds
 */
export function useBrandMarkExpand(
  svgRef,
  { enabled = true, trigger, start = 'top top', end = '+=320', scrub = 0.6 } = {},
) {
  const reducedMotion = useReducedMotion()

  useGSAP(
    () => {
      const svg = svgRef.current
      if (!svg || !enabled || reducedMotion) return

      const group = svg.querySelector('[data-brand-group]')
      const letters = gsap.utils.toArray(
        svg.querySelectorAll('[data-brand-letter]:not([data-brand-letter="B"])'),
      )
      if (!group || letters.length === 0) return

      const timeline = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: {
          trigger: trigger ?? document.documentElement,
          start,
          end,
          scrub,
        },
      })

      timeline
        .fromTo(group, { x: MONOGRAM_CENTER_SHIFT }, { x: 0, duration: 1.4, ease: 'cinema' }, 0)
        .fromTo(
          letters,
          {
            // Start tucked at the B's right edge, invisible.
            x: (_, el) => MONOGRAM_WIDTH - Number(el.dataset.slot),
            autoAlpha: 0,
          },
          { x: 0, autoAlpha: 1, duration: 1, stagger: 0.12, ease: 'luxe' },
          0.05,
        )
    },
    {
      scope: svgRef,
      dependencies: [enabled, reducedMotion, start, end, scrub],
      revertOnUpdate: true,
    },
  )
}
