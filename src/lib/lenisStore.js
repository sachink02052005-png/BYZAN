/**
 * Minimal external store holding the active Lenis instance.
 *
 * Why not React state/context? The instance is created inside an effect
 * (browser-only) and needs to be reachable from non-React code and from
 * many components. An external store read via useSyncExternalStore gives
 * all of that without setState-in-effect.
 */

let instance = null
const listeners = new Set()

export function getLenis() {
  return instance
}

export function setLenis(next) {
  if (instance === next) return
  instance = next
  listeners.forEach((listener) => listener())
}

export function subscribeLenis(listener) {
  listeners.add(listener)
  return () => listeners.delete(listener)
}
