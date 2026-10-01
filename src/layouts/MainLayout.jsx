import { Suspense } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Navbar from '@/components/layout/Navbar'
import PageFallback from '@/components/PageFallback'
import ScrollToTop from '@/components/ScrollToTop'
import { ROUTES } from '@/data/navigation'
import { cn } from '@/lib/cn'

/**
 * Shared shell wrapped around every page.
 *
 *  - skip link (keyboard users)
 *  - <Navbar />      fixed header
 *  - <main>          the active page renders through <Outlet />
 *  - footer slot     Footer is built in a later phase
 *
 * The home page is full-bleed under the transparent header, so it gets no
 * top padding. Every other page is offset by the header height.
 */
export default function MainLayout() {
  const { pathname } = useLocation()
  const isHome = pathname === ROUTES.home

  return (
    <div className="flex min-h-svh flex-col">
      <ScrollToTop />

      <a
        href="#main-content"
        className="eyebrow sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-60 focus:bg-avorio focus:px-5 focus:py-3 focus:text-nero"
      >
        Skip to main content
      </a>

      <Navbar />

      <main id="main-content" className={cn('flex-1', !isHome && 'pt-(--header-height)')}>
        <Suspense fallback={<PageFallback />}>
          <Outlet />
        </Suspense>
      </main>

      {/* TODO: <Footer /> (Phase 2) */}
    </div>
  )
}
