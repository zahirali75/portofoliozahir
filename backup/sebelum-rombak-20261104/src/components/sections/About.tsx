import { useLocale } from '../../lib/locale'
import { Section } from '../ui'

export function About() {
  const { t } = useLocale()

  return (
    <Section id="tentang" title={t.about.title} alt>
      <div className="grid gap-12 md:grid-cols-[1.6fr_1fr] md:gap-16">
        <div className="prose-narrow space-y-5 text-ink-700" data-reveal>
          {t.about.paragraphs.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>

        <aside className="md:pt-1" data-reveal>
          <h3 className="text-sm font-semibold tracking-wide text-terracotta-600 uppercase">
            {t.about.factsTitle}
          </h3>
          <dl className="mt-4 divide-y divide-cream-300 border-y border-cream-300">
            {t.about.facts.map((f) => (
              <div key={f.label} className="flex items-baseline justify-between gap-4 py-3">
                <dt className="text-sm text-ink-500">{f.label}</dt>
                <dd className="text-right text-sm font-semibold text-ink-800">{f.value}</dd>
              </div>
            ))}
          </dl>
        </aside>
      </div>
    </Section>
  )
}
