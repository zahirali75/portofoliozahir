import { useLocale } from '../../lib/locale'
import { Counter, Eyebrow, Section } from '../ui'

export function About() {
  const { t } = useLocale()

  return (
    <Section id="tentang" title={t.about.title} eyebrow={t.about.eyebrow} tone="alt">
      {/* Tiga angka ringkas: terbaca sebelum paragraf panjang */}
      <dl className="grid grid-cols-1 gap-8 border-b border-cream-300 pb-10 sm:grid-cols-3" data-reveal>
        {t.about.stats.map((s) => (
          <div key={s.label}>
            <dd className="font-display text-5xl text-terracotta-700 sm:text-6xl">
              <Counter value={s.value} />
            </dd>
            <dt className="mt-2 text-sm text-ink-600">{s.label}</dt>
          </div>
        ))}
      </dl>

      <div className="mt-12 grid gap-12 md:grid-cols-[1.6fr_1fr] md:gap-16">
        <div className="prose-narrow space-y-5 text-ink-700" data-reveal>
          {t.about.paragraphs.map((p, i) => (
            <p key={i} className={i === 0 ? 'text-lg text-ink-800' : ''}>
              {p}
            </p>
          ))}
        </div>

        <aside data-reveal>
          <Eyebrow>{t.about.factsTitle}</Eyebrow>
          <dl className="mt-5 divide-y divide-cream-300 border-y border-cream-300">
            {t.about.facts.map((f) => (
              <div key={f.label} className="flex items-baseline justify-between gap-4 py-3.5">
                <dt className="text-sm text-ink-600">{f.label}</dt>
                <dd className="text-right text-sm font-semibold text-ink-900">{f.value}</dd>
              </div>
            ))}
          </dl>
        </aside>
      </div>
    </Section>
  )
}
