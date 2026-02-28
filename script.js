/**
 * KAFES - Friedreich Ataksisi Web Sitesi
 * JavaScript Fonksiyonları
 */

document.addEventListener('DOMContentLoaded', function() {
    // Element seçiciler
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');
    const backToTop = document.getElementById('backToTop');
    const faqItems = document.querySelectorAll('.faq-item');
    const animatedElements = document.querySelectorAll('[data-animate]');
    
    // ================================
    // NAVBAR SCROLL EFEKTİ
    // ================================
    function handleNavbarScroll() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }
    
    window.addEventListener('scroll', handleNavbarScroll, { passive: true });
    
    // ================================
    // MOBİL MENÜ
    // ================================
    function toggleMobileMenu() {
        navMenu.classList.toggle('active');
        const isOpen = navMenu.classList.contains('active');
        
        // Menü açıkken sayfanın scrollunu engelle
        document.body.style.overflow = isOpen ? 'hidden' : '';
        
        // Toggle buton animasyonu
        const spans = navToggle.querySelectorAll('span');
        if (isOpen) {
            spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
        } else {
            spans[0].style.transform = '';
            spans[1].style.opacity = '1';
            spans[2].style.transform = '';
        }
    }
    
    navToggle.addEventListener('click', toggleMobileMenu);
    
    // Menü linklerine tıklandığında menüyü kapat
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu.classList.contains('active')) {
                toggleMobileMenu();
            }
        });
    });
    
    // ================================
    // YUMUŞAK SCROLL
    // ================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const navHeight = navbar.offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // ================================
    // SCROLL ANIMATIONS (Intersection Observer)
    // ================================
    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -50px 0px',
        threshold: 0.1
    };
    
    const animationObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                const delay = element.dataset.delay || 0;
                
                setTimeout(() => {
                    element.classList.add('animated');
                }, delay);
                
                // Bir kez animasyon oynadıktan sonra observer'dan kaldır
                animationObserver.unobserve(element);
            }
        });
    }, observerOptions);
    
    animatedElements.forEach(el => {
        animationObserver.observe(el);
    });
    
    // ================================
    // FAQ ACCORDION
    // ================================
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Diğer tüm FAQ'ları kapat
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Tıklanan FAQ'yı toggle et
            item.classList.toggle('active');
        });
    });
    
    // ================================
    // BACK TO TOP BUTTON
    // ================================
    function handleBackToTop() {
        if (window.scrollY > 500) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    }
    
    window.addEventListener('scroll', handleBackToTop, { passive: true });
    
    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // ================================
    // PARALAX EFEKTİ (Hero Section)
    // ================================
    const heroContent = document.querySelector('.hero-content');
    const heroBg = document.querySelector('.hero-bg');
    
    function handleParallax() {
        if (window.innerWidth > 768) {
            const scrolled = window.pageYOffset;
            const rate = scrolled * 0.3;
            
            if (heroContent && scrolled < window.innerHeight) {
                heroContent.style.transform = `translateY(${rate}px)`;
                heroContent.style.opacity = 1 - (scrolled / 700);
            }
        }
    }
    
    // Performans için throttle
    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                handleParallax();
                ticking = false;
            });
            ticking = true;
        }
    }, { passive: true });
    
    // ================================
    // PARTIKÜL EFEKTİ (Hero Arka Plan)
    // ================================
    function createParticles() {
        const particlesContainer = document.getElementById('particles');
        if (!particlesContainer) return;
        
        const particleCount = window.innerWidth < 768 ? 15 : 30;
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.cssText = `
                position: absolute;
                width: ${Math.random() * 4 + 2}px;
                height: ${Math.random() * 4 + 2}px;
                background: rgba(255, 255, 255, ${Math.random() * 0.3 + 0.1});
                border-radius: 50%;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                animation: float ${Math.random() * 10 + 10}s infinite ease-in-out;
                animation-delay: ${Math.random() * 5}s;
            `;
            particlesContainer.appendChild(particle);
        }
    }
    
    createParticles();
    
    // ================================
    // TİMLINE ANIMATION
    // ================================
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    const timelineObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 150);
                timelineObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });
    
    timelineItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        timelineObserver.observe(item);
    });
    
    // ================================
    // COUNTER ANIMATION (İstatistikler)
    // ================================
    function animateCounter(element, target, suffix = '') {
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;
        
        const timer = setInterval(() => {
            current += step;
            if (current >= target) {
                element.textContent = target + suffix;
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(current) + suffix;
            }
        }, 16);
    }
    
    // İstatistikleri animasyonla göster
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const statNumbers = entry.target.querySelectorAll('.stat-number');
                statNumbers.forEach(stat => {
                    const text = stat.textContent;
                    
                    // Yüzde veya sayı içeren metinleri işle
                    if (text.includes('%')) {
                        const num = parseInt(text);
                        stat.textContent = '0%';
                        animateCounter(stat, num, '%');
                    } else if (!isNaN(parseInt(text))) {
                        const num = parseInt(text);
                        stat.textContent = '0';
                        animateCounter(stat, num);
                    }
                });
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    const heroStats = document.querySelector('.hero-stats');
    if (heroStats) {
        statsObserver.observe(heroStats);
    }
    
    // ================================
    // CARD HOVER EFFECTS
    // ================================
    const cards = document.querySelectorAll('.info-card, .symptom-card, .treatment-card, .tip-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transition = 'transform 0.3s ease, box-shadow 0.3s ease';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    });
    
    // ================================
    // KEYBOARD NAVIGATION
    // ================================
    document.addEventListener('keydown', (e) => {
        // Escape tuşu ile mobil menüyü kapat
        if (e.key === 'Escape' && navMenu.classList.contains('active')) {
            toggleMobileMenu();
        }
    });
    
    // ================================
    // LOADING STATE
    // ================================
    window.addEventListener('load', () => {
        document.body.classList.add('loaded');
        
        // Hero section elementlerini sırayla göster
        const heroElements = document.querySelectorAll('.hero [data-animate]');
        heroElements.forEach((el, index) => {
            setTimeout(() => {
                el.classList.add('animated');
            }, index * 100);
        });
    });
    
    // ================================
    // PREFERS REDUCED MOTION
    // ================================
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    
    if (prefersReducedMotion.matches) {
        // Tüm animasyonları devre dışı bırak
        document.querySelectorAll('[data-animate]').forEach(el => {
            el.classList.add('animated');
            el.style.transition = 'none';
        });
        
        // Parallax'ı devre dışı bırak
        window.removeEventListener('scroll', handleParallax);
    }
    
    // ================================
    // TİME OF DAY GREETING (Opsiyonel)
    // ================================
    function getGreeting() {
        const hour = new Date().getHours();
        if (hour < 12) return 'Günaydın';
        if (hour < 18) return 'İyi günler';
        return 'İyi akşamlar';
    }
    
    // Konsola bilgilendirme mesajı
    console.log('%c🧬 Kafes - Friedreich Ataksisi Bilgi Platformu', 'color: #6366f1; font-size: 16px; font-weight: bold;');
    console.log('%cBu site bilgilendirme amaçlıdır. Tıbbi tavsiye yerine geçmez.', 'color: #6b7280; font-size: 12px;');
});

// ================================
// YARDIMCI FONKSİYONLAR
// ================================

/**
 * Throttle fonksiyonu - Performans için
 */
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

/**
 * Debounce fonksiyonu - Arama gibi işlemler için
 */
function debounce(func, wait) {
    let timeout;
    return function(...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), wait);
    };
}

/**
 * Smooth scroll polyfill (eski tarayıcılar için)
 */
if (!('scrollBehavior' in document.documentElement.style)) {
    import('https://cdn.jsdelivr.net/npm/smoothscroll-polyfill@0.4.4/dist/smoothscroll.min.js')
        .then(() => {
            window.__forceSmoothScrollPolyfill__ = true;
        })
        .catch(() => {
            console.warn('Smooth scroll polyfill yüklenemedi');
        });
}
