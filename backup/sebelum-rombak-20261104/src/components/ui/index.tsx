import type { ReactNode } from 'react'

type Variant = 'primary' | 'secondary' | 'ghost'

const base =
  'inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition-colors duration-200 min-h-[44px]'

const variants: Record<Variant, string> = {
  primary: 'bg-terracotta-500 text-cream-50 hover:bg-terracotta-600 shadow-sm',
  secondary:
    'bg-cream-100 text-ink-800 border border-cream-300 hover:bg-cream-200 hover:border-terracotta-300',
  ghost: 'text-terracotta-700 hover:bg-cream-100',
}

export function Button({
  as = 'button',
  href,
  variant = 'primary',
  children,
  onClick,
  type = 'button',
  download,
  ariaLabel,
  external,
}: {
  as?: 'button' | 'a'
  href?: string
  variant?: Variant
  children: ReactNode
  onClick?: () => void
  type?: 'button' | 'submit'
  download?: boolean
  ariaLabel?: string
  external?: boolean
}) {
  const cls = `${base} ${variants[variant]}`

  if (as === 'a') {
    return (
      <a
        href={href}
        className={cls}
        download={download}
        aria-label={ariaLabel}
        {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      >
        {children}
      </a>
    )
  }

  return (
    <button type={type} className={cls} onClick={onClick} aria-label={ariaLabel}>
      {children}
    </button>
  )
}

export function Chip({ children, tone = 'sage' }: { children: ReactNode; tone?: 'sage' | 'terracotta' }) {
  const tones = {
    sage: 'bg-sage-200/60 text-sage-600 border-sage-300',
    terracotta: 'bg-terracotta-300/30 text-terracotta-700 border-terracotta-300',
  }
  return (
    <span
      className={`inline-block rounded-full border px-3 py-1 text-xs font-medium ${tones[tone]}`}
    >
      {children}
    </span>
  )
}

export function Section({
  id,
  title,
  lead,
  children,
  alt = false,
}: {
  id: string
  title: string
  lead?: string
  children: ReactNode
  alt?: boolean
}) {
  return (
    <section
      id={id}
      className={`scroll-mt-24 py-16 md:py-24 ${alt ? 'bg-cream-100' : ''}`}
    >
      <div className="wrap">
        <header className="mb-10 max-w-2xl" data-reveal>
          <h2 className="text-3xl md:text-4xl">{title}</h2>
          {lead ? <p className="mt-3 text-ink-600">{lead}</p> : null}
        </header>
        {children}
      </div>
    </section>
  )
}
