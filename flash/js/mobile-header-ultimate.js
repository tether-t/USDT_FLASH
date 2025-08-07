// Ultimate Mobile Header Solution
(function() {
    'use strict';
    
    // Configuration
    const CONFIG = {
        MOBILE_BREAKPOINT: 768,
        SCROLL_HINT_DURATION: 5000,
        SCROLL_THROTTLE: 16, // 60fps
        TOUCH_SENSITIVITY: 1.5,
        AUTO_CENTER_DELAY: 800
    };
    
    // State management
    let state = {
        isMobile: false,
        hasScrolled: false,
        isScrolling: false,
        touchStartX: 0,
        scrollLeft: 0,
        isDown: false,
        scrollTimeout: null,
        resizeTimeout: null
    };
    
    // Utility functions
    const utils = {
        isMobile: () => window.innerWidth <= CONFIG.MOBILE_BREAKPOINT,
        
        throttle: (func, delay) => {
            let timeoutId;
            let lastExecTime = 0;
            return function (...args) {
                const currentTime = Date.now();
                
                if (currentTime - lastExecTime > delay) {
                    func.apply(this, args);
                    lastExecTime = currentTime;
                } else {
                    clearTimeout(timeoutId);
                    timeoutId = setTimeout(() => {
                        func.apply(this, args);
                        lastExecTime = Date.now();
                    }, delay - (currentTime - lastExecTime));
                }
            };
        },
        
        debounce: (func, delay) => {
            let timeoutId;
            return function (...args) {
                clearTimeout(timeoutId);
                timeoutId = setTimeout(() => func.apply(this, args), delay);
            };
        },
        
        forceElementVisibility: (element) => {
            if (!element) return;
            
            const styles = {
                display: 'flex',
                visibility: 'visible',
                opacity: '1',
                position: 'relative',
                zIndex: 'auto'
            };
            
            Object.assign(element.style, styles);
            
            // Force visibility on all children
            const children = element.querySelectorAll('*');
            children.forEach(child => {
                Object.assign(child.style, {
                    visibility: 'visible',
                    opacity: '1'
                });
            });
        },
        
        addMobileClasses: () => {
            document.body.classList.add('mobile-device');
            const header = document.querySelector('.ultra-header');
            if (header) {
                header.classList.add('mobile-header');
            }
        }
    };
    
    // Header visibility enforcer
    const headerVisibility = {
        init: () => {
            if (!utils.isMobile()) return;
            
            const header = document.querySelector('.ultra-header');
            if (!header) return;
            
            // Force header structure
            headerVisibility.enforceStructure(header);
            
            // Set up mutation observer to prevent hiding
            headerVisibility.setupMutationObserver(header);
            
            // Periodic visibility check
            headerVisibility.startPeriodicCheck(header);
        },
        
        enforceStructure: (header) => {
            // Main header styles
            const headerStyles = {
                position: 'fixed',
                top: '0',
                left: '0',
                right: '0',
                width: '100vw',
                minHeight: '60px',
                zIndex: '99999',
                display: 'block',
                visibility: 'visible',
                opacity: '1',
                overflowX: 'auto',
                overflowY: 'hidden',
                WebkitOverflowScrolling: 'touch',
                scrollBehavior: 'smooth',
                scrollbarWidth: 'none',
                msOverflowStyle: 'none',
                transform: 'translateZ(0)',
                willChange: 'scroll-position',
                contain: 'layout style paint'
            };
            
            Object.assign(header.style, headerStyles);
            
            // Hide scrollbar
            const style = document.createElement('style');
            style.textContent = `
                .ultra-header::-webkit-scrollbar {
                    display: none !important;
                    width: 0 !important;
                    height: 0 !important;
                }
            `;
            if (!document.querySelector('#mobile-header-scrollbar-hide')) {
                style.id = 'mobile-header-scrollbar-hide';
                document.head.appendChild(style);
            }
            
            // Force visibility on all components
            const components = [
                '.header-glass',
                '.header-container',
                '.nav-icons-section',
                '.pro-nav-icon',
                '.icon-wrapper',
                '.logo-wrapper'
            ];
            
            components.forEach(selector => {
                const elements = header.querySelectorAll(selector);
                elements.forEach(utils.forceElementVisibility);
            });
        },
        
        setupMutationObserver: (header) => {
            const observer = new MutationObserver((mutations) => {
                mutations.forEach((mutation) => {
                    if (mutation.type === 'attributes' && 
                        (mutation.attributeName === 'style' || 
                         mutation.attributeName === 'class')) {
                        
                        // Re-enforce visibility if something tries to hide the header
                        if (header.style.display === 'none' || 
                            header.style.visibility === 'hidden' || 
                            header.style.opacity === '0') {
                            
                            headerVisibility.enforceStructure(header);
                        }
                    }
                });
            });
            
            observer.observe(header, {
                attributes: true,
                attributeFilter: ['style', 'class'],
                subtree: true
            });
        },
        
        startPeriodicCheck: (header) => {
            setInterval(() => {
                if (!utils.isMobile()) return;
                
                // Check if header is still visible
                const rect = header.getBoundingClientRect();
                if (rect.height === 0 || rect.width === 0) {
                    headerVisibility.enforceStructure(header);
                }
                
                // Ensure body padding
                if (parseInt(document.body.style.paddingTop) < 50) {
                    document.body.style.paddingTop = '60px';
                }
            }, 2000);
        }
    };
    
    // Scroll functionality
    const scrollManager = {
        init: () => {
            if (!utils.isMobile()) return;
            
            const header = document.querySelector('.ultra-header');
            if (!header) return;
            
            scrollManager.setupScrollEvents(header);
            scrollManager.setupTouchEvents(header);
            scrollManager.addScrollHint(header);
            scrollManager.autoCenterContent(header);
        },
        
        setupScrollEvents: (header) => {
            const throttledScrollHandler = utils.throttle(() => {
                if (!state.hasScrolled) {
                    state.hasScrolled = true;
                    header.classList.add('scrolled');
                }
                
                clearTimeout(state.scrollTimeout);
                header.classList.add('scrolling');
                
                state.scrollTimeout = setTimeout(() => {
                    header.classList.remove('scrolling');
                }, 150);
            }, CONFIG.SCROLL_THROTTLE);
            
            header.addEventListener('scroll', throttledScrollHandler, { passive: true });
        },
        
        setupTouchEvents: (header) => {
            header.addEventListener('touchstart', (e) => {
                state.isDown = true;
                state.touchStartX = e.touches[0].pageX - header.offsetLeft;
                state.scrollLeft = header.scrollLeft;
                header.style.scrollBehavior = 'auto';
            }, { passive: true });
            
            header.addEventListener('touchmove', (e) => {
                if (!state.isDown) return;
                
                const x = e.touches[0].pageX - header.offsetLeft;
                const walk = (x - state.touchStartX) * CONFIG.TOUCH_SENSITIVITY;
                header.scrollLeft = state.scrollLeft - walk;
            }, { passive: false });
            
            header.addEventListener('touchend', () => {
                state.isDown = false;
                header.style.scrollBehavior = 'smooth';
            }, { passive: true });
        },
        
        addScrollHint: (header) => {
            // Auto-hide scroll hint
            setTimeout(() => {
                header.classList.add('scrolled');
            }, CONFIG.SCROLL_HINT_DURATION);
        },
        
        autoCenterContent: (header) => {
            setTimeout(() => {
                const navSection = header.querySelector('.nav-icons-section');
                if (navSection && header.scrollWidth > header.clientWidth) {
                    const navRect = navSection.getBoundingClientRect();
                    const headerRect = header.getBoundingClientRect();
                    const scrollTo = navSection.offsetLeft - (headerRect.width / 2) + (navRect.width / 2);
                    
                    header.scrollTo({
                        left: Math.max(0, scrollTo),
                        behavior: 'smooth'
                    });
                }
            }, CONFIG.AUTO_CENTER_DELAY);
        }
    };
    
    // Tether header management
    const tetherHeaderManager = {
        init: () => {
            if (!utils.isMobile()) return;
            
            const tetherHeader = document.querySelector('.tether-official-header');
            if (!tetherHeader) return;
            
            tetherHeaderManager.setupTetherScroll(tetherHeader);
        },
        
        setupTetherScroll: (tetherHeader) => {
            // Make Tether header scrollable
            const styles = {
                overflowX: 'auto',
                overflowY: 'hidden',
                WebkitOverflowScrolling: 'touch',
                scrollBehavior: 'smooth',
                scrollbarWidth: 'none',
                msOverflowStyle: 'none'
            };
            
            Object.assign(tetherHeader.style, styles);
            
            // Setup content
            const content = tetherHeader.querySelector('.tether-official-content');
            if (content) {
                content.style.minWidth = 'max-content';
                content.style.flexWrap = 'nowrap';
                content.style.whiteSpace = 'nowrap';
            }
            
            // Add scroll events
            let tetherScrolled = false;
            tetherHeader.addEventListener('scroll', () => {
                if (!tetherScrolled) {
                    tetherScrolled = true;
                    tetherHeader.classList.add('scrolled');
                }
            }, { passive: true });
            
            // Auto-hide hint
            setTimeout(() => {
                tetherHeader.classList.add('scrolled');
            }, 4000);
        }
    };
    
    // Performance optimizer
    const performanceOptimizer = {
        init: () => {
            if (!utils.isMobile()) return;
            
            performanceOptimizer.optimizeRendering();
            performanceOptimizer.setupIntersectionObserver();
        },
        
        optimizeRendering: () => {
            const header = document.querySelector('.ultra-header');
            if (!header) return;
            
            // Enable hardware acceleration
            header.style.transform = 'translateZ(0)';
            header.style.willChange = 'scroll-position';
            header.style.backfaceVisibility = 'hidden';
            
            // Optimize child elements
            const icons = header.querySelectorAll('.icon-wrapper');
            icons.forEach(icon => {
                icon.style.transform = 'translateZ(0)';
                icon.style.willChange = 'transform';
            });
        },
        
        setupIntersectionObserver: () => {
            const header = document.querySelector('.ultra-header');
            if (!header) return;
            
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (!entry.isIntersecting) {
                        // Header is not visible, force it back
                        headerVisibility.enforceStructure(header);
                    }
                });
            }, {
                threshold: 0.1
            });
            
            observer.observe(header);
        }
    };
    
    // Event handlers
    const eventHandlers = {
        init: () => {
            eventHandlers.setupResizeHandler();
            eventHandlers.setupOrientationHandler();
            eventHandlers.setupLoadHandler();
        },
        
        setupResizeHandler: () => {
            const resizeHandler = utils.debounce(() => {
                state.isMobile = utils.isMobile();
                
                if (state.isMobile) {
                    mobileHeaderManager.reinitialize();
                }
            }, 250);
            
            window.addEventListener('resize', resizeHandler);
        },
        
        setupOrientationHandler: () => {
            window.addEventListener('orientationchange', () => {
                setTimeout(() => {
                    if (utils.isMobile()) {
                        mobileHeaderManager.reinitialize();
                    }
                }, 200);
            });
        },
        
        setupLoadHandler: () => {
            // Ensure header is visible after all resources load
            window.addEventListener('load', () => {
                setTimeout(() => {
                    if (utils.isMobile()) {
                        headerVisibility.init();
                    }
                }, 500);
            });
        }
    };
    
    // Main mobile header manager
    const mobileHeaderManager = {
        init: () => {
            state.isMobile = utils.isMobile();
            
            if (!state.isMobile) return;
            
            console.log('🚀 Initializing Ultimate Mobile Header System');
            
            utils.addMobileClasses();
            headerVisibility.init();
            scrollManager.init();
            tetherHeaderManager.init();
            performanceOptimizer.init();
            eventHandlers.init();
            
            console.log('✅ Mobile Header System Initialized');
        },
        
        reinitialize: () => {
            console.log('🔄 Reinitializing Mobile Header System');
            
            // Clear existing timeouts
            clearTimeout(state.scrollTimeout);
            clearTimeout(state.resizeTimeout);
            
            // Reset state
            state.hasScrolled = false;
            state.isScrolling = false;
            
            // Reinitialize components
            headerVisibility.init();
            scrollManager.init();
            tetherHeaderManager.init();
            
            console.log('✅ Mobile Header System Reinitialized');
        }
    };
    
    // Initialize when DOM is ready
    function initialize() {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', initialize);
            return;
        }
        
        mobileHeaderManager.init();
    }
    
    // Start initialization
    initialize();
    
    // Expose API for debugging
    window.mobileHeaderUltimate = {
        state,
        utils,
        headerVisibility,
        scrollManager,
        tetherHeaderManager,
        performanceOptimizer,
        mobileHeaderManager,
        reinitialize: mobileHeaderManager.reinitialize
    };
    
    // Debug function
    window.debugMobileHeaderUltimate = function() {
        console.log('📱 Ultimate Mobile Header Debug Info:');
        console.log('State:', state);
        console.log('Is Mobile:', utils.isMobile());
        console.log('Window Size:', { width: window.innerWidth, height: window.innerHeight });
        
        const header = document.querySelector('.ultra-header');
        if (header) {
            console.log('Header Element:', header);
            console.log('Header Styles:', window.getComputedStyle(header));
            console.log('Header Scroll Info:', {
                scrollWidth: header.scrollWidth,
                clientWidth: header.clientWidth,
                scrollLeft: header.scrollLeft,
                isScrollable: header.scrollWidth > header.clientWidth
            });
            
            // Test scroll
            if (header.scrollWidth > header.clientWidth) {
                console.log('🧪 Testing scroll functionality...');
                const originalScroll = header.scrollLeft;
                header.scrollLeft = 100;
                setTimeout(() => {
                    header.scrollLeft = originalScroll;
                    console.log('✅ Scroll test completed');
                }, 1000);
            }
        } else {
            console.log('❌ Header element not found');
        }
        
        const tetherHeader = document.querySelector('.tether-official-header');
        if (tetherHeader) {
            console.log('Tether Header:', {
                scrollWidth: tetherHeader.scrollWidth,
                clientWidth: tetherHeader.clientWidth,
                isScrollable: tetherHeader.scrollWidth > tetherHeader.clientWidth
            });
        }
    };
    
})();

// Additional safety measures
document.addEventListener('DOMContentLoaded', function() {
    // Force mobile header visibility every 3 seconds for the first 15 seconds
    let visibilityCheckCount = 0;
    const maxChecks = 5;
    
    const visibilityInterval = setInterval(() => {
        if (window.innerWidth <= 768) {
            const header = document.querySelector('.ultra-header');
            if (header) {
                // Force visibility
                header.style.display = 'block';
                header.style.visibility = 'visible';
                header.style.opacity = '1';
                header.style.position = 'fixed';
                header.style.top = '0';
                header.style.zIndex = '99999';
                
                // Ensure body padding
                document.body.style.paddingTop = '60px';
            }
        }
        
        visibilityCheckCount++;
        if (visibilityCheckCount >= maxChecks) {
            clearInterval(visibilityInterval);
        }
    }, 3000);
    
    // Emergency header recovery
    window.addEventListener('scroll', function() {
        if (window.innerWidth <= 768) {
            const header = document.querySelector('.ultra-header');
            if (header) {
                const rect = header.getBoundingClientRect();
                if (rect.top !== 0 || rect.height === 0) {
                    header.style.position = 'fixed';
                    header.style.top = '0';
                    header.style.left = '0';
                    header.style.right = '0';
                    header.style.zIndex = '99999';
                }
            }
        }
    }, { passive: true });
});
