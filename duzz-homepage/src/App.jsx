import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import ScrollToTop from './components/ScrollToTop'

const Home = lazy(() => import('./pages/Home'))
const Services = lazy(() => import('./pages/Services'))
const Solutions = lazy(() => import('./pages/Solutions'))
const SolutionDetail = lazy(() => import('./pages/SolutionDetail'))
const Process = lazy(() => import('./pages/Process'))
const Contact = lazy(() => import('./pages/Contact'))
const NotFound = lazy(() => import('./pages/NotFound'))
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'))
const TermsOfService = lazy(() => import('./pages/TermsOfService'))
// Standalone landing 시안 — rendered without the DUZZ Layout (no Navbar/Footer).
const Hoho = lazy(() => import('./pages/hoho/Hoho'))

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Suspense fallback={<div className="min-h-screen" />}>
        <Routes>
          {/* Unlisted standalone landing page (own design, outside Layout) */}
          <Route path="/aoisfjkflkmgfgsd0-fo032324/260625-2" element={<Hoho />} />
          {/* DUZZ main site (wrapped in shared Layout) */}
          <Route path="*" element={<MainSite />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}

function MainSite() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<Services />} />
        <Route path="/solutions" element={<Solutions />} />
        <Route path="/solutions/:slug" element={<SolutionDetail />} />
        <Route path="/process" element={<Process />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/terms" element={<TermsOfService />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Layout>
  )
}
