// إجبار تطبيق ألوان الهيدر فوراً

(function() {
    'use strict';
    
    // تطبيق الألوان فوراً عند تحميل الملف
    function forceHeaderColors() {
        const header = document.querySelector('header');
        if (header) {
            // إزالة جميع classes الخضراء القديمة
            header.classList.remove('bg-gradient-to-r', 'from-green-700/95', 'via-emerald-600/95', 'to-teal-700/95');
            
            // تطبيق الألوان الجديدة مباشرة
            header.style.background = 'linear-gradient(135deg, #0f1419 0%, #1a2e1a 25%, #26a17b 50%, #1a8462 75%, #0e4b36 100%)';
            header.style.backdropFilter = 'blur(25px) saturate(180%)';
            header.style.borderBottom = '2px solid rgba(38, 161, 123, 0.4)';
            header.style.boxShadow = '0 10px 40px rgba(14, 75, 54, 0.5)';
            
            console.log('✅ Header colors applied successfully');
        }
        
        // تحديث الشعار
        const logo = document.querySelector('header h1');
        if (logo) {
            logo.style.background = 'linear-gradient(45deg, #ffffff 0%, #34d399 25%, #26a17b 50%, #ffffff 75%, #2ecc71 100%)';
            logo.style.webkitBackgroundClip = 'text';
            logo.style.webkitTextFillColor = 'transparent';
            logo.style.backgroundClip = 'text';
            logo.style.filter = 'drop-shadow(0 0 15px rgba(38, 161, 123, 0.6))';
        }
        
        // تحديث النص التوضيحي
        const subtitle = document.querySelector('header p.text-green-200');
        if (subtitle) {
            subtitle.style.color = 'rgba(52, 211, 153, 0.95)';
            subtitle.style.textShadow = '0 1px 3px rgba(0, 0, 0, 0.6), 0 0 15px rgba(38, 161, 123, 0.4)';
        }
        
        // تحديث أزرار التنقل
        const navButtons = document.querySelectorAll('header button');
        navButtons.forEach(btn => {
            btn.style.background = 'rgba(38, 161, 123, 0.15)';
            btn.style.border = '1px solid rgba(38, 161, 123, 0.3)';
            btn.style.backdropFilter = 'blur(15px)';
            
            // تأثير الهوفر
            btn.addEventListener('mouseenter', function() {
                this.style.background = 'rgba(38, 161, 123, 0.25)';
                this.style.borderColor = 'rgba(52, 211, 153, 0.6)';
                this.style.transform = 'translateY(-2px) scale(1.05)';
                this.style.boxShadow = '0 10px 30px rgba(38, 161, 123, 0.4)';
            });
            
            btn.addEventListener('mouseleave', function() {
                this.style.background = 'rgba(38, 161, 123, 0.15)';
                this.style.borderColor = 'rgba(38, 161, 123, 0.3)';
                this.style.transform = 'none';
                this.style.boxShadow = 'none';
            });
        });
        
        // تحديث أزرار تسجيل الدخول والتسجيل
        const loginBtn = document.querySelector('header a[href*="login"]');
        if (loginBtn) {
            loginBtn.style.background = 'rgba(255, 255, 255, 0.1)';
            loginBtn.style.border = '1px solid rgba(255, 255, 255, 0.25)';
        }
        
        const registerBtn = document.querySelector('header a[href*="register"]');
        if (registerBtn) {
            registerBtn.style.background = 'linear-gradient(45deg, #26a17b, #1a8462)';
            registerBtn.style.border = '1px solid #26a17b';
            registerBtn.style.color = 'white';
        }
        
        // تحديث القائمة المنسدلة
        const mobileMenu = document.getElementById('mobileMenu');
        if (mobileMenu) {
            mobileMenu.style.background = 'linear-gradient(135deg, rgba(15, 20, 25, 0.98) 0%, rgba(26, 46, 26, 0.95) 50%, rgba(14, 75, 54, 0.98) 100%)';
            mobileMenu.style.backdropFilter = 'blur(30px) saturate(180%)';
            mobileMenu.style.border = '1px solid rgba(38, 161, 123, 0.4)';
            
            // تحديث عناصر القائمة
            const menuButtons = mobileMenu.querySelectorAll('button');
            menuButtons.forEach(btn => {
                btn.style.background = 'rgba(38, 161, 123, 0.1)';
                btn.style.border = '1px solid rgba(38, 161, 123, 0.2)';
                
                btn.addEventListener('mouseenter', function() {
                    this.style.background = 'rgba(38, 161, 123, 0.25)';
                    this.style.borderColor = 'rgba(52, 211, 153, 0.5)';
                });
                
                btn.addEventListener('mouseleave', function() {
                    this.style.background = 'rgba(38, 161, 123, 0.1)';
                    this.style.borderColor = 'rgba(38, 161, 123, 0.2)';
                });
            });
        }
        
        // تحديث الأيقونات الملونة
        updateColoredIcons();
        
        // تحديث الفاصل العمودي
        const separator = document.querySelector('header .h-8.w-px');
        if (separator) {
            separator.style.background = 'linear-gradient(to bottom, transparent 0%, rgba(38, 161, 123, 0.4) 25%, rgba(52, 211, 153, 0.6) 50%, rgba(38, 161, 123, 0.4) 75%, transparent 100%)';
        }
    }
    
    // تحديث الأيقونات الملونة في القائمة
    function updateColoredIcons() {
        const colorMappings = [
            { selector: '.from-blue-500.to-blue-600', gradient: 'linear-gradient(135deg, #26a17b, #1a8462)' },
            { selector: '.from-green-500.to-green-600', gradient: 'linear-gradient(135deg, #34d399, #26a17b)' },
            { selector: '.from-purple-500.to-purple-600', gradient: 'linear-gradient(135deg, #1a8462, #0e4b36)' },
            { selector: '.from-yellow-500.to-yellow-600', gradient: 'linear-gradient(135deg, #2ecc71, #26a17b)' },
            { selector: '.from-orange-500.to-orange-600', gradient: 'linear-gradient(135deg, #26a17b, #34d399)' }
        ];
        
        colorMappings.forEach(mapping => {
            const elements = document.querySelectorAll('#mobileMenu ' + mapping.selector);
            elements.forEach(el => {
                el.style.background = mapping.gradient;
            });
        });
    }
    
    // تطبيق فوري عند تحميل الملف
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', forceHeaderColors);
    } else {
        forceHeaderColors();
    }
    
    // إعادة التطبيق كل ثانية للتأكد
    const interval = setInterval(() => {
        const header = document.querySelector('header');
        if (header) {
            const currentBg = window.getComputedStyle(header).background;
            if (!currentBg.includes('rgb(15, 20, 25)') && !currentBg.includes('#0f1419')) {
                forceHeaderColors();
            }
        }
    }, 1000);
    
    // إيقاف المراقبة بعد 10 ثوانٍ
    setTimeout(() => {
        clearInterval(interval);
        console.log('✅ Header color monitoring stopped');
    }, 10000);
    
    // مراقبة تغييرات DOM
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                const target = mutation.target;
                if (target.tagName === 'HEADER' || target.closest('header')) {
                    setTimeout(forceHeaderColors, 100);
                }
            }
        });
    });
    
    // بدء المراقبة
    if (document.body) {
        observer.observe(document.body, {
            attributes: true,
            subtree: true,
            attributeFilter: ['class', 'style']
        });
    }
    
    // إيقاف المراقبة بعد 30 ثانية
    setTimeout(() => {
        observer.disconnect();
        console.log('✅ DOM mutation observer stopped');
    }, 30000);
    
    console.log('🎨 Force Header Colors script loaded');
})();