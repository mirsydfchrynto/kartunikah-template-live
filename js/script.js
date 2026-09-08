/**
 * ╔══════════════════════════════════════════════════════════╗
 * ║         KARTUNIKAH — SCRIPT UTAMA                       ║
 * ║   Semua logika animasi, interaksi, dan render UI         ║
 * ╚══════════════════════════════════════════════════════════╝
 */

document.addEventListener('DOMContentLoaded', () => {
  const C = window.CONFIG;
  if (!C) { console.error('CONFIG not found!'); return; }

  // ══════════════════════════════════════════
  // 0. APPLY THEME (CSS Custom Properties)
  // ══════════════════════════════════════════
  (function applyTheme() {
    const t = C.theme || {};
    const root = document.documentElement;
    if (t.primaryBg)   root.style.setProperty('--primary-bg',  t.primaryBg);
    if (t.sectionBg)   root.style.setProperty('--section-bg',  t.sectionBg);
    if (t.accentColor) root.style.setProperty('--accent',       t.accentColor);
    if (t.darkColor)   root.style.setProperty('--dark',         t.darkColor);
    if (t.mutedColor)  root.style.setProperty('--muted',        t.mutedColor);
    if (t.goldColor)   root.style.setProperty('--gold',         t.goldColor);
    if (t.outerBg)     root.style.setProperty('--outer-bg',     t.outerBg);
  })();

  // ══════════════════════════════════════════
  // 1. META TAGS & NAMES
  // ══════════════════════════════════════════
  (function initMeta() {
    const g = C.groom?.firstName || 'Romeo';
    const b = C.bride?.firstName  || 'Juliet';
    const couple = `${g} & ${b}`;
    const titleEl = document.getElementById('meta-title');
    if (titleEl) titleEl.textContent = `Undangan Pernikahan ${couple}`;
    const ogT = document.getElementById('og-title');
    if (ogT) ogT.content = `The Wedding of ${couple} ✨`;

    // Fill couple names across the page
    ['cover-names','hero-names','footer-names'].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.innerHTML = `${C.groom.firstName} &amp; ${C.bride.firstName}`;
    });
    const heroDate = document.getElementById('hero-date');
    if (heroDate) heroDate.textContent = C.weddingDateDisplay || '';

    // Photos
    const coverPhoto = document.getElementById('cover-photo');
    if (coverPhoto && C.coverPhoto) coverPhoto.src = C.coverPhoto;
    const heroPhoto = document.getElementById('hero-photo');
    if (heroPhoto && C.heroPhoto) heroPhoto.src = C.heroPhoto;

    // Year
    const yearEl = document.getElementById('year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();
  })();

  // ══════════════════════════════════════════
  // 2. GUEST NAME FROM URL (?to=NamaTamu)
  // ══════════════════════════════════════════
  const urlParams = new URLSearchParams(window.location.search);
  const rawGuest  = urlParams.get('to');
  const guestName = rawGuest ? decodeURIComponent(rawGuest.replace(/\+/g, ' ')) : 'Tamu Undangan';

  ['guest-name-display','qr-name-label'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.textContent = guestName;
  });

  // ══════════════════════════════════════════
  // 3. QR CODE (VIP PASS)
  // ══════════════════════════════════════════
  (function initQR() {
    const qrEl = document.getElementById('qr-container');
    if (!qrEl || typeof QRCode === 'undefined') return;
    new QRCode(qrEl, {
      text:           window.location.href || guestName,
      width:          140,
      height:         140,
      colorDark:      C.theme?.darkColor || '#3E2A1F',
      colorLight:     C.theme?.primaryBg || '#FDF9F1',
      correctLevel:   QRCode.CorrectLevel.H,
    });
  })();

  // ══════════════════════════════════════════
  // 4. CANVAS FALLING PETALS
  // ══════════════════════════════════════════
  (function initPetals() {
    const canvas = document.getElementById('petal-canvas');
    if (!canvas) return;
    const ctx    = canvas.getContext('2d');
    const colors = C.theme?.petalColors || ['#F2C9A6','#E8B49A','#FDECD8'];
    const COUNT  = 22;
    let petals   = [];

    function resize() {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    for (let i = 0; i < COUNT; i++) {
      petals.push({
        x:       Math.random() * window.innerWidth,
        y:       Math.random() * window.innerHeight - window.innerHeight,
        w:       Math.random() * 10 + 5,
        h:       Math.random() * 5  + 3,
        speed:   Math.random() * 0.8 + 0.4,
        drift:   (Math.random() - 0.5) * 0.6,
        rot:     Math.random() * Math.PI * 2,
        rotSpd:  (Math.random() - 0.5) * 0.04,
        alpha:   Math.random() * 0.45 + 0.2,
        color:   colors[Math.floor(Math.random() * colors.length)],
      });
    }

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      petals.forEach(p => {
        p.y   += p.speed;
        p.x   += p.drift;
        p.rot += p.rotSpd;
        if (p.y > canvas.height + 20) {
          p.y = -20;
          p.x = Math.random() * canvas.width;
        }
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rot);
        ctx.globalAlpha = p.alpha;
        ctx.fillStyle   = p.color;
        ctx.beginPath();
        ctx.ellipse(0, 0, p.w, p.h, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });
      requestAnimationFrame(draw);
    }
    draw();
  })();

  // ══════════════════════════════════════════
  // 5. COVER OPEN BUTTON
  // ══════════════════════════════════════════
  (function initCover() {
    const cover     = document.getElementById('cover');
    const main      = document.getElementById('main');
    const musicBtn  = document.getElementById('music-btn');
    const floatNav  = document.getElementById('floating-nav');
    const waShare   = document.getElementById('wa-share');
    const bgMusic   = document.getElementById('bg-music');
    const btnOpen   = document.getElementById('btn-open');

    if (!btnOpen || !cover) return;

    btnOpen.addEventListener('click', () => {
      // Slide cover up
      cover.classList.add('open');
      document.body.classList.remove('no-scroll');

      // Show main content
      if (main) {
        main.style.opacity = '1';
        main.style.pointerEvents = 'auto';
      }

      // Show UI elements
      setTimeout(() => {
        if (musicBtn)  musicBtn.classList.add('visible');
        if (floatNav)  floatNav.classList.add('visible');
        if (waShare)   waShare.classList.add('visible');
      }, 900);

      // Play music
      if (bgMusic) {
        bgMusic.play().then(() => {
          musicBtn?.classList.add('playing');
        }).catch(() => {});
      }

      // Init Lenis AFTER cover opens so it doesn't conflict
      setTimeout(() => initLenis(), 1100);
    });
  })();

  // ══════════════════════════════════════════
  // 6. MUSIC TOGGLE
  // ══════════════════════════════════════════
  (function initMusic() {
    const btn   = document.getElementById('music-btn');
    const audio = document.getElementById('bg-music');
    if (!btn || !audio) return;
    btn.addEventListener('click', () => {
      if (audio.paused) {
        audio.play(); btn.classList.add('playing');
      } else {
        audio.pause(); btn.classList.remove('playing');
      }
    });
  })();

  // ══════════════════════════════════════════
  // 7. LENIS SMOOTH SCROLL
  // ══════════════════════════════════════════
  let lenisInstance = null;
  function initLenis() {
    if (typeof Lenis === 'undefined') return;
    lenisInstance = new Lenis({
      lerp:           0.08,
      smoothTouch:    false,
      wheelMultiplier: 1.1,
    });
    lenisInstance.on('scroll', () => {
      if (typeof ScrollTrigger !== 'undefined') ScrollTrigger.update();
    });
    function raf(time) {
      lenisInstance.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Sync GSAP ScrollTrigger
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
      gsap.ticker.add((time) => { lenisInstance.raf(time * 1000); });
      gsap.ticker.lagSmoothing(0);
    }
  }

  // ══════════════════════════════════════════
  // 8. RENDER MEMPELAI
  // ══════════════════════════════════════════
  (function renderMempelai() {
    const container = document.getElementById('mempelai-container');
    if (!container) return;

    [C.groom, C.bride].forEach((person, i) => {
      if (!person) return;
      const label = i === 0 ? 'Mempelai Pria' : 'Mempelai Wanita';
      const heart = i === 0 ? '' : '<div style="text-align:center;font-family:\'Cormorant Garamond\',serif;font-size:2rem;color:var(--accent);margin-bottom:1rem;">&amp;</div>';

      if (i === 1) {
        container.insertAdjacentHTML('beforeend', heart);
      }

      container.insertAdjacentHTML('beforeend', `
        <div class="card gsap-fade-up" style="text-align:center;">
          <div style="width:7rem;height:7rem;border-radius:50%;overflow:hidden;border:3px solid var(--section-bg);box-shadow:0 6px 20px rgba(0,0,0,.1);margin:0 auto 1.25rem;background:var(--section-bg);">
            <img src="${person.photo || ''}" alt="${person.fullName}"
              style="width:100%;height:100%;object-fit:cover;object-position:${person.photoCrop || 'center'};transform:scale(${person.photoScale || '1.2'});">
          </div>
          <span class="section-label" style="display:block;text-align:center;">${label}</span>
          <h3 class="font-serif" style="font-size:1.625rem;font-weight:700;color:var(--dark);margin-bottom:.625rem;">${person.fullName}</h3>
          <p style="font-size:11px;color:var(--muted);line-height:1.9;">
            Putra${i === 1 ? 'i' : ''} dari<br>
            <strong style="color:var(--dark);">${person.fatherName}</strong><br>
            &amp; <strong style="color:var(--dark);">${person.motherName}</strong>
          </p>
          ${person.instagram ? `<p style="font-size:9px;font-weight:700;letter-spacing:.1em;color:var(--accent);margin-top:.75rem;">${person.instagram}</p>` : ''}
        </div>
      `);
    });
  })();

  // ══════════════════════════════════════════
  // 9. RENDER LOVE STORY TIMELINE
  // ══════════════════════════════════════════
  (function renderLoveStory() {
    const container = document.getElementById('timeline-container');
    if (!container || !C.loveStory) return;

    const line = document.createElement('div');
    line.className = 'timeline-line';
    container.appendChild(line);

    C.loveStory.forEach((item, i) => {
      const isLeft = i % 2 === 0;
      const wrapper = document.createElement('div');
      wrapper.style.cssText = 'display:flex;align-items:flex-start;gap:1rem;margin-bottom:2rem;' + (isLeft ? '' : 'flex-direction:row-reverse;');
      wrapper.className = isLeft ? 'gsap-fade-left' : 'gsap-fade-right';

      wrapper.innerHTML = `
        <div style="flex:1;${isLeft ? 'text-align:right;' : 'text-align:left;'}">
          <div class="card" style="padding:1rem 1.25rem;">
            <p style="font-size:9px;font-weight:700;letter-spacing:.2em;text-transform:uppercase;color:var(--accent);margin-bottom:.25rem;">${item.year}</p>
            <h4 class="font-serif" style="font-size:1.125rem;font-weight:700;color:var(--dark);margin-bottom:.375rem;">${item.title}</h4>
            <p style="font-size:11px;color:var(--muted);line-height:1.7;">${item.desc}</p>
          </div>
        </div>
        <div class="timeline-dot" style="flex-shrink:0;margin-top:1rem;position:relative;z-index:1;">${item.icon || '♥'}</div>
        <div style="flex:1;"></div>
      `;
      container.appendChild(wrapper);
    });
  })();

  // ══════════════════════════════════════════
  // 10. RENDER EVENTS (ACARA)
  // ══════════════════════════════════════════
  (function renderEvents() {
    const container = document.getElementById('events-container');
    if (!container || !C.events) return;

    C.events.forEach(ev => {
      const isDark = ev.accent === 'dark';
      container.insertAdjacentHTML('beforeend', `
        <div class="${isDark ? 'card-dark' : 'card'} gsap-fade-up" style="text-align:center;">
          <div style="position:absolute;top:0;left:0;right:0;height:3px;background:${isDark ? 'var(--dark)' : 'var(--accent)'};border-radius:1.5rem 1.5rem 0 0;opacity:.8;"></div>
          <span class="section-label" style="display:block;text-align:center;color:${isDark ? 'var(--gold)' : 'var(--accent)'};">${ev.subtitle || ''}</span>
          <h3 class="font-serif" style="font-size:1.625rem;font-weight:700;color:${isDark ? '#FDF9F1' : 'var(--dark)'};margin-bottom:1rem;">${ev.title}</h3>
          <div style="width:2rem;height:1px;background:${isDark ? 'rgba(255,255,255,.2)' : 'rgba(166,90,65,.3)'};margin:0 auto 1rem;"></div>
          <p style="font-weight:700;font-size:.875rem;color:${isDark ? '#FDF9F1' : 'var(--dark)'};">${ev.date}</p>
          <p style="font-size:11px;color:${isDark ? 'rgba(255,255,255,.6)' : 'var(--muted)'};margin-bottom:1.25rem;">${ev.time}</p>
          <div style="width:2rem;height:1px;background:${isDark ? 'rgba(255,255,255,.2)' : 'rgba(166,90,65,.3)'};margin:0 auto 1rem;"></div>
          <p style="font-weight:700;font-size:.875rem;color:${isDark ? '#FDF9F1' : 'var(--dark)'};">${ev.venue}</p>
          <p style="font-size:10px;color:${isDark ? 'rgba(255,255,255,.55)' : 'var(--muted)'};line-height:1.6;margin-bottom:1.5rem;padding:0 .5rem;">${ev.address}</p>
          <a href="${ev.mapsUrl}" target="_blank" rel="noopener"
            style="display:block;width:100%;padding:.75rem 1rem;border-radius:9999px;font-size:9px;font-weight:700;text-transform:uppercase;letter-spacing:.2em;text-align:center;text-decoration:none;
                   background:${isDark ? 'rgba(255,255,255,.1)' : 'var(--section-bg)'};
                   color:${isDark ? '#FDF9F1' : 'var(--dark)'};
                   border:1px solid ${isDark ? 'rgba(255,255,255,.15)' : 'rgba(62,42,31,.12)'};
                   transition:all .3s ease;"
            onmouseover="this.style.background='${isDark ? 'rgba(255,255,255,.2)' : 'var(--dark)'}';this.style.color='${isDark ? '#fff' : '#FDF9F1'}'"
            onmouseout="this.style.background='${isDark ? 'rgba(255,255,255,.1)' : 'var(--section-bg)'}';this.style.color='${isDark ? '#FDF9F1' : 'var(--dark)'}'">
            📍 Buka Google Maps
          </a>
        </div>
      `);
    });
  })();

  // ══════════════════════════════════════════
  // 11. RENDER GALLERY + INIT SWIPER
  // ══════════════════════════════════════════
  (function renderGallery() {
    const wrapper = document.getElementById('gallery-wrapper');
    if (!wrapper || !C.gallery) return;

    C.gallery.forEach(item => {
      const slide = document.createElement('div');
      slide.className = 'swiper-slide';
      slide.innerHTML = `
        <a href="${item.src}" data-fancybox="gallery" data-caption="${item.caption || ''}">
          <img src="${item.thumb || item.src}" alt="${item.caption || 'Gallery'}" loading="lazy">
          <div class="swiper-slide-caption">${item.caption || ''}</div>
        </a>
      `;
      wrapper.appendChild(slide);
    });

    // Init Swiper
    if (typeof Swiper !== 'undefined') {
      new Swiper('.gallery-swiper', {
        effect:           'cards',
        grabCursor:       true,
        loop:             true,
        centeredSlides:   true,
        slidesPerView:    'auto',
        autoplay: {
          delay:                3500,
          disableOnInteraction: false,
        },
        pagination: {
          el:        '.swiper-pagination',
          clickable: true,
        },
        keyboard:   { enabled: true },
      });
    }

    // Init FancyBox
    if (typeof Fancybox !== 'undefined') {
      Fancybox.bind('[data-fancybox="gallery"]', {
        animated: true, showClass: 'f-zoomIn', hideClass: 'f-zoomOut',
      });
    }
  })();

  // ══════════════════════════════════════════
  // 12. RENDER BANK ACCOUNTS (TANDA KASIH)
  // ══════════════════════════════════════════
  (function renderBanks() {
    const container = document.getElementById('bank-container');
    if (!container || !C.bankAccounts) return;

    C.bankAccounts.forEach((acc, i) => {
      container.insertAdjacentHTML('beforeend', `
        <div class="bank-card">
          <div>
            <p style="font-size:9px;font-weight:700;text-transform:uppercase;letter-spacing:.15em;color:var(--accent);margin-bottom:.25rem;">${acc.bank}</p>
            <p style="font-family:'DM Sans',sans-serif;font-weight:700;font-size:1.25rem;color:var(--dark);letter-spacing:.1em;margin-bottom:.25rem;">${acc.accountNumber}</p>
            <p style="font-size:10px;color:var(--muted);">a.n. ${acc.accountName}</p>
          </div>
          <button class="bank-copy-btn" data-number="${acc.accountNumber}" onclick="copyBank(this)">Salin</button>
        </div>
      `);
    });
  })();

  window.copyBank = function(btn) {
    const num = btn.getAttribute('data-number');
    const orig = btn.textContent;
    const copy = () => { btn.textContent = '✅ Tersalin!'; setTimeout(() => btn.textContent = orig, 2000); };
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(num).then(copy);
    } else {
      const ta = Object.assign(document.createElement('textarea'), { value: num });
      document.body.appendChild(ta); ta.select();
      try { document.execCommand('copy'); copy(); } catch(e){}
      document.body.removeChild(ta);
    }
  };

  // ══════════════════════════════════════════
  // 13. COUNTDOWN TIMER
  // ══════════════════════════════════════════
  (function initCountdown() {
    const target  = new Date(C.weddingDate || '2025-12-10T08:00:00').getTime();
    const elD = document.getElementById('days');
    const elH = document.getElementById('hours');
    const elM = document.getElementById('minutes');
    const elS = document.getElementById('seconds');
    if (!elD) return;

    function tick() {
      const diff = target - Date.now();
      if (diff <= 0) return;
      if (elD) elD.textContent = String(Math.floor(diff / 86400000)).padStart(2,'0');
      if (elH) elH.textContent = String(Math.floor((diff % 86400000) / 3600000)).padStart(2,'0');
      if (elM) elM.textContent = String(Math.floor((diff % 3600000) / 60000)).padStart(2,'0');
      if (elS) elS.textContent = String(Math.floor((diff % 60000) / 1000)).padStart(2,'0');
    }
    tick(); setInterval(tick, 1000);
  })();

  // ══════════════════════════════════════════
  // 14. ADD TO CALENDAR
  // ══════════════════════════════════════════
  const calBtn = document.getElementById('btn-calendar');
  if (calBtn) {
    calBtn.addEventListener('click', () => {
      const g  = C.groom?.firstName || 'Romeo';
      const b  = C.bride?.firstName  || 'Juliet';
      const s  = C.calendarStart || '20251210T010000Z';
      const e  = C.calendarEnd   || '20251210T100000Z';
      const url = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=Pernikahan+${encodeURIComponent(g+' & '+b)}&dates=${s}/${e}`;
      window.open(url, '_blank');
    });
  }

  // ══════════════════════════════════════════
  // 15. RSVP FORM
  // ══════════════════════════════════════════
  (function initRSVP() {
    const form     = document.getElementById('rsvp-form');
    const statusEl = document.getElementById('rsvp-status');
    const btnWA    = document.getElementById('btn-wa-rsvp');

    if (form) {
      form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const btn   = document.getElementById('btn-rsvp-form');
        const name  = document.getElementById('rsvp-name').value.trim();
        const count = document.getElementById('rsvp-count').value || '1';
        const att   = document.getElementById('rsvp-attend').value;

        btn.textContent = 'Mengirim...'; btn.disabled = true;
        await new Promise(r => setTimeout(r, 700));

        if (att === 'hadir' && window.confetti) {
          confetti({ particleCount: 200, spread: 100, origin: { y: 0.6 }, colors: ['#A65A41','#F2C9A6','#FDF9F1','#C9A96E'] });
        }

        if (statusEl) {
          statusEl.style.display = 'block';
          statusEl.textContent   = att === 'hadir'
            ? `🎉 Terima kasih ${name}! Kami menunggu kehadiranmu.`
            : `😊 Terima kasih ${name}! Kami menghargai balasanmu.`;
          setTimeout(() => { statusEl.style.display = 'none'; }, 6000);
        }
        form.reset();
        btn.textContent = 'Kirim Konfirmasi'; btn.disabled = false;
      });
    }

    // WA RSVP
    if (btnWA) {
      btnWA.addEventListener('click', () => {
        const name  = document.getElementById('rsvp-name')?.value.trim()  || guestName;
        const att   = document.getElementById('rsvp-attend')?.value;
        const g     = C.groom?.firstName || 'Romeo';
        const b     = C.bride?.firstName  || 'Juliet';
        const status = att === 'hadir' ? 'hadir' : att === 'tidak' ? 'tidak dapat hadir' : 'hadir';
        const msg   = `Assalamu'alaikum,\n\nSaya *${name}*, ingin konfirmasi bahwa saya *${status}* di pernikahan *${g} & ${b}*.\n\nTerima kasih 🙏`;
        const num   = C.whatsapp?.rsvpNumber || '';
        window.open(`https://wa.me/${num}?text=${encodeURIComponent(msg)}`, '_blank');
      });
    }
  })();

  // ══════════════════════════════════════════
  // 16. GUESTBOOK
  // ══════════════════════════════════════════
  (function initGuestbook() {
    const list = document.getElementById('gb-list');

    function addMessage(name, message) {
      if (!list) return;
      const div = document.createElement('div');
      div.className = 'gb-bubble';
      div.innerHTML = `<p class="gb-name">${name}</p><p class="gb-msg">${message}</p>`;
      list.prepend(div);
    }

    // Load mock messages
    if (C.mockMessages) C.mockMessages.forEach(m => addMessage(m.name, m.message));

    // Form submit
    const form = document.getElementById('gb-form');
    if (form) {
      form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const btn  = document.getElementById('btn-gb');
        const name = document.getElementById('gb-name').value.trim();
        const msg  = document.getElementById('gb-msg').value.trim();
        btn.textContent = 'Mengirim...'; btn.disabled = true;
        await new Promise(r => setTimeout(r, 600));
        addMessage(name, msg);
        form.reset();
        btn.textContent = 'Kirim Pesan'; btn.disabled = false;
      });
    }
  })();

  // ══════════════════════════════════════════
  // 17. WA SHARE BUTTON
  // ══════════════════════════════════════════
  const waShareBtn = document.getElementById('wa-share');
  if (waShareBtn) {
    waShareBtn.addEventListener('click', () => {
      const text = `${C.whatsapp?.shareText || 'Yuk buka undangan kami!'}\n${window.location.href}`;
      window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
    });
  }

  // ══════════════════════════════════════════
  // 18. SMOOTH SCROLL FOR NAV LINKS
  // ══════════════════════════════════════════
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (!href.startsWith('#')) return;
      e.preventDefault();
      const target = document.querySelector(href);
      if (!target) return;
      if (lenisInstance) {
        lenisInstance.scrollTo(target, { duration: 1.4, easing: t => 1 - Math.pow(1-t, 4) });
      } else {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // ══════════════════════════════════════════
  // 19. GSAP SCROLL ANIMATIONS
  // ══════════════════════════════════════════
  (function initGSAP() {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;
    gsap.registerPlugin(ScrollTrigger);

    // Fade-up elements
    gsap.utils.toArray('.gsap-fade-up').forEach(el => {
      gsap.to(el, {
        y: 0, opacity: 1, duration: 1.1, ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none none' },
      });
    });

    // Fade from left
    gsap.utils.toArray('.gsap-fade-left').forEach(el => {
      gsap.to(el, {
        x: 0, opacity: 1, duration: 1.1, ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 88%' },
      });
    });

    // Fade from right
    gsap.utils.toArray('.gsap-fade-right').forEach(el => {
      gsap.to(el, {
        x: 0, opacity: 1, duration: 1.1, ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 88%' },
      });
    });

    // Scale in (polaroid, hero photo)
    gsap.utils.toArray('.gsap-scale-in').forEach(el => {
      gsap.to(el, {
        scale: 1, opacity: 1, duration: 1.3, ease: 'back.out(1.4)',
        scrollTrigger: { trigger: el, start: 'top 90%' },
      });
    });
  })();

});
