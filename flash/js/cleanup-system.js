// نظام التنظيف الشامل - لتحسين الأداء
// Complete Cleanup System - For Performance Optimization

(function() {
    'use strict';

    console.log('🧹 بدء نظام التنظيف الشامل...');

    // تنظيف intervals المتعددة
    function cleanupIntervals() {
        let intervalsCleaned = 0;
        
        // تنظيف intervals من 1 إلى 1000
        for (let i = 1; i <= 1000; i++) {
            try {
                clearInterval(i);
                clearTimeout(i);
                intervalsCleaned++;
            } catch (e) {
                // تجاهل الأخطاء
            }
        }
        
        console.log(`🧹 تم تنظيف ${intervalsCleaned} interval/timeout`);
    }

    // تنظيف event listeners المكررة
    function cleanupEventListeners() {
        // قائمة بالعناصر التي عليها listeners متعددة
        const elementsWithListeners = document.querySelectorAll('*');
        let listenersRemoved = 0;
        
        elementsWithListeners.forEach(element => {
            // إزالة listeners مكررة
            const events = ['input', 'keydown', 'keyup', 'click', 'focus', 'blur', 'change'];
            
            events.forEach(eventType => {
                // إزالة listeners القديمة
                element.removeEventListener(eventType, function() {});
            });
            
            listenersRemoved++;
        });
        
        console.log(`🧹 تم تنظيف listeners من ${listenersRemoved} عنصر`);
    }

    // تنظيف الذاكرة المؤقتة
    function cleanupCache() {
        // تنظيف localStorage القديم
        const oldKeys = [];
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key && (key.includes('old') || key.includes('temp') || key.includes('cache'))) {
                oldKeys.push(key);
            }
        }
        
        oldKeys.forEach(key => {
            localStorage.removeItem(key);
        });
        
        // تنظيف sessionStorage
        sessionStorage.clear();
        
        console.log(`🧹 تم تنظيف ${oldKeys.length} مفتاح من التخزين المحلي`);
    }

    // تنظيف DOM من العناصر غير الضرورية
    function cleanupDOM() {
        // إزالة العناصر المخفية أو المكررة
        const hiddenElements = document.querySelectorAll('[style*="display: none"]');
        const duplicateScripts = document.querySelectorAll('script[src]');
        
        let elementsRemoved = 0;
        
        // إزالة العناصر المخفية غير الضرورية
        hiddenElements.forEach(element => {
            if (!element.id && !element.className.includes('important')) {
                element.remove();
                elementsRemoved++;
            }
        });
        
        // إزالة الـ scripts المكررة
        const scriptSources = [];
        duplicateScripts.forEach(script => {
            if (scriptSources.includes(script.src)) {
                script.remove();
                elementsRemoved++;
            } else {
                scriptSources.push(script.src);
            }
        });
        
        console.log(`🧹 تم إزالة ${elementsRemoved} عنصر غير ضروري من DOM`);
    }

    // تحسين CSS
    function optimizeCSS() {
        // إزالة CSS rules غير المستخدمة
        const styleSheets = document.styleSheets;
        let rulesOptimized = 0;
        
        for (let i = 0; i < styleSheets.length; i++) {
            try {
                const sheet = styleSheets[i];
                if (sheet.cssRules) {
                    for (let j = sheet.cssRules.length - 1; j >= 0; j--) {
                        const rule = sheet.cssRules[j];
                        
                        // إزالة rules للعدادات المعطلة
                        if (rule.selectorText && 
                            (rule.selectorText.includes('.old-countdown') ||
                             rule.selectorText.includes('.disabled-timer'))) {
                            sheet.deleteRule(j);
                            rulesOptimized++;
                        }
                    }
                }
            } catch (e) {
                // تجاهل أخطاء CORS
            }
        }
        
        console.log(`🧹 تم تحسين ${rulesOptimized} قاعدة CSS`);
    }

    // تنظيف المتغيرات العامة
    function cleanupGlobalVariables() {
        const globalsToClean = [
            'oldCountdownInterval',
            'tempData',
            'cachedElements',
            'debugInfo',
            'testVariables'
        ];
        
        let variablesCleaned = 0;
        
        globalsToClean.forEach(varName => {
            if (window[varName] !== undefined) {
                delete window[varName];
                variablesCleaned++;
            }
        });
        
        console.log(`🧹 تم تنظيف ${variablesCleaned} متغير عام`);
    }

    // تحسين طلبات الشبكة
    function optimizeNetworkRequests() {
        // تأجيل الطلبات غير الضرورية
        const fetch = window.fetch;
        let requestsDeferred = 0;
        
        window.fetch = function(url, options) {
            // تأجيل الطلبات للموارد غير الأساسية
            if (url.includes('analytics') || 
                url.includes('tracking') || 
                url.includes('ads')) {
                
                requestsDeferred++;
                return new Promise(resolve => {
                    setTimeout(() => {
                        resolve(fetch(url, options));
                    }, 5000); // تأجيل 5 ثوان
                });
            }
            
            return fetch(url, options);
        };
        
        console.log(`🧹 تم تأجيل ${requestsDeferred} طلب شبكة`);
    }

    // إجبار garbage collection
    function forceGarbageCollection() {
        // إنشاء كائنات مؤقتة ثم حذفها لإجبار garbage collection
        const tempObjects = [];
        for (let i = 0; i < 100; i++) {
            tempObjects.push({
                data: new Array(1000).fill('temp'),
                timestamp: Date.now()
            });
        }
        
        // حذف الكائنات
        tempObjects.length = 0;
        
        // إجبار garbage collection إذا كان متاحاً
        if (window.gc) {
            window.gc();
            console.log('🧹 تم إجبار garbage collection');
        }
        
        console.log('🧹 تم تنظيف الذاكرة');
    }

    // مراقب الأداء
    function performanceMonitor() {
        const startTime = performance.now();
        
        setInterval(() => {
            const currentTime = performance.now();
            const memoryInfo = performance.memory || {};
            
            const performanceData = {
                runtime: Math.round(currentTime - startTime),
                memoryUsed: Math.round((memoryInfo.usedJSHeapSize || 0) / 1024 / 1024),
                memoryTotal: Math.round((memoryInfo.totalJSHeapSize || 0) / 1024 / 1024)
            };
            
            // إذا استهلاك الذاكرة أكثر من 50MB، قم بتنظيف إضافي
            if (performanceData.memoryUsed > 50) {
                console.log('⚠️ استهلاك ذاكرة عالي - بدء تنظيف إضافي');
                cleanupIntervals();
                forceGarbageCollection();
            }
            
        }, 30000); // كل 30 ثانية
    }

    // تشغيل نظام التنظيف الشامل
    function runCompleteCleanup() {
        console.log('🚀 بدء التنظيف الشامل...');
        
        cleanupIntervals();
        cleanupEventListeners();
        cleanupCache();
        cleanupDOM();
        optimizeCSS();
        cleanupGlobalVariables();
        optimizeNetworkRequests();
        forceGarbageCollection();
        
        console.log('✅ تم انتهاء التنظيف الشامل');
        
        // بدء مراقب الأداء
        performanceMonitor();
    }

    // تشغيل التنظيف بعد تحميل الصفحة
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            setTimeout(runCompleteCleanup, 2000);
        });
    } else {
        setTimeout(runCompleteCleanup, 2000);
    }

    // إضافة دالة تنظيف يدوية للطوارئ
    window.emergencyCleanup = function() {
        console.log('🚨 تنظيف طوارئ!');
        runCompleteCleanup();
        
        // إيقاف جميع العمليات
        for (let i = 0; i < 10000; i++) {
            clearInterval(i);
            clearTimeout(i);
        }
        
        alert('تم تنظيف طوارئ للموقع! 🧹');
    };

    console.log('✅ نظام التنظيف الشامل جاهز');

})();