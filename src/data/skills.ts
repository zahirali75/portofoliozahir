import type { Locale, SkillGroup } from './types'

/**
 * Tingkat ditulis jujur (lihat docs/YANG-PERLU-DIISI.md bagian 2.5):
 * tidak ada "mahir" untuk hal yang belum pernah dipakai di luar kelas.
 */
export const skills: Record<Locale, SkillGroup[]> = {
  id: [
    {
      title: 'Bahasa & Data',
      items: [
        { name: 'Python', level: 'menengah' },
        { name: 'Pandas — analisis data', level: 'menengah' },
        { name: 'SQL dasar: SELECT, WHERE, ORDER BY', level: 'menengah' },
        { name: 'SQL lanjutan: JOIN, GROUP BY, subquery', level: 'dipelajari' },
        { name: 'Microsoft Excel', level: 'menengah' },
      ],
    },
    {
      title: 'Backend & API',
      items: [
        { name: 'FastAPI', level: 'menengah' },
        { name: 'Perancangan REST API', level: 'menengah' },
        { name: 'SQLAlchemy', level: 'menengah' },
        { name: 'PostgreSQL / Supabase', level: 'menengah' },
        { name: 'Alembic — migrasi database', level: 'menengah' },
        { name: 'Autentikasi JWT', level: 'menengah' },
        { name: 'pytest — tes otomatis', level: 'menengah' },
        { name: 'Perancangan tabel & relasi (ERD)', level: 'menengah' },
      ],
    },
    {
      title: 'Frontend',
      items: [
        { name: 'React', level: 'menengah' },
        { name: 'JavaScript', level: 'menengah' },
        { name: 'HTML & CSS', level: 'menengah' },
        { name: 'Tailwind CSS', level: 'dipelajari' },
        { name: 'TypeScript', level: 'dipelajari' },
      ],
    },
    {
      title: 'Alat kerja',
      items: [
        { name: 'Git & GitHub', level: 'menengah' },
        { name: 'Postman — pengujian API', level: 'menengah' },
        { name: 'Visual Studio Code', level: 'menengah' },
        { name: 'Figma — perancangan antarmuka', level: 'dasar' },
      ],
    },
  ],

  en: [
    {
      title: 'Languages & Data',
      items: [
        { name: 'Python', level: 'menengah' },
        { name: 'Pandas — data analysis', level: 'menengah' },
        { name: 'SQL basics: SELECT, WHERE, ORDER BY', level: 'menengah' },
        { name: 'Advanced SQL: JOIN, GROUP BY, subqueries', level: 'dipelajari' },
        { name: 'Microsoft Excel', level: 'menengah' },
      ],
    },
    {
      title: 'Backend & API',
      items: [
        { name: 'FastAPI', level: 'menengah' },
        { name: 'REST API design', level: 'menengah' },
        { name: 'SQLAlchemy', level: 'menengah' },
        { name: 'PostgreSQL / Supabase', level: 'menengah' },
        { name: 'Alembic — database migrations', level: 'menengah' },
        { name: 'JWT authentication', level: 'menengah' },
        { name: 'pytest — automated testing', level: 'menengah' },
        { name: 'Table & relationship design (ERD)', level: 'menengah' },
      ],
    },
    {
      title: 'Frontend',
      items: [
        { name: 'React', level: 'menengah' },
        { name: 'JavaScript', level: 'menengah' },
        { name: 'HTML & CSS', level: 'menengah' },
        { name: 'Tailwind CSS', level: 'dipelajari' },
        { name: 'TypeScript', level: 'dipelajari' },
      ],
    },
    {
      title: 'Tooling',
      items: [
        { name: 'Git & GitHub', level: 'menengah' },
        { name: 'Postman — API testing', level: 'menengah' },
        { name: 'Visual Studio Code', level: 'menengah' },
        { name: 'Figma — interface design', level: 'dasar' },
      ],
    },
  ],
}
