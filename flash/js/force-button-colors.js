// Force Button Colors - تطبيق فوري للألوان
(function() {
    'use strict';
    
    function forceButtonColors() {
        // البحث عن جميع الأزرار في البطاقات
        const packageCards = document.querySelectorAll('.package-card');
        
        packageCards.forEach((card, index) => {
            const buttons = card.querySelectorAll('button, .tether-action-button, .package-btn');
            const cardText = card.textContent.toLowerCase();
            
            buttons.forEach(button => {
                // تحديد اللون بناءً على المحتوى أو الترتيب
                let color = '';
                
                if (cardText.includes('49') || cardText.includes('trial') || cardText.includes('1,000') || index === 0) {
                    // الباقة الأساسية - أخضر
                    color = 'linear-gradient(45deg, #10b981, #059669)';
                    button.style.setProperty('background', color, 'important');
                    button.style.setProperty('border-color', '#10b981', 'important');
                    button.style.setProperty('box-shadow', '0 4px 15px rgba(16, 185, 129, 0.3)', 'important');
                } else if (cardText.includes('149') || cardText.includes('basic') || cardText.includes('3,500') || index === 1) {
                    // الباقة المتوسطة - أزرق
                    color = 'linear-gradient(45deg, #3b82f6, #2563eb)';
                    button.style.setProperty('background', color, 'important');
                    button.style.setProperty('border-color', '#3b82f6', 'important');
                    button.style.setProperty('box-shadow', '0 4px 15px rgba(59, 130, 246, 0.3)', 'important');
                } else if (cardText.includes('399') || cardText.includes('professional') || cardText.includes('10,000') || index === 2) {
                    // الباقة المتقدمة - بنفسجي
                    color = 'linear-gradient(45deg, #7c3aed, #5b21b6)';
                    button.style.setProperty('background', color, 'important');
                    button.style.setProperty('border-color', '#7c3aed', 'important');
                    button.style.setProperty('box-shadow', '0 4px 15px rgba(124, 58, 237, 0.3)', 'important');
                }
                
                button.style.setProperty('color', 'white', 'important');
            });
        });
        
        console.log('🎨 Button colors forced successfully!');
    }
    
    // تطبيق فوري
    forceButtonColors();
    
    // تطبيق عند تحميل DOM
    document.addEventListener('DOMContentLoaded', forceButtonColors);
    
    // تطبيق متكرر
    setInterval(forceButtonColors, 1000);
    
    // مراقب للتغييرات
    const observer = new MutationObserver(forceButtonColors);
    if (document.body) {
        observer.observe(document.body, { childList: true, subtree: true });
    }
    
    // جعل الوظيفة متاحة عالمياً
    window.forceButtonColors = forceButtonColors;
})();
