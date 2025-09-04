// Global Profile Icon Fix - Works on all pages
(function() {
    'use strict';
    
    console.log('🌐 Global Profile Icon Fix Loading...');
    
    // Universal profile access function
    function universalProfileAccess() {
        console.log('🔄 Universal Profile Access Called');
        
        try {
            const userData = JSON.parse(localStorage.getItem('user') || '{}');
            
            if (userData.email || userData.isLoggedIn) {
                console.log('👤 User logged in, going to profile');
                
                // Check if we're in a subdirectory
                if (window.location.pathname.includes('/pages/')) {
                    window.location.href = 'profile.html';
                } else {
                    window.location.href = 'pages/profile.html';
                }
            } else {
                console.log('🔐 User not logged in, going to register');
                
                // Check if we're in a subdirectory
                if (window.location.pathname.includes('/pages/')) {
                    window.location.href = 'register.html';
                } else {
                    window.location.href = 'pages/register.html';
                }
            }
        } catch (error) {
            console.error('❌ Error in universalProfileAccess:', error);
            
            // Fallback
            if (window.location.pathname.includes('/pages/')) {
                window.location.href = 'register.html';
            } else {
                window.location.href = 'pages/register.html';
            }
        }
    }
    
    // Fix profile icon function
    function fixProfileIconGlobally() {
        console.log('🔧 Fixing profile icon globally...');
        
        // All possible selectors for profile icons
        const selectors = [
            '.pro-nav-icon',
            '[onclick*="handleProfileAccess"]',
            '[onclick*="profileAccess"]',
            '.profile-icon',
            '.icon-wrapper.profile-icon',
            '.nav-icons-section .pro-nav-icon',
            '.header-container .pro-nav-icon',
            '.ultra-header .pro-nav-icon'
        ];
        
        let fixed = false;
        
        selectors.forEach(selector => {
            const elements = document.querySelectorAll(selector);
            
            elements.forEach(element => {
                if (element && !element.hasAttribute('data-global-fixed')) {
                    console.log(`✅ Fixing profile icon: ${selector}`);
                    
                    // Mark as fixed
                    element.setAttribute('data-global-fixed', 'true');
                    
                    // Remove existing handlers
                    element.removeAttribute('onclick');
                    
                    // Clone to remove all event listeners
                    const newElement = element.cloneNode(true);
                    element.parentNode.replaceChild(newElement, element);
                    
                    // Add new click handler
                    newElement.addEventListener('click', function(e) {
                        e.preventDefault();
                        e.stopPropagation();
                        console.log('🖱️ Profile icon clicked (global fix)');
                        universalProfileAccess();
                    });
                    
                    // Ensure clickability
                    newElement.style.cursor = 'pointer';
                    newElement.style.pointerEvents = 'auto';
                    newElement.style.zIndex = '99999';
                    
                    // Add hover effects
                    newElement.addEventListener('mouseenter', function() {
                        this.style.transform = 'translateY(-2px) scale(1.05)';
                        this.style.transition = 'all 0.3s ease';
                    });
                    
                    newElement.addEventListener('mouseleave', function() {
                        this.style.transform = 'translateY(0) scale(1)';
                    });
                    
                    fixed = true;
                }
            });
        });
        
        if (fixed) {
            console.log('✅ Profile icon fixed globally!');
        } else {
            console.log('⚠️ No profile icon found to fix');
        }
        
        return fixed;
    }
    
    // Initialize fix
    function initGlobalFix() {
        console.log('🚀 Initializing global profile fix...');
        
        // Try to fix immediately
        fixProfileIconGlobally();
        
        // Try again after DOM is ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', fixProfileIconGlobally);
        }
        
        // Try again after window loads
        window.addEventListener('load', fixProfileIconGlobally);
        
        // Try again after a delay
        setTimeout(fixProfileIconGlobally, 1000);
        setTimeout(fixProfileIconGlobally, 3000);
        setTimeout(fixProfileIconGlobally, 5000);
        
        // Set up observer for dynamic content
        if (window.MutationObserver) {
            const observer = new MutationObserver(function(mutations) {
                mutations.forEach(function(mutation) {
                    if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
                        // Check if any added nodes contain profile icons
                        mutation.addedNodes.forEach(function(node) {
                            if (node.nodeType === 1) { // Element node
                                const profileIcons = node.querySelectorAll ? 
                                    node.querySelectorAll('.pro-nav-icon, .profile-icon') : [];
                                
                                if (profileIcons.length > 0 || 
                                    (node.classList && (node.classList.contains('pro-nav-icon') || node.classList.contains('profile-icon')))) {
                                    console.log('🔄 New profile icon detected, fixing...');
                                    setTimeout(fixProfileIconGlobally, 100);
                                }
                            }
                        });
                    }
                });
            });
            
            observer.observe(document.body, {
                childList: true,
                subtree: true
            });
        }
    }
    
    // Make functions globally available
    window.handleProfileAccess = universalProfileAccess;
    window.universalProfileAccess = universalProfileAccess;
    window.fixProfileIconGlobally = fixProfileIconGlobally;
    
    // Start the fix
    initGlobalFix();
    
    console.log('🌐 Global Profile Icon Fix Loaded!');
})();