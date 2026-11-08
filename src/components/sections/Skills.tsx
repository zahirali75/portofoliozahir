import { useLocale } from '../../lib/locale'
import { skills } from '../../data/skills'
import { Section } from '../ui'
import type { Level } from '../../data/types'

/** Warna tingkat: sengaja dibedakan agar "sedang dipelajari" jujur terlihat beda.
    Nada teks dinaikkan agar label kecil tetap lulus kontras AA. */
const levelStyle: Record<Level, string> = {
  mahir: 'bg-sage-200 text-sage-700',
  menengah: 'bg-terracotta-300/30 text-terracotta-700',
  dasar: 'bg-cream-200 text-ink-700',
  dipelajari: 'bg-transparent text-ink-600 outline-dashed outline-1 -outline-offset-1 outline-ink-500/40',
}

export function Skills() {
  const { t, locale } = useLocale()
  const groups = skills[locale]

  return (
    <Section id="keahlian" title={t.skills.title} eyebrow={t.skills.eyebrow} lead={t.skills.lead}>
      <div className="grid gap-x-10 gap-y-12 sm:grid-cols-2">
        {groups.map((g) => (
          <div key={g.title} data-reveal>
            {/* Garis tebal sebagai penanda kelompok: pengganti kartu bershadow */}
            <h3 className="border-t-2 border-ink-900 pt-4 text-base font-semibold text-ink-900">
              {g.title}
            </h3>
            <ul className="mt-5 flex flex-wrap gap-2">
              {g.items.map((it) => (
                <li key={it.name}>
                  <span
                    className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium ${levelStyle[it.level]}`}
                  >
                    {it.name}
                    <span className="opacity-60">· {t.skills.levels[it.level]}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <p className="prose-narrow mt-10 text-sm text-ink-600" data-reveal>
        {t.skills.note}
      </p>
    </Section>
  )
}
