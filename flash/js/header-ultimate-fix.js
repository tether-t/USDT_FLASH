// Ultimate Header Fix - Maximum Performance & Compatibility
(function() {
    'use strict';
    
    console.log('🚀 Ultimate Header Fix - Initializing...');
    
    // Configuration
    const CONFIG = {
        headerSelector: '.ultra-header',
        headerGlassSelector: '.header-glass',
        headerContainerSelector: '.header-container',
        navIconsSelector: '.nav-icons-section',
        logoSectionSelector: '.header-container > div:first-child',
        authSectionSelector: '.header-container > div:last-child',
        checkInterval: 1000,
        forceInterval: 3000,
        maxZIndex: 2147483647
    };
    
    // Device detection
    const DEVICE = {
        isMobile: /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),
        isIOS: /iPad|iPhone|iPod/.test(navigator.userAgent),
        isAndroid: /Android/.test(navigator.userAgent),
        screenWidth: window.innerWidth,
        screenHeight: window.innerHeight
    };
    
    // Get responsive dimensions
    function getResponsiveDimensions() {
        const width = window.innerWidth;
        
        if (width <= 320) {
            return {
                headerHeight: '48px',
                containerPadding: '3px 5px',
                logoSize: '32px',
                logoFontSize: '0.9rem',
                iconSize: '28px',
                iconFontSize: '10px',
                authPadding: '3px 5px',
                authFontSize: '0.6rem',
                gap: '3px'
            };
        } else if (width <= 360) {
            return {
                headerHeight: '50px',
                containerPadding: '4px 6px',
                logoSize: '35px',
                logoFontSize: '1rem',
                iconSize: '30px',
                iconFontSize: '11px',
                authPadding: '4px 6px',
                authFontSize: '0.65rem',
                gap: '4px'
            };
        } else if (width <= 480) {
            return {
                headerHeight: '55px',
                containerPadding: '5px 8px',
                logoSize: '38px',
                logoFontSize: '1.1rem',
                iconSize: '32px',
                iconFontSize: '12px',
                authPadding: '5px 8px',
                authFontSize: '0.7rem',
                gap: '6px'
            };
        } else if (width <= 768) {
            return {
                headerHeight: '60px',
                containerPadding: '6px 10px',
                logoSize: '42px',
                logoFontSize: '1.2rem',
                iconSize: '36px',
                iconFontSize: '14px',
                authPadding: '6px 10px',
                authFontSize: '0.75rem',
                gap: '8px'
            };
        } else if (width <= 1024) {
            return {
                headerHeight: '65px',
                containerPadding: '8px 12px',
                logoSize: '45px',
                logoFontSize: '1.3rem',
                iconSize: '38px',
                iconFontSize: '15px',
                authPadding: '8px 12px',
                authFontSize: '0.8rem',
                gap: '10px'
            };
        } else {
            return {
                headerHeight: '70px',
                containerPadding: '10px 15px',
                logoSize: '50px',
                logoFontSize: '1.4rem',
                iconSize: '40px',
                iconFontSize: '16px',
                authPadding: '8px 12px',
                authFontSize: '0.8rem',
                gap: '12px'
            };
        }
    }
    
    // Apply critical styles with maximum specificity
    function applyCriticalStyles(element, styles) {
        if (!element) return;
        
        Object.keys(styles).forEach(property => {
            const cssProperty = property.replace(/([A-Z])/g, '-$1').toLowerCase();
            element.style.setProperty(cssProperty, styles[property], 'important');
        });
    }
    
    // Force header visibility and structure
    function forceHeaderStructure() {
        const header = document.querySelector(CONFIG.headerSelector) || document.querySelector('header');
        
        if (!header) {
            console.warn('⚠️ Header not found, creating emergency header...');
            createEmergencyHeader();
            return;
        }
        
        const dimensions = getResponsiveDimensions();
        
        // Critical header styles
        applyCriticalStyles(header, {
            display: 'block',
            visibility: 'visible',
            opacity: '1',
            position: 'fixed',
            top: '0',
            left: '0',
            right: '0',
            width: '100%',
            height: 'auto',
            minHeight: dimensions.headerHeight,
            maxHeight: '120px',
            zIndex: CONFIG.maxZIndex.toString(),
            background: 'transparent',
            overflow: 'visible',
            pointerEvents: 'auto',
            transform: 'translateZ(0)',
            willChange: 'transform',
            contain: 'layout style paint',
            isolation: 'isolate',
            boxSizing: 'border-box'
        });
        
        // Fix header glass
        const headerGlass = header.querySelector(CONFIG.headerGlassSelector);
        if (headerGlass) {
            applyCriticalStyles(headerGlass, {
                display: 'flex',
                visibility: 'visible',
                opacity: '1',
                width: '100%',
                height: '100%',
                minHeight: 'inherit',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'linear-gradient(135deg, rgba(15, 15, 35, 0.98) 0%, rgba(25, 25, 45, 0.95) 50%, rgba(35, 35, 65, 0.98) 100%)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
                position: 'relative',
                overflow: 'visible',
                pointerEvents: 'auto',
                zIndex: 'inherit'
            });
        }
        
        // Fix header container
        const headerContainer = header.querySelector(CONFIG.headerContainerSelector);
        if (headerContainer) {
            applyCriticalStyles(headerContainer, {
                display: 'flex',
                visibility: 'visible',
                opacity: '1',
                width: '100%',
                maxWidth: '100%',
                margin: '0',
                padding: dimensions.containerPadding,
                alignItems: 'center',
                justifyContent: 'space-between',
                minHeight: 'inherit',
                position: 'relative',
                zIndex: '2',
                boxSizing: 'border-box',
                flexWrap: 'nowrap',
                overflow: 'visible',
                pointerEvents: 'auto',
                gap: dimensions.gap
            });
            
            // Fix all container children
            const children = headerContainer.children;
            for (let i = 0; i < children.length; i++) {
                applyCriticalStyles(children[i], {
                    display: 'flex',
                    visibility: 'visible',
                    opacity: '1',
                    pointerEvents: 'auto',
                    flexShrink: '0'
                });
            }
        }
        
        // Fix logo section
        fixLogoSection(header, dimensions);
        
        // Fix navigation icons
        fixNavigationIcons(header, dimensions);
        
        // Fix auth section
        fixAuthSection(header, dimensions);
        
        // Adjust body padding
        document.body.style.setProperty('padding-top', dimensions.headerHeight, 'important');
        document.body.style.setProperty('margin-top', '0', 'important');
        
        // Fix main content
        const mainContent = document.getElementById('main-content');
        if (mainContent) {
            applyCriticalStyles(mainContent, {
                marginTop: '0',
                paddingTop: '0'
            });
        }
    }
    
    // Fix logo section
    function fixLogoSection(header, dimensions) {
        const logoSection = header.querySelector(CONFIG.logoSectionSelector);
        if (!logoSection) return;
        
        applyCriticalStyles(logoSection, {
            display: 'flex',
            visibility: 'visible',
            opacity: '1',
            alignItems: 'center',
            gap: dimensions.gap,
            flexShrink: '0',
            minWidth: '0',
            maxWidth: window.innerWidth <= 480 ? '55%' : '45%',
            overflow: 'visible',
            pointerEvents: 'auto'
        });
        
        // Fix logo wrapper
        const logoWrapper = logoSection.querySelector('.logo-wrapper');
        if (logoWrapper) {
            applyCriticalStyles(logoWrapper, {
                display: 'block',
                visibility: 'visible',
                opacity: '1',
                width: dimensions.logoSize,
                height: dimensions.logoSize,
                flexShrink: '0',
                position: 'relative',
                borderRadius: '50%',
                overflow: 'hidden',
                background: 'linear-gradient(45deg, #26a17b, #1a7a5e)',
                boxShadow: '0 4px 15px rgba(38, 161, 123, 0.3)',
                pointerEvents: 'auto'
            });
        }
        
        // Fix logo image
        const logoImg = logoSection.querySelector('.logo-img');
        if (logoImg) {
            applyCriticalStyles(logoImg, {
                display: 'block',
                visibility: 'visible',
                opacity: '1',
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                borderRadius: '50%',
                border: '2px solid rgba(255, 255, 255, 0.1)',
                pointerEvents: 'auto'
            });
        }
        
        // Fix logo title
        const logoTitle = logoSection.querySelector('.logo-title');
        if (logoTitle) {
            applyCriticalStyles(logoTitle, {
                display: 'block',
                visibility: 'visible',
                opacity: '1',
                fontSize: dimensions.logoFontSize,
                fontWeight: '900',
                color: 'white',
                margin: '0',
                lineHeight: '1.2',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                background: 'linear-gradient(45deg, #26a17b, #00d4ff, #667eea)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)',
                pointerEvents: 'auto'
            });
        }
        
        // Fix logo subtitle
        const logoSubtitle = logoSection.querySelector('.logo-subtitle');
        if (logoSubtitle) {
            if (window.innerWidth <= 360) {
                logoSubtitle.style.setProperty('display', 'none', 'important');
            } else {
                applyCriticalStyles(logoSubtitle, {
                    display: 'block',
                    visibility: 'visible',
                    opacity: '1',
                    fontSize: '0.7rem',
                    color: 'rgba(255, 255, 255, 0.7)',
                    fontWeight: '500',
                    margin: '2px 0 0 0',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    pointerEvents: 'auto'
                });
            }
        }
        
        // Fix logo badges
        const logoBadges = logoSection.querySelector('.logo-badges');
        if (logoBadges) {
            if (window.innerWidth <= 360) {
                logoBadges.style.setProperty('display', 'none', 'important');
            } else {
                applyCriticalStyles(logoBadges, {
                    display: 'flex',
                    visibility: 'visible',
                    opacity: '1',
                    gap: '4px',
                    marginTop: '4px',
                    flexWrap: 'wrap',
                    maxWidth: '100%',
                    pointerEvents: 'auto'
                });
                
                const badges = logoBadges.querySelectorAll('.ultra-badge');
                badges.forEach(badge => {
                    applyCriticalStyles(badge, {
                        display: 'inline-flex',
                        visibility: 'visible',
                        opacity: '1',
                        alignItems: 'center',
                        gap: '2px',
                        padding: '2px 6px',
                        borderRadius: '8px',
                        fontSize: '0.6rem',
                        fontWeight: '600',
                        backdropFilter: 'blur(10px)',
                        WebkitBackdropFilter: 'blur(10px)',
                        whiteSpace: 'nowrap',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                        pointerEvents: 'auto'
                    });
                });
            }
        }
    }
    
    // Fix navigation icons
    function fixNavigationIcons(header, dimensions) {
        const navIcons = header.querySelector(CONFIG.navIconsSelector);
        if (!navIcons) return;
        
        applyCriticalStyles(navIcons, {
            display: 'flex',
            visibility: 'visible',
            opacity: '1',
            alignItems: 'center',
            justifyContent: 'center',
            gap: dimensions.gap,
            margin: '0',
            flexShrink: '0',
            pointerEvents: 'auto'
        });
        
        // Fix individual icons
        const icons = navIcons.querySelectorAll('.pro-nav-icon');
        icons.forEach(icon => {
            applyCriticalStyles(icon, {
                display: 'flex',
                visibility: 'visible',
                opacity: '1',
                position: 'relative',
                cursor: 'pointer',
                alignItems: 'center',
                justifyContent: 'center',
                pointerEvents: 'auto',
                touchAction: 'manipulation',
                minWidth: dimensions.iconSize,
                minHeight: dimensions.iconSize
            });
            
            const wrapper = icon.querySelector('.icon-wrapper');
            if (wrapper) {
                applyCriticalStyles(wrapper, {
                    display: 'flex',
                    visibility: 'visible',
                    opacity: '1',
                    width: dimensions.iconSize,
                    height: dimensions.iconSize,
                    borderRadius: '50%',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'relative',
                    overflow: 'hidden',
                    boxShadow: '0 3px 10px rgba(0, 0, 0, 0.2)',
                    border: '2px solid rgba(255, 255, 255, 0.1)',
                    pointerEvents: 'auto',
                    cursor: 'pointer',
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    transition: 'all 0.3s ease'
                });
                
                // Apply specific icon colors
                if (wrapper.classList.contains('cards-icon')) {
                    wrapper.style.setProperty('background', 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', 'important');
                } else if (wrapper.classList.contains('live-icon')) {
                    wrapper.style.setProperty('background', 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)', 'important');
                } else if (wrapper.classList.contains('support-icon')) {
                    wrapper.style.setProperty('background', 'linear-gradient(135deg, #ff6b6b 0%, #ffa726 100%)', 'important');
                } else if (wrapper.classList.contains('notifications-icon')) {
                    wrapper.style.setProperty('background', 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)', 'important');
                }
                
                const iconElement = wrapper.querySelector('i');
                if (iconElement) {
                    applyCriticalStyles(iconElement, {
                        display: 'inline-block',
                        visibility: 'visible',
                        opacity: '1',
                        fontSize: dimensions.iconFontSize,
                        color: 'white',
                        zIndex: '2',
                        position: 'relative',
                        textShadow: '0 1px 2px rgba(0, 0, 0, 0.3)',
                        pointerEvents: 'none'
                    });
                }
            }
        });
    }
    
    // Fix auth section
    function fixAuthSection(header, dimensions) {
        const authSection = header.querySelector(CONFIG.authSectionSelector);
        if (!authSection) return;
        
        applyCriticalStyles(authSection, {
            display: 'flex',
            visibility: 'visible',
            opacity: '1',
            alignItems: 'center',
            gap: dimensions.gap,
            flexShrink: '0',
            maxWidth: window.innerWidth <= 480 ? '40%' : '35%',
            pointerEvents: 'auto'
        });
        
        const authButtons = authSection.querySelectorAll('a');
        authButtons.forEach(button => {
            applyCriticalStyles(button, {
                display: 'flex',
                visibility: 'visible',
                opacity: '1',
                padding: dimensions.authPadding,
                borderRadius: '8px',
                fontSize: dimensions.authFontSize,
                fontWeight: '600',
                textDecoration: 'none',
                alignItems: 'center',
                gap: '4px',
                whiteSpace: 'nowrap',
                minHeight: '36px',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(10px)',
                WebkitBackdropFilter: 'blur(10px)',
                pointerEvents: 'auto',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
            });
            
            // Hide text on very small screens
            if (window.innerWidth <= 480) {
                const span = button.querySelector('span');
                if (span) {
                    span.style.setProperty('display', 'none', 'important');
                }
            }
            
            const icon = button.querySelector('i');
            if (icon) {
                applyCriticalStyles(icon, {
                    display: 'inline-block',
                    visibility: 'visible',
                    opacity: '1',
                    fontSize: '14px',
                    pointerEvents: 'none'
                });
            }
        });
    }
    
    // Create emergency header if none exists
    function createEmergencyHeader() {
        console.log('🔧 Creating emergency header...');
        
        const emergencyHeader = document.createElement('header');
        emergencyHeader.className = 'ultra-header';
        emergencyHeader.innerHTML = `
            <div class="header-glass">
                <div class="header-container">
                    <div style="display: flex; align-items: center; gap: 12px;">
                        <div class="logo-wrapper">
                            <img src="img/usdt_cryptocurrencies_icon_188337.png" alt="USDT-FLASH Logo" class="logo-img">
                        </div>
                        <div>
                            <h1 class="logo-title">USDT-FLASH</h1>
                            <div class="logo-subtitle">Professional USDT Services</div>
                            <div class="logo-badges">
                                <span class="ultra-badge verified">
                                    <i class="fas fa-shield-check"></i>
                                    <span>VERIFIED</span>
                                </span>
                                <span class="ultra-badge secure">
                                    <i class="fas fa-lock"></i>
                                    <span>SECURE</span>
                                </span>
                            </div>
                        </div>
                    </div>
                    
                    <div class="nav-icons-section">
                        <div class="pro-nav-icon" onclick="window.location.href='pages/cards.html'">
                            <div class="icon-wrapper cards-icon">
                                <i class="fas fa-credit-card"></i>
                            </div>
                        </div>
                        <div class="pro-nav-icon" onclick="window.open('pages/live-transactions.html', '_blank')">
                            <div class="icon-wrapper live-icon">
                                <i class="fas fa-chart-line"></i>
                            </div>
                        </div>
                        <div class="pro-nav-icon" onclick="window.open('pages/support.html', '_blank')">
                            <div class="icon-wrapper support-icon">
                                <i class="fas fa-headset"></i>
                            </div>
                        </div>
                        <div class="pro-nav-icon" onclick="advancedNotifications?.openNewsPage()">
                            <div class="icon-wrapper notifications-icon">
                                <i class="fas fa-bell"></i>
                            </div>
                        </div>
                    </div>
                    
                    <div style="display: flex; align-items: center; gap: 8px;">
                        <a href="pages/login.html" style="color: white; text-decoration: none; padding: 8px 12px; background: rgba(255,255,255,0.1); border-radius: 8px;">
                            <i class="fas fa-sign-in-alt"></i>
                            <span>Login</span>
                        </a>
                        <a href="pages/register.html" style="color: white; text-decoration: none; padding: 8px 12px; background: linear-gradient(135deg, #10b981, #34d399); border-radius: 8px;">
                            <i class="fas fa-user-plus"></i>
                            <span>Register</span>
                        </a>
                    </div>
                </div>
            </div>
        `;
        
        // Insert at the beginning of body
        document.body.insertBefore(emergencyHeader, document.body.firstChild);
        
        // Apply fixes to the new header
        setTimeout(() => forceHeaderStructure(), 100);
    }
    
    // Continuous monitoring and fixing
    function startContinuousMonitoring() {
        // Check header visibility every second
        setInterval(() => {
            const header = document.querySelector(CONFIG.headerSelector);
            if (header) {
                const computedStyle = window.getComputedStyle(header);
                if (computedStyle.display === 'none' || 
                    computedStyle.visibility === 'hidden' || 
                    computedStyle.opacity === '0' ||
                    computedStyle.position !== 'fixed') {
                    console.warn('⚠️ Header visibility issue detected, fixing...');
                    forceHeaderStructure();
                }
            }
        }, CONFIG.checkInterval);
        
        // Force complete fix every 3 seconds
        setInterval(() => {
            forceHeaderStructure();
        }, CONFIG.forceInterval);
    }
    
    // Handle resize and orientation changes
    function handleViewportChanges() {
        let resizeTimeout;
        
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                DEVICE.screenWidth = window.innerWidth;
                DEVICE.screenHeight = window.innerHeight;
                forceHeaderStructure();
            }, 150);
        });
        
        window.addEventListener('orientationchange', () => {
            setTimeout(() => {
                DEVICE.screenWidth = window.innerWidth;
                DEVICE.screenHeight = window.innerHeight;
                forceHeaderStructure();
            }, 300);
        });
        
        // Handle scroll for mobile browsers
        if (DEVICE.isMobile) {
            let scrollTimeout;
            window.addEventListener('scroll', () => {
                clearTimeout(scrollTimeout);
                scrollTimeout = setTimeout(() => {
                    const header = document.querySelector(CONFIG.headerSelector);
                    if (header) {
                        header.style.setProperty('position', 'fixed', 'important');
                        header.style.setProperty('top', '0', 'important');
                        header.style.setProperty('z-index', CONFIG.maxZIndex.toString(), 'important');
                    }
                }, 100);
            });
        }
    }
    
    // iOS Safari specific fixes
    function applyIOSFixes() {
        if (!DEVICE.isIOS) return;
        
        // Fix viewport height
        const fixViewportHeight = () => {
            const vh = window.innerHeight * 0.01;
            document.documentElement.style.setProperty('--vh', `${vh}px`);
        };
        
        fixViewportHeight();
        window.addEventListener('resize', fixViewportHeight);
        window.addEventListener('orientationchange', () => {
            setTimeout(fixViewportHeight, 100);
        });
        
        // Prevent zoom on input focus
        const inputs = document.querySelectorAll('input, select, textarea');
        inputs.forEach(input => {
            input.addEventListener('focus', () => {
                const viewport = document.querySelector('meta[name="viewport"]');
                if (viewport) {
                    viewport.content = 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no';
                }
            });
            
            input.addEventListener('blur', () => {
                const viewport = document.querySelector('meta[name="viewport"]');
                if (viewport) {
                    viewport.content = 'width=device-width, initial-scale=1.0, maximum-scale=5.0, user-scalable=yes';
                }
            });
        });
        
        // Fix iOS Safari scrolling issues
        document.body.style.setProperty('-webkit-overflow-scrolling', 'touch', 'important');
    }
    
    // Android Chrome specific fixes
    function applyAndroidFixes() {
        if (!DEVICE.isAndroid) return;
        
        // Fix address bar issues
        const fixAddressBar = () => {
            const header = document.querySelector(CONFIG.headerSelector);
            if (header) {
                header.style.setProperty('transform', 'translateZ(0)', 'important');
                header.style.setProperty('position', 'fixed', 'important');
                header.style.setProperty('top', '0', 'important');
            }
        };
        
        window.addEventListener('scroll', fixAddressBar);
        window.addEventListener('resize', fixAddressBar);
    }
    
    // Initialize the ultimate header fix
    function initialize() {
        console.log('🚀 Ultimate Header Fix - Starting initialization...');
        console.log('📱 Device Info:', DEVICE);
        
        // Apply immediate fixes
        forceHeaderStructure();
        
        // Start continuous monitoring
        startContinuousMonitoring();
        
        // Handle viewport changes
        handleViewportChanges();
        
        // Apply device-specific fixes
        applyIOSFixes();
        applyAndroidFixes();
        
        console.log('✅ Ultimate Header Fix - Initialization complete!');
    }
    
    // Start immediately
    initialize();
    
    // Also start when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initialize);
    } else {
        setTimeout(initialize, 50);
    }
    
    // Expose for debugging
    window.UltimateHeaderFix = {
        forceHeaderStructure,
        getResponsiveDimensions,
        CONFIG,
        DEVICE
    };
    
})();
