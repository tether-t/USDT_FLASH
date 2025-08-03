// Tether Official Header Scroll Management
(function() {
    'use strict';
    
    function initTetherHeaderScroll() {
        const tetherHeader = document.querySelector('.tether-official-header');
        if (!tetherHeader || window.innerWidth > 768) return;
        
        let hasScrolled = false;
        let scrollTimeout;
        
        // Add scroll event listener
        tetherHeader.addEventListener('scroll', function() {
            if (!hasScrolled) {
                hasScrolled = true;
                tetherHeader.classList.add('scrolled');
            }
            
            clearTimeout(scrollTimeout);
            tetherHeader.classList.add('scrolling');
            
            scrollTimeout = setTimeout(() => {
                tetherHeader.classList.remove('scrolling');
            }, 150);
        });
        
        // Auto-hide scroll hint after 4 seconds
        setTimeout(() => {
            tetherHeader.classList.add('scrolled');
        }, 4000);
        
        // Touch gesture support
        let startX = 0;
        let scrollLeft = 0;
        let isDown = false;
        
        tetherHeader.addEventListener('touchstart', function(e) {
            isDown = true;
            startX = e.touches[0].pageX - tetherHeader.offsetLeft;
            scrollLeft = tetherHeader.scrollLeft;
            tetherHeader.style.scrollBehavior = 'auto';
        });
        
        tetherHeader.addEventListener('touchmove', function(e) {
            if (!isDown) return;
            e.preventDefault();
            const x = e.touches[0].pageX - tetherHeader.offsetLeft;
            const walk = (x - startX) * 1.5;
            tetherHeader.scrollLeft = scrollLeft - walk;
        });
        
        tetherHeader.addEventListener('touchend', function() {
            isDown = false;
            tetherHeader.style.scrollBehavior = 'smooth';
        });
        
        // Center the content initially
        setTimeout(() => {
            const content = tetherHeader.querySelector('.tether-official-content');
            if (content) {
                const contentWidth = content.scrollWidth;
                const containerWidth = tetherHeader.clientWidth;
                
                if (contentWidth > containerWidth) {
                    const scrollTo = (contentWidth - containerWidth) / 2;
                    tetherHeader.scrollTo({
                        left: scrollTo,
                        behavior: 'smooth'
                    });
                }
            }
        }, 500);
        
        console.log('Tether header scroll initialized');
    }
    
    // Initialize when DOM is ready
    function init() {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', init);
            return;
        }
        
        initTetherHeaderScroll();
        
        // Re-initialize on resize
        window.addEventListener('resize', () => {
            setTimeout(initTetherHeaderScroll, 100);
        });
        
        window.addEventListener('orientationchange', () => {
            setTimeout(initTetherHeaderScroll, 200);
        });
    }
    
    init();
    
})();

// Additional enhancements for Tether header
document.addEventListener('DOMContentLoaded', function() {
    // Ensure Tether header is properly displayed on mobile
    function ensureTetherHeaderVisibility() {
        const tetherHeader = document.querySelector('.tether-official-header');
        if (!tetherHeader || window.innerWidth > 768) return;
        
        // Force proper display
        tetherHeader.style.display = 'block';
        tetherHeader.style.visibility = 'visible';
        tetherHeader.style.opacity = '1';
        tetherHeader.style.overflowX = 'auto';
        tetherHeader.style.overflowY = 'hidden';
        
        const content = tetherHeader.querySelector('.tether-official-content');
        if (content) {
            content.style.display = 'flex';
            content.style.flexWrap = 'nowrap';
            content.style.minWidth = 'max-content';
        }
        
        // Ensure all child elements are visible
        const childElements = tetherHeader.querySelectorAll('*');
        childElements.forEach(el => {
            el.style.visibility = 'visible';
            el.style.opacity = '1';
            el.style.whiteSpace = 'nowrap';
        });
    }
    
    // Run immediately and after delays
    ensureTetherHeaderVisibility();
    setTimeout(ensureTetherHeaderVisibility, 300);
    setTimeout(ensureTetherHeaderVisibility, 800);
    
    // Add mobile-specific optimizations
    if (window.innerWidth <= 768) {
        const tetherHeader = document.querySelector('.tether-official-header');
        if (tetherHeader) {
            // Add mobile class
            tetherHeader.classList.add('mobile-tether-header');
            
            // Optimize performance
            tetherHeader.style.willChange = 'scroll-position';
            tetherHeader.style.transform = 'translateZ(0)';
            
            // Add smooth scrolling
            tetherHeader.style.scrollBehavior = 'smooth';
            tetherHeader.style.webkitOverflowScrolling = 'touch';
        }
    }
});

// Debug function for Tether header
function debugTetherHeader() {
    const tetherHeader = document.querySelector('.tether-official-header');
    if (!tetherHeader) {
        console.log('❌ Tether header not found');
        return;
    }
    
    console.log('🏛️ Tether Header Debug Info:');
    console.log('Window width:', window.innerWidth);
    console.log('Is mobile:', window.innerWidth <= 768);
    console.log('Header element:', tetherHeader);
    console.log('Header scroll width:', tetherHeader.scrollWidth);
    console.log('Header client width:', tetherHeader.clientWidth);
    console.log('Is scrollable:', tetherHeader.scrollWidth > tetherHeader.clientWidth);
    console.log('Current scroll position:', tetherHeader.scrollLeft);
    
    const content = tetherHeader.querySelector('.tether-official-content');
    if (content) {
        console.log('Content element:', content);
        console.log('Content width:', content.offsetWidth);
        console.log('Content scroll width:', content.scrollWidth);
    }
    
    // Test scroll
    if (tetherHeader.scrollWidth > tetherHeader.clientWidth) {
        console.log('✅ Testing scroll functionality...');
        const originalScroll = tetherHeader.scrollLeft;
        tetherHeader.scrollLeft = 100;
        setTimeout(() => {
            tetherHeader.scrollLeft = originalScroll;
            console.log('✅ Scroll test completed');
        }, 1000);
    }
}

// Make debug function available globally
window.debugTetherHeader = debugTetherHeader;
