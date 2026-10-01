import { useCallback, useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { Menu, Search, ShoppingBag, User } from 'lucide-react'
import BrandMark from '@/components/brand/BrandMark'
import { useBrandMarkExpand } from '@/components/brand/useBrandMarkExpand'
import MobileMenu from '@/components/layout/MobileMenu'
import { NAV_LINKS, ROUTES } from '@/data/navigation'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { useScrollDirection } from '@/hooks/useScrollDirection'
import { cn } from '@/lib/cn'

const MENU_ID = 'mobile-menu'

function IconButton({ label, className, children, badge = 0, ...rest }) {
  return (
    <button
      type="button"
      aria-label={label}
      className={cn(
        'relative grid size-10 place-items-center text-avorio/85 transition-colors duration-500 ease-luxe hover:text-bronzo',
        className,
      )}
      {...rest}
    >
      {children}
      {badge > 0 && (
        <span className="absolute right-0.5 top-0.5 grid min-w-4 place-items-center rounded-full bg-bronzo px-1 text-[0.625rem] font-medium leading-4 text-nero">
          {badge > 99 ? '99+' : badge}
        </span>
      )}
    </button>
  )
}

/**
 * Site header.
 *
 *  - Centred logo. On the home page it starts as the lone "B" and expands
 *    into the BYZAN wordmark over the first ~320px of scroll. On every other
 *    page it is the full wordmark straight away.
 *  - Transparent over the hero; gains a blurred dark backdrop and hairline
 *    once scrolled.
 *  - Slides away when scrolling down, returns on any upward scroll.
 *  - < 1024px: menu button + full-screen animated menu.
 *
 * Action buttons (search / account / bag) are wired through props so the
 * commerce layer can plug in later without touching this component:
 *   <Navbar cartCount={n} onCartClick={openCart} onSearchClick={openSearch} />
 */
export default function Navbar({ cartCount = 0, onSearchClick, onAccountClick, onCartClick }) {
  const { pathname } = useLocation()
  const isHome = pathname === ROUTES.home

  const { scrolled, hidden } = useScrollDirection()
  const isDesktop = useMediaQuery('(min-width: 1024px)')
  const [menuRequested, setMenuRequested] = useState(false)
  const menuOpen = menuRequested && !isDesktop // auto-closes when resized to desktop

  const logoRef = useRef(null)
  const toggleRef = useRef(null)
  useBrandMarkExpand(logoRef, { enabled: isHome })

  const closeMenu = useCallback((restoreFocus = true) => {
    setMenuRequested(false)
    if (restoreFocus) toggleRef.current?.focus()
  }, [])

  return (
    <>
      <header
        className={cn(
          'fixed inset-x-0 top-0 z-40 isolate transition-transform duration-700 ease-luxe',
          hidden && !menuOpen ? '-translate-y-full' : 'translate-y-0',
        )}
      >
        {/* Background layers cross-fade (a gradient can't be transitioned directly). */}
        <div
          aria-hidden="true"
          className={cn(
            'absolute inset-0 -z-10 bg-linear-to-b from-nero/70 to-transparent transition-opacity duration-700 ease-luxe',
            scrolled ? 'opacity-0' : 'opacity-100',
          )}
        />
        <div
          aria-hidden="true"
          className={cn(
            'absolute inset-0 -z-10 border-b border-avorio/10 bg-nero/80 backdrop-blur-md transition-opacity duration-700 ease-luxe',
            scrolled ? 'opacity-100' : 'opacity-0',
          )}
        />

        <div className="container-luxe grid h-(--header-height) grid-cols-[1fr_auto_1fr] items-center">
          {/* Left: menu button (mobile) / primary links (desktop) */}
          <div className="flex items-center">
            <IconButton
              ref={toggleRef}
              label="Open menu"
              aria-expanded={menuOpen}
              aria-controls={MENU_ID}
              aria-haspopup="dialog"
              onClick={() => setMenuRequested(true)}
              className="-ml-2 lg:hidden"
            >
              <Menu className="size-6" strokeWidth={1.25} />
            </IconButton>

            <nav aria-label="Primary" className="hidden lg:block">
              <ul className="flex items-center gap-10">
                {NAV_LINKS.map(({ label, to }) => (
                  <li key={to}>
                    <NavLink
                      to={to}
                      className={({ isActive }) =>
                        cn(
                          'eyebrow relative block py-2 transition-colors duration-500 ease-luxe',
                          "after:absolute after:bottom-0 after:left-0 after:h-px after:w-full after:origin-left after:bg-bronzo after:transition-transform after:duration-500 after:ease-luxe after:content-['']",
                          isActive
                            ? 'text-bronzo after:scale-x-100'
                            : 'text-avorio/85 after:scale-x-0 hover:text-avorio hover:after:scale-x-100',
                        )
                      }
                    >
                      {label}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Centre: logo */}
          <Link to={ROUTES.home} aria-label="BYZAN, home" className="justify-self-center">
            <BrandMark ref={logoRef} decorative className="h-6 text-avorio lg:h-7" />
          </Link>

          {/* Right: actions */}
          <div className="-mr-2 flex items-center justify-end gap-1">
            <IconButton label="Search" onClick={onSearchClick} className="hidden sm:grid">
              <Search className="size-5" strokeWidth={1.25} />
            </IconButton>
            <IconButton label="Account" onClick={onAccountClick} className="hidden lg:grid">
              <User className="size-5" strokeWidth={1.25} />
            </IconButton>
            <IconButton
              label={cartCount > 0 ? `Shopping bag, ${cartCount} items` : 'Shopping bag'}
              onClick={onCartClick}
              badge={cartCount}
            >
              <ShoppingBag className="size-5" strokeWidth={1.25} />
            </IconButton>
          </div>
        </div>
      </header>

      <MobileMenu open={menuOpen} onClose={closeMenu} links={NAV_LINKS} id={MENU_ID} />
    </>
  )
}
