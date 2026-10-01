import { SITE } from '@/data/site'

/**
 * Shop page (route: "/shop"): the all-products listing.
 * Structural placeholder only. Filters, sort and the product grid arrive
 * in the e-commerce phase.
 */
export default function Shop() {
  return (
    <>
      <title>{`Shop | ${SITE.name}`}</title>
      <h1 className="sr-only">Shop</h1>
    </>
  )
}
