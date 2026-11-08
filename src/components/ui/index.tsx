import { useEffect, useRef, useState, type ReactNode } from 'react'

type Variant = 'primary' | 'secondary' | 'ghost' | 'inverse' | 'outlineLight'

const base =
  'inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition-colors duration-200 min-h-[44px]'

/**
 * Tombol utama digelapkan ke terracotta-700 (#825647).
 * Alasan terukur: putih di terracotta-500 hanya 3.10 (gagal WCAG AA),
 * sedangkan di terracotta-700 = 6.03 (lulus). Palet tidak berubah,
 * hanya nada yang dipakai untuk tombol.
 */
const variants: Record<Variant, string> = {
  primary: 'bg-terracotta-700 text-cream-50 hover:bg-terracotta-800',
  secondary: 'border border-cream-300 text-ink-800 hover:border-terracotta-400 hover:bg-cream-100',
  ghost: 'text-terracotta-700 hover:bg-cream-100',
  /* untuk dipakai di dalam blok gelap */
  inverse: 'bg-cream-50 text-ink-900 hover:bg-cream-200',
  outlineLight: 'border border-white/25 text-cream-50 hover:border-white/60 hover:bg-white/10',
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
  /* Nada dinaikkan agar label kecil (12px) tetap lulus AA:
     sage-700 di sage-200 = 5.31 · terracotta-700 di campuran t300 = 4.89 */
  const tones = {
    sage: 'bg-sage-200 text-sage-700 border-sage-300',
    terracotta: 'bg-terracotta-300/30 text-terracotta-700 border-terracotta-300',
  }
  return (
    <span className={`inline-block rounded-full border px-3 py-1 text-xs font-medium ${tones[tone]}`}>
      {children}
    </span>
  )
}

/** Label kecil bergaya editorial: kapital, huruf renggang. */
export function Eyebrow({ children, light = false }: { children: ReactNode; light?: boolean }) {
  return (
    <p className={`eyebrow ${light ? 'text-terracotta-300' : 'text-terracotta-700'}`}>{children}</p>
  )
}

/**
 * Judul dengan topeng: kata naik dari balik garis potong saat dimuat.
 * Teknik yang dipakai aeqonis.tech — murni CSS, tanpa library animasi.
 * `reduce` dipatuhi lewat kelas CSS (lihat @media di index.css).
 */
export function MaskTitle({
  lines,
  as: Tag = 'h1',
  className = 'display-xl',
}: {
  lines: string[]
  as?: 'h1' | 'h2' | 'p'
  className?: string
}) {
  return (
    <Tag className={className}>
      {lines.map((line, i) => (
        <span key={i} className="mask-line">
          <span style={{ animationDelay: `${0.06 + i * 0.09}s` }}>{line}</span>
        </span>
      ))}
    </Tag>
  )
}

/**
 * Angka yang berhitung naik saat pertama terlihat.
 * Dihormati prefers-reduced-motion: nilai akhir langsung ditampilkan.
 */
export function Counter({ value, duration = 1100 }: { value: string; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null)
  const done = useRef(false)
  const [shown, setShown] = useState<number | null>(null)

  /* Ambil bagian angkanya saja (termasuk desimal koma/titik);
     awalan dan akhiran apa pun dipertahankan apa adanya. */
  const m = /^(\D*?)(\d+(?:[.,]\d+)?)(\D*)$/.exec(value)
  const prefix = m?.[1] ?? ''
  const raw = m?.[2] ?? ''
  const suffix = m?.[3] ?? ''
  const sep = raw.includes(',') ? ',' : '.'
  const decimals = /[.,]/.test(raw) ? (raw.split(/[.,]/)[1] ?? '').length : 0
  const target = Number(raw.replace(',', '.'))

  const format = (n: number) => n.toFixed(decimals).replace('.', sep)

  useEffect(() => {
    if (!m) return
    const el = ref.current
    if (!el) return

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) {
      setShown(target)
      done.current = true
      return
    }

    let raf = 0
    const obs = new IntersectionObserver(
      (entries) => {
        if (!entries[0]?.isIntersecting || done.current) return
        done.current = true
        obs.disconnect()
        const t0 = performance.now()
        const tick = (now: number) => {
          const p = Math.min(1, (now - t0) / duration)
          /* easing keluar: cepat di awal, tenang di akhir */
          const eased = 1 - Math.pow(1 - p, 3)
          setShown(eased * target)
          if (p < 1) raf = requestAnimationFrame(tick)
        }
        raf = requestAnimationFrame(tick)
      },
      { threshold: 0.4 },
    )
    obs.observe(el)

    return () => {
      obs.disconnect()
      cancelAnimationFrame(raf)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value])

  return (
    <span ref={ref}>
      {prefix}
      {format(shown === null ? 0 : shown)}
      {suffix}
    </span>
  )
}

/**
 * Pita berjalan. Isi digandakan agar sambungannya tak terlihat,
 * lalu digeser tepat 50% supaya mulus.
 */
export function Marquee({
  items,
  dark = false,
  separator = '·',
}: {
  items: string[]
  dark?: boolean
  separator?: string
}) {
  const Row = ({ hidden = false }: { hidden?: boolean }) => (
    <ul className="flex shrink-0 items-center" aria-hidden={hidden || undefined}>
      {items.map((it) => (
        <li key={it} className="flex items-center whitespace-nowrap">
          <span className="px-5 text-sm font-medium tracking-wide">{it}</span>
          <span aria-hidden="true" className="opacity-40">
            {separator}
          </span>
        </li>
      ))}
    </ul>
  )

  return (
    <div className={`marquee py-4 ${dark ? 'bg-ink-950 text-cream-100' : 'bg-terracotta-300 text-ink-900'}`}>
      {/* Isi digandakan agar sambungan tak terlihat; salinan kedua
          disembunyikan dari pembaca layar supaya tidak dibaca dua kali. */}
      <div className="marquee-track">
        <Row />
        <Row hidden />
      </div>
    </div>
  )
}

export function Section({
  id,
  title,
  lead,
  eyebrow,
  children,
  tone = 'plain',
}: {
  id: string
  title: string
  lead?: string
  eyebrow?: string
  children: ReactNode
  tone?: 'plain' | 'alt' | 'dark'
}) {
  const toneCls =
    tone === 'dark' ? 'anchor-dark grain' : tone === 'alt' ? 'bg-cream-100 hairline border-y' : ''

  const leadCls = tone === 'dark' ? 'text-[#cfc4b6]' : 'text-ink-600'

  return (
    <section id={id} className={`scroll-mt-24 py-20 md:py-28 ${toneCls}`}>
      <div className="wrap">
        <header className="mb-12 max-w-3xl" data-reveal>
          {eyebrow ? <Eyebrow light={tone === 'dark'}>{eyebrow}</Eyebrow> : null}
          <h2 className={`display-lg mt-4 ${tone === 'dark' ? 'text-cream-50' : ''}`}>{title}</h2>
          {lead ? <p className={`prose-narrow mt-4 text-base ${leadCls}`}>{lead}</p> : null}
        </header>
        {children}
      </div>
    </section>
  )
}
