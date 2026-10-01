/**
 * BYZAN hero: "The Journey of a Suit". Chapter configuration.
 *
 * This file drives the whole hero: image paths, chapter order, copy and
 * the scroll timing. Retiming or reordering chapters means editing here only.
 *
 * ==========================================================================
 *  ASSET PLACEMENT  ←  PUT THE 5 HERO IMAGES HERE
 * ==========================================================================
 *  Folder : public/hero/                  (served as /hero/...)
 *  Files  : 01-silhouette.jpg   full suit, front view (opening frame)
 *           02-detail.jpg       lapel / buttons / stitching close-up
 *           03-fabric.jpg       macro cloth texture
 *           04-craft.jpg        tailoring craftsmanship scene
 *           05-final.jpg        complete finished suit (closing frame)
 *
 *  Recommended spec
 *   - Desktop: landscape 16:9, ~2400×1350, keep the subject in the centre
 *     60% (the image is cropped with object-fit: cover on other screens).
 *   - Format: JPG, WebP or AVIF (change the extension below to match).
 *     Target ≤ 250 KB each. One consistent colour grade across all five.
 *   - Mobile (optional but strongly recommended): portrait 2:3, ~1080×1620
 *     in public/hero/mobile/ with the same file names. Then set `srcMobile`
 *     for that chapter. Portrait art direction beats cropping landscape.
 *
 *  Until files exist, each chapter shows a dark placeholder gradient and (in
 *  dev only) the exact path it expects.
 * ==========================================================================
 *
 * COPY: headlines below are PLACEHOLDER lines that make no product claims.
 * Replace with approved copy. Chapter labels are the Italian names from the
 * creative blueprint; have a native speaker confirm before launch.
 *
 * TIMING: `start` is the chapter's start on a 0–100 scroll scale
 * (HERO_LENGTH). The pinned scroll distance itself is set in HeroJourney.
 */

export const HERO_LENGTH = 100

export const HERO_CHAPTERS = Object.freeze([
  {
    id: 'silhouette',
    numeral: 'I',
    label: 'La Silhouette',
    headline: 'Seen from afar.',
    start: 0,
    image: {
      src: '/hero/01-silhouette.jpg', // ← ASSET 1
      srcMobile: null, // e.g. '/hero/mobile/01-silhouette.jpg'
      position: '50% 40%', // focal point kept visible when cropped
    },
    tone: 'from-nero-raised via-nero to-nero-soft', // placeholder background
  },
  {
    id: 'detail',
    numeral: 'II',
    label: 'Il Dettaglio',
    headline: 'Drawn closer.',
    start: 22,
    image: {
      src: '/hero/02-detail.jpg', // ← ASSET 2
      srcMobile: null,
      position: '50% 35%',
    },
    tone: 'from-notte via-nero to-nero-raised',
  },
  {
    id: 'fabric',
    numeral: 'III',
    label: 'Il Tessuto',
    headline: 'Closer still.',
    start: 46,
    image: {
      src: '/hero/03-fabric.jpg', // ← ASSET 3
      srcMobile: null,
      position: '50% 50%',
    },
    tone: 'from-nero-soft via-nero-raised to-nero',
  },
  {
    id: 'craft',
    numeral: 'IV',
    label: "L'Atelier",
    headline: 'The making.',
    start: 68,
    image: {
      src: '/hero/04-craft.jpg', // ← ASSET 4
      srcMobile: null,
      position: '50% 45%',
    },
    tone: 'from-nero via-notte to-nero-soft',
  },
  {
    id: 'final',
    numeral: 'V',
    label: 'Il Ritorno',
    headline: '', // the final chapter shows the wordmark + CTA instead
    final: true,
    start: 89,
    image: {
      src: '/hero/05-final.jpg', // ← ASSET 5
      srcMobile: null,
      position: '50% 40%',
    },
    tone: 'from-nero-raised via-nero-soft to-nero',
  },
])
