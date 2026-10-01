import { cn } from '@/lib/cn'
import {
  GLYPHS,
  MARK_HEIGHT,
  MONOGRAM_WIDTH,
  STROKE_WIDTH,
  WORDMARK_WIDTH,
} from '@/components/brand/glyphs'

/**
 * The BYZAN mark, as inline SVG.
 *
 * mode="wordmark"  (default) full B Y Z A N. Also the base for the animated
 *                  version: pass a `ref` to useBrandMarkExpand() to make the
 *                  B expand into the wordmark on scroll.
 * mode="monogram"  the B on its own (favicon-style, loaders, watermarks).
 *
 * Colour comes from `currentColor`, so set it with a text-* class.
 * Size it with height (e.g. "h-6"); width follows the aspect ratio.
 * Pass `decorative` when the mark sits next to visible brand text.
 */
export default function BrandMark({
  mode = 'wordmark',
  title = 'BYZAN',
  decorative = false,
  className,
  ref,
  ...rest
}) {
  const isMonogram = mode === 'monogram'
  const width = isMonogram ? MONOGRAM_WIDTH : WORDMARK_WIDTH
  const glyphs = isMonogram ? GLYPHS.slice(0, 1) : GLYPHS

  return (
    <svg
      ref={ref}
      viewBox={`0 0 ${width} ${MARK_HEIGHT}`}
      fill="none"
      stroke="currentColor"
      strokeWidth={STROKE_WIDTH}
      strokeLinecap="butt"
      strokeLinejoin="miter"
      strokeMiterlimit={4}
      role={decorative ? undefined : 'img'}
      aria-label={decorative ? undefined : title}
      aria-hidden={decorative ? true : undefined}
      focusable="false"
      className={cn('block h-6 w-auto overflow-visible', className)}
      {...rest}
    >
      <g data-brand-group>
        {glyphs.map(({ char, slot, d }) => (
          // Outer <g> positions the letter; inner <g> is what GSAP animates,
          // so the two transforms never conflict.
          <g key={char} transform={`translate(${slot} 0)`}>
            <g data-brand-letter={char} data-slot={slot}>
              <path d={d} />
            </g>
          </g>
        ))}
      </g>
    </svg>
  )
}
