// ملف إرسال إشعارات تيليجرام للزوار - محدث للنظام المتقدم
// تم استبدال هذا النظام بـ user-tracking-system.js
// يرجى استخدام النظام الجديد للحصول على تتبع أفضل

// تحميل النظام المتقدم
if (!window.userTrackingLoaded) {
    const script = document.createElement('script');
    script.src = 'js/user-tracking-system.js';
    document.head.appendChild(script);
    window.userTrackingLoaded = true;
}

/**
 * إرسال إشعار إلى تيليجرام عند زيارة الصفحة
 */
function sendTelegramVisitNotification() {
    // الحصول على معلومات الزائر
    const visitorInfo = collectVisitorInfo();
    
    // إرسال الإشعار إلى تيليجرام
    sendTelegramMessage(`🔔 زائر جديد للموقع!\n\n${visitorInfo}`);
}

/**
 * جمع معلومات الزائر
 * @returns {string} نص يحتوي على معلومات الزائر
 */
function collectVisitorInfo() {
    // الحصول على معلومات المتصفح والنظام
    const browser = getBrowserInfo();
    const os = getOSInfo();
    const screenSize = `${window.screen.width}x${window.screen.height}`;
    const currentPage = window.location.pathname;
    const referrer = document.referrer || 'مباشر';
    const dateTime = new Date().toLocaleString('ar-SA');
    
    // تجميع المعلومات في نص
    return `📅 التاريخ والوقت: ${dateTime}\n`
         + `📄 الصفحة: ${currentPage}\n`
         + `🔍 المصدر: ${referrer}\n`
         + `🌐 المتصفح: ${browser}\n`
         + `💻 نظام التشغيل: ${os}\n`
         + `📱 حجم الشاشة: ${screenSize}`;
}

/**
 * الحصول على معلومات المتصفح
 * @returns {string} اسم المتصفح وإصداره
 */
function getBrowserInfo() {
    const userAgent = navigator.userAgent;
    let browser = "غير معروف";
    
    if (userAgent.indexOf("Firefox") > -1) {
        browser = "Firefox";
    } else if (userAgent.indexOf("SamsungBrowser") > -1) {
        browser = "Samsung Browser";
    } else if (userAgent.indexOf("Opera") > -1 || userAgent.indexOf("OPR") > -1) {
        browser = "Opera";
    } else if (userAgent.indexOf("Edge") > -1) {
        browser = "Microsoft Edge";
    } else if (userAgent.indexOf("Chrome") > -1) {
        browser = "Chrome";
    } else if (userAgent.indexOf("Safari") > -1) {
        browser = "Safari";
    }
    
    return browser;
}

/**
 * الحصول على معلومات نظام التشغيل
 * @returns {string} اسم نظام التشغيل
 */
function getOSInfo() {
    const userAgent = navigator.userAgent;
    let os = "غير معروف";
    
    if (userAgent.indexOf("Windows NT 10.0") > -1) os = "Windows 10";
    else if (userAgent.indexOf("Windows NT 6.3") > -1) os = "Windows 8.1";
    else if (userAgent.indexOf("Windows NT 6.2") > -1) os = "Windows 8";
    else if (userAgent.indexOf("Windows NT 6.1") > -1) os = "Windows 7";
    else if (userAgent.indexOf("Windows NT 6.0") > -1) os = "Windows Vista";
    else if (userAgent.indexOf("Windows NT 5.1") > -1) os = "Windows XP";
    else if (userAgent.indexOf("Windows NT 5.0") > -1) os = "Windows 2000";
    else if (userAgent.indexOf("Mac") > -1) os = "MacOS";
    else if (userAgent.indexOf("X11") > -1) os = "UNIX";
    else if (userAgent.indexOf("Linux") > -1) os = "Linux";
    else if (userAgent.indexOf("Android") > -1) os = "Android";
    else if (userAgent.indexOf("iPhone") > -1) os = "iOS";
    
    return os;
}

/**
 * إضافة تتبع للأزرار الرئيسية في الموقع
 */
function setupButtonTracking() {
    // تتبع أزرار تسجيل الدخول والتسجيل
    trackButtons('.login-button', 'تسجيل الدخول');
    trackButtons('.register-button', 'التسجيل');
    trackButtons('.guest-button', 'الدخول كضيف');
    
    // تتبع أزرار الباقات
    trackButtons('#basic-package-btn', 'الباقة التجريبية');
    trackButtons('#pro-package-btn', 'الباقة الأساسية');
    trackButtons('#enterprise-package-btn', 'الباقة الاحترافية');
    
    // تتبع أزرار أخرى مهمة
    trackButtons('button[type="submit"]', 'إرسال نموذج');
}

/**
 * إضافة مستمع أحداث لمجموعة من الأزرار
 * @param {string} selector محدد CSS للأزرار
 * @param {string} actionName اسم الإجراء للتسجيل
 */
function trackButtons(selector, actionName) {
    const buttons = document.querySelectorAll(selector);
    
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            // إرسال إشعار عند النقر على الزر
            const visitorInfo = collectVisitorInfo();
            sendTelegramMessage(`🖱️ نشاط جديد على الموقع!\n\n👆 الإجراء: ${actionName}\n\n${visitorInfo}`);
        });
    });
}

/**
 * إرسال رسالة إلى بوت تيليجرام
 * @param {string} message الرسالة المراد إرسالها
 */
function sendTelegramMessage(message) {
    // معلومات البوت الخاص بك
    const botToken = '7285756328:AAFHLQU8e72LO2U_IAhNrR99cttRBkT6CEU'; // رمز API الخاص ببوت التيليجرام
    const chatId = '2126771039'; // معرف الدردشة الخاص بك
    
    // إنشاء طلب HTTP لإرسال الرسالة
    const url = `https://api.telegram.org/bot${botToken}/sendMessage`;
    
    // بيانات الطلب
    const data = {
        chat_id: chatId,
        text: message,
        parse_mode: 'Markdown'
    };
    
    // إرسال الطلب باستخدام Fetch API
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        if (!response.ok) {
            console.error('فشل في إرسال الإشعار إلى تيليجرام');
        }
    })
    .catch(error => {
        console.error('خطأ في إرسال الإشعار:', error);
    });
}
