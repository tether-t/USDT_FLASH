// واجهة بوت التيليجرام المحسنة مع أزرار التصنيف
class TelegramBotInterface {
    constructor() {
        this.botToken = '7285756328:AAFHLQU8e72LO2U_IAhNrR99cttRBkT6CEU';
        this.chatId = '2126771039';
        this.init();
    }

    init() {
        this.sendMainMenu();
        this.setupWebhook();
    }

    // إرسال القائمة الرئيسية مع الأزرار
    async sendMainMenu() {
        const message = `🚀 *لوحة تحكم Flash USDT*

📊 اختر نوع التقرير الذي تريد عرضه:`;

        const keyboard = {
            inline_keyboard: [
                [
                    {
                        text: "🌐 زوار الموقع",
                        callback_data: "visitors_browse"
                    }
                ],
                [
                    {
                        text: "💳 صفحة الدفع",
                        callback_data: "visitors_payment"
                    }
                ],
                [
                    {
                        text: "🛠️ الدعم الفني",
                        callback_data: "visitors_support"
                    }
                ],
                [
                    {
                        text: "📈 إحصائيات شاملة",
                        callback_data: "full_stats"
                    },
                    {
                        text: "🔄 تحديث",
                        callback_data: "refresh_menu"
                    }
                ]
            ]
        };

        await this.sendMessage(message, keyboard);
    }

    // معالجة الضغط على الأزرار
    async handleCallback(callbackData) {
        switch(callbackData) {
            case 'visitors_browse':
                await this.sendBrowseVisitors();
                break;
            case 'visitors_payment':
                await this.sendPaymentVisitors();
                break;
            case 'visitors_support':
                await this.sendSupportVisitors();
                break;
            case 'full_stats':
                await this.sendFullStats();
                break;
            case 'refresh_menu':
                await this.sendMainMenu();
                break;
        }
    }

    // عرض زوار التصفح العام
    async sendBrowseVisitors() {
        const visitors = this.getVisitorsByCategory('browse');
        const message = this.formatVisitorsReport('🌐 زوار الموقع العام', visitors);
        
        const keyboard = {
            inline_keyboard: [
                [{ text: "🔙 العودة للقائمة", callback_data: "refresh_menu" }]
            ]
        };

        await this.sendMessage(message, keyboard);
    }

    // عرض زوار صفحة الدفع
    async sendPaymentVisitors() {
        const visitors = this.getVisitorsByCategory('payment');
        const message = this.formatVisitorsReport('💳 زوار صفحة الدفع', visitors);
        
        const keyboard = {
            inline_keyboard: [
                [{ text: "🔙 العودة للقائمة", callback_data: "refresh_menu" }]
            ]
        };

        await this.sendMessage(message, keyboard);
    }

    // عرض زوار الدعم الفني
    async sendSupportVisitors() {
        const visitors = this.getVisitorsByCategory('support');
        const message = this.formatVisitorsReport('🛠️ زوار الدعم الفني', visitors);
        
        const keyboard = {
            inline_keyboard: [
                [{ text: "🔙 العودة للقائمة", callback_data: "refresh_menu" }]
            ]
        };

        await this.sendMessage(message, keyboard);
    }

    // عرض الإحصائيات الشاملة
    async sendFullStats() {
        const allVisitors = this.getAllVisitors();
        const browseCount = this.getVisitorsByCategory('browse').length;
        const paymentCount = this.getVisitorsByCategory('payment').length;
        const supportCount = this.getVisitorsByCategory('support').length;

        const message = `📈 *الإحصائيات الشاملة*

👥 إجمالي الزوار: ${allVisitors.length}
🌐 زوار التصفح: ${browseCount}
💳 زوار الدفع: ${paymentCount}
🛠️ زوار الدعم: ${supportCount}

📊 *توزيع الزوار:*
• التصفح: ${((browseCount/allVisitors.length)*100).toFixed(1)}%
• الدفع: ${((paymentCount/allVisitors.length)*100).toFixed(1)}%
• الدعم: ${((supportCount/allVisitors.length)*100).toFixed(1)}%

⏰ آخر تحديث: ${new Date().toLocaleString('ar-SA')}`;

        const keyboard = {
            inline_keyboard: [
                [{ text: "🔙 العودة للقائمة", callback_data: "refresh_menu" }]
            ]
        };

        await this.sendMessage(message, keyboard);
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

    // إرسال رسالة مع لوحة مفاتيح
    async sendMessage(text, keyboard = null) {
        const url = `https://api.telegram.org/bot${this.botToken}/sendMessage`;
        
        const payload = {
            chat_id: this.chatId,
            text: text,
            parse_mode: 'Markdown'
        };

        if (keyboard) {
            payload.reply_markup = JSON.stringify(keyboard);
        }

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

    // إعداد webhook (اختياري)
    setupWebhook() {
        // يمكن إضافة webhook هنا للاستجابة للضغط على الأزرار
        console.log('تم تهيئة واجهة البوت');
    }
}

// تحديث نظام التتبع لإرسال التقارير المصنفة
class EnhancedUserTracking extends UserTrackingSystem {
    constructor() {
        super();
        this.botInterface = new TelegramBotInterface();
    }

    // إرسال إشعار مصنف حسب نوع الصفحة
    async sendCategorizedNotification(user) {
        const currentPage = user.currentPage || '';
        let category = 'browse';
        let emoji = '🌐';
        
        if (currentPage.includes('payment')) {
            category = 'payment';
            emoji = '💳';
        } else if (currentPage.includes('support')) {
            category = 'support';
            emoji = '🛠️';
        }

        const message = `${emoji} *زائر جديد - ${this.getCategoryName(category)}*

🆔 مستخدم #${user.userNumber}
📄 الصفحة: ${currentPage}
📱 الجهاز: ${user.device?.brand} ${user.device?.model}
⏰ الوقت: ${new Date(user.timestamp).toLocaleString('ar-SA')}

#${category} #user${user.userNumber}`;

        await this.sendTelegramMessage(message);
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
        await this.sendCategorizedNotification(user);
    }

    async sendReturningUserNotification(user) {
        await this.sendCategorizedNotification(user);
    }
}

// تشغيل النظام المحسن
document.addEventListener('DOMContentLoaded', () => {
    // استبدال النظام القديم بالمحسن
    if (typeof UserTrackingSystem !== 'undefined') {
        window.userTrackingSystem = new EnhancedUserTracking();
    }
});