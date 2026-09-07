// Configuration for Kartunikah Template
// Edit these values to personalize the wedding website

const CONFIG = {
    // Couple Information
    couple: {
        name1: "Nama Pengantin 1",
        name2: "Nama Pengantin 2",
        // Optional: display names separately
        // name1Display: "Nama Pengantin 1",
        // name2Display: "Nama Pengantin 2"
    },

    // Wedding Date & Time (in local timezone)
    weddingDate: "2025-12-10T08:00:00", // Format: YYYY-MM-DDTHH:mm:ss
    weddingDateDisplay: "Sabtu, 10 Desember 2025",

    // Event Details
    events: [
        {
            type: "akad",
            title: "Akad Nikah",
            date: "2025-12-10",
            time: "08.00 - 10.00 WIB",
            location: "Masjid Raya Al-Muhajirin, Jalan Pahlawan No. 123",
            mapsUrl: "https://www.google.com/maps/search/?api=1&query=Masjid+Raya+Al-Muhajirin",
            image: "assets/images/akad.jpg"
        },
        {
            type: "resepsi",
            title: "Resepsi Pernikahan",
            date: "2025-12-10",
            time: "11.00 - 16.00 WIB",
            location: "Grand Ballroom Hotel Merdeka, Jalan Sudirman No. 456",
            mapsUrl: "https://www.google.com/maps/search/?api=1&query=Grand+Ballroom+Hotel+Merdeka",
            image: "assets/images/resepsi.jpg"
        }
    ],

    // Love Story / About Couple
    loveStory: [
        "Kami bertemu pada tahun 2020 melalui teman bersama, dan sejak saat pertama kali bertemu, kami merasa ada koneksi khusus yang tidak bisa dijelaskan dengan kata-kata.",
        "Journey kita penuh dengan petualangan, tawa, dan pertumbuhan bersama. Kami berdua saling mendukung dalam setiap langkah hidup, dan kini siap untuk memulai babak baru sebagai suami istri."
    ],

    // Gallery Images (array of objects with src and alt)
    galleryImages: [
        { src: "assets/images/gallery1.jpg", alt: "Moment pertama bertemu" },
        { src: "assets/images/gallery2.jpg", alt: "Wisata bersama di Bali" },
        { src: "assets/images/gallery3.jpg", alt: "Moment nongkrong di kafe favorit" },
        { src: "assets/images/gallery4.jpg", alt: "Foto pre-wedding di taman bunga" },
        { src: "assets/images/gallery5.jpg", alt: "Moment seru saat main game bersama" },
        { src: "assets/images/gallery6.jpg", alt: "Makan malam saat anniversary" }
    ],

    // RSVP Configuration
    rsvp: {
        whatsappNumber: "6281234567890", // Without + for WhatsApp link
        // Optional: redirect after submit (if using backend)
        // redirectUrl: "https://example.com/thanks"
    },

    // Guest Book Configuration
    guestbook: {
        // In a real app, this would be fetched from backend
        // For demo, we'll use mock data
        mockMessages: [
            { name: "Budi Santoso", message: "Selamat menempuh hidup baru! Semoga bahagia selalu." },
            { name: "Lina Wijaya", message: "Doa kami tempatkan untuk kalian. Selamat menikah!" }
        ]
    },

    // Digital Envelope (Amplop) Configuration
    donation: {
        // Amounts in thousands (Rp)
        presetAmounts: [50, 100, 200, 500],
        // Note: In real implementation, connect to payment gateway
        // For now, we'll show a mock success message
        note: "Amplop bisa dikirim via QR code, transfer bank, atau e-wallet. Detail akan dikirim setelah konfirmasi."
    },

    // Styling
    theme: {
        primaryColor: "#e91e63", // Pink
        secondaryColor: "#9c27b0", // Purple
        accentColor: "#ff9800"   // Orange
    },

    // Miscellaneous
    footerText: "Kartunikah Template. Hak Cipta Dilindungi.",
    // Share message for WhatsApp button
    shareMessage: "Halo saya mau konfirmasi kehadiran di undangan pernikahan Anda 💍💑"
};

// Make config globally accessible
window.CONFIG = CONFIG;