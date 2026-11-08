# Referensi Desain & Arah Perombakan

Dokumen kerja untuk perombakan tampilan portofolio. Isinya: analisis tiga referensi
yang kamu kirim, pola selera yang terbaca dari situ, dan arah desain turunannya.

Belum ada satu pun perubahan yang dilakukan ke kode. Dokumen ini untuk disetujui dulu.

- Dibuat: 4 November 2026
- Referensi masuk: 3 dari 3
- Status: **menunggu keputusan kamu** (bagian 8)

---

## 0. Fakta referensi yang dipakai

| # | Bentuk | Sumber | Kesanmu (kata-katamu sendiri) |
|---|--------|--------|-------------------------------|
| 1 | Screenshot | `Screenshot 2026-11-04 180335.png` — situs fashion "GAZU" | "di halaman pertama nya langsung menarik perhatian" |
| 2 | Screenshot | `Screenshot 2026-11-04 180514.png` — portofolio "Han Nguyen" | "dari sisi design nya tidak membosankan" |
| 3 | Link | `https://www.aeqonis.tech/` — portofolio "Ikmal Luthfi" | "ada motion motion yg bikin gak bosen dan menarik" |

Catatan kejujuran: untuk referensi 1 gw tidak menemukan URL asalnya, jadi analisisnya
murni dari gambar. Referensi 2 juga dari gambar. Referensi 3 paling akurat karena gw
baca CSS aslinya langsung, bukan menebak dari piksel.

Tiga referensi ini menarik karena kesamaannya justru di hal yang tidak kamu sebut:
ketiganya **nyaris tanpa warna**, bertumpu pada tipografi besar dan komposisi.

---

## 1. Ringkasan: selera kamu sebenarnya apa

Tujuh poin ini muncul di referensi yang berbeda-beda, jadi ini pola, bukan selera sesaat.

| # | Pola | Bukti di referensi |
|---|------|--------------------|
| 1 | **Huruf besar sebagai bintang utama** | Ref 1: "GAZU" setinggi 45% layar. Ref 3: h1 113px, bahkan ada teks 176px |
| 2 | **Latar netral, bukan berwarna** | Ref 1 latar `#f6f5f3` saturasi 0.01. Ref 2 latar krem saturasi ≤0.10. Ref 3 hitam `#0a0a0a` |
| 3 | **Warna hanya sebagai titik kecil** | Ref 1: cuma 118 piksel berwarna dari 241.806 piksel (0,05%). Ref 3: **nol** warna aksen |
| 4 | **Susunan tidak rata / bertumpuk** | Ref 2: tiga kolom lebar beda, kartu tinggi beda, foto ditumpuki label. Ref 1: foto menabrak huruf raksasa |
| 5 | **Hangat dan agak tua, bukan biru korporat** | Semua aksen di ref 1 & 2 ada di rentang hue 16–48 derajat (coklat-jingga-emas). Tidak ada biru/ungu sama sekali |
| 6 | **Gerak halus, bukan gerak heboh** | Ref 3: 3 pita berjalan 42–50 detik (sangat lambat), tanpa satu pun efek kejut |
| 7 | **Datar: tanpa bayangan, tanpa gradasi** | Ref 3: **nol** bayangan di seluruh halaman, sudut 16px seragam |

Poin 7 layak diulang: kamu menyukai halaman yang **tidak punya satu pun bayangan**.
Situsmu sekarang punya `shadow-sm`, `shadow-md`, `shadow-lg` di beberapa tempat.

---

## 2. Analisis per referensi

### Referensi 1 — GAZU (fashion)

**Kenapa menarik di layar pertama.** Bukan karena fotonya. Karena hurufnya.
Nama merek diletakkan setinggi hampir separuh layar, lalu modelnya berjalan *menembus*
huruf itu — foto dan tipografi saling menumpuk, bukan kiri-kanan terpisah.

Angka yang gw baca dari gambarnya:

| Yang diukur | Nilai |
|-------------|-------|
| Latar | `#f6f5f3` — `#f1f0ee` (hue 40°, saturasi 0.01 = praktis abu hangat) |
| Teks | `#0e0e0e` (hitam pekat, hue 0) |
| Aksen | `#a88677`, `#b69584`, `#726153` — coklat hangat, hue 16–27° |
| Warna jenuh | 118 dari 241.806 piksel = **0,05%** |
| Tombol | Kotak hitam pekat, teks putih, sudut tajam |

Yang perlu ditiru: **hubungan ukuran**. Teks pendukung sangat kecil, judul sangat besar.
Perbandingannya mungkin 1:20. Hierarki dibangun dari ukuran dan ketebalan, bukan dari warna.

Yang tidak bisa ditiru: butuh foto orang berpose editorial. Kamu punya 1 foto profil.

---

### Referensi 2 — Portofolio Han Nguyen

**Kenapa tidak membosankan.** Karena tidak ada satu blok yang sama bentuknya dengan
blok lain. Ada kartu krem, kartu kuning mustard, blok hijau tua, label pil yang
menumpuk ke luar batas foto, angka tahun besar berulang jadi hiasan latar.

Angka yang gw baca:

| Yang diukur | Nilai |
|-------------|-------|
| Latar | `#f6efdd`, `#f4f0df` — krem kekuningan (hue 41–48°, saturasi 0.06–0.10) |
| Aksen 1 | `#b5683a` terracotta (hue 22°, saturasi 0.68) |
| Aksen 2 | `#d5a445` mustard/emas (hue 39°, saturasi 0.68) |
| Aksen 3 | `#364f33`, `#314733` hijau tua (hue 113–125°) |
| Rentang hue aksen | 20° – 71° → semuanya hangat, tidak ada biru |

**Ini temuan paling penting.** Palet referensi 2 punya **hue yang sama dengan situsmu
sekarang** — terracotta. Situsmu `#b8846e` (hue 22°). Referensi 2 `#b5683a` (hue 22°).
Sama persis. Jadi seleramu tidak berubah; yang kurang di situsmu adalah **cara
memakainya** — warnamu dipakai merata dan tipis, sedangkan di referensi 2 warna dipakai
sebagai blok besar yang berani.

Tambahan yang bisa diambil: hijau tua `#364f33`. Situsmu punya sage `#8D9478` yang
terlalu pudar dan hampir tidak terlihat. Hijau tua ini bisa jadi penyeimbang.

---

### Referensi 3 — aeqonis.tech (paling akurat, dibaca dari CSS)

**Kenapa geraknya terasa enak.** Bukan karena banyak gerakan — justru sebaliknya.
Halaman ini hampir tidak bergerak, tapi yang bergerak bergerak dengan sangat lambat.

Hasil pembacaan langsung:

| Yang diukur | Nilai |
|-------------|-------|
| Latar | `rgb(10,10,10)` = `#0a0a0a` (hitam) |
| Teks | `rgb(245,245,245)` = `#f5f5f5` |
| Warna aksen | **Nol.** Murni hitam-putih, tidak ada satu pun warna |
| Judul (display) | `Instrument Serif` 400 — 113px di h1, ada yang 176px |
| Teks isi | `Inter` 400 — 11–13px |
| Sudut | 16px seragam |
| Bayangan | **Nol** di seluruh halaman |
| Gerak | 3 pita berjalan: 42s, 45s, 50s (linear, tak berujung) |
| `scroll-behavior` | `smooth` |
| Efek mendatang | 89 elemen pakai `will-change` (disiapkan untuk dianimasikan nanti) |
| Motion library | **Tidak ada** — nol GSAP, Framer, Lenis. Murni CSS |

**Teknik rahasianya — ini yang bikin teks muncul terasa mahal.** Judul h1-nya
dibungkus begini:

```
<span style="display:block">                          <- baris
  <span style="display:inline-block; overflow:hidden;  <- topeng
                padding-bottom:0.12em; margin-right:0.28em">
    <span>Securing</span>                              <- digeser naik
  </span>
  <span style="...">…</span>
</span>
```

Terjemahannya: **tiap kata diletakkan di dalam kotak yang dipotong**. Kata itu
disembunyikan di bawah garis potongan, lalu dinaikkan saat dimuat. Jadi hurufnya
seolah "naik dari lantai" — bukan muncul dengan memudar seperti kebanyakan situs.
Itulah bedanya situs mahal dan situs biasa, dan itu hanya satu properti CSS.

Catatan: karena tidak ada spasi sungguhan antar kata (jaraknya dari `margin-right`),
teks h1-nya kalau di-copy menempel jadi `Securingsystems.Craftinginterfaces.`. Detail
kecil ini yang tidak akan gw tiru, karena merusak aksesibilitas dan SEO.

Yang gw ambil: teknik topeng kata, kecepatan gerak yang lambat, dan larangan bayangan.

---

## 3. Pola yang berulang vs yang cuma sekali

Berguna untuk memisahkan seleramu yang sungguhan dari preferensi sesaat.

**Muncul di ketiga referensi (aman dianggap seleramu):**
- Latar netral dengan warna sebagai titik kecil
- Tipografi besar sebagai pusat perhatian
- Datar — tanpa bayangan, tanpa gradasi
- Gerak lambat dan halus

**Muncul di dua referensi (kemungkinan besar seleramu):**
- Aksen hangat di rentang hue 16–48° (coklat-jingga-emas)
- Susunan tidak rata, ada tumpang-tindih
- Huruf judul bergaya serif klasik (ref 2 & 3)

**Muncul hanya sekali (perlu kamu putuskan, jangan gw asumsikan):**
- **Latar hitam total** — hanya ref 3. Referensi 1 & 2 terang. Jadi ini belum jelas
  apakah kamu mau situsnya gelap, atau kamu cuma suka geraknya.
- **Huruf outline berlubang** ("PORTFOLIO" di ref 2) — hanya di sana.
- **Ilustrasi siluet** — hanya ref 2. Butuh aset yang belum ada.

---

## 4. Temuan penting: font kamu tidak pernah dimuat

Ini bukan soal selera, ini bug. Gw periksa `src/styles/index.css` baris 32–33:

```
--font-sans:    "Inter", "Segoe UI", system-ui, ...;
--font-display: "Fraunces", "Iowan Old Style", Georgia, serif;
```

Lalu gw cek halaman yang sedang jalan:
- `document.fonts.size` → **0**
- Font yang selesai dimuat → **kosong**
- Tidak ada `@import` font, tidak ada `@font-face`, tidak ada tautan `fonts.googleapis.com`
  di `index.html`, tidak ada paket `@fontsource` di `package.json`

Artinya: `Inter` dan `Fraunces` ditulis sebagai pilihan pertama, tapi **tidak pernah
ada**. Browser langsung jatuh ke cadangan — dan di Windows, cadangan `Segoe UI` itulah
yang tampil. Jadi halamanmu selama ini pakai font bawaan Windows.

Kamu sudah punya niat yang benar (Fraunces = serif display, persis arah referensi 3).
Niatnya tidak pernah dijalankan. Memperbaiki ini saja sudah mengubah tampilan secara
nyata, dan biayanya nol.

---

## 5. Arah desain usulan

Prinsip: **terang sebagai dasar, satu blok gelap sebagai jangkar, satu aksen hangat,
huruf besar, datar, gerak lambat.**

Struktur ini diambil dari pola kamu sendiri: referensi 1 dan 2 terang, referensi 3
gelap. Daripada memilih salah satu, ambil dua-duanya secara sengaja — terang untuk
membaca, gelap untuk memberi jeda dan menandai bagian penting.

### 5.1 Warna

Palet ini gw hitung semua rasio kontrasnya, bukan dikira-kira.

| Peran | Token | Hex | Alasan |
|-------|-------|-----|--------|
| Latar dasar | `cream-50` | `#fbf7f0` | Krem hangat dari ref 2 |
| Latar panel | `cream-100` | `#f4ece0` | Pemisah blok tanpa perlu bayangan |
| Blok gelap | `ink-900` | `#0a0a0a` | Persis ref 3 |
| Teks utama | `ink-800` | `#16130f` | Hitam hangat, bukan hitam murni |
| Teks sekunder | `ink-500` | `#5a5248` | Abu hangat |
| Aksen utama | `terracotta-700` | `#8a4a28` | Dari `#b5683a` ref 2, **digelapkan** agar kontras lolos |
| Aksen sorot | `mustard-500` | `#d5a445` | Dari ref 2, pakai di atas blok gelap saja |
| Penyeimbang | `moss-700` | `#364f33` | Hijau tua ref 2, menggantikan sage yang terlalu pudar |

**Tabel kontras — sudah dihitung:**

| Pasangan | Rasio | Syarat | Status |
|----------|-------|--------|--------|
| Teks utama `#16130f` di krem `#fbf7f0` | 17.34 | 4.5 | ✅ |
| Teks sekunder `#5a5248` di krem | 7.19 | 4.5 | ✅ |
| Putih di aksen `#8a4a28` (tombol) | 6.79 | 4.5 | ✅ |
| Aksen `#8a4a28` sebagai teks kecil di krem | 6.36 | 4.5 | ✅ |
| Aksen `#8a4a28` sebagai teks besar di krem | 6.36 | 3.0 | ✅ |
| Mustard gelap `#8a6a1f` sebagai teks di krem | 4.72 | 4.5 | ✅ |
| Mustard `#d5a445` di blok gelap `#0a0a0a` | 8.70 | 4.5 | ✅ |
| Krem di blok gelap | 18.54 | 4.5 | ✅ |
| Putih di hijau tua `#364f33` | 9.04 | 4.5 | ✅ |

**Perbandingan dengan situsmu sekarang:**

| Pasangan sekarang | Rasio | Status |
|-------------------|-------|--------|
| Putih di `#b8846e` (tombol utama) | 3.20 | ❌ gagal |
| Putih di `#9e6c58` (tombol hover) | 4.43 | ❌ gagal |
| `#b8846e` sebagai label kecil di krem | 3.10 | ❌ gagal |

Catatan teknis penting: `#b5683a` (warna asli referensi 2) kalau dipakai tombol
**juga gagal** — cuma dapat 4.19. Jadi warna referensi tidak bisa disalin mentah.
Harus digelapkan ke `#8a4a28`. Ini contoh kenapa referensi harus dibaca, bukan dijiplak.

### 5.2 Tipografi

Tiga opsi. Semuanya gratis, semuanya Google Fonts.

| Opsi | Judul | Isi | Karakter | Catatan |
|------|-------|-----|----------|---------|
| **A** (rekomendasi) | Instrument Serif 400 | Inter 400/500 | Persis ref 3 | Ringan, satu weight, sangat besar. Serif yang tidak kaku |
| B | Fraunces (yang sudah ada) | Inter | Hangat, agak nakal | Sudah ada di CSS, tinggal dimuat. Lebih unik dari Instrument |
| C | Playfair Display 900 | Source Serif 4 + JetBrains Mono | Editorial tegas | Rekomendasi skill. Lebih berat, lebih "majalah" |

Skala ukuran yang diusulkan (dari skala ref 3, disesuaikan ke layar ponsel):

| Elemen | Ponsel | Desktop |
|--------|--------|---------|
| Judul utama (h1) | 44px | 96–128px |
| Judul bagian (h2) | 30px | 56px |
| Teks isi | 16px | 17px |
| Label kecil (mono, HURUF BESAR, spasi lebar) | 11px | 12px |

Aturan: label kecil pakai `letter-spacing` lebar dan huruf besar — ini yang di ref 1 & 3
memberi kesan teknis dan rapi. Teks isi **jangan** pakai huruf besar.

### 5.3 Gerak

Rencana gerak, semuanya dengan batas waktu dan alasan:

| # | Bagian | Teknik | Waktu | Catatan |
|---|--------|--------|-------|---------|
| 1 | Judul hero | Topeng kata (teknik ref 3) | 600ms, jeda 60ms antar kata | Ini yang paling berpengaruh |
| 2 | Pita berjalan | Marquee satu baris | 45s linear tak berujung | Berisi skill/nama teknologi |
| 3 | Muncul saat scroll | Yang sudah ada, diseragamkan | 400–600ms | Maksimal 8 anak per bagian |
| 4 | Angka | Hitung naik saat terlihat | 900ms | Mis. 148 tes, 29 endpoint |
| 5 | Tombol | Membesar halus saat disentuh | 150ms | |
| 6 | Garis kemajuan baca | Batang 2px di atas | ikut scroll | Disarankan langsung oleh skill |

Yang **tidak** dilakukan:
- Parallax lebih dari 3 lapis (skill memperingatkan hasilnya menurun drastis)
- Menyematkan (pin) lebih dari 1 bagian — berat di ponsel
- Animasi pada teks panjang, hanya pada judul pendek

Syarat wajib: semua gerak mati total kalau pengguna mengaktifkan "kurangi gerak"
(`prefers-reduced-motion`). Ini bukan pilihan.

### 5.4 Bentuk dan kedalaman

| Sekarang | Diganti jadi |
|----------|--------------|
| Ada `shadow-sm/md/lg` | **Hapus bayangan.** Pemisah pakai warna panel atau garis |
| Sudut campur | Satu nilai: 16px untuk kartu, 9999px untuk label pil |
| Garis 1px tipis | Garis 2px saat batas blok penting |
| Label kecil memakai warna aksen pudar | Label pakai tinta, aksen hanya untuk sorotan |

---

## 6. Pemetaan ke halaman kamu (sebelum → sesudah)

| Bagian | Sekarang | Sesudah |
|--------|----------|---------|
| **Hero** | Foto profil 260px di tengah + teks | Nama raksasa (44/96px) dengan foto **menumpuk** ke huruf, gaya ref 1 |
| **Fakta cepat** | Baris label kecil | Angka besar: 148 tes, 44 berkas, 29 endpoint, 7 migrasi — gaya ref 2 |
| **Tentang** | Paragraf mengalir | Susunan bertingkat: kartu krem + satu kartu mustard + label pil miring, gaya ref 2 |
| **Keahlian** | Daftar | **Blok gelap** `#0a0a0a` dengan krem di atasnya, gaya ref 3. Ini jangkar visualnya |
| **Proyek** | 1 kartu kecil | Satu kartu besar penuh dengan gambar menabrak batas, gaya ref 1 |
| **Pengalaman** | Garis waktu lurus | Garis waktu dengan tahun sebagai angka besar, gaya ref 2 |
| **Kontak** | Tautan sederhana | Ajakan besar + label kecil huruf besar, gaya ref 1 |
| **Navbar** | Nama + tautan | Nama kecil huruf besar, garis 2px di bawah, tombol ID/EN diperbesar |

Masalah yang perlu kamu tahu: **kamu cuma punya 1 proyek** (CineList).
Susunan grid ala referensi 2 butuh minimal 3 isi supaya tidak terlihat kosong.

Tiga jalan keluar, kamu pilih:
1. Pecah CineList jadi 3 bab: backend, frontend, pengujian — mengisi grid dengan cerita
   satu proyek yang dalam. (Menurut gw paling jujur dan paling kuat)
2. Tambahkan tugas kuliah yang sudah kamu rapikan sebagai proyek kecil (Database System,
   Stochastic Modeling) — mengisi grid dengan kerja nyata
3. Biarkan 1 kartu tapi dibuat lebar penuh — paling jujur, tapi halaman terasa kosong

---

## 7. Yang tidak akan gw lakukan

- Menjiplak logo, teks, gambar, atau aset berhak cipta dari ketiga referensi
- Menyalin warna mentah-mentah tanpa uji kontras (terbukti gagal, lihat 5.1)
- Mengubah satu pun isi tulisan, angka, atau data prestasi
- Memakai font berbayar
- Memasang paket animasi besar (ref 3 membuktikan gerak bagus tidak butuh library;
  GSAP yang sudah ada di proyek cukup)
- Menerapkan desain baru tanpa backup CSS
- Menerapkan hal yang bertentangan dengan aksesibilitas walau terlihat keren
  (contoh: kata menempel tanpa spasi seperti ref 3 — tidak ditiru)

---

## 8. Keputusan yang perlu kamu ambil

Lima pertanyaan. Kalau bingung, ada sarannya.

**1. Seberapa jauh arah gelapnya?**

| Pilihan | Isi | Saran gw |
|---------|-----|----------|
| A | Terang penuh, seperti referensi 1 & 2 | Aman, tapi melewatkan yang kamu suka dari ref 3 |
| **B** | **Terang, dengan 1–2 blok gelap sebagai jangkar** | ✅ Ini yang gw sarankan |
| C | Gelap total seperti ref 3 | Berani, tapi kontenmu akademis — gelap total bisa terasa kurang ramah |

**2. Font mana?** → gw sarankan **Opsi A (Instrument Serif + Inter)**, karena persis
referensi favoritmu dan paling ringan. Kalau ingin lebih hangat, Opsi B (Fraunces,
yang sudah ada).

**3. Proyek: pakai jalan keluar nomor berapa dari bagian 6?** → gw sarankan **nomor 1**
(pecah CineList jadi 3 bab), karena tidak mengarang proyek baru.

**4. Seberapa banyak gerak?**

| Pilihan | Isi |
|---------|-----|
| A | Tenang — hanya muncul saat scroll |
| **B** | **Sedang — topeng teks + pita berjalan + hitung angka** ✅ |
| C | Berani — tambah satu bagian semat (pin) yang dikendalikan scroll |

**5. Perbaikan teknis, kerjakan sekarang atau nanti?**
- Font tidak dimuat (`Inter`/`Fraunces`) → **kerjakan sekarang**, biaya nol
- Gambar 3.068 KB turun ke ~500 KB → bisa sekarang
- Kontras 3 titik gagal → otomatis beres kalau palet baru dipakai

---

## 9. Langkah kerja setelah kamu putuskan

1. Backup CSS: `src/styles/index.css` → `backup/sebelum-rombak-<tanggal>/`
2. Tulis `design-system/portfolio-zahir/MASTER.md` — acuan token resmi
3. Perbaiki pemuatan font (tambah tautan Google Fonts, hanya weight yang dipakai)
4. Ganti blok `@theme` di `src/styles/index.css` dengan token bagian 5.1
5. Sesuaikan komponen per bagian mengikuti tabel bagian 6
6. Tambah gerak bagian 5.3, satu per satu, uji tiap kali
7. Uji: kontras dihitung ulang, berat halaman diukur, tampilan 375/768/1024/1440,
   navigasi keyboard, mode "kurangi gerak"
8. Jalankan `npm run dev` supaya kamu lihat sendiri
9. Kalau kamu bilang solid → baru lanjut ke git, GitHub, Vercel (Tahap 3 di
   `RENCANA-KEDEPAN.md`)

Semua bisa dibatalkan: cukup kembalikan satu berkas `index.css` dari backup.

---

## 10. Lampiran: angka mentah hasil pembacaan

<details>
<summary>Referensi 1 — GAZU (dari gambar, 382x633)</summary>

```
LATAR      #f6f5f3  hue  40°  sat 0.01  val 0.96
           #f8f7f6  hue  30°  sat 0.01  val 0.97
           #f5f5f2  hue  60°  sat 0.01  val 0.96
           #f1f0ee  hue  40°  sat 0.01  val 0.95
AKSEN      #726153  hue  27°  sat 0.27  val 0.45
           #78685a  hue  27°  sat 0.25  val 0.47
           #76564a  hue  16°  sat 0.37  val 0.46
           #a88677  hue  18°  sat 0.29  val 0.66
           #b69584  hue  20°  sat 0.27  val 0.71
           #907363  hue  21°  sat 0.31  val 0.56
TEKS       #0e0e0e  hue   0°  sat 0.00  val 0.05
           #080808  hue   0°  sat 0.00  val 0.03
           #343332  hue  30°  sat 0.04  val 0.20
Total piksel 241.806 | latar 18.408 | aksen 118 (0,05%) | teks 64.261
```
</details>

<details>
<summary>Referensi 2 — Han Nguyen (dari gambar, 357x631)</summary>

```
LATAR      #f6efdd  hue  43°  sat 0.10  val 0.96
           #f4f0df  hue  48°  sat 0.09  val 0.96
           #f8f3e8  hue  41°  sat 0.06  val 0.97
           #f4edde  hue  40°  sat 0.09  val 0.96
AKSEN      #b5683a  hue  22°  sat 0.68  val 0.71   <- terracotta, hue sama dgn situsmu
           #986039  hue  24°  sat 0.62  val 0.60
           #d5a445  hue  39°  sat 0.68  val 0.84   <- mustard
           #b7893c  hue  37°  sat 0.67  val 0.72
           #9f713b  hue  32°  sat 0.63  val 0.62
           #b96739  hue  21°  sat 0.69  val 0.73
TEKS       #030302  hue  60°  sat 0.33  val 0.01
           #314733  hue 125°  sat 0.31  val 0.28   <- hijau tua
           #364f33  hue 113°  sat 0.35  val 0.31   <- hijau tua
Rentang hue aksen: 20°–71° (median 30°) → semua hangat, tanpa biru
```
</details>

<details>
<summary>Referensi 3 — aeqonis.tech (dari CSS hidup)</summary>

```
body            bg rgb(10,10,10)      color rgb(245,245,245)
html            bg rgb(10,10,10)
blok besar      81 elemen: bg transparan | color rgb(255,255,255)
                1 elemen: bg rgba(255,255,255,0.04)   <- satu-satunya "permukaan"

FONT (dihitung dari 700+ elemen):
  Instrument Serif 400   88px   192x
  Instrument Serif 400   50px   128x
  Instrument Serif 400   69px   107x
  Instrument Serif 400   16px    38x
  Inter            400   11px    36x
  Instrument Serif 400  176px    24x   <- terbesar
  Inter            400   12px    16x
  Inter            500   16px    12x

GERAK:
  animasi CSS aktif: marquee-scroll (3 elemen: 42s, 45s, 50s, infinite)
  matrix3d/translate3d: 0
  will-change aktif: 89 elemen
  scroll-behavior html: smooth
  library animasi: TIDAK ADA (nol GSAP/Framer/Lenis)
  ikon SVG: 3

BENTUK:
  border-radius: 16px, dan 3.35544e+07px (= 9999px, label pil)
  box-shadow: NOL di seluruh halaman

TEKNIK TOPENG KATA pada h1:
  <span style="display:block">                                    <- baris
    <span style="display:inline-block; overflow:hidden;           <- topeng
                  padding-bottom:0.12em; margin-right:0.28em">
      <span style="transform:none">Securing</span>                <- digeser naik
    </span>
    ... ulang per kata ...
  </span>
  h1: 113px, letter-spacing normal, word-spacing 0px, lebar 794px
  Efek samping: innerText jadi "Securingsystems.Craftinginterfaces." (menempel)

STRUKTUR (tinggi bagian, px):
  hero 566 | pita 359 | bagian 2713 | bagian 1665 | bagian 3069 | bagian 1141 | footer 51
```
</details>

<details>
<summary>Perhitungan kontras (WCAG 2.1, rumus luminansi relatif)</summary>

```
#fbf7f0  0.9332      #b5683a  0.2003      #0a0a0a  0.0030
#f4ece0  0.8461      #8a4a28  0.1045      #f5f5f5  0.9131
#16130f  0.0067      #7a4022  0.0792      #364f33  0.0662
#5a5248  0.0868      #d5a445  0.4113      #8a6a1f  0.1581
```
Semua rasio di bagian 5.1 dihitung dengan rumus ini, bukan diperkirakan.
</details>
