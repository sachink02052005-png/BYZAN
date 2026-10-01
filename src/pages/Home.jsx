import HeroJourney from '@/components/hero/HeroJourney'
import FeaturedCollections from '@/components/sections/FeaturedCollections'
import Manifesto from '@/components/sections/Manifesto'
import { SITE } from '@/data/site'

export default function Home() {
  return (
    <>
      <title>{SITE.name}</title>
      <h1 className="sr-only">{SITE.name}</h1>
      <HeroJourney />
      <Manifesto />
      <FeaturedCollections />
    </>
  )
}
