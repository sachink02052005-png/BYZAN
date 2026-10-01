import { useEffect, useRef } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { X } from 'lucide-react'
import BrandMark from '@/components/brand/BrandMark'
import Button from '@/components/ui/Button'
import { ROUTES } from '@/data/navigation'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { useScrollLock } from '@/hooks/useScrollLock'
import { cn } from '@/lib/cn'
import { EASE } from '@/lib/motion'

const FOCUSABLE = 'a[href], button:not([disabled])'

/**
 * Full-screen mobile / tablet menu.
 *
 * Accessibility: dialog semantics, scroll lock, focus moves in on open,
 * focus is trapped while open, Escape closes. The parent restores focus
 * to the toggle button on close.
 */
export default function MobileMenu({ open, onClose, links, id }) {
  return (
    <AnimatePresence>
      {open && <MenuPanel key="panel" id={id} links={links} onClose={onClose} />}
    </AnimatePresence>
  )
}

function MenuPanel({ id, links, onClose }) {
  const panelRef = useRef(null)
  const closeRef = useRef(null)
  const reducedMotion = useReducedMotion()

  useScrollLock(true)

  useEffect(() => {
    closeRef.current?.focus()

    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose(true)
        return
      }
      if (event.key !== 'Tab' || !panelRef.current) return

      const focusable = panelRef.current.querySelectorAll(FOCUSABLE)
      if (focusable.length === 0) return
      const first = focusable[0]
      const last = focusable[focusable.length - 1]

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [onClose])

  const duration = reducedMotion ? 0 : 0.7
  const itemVariants = {
    hidden: { opacity: 0, y: reducedMotion ? 0 : 28 },
    visible: { opacity: 1, y: 0, transition: { duration, ease: EASE.luxe } },
  }

  return (
    <motion.div
      ref={panelRef}
      id={id}
      role="dialog"
      aria-modal="true"
      aria-label="Menu"
      className="fixed inset-0 z-50 flex flex-col bg-nero"
      initial={{ clipPath: 'inset(0 0 100% 0)' }}
      animate={{ clipPath: 'inset(0 0 0% 0)' }}
      exit={{ clipPath: 'inset(0 0 100% 0)' }}
      transition={{ duration: reducedMotion ? 0 : 0.8, ease: EASE.cinema }}
    >
      <div className="container-luxe flex h-(--header-height) shrink-0 items-center justify-between">
        <Link to={ROUTES.home} onClick={() => onClose(false)} aria-label="BYZAN, home">
          <BrandMark decorative className="h-6 text-avorio" />
        </Link>
        <button
          ref={closeRef}
          type="button"
          onClick={() => onClose(true)}
          aria-label="Close menu"
          className="-mr-2 grid size-10 place-items-center text-avorio transition-colors hover:text-bronzo"
        >
          <X className="size-6" strokeWidth={1.25} />
        </button>
      </div>

      <div className="container-luxe flex flex-1 flex-col justify-between overflow-y-auto pb-10">
        <motion.nav
          aria-label="Mobile"
          className="my-auto py-10"
          initial="hidden"
          animate="visible"
          variants={{ visible: { transition: { staggerChildren: reducedMotion ? 0 : 0.09, delayChildren: reducedMotion ? 0 : 0.25 } } }}
        >
          <ul className="flex flex-col gap-2">
            {links.map(({ label, to }) => (
              <motion.li key={to} variants={itemVariants}>
                <NavLink
                  to={to}
                  onClick={() => onClose(false)}
                  className={({ isActive }) =>
                    cn(
                      'block py-2 font-display text-display-md transition-colors duration-500 ease-luxe',
                      isActive ? 'text-bronzo' : 'text-avorio hover:text-bronzo',
                    )
                  }
                >
                  {label}
                </NavLink>
              </motion.li>
            ))}
          </ul>
        </motion.nav>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={{ visible: { transition: { delayChildren: reducedMotion ? 0 : 0.6 } } }}
        >
          <motion.div variants={itemVariants}>
            <Button as={Link} to={ROUTES.contact} variant="outline" onClick={() => onClose(false)} className="w-full">
              Book a Fitting
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  )
}
