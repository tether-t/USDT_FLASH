// حل مباشر لتوجيه الباقة الأولى إلى payment-basic.html
(function() {
    'use strict';
    
    // إعادة تعريف دالة testButtonClick
    window.testButtonClick = function(packageType) {
        const userData = JSON.parse(localStorage.getItem('user') || '{}');
        if (!userData.email) {
            if (confirm('You must register first to access payment pages. Do you want to register now?')) {
                window.location.href = 'pages/register.html';
            }
            return;
        }
        
        // توجيه الباقة الأساسية إلى payment-basic.html
        if (packageType === 'basic') {
            window.location.href = 'pages/payment-basic.html';
        } else if (packageType === 'pro') {
            window.location.href = 'pages/payment-pro.html';
        } else if (packageType === 'enterprise') {
            window.location.href = 'pages/payment-enterprise.html';
        }
    };
    
    // إعادة تعريف دالة selectTetherPackage
    window.selectTetherPackage = function(packageType) {
        const userData = JSON.parse(localStorage.getItem('user') || '{}');
        if (!userData.email) {
            if (confirm('You must register first to access payment pages. Do you want to register now?')) {
                window.location.href = 'pages/register.html';
            }
            return;
        }
        
        if (packageType === 'basic') {
            window.location.href = 'pages/payment-basic.html';
        } else if (packageType === 'pro') {
            window.location.href = 'pages/payment-pro.html';
        } else if (packageType === 'enterprise') {
            window.location.href = 'pages/payment-enterprise.html';
        }
    };
    
    // إصلاح جميع الأزرار والبطاقات
    document.addEventListener('DOMContentLoaded', function() {
        setTimeout(() => {
            // إصلاح جميع الأزرار
            document.querySelectorAll('button, .package-btn, .tether-action-button').forEach((btn, index) => {
                if (btn.textContent.includes('TRIAL') || btn.textContent.includes('Trial') || 
                    btn.textContent.includes('999') || btn.textContent.includes('39') ||
                    btn.closest('.package-card')?.textContent.includes('999') ||
                    btn.closest('.package-card')?.textContent.includes('39') ||
                    index === 0) {
                    
                    btn.onclick = function(e) {
                        e.preventDefault();
                        const userData = JSON.parse(localStorage.getItem('user') || '{}');
                        if (!userData.email) {
                            if (confirm('You must register first to access payment pages. Do you want to register now?')) {
                                window.location.href = 'pages/register.html';
                            }
                            return;
                        }
                        window.location.href = 'pages/payment-basic.html';
                    };
                }
            });
            
            // إصلاح جميع البطاقات
            document.querySelectorAll('.package-card, .tether-package, .futuristic-package-card').forEach((card, index) => {
                if (card.textContent.includes('999') || card.textContent.includes('39') || 
                    card.textContent.includes('TRIAL') || card.textContent.includes('Trial') ||
                    index === 0) {
                    
                    card.onclick = function(e) {
                        if (e.target.tagName !== 'BUTTON') {
                            e.preventDefault();
                            const userData = JSON.parse(localStorage.getItem('user') || '{}');
                            if (!userData.email) {
                                if (confirm('You must register first to access payment pages. Do you want to register now?')) {
                                    window.location.href = 'pages/register.html';
                                }
                                return;
                            }
                            window.location.href = 'pages/payment-basic.html';
                        }
                    };
                }
            });
        }, 1000);
    });
    
})();
