import { useLocale } from '../../lib/locale'
import { skills } from '../../data/skills'
import { Section } from '../ui'
import type { Level } from '../../data/types'

/** Warna tingkat: sengaja dibedakan agar "sedang dipelajari" jujur terlihat beda. */
const levelStyle: Record<Level, string> = {
  mahir: 'bg-sage-400/25 text-sage-600 border-sage-300',
  menengah: 'bg-terracotta-300/25 text-terracotta-700 border-terracotta-300',
  dasar: 'bg-cream-300/60 text-ink-600 border-cream-300',
  dipelajari: 'bg-cream-100 text-ink-500 border-dashed border-ink-500/30',
}

export function Skills() {
  const { t, locale } = useLocale()
  const groups = skills[locale]

  return (
    <Section id="keahlian" title={t.skills.title} lead={t.skills.lead}>
      <div className="grid gap-6 sm:grid-cols-2">
        {groups.map((g) => (
          <div
            key={g.title}
            className="rounded-card border border-cream-300 bg-cream-50 p-6"
            data-reveal
          >
            <h3 className="text-lg font-semibold text-ink-900">{g.title}</h3>
            <ul className="mt-4 flex flex-wrap gap-2">
              {g.items.map((it) => (
                <li key={it.name}>
                  <span
                    className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium ${levelStyle[it.level]}`}
                  >
                    {it.name}
                    <span className="opacity-70">· {t.skills.levels[it.level]}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <p className="prose-narrow mt-6 text-sm text-ink-500" data-reveal>
        {t.skills.note}
      </p>
    </Section>
  )
}
