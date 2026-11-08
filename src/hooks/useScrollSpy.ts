import { useEffect, useState } from 'react'

/**
 * Sorot menu navigasi sesuai bagian yang sedang terlihat.
 * Sengaja tidak memakai scroll listener mentah + throttle manual:
 * IntersectionObserver lebih murah dan tidak membuat layout thrash.
 */
export function useScrollSpy(ids: string[], offset = 96): string {
  const [active, setActive] = useState<string>('')

  useEffect(() => {
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null)

    if (sections.length === 0) return

    const visible = new Map<string, number>()

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          const id = e.target.id
          if (e.isIntersecting) visible.set(id, e.intersectionRatio)
          else visible.delete(id)
        })

        if (visible.size > 0) {
          const best = [...visible.entries()].sort((a, b) => b[1] - a[1])[0]
          setActive(best[0])
        } else {
          // Tidak ada yang terlihat: pilih bagian terakhir yang sudah lewat.
          const passed = sections.filter((s) => s.getBoundingClientRect().top <= offset)
          setActive(passed.length ? passed[passed.length - 1].id : '')
        }
      },
      {
        rootMargin: `-${offset}px 0px -55% 0px`,
        threshold: [0.05, 0.25, 0.5, 0.75],
      },
    )

    sections.forEach((s) => observer.observe(s))
    return () => observer.disconnect()
  }, [ids, offset])

  return active
}
