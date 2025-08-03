// Mobile Header Optimizer - Ultra Performance

(function() {
    'use strict';
    
    // Force header visibility and proper sizing
    function optimizeHeaderForMobile() {
        const header = document.querySelector('.ultra-header');
        const headerGlass = document.querySelector('.header-glass');
        const headerContainer = document.querySelector('.header-container');
        
        if (!header || !headerGlass || !headerContainer) {
            console.warn('Header elements not found, retrying...');
            setTimeout(optimizeHeaderForMobile, 100);
            return;
        }
        
        // Force proper styles
        const forceStyles = (element, styles) => {
            Object.keys(styles).forEach(property => {
                element.style.setProperty(property, styles[property], 'important');
            });
        };
        
        // Header styles
        forceStyles(header, {
            'position': 'fixed',
            'top': '0',
            'left': '0',
            'right': '0',
            'width': '100%',
            'height': 'auto',
            'min-height': '70px',
            'z-index': '9999',
            'display': 'block',
            'visibility': 'visible',
            'opacity': '1'
        });
        
        // Header glass styles
        forceStyles(headerGlass, {
            'width': '100%',
            'height': 'auto',
            'min-height': '70px',
            'display': 'flex',
            'align-items': 'center',
            'background': 'linear-gradient(135deg, rgba(15, 15, 35, 0.98) 0%, rgba(25, 25, 45, 0.95) 50%, rgba(35, 35, 65, 0.98) 100%)',
            'backdrop-filter': 'blur(20px)',
            'border-bottom': '1px solid rgba(255, 255, 255, 0.1)',
            'box-shadow': '0 4px 20px rgba(0, 0, 0, 0.3)'
        });
        
        // Header container styles
        forceStyles(headerContainer, {
            'width': '100%',
            'max-width': 'none',
            'margin': '0',
            'padding': '10px 15px',
            'display': 'flex',
            'align-items': 'center',
            'justify-content': 'space-between',
            'min-height': '70px',
            'position': 'relative',
            'z-index': '2'
        });
        
        // Adjust body padding
        document.body.style.setProperty('padding-top', '70px', 'important');
        
        // Optimize for different screen sizes
        const screenWidth = window.innerWidth;
        
        if (screenWidth <= 360) {
            // Ultra small mobile
            forceStyles(header, { 'min-height': '50px' });
            forceStyles(headerGlass, { 'min-height': '50px' });
            forceStyles(headerContainer, { 
                'min-height': '50px',
                'padding': '4px 6px'
            });
            document.body.style.setProperty('padding-top', '50px', 'important');
        } else if (screenWidth <= 480) {
            // Small mobile
            forceStyles(header, { 'min-height': '55px' });
            forceStyles(headerGlass, { 'min-height': '55px' });
            forceStyles(headerContainer, { 
                'min-height': '55px',
                'padding': '5px 8px'
            });
            document.body.style.setProperty('padding-top', '55px', 'important');
        } else if (screenWidth <= 768) {
            // Mobile
            forceStyles(header, { 'min-height': '60px' });
            forceStyles(headerGlass, { 'min-height': '60px' });
            forceStyles(headerContainer, { 
                'min-height': '60px',
                'padding': '6px 10px'
            });
            document.body.style.setProperty('padding-top', '60px', 'important');
        } else if (screenWidth <= 1024) {
            // Tablet
            forceStyles(header, { 'min-height': '65px' });
            forceStyles(headerGlass, { 'min-height': '65px' });
            forceStyles(headerContainer, { 
                'min-height': '65px',
                'padding': '8px 12px'
            });
            document.body.style.setProperty('padding-top', '65px', 'important');
        }
        
        console.log('✅ Header optimized for mobile:', screenWidth + 'px');
    }
    
    // Optimize navigation icons
    function optimizeNavIcons() {
        const navSection = document.querySelector('.nav-icons-section');
        const navIcons = document.querySelectorAll('.pro-nav-icon');
        
        if (!navSection) return;
        
        // Force nav section visibility
        navSection.style.setProperty('display', 'flex', 'important');
        navSection.style.setProperty('visibility', 'visible', 'important');
        navSection.style.setProperty('opacity', '1', 'important');
        
        navIcons.forEach(icon => {
            const wrapper = icon.querySelector('.icon-wrapper');
            if (wrapper) {
                // Force icon visibility
                icon.style.setProperty('display', 'flex', 'important');
                icon.style.setProperty('visibility', 'visible', 'important');
                icon.style.setProperty('opacity', '1', 'important');
                
                wrapper.style.setProperty('display', 'flex', 'important');
                wrapper.style.setProperty('visibility', 'visible', 'important');
                wrapper.style.setProperty('opacity', '1', 'important');
                
                // Ensure proper touch targets
                const screenWidth = window.innerWidth;
                if (screenWidth <= 480) {
                    wrapper.style.setProperty('width', '32px', 'important');
                    wrapper.style.setProperty('height', '32px', 'important');
                    wrapper.style.setProperty('min-width', '32px', 'important');
                    wrapper.style.setProperty('min-height', '32px', 'important');
                } else {
                    wrapper.style.setProperty('min-width', '44px', 'important');
                    wrapper.style.setProperty('min-height', '44px', 'important');
                }
            }
        });
    }
    
    // Optimize logo section
    function optimizeLogo() {
        const logoSection = document.querySelector('.header-container > div:first-child');
        const logoWrapper = document.querySelector('.logo-wrapper');
        const logoImg = document.querySelector('.logo-img');
        const logoTitle = document.querySelector('.logo-title');
        const logoSubtitle = document.querySelector('.logo-subtitle');
        const logoBadges = document.querySelector('.logo-badges');
        
        if (!logoSection) return;
        
        // Force logo section styles
        logoSection.style.setProperty('display', 'flex', 'important');
        logoSection.style.setProperty('align-items', 'center', 'important');
        logoSection.style.setProperty('gap', '12px', 'important');
        logoSection.style.setProperty('flex-shrink', '0', 'important');
        
        const screenWidth = window.innerWidth;
        
        if (logoWrapper && logoImg) {
            if (screenWidth <= 360) {
                logoWrapper.style.setProperty('width', '35px', 'important');
                logoWrapper.style.setProperty('height', '35px', 'important');
            } else if (screenWidth <= 480) {
                logoWrapper.style.setProperty('width', '38px', 'important');
                logoWrapper.style.setProperty('height', '38px', 'important');
            } else if (screenWidth <= 768) {
                logoWrapper.style.setProperty('width', '42px', 'important');
                logoWrapper.style.setProperty('height', '42px', 'important');
            }
            
            logoImg.style.setProperty('width', '100%', 'important');
            logoImg.style.setProperty('height', '100%', 'important');
            logoImg.style.setProperty('border-radius', '50%', 'important');
            logoImg.style.setProperty('object-fit', 'cover', 'important');
        }
        
        if (logoTitle) {
            if (screenWidth <= 360) {
                logoTitle.style.setProperty('font-size', '1rem', 'important');
            } else if (screenWidth <= 480) {
                logoTitle.style.setProperty('font-size', '1.1rem', 'important');
            } else if (screenWidth <= 768) {
                logoTitle.style.setProperty('font-size', '1.2rem', 'important');
            }
        }
        
        if (logoSubtitle && screenWidth <= 360) {
            logoSubtitle.style.setProperty('display', 'none', 'important');
        }
        
        if (logoBadges && screenWidth <= 360) {
            logoBadges.style.setProperty('display', 'none', 'important');
        }
    }
    
    // Optimize auth section
    function optimizeAuthSection() {
        const authSection = document.querySelector('.header-container > div:last-child');
        const authButtons = authSection?.querySelectorAll('a');
        
        if (!authSection || !authButtons) return;
        
        authSection.style.setProperty('display', 'flex', 'important');
        authSection.style.setProperty('align-items', 'center', 'important');
        authSection.style.setProperty('gap', '8px', 'important');
        authSection.style.setProperty('flex-shrink', '0', 'important');
        
        const screenWidth = window.innerWidth;
        
        authButtons.forEach(button => {
            button.style.setProperty('display', 'flex', 'important');
            button.style.setProperty('align-items', 'center', 'important');
            button.style.setProperty('white-space', 'nowrap', 'important');
            
            if (screenWidth <= 480) {
                button.style.setProperty('padding', '5px 8px', 'important');
                button.style.setProperty('font-size', '0.7rem', 'important');
                
                // Hide text on very small screens, keep only icons
                const span = button.querySelector('span');
                if (span) {
                    span.style.setProperty('display', 'none', 'important');
                }
            } else if (screenWidth <= 768) {
                button.style.setProperty('padding', '6px 10px', 'important');
                button.style.setProperty('font-size', '0.75rem', 'important');
            }
        });
    }
    
    // Handle orientation change
    function handleOrientationChange() {
        setTimeout(() => {
            optimizeHeaderForMobile();
            optimizeNavIcons();
            optimizeLogo();
            optimizeAuthSection();
        }, 100);
    }
    
    // Handle resize
    function handleResize() {
        clearTimeout(window.headerResizeTimeout);
        window.headerResizeTimeout = setTimeout(() => {
            optimizeHeaderForMobile();
            optimizeNavIcons();
            optimizeLogo();
            optimizeAuthSection();
        }, 150);
    }
    
    // Initialize optimization
    function initMobileHeaderOptimizer() {
        // Run initial optimization
        setTimeout(optimizeHeaderForMobile, 100);
        setTimeout(optimizeNavIcons, 200);
        setTimeout(optimizeLogo, 300);
        setTimeout(optimizeAuthSection, 400);
        
        // Add event listeners
        window.addEventListener('resize', handleResize);
        window.addEventListener('orientationchange', handleOrientationChange);
        
        // Re-optimize periodically to ensure consistency
        setInterval(() => {
            optimizeHeaderForMobile();
            optimizeNavIcons();
        }, 5000);
        
        console.log('🚀 Mobile Header Optimizer initialized');
    }
    
    // Start when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initMobileHeaderOptimizer);
    } else {
        initMobileHeaderOptimizer();
    }
    
    // Also start immediately for safety
    setTimeout(initMobileHeaderOptimizer, 50);
    
})();

// Additional mobile-specific fixes
document.addEventListener('DOMContentLoaded', function() {
    // Fix viewport meta tag if needed
    let viewport = document.querySelector('meta[name="viewport"]');
    if (!viewport) {
        viewport = document.createElement('meta');
        viewport.name = 'viewport';
        document.head.appendChild(viewport);
    }
    viewport.content = 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no';
    
    // Prevent zoom on input focus (mobile Safari)
    const inputs = document.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            if (window.innerWidth < 768) {
                viewport.content = 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no';
            }
        });
        
        input.addEventListener('blur', function() {
            if (window.innerWidth < 768) {
                viewport.content = 'width=device-width, initial-scale=1.0, maximum-scale=5.0, user-scalable=yes';
            }
        });
    });
    
    // Fix iOS Safari header issues
    if (/iPad|iPhone|iPod/.test(navigator.userAgent)) {
        document.body.style.setProperty('-webkit-overflow-scrolling', 'touch', 'important');
        
        // Fix iOS Safari viewport height issues
        const fixIOSViewport = () => {
            const vh = window.innerHeight * 0.01;
            document.documentElement.style.setProperty('--vh', `${vh}px`);
        };
        
        fixIOSViewport();
        window.addEventListener('resize', fixIOSViewport);
        window.addEventListener('orientationchange', () => {
            setTimeout(fixIOSViewport, 100);
        });
    }
    
    // Ensure header is always on top
    const ensureHeaderOnTop = () => {
        const header = document.querySelector('.ultra-header');
        if (header) {
            header.style.setProperty('z-index', '9999', 'important');
            header.style.setProperty('position', 'fixed', 'important');
            header.style.setProperty('top', '0', 'important');
        }
    };
    
    ensureHeaderOnTop();
    setInterval(ensureHeaderOnTop, 2000);
});
