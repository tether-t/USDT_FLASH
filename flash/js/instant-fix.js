// إصلاح فوري - يعمل فور تحميل الصفحة
(function() {
    // إصلاح فوري للدوال
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
    
    // إصلاح فوري للعناصر الموجودة
    function fixExistingElements() {
        const buttons = document.querySelectorAll('button[onclick*="testButtonClick"], button[onclick*="selectTetherPackage"]');
        buttons.forEach(button => {
            const onclick = button.getAttribute('onclick');
            if (onclick && (onclick.includes('basic') || onclick.includes('0'))) {
                button.onclick = function(e) {
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
    }
    
    // تشغيل الإصلاح فوراً
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', fixExistingElements);
    } else {
        fixExistingElements();
    }
    
    // تشغيل الإصلاح كل ثانية للتأكد
    setInterval(fixExistingElements, 1000);
    
})();
