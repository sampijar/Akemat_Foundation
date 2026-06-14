# Akemat Foundation — Website

Website statis (HTML, CSS, JS murni — tanpa framework) untuk yayasan kemanusiaan
yang menghubungkan keluarga dengan **layanan perawat ke rumah** dan menerima
**donasi** untuk mendanai layanan tersebut.

## Struktur folder

```
akemat-foundation/
├── index.html        # seluruh halaman (hero, tentang, cara kerja, form, donasi, kontak)
├── css/
│   └── style.css      # semua styling + warna tema
└── js/
    └── main.js         # menu mobile, animasi scroll, pilihan donasi, form
```

Semua ilustrasi/ikon dibuat langsung dengan SVG inline (tidak butuh file gambar
eksternal), jadi situs ini langsung bisa dibuka tanpa aset tambahan.

## Cara menjalankan di komputer

Cukup buka `index.html` langsung di browser, atau jalankan server lokal sederhana:

```bash
python3 -m http.server 8000
```

lalu buka `http://localhost:8000`.

## Publikasi ke GitHub Pages

1. Buat repository baru di GitHub, misalnya `akemat-foundation`.
2. Upload semua isi folder ini ke repository tersebut (pastikan `index.html`
   berada di root repo).
3. Buka **Settings → Pages**.
4. Pada **Source**, pilih branch `main` dan folder `/ (root)`.
5. Simpan. Setelah beberapa menit, situs akan tersedia di
   `https://<username-github>.github.io/akemat-foundation/`.

## Hal-hal yang perlu diganti sebelum live

Tandai pencarian berikut dan sesuaikan dengan data asli yayasan:

| Yang perlu diganti | Lokasi |
| --- | --- |
| Nomor WhatsApp `6281234567890` | `index.html` — tombol "Pesan perawat via WhatsApp", "Konfirmasi donasi", dan bagian kontak |
| Email `info@akematfoundation.org` | `index.html` — bagian Kontak |
| Alamat `Jl. Contoh Raya No. 123, Bogor` | `index.html` — bagian Kontak |
| Nama bank, nomor rekening, atas nama | `index.html` — bagian Donasi (`.bank-card`) dan atribut `data-account` pada tombol salin |
| Link Instagram / Facebook / YouTube (`href="#"`) | `index.html` — bagian Footer |
| Statistik (500+, 150+, 28, 6 tahun) | `index.html` — bagian Stats |
| Cerita/testimoni | `index.html` — bagian "Cerita Dampak" |

## Formulir "Pesan Perawat" dan "Kontak"

Karena ini situs statis (tanpa server), kedua formulir saat ini hanya menampilkan
pesan konfirmasi di halaman (lihat `js/main.js`) — **data belum benar-benar
terkirim ke mana-mana**. Untuk menerima data formulir secara nyata, pilih salah
satu cara berikut:

1. **Formspree** (gratis untuk volume kecil): daftar di formspree.io, lalu ganti
   `<form id="requestForm" ...>` menjadi
   `<form id="requestForm" action="https://formspree.io/f/XXXXXXX" method="POST" ...>`
   dan hapus `event.preventDefault()` pada form tersebut di `main.js` (atau ikuti
   panduan integrasi AJAX dari Formspree).
2. **Google Form**: buat Google Form dengan field yang sama, lalu tautkan tombol
   "Kirim permintaan" ke link Google Form tersebut.
3. Layanan sejenis lain seperti Getform, Web3Forms, atau backend Anda sendiri.

## Mengganti ilustrasi dengan foto asli

Bagian hero (`.hero-art`) dan donasi (`.donate-art`) saat ini berupa ilustrasi
SVG sederhana. Jika ingin memakai foto sungguhan (misalnya foto kegiatan
yayasan), ganti elemen `<svg>...</svg>` tersebut dengan:

```html
<img src="images/hero.jpg" alt="Perawat mengunjungi keluarga di rumah" />
```

lalu simpan foto pada folder `images/` (buat folder baru). Pastikan foto yang
digunakan berlisensi bebas pakai (misalnya dari Unsplash, Pexels, atau foto
dokumentasi kegiatan yayasan sendiri).

## Tema warna

| Token | Hex | Penggunaan |
| --- | --- | --- |
| `--color-primary` | `#1F4D3F` | Warna utama (header, tombol utama, judul) |
| `--color-accent` | `#F2A541` | Aksen hangat (highlight, donasi) |
| `--color-accent-2` | `#E8714A` | Aksen kedua (label, ikon caregiver) |
| `--color-bg` | `#FBF7F1` | Latar utama |
| `--color-bg-alt` | `#E8EFE7` | Latar selang-seling antar section |

Semua warna diatur di bagian atas `css/style.css` (`:root`), jadi mudah diubah
secara konsisten di seluruh halaman.
