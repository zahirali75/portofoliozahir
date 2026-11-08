import { useEffect, useRef, type CSSProperties } from 'react'

/* =====================================================================
   Mesh gradient yang berjalan di GPU.

   Satu canvas WebGL, tanpa library. Bidangnya = fbm yang di-warp dua
   kali (satu warp cuma jadi awan; dua warp jadi lipatan marmer yang
   terbaca sebagai mesh gradient).

   Loop-nya mulus karena waktu TIDAK diumpankan mentah ke noise —
   waktu dipakai sebagai titik di lingkaran (orb), jadi bidangnya
   menutup sendiri persis setelah satu putaran penuh.

   Dither Bayer 4x4 dipasang di akhir supaya gradien sehalus ini tidak
   tampil bergaris di layar 8-bit.
   ===================================================================== */

export type MeshStops = readonly [string, string, string, string]

/** Lama satu putaran penuh. Bidangnya kembali persis ke frame awal. */
const LOOP_MS = 28000
/** Gradien sehalus ini tidak perlu resolusi lebih tinggi. */
const DPR_CAP = 1.5
/** Amplitudo dither. Menukar pita warna dengan butir yang tak terlihat. */
const DITHER = 0.016

const VERT = `
attribute vec2 a_pos;
varying vec2 v_uv;
void main() {
  v_uv = a_pos * 0.5 + 0.5;
  gl_Position = vec4(a_pos, 0.0, 1.0);
}
`

const FRAG = `
#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif

varying vec2 v_uv;

uniform vec2  u_res;
uniform float u_t;
uniform vec2  u_pointer;
uniform vec3  u_c0;
uniform vec3  u_c1;
uniform vec3  u_c2;
uniform vec3  u_c3;

float hash(vec2 p) {
  /* Hash TANPA sin. Versi sin(dot(p, vec2(127.1,311.7))) butuh argumen
     besar (±15000). Di presisi mediump (mantissa 10-bit, dipakai driver
     yang tidak punya highp di fragment shader) argumen sebesar itu
     kehilangan presisi dan hasilnya kolaps jadi nyaris konstan — seluruh
     bidang jadi satu warna rata. Versi ini membawa nilai ke 0..1 LEBIH
     DULU (lewat fract) sebelum perkalian besar, jadi tetap awet. */
  vec3 p3 = fract(vec3(p.xyx) * 0.1031);
  p3 += dot(p3, p3.yzx + 33.33);
  return fract((p3.x + p3.y) * p3.z);
}

/* value noise 2D */
float vnoise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(hash(i + vec2(0.0, 0.0)), hash(i + vec2(1.0, 0.0)), u.x),
    mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x),
    u.y
  );
}

/* 5 oktaf: tiap oktaf 2.02x frekuensi, setengah amplitudo.
   Dijumlahkan lalu dibagi 0.96875 supaya hasilnya benar-benar 0..1 —
   tanpa itu bidangnya cuma menempati separuh bawah jendela warna. */
float fbm(vec2 p) {
  float amp = 0.5;
  float sum = 0.0;
  for (int i = 0; i < 5; i++) {
    sum += amp * vnoise(p);
    p *= 2.02;
    amp *= 0.5;
  }
  return sum / 0.96875;
}

/* Bayer 4x4 dibangun dari dua tingkat 2x2 — nilainya 0..0.9375 */
float bayer2(vec2 a) {
  a = floor(a);
  return fract(a.x / 2.0 + a.y * a.y * 0.75);
}
float bayer4(vec2 a) {
  return bayer2(0.5 * a) * 0.25 + bayer2(a);
}

void main() {
  vec2 p = (v_uv - 0.5) * vec2(u_res.x / u_res.y, 1.0) * 2.0;

  /* Parallax ringan dari pointer yang sudah dihaluskan */
  p += u_pointer * 0.14;

  /* Loop mulus: waktu jadi TITIK DI LINGKARAN, bukan angka yang naik
     terus. Bidangnya disampel di lintasan tertutup, jadi saat u_t
     menempuh satu putaran penuh, gambarannya persis sama dengan awal. */
  vec2 orb = vec2(cos(u_t), sin(u_t)) * 0.55;

  /* Warp dua kali */
  vec2 q = vec2(fbm(p + orb), fbm(p + orb.yx + 3.1));
  vec2 r = vec2(
    fbm(p + 2.0 * q + orb * 1.3 + 1.7),
    fbm(p + 2.0 * q - orb + 9.2)
  );
  float f = fbm(p + 1.8 * r);

  /* Bidang dipetakan ke 0..1, lalu direntang kontrasnya. Jendela atas
     yang rapat membuat warna terakhir (sage) hanya mendarat di tempat
     paling ekstrem — kalau dilebarkan, sage menang di mana-mana dan
     latarnya jadi hijau rata, bukan coklat. */
  float s = length(q);
  float g = clamp(f, 0.0, 1.0);
  g = smoothstep(0.28, 0.94, g);

  /* Empat warna dengan jendela yang saling tumpang tindih — transisinya
     tetap lembut. */
  vec3 col = mix(u_c0, u_c1, smoothstep(0.0, 0.45, g));
  col = mix(col, u_c2, smoothstep(0.35, 0.78, g));

  /* Sage hanya mekar di sisi kanan. Teks krem yang kecil (tagline 18px,
     label 11px) di atas sage cuma dapat kontras ~2,5:1, jauh di bawah
     batas 4,5:1 — sedangkan di atas coklat gelap aman (terukur 5,6:1 ke
     atas). Jadi sage dipindah ke belakang kartu ID, yang menutupinya
     rapat. Ini juga bikin arah cahayanya terbaca datang dari kanan. */
  float mekarSage = smoothstep(0.42, 0.95, v_uv.x);
  col = mix(col, u_c3, clamp(smoothstep(0.40, 0.88, g) * mekarSage, 0.0, 1.0));

  /* Dither terurut: satu baris ini pembeda antara gradien profesional
     dan gradien bergaris. */
  col += (bayer4(gl_FragCoord.xy) - 0.5) * ${DITHER};

  gl_FragColor = vec4(col, 1.0);
}
`

function hexToRgb(hex: string): [number, number, number] {
  const h = hex.trim().replace('#', '')
  return [
    parseInt(h.slice(0, 2), 16) / 255,
    parseInt(h.slice(2, 4), 16) / 255,
    parseInt(h.slice(4, 6), 16) / 255,
  ]
}

function compile(gl: WebGLRenderingContext, type: number, src: string) {
  const sh = gl.createShader(type)
  if (!sh) throw new Error('gagal membuat shader')
  gl.shaderSource(sh, src)
  gl.compileShader(sh)
  if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
    const log = gl.getShaderInfoLog(sh)
    gl.deleteShader(sh)
    throw new Error(log || 'shader gagal dikompilasi')
  }
  return sh
}

export function MeshGradient({
  stops,
  className = '',
  style,
}: {
  stops: MeshStops
  className?: string
  style?: CSSProperties
}) {
  const hostRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const key = stops.join(',')

  useEffect(() => {
    const host = hostRef.current
    const canvas = canvasRef.current
    if (!host || !canvas) return

    let gl: WebGLRenderingContext | null = null
    try {
      gl = (canvas.getContext('webgl', {
        alpha: false,
        antialias: false,
        depth: false,
        stencil: false,
        premultipliedAlpha: false,
        preserveDrawingBuffer: false,
        powerPreference: 'high-performance',
      }) ||
        canvas.getContext('experimental-webgl')) as WebGLRenderingContext | null
    } catch {
      gl = null
    }

    /* Tanpa WebGL: biarkan gradien CSS di lapisan bawah yang tampil. */
    if (!gl) {
      canvas.style.display = 'none'
      return
    }

    const [r0, g0, b0, r1, g1, b1, r2, g2, b2, r3, g3, b3] = [
      ...hexToRgb(stops[0]),
      ...hexToRgb(stops[1]),
      ...hexToRgb(stops[2]),
      ...hexToRgb(stops[3]),
    ].flat()

    let prog: WebGLProgram | null = null
    try {
      const vs = compile(gl, gl.VERTEX_SHADER, VERT)
      const fs = compile(gl, gl.FRAGMENT_SHADER, FRAG)
      prog = gl.createProgram()
      if (!prog) throw new Error('gagal membuat program')
      gl.attachShader(prog, vs)
      gl.attachShader(prog, fs)
      gl.linkProgram(prog)
      if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
        throw new Error(gl.getProgramInfoLog(prog) || 'program gagal dilink')
      }
      gl.useProgram(prog)

      /* Satu segitiga menutupi seluruh layar — tidak ada jahitan diagonal
         seperti kalau pakai dua segitiga. */
      const buf = gl.createBuffer()
      gl.bindBuffer(gl.ARRAY_BUFFER, buf)
      gl.bufferData(
        gl.ARRAY_BUFFER,
        new Float32Array([-1, -1, 3, -1, -1, 3]),
        gl.STATIC_DRAW,
      )
      const loc = gl.getAttribLocation(prog, 'a_pos')
      gl.enableVertexAttribArray(loc)
      gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0)
    } catch (err) {
      console.warn('[MeshGradient] jatuh ke gradien CSS:', err)
      canvas.style.display = 'none'
      return
    }

    const uRes = gl.getUniformLocation(prog, 'u_res')
    const uT = gl.getUniformLocation(prog, 'u_t')
    const uPtr = gl.getUniformLocation(prog, 'u_pointer')
    gl.uniform3f(gl.getUniformLocation(prog, 'u_c0'), r0, g0, b0)
    gl.uniform3f(gl.getUniformLocation(prog, 'u_c1'), r1, g1, b1)
    gl.uniform3f(gl.getUniformLocation(prog, 'u_c2'), r2, g2, b2)
    gl.uniform3f(gl.getUniformLocation(prog, 'u_c3'), r3, g3, b3)

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)')
    let dpr = 1
    let raf = 0
    let running = false
    let onScreen = true

    /* Parallax pointer: nilai sasaran dihaluskan supaya tidak menyentak */
    let tx = 0
    let ty = 0
    let px = 0
    let py = 0

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, DPR_CAP)
      const w = Math.max(1, Math.round(host.clientWidth * dpr))
      const h = Math.max(1, Math.round(host.clientHeight * dpr))
      const berubah = canvas.width !== w || canvas.height !== h
      if (berubah) {
        canvas.width = w
        canvas.height = h
      }
      /* viewport itu keadaan KONTEKS, tapi u_res keadaan PROGRAM. Kalau
         ukuran kebetulan sama persis, resize() dulu berhenti di situ dan
         u_res tidak pernah diisi — akibatnya 0/0 = NaN, bidangnya kolaps,
         dan seluruh latar jatuh rata ke satu warna. Jadi selalu isi ulang,
         bukan cuma saat berubah. */
      gl!.viewport(0, 0, canvas.width, canvas.height)
      gl!.uniform2f(uRes, canvas.width, canvas.height)
      if (berubah) {
        px = tx
        py = ty
        draw(performance.now())
      }
    }

    const draw = (now: number) => {
      gl!.uniform1f(uT, ((now % LOOP_MS) / LOOP_MS) * Math.PI * 2)
      gl!.uniform2f(uPtr, px, py)
      gl!.drawArrays(gl!.TRIANGLES, 0, 3)
    }

    const frame = () => {
      raf = requestAnimationFrame(frame)
      /* gerak halus: mendekati sasaran, bukan mengikuti mentah */
      px += (tx - px) * 0.06
      py += (ty - py) * 0.06
      draw(performance.now())
    }

    const start = () => {
      if (running) return
      running = true
      raf = requestAnimationFrame(frame)
    }
    const stop = () => {
      running = false
      cancelAnimationFrame(raf)
    }

    const sync = () => {
      if (onScreen && !document.hidden && !reduce.matches) start()
      else stop()
    }

    const onPointer = (e: PointerEvent) => {
      tx = (e.clientX / window.innerWidth) * 2 - 1
      ty = (e.clientY / window.innerHeight) * 2 - 1
    }

    const onContextLost = (e: Event) => {
      e.preventDefault()
      stop()
      canvas.style.display = 'none'
    }

    const ro = new ResizeObserver(resize)
    ro.observe(host)
    const io = new IntersectionObserver(
      (entries) => {
        onScreen = entries.some((en) => en.isIntersecting)
        sync()
      },
      { threshold: 0 },
    )
    io.observe(host)

    window.addEventListener('pointermove', onPointer, { passive: true })
    window.addEventListener('resize', resize)
    document.addEventListener('visibilitychange', sync)
    reduce.addEventListener('change', sync)
    canvas.addEventListener('webglcontextlost', onContextLost)

    resize()
    if (reduce.matches) {
      /* Mode kurangi gerak: satu frame statis, tidak ada loop. */
      draw(LOOP_MS * 0.18)
    } else {
      sync()
    }

    return () => {
      stop()
      ro.disconnect()
      io.disconnect()
      window.removeEventListener('pointermove', onPointer)
      window.removeEventListener('resize', resize)
      document.removeEventListener('visibilitychange', sync)
      reduce.removeEventListener('change', sync)
      canvas.removeEventListener('webglcontextlost', onContextLost)
      gl!.deleteProgram(prog)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key])

  return (
    <div
      ref={hostRef}
      aria-hidden="true"
      className={`pointer-events-none ${className}`}
      style={style}
    >
      {/* Cadangan bila WebGL tidak tersedia: gradien CSS dengan stop sama */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `linear-gradient(135deg, ${stops[0]} 0%, ${stops[1]} 34%, ${stops[2]} 68%, ${stops[3]} 100%)`,
        }}
      />
      <canvas ref={canvasRef} className="absolute inset-0 block h-full w-full" />
    </div>
  )
}
