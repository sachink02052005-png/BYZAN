/**
 * BYZAN wordmark geometry.
 *
 * Every letter is a monoline stroke path in its own 100-unit-tall box.
 * `slot` is the x-offset of the letter inside the full wordmark;
 * `advance` is the letter's box width. Gaps between boxes are 16 units,
 * which optically evens out to ~24 units between letter edges.
 *
 * Stroke-based (not filled) so letters can be animated (draw-on, slide,
 * fade) and stay razor sharp at any size.
 */

export const STROKE_WIDTH = 4.5
export const MARK_HEIGHT = 100

export const GLYPHS = Object.freeze([
  {
    char: 'B',
    slot: 0,
    advance: 62,
    d: 'M6 97V3H30C44 3 50 13 50 25.5C50 38 44 48 30 48H6M6 48H34C50 48 56 59 56 72.5C56 86 50 97 34 97H6',
  },
  { char: 'Y', slot: 78, advance: 64, d: 'M4 3L32 52L60 3M32 52V97' },
  { char: 'Z', slot: 158, advance: 58, d: 'M6 3H52L6 97H52' },
  { char: 'A', slot: 232, advance: 66, d: 'M4 97L33 3L62 97M13 68H53' },
  { char: 'N', slot: 314, advance: 58, d: 'M6 97V3L52 97V3' },
])

/** Width of the B on its own (monogram). */
export const MONOGRAM_WIDTH = GLYPHS[0].advance

/** Width of the complete wordmark. */
export const WORDMARK_WIDTH = 372

/** Horizontal shift that centres the lone B inside the full wordmark box. */
export const MONOGRAM_CENTER_SHIFT = (WORDMARK_WIDTH - MONOGRAM_WIDTH) / 2
