/**
 * ╔══════════════════════════════════════════════════════════════════════════╗
 * ║                  KARTUNIKAH — PUSAT KONTROL MASTERPIECE                  ║
 * ║  Semua Pengaturan (Warna, Teks, Foto, Audio 8D, Kalender, Tanda Kasih) ║
 * ║                   CUKUP DIUBAH DI FILE INI SAJA!                         ║
 * ╚══════════════════════════════════════════════════════════════════════════╝
 *
 * 💡 PANDUAN CEPAT:
 * 1. NAMA TAMU:
 *    - Default: diatur pada `defaultGuestName`.
 *    - Personal: Gunakan fitur "Generator WhatsApp" di footer website ini untuk
 *      membuat link otomatis per tamu (?to=Nama+Tamu) dan langsung kirim ke chat WA!
 * 2. GANTI FOTO:
 *    - Letakkan file foto di folder `images/` lalu sesuaikan path di bawah.
 * 3. GANTI WARNA & TEMA:
 *    - Ganti kode warna HEX di bagian `theme`.
 */

const CONFIG = {

  // ════════════════════════════════════════════════════════════════════════
  // 💌 1. NAMA TAMU DEFAULT (Jika link dibuka polosan tanpa ?to=...)
  // ════════════════════════════════════════════════════════════════════════
  defaultGuestName: 'Tamu Undangan',


  // ════════════════════════════════════════════════════════════════════════
  // 🎨 2. TEMA WARNA (Dapat disesuaikan dengan palet pernikahan Anda)
  // ════════════════════════════════════════════════════════════════════════
  theme: {
    primaryBg:    '#FDF9F3',   // Latar belakang utama (Ivory/Krem)
    sectionBg:    '#F4EDE2',   // Latar belakang section selingan
    accentColor:  '#A0522D',   // Aksen utama (Terracotta / Sienna)
    darkColor:    '#3D2314',   // Warna teks utama & kartu gelap
    mutedColor:   '#7B6453',   // Warna teks sekunder / keterangan
    goldColor:    '#C8A95F',   // Warna emas ornamen & bintang
    outerBg:      '#261510',   // Warna background di luar layar HP (pada desktop)
    envelopeColor:'#8B4513',   // Warna kertas amplop 3D (Saddle Brown / Terracotta)
    waxSealColor: '#962D2D',   // Warna cap segel lilin merah 3D
    petalColors:  ['#F0C4A0', '#E8AE8A', '#FAE0C8', '#D9B98A'], // Warna kelopak bunga gugur 3D
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
    photoCrop:    '30% 15%',   // Posisi fokus wajah (object-position CSS)
    photoScale:   '1.5',       // Skala pembesaran foto
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
    photoCrop:    '70% 15%',
    photoScale:   '1.5',
  },


  // ════════════════════════════════════════════════════════════════════════
  // 📅 5. TANGGAL PERNIKAHAN & HITUNG MUNDUR (Otomatis hitung kalender)
  // ════════════════════════════════════════════════════════════════════════
  weddingDate:        '2025-10-18T08:30:00', // Format: YYYY-MM-DDTHH:mm:ss
  weddingDateDisplay: 'Sabtu, 18 Oktober 2025',
  calendarStart:      '20251018T013000Z',   // Format UTC Google Calendar
  calendarEnd:        '20251018T100000Z',


  // ════════════════════════════════════════════════════════════════════════
  // 📖 6. AYAT SUCI / KUTIPAN KATA MUTIARA
  // ════════════════════════════════════════════════════════════════════════
  quote: {
    text:   'Dan di antara tanda-tanda kekuasaan-Nya ialah Dia menciptakan untukmu istri-istri dari jenismu sendiri, supaya kamu cenderung dan merasa tenteram kepadanya, dan dijadikan-Nya diantaramu rasa kasih dan sayang.',
    source: '(QS. Ar-Rum: 21)',
  },


  // ════════════════════════════════════════════════════════════════════════
  // 📍 7. RANGKAIAN ACARA (Bisa ditambah/dikurangi sesuai kebutuhan)
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
      cardStyle: 'light',  // 'light' (kartu terang) atau 'dark' (kartu gelap)
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
  // 👗 8. PANDUAN WARNA BUSANA (DRESS CODE SWATCHES)
  // ════════════════════════════════════════════════════════════════════════
  dressCode: {
    title:       'Panduan Busana (Dress Code)',
    description: 'Kami menyarankan para tamu undangan mengenakan pakaian formal bernuansa warna tanah (Earth Tone) yang selaras.',
    colors: [
      { name: 'Terracotta', hex: '#A0522D' },
      { name: 'Warm Cream', hex: '#EED9C4' },
      { name: 'Sage Green', hex: '#879F84' },
      { name: 'Champagne',  hex: '#D9C5A0' },
      { name: 'Muted Gold', hex: '#C8A95F' },
    ]
  },


  // ════════════════════════════════════════════════════════════════════════
  // 💑 9. KISAH CINTA (Love Story Timeline)
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
  // 🎞️ 10. ALBUM FOTO KISAH SINEMATIK (Galeri Berjalan & FancyBox)
  // ════════════════════════════════════════════════════════════════════════
  gallery: [
    {
      src:     'https://images.unsplash.com/photo-1606800052052-a08af7148866?w=1200&q=85',
      thumb:   'https://images.unsplash.com/photo-1606800052052-a08af7148866?w=600&q=75',
      caption: 'Prewedding di Kebun Teh',
      filmDate:'18 OCT 2025'
    },
    {
      src:     'https://images.unsplash.com/photo-1519741497674-611481863552?w=1200&q=85',
      thumb:   'https://images.unsplash.com/photo-1519741497674-611481863552?w=600&q=75',
      caption: 'Momen Berdua di Pantai',
      filmDate:'18 OCT 2025'
    },
    {
      src:     'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=1200&q=85',
      thumb:   'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=600&q=75',
      caption: 'Cincin Pertunangan',
      filmDate:'18 OCT 2025'
    },
    {
      src:     'https://images.unsplash.com/photo-1520854221256-17451cc331bf?w=1200&q=85',
      thumb:   'https://images.unsplash.com/photo-1520854221256-17451cc331bf?w=600&q=75',
      caption: 'Malam Sebelum Hari Bahagia',
      filmDate:'18 OCT 2025'
    },
    {
      src:     'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=1200&q=85',
      thumb:   'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=600&q=75',
      caption: 'Senyum Bahagia Bersama',
      filmDate:'18 OCT 2025'
    },
    {
      src:     'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=1200&q=85',
      thumb:   'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=600&q=75',
      caption: 'Janji Suci Selamanya',
      filmDate:'18 OCT 2025'
    },
  ],


  // ════════════════════════════════════════════════════════════════════════
  // 🎁 11. KADO & TANDA KASIH DIGITAL (REKENING BANK)
  // ════════════════════════════════════════════════════════════════════════
  tandaKasih: {
    title:       'Kado & Tanda Kasih Digital',
    description: 'Doa restu Anda merupakan karunia terindah bagi kami. Namun jika ingin memberikan tanda kasih secara digital, silakan ketuk amplop di bawah ini:',
    qrisImage:   '', // Kosongkan jika tidak memakai QRIS, atau isi 'images/qris.jpg'
  },
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
  // 🎧 12. AUDIO & EFEK SUARA SPASIAL 8D
  // ════════════════════════════════════════════════════════════════════════
  musicUrl:     'audio/janji-suci.mp3', // File lagu latar
  sfxEnabled:   true,                   // Suara prosedural (kertas amplop, segel lilin, lonceng)
  coverPhoto:   'images/prewed.jpeg',   // Foto di kartu undangan
  heroPhoto:    'images/prewed.jpeg',   // Foto polaroid beranda


  // ════════════════════════════════════════════════════════════════════════
  // 📱 13. PENGATURAN WHATSAPP & GENERATOR UNDANGAN TAMU
  // ════════════════════════════════════════════════════════════════════════
  whatsapp: {
    rsvpNumber:  '6281234567890', // Nomor WA penerima RSVP (format: 62...)
    shareText:   'Assalamu\'alaikum, kami mengundang Anda untuk hadir di hari pernikahan kami 💍',
    // Draf pesan yang otomatis disiapkan oleh "Generator Tautan Tamu WhatsApp":
    invitationTemplate: `Assalamu'alaikum Warahmatullahi Wabarakatuh,\n\nKepada Yth. *{nama_tamu}*,\n\nTanpa mengurangi rasa hormat, perkenankan kami mengundang Bapak/Ibu/Saudara/i untuk menghadiri hari bahagia pernikahan kami:\n\n*Ahmad Rizky Pratama & Dewi Sinta Rahayu*\n\nInformasi lengkap dan konfirmasi kehadiran dapat diakses melalui tautan undangan digital berikut:\n👉 {link_undangan}\n\nMerupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir dan memberikan doa restu.\n\nTerima kasih,\n*Rizky & Sinta*`
  },


  // ════════════════════════════════════════════════════════════════════════
  // 💬 14. PESAN DEMO BUKU TAMU
  // ════════════════════════════════════════════════════════════════════════
  mockMessages: [
    { name: 'Budi & Rina Santoso',   message: 'Selamat menempuh hidup baru! Semoga menjadi keluarga yang sakinah, mawaddah wa rahmah. Barakallahu lakuma 🤲', likes: 12 },
    { name: 'Pak Hendra Wijaya',     message: 'Alhamdulillah, akhirnya jadi juga! Selamat ya Rizky dan Sinta. Semoga langgeng dan segera dikaruniai momongan.', likes: 8 },
    { name: 'Anisa & Keluarga',      message: 'Doa kami selalu menyertai kalian. Jadilah pasangan yang saling mendukung dan menguatkan. Aamiin 🙏', likes: 15 },
    { name: 'Tim Arsitek Nusantara', message: 'Selamat bahagia Mas Rizky! Undangannya cantik dan sangat interaktif. Nanti kami hadir semua ya! 🎉', likes: 20 },
  ],
};

CONFIG.angpao = CONFIG.tandaKasih; // Alias kompatibilitas
window.CONFIG = CONFIG;
