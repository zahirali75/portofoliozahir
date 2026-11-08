import { useEffect, useRef, useState } from 'react'

export interface LensSlide {
  src: string
  title: string
  sub: string
}

interface Props {
  slides: LensSlide[]
  /**
   * Arah gerak gambar saat maju satu slide.
   *  1 = strip bergerak ke kanan (slide baru masuk dari kiri)
   * -1 = strip bergerak ke kiri (slide baru masuk dari kanan)
   */
  direction?: 1 | -1
  autoplaySeconds?: number
  /**
   * Motion blur sungguhan saat digeser: bingkai sebelumnya dirata-ratakan dengan
   * bingkai sekarang sebesar kecepatan kamera. Jejaknya mengikuti arah gerak,
   * bukan sekadar filter blur seragam.
   */
  motionBlur?: boolean
  label: string
  prevLabel: string
  nextLabel: string
}

/* --- Pendamping GSAP, ditulis sendiri (GSAP sengaja tidak dipakai di proyek) --- */
const easeExpoOut = (t: number) => (t >= 1 ? 1 : 1 - Math.pow(2, -10 * t))
const easeExpoInOut = (t: number) =>
  t <= 0 ? 0 : t >= 1 ? 1 : t < 0.5 ? Math.pow(2, 20 * t - 10) / 2 : (2 - Math.pow(2, -20 * t + 10)) / 2

interface Tween {
  from: number
  to: number
  start: number
  dur: number
  ease: (t: number) => number
  apply: (v: number) => void
  done?: () => void
}

const VERT = `attribute vec2 p; varying vec2 v; void main(){ v = p*.5+.5; v.y = 1.-v.y; gl_Position = vec4(p,0.,1.); }`

/* Kaca-lensa: tepi strip membesar & melengkung, RGB terpisah, lengkung
   menguat mengikuti kecepatan. Warna sheen & warna luar bidang diambil
   dari palet proyek (krem + terracotta hangat), bukan netral putih. */
const FRAG = `precision highp float;
  varying vec2 v; uniform sampler2D t; uniform float k; uniform float ca;
  vec2 warp(vec2 uv){
    float cx = uv.x - .5;
    float e = smoothstep(.16, .5, abs(cx)); e = e*e*(3.-2.*e);
    float sxv = .5 + cx * (1. - .10*k*e);
    float syv = .5 + (uv.y - .5) / (1. + .85*k*e);
    syv += (uv.y-.5) * .025 * k * e * sin(cx*6.2831);
    return vec2(sxv, syv);
  }
  vec3 tap(vec2 uv){ return (uv.x<0.||uv.x>1.||uv.y<0.||uv.y>1.) ? vec3(.976,.953,.918) : texture2D(t, uv).rgb; }
  void main(){
    float cx = v.x - .5;
    float e = smoothstep(.2, .5, abs(cx));
    vec2 d = vec2(sign(cx) * ca * e * e, 0.);
    vec3 col;
    col.r = tap(warp(v + d)).r;
    col.g = tap(warp(v)).g;
    col.b = tap(warp(v - d)).b;
    col += vec3(.085,.062,.044) * e * e * smoothstep(.0,.6, 1.-abs(v.y-.5)*2.);
    gl_FragColor = vec4(col, 1.);
  }`

export function GlassCarousel({
  slides,
  direction = -1,
  autoplaySeconds = 2.6,
  motionBlur = false,
  label,
  prevLabel,
  nextLabel,
}: Props) {
  const rootRef = useRef<HTMLDivElement>(null)
  const stageRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const slidesRef = useRef(slides)
  slidesRef.current = slides
  const apiRef = useRef<{ go: (step: number) => void }>({ go: () => {} })
  const [active, setActive] = useState(0)

  /* Kunci efek ke daftar src saja: ganti bahasa tidak me-restart animasi. */
  const key = slides.map((s) => s.src).join('|')

  useEffect(() => {
    const rootEl = rootRef.current
    const stageEl = stageRef.current
    const canvasEl = canvasRef.current
    if (!rootEl || !stageEl || !canvasEl) return
    /* Salinan bertipe pasti: penyempitan tipe tidak mengalir ke dalam closure. */
    const root: HTMLDivElement = rootEl
    const stage: HTMLDivElement = stageEl
    const canvas: HTMLCanvasElement = canvasEl

    const items = slidesRef.current
    const n = items.length
    if (!n) return

    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches
    /* step = arah perpindahan posisi internal; pos naik = konten bergerak ke kiri. */
    const step = -direction

    const imgs = items.map((it) => {
      const im = new Image()
      im.decoding = 'async'
      im.src = it.src
      return im
    })

    /* ---------- WebGL + strip luring ---------- */
    const gl = canvas.getContext('webgl', {
      antialias: false,
      premultipliedAlpha: false,
      preserveDrawingBuffer: true,
    }) as WebGLRenderingContext | null
    const strip = document.createElement('canvas')
    const sx = strip.getContext('2d') as CanvasRenderingContext2D
    let prog: WebGLProgram | null = null
    let uK: WebGLUniformLocation | null = null
    let uCA: WebGLUniformLocation | null = null

    if (gl) {
      const sh = (type: number, src: string) => {
        const s = gl.createShader(type) as WebGLShader
        gl.shaderSource(s, src)
        gl.compileShader(s)
        if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) console.error(gl.getShaderInfoLog(s))
        return s
      }
      prog = gl.createProgram() as WebGLProgram
      gl.attachShader(prog, sh(gl.VERTEX_SHADER, VERT))
      gl.attachShader(prog, sh(gl.FRAGMENT_SHADER, FRAG))
      gl.linkProgram(prog)
      gl.useProgram(prog)
      const buf = gl.createBuffer()
      gl.bindBuffer(gl.ARRAY_BUFFER, buf)
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW)
      const loc = gl.getAttribLocation(prog, 'p')
      gl.enableVertexAttribArray(loc)
      gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0)
      const tex = gl.createTexture()
      gl.bindTexture(gl.TEXTURE_2D, tex)
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR)
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR)
      uK = gl.getUniformLocation(prog, 'k')
      uCA = gl.getUniformLocation(prog, 'ca')
    }

    /* ---------- ukuran & tata letak ---------- */
    let W = 0
    let H = 0
    let dpr = 1
    let ph = 0
    let gap = 0
    let widths: number[] = []
    let centers: number[] = []
    let period = 0
    /* Kain & keadaan motion blur (dibuat hanya bila dipakai). */
    let blurCv: HTMLCanvasElement | null = null
    let blurCx: CanvasRenderingContext2D | null = null
    let blurValid = false

    function resize() {
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      /* Ukur PANGGUNG (kotak gambar), bukan wadah luar: wadah luar kini juga
         memuat baris keterangan di bawahnya. */
      W = Math.round(stage.clientWidth * dpr)
      H = Math.round(stage.clientHeight * dpr)
      if (!W || !H) return
      canvas.width = strip.width = W
      canvas.height = strip.height = H
      if (gl) gl.viewport(0, 0, W, H)
      /* Tinggi gambar diukur dari panggung. Batas longgar supaya kartu mengisi
         panggung (bukan menyisakan pita kosong), tapi tidak sampai melimpah. */
      ph = Math.min(H * 0.86, W * 0.62)
      gap = ph * 0.14
      widths = imgs.map((im) => {
        const r = im.naturalWidth && im.naturalHeight ? im.naturalWidth / im.naturalHeight : 1.5
        return ph * Math.min(Math.max(r, 0.62), 1.75)
      })
      centers = []
      let c = 0
      widths.forEach((w, i) => {
        if (i) c += widths[i - 1] / 2 + gap + w / 2
        centers.push(c)
      })
      period = c + widths[n - 1] / 2 + gap + widths[0] / 2
      needsRender = true
    }

    /* Indeks slide pecahan -> posisi x pada strip */
    function camAt(pos: number) {
      const f = Math.floor(pos)
      const t = pos - f
      const i = ((f % n) + n) % n
      const j = (i + 1) % n
      const loops = Math.floor(f / n) * period
      const a = centers[i] + loops
      const b = (j === 0 ? centers[0] + period : centers[j]) + loops
      return a + (b - a) * t
    }

    const state = { pos: 0, k: 1, ca: 0.004, intro: 0, vel: 0 }
    let lastPos: number | null = null
    let lastT = 0

    function cover(im: HTMLImageElement, x: number, y: number, w: number, h: number) {
      const r = Math.max(w / im.naturalWidth, h / im.naturalHeight)
      const sw = w / r
      const sh2 = h / r
      sx.drawImage(im, (im.naturalWidth - sw) / 2, (im.naturalHeight - sh2) / 2, sw, sh2, x, y, w, h)
    }

    function render(now: number) {
      if (!W || !period) return
      const cam = camAt(state.pos)
      /* Catatan: kecepatan (state.vel) dihitung sekali per bingkai di frame(),
         bukan di sini — render bisa dipanggil lebih dari sekali per bingkai. */
      void now

      sx.fillStyle = '#f9f3ea'
      sx.fillRect(0, 0, W, H)
      const g = sx.createRadialGradient(W / 2, H * 0.56, 0, W / 2, H * 0.56, W * 0.34)
      g.addColorStop(0, 'rgba(58,49,40,.10)')
      g.addColorStop(1, 'rgba(58,49,40,0)')
      sx.fillStyle = g
      sx.fillRect(0, 0, W, H)

      const top = H * 0.5 - ph / 2
      for (let i = 0; i < n; i++) {
        const im = imgs[i]
        if (!im.complete || !im.naturalWidth) continue
        for (let k = -2; k <= 2; k++) {
          const w = widths[i]
          const x = W / 2 + centers[i] + k * period - cam - w / 2
          if (x > W || x + w < 0) continue
          const drop = state.intro * H * (0.6 + (0.08 * Math.abs(x + w / 2 - W / 2)) / W * 10)
          cover(im, x, top + drop, w, ph)
        }
      }

      /* ---------- motion blur: akumulasi antar-bingkai ---------- */
      /* Kain jejak menyimpan rata-rata bergerak dari bingkai-bingkai terakhir.
         Kekuatannya ikut kecepatan kamera, jadi makin cepat digeser makin
         panjang jejaknya — dan hilang sendiri begitu berhenti. */
      let amt = 0
      if (motionBlur && !reduce) {
        if (!blurCv) {
          blurCv = document.createElement('canvas')
          blurCx = blurCv.getContext('2d')
        }
        if (blurCv.width !== W || blurCv.height !== H) {
          blurCv.width = W
          blurCv.height = H
          blurValid = false
        }
        /* state.vel satuannya slide/detik. Kalibrasi dari tarikan sungguhan:
           tarikan santai ~0,8 (jejak tipis), kibasan cepat ~3 (jelas), dan
           jenuh di 0,4 supaya gambar tidak pernah hancur. Tween autoplay
           (~1,7) hampir tidak berjejak. */
        amt = Math.min(Math.abs(state.vel) * 0.08, 0.4)
        if (amt < 0.02) {
          blurValid = false
        } else if (blurValid && blurCx) {
          blurCx.globalAlpha = amt
          blurCx.drawImage(strip, 0, 0)
          sx.globalAlpha = 1
          sx.drawImage(blurCv, 0, 0)
        } else if (blurCx) {
          blurCx.globalAlpha = 1
          blurCx.drawImage(strip, 0, 0)
          blurValid = true
        }
      } else {
        blurValid = false
      }

      if (gl && prog) {
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, strip)
        /* Bentuk lensa dasar (k=1, ca=0.004) tetap; kecepatan hanya menambah
           sedikit. Dulu pemicunya nyaris tidak pernah aktif; sejak kecepatan
           dihitung benar, batasnya harus dijaga supaya tepi gambar tidak hancur. */
        const speed = Math.min(Math.abs(state.vel) * 0.06, 0.3)
        gl.uniform1f(uK, state.k + (reduce ? 0 : speed))
        gl.uniform1f(uCA, state.ca + (reduce ? 0 : speed * 0.006))
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)
      } else {
        /* Tanpa WebGL: gambar strip apa adanya, jangan biarkan kosong. */
        const ctx2d = canvas.getContext('2d')
        ctx2d?.drawImage(strip, 0, 0)
      }
    }

    /* ---------- tween ---------- */
    const tweens: Tween[] = []
    let cur = 0
    let autoTimer: number | undefined
    let visible = false
    let needsRender = true

    function killTweens() {
      tweens.length = 0
      /* Tween intro yang dipotong di tengah bisa menyisakan gambar menggantung;
         paksa ke posisi akhirnya. */
      state.intro = 0
    }

    /* Semua durasi memakai DETIK (gaya GSAP). Dikali 1000 HANYA di sini, karena
       performance.now() memakai milidetik — salah satuan = tween melompat. */
    function tweenRaw(
      from: number,
      to: number,
      durSec: number,
      ease: (t: number) => number,
      apply: (v: number) => void,
      done?: () => void,
    ) {
      tweens.push({ from, to, start: performance.now(), dur: reduce ? 1 : durSec * 1000, ease, apply, done })
      needsRender = true
    }

    function tweenPos(to: number, durSec: number, ease: (t: number) => number, done?: () => void) {
      tweenRaw(
        state.pos,
        to,
        durSec,
        ease,
        (v) => {
          state.pos = v
        },
        done,
      )
    }

    function goTo(target: number, dur = 1.15) {
      cur = Math.round(target)
      killTweens()
      tweenPos(cur, dur, easeExpoInOut)
      setActive(((cur % n) + n) % n)
      restartAuto()
      needsRender = true
    }

    apiRef.current.go = (s: number) => goTo(cur + s, 1.15)

    /* ---------- gambar pendahuluan ---------- */
    function intro() {
      if (reduce) {
        state.pos = 0
        state.intro = 0
        state.k = 1
        needsRender = true
        return
      }
      state.intro = 1
      state.pos = -1.5 * step
      state.k = 1.8
      tweenPos(0, 1.8, easeExpoInOut)
      tweenRaw(1, 0, 1.4, easeExpoOut, (v) => {
        state.intro = v
      })
      tweenRaw(1.8, 1, 1.8, easeExpoInOut, (v) => {
        state.k = v
      })
      needsRender = true
    }

    /* ---------- tarik & lempar ---------- */
    let dragging = false
    let x0 = 0
    let p0 = 0
    let lx = 0
    let lt = 0
    let v = 0

    const onDown = (e: PointerEvent) => {
      if ((e.target as HTMLElement).closest('button,a')) return
      dragging = true
      x0 = lx = e.clientX
      p0 = state.pos
      lt = performance.now()
      v = 0
      killTweens()
      stopAuto()
      /* Reset pengukuran kecepatan: tanpa ini selisih posisi saat pertama kali
         digenggam terbaca sebagai lompatan → blur sempat menyala besar. */
      lastPos = state.pos
      lastT = performance.now()
      state.vel = 0
      root.setPointerCapture(e.pointerId)
      needsRender = true
    }

    const onMove = (e: PointerEvent) => {
      if (!dragging) return
      const now = performance.now()
      v = (e.clientX - lx) / Math.max(1, now - lt)
      lx = e.clientX
      lt = now
      const avgW = period / n / dpr
      state.pos = p0 - (e.clientX - x0) / avgW
      needsRender = true
    }

    const onUp = () => {
      if (!dragging) return
      dragging = false
      const avgW = period / n / dpr
      /* Lemparan dibatasi ±3 slide: sambil tetap terasa "dilempar", tidak bisa
         berputar puluhan slide hanya karena pointerup datang hampir serentak. */
      const fling = Math.max(-3, Math.min(3, (v * 220) / avgW))
      goTo(Math.round(state.pos - fling), 1.2)
    }

    /* ---------- autoplay: hanya saat carousel terlihat ---------- */
    function stopAuto() {
      if (autoTimer) {
        clearTimeout(autoTimer)
        autoTimer = undefined
      }
    }

    let hovering = false

    function restartAuto() {
      stopAuto()
      /* Jangan hidupkan lagi selama pointer masih di atas carousel. */
      if (!autoplaySeconds || reduce || !visible || hovering || dragging) return
      autoTimer = window.setTimeout(() => goTo(cur + step), autoplaySeconds * 1000)
    }

    const onEnter = () => {
      hovering = true
      stopAuto()
    }
    const onLeave = () => {
      hovering = false
      if (!dragging) restartAuto()
    }

    root.addEventListener('pointerdown', onDown)
    root.addEventListener('pointermove', onMove)
    root.addEventListener('pointerup', onUp)
    root.addEventListener('pointercancel', onUp)
    root.addEventListener('pointerenter', onEnter)
    root.addEventListener('pointerleave', onLeave)

    const onResizeWindow = () => {
      resize()
      needsRender = true
    }
    window.addEventListener('resize', onResizeWindow)

    const io = new IntersectionObserver(
      (entries) => {
        visible = entries[0]?.isIntersecting ?? false
        if (visible) {
          needsRender = true
          restartAuto()
        } else {
          stopAuto()
        }
      },
      { threshold: 0.25 },
    )
    io.observe(root)

    /* ---------- gelung gambar ---------- */
    let raf = 0
    function frame(now: number) {
      if (disposed) return
      for (let i = tweens.length - 1; i >= 0; i--) {
        const tw = tweens[i]
        const t = tw.dur <= 0 ? 1 : (now - tw.start) / tw.dur
        if (t >= 1) {
          tw.apply(tw.to)
          tweens.splice(i, 1)
          tw.done?.()
        } else {
          tw.apply(tw.from + (tw.to - tw.from) * tw.ease(t))
        }
        needsRender = true
      }
      /* Kecepatan kamera: slide per DETIK, dihitung sekali per bingkai dari
         selisih posisi nyata (termasuk saat drag). Dipakai bersama oleh
         shader (lengkung kaca) dan motion blur, jadi harus akurat. */
      if (lastPos !== null && now > lastT) {
        const inst = ((state.pos - lastPos) / (now - lastT)) * 1000
        state.vel = Math.abs(inst) > 40 ? inst : state.vel * 0.5 + inst * 0.5
        lastPos = state.pos
        lastT = now
      } else if (lastPos === null) {
        lastPos = state.pos
        lastT = now
      }

      if (needsRender) {
        render(now)
        needsRender = tweens.length > 0 || dragging
      }
      raf = requestAnimationFrame(frame)
    }

    let disposed = false
    Promise.all(imgs.map((im) => im.decode().catch(() => {}))).then(() => {
      if (disposed) return
      resize()
      render(performance.now())
      if (visible) intro()
      else pendingIntro = true
      raf = requestAnimationFrame(frame)
    })

    /* Intro ditunda sampai benar-benar terlihat supaya tidak terlewat. */
    let pendingIntro = false
    const io2 = new IntersectionObserver(
      (entries) => {
        if (pendingIntro && entries[0]?.isIntersecting) {
          pendingIntro = false
          intro()
        }
      },
      { threshold: 0.35 },
    )
    io2.observe(root)

    return () => {
      disposed = true
      cancelAnimationFrame(raf)
      stopAuto()
      io.disconnect()
      io2.disconnect()
      /* JANGAN panggil gl.getExtension('WEBGL_lose_context').loseContext() di sini.
         React (StrictMode/remount) memakai ulang elemen <canvas> yang sama, dan
         melepas konteks membuat pemasangan berikutnya menerima konteks yang sudah
         mati — carousel jadi kosong. Elemen kanvas dibuang sendiri oleh React. */
      root.removeEventListener('pointerdown', onDown)
      root.removeEventListener('pointermove', onMove)
      root.removeEventListener('pointerup', onUp)
      root.removeEventListener('pointercancel', onUp)
      root.removeEventListener('pointerenter', onEnter)
      root.removeEventListener('pointerleave', onLeave)
      window.removeEventListener('resize', onResizeWindow)
    }
  }, [key, direction, autoplaySeconds, motionBlur])

  const current = slides[active] ?? slides[0]

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowRight') {
      e.preventDefault()
      apiRef.current.go(1)
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault()
      apiRef.current.go(-1)
    }
  }

  return (
    <div
      ref={rootRef}
      className="glass-carousel"
      data-slide={active}
      role="group"
      aria-roledescription="carousel"
      aria-label={label}
      tabIndex={0}
      onKeyDown={onKeyDown}
    >
      <div className="glass-carousel__stage" ref={stageRef}>
        <canvas ref={canvasRef} className="glass-carousel__canvas" aria-hidden="true" />

        <button
          type="button"
          className="glass-carousel__nav glass-carousel__nav--prev"
          aria-label={prevLabel}
          onClick={() => apiRef.current.go(-1)}
        >
          <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
            <path d="M10 3 5 8l5 5" />
          </svg>
        </button>
        <button
          type="button"
          className="glass-carousel__nav glass-carousel__nav--next"
          aria-label={nextLabel}
          onClick={() => apiRef.current.go(1)}
        >
          <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
            <path d="m6 3 5 5-5 5" />
          </svg>
        </button>
      </div>

      {/* Keterangan duduk di baris sendiri di bawah kanvas — tidak menutupi foto. */}
      <div className="glass-carousel__foot">
        <div className="glass-carousel__mask">
          <p className="glass-carousel__title" aria-live="polite">
            {(current?.title ?? '').split(' ').map((w, i) => (
              <span key={`${active}-${i}`} className="glass-word" style={{ animationDelay: `${i * 45}ms` }}>
                {w}
                {'\u00A0'}
              </span>
            ))}
          </p>
        </div>
        <p className="glass-carousel__sub" key={`sub-${active}`}>
          {current?.sub}
        </p>
      </div>
    </div>
  )
}
