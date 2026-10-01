import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { CustomEase } from 'gsap/CustomEase'
import { useGSAP } from '@gsap/react'
import { EASE } from '@/lib/motion'

/**
 * Single GSAP entry point.
 *
 * Rule: never `import gsap from 'gsap'` anywhere else. Always import from
 * '@/lib/gsap' so plugins are registered exactly once and defaults apply
 * everywhere.
 */

gsap.registerPlugin(ScrollTrigger, CustomEase, useGSAP)

// Brand easings, built from the same control points as the CSS tokens.
CustomEase.create('luxe', EASE.luxe.join(','))
CustomEase.create('cinema', EASE.cinema.join(','))

gsap.defaults({ ease: 'luxe', duration: 1 })

// Mobile browsers resize the viewport as the address bar shows/hides.
// Ignoring those resizes stops pinned scenes from jumping.
ScrollTrigger.config({ ignoreMobileResize: true })

export { gsap, ScrollTrigger, CustomEase, useGSAP }
