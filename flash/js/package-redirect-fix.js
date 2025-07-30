// Package Redirect Fix - إصلاح نهائي لمشكلة توجيه الباقات
// هذا الملف يضمن أن جميع أزرار الباقات تتوجه للصفحات الصحيحة

(function() {
    'use strict';
    
    console.log('🔧 Package Redirect Fix loaded');
    
    // دالة للتحقق من تسجيل الدخول
    function checkUserLogin() {
        const userData = JSON.parse(localStorage.getItem('user') || '{}');
        return userData.email ? true : false;
    }
    
    // دالة التوجيه الصحيحة للباقات
    function redirectToPackage(packageType) {
        console.log('🎯 Redirecting to package:', packageType);
        
        // التحقق من تسجيل الدخول
        if (!checkUserLogin()) {
            if (confirm('يجب عليك التسجيل أولاً للوصول إلى صفحات الدفع. هل تريد التسجيل الآن؟')) {
                window.location.href = 'pages/register.html';
            }
            return;
        }
        
        // التوجيه للصفحة الصحيحة
        let targetUrl = 'pages/payment-basic.html';
        
        switch(packageType) {
            case 'basic':
                targetUrl = 'pages/payment-basic.html';
                break;
            case 'pro':
                targetUrl = 'pages/payment-pro.html';
                break;
            case 'enterprise':
            case 'professional':
                targetUrl = 'pages/payment-enterprise.html';
                break;
            default:
                targetUrl = 'pages/payment-basic.html';
        }
        
        console.log('🚀 Redirecting to:', targetUrl);
        window.location.href = targetUrl;
    }
    
    // دالة لتحديد نوع الباقة من النص
    function detectPackageType(text) {
        const lowerText = text.toLowerCase();
        
        // الباقة الاحترافية (Enterprise/Professional)
        if (lowerText.includes('599') || 
            lowerText.includes('10,000') || 
            lowerText.includes('10000') ||
            lowerText.includes('professional') ||
            lowerText.includes('enterprise') ||
            lowerText.includes('👑')) {
            return 'enterprise';
        }
        
        // الباقة المتوسطة (Pro)
        if (lowerText.includes('359') || 
            lowerText.includes('3,500') || 
            lowerText.includes('3500') ||
            lowerText.includes('pro') ||
            lowerText.includes('🔥')) {
            return 'pro';
        }
        
        // الباقة الأساسية (Basic)
        return 'basic';
    }
    
    // دالة لإصلاح جميع أزرار الباقات
    function fixAllPackageButtons() {
        console.log('🔧 Fixing all package buttons...');
        
        // البحث عن جميع الأزرار المتعلقة بالباقات
        const selectors = [
            '.package-card button',
            '.tether-action-button',
            '.package-btn',
            'button[onclick*="payment"]',
            'button[onclick*="package"]',
            '.tether-package button'
        ];
        
        const allButtons = document.querySelectorAll(selectors.join(', '));
        console.log('🎯 Found', allButtons.length, 'package buttons');
        
        allButtons.forEach((button, index) => {
            // تجاهل الأزرار غير المتعلقة بالباقات
            if (button.onclick && button.onclick.toString().includes('support.html')) return;
            if (button.onclick && button.onclick.toString().includes('live-transactions.html')) return;
            if (button.onclick && button.onclick.toString().includes('profile.html')) return;
            if (button.classList.contains('login-button') || 
                button.classList.contains('register-button') ||
                button.classList.contains('guest-button')) return;
            
            // العثور على البطاقة الأب
            const parentCard = button.closest('.package-card') || 
                              button.closest('.tether-package') || 
                              button.closest('td');
            
            if (!parentCard) return;
            
            // تحديد نوع الباقة
            const cardText = parentCard.textContent || parentCard.innerText || '';
            const packageType = detectPackageType(cardText);
            
            console.log(`🎯 Button ${index + 1}: Package type = ${packageType}`);
            
            // إزالة جميع المعالجات الموجودة
            button.onclick = null;
            button.removeAttribute('onclick');
            
            // إضافة معالج جديد
            button.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                redirectToPackage(packageType);
            }, true);
            
            // إضافة معالج للبطاقة نفسها
            if (parentCard && !parentCard.hasAttribute('data-click-fixed')) {
                parentCard.setAttribute('data-click-fixed', 'true');
                parentCard.style.cursor = 'pointer';
                
                parentCard.addEventListener('click', function(e) {
                    // تجاهل إذا تم النقر على الزر نفسه
                    if (e.target.closest('button')) return;
                    
                    e.preventDefault();
                    e.stopPropagation();
                    redirectToPackage(packageType);
                });
            }
        });
        
        console.log('✅ All package buttons fixed successfully');
    }
    
    // تشغيل الإصلاح عند تحميل الصفحة
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            setTimeout(fixAllPackageButtons, 1000);
            setTimeout(fixAllPackageButtons, 3000); // إصلاح إضافي
        });
    } else {
        setTimeout(fixAllPackageButtons, 1000);
        setTimeout(fixAllPackageButtons, 3000); // إصلاح إضافي
    }
    
    // مراقبة التغييرات في DOM
    const observer = new MutationObserver(function(mutations) {
        let shouldFix = false;
        mutations.forEach(function(mutation) {
            if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
                mutation.addedNodes.forEach(function(node) {
                    if (node.nodeType === 1 && 
                        (node.classList.contains('package-card') || 
                         node.classList.contains('tether-package') ||
                         node.querySelector && node.querySelector('.package-btn'))) {
                        shouldFix = true;
                    }
                });
            }
        });
        
        if (shouldFix) {
            setTimeout(fixAllPackageButtons, 500);
        }
    });
    
    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
    
    // إتاحة الدوال عالمياً للاستخدام
    window.redirectToPackage = redirectToPackage;
    window.detectPackageType = detectPackageType;
    window.fixAllPackageButtons = fixAllPackageButtons;
    
    console.log('✅ Package Redirect Fix initialized successfully');
})();