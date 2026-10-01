import { useCallback, useRef, useState } from 'react'
import ChapterOverlay from '@/components/hero/ChapterOverlay'
import HeroImage from '@/components/hero/HeroImage'
import HeroStage, { HeroAtmosphere } from '@/components/hero/HeroStage'
import { MONOGRAM_CENTER_SHIFT, MONOGRAM_WIDTH } from '@/components/brand/glyphs'
import { HERO_CHAPTERS, HERO_LENGTH } from '@/data/heroChapters'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { gsap, useGSAP } from '@/lib/gsap'
import { getLenis } from '@/lib/lenisStore'
import { cn } from '@/lib/cn'

/**
 * BYZAN hero: "The Journey of a Suit".
 *
 * One pinned, full-viewport section. A single GSAP timeline (length 100) is
 * scrubbed by scroll, so picture and text are always in perfect sync:
 *
 *   0   ── I   La Silhouette   slow push-in on the full suit; B monogram fades
 *   22  ── II  Il Dettaglio    cross-fade to lapel / buttons / stitching, push-in
 *   46  ── III Il Tessuto      macro fabric, slow lateral drift
 *   68  ── IV  L'Atelier       craftsmanship scene, slow pull-back
 *   89  ── V   Il Ritorno      full suit returns; BYZAN wordmark + "Shop Suits"
 *
 * Rules honoured: only transform and opacity are animated; every effect is
 * created inside useGSAP (auto cleanup); mobile gets a shorter scroll track
 * and gentler zoom via gsap.matchMedia; reduced-motion users get a plain
 * stack of full-screen panels with no pinning or scrubbing.
 */

// Scroll distance of the pinned journey, in viewport heights.
const TRACK_DESKTOP = 6
const TRACK_MOBILE = 5

export default function HeroJourney() {
  const rootRef = useRef(null)
  const triggerRef = useRef(null)
  const activeRef = useRef(0)
  const [activeIndex, setActiveIndex] = useState(0)
  const reducedMotion = useReducedMotion()

  useGSAP(
    () => {
      const root = rootRef.current
      if (!root || reducedMotion) return undefined

      const mm = gsap.matchMedia()

      mm.add({ desktop: '(min-width: 768px)', mobile: '(max-width: 767px)' }, (context) => {
        const { desktop } = context.conditions
        const zoom = desktop ? 0.16 : 0.1 // gentler on phones
        const track = desktop ? TRACK_DESKTOP : TRACK_MOBILE
        const starts = HERO_CHAPTERS.map((chapter) => chapter.start)
        const lastIndex = HERO_CHAPTERS.length - 1

        const one = (selector) => root.querySelector(selector)
        const layer = (i) => one(`[data-hero-layer="${i}"]`)
        const image = (i) => one(`[data-hero-image="${i}"]`)
        const overlay = (i) => one(`[data-hero-overlay="${i}"]`)

        const timeline = gsap.timeline({
          defaults: { ease: 'none' },
          scrollTrigger: {
            trigger: root,
            start: 'top top',
            end: () => `+=${Math.round(window.innerHeight * track)}`,
            pin: true,
            scrub: 1, // 1s of smoothing gives the slow, weighty feel
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              const position = self.progress * HERO_LENGTH
              let index = 0
              for (let i = starts.length - 1; i >= 0; i -= 1) {
                if (position >= starts[i]) {
                  index = i
                  break
                }
              }
              if (index !== activeRef.current) {
                activeRef.current = index
                setActiveIndex(index)
              }
            },
          },
        })
        triggerRef.current = timeline.scrollTrigger

        /* ---- Camera: slow zoom / drift on each photograph ------------- */
        timeline.fromTo(image(0), { scale: 1 }, { scale: 1 + zoom, duration: 26 }, 0)
        timeline.fromTo(
          image(1),
          { scale: 1.06 },
          { scale: 1.06 + zoom * 1.4, duration: 30 },
          starts[1] - 3,
        )
        timeline.fromTo(
          image(2),
          { scale: 1.12, xPercent: -4 },
          { scale: 1.2, xPercent: 4, duration: 30 },
          starts[2] - 3,
        )
        timeline.fromTo(
          image(3),
          { scale: 1.12, xPercent: 2 },
          { scale: 1.04, xPercent: -1, duration: 30 },
          starts[3] - 3,
        )
        timeline.fromTo(image(4), { scale: 1.1 }, { scale: 1, duration: 10 }, starts[4] - 3)

        /* ---- Cross-fades: each new photo fades in over the previous ---- */
        for (let i = 1; i <= lastIndex; i += 1) {
          const at = starts[i] - 3
          timeline.to(layer(i), { opacity: 1, duration: 6, ease: 'sine.inOut' }, at)
          // Once fully covered, drop the layer beneath (less overdraw).
          timeline.to(layer(i - 1), { opacity: 0, duration: 0.01 }, at + 6)
        }

        /* ---- Opening B monogram dissolves as scrolling begins ----------- */
        timeline.to(
          one('[data-hero-monogram]'),
          { opacity: 0, scale: 1.15, duration: 10, ease: 'sine.inOut' },
          4,
        )

        /* ---- Chapter text ------------------------------------------------ */
        HERO_CHAPTERS.forEach((chapter, i) => {
          const el = overlay(i)
          if (!el) return
          const parts = el.querySelectorAll('[data-part]')
          const rule = el.querySelector('[data-hero-rule]')
          const isFinale = i === lastIndex
          const enter = i === 0 ? 5.5 : starts[i] + 2

          timeline.fromTo(
            parts,
            { y: 28, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: isFinale ? 4 : 5,
              stagger: isFinale ? 0.8 : 1.1,
              ease: 'power2.out',
            },
            enter,
          )
          timeline.fromTo(
            rule,
            { scaleX: 0 },
            { scaleX: 1, duration: isFinale ? 5 : 6, ease: 'cinema' },
            enter + 0.5,
          )

          if (i < lastIndex) {
            timeline.to(el, { opacity: 0, y: -14, duration: 4, ease: 'power1.in' }, starts[i + 1] - 3)
          }
        })

        /* ---- Finale: B expands into the BYZAN wordmark ------------------ */
        const wordmark = one('[data-hero-wordmark]')
        if (wordmark) {
          const group = wordmark.querySelector('[data-brand-group]')
          const letters = gsap.utils.toArray(
            wordmark.querySelectorAll('[data-brand-letter]:not([data-brand-letter="B"])'),
          )
          // Finale completes by ~97, leaving a short hold before the scroll ends.
          const finale = starts[lastIndex]
          timeline.fromTo(group, { x: MONOGRAM_CENTER_SHIFT }, { x: 0, duration: 4.5, ease: 'cinema' }, finale + 3)
          timeline.fromTo(
            letters,
            { x: (_, el) => MONOGRAM_WIDTH - Number(el.dataset.slot), opacity: 0 },
            { x: 0, opacity: 1, duration: 3.5, stagger: 0.4, ease: 'luxe' },
            finale + 3.5,
          )
        }

        /* ---- Progress hairline ------------------------------------------ */
        timeline.fromTo(one('[data-hero-progress-fill]'), { scaleX: 0 }, { scaleX: 1, duration: HERO_LENGTH }, 0)

        // Pin the timeline length to exactly HERO_LENGTH.
        timeline.set({}, {}, HERO_LENGTH)

        return () => {
          triggerRef.current = null
        }
      })

      return () => mm.revert()
    },
    { scope: rootRef, dependencies: [reducedMotion], revertOnUpdate: true },
  )

  const skipToEnd = useCallback(() => {
    const trigger = triggerRef.current
    if (!trigger) return
    const lenis = getLenis()
    if (lenis) lenis.scrollTo(trigger.end, { duration: 2.4 })
    else window.scrollTo({ top: trigger.end, behavior: 'smooth' })
  }, [])

  if (reducedMotion) return <HeroStatic />

  return (
    <section ref={rootRef} aria-label="The Journey of a Suit" data-hero className="relative h-svh w-full">
      <HeroStage chapters={HERO_CHAPTERS} activeIndex={activeIndex} onSkip={skipToEnd} />
    </section>
  )
}

/**
 * Reduced-motion fallback: the same five chapters as plain full-screen
 * panels. No pinning, no scrubbing, no transforms; all content is visible.
 */
function HeroStatic() {
  return (
    <div data-hero="static">
      {HERO_CHAPTERS.map((chapter, i) => (
        <section
          key={chapter.id}
          aria-label={chapter.label}
          className={cn('relative h-svh w-full overflow-hidden bg-linear-to-b', chapter.tone)}
        >
          <HeroImage image={chapter.image} index={i} eager={i === 0} />
          <HeroAtmosphere />
          <ChapterOverlay chapter={chapter} index={i} animated={false} />
        </section>
      ))}
    </div>
  )
}
