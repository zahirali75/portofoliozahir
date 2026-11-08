import { Link } from 'react-router-dom'

/**
 * Tombol pill dengan cincin iridescent: gradien konik berputar mengelilingi
 * disc ikon; saat hover putarannya berhenti sementara warnanya tetap bergeser.
 *
 * Kalau `to` diisi, tombol ini sendiri yang jadi tautan. Kalau dipakai di
 * dalam kartu yang sudah berupa tautan (`<Link>`), atribut itu dikosongkan
 * supaya tidak ada tautan bersarang — secara tampilan sama persis, tapi
 * hanya ada satu titik fokus papan tombol per kartu.
 */
export function PillButton({ to, label }: { to?: string; label: string }) {
  const inner = (
    <>
      <span className="pill-button-disc">
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          aria-hidden="true"
          className="pill-button-arrow"
        >
          <path d="M5 12h14m0 0l-5-5m5 5l-5 5" />
        </svg>
        <span className="pill-button-ring" aria-hidden="true" />
      </span>
      <span className="pill-button-label">{label}</span>
    </>
  )

  if (!to) {
    return <span className="pill-button">{inner}</span>
  }

  return (
    <Link to={to} className="pill-button">
      {inner}
    </Link>
  )
}
