/**
 * ╔══════════════════════════════════════════════════════════╗
 * ║        KARTUNIKAH — FILE KONFIGURASI UTAMA              ║
 * ║   Ganti isi file ini saja untuk menyesuaikan undangan   ║
 * ╚══════════════════════════════════════════════════════════╝
 */

const CONFIG = {

  // ══════════════════════════════════════════
  // 🎨 1. TEMA & WARNA
  //    Ganti kode hex sesuai selera warna Anda
  // ══════════════════════════════════════════
  theme: {
    // Warna Utama
    primaryBg:    '#FDF9F1',   // Latar belakang utama (Ivory/Krem)
    sectionBg:    '#F4EDE2',   // Latar belakang section bergantian
    accentColor:  '#A65A41',   // Warna aksen (Terracotta)
    darkColor:    '#3E2A1F',   // Warna teks utama (Cokelat Tua)
    mutedColor:   '#796655',   // Warna teks sekunder
    goldColor:    '#C9A96E',   // Warna emas
    outerBg:      '#2a1c14',   // Background luar container (di desktop)
    // Warna Kelopak Bunga Jatuh
    petalColors: ['#F2C9A6', '#E8B49A', '#FDECD8', '#D4A882'],
  },

  // ══════════════════════════════════════════
  // 🤵 2. MEMPELAI PRIA
  // ══════════════════════════════════════════
  groom: {
    firstName:    'Romeo',
    lastName:     'Montague',
    fullName:     'Romeo Montague',
    fatherName:   'Bapak Lord Montague',
    motherName:   'Ibu Lady Montague',
    instagram:    '@romeo_m',
    photo:        'images/prewed.jpeg',
    photoCrop:    '25% 20%',    // Posisi crop foto profil (object-position CSS)
    photoScale:   '1.4',        // Zoom foto profil
  },

  // ══════════════════════════════════════════
  // 👰 3. MEMPELAI WANITA
  // ══════════════════════════════════════════
  bride: {
    firstName:    'Juliet',
    lastName:     'Capulet',
    fullName:     'Juliet Capulet',
    fatherName:   'Bapak Lord Capulet',
    motherName:   'Ibu Lady Capulet',
    instagram:    '@juliet_c',
    photo:        'images/prewed.jpeg',
    photoCrop:    '75% 20%',    // Posisi crop foto profil
    photoScale:   '1.4',
  },

  // ══════════════════════════════════════════
  // 📅 4. TANGGAL PERNIKAHAN
  // ══════════════════════════════════════════
  weddingDate:        '2025-12-10T08:00:00',
  weddingDateDisplay: 'Rabu, 10 Desember 2025',
  calendarStart:      '20251210T010000Z',   // Format UTC untuk Google Calendar
  calendarEnd:        '20251210T100000Z',

  // ══════════════════════════════════════════
  // 📍 5. RANGKAIAN ACARA
  //    Tambah/hapus objek di dalam array sesuai jumlah acara
  // ══════════════════════════════════════════
  events: [
    {
      type:     'akad',
      subtitle: 'Prosesi Suci',
      title:    'Akad Nikah',
      date:     'Rabu, 10 Desember 2025',
      time:     '08.00 – 10.00 WIB',
      venue:    'Masjid Agung Al-Falah',
      address:  'Jl. Panglima Sudirman No.1, Jakarta Selatan',
      mapsUrl:  'https://maps.google.com',
      accent:   'terracotta',  // 'terracotta' atau 'dark'
    },
    {
      type:     'resepsi',
      subtitle: 'Perayaan Cinta',
      title:    'Resepsi',
      date:     'Rabu, 10 Desember 2025',
      time:     '11.00 – Selesai',
      venue:    'Grand Ballroom Jakarta',
      address:  'Jl. Sudirman No.2, Jakarta Pusat',
      mapsUrl:  'https://maps.google.com',
      accent:   'dark',
    },
  ],

  // ══════════════════════════════════════════
  // 💑 6. KISAH CINTA (Love Story Timeline)
  //    Tambah/hapus milestone sesuai cerita Anda
  // ══════════════════════════════════════════
  loveStory: [
    {
      year:  '2020',
      icon:  '☕',
      title: 'Pertemuan Pertama',
      desc:  'Kami dipertemukan oleh teman bersama di sebuah kedai kopi yang hangat. Tak ada yang menyangka pertemuan sederhana itu akan mengubah segalanya.',
    },
    {
      year:  '2022',
      icon:  '💌',
      title: 'Resmi Berpacaran',
      desc:  'Setelah dua tahun saling mengenal, Romeo memberanikan diri untuk menyatakan perasaannya. Juliet pun menerima dengan sepenuh hati.',
    },
    {
      year:  '2024',
      icon:  '💍',
      title: 'Lamaran',
      desc:  'Di bawah langit berbintang, Romeo berlutut dan bertanya satu pertanyaan paling indah. Dengan air mata bahagia, Juliet menjawab "Ya".',
    },
  ],

  // ══════════════════════════════════════════
  // 📸 7. GALERI FOTO
  //    Ganti URL dengan foto asli Anda
  //    (Bisa pakai URL Unsplash, Google Drive, atau path lokal seperti 'images/foto1.jpg')
  // ══════════════════════════════════════════
  gallery: [
    {
      src:     'https://images.unsplash.com/photo-1606800052052-a08af7148866?w=1200&q=90',
      thumb:   'https://images.unsplash.com/photo-1606800052052-a08af7148866?w=600&q=80',
      caption: 'Momen Pertama Bersama',
    },
    {
      src:     'https://images.unsplash.com/photo-1519741497674-611481863552?w=1200&q=90',
      thumb:   'https://images.unsplash.com/photo-1519741497674-611481863552?w=600&q=80',
      caption: 'Sebuah Awal yang Indah',
    },
    {
      src:     'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=1200&q=90',
      thumb:   'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=600&q=80',
      caption: 'Bersama dalam Suka Duka',
    },
    {
      src:     'https://images.unsplash.com/photo-1520854221256-17451cc331bf?w=1200&q=90',
      thumb:   'https://images.unsplash.com/photo-1520854221256-17451cc331bf?w=600&q=80',
      caption: 'Menuju Hari Bahagia',
    },
    {
      src:     'https://images.unsplash.com/photo-1604928135898-0c306d8fc9ba?w=1200&q=90',
      thumb:   'https://images.unsplash.com/photo-1604928135898-0c306d8fc9ba?w=600&q=80',
      caption: 'Cinta yang Tulus',
    },
  ],

  // ══════════════════════════════════════════
  // 💳 8. REKENING (Tanda Kasih Digital)
  //    Tambah/hapus objek sesuai jumlah rekening
  // ══════════════════════════════════════════
  bankAccounts: [
    {
      bank:          'Bank BCA',
      accountNumber: '1234567890',
      accountName:   'Romeo Montague',
    },
    {
      bank:          'Bank Mandiri',
      accountNumber: '0987654321',
      accountName:   'Juliet Capulet',
    },
  ],

  // ══════════════════════════════════════════
  // 📱 9. WHATSAPP
  // ══════════════════════════════════════════
  whatsapp: {
    rsvpNumber:   '6281234567890',   // Nomor WA penerima RSVP (format: 62xxx tanpa +)
    shareText:    'Bismillah, kami mengundang Anda ke pernikahan kami 💍✨',
  },

  // ══════════════════════════════════════════
  // 💬 10. PESAN DEMO (Buku Tamu)
  //     Hapus array ini jika tidak mau pesan demo
  // ══════════════════════════════════════════
  mockMessages: [
    { name: 'Budi Santoso',  message: 'Selamat menempuh hidup baru! Semoga sakinah mawaddah warahmah 🤲' },
    { name: 'Siti Rahayu',   message: 'Bahagia selalu untuk kalian. Doa kami menyertai dari jauh 💕' },
    { name: 'Ahmad Fauzi',   message: 'Semoga pernikahan ini menjadi awal dari kebahagiaan yang abadi!' },
  ],

  // ══════════════════════════════════════════
  // 🖼️ 11. FOTO UTAMA
  // ══════════════════════════════════════════
  coverPhoto: 'images/prewed.jpeg',   // Foto di halaman cover (arch frame)
  heroPhoto:  'images/prewed.jpeg',   // Foto polaroid di hero section

};

window.CONFIG = CONFIG;
