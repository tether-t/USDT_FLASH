// الحل النهائي لتحسين الأداء
(function() {
    'use strict';
    
    // منع تحميل الملفات المكررة
    const loadedScripts = new Set();
    const loadedStyles = new Set();
    
    // تحسين تحميل الصفحة
    document.addEventListener('DOMContentLoaded', function() {
        // إزالة الملفات المكررة
        removeDuplicateResources();
        
        // تحسين الصور
        optimizeAllImages();
        
        // تحسين الخطوط
        optimizeFontLoading();
        
        // تقليل DOM
        minimizeDOM();
    });
    
    function removeDuplicateResources() {
        // إزالة ملفات CSS المكررة
        const cssLinks = document.querySelectorAll('link[rel="stylesheet"]');
        cssLinks.forEach(link => {
            if (link.href.includes('optimized-unified.css')) {
                return; // الاحتفاظ بالملف المحسن
            }
            
            if (loadedStyles.has(link.href) || 
                link.href.includes('flash.css') ||
                link.href.includes('packages.css') ||
                link.href.includes('testimonials.css') ||
                link.href.includes('features.css') ||
                link.href.includes('animations.css')) {
                link.remove();
            } else {
                loadedStyles.add(link.href);
            }
        });
        
        // إزالة ملفات JS المكررة
        const scripts = document.querySelectorAll('script[src]');
        scripts.forEach(script => {
            if (script.src.includes('optimized-unified.js') || 
                script.src.includes('performance-booster.js')) {
                return; // الاحتفاظ بالملفات المحسنة
            }
            
            if (loadedScripts.has(script.src) ||
                script.src.includes('app.js') ||
                script.src.includes('testimonials.js') ||
                script.src.includes('features.js') ||
                script.src.includes('animations.js')) {
                script.remove();
            } else {
                loadedScripts.add(script.src);
            }
        });
    }
    
    function optimizeAllImages() {
        const images = document.querySelectorAll('img');
        
        images.forEach(img => {
            // إضافة lazy loading
            img.loading = 'lazy';
            
            // تحسين الجودة
            if (img.src && !img.src.includes('data:')) {
                img.style.imageRendering = 'optimizeQuality';
            }
            
            // معالجة الأخطاء
            img.onerror = function() {
                this.style.display = 'none';
            };
        });
    }
    
    function optimizeFontLoading() {
        // تحميل الخطوط بشكل غير متزامن
        const fontAwesome = document.querySelector('link[href*="font-awesome"]');
        if (fontAwesome) {
            fontAwesome.rel = 'preload';
            fontAwesome.as = 'style';
            fontAwesome.onload = function() {
                this.rel = 'stylesheet';
            };
        }
    }
    
    function minimizeDOM() {
        // إزالة التعليقات
        const walker = document.createTreeWalker(
            document.body,
            NodeFilter.SHOW_COMMENT,
            null,
            false
        );
        
        const comments = [];
        let node;
        while (node = walker.nextNode()) {
            comments.push(node);
        }
        
        comments.forEach(comment => {
            if (!comment.textContent.includes('KEEP')) {
                comment.remove();
            }
        });
        
        // إزالة العناصر الفارغة
        const emptyElements = document.querySelectorAll('div:empty, span:empty, p:empty');
        emptyElements.forEach(element => {
            if (!element.hasAttribute('data-keep')) {
                element.remove();
            }
        });
    }
    
    // تحسين الأداء عند التفاعل
    function optimizeInteractions() {
        // تحسين النقرات
        document.addEventListener('click', function(e) {
            // منع النقرات المتعددة السريعة
            if (e.target.dataset.clicking) return;
            
            e.target.dataset.clicking = 'true';
            setTimeout(() => {
                delete e.target.dataset.clicking;
            }, 300);
        });
        
        // تحسين التمرير
        let scrollTimer;
        window.addEventListener('scroll', function() {
            clearTimeout(scrollTimer);
            scrollTimer = setTimeout(() => {
                // تحديث العناصر المرئية فقط
                updateVisibleElements();
            }, 100);
        });
    }
    
    function updateVisibleElements() {
        const elements = document.querySelectorAll('[data-dynamic]');
        elements.forEach(element => {
            const rect = element.getBoundingClientRect();
            const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
            
            if (isVisible && !element.dataset.loaded) {
                // تحميل المحتوى الديناميكي
                element.dataset.loaded = 'true';
            }
        });
    }
    
    // مراقبة الأداء
    function monitorPerformance() {
        if ('performance' in window) {
            window.addEventListener('load', function() {
                setTimeout(() => {
                    const perfData = performance.getEntriesByType('navigation')[0];
                    const loadTime = perfData.loadEventEnd - perfData.loadEventStart;
                    
                    console.log('Page load time:', loadTime + 'ms');
                    
                    if (loadTime < 2000) {
                        console.log('✅ Page load performance: Excellent');
                    } else if (loadTime < 4000) {
                        console.log('⚠️ Page load performance: Good');
                    } else {
                        console.log('❌ Page load performance: Needs improvement');
                    }
                    
                    // حفظ الإحصائيات
                    localStorage.setItem('performanceData', JSON.stringify({
                        loadTime: loadTime,
                        timestamp: Date.now(),
                        userAgent: navigator.userAgent.substring(0, 50)
                    }));
                }, 1000);
            });
        }
    }
    
    // تشغيل التحسينات
    optimizeInteractions();
    monitorPerformance();
    
    // تنظيف الذاكرة كل 30 ثانية
    setInterval(() => {
        if (window.gc) {
            window.gc();
        }
        
        // تنظيف المتغيرات المؤقتة
        Object.keys(window).forEach(key => {
            if (key.startsWith('temp_') || key.startsWith('old_')) {
                delete window[key];
            }
        });
    }, 30000);
    
    console.log('🚀 Final performance optimization loaded');
    
})();