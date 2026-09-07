// Production-Ready JS Setup (Bento & Confetti Edition)

window.addEventListener('load', () => {
    const loader = document.getElementById('loading-screen');
    if (loader) {
        loader.classList.add('opacity-0');
        setTimeout(() => {
            loader.classList.add('hidden');
        }, 700);
    }
});

document.addEventListener('DOMContentLoaded', () => {
    // Initialize AOS
    AOS.init({ duration: 1000, once: true, offset: 50 });

    // 1. Setup Data & Config
    if (window.CONFIG) {
        const coverNames = document.getElementById('cover-couple-names');
        if (coverNames) coverNames.textContent = `${CONFIG.couple.name1} & ${CONFIG.couple.name2}`;
        
        const heroNames = document.getElementById('hero-couple-names');
        if (heroNames) heroNames.textContent = `${CONFIG.couple.name1} & ${CONFIG.couple.name2}`;
        
        const year = document.getElementById('year');
        if (year) year.textContent = new Date().getFullYear();
    }

    // 2. Parse URL parameter for Guest Name (?to=Nama+Tamu)
    const urlParams = new URLSearchParams(window.location.search);
    const guestNameParam = urlParams.get('to') || 'Tamu Undangan';
    
    const guestNameEl = document.getElementById('guest-name');
    if (guestNameEl) guestNameEl.textContent = guestNameParam;
    document.title = `Undangan - Yth. ${guestNameParam}`;

    // 2.5 Generate QR Code
    const qrContainer = document.getElementById('dynamic-qr-container');
    const qrDisplay = document.getElementById('qr-guest-name-display');
    if (qrContainer && typeof QRCode !== 'undefined') {
        qrContainer.innerHTML = ''; // clear existing
        new QRCode(qrContainer, {
            text: `VIP-${guestNameParam.replace(/\s+/g, '-').toUpperCase()}`,
            width: 140,
            height: 140,
            colorDark : "#4A2E2B",
            colorLight : "#FFF5EA",
            correctLevel : QRCode.CorrectLevel.H
        });
    }
    if (qrDisplay) qrDisplay.textContent = guestNameParam;

    // 3. Handle Cover Screen & Music & Bottom Nav
    const btnOpen = document.getElementById('btn-open-invitation');
    const coverScreen = document.getElementById('cover-screen');
    const body = document.body;
    const bgMusic = document.getElementById('bg-music');
    const musicControl = document.getElementById('music-control');
    const musicIcon = document.getElementById('music-icon');
    const mobileNav = document.getElementById('mobile-nav');
    let isPlaying = false;

    if (btnOpen && coverScreen) {
        btnOpen.addEventListener('click', () => {
            coverScreen.style.transform = 'translateY(-100%)';
            body.classList.remove('no-scroll');
            
            setTimeout(() => {
                if(musicControl) musicControl.classList.remove('hidden', 'scale-50', 'opacity-0');
                if(mobileNav) mobileNav.classList.remove('translate-y-32', 'opacity-0'); // Pill nav
            }, 500);

            if (bgMusic) {
                bgMusic.play().then(() => {
                    isPlaying = true;
                    if(musicIcon) musicIcon.classList.add('music-spin');
                }).catch(err => console.log("Audio autoplay prevented", err));
            }
        });
    }

    if (musicControl && bgMusic) {
        musicControl.addEventListener('click', () => {
            if (isPlaying) {
                bgMusic.pause();
                if(musicIcon) musicIcon.classList.remove('music-spin');
            } else {
                bgMusic.play();
                if(musicIcon) musicIcon.classList.add('music-spin');
            }
            isPlaying = !isPlaying;
        });
    }

    // Smooth Scrolling
    document.querySelectorAll('.bottom-nav a, nav a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const target = document.getElementById(targetId);
            if(target) target.scrollIntoView({ behavior: 'smooth' });
        });
    });

    // 4. Countdown Timer
    const targetDate = new Date(CONFIG?.weddingDate || '2025-12-10T08:00:00').getTime();
    const countdownElement = document.getElementById('countdown');
    if (countdownElement && !isNaN(targetDate)) {
        const updateCountdown = setInterval(() => {
            const distance = targetDate - new Date().getTime();
            if (distance < 0) {
                clearInterval(updateCountdown);
                return;
            }
            const elDays = document.getElementById('days');
            const elHours = document.getElementById('hours');
            const elMins = document.getElementById('minutes');
            const elSecs = document.getElementById('seconds');
            
            if(elDays) elDays.textContent = Math.floor(distance / (1000 * 60 * 60 * 24)).toString().padStart(2, '0');
            if(elHours) elHours.textContent = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)).toString().padStart(2, '0');
            if(elMins) elMins.textContent = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)).toString().padStart(2, '0');
            if(elSecs) elSecs.textContent = Math.floor((distance % (1000 * 60)) / 1000).toString().padStart(2, '0');
        }, 1000);
    }

    // 5. Add to Calendar
    const calBtn = document.getElementById('add-to-calendar');
    if (calBtn) {
        calBtn.addEventListener('click', () => {
            const title = encodeURIComponent(`Pernikahan ${CONFIG?.couple?.name1 || 'Romeo'} & ${CONFIG?.couple?.name2 || 'Juliet'}`);
            const dates = "20251210T010000Z/20251210T080000Z"; 
            const details = encodeURIComponent("Merupakan suatu kehormatan apabila Bapak/Ibu berkenan hadir.");
            const location = encodeURIComponent("Grand Ballroom Hotel Merdeka, Bandung");
            const url = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${dates}&details=${details}&location=${location}`;
            window.open(url, '_blank');
        });
    }

    // 6. API-Ready Forms (RSVP & Guestbook) with Confetti!
    const guestbookList = document.getElementById('guestbook-list');
    if (guestbookList && window.CONFIG && CONFIG.guestbook.mockMessages) {
        CONFIG.guestbook.mockMessages.forEach(msg => appendGuestbookMessage(msg.name, msg.message));
    }

    const guestbookForm = document.getElementById('guestbook-form');
    if (guestbookForm) {
        guestbookForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const btn = document.getElementById('btn-submit-guestbook');
            const originalText = btn.textContent;
            btn.textContent = "MENGIRIM...";
            btn.disabled = true;

            await new Promise(resolve => setTimeout(resolve, 1000));

            appendGuestbookMessage(
                document.getElementById('guest-name-input').value,
                document.getElementById('guest-message').value
            );
            guestbookForm.reset();
            btn.textContent = originalText;
            btn.disabled = false;
        });
    }

    const rsvpForm = document.getElementById('rsvp-form');
    if (rsvpForm) {
        rsvpForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const btn = document.getElementById('btn-submit-rsvp');
            const originalText = btn.textContent;
            btn.textContent = "MENGIRIM...";
            btn.disabled = true;

            await new Promise(resolve => setTimeout(resolve, 1000));

            // FIRE CONFETTI!
            if (typeof confetti !== 'undefined') {
                confetti({
                    particleCount: 100,
                    spread: 70,
                    origin: { y: 0.6 },
                    colors: ['#E07A5F', '#FFD5A5', '#FFF5EA']
                });
            }

            const statusDiv = document.getElementById('rsvp-status');
            if(statusDiv) {
                statusDiv.textContent = "Yeay! Konfirmasi berhasil dikirim.";
                statusDiv.classList.remove('hidden');
                setTimeout(() => statusDiv.classList.add('hidden'), 5000);
            }
            rsvpForm.reset();
            btn.textContent = originalText;
            btn.disabled = false;
        });
    }
});

function appendGuestbookMessage(name, message) {
    const list = document.getElementById('guestbook-list');
    if(!list) return;
    const div = document.createElement('div');
    div.className = 'bg-cream p-4 rounded-xl border border-terracotta/20';
    div.innerHTML = `<h4 class="font-sans font-bold text-sm text-wine">${name}</h4><p class="text-wine/80 text-xs mt-1 font-medium leading-relaxed">${message}</p>`;
    list.prepend(div);
}

window.copyRekening = function() {
    if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText("1234567890").then(showSuccess);
    } else {
        let textArea = document.createElement("textarea");
        textArea.value = "1234567890";
        textArea.style.position = "fixed"; 
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        try { document.execCommand('copy'); showSuccess(); } 
        catch (err) { console.error('Fallback: Oops, unable to copy', err); }
        document.body.removeChild(textArea);
    }

    function showSuccess() {
        const btnText = document.getElementById('copy-text');
        if(!btnText) return;
        const originalText = btnText.innerText;
        btnText.innerText = "TERSALIN!";
        setTimeout(() => btnText.innerText = originalText, 2000);
    }
};

// 3D AI Parallax Effect (Scroll)
document.addEventListener('scroll', () => {
    const avatar = document.getElementById('hero-avatar');
    if (avatar) {
        let scrollPos = window.scrollY;
        // Fade out and move down slightly
        avatar.style.opacity = 1 - (scrollPos / 500);
        avatar.style.transform = `translateY(${scrollPos * 0.3}px)`;
    }
});
