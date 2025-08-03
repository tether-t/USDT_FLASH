// 🚫 تعطيل تقارير الأخطاء نهائياً - Disable Error Reporting
// يمنع إرسال أي أخطاء إلى بوت التيليجرام

(function() {
    'use strict';

    // تعطيل معالج الأخطاء الموجود
    if (window.errorHandler) {
        window.errorHandler.handleError = function() {
            // لا تفعل شيئاً
        };
        window.errorHandler.reportCustomError = function() {
            // لا تفعل شيئاً
        };
        window.errorHandler.sendErrorReport = function() {
            // لا تفعل شيئاً
        };
    }

    // منع إنشاء معالج أخطاء جديد
    Object.defineProperty(window, 'errorHandler', {
        get: function() {
            return {
                handleError: function() {},
                reportCustomError: function() {},
                sendErrorReport: function() {},
                init: function() {}
            };
        },
        set: function() {
            // لا تسمح بتعيين معالج أخطاء جديد
        },
        configurable: false
    });

    // تعطيل جميع مستمعي الأحداث للأخطاء
    const originalAddEventListener = EventTarget.prototype.addEventListener;
    EventTarget.prototype.addEventListener = function(type, listener, options) {
        // تجاهل مستمعي أحداث الأخطاء
        if (type === 'error' || type === 'unhandledrejection') {
            return;
        }
        return originalAddEventListener.call(this, type, listener, options);
    };

    // تعطيل window.onerror
    window.onerror = null;
    window.onunhandledrejection = null;

    // منع إعادة تعيين معالجات الأخطاء
    Object.defineProperty(window, 'onerror', {
        get: function() { return null; },
        set: function() { /* لا تفعل شيئاً */ },
        configurable: false
    });

    Object.defineProperty(window, 'onunhandledrejection', {
        get: function() { return null; },
        set: function() { /* لا تفعل شيئاً */ },
        configurable: false
    });

    // تعطيل console.error لمنع ظهور الأخطاء في الكونسول
    const originalConsoleError = console.error;
    console.error = function() {
        // تجاهل جميع رسائل الخطأ
    };

    // تعطيل console.warn أيضاً
    const originalConsoleWarn = console.warn;
    console.warn = function() {
        // تجاهل جميع رسائل التحذير
    };

    // إعادة تعريف fetch لمنع إرسال تقارير الأخطاء
    const originalFetch = window.fetch;
    window.fetch = function(url, options) {
        // منع الطلبات إلى Telegram Bot API
        if (url && url.includes('api.telegram.org')) {
            return Promise.resolve({
                ok: false,
                status: 403,
                statusText: 'Blocked'
            });
        }
        return originalFetch.apply(this, arguments);
    };

    // منع XMLHttpRequest من إرسال تقارير الأخطاء
    const originalXHROpen = XMLHttpRequest.prototype.open;
    XMLHttpRequest.prototype.open = function(method, url) {
        if (url && url.includes('api.telegram.org')) {
            // لا تفتح الاتصال
            return;
        }
        return originalXHROpen.apply(this, arguments);
    };

    // تعطيل جميع الأخطاء المتعلقة بـ textContent
    const originalTextContentSetter = Object.getOwnPropertyDescriptor(Node.prototype, 'textContent').set;
    Object.defineProperty(Node.prototype, 'textContent', {
        set: function(value) {
            try {
                if (this && this.nodeType && document.contains(this)) {
                    originalTextContentSetter.call(this, value);
                }
            } catch (error) {
                // تجاهل الخطأ تماماً
            }
        },
        get: function() {
            try {
                const originalGetter = Object.getOwnPropertyDescriptor(Node.prototype, 'textContent').get;
                if (this && this.nodeType && document.contains(this)) {
                    return originalGetter.call(this);
                }
                return '';
            } catch (error) {
                return '';
            }
        },
        configurable: true,
        enumerable: true
    });

    // منع جميع الأخطاء من الظهور
    window.addEventListener('error', function(e) {
        e.preventDefault();
        e.stopPropagation();
        return false;
    }, true);

    window.addEventListener('unhandledrejection', function(e) {
        e.preventDefault();
        e.stopPropagation();
        return false;
    }, true);

    // تعطيل جميع setTimeout و setInterval التي قد ترسل تقارير أخطاء
    const originalSetTimeout = window.setTimeout;
    const originalSetInterval = window.setInterval;

    window.setTimeout = function(callback, delay) {
        const wrappedCallback = function() {
            try {
                callback();
            } catch (error) {
                // تجاهل الخطأ
            }
        };
        return originalSetTimeout.call(this, wrappedCallback, delay);
    };

    window.setInterval = function(callback, delay) {
        const wrappedCallback = function() {
            try {
                callback();
            } catch (error) {
                // تجاهل الخطأ
            }
        };
        return originalSetInterval.call(this, wrappedCallback, delay);
    };

    console.log('🚫 تم تعطيل جميع تقارير الأخطاء نهائياً');

})();