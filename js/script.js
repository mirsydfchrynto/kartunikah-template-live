document.addEventListener('DOMContentLoaded', () => {

    // 1. Dynamic Guest Name from URL param
    const urlParams = new URLSearchParams(window.location.search);
    const guestNameParam = urlParams.get('to');
    const guestName = guestNameParam ? guestNameParam.replace(/\+/g, ' ') : (CONFIG?.guestName || 'Tamu Undangan');
    document.querySelectorAll('#guest-name, #qr-guest-name-display').forEach(el => el.textContent = guestName);

    // 2. QR Code
    if (typeof QRCode !== 'undefined') {
        const qrContainer = document.getElementById('dynamic-qr-container');
        if (qrContainer) {
            new QRCode(qrContainer, {
                text: window.location.href || guestName,
                width: 130, height: 130,
                colorDark: '#3E2A1F', colorLight: '#FDF9F1',
                correctLevel: QRCode.CorrectLevel.H
            });
        }
    }

    // 3. FancyBox
    if (typeof Fancybox !== 'undefined') {
        Fancybox.bind('[data-fancybox="gallery"]', { compact: false, idle: false });
    }

    // 4. Cover open button
    const btnOpen       = document.getElementById('btn-open-invitation');
    const coverScreen   = document.getElementById('cover-screen');
    const mainContent   = document.getElementById('main-content');
    const musicControl  = document.getElementById('music-control');
    const musicIcon     = document.getElementById('music-icon');
    const mobileNav     = document.getElementById('mobile-nav');
    const bgMusic       = document.getElementById('bg-music');
    let isPlaying = false;

    if (btnOpen && coverScreen) {
        btnOpen.addEventListener('click', () => {
            // Slide cover up
            coverScreen.style.transform = 'translateY(-100%)';
            document.body.classList.remove('no-scroll');

            // Show main content
            if (mainContent) {
                mainContent.classList.remove('opacity-0', 'pointer-events-none');
                mainContent.classList.add('opacity-100');
            }

            // Show music button & nav after animation
            setTimeout(() => {
                if (musicControl) {
                    musicControl.classList.remove('hidden', 'scale-50', 'opacity-0', 'pointer-events-none');
                    musicControl.classList.add('opacity-100', 'scale-100', 'pointer-events-auto');
                }
                if (mobileNav) {
                    mobileNav.classList.remove('translate-y-24', 'opacity-0');
                }
            }, 900);

            // Play music
            if (bgMusic) {
                bgMusic.play().then(() => {
                    isPlaying = true;
                    if (musicIcon) musicIcon.classList.add('music-spin');
                }).catch(() => {});
            }
        });
    }

    // 5. Music toggle
    if (musicControl && bgMusic) {
        musicControl.addEventListener('click', () => {
            if (isPlaying) {
                bgMusic.pause();
                if (musicIcon) musicIcon.classList.remove('music-spin');
            } else {
                bgMusic.play();
                if (musicIcon) musicIcon.classList.add('music-spin');
            }
            isPlaying = !isPlaying;
        });
    }

    // 6. Smooth scroll for nav links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href.startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // 7. GSAP Animations
    gsap.registerPlugin(ScrollTrigger);
    gsap.utils.toArray('.gsap-fade-up').forEach(el => {
        gsap.from(el, {
            y: 40, opacity: 0, duration: 1.1, ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 88%' }
        });
    });

    // 8. Countdown Timer
    const targetDate = new Date(CONFIG?.weddingDate || '2025-12-10T08:00:00').getTime();
    const countdownEl = document.getElementById('countdown');
    if (countdownEl && !isNaN(targetDate)) {
        const tick = setInterval(() => {
            const dist = targetDate - Date.now();
            if (dist <= 0) { clearInterval(tick); return; }
            const d = document.getElementById('days');
            const h = document.getElementById('hours');
            const m = document.getElementById('minutes');
            const s = document.getElementById('seconds');
            if (d) d.textContent = String(Math.floor(dist / 86400000)).padStart(2,'0');
            if (h) h.textContent = String(Math.floor((dist % 86400000) / 3600000)).padStart(2,'0');
            if (m) m.textContent = String(Math.floor((dist % 3600000) / 60000)).padStart(2,'0');
            if (s) s.textContent = String(Math.floor((dist % 60000) / 1000)).padStart(2,'0');
        }, 1000);
    }

    // 9. Add to Calendar
    const calBtn = document.getElementById('add-to-calendar');
    if (calBtn) {
        calBtn.addEventListener('click', () => {
            window.open('https://calendar.google.com/calendar/render?action=TEMPLATE&text=Pernikahan+Romeo+%26+Juliet&dates=20251210T010000Z/20251210T090000Z&details=Akad+Nikah+%26+Resepsi&location=Verona', '_blank');
        });
    }

    // 10. Load mock guestbook messages
    const guestbookList = document.getElementById('guestbook-list');
    if (guestbookList && window.CONFIG?.guestbook?.mockMessages) {
        CONFIG.guestbook.mockMessages.forEach(msg => appendMsg(msg.name, msg.message));
    }

    // 11. Guestbook form submit
    const guestbookForm = document.getElementById('guestbook-form');
    if (guestbookForm) {
        guestbookForm.addEventListener('submit', async e => {
            e.preventDefault();
            const btn = document.getElementById('btn-submit-guestbook');
            const orig = btn.textContent;
            btn.textContent = 'Mengirim...'; btn.disabled = true;
            await new Promise(r => setTimeout(r, 700));
            appendMsg(
                document.getElementById('guest-name-input').value,
                document.getElementById('guest-message').value
            );
            guestbookForm.reset();
            btn.textContent = orig; btn.disabled = false;
        });
    }

    // 12. RSVP form submit + confetti
    const rsvpForm = document.getElementById('rsvp-form');
    if (rsvpForm) {
        rsvpForm.addEventListener('submit', async e => {
            e.preventDefault();
            const btn = document.getElementById('btn-submit-rsvp');
            const orig = btn.textContent;
            btn.textContent = 'Mengirim...'; btn.disabled = true;
            await new Promise(r => setTimeout(r, 800));
            if (window.confetti) {
                confetti({ particleCount: 180, spread: 90, origin: { y: 0.6 }, colors: ['#A65A41','#F2C9A6','#FDF9F1','#C9A96E'] });
            }
            const statusDiv = document.getElementById('rsvp-status');
            if (statusDiv) {
                statusDiv.textContent = '🎉 Terkirim! Terima kasih atas konfirmasinya.';
                statusDiv.classList.remove('hidden');
                setTimeout(() => statusDiv.classList.add('hidden'), 5000);
            }
            rsvpForm.reset();
            btn.textContent = orig; btn.disabled = false;
        });
    }

    // 13. Year
    const yearEl = document.getElementById('year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();
});

// Helper: append guestbook message
function appendMsg(name, message) {
    const list = document.getElementById('guestbook-list');
    if (!list) return;
    const div = document.createElement('div');
    div.style.cssText = 'background:#fff;border-radius:1rem;padding:0.875rem 1rem;border:1px solid rgba(166,90,65,0.12);';
    div.innerHTML = `<p style="font-size:9px;font-weight:700;letter-spacing:0.15em;text-transform:uppercase;color:#A65A41;margin-bottom:4px;">${name}</p><p style="font-size:11px;color:#3E2A1F;line-height:1.6;">${message}</p>`;
    list.prepend(div);
}

// Copy rekening
window.copyRekening = function() {
    const num = '1234567890';
    const copyFn = () => {
        const btn = document.getElementById('copy-text');
        if (!btn) return;
        const orig = btn.textContent;
        btn.textContent = '✅ Tersalin!';
        setTimeout(() => btn.textContent = orig, 2000);
    };
    if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(num).then(copyFn);
    } else {
        const ta = document.createElement('textarea');
        ta.value = num; ta.style.position = 'fixed'; document.body.appendChild(ta);
        ta.focus(); ta.select();
        try { document.execCommand('copy'); copyFn(); } catch(e) {}
        document.body.removeChild(ta);
    }
};
