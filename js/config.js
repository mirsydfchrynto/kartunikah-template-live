/**
 * ╔══════════════════════════════════════════════════════════════╗
 * ║         KARTUNIKAH — KONFIGURASI UTAMA                      ║
 * ║   Cukup ubah file ini untuk menyesuaikan undangan Anda      ║
 * ╚══════════════════════════════════════════════════════════════╝
 *
 *  CARA PAKAI:
 *  1. Edit bagian yang ingin diubah di bawah ini
 *  2. Simpan file
 *  3. Refresh browser — semua perubahan langsung tampil
 *
 *  CATATAN:
 *  - Untuk ganti foto: letakkan file jpg/png di folder images/
 *    lalu ubah path di coverPhoto, heroPhoto, groom.photo, bride.photo
 *  - Untuk tamu: tambahkan ?to=NamaTamu di akhir URL
 */

const CONFIG = {

  // ════════════════════════════════════════════
  // 🎨  TEMA WARNA
  //     Ubah kode hex (#xxxxxx) sesuai selera
  // ════════════════════════════════════════════
  theme: {
    primaryBg:    '#FDF9F3',   // Latar belakang utama  (Ivory/Krem hangat)
    sectionBg:    '#F4EDE2',   // Latar section bergantian (Cream)
    accentColor:  '#A0522D',   // Warna aksen utama     (Sienna/Terracotta)
    darkColor:    '#3D2314',   // Warna teks & elemen gelap
    mutedColor:   '#7B6453',   // Warna teks sekunder
    goldColor:    '#C8A95F',   // Warna emas
    outerBg:      '#261510',   // Background desktop (di luar container)
    // Warna kelopak bunga (boleh tambah/kurangi)
    petalColors:  ['#F0C4A0', '#E8AE8A', '#FAE0C8', '#D9B98A'],
  },

  // ════════════════════════════════════════════
  // 🤵  MEMPELAI PRIA
  // ════════════════════════════════════════════
  groom: {
    fullName:     'Ahmad Rizky Pratama, S.T.',
    shortName:    'Rizky',
    fatherName:   'Bapak H. Sunarto Pratama',
    motherName:   'Ibu Hj. Sri Wahyuni',
    instagram:    '@rizky.pratama',
    photo:        'images/prewed.jpeg',
    // Untuk foto sendiri, ganti dengan: 'images/foto-pria.jpg'
    photoCrop:    '30% 15%',  // Posisi crop (object-position CSS)
    photoScale:   '1.5',
  },

  // ════════════════════════════════════════════
  // 👰  MEMPELAI WANITA
  // ════════════════════════════════════════════
  bride: {
    fullName:     'Dewi Sinta Rahayu, S.Pd.',
    shortName:    'Sinta',
    fatherName:   'Bapak Drs. Bambang Sudirman',
    motherName:   'Ibu Dra. Endang Lestari',
    instagram:    '@sinta.rahayu',
    photo:        'images/prewed.jpeg',
    // Untuk foto sendiri, ganti dengan: 'images/foto-wanita.jpg'
    photoCrop:    '70% 15%',
    photoScale:   '1.5',
  },

  // ════════════════════════════════════════════
  // 📅  TANGGAL PERNIKAHAN
  // ════════════════════════════════════════════
  weddingDate:        '2025-10-18T08:30:00',
  weddingDateDisplay: 'Sabtu, 18 Oktober 2025',
  // Format Google Calendar (ISO UTC — sesuaikan dengan timezone)
  calendarStart:      '20251018T013000Z',
  calendarEnd:        '20251018T100000Z',

  // ════════════════════════════════════════════
  // 📍  RANGKAIAN ACARA
  //     Tambah/hapus objek untuk menambah/mengurangi acara
  // ════════════════════════════════════════════
  events: [
    {
      subtitle:  'Prosesi Suci',
      title:     'Akad Nikah',
      date:      'Sabtu, 18 Oktober 2025',
      time:      '08.30 – 10.00 WIB',
      venue:     'Masjid Agung Al-Azhar',
      address:   'Jl. Sisingamangaraja, Kebayoran Baru, Jakarta Selatan',
      mapsUrl:   'https://maps.google.com/maps?q=Masjid+Al+Azhar+Jakarta',
      cardStyle: 'light',   // 'light' = kartu putih, 'dark' = kartu gelap
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

  // ════════════════════════════════════════════
  // 💑  KISAH CINTA (LOVE STORY TIMELINE)
  //     Tambah/hapus objek untuk menambah/mengurangi milestone
  // ════════════════════════════════════════════
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

  // ════════════════════════════════════════════
  // 📸  GALERI FOTO
  //     Untuk foto lokal: ganti src & thumb dengan path 'images/foto.jpg'
  // ════════════════════════════════════════════
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

  // ════════════════════════════════════════════
  // 💳  REKENING TANDA KASIH
  //     Tambah/hapus objek untuk rekening lain
  // ════════════════════════════════════════════
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

  // ════════════════════════════════════════════
  // 📱  WHATSAPP
  // ════════════════════════════════════════════
  whatsapp: {
    rsvpNumber:  '6281234567890',   // Ganti dengan nomor WA pengantin (tanpa +)
    shareText:   'Assalamu\'alaikum, kami mengundang Anda ke pernikahan kami 💍',
  },

  // ════════════════════════════════════════════
  // 💬  PESAN DEMO BUKU TAMU
  //     Hapus array jika tidak mau pesan demo
  // ════════════════════════════════════════════
  mockMessages: [
    { name: 'Budi & Rina Santoso',   message: 'Selamat menempuh hidup baru! Semoga menjadi keluarga yang sakinah, mawaddah wa rahmah. Barakallahu lakuma 🤲' },
    { name: 'Pak Hendra Wijaya',     message: 'Alhamdulillah, akhirnya jadi juga! Selamat ya Rizky dan Sinta. Semoga langgeng dan segera dikaruniai momongan.' },
    { name: 'Anisa & Keluarga',      message: 'Doa kami selalu menyertai kalian. Jadilah pasangan yang saling mendukung dan menguatkan. Aamiin 🙏' },
    { name: 'Tim Arsitek Nusantara', message: 'Selamat bahagia Mas Rizky! Undangannya cantik banget. Nanti kami hadir semua ya! 🎉' },
  ],

  // ════════════════════════════════════════════
  // 🖼️  FOTO UTAMA
  //     Ganti path sesuai file foto Anda
  // ════════════════════════════════════════════
  coverPhoto: 'images/prewed.jpeg',   // Foto di cover (bingkai arch)
  heroPhoto:  'images/prewed.jpeg',   // Foto polaroid di hero section

};

window.CONFIG = CONFIG;
