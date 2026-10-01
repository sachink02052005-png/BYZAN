import { useState } from 'react'
import BrandMark from '@/components/brand/BrandMark'
import ChapterOverlay from '@/components/hero/ChapterOverlay'
import HeroImage from '@/components/hero/HeroImage'
import HeroProgress from '@/components/hero/HeroProgress'
import { cn } from '@/lib/cn'

/**
 * Static atmosphere: vignette + a bottom scrim so text stays readable on any
 * photograph. Pure CSS, never animated. Also used by the reduced-motion
 * fallback.
 */
export function HeroAtmosphere() {
  return (
    <>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-[1] bg-[radial-gradient(ellipse_at_center,transparent_35%,var(--color-nero)_130%)] opacity-70"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-3/5 bg-linear-to-t from-nero via-nero/40 to-transparent"
      />
    </>
  )
}

/**
 * The pinned visual stack. Back to front:
 *
 *   layers      one full-bleed photo per chapter (chapters 2–5 start at
 *               opacity 0; the timeline cross-fades them in)
 *   atmosphere  vignette + scrim
 *   monogram    the opening B, dissolves as scrolling begins
 *   overlays    chapter text, one per chapter
 *   progress    chapter indicator + progress bar
 *
 * This component is presentation only. All motion is applied by the
 * timeline in HeroJourney via the data-hero-* attributes.
 *
 * Loading: the first image is requested immediately with high priority.
 * The other four only get their `src` once the first has settled, so they
 * never compete with it for bandwidth.
 */
export default function HeroStage({ chapters, activeIndex, onSkip }) {
  const [restEnabled, setRestEnabled] = useState(false)
  const [missing, setMissing] = useState({})

  const settleFirst = () => setRestEnabled(true)
  const markMissing = (index) => () => {
    setMissing((prev) => ({ ...prev, [index]: true }))
    if (index === 0) setRestEnabled(true)
  }

  return (
    <div className="relative h-full w-full overflow-hidden bg-nero">
      {chapters.map((chapter, i) => (
        <div
          key={chapter.id}
          data-hero-layer={i}
          className={cn(
            'absolute inset-0 overflow-hidden bg-linear-to-b will-change-[opacity]',
            chapter.tone,
            i > 0 && 'opacity-0',
          )}
        >
          <HeroImage
            image={chapter.image}
            index={i}
            eager={i === 0}
            enabled={i === 0 || restEnabled}
            onLoad={i === 0 ? settleFirst : undefined}
            onError={markMissing(i)}
          />

          {/* DEV ONLY: shows exactly where a missing asset belongs. */}
          {import.meta.env.DEV && missing[i] && (
            <p className="eyebrow absolute inset-x-6 top-1/3 text-center leading-relaxed text-pietra">
              Hero asset {i + 1} missing
              <br />
              <span className="normal-case tracking-normal">Place image at public{chapter.image.src}</span>
            </p>
          )}
        </div>
      ))}

      <HeroAtmosphere />

      <div
        data-hero-monogram
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-10 grid place-items-center"
      >
        <BrandMark mode="monogram" decorative className="h-28 text-avorio/90 md:h-40" />
      </div>

      {chapters.map((chapter, i) => (
        <ChapterOverlay key={chapter.id} chapter={chapter} index={i} active={i === activeIndex} />
      ))}

      <HeroProgress chapters={chapters} activeIndex={activeIndex} onSkip={onSkip} />
    </div>
  )
}
