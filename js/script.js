/**
 * ╔══════════════════════════════════════════════════════════════════════════╗
 * ║         KARTUNIKAH — ENGINE MASTERPIECE 2D / 3D / 8D                     ║
 * ║   Semua 12 Pilar Inovasi: Surat Kerajaan, Kalender Meja, Marquee Galeri,  ║
 * ║   Kartu Pos Pos Udara, Tanda Kasih Digital, Audio Spasial 8D & SFX       ║
 * ╚══════════════════════════════════════════════════════════════════════════╝
 */
'use strict';

document.addEventListener('DOMContentLoaded', () => {
  const C = window.CONFIG;
  if (!C) { console.error('CONFIG tidak ditemukan!'); return; }

  /* ═══════════════════════════════════════════════════════════
     0. TEMA WARNA & CSS CUSTOM PROPERTIES
  ═══════════════════════════════════════════════════════════ */
  (function applyTheme() {
    const t = C.theme || {}, r = document.documentElement.style;
    const map = {
      '--bg':           t.primaryBg,
      '--bg2':          t.sectionBg,
      '--accent':       t.accentColor,
      '--dark':         t.darkColor,
      '--muted':        t.mutedColor,
      '--gold':         t.goldColor,
      '--outer':        t.outerBg,
      '--envelope-bg':  t.envelopeColor || '#8B4513',
      '--wax-seal':     t.waxSealColor || '#962D2D',
    };
    Object.entries(map).forEach(([k, v]) => { if (v) r.setProperty(k, v); });
    document.body.style.background = t.outerBg || '#261510';
  })();

  /* ═══════════════════════════════════════════════════════════
     1. GUEST NAME DARI URL (?to=Nama+Tamu) DENGAN AUTO FONT SCALING
  ═══════════════════════════════════════════════════════════ */
  const rawGuest  = new URLSearchParams(location.search).get('to');
  const guestName = rawGuest ? decodeURIComponent(rawGuest.replace(/\+/g, ' ')) : (C.defaultGuestName || 'Tamu Undangan');
  const guestDisplay = document.getElementById('guest-name');
  if (guestDisplay) {
    guestDisplay.textContent = guestName;
    // Dynamic font scaling untuk nama tamu yang sangat panjang agar tidak berantakan
    if (guestName.length > 60) {
      guestDisplay.style.fontSize = '12px';
      guestDisplay.style.lineHeight = '1.3';
    } else if (guestName.length > 35) {
      guestDisplay.style.fontSize = '13.5px';
      guestDisplay.style.lineHeight = '1.35';
    } else {
      guestDisplay.style.fontSize = 'clamp(14px, 3.8vw, 17px)';
      guestDisplay.style.lineHeight = '1.35';
    }
  }

  // Pre-fill nama di form RSVP jika tamu membuka link personal
  const rsvpNameInput = document.getElementById('rsvp-name');
  if (rsvpNameInput && rawGuest) {
    rsvpNameInput.value = guestName;
  }

  /* ═══════════════════════════════════════════════════════════
     2. PILAR 3: WEB AUDIO API — 8D SPATIAL & PROCEDURAL SFX
  ═══════════════════════════════════════════════════════════ */
  let audioCtx = null;
  let pannerNode = null;
  let panDirection = 0.005;
  let panPos = 0;

  function getAudioContext() {
    if (!audioCtx) {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (AudioContextClass) audioCtx = new AudioContextClass();
    }
    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
    return audioCtx;
  }

  // SFX Generator (Suara Segel, Kertas Amplop, Lonceng, Hati)
  function playSFX(type) {
    if (!C.sfxEnabled) return;
    try {
      const ctx = getAudioContext();
      if (!ctx) return;

      if (type === 'seal') {
        // Suara klik/retak segel lilin (low thump + snap)
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(140, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(30, ctx.currentTime + 0.12);
        gain.gain.setValueAtTime(0.7, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.12);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.12);
      } else if (type === 'rustle') {
        // Suara desiran kertas amplop (bandpass filtered noise)
        const bufferSize = ctx.sampleRate * 0.25;
        const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) data[i] = Math.random() * 2 - 1;
        const noise = ctx.createBufferSource();
        noise.buffer = buffer;
        const filter = ctx.createBiquadFilter();
        filter.type = 'bandpass';
        filter.frequency.setValueAtTime(800, ctx.currentTime);
        filter.frequency.linearRampToValueAtTime(1600, ctx.currentTime + 0.25);
        const gain = ctx.createGain();
        gain.gain.setValueAtTime(0.2, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.25);
        noise.connect(filter);
        filter.connect(gain);
        gain.connect(ctx.destination);
        noise.start();
      } else if (type === 'chime') {
        // Suara denting lonceng emas (arpeggio 3 nada)
        [523.25, 659.25, 783.99, 1046.50].forEach((freq, i) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, ctx.currentTime + (i * 0.08));
          gain.gain.setValueAtTime(0.3, ctx.currentTime + (i * 0.08));
          gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + (i * 0.08) + 0.6);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(ctx.currentTime + (i * 0.08));
          osc.stop(ctx.currentTime + (i * 0.08) + 0.6);
        });
      } else if (type === 'heart') {
        // Suara pop ceria saat tap tombol cinta
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(587.33, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.08);
        gain.gain.setValueAtTime(0.25, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.08);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.08);
      }
    } catch (e) { /* ignore audio context error */ }
  }

  // PILAR 7: HAPTIC FEEDBACK
  function triggerHaptic(pattern = [25]) {
    if ('vibrate' in navigator) {
      try { navigator.vibrate(pattern); } catch (e) {}
    }
  }

  /* ═══════════════════════════════════════════════════════════
     3. PILAR 1: WARKAT SURAT KERAJAAN MEWAH & SEGEL LILIN 3D
  ═══════════════════════════════════════════════════════════ */
  (function initCoverLetter() {
    const royalLetter = document.getElementById('royal-letter');
    const waxSealBtn  = document.getElementById('wax-seal-btn');
    const btnOpen     = document.getElementById('btn-open');
    const cover       = document.getElementById('cover');
    const main        = document.getElementById('main');
    const musicBtn    = document.getElementById('music-btn');
    const floatNav    = document.getElementById('float-nav');
    const waShare     = document.getElementById('wa-share');
    const bgMusic     = document.getElementById('bg-music');
    let isOpening     = false;

    function openInvitation() {
      if (isOpening) return;
      isOpening = true;

      // Haptic & Sound Segel Lilin
      triggerHaptic([30, 40, 50]);
      playSFX('seal');

      // 1. Animasi membuka surat kerajaan (segel memudar, warkat terangkat anggun)
      if (cover) cover.classList.add('is-opening');

      // 2. Bunyi kertas desiran halus
      setTimeout(() => playSFX('rustle'), 300);

      // 3. Tirai cover meluncur ke atas membuka halaman utama
      setTimeout(() => {
        dismissCover();
      }, 750);

      // 4. Munculkan kontrol musik & navigasi
      setTimeout(() => {
        if (musicBtn) musicBtn.classList.add('show');
        if (floatNav) floatNav.classList.add('show');
        if (waShare)  waShare.classList.add('show');
      }, 1100);

      // 5. Putar musik latar
      if (bgMusic) {
        bgMusic.play().then(() => {
          if (musicBtn) musicBtn.classList.add('playing');
        }).catch(() => {});
      }

      // 6. Inisialisasi Lenis smooth scroll
      setTimeout(() => initLenis(), 1000);
    }

    function dismissCover() {
      if (cover) cover.classList.add('slide-away');
      document.body.classList.remove('locked');
      if (main) {
        main.classList.add('show');
        main.style.opacity = '1';
        main.style.pointerEvents = 'auto';
      }
      playSFX('chime');
    }

    if (waxSealBtn)  waxSealBtn.addEventListener('click', (e) => { e.stopPropagation(); openInvitation(); });
    if (btnOpen)     btnOpen.addEventListener('click', (e) => { e.stopPropagation(); openInvitation(); });
    if (royalLetter) royalLetter.addEventListener('click', () => openInvitation());
  })();

  /* ═══════════════════════════════════════════════════════════
     4. KONTROL MUSIK & EQUALIZER WAVE
  ═══════════════════════════════════════════════════════════ */
  (function initMusic() {
    const btn   = document.getElementById('music-btn');
    const audio = document.getElementById('bg-music');
    if (!btn || !audio) return;

    if (C.musicUrl) {
      const src = audio.querySelector('source');
      if (src && src.getAttribute('src') !== C.musicUrl) {
        src.src = C.musicUrl;
        audio.load();
      }
    }

    btn.addEventListener('click', () => {
      triggerHaptic(20);
      if (audio.paused) {
        audio.play(); btn.classList.add('playing');
      } else {
        audio.pause(); btn.classList.remove('playing');
      }
    });
  })();

  /* ═══════════════════════════════════════════════════════════
     5. PILAR 6: CANVAS 3D TUMBLING PETALS PHYSICS
  ═══════════════════════════════════════════════════════════ */
  (function init3DPetals() {
    const canvas = document.getElementById('petal-canvas');
    if (!canvas) return;
    const ctx    = canvas.getContext('2d');
    const colors = C.theme?.petalColors || ['#F0C4A0', '#E8AE8A', '#FAE0C8'];
    const COUNT  = 22;
    let W, H, petals = [];
    let lastScrollY = window.scrollY;
    let scrollVelocity = 0;

    function resize() {
      W = canvas.width  = window.innerWidth;
      H = canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize, { passive: true });

    window.addEventListener('scroll', () => {
      const currentScrollY = window.scrollY;
      scrollVelocity = (currentScrollY - lastScrollY) * 0.15;
      lastScrollY = currentScrollY;
    }, { passive: true });

    for (let i = 0; i < COUNT; i++) {
      petals.push({
        x:      Math.random() * window.innerWidth,
        y:      Math.random() * window.innerHeight - window.innerHeight,
        w:      Math.random() * 9 + 5,
        h:      Math.random() * 5 + 3,
        spdY:   Math.random() * 0.8 + 0.4,
        spdX:   (Math.random() - 0.5) * 0.5,
        rotX:   Math.random() * Math.PI * 2,
        rotY:   Math.random() * Math.PI * 2,
        rotZ:   Math.random() * Math.PI * 2,
        rSpdX:  (Math.random() - 0.5) * 0.04,
        rSpdY:  (Math.random() - 0.5) * 0.05,
        rSpdZ:  (Math.random() - 0.5) * 0.02,
        alpha:  Math.random() * 0.4 + 0.2,
        color:  colors[Math.floor(Math.random() * colors.length)],
      });
    }

    (function loop() {
      ctx.clearRect(0, 0, W, H);
      scrollVelocity *= 0.92; // decay scroll wind

      petals.forEach(p => {
        p.y    += p.spdY - (scrollVelocity * 0.5);
        p.x    += p.spdX + Math.sin(p.rotZ) * 0.4;
        p.rotX += p.rSpdX;
        p.rotY += p.rSpdY;
        p.rotZ += p.rSpdZ;

        if (p.y > H + 25) { p.y = -25; p.x = Math.random() * W; }
        if (p.y < -30)   { p.y = H + 20; p.x = Math.random() * W; }

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotZ);
        ctx.scale(Math.cos(p.rotX), Math.sin(p.rotY)); // 3D Tumbling projection
        ctx.globalAlpha = p.alpha;
        ctx.fillStyle   = p.color;
        ctx.beginPath();
        ctx.ellipse(0, 0, p.w, p.h, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });
      requestAnimationFrame(loop);
    })();
  })();

  /* ═══════════════════════════════════════════════════════════
     6. PILAR 8: SEPASANG CINCIN EMAS BERKILAU 3D (CANVAS)
  ═══════════════════════════════════════════════════════════ */
  (function init3DRings() {
    const canvas = document.getElementById('rings-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let angle = 0;

    function drawRings() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      angle += 0.02;

      const cx1 = 65, cy1 = 35, r = 22;
      const cx2 = 95, cy2 = 35;

      // Cincin 1 (Pria - Polos Berkilau)
      ctx.save();
      ctx.beginPath();
      ctx.arc(cx1, cy1, r, 0, Math.PI * 2);
      ctx.lineWidth = 4;
      const grad1 = ctx.createLinearGradient(cx1 - r, cy1 - r, cx1 + r, cy1 + r);
      grad1.addColorStop(0, '#ffe599');
      grad1.addColorStop(0.5, '#c8a95f');
      grad1.addColorStop(1, '#8c6b2d');
      ctx.strokeStyle = grad1;
      ctx.stroke();
      ctx.restore();

      // Cincin 2 (Wanita - dengan Mahkota Berlian)
      ctx.save();
      ctx.beginPath();
      ctx.arc(cx2, cy2, r, 0, Math.PI * 2);
      ctx.lineWidth = 4;
      const grad2 = ctx.createLinearGradient(cx2 - r, cy2 - r, cx2 + r, cy2 + r);
      grad2.addColorStop(0, '#fff2cc');
      grad2.addColorStop(0.5, '#d4af37');
      grad2.addColorStop(1, '#7a5a1f');
      ctx.strokeStyle = grad2;
      ctx.stroke();

      // Batu Berlian Cincin 2
      const diamondX = cx2 + Math.cos(angle) * 3;
      const diamondY = cy2 - r - 2;
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(diamondX, diamondY, 4.5, 0, Math.PI * 2);
      ctx.fill();

      // Kilau Cahaya Berlian (Sparkle Star)
      const sparkleSize = Math.abs(Math.sin(angle * 2)) * 8 + 2;
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.9)';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(diamondX - sparkleSize, diamondY);
      ctx.lineTo(diamondX + sparkleSize, diamondY);
      ctx.moveTo(diamondX, diamondY - sparkleSize);
      ctx.lineTo(diamondX, diamondY + sparkleSize);
      ctx.stroke();
      ctx.restore();

      requestAnimationFrame(drawRings);
    }
    drawRings();
  })();

  /* ═══════════════════════════════════════════════════════════
     7. PILAR 5: WIDGET KALENDER MEJA BULANAN NYATA
  ═══════════════════════════════════════════════════════════ */
  (function renderCalendarWidget() {
    const grid = document.getElementById('calendar-grid');
    const titleEl = document.getElementById('cal-month-title');
    if (!grid) return;

    const weddingDateObj = new Date(C.weddingDate || '2025-10-18T08:30:00');
    const year  = weddingDateObj.getFullYear();
    const month = weddingDateObj.getMonth(); // 0-indexed
    const dayOfMonth = weddingDateObj.getDate();

    const monthNames = [
      'JANUARI', 'FEBRUARI', 'MARET', 'APRIL', 'MEI', 'JUNI',
      'JULI', 'AGUSTUS', 'SEPTEMBER', 'OKTOBER', 'NOVEMBER', 'DESEMBER'
    ];
    if (titleEl) titleEl.textContent = `${monthNames[month]} ${year}`;

    // Nama hari (SEN, SEL, RAB, KAM, JUM, SAB, MIN)
    const dayNames = ['SEN', 'SEL', 'RAB', 'KAM', 'JUM', 'SAB', 'MIN'];
    grid.innerHTML = '';
    dayNames.forEach(d => {
      const el = document.createElement('div');
      el.className = 'cal-day-name';
      el.textContent = d;
      grid.appendChild(el);
    });

    // Hitung hari pertama dalam bulan (0 = Minggu, 1 = Senin, dst)
    const firstDayIndex = new Date(year, month, 1).getDay();
    // Konversi ke format Senin = 0, Minggu = 6
    const offset = firstDayIndex === 0 ? 6 : firstDayIndex - 1;

    // Slot kosong sebelum tanggal 1
    for (let i = 0; i < offset; i++) {
      const emptyCell = document.createElement('div');
      emptyCell.className = 'cal-date empty';
      grid.appendChild(emptyCell);
    }

    // Total hari dalam bulan ini
    const totalDays = new Date(year, month + 1, 0).getDate();

    for (let d = 1; d <= totalDays; d++) {
      const dateCell = document.createElement('div');
      dateCell.className = 'cal-date';
      dateCell.textContent = d;

      if (d === dayOfMonth) {
        dateCell.classList.add('wedding-day');
        dateCell.title = 'Hari Pernikahan!';
      }
      grid.appendChild(dateCell);
    }
  })();

  /* ═══════════════════════════════════════════════════════════
     8. PILAR 4: LUXURY CINEMATIC MARQUEE GALLERY
  ═══════════════════════════════════════════════════════════ */
  (function initFilmstripGallery() {
    const track = document.getElementById('gallery-marquee-track') || document.getElementById('filmstrip-track');
    if (!track || !C.gallery) return;

    // Gandakan array 2x untuk infinite seamless marquee roll
    const photos = [...C.gallery, ...C.gallery];
    track.innerHTML = '';

    photos.forEach((item) => {
      const card = document.createElement('div');
      card.className = 'gallery-card';
      const imgSrc  = item.thumb || item.src;
      const fullSrc = item.src || item.thumb;
      const caption = item.caption || 'Momen Bahagia';
      const dateStr = item.filmDate || '18 OKT 2025';

      card.innerHTML = `
        <a href="${fullSrc}" data-fancybox="gallery" data-caption="${caption}" style="display:block;width:100%;height:100%;text-decoration:none;">
          <img class="gallery-card-img" src="${imgSrc}" alt="${caption}" loading="lazy" onerror="this.onerror=null;this.src='images/prewed.jpeg';">
          <div class="gallery-card-info">
            <span class="gallery-card-caption">${caption}</span>
            <span class="gallery-card-date">${dateStr}</span>
          </div>
        </a>
      `;
      track.appendChild(card);
    });

    if (typeof Fancybox !== 'undefined') {
      Fancybox.bind('[data-fancybox="gallery"]', { animated: true });
    }
  })();

  /* ═══════════════════════════════════════════════════════════
     9. PILAR 11: DRESS CODE COLOR SWATCHES
  ═══════════════════════════════════════════════════════════ */
  (function renderDressCode() {
    const container = document.getElementById('dresscode-swatches');
    const title = document.getElementById('dresscode-title');
    const desc = document.getElementById('dresscode-desc');
    if (!container || !C.dressCode) return;

    if (title && C.dressCode.title) title.textContent = C.dressCode.title;
    if (desc && C.dressCode.description) desc.textContent = C.dressCode.description;

    container.innerHTML = '';
    (C.dressCode.colors || []).forEach(color => {
      const chip = document.createElement('div');
      chip.className = 'swatch-chip';
      chip.innerHTML = `
        <div class="swatch-circle" style="background-color: ${color.hex};" title="${color.name} (${color.hex})"></div>
        <span class="swatch-name">${color.name}</span>
      `;
      chip.addEventListener('click', () => {
        triggerHaptic(15);
        playSFX('heart');
      });
      container.appendChild(chip);
    });
  })();

  /* ═══════════════════════════════════════════════════════════
     10. PILAR 9: KADO & TANDA KASIH DIGITAL INTERAKTIF
  ═══════════════════════════════════════════════════════════ */
  (function initTandaKasih() {
    const giftBox = document.getElementById('gift-envelope');
    const bankContainer = document.getElementById('bank-container');
    if (!giftBox || !bankContainer) return;

    giftBox.addEventListener('click', (e) => {
      if (e.target.closest('.bank-copy')) return; // Jangan toggle jika klik tombol salin
      giftBox.classList.toggle('is-opened');
      triggerHaptic(25);
      playSFX('rustle');
    });

    // Render daftar rekening & tanda kasih
    bankContainer.innerHTML = '';
    const accounts = C.tandaKasih?.bankAccounts || C.bankAccounts || [];
    accounts.forEach(acc => {
      const row = document.createElement('div');
      row.style.cssText = 'background:rgba(255,255,255,0.12);border-radius:var(--radius-sm);padding:.875rem 1rem;display:flex;align-items:center;justify-content:space-between;gap:.75rem;border:1px solid rgba(255,255,255,0.2);';
      row.innerHTML = `
        <div>
          <p style="font-size:9px;font-weight:700;letter-spacing:.15em;text-transform:uppercase;color:var(--gold);margin-bottom:2px;">${acc.bank}</p>
          <p style="font-family:'Plus Jakarta Sans',sans-serif;font-weight:700;font-size:1.15rem;color:#fff;letter-spacing:.05em;">${acc.accountNumber}</p>
          <p style="font-size:10px;color:rgba(255,255,255,0.85);">a.n. ${acc.accountName}</p>
        </div>
        <button class="bank-copy" style="background:#fff;color:var(--dark);border:none;border-radius:.5rem;padding:.5rem .875rem;font-size:9px;font-weight:700;text-transform:uppercase;cursor:pointer;white-space:nowrap;" data-num="${acc.accountNumber.replace(/\s/g, '')}">
          Salin
        </button>
      `;
      bankContainer.appendChild(row);
    });

    bankContainer.querySelectorAll('.bank-copy').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        triggerHaptic([20, 30]);
        playSFX('chime');
        const num = btn.dataset.num;
        const orig = btn.textContent;
        const done = () => {
          btn.textContent = 'Tersalin';
          setTimeout(() => btn.textContent = orig, 2000);
        };
        if (navigator.clipboard && window.isSecureContext) {
          navigator.clipboard.writeText(num).then(done);
        } else {
          const ta = document.createElement('textarea');
          ta.value = num; document.body.appendChild(ta); ta.select();
          try { document.execCommand('copy'); done(); } catch (err) {}
          document.body.removeChild(ta);
        }
      });
    });
  })();

  /* ═══════════════════════════════════════════════════════════
     11. PILAR 6 & 7: VINTAGE POSTCARD RSVP & WAX SEAL SUBMIT
  ═══════════════════════════════════════════════════════════ */
  (function initPostcardRSVP() {
    const form = document.getElementById('rsvp-form');
    const statusEl = document.getElementById('rsvp-status');
    const waBtn = document.getElementById('btn-wa-rsvp');
    if (!form) return;

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      triggerHaptic([30, 40, 50]);
      playSFX('chime');

      const submitBtn = document.getElementById('btn-submit-postcard');
      const nameVal   = document.getElementById('rsvp-name')?.value.trim() || guestName;
      const attendVal = document.getElementById('rsvp-attend')?.value;

      submitBtn.disabled = true;
      submitBtn.innerHTML = '<span>Menyimpan Konfirmasi...</span>';

      await new Promise(r => setTimeout(r, 800));

      if (attendVal === 'hadir' && window.confetti) {
        confetti({
          particleCount: 190, spread: 100, origin: { y: 0.65 },
          colors: ['#A0522D', '#F0C4A0', '#FDF9F3', '#C8A95F']
        });
      }

      if (statusEl) {
        statusEl.style.display = 'block';
        statusEl.textContent = attendVal === 'hadir'
          ? `Terima kasih Bapak/Ibu/Saudara/i ${nameVal}. Konfirmasi kehadiran Anda telah tersimpan dengan rapi.`
          : `Terima kasih Bapak/Ibu/Saudara/i ${nameVal}. Doa tulus Anda sangat berarti bagi kami.`;
        setTimeout(() => statusEl.style.display = 'none', 8000);
      }

      form.reset();
      submitBtn.disabled = false;
      submitBtn.innerHTML = '<svg style="width:14px;height:14px;" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg><span>Kirim Konfirmasi Kehadiran</span>';
    });

    if (waBtn) {
      waBtn.addEventListener('click', () => {
        triggerHaptic(20);
        playSFX('seal');
        const nameVal = document.getElementById('rsvp-name')?.value.trim() || guestName;
        const attendVal = document.getElementById('rsvp-attend')?.value;
        const g = C.groom?.shortName || 'Rizky';
        const b = C.bride?.shortName  || 'Sinta';
        const status = attendVal === 'hadir' ? '*hadir*' : attendVal === 'tidak' ? '*tidak dapat hadir*' : '*hadir*';
        const msg = `Assalamu'alaikum Warahmatullahi Wabarakatuh,\n\nSaya *${nameVal}*, mengonfirmasi bahwa saya ${status} pada acara pernikahan *${g} & ${b}*.\n\nTerima kasih atas undangannya.`;
        window.open(`https://wa.me/${C.whatsapp?.rsvpNumber || ''}?text=${encodeURIComponent(msg)}`, '_blank');
      });
    }
  })();

  /* ═══════════════════════════════════════════════════════════
     12. PILAR 10: LIVE FLYING HEARTS SPAWNER
  ═══════════════════════════════════════════════════════════ */
  (function initFlyingHearts() {
    const btn = document.getElementById('btn-heart-spawner');
    const counterEl = document.getElementById('heart-counter');
    let count = 0;
    if (!btn) return;

    const heartColors = ['#A0522D', '#C8A95F', '#C43C3C', '#D9B98A'];

    btn.addEventListener('click', (e) => {
      count++;
      if (counterEl) counterEl.textContent = `+${count} Doa`;
      triggerHaptic(15);
      playSFX('heart');

      // Munculkan 3 hati vektor estetis sekaligus dengan lintasan acak
      for (let i = 0; i < 3; i++) {
        const heart = document.createElement('div');
        heart.className = 'flying-heart';
        const col = heartColors[Math.floor(Math.random() * heartColors.length)];
        heart.innerHTML = `<svg viewBox="0 0 24 24" width="20" height="20" style="fill:${col};filter:drop-shadow(0 2px 6px rgba(0,0,0,0.15));"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>`;
        const rect = btn.getBoundingClientRect();
        const startX = rect.left + rect.width / 2 + (Math.random() - 0.5) * 40;
        const startY = rect.top;

        heart.style.left = `${startX}px`;
        heart.style.top = `${startY}px`;
        document.body.appendChild(heart);

        setTimeout(() => heart.remove(), 2400);
      }
    });
  })();

  /* ═══════════════════════════════════════════════════════════
     13. MEMPELAI & LOVE STORY RENDERER
  ═══════════════════════════════════════════════════════════ */
  (function renderMempelai() {
    const container = document.getElementById('mempelai-container');
    if (!container) return;
    const people = [
      { ...C.groom, label: 'Mempelai Pria', role: 'Putra' },
      { ...C.bride,  label: 'Mempelai Wanita', role: 'Putri' },
    ];
    people.forEach((p, i) => {
      if (i === 1) {
        container.insertAdjacentHTML('beforeend', `
          <div style="text-align:center;font-family:'Cormorant Garamond',serif;font-size:2rem;color:var(--accent);padding:.25rem 0;">&amp;</div>`);
      }
      container.insertAdjacentHTML('beforeend', `
        <div class="card" data-tilt data-tilt-max="8" style="text-align:center;">
          <div style="width:6.75rem;height:6.75rem;border-radius:50%;overflow:hidden;border:3px solid var(--bg2);box-shadow:0 6px 22px rgba(0,0,0,.1);margin:0 auto 1.125rem;background:var(--bg2);">
            <img src="${p.photo || ''}" alt="${p.label}"
              style="width:100%;height:100%;object-fit:cover;object-position:${p.photoCrop || 'center'};transform:scale(${p.photoScale || '1.2'});">
          </div>
          <span class="lbl" style="text-align:center;display:block;">${p.label}</span>
          <h3 class="font-serif" style="font-size:1.55rem;font-weight:700;color:var(--dark);margin-bottom:.5rem;">
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

  (function renderLoveStory() {
    const tl = document.getElementById('timeline');
    if (!tl || !C.loveStory) return;
    C.loveStory.forEach((item, i) => {
      const isLeft = i % 2 === 0;
      const row = document.createElement('div');
      row.className = 'timeline-row';
      const cardHTML = `
        <div class="card" data-tilt data-tilt-max="6" style="padding:1rem 1.125rem;">
          <p class="lbl" style="margin-bottom:.2rem;">${item.year}</p>
          <h4 class="font-serif" style="font-size:1.1rem;font-weight:700;color:var(--dark);margin-bottom:.375rem;">${item.title}</h4>
          <p style="font-size:11px;color:var(--muted);line-height:1.7;">${item.desc}</p>
        </div>`;
      const dotHTML = `<div class="timeline-dot" style="font-family:'Cormorant Garamond',serif;font-weight:700;font-size:1.15rem;">${item.icon || 'I'}</div>`;
      if (isLeft) {
        row.innerHTML = `<div style="padding-right:.75rem;">${cardHTML}</div>${dotHTML}<div></div>`;
      } else {
        row.innerHTML = `<div></div>${dotHTML}<div style="padding-left:.75rem;">${cardHTML}</div>`;
      }
      tl.appendChild(row);
    });
  })();

  /* ═══════════════════════════════════════════════════════════
     14. RENDER EVENTS (RANGKAIAN ACARA)
  ═══════════════════════════════════════════════════════════ */
  (function renderEvents() {
    const container = document.getElementById('events-container');
    if (!container || !C.events) return;
    C.events.forEach(ev => {
      const dark = ev.cardStyle === 'dark';
      const wrap = dark ? 'card-dark' : 'card';
      const tc   = dark ? '#FDF9F3' : 'var(--dark)';
      const sc   = dark ? 'rgba(255,255,255,.6)' : 'var(--muted)';
      const bc   = dark ? 'rgba(255,255,255,.15)' : 'rgba(160,82,45,.18)';
      const ac   = dark ? 'var(--gold)' : 'var(--accent)';
      const btnBg  = dark ? 'rgba(255,255,255,.12)' : 'var(--bg2)';
      const btnCol = dark ? '#FDF9F3' : 'var(--dark)';

      container.insertAdjacentHTML('beforeend', `
        <div class="${wrap}" data-tilt data-tilt-max="6" style="text-align:center;">
          <div style="position:absolute;top:0;left:0;right:0;height:3px;background:${dark ? 'rgba(200,169,95,.7)' : 'rgba(160,82,45,.7)'};border-radius:var(--radius) var(--radius) 0 0;"></div>
          <span class="lbl" style="text-align:center;display:block;color:${ac};padding-top:.25rem;">${ev.subtitle}</span>
          <h3 class="font-serif" style="font-size:1.6rem;font-weight:700;color:${tc};margin-bottom:1rem;">${ev.title}</h3>
          <div style="width:2rem;height:1px;background:${bc};margin:0 auto 1rem;"></div>
          <p style="font-weight:700;font-size:.875rem;color:${tc};">${ev.date}</p>
          <p style="font-size:11px;color:${sc};margin-bottom:1.125rem;">${ev.time}</p>
          <div style="width:2rem;height:1px;background:${bc};margin:0 auto 1rem;"></div>
          <p style="font-weight:700;font-size:.875rem;color:${tc};">${ev.venue}</p>
          <p style="font-size:10px;color:${sc};line-height:1.65;margin-bottom:1.5rem;padding:0 .25rem;">${ev.address}</p>
          <a href="${ev.mapsUrl}" target="_blank" rel="noopener"
            class="btn" style="min-height:46px;background:${btnBg};color:${btnCol};border:1px solid ${bc};text-decoration:none;gap:.5rem;">
            <svg style="width:14px;height:14px;" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
            <span>Petunjuk Lokasi (Google Maps)</span>
          </a>
        </div>`);
    });
  })();

  /* ═══════════════════════════════════════════════════════════
     15. BUKU TAMU & COUNTDOWN
  ═══════════════════════════════════════════════════════════ */
  (function initGuestbook() {
    const list = document.getElementById('gb-list');
    function addMsg(name, msg, likes = 0) {
      if (!list) return;
      const div = document.createElement('div');
      div.className = 'card';
      div.style.cssText = 'padding:.875rem 1rem;margin-bottom:.5rem;';
      div.innerHTML = `
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:4px;">
          <p style="font-size:9px;font-weight:700;letter-spacing:.15em;text-transform:uppercase;color:var(--accent);">${name}</p>
          <button class="gb-like-btn" style="background:none;border:none;cursor:pointer;font-size:10px;color:var(--muted);display:flex;align-items:center;gap:4px;">
            <svg style="width:11px;height:11px;fill:var(--accent);" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
            <span>${likes}</span>
          </button>
        </div>
        <p style="font-size:11px;color:var(--dark);line-height:1.65;">${msg}</p>
      `;
      div.querySelector('.gb-like-btn')?.addEventListener('click', function() {
        triggerHaptic(15);
        playSFX('heart');
        const span = this.querySelector('span');
        span.textContent = parseInt(span.textContent) + 1;
      });
      list.prepend(div);
    }

    (C.mockMessages || []).forEach(m => addMsg(m.name, m.message, m.likes || 0));

    const form = document.getElementById('gb-form');
    if (form) {
      form.addEventListener('submit', async (e) => {
        e.preventDefault();
        triggerHaptic(20);
        playSFX('chime');
        const nameVal = document.getElementById('gb-name')?.value.trim();
        const msgVal  = document.getElementById('gb-msg')?.value.trim();
        if (!nameVal || !msgVal) return;
        addMsg(nameVal, msgVal, 1);
        form.reset();
      });
    }
  })();

  (function initCountdown() {
    const target = new Date(C.weddingDate || '2025-10-18T08:30:00').getTime();
    const ids    = ['cd-days', 'cd-hours', 'cd-mins', 'cd-secs'];
    const divs   = [86400000, 3600000, 60000, 1000];
    const mods   = [0, 86400000, 3600000, 60000];
    function tick() {
      let diff = target - Date.now();
      if (diff < 0) diff = 0;
      ids.forEach((id, i) => {
        const el = document.getElementById(id);
        if (!el) return;
        const val = mods[i] ? Math.floor((diff % mods[i]) / divs[i]) : Math.floor(diff / divs[i]);
        el.textContent = String(val).padStart(2, '0');
      });
    }
    tick(); setInterval(tick, 1000);
  })();

  document.getElementById('btn-calendar')?.addEventListener('click', () => {
    triggerHaptic(20);
    const g = C.groom?.shortName || 'Rizky';
    const b = C.bride?.shortName  || 'Sinta';
    const s = C.calendarStart || '20251018T013000Z';
    const e = C.calendarEnd   || '20251018T100000Z';
    window.open(`https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent('Pernikahan '+g+' & '+b)}&dates=${s}/${e}`, '_blank');
  });

  document.getElementById('wa-share')?.addEventListener('click', () => {
    triggerHaptic(20);
    const text = `${C.whatsapp?.shareText || 'Kami mengundang Anda ke pernikahan kami!'}\n${location.href}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
  });

  /* ═══════════════════════════════════════════════════════════
     17. LENIS SMOOTH SCROLL & VANILLA TILT
  ═══════════════════════════════════════════════════════════ */
  let lenis = null;
  function initLenis() {
    if (typeof Lenis === 'undefined') return;
    lenis = new Lenis({ lerp: 0.09, smoothTouch: false });
    function raf(t) { lenis.raf(t); requestAnimationFrame(raf); }
    requestAnimationFrame(raf);
  }

  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', function(e) {
      const sel = this.getAttribute('href');
      if (!sel.startsWith('#')) return;
      e.preventDefault();
      const target = document.querySelector(sel);
      if (!target) return;
      triggerHaptic(15);
      if (lenis) lenis.scrollTo(target, { duration: 1.3, easing: t => 1 - Math.pow(1 - t, 4) });
      else target.scrollIntoView({ behavior: 'smooth' });
    });
  });

  // Vanilla Tilt 3D
  if (typeof VanillaTilt !== 'undefined') {
    VanillaTilt.init(document.querySelectorAll('[data-tilt]'), {
      max: 10, speed: 400, perspective: 1000,
    });
  }

  // Names across the page
  const g = C.groom?.shortName || 'Rizky';
  const b = C.bride?.shortName  || 'Sinta';
  ['cover-names', 'hero-names', 'footer-names'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.innerHTML = `${g} &amp; ${b}`;
  });
  const d = C.weddingDateDisplay || '';
  ['cover-date', 'hero-date', 'footer-date'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.textContent = d;
  });

  // Quote
  if (C.quote) {
    const qText = document.getElementById('hero-quote-text');
    const qSrc  = document.getElementById('hero-quote-source');
    if (qText && C.quote.text)   qText.textContent = `"${C.quote.text}"`;
    if (qSrc  && C.quote.source) qSrc.textContent  = C.quote.source;
  }

  // Cover & Hero Photos
  const cp = document.getElementById('cover-photo');
  if (cp && C.coverPhoto) cp.src = C.coverPhoto;
  const hp = document.getElementById('hero-photo');
  if (hp && C.heroPhoto) hp.src = C.heroPhoto;

  const yr = document.getElementById('year');
  if (yr) yr.textContent = new Date().getFullYear();
});
