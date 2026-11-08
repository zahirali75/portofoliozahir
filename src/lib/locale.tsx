import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import type { Content, Locale } from '../data/types'
import { content, profile } from '../data'

const STORAGE_KEY = 'portfolio-locale'

interface LocaleValue {
  locale: Locale
  setLocale: (l: Locale) => void
  toggle: () => void
  t: Content
}

const LocaleContext = createContext<LocaleValue | null>(null)

function initialLocale(): Locale {
  if (typeof window === 'undefined') return 'id'
  const saved = window.localStorage.getItem(STORAGE_KEY)
  if (saved === 'id' || saved === 'en') return saved
  return 'id'
}

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(initialLocale)

  const setLocale = useCallback((l: Locale) => {
    setLocaleState(l)
    try {
      window.localStorage.setItem(STORAGE_KEY, l)
    } catch {
      /* localStorage bisa diblokir; abaikan */
    }
  }, [])

  const toggle = useCallback(() => {
    setLocale(locale === 'id' ? 'en' : 'id')
  }, [locale, setLocale])

  // Sinkronkan atribut dokumen supaya pembaca layar & mesin pencari ikut tahu
  useEffect(() => {
    const t = content[locale]
    document.documentElement.lang = t.meta.htmlLang
    document.title =
      locale === 'id'
        ? `${profile.name} — Mahasiswa Sains Data`
        : `${profile.name} — Data Science Student`
  }, [locale])

  const value = useMemo(
    () => ({ locale, setLocale, toggle, t: content[locale] }),
    [locale, setLocale, toggle],
  )

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
}

export function useLocale(): LocaleValue {
  const ctx = useContext(LocaleContext)
  if (!ctx) throw new Error('useLocale harus dipakai di dalam <LocaleProvider>')
  return ctx
}
