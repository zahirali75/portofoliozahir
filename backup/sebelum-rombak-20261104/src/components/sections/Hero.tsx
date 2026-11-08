import { useLocale } from '../../lib/locale'
import { profile } from '../../data'
import { Button } from '../ui'

export function Hero() {
  const { t, locale } = useLocale()

  const scrollToProjects = () => {
    document.getElementById('proyek')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <section className="relative overflow-hidden pt-12 pb-16 md:pt-20 md:pb-24">
      {/* hiasan lembut, tanpa mengganggu keterbacaan */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 -right-24 h-80 w-80 rounded-full bg-terracotta-300/25 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-40 -left-32 h-72 w-72 rounded-full bg-sage-200/40 blur-3xl"
      />

      <div className="wrap relative grid items-center gap-10 md:grid-cols-[1.35fr_1fr] md:gap-14">
        <div>
          <p className="text-sm font-semibold tracking-wide text-terracotta-600 uppercase" data-reveal>
            {t.hero.greeting}
          </p>

          <h1 className="mt-3 text-4xl leading-tight sm:text-5xl md:text-6xl" data-reveal>
            {t.hero.name}
          </h1>

          <p className="mt-5 max-w-xl text-lg text-ink-600" data-reveal>
            {t.hero.tagline}
          </p>

          <dl className="mt-6 flex flex-col gap-2 text-sm text-ink-500 sm:flex-row sm:gap-6" data-reveal>
            <div className="flex items-center gap-2">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M12 21s-7-5.5-7-11a7 7 0 1 1 14 0c0 5.5-7 11-7 11z" />
                <circle cx="12" cy="10" r="2.5" />
              </svg>
              <dt className="sr-only">Lokasi</dt>
              <dd>{t.hero.location}</dd>
            </div>
            <div className="flex items-center gap-2">
              <span className="inline-block h-2 w-2 shrink-0 rounded-full bg-sage-400" aria-hidden="true" />
              <dt className="sr-only">Ketersediaan</dt>
              <dd>{t.hero.availability}</dd>
            </div>
          </dl>

          <div className="mt-8 flex flex-wrap gap-3" data-reveal>
            <Button onClick={scrollToProjects}>{t.hero.ctaProjects}</Button>
            <Button as="a" href={profile.cv} variant="secondary" download>
              {t.hero.ctaCv}
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M12 3v12m0 0l-4-4m4 4l4-4M4 20h16" />
              </svg>
            </Button>
          </div>
        </div>

        <div className="justify-self-center md:justify-self-end" data-reveal>
          <div className="relative">
            <div
              aria-hidden="true"
              className="absolute -inset-3 rounded-[2rem] border border-terracotta-300/60"
            />
            <picture>
              <source srcSet={profile.photo.webp} type="image/webp" />
              <img
                src={profile.photo.src}
                srcSet={profile.photo.srcSet}
                sizes="(max-width: 768px) 70vw, 320px"
                alt={profile.photo.alt}
                width={320}
                height={320}
                fetchPriority="high"
                decoding="async"
                className="relative h-[260px] w-[260px] rounded-[1.6rem] object-cover object-center shadow-lg sm:h-[320px] sm:w-[320px]"
              />
            </picture>
            <div className="absolute -bottom-4 -left-4 rounded-2xl border border-cream-300 bg-cream-50 px-4 py-2.5 shadow-md">
              <p className="font-display text-xl font-semibold text-terracotta-600">15</p>
              <p className="text-[11px] leading-tight text-ink-500">
                {locale === 'id' ? 'juz hafalan Al-Qur\'an' : 'juz Qur\'an memorised'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
