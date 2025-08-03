// Package Redirect Fix - Simple & Direct
(function() {
    'use strict';
    
    // Package redirect mapping
    const PACKAGE_REDIRECTS = {
        'basic': 'pages/payment-basic.html',
        'pro': 'pages/payment-pro.html', 
        'enterprise': 'pages/payment-enterprise.html'
    };
    
    // Fix package button clicks
    function fixPackageRedirects() {
        // Override the testButtonClick function
        window.testButtonClick = function(packageType) {
            console.log('Package selected:', packageType);
            
            // Check if user is logged in
            const userData = JSON.parse(localStorage.getItem('user') || '{}');
            if (!userData.email) {
                if (confirm('You must register first to access payment pages. Do you want to register now?')) {
                    window.location.href = 'pages/register.html';
                }
                return;
            }
            
            // Redirect to correct payment page
            const redirectUrl = PACKAGE_REDIRECTS[packageType];
            if (redirectUrl) {
                console.log('Redirecting to:', redirectUrl);
                window.location.href = redirectUrl;
            } else {
                console.error('Unknown package type:', packageType);
                // Fallback to basic package
                window.location.href = PACKAGE_REDIRECTS.basic;
            }
        };
        
        // Fix all package buttons
        setTimeout(() => {
            const packageButtons = document.querySelectorAll('[onclick*="testButtonClick"]');
            packageButtons.forEach((button, index) => {
                const packageType = index === 0 ? 'basic' : index === 1 ? 'pro' : 'enterprise';
                
                // Remove old onclick
                button.removeAttribute('onclick');
                
                // Add new click handler
                button.addEventListener('click', function(e) {
                    e.preventDefault();
                    window.testButtonClick(packageType);
                });
                
                console.log(`Fixed button ${index + 1} for package: ${packageType}`);
            });
        }, 1000);
        
        // Fix package cards
        setTimeout(() => {
            const packageCards = document.querySelectorAll('.package-card, .futuristic-package-card');
            packageCards.forEach((card, index) => {
                const packageType = index === 0 ? 'basic' : index === 1 ? 'pro' : 'enterprise';
                
                card.addEventListener('click', function(e) {
                    // Only trigger if clicking on the card itself, not buttons
                    if (e.target.tagName !== 'BUTTON' && !e.target.closest('button')) {
                        window.testButtonClick(packageType);
                    }
                });
                
                console.log(`Fixed card ${index + 1} for package: ${packageType}`);
            });
        }, 1500);
    }
    
    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', fixPackageRedirects);
    } else {
        fixPackageRedirects();
    }
    
    // Also run after a delay to ensure all packages are loaded
    setTimeout(fixPackageRedirects, 2000);
    
    console.log('✅ Package Redirect Fix - Initialized');
    
})();
