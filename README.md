# Template Undangan Pernikahan Digital - Kartunikah

Template frontend modern untuk undangan pernikahan digital, diinisiasi berdasarkan fitur dan desain kartunikah.com.

## Struktur Project

```
kartunikah-template/
├── index.html          # File halaman utama
├── css/style.css       # Stylesheet kustom
├── js/
│   ├── config.js       # Konfigurasi isi undangan
│   └── script.js       # Fungsi interaktivitas
├── assets/
│   ├── images/         # Folder untuk foto pasangan, galeri, acara
│   ├── favicon.ico    # Ikon website
│   └── share.jpg      # Gambar share ke media sosial
└── README.md          # Dokumentasi ini
```

## Cara Menggunakan / Customisasi

### 1. Mengubah Data Pasangan (config.js)
Buka file `js/config.js` dan ubah nilai-nilai berikut:

```javascript
const CONFIG = {
    couple: {
        name1: "Nama Pengantin 1",      // Ganti dengan nama kiri
        name2: "Nama Pengantin 2"       // Ganti dengan nama kanan
    },
    weddingDate: "2025-12-10T08:00:00", // Tanggal & waktu akad (format ISO)
    weddingDateDisplay: "Sabtu, 10 Desember 2025", // Teks yang ditampilkan
    
    // Ubah detail acara
    events: [
        {
            type: "akad",
            title: "Akad Nikah",
            date: "2025-12-10",
            time: "08.00 - 10.00 WIB",
            location: "Alamat tempat akad",
            mapsUrl: "Google Maps URL"
        },
        {
            type: "resepsi",
            title: "Resepsi Pernikahan",
            date: "2025-12-10",
            time: "11.00 - 16.00 WIB",
            location: "Alamat tempat resepsi",
            mapsUrl: "Google Maps URL"
        }
    ],
    
    // Kisah cinta (akan muncul di section "Tentang Kita")
    loveStory: [
        "Kalimat-kisah pertama kali bertemu",
        "Pertumbuhan bersama dan hal-hal istimewa"
    ],
    
    // Foto galeri
    galleryImages: [
        { src: "assets/images/gallery1.jpg", alt: "Deskripsi gambar 1" },
        { src: "assets/images/gallery2.jpg", alt: "Deskripsi gambar 2" }
        // Tambah lebih banyak sesuai kebutuhan
    ],
    
    // Nomor WhatsApp untuk RSVP dan amplop
    rsvp: {
        whatsappNumber: "6281234567890" // Tanpa simbol +
    },
    
    // Pesan sambutan di footer
    footerText: "Kartunikah Template. Hak Cipta Dilindungi.",
    
    // Warna tema (hex tanpa #)
    theme: {
        primaryColor: "e91e63",    // Pink
        secondaryColor: "9c27b0",  // Purple
        accentColor: "ff9800"      // Orange
    }
};

window.CONFIG = CONFIG;
```

### 2. Menambahkan Foto
Letakkan file gambar di folder `assets/images/`. Referensinya di `config.js` menggunakan path relatif:
- `assets/images/nama-file.jpg`
- `assets/images/nama-file.png`

### 3. Deploy / Menayangkan Website

**Option A: Hosting Statis (Netlify, Vercel, GitHub Pages)**
1. Push repository ke GitHub
2. Konek ke Netlify/Vercel
3. Situs langsung online dengan domain gratis

**Option B: Folder Lokal**
1. Buka `index.html` di browser favorit
2. Semua fitur akan bekerja karena menggunakan CDN (Tailwind, Alpine.js, Google Fonts)

### 4. Fitur Utang & Deskripsi

| Fitur | Deskripsi |
|-------|-----------|
| **Hero Section** | Countdown timer, nama pasangan, tanggal pernikahan |
| **Tentang Kita** | Kisah cinta & foto pasangan |
| **Jadwal Acara** | Akad Nikah + Resepsi dengan Google Maps |
| **Galeri Foto** | Lightbox preview saat diklik |
| **RSVP** | Form konfirmasi kehadiran + WhatsApp integrasi |
| **Buku Tamu** | Formulir pesan untuk pasangan |
| **Amplop Digital** | Sistem donasi/hiburan dengan preset amount |
| **QR Code** | Generator QR untuk check-in tamu |
| **Responsive** | Tampil sempurna di mobile & desktop |
| **SEO Ready** | Meta tags lengkap untuk search engine |

### 5. Warna Tema

Ubah nilai `theme.primaryColor`, `theme.secondaryColor`, dan `theme.accentColor` di config.js dengan kode hex (tanpa tanda `#`):
- `e91e63` = Pink
- `9c27b0` = Purple  
- `ff9800` = Orange
- `e91e63` = Rose
- `10b981` = Green

### 6. Masalah Umum

- **Countdown berhenti**: Periksa format `weddingDate` di config.js harus `YYYY-MM-DDTHH:mm:ss`
- **Gambar tidak muncul**: Pastikan path file di `assets/images/` benar dan file gambar sudah diupload
- **WhatsApp tidak terbuka**: Periksa nomor telepon di `config.rsvp.whatsappNumber` format tanpa awalan `+`
- **QR code tidak muncul**: Pastikan library qrcode.js sudah termuat dari CDN

### 7. Kontribusi

Jika Anda ingin menambahkan fitur baru atau memperbaiki bug:
1. Buat branch baru dari `main`
2. Lakukan perubahan dan commit
3. Test secara lokal di browser
4. Kirim Pull Request

### 8. Lisensi

Template ini gratis untuk digunakan, baik untuk kebutuhan pribadi maupun komersial. 
- Dilarang menghapus credit link di footer
- Dilarang mendistribusikan sebagai "template asli" tanpa seizin

---

## Kontak & Dukungan

Untuk pertanyaan atau bantuan customization, hubungi:
- Email: dukungan@kartunikah.com
- Website: https://kartunikah.com

---

**Terima kasih telah menggunakan Template Kartunikah!** 💍✨