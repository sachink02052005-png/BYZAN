import { cn } from '@/lib/cn'

const BASE =
  'eyebrow relative inline-flex select-none items-center justify-center gap-3 whitespace-nowrap ' +
  'transition-[color,background-color,border-color] duration-500 ease-luxe ' +
  'disabled:pointer-events-none disabled:opacity-40 aria-disabled:pointer-events-none aria-disabled:opacity-40'

const VARIANTS = {
  // Main conversion action: ivory block, warms to bronze on hover.
  primary: 'bg-avorio text-nero hover:bg-bronzo',
  // Emphasis action on light or busy backgrounds.
  accent: 'bg-bronzo text-nero hover:bg-avorio',
  // Secondary action.
  outline: 'border border-avorio/40 text-avorio hover:border-bronzo hover:text-bronzo',
  // Tertiary / inline: text with an animated underline.
  link:
    'px-0 text-avorio hover:text-bronzo after:absolute after:bottom-0 after:left-0 after:h-px after:w-full ' +
    'after:origin-left after:scale-x-100 after:bg-current after:transition-transform after:duration-500 ' +
    'after:ease-luxe hover:after:scale-x-0',
}

const SIZES = {
  sm: 'h-10 px-6',
  md: 'h-12 px-8',
  lg: 'h-14 px-10',
}

/**
 * BYZAN button. Polymorphic via `as`:
 *
 *   <Button>Shop Suits</Button>
 *   <Button as={Link} to="/shop" variant="outline">Collections</Button>
 *   <Button as="a" href="tel:+91..." variant="link">Call us</Button>
 */
export default function Button({
  as: Component = 'button',
  variant = 'primary',
  size = 'md',
  className,
  children,
  ...rest
}) {
  const isNativeButton = Component === 'button'

  return (
    <Component
      type={isNativeButton ? (rest.type ?? 'button') : undefined}
      className={cn(BASE, VARIANTS[variant], variant !== 'link' && SIZES[size], variant === 'link' && 'h-8', className)}
      {...rest}
    >
      {children}
    </Component>
  )
}
