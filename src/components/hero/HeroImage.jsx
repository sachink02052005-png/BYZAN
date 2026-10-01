/**
 * One hero photograph. Decorative (alt=""): the meaning is carried by the
 * chapter text, which is real DOM text.
 *
 * The <img> element is ALWAYS rendered so GSAP can target it. `enabled`
 * only controls whether the browser is allowed to start downloading it,
 * which lets HeroStage load the first image before the other four.
 *
 * Only transforms are applied to this element (by the timeline), so do not
 * add Tailwind transform/scale utilities to it: they would compound.
 */
export default function HeroImage({ image, index, enabled = true, eager = false, onLoad, onError }) {
  const style = {
    objectPosition: image.position,
    transformOrigin: image.position, // zoom toward the focal point
  }
  const className = 'absolute inset-0 h-full w-full select-none object-cover will-change-transform'

  const img = (
    <img
      data-hero-image={index}
      src={enabled ? image.src : undefined}
      alt=""
      draggable={false}
      decoding="async"
      fetchPriority={eager ? 'high' : undefined}
      onLoad={onLoad}
      onError={onError}
      className={className}
      style={style}
    />
  )

  if (!image.srcMobile) return img

  return (
    <picture>
      <source media="(max-width: 767px)" srcSet={enabled ? image.srcMobile : undefined} />
      {img}
    </picture>
  )
}
