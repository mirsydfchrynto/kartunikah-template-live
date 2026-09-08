/**
 * KARTUNIKAH — SCRIPT UTAMA
 * Semua logika diambil dari CONFIG (js/config.js)
 */
'use strict';

document.addEventListener('DOMContentLoaded', () => {
  const C = window.CONFIG;
  if (!C) { console.error('CONFIG not found!'); return; }

  /* ─────────────────────────────────────
     0. APPLY THEME → CSS Custom Properties
  ───────────────────────────────────── */
  (function() {
    const t = C.theme || {}, r = document.documentElement.style;
    const map = { '--bg': t.primaryBg, '--bg2': t.sectionBg, '--accent': t.accentColor,
                  '--dark': t.darkColor, '--muted': t.mutedColor, '--gold': t.goldColor,
                  '--outer': t.outerBg };
    Object.entries(map).forEach(([k,v]) => { if(v) r.setProperty(k, v); });
    document.body.style.background = t.outerBg || '#261510';
  })();

  /* ─────────────────────────────────────
     1. GUEST NAME from ?to=NamaTamu
  ───────────────────────────────────── */
  const rawGuest  = new URLSearchParams(location.search).get('to');
  const guestName = rawGuest ? decodeURIComponent(rawGuest.replace(/\+/g,' ')) : 'Tamu Undangan';
  ['guest-name','qr-label'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.textContent = guestName;
  });

  /* ─────────────────────────────────────
     2. META / NAMES / DATES
  ───────────────────────────────────── */
  (function() {
    const g = C.groom?.shortName || 'Rizky';
    const b = C.bride?.shortName  || 'Sinta';
    const couple = `${g} & ${b}`;

    // Page title & OG
    document.title = `Undangan Pernikahan ${couple}`;
    const ogT = document.querySelector('meta[property="og:title"]');
    if (ogT) ogT.content = `The Wedding of ${couple} ✨`;

    // Fill couple names in HTML
    ['cover-names','hero-names','footer-names'].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.innerHTML = `${g} &amp; ${b}`;
    });
    // Date displays
    const d = C.weddingDateDisplay || '';
    ['cover-date','hero-date','footer-date'].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.textContent = d;
    });
    // Polaroid caption
    const cap = document.getElementById('hero-caption');
    if (cap) cap.textContent = `Bersatu Dalam Cinta`;

    // Photos
    const cp = document.getElementById('cover-photo');
    if (cp && C.coverPhoto) cp.src = C.coverPhoto;
    const hp = document.getElementById('hero-photo');
    if (hp && C.heroPhoto) hp.src = C.heroPhoto;

    // Year
    const yr = document.getElementById('year');
    if (yr) yr.textContent = new Date().getFullYear();
  })();

  /* ─────────────────────────────────────
     3. CANVAS PETALS
  ───────────────────────────────────── */
  (function() {
    const canvas = document.getElementById('petal-canvas');
    if (!canvas) return;
    const ctx    = canvas.getContext('2d');
    const colors = C.theme?.petalColors || ['#F0C4A0','#E8AE8A','#FAE0C8'];
    const N      = 20;
    let W, H, petals = [];

    function resize() {
      W = canvas.width  = window.innerWidth;
      H = canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize, { passive: true });

    for (let i = 0; i < N; i++) {
      petals.push({
        x:    Math.random() * window.innerWidth,
        y:    Math.random() * window.innerHeight - window.innerHeight,
        w:    Math.random() * 9 + 4,
        h:    Math.random() * 4 + 2,
        spd:  Math.random() * 0.7 + 0.3,
        dft:  (Math.random() - 0.5) * 0.5,
        rot:  Math.random() * Math.PI * 2,
        rSpd: (Math.random() - 0.5) * 0.035,
        alp:  Math.random() * 0.4 + 0.15,
        col:  colors[Math.floor(Math.random() * colors.length)],
      });
    }

    (function draw() {
      ctx.clearRect(0, 0, W, H);
      petals.forEach(p => {
        p.y   += p.spd;  p.x += p.dft;  p.rot += p.rSpd;
        if (p.y > H + 20) { p.y = -20; p.x = Math.random() * W; }
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rot);
        ctx.globalAlpha = p.alp;
        ctx.fillStyle   = p.col;
        ctx.beginPath();
        ctx.ellipse(0, 0, p.w, p.h, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });
      requestAnimationFrame(draw);
    })();
  })();

  /* ─────────────────────────────────────
     4. COVER OPEN
  ───────────────────────────────────── */
  let lenisReady = false;
  (function() {
    const cover    = document.getElementById('cover');
    const main     = document.getElementById('main');
    const musicBtn = document.getElementById('music-btn');
    const floatNav = document.getElementById('float-nav');
    const waShare  = document.getElementById('wa-share');
    const audio    = document.getElementById('bg-music');
    const btnOpen  = document.getElementById('btn-open');
    if (!btnOpen || !cover) return;

    btnOpen.addEventListener('click', () => {
      // Slide cover away
      cover.classList.add('slide-away');
      document.body.classList.remove('locked');

      // Show main content
      if (main) { main.classList.add('show'); }

      // Show floating UI after animation
      setTimeout(() => {
        if (musicBtn) musicBtn.classList.add('show');
        if (floatNav) floatNav.classList.add('show');
        if (waShare)  waShare.classList.add('show');
      }, 900);

      // Start music
      if (audio) {
        audio.play().then(() => {
          if (musicBtn) musicBtn.classList.add('playing');
        }).catch(() => {});
      }

      // Init Lenis after cover gone
      setTimeout(() => { initLenis(); lenisReady = true; }, 1100);
    });
  })();

  /* ─────────────────────────────────────
     5. MUSIC TOGGLE
  ───────────────────────────────────── */
  (function() {
    const btn   = document.getElementById('music-btn');
    const audio = document.getElementById('bg-music');
    if (!btn || !audio) return;
    btn.addEventListener('click', () => {
      if (audio.paused) { audio.play(); btn.classList.add('playing'); }
      else              { audio.pause(); btn.classList.remove('playing'); }
    });
  })();

  /* ─────────────────────────────────────
     6. LENIS SMOOTH SCROLL
  ───────────────────────────────────── */
  let lenis = null;
  function initLenis() {
    if (typeof Lenis === 'undefined') return;
    lenis = new Lenis({ lerp: 0.09, smoothTouch: false, wheelMultiplier: 1.1 });
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
      gsap.ticker.add(t => lenis.raf(t * 1000));
      gsap.ticker.lagSmoothing(0);
      lenis.on('scroll', ScrollTrigger.update);
    } else {
      (function raf(t) { lenis.raf(t); requestAnimationFrame(raf); })(0);
    }
  }

  /* ─────────────────────────────────────
     7. SMOOTH SCROLL LINKS
  ───────────────────────────────────── */
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', function(e) {
      const sel = this.getAttribute('href');
      if (!sel.startsWith('#')) return;
      e.preventDefault();
      const target = document.querySelector(sel);
      if (!target) return;
      if (lenis) lenis.scrollTo(target, { duration: 1.3, easing: t => 1 - Math.pow(1-t,4) });
      else target.scrollIntoView({ behavior: 'smooth' });
    });
  });

  /* ─────────────────────────────────────
     8. RENDER MEMPELAI
  ───────────────────────────────────── */
  (function() {
    const container = document.getElementById('mempelai-container');
    if (!container) return;
    const people = [
      { ...C.groom, label: 'Mempelai Pria',    role: 'Putra' },
      { ...C.bride,  label: 'Mempelai Wanita', role: 'Putri' },
    ];
    people.forEach((p, i) => {
      if (i === 1) {
        container.insertAdjacentHTML('beforeend', `
          <div style="text-align:center;font-family:'Cormorant Garamond',serif;
                font-size:2rem;color:var(--accent);padding:.25rem 0;">&amp;</div>`);
      }
      container.insertAdjacentHTML('beforeend', `
        <div class="card r-up" style="text-align:center;">
          <div style="width:6.5rem;height:6.5rem;border-radius:50%;overflow:hidden;
                border:3px solid var(--bg2);box-shadow:0 6px 22px rgba(0,0,0,.1);
                margin:0 auto 1.125rem;background:var(--bg2);">
            <img src="${p.photo || ''}" alt="${p.label}"
              style="width:100%;height:100%;object-fit:cover;
                     object-position:${p.photoCrop||'center'};
                     transform:scale(${p.photoScale||'1.2'});">
          </div>
          <span class="lbl" style="text-align:center;display:block;">${p.label}</span>
          <h3 class="font-serif" style="font-size:1.5rem;font-weight:700;color:var(--dark);margin-bottom:.5rem;">
            ${p.fullName}
          </h3>
          <p style="font-size:11px;color:var(--muted);line-height:2;">
            ${p.role} dari<br>
            <strong style="color:var(--dark);">${p.fatherName}</strong><br>
            &amp; <strong style="color:var(--dark);">${p.motherName}</strong>
          </p>
          ${p.instagram ? `<p style="font-size:9px;font-weight:700;letter-spacing:.1em;color:var(--accent);margin-top:.75rem;">${p.instagram}</p>` : ''}
        </div>`);
    });
  })();

  /* ─────────────────────────────────────
     9. RENDER LOVE STORY TIMELINE
  ───────────────────────────────────── */
  (function() {
    const tl = document.getElementById('timeline');
    if (!tl || !C.loveStory) return;
    C.loveStory.forEach((item, i) => {
      const isLeft = i % 2 === 0;
      const row = document.createElement('div');
      row.className = 'timeline-row ' + (isLeft ? 'r-left' : 'r-right');

      const cardHTML = `
        <div class="card" style="padding:1rem 1.125rem;">
          <p class="lbl" style="margin-bottom:.2rem;">${item.year}</p>
          <h4 class="font-serif" style="font-size:1.1rem;font-weight:700;color:var(--dark);margin-bottom:.375rem;line-height:1.2;">
            ${item.title}
          </h4>
          <p style="font-size:11px;color:var(--muted);line-height:1.7;">${item.desc}</p>
        </div>`;

      const dotHTML = `<div class="timeline-dot">${item.icon || '♥'}</div>`;
      const emptyHTML = `<div></div>`;

      if (isLeft) {
        row.innerHTML = `<div class="timeline-card left">${cardHTML}</div>${dotHTML}${emptyHTML}`;
      } else {
        row.innerHTML = `${emptyHTML}${dotHTML}<div class="timeline-card right">${cardHTML}</div>`;
      }
      tl.appendChild(row);
    });
  })();

  /* ─────────────────────────────────────
     10. RENDER EVENTS
  ───────────────────────────────────── */
  (function() {
    const container = document.getElementById('events-container');
    if (!container || !C.events) return;
    C.events.forEach(ev => {
      const dark = ev.cardStyle === 'dark';
      const wrap = dark ? 'card-dark' : 'card';
      const tc   = dark ? '#FDF9F3' : 'var(--dark)';
      const sc   = dark ? 'rgba(255,255,255,.55)' : 'var(--muted)';
      const bc   = dark ? 'rgba(255,255,255,.15)' : 'rgba(160,82,45,.18)';
      const ac   = dark ? 'var(--gold)' : 'var(--accent)';
      const btnBg  = dark ? 'rgba(255,255,255,.12)' : 'var(--bg2)';
      const btnCol = dark ? '#FDF9F3' : 'var(--dark)';
      container.insertAdjacentHTML('beforeend', `
        <div class="${wrap} r-up" style="text-align:center;">
          <div style="position:absolute;top:0;left:0;right:0;height:3px;
            background:${dark ? 'rgba(200,169,95,.6)' : 'rgba(160,82,45,.65)'};
            border-radius:var(--radius) var(--radius) 0 0;"></div>
          <span class="lbl" style="text-align:center;display:block;color:${ac};padding-top:.25rem;">${ev.subtitle}</span>
          <h3 class="font-serif" style="font-size:1.625rem;font-weight:700;color:${tc};margin-bottom:1rem;">${ev.title}</h3>
          <div style="width:2rem;height:1px;background:${bc};margin:0 auto 1rem;"></div>
          <p style="font-weight:700;font-size:.875rem;color:${tc};">${ev.date}</p>
          <p style="font-size:11px;color:${sc};margin-bottom:1.125rem;">${ev.time}</p>
          <div style="width:2rem;height:1px;background:${bc};margin:0 auto 1rem;"></div>
          <p style="font-weight:700;font-size:.875rem;color:${tc};">${ev.venue}</p>
          <p style="font-size:10px;color:${sc};line-height:1.65;margin-bottom:1.5rem;padding:0 .25rem;">${ev.address}</p>
          <a href="${ev.mapsUrl}" target="_blank" rel="noopener"
            class="btn" style="min-height:48px;background:${btnBg};color:${btnCol};
              border:1px solid ${bc};text-decoration:none;">
            📍 Buka Google Maps
          </a>
        </div>`);
    });
  })();

  /* ─────────────────────────────────────
     11. RENDER GALLERY + SWIPER
  ───────────────────────────────────── */
  (function() {
    const wrapper = document.getElementById('gallery-wrapper');
    if (!wrapper || !C.gallery) return;
    C.gallery.forEach(item => {
      const slide = document.createElement('div');
      slide.className = 'swiper-slide';
      slide.innerHTML = `
        <a href="${item.src}" data-fancybox="gallery" data-caption="${item.caption||''}">
          <img src="${item.thumb||item.src}" alt="${item.caption||'Gallery'}" loading="lazy">
        </a>
        <div class="gallery-caption">${item.caption||''}</div>`;
      wrapper.appendChild(slide);
    });
    if (typeof Swiper !== 'undefined') {
      new Swiper('.gallery-swiper', {
        effect:        'cards',
        grabCursor:    true,
        loop:          C.gallery.length > 2,
        autoplay:      { delay: 3500, disableOnInteraction: false },
        pagination:    { el: '.swiper-pagination', clickable: true },
        keyboard:      { enabled: true },
      });
    }
    if (typeof Fancybox !== 'undefined') {
      Fancybox.bind('[data-fancybox="gallery"]', { animated: true });
    }
  })();

  /* ─────────────────────────────────────
     12. RENDER BANK ACCOUNTS
  ───────────────────────────────────── */
  (function() {
    const container = document.getElementById('bank-container');
    if (!container || !C.bankAccounts) return;
    C.bankAccounts.forEach((acc, i) => {
      container.insertAdjacentHTML('beforeend', `
        <div class="bank-row">
          <div style="flex:1;min-width:0;">
            <p style="font-size:9px;font-weight:700;text-transform:uppercase;letter-spacing:.15em;color:var(--accent);margin-bottom:.2rem;">${acc.bank}</p>
            <p style="font-family:'Plus Jakarta Sans',sans-serif;font-weight:700;font-size:1.1rem;color:var(--dark);letter-spacing:.08em;margin-bottom:.2rem;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${acc.accountNumber}</p>
            <p style="font-size:10px;color:var(--muted);">a.n. ${acc.accountName}</p>
          </div>
          <button class="bank-copy" data-num="${acc.accountNumber.replace(/\s/g,'')}" onclick="copyBank(this)">Salin</button>
        </div>`);
    });
  })();

  window.copyBank = function(btn) {
    const num = btn.dataset.num;
    const orig = btn.textContent;
    const done = () => { btn.textContent = '✅ OK'; setTimeout(() => btn.textContent = orig, 2000); };
    if (navigator.clipboard && window.isSecureContext) { navigator.clipboard.writeText(num).then(done); }
    else {
      const ta = Object.assign(document.createElement('textarea'), { value: num });
      document.body.appendChild(ta); ta.select();
      try { document.execCommand('copy'); done(); } catch(e){}
      document.body.removeChild(ta);
    }
  };

  /* ─────────────────────────────────────
     13. QR CODE
  ───────────────────────────────────── */
  (function() {
    const el = document.getElementById('qr-container');
    if (!el || typeof QRCode === 'undefined') return;
    new QRCode(el, {
      text:         location.href,
      width:        140, height: 140,
      colorDark:    C.theme?.darkColor  || '#3D2314',
      colorLight:   C.theme?.primaryBg  || '#FDF9F3',
      correctLevel: QRCode.CorrectLevel.H,
    });
  })();

  /* ─────────────────────────────────────
     14. COUNTDOWN TIMER
  ───────────────────────────────────── */
  (function() {
    const target = new Date(C.weddingDate || '2025-10-18T08:30:00').getTime();
    const ids    = ['cd-days','cd-hours','cd-mins','cd-secs'];
    const divs   = [86400000, 3600000, 60000, 1000];
    const mods   = [0, 86400000, 3600000, 60000];
    function tick() {
      let diff = target - Date.now();
      if (diff < 0) diff = 0;
      ids.forEach((id, i) => {
        const el = document.getElementById(id);
        if (!el) return;
        const val = mods[i] ? Math.floor((diff % mods[i]) / divs[i]) : Math.floor(diff / divs[i]);
        el.textContent = String(val).padStart(2,'0');
      });
    }
    tick(); setInterval(tick, 1000);
  })();

  /* ─────────────────────────────────────
     15. SAVE TO CALENDAR
  ───────────────────────────────────── */
  document.getElementById('btn-calendar')?.addEventListener('click', () => {
    const g = C.groom?.shortName || 'Rizky';
    const b = C.bride?.shortName  || 'Sinta';
    const s = C.calendarStart || '20251018T013000Z';
    const e = C.calendarEnd   || '20251018T100000Z';
    window.open(`https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent('Pernikahan '+g+' & '+b)}&dates=${s}/${e}`, '_blank');
  });

  /* ─────────────────────────────────────
     16. RSVP FORM
  ───────────────────────────────────── */
  (function() {
    const form   = document.getElementById('rsvp-form');
    const status = document.getElementById('rsvp-status');
    if (!form) return;
    form.addEventListener('submit', async e => {
      e.preventDefault();
      const btn    = form.querySelector('button[type="submit"]');
      const name   = document.getElementById('rsvp-name')?.value.trim()  || guestName;
      const attend = document.getElementById('rsvp-attend')?.value;
      btn.textContent = 'Mengirim…'; btn.disabled = true;
      await new Promise(r => setTimeout(r, 700));
      if (attend === 'hadir' && window.confetti) {
        confetti({ particleCount: 180, spread: 90, origin: { y: 0.65 },
                   colors: ['#A0522D','#F0C4A0','#FDF9F3','#C8A95F'] });
      }
      if (status) {
        status.style.display = 'block';
        status.textContent   = attend === 'hadir'
          ? `🎉 Terima kasih, ${name}! Kami dengan bahagia menantikan kehadiran Anda.`
          : `🙏 Terima kasih ${name} atas balasannya. Kami menghargai perhatian Anda.`;
        setTimeout(() => status.style.display = 'none', 7000);
      }
      form.reset();
      btn.textContent = 'Kirim Konfirmasi'; btn.disabled = false;
    });

    // WA RSVP button
    document.getElementById('btn-wa-rsvp')?.addEventListener('click', () => {
      const name   = document.getElementById('rsvp-name')?.value.trim() || guestName;
      const attend = document.getElementById('rsvp-attend')?.value;
      const g      = C.groom?.shortName || 'Rizky';
      const b      = C.bride?.shortName  || 'Sinta';
      const st     = attend === 'hadir' ? '*hadir*' : attend === 'tidak' ? '*tidak dapat hadir*' : '*hadir*';
      const msg    = `Assalamu'alaikum 🙏\n\nSaya *${name}*, ingin konfirmasi bahwa saya insya Allah ${st} pada acara pernikahan *${g} & ${b}*.\n\nTerima kasih atas undangannya.`;
      window.open(`https://wa.me/${C.whatsapp?.rsvpNumber||''}?text=${encodeURIComponent(msg)}`, '_blank');
    });
  })();

  /* ─────────────────────────────────────
     17. GUESTBOOK
  ───────────────────────────────────── */
  (function() {
    const list = document.getElementById('gb-list');
    function addBubble(name, msg) {
      if (!list) return;
      const div = document.createElement('div');
      div.className = 'gb-bubble';
      div.innerHTML = `
        <p style="font-size:9px;font-weight:700;letter-spacing:.15em;text-transform:uppercase;color:var(--accent);margin-bottom:.25rem;">${name}</p>
        <p style="font-size:11px;color:var(--dark);line-height:1.65;">${msg}</p>`;
      list.prepend(div);
    }
    // Load mock messages
    (C.mockMessages || []).forEach(m => addBubble(m.name, m.message));

    const form = document.getElementById('gb-form');
    if (!form) return;
    form.addEventListener('submit', async e => {
      e.preventDefault();
      const btn  = form.querySelector('button[type="submit"]');
      const name = document.getElementById('gb-name')?.value.trim();
      const msg  = document.getElementById('gb-msg')?.value.trim();
      if (!name || !msg) return;
      btn.textContent = 'Mengirim…'; btn.disabled = true;
      await new Promise(r => setTimeout(r, 500));
      addBubble(name, msg);
      form.reset();
      btn.innerHTML = '<svg style="width:.9rem;height:.9rem;" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/></svg><span>Kirim Pesan</span>';
      btn.disabled = false;
    });
  })();

  /* ─────────────────────────────────────
     18. WA SHARE
  ───────────────────────────────────── */
  document.getElementById('wa-share')?.addEventListener('click', () => {
    const text = `${C.whatsapp?.shareText || 'Kami mengundang Anda ke pernikahan kami!'}\n${location.href}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
  });

  /* ─────────────────────────────────────
     19. GSAP SCROLL ANIMATIONS
  ───────────────────────────────────── */
  (function() {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;
    gsap.registerPlugin(ScrollTrigger);

    const animate = (sel, props) => {
      gsap.utils.toArray(sel).forEach(el => {
        gsap.to(el, { ...props, scrollTrigger: { trigger: el, start: 'top 90%' } });
      });
    };

    animate('.r-up',    { y: 0, opacity: 1, duration: 1.1, ease: 'power3.out' });
    animate('.r-left',  { x: 0, opacity: 1, duration: 1.1, ease: 'power3.out' });
    animate('.r-right', { x: 0, opacity: 1, duration: 1.1, ease: 'power3.out' });
    animate('.r-scale', { scale: 1, opacity: 1, duration: 1.2, ease: 'back.out(1.5)' });
  })();

});
