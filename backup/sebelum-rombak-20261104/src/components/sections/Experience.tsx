import { useLocale } from '../../lib/locale'
import { experience } from '../../data/experience'
import { Section } from '../ui'
import type { TimelineEntry } from '../../data/types'

function Timeline({ items, heading }: { items: TimelineEntry[]; heading: string }) {
  if (items.length === 0) return null

  return (
    <div>
      <h3 className="text-lg font-semibold text-ink-900">{heading}</h3>
      <ol className="mt-5 space-y-7 border-l border-cream-300 pl-6">
        {items.map((it) => (
          <li key={`${it.period}-${it.title}`} className="relative">
            <span
              aria-hidden="true"
              className="absolute top-2 -left-[31px] h-2.5 w-2.5 rounded-full border-2 border-cream-50 bg-terracotta-500"
            />
            <p className="text-xs font-medium tracking-wide text-terracotta-600 uppercase">
              {it.period}
            </p>
            <h4 className="mt-1 text-base font-semibold text-ink-900">{it.title}</h4>
            <p className="text-sm text-ink-500">{it.org}</p>
            <ul className="mt-2.5 space-y-1.5">
              {it.points.map((p, i) => (
                <li key={i} className="flex gap-2.5 text-sm text-ink-700">
                  <span aria-hidden="true" className="mt-2 h-1 w-1 shrink-0 rounded-full bg-sage-400" />
                  <span>{p}</span>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ol>
    </div>
  )
}

export function Experience() {
  const { t, locale } = useLocale()
  const x = experience[locale]

  return (
    <Section id="pengalaman" title={t.experience.title} lead={t.experience.lead}>
      <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
        <div className="space-y-10">
          <Timeline items={x.work} heading={t.experience.work} />
          <Timeline items={x.organizations} heading={t.experience.organization} />
        </div>

        {/* Prestasi + bukti visual */}
        <div data-reveal>
          <h3 className="text-lg font-semibold text-ink-900">{t.experience.awards}</h3>
          <p className="mt-1 text-sm text-ink-500">{t.experience.awardsLead}</p>

          <ul className="mt-5 space-y-5">
            {x.awards.map((a) => (
              <li
                key={a.title}
                className="overflow-hidden rounded-2xl border border-cream-300 bg-cream-50"
              >
                <div className="flex flex-col sm:flex-row">
                  {a.image ? (
                    <img
                      src={a.image}
                      alt={a.title}
                      loading="lazy"
                      decoding="async"
                      className="h-40 w-full object-cover object-top sm:h-auto sm:w-36 sm:shrink-0"
                    />
                  ) : null}
                  <div className="p-4">
                    <p className="text-xs font-medium text-terracotta-600">{a.year}</p>
                    <h4 className="mt-0.5 text-sm font-semibold text-ink-900">{a.title}</h4>
                    <p className="text-xs text-ink-500">{a.issuer}</p>
                    {a.note ? <p className="mt-2 text-xs leading-relaxed text-ink-600">{a.note}</p> : null}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Mata kuliah + bahasa */}
      <div className="mt-14 grid gap-10 md:grid-cols-2" data-reveal>
        <div>
          <h3 className="text-lg font-semibold text-ink-900">{t.experience.courses}</h3>
          <p className="mt-1 text-sm text-ink-500">{t.experience.coursesLead}</p>
          <ul className="mt-4 flex flex-wrap gap-2">
            {x.courses.map((c) => (
              <li
                key={c.en}
                className="rounded-full border border-cream-300 bg-cream-100 px-3 py-1.5 text-xs font-medium text-ink-700"
              >
                {locale === 'id' ? c.id : c.en}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-ink-900">{t.experience.languages}</h3>
          <ul className="mt-4 divide-y divide-cream-300 border-y border-cream-300">
            {x.languages.map((l) => (
              <li key={l.name} className="flex items-baseline justify-between gap-4 py-3">
                <span className="text-sm font-medium text-ink-800">{l.name}</span>
                <span className="text-right text-sm text-ink-500">{l.level}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Dokumentasi kegiatan */}
      <div className="mt-14">
        <h3 className="text-lg font-semibold text-ink-900">{t.experience.activities}</h3>
        <p className="mt-1 text-sm text-ink-500">{t.experience.activitiesLead}</p>

        <ul className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {x.activities.map((a) => (
            <li
              key={a.image}
              className="overflow-hidden rounded-2xl border border-cream-300 bg-cream-50"
              data-reveal
            >
              <img
                src={a.image}
                alt={a.title}
                loading="lazy"
                decoding="async"
                className={`w-full object-cover ${a.aspect === 'landscape' ? 'h-52 object-center' : 'h-72 object-top'}`}
              />
              <div className="p-4">
                <p className="text-sm font-semibold text-ink-900">{a.title}</p>
                <p className="mt-1 text-xs leading-relaxed text-ink-600">{a.caption}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  )
}
