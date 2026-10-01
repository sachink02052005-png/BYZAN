import { useEffect } from 'react'
import Lenis from 'lenis'
import { gsap, ScrollTrigger } from '@/lib/gsap'
import { setLenis } from '@/lib/lenisStore'
import { useReducedMotion } from '@/hooks/useReducedMotion'

/**
 * Initialises Lenis smooth scrolling once for the whole app and drives it
 * from GSAP's ticker, so Lenis, ScrollTrigger and every GSAP tween share
 * ONE animation loop (no drift, no double rAF).
 *
 *   Lenis scroll  ->  ScrollTrigger.update()
 *   gsap.ticker   ->  lenis.raf()
 *
 * Disabled entirely under prefers-reduced-motion; the page then uses
 * native scrolling and ScrollTrigger still works.
 *
 * Touch devices keep native momentum scrolling (Lenis default), which is
 * the right choice for mobile performance.
 */
export default function SmoothScrollProvider({ children }) {
  const reducedMotion = useReducedMotion()

  useEffect(() => {
    if (reducedMotion) return undefined

    const lenis = new Lenis({
      lerp: 0.09,
      smoothWheel: true,
      wheelMultiplier: 0.95,
    })

    const onScroll = () => ScrollTrigger.update()
    lenis.on('scroll', onScroll)

    const tick = (timeSeconds) => lenis.raf(timeSeconds * 1000)
    gsap.ticker.add(tick)
    gsap.ticker.lagSmoothing(0) // never let GSAP "catch up" and cause jumps

    setLenis(lenis)

    return () => {
      setLenis(null)
      gsap.ticker.remove(tick)
      gsap.ticker.lagSmoothing(500, 33) // restore GSAP defaults
      lenis.off('scroll', onScroll)
      lenis.destroy()
    }
  }, [reducedMotion])

  return children
}
