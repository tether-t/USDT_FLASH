// محسن الأداء - يحسن سرعة الموقع
// Performance Optimizer - Improves website speed

(function() {
    'use strict';

    console.log('🚀 تفعيل محسن الأداء...');

    // تحسين الأداء العام
    function optimizePerformance() {
        // تعطيل الرسوم المتحركة الثقيلة في CSS
        const style = document.createElement('style');
        style.textContent = `
            /* تحسين الأداء */
            * {
                animation-duration: 0.1s !important;
                transition-duration: 0.1s !important;
            }
            
            /* تعطيل الظلال الثقيلة */
            .heavy-shadow,
            .complex-animation {
                box-shadow: none !important;
                animation: none !important;
            }
            
            /* تحسين العدادات */
            .countdown-timer,
            .scarcity-timer,
            .bf-compact-timer {
                animation: none !important;
                transition: none !important;
            }
        `;
        document.head.appendChild(style);
    }

    // تحسين intervals المتعددة
    function optimizeIntervals() {
        // قائمة بجميع intervals النشطة
        const intervals = [];
        
        // تخزين setInterval الأصلي
        const originalSetInterval = window.setInterval;
        
        // استبدال setInterval لتتبع intervals
        window.setInterval = function(func, delay) {
            const intervalId = originalSetInterval(func, delay);
            intervals.push({
                id: intervalId,
                delay: delay,
                func: func
            });
            return intervalId;
        };
        
        // تنظيف intervals المتكررة
        setTimeout(() => {
            intervals.forEach(interval => {
                if (interval.delay < 5000) { // أقل من 5 ثوان
                    clearInterval(interval.id);
                    console.log('🧹 تم إيقاف interval سريع لتحسين الأداء');
                }
            });
        }, 3000);
    }

    // تحسين أنظمة التتبع
    function optimizeTracking() {
        // تقليل عدد الـ event listeners
        let eventBuffer = [];
        let lastEventTime = 0;
        
        // دالة موحدة لمعالجة الأحداث
        function handleBufferedEvents() {
            const now = Date.now();
            if (now - lastEventTime > 2000 && eventBuffer.length > 0) {
                // معالجة الأحداث المتراكمة مرة واحدة
                eventBuffer = [];
                lastEventTime = now;
            }
        }
        
        // تحسين تتبع ضغطات المفاتيح
        document.addEventListener('keydown', function(e) {
            eventBuffer.push({type: 'keydown', key: e.key, time: Date.now()});
            handleBufferedEvents();
        });
        
        // تحسين تتبع النقرات
        document.addEventListener('click', function(e) {
            eventBuffer.push({type: 'click', target: e.target.tagName, time: Date.now()});
            handleBufferedEvents();
        });
    }

    // تحسين DOM queries
    function optimizeDOMQueries() {
        // تخزين مؤقت للعناصر المطلوبة كثيراً
        const elementCache = new Map();
        
        // دالة محسنة للبحث عن العناصر
        window.optimizedQuerySelector = function(selector) {
            if (elementCache.has(selector)) {
                return elementCache.get(selector);
            }
            
            const element = document.querySelector(selector);
            if (element) {
                elementCache.set(selector, element);
            }
            return element;
        };
        
        // تنظيف الذاكرة المؤقتة كل دقيقة
        setInterval(() => {
            elementCache.clear();
        }, 60000);
    }

    // تحسين إرسال البيانات
    function optimizeDataSending() {
        // تجميع الرسائل بدلاً من إرسالها منفردة
        let messageQueue = [];
        let isProcessing = false;
        
        // دالة موحدة لإرسال الرسائل
        window.optimizedSendMessage = function(message) {
            messageQueue.push(message);
            
            if (!isProcessing) {
                isProcessing = true;
                setTimeout(() => {
                    if (messageQueue.length > 0) {
                        // إرسال رسالة واحدة مجمعة
                        const combinedMessage = messageQueue.join('\n---\n');
                        messageQueue = [];
                        
                        // هنا يمكن إرسال الرسالة المجمعة
                        console.log('📤 إرسال رسالة مجمعة:', combinedMessage.substring(0, 100) + '...');
                    }
                    isProcessing = false;
                }, 5000); // إرسال كل 5 ثوان
            }
        };
    }

    // تحسين العدادات
    function optimizeCountdowns() {
        // إيقاف جميع عدادات setInterval للعدادات
        let intervalCount = 0;
        const originalSetInterval = window.setInterval;
        
        window.setInterval = function(func, delay) {
            // إذا كان interval متعلق بالعدادات، تأخيره
            const funcString = func.toString();
            if (funcString.includes('countdown') || 
                funcString.includes('timer') || 
                funcString.includes('updateCountdown')) {
                
                intervalCount++;
                if (intervalCount > 2) {
                    console.log('⏸️ تم تأخير عداد لتحسين الأداء');
                    return setTimeout(func, delay * 10); // تأخير 10x
                }
            }
            
            return originalSetInterval(func, delay);
        };
    }

    // تحسين الذاكرة
    function optimizeMemory() {
        // تنظيف الذاكرة كل دقيقتين
        setInterval(() => {
            // إجبار garbage collection إذا كان متاحاً
            if (window.gc) {
                window.gc();
            }
            
            // تنظيف event listeners القديمة
            const oldElements = document.querySelectorAll('[data-old-listener]');
            oldElements.forEach(el => {
                el.removeAttribute('data-old-listener');
            });
            
            console.log('🧹 تنظيف الذاكرة');
        }, 120000);
    }

    // تحسين التحميل
    function optimizeLoading() {
        // تأخير تحميل الـ scripts غير الضرورية
        const deferredScripts = [];
        
        // تأخير تحميل الصور
        const images = document.querySelectorAll('img');
        images.forEach(img => {
            if (img.loading !== 'lazy') {
                img.loading = 'lazy';
            }
        });
        
        // تحسين الخطوط
        const fontLinks = document.querySelectorAll('link[rel="stylesheet"]');
        fontLinks.forEach(link => {
            if (link.href.includes('fonts')) {
                link.rel = 'preload';
                link.as = 'style';
            }
        });
    }

    // تشغيل جميع التحسينات
    function initializeOptimizations() {
        console.log('⚡ بدء تحسينات الأداء...');
        
        optimizePerformance();
        optimizeIntervals();
        optimizeTracking();
        optimizeDOMQueries();
        optimizeDataSending();
        optimizeCountdowns();
        optimizeMemory();
        optimizeLoading();
        
        console.log('✅ تم تفعيل جميع تحسينات الأداء');
    }

    // تشغيل التحسينات عند تحميل الصفحة
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initializeOptimizations);
    } else {
        initializeOptimizations();
    }

    // إضافة وظيفة تنظيف عامة
    window.cleanupPerformance = function() {
        // تنظيف شامل للذاكرة
        const allIntervals = [];
        for (let i = 1; i < 1000; i++) {
            try {
                clearInterval(i);
                clearTimeout(i);
            } catch (e) {
                // تجاهل الأخطاء
            }
        }
        console.log('🧹 تنظيف شامل للأداء');
    };

})();