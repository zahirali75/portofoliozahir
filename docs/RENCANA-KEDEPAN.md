# Rencana Kedepan — Portofolio Zahir Ali

Dokumen kerja. Centang satu-satu sambil jalan. Tiap langkah sudah ditulis perintahnya
atau caranya, jadi tidak perlu mengingat apa pun.

Terakhir diperbarui: 4 November 2026

---

## 📊 Status Sekarang

| Bagian | Keadaan | Bukti |
|---|---|---|
| Kode situs | ✅ Selesai | 23 berkas di `src/`, dua bahasa ID/EN |
| Build | ✅ Lolos | `npm run build` exit 0, 316 KB JS → 100 KB gzip |
| Isi konten | ✅ Lengkap | 12 jawaban sudah masuk, juara Muhadharah = 2024 |
| Diuji di browser | ✅ Lulus | 0 gambar rusak, 0 error konsol, menu mobile jalan |
| Optimasi gambar | ⚠️ Sebagian | Hanya folder CineList; masih ada 3.068 KB gambar |
| Kontras warna | ⚠️ Ada 4 yang gagal | Tombol utama 3.10 dari syarat 4.5 |
| Ukuran sentuh | ⚠️ 13 elemen kecil | Tombol bahasa 38×28 px, syarat 44×44 |
| Git | ❌ Belum | Belum `git init`, belum ada repo |
| Deploy | ❌ Belum | Belum ada URL publik |

**Intinya:** situsnya sudah jadi dan jalan. Sisa kerja terbagi dua — merapikan mutu
(gambar + warna + ukuran sentuh) dan menerbitkannya (git + deploy).

---

## 🎯 Aturan Main

> **Jangan deploy sebelum desainnya kamu anggap beres.**

Alasannya: kalau designnya diganti setelah publik, orang lain sempat melihat versi lama,
dan tautan yang sudah tersebar menunjuk ke versi yang salah.

> **Kerjakan Tahap 1 dulu, walau mau ganti tema total.**

Semua isi Tahap 1 benar di tema apa pun — ukuran berkas, kontras, ukuran tombol. Jadi
tidak ada kerja yang terbuang. Yang **jangan** dikerjakan dobel: menambal kontras, lalu
ganti tema. Hitung kontrasnya **sekali** saja, setelah tema final.

---

## TAHAP 1 — Rapikan Mutu 🔧

Bisa dikerjakan sekarang, tidak perlu menunggu referensi desain.

### 1.1 Optimalkan gambar — dampak paling besar ⭐

**Masalahnya:** dari 3.217 KB berat halaman, **3.068 KB (95%) itu gambar**. Semuanya
masih JPG mentah alias belum dikompres.

**Daftar yang terberat:**

| Berkas | Berat | Keterangan |
|---|---|---|
| `chill-spill-2.jpg` | 721 KB | Foto kegiatan |
| `syahadah-tahfizh-15-juz.jpg` | 605 KB | Sertifikat |
| `chill-spill-1.jpg` | 472 KB | Foto kegiatan |
| `sga-tim-1.jpg` | 279 KB | Foto kegiatan |
| `osis-grup-1.jpg` | 230 KB | Foto kegiatan |
| `sga-tim-2.jpg` | 228 KB | Foto kegiatan |
| `osis-grup-2.jpg` | 174 KB | Foto kegiatan |
| `cinelist-01-home.webp` | 145 KB | Sudah webp, ini wajar |

**Sasaran:** 3.068 KB → sekitar 500 KB. Halaman jadi 5–8× lebih ringan.

**Caranya** (gw yang jalanin): konversi ke WebP + kecilkan ke ukuran tampil sebenarnya.
PNG/JPG asli diamankan dulu ke `assets/_cadangan/` supaya bisa dibalik.

- [ ] Konversi 6 foto kegiatan + 3 sertifikat ke WebP
- [ ] Pakai versi WebP foto hero yang **sudah ada** (`zahir-800.webp`, 37 KB) — sekarang
      yang dipakai masih `.jpg` lewat `srcset`, padahal versi kecilnya sudah tersedia
- [ ] Tambahkan `width`/`height` pada 10 dari 12 gambar (mencegah teks bergeser di
      jaringan lambat — lihat 1.3)
- [ ] Ukur ulang berat halaman, catat sebelum vs sesudah

### 1.2 Perbaiki kontras warna ⭐

**Masalahnya:** empat pasangan warna di bawah standar WCAG AA (teks normal butuh 4.5:1).

| Elemen | Rasio sekarang | Status |
|---|---|---|
| Tombol utama (teks putih di `#b8846e`) | **3.10** | ❌ Gagal |
| Tombol saat hover (putih di `#9e6c58`) | **4.29** | ❌ Kurang |
| Label kecil HURUF BESAR di krem | **3.10** | ❌ Gagal |
| Label kecil di panel krem (`#f9f3ea`) | **2.87** | ❌ Gagal |

**Yang sudah aman — jangan diubah:** teks utama 12.32, teks abu 5.87, sage-600 4.95.

**Ini yang bikin situs terasa "kurang tajam"** walau tidak bisa ditunjuk masalahnya:
label kecil 12px warnanya terlalu pudar.

**Opsi perbaikan (sudah dihitung):**

| Cara | Rasio hasil | Catatan |
|---|---|---|
| Teks putih di `#825647` | **6.03** | Paling aman, tetap terracotta |
| Teks gelap `#2b241d` di `#c89880` | **6.02** | Tombol jadi lebih terang |
| Teks gelap di `#d8ab95` | **7.41** | Paling kontras, kesan lebih lembut |

- [ ] Putuskan: tombol pakai warna lebih gelap, atau teks gelap di latar lebih muda
- [ ] Terapkan ke tombol utama + keadaan hover
- [ ] Terapkan ke label kecil (pakai `terracotta-700` = 6.03, sudah cukup)
- [ ] Hitung ulang semua pasangan, pastikan semuanya ≥ 4.5

### 1.3 Rapikan detail aksesibilitas

**Yang sudah benar — pertahankan:**

| Sudah bagus | Keterangan |
|---|---|
| Fokus keyboard | Outline 2px terlihat di semua elemen, teruji Tab 12× tanpa putus |
| Skip-link | "Lompat ke konten utama" ada dan berfungsi |
| Urutan judul | h1 → h2 → h3 → h4 logis, tidak melompat |
| Judul tidak tertutup | `scroll-margin-top: 96px` > tinggi header 65px (teruji klik menu) |
| Alt text | 12/12 gambar punya alt (1 kosong: favicon, itu benar) |
| Lazy-load | 11/12 gambar (yang tidak: foto hero, itu benar) |
| Reduced motion | Dihormati lewat `prefers-reduced-motion` |

**Yang perlu dirapikan:**

- [ ] **13 elemen di bawah 44×44 px** (syarat sentuh di layar ponsel):

      tombol menu      79×36
      tombol id/en     38×28   ← paling kecil
      tautan kontak   121×36
      
      Perbesar area kliknya. Untuk tombol id/en cukup tambah padding.

- [ ] Tambahkan `width`/`height` ke 10 gambar tanpa dimensi (skor CLS sekarang 0 karena
      gambar cepat termuat — tapi di jaringan lambat teks akan bergeser)

### 1.4 Simpan acuan desain

Sebelum tema diganti, kunci dulu keputusan tema sekarang supaya tidak berubah-ubah.

- [ ] Simpan `design-system/portfolio-zahir/MASTER.md` dari skill ui-ux-pro-max
- [ ] Isi: palet sekarang, font (Inter + Fraunces), radius, spacing, aturan kontras

---

## TAHAP 2 — Perombakan Desain 🎨

> **Status: 2.1 ✅ SELESAI** (4 Nov 2026) — 3 referensi sudah masuk dan sudah dibongkar.
> Hasilnya ada di **`docs/REFERENSI-DESAIN.md`**. Langkah berikutnya menunggu keputusanmu
> di bagian 8 dokumen itu (5 pertanyaan). Setelah itu baru 2.2 diteruskan.

### 2.1 Kirim referensi ✅

**Saran gw: kumpulkan 3 referensi, bukan 1.** Dari tiga itu kelihatan pola yang kamu
sebenarnya suka — warna apa, seberapa padat, banyak gerak atau tenang. Kalau cuma satu,
hasilnya jadi jiplakan situs itu.

Bisa berupa:
- Link situs (URL)
- Screenshot
- Bahkan sekadar "bagian hero-nya kayak gini"

Yang diambil nanti **prinsipnya, bukan jiplak buta** — warna, font, jarak, bentuk, gerak.

- [x] Kumpulkan 3 referensi
- [x] Sebutkan yang mana bagian favoritnya dan kenapa

**Referensi yang masuk:**

| # | Sumber | Yang kamu suka |
|---|--------|----------------|
| 1 | `Screenshot 2026-11-04 180335.png` (GAZU, fashion) | Layar pertama langsung menarik perhatian |
| 2 | `Screenshot 2026-11-04 180514.png` (portofolio Han Nguyen) | Desainnya tidak membosankan |
| 3 | `https://www.aeqonis.tech/` (portofolio Ikmal Luthfi) | Ada motion yang bikin tidak bosan |

### 2.2 Bongkar jadi token

Gw pakai skill ui-ux-pro-max untuk membongkar referensimu.

**Perintah yang gw jalankan:**

```bash
# Arah desain menyeluruh (pola + gaya + warna + font + efek)
python "C:/Users/Asus/AppData/Local/hermes/skills/ui-ux-pro-max/scripts/search.py" \
  "<jenis produk> <kata kunci gaya>" --design-system -p "Portfolio Zahir"

# Tiga pengatur opsional (skala 1-10)
--variance <1-10>   # 1-3 rapi terpusat, 8-10 berani asimetris
--motion   <1-10>   # 1-3 halus, 8-10 coreografi kompleks
--density  <1-10>   # 1-3 lega, 8-10 padat ala dasbor
```

Contoh nyata dari situsmu: kueri "personal portfolio student developer editorial warm
minimal" menghasilkan pola *Scroll-Triggered Storytelling*. Kueri pertama gw yang lebih
umum malah disarankan *Enterprise Gateway* + gaya biomimetic — jadi hasilnya harus
disaring, tidak ditelan mentah.

- [ ] Tentukan skala `--variance`, `--motion`, `--density` sesuai selera
- [ ] Jalankan `--design-system`, simpan hasilnya
- [ ] Cari tambahan per hal spesifik: `--domain color` / `typography` / `landing`

### 2.3 Terapkan

**Yang aman:** seluruh warna ada di satu blok `@theme` di `src/styles/index.css`.
Seluruh teks ada di `src/data/*.ts`. Jadi perombakan desain = tukar variabel warna +
font + atur ulang tata letak. **Tidak menyentuh satu pun isi tulisan atau angka.**

- [ ] Backup `src/styles/index.css` dulu (untuk bisa dibalik)
- [ ] Terapkan palet baru di `@theme`
- [ ] Ganti font, ukur ulang berat (font baru menambah muatan)
- [ ] Atur ulang tata letak kalau perlu
- [ ] Hitung ulang kontras — **setelah** ini, bukan sebelumnya
- [ ] Uji ulang: ponsel 375px, tablet 768px, desktop 1024px & 1440px
- [ ] Uji ulang keyboard + reduced motion

---

## TAHAP 3 — Terbitkan 🚀

Jangan mulai sebelum kamu bilang "sudah solid".

- [ ] `git init` + commit pertama
- [ ] Tentukan nama repo (akun: `zahirali75`), saran: `portfolio-zahir`
- [ ] Buat repo di GitHub, push
      — `vercel.json` sudah siap, rewrite `/proyek/cinelist` agar tidak 404
- [ ] Deploy Vercel → dapat link yang bisa dikirim ke orang
- [ ] Opsional: domain sendiri (~Rp150 rb/tahun)
- [ ] Opsional: taruh linknya di LinkedIn + bio Instagram

---

## TAHAP 4 — Isi, Jalan Panjang 🌱

Tidak harus sekarang, tapi ini yang bikin portofolio hidup.

- [ ] **Tambah proyek kedua.** Sekarang cuma CineList. Proyek kedua yang nyata — bahkan
      tugas kuliah yang dirapikan — bikin portofolio terasa punya isi.
      Format tiap proyek: masalah → peranmu → keputusan teknis → tantangan → hasil.
      Format ini sudah dipakai halaman CineList, tinggal diulang.
- [ ] **Perbarui CV.** Sekarang 3,9 MB — berat untuk diunduh. Sekalian dikompres.
- [ ] **Rapikan repo CineList.** Portofolio ini mengarah ke sana; pengunjung yang
      tertarik akan membuka GitHub-nya. README + screenshot.
- [ ] Opsional: bagian "Catatan/Tulisan" kalau kamu suka menulis.

---

## 📎 Lampiran A — Angka Teknis

Angka di bawah ini terukur, bukan perkiraan.

**Berat halaman (build produksi, cache kosong):**

| Bagian | Berat |
|---|---|
| Gambar | 3.068 KB (12 berkas) |
| JavaScript | 143 KB |
| CSS | 6 KB |
| **Total** | **3.217 KB** |

**Ukuran bundle:**

| Berkas | Mentah | Gzip |
|---|---|---|
| `index.js` | 316,93 kB | 100,01 kB |
| `gsap.js` | 70,12 kB | 27,56 kB |
| `ScrollTrigger.js` | 43,55 kB | 18,11 kB |
| `index.css` | 30,30 kB | 6,17 kB |

**Tabel kontras lengkap:**

| Pasangan | Rasio | Status |
|---|---|---|
| ink-800 di cream-50 | 12.32 | ✅ |
| ink-600 di cream-100 | 7.90 | ✅ |
| ink-500 di cream-50 | 5.87 | ✅ |
| sage-600 di cream-50 | 4.95 | ✅ |
| terracotta-600 di cream-50 | 4.29 | ❌ kurang |
| terracotta-600 di cream-100 | 4.02 | ❌ kurang |
| sage-500 di cream-50 | 3.83 | ❌ (hiasan, boleh) |
| terracotta-500 di cream-50 | 3.10 | ❌ gagal |
| putih di terracotta-500 | 3.10 | ❌ gagal |
| sage-400 di cream-50 | 3.06 | ❌ (hiasan, boleh) |
| sage-400 di cream-100 | 2.87 | ❌ gagal |

Syarat WCAG AA: teks normal **4.5:1**, teks besar (≥24px atau ≥19px tebal) **3:1**.

---

## 📎 Lampiran B — Cara Pakai Skill ui-ux-pro-max

Bukan pembuat desain otomatis. Dia **basis data desain offline + mesin pencari**.

**Isinya:** 79 gaya (50 aktif), 192 palet per jenis produk, 74 pasangan font,
119 pedoman UX, 105 ikon, 17 preset animasi GSAP, 25 jenis chart, 22 stack teknologi.
Semua lokal — tidak butuh internet, tidak mengirim datamu ke mana pun.

**Empat mode:**

| Mode | Untuk apa |
|---|---|
| `--design-system` | Arah desain satu situs penuh |
| `--domain <x>` | Satu hal spesifik |
| `--stack <x>` | Panduan khusus stack |
| `-n <jumlah>` | Batas jumlah hasil |

**Domain yang tersedia:**

    product      jenis produk       style        pilihan gaya
    color        palet warna        typography   pasangan font
    google-fonts font tunggal       chart        rekomendasi grafik
    ux           pedoman UX         landing      struktur halaman
    icons        rekomendasi ikon   gsap         preset animasi
    react        performa React     web          pedoman aplikasi

**Contoh perintah siap pakai:**

```bash
S="C:/Users/Asus/AppData/Local/hermes/skills/ui-ux-pro-max/scripts/search.py"

# Arah desain menyeluruh
python "$S" "personal portfolio editorial warm" --design-system -p "Portfolio Zahir"

# Palet warna
python "$S" "warm editorial light paper ink" --domain color -n 5

# Pasangan font
python "$S" "editorial serif sans modern" --domain typography -n 5

# Pedoman aksesibilitas
python "$S" "focus visible keyboard navigation contrast" --domain ux -n 4

# Preset animasi
python "$S" "scroll reveal stagger" --domain gsap -n 3

# Panduan stack
python "$S" "chip badge overflow nowrap" --stack html-tailwind
```

**10 kategori aturan, urut prioritas:**

| # | Kategori | Dampak |
|---|---|---|
| 1 | Aksesibilitas | KRITIS |
| 2 | Sentuh & Interaksi | KRITIS |
| 3 | Performa | TINGGI |
| 4 | Pemilihan gaya | TINGGI |
| 5 | Tata letak & responsif | TINGGI |
| 6 | Tipografi & warna | SEDANG |
| 7 | Animasi | SEDANG |
| 8 | Form & umpan balik | SEDANG |
| 9 | Pola navigasi | TINGGI |
| 10 | Chart & data | RENDAH |

**Yang harus diingat:** hasilnya **saran, bukan perintah**. Boleh ditolak kalau tidak
cocok. Kalau hasilnya aneh, ulangi dengan kata kunci lebih sempit — bukan ditelan mentah.

---

## 📎 Lampiran C — Alamat Penting

| Hal | Nilai |
|---|---|
| Folder proyek | `C:\Users\Asus\portfolio` |
| Folder cadangan aset | `assets/_cadangan/` |
| Jalankan mode dev | `npm run dev` → `http://localhost:5173` |
| Pratinjau hasil build | `npm run preview` → `http://localhost:4173` |
| Lihat dari HP (satu wifi) | `http://192.168.18.15:5173` |
| Cek tipe | `npm run typecheck` |
| Build | `npm run build` |
| Node | perlu `export PATH="/c/Program Files/nodejs:$PATH"` |
| Skill ui-ux-pro-max | `C:\Users\Asus\AppData\Local\hermes\skills\ui-ux-pro-max` |
| Akun GitHub | `zahirali75` |
| Kontak di situs | zalian755@gmail.com |
