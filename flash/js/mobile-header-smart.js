// Smart Mobile Header Enhancements
(function() {
    'use strict';
    
    let lastScrollY = 0;
    let scrollMemory = {};
    
    function initSmartFeatures() {
        if (window.innerWidth > 768) return;
        
        const header = document.querySelector('.ultra-header');
        if (!header) return;
        
        // Double tap to center
        let tapCount = 0;
        header.addEventListener('touchend', function() {
            tapCount++;
            if (tapCount === 1) {
                setTimeout(() => tapCount = 0, 300);
            } else if (tapCount === 2) {
                centerHeader();
                tapCount = 0;
            }
        });
        
        // Smart auto-hide
        window.addEventListener('scroll', function() {
            const currentScrollY = window.scrollY;
            if (currentScrollY > lastScrollY && currentScrollY > 100) {
                header.classList.add('auto-hide');
            } else {
                header.classList.remove('auto-hide');
            }
            lastScrollY = currentScrollY;
        }, { passive: true });
        
        // Position memory
        addPositionMemory(header);
        
        // Haptic feedback simulation
        header.addEventListener('scroll', function() {
            if (this.scrollLeft % 50 === 0) {
                this.classList.add('haptic-feedback');
                setTimeout(() => this.classList.remove('haptic-feedback'), 100);
            }
        });
    }
    
    function centerHeader() {
        const header = document.querySelector('.ultra-header');
        const navSection = header.querySelector('.nav-icons-section');
        if (navSection) {
            const scrollTo = navSection.offsetLeft - (header.clientWidth / 2) + (navSection.clientWidth / 2);
            header.scrollTo({ left: Math.max(0, scrollTo), behavior: 'smooth' });
        }
    }
    
    function addPositionMemory(header) {
        const indicator = document.createElement('div');
        indicator.className = 'header-position-memory';
        header.appendChild(indicator);
        
        header.addEventListener('scroll', function() {
            const progress = this.scrollLeft / (this.scrollWidth - this.clientWidth);
            indicator.style.setProperty('--progress', `${progress * 100}%`);
        });
    }
    
    document.addEventListener('DOMContentLoaded', initSmartFeatures);
    window.addEventListener('resize', initSmartFeatures);
    
})();
