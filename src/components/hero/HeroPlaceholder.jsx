/**
 * PLACEHOLDER: replaced in the hero phase by <HeroJourney />.
 *
 * It mirrors the real hero's structure so the surrounding system can be
 * tested now:
 *   - a tall scroll track (300svh) containing a sticky, full-viewport stage
 *   - the navbar logo expands B -> BYZAN over the first 320px of scroll
 *   - a scroll cue
 * No imagery, no copy. Everything visible here is scaffolding.
 */
export default function HeroPlaceholder() {
  return (
    <section aria-label="Hero" data-hero-track className="relative h-[300svh]">
      <div
        data-hero-stage
        className="sticky top-0 flex h-svh flex-col items-center justify-center overflow-hidden bg-[radial-gradient(ellipse_at_50%_35%,var(--color-nero-raised),var(--color-nero)_70%)]"
      >
        <p className="eyebrow text-pietra">Hero sequence placeholder</p>

        <div className="absolute inset-x-0 bottom-10 flex flex-col items-center gap-4">
          <span className="eyebrow text-pietra">Scroll</span>
          <span aria-hidden="true" className="animate-scroll-cue block h-12 w-px bg-bronzo" />
        </div>
      </div>
    </section>
  )
}
