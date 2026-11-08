import { useLocale } from '../../lib/locale'
import { profile } from '../../data'
import { useCopyToClipboard } from '../../hooks/useCopyToClipboard'
import { Button, Section } from '../ui'

export function Contact() {
  const { t } = useLocale()
  const { copy, state } = useCopyToClipboard()

  const links = [
    { label: 'GitHub', href: profile.github, handle: profile.githubUser },
    { label: 'LinkedIn', href: profile.linkedin, handle: 'zahir-ali-55b1b3382' },
    { label: 'Instagram', href: profile.instagram, handle: profile.instagramUser },
  ]

  const label = state === 'copied' ? t.contact.copied : state === 'failed' ? t.contact.copyFailed : t.contact.copy

  return (
    <Section id="kontak" title={t.contact.title} lead={t.contact.lead} alt>
      <div className="grid gap-10 md:grid-cols-2 md:gap-16">
        <div data-reveal>
          <p className="text-xs font-semibold tracking-wide text-terracotta-600 uppercase">
            {t.contact.emailLabel}
          </p>
          <a
            href={`mailto:${profile.email}`}
            className="mt-1 block break-all font-display text-xl font-semibold text-ink-900 underline-offset-4 hover:text-terracotta-700 hover:underline sm:text-2xl"
          >
            {profile.email}
          </a>

          <div className="mt-6 flex flex-wrap gap-3">
            <Button onClick={() => copy(profile.email)} variant={state === 'copied' ? 'secondary' : 'primary'}>
              {state === 'copied' ? (
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                  <path d="M20 6L9 17l-5-5" />
                </svg>
              ) : (
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <rect x="9" y="9" width="11" height="11" rx="2" />
                  <path d="M5 15V5a2 2 0 0 1 2-2h10" />
                </svg>
              )}
              {label}
            </Button>

            <Button as="a" href={profile.cv} variant="secondary" download>
              {t.contact.downloadCv}
            </Button>
          </div>

          {/* Umpan balik untuk pembaca layar */}
          <p role="status" aria-live="polite" className="sr-only">
            {state === 'copied' ? t.contact.copied : state === 'failed' ? t.contact.copyFailed : ''}
          </p>
        </div>

        <div data-reveal>
          <h3 className="text-xs font-semibold tracking-wide text-terracotta-600 uppercase">
            {t.contact.linksTitle}
          </h3>
          <ul className="mt-4 divide-y divide-cream-300 border-y border-cream-300">
            {links.map((l) => (
              <li key={l.label}>
                <a
                  href={l.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-baseline justify-between gap-4 py-3.5 transition-colors hover:text-terracotta-700"
                >
                  <span className="text-sm font-semibold text-ink-800">{l.label}</span>
                  <span className="text-right text-xs text-ink-500">{l.handle}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  )
}
