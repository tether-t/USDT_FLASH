/**
 * Professional Mobile Header Controller
 * Ultra-responsive header management for all device sizes
 */

class ProfessionalMobileHeader {
    constructor() {
        this.header = null;
        this.headerContainer = null;
        this.isScrolled = false;
        this.lastScrollY = 0;
        this.scrollThreshold = 10;
        this.resizeTimeout = null;
        this.touchStartX = 0;
        this.touchStartY = 0;
        this.isInitialized = false;
        
        this.init();
    }

    init() {
        if (this.isInitialized) return;
        
        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.setup());
        } else {
            this.setup();
        }
    }

    setup() {
        try {
            this.header = document.querySelector('.ultra-header');
            this.headerContainer = document.querySelector('.header-container');
            
            if (!this.header || !this.headerContainer) {
                console.warn('Professional Header: Header elements not found, retrying...');
                setTimeout(() => this.setup(), 100);
                return;
            }

            this.setupEventListeners();
            this.optimizeForDevice();
            this.handleInitialState();
            this.isInitialized = true;
            
            console.log('Professional Mobile Header initialized successfully');
        } catch (error) {
            console.error('Professional Header initialization error:', error);
        }
    }

    setupEventListeners() {
        // Scroll handling with throttling
        let scrollTimeout;
        window.addEventListener('scroll', () => {
            if (scrollTimeout) return;
            scrollTimeout = setTimeout(() => {
                this.handleScroll();
                scrollTimeout = null;
            }, 16); // ~60fps
        }, { passive: true });

        // Resize handling with debouncing
        window.addEventListener('resize', () => {
            clearTimeout(this.resizeTimeout);
            this.resizeTimeout = setTimeout(() => {
                this.optimizeForDevice();
                this.handleResize();
            }, 250);
        }, { passive: true });

        // Touch handling for mobile interactions
        this.header.addEventListener('touchstart', (e) => {
            this.touchStartX = e.touches[0].clientX;
            this.touchStartY = e.touches[0].clientY;
        }, { passive: true });

        this.header.addEventListener('touchmove', (e) => {
            this.handleTouchMove(e);
        }, { passive: true });

        // Orientation change
        window.addEventListener('orientationchange', () => {
            setTimeout(() => {
                this.optimizeForDevice();
                this.recalculateLayout();
            }, 100);
        });

        // Visibility change (tab switching)
        document.addEventListener('visibilitychange', () => {
            if (!document.hidden) {
                this.optimizeForDevice();
            }
        });

        // Focus management for accessibility
        this.setupFocusManagement();
    }

    handleScroll() {
        const currentScrollY = window.scrollY;
        const scrollDifference = Math.abs(currentScrollY - this.lastScrollY);

        if (scrollDifference < this.scrollThreshold) return;

        const wasScrolled = this.isScrolled;
        this.isScrolled = currentScrollY > 50;

        if (wasScrolled !== this.isScrolled) {
            this.updateScrollState();
        }

        // Hide/show header on scroll (mobile only)
        if (this.isMobile()) {
            this.handleMobileScroll(currentScrollY);
        }

        this.lastScrollY = currentScrollY;
    }

    handleMobileScroll(currentScrollY) {
        const scrollingDown = currentScrollY > this.lastScrollY;
        const scrollDistance = Math.abs(currentScrollY - this.lastScrollY);

        if (scrollDistance < 5) return; // Ignore small scrolls

        if (scrollingDown && currentScrollY > 100) {
            // Hide header when scrolling down
            this.header.style.transform = 'translateY(-100%)';
            this.header.style.transition = 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
        } else if (!scrollingDown || currentScrollY < 50) {
            // Show header when scrolling up or near top
            this.header.style.transform = 'translateY(0)';
            this.header.style.transition = 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
        }
    }

    updateScrollState() {
        if (this.isScrolled) {
            this.header.classList.add('scrolled');
            this.header.style.backdropFilter = 'blur(30px) saturate(200%)';
            this.header.style.webkitBackdropFilter = 'blur(30px) saturate(200%)';
        } else {
            this.header.classList.remove('scrolled');
            this.header.style.backdropFilter = 'blur(25px) saturate(180%)';
            this.header.style.webkitBackdropFilter = 'blur(25px) saturate(180%)';
        }
    }

    handleTouchMove(e) {
        if (!this.isMobile()) return;

        const touchX = e.touches[0].clientX;
        const touchY = e.touches[0].clientY;
        const deltaX = touchX - this.touchStartX;
        const deltaY = touchY - this.touchStartY;

        // Horizontal swipe detection for potential menu actions
        if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 50) {
            // Could implement swipe gestures here if needed
            this.handleSwipeGesture(deltaX > 0 ? 'right' : 'left');
        }
    }

    handleSwipeGesture(direction) {
        // Placeholder for swipe gesture handling
        console.log(`Swipe gesture detected: ${direction}`);
    }

    optimizeForDevice() {
        const viewport = this.getViewportInfo();
        
        // Apply device-specific optimizations
        this.applyDeviceOptimizations(viewport);
        
        // Ensure proper spacing
        this.adjustBodyPadding();
        
        // Optimize touch targets
        this.optimizeTouchTargets();
        
        // Handle safe areas (notches, etc.)
        this.handleSafeAreas();
    }

    getViewportInfo() {
        return {
            width: window.innerWidth,
            height: window.innerHeight,
            devicePixelRatio: window.devicePixelRatio || 1,
            isMobile: this.isMobile(),
            isTablet: this.isTablet(),
            isLandscape: window.innerWidth > window.innerHeight,
            hasNotch: this.hasNotch()
        };
    }

    applyDeviceOptimizations(viewport) {
        const { width, isMobile, isTablet, isLandscape } = viewport;

        // Remove any existing device classes
        this.header.classList.remove('mobile', 'tablet', 'desktop', 'landscape', 'portrait');

        // Add appropriate classes
        if (isMobile) {
            this.header.classList.add('mobile');
        } else if (isTablet) {
            this.header.classList.add('tablet');
        } else {
            this.header.classList.add('desktop');
        }

        this.header.classList.add(isLandscape ? 'landscape' : 'portrait');

        // Specific width-based optimizations
        if (width <= 320) {
            this.header.classList.add('extra-small');
            this.optimizeForExtraSmall();
        } else if (width <= 360) {
            this.header.classList.add('small');
            this.optimizeForSmall();
        } else if (width <= 480) {
            this.header.classList.add('medium-mobile');
        }
    }

    optimizeForExtraSmall() {
        // Ultra-compact layout for very small screens
        const icons = this.header.querySelectorAll('.pro-nav-icon');
        icons.forEach((icon, index) => {
            if (index > 2) { // Hide extra icons on very small screens
                icon.style.display = 'none';
            }
        });

        // Simplify auth buttons
        const authButtons = this.header.querySelectorAll('.header-container > div:last-child a span');
        authButtons.forEach(span => {
            span.style.display = 'none';
        });
    }

    optimizeForSmall() {
        // Compact layout for small screens
        const badges = this.header.querySelectorAll('.ultra-badge');
        badges.forEach((badge, index) => {
            if (index > 1) { // Show only first 2 badges
                badge.style.display = 'none';
            }
        });
    }

    adjustBodyPadding() {
        const headerHeight = this.header.offsetHeight;
        document.body.style.paddingTop = `${headerHeight}px`;
        
        // Update CSS custom property for other components
        document.documentElement.style.setProperty('--header-height', `${headerHeight}px`);
    }

    optimizeTouchTargets() {
        if (!this.isMobile()) return;

        const touchTargets = this.header.querySelectorAll('.pro-nav-icon, .header-container > div:last-child a');
        touchTargets.forEach(target => {
            const rect = target.getBoundingClientRect();
            const minSize = 44; // Apple's recommended minimum touch target size

            if (rect.width < minSize || rect.height < minSize) {
                target.style.minWidth = `${minSize}px`;
                target.style.minHeight = `${minSize}px`;
            }
        });
    }

    handleSafeAreas() {
        if (!this.hasNotch()) return;

        // Add safe area padding for devices with notches
        this.header.style.paddingLeft = 'env(safe-area-inset-left)';
        this.header.style.paddingRight = 'env(safe-area-inset-right)';
        this.header.style.paddingTop = 'env(safe-area-inset-top)';
    }

    setupFocusManagement() {
        // Improve keyboard navigation
        const focusableElements = this.header.querySelectorAll(
            'a, button, [tabindex]:not([tabindex="-1"])'
        );

        focusableElements.forEach((element, index) => {
            element.addEventListener('keydown', (e) => {
                if (e.key === 'Tab') {
                    this.handleTabNavigation(e, focusableElements, index);
                }
            });
        });
    }

    handleTabNavigation(e, elements, currentIndex) {
        if (e.shiftKey) {
            // Shift+Tab (backward)
            if (currentIndex === 0) {
                e.preventDefault();
                elements[elements.length - 1].focus();
            }
        } else {
            // Tab (forward)
            if (currentIndex === elements.length - 1) {
                e.preventDefault();
                elements[0].focus();
            }
        }
    }

    handleInitialState() {
        // Set initial scroll state
        this.isScrolled = window.scrollY > 50;
        this.updateScrollState();

        // Ensure header is visible initially
        this.header.style.transform = 'translateY(0)';
        this.header.style.opacity = '1';
        this.header.style.visibility = 'visible';

        // Add loaded class for animations
        setTimeout(() => {
            this.header.classList.add('loaded');
        }, 100);
    }

    handleResize() {
        // Recalculate layout after resize
        this.recalculateLayout();
        
        // Update scroll state
        this.updateScrollState();
    }

    recalculateLayout() {
        // Force layout recalculation
        this.header.style.width = '100vw';
        this.adjustBodyPadding();
        
        // Trigger reflow
        this.header.offsetHeight;
    }

    // Utility methods
    isMobile() {
        return window.innerWidth <= 768 || /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    }

    isTablet() {
        return window.innerWidth > 768 && window.innerWidth <= 1024;
    }

    hasNotch() {
        return CSS.supports('padding-top: env(safe-area-inset-top)') && 
               window.innerHeight > 700 && 
               this.isMobile();
    }

    // Public methods for external control
    show() {
        this.header.style.transform = 'translateY(0)';
        this.header.style.transition = 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
    }

    hide() {
        this.header.style.transform = 'translateY(-100%)';
        this.header.style.transition = 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
    }

    refresh() {
        this.optimizeForDevice();
        this.handleInitialState();
    }

    destroy() {
        // Cleanup event listeners
        window.removeEventListener('scroll', this.handleScroll);
        window.removeEventListener('resize', this.handleResize);
        window.removeEventListener('orientationchange', this.optimizeForDevice);
        
        // Reset styles
        document.body.style.paddingTop = '';
        this.header.style.transform = '';
        this.header.style.transition = '';
        
        this.isInitialized = false;
    }
}

// Auto-initialize when script loads
let professionalHeader;

// Initialize with error handling
try {
    professionalHeader = new ProfessionalMobileHeader();
    
    // Make it globally accessible
    window.ProfessionalMobileHeader = ProfessionalMobileHeader;
    window.professionalHeader = professionalHeader;
    
} catch (error) {
    console.error('Failed to initialize Professional Mobile Header:', error);
}

// Fallback initialization for edge cases
window.addEventListener('load', () => {
    if (!professionalHeader || !professionalHeader.isInitialized) {
        try {
            professionalHeader = new ProfessionalMobileHeader();
        } catch (error) {
            console.error('Fallback header initialization failed:', error);
        }
    }
});

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ProfessionalMobileHeader;
}

if (typeof define === 'function' && define.amd) {
    define([], () => ProfessionalMobileHeader);
}