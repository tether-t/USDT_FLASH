// USDT FLASH TRIAL Package Redirect Fix
(function() {
    'use strict';
    
    console.log('🎯 USDT FLASH TRIAL Redirect System - Loading...');
    
    // Ensure first package redirects to payment-basic.html
    function setupTrialPackageRedirect() {
        // Wait for packages to load
        setTimeout(() => {
            console.log('🔍 Setting up USDT FLASH TRIAL redirect...');
            
            // Find all package elements
            const packageCards = document.querySelectorAll('.package-card, .tether-package, .futuristic-package-card');
            const packageButtons = document.querySelectorAll('.package-btn, .tether-action-button, button[onclick*="payment"], button[onclick*="testButtonClick"]');
            
            console.log(`Found ${packageCards.length} package cards and ${packageButtons.length} buttons`);
            
            // Handle first package card (USDT FLASH TRIAL)
            if (packageCards.length > 0) {
                const firstCard = packageCards[0];
                const cardText = firstCard.textContent || firstCard.innerText || '';
                
                console.log('First package card text:', cardText.substring(0, 100) + '...');
                
                // Check if this is the USDT FLASH TRIAL package
                if (cardText.includes('999') || cardText.includes('39') || cardText.includes('Trial') || cardText.includes('TRIAL')) {
                    console.log('✅ Found USDT FLASH TRIAL package - setting up redirect');
                    
                    // Remove existing click handlers
                    firstCard.onclick = null;
                    firstCard.removeAttribute('onclick');
                    
                    // Add new click handler
                    firstCard.addEventListener('click', function(e) {
                        e.preventDefault();
                        e.stopPropagation();
                        
                        console.log('🎯 USDT FLASH TRIAL package clicked');
                        
                        // Check if user is logged in
                        const userData = JSON.parse(localStorage.getItem('user') || '{}');\
                        if (!userData.email) {
                            if (confirm('You must register first to access payment pages. Do you want to register now?')) {
                                window.location.href = 'pages/register.html';
                            }
                            return;
                        }
                        
                        console.log('🚀 Redirecting to payment-basic.html');
                        window.location.href = 'pages/payment-basic.html';
                    });
                    
                    // Also handle the button inside the first card
                    const firstCardButton = firstCard.querySelector('button, .package-btn, .tether-action-button');
                    if (firstCardButton) {
                        console.log('✅ Found button in USDT FLASH TRIAL card - setting up redirect');
                        
                        firstCardButton.onclick = null;
                        firstCardButton.removeAttribute('onclick');
                        
                        firstCardButton.addEventListener('click', function(e) {
                            e.preventDefault();
                            e.stopPropagation();
                            
                            console.log('🎯 USDT FLASH TRIAL button clicked');
                            
                            // Check if user is logged in
                            const userData = JSON.parse(localStorage.getItem('user') || '{}');\
                            if (!userData.email) {
                                if (confirm('You must register first to access payment pages. Do you want to register now?')) {
                                    window.location.href = 'pages/register.html';
                                }
                                return;
                            }
                            
                            console.log('🚀 Redirecting to payment-basic.html');
                            window.location.href = 'pages/payment-basic.html';
                        });
                    }
                }
            }
            
            // Handle first button (if it's separate from cards)
            if (packageButtons.length > 0) {
                const firstButton = packageButtons[0];
                const buttonText = firstButton.textContent || firstButton.innerText || '';
                const parentText = firstButton.parentElement ? (firstButton.parentElement.textContent || '') : '';
                
                console.log('First button text:', buttonText);
                console.log('First button parent text:', parentText.substring(0, 100) + '...');
                
                // Check if this button belongs to USDT FLASH TRIAL
                if (buttonText.includes('TRIAL') || parentText.includes('999') || parentText.includes('39') || parentText.includes('Trial')) {
                    console.log('✅ Found USDT FLASH TRIAL button - setting up redirect');
                    
                    firstButton.onclick = null;
                    firstButton.removeAttribute('onclick');
                    
                    firstButton.addEventListener('click', function(e) {
                        e.preventDefault();
                        e.stopPropagation();
                        
                        console.log('🎯 USDT FLASH TRIAL button clicked');
                        
                        // Check if user is logged in
                        const userData = JSON.parse(localStorage.getItem('user') || '{}');\
                        if (!userData.email) {
                            if (confirm('You must register first to access payment pages. Do you want to register now?')) {
                                window.location.href = 'pages/register.html';
                            }
                            return;
                        }
                        
                        console.log('🚀 Redirecting to payment-basic.html');
                        window.location.href = 'pages/payment-basic.html';
                    });
                }
            }
            
            // Override global functions that might interfere
            if (typeof window.selectTetherPackage === 'function') {
                const originalSelectTetherPackage = window.selectTetherPackage;
                window.selectTetherPackage = function(packageType) {
                    console.log('🎯 selectTetherPackage called with:', packageType);
                    
                    if (packageType === 'basic') {
                        console.log('🚀 Redirecting basic package to payment-basic.html');
                        
                        // Check if user is logged in
                        const userData = JSON.parse(localStorage.getItem('user') || '{}');\
                        if (!userData.email) {
                            if (confirm('You must register first to access payment pages. Do you want to register now?')) {
                                window.location.href = 'pages/register.html';
                            }
                            return;
                        }
                        
                        window.location.href = 'pages/payment-basic.html';
                        return;
                    }
                    
                    // Call original function for other packages
                    originalSelectTetherPackage(packageType);
                };
            }
            
            // Override testButtonClick function
            if (typeof window.testButtonClick === 'function') {
                const originalTestButtonClick = window.testButtonClick;
                window.testButtonClick = function(packageType) {
                    console.log('🎯 testButtonClick called with:', packageType);
                    
                    if (packageType === 'basic') {
                        console.log('🚀 Redirecting basic package to payment-basic.html');
                        
                        // Check if user is logged in
                        const userData = JSON.parse(localStorage.getItem('user') || '{}');\
                        if (!userData.email) {
                            if (confirm('You must register first to access payment pages. Do you want to register now?')) {
                                window.location.href = 'pages/register.html';
                            }
                            return;
                        }
                        
                        window.location.href = 'pages/payment-basic.html';
                        return;
                    }
                    
                    // Call original function for other packages
                    originalTestButtonClick(packageType);
                };
            }
            
            console.log('✅ USDT FLASH TRIAL redirect setup complete');
            
        }, 2000); // Wait 2 seconds for all packages to load
    }
    
    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', setupTrialPackageRedirect);
    } else {
        setupTrialPackageRedirect();
    }
    
    // Also run after additional delay to ensure all other scripts have loaded
    setTimeout(setupTrialPackageRedirect, 3000);
    
    console.log('✅ USDT FLASH TRIAL Redirect System - Initialized');
    
})();
