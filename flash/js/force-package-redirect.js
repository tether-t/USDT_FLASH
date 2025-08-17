// Force Package Redirect - إجبار التوجيه للواجهات الصحيحة

(function() {
    'use strict';
    
    // Override all existing functions
    window.selectPackage = function(type) {
        console.log('Force redirect to:', type);
        
        // Check if user is logged in
        const userData = JSON.parse(localStorage.getItem('user') || '{}');
        if (!userData.email) {
            if (confirm('You must register first to access payment pages. Do you want to register now?')) {
                window.location.href = 'pages/register.html';
            }
            return;
        }
        
        if (type === 'pro') {
            window.location.href = 'pages/payment-pro.html';
        } else if (type === 'enterprise') {
            window.location.href = 'pages/payment-enterprise.html';
        } else {
            window.location.href = 'pages/payment-basic.html';
        }
    };
    
    // Force override after page load
    document.addEventListener('DOMContentLoaded', function() {
        setTimeout(() => {
            // Find all buttons and override
            const allButtons = document.querySelectorAll('button, a, .package-btn, [onclick]');
            
            allButtons.forEach(btn => {
                const text = btn.textContent || btn.innerText || '';
                const parent = btn.closest('.package-card, td, .comparison-table');
                
                if (!parent) return;
                
                const parentText = parent.textContent || parent.innerText || '';
                let packageType = 'basic';
                
                // Detect package type
                if (parentText.includes('179') || parentText.includes('1,500') || parentText.includes('🔥') || parentText.includes('Basic Package')) {
                    packageType = 'pro';
                } else if (parentText.includes('499') || parentText.includes('5,000') || parentText.includes('👑') || parentText.includes('Professional')) {
                    packageType = 'enterprise';
                }
                
                // Override click
                btn.onclick = function(e) {
                    e.preventDefault();
                    e.stopPropagation();
                    selectPackage(packageType);
                    return false;
                };
                
                // Also override any existing handlers
                btn.addEventListener('click', function(e) {
                    e.preventDefault();
                    e.stopPropagation();
                    selectPackage(packageType);
                    return false;
                }, true);
            });
        }, 2000); // Wait for other scripts
    });
})();
