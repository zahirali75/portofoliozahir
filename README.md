# Portofolio — Zahir Ali Izzaturrahman

Situs portofolio pribadi: satu halaman (beranda) + halaman detail proyek.
Dua bahasa (Indonesia / Inggris), tema terang "Cozy Neutral Retreat".

## Menjalankan

```bash
npm install
npm run dev      # http://localhost:5173
```

Node wajib ada di PATH. Di mesin ini: `export PATH="/c/Program Files/nodejs:$PATH"`.

## Perintah lain

```bash
npm run typecheck   # cek tipe TypeScript
npm run build       # build produksi ke dist/
npm run preview     # pratinjau hasil build
```

## Susunan

    public/
      images/profile/      foto profil (jpg + webp)
      images/cinelist/     tangkapan layar CineList + ERD
      images/kegiatan/     dokumentasi organisasi
      images/prestasi/     sertifikat & piagam
      images/logo/         favicon, og-image
      cv/                  CV (PDF) + syahadah
    src/
      data/                SELURUH ISI TEKS ada di sini (dua bahasa)
      components/          Navbar, Footer, dan komponen per bagian
      pages/               Home, ProjectDetail
      hooks/               useReveal (GSAP), useScrollSpy, useCopyToClipboard
      lib/locale.tsx       konteks bahasa
      styles/index.css     token tema (warna, font, radius)
    docs/                  PRD, catatan kebutuhan, dan jawaban yang diisi

## Mengubah isi

Semua kalimat di situs berasal dari `src/data/`:

- `index.ts` — profil, kontak, dan seluruh label antarmuka (ID + EN)
- `projects.ts` — isi halaman detail proyek
- `experience.ts` — pengalaman kerja, organisasi, prestasi, mata kuliah, bahasa
- `skills.ts` — daftar keahlian beserta tingkatnya

Untuk menambah proyek: tambahkan satu objek di `projects.ts` (kedua bahasa).

## Catatan angka

Angka yang tampil di halaman CineList diverifikasi langsung dari repo:
29 alamat API dan 36 operasi (dari `/openapi.json` yang hidup), 148 tes otomatis
(grep `def test_`), 7 migrasi (`migrations/versions/`), 44 berkas kode frontend.
Perbarui lewat `docs/` kalau repo berubah — jangan mengarang.

## Deploy

Vercel. Tambahkan `vercel.json` berisi rewrite ke `index.html` agar tautan
`/proyek/...` tidak 404 saat dibuka langsung.
