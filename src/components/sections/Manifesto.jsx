import { useRef } from 'react'
import BrandMark from '@/components/brand/BrandMark'
import Reveal from '@/components/ui/Reveal'
import { MANIFESTO } from '@/data/manifesto'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { drawLine } from '@/lib/animations'
import { cn } from '@/lib/cn'
import { gsap, useGSAP } from '@/lib/gsap'

/**
 * Homepage section 2: the BYZAN manifesto.
 *
 * Sits directly under the hero on the same `nero` ground, so the hero's
 * darkened bottom edge flows into it with no visible seam.
 *
 * Motion (all GSAP via the shared setup, transform + opacity only):
 *  - eyebrow fades up; its bronze hairline draws left → right
 *  - the headline lines slide up out of a mask, one after another
 *  - the supporting paragraph brightens word by word, scrubbed to scroll,
 *    so it reads at the pace the visitor scrolls
 *  - the closing B monogram fades up as a seal
 *
 * Reduced motion: everything renders fully visible with no animation.
 * Copy comes from src/data/manifesto.js (placeholder, no product claims).
 */
export default function Manifesto() {
  const sectionRef = useRef(null)
  const ruleRef = useRef(null)
  const bodyRef = useRef(null)
  const reducedMotion = useReducedMotion()

  const words = MANIFESTO.body.split(' ')

  useGSAP(
    () => {
      if (reducedMotion) return

      drawLine(ruleRef.current, { trigger: sectionRef.current, start: 'top 75%' })

      const wordEls = gsap.utils.toArray(bodyRef.current.querySelectorAll('[data-word]'))
      gsap.fromTo(
        wordEls,
        { opacity: 0.25 },
        {
          opacity: 1,
          ease: 'none',
          duration: 0.5,
          stagger: 0.15,
          scrollTrigger: {
            trigger: bodyRef.current,
            start: 'top 85%',
            end: 'bottom 50%',
            scrub: true,
          },
        },
      )
    },
    { scope: sectionRef, dependencies: [reducedMotion] },
  )

  return (
    <section
      ref={sectionRef}
      id="manifesto"
      aria-labelledby="manifesto-title"
      className="relative bg-nero py-28 md:py-44"
    >
      <div className="container-luxe">
        <div className="grid gap-x-8 gap-y-14 md:grid-cols-12 md:gap-y-20">
          {/* Eyebrow + hairline */}
          <div className="md:col-span-3">
            <Reveal>
              <p className="eyebrow text-bronzo">{MANIFESTO.eyebrow}</p>
            </Reveal>
            {/* No Tailwind scale-* utilities here: GSAP owns this transform. */}
            <div
              ref={ruleRef}
              className={cn('rule-bronzo mt-5 w-16 origin-left', !reducedMotion && '[transform:scaleX(0)]')}
            />
          </div>

          {/* Headline: one masked line at a time */}
          <h2 id="manifesto-title" className="font-display text-display-lg md:col-span-9">
            {MANIFESTO.statement.map((line, i) => (
              <Reveal
                key={line.text}
                as="span"
                variant="mask"
                delay={i * 0.14}
                className="block pb-[0.12em] pr-[0.05em]"
              >
                {line.emphasis ? <em className="text-bronzo">{line.text}</em> : line.text}
              </Reveal>
            ))}
          </h2>

          {/* Supporting paragraph: words brighten as you scroll */}
          <div ref={bodyRef} className="md:col-span-7 md:col-start-6">
            <p className="font-display text-display-sm text-avorio">
              {words.map((word, i) => (
                <span key={`${word}-${i}`} data-word>
                  {word}{' '}
                </span>
              ))}
            </p>
          </div>

          {/* Closing seal */}
          <Reveal className="flex items-center gap-6 md:col-span-7 md:col-start-6">
            <span aria-hidden="true" className="rule-bronzo w-12" />
            <BrandMark mode="monogram" decorative className="h-9 text-bronzo" />
          </Reveal>
        </div>
      </div>
    </section>
  )
}
