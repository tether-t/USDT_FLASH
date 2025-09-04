// الحل النهائي البسيط - توجيه الباقة الأولى إلى payment-basic.html
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(() => {
        // البحث عن جميع الأزرار والبطاقات
        const allElements = document.querySelectorAll('button, .package-card, .tether-package, .futuristic-package-card, .package-btn, .tether-action-button');
        
        allElements.forEach((element, index) => {
            const text = element.textContent || element.innerText || '';
            
            // إذا كان العنصر يحتوي على معلومات الباقة الأولى
            if (text.includes('999') || text.includes('39') || text.includes('Trial') || text.includes('TRIAL') || 
                (index === 0 && (element.tagName === 'BUTTON' || element.classList.contains('package-card')))) {
                
                // إزالة جميع معالجات الأحداث الموجودة
                element.onclick = null;
                element.removeAttribute('onclick');
                
                // إضافة معالج حدث جديد
                element.addEventListener('click', function(e) {
                    e.preventDefault();
                    e.stopPropagation();
                    
                    // فحص تسجيل الدخول
                    const userData = JSON.parse(localStorage.getItem('user') || '{}');
                    if (!userData.email) {
                        if (confirm('You must register first to access payment pages. Do you want to register now?')) {
                            window.location.href = 'pages/register.html';
                        }
                        return;
                    }
                    
                    // التوجه إلى صفحة الدفع الصحيحة
                    window.location.href = 'pages/payment-basic.html';
                });
                
                console.log('Fixed element:', element, 'Text:', text.substring(0, 50));
            }
        });
        
        console.log('✅ Final trial package redirect fix applied');
    }, 2000);
});
