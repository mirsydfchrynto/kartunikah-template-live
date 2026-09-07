document.addEventListener('DOMContentLoaded', () => {
    // 1. Dynamic Guest Name & QR
    const urlParams = new URLSearchParams(window.location.search);
    const guestNameParam = urlParams.get('to');
    const guestName = guestNameParam ? guestNameParam.replace(/\+/g, ' ') : (CONFIG?.guestName || "Tamu Undangan");
    
    document.querySelectorAll('#guest-name, #qr-guest-name-display').forEach(el => el.textContent = guestName);
    
    if (typeof QRCode !== 'undefined') {
        const qrContainer = document.getElementById('dynamic-qr-container');
        if (qrContainer) {
            new QRCode(qrContainer, {
                text: guestName,
                width: 130,
                height: 130,
                colorDark: "#4A2E2B",
                colorLight: "#ffffff",
                correctLevel: QRCode.CorrectLevel.H
            });
        }
    }

    // 2. Init Fancybox
    if(typeof Fancybox !== 'undefined') {
        Fancybox.bind('[data-fancybox="gallery"]', {
            compact: false,
            idle: false,
            animated: false,
            showClass: false,
            hideClass: false,
            dragToClose: false,
            images: { zoom: false },
        });
    }

    // 3. Audio & Opening Cover
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
                if(mobileNav) mobileNav.classList.remove('translate-y-32', 'opacity-0');
            }, 800);

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

    // 4. Smooth Scrolling for internal links
    document.querySelectorAll('#mobile-nav a, a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            if(this.getAttribute('href').startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if(target) target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // 5. GSAP Animations (The Art)
    gsap.registerPlugin(ScrollTrigger);

    // MASTER BACKGROUND PARALLAX
    // This makes the background photos scroll slowly downwards as the user scrolls the page
    const masterBg = document.getElementById('bg-scroll-layer');
    if (masterBg) {
        gsap.to(masterBg, {
            yPercent: -30, // Move the background up by 30% of its height over the full scroll distance
            ease: "none",
            scrollTrigger: {
                trigger: document.body,
                start: "top top",
                end: "bottom bottom",
                scrub: true
            }
        });
    }

    // Hero Avatar Parallax Depth
    gsap.to('#avatar-layer', {
        yPercent: 30,
        ease: "none",
        scrollTrigger: {
            trigger: "#hero",
            start: "top top",
            end: "bottom top",
            scrub: true
        }
    });

    // Hero Text Parallax (moves up faster than avatar to create 3D depth)
    gsap.to('#text-layer', {
        yPercent: -40,
        opacity: 0,
        ease: "none",
        scrollTrigger: {
            trigger: "#hero",
            start: "top top",
            end: "bottom top",
            scrub: true
        }
    });

    // Fade Up Elements (Titles, buttons)
    gsap.utils.toArray('.gsap-fade-up').forEach(element => {
        gsap.from(element, {
            y: 30,
            opacity: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
                trigger: element,
                start: "top 90%",
            }
        });
    });

    // Bento Grid Staggered Reveal
    gsap.utils.toArray('.bento-grid').forEach(grid => {
        const items = grid.querySelectorAll('.bento-item');
        gsap.from(items, {
            y: 50,
            opacity: 0,
            duration: 1,
            stagger: 0.1,
            ease: "power2.out",
            scrollTrigger: {
                trigger: grid,
                start: "top 85%",
            }
        });
    });

    // Gallery Staggered Reveal
    gsap.from('.bento-gallery .bento-item', {
        scale: 0.95,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: {
            trigger: '.bento-gallery',
            start: "top 85%"
        }
    });

    // 6. Countdown Timer
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

    // 7. Add to Calendar
    const calBtn = document.getElementById('add-to-calendar');
    if (calBtn) {
        calBtn.addEventListener('click', () => {
            const url = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=Pernikahan+Romeo+%26+Juliet&dates=20251210T010000Z/20251210T080000Z`;
            window.open(url, '_blank');
        });
    }

    // 8. API-Ready Forms (RSVP & Guestbook) with Confetti!
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

            await new Promise(resolve => setTimeout(resolve, 800));

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

            await new Promise(resolve => setTimeout(resolve, 800));

            // FIRE CONFETTI! Use canvas-confetti directly if included or from CDN
            if (window.confetti) {
                confetti({
                    particleCount: 150,
                    spread: 80,
                    origin: { y: 0.6 },
                    colors: ['#E07A5F', '#FFD5A5', '#FFF5EA']
                });
            }

            const statusDiv = document.getElementById('rsvp-status');
            if(statusDiv) {
                statusDiv.textContent = "Terkirim dengan cinta!";
                statusDiv.classList.remove('hidden');
                setTimeout(() => statusDiv.classList.add('hidden'), 5000);
            }
            rsvpForm.reset();
            btn.textContent = originalText;
            btn.disabled = false;
        });
    }

    document.getElementById('year').textContent = new Date().getFullYear();
});

function appendGuestbookMessage(name, message) {
    const list = document.getElementById('guestbook-list');
    if(!list) return;
    const div = document.createElement('div');
    // Aesthetic chat bubble for guestbook
    div.className = 'bg-white p-4 md:p-5 rounded-[1.5rem] border border-peach/50 shadow-sm transition-transform hover:-translate-y-1';
    div.innerHTML = `<h4 class="font-sans font-bold text-[10px] md:text-[11px] uppercase tracking-widest text-terracotta mb-1 md:mb-2">${name}</h4><p class="text-wine/80 text-xs font-medium leading-relaxed">${message}</p>`;
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
        catch (err) { }
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
