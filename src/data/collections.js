import { ROUTES } from '@/data/navigation'

/**
 * Featured Collections: homepage section data.
 *
 * ==========================================================================
 *  ASSET PLACEMENT  ←  PUT THE 4 COLLECTION IMAGES HERE
 * ==========================================================================
 *  Folder : public/collections/            (served as /collections/...)
 *  Files  : wedding.jpg    business.jpg    festive.jpg    essentials.jpg
 *  Spec   : portrait 3:4, ~1200×1600, JPG/WebP/AVIF (match the extension
 *           below), ≤ 150 KB each, one consistent colour grade. Keep the
 *           subject in the centre; the bottom 40% is covered by the title.
 *  Until the files exist, each card shows a dark tonal gradient and (dev
 *  only) the exact path it expects.
 * ==========================================================================
 *
 * COPY: descriptors are PLACEHOLDER lines about the occasion, not the
 * product. They make no claims about fabric, origin or price. Replace with
 * approved copy. Do not add per-collection prices or product counts until
 * they come from the real catalogue.
 *
 * LINKS: each card goes to the shop filtered by collection
 * (/shop?collection=<id>). The Shop page will read that parameter when the
 * catalogue is built. `id` is therefore the stable filter key: keep it
 * lowercase and URL-safe, and match it to the catalogue's collection slugs.
 */

export const COLLECTIONS_SECTION = Object.freeze({
  eyebrow: 'Le Collezioni',
  title: 'For every occasion.',
  viewAll: 'View all suits',
})

export const COLLECTIONS = Object.freeze([
  {
    id: 'wedding',
    index: '01',
    name: 'Wedding',
    descriptor: 'For the day itself, and the days around it.',
    image: '/collections/wedding.jpg', // ← ASSET 1
    tone: 'from-nero-raised via-nero-soft to-nero',
  },
  {
    id: 'business',
    index: '02',
    name: 'Business',
    descriptor: 'For the room where decisions are made.',
    image: '/collections/business.jpg', // ← ASSET 2
    tone: 'from-notte via-nero-soft to-nero',
  },
  {
    id: 'festive',
    index: '03',
    name: 'Festive',
    descriptor: 'For evenings worth dressing for.',
    image: '/collections/festive.jpg', // ← ASSET 3
    tone: 'from-nero-raised via-notte to-nero',
  },
  {
    id: 'essentials',
    index: '04',
    name: 'Essentials',
    descriptor: 'For every day, done well.',
    image: '/collections/essentials.jpg', // ← ASSET 4
    tone: 'from-nero-soft via-nero-raised to-nero',
  },
])

/** Shop URL pre-filtered to one collection. */
export function collectionUrl(id) {
  return `${ROUTES.shop}?collection=${id}`
}
