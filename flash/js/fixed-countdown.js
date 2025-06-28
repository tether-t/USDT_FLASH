// نظام العداد الثابت - 3 أيام دائماً
// Fixed Countdown System - Always 3 Days

(function() {
    'use strict';

    // إعدادات العداد الثابت - 3 أيام دائماً
    const FIXED_COUNTDOWN = {
        days: 3,
        hours: 0,
        minutes: 0,
        seconds: 0,
        totalHours: 72 // 3 أيام = 72 ساعة
    };

    // رسائل العرض الثابت
    const FIXED_MESSAGES = {
        ar: {
            days: '3 أيام',
            hours: '0 ساعات', 
            minutes: '0 دقائق',
            seconds: '0 ثوان',
            timeLeft: 'متبقي 3 أيام',
            expires: 'ينتهي خلال 3 أيام'
        },
        en: {
            days: '3 Days',
            hours: '0 Hours',
            minutes: '0 Minutes', 
            seconds: '0 Seconds',
            timeLeft: '3 Days Left',
            expires: 'Expires in 3 Days'
        }
    };

    // تحديث جميع العدادات لتظهر 3 أيام ثابتة
    function updateAllCountdowns() {
        // تحديث العداد المضغوط
        updateCompactCountdown();
        
        // تحديث عداد الندرة
        updateScarcityCountdown();
        
        // تحديث العداد الأساسي
        updateBasicCountdown();
        
        // تحديث أي عدادات أخرى
        updateGenericCountdowns();
    }

    // تحديث العداد المضغوط
    function updateCompactCountdown() {
        const daysElement = document.getElementById('bf-compact-days');
        const hoursElement = document.getElementById('bf-compact-hours');
        const minutesElement = document.getElementById('bf-compact-minutes');

        if (daysElement) {
            daysElement.textContent = FIXED_COUNTDOWN.days.toString().padStart(2, '0');
        }
        if (hoursElement) {
            hoursElement.textContent = FIXED_COUNTDOWN.hours.toString().padStart(2, '0');
        }
        if (minutesElement) {
            minutesElement.textContent = FIXED_COUNTDOWN.minutes.toString().padStart(2, '0');
        }
    }

    // تحديث عداد الندرة
    function updateScarcityCountdown() {
        const scarcityCountdown = document.getElementById('scarcityCountdown');
        if (scarcityCountdown) {
            const spans = scarcityCountdown.querySelectorAll('.text-3xl.font-bold');
            if (spans.length >= 4) {
                spans[0].textContent = FIXED_COUNTDOWN.days.toString().padStart(2, '0'); // Days
                spans[1].textContent = FIXED_COUNTDOWN.hours.toString().padStart(2, '0'); // Hours
                spans[2].textContent = FIXED_COUNTDOWN.minutes.toString().padStart(2, '0'); // Minutes
                spans[3].textContent = FIXED_COUNTDOWN.seconds.toString().padStart(2, '0'); // Seconds
            }
        }
    }

    // تحديث العداد الأساسي
    function updateBasicCountdown() {
        const basicCountdown = document.getElementById('basic-countdown-timer');
        if (basicCountdown) {
            const spans = basicCountdown.querySelectorAll('span');
            if (spans.length >= 3) {
                // تحويل 3 أيام إلى ساعات (72 ساعة)
                spans[0].textContent = '72'; // Hours (3 days = 72 hours)
                spans[1].textContent = FIXED_COUNTDOWN.minutes.toString().padStart(2, '0'); // Minutes
                spans[2].textContent = FIXED_COUNTDOWN.seconds.toString().padStart(2, '0'); // Seconds
            }
        }
    }

    // تحديث العدادات العامة
    function updateGenericCountdowns() {
        // البحث عن جميع العدادات الأخرى
        const allCountdowns = document.querySelectorAll('[class*="countdown"], [id*="countdown"], [class*="timer"], [id*="timer"]');
        
        allCountdowns.forEach(countdown => {
            // تحديث العناصر التي تحتوي على أرقام الوقت
            const timeElements = countdown.querySelectorAll('span');
            timeElements.forEach(element => {
                const text = element.textContent.trim();
                // إذا كان العنصر يحتوي على رقم الوقت
                if (/^\d{1,2}$/.test(text)) {
                    const parentText = element.parentElement.textContent.toLowerCase();
                    
                    if (parentText.includes('day') || parentText.includes('أيام')) {
                        element.textContent = FIXED_COUNTDOWN.days.toString().padStart(2, '0');
                    } else if (parentText.includes('hour') || parentText.includes('ساعة')) {
                        element.textContent = FIXED_COUNTDOWN.hours.toString().padStart(2, '0');
                    } else if (parentText.includes('minute') || parentText.includes('دقيقة')) {
                        element.textContent = FIXED_COUNTDOWN.minutes.toString().padStart(2, '0');
                    } else if (parentText.includes('second') || parentText.includes('ثانية')) {
                        element.textContent = FIXED_COUNTDOWN.seconds.toString().padStart(2, '0');
                    }
                }
            });
        });
    }

    // تحديث النصوص النصية للعدادات
    function updateCountdownTexts() {
        // البحث عن النصوص التي تذكر الوقت المتبقي
        const allElements = document.querySelectorAll('*');
        
        allElements.forEach(element => {
            if (element.children.length === 0) { // عنصر نصي فقط
                let text = element.textContent;
                let originalText = text;
                
                // البحث عن أنماط الوقت وتحديثها - عربي
                text = text.replace(/\d{1,3}\s*(أيام?|يوم)/gi, '3 أيام');
                text = text.replace(/\d{1,2}\s*(ساعات?|ساعة)/gi, '0 ساعات');
                text = text.replace(/\d{1,2}\s*(دقائق?|دقيقة)/gi, '0 دقائق');
                text = text.replace(/\d{1,2}\s*(ثوان?|ثانية)/gi, '0 ثوان');
                
                // البحث عن أنماط الوقت وتحديثها - إنجليزي
                text = text.replace(/\d{1,3}\s*(days?|day)/gi, '3 Days');
                text = text.replace(/\d{1,2}\s*(hours?|hour|hrs?|hr)/gi, '0 Hours');
                text = text.replace(/\d{1,2}\s*(minutes?|minute|mins?|min)/gi, '0 Minutes');
                text = text.replace(/\d{1,2}\s*(seconds?|second|secs?|sec)/gi, '0 Seconds');
                
                // تحديث الأنماط الرقمية
                text = text.replace(/\d{1,3}:\d{1,2}:\d{1,2}/g, '72:00:00');
                text = text.replace(/\d{1,2}d\s*:\s*\d{1,2}h\s*:\s*\d{1,2}m/gi, '3d : 00h : 00m');
                text = text.replace(/\d{1,2}D\s*:\s*\d{1,2}H\s*:\s*\d{1,2}M/gi, '3D : 00H : 00M');
                
                // عبارات الوقت المتبقي
                text = text.replace(/(متبقي|باقي|remaining|left)\s*:?\s*\d{1,3}.*?(أيام?|days?)/gi, 'متبقي 3 أيام');
                text = text.replace(/(ينتهي|expires?|ends?)\s*(في|in|خلال|within)\s*\d{1,3}.*?(أيام?|days?)/gi, 'ينتهي خلال 3 أيام');
                
                // تحديث النص إذا تغير
                if (text !== originalText && text.trim() !== '') {
                    element.textContent = text;
                }
            }
        });
    }

    // تحديث عدادات الجمعة البيضاء خصيصاً
    function updateBlackFridayCountdowns() {
        // البحث عن عدادات الجمعة البيضاء
        const blackFridayElements = document.querySelectorAll([
            '[class*="black-friday"]',
            '[class*="bf-"]', 
            '[id*="black-friday"]',
            '[id*="bf-"]',
            '[class*="friday"]',
            '[class*="sale"]',
            '[class*="offer"]'
        ].join(','));

        blackFridayElements.forEach(element => {
            // تحديث العناصر الفرعية
            const timeElements = element.querySelectorAll('span, div, p');
            timeElements.forEach(timeEl => {
                const text = timeEl.textContent.trim();
                
                // إذا كان يحتوي على أرقام وقت
                if (/^\d{1,2}$/.test(text)) {
                    const parentText = timeEl.parentElement.textContent.toLowerCase();
                    
                    if (parentText.includes('day') || parentText.includes('أيام') || parentText.includes('d')) {
                        timeEl.textContent = '03';
                    } else if (parentText.includes('hour') || parentText.includes('ساعة') || parentText.includes('h')) {
                        timeEl.textContent = '00';
                    } else if (parentText.includes('minute') || parentText.includes('دقيقة') || parentText.includes('m')) {
                        timeEl.textContent = '00';
                    } else if (parentText.includes('second') || parentText.includes('ثانية') || parentText.includes('s')) {
                        timeEl.textContent = '00';
                    }
                }
            });
        });
    }

    // مراقب DOM للعناصر الجديدة
    function setupCountdownObserver() {
        // مراقب DOM مُحسن - يعمل فقط عند الحاجة
        let isUpdating = false;
        const observer = new MutationObserver(function(mutations) {
            if (isUpdating) return; // منع التحديثات المتكررة
            
            let needsUpdate = false;
            mutations.forEach(function(mutation) {
                if (mutation.type === 'childList') {
                    // فقط إذا تم إضافة عناصر تحتوي على كلمات العداد
                    const addedNodes = Array.from(mutation.addedNodes);
                    needsUpdate = addedNodes.some(node => 
                        node.nodeType === 1 && 
                        (node.textContent.includes('countdown') || 
                         node.textContent.includes('timer') ||
                         node.className.includes('countdown') ||
                         node.className.includes('timer'))
                    );
                }
            });
            
            if (needsUpdate) {
                isUpdating = true;
                setTimeout(() => {
                    updateAllCountdowns();
                    isUpdating = false;
                }, 500); // تأخير أطول لتجنب التحديثات المتكررة
            }
        });

        observer.observe(document.body, {
            childList: true,
            subtree: false // تقليل المراقبة لتحسين الأداء
        });
    }

    // تعطيل أي عدادات تلقائية موجودة
    function disableExistingCountdowns() {
        // مسح أي intervals موجودة للعدادات
        if (window.countdownIntervalId) {
            clearInterval(window.countdownIntervalId);
            window.countdownIntervalId = null;
        }

        // تعطيل دوال العد التنازلي
        if (window.startCountdown) {
            window.startCountdown = function() {
                console.log('العداد التنازلي معطل - يعرض 3 أيام ثابتة');
                updateAllCountdowns();
            };
        }
    }

    // تشغيل النظام الثابت
    function initializeFixedCountdown() {
        console.log('🔒 تفعيل نظام العداد الثابت - 3 أيام دائماً');
        
        // تعطيل العدادات الموجودة
        disableExistingCountdowns();
        
        // تحديث جميع العدادات
        updateAllCountdowns();
        updateCountdownTexts();
        updateBlackFridayCountdowns();
        
        // إعداد مراقب DOM
        setupCountdownObserver();
        
        // تحديث دوري مُحسن - مرة واحدة فقط عند التحميل
        setTimeout(function() {
            updateAllCountdowns();
            updateCountdownTexts();
            updateBlackFridayCountdowns();
        }, 1000); // مرة واحدة فقط بعد التحميل
        
        console.log('✅ نظام العداد الثابت نشط - يعرض 3 أيام دائماً');
    }

    // تشغيل النظام عند تحميل الصفحة
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initializeFixedCountdown);
    } else {
        initializeFixedCountdown();
    }

    // تشغيل إضافي عند تحميل النافذة بالكامل
    window.addEventListener('load', function() {
        setTimeout(initializeFixedCountdown, 1000);
    });

})();