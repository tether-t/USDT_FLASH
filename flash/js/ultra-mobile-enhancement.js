// Ultra Professional Mobile Enhancement JavaScript

document.addEventListener('DOMContentLoaded', function() {
    
    // Mobile Detection
    const isMobile = window.innerWidth <= 768;
    const isTouch = 'ontouchstart' in window;
    
    if (isMobile) {
        
        // Enhanced Touch Interactions
        document.body.classList.add('mobile-optimized');
        
        // Smooth Scroll Enhancement
        document.documentElement.style.scrollBehavior = 'smooth';
        
        // Touch Feedback
        const touchElements = document.querySelectorAll('button, a, .cursor-pointer');
        touchElements.forEach(element => {
            element.addEventListener('touchstart', function() {
                this.style.transform = 'scale(0.95)';
                this.style.transition = 'transform 0.1s ease';
            });
            
            element.addEventListener('touchend', function() {
                this.style.transform = 'scale(1)';
            });
        });
        
        // Mobile Menu Auto-Close
        const mobileMenu = document.getElementById('mobileMenu');
        const menuItems = mobileMenu?.querySelectorAll('button');
        
        menuItems?.forEach(item => {
            item.addEventListener('click', () => {
                setTimeout(() => {
                    if (mobileMenu.classList.contains('opacity-100')) {
                        toggleMobileMenu();
                    }
                }, 300);
            });
        });
        
        // Viewport Height Fix for Mobile
        function setVH() {
            const vh = window.innerHeight * 0.01;
            document.documentElement.style.setProperty('--vh', `${vh}px`);
        }
        
        setVH();
        window.addEventListener('resize', setVH);
        window.addEventListener('orientationchange', () => {
            setTimeout(setVH, 100);
        });
        
        // Optimize Images for Mobile
        const images = document.querySelectorAll('img');
        images.forEach(img => {
            img.loading = 'lazy';
            img.style.maxWidth = '100%';
            img.style.height = 'auto';
        });
        
        // Mobile Form Enhancement
        const inputs = document.querySelectorAll('input, textarea, select');
        inputs.forEach(input => {
            input.addEventListener('focus', function() {
                this.scrollIntoView({ behavior: 'smooth', block: 'center' });
            });
        });
        
        // Prevent Zoom on Input Focus
        const metaViewport = document.querySelector('meta[name="viewport"]');
        if (metaViewport) {
            metaViewport.setAttribute('content', 
                'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no'
            );
        }
        
        // Mobile Performance Optimization
        const videos = document.querySelectorAll('video');
        videos.forEach(video => {
            video.preload = 'metadata';
            video.playsInline = true;
        });
        
        // Swipe Gestures for Testimonials
        const testimonialSlider = document.querySelector('.testimonials-slider');
        if (testimonialSlider) {
            let startX = 0;
            let currentX = 0;
            
            testimonialSlider.addEventListener('touchstart', (e) => {
                startX = e.touches[0].clientX;
            });
            
            testimonialSlider.addEventListener('touchmove', (e) => {
                currentX = e.touches[0].clientX;
            });
            
            testimonialSlider.addEventListener('touchend', () => {
                const diffX = startX - currentX;
                if (Math.abs(diffX) > 50) {
                    if (diffX > 0) {
                        // Swipe left - next
                        document.getElementById('next-testimonial')?.click();
                    } else {
                        // Swipe right - previous
                        document.getElementById('prev-testimonial')?.click();
                    }
                }
            });
        }
        
        // Mobile Navigation Enhancement
        const navLinks = document.querySelectorAll('a[href^="#"]');
        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    const offset = 80; // Header height
                    const targetPosition = target.offsetTop - offset;
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
        
        // Mobile Loading Optimization
        window.addEventListener('load', () => {
            // Remove loading states
            document.body.classList.add('loaded');
            
            // Optimize animations for mobile
            const animations = document.querySelectorAll('[class*="animate-"]');
            animations.forEach(element => {
                element.style.animationDuration = '0.5s';
            });
        });
        
        // Battery and Performance Awareness
        if ('getBattery' in navigator) {
            navigator.getBattery().then(battery => {
                if (battery.level < 0.2) {
                    // Reduce animations for low battery
                    document.body.classList.add('low-battery');
                    const style = document.createElement('style');
                    style.textContent = `
                        .low-battery * {
                            animation-duration: 0.1s !important;
                            transition-duration: 0.1s !important;
                        }
                    `;
                    document.head.appendChild(style);
                }
            });
        }
        
        // Connection Awareness
        if ('connection' in navigator) {
            const connection = navigator.connection;
            if (connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g') {
                // Optimize for slow connections
                videos.forEach(video => {
                    video.preload = 'none';
                });
                
                images.forEach(img => {
                    if (img.src.includes('.jpg') || img.src.includes('.png')) {
                        img.style.filter = 'blur(1px)';
                        img.addEventListener('load', () => {
                            img.style.filter = 'none';
                        });
                    }
                });
            }
        }
    }
    
    // Responsive Text Scaling
    function adjustTextSize() {
        const screenWidth = window.innerWidth;
        const baseSize = 16;
        let scaleFactor = 1;
        
        if (screenWidth < 480) {
            scaleFactor = 0.9;
        } else if (screenWidth < 768) {
            scaleFactor = 0.95;
        }
        
        document.documentElement.style.fontSize = `${baseSize * scaleFactor}px`;
    }
    
    adjustTextSize();
    window.addEventListener('resize', adjustTextSize);
    
    // Mobile-Specific Error Handling
    window.addEventListener('error', (e) => {
        if (isMobile) {
            console.log('Mobile error handled:', e.message);
            // Graceful degradation for mobile
        }
    });
    
});

// Mobile Utility Functions
const MobileUtils = {
    
    // Check if device is mobile
    isMobile: () => window.innerWidth <= 768,
    
    // Check if device supports touch
    isTouch: () => 'ontouchstart' in window,
    
    // Get device orientation
    getOrientation: () => window.innerHeight > window.innerWidth ? 'portrait' : 'landscape',
    
    // Vibrate if supported
    vibrate: (pattern = 50) => {
        if ('vibrate' in navigator) {
            navigator.vibrate(pattern);
        }
    },
    
    // Show mobile-friendly alert
    showAlert: (message) => {
        if (MobileUtils.isMobile()) {
            const alert = document.createElement('div');
            alert.className = 'mobile-alert';
            alert.textContent = message;
            alert.style.cssText = `
                position: fixed;
                top: 20px;
                left: 50%;
                transform: translateX(-50%);
                background: #26a17b;
                color: white;
                padding: 1rem 2rem;
                border-radius: 1rem;
                z-index: 9999;
                font-weight: bold;
                box-shadow: 0 10px 30px rgba(0,0,0,0.3);
            `;
            document.body.appendChild(alert);
            
            setTimeout(() => {
                alert.remove();
            }, 3000);
        } else {
            alert(message);
        }
    }
};

// Export for global use
window.MobileUtils = MobileUtils;