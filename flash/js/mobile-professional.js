/* 📱 Professional Mobile JavaScript */

// Mobile Detection and Optimization
function isMobileDevice() {
    return window.innerWidth <= 768 || /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

// Mobile-specific optimizations
function initMobileOptimizations() {
    if (!isMobileDevice()) return;
    
    // Optimize touch interactions
    document.body.style.touchAction = 'manipulation';
    
    // Prevent zoom on double tap
    let lastTouchEnd = 0;
    document.addEventListener('touchend', function (event) {
        const now = (new Date()).getTime();
        if (now - lastTouchEnd <= 300) {
            event.preventDefault();
        }
        lastTouchEnd = now;
    }, false);
    
    // Optimize scrolling
    document.body.style.webkitOverflowScrolling = 'touch';
    document.body.style.overscrollBehavior = 'contain';
    
    // Add mobile-specific classes
    document.body.classList.add('mobile-optimized');
    
    // Optimize package cards for mobile
    optimizePackageCards();
    
    // Optimize testimonials for mobile
    optimizeTestimonials();
    
    // Add mobile navigation helpers
    addMobileNavigationHelpers();
}

// Optimize package cards for mobile
function optimizePackageCards() {
    const packageCards = document.querySelectorAll('.package-card');
    packageCards.forEach((card, index) => {
        // Add mobile-specific styling
        card.style.marginBottom = '20px';
        card.style.borderRadius = '12px';
        card.style.boxShadow = '0 4px 20px rgba(0,0,0,0.1)';
        
        // Improve button accessibility
        const button = card.querySelector('button');
        if (button) {
            button.style.minHeight = '48px';
            button.style.fontSize = '16px';
            button.style.fontWeight = '600';
            
            // Add haptic feedback simulation
            button.addEventListener('touchstart', function() {
                this.style.transform = 'scale(0.98)';
            });
            
            button.addEventListener('touchend', function() {
                this.style.transform = 'scale(1)';
            });
        }
        
        // Add swipe indicators for mobile
        if (index === 0) {
            addSwipeIndicator(card);
        }
    });
}

// Add swipe indicator
function addSwipeIndicator(element) {
    const indicator = document.createElement('div');
    indicator.innerHTML = '← Swipe to see more packages →';
    indicator.style.cssText = `
        text-align: center;
        color: #666;
        font-size: 12px;
        margin-top: 10px;
        padding: 8px;
        background: rgba(255,255,255,0.8);
        border-radius: 20px;
        animation: fadeInOut 3s infinite;
    `;
    
    element.appendChild(indicator);
    
    // Remove after user interaction
    setTimeout(() => {
        if (indicator.parentNode) {
            indicator.remove();
        }
    }, 10000);
}

// Optimize testimonials for mobile
function optimizeTestimonials() {
    const testimonialSlider = document.querySelector('.testimonials-slider');
    if (testimonialSlider) {
        // Add touch swipe support
        let startX = 0;
        let currentX = 0;
        let isDragging = false;
        
        testimonialSlider.addEventListener('touchstart', function(e) {
            startX = e.touches[0].clientX;
            isDragging = true;
        });
        
        testimonialSlider.addEventListener('touchmove', function(e) {
            if (!isDragging) return;
            currentX = e.touches[0].clientX;
            const diffX = startX - currentX;
            
            if (Math.abs(diffX) > 50) {
                if (diffX > 0) {
                    // Swipe left - next testimonial
                    const nextBtn = document.getElementById('next-testimonial');
                    if (nextBtn) nextBtn.click();
                } else {
                    // Swipe right - previous testimonial
                    const prevBtn = document.getElementById('prev-testimonial');
                    if (prevBtn) prevBtn.click();
                }
                isDragging = false;
            }
        });
        
        testimonialSlider.addEventListener('touchend', function() {
            isDragging = false;
        });
    }
}

// Add mobile navigation helpers
function addMobileNavigationHelpers() {
    // Add floating back to top button
    const backToTop = document.createElement('button');
    backToTop.innerHTML = '<i class="fas fa-arrow-up"></i>';
    backToTop.style.cssText = `
        position: fixed;
        bottom: 80px;
        right: 20px;
        width: 48px;
        height: 48px;
        background: linear-gradient(135deg, #26a17b, #1a8462);
        color: white;
        border: none;
        border-radius: 50%;
        box-shadow: 0 4px 15px rgba(38, 161, 123, 0.3);
        z-index: 1000;
        opacity: 0;
        transform: scale(0);
        transition: all 0.3s ease;
        font-size: 16px;
    `;
    
    document.body.appendChild(backToTop);
    
    // Show/hide back to top button
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            backToTop.style.opacity = '1';
            backToTop.style.transform = 'scale(1)';
        } else {
            backToTop.style.opacity = '0';
            backToTop.style.transform = 'scale(0)';
        }
    });
    
    backToTop.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Add section navigation dots
    addSectionDots();
}

// Add section navigation dots
function addSectionDots() {
    const sections = ['main-content', 'pricing', 'how', 'testimonials'];
    const dotsContainer = document.createElement('div');
    dotsContainer.style.cssText = `
        position: fixed;
        right: 10px;
        top: 50%;
        transform: translateY(-50%);
        z-index: 1000;
        display: flex;
        flex-direction: column;
        gap: 8px;
    `;
    
    sections.forEach((sectionId, index) => {
        const dot = document.createElement('button');
        dot.style.cssText = `
            width: 8px;
            height: 8px;
            border-radius: 50%;
            border: none;
            background: rgba(255,255,255,0.5);
            transition: all 0.3s ease;
        `;
        
        dot.addEventListener('click', function() {
            const section = document.getElementById(sectionId);
            if (section) {
                section.scrollIntoView({ behavior: 'smooth' });
            }
        });
        
        dotsContainer.appendChild(dot);
    });
    
    document.body.appendChild(dotsContainer);
    
    // Update active dot on scroll
    window.addEventListener('scroll', function() {
        const dots = dotsContainer.querySelectorAll('button');
        sections.forEach((sectionId, index) => {
            const section = document.getElementById(sectionId);
            if (section) {
                const rect = section.getBoundingClientRect();
                if (rect.top <= 100 && rect.bottom >= 100) {
                    dots[index].style.background = '#26a17b';
                    dots[index].style.transform = 'scale(1.5)';
                } else {
                    dots[index].style.background = 'rgba(255,255,255,0.5)';
                    dots[index].style.transform = 'scale(1)';
                }
            }
        });
    });
}

// Mobile-specific animations
function addMobileAnimations() {
    if (!isMobileDevice()) return;
    
    // Intersection Observer for mobile animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    // Observe elements for animation
    const animateElements = document.querySelectorAll('.package-card, .testimonial-slide, .step-item, .comparison-container');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'all 0.6s ease';
        observer.observe(el);
    });
}

// Mobile performance optimizations
function optimizeMobilePerformance() {
    if (!isMobileDevice()) return;
    
    // Lazy load images
    const images = document.querySelectorAll('img');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                }
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => {
        if (img.src && !img.dataset.src) {
            img.dataset.src = img.src;
            img.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMSIgaGVpZ2h0PSIxIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9IiNjY2MiLz48L3N2Zz4=';
        }
        imageObserver.observe(img);
    });
    
    // Reduce animation complexity on mobile
    const style = document.createElement('style');
    style.textContent = `
        @media (max-width: 768px) {
            * {
                animation-duration: 0.3s !important;
                transition-duration: 0.3s !important;
            }
            
            .animate-pulse,
            .animate-bounce,
            .animate-ping {
                animation: none !important;
            }
        }
    `;
    document.head.appendChild(style);
}

// Mobile viewport optimization
function optimizeMobileViewport() {
    // Ensure proper viewport scaling
    let viewport = document.querySelector('meta[name="viewport"]');
    if (!viewport) {
        viewport = document.createElement('meta');
        viewport.name = 'viewport';
        document.head.appendChild(viewport);
    }
    viewport.content = 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover';
    
    // Add mobile-specific meta tags
    const mobileOptimized = document.createElement('meta');
    mobileOptimized.name = 'mobile-web-app-capable';
    mobileOptimized.content = 'yes';
    document.head.appendChild(mobileOptimized);
    
    const statusBar = document.createElement('meta');
    statusBar.name = 'apple-mobile-web-app-status-bar-style';
    statusBar.content = 'black-translucent';
    document.head.appendChild(statusBar);
}

// Initialize all mobile optimizations
document.addEventListener('DOMContentLoaded', function() {
    if (isMobileDevice()) {
        optimizeMobileViewport();
        initMobileOptimizations();
        addMobileAnimations();
        optimizeMobilePerformance();
        
        console.log('📱 Mobile Professional Mode Activated');
    }
});

// Handle orientation changes
window.addEventListener('orientationchange', function() {
    setTimeout(() => {
        if (isMobileDevice()) {
            initMobileOptimizations();
        }
    }, 100);
});

// Export functions for global use
window.mobileOptimizations = {
    isMobileDevice,
    initMobileOptimizations,
    optimizePackageCards,
    optimizeTestimonials
};
