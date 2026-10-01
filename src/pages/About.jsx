import { SITE } from '@/data/site'

/**
 * About / heritage page (route: "/about").
 * Structural placeholder only. Will hold the brand story and craftsmanship.
 */
export default function About() {
  return (
    <>
      <title>{`About | ${SITE.name}`}</title>
      <h1 className="sr-only">About</h1>
    </>
  )
}
