import { useLocale } from '../../lib/locale'
import { profile } from '../../data'
import { Button, Counter, Eyebrow, Marquee, MaskTitle } from '../ui'
import { HeroIdCard } from './HeroIdCard'
import { MeshGradient } from './MeshGradient'

/* Palet latar hero — diambil dari palet project ini sendiri, bukan warna
   luar: coklat dalam sebagai dasar, terracotta redup di tengah, dan sage
   gelap (#767e64) hanya sebagai bisikan di tempat warp paling kuat.
   Semua cukup gelap supaya teks krem di atasnya tetap terbaca; tanpa
   ini nama bisa turun ke kontras 3,4:1 (di bawah batas WCAG 4,5). */
const HERO_STOPS = ['#120e0a', '#2a1f15', '#4a3425', '#767e64'] as const

export function Hero() {
  const { t } = useLocale()

  const scrollToProjects = () => {
    document.getElementById('proyek')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <section className="anchor-dark grain relative flex min-h-[92svh] flex-col overflow-hidden">
      <MeshGradient stops={HERO_STOPS} className="absolute inset-0" />

      <div className="wrap hero-pad relative flex flex-1 flex-col justify-center pt-12 pb-12 md:pt-8 md:pb-12">
        <div className="grid items-end gap-12 lg:grid-cols-[1.45fr_1fr] lg:gap-6">
          <div>
            <Eyebrow light>{t.hero.greeting}</Eyebrow>

            {/* Nama sebagai bintang utama: kata naik dari balik garis potong */}
            <MaskTitle lines={t.hero.lines} className="display-xl mt-4 text-cream-50" />

            <p className="mt-6 max-w-xl text-lg text-[#cfc4b6]" data-reveal>
              {t.hero.tagline}
            </p>

            <dl
              className="mt-5 flex flex-col gap-2.5 text-sm text-[#a89c8e] sm:flex-row sm:gap-7"
              data-reveal
            >
              <div className="flex items-center gap-2">
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  aria-hidden="true"
                >
                  <path d="M12 21s-7-5.5-7-11a7 7 0 1 1 14 0c0 5.5-7 11-7 11z" />
                  <circle cx="12" cy="10" r="2.5" />
                </svg>
                <dt className="sr-only">Lokasi</dt>
                <dd>{t.hero.location}</dd>
              </div>
              <div className="flex items-center gap-2">
                <span
                  className="inline-block h-2 w-2 shrink-0 rounded-full bg-sage-300"
                  aria-hidden="true"
                />
                <dt className="sr-only">Ketersediaan</dt>
                <dd>{t.hero.availability}</dd>
              </div>
            </dl>

            <div className="mt-8 flex flex-wrap gap-3" data-reveal>
              <Button onClick={scrollToProjects} variant="inverse">
                {t.hero.ctaProjects}
              </Button>
              <Button as="a" href={profile.cv} variant="outlineLight" download>
                {t.hero.ctaCv}
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  aria-hidden="true"
                >
                  <path d="M12 3v12m0 0l-4-4m4 4l4-4M4 20h16" />
                </svg>
              </Button>
            </div>
          </div>

          <div className="relative" data-reveal>
            <HeroIdCard />
          </div>
        </div>

        {/* Tonggak angka: bukti nyata, bukan klaim */}
        <dl
          className="hero-milestones mt-5 grid grid-cols-1 gap-8 border-t border-white/15 pt-5 sm:grid-cols-3"
          data-reveal
        >
          {t.hero.milestones.map((m) => (
            <div key={m.label}>
              <dd className="font-display text-4xl text-cream-50 sm:text-5xl">
                <Counter value={m.value} />
              </dd>
              <dt className="mt-1.5 text-sm text-[#a89c8e]">{m.label}</dt>
            </div>
          ))}
        </dl>
      </div>

      {/* Pita berjalan: satu-satunya bidang berwarna di halaman hero */}
      <Marquee items={t.hero.marquee} />
    </section>
  )
}
