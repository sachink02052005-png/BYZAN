import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import Button from '@/components/ui/Button'
import Reveal from '@/components/ui/Reveal'
import { COLLECTIONS, COLLECTIONS_SECTION, collectionUrl } from '@/data/collections'
import { ROUTES } from '@/data/navigation'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { drawLine } from '@/lib/animations'
import { cn } from '@/lib/cn'
import { useGSAP } from '@/lib/gsap'

/**
 * One collection card: a portrait image tile that links straight into the
 * shop, pre-filtered. The whole tile is the link (one tab stop, large tap
 * target). No price, count or product claim is shown; those must come from
 * the real catalogue later.
 *
 * Hover motion is plain CSS (slow image push-in, arrow nudge) on elements
 * GSAP never touches, so it cannot conflict with the scroll reveal that
 * GSAP applies to the surrounding <li>.
 */
function CollectionCard({ collection }) {
  const [missing, setMissing] = useState(false)
  const { id, index, name, descriptor, image, tone } = collection

  return (
    <Link
      to={collectionUrl(id)}
      aria-label={`Shop the ${name} collection`}
      className={cn(
        'group relative block aspect-[3/4] overflow-hidden border border-avorio/10 bg-linear-to-b',
        tone,
      )}
    >
      <img
        src={image}
        alt=""
        loading="lazy"
        decoding="async"
        draggable={false}
        onError={() => setMissing(true)}
        className="absolute inset-0 h-full w-full select-none object-cover transition-transform duration-[1400ms] ease-luxe group-hover:scale-105 motion-reduce:transition-none"
      />

      {/* DEV ONLY: shows exactly where a missing asset belongs. */}
      {import.meta.env.DEV && missing && (
        <p className="eyebrow absolute inset-x-4 top-1/3 text-center leading-relaxed text-pietra">
          Collection image missing
          <br />
          <span className="normal-case tracking-normal">Place at public{image}</span>
        </p>
      )}

      {/* Readability scrim for the title block */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-linear-to-t from-nero/90 via-nero/25 to-transparent transition-opacity duration-700 ease-luxe group-hover:opacity-90"
      />

      <div className="absolute inset-x-0 bottom-0 flex flex-col gap-2 p-4 sm:gap-3 sm:p-6">
        <span className="eyebrow text-bronzo">{index}</span>
        <h3 className="font-display text-display-sm text-avorio">{name}</h3>
        <p className="hidden max-w-[24ch] text-sm leading-snug text-avorio/70 sm:block">{descriptor}</p>
        <span className="eyebrow mt-1 inline-flex items-center gap-2 text-avorio transition-colors duration-500 ease-luxe group-hover:text-bronzo">
          Shop
          <ArrowUpRight
            aria-hidden="true"
            strokeWidth={1.25}
            className="size-4 transition-transform duration-500 ease-luxe group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
          />
        </span>
      </div>
    </Link>
  )
}

/**
 * Homepage section 3: Featured Collections.
 *
 * Shop-by-occasion entry points (Wedding, Business, Festive, Essentials)
 * that route into the pre-filtered shop. Content: src/data/collections.js.
 *
 * Layout: 2×2 on phones, 4 across on desktop with the 2nd and 4th cards
 * dropped for an editorial stagger. Sits on `nero-soft` so it reads as a
 * distinct band after the Manifesto's `nero`.
 *
 * Motion (existing GSAP setup, transform + opacity only): eyebrow fades up,
 * hairline draws, headline slides up out of a mask, and the cards rise in
 * one after another. Reduced motion: everything is shown immediately.
 */
export default function FeaturedCollections() {
  const sectionRef = useRef(null)
  const ruleRef = useRef(null)
  const reducedMotion = useReducedMotion()

  useGSAP(
    () => {
      if (reducedMotion) return
      drawLine(ruleRef.current, { trigger: sectionRef.current, start: 'top 75%' })
    },
    { scope: sectionRef, dependencies: [reducedMotion] },
  )

  return (
    <section
      ref={sectionRef}
      id="collections"
      aria-labelledby="collections-title"
      className="relative bg-nero-soft py-24 md:py-40"
    >
      <div className="container-luxe">
        <div className="mb-12 grid gap-x-8 gap-y-8 md:mb-20 md:grid-cols-12 md:items-end">
          <div className="md:col-span-3">
            <Reveal>
              <p className="eyebrow text-bronzo">{COLLECTIONS_SECTION.eyebrow}</p>
            </Reveal>
            {/* No Tailwind scale-* utilities here: GSAP owns this transform. */}
            <div
              ref={ruleRef}
              className={cn('rule-bronzo mt-5 w-16 origin-left', !reducedMotion && '[transform:scaleX(0)]')}
            />
          </div>

          <h2 id="collections-title" className="font-display text-display-lg md:col-span-6">
            <Reveal as="span" variant="mask" className="block pb-[0.12em] pr-[0.05em]">
              {COLLECTIONS_SECTION.title}
            </Reveal>
          </h2>

          <Reveal className="md:col-span-3 md:justify-self-end">
            <Button as={Link} to={ROUTES.shop} variant="link">
              {COLLECTIONS_SECTION.viewAll}
            </Button>
          </Reveal>
        </div>

        <Reveal
          as="ul"
          stagger={0.12}
          className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4 lg:gap-6"
        >
          {COLLECTIONS.map((collection, i) => (
            <li key={collection.id} className={cn(i % 2 === 1 && 'lg:mt-16')}>
              <CollectionCard collection={collection} />
            </li>
          ))}
        </Reveal>
      </div>
    </section>
  )
}
