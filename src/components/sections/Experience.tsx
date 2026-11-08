import { useLocale } from '../../lib/locale'
import { experience } from '../../data/experience'
import { Section } from '../ui'
import { GlassCarousel } from './GlassCarousel'
import type { TimelineEntry } from '../../data/types'

function Timeline({ items, heading }: { items: TimelineEntry[]; heading: string }) {
  if (items.length === 0) return null

  return (
    <div>
      <h3 className="text-base font-semibold text-ink-900">{heading}</h3>
      <ol className="mt-6 space-y-9 border-l border-cream-300 pl-7">
        {items.map((it) => (
          <li key={`${it.period}-${it.title}`} className="relative">
            <span
              aria-hidden="true"
              className="absolute top-2 -left-[35px] h-2.5 w-2.5 rounded-full border-2 border-cream-100 bg-terracotta-500"
            />
            <p className="eyebrow text-terracotta-700">{it.period}</p>
            <h4 className="mt-2 text-lg font-semibold text-ink-900">{it.title}</h4>
            <p className="text-sm text-ink-600">{it.org}</p>
            <ul className="mt-3 space-y-2">
              {it.points.map((p, i) => (
                <li key={i} className="flex gap-2.5 text-sm text-ink-700">
                  <span
                    aria-hidden="true"
                    className="mt-2 h-1 w-1 shrink-0 rounded-full bg-sage-500"
                  />
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

  /* Kegiatan: carousel bergerak KE KIRI (direction -1), dengan motion blur saat digeser. */
  const activities = x.activities.map((a) => ({ src: a.image, title: a.title, sub: a.caption }))

  return (
    <Section id="pengalaman" title={t.experience.title} eyebrow={t.experience.eyebrow} lead={t.experience.lead}>
      <div className="grid gap-14 lg:grid-cols-2 lg:gap-20">
        <div className="space-y-12">
          <Timeline items={x.work} heading={t.experience.work} />
          <Timeline items={x.organizations} heading={t.experience.organization} />
        </div>

        {/* Prestasi + bukti visual */}
        <div data-reveal>
          <h3 className="text-base font-semibold text-ink-900">{t.experience.awards}</h3>
          <p className="mt-1.5 text-sm text-ink-600">{t.experience.awardsLead}</p>

          <ul className="mt-6 space-y-8">
            {x.awards.map((a) => (
              <li key={a.title} className="border-t border-cream-300 pt-5">
                <div className="flex gap-5">
                  {a.image ? (
                    <img
                      src={a.image}
                      alt={a.title}
                      loading="lazy"
                      decoding="async"
                      className="h-28 w-24 shrink-0 rounded-lg object-cover object-top"
                    />
                  ) : null}
                  <div>
                    <p className="eyebrow text-terracotta-700">{a.year}</p>
                    <h4 className="mt-1.5 text-base font-semibold text-ink-900">{a.title}</h4>
                    <p className="text-xs text-ink-600">{a.issuer}</p>
                    {a.note ? (
                      <p className="mt-2 text-xs leading-relaxed text-ink-700">{a.note}</p>
                    ) : null}
                  </div>
                </div>

                {/* Dokumentasi tambahan: bukti yang bisa dibuka sendiri */}
                {a.extra?.length ? (
                  <ul className="mt-4 flex flex-wrap gap-3">
                    {a.extra.map((src) => (
                      <li key={src}>
                        <a href={src} target="_blank" rel="noreferrer" className="block">
                          <img
                            src={src}
                            alt=""
                            loading="lazy"
                            decoding="async"
                            className="h-20 w-28 rounded-lg border border-cream-300 object-cover object-center transition-opacity hover:opacity-80"
                          />
                        </a>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Mata kuliah + bahasa */}
      <div className="mt-20 grid gap-12 md:grid-cols-2" data-reveal>
        <div>
          <h3 className="text-base font-semibold text-ink-900">{t.experience.courses}</h3>
          <p className="mt-1.5 text-sm text-ink-600">{t.experience.coursesLead}</p>
          <ul className="mt-5 flex flex-wrap gap-2">
            {x.courses.map((c) => (
              <li
                key={c.en}
                className="rounded-full border border-cream-300 px-3.5 py-1.5 text-xs font-medium text-ink-700"
              >
                {locale === 'id' ? c.id : c.en}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-base font-semibold text-ink-900">{t.experience.languages}</h3>
          <ul className="mt-5 divide-y divide-cream-300 border-y border-cream-300">
            {x.languages.map((l) => (
              <li key={l.name} className="flex items-baseline justify-between gap-4 py-3.5">
                <span className="text-sm font-medium text-ink-800">{l.name}</span>
                <span className="text-right text-sm text-ink-600">{l.level}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Dokumentasi kegiatan — carousel bergerak ke kiri, motion blur saat digeser */}
      <div className="mt-20" data-reveal>
        <h3 className="text-base font-semibold text-ink-900">{t.experience.activities}</h3>
        <p className="mt-1.5 text-sm text-ink-600">{t.experience.activitiesLead}</p>

        <div className="mt-8">
          <GlassCarousel
            slides={activities}
            direction={-1}
            autoplaySeconds={2.6}
            motionBlur
            label={t.experience.activities}
            prevLabel={t.experience.slidePrev}
            nextLabel={t.experience.slideNext}
          />
        </div>
        <p className="mt-3 text-center text-xs text-ink-600">{t.experience.dragHint}</p>
      </div>
    </Section>
  )
}
