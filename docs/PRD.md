# PRD — Website Portofolio Personal (v1)

**Pemilik:** Zahir Ali
**Jenis dokumen:** Product Requirements Document
**Status:** Draft — menunggu konfirmasi konten
**Tanggal:** 2 November 2026

---

## 1. Ringkasan

Website satu orang (single-page + beberapa halaman detail) yang berfungsi sebagai
kartu nama digital: menampilkan siapa saya, apa yang saya kerjakan, dan bagaimana
menghubungi saya. Ditujukan untuk audiens akademik (dosen, panitia beasiswa,
organisasi) dan siapa pun yang mencari profil singkat saya.

Bukan toko online, bukan blog aktif. Tujuannya **kredibilitas**, bukan traffic.

---

## 2. Masalah & Motivasi

| Masalah | Akibat sekarang |
|---|---|
| Profil saya tersebar di LinkedIn, GitHub, Drive, dan file PDF | Orang harus mencari sendiri, banyak yang menyerah |
| Belum ada satu URL yang bisa ditempel di email/lamaran/form beasiswa | Sering harus kirim file atau tulis link panjang |
| Proyek kuliah tidak terdokumentasi rapi | Hasil kerja terlihat lebih sedikit dari kenyataan |
| Tidak ada bukti visual kemampuan web dev | Skill hanya berupa klaim di CV |

**Tujuan:** satu URL yang membuat orang paham profil saya dalam < 60 detik.

---

## 3. Target Audiens

**Persona utama — Dosen / Pembimbing**
- Buka dari laptop, sering sambil menilai banyak mahasiswa sekaligus.
- Yang dicari: nama lengkap, jurusan, kemampuan teknis, proyek nyata, kontak.
- Sensitif terhadap tampilan "lebay". Rapi > keren.

**Persona kedua — Panitia beasiswa / organisasi**
- Buka di HP atau laptop, cek: prestasi, sertifikat, konsistensi belajar.
- Yang dicari: bukti terverifikasi (link sertifikat, repo, demo).

**Persona ketiga — Teman / rekruter magang (bonus)**
- Buka di HP. Kalau layout rusak di mobile, langsung tutup.

**Anti-persona (bukan target v1):** klien korporat yang butuh invoice, agensi,
atau pembaca blog rutin.

---

## 4. Definisi Sukses

Bukan soal jumlah visitor. Indikator yang saya pakai:

1. **Uji 60 detik** — orang yang belum kenal saya bisa menyebut (a) saya mahasiswa apa,
   (b) minimal 2 skill teknis, (c) satu proyek, tanpa saya jelaskan apa pun.
2. **Link bisa dipakai di 3 tempat nyata** — email ke dosen, form beasiswa, bio sosial media.
3. **Lighthouse mobile ≥ 90** untuk Performance, Accessibility, Best Practices, SEO.
4. **Nol layout rusak** di 360px, 768px, 1440px.
5. Proyek bisa saya update tanpa menyentuh logika komponen (cukup edit data).

---

## 5. Ruang Lingkup

### Termasuk (v1)
- Halaman utama single-page: Hero, Tentang, Skill, Proyek, Pengalaman & Sertifikat, Kontak
- Halaman detail per proyek (`/proyek/:slug`)
- Dark/light mode (default dark) — opsional, prioritas rendah
- Responsif mobile-first
- SEO dasar: meta tag, Open Graph image, sitemap, `robots.txt`
- Animasi masuk berbasis GSAP (scroll reveal halus, tidak mengganggu)
- Kontak: link email, GitHub, LinkedIn, dan tombol salin email
- Deploy statis + custom domain (opsional)

### Tidak termasuk (v1) — sengaja ditunda
- Blog / CMS / panel admin
- Multi-bahasa (toggle ID/EN)
- Form kontak dengan backend + database (pakai link mailto / Formspree dulu)
- Login, komentar, analytics dashboard
- Halaman testimoni klien

**Alasan penundaan:** tiap item di atas menambah permukaan perawatan. Portofolio
yang tidak pernah di-update karena ribet lebih buruk daripada portofolio sederhana
yang selalu segar.

---

## 6. Requirement Fungsional

Prioritas: **P0** = wajib v1, **P1** = sebaiknya ada, **P2** = kalau sempat.

### FR-1 — Hero Section (P0)
*Sebagai pengunjung, saya langsung tahu ini siapa dan fokusnya apa.*

- Nama lengkap + satu baris penjelas (mis. "Mahasiswa Sains Data — full stack web")
- Foto profil atau avatar
- 2 CTA: "Lihat Proyek" (scroll) dan "Unduh CV" (PDF)
- Indikator lokasi/ketersediaan (mis. "Bandung, Indonesia — terbuka untuk magang")
- Acceptance: semua elemen di atas terlihat tanpa scroll di viewport 360×640,
  kecuali foto boleh turun.

### FR-2 — Tentang (P0)
- Paragraf 80–150 kata: latar belakang, minat, arah karier
- Daftar singkat kuliah (jurusan, semester, kampus)
- Acceptance: teks dibaca nyaman — max-width ~65ch, line-height ≥ 1.6

### FR-3 — Skill (P0)
- Dikelompokkan: Language, Framework/Library, Tools, Sedang dipelajari
- Tiap item punya label tingkat (Dasar / Menengah / Mahir) — jujur, bukan progress bar palsu
- Acceptance: min 12 item, tidak ada progress bar animasi tanpa dasar

### FR-4 — Proyek (P0) — bagian terpenting
*Sebagai dosen, saya butuh bukti kerja, bukan klaim.*

- Grid kartu: thumbnail, judul, ringkasan 1 baris, stack (chip), tahun
- Filter/tag sederhana berdasarkan tech atau kategori (P1)
- Klik kartu → halaman detail berisi: masalah, peran saya, keputusan teknis,
  tantangan & solusi, hasil, link repo/demo
- Proyek bisa ditandai `featured` untuk muncul di beranda
- Acceptance: min 3 proyek terisi lengkap dengan link yang benar-benar bisa dibuka;
  setiap kartu punya gambar (bukan kotak kosong)

### FR-5 — Pengalaman & Sertifikat (P0)
- Timeline: organisasi, kepanitiaan, magang, lomba
- Sertifikat: nama, penerbit, tahun, link verifikasi (jika ada)
- Acceptance: urut terbaru di atas; format tanggal konsisten; tidak ada entri tanpa tanggal

### FR-6 — Kontak (P0)
- Link email, GitHub, LinkedIn, dan sosial lain yang relevan
- Tombol "Salin email" dengan feedback visual ("Tersalin")
- Acceptance: tombol salin berfungsi di desktop & mobile, ada fallback bila Clipboard API diblokir

### FR-7 — Navigasi (P0)
- Navbar sticky ringkas, smooth scroll ke section
- Highlight section aktif saat scroll (scroll spy)
- Menu hamburger di mobile
- Acceptance: bisa menjelajah seluruh halaman tanpa mouse; tidak ada link mati

### FR-8 — Detail Proyek (P0)
- Routing client-side, URL bisa dibagikan & di-refresh tanpa 404
- Tombol kembali ke daftar proyek
- Acceptance: buka `/proyek/xyz` langsung dari tab baru → halaman tampil benar

### FR-9 — Dark/Light Mode (P2)
- Toggle, tersimpan di `localStorage`, menghormati `prefers-color-scheme`
- Acceptance: tidak ada teks yang hilang kontras di kedua mode

### FR-10 — Animasi (P1)
- Reveal on scroll, transisi hover halus, transisi antar-route
- Wajib patuh `prefers-reduced-motion: reduce` (animasi mati total)
- Acceptance: tidak ada layout shift (CLS) akibat animasi; durasi ≤ 600ms

---

## 7. Requirement Non-Fungsional

| Kategori | Target |
|---|---|
| Performa | LCP < 2.5s pada 4G lambat; gambar WebP/AVIF; lazy-load di bawah fold |
| Ukuran | JS bundle awal < 200 KB gzip (GSAP di-load dinamis bila perlu) |
| Aksesibilitas | Kontras WCAG AA (≥ 4.5:1 teks normal); semua gambar punya `alt`; navigasi keyboard penuh; `aria-label` pada ikon |
| SEO | `<title>`, meta description, canonical, OG/Twitter card, sitemap.xml, structured data `Person` |
| Responsif | 360px, 768px, 1024px, 1440px |
| Browser | 2 versi terakhir Chrome, Firefox, Safari, Edge |
| Privasi | Tanpa cookie pihak ketiga; analytics hanya bila dipilih (Plausible/Umami, tanpa cookie) |
| Maintainability | Konten di file data terpisah (`src/data/*.ts`), komponen tidak hardcode teks |
| Hosting | Deploy statis (Vercel / Netlify / GitHub Pages), gratis |

---

## 8. Stack & Arsitektur

```
React 19 + Vite + TypeScript
Tailwind CSS v4 (token warna via @theme)
GSAP + ScrollTrigger (animasi, dimuat dinamis)
React Router (halaman detail proyek)
Konfigurasi deploy statis
```

**Struktur folder (usulan)**

```
src/
  data/           # proyek.ts, skills.ts, experience.ts, profile.ts
  components/
    layout/       # Navbar, Footer, SectionWrapper
    sections/     # Hero, About, Skills, Projects, Experience, Contact
    ui/           # Card, Chip, Button, TimelineItem, CopyEmailButton
  pages/          # Home.tsx, ProjectDetail.tsx, NotFound.tsx
  hooks/          # useScrollSpy, useCopyToClipboard, usePrefersReducedMotion
  lib/            # gsap setup, seo helpers
  styles/         # index.css, tokens
public/
  images/projects/, cv.pdf, og-image.jpg
```

**Sumber konten:** file TypeScript statis di `src/data/*`. Tidak ada CMS, tidak ada
database. Semua konten di-commit ke git → gratis, cepat, bisa di-review lewat diff.

---

## 9. Arah Desain

Kesan yang diinginkan: **tenang, rapi, teknis, tidak ramai**.

- Tema gelap sebagai default dengan aksen satu warna hangat (emas lembut `#e6ca82`)
  di atas latar hampir hitam (`#0f0f11`) — konsisten dengan selera yang sudah terbukti dipakai
- Tipografi: satu sans-serif untuk teks + satu untuk judul; hierarki lewat ukuran & bobot, bukan banyak warna
- Grid terasa lega; whitespace sebagai alat utama kerapian
- Elevasi tipis (border 1px + shadow lembut), hindari glassmorphism berlebihan di
  halaman akademik — mudah terkesan "template"
- Foto proyek harus nyata (screenshot aplikasi), bukan ilustrasi stok

**Prinsip animasi:** ambil ruang, jangan rampas perhatian. Reveal satu kali, tidak berulang.

---

## 10. Fase Pengerjaan

| Fase | Isi | Estimasi |
|---|---|---|
| 0 — Konten | Kumpulkan teks, foto, screenshot proyek, link | 1–2 hari |
| 1 — Fondasi | Vite + TS + Tailwind, token warna, layout, Navbar/Footer | 0.5 hari |
| 2 — Section statis | Hero, About, Skills tanpa animasi dulu | 1 hari |
| 3 — Proyek | Grid + data + halaman detail + routing | 1–1.5 hari |
| 4 — Experience & Contact | Timeline, sertifikat, tombol salin | 0.5 hari |
| 5 — Animasi & polish | GSAP, hover, dark/light, empty states | 0.5–1 hari |
| 6 — QA & deploy | Lighthouse, uji 360/768/1440, aksesibilitas, domain | 0.5 hari |

Aturan: **jangan sentuh animasi sebelum konten asli masuk.** Animasi di atas
teks placeholder menyembunyikan masalah layout yang sebenarnya.

---

## 11. Risiko

| Risiko | Mitigasi |
|---|---|
| Konten tidak selesai → proyek mangkrak | Fase 0 selesai dulu; v1 boleh hanya 3 proyek terbaik |
| Animasi GSAP bikin lambat/CLS | Load dinamis, batasi ScrollTrigger, hormati reduced-motion, ukur Lighthouse tiap fase |
| Overengineering (CMS, blog) | Daftar "tidak termasuk" di atas bersifat mengikat untuk v1 |
| Website tidak pernah di-update | Satu file `src/data/projects.ts` mudah diedit; target update 1× per semester |
| Screenshot proyek belum ada | Sediakan waktu khusus ambil screenshot; jangan pakai gambar stok |

---

## 12. Checklist Konten yang Harus Disiapkan

- [ ] Nama lengkap + satu baris tagline
- [ ] Foto profil (resolusi ≥ 800px, latar bersih)
- [ ] CV terbaru dalam PDF
- [ ] 3 proyek terbaik: judul, masalah, peran, solusi, hasil, stack, link, screenshot
- [ ] Daftar skill + tingkat kejujuran masing-masing
- [ ] Timeline pengalaman (organisasi/kepanitiaan/magang) dengan tanggal
- [ ] Sertifikat + link verifikasi
- [ ] URL GitHub, LinkedIn, email aktif
- [ ] Satu kalimat jawaban: "kalau dosen cuma ingat satu hal tentang saya, apa itu?"

---

## 13. Pertanyaan Terbuka

1. Domain: pakai subdomain gratis (`*.vercel.app`) atau beli `.com`/`.my.id`?
2. Form kontak: cukup `mailto:`, atau pasang Formspree (gratis, tanpa backend)?
3. Perlu halaman terpisah untuk setiap proyek, atau satu modal detail saja?
4. Ada proyek yang tidak boleh dipublikasikan (tugas kelompok, data mitra)?
5. Perlu versi Inggris nanti untuk lamaran beasiswa luar negeri? (ditunda, tapi pengaruhi struktur data)
