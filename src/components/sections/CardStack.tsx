import { useCallback, useEffect, useRef, useState } from 'react'
import { useLocale } from '../../lib/locale'
import { projects } from '../../data/projects'
import { Eyebrow, Counter, Section } from '../ui'
import { PillButton } from '../ui/PillButton'
import type { CSSProperties } from 'react'

/**
 * Tumpukan kartu proyek.
 *
 * Mekanika gerak mengikuti referensi "dropping cards stack": kartu depan
 * jatuh lurus ke bawah keluar tumpukan, kartu di belakangnya maju satu
 * slot, lalu kartu yang jatuh itu naik lagi dari bawah ke slot paling
 * belakang.
 *
 * Yang berbeda dari referensi (keputusan user, 7 Nov 2026):
 *   · tanpa GSAP — gerak ditulis murni CSS/JS, seperti seksi lain
 *   · warna ikut palet proyek (krem + terracotta), bukan navy-violet
 *
 * Susunan isi kartu sesuai permintaan user:
 *   kiri atas tangkapan layar · kanan deskripsi · kiri bawah nama proyek
 *
 * Model posisi: `front` adalah nomor slot yang sedang di depan. Jarak
 * sebuah kartu dari depan = slot(indeksKartu − front). Memajukan `front`
 * satu langkah otomatis membuat SEMUA kartu berpindah satu slot, jadi
 * tidak ada nomor yang perlu digeser satu per satu.
 */

type Pose = { x: number; y: number; r: number; s: number; z: number }
type Move = { i: number; start: number; dur: number; from: Pose; to: Pose }

/* Ukuran tumpukan */
const OFFSET = 24 // geser ke kanan per langkah (px) — rujukan memakai ≈22px
const PEEK = 11 // turun sedikit per langkah (px) supaya tepinya terlihat
const TILT = 1.3 // derajat per langkah
const STEP_SCALE = 0.035 // 3,5% mengecil per langkah
const DROP_TILT = 7
const RISE_TILT = 5

/* Waktu (ms) */
const DROP_MS = 550
const STEP_MS = 800
const STEP_AT = 180
const STAGGER = 50
const BACK_AT = 550
const BACK_MS = 900
const AUTOPLAY_MS = 2400
const DRAG_RATIO = 0.25 // 25% tinggi kartu
const THROW_SPEED = 0.55 // px/ms

/* Peredam: tenang di akhir (expo.out) & memantul (elastis) */
const LAND_EASE = 'cubic-bezier(0.16, 1, 0.3, 1)'
const SNAP_EASE = 'cubic-bezier(0.34, 1.56, 0.64, 1)'

/* Nada kartu: berselang-seling, semuanya dari palet proyek.
   terracotta-700 dipakai untuk nada gelap — putih di atasnya terukur
   6.03, jadi lulus WCAG AA. */
const TONES = [
  { c: 'var(--color-cream-100)', tone: 'light' },
  { c: 'var(--color-terracotta-700)', tone: 'dark' },
] as const

const slot = (k: number, n: number) => ((k % n) + n) % n

export function CardStack() {
  const { t, locale } = useLocale()
  const list = projects[locale]
  const n = list.length

  const cardsRef = useRef<(HTMLDivElement | null)[]>([])
  const stageRef = useRef<HTMLDivElement>(null)

  const front = useRef(0)
  const bump = useRef(0) // penambah z supaya kartu terdepan tetap di atas

  const raf = useRef(0)
  const timers = useRef<number[]>([])
  const busy = useRef(false)

  const reduced = useRef(false)
  const hovering = useRef(false)
  const onScreen = useRef(true)
  const dragging = useRef(false)

  const [hintOn, setHintOn] = useState(true)
  const [frontIdx, setFrontIdx] = useState(0)
  const hintOff = useCallback(() => setHintOn(false), [])

  const cardH = () => cardsRef.current[0]?.offsetHeight || 380

  /** Pose kartu yang `k` langkah di belakang kartu depan. */
  const poseOf = useCallback(
    (k: number): Pose =>
      k === 0
        ? { x: 0, y: 0, r: 0, s: 1, z: n }
        : { x: OFFSET * k, y: PEEK * k, r: -TILT * k, s: 1 - STEP_SCALE * k, z: n - k },
    [n],
  )

  const apply = useCallback((i: number, p: Pose) => {
    const el = cardsRef.current[i]
    if (!el) return
    el.style.transition = 'none'
    el.style.transitionDelay = '0ms'
    el.style.transform = `translate3d(${p.x}px, ${p.y}px, 0) rotate(${p.r}deg) scale(${p.s})`
    el.style.zIndex = String(p.z)
  }, [])

  /** Semua kartu ke posisi diamnya, tanpa animasi. */
  const settle = useCallback(() => {
    for (let i = 0; i < n; i++) apply(i, poseOf(slot(i - front.current, n)))
    setFrontIdx(slot(front.current, n))
    /* Di ponsel kartu punya tinggi isi sendiri (bukan rasio tetap), jadi
       tinggi panggung harus diukur — kalau tidak, kartu terpotong.
       Di layar lebar tinggi panggung sudah pasti dari CSS. */
    const stage = stageRef.current
    const f = cardsRef.current[slot(front.current, n)]
    if (!stage || !f) return
    if (window.matchMedia('(max-width: 640px)').matches) {
      stage.style.height = `${f.offsetHeight + PEEK * (n - 1) + 6}px`
    } else {
      stage.style.height = ''
    }
  }, [n, poseOf, apply])

  /** Satu langkah: dir = 1 (berikutnya) atau -1 (sebelumnya). */
  const run = useCallback(
    (dir: 1 | -1) => {
      if (n < 2 || busy.current) return
      hintOff()

      if (reduced.current) {
        front.current += dir
        settle()
        return
      }

      busy.current = true
      const h = cardH()

      /* Rekam keadaan sekarang, lalu majukan `front`. */
      const froms = cardsRef.current.map((_, i) => poseOf(slot(i - front.current, n)))
      front.current += dir

      const moves: Move[] = []
      let end = 0
      let returnIdx = -1 // kartu yang jatuh lalu naik kembali

      for (let i = 0; i < n; i++) {
        const k = slot(i - front.current, n) // posisi barunya

        if (k === n - 1) {
          /* Kartu yang tadinya terdepan (kini paling belakang): jatuh
             keluar tumpukan, lalu naik dari bawah. */
          const from: Pose = { ...froms[i], z: n + 2 }
          const down: Pose = { ...from, y: from.y + h * 1.25, x: from.x - 2, r: -DROP_TILT }
          moves.push({ i, start: 0, dur: DROP_MS, from, to: down })
          moves.push({ i, start: BACK_AT, dur: BACK_MS, from: { ...down, r: dir * RISE_TILT }, to: poseOf(k) })
          returnIdx = i
          end = Math.max(end, BACK_AT + BACK_MS)
        } else {
          /* Urutan maju: makin dekat ke depan, makin cepat mulai. */
          const rank = dir > 0 ? k + 1 : n - 1 - k
          const start = STEP_AT + rank * STAGGER
          moves.push({ i, start, dur: STEP_MS, from: froms[i], to: poseOf(k) })
          end = Math.max(end, start + STEP_MS)
        }
      }

      for (const m of moves) {
        const el = cardsRef.current[m.i]
        if (!el) continue
        el.style.transition = `transform ${m.dur}ms ${LAND_EASE}`
        el.style.transitionDelay = `${m.start}ms`
        el.style.zIndex = String(m.from.z)
      }

      /* Kartu yang kembali harus lewat DI BELAKANG tumpukan saat naik,
         bukan menutupi kartu depan yang baru. */
      if (returnIdx >= 0) {
        const el = cardsRef.current[returnIdx]
        timers.current.push(
          window.setTimeout(() => {
            if (el) el.style.zIndex = '0'
          }, BACK_AT),
        )
      }

      /* Dua bingkai: biarkan peramban membaca gaya awal dulu, supaya
         transisinya benar-benar berjalan alih-alih melompat. */
      raf.current = requestAnimationFrame(() =>
        requestAnimationFrame(() => {
          for (const m of moves) {
            const el = cardsRef.current[m.i]
            if (!el) continue
            el.style.transform = `translate3d(${m.to.x}px, ${m.to.y}px, 0) rotate(${m.to.r}deg) scale(${m.to.s})`
          }
          timers.current.push(
            window.setTimeout(() => {
              /* Kunci ke grid diam, lalu angkat z kartu terdepan yang baru. */
              const z = ++bump.current
              for (let i = 0; i < n; i++) {
                const el = cardsRef.current[i]
                if (!el) continue
                const p = poseOf(slot(i - front.current, n))
                el.style.transition = 'none'
                el.style.transitionDelay = '0ms'
                el.style.transform = `translate3d(${p.x}px, ${p.y}px, 0) rotate(${p.r}deg) scale(${p.s})`
                el.style.zIndex = String(p.z + z)
              }
              setFrontIdx(slot(front.current, n))
              busy.current = false
            }, end + 60),
          )
        }),
      )
    },
    [n, poseOf, hintOff, settle],
  )

  /* ---------- pasang awal, ukur ulang, hormati reduce-motion ---------- */
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const sync = () => {
      reduced.current = mq.matches
      settle()
    }
    sync()
    mq.addEventListener('change', sync)
    window.addEventListener('resize', settle)
    return () => {
      mq.removeEventListener('change', sync)
      window.removeEventListener('resize', settle)
      cancelAnimationFrame(raf.current)
      timers.current.forEach((id) => window.clearTimeout(id))
    }
  }, [settle])

  /* ---------- autoplay 2,4s: berhenti saat hover, tarik, luar layar ---------- */
  useEffect(() => {
    if (n < 2) return
    const id = window.setInterval(() => {
      if (hovering.current || dragging.current || !onScreen.current || reduced.current) return
      run(1)
    }, AUTOPLAY_MS)
    return () => window.clearInterval(id)
  }, [n, run])

  useEffect(() => {
    const el = stageRef.current
    if (!el) return
    const obs = new IntersectionObserver((es) => {
      onScreen.current = es[0]?.isIntersecting ?? true
    })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  /* ---------- papan tombol ---------- */
  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowRight') {
      e.preventDefault()
      run(1)
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault()
      run(-1)
    }
  }

  /* ---------- tarik / lempar kartu terdepan ---------- */
  const drag = useRef({ on: false, id: 0, x0: 0, y0: 0, t0: 0, dy: 0 })

  /** Kartu yang sedang di depan — inilah yang boleh diseret. */
  const frontEl = () => cardsRef.current[slot(front.current, n)] ?? null

  const onDown = (e: React.PointerEvent) => {
    if (busy.current || reduced.current) return
    /* Tautan & tombol di dalam kartu harus tetap bisa diklik biasa */
    if ((e.target as HTMLElement).closest('a, button')) return
    const el = frontEl()
    if (!el) return
    el.setPointerCapture(e.pointerId)
    drag.current = { on: true, id: e.pointerId, x0: e.clientX, y0: e.clientY, t0: performance.now(), dy: 0 }
    dragging.current = true
    hintOff()
  }

  const onMove = (e: React.PointerEvent) => {
    const d = drag.current
    if (!d.on || e.pointerId !== d.id) return
    const el = frontEl()
    if (!el) return
    d.dy = e.clientY - d.y0
    const dx = (e.clientX - d.x0) * 0.35
    const rot = Math.max(-12, Math.min(12, dx * 0.06 + d.dy * 0.02))
    el.style.transition = 'none'
    el.style.transform = `translate3d(${dx}px, ${d.dy}px, 0) rotate(${rot}deg) scale(1)`
  }

  const onUp = (e: React.PointerEvent) => {
    const d = drag.current
    if (!d.on || e.pointerId !== d.id) return
    d.on = false
    dragging.current = false
    const el = frontEl()
    el?.releasePointerCapture?.(e.pointerId)

    const dist = Math.abs(d.dy)
    const speed = dist / Math.max(1, performance.now() - d.t0)
    /* Lempar ke bawah, atau lewat 25% tinggi kartu, atau cukup cepat */
    const thrown = d.dy > 0 && (dist > cardH() * DRAG_RATIO || speed > THROW_SPEED)
    if (!el) return

    if (thrown) {
      /* Kembalikan ke titik diam dulu supaya jatuhnya menyambung mulus */
      el.style.transition = 'none'
      el.style.transform = 'translate3d(0px, 0px, 0) rotate(0deg) scale(1)'
      run(1)
    } else {
      /* Belum cukup jauh: kembali dengan pantulan halus */
      el.style.transition = `transform 620ms ${SNAP_EASE}`
      el.style.transform = 'translate3d(0px, 0px, 0) rotate(0deg) scale(1)'
    }
  }

  const stageStyle = { '--stack-n': String(n) } as CSSProperties

  return (
    <Section id="proyek" title={t.projects.title} eyebrow={t.projects.eyebrow} lead={t.projects.lead}>
      <div className="stack-wrap">
        {/* Pembungkus pemotong: kartu yang jatuh hilang di bawah, tidak
            menutupi tombol kendali atau blok angka di bawahnya. */}
        <div className="stack-clip">
          <div
            ref={stageRef}
            className="stack-stage"
            style={stageStyle}
            tabIndex={0}
            role="group"
            aria-roledescription="tumpukan kartu"
            aria-label={`${t.projects.title} — panah kiri/kanan untuk berpindah`}
            onKeyDown={onKey}
            onMouseEnter={() => (hovering.current = true)}
            onMouseLeave={() => (hovering.current = false)}
            onPointerDown={onDown}
            onPointerMove={onMove}
            onPointerUp={onUp}
            onPointerCancel={onUp}
          >
            {list.map((p, i) => {
              const accent = TONES[i % TONES.length]
              const isFront = i === frontIdx
              return (
                <div
                  key={p.slug}
                  ref={(el) => {
                    cardsRef.current[i] = el
                  }}
                  className="stack-card"
                  data-tone={accent.tone}
                  data-front={isFront || undefined}
                  style={{ '--c': accent.c } as CSSProperties}
                  inert={!isFront}
                >
                  <div className="stack-card-inner">
                    {/* kiri atas: tangkapan layar */}
                    <div className="stack-shot">
                      <img
                        src={p.cover}
                        alt={`Tangkapan layar ${p.title}`}
                        loading={i === 0 ? 'eager' : 'lazy'}
                        decoding="async"
                        width={1280}
                        height={800}
                        draggable={false}
                      />
                    </div>

                    {/* kanan: deskripsi */}
                    <div className="stack-desc">
                      <p className="stack-meta">
                        {p.year}
                        <span aria-hidden="true"> · </span>
                        {p.status}
                      </p>
                      <p className="stack-oneliner">{p.oneLiner}</p>
                      <ul className="stack-stack">
                        {p.stack.slice(0, 4).map((s) => (
                          <li key={s}>{s}</li>
                        ))}
                      </ul>
                    </div>

                    {/* kiri bawah: nama proyek + tautan detail */}
                    <div className="stack-foot">
                      <h3 className="stack-title">{p.title}</h3>
                      <PillButton to={`/proyek/${p.slug}`} label={t.projects.viewDetail} />
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* kendali: panah samar di kiri, panah gelap di kanan */}
        <div className="stack-nav">
          <button type="button" className="stack-btn stack-btn-ghost" onClick={() => run(-1)} aria-label={t.projects.prev}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M19 12H5m0 0l5-5m-5 5l5 5" />
            </svg>
          </button>
          <button type="button" className="stack-btn stack-btn-solid" onClick={() => run(1)} aria-label={t.projects.next}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M5 12h14m0 0l-5-5m5 5l-5 5" />
            </svg>
          </button>

          {hintOn ? (
            <span className="stack-hint">
              <span className="stack-hint-text">{t.projects.dragHint}</span>
            </span>
          ) : null}
        </div>
      </div>

      {/* Ringkasan angka: dikumpulkan dari data proyek, bukan diketik ulang */}
      <div className="mt-12 anchor-dark grain rounded-card px-8 py-10 sm:px-12" data-reveal>
        <Eyebrow light>{t.projects.factsTitle}</Eyebrow>
        <dl className="mt-8 grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-6">
          {list[0]?.results.map((r) => (
            <div key={r.label}>
              <dd className="font-display text-4xl text-terracotta-300 sm:text-5xl">
                <Counter value={r.value} />
              </dd>
              <dt className="mt-2 text-xs leading-snug text-[#a89c8e]">{r.label}</dt>
            </div>
          ))}
        </dl>
      </div>
    </Section>
  )
}
