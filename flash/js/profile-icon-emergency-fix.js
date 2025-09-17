// Emergency Profile Icon Fix
console.log('🚨 Emergency Profile Icon Fix Loading...');

// Force fix the profile icon immediately
(function emergencyFix() {
    'use strict';
    
    let attempts = 0;
    const maxAttempts = 10;
    
    function forceFixProfileIcon() {
        attempts++;
        console.log(`🔧 Attempt ${attempts} to fix profile icon...`);
        
        // Find all possible profile icon selectors
        const selectors = [
            '.pro-nav-icon',
            '[onclick*="handleProfileAccess"]',
            '.profile-icon',
            '.icon-wrapper.profile-icon',
            '.nav-icons-section .pro-nav-icon:first-child'
        ];
        
        let iconFixed = false;
        
        selectors.forEach(selector => {
            const elements = document.querySelectorAll(selector);
            elements.forEach(element => {
                if (element && !element.hasAttribute('data-fixed')) {
                    console.log(`✅ Found profile icon with selector: ${selector}`);
                    
                    // Mark as fixed
                    element.setAttribute('data-fixed', 'true');
                    
                    // Remove existing onclick
                    element.removeAttribute('onclick');
                    
                    // Clone to remove all event listeners
                    const newElement = element.cloneNode(true);
                    element.parentNode.replaceChild(newElement, element);
                    
                    // Add new event listener
                    newElement.addEventListener('click', function(e) {
                        e.preventDefault();
                        e.stopPropagation();
                        
                        console.log('🖱️ Profile icon clicked via emergency fix!');
                        
                        const userData = JSON.parse(localStorage.getItem('user') || '{}');
                        
                        if (userData.email || userData.isLoggedIn) {
                            console.log('👤 Redirecting to profile...');
                            window.location.href = 'pages/profile.html';
                        } else {
                            console.log('🔐 Redirecting to register...');
                            window.location.href = 'pages/register.html';
                        }
                    });
                    
                    // Ensure it's clickable
                    newElement.style.cursor = 'pointer';
                    newElement.style.pointerEvents = 'auto';
                    newElement.style.zIndex = '99999';
                    
                    // Add visual feedback
                    newElement.addEventListener('mouseenter', function() {
                        this.style.transform = 'translateY(-2px) scale(1.05)';
                        this.style.transition = 'all 0.3s ease';
                    });
                    
                    newElement.addEventListener('mouseleave', function() {
                        this.style.transform = 'translateY(0) scale(1)';
                    });
                    
                    iconFixed = true;
                    console.log('✅ Profile icon fixed successfully!');
                }
            });
        });
        
        if (!iconFixed && attempts < maxAttempts) {
            console.log(`⏳ Profile icon not found, retrying in 500ms... (${attempts}/${maxAttempts})`);
            setTimeout(forceFixProfileIcon, 500);
        } else if (iconFixed) {
            console.log('🎉 Profile icon emergency fix completed successfully!');
        } else {
            console.error('❌ Failed to fix profile icon after maximum attempts');
        }
    }
    
    // Start fixing immediately
    forceFixProfileIcon();
    
    // Also try when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', forceFixProfileIcon);
    }
    
    // And when window is loaded
    window.addEventListener('load', forceFixProfileIcon);
    
    // Global backup function
    window.handleProfileAccess = function() {
        console.log('🔄 Global backup handleProfileAccess called');
        const userData = JSON.parse(localStorage.getItem('user') || '{}');
        
        if (userData.email || userData.isLoggedIn) {
            window.location.href = 'pages/profile.html';
        } else {
            window.location.href = 'pages/register.html';
        }
    };
    
    // Force fix every 5 seconds for the first minute
    let fixInterval = setInterval(() => {
        const profileIcon = document.querySelector('.pro-nav-icon[data-fixed="true"]');
        if (!profileIcon) {
            console.log('🔄 Profile icon lost, re-fixing...');
            forceFixProfileIcon();
        }
    }, 5000);
    
    // Stop the interval after 1 minute
    setTimeout(() => {
        clearInterval(fixInterval);
        console.log('⏹️ Emergency fix interval stopped');
    }, 60000);
    
})();

console.log('🚨 Emergency Profile Icon Fix Loaded!');