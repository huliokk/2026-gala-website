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
    { id: 1, act: 'sleeve', icon: '💃', title: '流水长袖舞', subtitle: 'Flowing Sleeve Dance #1', desc: 'Dancers in blue & white robes, graceful water sleeve movements', color: 'sleeve' },
    { id: 2, act: 'sleeve', icon: '🌊', title: '长袖如流水', subtitle: 'Flowing Sleeve Dance #2', desc: 'Silk sleeves trace arcs through the air in perfect formation', color: 'sleeve' },
    { id: 3, act: 'sleeve', icon: '👗', title: '青衣舞袖', subtitle: 'Flowing Sleeve Dance #3', desc: 'Elegant blue and white traditional costumes under stage lights', color: 'sleeve' },
    { id: 4, act: 'sleeve', icon: '✨', title: '翩翩起舞', subtitle: 'Flowing Sleeve Dance #4', desc: 'Full ensemble forming a stunning synchronized wave formation', color: 'sleeve' },
    // Lantern Dance
    { id: 5, act: 'lantern', icon: '🏮', title: '红灯笼舞', subtitle: 'Red Lantern Dance #1', desc: 'Youth performers in red costumes with glowing traditional lanterns', color: 'lantern' },
    { id: 6, act: 'lantern', icon: '🔴', title: '万红齐放', subtitle: 'Red Lantern Dance #2', desc: 'A sea of red against vibrant stage lighting — joyful New Year spirit', color: 'lantern' },
    { id: 7, act: 'lantern', icon: '🎊', title: '新春大汇演', subtitle: 'Red Lantern Dance #3', desc: 'Synchronized choreography by young performers in bright costumes', color: 'lantern' },
    { id: 8, act: 'lantern', icon: '❤️', title: '童心飞扬', subtitle: 'Red Lantern Dance #4', desc: 'Children dancing with joy, celebrating the Year of the Horse', color: 'lantern' },
    // Fan Dance
    { id: 9, act: 'fan', icon: '🪭', title: '扇舞翩翩', subtitle: 'Fan Dance #1', desc: 'Large silk fans bloom open in sweeping, synchronized formations', color: 'fan' },
    { id: 10, act: 'fan', icon: '🌸', title: '扇动春风', subtitle: 'Fan Dance #2', desc: 'Dancers wave fans to simulate the gentle breeze of spring', color: 'fan' },
    { id: 11, act: 'fan', icon: '🎭', title: '古典水袖扇', subtitle: 'Fan Dance #3', desc: 'Combining fans with water sleeves in stunning classical style', color: 'fan' },
    { id: 12, act: 'fan', icon: '🐴', title: '马年圆满', subtitle: 'Fan Dance — Grand Finale', desc: 'A breathtaking finale celebrating the glorious Year of the Horse', color: 'fan' },
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
        el.setAttribute('aria-label', `${item.title} — ${item.subtitle}`);
        el.innerHTML = `
      <div class="gallery-item-inner">
        <div class="gallery-item-icon">${item.icon}</div>
        <div class="gallery-item-title">${item.title}</div>
        <div class="gallery-item-sub">${item.subtitle}</div>
      </div>
      <div class="gallery-overlay"><div class="gallery-overlay-icon">🔍</div></div>
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

    // Build a rich visual placeholder since we don't have direct image URLs
    lightboxPlaceholder.innerHTML = `
    <div style="text-align:center; padding: 40px;">
      <div style="font-size: 6rem; margin-bottom: 24px; filter: drop-shadow(0 0 30px rgba(255,255,255,0.2));">${item.icon}</div>
      <div style="font-family: 'Noto Serif SC', serif; font-size: 1.8rem; font-weight: 900; color: #fff9f5; letter-spacing: 0.06em; margin-bottom: 8px;">${item.title}</div>
      <div style="font-size: 0.9rem; color: #d4a017; letter-spacing: 0.12em; text-transform: uppercase; margin-bottom: 20px;">${item.subtitle}</div>
      <div style="font-size: 0.88rem; color: #b89a8a; max-width: 380px; margin: 0 auto; line-height: 1.7;">${item.desc}</div>
      <a href="https://1drv.ms/a/c/59d5233fde0a1292/IgDm9cy3ZoCfTrFjH7hw_Z0wAazQ6bXKAzQyrQAPqWmcy9c?e=sxQACO"
         target="_blank" rel="noopener"
         style="display:inline-block; margin-top: 28px; padding: 10px 28px; background: rgba(212,160,23,0.15); border: 1px solid rgba(212,160,23,0.3); border-radius: 30px; color: #f5c842; font-size: 0.82rem; letter-spacing: 0.08em; text-transform: uppercase; text-decoration: none;">
        View Full Album ↗
      </a>
    </div>
  `;
    lightboxCaption.textContent = `${currentLightboxIndex + 1} / ${filteredItems.length} — ${item.title}`;
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
