/**
 * Suspense fallback shown while a lazy-loaded page chunk is downloading.
 * Intentionally visually empty so it never flashes distracting UI on a
 * luxury site; it still announces the loading state to screen readers.
 */
export default function PageFallback() {
  return (
    <div role="status" aria-live="polite" className="min-h-[60vh]">
      <span className="sr-only">Loading page</span>
    </div>
  )
}
