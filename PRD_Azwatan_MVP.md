# PRD --- AZWATAN

**Product:** Azwatan\
**Version:** MVP 1.0\
**Platform:** Web, responsive mobile-first\
**Product Type:** Digital nasyid audio library & streaming player\
**Status:** Initial Product Requirement Document

------------------------------------------------------------------------

## 1. Ringkasan Produk

**Azwatan** adalah website khusus untuk mengumpulkan, menemukan, dan
mendengarkan nasyid secara langsung melalui browser.

Azwatan berfokus **khusus pada audio**. Tidak ada fitur video pada MVP.

Pengunjung tidak perlu membuat akun atau login untuk mendengarkan lagu.

Konsep utama:

> **Buka → cari → pilih → dengarkan.**

Selain halaman publik, Azwatan memiliki **Admin Dashboard** agar
pengelola dapat menambahkan dan mengelola nasyid melalui UI tanpa harus
mengunggah file secara manual langsung ke Cloudflare R2.

------------------------------------------------------------------------

# 2. Tujuan Produk

## Tujuan Utama

Menyediakan tempat yang sederhana dan nyaman untuk:

-   menemukan nasyid,
-   mencari nasyid berdasarkan judul atau penyanyi,
-   memfilter berdasarkan bahasa dan jenis,
-   melihat informasi lagu,
-   dan langsung mendengarkan lagu melalui browser.

## Tujuan Admin

Membuat pengelolaan koleksi nasyid semudah mungkin:

-   upload audio melalui UI,
-   upload cover,
-   mengisi metadata,
-   publish/unpublish lagu,
-   mengedit informasi,
-   menghapus lagu,
-   dan mengatur lagu pilihan.

Admin tidak perlu mengakses Cloudflare R2 secara manual untuk mengelola
konten.

------------------------------------------------------------------------

# 3. Prinsip Produk

Azwatan harus terasa:

-   sederhana,
-   cepat,
-   tenang,
-   modern,
-   elegan,
-   nyaman digunakan di smartphone,
-   tidak terlalu ramai.

Prinsip utama:

> **Music first.**

Pengguna datang terutama untuk mendengarkan nasyid, bukan membaca banyak
informasi.

------------------------------------------------------------------------

# 4. Target Pengguna

## Pengunjung

Pengguna yang:

-   menyukai nasyid,
-   mencari nasyid tertentu,
-   ingin menemukan nasyid berdasarkan bahasa,
-   ingin mendengarkan nasyid tanpa login,
-   menggunakan smartphone sebagai perangkat utama.

## Admin

Pengelola Azwatan yang bertanggung jawab terhadap:

-   koleksi audio,
-   metadata,
-   cover,
-   kategori,
-   tag,
-   dan publikasi lagu.

------------------------------------------------------------------------

# 5. Scope MVP

## Fitur Public

### Wajib

-   Homepage / Music Library
-   Search
-   Filter bahasa
-   Filter jenis
-   Song card
-   Audio player
-   Persistent bottom player
-   Play / Pause
-   Previous / Next
-   Seek / progress
-   Auto play next
-   Featured songs
-   Responsive mobile-first design
-   About page

### Tidak membutuhkan login

Pengunjung dapat mendengarkan semua lagu yang berstatus `published`
tanpa akun.

------------------------------------------------------------------------

## Fitur Admin

### Wajib

-   Admin login
-   Dashboard
-   Daftar lagu
-   Search lagu
-   Filter lagu
-   Tambah lagu
-   Upload audio
-   Upload cover
-   Edit metadata
-   Edit audio
-   Edit cover
-   Publish / unpublish
-   Draft
-   Featured / unfeatured
-   Delete lagu
-   Manage language
-   Manage type
-   Manage tags

------------------------------------------------------------------------

# 6. Di Luar Scope MVP

Fitur berikut tidak dibuat pada MVP:

-   Video
-   Upload video
-   User registration
-   User profile
-   Komentar
-   Like
-   Follow artist
-   Social network
-   Payment
-   Subscription
-   User-generated content
-   Playlist pengguna
-   Recommendation AI
-   Live streaming
-   Download audio oleh pengguna

Fitur-fitur tersebut dapat dipertimbangkan pada versi berikutnya.

------------------------------------------------------------------------

# 7. Struktur Halaman Public

## `/`

Homepage sekaligus music library.

Struktur:

``` text
HEADER
│
├── Logo AZWATAN
├── Beranda
└── Tentang
│
HERO
│
├── Headline
├── Deskripsi singkat
└── Search
│
FILTER
│
├── Bahasa
└── Jenis
│
FEATURED
│
└── Pilihan Azwatan
│
MUSIC LIBRARY
│
└── Daftar semua nasyid
│
AUDIO PLAYER
│
└── Persistent bottom player
│
FOOTER
```

------------------------------------------------------------------------

# 8. Hero Section

Hero harus sederhana.

Contoh:

``` text
AZWATAN

Kumpulan Nasyid
untuk Didengarkan.

Temukan dan dengarkan nasyid
dari berbagai bahasa dan suasana.

[ 🔍 Cari judul, penyanyi, atau nasyid... ]
```

Tidak perlu hero yang terlalu besar sehingga pengguna harus scroll jauh
sebelum menemukan koleksi.

------------------------------------------------------------------------

# 9. Search

Search harus dapat mencari berdasarkan:

-   judul,
-   nama penyanyi,
-   bahasa,
-   jenis,
-   tag.

Contoh:

``` text
User mengetik:
"Ramadhan"
```

Sistem menampilkan lagu yang metadata-nya mengandung kata tersebut.

Search dilakukan secara cepat dan tidak memerlukan reload halaman.

Search dan filter dapat digunakan bersamaan.

------------------------------------------------------------------------

# 10. Filter Bahasa

Bahasa adalah salah satu filter utama.

Bahasa awal:

-   Indonesia
-   Arab
-   Melayu
-   Inggris
-   Lainnya

Struktur harus fleksibel sehingga bahasa baru dapat ditambahkan dari
Admin Dashboard tanpa perlu mengubah kode frontend.

Pada UI public:

``` text
Bahasa

[ Semua ] [ Indonesia ] [ Arab ] [ Melayu ] [ Inggris ] [ Lainnya ]
```

Pada mobile, daftar filter dapat menggunakan horizontal scrolling.

------------------------------------------------------------------------

# 11. Filter Jenis

Jenis awal:

-   Nasyid
-   Sholawat
-   Acapella

Jenis harus dikelola dari admin sehingga dapat ditambahkan atau diubah
tanpa mengubah kode frontend.

Contoh:

``` text
Jenis

[ Semua ] [ Nasyid ] [ Sholawat ] [ Acapella ]
```

------------------------------------------------------------------------

# 12. Tags / Tema

Tema menggunakan sistem **tag**, bukan kategori utama.

Contoh tag:

-   Ramadhan
-   Nasihat
-   Hijrah
-   Dzikir
-   Sholawat
-   Akhlak
-   Keluarga
-   Persaudaraan
-   Cinta Rasul
-   Renungan

Satu lagu dapat memiliki beberapa tag.

Contoh:

``` text
Judul:
Ya Nabi Salam Alaika

Bahasa:
Arab

Jenis:
Sholawat

Tags:
Sholawat
Cinta Rasul
```

Tag dapat digunakan oleh search dan dapat dikembangkan menjadi filter
pada versi berikutnya.

------------------------------------------------------------------------

# 13. Featured Songs

Admin dapat menandai lagu sebagai:

``` text
Featured = true
```

Lagu featured ditampilkan pada section:

> **Pilihan Azwatan**

Featured bukan sistem ranking otomatis.

Admin menentukan sendiri lagu yang ingin ditampilkan.

------------------------------------------------------------------------

# 14. Music Library

Setiap lagu ditampilkan sebagai song card.

Minimal berisi:

-   cover,
-   judul,
-   penyanyi,
-   bahasa,
-   jenis,
-   tombol play.

Contoh:

``` text
┌─────────────────────────────┐
│                             │
│         [ COVER ]           │
│                             │
│  Judul Nasyid               │
│  Nama Penyanyi              │
│  Arab · Nasyid          ▶   │
│                             │
└─────────────────────────────┘
```

Klik pada tombol play akan langsung memutar audio.

Klik judul/cover dapat digunakan untuk memulai playback jika desain
membutuhkannya.

------------------------------------------------------------------------

# 15. Audio Player

Audio player adalah fitur inti Azwatan.

Fitur minimum:

-   Play
-   Pause
-   Previous
-   Next
-   Seek
-   Progress bar
-   Current time
-   Duration
-   Cover
-   Judul
-   Penyanyi
-   Auto next

Player harus menggunakan elemen audio browser atau solusi audio web yang
ringan.

------------------------------------------------------------------------

# 16. Persistent Bottom Player

Ketika lagu sedang diputar, player tetap tersedia ketika pengguna
melakukan scroll.

Contoh:

``` text
────────────────────────────────────
[cover]  Judul Nasyid
         Nama Penyanyi

         01:20 ━━━━━●━━━━ 04:32

         ◀       ▶       ▶
────────────────────────────────────
```

## Mobile

Player harus compact dan tidak menutupi konten penting.

## Desktop

Player dapat menggunakan fixed bottom bar dengan informasi yang lebih
lengkap.

------------------------------------------------------------------------

# 17. Playback Behavior

Ketika user menekan Play:

1.  Lagu menjadi lagu aktif.
2.  Audio mulai dimainkan.
3.  Persistent player muncul.
4.  Song card menunjukkan status sedang dimainkan.
5.  Tombol Play berubah menjadi Pause pada lagu aktif.

Jika user memilih lagu lain:

1.  Lagu sebelumnya berhenti.
2.  Lagu baru menjadi active song.
3.  Player memperbarui metadata.
4.  Lagu baru mulai dimainkan.

------------------------------------------------------------------------

# 18. Auto Next

Jika lagu selesai:

``` text
Current Song
     ↓
Audio ended
     ↓
Next Song
     ↓
Play
```

Urutan Next mengikuti daftar lagu yang sedang digunakan.

Contoh jika filter aktif:

``` text
Bahasa = Arab
Jenis = Sholawat
```

Maka Next hanya mengambil lagu dari hasil filter tersebut.

Jika tidak ada lagu berikutnya, playback berhenti atau kembali ke awal
sesuai keputusan implementasi.

------------------------------------------------------------------------

# 19. Previous Behavior

Tombol Previous digunakan untuk:

-   kembali ke lagu sebelumnya,
-   jika playback sudah berjalan cukup lama, Previous dapat
    mengembalikan posisi lagu aktif ke awal.

Implementasi detail dapat mengikuti perilaku player standar yang
familiar bagi pengguna.

------------------------------------------------------------------------

# 20. Queue / Current List

MVP tidak membutuhkan sistem playlist kompleks.

Tetapi player harus mengetahui **daftar lagu aktif** berdasarkan hasil
library saat ini.

Contoh:

``` text
All Songs
    ↓
Song List

atau

Arab + Sholawat
    ↓
Filtered Song List
    ↓
Player Queue
```

Ini memungkinkan tombol Next dan Previous tetap konsisten dengan hasil
filter.

------------------------------------------------------------------------

# 21. Empty State

Jika pencarian/filter tidak menghasilkan lagu:

``` text
Tidak menemukan nasyid.

Coba kata kunci atau filter lainnya.
```

Sediakan tombol:

``` text
Reset Filter
```

------------------------------------------------------------------------

# 22. Loading State

Saat data lagu sedang dimuat:

-   gunakan skeleton,
-   jangan menampilkan halaman kosong.

Contoh:

``` text
[████████████]
[████████]
[████████████████]
```

------------------------------------------------------------------------

# 23. Error State

Jika koleksi gagal dimuat:

``` text
Koleksi nasyid belum dapat dimuat.

Silakan coba lagi.
```

Tombol:

``` text
[ Coba Lagi ]
```

Jika audio gagal dimainkan:

``` text
Audio tidak dapat diputar.

Silakan coba lagi.
```

------------------------------------------------------------------------

# 24. About Page

URL:

``` text
/about
```

Isi minimal:

-   Apa itu Azwatan
-   Tujuan Azwatan
-   Deskripsi singkat platform
-   Informasi kontak jika diperlukan

Tidak perlu halaman About yang panjang.

------------------------------------------------------------------------

# 25. Admin Authentication

Admin Dashboard tidak boleh dapat diakses publik tanpa autentikasi.

Flow:

``` text
/admin
   ↓
Login
   ↓
Authentication berhasil
   ↓
Admin Dashboard
```

Jika user belum login:

``` text
/admin/*
   ↓
Redirect
   ↓
/admin/login
```

Tidak ada registrasi admin dari halaman publik.

Admin account dibuat melalui mekanisme administrasi/authentication yang
dipilih saat implementasi.

------------------------------------------------------------------------

# 26. Admin Dashboard

URL:

``` text
/admin
```

Dashboard minimal menampilkan:

``` text
AZWATAN ADMIN

Total Lagu
128

Published
120

Draft
8

Featured
12
```

Kemudian:

``` text
[ + Tambah Nasyid ]
```

Dan daftar lagu terbaru.

------------------------------------------------------------------------

# 27. Admin Song Management

URL:

``` text
/admin/songs
```

Fitur:

-   daftar lagu,
-   search,
-   filter bahasa,
-   filter jenis,
-   filter status,
-   edit,
-   delete,
-   publish,
-   unpublish,
-   featured.

Contoh:

``` text
Nasyid
────────────────────────────────────────

[ + Tambah Nasyid ]

[ Cari... ] [ Bahasa ▼ ] [ Jenis ▼ ] [ Status ▼ ]

Cover | Judul | Penyanyi | Bahasa | Status | Aksi

[img]  Ya Nabi...   ...       Arab    Published   Edit
[img]  ...          ...       Indo    Draft       Edit
```

------------------------------------------------------------------------

# 28. Add Song

URL:

``` text
/admin/songs/new
```

Form:

``` text
Tambah Nasyid

Cover
[ Upload Cover ]

Audio
[ Upload Audio ]

Judul
[________________________]

Penyanyi
[________________________]

Bahasa
[ Indonesia ▼ ]

Jenis
[ Nasyid ▼ ]

Tags
[________________________]

Deskripsi
[________________________]

☐ Featured

Status
○ Draft
○ Published

[ Simpan Draft ] [ Publish ]
```

------------------------------------------------------------------------

# 29. Upload Audio

Admin dapat mengunggah file audio langsung dari UI.

MVP fokus pada format:

``` text
.mp3
```

Sistem harus:

1.  menerima file,
2.  melakukan validasi,
3.  menampilkan progress upload,
4.  mengunggah file ke storage,
5.  mendapatkan URL/path file,
6.  menyimpan URL/path tersebut pada data lagu.

Admin tidak perlu membuka dashboard R2.

------------------------------------------------------------------------

# 30. Audio Validation

Minimal validasi:

-   file wajib ada,
-   format audio harus didukung,
-   ukuran file tidak boleh melebihi batas yang ditentukan aplikasi,
-   nama file tidak boleh digunakan langsung sebagai identifier database
    tanpa sanitasi.

Sistem sebaiknya menghasilkan nama object yang aman dan unik.

Contoh:

``` text
audio/
  01HX...-ya-nabi-salam.mp3
```

Bukan hanya:

``` text
audio/lagu.mp3
```

untuk menghindari benturan nama file.

------------------------------------------------------------------------

# 31. Upload Cover

Format yang disarankan:

-   JPG
-   PNG
-   WebP

Rekomendasi:

-   rasio 1:1,
-   ukuran cukup untuk thumbnail,
-   kompresi otomatis jika memungkinkan.

Admin dapat melihat preview cover sebelum menyimpan.

------------------------------------------------------------------------

# 32. Upload Progress

Saat upload:

``` text
Uploading audio...

██████████████████░░ 86%

86%
```

Admin tidak boleh mengira proses selesai sebelum upload benar-benar
selesai.

Jika gagal:

``` text
Upload gagal.

[ Coba Lagi ]
```

------------------------------------------------------------------------

# 33. Edit Song

URL:

``` text
/admin/songs/:id/edit
```

Admin dapat mengubah:

-   cover,
-   audio,
-   judul,
-   penyanyi,
-   bahasa,
-   jenis,
-   tags,
-   deskripsi,
-   featured,
-   status.

Jika audio diganti:

``` text
Audio saat ini:
▶ lagu.mp3

[ Ganti Audio ]
```

Sistem menyimpan audio baru dan memperbarui referensi lagu.

------------------------------------------------------------------------

# 34. Delete Song

Admin dapat menghapus lagu.

Sebelum delete, tampilkan confirmation:

``` text
Hapus nasyid ini?

Tindakan ini akan menghapus metadata dan file audio/cover terkait.

[ Batal ] [ Hapus ]
```

Delete harus mencegah penghapusan tidak sengaja.

------------------------------------------------------------------------

# 35. Draft dan Published

Setiap lagu memiliki status:

``` text
draft
published
```

Hanya lagu:

``` text
published
```

yang ditampilkan pada public website.

Draft hanya terlihat oleh admin.

------------------------------------------------------------------------

# 36. Struktur Data Lagu

Minimal:

``` json
{
  "id": "001",
  "title": "Judul Lagu",
  "artist": "Nama Penyanyi",
  "language": "Arab",
  "type": "Nasyid",
  "tags": [
    "Nasihat",
    "Ramadhan"
  ],
  "description": "Deskripsi singkat lagu.",
  "coverUrl": "...",
  "audioUrl": "...",
  "duration": 245,
  "featured": false,
  "status": "published",
  "createdAt": "...",
  "updatedAt": "..."
}
```

------------------------------------------------------------------------

# 37. Entity / Data Model

## Song

  Field         Type       Required
  ------------- ---------- ----------
  id            string     Yes
  title         string     Yes
  artist        string     Yes
  language      string     Yes
  type          string     Yes
  tags          array      No
  description   string     No
  coverUrl      string     Yes
  audioUrl      string     Yes
  duration      number     No
  featured      boolean    Yes
  status        enum       Yes
  createdAt     datetime   Yes
  updatedAt     datetime   Yes

------------------------------------------------------------------------

# 38. Language Entity

Bahasa sebaiknya tidak hard-coded jika memungkinkan.

Contoh:

``` json
{
  "id": "ar",
  "name": "Arab",
  "active": true
}
```

Admin dapat menambahkan bahasa baru.

------------------------------------------------------------------------

# 39. Type Entity

Contoh:

``` json
{
  "id": "nasheed",
  "name": "Nasyid",
  "active": true
}
```

Jenis dapat dikelola dari admin.

------------------------------------------------------------------------

# 40. Tag Entity

Contoh:

``` json
{
  "id": "ramadhan",
  "name": "Ramadhan"
}
```

Satu lagu dapat memiliki banyak tag.

------------------------------------------------------------------------

# 41. Storage Architecture

Rencana infrastructure:

``` text
Public Website
       │
       ▼
Cloudflare Pages
       │
       ├───────────────┐
       │               │
       ▼               ▼
Database/API       Cloudflare R2
       │               │
       │          ┌────┴─────┐
       │          │          │
       │        audio/     covers/
       │
       ▼
Song Metadata
```

Cloudflare R2 digunakan untuk file:

``` text
audio/*.mp3
covers/*
```

Database digunakan untuk metadata lagu.

------------------------------------------------------------------------

# 42. R2 Access Security

Credential R2 tidak boleh diletakkan di frontend.

Jangan melakukan:

``` text
Frontend
   ↓
R2 Secret Key
```

Gunakan backend/server-side function/API atau mekanisme signed upload
URL/presigned URL yang sesuai.

Flow ideal:

``` text
Admin Browser
      ↓
Authenticated Admin API
      ↓
Generate upload permission
      ↓
R2
```

Frontend hanya mengetahui URL/path yang memang diperlukan.

------------------------------------------------------------------------

# 43. Public Audio Access

Karena Azwatan adalah platform untuk mendengarkan audio, file audio yang
dipublish harus dapat diakses oleh browser.

Public site tidak membutuhkan authentication untuk playback.

Contoh:

``` text
Published Song
     ↓
audioUrl
     ↓
Browser Audio Player
```

Draft tidak boleh muncul pada public library.

------------------------------------------------------------------------

# 44. File Naming

Gunakan identifier unik untuk object storage.

Contoh:

``` text
audio/{songId}-{uniqueId}.mp3
covers/{songId}-{uniqueId}.webp
```

Jangan mengandalkan nama file asli pengguna sebagai path utama.

------------------------------------------------------------------------

# 45. Responsive Design

## Mobile

Prioritas utama.

Layout:

``` text
Logo

Search

Filter

Featured

Song List

Bottom Player
```

## Desktop

Layout dapat lebih luas:

``` text
Header

Hero

Search

Filter

Featured Grid

Music Library

Bottom Player
```

Tidak boleh ada horizontal overflow yang tidak diperlukan.

------------------------------------------------------------------------

# 46. Visual Direction

Karakter visual:

-   modern,
-   clean,
-   calm,
-   elegant,
-   Islamic-inspired secara halus,
-   tidak terlalu dekoratif.

Hindari:

-   gradient berlebihan,
-   warna neon,
-   animasi berlebihan,
-   terlalu banyak ornamen,
-   desain seperti marketplace,
-   desain seperti website sekolah,
-   desain seperti dashboard admin untuk halaman public.

------------------------------------------------------------------------

# 47. Warna

Palet awal:

-   warm white / off-white sebagai background,
-   dark green / deep emerald sebagai primary,
-   muted gold sebagai accent,
-   charcoal sebagai text.

Gunakan CSS variables/design tokens sehingga warna mudah diubah.

------------------------------------------------------------------------

# 48. Typography

Gunakan typography yang:

-   modern,
-   bersih,
-   mudah dibaca,
-   nyaman di mobile.

Maksimal 1 font utama dan 1 font aksen jika memang diperlukan.

------------------------------------------------------------------------

# 49. Animation

Gunakan animasi ringan:

-   hover,
-   card transition,
-   player transition,
-   loading state.

Hindari animasi yang mengganggu saat pengguna sedang membaca atau
memilih lagu.

------------------------------------------------------------------------

# 50. Accessibility

Minimal:

-   semua tombol memiliki label,
-   icon-only button memiliki accessible label,
-   keyboard navigation,
-   focus state,
-   kontras warna yang cukup,
-   alt text untuk cover,
-   player dapat digunakan tanpa mouse.

------------------------------------------------------------------------

# 51. Performance

Prioritas:

-   lazy-load cover,
-   gunakan WebP jika memungkinkan,
-   jangan preload seluruh file audio,
-   gunakan audio metadata preload,
-   minimalkan JavaScript yang tidak diperlukan,
-   jangan memuat seluruh audio sekaligus.

Audio player sebaiknya menggunakan:

``` text
preload="metadata"
```

atau strategi equivalent.

------------------------------------------------------------------------

# 52. SEO

Homepage:

**Title**

> Azwatan --- Kumpulan Nasyid untuk Didengarkan

**Description**

> Dengarkan kumpulan nasyid dari berbagai bahasa dan tema di Azwatan.

Gunakan semantic HTML.

Jika nantinya dibuat halaman detail setiap lagu, halaman tersebut dapat
memiliki metadata SEO individual.

------------------------------------------------------------------------

# 53. Analytics

Analytics bukan fitur inti MVP, tetapi arsitektur harus memungkinkan
event tracking.

Event yang dapat dipersiapkan:

``` text
song_play
song_pause
song_complete
song_next
search
filter_language
filter_type
```

Tidak perlu mengumpulkan data pribadi pengguna.

------------------------------------------------------------------------

# 54. Security

Admin area harus:

-   membutuhkan authentication,
-   melindungi route `/admin/*`,
-   tidak mengekspos secret key,
-   memvalidasi upload,
-   memvalidasi input metadata,
-   menggunakan authorization untuk operasi CRUD,
-   mencegah admin biasa mengakses resource yang tidak diizinkan jika
    role system nantinya dikembangkan.

------------------------------------------------------------------------

# 55. Admin UX

Admin dashboard harus lebih fungsional daripada dekoratif.

Prioritas:

1.  cepat menambah lagu,
2.  mudah menemukan lagu,
3.  mudah mengedit metadata,
4.  mudah mengganti audio,
5.  mudah publish/unpublish.

Form upload sebaiknya tidak terlalu panjang.

------------------------------------------------------------------------

# 56. Admin Song Form --- UX

Urutan ideal:

``` text
1. Upload Cover
2. Upload Audio
3. Judul
4. Penyanyi
5. Bahasa
6. Jenis
7. Tags
8. Deskripsi
9. Featured
10. Status
11. Save / Publish
```

Setelah upload audio selesai, sistem dapat membaca durasi audio secara
otomatis jika memungkinkan.

Admin tidak perlu mengetik durasi secara manual.

------------------------------------------------------------------------

# 57. Automatic Audio Metadata

Saat file audio berhasil dipilih/upload, sistem sebaiknya mencoba
mendapatkan:

-   duration,
-   file size,
-   mime type.

Duration disimpan ke metadata lagu.

Jika metadata tidak berhasil diperoleh, lagu tetap dapat disimpan tanpa
duration dan dapat diperbaiki kemudian.

------------------------------------------------------------------------

# 58. User Flow --- Public

## Flow utama

``` text
User membuka Azwatan
        ↓
Melihat koleksi
        ↓
Search / Filter
        ↓
Memilih lagu
        ↓
Klik Play
        ↓
Audio dimainkan
        ↓
User browsing sambil mendengarkan
        ↓
Lagu selesai
        ↓
Next otomatis
```

------------------------------------------------------------------------

# 59. User Flow --- Filter

``` text
User membuka Azwatan
        ↓
Pilih Bahasa Arab
        ↓
Pilih Jenis Sholawat
        ↓
Library diperbarui
        ↓
User memilih lagu
        ↓
Play
        ↓
Queue mengikuti hasil filter
```

------------------------------------------------------------------------

# 60. User Flow --- Admin

``` text
Admin membuka /admin
        ↓
Login
        ↓
Dashboard
        ↓
Tambah Nasyid
        ↓
Upload Cover
        ↓
Upload Audio
        ↓
Isi Metadata
        ↓
Preview
        ↓
Save Draft / Publish
        ↓
Song tersedia di library
```

------------------------------------------------------------------------

# 61. Admin Edit Flow

``` text
Admin
  ↓
Songs
  ↓
Pilih lagu
  ↓
Edit
  ↓
Ubah metadata / audio / cover
  ↓
Save
  ↓
Public library diperbarui
```

------------------------------------------------------------------------

# 62. Admin Delete Flow

``` text
Admin
  ↓
Songs
  ↓
Delete
  ↓
Confirmation
  ↓
Delete metadata
  ↓
Delete file audio
  ↓
Delete cover
```

Jika penghapusan file storage gagal sebagian, sistem harus mencatat
error dan tidak memberikan pesan sukses palsu.

------------------------------------------------------------------------

# 63. Recommended Routes

## Public

``` text
/
 /about
```

## Admin

``` text
/admin
/admin/login
/admin/songs
/admin/songs/new
/admin/songs/:id/edit
/admin/languages
/admin/types
/admin/tags
```

Management route untuk languages/types/tags boleh ditunda jika terlalu
besar untuk MVP, tetapi struktur datanya sebaiknya mendukung.

------------------------------------------------------------------------

# 64. Suggested Component Structure

``` text
App
├── PublicLayout
│   ├── Header
│   ├── Hero
│   ├── SearchBar
│   ├── FilterBar
│   ├── FeaturedSongs
│   ├── SongLibrary
│   │   └── SongCard
│   └── AudioPlayer
│
└── AdminLayout
    ├── AdminSidebar
    ├── Dashboard
    ├── SongTable
    ├── SongForm
    ├── AudioUploader
    ├── CoverUploader
    └── MetadataForm
```

------------------------------------------------------------------------

# 65. State Management

State minimal yang diperlukan:

``` text
songs
activeSong
isPlaying
currentTime
duration
searchQuery
languageFilter
typeFilter
currentQueue
adminUser
uploadState
```

Jangan menggunakan state management library besar jika belum diperlukan.

------------------------------------------------------------------------

# 66. Error Handling

Semua operasi penting harus memiliki feedback:

### Success

``` text
Nasyid berhasil disimpan.
```

### Upload success

``` text
Audio berhasil diunggah.
```

### Publish success

``` text
Nasyid berhasil dipublikasikan.
```

### Error

``` text
Terjadi kesalahan. Silakan coba lagi.
```

Gunakan toast atau inline notification yang tidak mengganggu.

------------------------------------------------------------------------

# 67. Acceptance Criteria --- Public

MVP dianggap berhasil jika:

-   [ ] Homepage dapat dibuka tanpa login.
-   [ ] Lagu published tampil.
-   [ ] Draft tidak tampil.
-   [ ] Search berfungsi.
-   [ ] Filter bahasa berfungsi.
-   [ ] Filter jenis berfungsi.
-   [ ] Search + filter dapat digunakan bersamaan.
-   [ ] Cover tampil.
-   [ ] Audio dapat dimainkan.
-   [ ] Pause/play berfungsi.
-   [ ] Progress bar berfungsi.
-   [ ] Seek berfungsi.
-   [ ] Next berfungsi.
-   [ ] Previous berfungsi.
-   [ ] Auto next berfungsi.
-   [ ] Player tetap terlihat saat scroll.
-   [ ] Website nyaman di mobile.
-   [ ] Website nyaman di desktop.

------------------------------------------------------------------------

# 68. Acceptance Criteria --- Admin

-   [ ] Admin dapat login.
-   [ ] User tanpa authentication tidak dapat mengakses dashboard.
-   [ ] Admin dapat melihat daftar lagu.
-   [ ] Admin dapat search lagu.
-   [ ] Admin dapat filter lagu.
-   [ ] Admin dapat menambahkan lagu.
-   [ ] Admin dapat upload audio.
-   [ ] Admin dapat upload cover.
-   [ ] Admin dapat melihat progress upload.
-   [ ] Admin dapat mengisi metadata.
-   [ ] Admin dapat menyimpan draft.
-   [ ] Admin dapat publish.
-   [ ] Admin dapat unpublish.
-   [ ] Admin dapat edit lagu.
-   [ ] Admin dapat mengganti audio.
-   [ ] Admin dapat mengganti cover.
-   [ ] Admin dapat mengatur featured.
-   [ ] Admin dapat delete lagu.
-   [ ] Public site otomatis menggunakan data terbaru.

------------------------------------------------------------------------

# 69. Acceptance Criteria --- Storage

-   [ ] Audio tersimpan di Cloudflare R2.
-   [ ] Cover tersimpan di Cloudflare R2.
-   [ ] Secret R2 tidak berada di frontend.
-   [ ] File memiliki nama/path unik.
-   [ ] Public published audio dapat diputar.
-   [ ] File draft tidak muncul pada public library.
-   [ ] Penghapusan lagu menangani file storage terkait.

------------------------------------------------------------------------

# 70. Deployment

Target infrastructure:

``` text
Domain
  ↓
Cloudflare DNS
  ↓
Cloudflare Pages
  ↓
Azwatan Web App
```

Storage:

``` text
Cloudflare R2
├── audio/
└── covers/
```

Database/API dapat menggunakan layanan yang sesuai dengan kebutuhan
aplikasi dan tetap mempertimbangkan free tier untuk tahap awal.

Domain tetap dapat berada pada registrar yang sudah digunakan pemilik
domain, kemudian diarahkan ke Cloudflare.

------------------------------------------------------------------------

# 71. Development Strategy

Pengembangan dilakukan bertahap.

## Phase 1 --- Foundation

-   setup project,
-   routing,
-   design system,
-   public layout,
-   admin layout,
-   authentication foundation.

## Phase 2 --- Public Library

-   song data,
-   song cards,
-   search,
-   filter,
-   featured section.

## Phase 3 --- Audio Player

-   play,
-   pause,
-   seek,
-   next,
-   previous,
-   auto next,
-   persistent player.

## Phase 4 --- Storage

-   R2 integration,
-   audio upload,
-   cover upload,
-   public audio access.

## Phase 5 --- Admin

-   dashboard,
-   song CRUD,
-   upload UI,
-   publish/unpublish,
-   featured,
-   metadata management.

## Phase 6 --- Polish

-   responsive design,
-   loading states,
-   error handling,
-   accessibility,
-   performance,
-   SEO.

------------------------------------------------------------------------

# 72. Development Priority

Urutan prioritas:

``` text
1. Data model
2. Authentication
3. Storage integration
4. Admin upload
5. Public library
6. Audio player
7. Search/filter
8. Responsive UI
9. Polish
```

Namun implementasi dapat dilakukan secara iteratif dengan menggunakan
2--3 lagu sebagai data awal.

------------------------------------------------------------------------

# 73. Initial Test Data

Jangan langsung memasukkan seluruh koleksi.

Gunakan minimal:

``` text
3–5 lagu
```

Contoh variasi:

``` text
1. Arab — Nasyid
2. Arab — Sholawat
3. Indonesia — Nasyid
4. Melayu — Nasyid
5. Indonesia — Acapella
```

Tujuannya untuk menguji:

-   search,
-   filter,
-   player,
-   queue,
-   upload,
-   publish,
-   responsive layout.

Setelah flow stabil, baru koleksi sebenarnya dimasukkan.

------------------------------------------------------------------------

# 74. Prinsip untuk Antigravity

Antigravity harus membangun aplikasi secara bertahap dan tidak membuat
seluruh sistem kompleks sekaligus.

Prioritas:

``` text
Functional
    ↓
Reliable
    ↓
Simple
    ↓
Fast
    ↓
Beautiful
```

Jangan menambahkan fitur yang belum ada di PRD tanpa alasan yang jelas.

Jika membutuhkan keputusan teknis yang belum ditentukan, pilih solusi
yang:

1.  sederhana,
2.  murah/free-tier friendly,
3.  aman,
4.  mudah dipelihara,
5.  tidak mengunci Azwatan pada satu teknologi secara tidak perlu.

------------------------------------------------------------------------

# 75. Definition of Done --- MVP

MVP Azwatan dianggap selesai ketika:

> Pengunjung dapat membuka Azwatan tanpa login, mencari dan memfilter
> koleksi nasyid, memilih lagu, lalu mendengarkannya melalui audio
> player yang tetap tersedia saat browsing.

Dan:

> Admin dapat login ke dashboard, meng-upload audio dan cover melalui
> UI, mengisi metadata, menyimpan draft atau publish, mengedit,
> mengganti file, serta menghapus nasyid tanpa perlu mengelola
> Cloudflare R2 secara manual.

------------------------------------------------------------------------

# 76. Future Roadmap

Setelah MVP stabil, fitur yang dapat dipertimbangkan:

### V1.1

-   Recently Played
-   Favorite menggunakan local storage
-   Share lagu
-   halaman detail lagu
-   playlist kurasi Azwatan
-   dark mode

### V1.2

-   Admin analytics
-   statistik play
-   popular songs
-   recently added
-   playlist management

### V2

-   PWA
-   offline caching yang sesuai dengan hak akses konten
-   multi-admin / role
-   advanced search
-   artist pages
-   album/collection

Fitur future tidak boleh mengganggu kesederhanaan MVP.
