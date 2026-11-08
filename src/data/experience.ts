import type { Activity, Award, Locale, TimelineEntry } from './types'
import { activityImages, evidence } from './index'

export interface Course {
  id: string
  en: string
}

export interface LanguageRow {
  name: string
  level: string
}

export interface ExperienceBlock {
  work: TimelineEntry[]
  organizations: TimelineEntry[]
  awards: Award[]
  courses: Course[]
  languages: LanguageRow[]
  activities: Activity[]
}

export const experience: Record<Locale, ExperienceBlock> = {
  id: {
    work: [
      {
        period: 'Mei 2026 — Oktober 2026',
        title: 'Fasilitator Operasional Teknis & Pembelajaran',
        org: 'Cakrawala University — Jakarta',
        points: [
          'Mengelola operasional perkuliahan hibrida (Zoom, sistem kamera, mikrofon) agar setiap sesi berjalan tanpa hambatan.',
          'Menjaga stabilitas audio-visual selama perkuliahan dan menangani gangguan teknis dengan cepat.',
          'Mengelola data presensi serta rekapitulasi kehadiran mahasiswa, baik daring maupun luring.',
        ],
      },
    ],
    organizations: [
      {
        period: '2026 — Sekarang',
        title: 'Anggota Divisi Public Communication and Relations',
        org: 'Student Government Association (SGA) — Cakrawala University',
        points: [
          'Mengelola komunikasi publik dan membangun relasi internal maupun eksternal kampus.',
          'Menyusun narasi informatif untuk kegiatan kemahasiswaan.',
          'Terlibat sebagai panitia penyelenggaraan program kerja "Chill Spill".',
        ],
      },
      {
        period: '2024 — 2025',
        title: 'Ketua Bagian Keamanan',
        org: "OSIS Ma'had Tahfizhul Qur'an Tarbiyah Sunnah — Bandung",
        points: [
          'Memimpin tim yang membawahi penegakan kedisiplinan, ketertiban, dan keamanan lingkungan ma\'had untuk ratusan santri.',
          'Melatih kemampuan problem solving dan manajemen konflik dalam situasi bertekanan.',
        ],
      },
    ],
    awards: [
      {
        year: '2025',
        title: "Lulusan Terbaik Ma'had Tahfizhul Qur'an Tarbiyah Sunnah",
        issuer: "Ma'had Tahfizhul Qur'an Tarbiyah Sunnah",
        note: 'Terpilih dari santri tingkat akhir sebagai teladan dalam akhlak, kedisiplinan, dan muraja\'ah hafalan, setelah menempuh tiga tahun pendidikan.',
        image: evidence.santriTeladan,
      },
      {
        year: '2025',
        title: "Syahadah Hafizh Al-Qur'an — 15 Juz",
        issuer: "Ma'had Tahfizhul Qur'an Tarbiyah Sunnah",
        note: 'Bertanggal 2 Mei 2025 (04/11/1446 H). Nilai transkrip keagamaan 87.00 (Jayyid Jiddan).',
        image: evidence.syahadah,
      },
      {
        year: '2024',
        title: "Juara 2 Lomba Muhadharah (Pidato) — tingkat ma'had",
        issuer: "OSTARS Ma'had Tahfizhul Qur'an Tarbiyah Sunnah",
        note: 'Dilaksanakan 2 November 2024 di Masjid Umar bin Khattab, Desa Selacau, Kabupaten Bandung Barat.',
        image: evidence.juara2,
        extra: [...evidence.juara2Interlude],
      },
    ],
    courses: [
      { id: 'Web Application Development', en: 'Web Application Development' },
      { id: 'Web Client Development', en: 'Web Client Development' },
      { id: 'Database System', en: 'Database Systems' },
      { id: 'Data Wrangling', en: 'Data Wrangling' },
      { id: 'Stochastic Modeling', en: 'Stochastic Modelling' },
      { id: 'Statistika & Probabilitas', en: 'Statistics & Probability' },
      { id: 'Algoritma & Struktur Data', en: 'Algorithms & Data Structures' },
      { id: 'Pemrograman (Python)', en: 'Programming (Python)' },
      { id: 'Basis Data Lanjutan', en: 'Advanced Databases' },
    ],
    languages: [
      { name: 'Bahasa Indonesia', level: 'Penutur asli' },
      { name: 'Bahasa Arab', level: 'Baik — menengah profesional' },
      { name: 'Bahasa Inggris', level: 'Pemula, sedang dipelajari' },
    ],
    activities: [
      {
        title: 'OSIS — Ketua Bagian Keamanan',
        caption: "Pembinaan anggota OSIS Ma'had Tahfizhul Qur'an Tarbiyah Sunnah di halaman ma'had, 2024.",
        image: activityImages.osis1,
        aspect: 'landscape',
      },
      {
        title: 'OSIS — rapat koordinasi',
        caption: 'Pengurus OSIS berseragam di depan Masjid Umar bin Khattab, Bandung Barat, 2024.',
        image: activityImages.osis2,
        aspect: 'portrait',
      },
      {
        title: 'SGA — Divisi Public Communication & Relations',
        caption: 'Tim SGA Cakrawala University dalam sesi dokumentasi kegiatan, 2026.',
        image: activityImages.sga2,
        aspect: 'portrait',
      },
      {
        title: 'SGA — kegiatan divisi',
        caption: 'Dokumentasi kegiatan tim SGA Cakrawala University, 2026.',
        image: activityImages.sga1,
        aspect: 'portrait',
      },
      {
        title: 'Chill Spill — kepanitiaan program kerja',
        caption: 'Panitia program kerja "Chill Spill" di bawah SGA Cakrawala University, 2026.',
        image: activityImages.chill1,
        aspect: 'landscape',
      },
      {
        title: 'Chill Spill — dokumentasi acara',
        caption: 'Dokumentasi rangkaian acara "Chill Spill", 2026.',
        image: activityImages.chill2,
        aspect: 'portrait',
      },
    ],
  },

  en: {
    work: [
      {
        period: 'May 2026 — October 2026',
        title: 'Technical & Learning Operations Facilitator',
        org: 'Cakrawala University — Jakarta',
        points: [
          'Ran hybrid-classroom operations (Zoom, camera systems, microphones) so every session ran smoothly.',
          'Maintained audio-visual stability during lectures and resolved technical faults quickly.',
          'Managed attendance data and student attendance recapitulation for both online and offline classes.',
        ],
      },
    ],
    organizations: [
      {
        period: '2026 — Present',
        title: 'Member, Public Communication and Relations Division',
        org: 'Student Government Association (SGA) — Cakrawala University',
        points: [
          'Handled public communication and built internal and external university relations.',
          'Wrote informative narratives for student activities.',
          'Served on the organising committee for the "Chill Spill" programme.',
        ],
      },
      {
        period: '2024 — 2025',
        title: 'Head of Security Division',
        org: 'OSIS, Ma\'had Tahfizhul Qur\'an Tarbiyah Sunnah — Bandung',
        points: [
          'Led the team responsible for discipline, order, and safety across a boarding school of hundreds of students.',
          'Built problem-solving and conflict-management skills under pressure.',
        ],
      },
    ],
    awards: [
      {
        year: '2025',
        title: 'Top Graduate, Ma\'had Tahfizhul Qur\'an Tarbiyah Sunnah',
        issuer: 'Ma\'had Tahfizhul Qur\'an Tarbiyah Sunnah',
        note: 'Selected from final-year students as a role model in character, discipline, and memorisation review, after three years of study.',
        image: evidence.santriTeladan,
      },
      {
        year: '2025',
        title: 'Qur\'an Memorisation Certificate — 15 Juz',
        issuer: 'Ma\'had Tahfizhul Qur\'an Tarbiyah Sunnah',
        note: 'Dated 2 May 2025 (04/11/1446 AH). Religious transcript score 87.00 (Jayyid Jiddan).',
        image: evidence.syahadah,
      },
      {
        year: '2024',
        title: '2nd Place, Muhadharah Public Speaking Contest — boarding-school level',
        issuer: 'OSTARS Ma\'had Tahfizhul Qur\'an Tarbiyah Sunnah',
        note: 'Held on 2 November 2024 at the Umar bin Khattab Mosque, Selacau village, West Bandung regency.',
        image: evidence.juara2,
        extra: [...evidence.juara2Interlude],
      },
    ],
    courses: [
      { id: 'Web Application Development', en: 'Web Application Development' },
      { id: 'Web Client Development', en: 'Web Client Development' },
      { id: 'Database System', en: 'Database Systems' },
      { id: 'Data Wrangling', en: 'Data Wrangling' },
      { id: 'Stochastic Modeling', en: 'Stochastic Modelling' },
      { id: 'Statistika & Probabilitas', en: 'Statistics & Probability' },
      { id: 'Algoritma & Struktur Data', en: 'Algorithms & Data Structures' },
      { id: 'Pemrograman (Python)', en: 'Programming (Python)' },
      { id: 'Basis Data Lanjutan', en: 'Advanced Databases' },
    ],
    languages: [
      { name: 'Indonesian', level: 'Native speaker' },
      { name: 'Arabic', level: 'Good — professional working proficiency' },
      { name: 'English', level: 'Beginner, currently learning' },
    ],
    activities: [
      {
        title: 'OSIS — Head of Security',
        caption: 'OSIS members of Ma\'had Tahfizhul Qur\'an Tarbiyah Sunnah at a briefing in the school yard, 2024.',
        image: activityImages.osis1,
        aspect: 'landscape',
      },
      {
        title: 'OSIS — coordination meeting',
        caption: 'OSIS board in uniform in front of the Umar bin Khattab Mosque, West Bandung, 2024.',
        image: activityImages.osis2,
        aspect: 'portrait',
      },
      {
        title: 'SGA — Public Communication & Relations Division',
        caption: 'The Cakrawala University SGA team during an activity documentation session, 2026.',
        image: activityImages.sga2,
        aspect: 'portrait',
      },
      {
        title: 'SGA — division activity',
        caption: 'Documentation of a Cakrawala University SGA activity, 2026.',
        image: activityImages.sga1,
        aspect: 'portrait',
      },
      {
        title: 'Chill Spill — programme committee',
        caption: 'The "Chill Spill" programme committee under the Cakrawala University SGA, 2026.',
        image: activityImages.chill1,
        aspect: 'landscape',
      },
      {
        title: 'Chill Spill — event coverage',
        caption: 'Coverage of the "Chill Spill" event series, 2026.',
        image: activityImages.chill2,
        aspect: 'portrait',
      },
    ],
  },
}
