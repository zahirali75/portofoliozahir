import { useEffect, useMemo, useRef, useState } from 'react'
import { useLocale } from '../../lib/locale'
import { profile } from '../../data'

/* =====================================================================
   Kartu identitas yang digantung tali.

   Geraknya bukan animasi keyframe, tapi simulasi bandul sungguhan:
       θ'' = −(g / L) · sin θ − ζ · θ'
   sehingga kartu mendarat, berayun mereda, dan bisa ditarik lalu
   dilepas dengan kecepatan lemparan pengunjung.

   Transform ditulis langsung ke DOM lewat requestAnimationFrame
   (bukan state React) supaya 60fps tanpa render ulang tiap frame.
   ===================================================================== */

const L_MIN = 54 /* panjang tali saat kartu masih menggantung di atas */
const STRAP_MIN = 12 /* panjang tali terpendek saat kartu sudah turun */
const GAP_MIN = 18 /* ruang napas minimum di bawah kartu */
const G = 2600 /* px/s² — ω0 = √(G/L) ≈ 3,8 rad/s saat L = 180px */
const DAMP = 0.95 /* redaman: ayunan mereda dalam ±4 detik */
const MAX_ANGLE = 0.62 /* ±35° batas tarikan */
const DROP_MS = 620 /* lama kartu jatuh sampai tali tegang */

type Mode = 'drop' | 'swing' | 'drag' | 'return' | 'idle'

export function HeroIdCard() {
  const { t, locale } = useLocale()
  /* Petunjuk "tarik kartunya" hanya perlu sekali: hilang setelah
     pengunjung benar-benar menyentuh kartunya. */
  const [showHint, setShowHint] = useState(true)

  const stageRef = useRef<HTMLDivElement>(null)
  const groupRef = useRef<HTMLDivElement>(null)
  const cardRef = useRef<HTMLDivElement>(null)
  const svgRef = useRef<SVGSVGElement>(null)
  const hintRef = useRef<HTMLDivElement>(null)
  const strapRef = useRef<SVGPathElement>(null)
  const strapInnerRef = useRef<SVGPathElement>(null)

  const sim = useRef({
    theta: 0,
    omega: 0,
    len: L_MIN,
    lenStart: L_MIN,
    mode: 'drop' as Mode,
    t0: 0,
    last: 0,
    lastMove: 0,
    dragging: false,
    pointerId: -1,
  })

  /* Pola garis di kaki kartu: murni hiasan, diturunkan dari nama
     supaya selalu sama setiap kali halaman dibuka (bukan data palsu). */
  const bars = useMemo(() => {
    let h = 7
    for (const c of profile.name) h = (h * 31 + c.charCodeAt(0)) % 9973
    return Array.from({ length: 26 }, () => {
      h = (h * 1103515245 + 12345) % 2147483648
      return 1 + (h % 3)
    })
  }, [])

  useEffect(() => {
    const stage = stageRef.current
    const group = groupRef.current
    const card = cardRef.current
    const svg = svgRef.current
    const strap = strapRef.current
    const strapInner = strapInnerRef.current
    if (!stage || !group || !card || !svg || !strap || !strapInner) return

    const s = sim.current
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    let maxLen = 260
    const measure = () => {
      const cardH = card.offsetHeight
      /* Panggung tumbuh bila kartu lebih tinggi dari tinggi CSS-nya
         (terjadi di layar ponsel) supaya kartu tidak menjorok keluar
         dan menimpa tonggak angka di bawahnya. Sisanya hanya perlu
         cukup untuk tali + ruang napas — bukan 96px seperti dulu, yang
         membuat hero tumbuh dan tonggak angka terpotong di layar 720px. */
      const need = cardH + 76
      if (need > stage.clientHeight) stage.style.minHeight = `${need}px`

      /* Rel kartu bisa dinaikkan lewat CSS (--rail-up): tali jadi lebih
         panjang tanpa menggeser kartu, karena panjang tali ikut naik
         sebanyak itu. Semua hitungan di bawah memakai posisi grup
         yang sebenarnya, jadi nilai itu tidak perlu diketahui di sini. */
      const grOff = group.offsetTop

      /* Ruang yang tersedia: sisa kolom setelah tinggi kartu dan ruang
         napas di bawahnya. */
      const room = Math.max(STRAP_MIN, stage.clientHeight - cardH - GAP_MIN - grOff)

      /* Di layar lebar kartu berdiri di samping blok teks: panjang tali
         dipilih supaya tepi atas kartu jatuh sejajar dengan tepi atas
         nama besar, dan sisa ruang kolom di atasnya dipakai sebagai tali
         — bukan kartu yang ditempel ke dasar kolom (dulu begitu, jadi ada
         ruang mati besar di atas dan animasi jatuhnya cuma sejengkal).
         Di ponsel (satu kolom) tata letak ini tidak berlaku, jadi kartu
         memakai seluruh ruang yang tersedia. */
      let len = room
      if (window.matchMedia('(min-width: 1024px)').matches) {
        const name = stage.closest('section')?.querySelector('.display-xl')
        if (name) {
          const nr = name.getBoundingClientRect()
          const sr = stage.getBoundingClientRect()
          const target = nr.top - (sr.top + grOff)
          len = Math.max(STRAP_MIN, Math.min(target, room))
        }
      }
      maxLen = len
      /* Saat tidak sedang jatuh/ditarik, panjang tali harus persis nilai
         terbaru — bukan hanya boleh menyusut. Pengukuran pertama terjadi
         sebelum tata letak nama selesai (target masih negatif → tali
         mentok minimum), jadi tanpa penulisan ulang kartu berhenti di
         tempat yang salah. */
      if (s.mode !== 'drop' && s.mode !== 'drag') s.len = maxLen
    }
    measure()
    /* ukur ulang setelah gambar & font selesai ditata (tinggi kartu
       bisa berubah sedikit dari perkiraan pertama) */
    requestAnimationFrame(measure)
    requestAnimationFrame(() => requestAnimationFrame(measure))
    /* Posisi nama besar bergantung pada font; begitu font siap, hitung
       lagi supaya pusat kartu benar-benar jatuh sejajar pusat nama. */
    document.fonts?.ready.then(() => measure())
    window.addEventListener('resize', measure)
    const ro = new ResizeObserver(measure)
    ro.observe(stage)
    ro.observe(card)

    if (reduce) {
      s.mode = 'idle'
      s.len = maxLen
      s.theta = 0
      s.omega = 0
    } else {
      s.mode = 'drop'
      s.lenStart = Math.min(L_MIN, maxLen * 0.25)
      s.len = s.lenStart
      s.t0 = performance.now()
      s.last = 0
    }

    /* ---------- gambar satu bingkai ---------- */
    let cx = 0
    const paint = () => {
      const w = group.clientWidth || 240
      if (w !== cx) cx = w / 2
      const deg = (s.theta * 180) / Math.PI
      group.style.transform = `translateX(-50%) rotate(${deg.toFixed(3)}deg)`
      card.style.marginTop = `${s.len.toFixed(1)}px`
      svg.style.height = `${s.len.toFixed(1)}px`

      /* Tali sedikit melengkung melawan arah ayun — gerak sekunder
         supaya terasa seperti tali sungguhan, bukan batang kaku. */
      const bend = Math.max(-20, Math.min(20, -s.omega * 16))
      const l = s.len
      const d = `M ${cx} 0 C ${cx + bend} ${l * 0.34}, ${cx + bend} ${l * 0.68}, ${cx} ${l}`
      strap.setAttribute('d', d)
      strapInner.setAttribute('d', d)
    }

    /* ---------- fisika ---------- */
    const step = (dt: number) => {
      const sub = 4
      const h = dt / sub
      for (let i = 0; i < sub; i++) {
        const acc = -(G / s.len) * Math.sin(s.theta) - DAMP * s.omega
        s.omega += acc * h
        s.theta += s.omega * h
      }
    }

    let raf = 0
    let visible = true
    const frame = (now: number) => {
      const dt = Math.min(0.032, s.last ? (now - s.last) / 1000 : 0.016)
      s.last = now

      if (s.mode === 'drop') {
        const p = Math.min(1, (now - s.t0) / DROP_MS)
        /* jatuh makin cepat (p²) lalu tali menegang */
        s.len = s.lenStart + (maxLen - s.lenStart) * p * p
        if (p >= 1) {
          s.mode = 'swing'
          s.theta = -0.045
          s.omega = 0.85 /* sentakan saat tali tegang → mulai berayun (±13°) */
          /* Ukur ulang sekarang: tata letak nama & font sudah pasti
             selesai, jadi panjang tali istirahat bisa dihitung benar. */
          measure()
        }
      } else if (s.mode === 'swing') {
        step(dt)
        if (Math.abs(s.theta) < 0.0009 && Math.abs(s.omega) < 0.0009) {
          s.theta = 0
          s.omega = 0
          s.mode = 'idle'
        }
      } else if (s.mode === 'return') {
        s.theta += (0 - s.theta) * Math.min(1, dt * 7)
        s.omega = 0
        if (Math.abs(s.theta) < 0.002) {
          s.theta = 0
          s.mode = 'idle'
        }
      }

      paint()
      raf = requestAnimationFrame(frame)
    }
    raf = requestAnimationFrame(frame)

    /* Hentikan loop saat hero tidak terlihat — hemat baterai. */
    const io = new IntersectionObserver(
      (entries) => {
        const on = entries[0]?.isIntersecting ?? true
        if (on === visible) return
        visible = on
        if (on) {
          s.last = 0
          raf = requestAnimationFrame(frame)
        } else {
          cancelAnimationFrame(raf)
        }
      },
      { threshold: 0.05 },
    )
    io.observe(stage)

    /* ---------- interaksi: tarik & lepas ---------- */
    const pivot = () => {
      const r = stage.getBoundingClientRect()
      return { x: r.left + r.width / 2, y: r.top }
    }
    const clamp = (v: number, lo: number, hi: number) => Math.max(lo, Math.min(hi, v))

    const onDown = (e: PointerEvent) => {
      if (e.button !== undefined && e.button !== 0) return
      const r = card.getBoundingClientRect()
      /* Abaikan tarikan pada bagian tali di atas kartu */
      if (e.clientY < r.top - 4) return
      /* Sekali disentuh, petunjuknya tidak diperlukan lagi. */
      setShowHint(false)
      s.dragging = true
      s.pointerId = e.pointerId
      s.mode = 'drag'
      s.lastMove = performance.now()
      s.omega = 0
      card.setPointerCapture(e.pointerId)
      card.style.cursor = 'grabbing'
      e.preventDefault()
    }

    const onMove = (e: PointerEvent) => {
      if (!s.dragging || e.pointerId !== s.pointerId) return
      const p = pivot()
      const dx = e.clientX - p.x
      const dy = Math.max(40, e.clientY - p.y)
      const target = clamp(Math.atan2(dx, dy), -MAX_ANGLE, MAX_ANGLE)
      const now = performance.now()
      const dt = Math.max(0.008, (now - s.lastMove) / 1000)
      s.lastMove = now
      s.omega = clamp((target - s.theta) / dt, -6, 6)
      s.theta = target
    }

    const onUp = (e: PointerEvent) => {
      if (!s.dragging || e.pointerId !== s.pointerId) return
      s.dragging = false
      card.style.cursor = 'grab'
      if (reduce) {
        s.mode = 'return'
      } else {
        s.mode = 'swing'
        s.omega = clamp(s.omega, -5, 5)
      }
      s.last = 0
      if (card.hasPointerCapture(e.pointerId)) card.releasePointerCapture(e.pointerId)
    }

    /* Papan tombol: kartu bisa difokus lalu didorong dengan panah. */
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight' && e.key !== ' ') return
      e.preventDefault()
      setShowHint(false)
      if (reduce) return
      s.mode = 'swing'
      s.last = 0
      if (e.key === 'ArrowLeft') s.omega -= 1.7
      else if (e.key === 'ArrowRight') s.omega += 1.7
      else s.omega += Math.sign(s.theta || 1) * 2.1
    }

    card.addEventListener('pointerdown', onDown)
    card.addEventListener('pointermove', onMove)
    card.addEventListener('pointerup', onUp)
    card.addEventListener('pointercancel', onUp)
    card.addEventListener('keydown', onKey)
    card.style.cursor = 'grab'

    return () => {
      cancelAnimationFrame(raf)
      io.disconnect()
      ro.disconnect()
      window.removeEventListener('resize', measure)
      card.removeEventListener('pointerdown', onDown)
      card.removeEventListener('pointermove', onMove)
      card.removeEventListener('pointerup', onUp)
      card.removeEventListener('pointercancel', onUp)
      card.removeEventListener('keydown', onKey)
    }
  }, [])

  return (
    <div
      ref={stageRef}
      className="idcard-stage relative w-full select-none"
      aria-hidden="false"
    >
      {/* Rel tempat tali dikaitkan */}
      <div
        aria-hidden="true"
        className="absolute left-1/2 top-0 h-px w-24 -translate-x-1/2 bg-white/20"
      />
      <div
        aria-hidden="true"
        className="absolute left-1/2 top-0 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/30 bg-ink-900"
      />

      <div
        ref={groupRef}
        className="idcard-group absolute left-1/2 top-0 will-change-transform"
        style={{ transformOrigin: '0 0', transform: 'translateX(-50%)' }}
      >
        <svg
          ref={svgRef}
          aria-hidden="true"
          className="pointer-events-none absolute left-0 top-0 w-full overflow-visible"
          style={{ height: L_MIN }}
        >
          {/* tali: lapis luar gelap + lapis dalam terang (berpilin) */}
          <path ref={strapRef} fill="none" stroke="#4b5744" strokeWidth="9" strokeLinecap="round" />
          <path
            ref={strapInnerRef}
            fill="none"
            stroke="#b9c0a8"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeDasharray="3 5"
          />
        </svg>

        <div
          ref={cardRef}
          tabIndex={0}
          role="group"
          aria-label={`${profile.name} — ${t.hero.greeting}`}
          className="relative w-full touch-none rounded-[1.4rem] border border-ink-900/12 bg-cream-50 p-3.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-terracotta-300"
          style={{ marginTop: L_MIN }}
        >
          {/* klip logam di tepi atas kartu */}
          <div
            aria-hidden="true"
            className="absolute -top-[9px] left-1/2 h-[18px] w-11 -translate-x-1/2 rounded-[7px] border border-ink-900/20 bg-cream-200"
          />

          <img
            src={profile.photo.src}
            srcSet={profile.photo.srcSet}
            sizes="270px"
            alt={profile.photo.alt}
            width={270}
            height={270}
            decoding="async"
            draggable={false}
            className="aspect-square w-full rounded-[1rem] border border-ink-900/10 object-cover object-center"
          />

          <p className="font-display mt-3 text-2xl leading-tight text-ink-900">
            {profile.shortName}
          </p>
          <p className="eyebrow mt-1 text-terracotta-700">{t.hero.location}</p>

          <div className="mt-3 flex items-center gap-2 border-t border-ink-900/10 pt-3">
            <span className="inline-block h-2 w-2 shrink-0 rounded-full bg-sage-400" aria-hidden="true" />
            <p className="text-[11px] leading-snug text-ink-600">{t.hero.availability}</p>
          </div>

          <div className="mt-3 flex items-end justify-between gap-3">
            <div>
              <p className="font-display text-2xl leading-none text-terracotta-700">15</p>
              <p className="mt-1 text-[10px] leading-tight text-ink-500">
                {locale === 'en' ? "juz Qur'an memorised" : "juz hafalan Al-Qur'an"}
              </p>
            </div>
            {/* garis hias di kaki kartu */}
            <div aria-hidden="true" className="flex h-8 items-end gap-[2px] pb-0.5">
              {bars.map((b, i) => (
                <span
                  key={i}
                  className="block bg-ink-900/45"
                  style={{ width: `${b}px`, height: `${18 + ((b * 7) % 12)}px` }}
                />
              ))}
            </div>
          </div>

          {/* Petunjuk sekali pakai: kartu ini bisa ditarik. Ditempelkan ke
              tepi bawah kartu supaya ikut berayun dan tidak mungkin
              bertabrakan dengan tonggak angka di layar pendek. */}
          <div
            ref={hintRef}
            aria-hidden="true"
            className={`pointer-events-none absolute -bottom-3.5 left-1/2 z-20 -translate-x-1/2 transition-opacity duration-500 ${
              showHint ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <span className="idcard-hint inline-flex items-center gap-1.5 whitespace-nowrap rounded-full border border-cream-50/25 bg-ink-900/85 px-3 py-1 text-[11px] font-medium tracking-wide text-cream-50 backdrop-blur-sm">
              <svg
                width="13"
                height="13"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                aria-hidden="true"
              >
                <path d="M9 6L4 12l5 6M15 6l5 6-5 6" />
              </svg>
              {t.hero.dragHint}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
