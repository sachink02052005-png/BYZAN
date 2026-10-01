import { SITE } from '@/data/site'

/**
 * Collections page (route: "/collections").
 * Structural placeholder only. Will render the collection grid from
 * src/data once real content exists.
 */
export default function Collections() {
  return (
    <>
      <title>{`Collections | ${SITE.name}`}</title>
      <h1 className="sr-only">Collections</h1>
    </>
  )
}
