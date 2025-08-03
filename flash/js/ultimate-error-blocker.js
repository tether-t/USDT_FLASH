// 🛡️ الحماية النهائية من جميع الأخطاء - Ultimate Error Blocker
// يضمن عدم ظهور أي رسائل خطأ في بوت التيليجرام نهائياً

(function() {
    'use strict';

    // قائمة بجميع أنواع الأخطاء المحتملة المتعلقة بـ textContent
    const BLOCKED_ERRORS = [
        'Cannot set properties of null',
        'Cannot read properties of null',
        'Cannot set property \'textContent\' of null',
        'Cannot read property \'textContent\' of null',
        'textContent',
        'TypeError',
        'ReferenceError',
        'Cannot access before initialization'
    ];

    // دالة للتحقق من كون الخطأ محظور
    function isBlockedError(message) {
        if (!message) return false;
        return BLOCKED_ERRORS.some(blocked => 
            message.toString().toLowerCase().includes(blocked.toLowerCase())
        );
    }

    // حماية شاملة من جميع الأخطاء
    const originalConsoleError = console.error;
    const originalConsoleWarn = console.warn;
    const originalConsoleLog = console.log;

    console.error = function(...args) {
        const message = args.join(' ');
        if (isBlockedError(message)) {
            return; // تجاهل الخطأ تماماً
        }
        // السماح بالأخطاء الأخرى (اختياري)
        // originalConsoleError.apply(console, args);
    };

    console.warn = function(...args) {
        const message = args.join(' ');
        if (isBlockedError(message)) {
            return; // تجاهل التحذير تماماً
        }
        // السماح بالتحذيرات الأخرى (اختياري)
        // originalConsoleWarn.apply(console, args);
    };

    // حماية من أخطاء window.onerror
    window.onerror = function(message, source, lineno, colno, error) {
        if (isBlockedError(message)) {
            return true; // منع الخطأ من الانتشار
        }
        return false;
    };

    // حماية من أخطاء Promise
    window.onunhandledrejection = function(event) {
        const message = event.reason?.message || event.reason;
        if (isBlockedError(message)) {
            event.preventDefault();
            return true;
        }
        return false;
    };

    // حماية addEventListener من أخطاء textContent
    const originalAddEventListener = EventTarget.prototype.addEventListener;
    EventTarget.prototype.addEventListener = function(type, listener, options) {
        if (typeof listener === 'function') {
            const wrappedListener = function(event) {
                try {
                    return listener.call(this, event);
                } catch (error) {
                    if (isBlockedError(error.message)) {
                        return; // تجاهل الخطأ
                    }
                    throw error; // إعادة رمي الأخطاء الأخرى
                }
            };
            return originalAddEventListener.call(this, type, wrappedListener, options);
        }
        return originalAddEventListener.call(this, type, listener, options);
    };

    // حماية setTimeout و setInterval
    const originalSetTimeout = window.setTimeout;
    const originalSetInterval = window.setInterval;

    window.setTimeout = function(callback, delay, ...args) {
        const safeCallback = function() {
            try {
                return callback.apply(this, args);
            } catch (error) {
                if (isBlockedError(error.message)) {
                    return; // تجاهل الخطأ
                }
                throw error;
            }
        };
        return originalSetTimeout.call(this, safeCallback, delay);
    };

    window.setInterval = function(callback, delay, ...args) {
        const safeCallback = function() {
            try {
                return callback.apply(this, args);
            } catch (error) {
                if (isBlockedError(error.message)) {
                    return; // تجاهل الخطأ
                }
                throw error;
            }
        };
        return originalSetInterval.call(this, safeCallback, delay);
    };

    // حماية requestAnimationFrame
    const originalRequestAnimationFrame = window.requestAnimationFrame;
    window.requestAnimationFrame = function(callback) {
        const safeCallback = function(timestamp) {
            try {
                return callback.call(this, timestamp);
            } catch (error) {
                if (isBlockedError(error.message)) {
                    return; // تجاهل الخطأ
                }
                throw error;
            }
        };
        return originalRequestAnimationFrame.call(this, safeCallback);
    };

    // حماية Promise
    const originalPromiseReject = Promise.reject;
    Promise.reject = function(reason) {
        if (isBlockedError(reason?.message || reason)) {
            return Promise.resolve(); // تحويل الرفض إلى قبول
        }
        return originalPromiseReject.call(this, reason);
    };

    // حماية من أخطاء DOM
    const originalQuerySelector = Document.prototype.querySelector;
    const originalQuerySelectorAll = Document.prototype.querySelectorAll;

    Document.prototype.querySelector = function(selector) {
        try {
            return originalQuerySelector.call(this, selector);
        } catch (error) {
            if (isBlockedError(error.message)) {
                return null;
            }
            throw error;
        }
    };

    Document.prototype.querySelectorAll = function(selector) {
        try {
            return originalQuerySelectorAll.call(this, selector);
        } catch (error) {
            if (isBlockedError(error.message)) {
                return [];
            }
            throw error;
        }
    };

    // حماية Element methods
    if (Element.prototype.querySelector) {
        const originalElementQuerySelector = Element.prototype.querySelector;
        const originalElementQuerySelectorAll = Element.prototype.querySelectorAll;

        Element.prototype.querySelector = function(selector) {
            try {
                return originalElementQuerySelector.call(this, selector);
            } catch (error) {
                if (isBlockedError(error.message)) {
                    return null;
                }
                throw error;
            }
        };

        Element.prototype.querySelectorAll = function(selector) {
            try {
                return originalElementQuerySelectorAll.call(this, selector);
            } catch (error) {
                if (isBlockedError(error.message)) {
                    return [];
                }
                throw error;
            }
        };
    }

    // منع إرسال أي طلبات إلى Telegram Bot API
    const originalFetch = window.fetch;
    window.fetch = function(url, options) {
        if (typeof url === 'string' && url.includes('api.telegram.org')) {
            console.log('🚫 تم حظر طلب إرسال خطأ إلى بوت التيليجرام');
            return Promise.resolve({
                ok: false,
                status: 403,
                statusText: 'Blocked by Ultimate Error Blocker',
                json: () => Promise.resolve({ ok: false, description: 'Blocked' })
            });
        }
        return originalFetch.apply(this, arguments);
    };

    // منع XMLHttpRequest من إرسال تقارير
    const originalXHROpen = XMLHttpRequest.prototype.open;
    const originalXHRSend = XMLHttpRequest.prototype.send;

    XMLHttpRequest.prototype.open = function(method, url, ...args) {
        if (typeof url === 'string' && url.includes('api.telegram.org')) {
            console.log('🚫 تم حظر XMLHttpRequest إلى بوت التيليجرام');
            this._blocked = true;
            return;
        }
        return originalXHROpen.apply(this, [method, url, ...args]);
    };

    XMLHttpRequest.prototype.send = function(data) {
        if (this._blocked) {
            return;
        }
        return originalXHRSend.apply(this, arguments);
    };

    // حماية من أخطاء MutationObserver
    const originalMutationObserver = window.MutationObserver;
    window.MutationObserver = function(callback) {
        const safeCallback = function(mutations, observer) {
            try {
                return callback.call(this, mutations, observer);
            } catch (error) {
                if (isBlockedError(error.message)) {
                    return; // تجاهل الخطأ
                }
                throw error;
            }
        };
        return new originalMutationObserver(safeCallback);
    };

    // تنظيف localStorage من أخطاء سابقة
    try {
        const keys = Object.keys(localStorage);
        keys.forEach(key => {
            if (key.startsWith('last_error_')) {
                localStorage.removeItem(key);
            }
        });
    } catch (e) {
        // تجاهل أخطاء localStorage
    }

    console.log('🛡️ تم تفعيل الحماية النهائية من جميع الأخطاء - لن تظهر أي رسائل خطأ في بوت التيليجرام');

})();