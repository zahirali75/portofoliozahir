import { Link } from 'react-router-dom'
import { useLocale } from '../../lib/locale'
import { projects } from '../../data/projects'
import { Section } from '../ui'
import type { Project } from '../../data/types'

function Card({ p }: { p: Project }) {
  const { t } = useLocale()

  return (
    <article
      className="group overflow-hidden rounded-card border border-cream-300 bg-cream-50 transition-shadow hover:shadow-lg focus-within:shadow-lg"
      data-reveal
    >
      <Link to={`/proyek/${p.slug}`} className="block">
        <div className="relative aspect-[16/10] overflow-hidden bg-cream-300">
          <img
            src={p.cover}
            alt={`Tangkapan layar ${p.title}`}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
          />
        </div>

        <div className="p-6">
          <div className="flex items-center gap-3 text-xs text-ink-500">
            <span>{p.year}</span>
            <span aria-hidden="true">·</span>
            <span>{p.status}</span>
          </div>

          <h3 className="mt-2 text-2xl">{p.title}</h3>
          <p className="mt-2 text-sm text-ink-600">{p.oneLiner}</p>

          <ul className="mt-4 flex flex-wrap gap-1.5">
            {p.stack.slice(0, 6).map((s) => (
              <li
                key={s}
                className="rounded-full border border-cream-300 bg-cream-100 px-2.5 py-1 text-[11px] font-medium text-ink-600"
              >
                {s}
              </li>
            ))}
            {p.stack.length > 6 ? (
              <li className="px-1 py-1 text-[11px] text-ink-500">+{p.stack.length - 6}</li>
            ) : null}
          </ul>

          <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-terracotta-700">
            {t.projects.viewDetail}
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M5 12h14m0 0l-5-5m5 5l-5 5" />
            </svg>
          </span>
        </div>
      </Link>
    </article>
  )
}

export function Projects() {
  const { t, locale } = useLocale()
  const list = projects[locale]

  return (
    <Section id="proyek" title={t.projects.title} lead={t.projects.lead} alt>
      <div className="grid gap-8 lg:grid-cols-2">
        {list.map((p) => (
          <Card key={p.slug} p={p} />
        ))}
      </div>
    </Section>
  )
}
