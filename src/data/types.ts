export type Locale = 'id' | 'en'

export type Level = 'dasar' | 'menengah' | 'mahir' | 'dipelajari'

export interface SkillGroup {
  title: string
  items: { name: string; level: Level }[]
}

export interface Project {
  slug: string
  title: string
  oneLiner: string
  year: string
  status: string
  stack: string[]
  cover: string
  gallery: { src: string; caption: string }[]
  /** featured = muncul di beranda */
  featured: boolean
  problem: string
  role: string[]
  decisions: { title: string; body: string }[]
  challenge: { title: string; body: string }
  results: { value: string; label: string }[]
  links: { label: string; href: string; kind: 'repo' | 'demo' | 'doc' }[]
}

export interface TimelineEntry {
  period: string
  title: string
  org: string
  points: string[]
}

export interface Award {
  year: string
  title: string
  issuer: string
  image?: string
  /** Bukti tambahan: foto dokumentasi yang bisa dibuka sendiri */
  extra?: string[]
  note?: string
}

export interface Activity {
  title: string
  caption: string
  image: string
  aspect: 'landscape' | 'portrait'
}

export interface Certificate {
  src: string
  title: string
  sub: string
}

export interface Content {
  meta: { htmlLang: string; label: string; hint: string }
  nav: { about: string; skills: string; projects: string; experience: string; contact: string }
  hero: {
    greeting: string
    name: string
    /** Nama dipecah per baris untuk animasi topeng (diisi di data, bukan ditebak di komponen) */
    lines: string[]
    tagline: string
    location: string
    availability: string
    ctaProjects: string
    ctaCv: string
    /** Petunjuk singkat bahwa kartu ID bisa ditarik (muncul sekali) */
    dragHint: string
    /** Pita berjalan di bawah hero — keahlian inti */
    marquee: string[]
    /** Tiga angka tonggak di bawah hero */
    milestones: { value: string; label: string }[]
  }
  about: {
    title: string
    eyebrow: string
    paragraphs: string[]
    factsTitle: string
    facts: { label: string; value: string }[]
    /** Tiga angka ringkas di atas paragraf */
    stats: { value: string; label: string }[]
  }
  skills: {
    title: string
    eyebrow: string
    lead: string
    levels: Record<Level, string>
    note: string
  }
  projects: {
    title: string
    eyebrow: string
    lead: string
    viewDetail: string
    /** Petunjuk singkat di bawah tumpukan kartu proyek */
    dragHint: string
    prev: string
    next: string
    backToList: string
    labels: {
      problem: string
      role: string
      decisions: string
      challenge: string
      results: string
      stack: string
      links: string
      year: string
      status: string
      gallery: string
    }
    /** Judul kecil di atas setiap bagian halaman detail */
    sections: { context: string; decisions: string; challenge: string; gallery: string; facts: string }
    factsTitle: string
    repo: string
    demo: string
    doc: string
  }
  experience: {
    title: string
    eyebrow: string
    lead: string
    work: string
    organization: string
    awards: string
    awardsLead: string
    courses: string
    coursesLead: string
    languages: string
    activities: string
    activitiesLead: string
    /** Judul blok carousel piagam/sertifikat */
    certificates: string
    certificatesLead: string
    /** Petunjuk geser singkat di bawah carousel */
    dragHint: string
    /** Label tombol yang membuka dokumen ukuran penuh */
    openProof: string
    slidePrev: string
    slideNext: string
  }
  contact: {
    title: string
    eyebrow: string
    lead: string
    emailLabel: string
    copy: string
    copied: string
    copyFailed: string
    downloadCv: string
    linksTitle: string
  }
  footer: { built: string; rights: string }
  notFound: { title: string; body: string; cta: string }
}
