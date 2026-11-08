import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useLocale } from '../lib/locale'
import { findProject } from '../data/projects'
import { Button, Chip, Counter, Eyebrow } from '../components/ui'

export function ProjectDetail() {
  const { slug = '' } = useParams()
  const { t, locale } = useLocale()
  const project = findProject(locale, slug)
  const [zoom, setZoom] = useState<string | null>(null)

  useEffect(() => {
    if (!zoom) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setZoom(null)
    }
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [zoom])

  if (!project) {
    return (
      <div className="wrap py-24 text-center">
        <h1 className="display-lg">{t.notFound.title}</h1>
        <p className="mx-auto mt-4 max-w-md text-ink-600">{t.notFound.body}</p>
        <Link
          to="/"
          className="mt-8 inline-block font-semibold text-terracotta-700 underline underline-offset-4"
        >
          {t.notFound.cta}
        </Link>
      </div>
    )
  }

  const L = t.projects.labels
  const S = t.projects.sections

  return (
    <article className="pb-24">
      {/* Kepala halaman */}
      <header className="border-b border-cream-300 bg-cream-100 pt-10 pb-14">
        <div className="wrap">
          <Link
            to="/"
            className="inline-flex min-h-[44px] items-center gap-1.5 text-sm font-medium text-ink-600 hover:text-terracotta-700"
          >
            <svg
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden="true"
            >
              <path d="M19 12H5m0 0l5-5m-5 5l5 5" />
            </svg>
            {t.projects.backToList}
          </Link>

          <h1 className="display-lg mt-6" data-reveal>
            {project.title}
          </h1>
          <p className="prose-narrow mt-5 text-lg text-ink-700" data-reveal>
            {project.oneLiner}
          </p>

          <dl className="mt-8 flex flex-wrap gap-x-12 gap-y-4 text-sm" data-reveal>
            <div>
              <dt className="eyebrow text-terracotta-700">{L.year}</dt>
              <dd className="mt-1.5 font-semibold text-ink-900">{project.year}</dd>
            </div>
            <div>
              <dt className="eyebrow text-terracotta-700">{L.status}</dt>
              <dd className="mt-1.5 font-semibold text-ink-900">{project.status}</dd>
            </div>
          </dl>

          <ul className="mt-7 flex flex-wrap gap-2" data-reveal>
            {project.stack.map((s) => (
              <li key={s}>
                <Chip>{s}</Chip>
              </li>
            ))}
          </ul>

          <div className="mt-9 flex flex-wrap gap-3" data-reveal>
            {project.links.map((l) => (
              <Button
                key={l.href}
                as="a"
                href={l.href}
                external
                variant={l.kind === 'repo' ? 'primary' : 'secondary'}
              >
                {l.kind === 'repo' ? t.projects.repo : l.kind === 'demo' ? t.projects.demo : t.projects.doc}
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  aria-hidden="true"
                >
                  <path d="M14 4h6m0 0v6m0-6L10 14M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5" />
                </svg>
              </Button>
            ))}
          </div>
        </div>
      </header>

      <div className="wrap grid gap-16 pt-16 lg:grid-cols-[1.7fr_1fr] lg:gap-20">
        <div className="space-y-16">
          <section data-reveal>
            <Eyebrow>{S.context}</Eyebrow>
            <h2 className="display-lg mt-4">{L.problem}</h2>
            <p className="prose-narrow mt-4 text-ink-700">{project.problem}</p>
          </section>

          <section data-reveal>
            <Eyebrow>{S.decisions}</Eyebrow>
            <h2 className="display-lg mt-4">{L.decisions}</h2>
            <div className="mt-7 space-y-8">
              {project.decisions.map((d) => (
                <div key={d.title} className="border-l-2 border-terracotta-500 pl-6">
                  <h3 className="text-lg font-semibold text-ink-900">{d.title}</h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-ink-700">{d.body}</p>
                </div>
              ))}
            </div>
          </section>

          <section data-reveal>
            <Eyebrow>{S.challenge}</Eyebrow>
            <h2 className="display-lg mt-4">{L.challenge}</h2>
            <div className="mt-6 rounded-card border border-cream-300 bg-cream-100 p-7">
              <h3 className="text-lg font-semibold text-ink-900">{project.challenge.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-ink-700">{project.challenge.body}</p>
            </div>
          </section>

          <section data-reveal>
            <Eyebrow>{S.gallery}</Eyebrow>
            <h2 className="display-lg mt-4">{L.gallery}</h2>
            <ul className="mt-7 space-y-8">
              {project.gallery.map((g, i) => (
                <li key={g.src}>
                  <button
                    onClick={() => setZoom(g.src)}
                    className="block w-full overflow-hidden rounded-card border border-cream-300 bg-cream-100"
                    aria-label={`${g.caption} — perbesar`}
                  >
                    <img
                      src={g.src}
                      alt={g.caption}
                      loading={i < 2 ? 'eager' : 'lazy'}
                      decoding="async"
                      width={1280}
                      height={800}
                      className="w-full object-cover object-top"
                      onError={(e) => {
                        // gambar rusak tidak boleh jadi kotak kosong tanpa penjelasan
                        const el = e.currentTarget
                        el.style.display = 'none'
                        const note = document.createElement('p')
                        note.textContent = g.caption
                        note.className = 'p-6 text-sm text-ink-600'
                        el.parentElement?.appendChild(note)
                      }}
                    />
                  </button>
                  <p className="mt-2.5 text-xs text-ink-600">{g.caption}</p>
                </li>
              ))}
            </ul>
          </section>
        </div>

        <aside className="space-y-12 lg:sticky lg:top-24 lg:self-start">
          <section data-reveal>
            <Eyebrow>{L.role}</Eyebrow>
            <ul className="mt-5 space-y-3.5">
              {project.role.map((r, i) => (
                <li key={i} className="flex gap-2.5 text-sm text-ink-700">
                  <span aria-hidden="true" className="mt-2 h-1 w-1 shrink-0 rounded-full bg-sage-500" />
                  <span>{r}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Angka hasil: berhitung naik saat terlihat */}
          <section className="anchor-dark grain rounded-card p-7" data-reveal>
            <Eyebrow light>{S.facts}</Eyebrow>
            <dl className="mt-6 grid grid-cols-2 gap-x-4 gap-y-7">
              {project.results.map((r) => (
                <div key={r.label}>
                  <dd className="font-display text-4xl text-terracotta-300">
                    <Counter value={r.value} />
                  </dd>
                  <dt className="mt-1.5 text-xs leading-tight text-[#a89c8e]">{r.label}</dt>
                </div>
              ))}
            </dl>
          </section>

          <section data-reveal>
            <Eyebrow>{L.stack}</Eyebrow>
            <ul className="mt-5 flex flex-wrap gap-2">
              {project.stack.map((s) => (
                <li key={s}>
                  <Chip>{s}</Chip>
                </li>
              ))}
            </ul>
          </section>
        </aside>
      </div>

      {/* Tampilan pembesaran gambar */}
      {zoom ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Pratinjau gambar"
          className="fixed inset-0 z-[60] flex items-center justify-center bg-ink-950/90 p-4"
          onClick={() => setZoom(null)}
        >
          <img
            src={zoom}
            alt=""
            className="max-h-[92vh] max-w-[95vw] rounded-xl object-contain"
            onClick={(e) => e.stopPropagation()}
          />
          <button
            onClick={() => setZoom(null)}
            className="absolute top-4 right-4 flex h-11 w-11 items-center justify-center rounded-full bg-cream-50 text-ink-900"
            aria-label="Tutup pratinjau"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              aria-hidden="true"
            >
              <line x1="3" y1="3" x2="15" y2="15" />
              <line x1="15" y1="3" x2="3" y2="15" />
            </svg>
          </button>
        </div>
      ) : null}
    </article>
  )
}
