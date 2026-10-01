import { cn } from '@/lib/cn'

/**
 * Chapter indicator + scroll progress bar, docked to the bottom of the stage.
 *
 *  - Roman numerals I–V; the active chapter is bronze.
 *  - A hairline fills left → right with overall progress. The fill is driven
 *    directly by the GSAP timeline through [data-hero-progress-fill], so it
 *    never triggers React re-renders. (Do not add a Tailwind scale-x-* class
 *    to it: that would compound with GSAP's transform.)
 *  - "Skip" jumps to the final chapter, so the story never blocks shopping.
 *
 * `activeIndex` is the only React state involved; it changes 4 times per
 * journey.
 */
export default function HeroProgress({ chapters, activeIndex, onSkip }) {
  const isLast = activeIndex === chapters.length - 1

  return (
    <div className="absolute inset-x-0 bottom-0 z-20 pb-[max(1.25rem,env(safe-area-inset-bottom))]">
      <div className="container-luxe flex items-center gap-5 md:gap-8">
        <ol aria-label="Chapters" className="flex items-center gap-3 md:gap-4">
          {chapters.map((chapter, i) => (
            <li
              key={chapter.id}
              aria-current={i === activeIndex ? 'step' : undefined}
              className={cn(
                'eyebrow transition-colors duration-700 ease-luxe',
                i === activeIndex ? 'text-bronzo' : 'text-avorio/40',
              )}
            >
              <span aria-hidden="true">{chapter.numeral}</span>
              <span className="sr-only">{chapter.label}</span>
            </li>
          ))}
        </ol>

        <div className="relative h-px flex-1 bg-avorio/20" aria-hidden="true">
          <div
            data-hero-progress-fill
            className="absolute inset-0 origin-left bg-bronzo [transform:scaleX(0)]"
          />
        </div>

        <button
          type="button"
          onClick={onSkip}
          disabled={isLast}
          aria-label="Skip to the final chapter"
          className="-m-4 p-4 eyebrow text-avorio/70 transition-colors duration-500 ease-luxe hover:text-bronzo disabled:pointer-events-none disabled:opacity-0"
        >
          Skip
        </button>
      </div>
    </div>
  )
}
