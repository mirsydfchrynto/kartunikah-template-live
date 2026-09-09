/**
 * ╔══════════════════════════════════════════════════════════════════════════╗
 * ║                  KARTUNIKAH — PUSAT KONTROL UNDANGAN                     ║
 * ║         Semua kustomisasi (Warna, Teks, Foto, Musik, Acara)             ║
 * ║                   CUKUP DIUBAH DI FILE INI SAJA!                         ║
 * ╚══════════════════════════════════════════════════════════════════════════╝
 *
 * 💡 PANDUAN CEPAT:
 * 1. NAMA TAMU:
 *    - Default: diatur pada `defaultGuestName` di bawah ini.
 *    - Per Tamu (Personal): Tambahkan `?to=Nama+Tamu` di akhir link web saat disebar di WhatsApp!
 *      Contoh: https://link-undangan.com/?to=Bapak+Budi+Santoso
 * 2. GANTI FOTO:
 *    - Masukkan file foto ke folder `images/`
 *    - Lalu ganti nama filenya di bagian `coverPhoto`, `heroPhoto`, `groom.photo`, `bride.photo`.
 * 3. GANTI WARNA:
 *    - Cukup ganti kode HEX (contoh: `#A0522D`) di bagian `theme` di bawah.
 */

const CONFIG = {

  // ════════════════════════════════════════════════════════════════════════
  // 💌 1. NAMA TAMU DEFAULT (Jika membuka link tanpa ?to=...)
  // ════════════════════════════════════════════════════════════════════════
  defaultGuestName: 'Tamu Undangan',


  // ════════════════════════════════════════════════════════════════════════
  // 🎨 2. TEMA WARNA (Ganti kode hex sesuai konsep pernikahan)
  // ════════════════════════════════════════════════════════════════════════
  /*
   * 🌟 REKOMENDASI KOMBINASI WARNA POPULER:
   * • Etnik Jawa / Terracotta : primaryBg: '#FDF9F3', accentColor: '#A0522D', darkColor: '#3D2314'
   * • Emerald / Sage Green   : primaryBg: '#F4F8F5', accentColor: '#2D6A4F', darkColor: '#1B4332'
   * • Dusty Rose / Mauve     : primaryBg: '#FCF5F7', accentColor: '#C27088', darkColor: '#4A2833'
   * • Navy & Gold            : primaryBg: '#F8F9FD', accentColor: '#C8A95F', darkColor: '#1A2B4C'
   */
  theme: {
    primaryBg:    '#FDF9F3',   // Latar belakang halaman utama
    sectionBg:    '#F4EDE2',   // Latar belakang section selingan (Kisah Cinta, Doa)
    accentColor:  '#A0522D',   // Warna aksen tombol, garis, dan highlight (Terracotta)
    darkColor:    '#3D2314',   // Warna teks utama & kartu gelap
    mutedColor:   '#7B6453',   // Warna teks keterangan/sekunder
    goldColor:    '#C8A95F',   // Warna emas ornamen
    outerBg:      '#261510',   // Warna background di luar layar HP (pada layar desktop)
    petalColors:  ['#F0C4A0', '#E8AE8A', '#FAE0C8', '#D9B98A'], // Warna kelopak bunga gugur
  },


  // ════════════════════════════════════════════════════════════════════════
  // 🤵 3. MEMPELAI PRIA
  // ════════════════════════════════════════════════════════════════════════
  groom: {
    fullName:     'Ahmad Rizky Pratama, S.T.',
    shortName:    'Rizky',
    fatherName:   'Bapak H. Sunarto Pratama',
    motherName:   'Ibu Hj. Sri Wahyuni',
    instagram:    '@rizky.pratama',
    photo:        'images/prewed.jpeg',
    photoCrop:    '30% 15%',   // Posisi fokus wajah (object-position CSS: horizontal vertikal)
    photoScale:   '1.5',       // Zoom foto profil jika pakai foto berdua
  },


  // ════════════════════════════════════════════════════════════════════════
  // 👰 4. MEMPELAI WANITA
  // ════════════════════════════════════════════════════════════════════════
  bride: {
    fullName:     'Dewi Sinta Rahayu, S.Pd.',
    shortName:    'Sinta',
    fatherName:   'Bapak Drs. Bambang Sudirman',
    motherName:   'Ibu Dra. Endang Lestari',
    instagram:    '@sinta.rahayu',
    photo:        'images/prewed.jpeg',
    photoCrop:    '70% 15%',   // Posisi fokus wajah
    photoScale:   '1.5',       // Zoom foto
  },


  // ════════════════════════════════════════════════════════════════════════
  // 📅 5. TANGGAL PERNIKAHAN & HITUNG MUNDUR
  // ════════════════════════════════════════════════════════════════════════
  weddingDate:        '2025-10-18T08:30:00', // Format: TAHUN-BULAN-TANGGALTJAM:MENIT:DETIK
  weddingDateDisplay: 'Sabtu, 18 Oktober 2025',
  calendarStart:      '20251018T013000Z',   // Format Google Calendar UTC (YYYYMMDDTHHmmssZ)
  calendarEnd:        '20251018T100000Z',


  // ════════════════════════════════════════════════════════════════════════
  // 📖 6. AYAT SUCI / KUTIPAN KATA MUTIARA
  // ════════════════════════════════════════════════════════════════════════
  quote: {
    text:   'Dan di antara tanda-tanda kekuasaan-Nya ialah Dia menciptakan untukmu istri-istri dari jenismu sendiri, supaya kamu cenderung dan merasa tenteram kepadanya, dan dijadikan-Nya diantaramu rasa kasih dan sayang.',
    source: '(QS. Ar-Rum: 21)',
  },


  // ════════════════════════════════════════════════════════════════════════
  // 📍 7. RANGKAIAN ACARA (Bisa tambah atau kurangi sesi acara)
  // ════════════════════════════════════════════════════════════════════════
  events: [
    {
      subtitle:  'Prosesi Suci',
      title:     'Akad Nikah',
      date:      'Sabtu, 18 Oktober 2025',
      time:      '08.30 – 10.00 WIB',
      venue:     'Masjid Agung Al-Azhar',
      address:   'Jl. Sisingamangaraja, Kebayoran Baru, Jakarta Selatan',
      mapsUrl:   'https://maps.google.com/maps?q=Masjid+Al+Azhar+Jakarta',
      cardStyle: 'light',  // Pilihan: 'light' (kartu putih) atau 'dark' (kartu gelap)
    },
    {
      subtitle:  'Perayaan Cinta',
      title:     'Resepsi',
      date:      'Sabtu, 18 Oktober 2025',
      time:      '11.00 – Selesai',
      venue:     'Balai Kartini Convention Center',
      address:   'Jl. Gatot Subroto No. 37, Jakarta Selatan 12950',
      mapsUrl:   'https://maps.google.com/maps?q=Balai+Kartini+Jakarta',
      cardStyle: 'dark',
    },
  ],


  // ════════════════════════════════════════════════════════════════════════
  // 💑 8. KISAH CINTA (Love Story Timeline)
  // ════════════════════════════════════════════════════════════════════════
  loveStory: [
    {
      year:   '2019',
      icon:   '🎓',
      title:  'Pertemuan Pertama',
      desc:   'Kami pertama kali bertemu di kampus saat ospek mahasiswa baru. Rizky menawarkan bantuan ketika Sinta tersesat mencari ruang kuliah — dan sejak saat itu, pertemanan kami tumbuh perlahan.',
    },
    {
      year:   '2021',
      icon:   '💌',
      title:  'Resmi Berpacaran',
      desc:   'Di bawah pohon beringin halaman kampus yang biasa kami jadikan tempat belajar bersama, Rizky memberanikan diri untuk mengungkapkan perasaannya. Sinta tersenyum dan menerima.',
    },
    {
      year:   '2024',
      icon:   '💍',
      title:  'Lamaran di Bali',
      desc:   'Rizky menyiapkan kejutan lamaran di tepi Pantai Seminyak saat matahari terbenam. Dengan cincin berlian di tangannya, ia bertanya — dan dengan air mata bahagia, Sinta menjawab "Iya, mau."',
    },
  ],


  // ════════════════════════════════════════════════════════════════════════
  // 📸 9. ALBUM GALERI FOTO (Bisa link online atau path foto lokal 'images/...')
  // ════════════════════════════════════════════════════════════════════════
  gallery: [
    {
      src:     'https://images.unsplash.com/photo-1606800052052-a08af7148866?w=1200&q=85',
      thumb:   'https://images.unsplash.com/photo-1606800052052-a08af7148866?w=600&q=75',
      caption: 'Prewedding di Kebun Teh',
    },
    {
      src:     'https://images.unsplash.com/photo-1519741497674-611481863552?w=1200&q=85',
      thumb:   'https://images.unsplash.com/photo-1519741497674-611481863552?w=600&q=75',
      caption: 'Momen Berdua di Pantai',
    },
    {
      src:     'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=1200&q=85',
      thumb:   'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=600&q=75',
      caption: 'Cincin Pertunangan',
    },
    {
      src:     'https://images.unsplash.com/photo-1520854221256-17451cc331bf?w=1200&q=85',
      thumb:   'https://images.unsplash.com/photo-1520854221256-17451cc331bf?w=600&q=75',
      caption: 'Malam Sebelum Hari H',
    },
    {
      src:     'https://images.unsplash.com/photo-1604928135898-0c306d8fc9ba?w=1200&q=85',
      thumb:   'https://images.unsplash.com/photo-1604928135898-0c306d8fc9ba?w=600&q=75',
      caption: 'Pelaminan yang Indah',
    },
  ],


  // ════════════════════════════════════════════════════════════════════════
  // 💳 10. REKENING BANK & HADIAH DIGITAL (Bisa tambah rekening lain)
  // ════════════════════════════════════════════════════════════════════════
  bankAccounts: [
    {
      bank:          'Bank BCA',
      accountNumber: '1234 5678 90',
      accountName:   'Ahmad Rizky Pratama',
    },
    {
      bank:          'Bank Mandiri',
      accountNumber: '0987 6543 21',
      accountName:   'Dewi Sinta Rahayu',
    },
  ],


  // ════════════════════════════════════════════════════════════════════════
  // 📱 11. PENGATURAN WHATSAPP (RSVP & Tombol Bagikan)
  // ════════════════════════════════════════════════════════════════════════
  whatsapp: {
    rsvpNumber:  '6281234567890',  // Nomor HP penerima pesan konfirmasi tamu (gunakan format 62...)
    shareText:   'Assalamu\'alaikum, kami mengundang Anda ke pernikahan kami 💍',
  },


  // ════════════════════════════════════════════════════════════════════════
  // 🎵 12. MUSIK LATAR & FOTO UTAMA
  // ════════════════════════════════════════════════════════════════════════
  musicUrl:   'audio/janji-suci.mp3', // Path lagu mp3
  coverPhoto: 'images/prewed.jpeg',    // Foto di halaman sampul pembuka (bingkai Arch)
  heroPhoto:  'images/prewed.jpeg',    // Foto di section beranda (bingkai Polaroid)


  // ════════════════════════════════════════════════════════════════════════
  // 💬 13. PESAN AWAL BUKU TAMU (Ucapan & Doa Demo)
  // ════════════════════════════════════════════════════════════════════════
  mockMessages: [
    { name: 'Budi & Rina Santoso',   message: 'Selamat menempuh hidup baru! Semoga menjadi keluarga yang sakinah, mawaddah wa rahmah. Barakallahu lakuma 🤲' },
    { name: 'Pak Hendra Wijaya',     message: 'Alhamdulillah, akhirnya jadi juga! Selamat ya Rizky dan Sinta. Semoga langgeng dan segera dikaruniai momongan.' },
    { name: 'Anisa & Keluarga',      message: 'Doa kami selalu menyertai kalian. Jadilah pasangan yang saling mendukung dan menguatkan. Aamiin 🙏' },
    { name: 'Tim Arsitek Nusantara', message: 'Selamat bahagia Mas Rizky! Undangannya cantik banget. Nanti kami hadir semua ya! 🎉' },
  ],

};

// Buat objek CONFIG dapat diakses secara global oleh script.js
window.CONFIG = CONFIG;
