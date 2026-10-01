import { SITE } from '@/data/site'

/**
 * Bespoke / made-to-measure page (route: "/bespoke").
 * Structural placeholder only. Will hold the tailoring process and the
 * fitting-appointment entry point.
 */
export default function Bespoke() {
  return (
    <>
      <title>{`Bespoke | ${SITE.name}`}</title>
      <h1 className="sr-only">Bespoke</h1>
    </>
  )
}
