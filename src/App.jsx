import { lazy } from 'react'
import { Route, Routes } from 'react-router-dom'
import MainLayout from '@/layouts/MainLayout'
import Home from '@/pages/Home'
import { ROUTES } from '@/data/navigation'

// Secondary pages are code-split so the initial bundle stays small.
// Home is imported eagerly because it is the landing route.
const Shop = lazy(() => import('@/pages/Shop'))
const Collections = lazy(() => import('@/pages/Collections'))
const Bespoke = lazy(() => import('@/pages/Bespoke'))
const About = lazy(() => import('@/pages/About'))
const Contact = lazy(() => import('@/pages/Contact'))
const NotFound = lazy(() => import('@/pages/NotFound'))

// Dev-only reference page. `import.meta.env.DEV` is replaced at build time,
// so the whole page is tree-shaken out of production bundles.
const DesignSystem = import.meta.env.DEV ? lazy(() => import('@/pages/DesignSystem')) : null

/**
 * Application root: declares the route table only.
 * Router + smooth-scroll providers live in main.jsx; shared chrome
 * (navbar, footer) lives in MainLayout.
 */
export default function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path={ROUTES.shop} element={<Shop />} />
        <Route path={ROUTES.collections} element={<Collections />} />
        <Route path={ROUTES.bespoke} element={<Bespoke />} />
        <Route path={ROUTES.about} element={<About />} />
        <Route path={ROUTES.contact} element={<Contact />} />
        {DesignSystem && <Route path={ROUTES.designSystem} element={<DesignSystem />} />}
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}
