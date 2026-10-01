import { useEffect, useRef, useState } from 'react'

/**
 * Tracks page scroll for header behaviour, without re-rendering every frame.
 *
 * Returns:
 *  - scrolled: true once the page is scrolled past `offset` px
 *  - hidden:   true while the user scrolls DOWN past `hideAfter` px
 *              (header should slide away); false as soon as they scroll up
 *
 * State only updates when one of those booleans actually flips. Reads the
 * native window scroll position, so it works identically with Lenis on or off.
 */
export function useScrollDirection({ offset = 24, threshold = 8, hideAfter = 240 } = {}) {
  const [state, setState] = useState({ scrolled: false, hidden: false })
  const hiddenRef = useRef(false)

  useEffect(() => {
    let lastY = Math.max(window.scrollY, 0)
    let frame = 0

    const update = () => {
      frame = 0
      // Safari can report negative values during rubber-band overscroll.
      const y = Math.max(window.scrollY, 0)
      const delta = y - lastY

      let hidden = hiddenRef.current
      if (Math.abs(delta) >= threshold) {
        hidden = delta > 0 && y > hideAfter
        lastY = y
      }
      if (y <= offset) hidden = false
      hiddenRef.current = hidden

      const scrolled = y > offset
      setState((prev) =>
        prev.scrolled === scrolled && prev.hidden === hidden ? prev : { scrolled, hidden },
      )
    }

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll() // sync initial state (e.g. after a refresh mid-page)

    return () => {
      window.removeEventListener('scroll', onScroll)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [offset, threshold, hideAfter])

  return state
}
