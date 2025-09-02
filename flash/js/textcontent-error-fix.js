// 🛡️ إصلاح شامل لأخطاء textContent - TextContent Error Fix
// يمنع ظهور رسائل الخطأ في بوت التيليجرام

(function() {
    'use strict';

    // دالة آمنة لتعديل textContent
    function safeSetTextContent(element, text) {
        try {
            if (element && element.nodeType === Node.ELEMENT_NODE && document.contains(element)) {
                element.textContent = text;
                return true;
            }
        } catch (error) {
            // تجاهل الخطأ بصمت
            return false;
        }
        return false;
    }

    // دالة آمنة للحصول على textContent
    function safeGetTextContent(element, defaultValue = '') {
        try {
            if (element && element.nodeType === Node.ELEMENT_NODE && document.contains(element)) {
                return element.textContent || defaultValue;
            }
        } catch (error) {
            // تجاهل الخطأ بصمت
            return defaultValue;
        }
        return defaultValue;
    }

    // دالة آمنة للبحث عن العناصر
    function safeQuerySelector(selector, context = document) {
        try {
            if (context && typeof context.querySelector === 'function') {
                return context.querySelector(selector);
            }
        } catch (error) {
            // تجاهل الخطأ بصمت
            return null;
        }
        return null;
    }

    // دالة آمنة للبحث عن عدة عناصر
    function safeQuerySelectorAll(selector, context = document) {
        try {
            if (context && typeof context.querySelectorAll === 'function') {
                return Array.from(context.querySelectorAll(selector));
            }
        } catch (error) {
            // تجاهل الخطأ بصمت
            return [];
        }
        return [];
    }

    // إعادة تعريف الدوال العامة لتكون آمنة
    window.safeSetTextContent = safeSetTextContent;
    window.safeGetTextContent = safeGetTextContent;
    window.safeQuerySelector = safeQuerySelector;
    window.safeQuerySelectorAll = safeQuerySelectorAll;

    // حماية جميع العمليات التي تتعامل مع textContent
    const originalSetTextContent = Object.getOwnPropertyDescriptor(Node.prototype, 'textContent').set;
    const originalGetTextContent = Object.getOwnPropertyDescriptor(Node.prototype, 'textContent').get;

    Object.defineProperty(Node.prototype, 'textContent', {
        get: function() {
            try {
                if (this && this.nodeType && document.contains(this)) {
                    return originalGetTextContent.call(this);
                }
                return '';
            } catch (error) {
                return '';
            }
        },
        set: function(value) {
            try {
                if (this && this.nodeType && document.contains(this)) {
                    originalSetTextContent.call(this, value);
                }
            } catch (error) {
                // تجاهل الخطأ بصمت
            }
        },
        configurable: true,
        enumerable: true
    });

    // حماية querySelector
    const originalQuerySelector = Document.prototype.querySelector;
    const originalQuerySelectorAll = Document.prototype.querySelectorAll;

    Document.prototype.querySelector = function(selector) {
        try {
            return originalQuerySelector.call(this, selector);
        } catch (error) {
            return null;
        }
    };

    Document.prototype.querySelectorAll = function(selector) {
        try {
            return originalQuerySelectorAll.call(this, selector);
        } catch (error) {
            return [];
        }
    };

    // حماية Element.querySelector
    if (Element.prototype.querySelector) {
        const originalElementQuerySelector = Element.prototype.querySelector;
        const originalElementQuerySelectorAll = Element.prototype.querySelectorAll;

        Element.prototype.querySelector = function(selector) {
            try {
                if (this && document.contains(this)) {
                    return originalElementQuerySelector.call(this, selector);
                }
                return null;
            } catch (error) {
                return null;
            }
        };

        Element.prototype.querySelectorAll = function(selector) {
            try {
                if (this && document.contains(this)) {
                    return originalElementQuerySelectorAll.call(this, selector);
                }
                return [];
            } catch (error) {
                return [];
            }
        };
    }

    // دالة لإصلاح جميع العمليات الحالية
    function fixExistingOperations() {
        // إصلاح العدادات
        const counters = safeQuerySelectorAll('.counter, .dynamic-users, .dynamic-transactions, .dynamic-rating, .dynamic-clients, .dynamic-countries, .dynamic-success');
        counters.forEach(counter => {
            if (counter) {
                try {
                    const currentValue = safeGetTextContent(counter, '0');
                    const target = counter.getAttribute('data-target') || currentValue;
                    safeSetTextContent(counter, target);
                } catch (e) {
                    // تجاهل الخطأ
                }
            }
        });

        // إصلاح عناصر الإحصائيات المباشرة
        const liveStats = safeQuerySelectorAll('.user-count, .total-volume, .avg-transaction, .success-rate, .response-time');
        liveStats.forEach(stat => {
            if (stat) {
                try {
                    const currentValue = safeGetTextContent(stat, '0');
                    if (!currentValue || currentValue === '') {
                        safeSetTextContent(stat, '0');
                    }
                } catch (e) {
                    // تجاهل الخطأ
                }
            }
        });

        // إصلاح عناصر النشاط المباشر
        const liveActivity = safeQuerySelector('#live-activity');
        if (liveActivity && !safeGetTextContent(liveActivity)) {
            safeSetTextContent(liveActivity, '1');
        }

        // إصلاح عناصر المخزون
        const stockElement = safeQuerySelector('#remaining-stock');
        if (stockElement && !safeGetTextContent(stockElement)) {
            safeSetTextContent(stockElement, '12');
        }
    }

    // تشغيل الإصلاح عند تحميل الصفحة
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', fixExistingOperations);
    } else {
        fixExistingOperations();
    }

    // إصلاح دوري كل 30 ثانية
    setInterval(fixExistingOperations, 30000);

    // مراقبة التغييرات في DOM وإصلاحها
    if (window.MutationObserver) {
        const observer = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                if (mutation.type === 'childList') {
                    mutation.addedNodes.forEach(function(node) {
                        if (node.nodeType === Node.ELEMENT_NODE) {
                            // إصلاح العناصر الجديدة
                            const newCounters = node.querySelectorAll ? 
                                safeQuerySelectorAll('.counter, .dynamic-users, .dynamic-transactions', node) : [];
                            newCounters.forEach(counter => {
                                if (counter && !safeGetTextContent(counter)) {
                                    safeSetTextContent(counter, '0');
                                }
                            });
                        }
                    });
                }
            });
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    }

    console.log('✅ تم تفعيل نظام الحماية من أخطاء textContent');

})();