// Mobile Header Scroll Enhancement
(function() {
    'use strict';
    
    // Check if we're on mobile
    function isMobile() {
        return window.innerWidth <= 768;
    }
    
    // Initialize mobile header scroll functionality
    function initMobileHeaderScroll() {
        if (!isMobile()) return;
        
        const header = document.querySelector('.ultra-header');
        if (!header) return;
        
        let scrollTimeout;
        let hasScrolled = false;
        
        // Add scroll event listener
        header.addEventListener('scroll', function() {
            if (!hasScrolled) {
                hasScrolled = true;
                header.classList.add('scrolled');
            }
            
            // Clear existing timeout
            clearTimeout(scrollTimeout);
            
            // Add scrolling class for visual feedback
            header.classList.add('scrolling');
            
            // Remove scrolling class after scroll ends
            scrollTimeout = setTimeout(() => {
                header.classList.remove('scrolling');
            }, 150);
        });
        
        // Auto-hide scroll hint after 5 seconds
        setTimeout(() => {
            header.classList.add('scrolled');
        }, 5000);
        
        // Add touch gesture support
        let startX = 0;
        let scrollLeft = 0;
        let isDown = false;
        
        header.addEventListener('touchstart', function(e) {
            isDown = true;
            startX = e.touches[0].pageX - header.offsetLeft;
            scrollLeft = header.scrollLeft;
        });
        
        header.addEventListener('touchmove', function(e) {
            if (!isDown) return;
            e.preventDefault();
            const x = e.touches[0].pageX - header.offsetLeft;
            const walk = (x - startX) * 2; // Scroll speed multiplier
            header.scrollLeft = scrollLeft - walk;
        });
        
        header.addEventListener('touchend', function() {
            isDown = false;
        });
        
        // Smooth scroll to center navigation icons on load
        setTimeout(() => {
            const navSection = header.querySelector('.nav-icons-section');
            if (navSection) {
                const navRect = navSection.getBoundingClientRect();
                const headerRect = header.getBoundingClientRect();
                const scrollTo = navSection.offsetLeft - (headerRect.width / 2) + (navRect.width / 2);
                
                header.scrollTo({
                    left: Math.max(0, scrollTo),
                    behavior: 'smooth'
                });
            }
        }, 1000);
        
        console.log('Mobile header scroll initialized');
    }
    
    // Add visual feedback for scrollable content
    function addScrollIndicators() {
        if (!isMobile()) return;
        
        const header = document.querySelector('.ultra-header');
        if (!header) return;
        
        // Create scroll indicators
        const leftIndicator = document.createElement('div');
        leftIndicator.className = 'scroll-indicator left';
        leftIndicator.innerHTML = '<i class="fas fa-chevron-left"></i>';
        
        const rightIndicator = document.createElement('div');
        rightIndicator.className = 'scroll-indicator right';
        rightIndicator.innerHTML = '<i class="fas fa-chevron-right"></i>';
        
        // Add styles
        const style = document.createElement('style');
        style.textContent = `
            .scroll-indicator {
                position: absolute;
                top: 50%;
                transform: translateY(-50%);
                width: 30px;
                height: 30px;
                background: rgba(0, 0, 0, 0.7);
                color: white;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 12px;
                z-index: 99999;
                opacity: 0;
                transition: opacity 0.3s ease;
                pointer-events: none;
            }
            
            .scroll-indicator.left {
                left: 5px;
            }
            
            .scroll-indicator.right {
                right: 5px;
            }
            
            .ultra-header:not(.scrolled) .scroll-indicator.right {
                opacity: 0.7;
                animation: pulse 2s infinite;
            }
            
            @keyframes pulse {
                0%, 100% { opacity: 0.7; transform: translateY(-50%) scale(1); }
                50% { opacity: 1; transform: translateY(-50%) scale(1.1); }
            }
        `;
        
        document.head.appendChild(style);
        header.appendChild(leftIndicator);
        header.appendChild(rightIndicator);
        
        // Update indicators based on scroll position
        function updateIndicators() {
            const scrollLeft = header.scrollLeft;
            const maxScroll = header.scrollWidth - header.clientWidth;
            
            leftIndicator.style.opacity = scrollLeft > 10 ? '0.7' : '0';
            rightIndicator.style.opacity = scrollLeft < maxScroll - 10 ? '0.7' : '0';
        }
        
        header.addEventListener('scroll', updateIndicators);
        updateIndicators();
    }
    
    // Optimize header performance on mobile
    function optimizeHeaderPerformance() {
        if (!isMobile()) return;
        
        const header = document.querySelector('.ultra-header');
        if (!header) return;
        
        // Use passive event listeners for better performance
        header.addEventListener('scroll', function() {
            // Throttle scroll events
            if (!this.scrolling) {
                this.scrolling = true;
                requestAnimationFrame(() => {
                    this.scrolling = false;
                });
            }
        }, { passive: true });
        
        // Optimize touch events
        header.addEventListener('touchstart', function(e) {
            this.style.scrollBehavior = 'auto';
        }, { passive: true });
        
        header.addEventListener('touchend', function() {
            this.style.scrollBehavior = 'smooth';
        }, { passive: true });
    }
    
    // Handle orientation change
    function handleOrientationChange() {
        setTimeout(() => {
            if (isMobile()) {
                initMobileHeaderScroll();
                addScrollIndicators();
                optimizeHeaderPerformance();
            }
        }, 100);
    }
    
    // Initialize when DOM is ready
    function init() {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', init);
            return;
        }
        
        initMobileHeaderScroll();
        addScrollIndicators();
        optimizeHeaderPerformance();
        
        // Handle window resize and orientation change
        window.addEventListener('resize', handleOrientationChange);
        window.addEventListener('orientationchange', handleOrientationChange);
        
        console.log('Mobile header scroll system loaded');
    }
    
    // Start initialization
    init();
    
    // Expose functions globally for debugging
    window.mobileHeaderScroll = {
        init: init,
        isMobile: isMobile,
        initMobileHeaderScroll: initMobileHeaderScroll,
        addScrollIndicators: addScrollIndicators
    };
    
})();

// Additional mobile header enhancements
document.addEventListener('DOMContentLoaded', function() {
    // Ensure header is always visible on mobile
    function ensureHeaderVisibility() {
        const header = document.querySelector('.ultra-header');
        if (!header) return;
        
        // Force visibility
        header.style.display = 'block';
        header.style.visibility = 'visible';
        header.style.opacity = '1';
        header.style.position = 'fixed';
        header.style.top = '0';
        header.style.left = '0';
        header.style.right = '0';
        header.style.zIndex = '99999';
        
        // Ensure all child elements are visible
        const childElements = header.querySelectorAll('*');
        childElements.forEach(el => {
            el.style.visibility = 'visible';
            el.style.opacity = '1';
        });
    }
    
    // Run immediately and after a delay
    ensureHeaderVisibility();
    setTimeout(ensureHeaderVisibility, 500);
    setTimeout(ensureHeaderVisibility, 1000);
    
    // Add mobile-specific classes
    if (window.innerWidth <= 768) {
        document.body.classList.add('mobile-device');
        document.querySelector('.ultra-header')?.classList.add('mobile-header');
    }
    
    // Fix header on scroll for mobile
    let lastScrollTop = 0;
    window.addEventListener('scroll', function() {
        if (window.innerWidth > 768) return;
        
        const header = document.querySelector('.ultra-header');
        if (!header) return;
        
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Always keep header visible on mobile
        header.style.transform = 'translateY(0)';
        header.style.position = 'fixed';
        header.style.top = '0';
        
        lastScrollTop = scrollTop;
    }, { passive: true });
});

// Debug function for mobile header
function debugMobileHeader() {
    const header = document.querySelector('.ultra-header');
    if (!header) {
        console.log('❌ Header not found');
        return;
    }
    
    console.log('📱 Mobile Header Debug Info:');
    console.log('Window width:', window.innerWidth);
    console.log('Is mobile:', window.innerWidth <= 768);
    console.log('Header element:', header);
    console.log('Header computed style:', window.getComputedStyle(header));
    console.log('Header scroll width:', header.scrollWidth);
    console.log('Header client width:', header.clientWidth);
    console.log('Header children:', header.children);
    
    // Test scroll functionality
    if (header.scrollWidth > header.clientWidth) {
        console.log('✅ Header is scrollable');
        header.scrollLeft = 50;
        setTimeout(() => {
            header.scrollLeft = 0;
            console.log('✅ Scroll test completed');
        }, 1000);
    } else {
        console.log('⚠️ Header is not scrollable');
    }
}

// Make debug function available globally
window.debugMobileHeader = debugMobileHeader;
