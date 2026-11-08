# Sisa yang Perlu Kamu Isi — Website Portofolio

**Dibuat:** 3 November 2026
**Untuk:** Zahir Ali
**Status:** semua keputusan besar (warna, tagline, proyek, domain) sudah **selesai**. File ini cuma sisa terakhir.

Cara pakai: jawab **langsung di bawah tiap pertanyaan**. Kalau nggak tahu, tulis `tanya` — nanti kita bahas.

Tanda:
- 🔴 = gw nggak bisa mulai ngoding kalau ini belum diputus
- 🟡 = perlu, tapi bisa sambil jalan
- ⚪ = santai, bisa belakangan

---

## BAGIAN 0 — Yang sudah gw isi sendiri (JANGAN dijawab lagi)

Gw sudah baca CV-mu, repo CineList, dan semua file di komputermu. Jadi ini sudah beres tanpa perlu kamu apa-apain:

| Yang dulu kosong | Sudah jadi | Dari mana |
|---|---|---|
| Skill dari CineList | 10 skill (Python, FastAPI, SQLAlchemy, PostgreSQL, Alembic, JWT, pytest, React, Git, REST API) | diperiksa dari 62 file Python di repo |
| Link repo CineList | `github.com/zahirali75/Watchlist_project` | repo |
| Angka hasil proyek CineList | 7 tabel, 29 endpoint, 148 tes | dihitung dari kode & database |
| Screenshot CineList | 9 gambar + 1 ERD | diambil otomatis, sudah gw cek isinya |
| Foto profil | sudah dipotong 1:1, 3 ukuran + WebP | file PAS_FOTO kamu |
| Favicon & og-image | sudah dibuat (inisial Z, tema terang) | dibuat |
| Foto kegiatan | 7 foto OSIS/SGA/Chill Spill + thumbnail | file yang kamu kasih |
| CV & syahadah | disalin ke folder website | file kamu |
| URL LinkedIn | dipendekin jadi `linkedin.com/in/zahir-ali-55b1b3382` | kamu setuju |
| Bahasa & alamat | Indonesia (asli), Arab (baik), Inggris (beginner); asal Bandung kini di Bogor | CV + jawabanmu |
| Riwayat pendidikan | Ma'had Tarbiyah Sunnah + PKBM Ahsani | CV |
| Jurusan, IPK, semester | Data Science, 3.82, semester 3 | form |
| Soft skill, prestasi hafiz 15 juz | 5 soft skill + status hafiz | form + CV |

**Kesimpulan: yang tersisa cuma 6 keputusan + 6 tulisan.** Nggak banyak.

---

## BAGIAN 1 — 6 KEPUTUSAN TERAKHIR 🔴

Ini yang bikin gw nggak bisa lanjut ngoding. Semuanya keputusan pendek, bukan karangan panjang.

### 1.1 Bahasa website — satu bahasa atau dua bahasa?

Di form kamu awalnya jawab "indo aja", tapi terus bilang berubah pikiran dan mau fitur dua bahasa. Ini harus diputus **sekarang**, karena kalau nanti ditambah, semua teks harus dipindah ulang.

Kalau dua bahasa, cara kerjanya gini: ada tombol kecil `ID | EN` di kanan atas. Klik → teksnya berubah. File-nya jadi dua: `id.ts` dan `en.ts`. Yang harus kamu tahu: **teks Inggrisnya harus kamu tulis atau minta gw tulis** — kalau gw yang tulis, nanti harus kamu koreksi.

- [ ] A. Indonesia saja (paling cepat, 0 kerja tambahan)
- [ ] B. Dua bahasa ID + EN, tombol manual di kanan atas ← *rekomendasi gw, bagus buat lamaran beasiswa*
- [ ] C. Dua bahasa, otomatis ngikuti bahasa browser pengunjung (lebih ribet, pengunjung nggak sadar bisa ganti)

Jawab: B

### 1.2 Sertifikat Juara 2 — tahunnya 2024 atau 2025?

Gw baca sertifikatnya, isinya:

> **SERTIFIKAT JUARA 2 LOMBA MUHADHARAH AKBAR**
> Nama: Zahir Ali Izzaturrahman
> Tanggal: **2 November 2024**
> Penyelenggara: OSTARS Ma'had Tahfizhul Qur'an Tarbiyah Sunnah
> Lokasi: Desa Selacau, Kec. Batujajar, Kab. Bandung Barat

Di form kamu tulis "Juara 2 lomba pidato — 2025 — tingkat sekolah". **Tahunnya beda** (2024 vs 2025) dan ini lomba **internal pondok**, bukan tingkat sekolah. Mana yang benar? Ini penting karena salah tahun/tingkat bisa dipatahkan dosen yang teliti.

- [ ] A. Ikuti sertifikat: **2024**, tingkat **ma'had/pondok**
- [ ] B. Yang benar 2025, tingkat sekolah (berarti sertifikatnya yang lain — sebutkan file mana)
- [ ] C. Ada dua-duanya (dua sertifikat berbeda) — sebutkan yang satunya

Jawab: A

✅ **BERES — dikonfirmasi ulang.** Yang dipasang di situs: **2024**, tingkat ma'had, tanggal 2 November 2024. Kedua bahasa (ID/EN) sudah memakai tahun ini. Jangan diubah lagi.

### 1.3 Kamu punya sertifikat LDKS — mau ditampilkan?

Gw nemu sertifikat ini di screenshot kamu (yang tadi kamu sebut "belum dijelaskan isinya"):

> **SERTIFIKAT LATIHAN DASAR KEPEMIMPINAN SISWA (LDKS)**
> No: 007/LDKS-OSTARS/MTQTS/XI/2024
> Peserta: Zahir Ali Izzaturrahman
> Tanggal: 07–08 Februari 2024, Ranca Cangkuang, Ciwidey, Bandung
> **Predikat: Sangat Baik**

Ini kuat untuk bagian pengalaman/kepemimpinan, dan belum masuk daftar prestasimu.

- [ ] Ya, tampilkan
- [ ] Nggak perlu

Jawab: nggak perlu

### 1.4 Foto OSIS yang ketiga — pakai atau ganti?

Kamu kasih 3 foto OSIS. Gw periksa satu-satu:

| File | Isinya (hasil gw lihat) | Layak? |
|---|---|---|
| `osis-grup-1.jpg` | ~30 santri berseragam jas hitam di halaman pondok, foto formal | ✅ bagus |
| `osis-grup-2.jpg` | 10 orang baju hitam di depan **Masjid Jami Umar bin Khathab** | ✅ bagus |
| `osis-grup-3.jpg` | 9 orang muda di tempat seperti **kafe/studio**, pakai jersey bola, balon pesta | ⚠️ bukan suasana OSIS/pondok |

- [ ] A. Tetap dipakai (gw kasih caption netral saja, tanpa menyebut OSIS)
- [ ] B. Buang, cukup 2 foto
- [ ] C. Ganti dengan foto lain — taruh file barunya di sini: ______

Jawab: B

### 1.5 Sertifikat hafiz (PDF) — ditampilkan atau cukup ditulis?

Kamu punya `SYAHADAH_TAHFIZH_ZAHIR_ALI_IZZATURRAHMAN.pdf` (hafiz 15 juz). Ada 2 pilihan:

- [ ] A. Ditampilkan sebagai **teks + gambar** (halaman PDF-nya gw ubah jadi gambar, jadi orang lihat langsung tanpa bisa mengunduh) ← *rekomendasi gw, aman*
- [ ] B. Ditampilkan sebagai **PDF yang bisa diunduh** (paling kuat buktinya, tapi semua orang bisa simpan file pribadimu)
- [ ] C. **Cukup ditulis sebagai teks** tanpa bukti ("Hafiz 15 Juz — Yayasan Tarbiyah Sunnah, 2025")

Jawab: A

### 1.6 Pengalaman kerja di CV yang belum masuk form

Di CV-mu ada ini, tapi belum pernah kamu sebut di form:

> **Fasilitator Operasional Teknis & Pembelajaran — Cakrawala University**
> - Mengelola operasional pembelajaran hibrida (Zoom, kamera, mikrofon)
> - Menjaga stabilitas audio-visual selama kuliah & menangani gangguan teknis
> - Mengelola data presensi & rekap kehadiran mahasiswa

Ini **pengalaman kerja nyata** (bukan magang). Mau ditampilkan di bagian pengalaman?

- [ ] Ya, tampilkan sebagai "Fasilitator Teknis — Cakrawala University". Periode: ______ (dari bulan/tahun berapa sampai berapa?)
- [ ] Ya, tapi jangan sebut nama kampusnya (tulis "Kampus" saja)
- [ ] Tidak perlu

Jawab: Ya, tampilkan sebagai "Fasilitator Teknis — Cakrawala University". Periode: Mei - Oktober 2026

**Bonus pertanyaan soal OSIS:** di form kamu tulis posisi "ketua", tapi di CV kamu tulis **"Ketua Bagian Keamanan"** (2024–2025) dan ada juga **"Anggota Bagian Kebersihan"** (2022–2023). Yang mana yang mau ditampilkan?

Jawab: Ketua divisi keamanan saja

---

## BAGIAN 2 — 6 TULISAN PENDEK 🟡

Ini bukan keputusan, cuma nulis. Gw sudah siapkan **contoh jawabannya** biar kamu tinggal setuju atau koreksi — jauh lebih cepat daripada nulis dari nol.

### 2.1 "Masalah" proyek CineList (kamu bilang belum ngerti maksudnya)

Oke gw jelaskan dulu. **"Masalah" itu bukan tugas kuliahnya.** Kata "masalah" di sini artinya: **kenapa aplikasi ini perlu ada? Apa yang bikin susah sebelum aplikasi ini ada?**

Contoh: kalau dosen bikin tugas "bikin aplikasi kasir", maka masalahnya bukan "ada tugas bikin kasir", tapi "toko ini nyatet penjualan di buku tulis, jadi tiap akhir bulan bingung mana yang laku". Tugasnya cuma wadahnya, masalahnya yang bikin ada gunanya.

Nah gw tahu kamu nggak pernah bilang "gw mau bikin CineList karena sedang ada masalah ini" — ini tugas dosen. Jadi cara jujur: tulis masalah dari **sisi pengguna**, bukan dari sisimu.

**Draf gw (koreksi kalau salah):**

> "Film yang ingin ditonton mudah lupa dan catatannya tercecer — di Notes HP, di chat sama teman, di ingatan. Akibatnya film yang sudah ditonton bisa ditonton ulang, dan pendapat setelah menonton hilang begitu saja. CineList menyatukan daftar tontonan dan ulasan di satu tempat."

- [ ] Setuju, pakai draf ini
- [ ] Kira-kira begitu tapi gw mau ubah — tulis versimu: ______
- [ ] Bukan itu masalahnya, yang benar: ______

Jawab:  Setuju, pakai draf ini


### 2.2 Peran & kontribusi kamu di CineList

Kamu sudah bilang: leader, bikin pipeline TMDB → Supabase, bikin beberapa endpoint, nambah JWT, belajar merapikan folder, koreksi frontend. Itu sudah bagus, gw cuma perlu **angka** biar kuat.

Gw cek dari repo, ini yang cocok dengan yang kamu bilang:

| Kontribusimu | Angka nyata |
|---|---|
| Pipeline data dari TMDB ke Supabase | seeder sendiri, jalan otomatis |
| Endpoint API yang kamu bikin | total 29 endpoint (36 operasi) |
| Autentikasi JWT | + refresh token rotation & reset password |
| Merapikan struktur folder | 6 lapisan aplikasi (routers → services → repositories) |
| Tes otomatis | 148 tes |
| Frontend yang kamu koreksi | 41 file React |

- [ ] Semua benar, pakai ini
- [ ] Ada yang salah, yang benar: ______

Jawab: Semua benar, pakai ini


### 2.3 Tantangan CineList — 1 hal yang bikin kamu mentok

Ini **cuma kamu yang bisa jawab** (gw nggak boleh ngarang). Contoh bentuk jawaban:

> "Waktu bikin pipeline TMDB, data-nya ke-duplikat karena gw jalanin seeder dua kali. Solusinya gw kasih pengecekan sebelum insert, jadi data lama nggak ketimpa."

Tulis 1 saja:

Jawab: awal nya agak kebingungan lebih baik membangun backend dulu atau frontend dulu, namun setelah saya bertanya ke assisten dosen, lebih baik kita mulai dengan membangun backend hingga solid, setelah itu frontend nya bisa ngikut

### 2.4 Mata kuliah relevan (baru 3, butuh 5–8)

Kamu tulis: Web Application Development, Database System, Data Wrangling. Kurang 2–5 lagi.

Yang mungkin ada di transkripmu (centang yang benar):
- [✓ ] Stochastic Modeling
- [✓ ] Statistika / Probabilitas
- [ ✓] Algoritma & Struktur Data
- [✓ ] Pemrograman (Python / Java)
- [✓ ] Basis Data Lanjutan (Advanced Database)
- [ ] Lainnya: ______

Jawab:

### 2.5 Skill dari UAS Advanced Database — tingkat jujurnya

Kamu bilang: "UAS ADS gw cuma belajar set up dan task 1 aja, karena waktu padat. Gw sering pakai Postman buat test API."

Jadi gw nggak bakal tulis "SQL lanjutan — Mahir". Ini **kenyataan yang aman dan tetap bagus**:

| Skill | Tingkat usulan gw | Alasan |
|---|---|---|
| SQL dasar (SELECT, WHERE, ORDER BY) | **Dasar → Menengah** | kamu pakai di CineList & Task 1 |
| SQL lanjutan (JOIN, GROUP BY, subquery) | **Dasar** (sedang dipelajari) | belum dipakai di luar kelas |
| Perancangan database / ERD | **Menengah** | kamu bikin skema CineList sendiri |
| Postman (test API) | **Menengah** | kamu bilang sering pakai |

- [ ] Setuju semua
- [ ] Koreksi: btw postman itu masuk nya ke salah satu tools yg pernah gw pake

Jawab:

### 2.6 SGA mulai bulan apa?

Kamu lupa. Di CV kamu tertulis **2026 – Sekarang**, dan Chill Spill itu proker yang kamu pegang.

- [✓ ] Tulis saja "2026 – Sekarang" (aman, sesuai CV)
- [ ] Sebenarnya mulai bulan: ______

Jawab:

---

## BAGIAN 3 — Yang gw kerjakan sendiri ✅

Nggak perlu kamu jawab. Ini biar kamu tahu apa yang akan muncul di website tanpa kamu isi:

1. **Prioritas tampilan** (kamu bilang "serahkan ke kamu"). Urutan gw: (1) hafiz 15 juz & lulusan terbaik, (2) CineList, (3) skill teknis. Alasan: yang bikin kamu beda dari mahasiswa lain bukan React-nya, tapi hafiz 15 juz + lulusan terbaik. Skill teknis menyusul setelah orang tertarik.
2. **Draf "keputusan teknis" CineList** — dari bukti repo (kenapa Alembic jadi sumber kebenaran skema, kenapa refresh token dirotasi). Kamu tinggal koreksi.
3. **Draf "hasil/dampak"** — 7 tabel, 29 endpoint, 148 tes, 6 lapisan.
4. **Bersihkan URL LinkedIn.**
5. **Caption tiap foto** (siapa, acara apa, tahun berapa) berdasarkan yang kamu kasih.
6. **Scan sertifikat hafiz jadi gambar** (kalau kamu pilih opsi 1.5 A).
7. **Tulis ulang PRD** biar konsisten: tema terang, tanpa dark/light, 1 proyek, mailto.
8. **Scaffold proyek** (Vite + React + TypeScript + Tailwind) setelah Bagian 1 selesai.
9. **Pandu bikin akun Vercel** — nanti kita kerjakan bareng, tinggal klik-klik.

---

## RINGKASAN — 12 angka

| Bagian | Jumlah | Prioritas |
|---|---|---|
| Bagian 0 — sudah gw isi | 14 item | ✅ nggak perlu kamu |
| Bagian 1 — keputusan terakhir | 6 | 🔴 jawab duluan |
| Bagian 2 — tulisan pendek | 6 | 🟡 boleh menyusul |
| Bagian 3 — gw kerjakan | 9 | ✅ nggak perlu kamu |

**Urutan tercepat:** 1.1 (bahasa) → 1.2 (tahun juara) → 1.6 (pengalaman kerja) → sisanya boleh menyusul.

Tiga jawaban itu saja sudah cukup buat gw mulai ngoding.
