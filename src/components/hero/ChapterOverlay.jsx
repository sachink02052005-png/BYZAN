import { Link } from 'react-router-dom'
import BrandMark from '@/components/brand/BrandMark'
import Button from '@/components/ui/Button'
import { ROUTES } from '@/data/navigation'
import { cn } from '@/lib/cn'

/**
 * Text layer for one hero chapter.
 *
 * Markup only. The scroll timeline in HeroJourney finds the pieces through
 * data attributes and animates them:
 *   [data-hero-overlay]  whole overlay (fades out at chapter end)
 *   [data-part]          items revealed in sequence (label, headline, ...)
 *   [data-hero-rule]     hairline that draws left → right
 *   [data-hero-wordmark] the BYZAN wordmark SVG (final chapter only)
 *
 * Props
 *  - active    false hides it from assistive tech and blocks focus/clicks
 *              (an invisible CTA must never be tabbable or clickable)
 *  - animated  false renders everything visible (reduced-motion fallback)
 *
 * The final chapter (chapter.final) shows the wordmark and the
 * "Shop Suits" call to action instead of a headline.
 */
export default function ChapterOverlay({ chapter, index, active = true, animated = true }) {
  const hidden = animated ? 'opacity-0' : ''
  const isFinal = Boolean(chapter.final)

  return (
    <div
      data-hero-overlay={index}
      aria-hidden={!active}
      inert={!active}
      className="pointer-events-none absolute inset-x-0 bottom-0 z-10 pb-28 md:pb-36"
    >
      <div className={cn('container-luxe', isFinal && 'flex flex-col items-center text-center')}>
        <p data-part className={cn('eyebrow text-bronzo', hidden)}>
          {chapter.numeral} · {chapter.label}
        </p>

        <div
          data-hero-rule
          className={cn(
            'rule-bronzo mt-5 w-16',
            isFinal ? 'origin-center' : 'origin-left',
            animated && '[transform:scaleX(0)]',
          )}
        />

        {chapter.headline && (
          <h2 data-part className={cn('mt-6 max-w-[14ch] font-display text-display-md md:text-display-lg', hidden)}>
            {chapter.headline}
          </h2>
        )}

        {isFinal && (
          <>
            <div data-part className={cn('mt-10', hidden)}>
              <BrandMark data-hero-wordmark decorative className="h-9 text-avorio md:h-14" />
            </div>
            <div data-part className={cn('pointer-events-auto mt-10', hidden)}>
              <Button as={Link} to={ROUTES.shop} size="lg">
                Shop Suits
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
