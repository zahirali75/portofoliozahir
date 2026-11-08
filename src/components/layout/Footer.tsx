import { useLocale } from '../../lib/locale'
import { profile } from '../../data'
import { Eyebrow } from '../ui'

export function Footer() {
  const { t } = useLocale()
  const year = new Date().getFullYear()

  const socials = [
    { label: 'GitHub', href: profile.github, handle: profile.githubUser },
    { label: 'LinkedIn', href: profile.linkedin, handle: 'in/zahir-ali-55b1b3382' },
    { label: 'Instagram', href: profile.instagram, handle: profile.instagramUser },
    { label: 'Email', href: `mailto:${profile.email}`, handle: profile.email },
  ]

  return (
    <footer className="border-t border-cream-300 bg-cream-100 py-14">
      <div className="wrap flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
        <div className="max-w-sm">
          <p className="font-display text-xl text-ink-900">{profile.name}</p>
          <p className="mt-2 text-sm text-ink-600">{t.hero.tagline}</p>
          <p className="mt-5 text-xs text-ink-600">{t.footer.built}</p>
        </div>

        <div>
          <Eyebrow>{t.contact.linksTitle}</Eyebrow>
          <ul className="mt-4 grid grid-cols-2 gap-x-10 gap-y-3 text-sm sm:grid-cols-1">
            {socials.map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  target={s.href.startsWith('mailto:') ? undefined : '_blank'}
                  rel="noopener noreferrer"
                  className="inline-block py-1.5 text-ink-700 underline-offset-4 hover:text-terracotta-700 hover:underline"
                >
                  <span className="font-medium">{s.label}</span>
                  <span className="block text-xs text-ink-600">{s.handle}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="wrap mt-12 border-t border-cream-300 pt-6">
        <p className="text-xs text-ink-600">
          © {year} {t.footer.rights}
        </p>
      </div>
    </footer>
  )
}
