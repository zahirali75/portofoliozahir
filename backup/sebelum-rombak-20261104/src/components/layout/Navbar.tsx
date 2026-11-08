import { useEffect, useState } from 'react'
import { useLocale } from '../../lib/locale'
import { profile } from '../../data'
import { useScrollSpy } from '../../hooks/useScrollSpy'

const SECTIONS = ['tentang', 'keahlian', 'proyek', 'pengalaman', 'kontak']

export function Navbar({ onHome }: { onHome: () => void }) {
  const { t, locale, setLocale } = useLocale()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const active = useScrollSpy(SECTIONS)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Kunci scroll latar saat menu ponsel terbuka
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  const labels = [
    ['tentang', t.nav.about],
    ['keahlian', t.nav.skills],
    ['proyek', t.nav.projects],
    ['pengalaman', t.nav.experience],
    ['kontak', t.nav.contact],
  ] as const

  const go = (id: string) => {
    setOpen(false)
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    else onHome()
  }

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-colors duration-300 ${
        scrolled
          ? 'border-cream-300 bg-cream-50/90 backdrop-blur-md'
          : 'border-transparent bg-cream-50'
      }`}
    >
      <nav className="wrap flex h-16 items-center justify-between gap-4" aria-label="Navigasi utama">
        <button
          onClick={onHome}
          className="flex items-center gap-2.5 text-left"
          aria-label={`${profile.name} — beranda`}
        >
          <img
            src="/favicon.svg"
            alt=""
            width={32}
            height={32}
            className="h-8 w-8 rounded-lg"
          />
          <span className="font-display text-lg font-semibold tracking-tight text-ink-900">
            {profile.shortName}
          </span>
        </button>

        <ul className="hidden items-center gap-1 md:flex">
          {labels.map(([id, label]) => (
            <li key={id}>
              <button
                onClick={() => go(id)}
                aria-current={active === id ? 'true' : undefined}
                className={`rounded-full px-3.5 py-2 text-sm font-medium transition-colors ${
                  active === id
                    ? 'bg-terracotta-300/30 text-terracotta-700'
                    : 'text-ink-600 hover:bg-cream-100 hover:text-ink-800'
                }`}
              >
                {label}
              </button>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <div
            className="flex items-center rounded-full border border-cream-300 bg-cream-100 p-0.5"
            role="group"
            aria-label="Pilih bahasa"
          >
            {(['id', 'en'] as const).map((l) => (
              <button
                key={l}
                onClick={() => setLocale(l)}
                aria-pressed={locale === l}
                title={l === locale ? undefined : t.meta.hint}
                className={`min-w-[38px] rounded-full px-2.5 py-1.5 text-xs font-bold uppercase transition-colors ${
                  locale === l
                    ? 'bg-terracotta-500 text-cream-50'
                    : 'text-ink-500 hover:text-terracotta-700'
                }`}
              >
                {l}
              </button>
            ))}
          </div>

          <button
            onClick={() => setOpen((v) => !v)}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-cream-300 text-ink-700 md:hidden"
            aria-expanded={open}
            aria-controls="menu-ponsel"
            aria-label={open ? 'Tutup menu' : 'Buka menu'}
          >
            <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              {open ? (
                <>
                  <line x1="3" y1="3" x2="15" y2="15" />
                  <line x1="15" y1="3" x2="3" y2="15" />
                </>
              ) : (
                <>
                  <line x1="2" y1="5" x2="16" y2="5" />
                  <line x1="2" y1="9" x2="16" y2="9" />
                  <line x1="2" y1="13" x2="16" y2="13" />
                </>
              )}
            </svg>
          </button>
        </div>
      </nav>

      {open ? (
        <div id="menu-ponsel" className="border-t border-cream-300 bg-cream-50 md:hidden">
          <ul className="wrap flex flex-col py-2">
            {labels.map(([id, label]) => (
              <li key={id}>
                <button
                  onClick={() => go(id)}
                  className="w-full rounded-lg px-3 py-3 text-left text-sm font-medium text-ink-700 hover:bg-cream-100"
                >
                  {label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </header>
  )
}
