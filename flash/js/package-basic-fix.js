// Basic Package Fix - Direct to payment-basic.html
(function() {
    'use strict';
    
    // Override testButtonClick to ensure first package goes to payment-basic.html
    window.testButtonClick = function(packageType) {
        const userData = JSON.parse(localStorage.getItem('user') || '{}');
        if (!userData.email) {
            if (confirm('You must register first to access payment pages. Do you want to register now?')) {
                window.location.href = 'pages/register.html';
            }
            return;
        }
        
        // Force first package to payment-basic.html
        if (packageType === 'basic' || packageType === 0) {
            window.location.href = 'pages/payment-basic.html';
            return;
        }
        
        // Other packages
        switch(packageType) {
            case 'pro':
            case 1:
                window.location.href = 'pages/payment-pro.html';
                break;
            case 'enterprise':
            case 2:
                window.location.href = 'pages/payment-enterprise.html';
                break;
            default:
                window.location.href = 'pages/payment-basic.html';
        }
    };
    
    // Fix first package button specifically
    setTimeout(() => {
        const firstButton = document.querySelector('.package-card:first-child button, .futuristic-package-card:first-child button');
        if (firstButton) {
            firstButton.onclick = () => window.testButtonClick('basic');
        }
    }, 1000);
    
})();
