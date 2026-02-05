// DOM Elements
const mobileToggle = document.getElementById('mobileToggle');
const navMenu = document.getElementById('navMenu');
const filterButtons = document.querySelectorAll('.filter-btn');
const galleryItems = document.querySelectorAll('.gallery-item');
const testimonialSlides = document.querySelectorAll('.testimonial-slide');
const sliderDots = document.querySelectorAll('.slider-dot');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
const lightboxClose = document.getElementById('lightboxClose');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const galleryImages = document.querySelectorAll('.gallery-item img');
const contactForm = document.getElementById('contactForm');
const currentYearSpan = document.getElementById('currentYear');

// Global variables
let currentSlide = 0;
let currentImageIndex = 0;
let slideInterval;

// Initialize the website
function init() {
    // Set current year in footer
    currentYearSpan.textContent = new Date().getFullYear();
    
    // Initialize event listeners
    setupEventListeners();
    
    // Start testimonial slider
    startTestimonialSlider();
    
    // Initialize smooth scrolling
    initSmoothScrolling();
}

// Set up all event listeners
function setupEventListeners() {
    // Mobile Navigation Toggle
    mobileToggle.addEventListener('click', toggleMobileMenu);
    
    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', closeMobileMenu);
    });
    
    // Header scroll effect
    window.addEventListener('scroll', handleHeaderScroll);
    
    // Gallery Filtering
    filterButtons.forEach(button => {
        button.addEventListener('click', () => filterGallery(button));
    });
    
    // Testimonial slider dots
    sliderDots.forEach((dot, index) => {
        dot.addEventListener('click', () => showSlide(index));
    });
    
    // Lightbox functionality
    galleryImages.forEach((img, index) => {
        img.addEventListener('click', () => openLightbox(index));
    });
    
    lightboxClose.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) closeLightbox();
    });
    
    prevBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        navigateLightbox('prev');
    });
    
    nextBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        navigateLightbox('next');
    });
    
    // Keyboard navigation for lightbox
    document.addEventListener('keydown', handleKeyboardNavigation);
    
    // Contact form submission
    contactForm.addEventListener('submit', handleContactFormSubmit);
}

// Mobile menu functions
function toggleMobileMenu() {
    navMenu.classList.toggle('active');
    mobileToggle.innerHTML = navMenu.classList.contains('active') 
        ? '<i class="fas fa-times"></i>' 
        : '<i class="fas fa-bars"></i>';
}

function closeMobileMenu() {
    navMenu.classList.remove('active');
    mobileToggle.innerHTML = '<i class="fas fa-bars"></i>';
}

// Header scroll effect
function handleHeaderScroll() {
    const header = document.getElementById('header');
    if (window.scrollY > 100) {
        header.style.padding = '10px 0';
        header.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.padding = '20px 0';
        header.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
    }
}

// Gallery filtering
function filterGallery(button) {
    // Remove active class from all buttons
    filterButtons.forEach(btn => btn.classList.remove('active'));
    // Add active class to clicked button
    button.classList.add('active');
    
    const filterValue = button.getAttribute('data-filter');
    
    galleryItems.forEach(item => {
        if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    });
}

// Testimonial slider functions
function showSlide(n) {
    // Hide all slides
    testimonialSlides.forEach(slide => slide.classList.remove('active'));
    // Remove active class from all dots
    sliderDots.forEach(dot => dot.classList.remove('active'));
    
    // Show the correct slide
    testimonialSlides[n].classList.add('active');
    sliderDots[n].classList.add('active');
    currentSlide = n;
}

function startTestimonialSlider() {
    // Show first slide immediately
    showSlide(0);
    
    // Auto-advance slides every 5 seconds
    slideInterval = setInterval(() => {
        currentSlide = (currentSlide + 1) % testimonialSlides.length;
        showSlide(currentSlide);
    }, 5000);
}

// Lightbox functions
function openLightbox(index) {
    lightbox.classList.add('active');
    lightboxImg.src = galleryImages[index].src;
    currentImageIndex = index;
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = 'auto';
}

function navigateLightbox(direction) {
    if (direction === 'prev') {
        currentImageIndex = (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
    } else {
        currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
    }
    lightboxImg.src = galleryImages[currentImageIndex].src;
}

// Keyboard navigation
function handleKeyboardNavigation(e) {
    if (lightbox.classList.contains('active')) {
        if (e.key === 'Escape') {
            closeLightbox();
        } else if (e.key === 'ArrowLeft') {
            navigateLightbox('prev');
        } else if (e.key === 'ArrowRight') {
            navigateLightbox('next');
        }
    }
}

// Contact form handling
function handleContactFormSubmit(e) {
    e.preventDefault();
    
    // Get form values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const service = document.getElementById('service').value;
    const message = document.getElementById('message').value;
    
    // Basic form validation
    if (!name || !email || !phone || !service || !message) {
        alert('Please fill in all required fields.');
        return;
    }
    
    // In a real application, you would send this data to a server
    // For this template, we'll just show an alert
    alert(`Thank you, ${name}! Your message has been sent. We'll contact you at ${phone} or ${email} within 24 hours.`);
    
    // Reset the form
    contactForm.reset();
}

// Smooth scrolling for anchor links
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (navMenu.classList.contains('active')) {
                    closeMobileMenu();
                }
            }
        });
    });
}

// Initialize the website when DOM is loaded
document.addEventListener('DOMContentLoaded', init);