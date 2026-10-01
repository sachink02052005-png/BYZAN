import { useRef } from 'react'
import { useGSAP } from '@/lib/gsap'
import { revealOnScroll } from '@/lib/animations'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { cn } from '@/lib/cn'
import { DURATION, TRIGGER } from '@/lib/motion'

/**
 * Scroll-triggered reveal wrapper. The default way to animate content in.
 *
 *   <Reveal>                       fades up when scrolled into view
 *   <Reveal variant="mask">        slides text up out of a clip (headlines)
 *   <Reveal stagger={0.1}>         reveals each direct child in sequence
 *   <Reveal as="section" delay={0.2} className="...">
 *
 * Variants: fade · fade-up · fade-down · mask · scale-in
 *
 * Reduced motion: renders the content immediately with no animation.
 * No JS: content is visible by default (hidden state is applied by GSAP,
 * before first paint, only when animation will actually run).
 */
export default function Reveal({
  as: Tag = 'div',
  variant = 'fade-up',
  delay = 0,
  stagger = 0,
  duration = DURATION.slow,
  start = TRIGGER.base,
  once = true,
  className,
  children,
  ...rest
}) {
  const ref = useRef(null)
  const reducedMotion = useReducedMotion()
  const isMask = variant === 'mask'

  useGSAP(
    () => {
      const el = ref.current
      if (!el || reducedMotion) return

      let targets = el
      if (isMask) targets = el.querySelector('[data-reveal-inner]')
      else if (stagger > 0) targets = el.children
      if (!targets) return

      revealOnScroll(targets, { trigger: el, variant, delay, stagger, duration, start, once })
    },
    { scope: ref, dependencies: [variant, delay, stagger, duration, start, once, reducedMotion] },
  )

  return (
    <Tag ref={ref} className={cn(isMask && 'overflow-hidden', className)} {...rest}>
      {isMask ? (
        <span data-reveal-inner className="block">
          {children}
        </span>
      ) : (
        children
      )}
    </Tag>
  )
}
