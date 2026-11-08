import type { Locale, Project } from './types'
import { cinelistImages, uanginImages } from './index'

const slug = 'cinelist'
const slugUangin = 'uangin'

export const projects: Record<Locale, Project[]> = {
  id: [
    {
      slug,
      title: 'CineList',
      oneLiner: 'Aplikasi daftar tontonan & ulasan film — backend FastAPI, frontend React.',
      year: '2026',
      status: 'Selesai · v2.0.0',
      featured: true,
      stack: [
        'Python', 'FastAPI', 'PostgreSQL', 'Supabase', 'SQLAlchemy',
        'Alembic', 'JWT', 'pytest', 'React', 'Vite', 'Tailwind CSS',
      ],
      cover: cinelistImages.home,
      gallery: [
        { src: cinelistImages.home, caption: 'Beranda: sorotan film dan pintu masuk per genre.' },
        { src: cinelistImages.movies, caption: 'Katalog film dengan pencarian dan filter genre.' },
        { src: cinelistImages.genres, caption: 'Halaman genre sebagai cara menjelajah katalog.' },
        { src: cinelistImages.detail, caption: 'Detail film: sinopsis, rating, dan aksi daftar tontonan.' },
        { src: cinelistImages.watchlist, caption: 'Daftar tontonan pribadi, dipisah menurut status menonton.' },
        { src: cinelistImages.reviews, caption: 'Halaman "ulasan saya": riwayat ulasan beserta bintang.' },
        { src: cinelistImages.profile, caption: 'Profil pengguna dan pengaturan akun.' },
        { src: cinelistImages.erd, caption: 'Skema database: 7 tabel domain, 7 foreign key (migrasi 0007).' },
        { src: cinelistImages.mobileHome, caption: 'Tampilan ponsel — beranda.' },
        { src: cinelistImages.mobileMovies, caption: 'Tampilan ponsel — katalog film.' },
      ],
      problem:
        'Film yang ingin ditonton mudah lupa dan catatannya tercecer — di catatan ponsel, di percakapan dengan teman, di ingatan. Akibatnya film yang sudah ditonton bisa tertonton ulang, dan pendapat setelah menonton hilang begitu saja. CineList menyatukan daftar tontonan dan ulasan di satu tempat.',
      role: [
        'Ketua tim — membagi tugas dan menjaga arah pengerjaan.',
        'Membangun pipeline data dari TMDB ke Supabase, dijalankan oleh seeder otomatis.',
        'Menulis endpoint REST: 29 alamat, 36 operasi.',
        'Menambahkan autentikasi JWT, termasuk rotasi refresh token dan alur reset kata sandi.',
        'Merapikan struktur aplikasi menjadi 6 lapisan (routers → services → repositories → models).',
        'Menulis 148 tes otomatis dan menjaga seluruhnya tetap lulus.',
        'Mengoreksi antarmuka React — 44 berkas kode frontend, 30 di antaranya berkas JSX/TSX.',
      ],
      decisions: [
        {
          title: 'Migrasi database sebagai satu-satunya cara mengubah skema',
          body:
            'Struktur tabel tidak pernah diubah dengan klik-klik di dashboard, melainkan lewat migrasi berversi (7 migrasi, versi terakhir 0007). Konsekuensinya: setiap perubahan skema punya riwayat, bisa ditinjau lewat diff, dan bisa diulang persis di komputer lain.',
        },
        {
          title: 'Refresh token dirotasi setiap kali dipakai',
          body:
            'Setiap kali sebuah refresh token dipakai untuk memperbarui sesi, token itu langsung diganti dengan yang baru. Kalau token lama dicuri lalu dipakai, pemakaian itu terdeteksi karena token tersebut sudah tidak berlaku.',
        },
        {
          title: 'Rute API tidak menyentuh database secara langsung',
          body:
            'Ada lapisan service dan repository di antara rute HTTP dan database. Dengan pemisahan ini, aturan bisnis bisa diuji tanpa menyalakan server, dan kueri database bisa diubah tanpa menyentuh kode HTTP.',
        },
      ],
      challenge: {
        title: 'Mulai dari backend atau frontend?',
        body:
          'Di awal pengerjaan saya bingung harus mulai dari mana: membangun backend dulu atau antarmuka dulu. Setelah berkonsultasi dengan asisten dosen, jalan yang diambil adalah menyelesaikan backend sampai kokoh — skema, migrasi, dan endpoint yang stabil — baru mengerjakan frontend. Keputusan itu terbukti tepat: ketika frontend mulai dikerjakan, bentuk data yang diterima sudah tidak berubah lagi, sehingga tidak ada pekerjaan antarmuka yang harus diulang.',
      },
      results: [
        { value: '29', label: 'alamat API' },
        { value: '36', label: 'operasi HTTP' },
        { value: '148', label: 'tes otomatis lulus' },
        { value: '7', label: 'migrasi database' },
        { value: '7', label: 'tabel domain' },
        { value: '6', label: 'lapisan aplikasi' },
      ],
      links: [
        {
          label: 'zahirali75/Watchlist_project',
          href: 'https://github.com/zahirali75/Watchlist_project',
          kind: 'repo',
        },
      ],
    },
    {
      slug: slugUangin,
      title: 'Uangin',
      oneLiner: 'Dashboard keuangan pribadi untuk mahasiswa — React 19, tanpa backend.',
      year: '2026',
      status: 'Selesai · proyek kelompok',
      featured: true,
      stack: [
        'React 19', 'JavaScript', 'Vite', 'Tailwind CSS v4',
        'react-router-dom 7', 'Chart.js', 'Tabler Icons',
      ],
      cover: uanginImages.dashboard,
      gallery: [
        { src: uanginImages.dashboard, caption: 'Beranda: kartu saldo, ringkasan bulanan, dan transaksi terakhir.' },
        { src: uanginImages.statistik, caption: 'Statistik: grafik pemasukan vs pengeluaran per bulan.' },
        { src: uanginImages.tabungan, caption: 'Tabungan: beberapa target sekaligus beserta progresnya.' },
        { src: uanginImages.tambah, caption: 'Formulir pencatatan transaksi, dilengkapi pratinjau.' },
        { src: uanginImages.login, caption: 'Halaman masuk — titik awal aplikasi.' },
      ],
      problem:
        'Uang mahasiswa cepat habis tanpa jejak: pemasukan dari uang saku, beasiswa, dan kerja paruh waktu datang dari beberapa sumber, sementara pengeluarannya kecil-kecil dan sering. Tanpa catatan, sulit tahu ke mana uang pergi dan mustahil menabung dengan target yang jelas. Uangin menyatukan pencatatan transaksi, statistik bulanan, dan target tabungan dalam satu dashboard.',
      role: [
        'Membangun seluruh antarmuka React: 5 halaman dan 20 komponen.',
        'Menyusun navigasi dengan react-router-dom 7, termasuk layout bersama dan navigasi bawah untuk layar ponsel.',
        'Membuat komponen statistik dengan Chart.js untuk pemasukan, pengeluaran, dan kategori belanja.',
        'Membangun logika target tabungan: menambah dana, menghapus target, dan menghitung progres.',
        'Menulis pemformat mata uang Rupiah dengan Intl.NumberFormat agar seluruh nominal tampil konsisten (Rp 1.250.000).',
        'Merapikan akses data ke lapisan service tersendiri supaya pengambilan data mudah diganti ke backend.',
      ],
      decisions: [
        {
          title: 'Mengambil data lewat lapisan service, bukan langsung dari komponen',
          body:
            'Setiap komponen tidak mengambil datanya sendiri, melainkan memanggil fungsi di folder services (dashboardService, statisticsService, savingsService, transactionService). Isi fungsi itu sekarang masih membaca data contoh dari folder data, tetapi karena bentuk pemanggilannya sudah seperti memanggil API, menggantinya dengan backend nanti cukup mengubah isi service — komponen tidak perlu disentuh.',
        },
        {
          title: 'Mata uang diformat satu pintu',
          body:
            'Semua nominal Rupiah dilewatkan ke satu berkas utilitas yang memakai Intl.NumberFormat dengan locale id-ID. Hasilnya seluruh aplikasi menampilkan format yang sama persis, dan tidak ada lagi penulisan "Rp" yang diketik manual di dalam komponen.',
        },
        {
          title: 'Status transaksi disimpan di satu tempat',
          body:
            'Daftar transaksi dan daftar target tabungan disimpan di komponen rute paling atas, lalu diturunkan ke halaman yang membutuhkan bersama fungsi pengubahnya. Cara ini menjaga halaman beranda, formulir, dan halaman tabungan membaca data yang sama, sehingga angka di ketiganya tidak pernah berbeda.',
        },
      ],
      challenge: {
        title: 'Membuat angka di seluruh halaman selalu sinkron',
        body:
          'Masalah yang paling sering muncul saat membangun dashboard keuangan adalah angka yang berbeda antar halaman: saldo di beranda tidak cocok dengan total di statistik, atau target tabungan tidak ikut berubah setelah dana ditambahkan. Saya mengatasinya dengan menempatkan data di satu titik dan hanya mengubahnya lewat fungsi yang jelas, lalu menurunkan hasilnya ke setiap halaman. Setelah itu barulah seluruh halaman dirapikan tampilannya, karena angka yang benar adalah fondasi sebelum bicara soal desain.',
      },
      results: [
        { value: '5', label: 'halaman aplikasi' },
        { value: '20', label: 'komponen React' },
        { value: '2.094', label: 'baris kode frontend' },
        { value: '2', label: 'grafik Chart.js' },
        { value: '4', label: 'modul service' },
      ],
      links: [
        {
          label: 'zahirali75/Uangin-react',
          href: 'https://github.com/zahirali75/Uangin-react',
          kind: 'repo',
        },
      ],
    },
  ],

  en: [
    {
      slug,
      title: 'CineList',
      oneLiner: 'A watchlist and movie-review app — FastAPI backend, React frontend.',
      year: '2026',
      status: 'Complete · v2.0.0',
      featured: true,
      stack: [
        'Python', 'FastAPI', 'PostgreSQL', 'Supabase', 'SQLAlchemy',
        'Alembic', 'JWT', 'pytest', 'React', 'Vite', 'Tailwind CSS',
      ],
      cover: cinelistImages.home,
      gallery: [
        { src: cinelistImages.home, caption: 'Home: featured movies and entry points by genre.' },
        { src: cinelistImages.movies, caption: 'Movie catalogue with search and genre filters.' },
        { src: cinelistImages.genres, caption: 'Genre pages as a way into the catalogue.' },
        { src: cinelistImages.detail, caption: 'Movie detail: synopsis, rating, and watchlist actions.' },
        { src: cinelistImages.watchlist, caption: 'Personal watchlist, grouped by viewing status.' },
        { src: cinelistImages.reviews, caption: '"My reviews": review history with star ratings.' },
        { src: cinelistImages.profile, caption: 'User profile and account settings.' },
        { src: cinelistImages.erd, caption: 'Database schema: 7 domain tables, 7 foreign keys (migration 0007).' },
        { src: cinelistImages.mobileHome, caption: 'Mobile layout — home.' },
        { src: cinelistImages.mobileMovies, caption: 'Mobile layout — movie catalogue.' },
      ],
      problem:
        'Films you mean to watch are easily forgotten and the notes are scattered — a phone note here, a chat with a friend there, memory elsewhere. As a result, watched films get rewatched and opinions after watching vanish. CineList brings the watchlist and the reviews together in one place.',
      role: [
        'Team coordinator — split the work and kept the direction on track.',
        'Built the data pipeline from TMDB into Supabase, driven by an automated seeder.',
        'Wrote the REST endpoints: 29 routes, 36 operations.',
        'Added JWT authentication, including refresh-token rotation and the password-reset flow.',
        'Restructured the app into 6 layers (routers → services → repositories → models).',
        'Wrote 148 automated tests and kept all of them passing.',
        'Reviewed and corrected the React interface — 44 frontend source files, 30 of them JSX/TSX files.',
      ],
      decisions: [
        {
          title: 'Database migrations as the only way to change the schema',
          body:
            'Tables are never altered by clicking around a dashboard; every change goes through a versioned migration (7 migrations, latest 0007). As a result each schema change has a history, can be reviewed as a diff, and can be reproduced exactly on another machine.',
        },
        {
          title: 'Refresh tokens rotate on every use',
          body:
            'Whenever a refresh token is used to renew a session, it is immediately replaced with a new one. If a stolen token is replayed, the attempt is detectable because that token is no longer valid.',
        },
        {
          title: 'API routes never touch the database directly',
          body:
            'A service and repository layer sits between the HTTP routes and the database. That separation lets business rules be tested without starting a server, and lets database queries change without touching HTTP code.',
        },
      ],
      challenge: {
        title: 'Start with the backend or the frontend?',
        body:
          'Early on I was unsure where to begin: build the backend first, or the interface? After consulting the lecturer\'s assistant, the chosen path was to finish the backend until it was solid — stable schema, migrations, and endpoints — and only then build the frontend. That decision proved right: when frontend work began, the shape of the data it received had stopped changing, so no interface work had to be redone.',
      },
      results: [
        { value: '29', label: 'API routes' },
        { value: '36', label: 'HTTP operations' },
        { value: '148', label: 'automated tests passing' },
        { value: '7', label: 'database migrations' },
        { value: '7', label: 'domain tables' },
        { value: '6', label: 'application layers' },
      ],
      links: [
        {
          label: 'zahirali75/Watchlist_project',
          href: 'https://github.com/zahirali75/Watchlist_project',
          kind: 'repo',
        },
      ],
    },
    {
      slug: slugUangin,
      title: 'Uangin',
      oneLiner: 'A personal finance dashboard for students — React 19, no backend.',
      year: '2026',
      status: 'Complete · group project',
      featured: true,
      stack: [
        'React 19', 'JavaScript', 'Vite', 'Tailwind CSS v4',
        'react-router-dom 7', 'Chart.js', 'Tabler Icons',
      ],
      cover: uanginImages.dashboard,
      gallery: [
        { src: uanginImages.dashboard, caption: 'Home: balance card, monthly summary, recent transactions.' },
        { src: uanginImages.statistik, caption: 'Statistics: income versus spending chart per month.' },
        { src: uanginImages.tabungan, caption: 'Savings: several goals at once, each with its progress.' },
        { src: uanginImages.tambah, caption: 'Transaction entry form, with a live preview.' },
        { src: uanginImages.login, caption: 'Sign-in page — the entry point of the app.' },
      ],
      problem:
        'A student\'s money disappears without a trace: income arrives from several sources — allowance, scholarship, part-time work — while spending is small and frequent. Without records it is hard to see where the money goes and impossible to save towards a clear target. Uangin brings transaction records, monthly statistics, and savings goals into one dashboard.',
      role: [
        'Built the entire React interface: 5 pages and 20 components.',
        'Structured navigation with react-router-dom 7, including a shared layout and a bottom navigation bar for phone screens.',
        'Built the statistics components with Chart.js for income, spending, and spending categories.',
        'Implemented the savings-goal logic: adding funds, deleting goals, and computing progress.',
        'Wrote the Rupiah currency formatter using Intl.NumberFormat so every amount renders identically (Rp 1.250.000).',
        'Kept data access inside a separate service layer so the data source can be swapped for a backend later.',
      ],
      decisions: [
        {
          title: 'Data is fetched through a service layer, not from inside components',
          body:
            'No component fetches its own data; each one calls a function from the services folder (dashboardService, statisticsService, savingsService, transactionService). Those functions still read sample data from the data folder today, but because the call shape already looks like an API call, swapping in a backend later means changing the service body only — the components stay untouched.',
        },
        {
          title: 'Currency is formatted at a single point',
          body:
            'Every Rupiah amount goes through one utility file that uses Intl.NumberFormat with the id-ID locale. As a result the whole application renders exactly the same format, and no component hand-writes an "Rp" prefix any more.',
        },
        {
          title: 'Transaction state lives in one place',
          body:
            'The transaction list and the savings-goal list are held in the top-level route component and passed down, together with their update functions, to the pages that need them. This keeps the dashboard, the entry form, and the savings page reading the same data, so the numbers on those three pages can never disagree.',
        },
      ],
      challenge: {
        title: 'Keeping the numbers in sync across every page',
        body:
          'The problem that shows up most often when building a finance dashboard is numbers that disagree between pages: the balance on the home screen does not match the total on the statistics page, or a savings goal does not update after funds are added. I solved it by keeping the data at one point and changing it only through clearly named functions, then passing the result down to each page. Only after that did I work on how each page looked, because correct numbers are the foundation before design becomes worth discussing.',
      },
      results: [
        { value: '5', label: 'app pages' },
        { value: '20', label: 'React components' },
        { value: '2,094', label: 'lines of frontend code' },
        { value: '2', label: 'Chart.js charts' },
        { value: '4', label: 'service modules' },
      ],
      links: [
        {
          label: 'zahirali75/Uangin-react',
          href: 'https://github.com/zahirali75/Uangin-react',
          kind: 'repo',
        },
      ],
    },
  ],
}

export function findProject(locale: Locale, projectSlug: string): Project | undefined {
  return projects[locale].find((p) => p.slug === projectSlug)
}
