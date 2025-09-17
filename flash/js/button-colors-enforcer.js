// Button Colors Enforcer - تطبيق ألوان الأزرار فوراً
(function() {
    'use strict';
    
    // ألوان الباقات
    const packageColors = {
        basic: {
            background: 'linear-gradient(45deg, #10b981, #059669)',
            borderColor: '#10b981',
            boxShadow: '0 4px 15px rgba(16, 185, 129, 0.3)',
            hoverBackground: 'linear-gradient(45deg, #059669, #047857)',
            hoverBoxShadow: '0 6px 20px rgba(16, 185, 129, 0.4)'
        },
        pro: {
            background: 'linear-gradient(45deg, #3b82f6, #2563eb)',
            borderColor: '#3b82f6',
            boxShadow: '0 4px 15px rgba(59, 130, 246, 0.3)',
            hoverBackground: 'linear-gradient(45deg, #2563eb, #1d4ed8)',
            hoverBoxShadow: '0 6px 20px rgba(59, 130, 246, 0.4)'
        },
        enterprise: {
            background: 'linear-gradient(45deg, #7c3aed, #5b21b6)',
            borderColor: '#7c3aed',
            boxShadow: '0 4px 15px rgba(124, 58, 237, 0.3)',
            hoverBackground: 'linear-gradient(45deg, #5b21b6, #4c1d95)',
            hoverBoxShadow: '0 6px 20px rgba(124, 58, 237, 0.4)'
        }
    };
    
    // تحديد نوع الباقة من النص
    function detectPackageType(text) {
        if (text.includes('49') || text.includes('Trial') || text.includes('1,000')) {
            return 'basic';
        } else if (text.includes('149') || text.includes('Basic') || text.includes('3,500')) {
            return 'pro';
        } else if (text.includes('399') || text.includes('Professional') || text.includes('10,000')) {
            return 'enterprise';
        }
        return null;
    }
    
    // تطبيق الألوان على الزر
    function applyButtonColors(button, packageType) {
        if (!packageColors[packageType]) return;
        
        const colors = packageColors[packageType];
        
        // تطبيق الألوان الأساسية
        button.style.setProperty('background', colors.background, 'important');
        button.style.setProperty('border-color', colors.borderColor, 'important');
        button.style.setProperty('color', 'white', 'important');
        button.style.setProperty('box-shadow', colors.boxShadow, 'important');
        
        // إزالة المستمعين السابقين
        button.removeEventListener('mouseenter', button._hoverIn);
        button.removeEventListener('mouseleave', button._hoverOut);
        
        // إضافة تأثيرات التمرير
        button._hoverIn = function() {
            this.style.setProperty('background', colors.hoverBackground, 'important');
            this.style.setProperty('box-shadow', colors.hoverBoxShadow, 'important');
            this.style.setProperty('transform', 'translateY(-2px)', 'important');
        };
        
        button._hoverOut = function() {
            this.style.setProperty('background', colors.background, 'important');
            this.style.setProperty('box-shadow', colors.boxShadow, 'important');
            this.style.setProperty('transform', 'translateY(0)', 'important');
        };
        
        button.addEventListener('mouseenter', button._hoverIn);
        button.addEventListener('mouseleave', button._hoverOut);
    }
    
    // البحث عن الأزرار وتطبيق الألوان
    function enforceButtonColors() {
        const packageCards = document.querySelectorAll('.package-card');
        
        packageCards.forEach((card, index) => {
            const cardText = card.textContent;
            const packageType = detectPackageType(cardText);
            
            // إذا لم نتمكن من تحديد النوع من النص، استخدم الفهرس
            const finalPackageType = packageType || 
                (index === 0 ? 'basic' : index === 1 ? 'pro' : 'enterprise');
            
            // البحث عن جميع الأزرار في البطاقة
            const buttons = card.querySelectorAll('button, .tether-action-button, .package-btn');
            
            buttons.forEach(button => {
                applyButtonColors(button, finalPackageType);
            });
        });
    }
    
    // تطبيق الألوان فوراً
    function immediateColorApplication() {
        enforceButtonColors();
        
        // تطبيق إضافي بناءً على الترتيب
        const allButtons = document.querySelectorAll('.package-card button, .package-card .tether-action-button, .package-card .package-btn');
        
        allButtons.forEach((button, index) => {
            const card = button.closest('.package-card');
            if (!card) return;
            
            const cardIndex = Array.from(document.querySelectorAll('.package-card')).indexOf(card);
            const packageType = cardIndex === 0 ? 'basic' : cardIndex === 1 ? 'pro' : 'enterprise';
            
            applyButtonColors(button, packageType);
        });
    }
    
    // تشغيل فوري
    immediateColorApplication();
    
    // تطبيق عند تحميل DOM
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', immediateColorApplication);
    }
    
    // تطبيق متكرر لضمان الثبات
    const intervals = [100, 500, 1000, 2000, 3000, 5000];
    intervals.forEach(delay => {
        setTimeout(immediateColorApplication, delay);
    });
    
    // مراقب للتغييرات
    const observer = new MutationObserver(function(mutations) {
        let shouldUpdate = false;
        
        mutations.forEach(function(mutation) {
            if (mutation.type === 'childList') {
                const addedNodes = Array.from(mutation.addedNodes);
                const hasButton = addedNodes.some(node => 
                    node.nodeType === 1 && 
                    (node.tagName === 'BUTTON' || 
                     node.classList.contains('tether-action-button') ||
                     node.classList.contains('package-btn') ||
                     node.querySelector('button, .tether-action-button, .package-btn'))
                );
                
                if (hasButton) {
                    shouldUpdate = true;
                }
            }
        });
        
        if (shouldUpdate) {
            setTimeout(immediateColorApplication, 50);
        }
    });
    
    // بدء المراقبة
    if (document.body) {
        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    }
    
    // جعل الوظيفة متاحة عالمياً
    window.enforceButtonColors = immediateColorApplication;
    
    console.log('🎨 Button Colors Enforcer activated - Package buttons will maintain their colors!');
})();
