/* ============================================================
   2026 马年新春演出 — JavaScript
   - Navbar scroll effect
   - Particle animation
   - Scroll-triggered animations
   - Gallery render & filter
   - Lightbox
   ============================================================ */

// ---- Navbar ----
const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

window.addEventListener('scroll', () => {
    if (window.scrollY > 60) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
}, { passive: true });

navToggle.addEventListener('click', () => {
    const open = navLinks.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', open);
    navToggle.innerHTML = open ? '✕' : '&#9776;';
    document.body.style.overflow = open ? 'hidden' : '';
});

navLinks.addEventListener('click', e => {
    if (e.target.tagName === 'A') {
        navLinks.classList.remove('open');
        navToggle.innerHTML = '&#9776;';
        document.body.style.overflow = '';
    }
});

// ---- Particles ----
(function initParticles() {
    const container = document.getElementById('particles');
    if (!container) return;
    const count = 30;
    for (let i = 0; i < count; i++) {
        const p = document.createElement('div');
        p.className = 'particle';
        const size = Math.random() * 4 + 2;
        p.style.cssText = `
      width: ${size}px;
      height: ${size}px;
      left: ${Math.random() * 100}%;
      bottom: -${size}px;
      animation-duration: ${Math.random() * 8 + 6}s;
      animation-delay: ${Math.random() * 8}s;
      opacity: ${Math.random() * 0.5 + 0.1};
    `;
        container.appendChild(p);
    }
})();

// ---- Scroll Animations (IntersectionObserver) ----
const observerOptions = { threshold: 0.15, rootMargin: '0px 0px -40px 0px' };

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const el = entry.target;
            const delay = el.dataset.delay ? parseInt(el.dataset.delay) : 0;
            setTimeout(() => el.classList.add('visible'), delay);
            observer.unobserve(el);
        }
    });
}, observerOptions);

document.querySelectorAll('.about-card, .act-card').forEach(el => observer.observe(el));

// ---- Gallery Data ----
const galleryData = [
    // Sleeve Dance
    { id: 1, act: 'sleeve', url: 'https://lh3.googleusercontent.com/pw/AP1GczNei-Ep4OKVbG5y3iaf7Y0T2xuYhBpJkbJdXEQExHCqtEpXY_vn4PZ9g6XM0-wSKSf7nicWgQR3tOcaytnjJOT3ly2EXULXHdlJRk8idaQPB2VTZHhNAEauomqs1mPieA8ADNSNcWWv39eMqMDTrIM5fA=w1416-h945-s-no-gm', titleEn: 'Flowing Sleeve Dance', titleZh: '流水长袖舞', subtitleEn: 'Traditional Water Sleeves', subtitleZh: '传统水袖', descEn: 'Graceful blue flowing dance with ethereal costumes', descZh: '身着空灵服饰的优美蓝色长袖舞', color: 'sleeve' },
    { id: 2, act: 'sleeve', url: 'https://lh3.googleusercontent.com/pw/AP1GczPgxgjKmV7ex3nTcwCopYZ8jWfXBQJakJZ24l7GINMkMZxNWf4S8s8U0-Y-svxigpnJf5JGEIfSYfKyMHMLPDQah-b42_ZGEagTXmOOMfvPnUIUjUxqpHJq3BWmv6bz2Ak88dEC2cDO14Co5pcLSN89wA=w1417-h945-s-no-gm', titleEn: 'Dynamic Ribbon Dance', titleZh: '长袖如流水', subtitleEn: 'Vibrant movement', subtitleZh: '活力舞动', descEn: 'Vibrant movement with long ribbons tracing arcs', descZh: '长长的红绸在空中划出美丽的弧线', color: 'sleeve' },
    // Lantern Dance
    { id: 3, act: 'lantern', url: 'https://lh3.googleusercontent.com/pw/AP1GczNq0IqCRpHNbN4okj5nIsbCfaG0-Ll560udXleUjqz0s8uuRUZjyPgtuBhx0xeeYM_ck1ucZXUPK-M1DqmkmV5hcbb9IrcGWY67tLo54aG_itF7josLEwXMv_u88_n6O581TCKE3pz2_k3JD2D5N3Uhfw=w630-h945-s-no-gm', titleEn: 'Red Lantern Dance', titleZh: '红灯笼舞', subtitleEn: 'Youth Ensemble', subtitleZh: '少儿合舞', descEn: 'Children performing in festive red with traditional lanterns', descZh: '孩子们手持传统红灯笼进行充满节日气息的表演', color: 'lantern' },
    { id: 4, act: 'lantern', url: 'https://lh3.googleusercontent.com/pw/AP1GczOx7rBxlci2VqMdGrGwkiFAgqRXHCOvpnRDohDTfOtrRtQhMmGb-4FG1ojEMZ7RaSZ___M_t3jDsep51wE2kpts_wIDPbRBdlqNDDdc5WtcdioKsP6XiZ1rqtO7WSrLJVk0huEcCh2MPjQzxmGlv34xsQ=w1417-h945-s-no-gm', titleEn: 'Vibrant Ribbon Throw', titleZh: '新春大汇演', subtitleEn: 'Joyous Celebration', subtitleZh: '欢乐庆典', descEn: 'A sea of red against vibrant stage lighting', descZh: '绚丽舞台灯光下的一片红色海洋', color: 'lantern' },
    // Fan Dance
    { id: 5, act: 'fan', url: 'https://lh3.googleusercontent.com/pw/AP1GczMeVY-oaBDvtztdK1aIrFIQ7fPpN4j1n--5c45MDihKfjPw7XL_QZ4UGADPc5EPPK2pGu8jQaZf5VUQp82joIgyQL2ZMRykEZBIwXXBGzpqvaxEXp5yhLMMZgqhtFVbpNGpGIJgK7ROg7MrtQ3DDFw8Rw=w1417-h945-s-no-gm', titleEn: 'Graceful Fan Dance', titleZh: '扇舞翩翩', subtitleEn: 'Traditional Artistry', subtitleZh: '传统技艺', descEn: 'Dancers in traditional attire with intricate fans', descZh: '身穿传统服饰的舞者手持精美的扇子', color: 'fan' },
    { id: 6, act: 'fan', url: 'https://lh3.googleusercontent.com/pw/AP1GczOrFr21pJHcUMHA93gf_cfCPc8zWC2ytqk5mWlPeGpGnIRzzdqDtYh7aMixaY2S6TDYbZ4yd3oilBmch8PR3Uj_c82Bmz1G2xqX6KCphgPTKlu-wqS3FGJZ1mPs7GVu-z9h_LCgLtuxklqibkxs0T0UBg=w1417-h945-s-no-gm', titleEn: 'Floral Fan Dance', titleZh: '扇动春风', subtitleEn: 'Spring Blooming', subtitleZh: '春日绽放', descEn: 'Elegant group dance with pink floral motifs', descZh: '带有粉色花朵图案的优雅群舞', color: 'fan' },
];

// ---- Gallery Render ----
const galleryGrid = document.getElementById('galleryGrid');
let currentFilter = 'all';
let currentLightboxIndex = -1;
let filteredItems = [...galleryData];

function getItems(filter) {
    return filter === 'all' ? galleryData : galleryData.filter(i => i.act === filter);
}

function renderGallery(filter) {
    filteredItems = getItems(filter);
    galleryGrid.innerHTML = '';
    filteredItems.forEach((item, idx) => {
        const el = document.createElement('div');
        el.className = 'gallery-item';
        el.dataset.act = item.act;
        el.dataset.index = idx;
        el.style.animationDelay = `${idx * 60}ms`;
        el.setAttribute('role', 'button');
        el.setAttribute('tabindex', '0');
        el.setAttribute('aria-label', `${item.titleEn} — ${item.titleZh}`);
        el.innerHTML = `
      <div class="gallery-item-inner" style="padding: 0;">
        <img src="${item.url}" alt="${item.titleEn}" style="width: 100%; height: 100%; object-fit: cover;" loading="lazy">
      </div>
      <div class="gallery-overlay">
        <div style="position: absolute; bottom: 0; left: 0; right: 0; padding: 20px; background: linear-gradient(transparent, rgba(0,0,0,0.9)); text-align: left;">
          <div style="font-family: var(--font-zh); font-size: 1.2rem; color: var(--white); font-weight: 700;">
            <span class="lang-zh">${item.titleZh}</span>
            <span class="lang-en">${item.titleEn}</span>
          </div>
          <div style="font-size: 0.82rem; color: var(--gold-light);">
            <span class="lang-zh">${item.subtitleZh}</span>
            <span class="lang-en">${item.subtitleEn}</span>
          </div>
        </div>
        <div class="gallery-overlay-icon" style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); display: none;">🔍</div>
      </div>
    `;
        el.addEventListener('click', () => openLightbox(idx));
        el.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') openLightbox(idx); });
        galleryGrid.appendChild(el);
    });
}

renderGallery('all');

// Gallery Filter Buttons
document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentFilter = btn.dataset.filter;
        renderGallery(currentFilter);
    });
});

// ---- Lightbox ----
const lightbox = document.getElementById('lightbox');
const lightboxClose = document.getElementById('lightboxClose');
const lightboxPrev = document.getElementById('lightboxPrev');
const lightboxNext = document.getElementById('lightboxNext');
const lightboxImgWrapper = document.getElementById('lightboxImgWrapper');
const lightboxCaption = document.getElementById('lightboxCaption');
const lightboxPlaceholder = document.getElementById('lightboxPlaceholder');

function openLightbox(index) {
    currentLightboxIndex = index;
    updateLightbox();
    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
    lightboxClose.focus();
}

function closeLightbox() {
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
    currentLightboxIndex = -1;
}

function updateLightbox() {
    const item = filteredItems[currentLightboxIndex];
    if (!item) return;

    // Build a classic lightbox image viewer
    lightboxPlaceholder.innerHTML = `
    <div style="width: 100%; height: 100%; display: flex; flex-direction: column;">
      <div style="flex: 1; display: flex; align-items: center; justify-content: center; background: #000; padding: 20px;">
        <img src="${item.url}" alt="${item.titleEn}" style="max-height: 70vh; max-width: 100%; object-fit: contain; border: 1px solid rgba(255,255,255,0.1);">
      </div>
      <div style="padding: 24px; background: var(--dark-card); text-align: left;">
        <div style="font-family: var(--font-zh); font-size: 1.5rem; font-weight: 900; color: var(--white); margin-bottom: 4px;">
            <span class="lang-zh">${item.titleZh}</span>
            <span class="lang-en">${item.titleEn}</span>
        </div>
        <div style="font-size: 0.9rem; color: var(--gold-light); text-transform: uppercase; margin-bottom: 12px; letter-spacing: 0.1em;">
            <span class="lang-zh">${item.subtitleZh}</span>
            <span class="lang-en">${item.subtitleEn}</span>
        </div>
        <div style="font-size: 0.9rem; color: var(--text-muted); line-height: 1.6;">
            <span class="lang-zh">${item.descZh}</span>
            <span class="lang-en">${item.descEn}</span>
        </div>
      </div>
    </div>
  `;
    lightboxCaption.textContent = `${currentLightboxIndex + 1} / ${filteredItems.length}`;
}

function prevPhoto() {
    currentLightboxIndex = (currentLightboxIndex - 1 + filteredItems.length) % filteredItems.length;
    updateLightbox();
}

function nextPhoto() {
    currentLightboxIndex = (currentLightboxIndex + 1) % filteredItems.length;
    updateLightbox();
}

lightboxClose.addEventListener('click', closeLightbox);
lightboxPrev.addEventListener('click', prevPhoto);
lightboxNext.addEventListener('click', nextPhoto);

lightbox.addEventListener('click', e => {
    if (e.target === lightbox) closeLightbox();
});

document.addEventListener('keydown', e => {
    if (!lightbox.classList.contains('open')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') prevPhoto();
    if (e.key === 'ArrowRight') nextPhoto();
});

// ---- Smooth Nav Active State ----
const sections = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(s => {
        if (window.scrollY >= s.offsetTop - 120) current = s.id;
    });
    navAnchors.forEach(a => {
        a.style.color = '';
        if (a.getAttribute('href') === `#${current}`) {
            a.style.color = '#f5c842';
        }
    });
}, { passive: true });

// ---- Language Toggle Logic ----
const langToggleBtn = document.getElementById('langToggle');

if (langToggleBtn) {
    langToggleBtn.addEventListener('click', () => {
        const isEnglish = document.body.classList.contains('lang-en');
        if (isEnglish) {
            document.body.classList.replace('lang-en', 'lang-zh');
            localStorage.setItem('gala-lang', 'zh');
        } else {
            document.body.classList.replace('lang-zh', 'lang-en');
            localStorage.setItem('gala-lang', 'en');
        }
    });
}
