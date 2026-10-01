import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import BrandMark from '@/components/brand/BrandMark'
import { useBrandMarkExpand } from '@/components/brand/useBrandMarkExpand'
import Button from '@/components/ui/Button'
import Reveal from '@/components/ui/Reveal'
import { ROUTES } from '@/data/navigation'
import { DURATION, EASE, STAGGER } from '@/lib/motion'

/**
 * BYZAN design system reference (route: "/design-system").
 *
 * DEVELOPER-ONLY. App.jsx registers this route only when
 * `import.meta.env.DEV` is true, so it is excluded from production builds.
 * It is a living style guide: if a token or component changes, this page
 * must show it.
 */

/* --------------------------------------------------------------------------
   Data. Tailwind needs full class names to exist as static strings, so each
   swatch lists its utility class explicitly (never build them dynamically).
   -------------------------------------------------------------------------- */

const PRIMARY_COLORS = [
  { name: 'nero', token: '--color-nero', hex: '#0e0d0c', swatch: 'bg-nero', role: 'Page background. Warm near-black, never pure black.' },
  { name: 'avorio', token: '--color-avorio', hex: '#f3eee5', swatch: 'bg-avorio', role: 'Primary text and light surfaces. Warm ivory, never pure white.' },
  { name: 'bronzo', token: '--color-bronzo', hex: '#b08d57', swatch: 'bg-bronzo', role: 'Accent. CTAs, hairlines, active states. Use sparingly.' },
  { name: 'notte', token: '--color-notte', hex: '#141b2d', swatch: 'bg-notte', role: 'Deep midnight navy. Alternate feature surface.' },
]

const SUPPORT_COLORS = [
  { name: 'nero-soft', hex: '#161412', swatch: 'bg-nero-soft', role: 'Alternate section background' },
  { name: 'nero-raised', hex: '#1f1c19', swatch: 'bg-nero-raised', role: 'Cards, drawers, inputs' },
  { name: 'avorio-dim', hex: '#d8d1c4', swatch: 'bg-avorio-dim', role: 'Secondary light surface' },
  { name: 'pietra', hex: '#8f887c', swatch: 'bg-pietra', role: 'Muted text' },
  { name: 'bronzo-light', hex: '#c9a877', swatch: 'bg-bronzo-light', role: 'Accent hover / focus ring' },
]

const TYPE_SCALE = [
  { token: 'text-display-xl', className: 'font-display text-display-xl', sample: 'Il Taglio', note: 'Hero statements. Fluid 52 → 144px' },
  { token: 'text-display-lg', className: 'font-display text-display-lg', sample: 'La Silhouette', note: 'Section headlines. Fluid 40 → 96px' },
  { token: 'text-display-md', className: 'font-display text-display-md', sample: 'Il Tessuto', note: 'Sub-headlines, menu links. Fluid 32 → 60px' },
  { token: 'text-display-sm', className: 'font-display text-display-sm', sample: 'La Cucitura', note: 'Card titles, pull quotes. Fluid 24 → 36px' },
]

const BUTTON_VARIANTS = ['primary', 'accent', 'outline', 'link']
const BUTTON_SIZES = ['sm', 'md', 'lg']

const REVEAL_VARIANTS = [
  { variant: 'fade', label: 'fade' },
  { variant: 'fade-up', label: 'fade-up' },
  { variant: 'scale-in', label: 'scale-in' },
]

/* --------------------------------------------------------------------------
   Layout helpers (local to this page)
   -------------------------------------------------------------------------- */

function Section({ id, index, title, description, children }) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="border-t border-avorio/10 py-20 lg:py-28">
      <div className="container-luxe">
        <header className="mb-14 grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]">
          <div>
            <p className="eyebrow text-bronzo">{index}</p>
            <h2 id={`${id}-title`} className="mt-4 font-display text-display-md">
              {title}
            </h2>
          </div>
          {description && <p className="max-w-xl self-end text-pietra">{description}</p>}
        </header>
        {children}
      </div>
    </section>
  )
}

function Spec({ children }) {
  return <code className="font-sans text-xs tracking-wide text-pietra">{children}</code>
}

/* --------------------------------------------------------------------------
   Sections
   -------------------------------------------------------------------------- */

function ColorSwatch({ name, hex, swatch, role, token }) {
  return (
    <figure className="flex flex-col">
      <div className={`${swatch} h-40 border border-avorio/15`} role="img" aria-label={`${name} colour swatch`} />
      <figcaption className="mt-4 space-y-1">
        <p className="eyebrow text-avorio">{name}</p>
        <p className="text-sm text-pietra">
          <Spec>{hex}</Spec>
          {token && (
            <>
              {' · '}
              <Spec>{token}</Spec>
            </>
          )}
        </p>
        <p className="text-sm text-avorio/70">{role}</p>
      </figcaption>
    </figure>
  )
}

function Colors() {
  return (
    <Section
      id="colour"
      index="01 · Colore"
      title="Colour"
      description="A restrained, warm-dark palette. Bronze is the only accent and should appear as a whisper, not a wash."
    >
      <div className="grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
        {PRIMARY_COLORS.map((color) => (
          <ColorSwatch key={color.name} {...color} />
        ))}
      </div>

      <p className="eyebrow mt-20 mb-8 text-pietra">Supporting tones</p>
      <div className="grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-5">
        {SUPPORT_COLORS.map((color) => (
          <ColorSwatch key={color.name} {...color} />
        ))}
      </div>

      <div className="mt-20 grid gap-px overflow-hidden border border-avorio/10 bg-avorio/10 sm:grid-cols-2">
        <div className="bg-nero p-8 lg:p-12">
          <p className="eyebrow text-pietra">avorio on nero</p>
          <p className="mt-6 font-display text-display-sm text-avorio">The suit is judged up close.</p>
          <p className="mt-3 text-bronzo">
            <span className="eyebrow">bronzo accent</span>
          </p>
        </div>
        <div className="bg-avorio p-8 lg:p-12">
          <p className="eyebrow text-nero/60">nero on avorio</p>
          <p className="mt-6 font-display text-display-sm text-nero">The suit is judged up close.</p>
          <p className="mt-3 text-notte">
            <span className="eyebrow">notte accent</span>
          </p>
        </div>
      </div>
    </Section>
  )
}

function Typography() {
  return (
    <Section
      id="typography"
      index="02 · Tipografia"
      title="Typography"
      description="Cormorant Garamond carries the voice: large, light, and unhurried. Jost handles everything functional, small and wide-tracked."
    >
      <div className="divide-y divide-avorio/10 border-y border-avorio/10">
        {TYPE_SCALE.map(({ token, className, sample, note }) => (
          <div key={token} className="grid gap-4 py-10 lg:grid-cols-[14rem_minmax(0,1fr)] lg:items-baseline">
            <div className="space-y-1">
              <Spec>{token}</Spec>
              <p className="text-sm text-pietra">{note}</p>
            </div>
            <p className={`${className} break-words`}>{sample}</p>
          </div>
        ))}

        <div className="grid gap-4 py-10 lg:grid-cols-[14rem_minmax(0,1fr)] lg:items-baseline">
          <div className="space-y-1">
            <Spec>font-display italic</Spec>
            <p className="text-sm text-pietra">Emphasis inside headlines</p>
          </div>
          <p className="font-display text-display-md">
            Made with <em className="text-bronzo">patience</em>, worn with ease.
          </p>
        </div>

        <div className="grid gap-4 py-10 lg:grid-cols-[14rem_minmax(0,1fr)] lg:items-baseline">
          <div className="space-y-1">
            <Spec>text-body-lg</Spec>
            <p className="text-sm text-pietra">Lead paragraph · Jost 300</p>
          </div>
          <p className="max-w-2xl text-body-lg text-avorio/85">
            Placeholder body copy for layout testing only. A lead paragraph sits at 18px with generous line height so
            long-form craft stories stay effortless to read on a phone.
          </p>
        </div>

        <div className="grid gap-4 py-10 lg:grid-cols-[14rem_minmax(0,1fr)] lg:items-baseline">
          <div className="space-y-1">
            <Spec>body (default)</Spec>
            <p className="text-sm text-pietra">Jost 300 · 16px / 1.6</p>
          </div>
          <p className="max-w-2xl text-avorio/80">
            Placeholder body copy for layout testing only. Default paragraph text is light-weight and slightly softened
            from full ivory to keep contrast comfortable on the dark ground.
          </p>
        </div>

        <div className="grid gap-4 py-10 lg:grid-cols-[14rem_minmax(0,1fr)] lg:items-baseline">
          <div className="space-y-1">
            <Spec>.eyebrow</Spec>
            <p className="text-sm text-pietra">Labels, nav, buttons · 11px, 0.24em, uppercase</p>
          </div>
          <p className="eyebrow text-avorio">Il Dettaglio · La Cucitura · Il Tessuto</p>
        </div>
      </div>
    </Section>
  )
}

function Buttons() {
  return (
    <Section
      id="buttons"
      index="03 · Pulsanti"
      title="Buttons"
      description="One primary action per view. Colour shifts on hover are slow (500ms, ease-luxe); there are no shadows or rounded corners."
    >
      <div className="space-y-14">
        {BUTTON_VARIANTS.map((variant) => (
          <div key={variant} className="grid gap-6 lg:grid-cols-[14rem_minmax(0,1fr)] lg:items-center">
            <div className="space-y-1">
              <Spec>{`variant="${variant}"`}</Spec>
            </div>
            <div className="flex flex-wrap items-center gap-6">
              {variant === 'link' ? (
                <Button variant="link">Discover the Collection</Button>
              ) : (
                BUTTON_SIZES.map((size) => (
                  <Button key={size} variant={variant} size={size}>
                    Shop Suits
                  </Button>
                ))
              )}
            </div>
          </div>
        ))}

        <div className="grid gap-6 lg:grid-cols-[14rem_minmax(0,1fr)] lg:items-center">
          <Spec>disabled</Spec>
          <div className="flex flex-wrap items-center gap-6">
            <Button disabled>Add to Bag</Button>
            <Button variant="outline" disabled>
              Notify Me
            </Button>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[14rem_minmax(0,1fr)] lg:items-center">
          <div className="space-y-1">
            <Spec>{'as={Link}'}</Spec>
            <p className="text-sm text-pietra">Renders a router link</p>
          </div>
          <div className="flex flex-wrap items-center gap-6">
            <Button as={Link} to={ROUTES.shop} size="lg">
              Shop Suits
            </Button>
            <Button as={Link} to={ROUTES.contact} variant="outline" size="lg">
              Book a Fitting
            </Button>
          </div>
        </div>
      </div>
    </Section>
  )
}

function RevealShowcase() {
  // Bumping the key remounts the demo, so scroll-once reveals can be replayed.
  const [run, setRun] = useState(0)

  return (
    <Section
      id="reveal"
      index="04 · Movimento"
      title="Reveal animations"
      description="Scroll-triggered entrances built on GSAP ScrollTrigger. Slow, soft ease-out, and only opacity and transform are animated. Reduced-motion users see the content immediately."
    >
      <div className="mb-12 flex flex-wrap items-center gap-6">
        <Button variant="outline" size="sm" onClick={() => setRun((n) => n + 1)}>
          Replay
        </Button>
        <p className="text-sm text-pietra">
          <Spec>{`ease: luxe [${EASE.luxe.join(', ')}]`}</Spec>
          {' · '}
          <Spec>{`duration: ${DURATION.slow}s`}</Spec>
          {' · '}
          <Spec>{`stagger: ${STAGGER.base}s`}</Spec>
        </p>
      </div>

      <div key={run} className="space-y-20">
        <div className="grid gap-6 lg:grid-cols-[14rem_minmax(0,1fr)]">
          <Spec>{'variant="mask"'}</Spec>
          <div>
            <Reveal variant="mask" className="pb-2">
              <span className="block font-display text-display-lg">Cut with intent.</span>
            </Reveal>
            <p className="mt-2 text-sm text-pietra">Headlines slide up out of a clipped line.</p>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[14rem_minmax(0,1fr)]">
          <Spec>single variants</Spec>
          <div className="grid gap-px border border-avorio/10 bg-avorio/10 sm:grid-cols-3">
            {REVEAL_VARIANTS.map(({ variant, label }) => (
              <Reveal key={variant} variant={variant} className="bg-nero p-8">
                <p className="eyebrow text-bronzo">{label}</p>
                <div className="rule-bronzo mt-6 w-12" />
                <p className="mt-6 font-display text-display-sm">Il Dettaglio</p>
              </Reveal>
            ))}
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[14rem_minmax(0,1fr)]">
          <div className="space-y-1">
            <Spec>{`stagger={${STAGGER.base}}`}</Spec>
            <p className="text-sm text-pietra">Direct children reveal in sequence</p>
          </div>
          <Reveal stagger={STAGGER.base} className="grid gap-px border border-avorio/10 bg-avorio/10 sm:grid-cols-3">
            {['01', '02', '03'].map((step) => (
              <div key={step} className="bg-nero-soft p-8">
                <p className="font-display text-display-md text-bronzo">{step}</p>
                <div className="rule-bronzo mt-4 w-8" />
              </div>
            ))}
          </Reveal>
        </div>
      </div>
    </Section>
  )
}

/** Scroll-scrubbed B → BYZAN demo, using the same hook the navbar uses. */
function ExpandDemo() {
  const markRef = useRef(null)

  // The trigger is a selector string, resolved by ScrollTrigger after mount.
  useBrandMarkExpand(markRef, {
    trigger: '#brandmark-expand-track',
    start: 'top 25%',
    end: 'bottom bottom',
    scrub: 0.6,
  })

  return (
    <div id="brandmark-expand-track" className="relative h-[220svh] border border-avorio/10">
      <div className="sticky top-[30svh] flex h-[40svh] flex-col items-center justify-center gap-8">
        <BrandMark ref={markRef} decorative className="h-16 text-avorio sm:h-24" />
        <p className="eyebrow text-pietra">Scroll to expand · useBrandMarkExpand()</p>
      </div>
    </div>
  )
}

function BrandMarkShowcase() {
  return (
    <Section
      id="brandmark"
      index="05 · Marchio"
      title="BrandMark"
      description="The B monogram and BYZAN wordmark are inline SVG, one monoline stroke per letter. Colour follows currentColor; size follows height."
    >
      <div className="grid gap-px border border-avorio/10 bg-avorio/10 lg:grid-cols-2">
        <div className="flex min-h-64 flex-col items-center justify-center gap-8 bg-nero p-10">
          <BrandMark mode="monogram" title="BYZAN monogram" className="h-24 text-avorio" />
          <Spec>{'mode="monogram"'}</Spec>
        </div>
        <div className="flex min-h-64 flex-col items-center justify-center gap-8 bg-nero p-10">
          <BrandMark title="BYZAN" className="h-16 text-avorio sm:h-20" />
          <Spec>{'mode="wordmark"'}</Spec>
        </div>
        <div className="flex min-h-64 flex-col items-center justify-center gap-8 bg-avorio p-10">
          <BrandMark className="h-16 text-nero sm:h-20" />
          <Spec>on light · text-nero</Spec>
        </div>
        <div className="flex min-h-64 flex-col items-center justify-center gap-8 bg-nero p-10">
          <BrandMark className="h-16 text-bronzo sm:h-20" />
          <Spec>accent · text-bronzo</Spec>
        </div>
      </div>

      <p className="eyebrow mt-20 mb-4 text-pietra">Sizes used in the UI</p>
      <div className="flex flex-wrap items-end gap-x-14 gap-y-8 border border-avorio/10 p-10">
        {[
          { cls: 'h-6', label: 'h-6 · navbar (mobile)' },
          { cls: 'h-7', label: 'h-7 · navbar (desktop)' },
          { cls: 'h-10', label: 'h-10' },
        ].map(({ cls, label }) => (
          <div key={cls} className="flex flex-col items-start gap-4">
            <BrandMark decorative className={`${cls} text-avorio`} />
            <Spec>{label}</Spec>
          </div>
        ))}
      </div>

      <p className="eyebrow mt-20 mb-4 text-pietra">Scroll-driven expansion (B → BYZAN)</p>
      <ExpandDemo />
    </Section>
  )
}

/* --------------------------------------------------------------------------
   Page
   -------------------------------------------------------------------------- */

export default function DesignSystem() {
  return (
    <>
      <title>Design System | BYZAN</title>
      <meta name="robots" content="noindex" />

      <div className="container-luxe py-20 lg:py-28">
        <p className="eyebrow text-bronzo">Developer reference · not shipped to production</p>
        <h1 className="mt-6 font-display text-display-lg">BYZAN Design System</h1>
        <p className="mt-6 max-w-xl text-body-lg text-avorio/80">
          A living reference for the tokens and components that make up the brand. Every value on this page is read from
          the same theme the site uses.
        </p>

        <nav aria-label="Design system sections" className="mt-12">
          <ul className="flex flex-wrap gap-x-8 gap-y-3">
            {[
              ['#colour', 'Colour'],
              ['#typography', 'Typography'],
              ['#buttons', 'Buttons'],
              ['#reveal', 'Reveal'],
              ['#brandmark', 'BrandMark'],
            ].map(([href, label]) => (
              <li key={href}>
                <a href={href} className="eyebrow text-avorio/80 transition-colors duration-500 ease-luxe hover:text-bronzo">
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <Colors />
      <Typography />
      <Buttons />
      <RevealShowcase />
      <BrandMarkShowcase />
    </>
  )
}
