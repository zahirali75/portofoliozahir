# Daftar Isi yang Masih Kosong — Website Portofolio

**Dibuat:** 3 November 2026
**Status proyek:** Fase 0 (konten) — belum ada kode sama sekali di `C:\Users\Asus\portfolio\`
**Isi folder sekarang:** `docs\PRD.md`, `docs\INFO-DIBUTUHKAN.md`, `assets\screenshots\` (kosong)

Cara pakai file ini:
1. Jawab langsung di bawah tiap pertanyaan.
2. Tulis `[BELUM]` kalau belum ada, `[SKIP]` kalau memang tidak mau ditampilkan.
3. Bagian **A** harus dijawab dulu sebelum ngoding — sisanya boleh menyusul.
4. Kalau ada yang nggak ngerti maksud pertanyaannya, tulis "tanya nanti" — nanti kita bahas.

Kode status:
- 🔴 = blokir, harus dijawab sebelum mulai coding
- 🟡 = perlu diputuskan, tapi bisa sambil jalan
- ⚪ = isi teks biasa, tidak menghambat

---

## A. KEPUTUSAN YANG MEMBLOKIR MULAI 🔴

Sebelum lima poin ini dijawab, gw nggak bisa mulai nulis kode — karena salah pilih di sini artinya harus bongkar ulang nanti.

### A1. Warna & tema — paling mendesak

Ada dua arah yang saling bertabrakan:

| Sumber | Isinya |
|---|---|
| Form B4 (jawabanmu) | Palette "Cozy Neutral Retreat" — terracotta `#B8846E`, beige `#D4B5A0`, krem `#F5E8D7`, sage `#B5BFA6`, olive `#8D9478`, moss `#61735A` → **tema terang, hangat, natural** |
| PRD bagian 9 | Tema gelap, latar hampir hitam `#0f0f11` + aksen emas lembut `#e6ca82` |

Catatan dari gw: palette "Cozy Neutral" itu terang dan low-contrast. Untuk situs akademik sebenarnya bagus dan tenang, tapi teks di atasnya harus digelapkan (mis. cokelat tua), dan angka "Lighthouse ≥ 90 Accessibility" di PRD harus diuji ulang karena kontrasnya tipis.

**Pilih satu:**
- [ ] A. Tema terang, pakai palette "Cozy Neutral Retreat" (PRD bagian 9 direvisi)
- [ ] B. Tema gelap + aksen emas, palette Cozy Neutral dibuang (pertahankan PRD)
- [ ] C. Tema gelap, tapi warnanya diganti dari emas ke nuansa Cozy Neutral (emas → terracotta/sage)

Jawab: A

### A2. Tagline versi Indonesia

Di A3 kamu tulis: `"Data Science Student | Former Hafiz 15 Juz | AI Enthusiast"` — itu bahasa Inggris, padahal J2 bilang situsnya Indonesia saja.

Kalimat yang muncul di layar pertama harus ≤ ~10 kata. Contoh arah:
- "Mahasiswa Sains Data — penghafal 15 juz, penggemar AI"
- "Sains Data & AI — lulusan terbaik, hafiz 15 juz"

**Tulis tagline finalnya (atau bilang "pilihkan gw"):**

Jawab:"Mahasiswa Sains Data — penghafal 15 juz, penggemar AI"

### A3. Domisili mana yang ditampilkan

A4 nulis "Cimahpar, Bogor Utara, Jawa Barat" (sampai kelurahan), C1 nulis "gw asli Bandung". Dua hal yang perlu diputus:

- [ ] Kotanya mana yang benar-benar mau ditampilkan: Bandung / Bogor / keduanya (mis. "asal Bandung, kini di Bogor")
- [ ] Seberapa detail: `"Bogor, Jawa Barat"` (aman) atau `"Bogor Utara, Jawa Barat"` (cukup) atau sampai Cimahpar (spesifik)

Jawab: "asal Bandung, kini di Bogor"

### A4. Jumlah proyek yang ditampilkan

PRD FR-4 minta minimal **3 proyek** dengan gambar. Tapi kamu nulis: *"saya merasa hanya di proyek ini aja yg bener bener saya anggap proyek"* (CineList).

Pilihan:
- [ ] A. Tampilkan CineList saja (1 kartu besar). PRD direvisi, "min 3" dibatalkan. Situs tetap rapi karena ada bagian Prestasi & Pengalaman yang mengisi.
- [ ] B. CineList + 2 proyek ringan (mis. tugas UAS Advanced Database / UAS ADS / project kuliah lain). Perlu judul + 1 kalimat + link tiap proyek.
- [ ] C. Sekarang CineList saja, tapi ditambah proyek baru setelah UAS selesai.

Kalau pilih B atau C, sebutkan calon proyeknya (judul + mata kuliah):

Jawab: A, tapi setelah kita deploy, aku ingin kamu ajarin aku terkait data analyst, kemudian bikin project sederhana agar bisa masuk ke web, btw gw lagi tertarik bgt sama data analis

### A5. Akun Vercel

J4 kamu jawab "gatau". GitHub sudah ada: `github.com/zahirali75`. Untuk deploy gratis PRD butuh Vercel (atau Netlify).

- [ ] Sudah punya akun Vercel → sebutkan email yang dipakai
- [ ] Belum punya → tinggal daftar pakai akun GitHub (1 menit, gratis). Mau gw pandu?

Jawab: boleh tolong di pandu

---

## B. KEPUTUSAN DESAIN & STRUKTUR 🟡

Ini nggak ngeblokir hari pertama, tapi kalau ditunda terlalu lama, bagian yang sudah dibuat harus dirombak.

### B1. Dark/light mode toggle
FR-9 di PRD masih mencatat ini sebagai fitur (P2), tapi J3 kamu jawab "gasah".

- [ ] Hapus dari scope (PRD FR-9 dicabut, satu tema saja)
- [ ] Tetap ada, tapi prioritas paling belakang

Jawab:hapus aja

### B2. Favicon / ikon tab browser
B3 kamu jawab "gw gatau ini apa". Favicon = gambar kecil yang muncul di tab browser sebelah judul halaman.

- [ ] Pakai inisial saja: `ZA` atau `Z` (gratis, 5 menit, aman)
- [ ] Gw bikinin logo teks kecil (inisial + bentuk sederhana, 1 warna)
- [ ] Aku punya logo sendiri → lokasi file:

Jawab:pakai inisial Z, tolong buatin

### B3. Halaman detail proyek: halaman sendiri atau modal?
Pertanyaan terbuka #3 di PRD. FR-8 minta URL bisa dibagikan (mis. `/proyek/cinelist`) supaya bisa ditaruh di CV.

- [ ] Halaman sendiri dengan URL (rekomendasi — cocok buat CV & lamaran)
- [ ] Modal/popup saja (lebih simpel, tapi URL-nya tidak bisa dibagikan)

Jawab:coba yg halaman sendiri aja, tapi jelasin ke gw dulu ntar mau kayak gimana gimana nya

### B4. Form kontak
- [ ] Cukup tombol `mailto:` — buka aplikasi email pengunjung (paling simpel, tanpa layanan pihak ketiga)
- [ ] Tombol "Salin email" saja (tanpa buka aplikasi email sama sekali)
- [ ] Pakai Formspree (form isi langsung di web, gratis, tanpa backend)

Jawab:'coba yg mailto'

### B5. Domain
J1 kamu bilang "vercel aja, saya coba coba dulu" ✓ — tinggal dikunci bentuknya:
- [ ] Gratis: `zahir-ali.vercel.app` (atau nama lain yang kamu mau)
- [ ] Beli `.my.id` (~Rp15–20rb/tahun) — sebutkan kalau mau, nanti gw pandu
- [ ] Beli `.com` (~Rp150rb/tahun)

Kalau gratis, mau subdomain apa? (harus huruf kecil semua, tanpa spasi)

Jawab:`zahir-ali.vercel.app`

### B6. Versi Inggris
J2 kamu jawab "indo aja" ✓. Ini gw kunci jawabannya biar file data disusun satu bahasa. Kalau nanti (misal buat beasiswa luar negeri) mau versi Inggris, struktur file harus dipisah.

- [ ] Indonesia saja, permanen untuk v1 (rekomendasi)
- [ ] Indonesia sekarang, tapi susun file-nya biar gampang ditambah Inggris nanti

Jawab: maaf, seperti nya gw berubah pikiran, kalau dibuat fitur dua Bahasa bisa ga? 

### B7. Bagian K — apa yang TIDAK boleh ada di website
Masih kosong total. Ini penting: kalau salah satu hal di bawah ini muncul, orang lain bisa lihat. Centang yang **tidak boleh tampil**:

- [ ] Nomor HP
- [ ] Alamat lengkap (Cimahpar / Bogor Utara)
- [ ] Nama kampus (Cakrawala University)
- [ ] IPK 3.82
- [ ] Nama pondok pesantren (Ma'had Tarbiyah Sunnah)
- [ ] Instagram pribadi (@zalian._)
- [ ] Email (zalian755@gmail.com)
- [ ] Nama teman/orang lain di foto
- [ ] Data mitra (Dosen/Supabase/CineList tim)
- [ ] Lainnya:

Jawab:sejauh ini belum ada yg aku larang

### B8. Prioritas
Kalau dosen cuma lihat 60 detik, apa yang harus paling dulu kelihatan? Sebutkan 2–3 hal, urut.

Contoh arah: 1) hafiz 15 juz, 2) CineList, 3) skill teknis.

Jawab: saya serahkan ke kamu saja bagus nya seperti apa

---

## C. ISI YANG MASIH BOLONG ⚪

### C1. Skill (bagian E) — ini permintaanmu yang belum dikerjakan

Kamu minta: *"di bagian tools, masukin juga apa aja yg udah gw tau dari project cinelist, dan apa aja yg gw pelajarin dari uas advance database system, INGET YA YANG GW PELAJARIN"*.

Masalahnya dua:
1. E1 sekarang cuma 3 item (excel, pandas, supabase) — dan ketiganya kamu kasih catatan "harus dipelajari kembali". PRD FR-3 minta **minimal 12 item**.
2. Gw nggak boleh ngarang skill dari UAS ADS. Gw cuma boleh masukkan yang kamu konfirmasi.

**Cara kerjanya:** kolom "Dari CineList" di bawah ini gw susun dari bukti nyata di repo (gw sudah periksa langsung: 62 file Python, 2.938 baris backend, 3.881 baris frontend, 7 tabel, 148 tes). Kolom "Dari UAS ADS" **kosong** — kamu yang isi, plus tanda tingkatnya: `Dasar` / `Menengah` / `Mahir`.

Kolom terakhir: pilih jujur — sudah pernah kamu pakai di proyek nyata, atau baru belajar di kelas/lab?

| # | Skill / tool | Sumber | Tingkat (isi sendiri) | Status: dipakai di proyek / baru belajar |
|---|---|---|---|---|
| 1 | Python | CineList (backend, seeder TMDB) | | dipakai |
| 2 | FastAPI | CineList (seluruh API, 29 path / 36 operasi) | | dipakai |
| 3 | SQLAlchemy 2.0 (ORM) | CineList | | dipakai |
| 4 | PostgreSQL / Supabase | CineList (DB produksi) | | dipakai |
| 5 | Alembic (migrasi DB) | CineList (7 revisi, 0001→0007) | | dipakai |
| 6 | JWT + refresh token rotation | CineList (autentikasi) | | dipakai |
| 7 | pytest (penulisan tes) | CineList (148 tes terkumpul) | | dipakai |
| 8 | React 18 + Vite | CineList (frontend, 41 file) | | dipakai |
| 9 | Git & GitHub | CineList + repo ini (24 commit) | | dipakai |
| 10 | REST API & CORS | CineList | | dipakai |
| 11 | Excel (analisis data) | E1 jawabanmu | Menengah (catatanmu: perlu di-refresh) | dipakai |
| 12 | pandas (bersih-bersih CSV) | E1 jawabanmu | Menengah (catatanmu: perlu di-refresh) | dipakai |
| 13 | SQL dasar (SELECT, JOIN, WHERE) | UAS Advanced Database? | | menengah |
| 14 | SQL lanjutan (GROUP BY, subquery, agregasi) | UAS Advanced Database? | | dasar |
| 15 | Perancangan DB / ERD / normalisasi | UAS Advanced Database? | | menengah |
| 16 | MongoDB / NoSQL | E2 jawabanmu ("sedang dipelajari") | | baru belajar |
| 17 | Tailwind CSS | proyek portofolio ini (nanti) | | baru belajar |
| 18 | GSAP (animasi) | proyek portofolio ini (nanti) | | baru belajar |
| 19 | TypeScript | proyek portofolio ini (nanti) | | baru belajar |
| 20 | Figma | E2 jawabanmu | | konfirmasi mana | ini proyek dulu banget, tapi kemampuan nya menengah

**Pertanyaan yang perlu kamu jawab:**
- Baris 13–16: apa saja yang benar-benar kamu pelajari di UAS Advanced Database / ADS? Tulis bebas, nanti gw rapikan. (Gw nggak mau tulis "SQL lanjutan — Mahir" kalau kamu belum pernah pakai di luar soal ujian.)
- Baris 19–20: TypeScript & Figma — sudah pernah dipakai atau belum? Kalau belum, tetap ditulis sebagai "sedang dipelajari" (aman & jujur).
- Ada skill lain yang belum masuk daftar? (mis. Canva, Power BI, Tableau, Postman, Linux)

Jawab: uas ADS gw cuman belajar set up dan task 1 aja, karena Waktu yang padat. Gw sering pakai postman juga buat nge test API

### C2. Proyek CineList (F1) — 6 dari 9 kolom masih kosong

Yang sudah ada: judul, tahun, masalah (1 kalimat), teknologi, link screenshot.

| Kolom | Status | Catatan |
|---|---|---|
| Judul | ✅ Cinelist | |
| Tahun | ✅ 2026 | |
| Masalah | ⚠️ "Membuat aplikasi full stack" | Terlalu umum. Dosen nggak dapat gambaran masalah apa yang dipecahkan |
| Peran saya | ❌ kosong | Sendiri atau tim? Kalau tim, bagian mana yang kamu kerjakan? |
| Teknologi | ✅ Supabase+SQL, FastAPI, React | Bulatkan juga: PostgreSQL, Alembic, JWT, pytest, Vite |
| Keputusan teknis | ❌ kosong | Gw bisa draf dari bukti repo (mis. kenapa refresh token dirotasi, kenapa Alembic jadi sumber kebenaran skema) — kamu tinggal revisi |
| Tantangan & solusi | ❌ kosong | Ceritakan 1–2 hal yang bikin kamu mentok dan cara lewatnya |
| Hasil / dampak | ❌ kosong | Angka yang aman & jujur: 7 tabel, 29 endpoint, 148 tes, 24 commit |
| Link repo | ❌ kosong | Tersedia: `github.com/zahirali75/Watchlist_project` |
| Link demo | ❌ kosong | Belum ada — perlu deploy dulu (lihat A5) |
| Screenshot | ❌ belum dipindah | Folder `assets\screenshots\` masih kosong; server CineList masih hidup, bisa gw ambil |

**Yang perlu kamu jawab:**
- Masalah versi 1–2 kalimat bahasa awam (bukan "membuat aplikasi full stack").
- Peran: sendiri / tim (kalau tim, persentase atau bagiannya).
- 1–2 tantangan nyata yang kamu alami sendiri.
- Boleh gw tulis draf keputusan teknisnya dari repo, terus kamu koreksi? (ya / nggak)

Jawab: gw masih gatau apa maksud 'masalah' disini, karena ini itu tugas dari dosen. peran gw sebagai leader di projek ini, gw buat pipeline dari tmdb biar bisa masuk ke supabase gw, gw buat beberapa endpoint, gw nambahin jwt, gw belajar cara rapihin folder, gw koreksi bagian frontend, 

### C3. Pengalaman & Organisasi (bagian G)

| Entri | Status | Masalahnya |
|---|---|---|
| Ostars (OSIS Tarbiyah Sunnah) — Ketua | ✅ ada | Sudah lengkap, tinggal dipindah jadi 1 entri rapi |
| SGA — Public Communication (Anggota) | ⚠️ setengah | Disebut di B2, tapi belum jadi entri tersendiri di G, dan belum ada di daftar skill soft. Periode cuma "2026 – Sekarang" tanpa bulan |
| Magang | ❌ belum jelas | Belum ada. Kalau memang belum pernah, tulis "belum" biar nggak dicari-cari |

**Yang perlu kamu jawab:**
- SGA mulai bulan berapa? Apa 2–3 pekerjaan konkretmu di situ?
- Ada pengalaman lain yang mau ditampilkan? (kepanitiaan, lomba, volunteer, kerja sampingan kliper)
- Foto kegiatan: entri OSIS & SGA belum ada fotonya. Kirim lokasi filenya atau tulis `[BELUM]`.

Jawab: gw lupa SGA mulai bulan berapa, tapi gw megang 1 proker yaitu chill spill
dokumentasi chill spill : "C:\Users\Asus\Downloads\IMG_0727.HEIC" "C:\Users\Asus\Downloads\IMG_0692.HEIC"
dokumentasi gw pas di SGA : "C:\Users\Asus\Downloads\ece280c8-8727-4010-8046-8fcb59246eb2.jpg" "C:\Users\Asus\Downloads\cd6e615e-3198-45aa-860e-cd0e84541186.jpg"
dokumentasi osis tarbiyah sunnah : "C:\Users\Asus\Downloads\WhatsApp Image 2026-11-03 at 22.59.13.jpeg" "C:\Users\Asus\Downloads\WhatsApp Image 2026-11-03 at 23.04.33.jpeg" "C:\Users\Asus\Downloads\WhatsApp Image 2026-11-03 at 23.04.58.jpeg" 

### C4. Prestasi & Sertifikat (bagian H)

| # | Isi | Status |
|---|---|---|
| H1 | Hafiz Quran 15 Juz — Yayasan Tarbiyah Sunnah — 2025 | ✅ ada, bukti PDF `SYAHADAH_TAHFIZH_...pdf` (ada di disk) |
| H2 | Juara 2 lomba pidato — tingkat sekolah — 2025 | ✅ ada, bukti screenshot |
| H3 | Santri terbaik/teladan — 2025 | ⚠️ **kamu taruh di kolom "prestasi yang TIDAK mau ditampilkan"** |

**Pertanyaan penting:** "Santri terbaik/teladan" itu prestasi kuat (kamu lulusan terbaik pondok). Yakin mau disembunyikan? Kalau salah taruh, bilang sekarang — ini bisa jadi salah satu poin teratas di halaman.

- [ ] Memang mau disembunyikan
- [ ] Salah taruh, tampilkan saja

Jawab: salah taruh, tampilkan 

Tambahan yang perlu diputus:
- [ ] Syahadah hafiz (PDF) mau ditampilkan di web? Kalau ya, PDF-nya harus ada di folder deploy — PDF itu dokumen pribadi, jadi keputusanmu.
- [ ] Ada prestasi/sertifikat lain yang belum disebut? (mis. lomba data science, kursus online, sertifikat kampus)

Jawab: maksud nya gmn

### C5. Foto & aset (bagian B)

Semua file **ada** di disk (sudah gw cek), tapi belum ada di folder website:

| Aset | Lokasi sekarang | Sudah di folder web? |
|---|---|---|
| Foto profil | `C:\Users\Asus\Downloads\Magang\Study In Saudi\PAS_FOTO_ZAHIR_ALI_IZZATURRAHMAN.jpg` | ❌ |
| CV PDF (tombol "Unduh CV") | `...\ZAHIR ALI IZZATURRAHMAN_CV.pdf` | ❌ |
| Syahadah hafiz | `...\SYAHADAH_TAHFIZH_ZAHIR_ALI_IZZATURRAHMAN.pdf` | ❌ |
| Foto lomba pidato | `...\OneDrive\Pictures\Screenshots\Screenshot 2026-11-03 171751.png` + `171833.png` | ❌ |
| Screenshot CineList | `...\Screenshot 2026-11-03 180428.png` (cuma 1, isinya halaman home) | ❌ |
| Foto offline (bukti pernyataan offline) | `...\Screenshot 2026-11-03 175040.png` (ada, belum dijelaskan isinya) | ❌ |

Catatan gw soal foto profil: sudah gw lihat — latar putih bersih, satu orang, kepala & bahu, ukuran pas, aman dipotong kotak. ✅ layak pakai.

**Pertanyaan:**
- Screenshot CineList yang ada baru 1 (halaman home). PRD minta tiap kartu proyek punya gambar. Mau gw ambil otomatis 12 screenshot lengkap (home, movies, genres, detail film, watchlist, ulasan saya, profil, + versi mobile)? Server backend `:8000` dan frontend `:5173` masih hidup sekarang.
  - [ ] Ya, ambil semua
  - [ ] Ambil sebagian saja — sebutkan halaman mana
- Foto "175040" itu isi apa? (perlu keterangan buat caption)
- CV yang ada (`ZAHIR ALI IZZATURRAHMAN_CV.pdf`, ukuran 3,9 MB) — masih terbaru? Karena itu yang diunduh orang lewat tombol "Unduh CV". Kalau semester/gaji IPK sudah berubah, mending di-update dulu.
- Foto profil: mau gw buatkan versi persegi (1:1) dan versi WebP kecil biar situs cepat? (asli tetap disimpan)

Jawab: screenshot cinelist : "C:\Users\Asus\OneDrive\Pictures\Screenshots\Screenshot 2026-11-03 230755.png" "C:\Users\Asus\OneDrive\Pictures\Screenshots\Screenshot 2026-11-03 230804.png" "C:\Users\Asus\OneDrive\Pictures\Screenshots\Screenshot 2026-11-03 230830.png" "C:\Users\Asus\OneDrive\Pictures\Screenshots\Screenshot 2026-11-03 230950.png" erd masih kurang rapih, tolong rapihin tata letak nya, terus kalo masih butuh screenshot, lu ambil aja ya. terus terkait cv kata gw jangan dulu, kita update dulu, setelah portofolio ini kita buat, baru kita susun cv. ya foto profil boleh kamu ubah jadi 1:1

### C6. Kontak & ajakan (bagian I)

- **I1 kosong:** setelah orang lihat web ini, kamu ingin mereka ngapain? (hubungi untuk magang / ajak kolaborasi / minta CV / sekadar kenal). Ini menentukan kata-kata di bagian paling bawah halaman.
- **LinkedIn:** URL-mu masih panjang, ada embel-embel `?utm_source=share_via&utm_content=profile&utm_medium=member_ios`. Rencana gw bersihkan jadi `linkedin.com/in/zahir-ali-55b1b3382` — setuju?
- **I4:** jawabanmu "semuanya tampilkan". Yang tersedia: GitHub ✅, LinkedIn ✅, Instagram `@zalian._` ✅, Kaggle (kosong), Google Scholar (kosong).
  - [ ] Instagram ikut ditampilkan
  - [ ] Instagram jangan ditampilkan

**Tulis jawabanmu (terutama I1):**

Jawab:bisa tau siapa saya, boleh lu pendekin url linkedIn gw, Instagram tampilkan saja

---

## D. YANG BISA GW KERJAKAN SENDIRI — NGGAK PERLU KAMU JAWAB ✅

Ini gw laporkan biar kamu tahu batas antara "belum dikerjakan" dan "nggak perlu kamu apa-apain":

1. Ambil 12 screenshot CineList otomatis dan masukkan ke `assets\screenshots\` (server masih nyala).
2. Isi link repo CineList + angka verified dari repo (7 tabel, 29 endpoint, 148 tes, 2.938 baris).
3. Bersihkan URL LinkedIn jadi versi pendek.
4. Tulis draf F1 CineList (masalah, keputusan teknis, tantangan, hasil) dari bukti kode — kamu tinggal revisi.
5. Salin foto profil, CV, dan syahadah ke folder web + bikin versi persegi/WebP.
6. Bikin `og-image` (gambar preview waktu link dibagi ke WhatsApp/LinkedIn) dan favicon.
7. Scaffold proyek: Vite + React + TypeScript + Tailwind, token warna, Navbar/Footer — **setelah A1 (warna) diputuskan.**
8. Tulis ulang PRD supaya konsisten dengan jawabanmu di file ini (bagian "tidak termasuk", FR-9, jumlah proyek).

---

## RINGKASAN CEPAT

| Blok | Jumlah item | Prioritas |
|---|---|---|
| A. Keputusan blokir | 5 | 🔴 jawab dulu |
| B. Keputusan desain | 8 | 🟡 sambil jalan |
| C. Isi teks (skill, proyek, pengalaman, prestasi, aset, kontak) | 6 blok | ⚪ menyusul |
| D. Dikerjakan gw sendiri | 8 | ✅ tidak perlu dijawab |

**Urutan paling efisien kalau mau cepat:**
1. A1 (warna) → 2. A2 (tagline) → 3. A4 (jumlah proyek) → 4. C1 (skill) → 5. C2 (CineList) → sisanya menyusul.

Empat langkah pertama itu cukup buat gw mulai ngoding halaman kosong yang sudah berwarna dan berisi.
