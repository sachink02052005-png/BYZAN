import { Link } from 'react-router-dom'
import { ROUTES } from '@/data/navigation'
import { SITE } from '@/data/site'

/**
 * 404 page, rendered for any URL that matches no route.
 * Minimal on purpose; final styling comes with the design pass.
 */
export default function NotFound() {
  return (
    <>
      <title>{`Page not found | ${SITE.name}`}</title>
      <meta name="robots" content="noindex" />
      <section className="px-6 py-32 text-center">
        <h1 className="text-2xl">Page not found</h1>
        <p className="mt-4">
          <Link to={ROUTES.home} className="underline underline-offset-4">
            Return home
          </Link>
        </p>
      </section>
    </>
  )
}
