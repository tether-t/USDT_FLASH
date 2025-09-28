// 🛡️ معالج DOM الآمن - Safe DOM Handler
class SafeDOMHandler {
    constructor() {
        this.observers = new Map();
        this.eventListeners = new Map();
    }

    // البحث الآمن عن العناصر
    safeQuerySelector(selector, context = document) {
        try {
            if (!context || typeof context.querySelector !== 'function') {
                return null;
            }
            return context.querySelector(selector);
        } catch (error) {
            console.warn(`خطأ في البحث عن العنصر: ${selector}`, error);
            return null;
        }
    }

    safeQuerySelectorAll(selector, context = document) {
        try {
            if (!context || typeof context.querySelectorAll !== 'function') {
                return [];
            }
            return Array.from(context.querySelectorAll(selector));
        } catch (error) {
            console.warn(`خطأ في البحث عن العناصر: ${selector}`, error);
            return [];
        }
    }

    // إضافة مستمع أحداث آمن
    safeAddEventListener(element, event, handler, options = {}) {
        try {
            if (!element || typeof element.addEventListener !== 'function') {
                return false;
            }

            const wrappedHandler = (e) => {
                try {
                    handler(e);
                } catch (error) {
                    console.warn(`خطأ في معالج الحدث ${event}:`, error);
                    if (window.errorHandler) {
                        window.errorHandler.reportCustomError(`Event handler error: ${error.message}`, {
                            event: event,
                            element: element.tagName || 'Unknown'
                        });
                    }
                }
            };

            element.addEventListener(event, wrappedHandler, options);

            // حفظ المرجع للإزالة لاحقاً
            const key = `${element.tagName || 'unknown'}-${event}-${Date.now()}`;
            this.eventListeners.set(key, {
                element,
                event,
                handler: wrappedHandler,
                options
            });

            return true;
        } catch (error) {
            console.warn(`خطأ في إضافة مستمع الحدث:`, error);
            return false;
        }
    }

    // إضافة مستمع أحداث للوثيقة بأمان
    safeDocumentEventListener(event, handler, options = {}) {
        return this.safeAddEventListener(document, event, handler, options);
    }

    // فحص وجود العنصر قبل التفاعل معه
    safeElementInteraction(element, callback) {
        try {
            if (!element) {
                return null;
            }

            // التحقق من أن العنصر ما زال في DOM
            if (!document.contains(element)) {
                return null;
            }

            return callback(element);
        } catch (error) {
            console.warn('خطأ في التفاعل مع العنصر:', error);
            return null;
        }
    }

    // فحص الخصائص بأمان
    safeGetProperty(obj, property, defaultValue = null) {
        try {
            if (!obj || typeof obj !== 'object') {
                return defaultValue;
            }
            return obj.hasOwnProperty(property) ? obj[property] : defaultValue;
        } catch (error) {
            return defaultValue;
        }
    }

    // تنفيذ دالة بأمان مع إعادة المحاولة
    safeExecuteWithRetry(fn, maxRetries = 3, delay = 100) {
        return new Promise((resolve, reject) => {
            let attempts = 0;

            const attempt = () => {
                try {
                    const result = fn();
                    resolve(result);
                } catch (error) {
                    attempts++;
                    if (attempts < maxRetries) {
                        setTimeout(attempt, delay * attempts);
                    } else {
                        console.warn(`فشل في التنفيذ بعد ${maxRetries} محاولات:`, error);
                        reject(error);
                    }
                }
            };

            attempt();
        });
    }

    // مراقبة تغييرات DOM بأمان
    safeObserveDOM(target, callback, options = {}) {
        try {
            if (!target || !window.MutationObserver) {
                return null;
            }

            const observer = new MutationObserver((mutations) => {
                try {
                    callback(mutations);
                } catch (error) {
                    console.warn('خطأ في مراقب DOM:', error);
                }
            });

            const defaultOptions = {
                childList: true,
                subtree: true,
                attributes: false,
                ...options
            };

            observer.observe(target, defaultOptions);

            // حفظ المرجع
            const key = `observer-${Date.now()}`;
            this.observers.set(key, observer);

            return {
                disconnect: () => {
                    observer.disconnect();
                    this.observers.delete(key);
                }
            };
        } catch (error) {
            console.warn('خطأ في إنشاء مراقب DOM:', error);
            return null;
        }
    }

    // انتظار تحميل العنصر
    waitForElement(selector, timeout = 5000) {
        return new Promise((resolve, reject) => {
            const element = this.safeQuerySelector(selector);
            if (element) {
                resolve(element);
                return;
            }

            const observer = this.safeObserveDOM(document.body, () => {
                const element = this.safeQuerySelector(selector);
                if (element) {
                    observer?.disconnect();
                    resolve(element);
                }
            });

            setTimeout(() => {
                observer?.disconnect();
                reject(new Error(`Element ${selector} not found within ${timeout}ms`));
            }, timeout);
        });
    }

    // تنظيف جميع المراقبين والمستمعين
    cleanup() {
        try {
            // إيقاف جميع المراقبين
            this.observers.forEach(observer => {
                try {
                    observer.disconnect();
                } catch (e) {
                    console.warn('خطأ في إيقاف المراقب:', e);
                }
            });
            this.observers.clear();

            // إزالة جميع مستمعي الأحداث
            this.eventListeners.forEach(({ element, event, handler, options }) => {
                try {
                    if (element && typeof element.removeEventListener === 'function') {
                        element.removeEventListener(event, handler, options);
                    }
                } catch (e) {
                    console.warn('خطأ في إزالة مستمع الحدث:', e);
                }
            });
            this.eventListeners.clear();

        } catch (error) {
            console.warn('خطأ في تنظيف SafeDOMHandler:', error);
        }
    }

    // فحص صحة العنصر
    isValidElement(element) {
        try {
            return element && 
                   typeof element === 'object' && 
                   element.nodeType === Node.ELEMENT_NODE &&
                   document.contains(element);
        } catch (error) {
            return false;
        }
    }

    // تنفيذ آمن لدالة على عنصر
    safeElementMethod(element, methodName, ...args) {
        try {
            if (!this.isValidElement(element)) {
                return null;
            }

            if (typeof element[methodName] !== 'function') {
                return null;
            }

            return element[methodName](...args);
        } catch (error) {
            console.warn(`خطأ في تنفيذ ${methodName} على العنصر:`, error);
            return null;
        }
    }
}

// إنشاء مثيل عام
window.safeDOMHandler = new SafeDOMHandler();

// دوال مساعدة عامة
window.$ = (selector, context) => window.safeDOMHandler.safeQuerySelector(selector, context);
window.$$ = (selector, context) => window.safeDOMHandler.safeQuerySelectorAll(selector, context);

// تنظيف عند إغلاق الصفحة
window.addEventListener('beforeunload', () => {
    window.safeDOMHandler?.cleanup();
});

console.log('✅ تم تفعيل معالج DOM الآمن');
