import { useLocale } from '../../lib/locale'
import { profile } from '../../data'
import { useCopyToClipboard } from '../../hooks/useCopyToClipboard'
import { Button, Eyebrow } from '../ui'

export function Contact() {
  const { t } = useLocale()
  const { copy, state } = useCopyToClipboard()

  const links = [
    { label: 'GitHub', href: profile.github, handle: profile.githubUser },
    { label: 'LinkedIn', href: profile.linkedin, handle: 'zahir-ali-55b1b3382' },
    { label: 'Instagram', href: profile.instagram, handle: profile.instagramUser },
  ]

  const label =
    state === 'copied' ? t.contact.copied : state === 'failed' ? t.contact.copyFailed : t.contact.copy

  return (
    /* Blok gelap jangkar kedua — penutup halaman */
    <section id="kontak" className="anchor-dark grain scroll-mt-24 py-20 md:py-28">
      <div className="wrap">
        <header className="max-w-3xl" data-reveal>
          <Eyebrow light>{t.contact.eyebrow}</Eyebrow>
          <h2 className="display-lg mt-4 text-cream-50">{t.contact.title}</h2>
          <p className="prose-narrow mt-4 text-base text-[#cfc4b6]">{t.contact.lead}</p>
        </header>

        <div className="mt-14 grid gap-14 md:grid-cols-2 md:gap-20">
          <div data-reveal>
            <Eyebrow light>{t.contact.emailLabel}</Eyebrow>
            <a
              href={`mailto:${profile.email}`}
              className="font-display mt-3 flex min-h-[52px] items-center break-all text-2xl text-cream-50 underline-offset-8 hover:text-terracotta-300 hover:underline sm:text-4xl"
            >
              {profile.email}
            </a>

            <div className="mt-8 flex flex-wrap gap-3">
              <Button
                onClick={() => copy(profile.email)}
                variant={state === 'copied' ? 'outlineLight' : 'inverse'}
              >
                {state === 'copied' ? (
                  <svg
                    width="15"
                    height="15"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    aria-hidden="true"
                  >
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                ) : (
                  <svg
                    width="15"
                    height="15"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    aria-hidden="true"
                  >
                    <rect x="9" y="9" width="11" height="11" rx="2" />
                    <path d="M5 15V5a2 2 0 0 1 2-2h10" />
                  </svg>
                )}
                {label}
              </Button>

              <Button as="a" href={profile.cv} variant="outlineLight" download>
                {t.contact.downloadCv}
              </Button>
            </div>

            {/* Umpan balik untuk pembaca layar */}
            <p role="status" aria-live="polite" className="sr-only">
              {state === 'copied' ? t.contact.copied : state === 'failed' ? t.contact.copyFailed : ''}
            </p>
          </div>

          <div data-reveal>
            <Eyebrow light>{t.contact.linksTitle}</Eyebrow>
            <ul className="mt-5 divide-y divide-white/12 border-y border-white/12">
              {links.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex min-h-[52px] items-baseline justify-between gap-4 py-3.5 transition-colors hover:text-terracotta-300"
                  >
                    <span className="text-sm font-semibold text-cream-50">{l.label}</span>
                    <span className="text-right text-xs text-[#a89c8e]">{l.handle}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
