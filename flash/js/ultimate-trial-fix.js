// الحل الأخير والأبسط - إصلاح توجيه الباقة الأولى
(function() {
    'use strict';
    
    // إعادة تعريف جميع الدوال المتعلقة بالباقات
    window.testButtonClick = function(packageType) {
        const userData = JSON.parse(localStorage.getItem('user') || '{}');
        if (!userData.email) {
            if (confirm('You must register first to access payment pages. Do you want to register now?')) {
                window.location.href = 'pages/register.html';
            }
            return;
        }
        
        if (packageType === 'basic' || packageType === 0) {
            window.location.href = 'pages/payment-basic.html';
        } else if (packageType === 'pro' || packageType === 1) {
            window.location.href = 'pages/payment-pro.html';
        } else if (packageType === 'enterprise' || packageType === 2) {
            window.location.href = 'pages/payment-enterprise.html';
        } else {
            window.location.href = 'pages/payment-basic.html';
        }
    };
    
    window.selectTetherPackage = function(packageType) {
        const userData = JSON.parse(localStorage.getItem('user') || '{}');
        if (!userData.email) {
            if (confirm('You must register first to access payment pages. Do you want to register now?')) {
                window.location.href = 'pages/register.html';
            }
            return;
        }
        
        if (packageType === 'basic' || packageType === 0) {
            window.location.href = 'pages/payment-basic.html';
        } else if (packageType === 'pro' || packageType === 1) {
            window.location.href = 'pages/payment-pro.html';
        } else if (packageType === 'enterprise' || packageType === 2) {
            window.location.href = 'pages/payment-enterprise.html';
        } else {
            window.location.href = 'pages/payment-basic.html';
        }
    };
    
    window.selectBasicPackage = function() {
        const userData = JSON.parse(localStorage.getItem('user') || '{}');
        if (!userData.email) {
            if (confirm('You must register first to access payment pages. Do you want to register now?')) {
                window.location.href = 'pages/register.html';
            }
            return;
        }
        window.location.href = 'pages/payment-basic.html';
    };
    
    // إصلاح جميع الأزرار والبطاقات عند تحميل الصفحة
    document.addEventListener('DOMContentLoaded', function() {
        setTimeout(() => {
            // البحث عن جميع العناصر التي قد تحتوي على الباقة الأولى
            const allClickableElements = document.querySelectorAll('button, .package-card, .tether-package, .futuristic-package-card, .package-btn, .tether-action-button, [onclick], [data-package]');
            
            allClickableElements.forEach((element, index) => {
                const text = (element.textContent || element.innerText || '').toLowerCase();
                const onclick = element.getAttribute('onclick') || '';
                
                // تحديد إذا كان هذا العنصر يخص الباقة الأولى
                const isFirstPackage = text.includes('999') || 
                                     text.includes('39') || 
                                     text.includes('trial') || 
                                     onclick.includes('basic') ||
                                     onclick.includes('0') ||
                                     element.getAttribute('data-package') === 'basic' ||
                                     element.getAttribute('data-package') === '0' ||
                                     (index === 0 && element.classList.contains('package-card'));
                
                if (isFirstPackage) {
                    // إزالة جميع معالجات الأحداث الموجودة
                    element.onclick = null;
                    element.removeAttribute('onclick');
                    
                    // إضافة معالج حدث جديد
                    element.addEventListener('click', function(e) {
                        e.preventDefault();
                        e.stopPropagation();
                        
                        const userData = JSON.parse(localStorage.getItem('user') || '{}');
                        if (!userData.email) {
                            if (confirm('You must register first to access payment pages. Do you want to register now?')) {
                                window.location.href = 'pages/register.html';
                            }
                            return;
                        }
                        
                        console.log('Redirecting to payment-basic.html');
                        window.location.href = 'pages/payment-basic.html';
                    });
                    
                    console.log('✅ Fixed first package element:', element);
                }
            });
            
            console.log('🎯 Ultimate trial fix applied successfully');
        }, 3000); // تأخير أكبر للتأكد من تحميل جميع العناصر
    });
    
})();
