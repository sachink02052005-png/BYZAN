import { useEffect } from 'react'
import { useLenis } from '@/hooks/useLenis'

/**
 * Locks page scrolling while `locked` is true (mobile menu, cart drawer,
 * modals). Pauses Lenis and also sets overflow:hidden so it works when
 * smooth scrolling is disabled.
 */
export function useScrollLock(locked) {
  const lenis = useLenis()

  useEffect(() => {
    if (!locked) return undefined

    const root = document.documentElement
    const previousOverflow = root.style.overflow

    lenis?.stop()
    root.style.overflow = 'hidden'

    return () => {
      root.style.overflow = previousOverflow
      lenis?.start()
    }
  }, [locked, lenis])
}
