// Final Package Fix - Ensure Correct Redirects
(function() {
    'use strict';
    
    console.log('🔧 Final Package Fix - Starting...');
    
    // Correct package mappings
    const CORRECT_REDIRECTS = {
        0: 'pages/payment-basic.html',    // First package (basic)
        1: 'pages/payment-pro.html',     // Second package (pro) 
        2: 'pages/payment-enterprise.html' // Third package (enterprise)
    };
    
    const PACKAGE_NAMES = {
        0: 'basic',
        1: 'pro', 
        2: 'enterprise'
    };
    
    // Override global function
    window.testButtonClick = function(packageType) {
        console.log('🎯 Package selected:', packageType);
        
        // Check login
        const userData = JSON.parse(localStorage.getItem('user') || '{}');
        if (!userData.email) {
            if (confirm('You must register first to access payment pages. Do you want to register now?')) {
                window.location.href = 'pages/register.html';
            }
            return;
        }
        
        // Direct mapping
        let redirectUrl;
        switch(packageType) {
            case 'basic':
            case 0:
                redirectUrl = 'pages/payment-basic.html';
                break;
            case 'pro':
            case 1:
                redirectUrl = 'pages/payment-pro.html';
                break;
            case 'enterprise':
            case 2:
                redirectUrl = 'pages/payment-enterprise.html';
                break;
            default:
                console.warn('Unknown package:', packageType);
                redirectUrl = 'pages/payment-basic.html';
        }
        
        console.log('🚀 Redirecting to:', redirectUrl);
        window.location.href = redirectUrl;
    };
    
    // Fix all package elements
    function fixAllPackageElements() {
        console.log('🔧 Fixing all package elements...');
        
        // Fix buttons with onclick
        const buttons = document.querySelectorAll('button[onclick*="testButtonClick"], .quantum-btn, .package-btn');
        buttons.forEach((button, index) => {
            const packageIndex = Math.floor(index / 2); // Account for multiple buttons per package
            const packageName = PACKAGE_NAMES[packageIndex] || 'basic';
            
            // Remove old onclick
            button.removeAttribute('onclick');
            
            // Add new event listener
            button.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                console.log(`Button ${index} clicked - Package: ${packageName}`);
                window.testButtonClick(packageName);
            });
            
            console.log(`✅ Fixed button ${index} for package: ${packageName}`);
        });
        
        // Fix package cards
        const cards = document.querySelectorAll('.package-card, .futuristic-package-card');
        cards.forEach((card, index) => {
            const packageName = PACKAGE_NAMES[index] || 'basic';
            
            // Add click handler to card
            card.addEventListener('click', function(e) {
                // Only if not clicking on a button
                if (!e.target.closest('button')) {
                    console.log(`Card ${index} clicked - Package: ${packageName}`);
                    window.testButtonClick(packageName);
                }
            });
            
            console.log(`✅ Fixed card ${index} for package: ${packageName}`);
        });
        
        // Fix any remaining elements
        const packageElements = document.querySelectorAll('[data-package]');
        packageElements.forEach(element => {
            const packageType = element.getAttribute('data-package');
            element.addEventListener('click', function(e) {
                if (!e.target.closest('button')) {
                    console.log(`Data package clicked: ${packageType}`);
                    window.testButtonClick(packageType);
                }
            });
        });
        
        console.log('✅ All package elements fixed');
    }
    
    // Run fixes multiple times to ensure coverage
    function runFixes() {
        fixAllPackageElements();
        
        // Run again after packages are rendered
        setTimeout(fixAllPackageElements, 1000);
        setTimeout(fixAllPackageElements, 2000);
        setTimeout(fixAllPackageElements, 3000);
    }
    
    // Initialize
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', runFixes);
    } else {
        runFixes();
    }
    
    // Also run when packages are loaded
    setTimeout(runFixes, 500);
    
    console.log('✅ Final Package Fix - Initialized');
    
})();
