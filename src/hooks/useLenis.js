import { useSyncExternalStore } from 'react'
import { getLenis, subscribeLenis } from '@/lib/lenisStore'

/**
 * Returns the active Lenis instance, or null when smooth scrolling is
 * disabled (reduced motion) or not yet initialised.
 * Always null-check: `lenis?.scrollTo(...)`.
 */
export function useLenis() {
  return useSyncExternalStore(subscribeLenis, getLenis, () => null)
}
