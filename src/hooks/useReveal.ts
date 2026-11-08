import { useEffect } from 'react'

/**
 * Animasi muncul sekali saat elemen masuk viewport — murni IntersectionObserver,
 * tanpa GSAP (hemat 113 KB). Transisi sudah dideklarasikan di CSS; observer
 * hanya menghapus kelas .js sementara agar [data-reveal] tampil.
 *
 * Menghormati prefers-reduced-motion: reduce — animasi dimatikan total.
 *
 * `key` menerima nilai yang berubah saat halaman berganti (mis. pathname):
 * tanpa itu, elemen pada halaman baru tidak pernah dianimasikan karena
 * efek ini hanya berjalan sekali saat aplikasi pertama dimuat.
 */
export function useReveal(key: string = '') {
  useEffect(() => {
    const all = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]'))
    const nodes = all.filter((n) => n.dataset.revealState !== 'done')

    if (nodes.length === 0) return

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const showAll = () =>
      nodes.forEach((n) => {
        n.style.opacity = '1'
        n.style.transform = 'none'
        n.dataset.revealState = 'done'
      })

    if (reduce) {
      showAll()
      return
    }

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting && e.target instanceof HTMLElement) {
            e.target.style.opacity = '1'
            e.target.style.transform = 'none'
            e.target.dataset.revealState = 'done'
            obs.unobserve(e.target)
          }
        })
      },
      { threshold: 0.15, rootMargin: '0px 0px -10% 0px' },
    )

    nodes.forEach((n) => obs.observe(n))

    // Jaring-jaring: konten tidak boleh tetap tersembunyi bila observer gagal.
    const safety = window.setTimeout(showAll, 2500)

    return () => {
      obs.disconnect()
      clearTimeout(safety)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key])
}

/** Kembalikan true bila pengguna meminta animasi seminimal mungkin. */
export function usePrefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}
