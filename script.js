/* ============================================================
   G&R Landmark — script.js
   ============================================================ */

// ---- DOM REFERENCES ----
const mobileToggle   = document.getElementById('mobileToggle');
const navMenu        = document.getElementById('navMenu');
const filterButtons  = document.querySelectorAll('.filter-btn');
const galleryItems   = document.querySelectorAll('.gallery-item');
const testimonialSlides = document.querySelectorAll('.testimonial-slide');
const sliderDots     = document.querySelectorAll('.slider-dot');
const lightbox       = document.getElementById('lightbox');
const lightboxImg    = document.getElementById('lightboxImg');
const lightboxClose  = document.getElementById('lightboxClose');
const prevBtn        = document.getElementById('prevBtn');
const nextBtn        = document.getElementById('nextBtn');
const galleryImages  = document.querySelectorAll('.gallery-item img');
const contactForm    = document.getElementById('contactForm');
const currentYearSpan = document.getElementById('currentYear');
const floatCallBtn   = document.getElementById('floatCallBtn');

// ---- STATE ----
let currentSlide = 0;
let currentImageIndex = 0;
let slideInterval;

// ============================================================
// INIT
// ============================================================
function init() {
    if (currentYearSpan) currentYearSpan.textContent = new Date().getFullYear();
    buildGallery();           // ← build gallery from config FIRST
    setupEventListeners();
    initSmoothScrolling();
    initScrollAnimations();
}

// ============================================================
// EVENT LISTENERS
// ============================================================
function setupEventListeners() {
    // Mobile nav toggle
    if (mobileToggle) mobileToggle.addEventListener('click', toggleMobileMenu);

    // Close mobile nav when a link is clicked
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', closeMobileMenu);
    });

    // Header shrink on scroll
    window.addEventListener('scroll', handleHeaderScroll, { passive: true });

    // Float call button visibility
    window.addEventListener('scroll', handleFloatBtn, { passive: true });

    // Lightbox close
    if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
    if (lightbox) lightbox.addEventListener('click', e => { if (e.target === lightbox) closeLightbox(); });

    // Lightbox nav
    if (prevBtn) prevBtn.addEventListener('click', e => {
        e.stopPropagation();
        const imgs = lightbox._imgs || document.querySelectorAll('.gallery-item img');
        const total = imgs.length;
        currentImageIndex = (currentImageIndex - 1 + total) % total;
        lightboxImg.src = imgs[currentImageIndex].src;
        lightboxImg.alt = imgs[currentImageIndex].alt;
    });
    if (nextBtn) nextBtn.addEventListener('click', e => {
        e.stopPropagation();
        const imgs = lightbox._imgs || document.querySelectorAll('.gallery-item img');
        const total = imgs.length;
        currentImageIndex = (currentImageIndex + 1) % total;
        lightboxImg.src = imgs[currentImageIndex].src;
        lightboxImg.alt = imgs[currentImageIndex].alt;
    });

    // Keyboard
    document.addEventListener('keydown', handleKeyboard);

    // Contact form
    if (contactForm) contactForm.addEventListener('submit', handleFormSubmit);
}

// ============================================================
// MOBILE NAV
// ============================================================
function toggleMobileMenu() {
    const open = navMenu.classList.toggle('active');
    mobileToggle.innerHTML = open
        ? '<i class="fas fa-times" style="color:#fff"></i>'
        : '<i class="fas fa-bars"></i>';
    document.body.style.overflow = open ? 'hidden' : '';
}

function closeMobileMenu() {
    navMenu.classList.remove('active');
    mobileToggle.innerHTML = '<i class="fas fa-bars"></i>';
    document.body.style.overflow = '';
}

// ============================================================
// HEADER SCROLL EFFECT
// ============================================================
function handleHeaderScroll() {
    const header = document.getElementById('header');
    if (!header) return;
    if (window.scrollY > 80) {
        header.style.boxShadow = '0 4px 20px rgba(0,0,0,.12)';
    } else {
        header.style.boxShadow = '0 2px 8px rgba(0,0,0,.08)';
    }
}

// ============================================================
// FLOAT CALL BUTTON (mobile) — hide near top / show after scroll
// ============================================================
function handleFloatBtn() {
    if (!floatCallBtn) return;
    floatCallBtn.style.opacity = window.scrollY > 400 ? '1' : '0';
    floatCallBtn.style.pointerEvents = window.scrollY > 400 ? 'all' : 'none';
}

// ============================================================
// DYNAMIC GALLERY — reads from images.config.js
// ============================================================
function buildGallery() {
    const grid        = document.getElementById('galleryGrid');
    const filterBar   = document.getElementById('galleryFilter');
    if (!grid || typeof GALLERY_CONFIG === 'undefined') return;

    grid.innerHTML        = '';
    // Remove any previously injected category buttons (keep "All Projects")
    filterBar.querySelectorAll('[data-filter]:not([data-filter="all"])').forEach(b => b.remove());

    const categories = Object.keys(GALLERY_CONFIG);

    categories.forEach(catKey => {
        const cat    = GALLERY_CONFIG[catKey];
        const images = cat.images || [];

        // ---- Build filter button for this category ----
        const btn = document.createElement('button');
        btn.className       = 'filter-btn';
        btn.dataset.filter  = catKey;
        btn.textContent     = cat.label;
        filterBar.appendChild(btn);

        // ---- Build gallery cards ----
        if (images.length > 0) {
            images.forEach(img => {
                grid.appendChild(createGalleryCard(catKey, cat.folder + img.file, img.title, img.caption, img.file));
            });
        } else {
            // Use fallback image so gallery never looks empty
            const fb = (typeof FALLBACK_IMAGES !== 'undefined' && FALLBACK_IMAGES[catKey]);
            if (fb) {
                grid.appendChild(createGalleryCard(catKey, fb.src, fb.title, fb.caption, fb.title));
            }
        }
    });

    // Re-bind filter clicks now that buttons exist
    document.querySelectorAll('.filter-btn').forEach(button => {
        button.addEventListener('click', () => filterGallery(button));
    });

    // Re-bind lightbox clicks
    rebindLightbox();
}

function createGalleryCard(category, src, title, caption, altText) {
    const item = document.createElement('div');
    item.className          = 'gallery-item';
    item.dataset.category   = category;

    const img = document.createElement('img');
    img.src     = src;
    img.alt     = `${title} — G&R Landmark renovation in Concord & Charlotte NC`;
    img.loading = 'lazy';

    const overlay = document.createElement('div');
    overlay.className = 'gallery-overlay';
    overlay.innerHTML = `<h3>${title}</h3><p>${caption}</p>`;

    item.appendChild(img);
    item.appendChild(overlay);
    return item;
}

function rebindLightbox() {
    const imgs = document.querySelectorAll('.gallery-item img');
    imgs.forEach((img, index) => {
        img.addEventListener('click', () => openLightboxDynamic(index, imgs));
    });
}

function openLightboxDynamic(index, imgNodeList) {
    if (!lightbox) return;
    const imgs = imgNodeList || document.querySelectorAll('.gallery-item img');
    lightbox.classList.add('active');
    lightboxImg.src = imgs[index].src;
    lightboxImg.alt = imgs[index].alt;
    currentImageIndex = index;
    document.body.style.overflow = 'hidden';

    // Store current set for nav
    lightbox._imgs = imgs;
}


function filterGallery(button) {
    // Query fresh — buttons and items are injected dynamically after page load
    document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');

    const filter = button.getAttribute('data-filter');
    document.querySelectorAll('.gallery-item').forEach(item => {
        const match = filter === 'all' || item.getAttribute('data-category') === filter;
        item.style.display = match ? 'block' : 'none';
        if (match) item.style.animation = 'fadeIn .4s ease both';
    });
}

// ============================================================
// TESTIMONIAL SLIDER
// ============================================================
function showSlide(n) {
    testimonialSlides.forEach(s => s.classList.remove('active'));
    sliderDots.forEach(d => { d.classList.remove('active'); d.setAttribute('aria-selected', 'false'); });
    testimonialSlides[n].classList.add('active');
    sliderDots[n].classList.add('active');
    sliderDots[n].setAttribute('aria-selected', 'true');
    currentSlide = n;
}

function startTestimonialSlider() {
    showSlide(0);
    slideInterval = setInterval(() => {
        showSlide((currentSlide + 1) % testimonialSlides.length);
    }, 6000);
}

function restartSlider() {
    clearInterval(slideInterval);
    slideInterval = setInterval(() => {
        showSlide((currentSlide + 1) % testimonialSlides.length);
    }, 6000);
}

// ============================================================
// LIGHTBOX
// ============================================================
function openLightbox(index) {
    if (!lightbox) return;
    lightbox.classList.add('active');
    lightboxImg.src = galleryImages[index].src;
    lightboxImg.alt = galleryImages[index].alt;
    currentImageIndex = index;
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
}

function navigateLightbox(direction) {
    const total = galleryImages.length;
    currentImageIndex = direction === 'prev'
        ? (currentImageIndex - 1 + total) % total
        : (currentImageIndex + 1) % total;
    lightboxImg.src = galleryImages[currentImageIndex].src;
    lightboxImg.alt = galleryImages[currentImageIndex].alt;
}

function handleKeyboard(e) {
    if (!lightbox.classList.contains('active')) return;
    if (e.key === 'Escape')       closeLightbox();
    if (e.key === 'ArrowLeft')    navigateLightbox('prev');
    if (e.key === 'ArrowRight')   navigateLightbox('next');
}

// ============================================================
// CONTACT FORM
// ============================================================
function handleFormSubmit(e) {
    e.preventDefault();

    const name    = document.getElementById('name')?.value.trim();
    const email   = document.getElementById('email')?.value.trim();
    const phone   = document.getElementById('phone')?.value.trim();
    const service = document.getElementById('service')?.value;
    const city    = document.getElementById('city')?.value.trim();

    if (!name || !email || !phone || !service || !city) {
        showFormError('Please fill in all required fields.');
        return;
    }
    if (!isValidEmail(email)) {
        showFormError('Please enter a valid email address.');
        return;
    }

    // Disable button during send
    const btn = contactForm.querySelector('button[type="submit"]');
    btn.disabled = true;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending…';

    // -------------------------------------------------------
    // WEB3FORMS — replace YOUR_ACCESS_KEY_HERE with the key
    // from web3forms.com (free, takes 30 seconds to get)
    // -------------------------------------------------------
    const message = document.getElementById('message')?.value.trim();

    const formData = {
        access_key: 'cf18a218-d609-4de9-97d8-2f88a769c81c',
        subject:    `New Estimate Request from ${name} — G&R Landmark`,
        from_name:  'G&R Landmark Website',
        name,
        email,
        phone,
        service,
        city,
        message: message || '(no message provided)',
    };

    fetch('https://api.web3forms.com/submit', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body:    JSON.stringify(formData),
    })
    .then(res => res.json())
    .then(data => {
        btn.disabled = false;
        btn.innerHTML = '<i class="fas fa-paper-plane"></i> Send My Free Estimate Request';
        if (data.success) {
            showFormSuccess(name, phone);
            contactForm.reset();
        } else {
            showFormError('Something went wrong. Please call us directly at (704) 652-2325.');
        }
    })
    .catch(() => {
        btn.disabled = false;
        btn.innerHTML = '<i class="fas fa-paper-plane"></i> Send My Free Estimate Request';
        showFormError('Network error. Please call us directly at (704) 652-2325.');
    });
}

function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function showFormError(msg) {
    removeFormMessage();
    const el = document.createElement('p');
    el.className = 'form-msg form-msg--error';
    el.innerHTML = `<i class="fas fa-exclamation-circle"></i> ${msg}`;
    el.style.cssText = 'color:#c0392b;background:#fdf1f1;border:1px solid #e9b2b2;padding:12px 16px;border-radius:6px;font-size:.9rem;margin-bottom:12px;';
    contactForm.prepend(el);
}

function showFormSuccess(name, phone) {
    removeFormMessage();
    const el = document.createElement('p');
    el.className = 'form-msg form-msg--success';
    el.innerHTML = `<i class="fas fa-check-circle"></i> Thanks, ${name}! We'll be in touch at <strong>${phone}</strong> within 1 business day.`;
    el.style.cssText = 'color:#1a6f3c;background:#f0faf5;border:1px solid #a8dbbe;padding:12px 16px;border-radius:6px;font-size:.9rem;margin-bottom:12px;';
    contactForm.prepend(el);
    setTimeout(removeFormMessage, 8000);
}

function removeFormMessage() {
    document.querySelectorAll('.form-msg').forEach(el => el.remove());
}

// ============================================================
// SMOOTH SCROLLING
// ============================================================
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (!targetId || targetId === '#') return;
            const target = document.querySelector(targetId);
            if (!target) return;
            e.preventDefault();
            window.scrollTo({ top: target.offsetTop - 72, behavior: 'smooth' });
            if (navMenu.classList.contains('active')) closeMobileMenu();
        });
    });
}

// ============================================================
// SCROLL-TRIGGERED ENTRANCE ANIMATIONS
// ============================================================
function initScrollAnimations() {
    const targets = document.querySelectorAll(
        '.service-card, .feature-item, .gallery-item, .area-pill, .contact-item'
    );

    if (!('IntersectionObserver' in window)) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeUp .55s ease both';
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12 });

    targets.forEach(el => {
        el.style.opacity = '0';
        observer.observe(el);
    });
}

// ============================================================
// KICK OFF
// ============================================================
document.addEventListener('DOMContentLoaded', init);
