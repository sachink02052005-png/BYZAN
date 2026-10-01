import { useCallback, useSyncExternalStore } from 'react'

/**
 * Subscribe to a CSS media query.
 * SSR-safe: returns `defaultValue` on the server / first hydration pass.
 */
export function useMediaQuery(query, defaultValue = false) {
  const subscribe = useCallback(
    (onChange) => {
      const mql = window.matchMedia(query)
      mql.addEventListener('change', onChange)
      return () => mql.removeEventListener('change', onChange)
    },
    [query],
  )

  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(query).matches,
    () => defaultValue,
  )
}
