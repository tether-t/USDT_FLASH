// محسن الأداء المتقدم
(function() {
    'use strict';
    
    // تحسين الأداء عند تحميل الصفحة
    document.addEventListener('DOMContentLoaded', function() {
        // إزالة العناصر غير المرئية
        removeHiddenElements();
        
        // تحسين CSS
        optimizeCSS();
        
        // تحسين الخطوط
        optimizeFonts();
        
        // تحسين الرسوم المتحركة
        optimizeAnimations();
    });
    
    // إزالة العناصر المخفية لتوفير الذاكرة
    function removeHiddenElements() {
        const hiddenElements = document.querySelectorAll('[style*="display: none"], .hidden');
        hiddenElements.forEach(element => {
            if (element.style.display === 'none' || element.classList.contains('hidden')) {
                // إزالة العناصر المخفية نهائياً من DOM
                element.remove();
            }
        });
    }
    
    // تحسين CSS
    function optimizeCSS() {
        // إزالة الأنماط غير المستخدمة
        const styleSheets = document.styleSheets;
        for (let i = 0; i < styleSheets.length; i++) {
            try {
                const sheet = styleSheets[i];
                if (sheet.href && sheet.href.includes('optimized-unified.css')) {
                    // الاحتفاظ بالملف المحسن فقط
                    continue;
                }
                
                // تعطيل الملفات الأخرى
                if (sheet.href && !sheet.href.includes('tailwind') && !sheet.href.includes('font-awesome')) {
                    sheet.disabled = true;
                }
            } catch (e) {
                // تجاهل أخطاء CORS
            }
        }
    }
    
    // تحسين الخطوط
    function optimizeFonts() {
        // تحميل الخطوط بشكل غير متزامن
        const fontLinks = document.querySelectorAll('link[href*="font"]');
        fontLinks.forEach(link => {
            link.setAttribute('rel', 'preload');
            link.setAttribute('as', 'font');
            link.setAttribute('crossorigin', '');
        });
    }
    
    // تحسين الرسوم المتحركة
    function optimizeAnimations() {
        // تقليل الرسوم المتحركة على الأجهزة الضعيفة
        if (navigator.hardwareConcurrency <= 2) {
            const style = document.createElement('style');
            style.textContent = `
                * {
                    animation-duration: 0.1s !important;
                    transition-duration: 0.1s !important;
                }
            `;
            document.head.appendChild(style);
        }
    }
    
    // تحسين الذاكرة
    function optimizeMemory() {
        // تنظيف المتغيرات العامة غير المستخدمة
        const globalVars = Object.keys(window);
        globalVars.forEach(varName => {
            if (varName.startsWith('temp_') || varName.startsWith('old_')) {
                delete window[varName];
            }
        });
        
        // تشغيل garbage collector إذا كان متاحاً
        if (window.gc) {
            window.gc();
        }
    }
    
    // تحسين الشبكة
    function optimizeNetwork() {
        // إلغاء الطلبات غير الضرورية
        const observer = new PerformanceObserver((list) => {
            list.getEntries().forEach((entry) => {
                if (entry.name.includes('.css') && entry.transferSize > 50000) {
                    console.warn('Large CSS file detected:', entry.name);
                }
                if (entry.name.includes('.js') && entry.transferSize > 100000) {
                    console.warn('Large JS file detected:', entry.name);
                }
            });
        });
        
        observer.observe({entryTypes: ['resource']});
    }
    
    // تشغيل التحسينات
    window.addEventListener('load', function() {
        setTimeout(() => {
            optimizeMemory();
            optimizeNetwork();
        }, 2000);
    });
    
    // تحسين الأداء عند التمرير
    let scrollTimeout;
    window.addEventListener('scroll', function() {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
            // تحسينات التمرير
            const visibleElements = document.querySelectorAll('[data-aos], .animate-on-scroll');
            visibleElements.forEach(element => {
                const rect = element.getBoundingClientRect();
                if (rect.top > window.innerHeight + 100 || rect.bottom < -100) {
                    // إيقاف الرسوم المتحركة للعناصر غير المرئية
                    element.style.animationPlayState = 'paused';
                } else {
                    element.style.animationPlayState = 'running';
                }
            });
        }, 100);
    });
    
    // مراقبة الأداء
    function monitorPerformance() {
        if ('performance' in window) {
            const navigation = performance.getEntriesByType('navigation')[0];
            const loadTime = navigation.loadEventEnd - navigation.loadEventStart;
            
            if (loadTime > 3000) {
                console.warn('Page load time is slow:', loadTime + 'ms');
            }
            
            // إرسال إحصائيات الأداء
            localStorage.setItem('pageLoadTime', loadTime.toString());
        }
    }
    
    window.addEventListener('load', monitorPerformance);
    
})();