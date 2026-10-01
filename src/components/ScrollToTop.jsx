import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import { ScrollTrigger } from '@/lib/gsap'
import { getLenis } from '@/lib/lenisStore'

/**
 * On route change: reset scroll to the top and re-measure ScrollTrigger.
 * Renders nothing.
 *
 * - Does nothing on first load, so the browser's native scroll restoration
 *   after a refresh keeps working.
 * - Uses Lenis when active (immediate, so there is no visible scroll-up
 *   between pages), otherwise the native window scroll.
 */
export default function ScrollToTop() {
  const { pathname } = useLocation()
  const previousPathname = useRef(pathname)

  useEffect(() => {
    if (previousPathname.current === pathname) return undefined
    previousPathname.current = pathname

    const lenis = getLenis()
    if (lenis) {
      lenis.scrollTo(0, { immediate: true, force: true })
    } else {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
    }

    const frame = requestAnimationFrame(() => ScrollTrigger.refresh())
    return () => cancelAnimationFrame(frame)
  }, [pathname])

  return null
}
