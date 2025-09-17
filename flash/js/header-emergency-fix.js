// Emergency Header Fix - Immediate Execution
(function() {
    'use strict';
    
    // Critical header fix function
    function emergencyHeaderFix() {
        console.log('🚨 Emergency Header Fix - Starting...');
        
        // Find header elements
        const header = document.querySelector('.ultra-header') || document.querySelector('header');
        const headerGlass = document.querySelector('.header-glass');
        const headerContainer = document.querySelector('.header-container');
        const navIcons = document.querySelector('.nav-icons-section');
        const logoSection = document.querySelector('.header-container > div:first-child');
        const authSection = document.querySelector('.header-container > div:last-child');
        
        // Force create header if not exists
        if (!header) {
            console.log('⚠️ Header not found, creating emergency header...');
            createEmergencyHeader();
            return;
        }
        
        // Apply critical styles immediately
        const criticalStyles = {
            position: 'fixed',
            top: '0',
            left: '0',
            right: '0',
            width: '100%',
            height: 'auto',
            minHeight: '70px',
            zIndex: '999999',
            display: 'block',
            visibility: 'visible',
            opacity: '1',
            pointerEvents: 'auto',
            transform: 'none',
            clip: 'none',
            clipPath: 'none'
        };
        
        // Apply styles to header
        Object.keys(criticalStyles).forEach(prop => {
            const cssProp = prop.replace(/([A-Z])/g, '-$1').toLowerCase();
            header.style.setProperty(cssProp, criticalStyles[prop], 'important');
        });
        
        // Fix header glass
        if (headerGlass) {
            const glassStyles = {
                display: 'flex',
                visibility: 'visible',
                opacity: '1',
                width: '100%',
                height: '100%',
                minHeight: 'inherit',
                alignItems: 'center',
                background: 'linear-gradient(135deg, rgba(15, 15, 35, 0.98) 0%, rgba(25, 25, 45, 0.95) 50%, rgba(35, 35, 65, 0.98) 100%)',
                backdropFilter: 'blur(20px)',
                borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
                position: 'relative',
                overflow: 'visible',
                pointerEvents: 'auto'
            };
            
            Object.keys(glassStyles).forEach(prop => {
                const cssProp = prop.replace(/([A-Z])/g, '-$1').toLowerCase();
                headerGlass.style.setProperty(cssProp, glassStyles[prop], 'important');
            });
        }
        
        // Fix header container
        if (headerContainer) {
            const containerStyles = {
                display: 'flex',
                visibility: 'visible',
                opacity: '1',
                width: '100%',
                maxWidth: '100%',
                margin: '0',
                padding: '10px 15px',
                alignItems: 'center',
                justifyContent: 'space-between',
                minHeight: 'inherit',
                position: 'relative',
                zIndex: '2',
                boxSizing: 'border-box',
                flexWrap: 'nowrap',
                overflow: 'visible',
                pointerEvents: 'auto'
            };
            
            Object.keys(containerStyles).forEach(prop => {
                const cssProp = prop.replace(/([A-Z])/g, '-$1').toLowerCase();
                headerContainer.style.setProperty(cssProp, containerStyles[prop], 'important');
            });
        }
        
        // Fix navigation icons
        if (navIcons) {
            const navStyles = {
                display: 'flex',
                visibility: 'visible',
                opacity: '1',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                margin: '0 10px',
                flexShrink: '0',
                pointerEvents: 'auto'
            };
            
            Object.keys(navStyles).forEach(prop => {
                const cssProp = prop.replace(/([A-Z])/g, '-$1').toLowerCase();
                navIcons.style.setProperty(cssProp, navStyles[prop], 'important');
            });
            
            // Fix individual icons
            const icons = navIcons.querySelectorAll('.pro-nav-icon');
            icons.forEach(icon => {
                const iconStyles = {
                    display: 'flex',
                    visibility: 'visible',
                    opacity: '1',
                    position: 'relative',
                    cursor: 'pointer',
                    alignItems: 'center',
                    justifyContent: 'center',
                    pointerEvents: 'auto',
                    touchAction: 'manipulation'
                };
                
                Object.keys(iconStyles).forEach(prop => {
                    const cssProp = prop.replace(/([A-Z])/g, '-$1').toLowerCase();
                    icon.style.setProperty(cssProp, iconStyles[prop], 'important');
                });
                
                const wrapper = icon.querySelector('.icon-wrapper');
                if (wrapper) {
                    const wrapperStyles = {
                        display: 'flex',
                        visibility: 'visible',
                        opacity: '1',
                        width: '40px',
                        height: '40px',
                        borderRadius: '50%',
                        alignItems: 'center',
                        justifyContent: 'center',
                        position: 'relative',
                        overflow: 'hidden',
                        boxShadow: '0 3px 10px rgba(0, 0, 0, 0.2)',
                        border: '2px solid rgba(255, 255, 255, 0.1)',
                        pointerEvents: 'auto',
                        cursor: 'pointer',
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                    };
                    
                    Object.keys(wrapperStyles).forEach(prop => {
                        const cssProp = prop.replace(/([A-Z])/g, '-$1').toLowerCase();
                        wrapper.style.setProperty(cssProp, wrapperStyles[prop], 'important');
                    });
                    
                    const iconElement = wrapper.querySelector('i');
                    if (iconElement) {
                        const iconElementStyles = {
                            display: 'inline-block',
                            visibility: 'visible',
                            opacity: '1',
                            fontSize: '16px',
                            color: 'white',
                            zIndex: '2',
                            position: 'relative',
                            textShadow: '0 1px 2px rgba(0, 0, 0, 0.3)',
                            pointerEvents: 'none'
                        };
                        
                        Object.keys(iconElementStyles).forEach(prop => {
                            const cssProp = prop.replace(/([A-Z])/g, '-$1').toLowerCase();
                            iconElement.style.setProperty(cssProp, iconElementStyles[prop], 'important');
                        });
                    }
                }
            });
        }
        
        // Fix logo section
        if (logoSection) {
            const logoStyles = {
                display: 'flex',
                visibility: 'visible',
                opacity: '1',
                alignItems: 'center',
                gap: '12px',
                flexShrink: '0',
                minWidth: '0',
                maxWidth: '40%',
                overflow: 'visible',
                pointerEvents: 'auto'
            };
            
            Object.keys(logoStyles).forEach(prop => {
                const cssProp = prop.replace(/([A-Z])/g, '-$1').toLowerCase();
                logoSection.style.setProperty(cssProp, logoStyles[prop], 'important');
            });
            
            // Fix logo elements
            const logoWrapper = logoSection.querySelector('.logo-wrapper');
            const logoImg = logoSection.querySelector('.logo-img');
            const logoTitle = logoSection.querySelector('.logo-title');
            
            if (logoWrapper) {
                logoWrapper.style.setProperty('display', 'block', 'important');
                logoWrapper.style.setProperty('visibility', 'visible', 'important');
                logoWrapper.style.setProperty('opacity', '1', 'important');
                logoWrapper.style.setProperty('width', '50px', 'important');
                logoWrapper.style.setProperty('height', '50px', 'important');
                logoWrapper.style.setProperty('border-radius', '50%', 'important');
            }
            
            if (logoImg) {
                logoImg.style.setProperty('display', 'block', 'important');
                logoImg.style.setProperty('visibility', 'visible', 'important');
                logoImg.style.setProperty('opacity', '1', 'important');
                logoImg.style.setProperty('width', '100%', 'important');
                logoImg.style.setProperty('height', '100%', 'important');
                logoImg.style.setProperty('object-fit', 'cover', 'important');
                logoImg.style.setProperty('border-radius', '50%', 'important');
            }
            
            if (logoTitle) {
                logoTitle.style.setProperty('display', 'block', 'important');
                logoTitle.style.setProperty('visibility', 'visible', 'important');
                logoTitle.style.setProperty('opacity', '1', 'important');
                logoTitle.style.setProperty('color', 'white', 'important');
                logoTitle.style.setProperty('font-size', '1.4rem', 'important');
                logoTitle.style.setProperty('font-weight', '900', 'important');
            }
        }
        
        // Fix auth section
        if (authSection) {
            const authStyles = {
                display: 'flex',
                visibility: 'visible',
                opacity: '1',
                alignItems: 'center',
                gap: '8px',
                flexShrink: '0',
                maxWidth: '35%',
                pointerEvents: 'auto'
            };
            
            Object.keys(authStyles).forEach(prop => {
                const cssProp = prop.replace(/([A-Z])/g, '-$1').toLowerCase();
                authSection.style.setProperty(cssProp, authStyles[prop], 'important');
            });
            
            const authButtons = authSection.querySelectorAll('a');
            authButtons.forEach(button => {
                button.style.setProperty('display', 'flex', 'important');
                button.style.setProperty('visibility', 'visible', 'important');
                button.style.setProperty('opacity', '1', 'important');
                button.style.setProperty('pointer-events', 'auto', 'important');
                button.style.setProperty('cursor', 'pointer', 'important');
            });
        }
        
        // Adjust body padding
        document.body.style.setProperty('padding-top', '70px', 'important');
        
        // Mobile adjustments
        const screenWidth = window.innerWidth;
        if (screenWidth <= 768) {
            header.style.setProperty('min-height', '60px', 'important');
            if (headerContainer) {
                headerContainer.style.setProperty('padding', '6px 10px', 'important');
                headerContainer.style.setProperty('min-height', '60px', 'important');
            }
            document.body.style.setProperty('padding-top', '60px', 'important');
        }
        
        if (screenWidth <= 480) {
            header.style.setProperty('min-height', '55px', 'important');
            if (headerContainer) {
                headerContainer.style.setProperty('padding', '5px 8px', 'important');
                headerContainer.style.setProperty('min-height', '55px', 'important');
            }
            document.body.style.setProperty('padding-top', '55px', 'important');
        }
        
        console.log('✅ Emergency Header Fix - Completed successfully');
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
        
        // Apply emergency fix to the new header
        setTimeout(emergencyHeaderFix, 100);
    }
    
    // Force header visibility check
    function forceHeaderVisibility() {
        const header = document.querySelector('.ultra-header') || document.querySelector('header');
        if (header) {
            // Force all critical styles
            header.style.setProperty('display', 'block', 'important');
            header.style.setProperty('visibility', 'visible', 'important');
            header.style.setProperty('opacity', '1', 'important');
            header.style.setProperty('position', 'fixed', 'important');
            header.style.setProperty('top', '0', 'important');
            header.style.setProperty('left', '0', 'important');
            header.style.setProperty('right', '0', 'important');
            header.style.setProperty('width', '100%', 'important');
            header.style.setProperty('z-index', '999999', 'important');
            header.style.setProperty('min-height', '70px', 'important');
            
            // Force all children visible
            const allElements = header.querySelectorAll('*');
            allElements.forEach(el => {
                if (!el.classList.contains('hidden')) {
                    el.style.setProperty('visibility', 'visible', 'important');
                    el.style.setProperty('opacity', '1', 'important');
                }
            });
        }
    }
    
    // Run immediately
    emergencyHeaderFix();
    
    // Run when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', emergencyHeaderFix);
    } else {
        setTimeout(emergencyHeaderFix, 50);
    }
    
    // Run periodically to ensure header stays visible
    setInterval(forceHeaderVisibility, 2000);
    
    // Run on resize
    let resizeTimeout;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(emergencyHeaderFix, 100);
    });
    
    // Run on orientation change
    window.addEventListener('orientationchange', function() {
        setTimeout(emergencyHeaderFix, 200);
    });
    
    // Run on scroll (for mobile browsers that hide/show address bar)
    let scrollTimeout;
    window.addEventListener('scroll', function() {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(forceHeaderVisibility, 100);
    });
    
    console.log('🚀 Emergency Header Fix System - Initialized');
    
})();

// Additional mobile-specific fixes
(function() {
    'use strict';
    
    // Fix iOS Safari issues
    if (/iPad|iPhone|iPod/.test(navigator.userAgent)) {
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
        const preventZoom = () => {
            const viewport = document.querySelector('meta[name="viewport"]');
            if (viewport) {
                viewport.content = 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no';
            }
        };
        
        document.addEventListener('focusin', preventZoom);
        document.addEventListener('focusout', () => {
            const viewport = document.querySelector('meta[name="viewport"]');
            if (viewport) {
                viewport.content = 'width=device-width, initial-scale=1.0, maximum-scale=5.0, user-scalable=yes';
            }
        });
    }
    
    // Fix Android Chrome issues
    if (/Android/.test(navigator.userAgent) && /Chrome/.test(navigator.userAgent)) {
        // Prevent address bar from affecting layout
        const fixAndroidChrome = () => {
            const header = document.querySelector('.ultra-header');
            if (header) {
                header.style.setProperty('position', 'fixed', 'important');
                header.style.setProperty('top', '0', 'important');
                header.style.setProperty('transform', 'translateZ(0)', 'important');
            }
        };
        
        window.addEventListener('scroll', fixAndroidChrome);
        window.addEventListener('resize', fixAndroidChrome);
    }
    
})();
