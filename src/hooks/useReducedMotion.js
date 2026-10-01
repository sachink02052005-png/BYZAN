import { useMediaQuery } from '@/hooks/useMediaQuery'

/**
 * True when the user has asked the OS/browser to minimise motion.
 * Every animated component must check this and render its final state
 * (or a simple fade) instead of scrubbed / large-scale motion.
 */
export function useReducedMotion() {
  return useMediaQuery('(prefers-reduced-motion: reduce)')
}
