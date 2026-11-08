import { useLocale } from '../../lib/locale'
import { profile } from '../../data'

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
    <footer className="border-t border-cream-300 bg-cream-100 py-12">
      <div className="wrap flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
        <div className="max-w-sm">
          <p className="font-display text-lg font-semibold text-ink-900">{profile.name}</p>
          <p className="mt-1 text-sm text-ink-500">{t.hero.tagline}</p>
          <p className="mt-4 text-xs text-ink-500">{t.footer.built}</p>
        </div>

        <ul className="grid grid-cols-2 gap-x-8 gap-y-2 text-sm sm:grid-cols-1">
          {socials.map((s) => (
            <li key={s.label}>
              <a
                href={s.href}
                target={s.href.startsWith('mailto:') ? undefined : '_blank'}
                rel="noopener noreferrer"
                className="text-ink-600 underline-offset-4 hover:text-terracotta-700 hover:underline"
              >
                <span className="font-medium">{s.label}</span>
                <span className="block text-xs text-ink-500">{s.handle}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>

      <div className="wrap mt-10 border-t border-cream-300 pt-6">
        <p className="text-xs text-ink-500">
          © {year} {t.footer.rights}
        </p>
      </div>
    </footer>
  )
}
