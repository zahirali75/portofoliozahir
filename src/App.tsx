import { useEffect } from 'react'
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom'
import { LocaleProvider } from './lib/locale'
import { Navbar } from './components/layout/Navbar'
import { Footer } from './components/layout/Footer'
import { Home } from './pages/Home'
import { ProjectDetail } from './pages/ProjectDetail'
import { useReveal } from './hooks/useReveal'

/** Kembalikan posisi scroll ke atas setiap kali pindah halaman. */
function ScrollToTop() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (hash) return
    window.scrollTo({ top: 0, behavior: 'auto' })
  }, [pathname, hash])

  return null
}

/** Animasi masuk dijalankan di level aplikasi agar berlaku untuk semua halaman. */
function Reveals() {
  const { pathname } = useLocation()
  useReveal(pathname)
  return null
}

function Shell() {
  const location = useLocation()
  const onHome = () => {
    if (location.pathname === '/') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } else {
      window.location.href = '/'
    }
  }

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-[70] focus:rounded-full focus:bg-terracotta-700 focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-cream-50"
      >
        Lompat ke konten utama
      </a>

      <ScrollToTop />
      <Reveals />
      <Navbar onHome={onHome} />

      <main id="main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/proyek/:slug" element={<ProjectDetail />} />
          <Route path="*" element={<ProjectDetail />} />
        </Routes>
      </main>

      <Footer />
    </>
  )
}

export function App() {
  return (
    <LocaleProvider>
      <BrowserRouter>
        <Shell />
      </BrowserRouter>
    </LocaleProvider>
  )
}
