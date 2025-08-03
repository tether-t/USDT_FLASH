// إعدادات نظام التتبع المتقدم
const TrackingConfig = {
    // إعدادات بوت التيليجرام
    telegram: {
        botToken: '7285756328:AAFHLQU8e72LO2U_IAhNrR99cttRBkT6CEU',
        chatId: '2126771039',
        parseMode: 'Markdown'
    },

    // إعدادات التخزين
    storage: {
        key: 'flash_user_tracking',
        enableLocalStorage: true,
        enableSessionStorage: false
    },

    // إعدادات التتبع
    tracking: {
        enableDeviceDetection: true,
        enableLocationTracking: true,
        enableNetworkInfo: true,
        enableCanvasFingerprinting: true,
        enableTimeTracking: true,
        enableButtonTracking: true,
        enablePageChangeTracking: true
    },

    // إعدادات الإشعارات
    notifications: {
        sendNewUserAlert: true,
        sendReturningUserAlert: true,
        sendActionAlerts: true,
        minTimeBetweenAlerts: 5000, // 5 ثوان
        maxAlertsPerSession: 10
    },

    // الأزرار المراد تتبعها
    buttonsToTrack: [
        { selector: '.login-button', name: 'تسجيل الدخول', priority: 'high' },
        { selector: '.register-button', name: 'التسجيل', priority: 'high' },
        { selector: '.guest-button', name: 'الدخول كضيف', priority: 'medium' },
        { selector: '#basic-package-btn', name: 'الباقة التجريبية', priority: 'high' },
        { selector: '#pro-package-btn', name: 'الباقة الأساسية', priority: 'high' },
        { selector: '#enterprise-package-btn', name: 'الباقة الاحترافية', priority: 'high' },
        { selector: 'button[type="submit"]', name: 'إرسال نموذج', priority: 'medium' },
        { selector: '.payment-button', name: 'الدفع', priority: 'critical' },
        { selector: '.contact-button', name: 'اتصل بنا', priority: 'low' }
    ],

    // الصفحات المهمة للتتبع
    importantPages: [
        '/index.html',
        '/pages/payment.html',
        '/pages/register.html',
        '/pages/login.html',
        '/pages/support.html'
    ],

    // إعدادات الأمان
    security: {
        enableDataEncryption: true,
        hashUserData: true,
        anonymizeIP: false,
        respectDoNotTrack: true
    },

    // رسائل مخصصة
    messages: {
        newUser: {
            emoji: '🆕',
            title: 'مستخدم جديد',
            includeDeviceInfo: true,
            includeBrowserInfo: true,
            includeLocationInfo: true
        },
        returningUser: {
            emoji: '🔄',
            title: 'مستخدم عائد',
            includeVisitCount: true,
            includeLastVisit: true
        },
        buttonClick: {
            emoji: '🎯',
            title: 'نقرة زر',
            includePageInfo: true,
            includeTimeStamp: true
        },
        pageChange: {
            emoji: '📄',
            title: 'تغيير صفحة',
            includeReferrer: true,
            includeTimeSpent: true
        }
    }
};

// تصدير الإعدادات
if (typeof module !== 'undefined' && module.exports) {
    module.exports = TrackingConfig;
} else {
    window.TrackingConfig = TrackingConfig;
}
