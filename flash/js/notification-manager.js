// 📢 مدير الإشعارات المتقدم لتيليجرام
class NotificationManager {
    constructor() {
        this.config = window.TrackingConfig || {};
        this.botToken = this.config.telegram?.botToken || '7285756328:AAFHLQU8e72LO2U_IAhNrR99cttRBkT6CEU';
        this.chatId = this.config.telegram?.chatId || '2126771039';
        this.queue = [];
        this.isProcessing = false;
        this.retryCount = new Map();
        this.maxRetries = 3;
        this.requestDelay = 1000;
        this.init();
    }

    init() {
        this.startQueueProcessor();
        this.setupErrorHandling();
    }

    // 🚀 معالج طابور الإشعارات
    startQueueProcessor() {
        setInterval(async () => {
            if (!this.isProcessing && this.queue.length > 0) {
                await this.processQueue();
            }
        }, this.requestDelay);
    }

    // 📤 إضافة إشعار للطابور
    addNotification(message, priority = 'medium', options = {}) {
        const notification = {
            id: this.generateId(),
            message,
            priority,
            timestamp: Date.now(),
            options: {
                parseMode: 'Markdown',
                disableWebPagePreview: true,
                ...options
            }
        };

        // ترتيب حسب الأولوية
        const priorityOrder = { urgent: 0, high: 1, medium: 2, low: 3 };
        const insertIndex = this.queue.findIndex(item => 
            priorityOrder[item.priority] > priorityOrder[priority]
        );

        if (insertIndex === -1) {
            this.queue.push(notification);
        } else {
            this.queue.splice(insertIndex, 0, notification);
        }

        return notification.id;
    }

    // ⚡ معالجة الطابور
    async processQueue() {
        if (this.queue.length === 0) return;

        this.isProcessing = true;
        const notification = this.queue.shift();

        try {
            await this.sendNotification(notification);
            this.retryCount.delete(notification.id);
        } catch (error) {
            await this.handleNotificationError(notification, error);
        }

        this.isProcessing = false;
    }

    // 📨 إرسال إشعار واحد
    async sendNotification(notification) {
        const url = `https://api.telegram.org/bot${this.botToken}/sendMessage`;
        
        const payload = {
            chat_id: this.chatId,
            text: notification.message,
            parse_mode: notification.options.parseMode,
            disable_web_page_preview: notification.options.disableWebPagePreview
        };

        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`Telegram API Error: ${errorData.description || 'Unknown error'}`);
        }

        return await response.json();
    }

    // ❌ معالجة أخطاء الإشعارات
    async handleNotificationError(notification, error) {
        const retries = this.retryCount.get(notification.id) || 0;
        
        if (retries < this.maxRetries) {
            this.retryCount.set(notification.id, retries + 1);
            
            // إعادة إضافة للطابور مع تأخير
            setTimeout(() => {
                this.queue.unshift(notification);
            }, Math.pow(2, retries) * 1000); // تأخير متزايد
            
            console.warn(`إعادة محاولة إرسال الإشعار ${notification.id} (${retries + 1}/${this.maxRetries})`);
        } else {
            console.error(`فشل في إرسال الإشعار ${notification.id} بعد ${this.maxRetries} محاولات:`, error);
            this.retryCount.delete(notification.id);
        }
    }

    // 🆔 توليد معرف فريد
    generateId() {
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
    }

    // 🛠️ إعداد معالجة الأخطاء
    setupErrorHandling() {
        window.addEventListener('error', (event) => {
            if (this.config.development?.enableErrorReporting) {
                this.sendErrorNotification(event.error);
            }
        });

        window.addEventListener('unhandledrejection', (event) => {
            if (this.config.development?.enableErrorReporting) {
                this.sendErrorNotification(event.reason);
            }
        });
    }

    // 🚨 إرسال إشعار خطأ
    sendErrorNotification(error) {
        const message = `🚨 **خطأ في النظام**

📄 **الصفحة:** ${window.location.pathname}
⚠️ **الخطأ:** ${error.message || error}
📅 **الوقت:** ${new Date().toLocaleString('en-US')}

#error #system`;

        this.addNotification(message, 'urgent');
    }

    // 📊 إحصائيات الطابور
    getQueueStats() {
        return {
            pending: this.queue.length,
            processing: this.isProcessing,
            failed: this.retryCount.size,
            priorities: this.queue.reduce((acc, item) => {
                acc[item.priority] = (acc[item.priority] || 0) + 1;
                return acc;
            }, {})
        };
    }

    // 🧹 تنظيف الطابور
    clearQueue() {
        this.queue = [];
        this.retryCount.clear();
        console.log('تم تنظيف طابور الإشعارات');
    }

    // ⏸️ إيقاف مؤقت للإشعارات
    pause() {
        this.isProcessing = true;
        console.log('تم إيقاف معالجة الإشعارات مؤقتاً');
    }

    // ▶️ استئناف الإشعارات
    resume() {
        this.isProcessing = false;
        console.log('تم استئناف معالجة الإشعارات');
    }
}

// 🎨 منسق الرسائل المتقدم
class MessageFormatter {
    constructor() {
        this.config = window.TrackingConfig || {};
        this.emojis = this.config.messages?.emojis || {};
        this.priorities = this.config.messages?.priorities || {};
    }

    // 🆕 رسالة مستخدم جديد
    formatNewUserMessage(user) {
        const userData = this.getUserData();
        const priorityEmoji = this.priorities.high || '🔥';

        return `${this.emojis.newUser || '🆕'} ${priorityEmoji} **مستخدم جديد دخل الموقع**

👤 **المعلومات الشخصية:**
• الاسم: ${userData.name}
• الإيميل: ${userData.email}
• رقم المستخدم: #${user.userNumber}

📱 **معلومات الجهاز:**
• النوع: ${user.device?.type || 'غير محدد'}
• العلامة: ${user.device?.brand || 'غير محدد'} ${user.device?.model || ''}
• نظام التشغيل: ${user.device?.os?.name || 'غير محدد'} ${user.device?.os?.version || ''}
• الشاشة: ${user.device?.specs?.screen || 'غير محدد'}
• المعالجات: ${user.device?.specs?.cores || 'غير محدد'} نواة

🌐 **معلومات المتصفح:**
• الاسم: ${user.browser?.name || 'غير محدد'} ${user.browser?.version || ''}
• اللغة: ${user.browser?.language || 'غير محدد'}
• المنصة: ${user.browser?.platform || 'غير محدد'}

📍 **الموقع الجغرافي:**
• الدولة: ${user.location?.country || 'غير محدد'}
• المدينة: ${user.location?.city || 'غير محدد'}
• المنطقة الزمنية: ${user.location?.timezone || 'غير محدد'}
• مزود الخدمة: ${user.location?.isp || 'غير محدد'}

📊 **معلومات الأداء:**
• وقت التحميل: ${user.performance?.loadTime || 'غير محدد'} ms
• الذاكرة المستخدمة: ${user.performance?.memory?.used || 'غير متاح'}
• وقت الرسم الأول: ${user.performance?.firstPaint || 'غير متاح'}

📄 **نشاط الجلسة:**
• الصفحة الحالية: ${user.currentPage || 'غير محدد'}
• المصدر: ${user.referrer || 'مباشر'}
• وقت الدخول: ${new Date(user.timestamp).toLocaleString('en-US')}

⚡ **الحالة:** متصل الآن

#new_user #user${user.userNumber} #priority_high`;
    }

    // 🔄 رسالة مستخدم عائد
    formatReturningUserMessage(user) {
        const userData = this.getUserData();

        return `${this.emojis.returningUser || '🔄'} **مستخدم عائد - #${user.userNumber}**

👤 **المستخدم:** ${userData.name}
📧 **الإيميل:** ${userData.email}

📊 **إحصائيات الزيارة:**
• عدد الزيارات: ${user.visitCount || 1}
• آخر زيارة: ${user.lastVisit ? new Date(user.lastVisit).toLocaleString('en-US') : 'غير محدد'}
• الزيارة الأولى: ${user.firstVisit ? new Date(user.firstVisit).toLocaleString('en-US') : 'غير محدد'}

📱 **الجهاز الحالي:** ${user.device?.brand || 'غير محدد'} ${user.device?.type || ''}
🌐 **المتصفح:** ${user.browser?.name || 'غير محدد'}
📍 **الموقع:** ${user.location?.country || 'غير محدد'}, ${user.location?.city || 'غير محدد'}

📄 **الصفحة الحالية:** ${user.currentPage || 'غير محدد'}
⏰ **وقت العودة:** ${new Date().toLocaleString('en-US')}

#returning_user #user${user.userNumber}`;
    }

    // 📦 رسالة اختيار الباقة
    formatPackageSelectionMessage(user, packageName, price, priority = 'high') {
        const userData = this.getUserData();
        const priorityEmoji = this.priorities[priority] || '';

        return `${this.emojis.packageSelection || '📦'} ${priorityEmoji} **اختيار باقة جديد**

👤 **المستخدم:** ${userData.name} (#${user.userNumber})
📧 **الإيميل:** ${userData.email}

🎯 **تفاصيل الباقة:**
• الاسم: ${packageName}
• السعر: ${price}
• الأولوية: ${priority.toUpperCase()}
• الصفحة: ${window.location.pathname}

📱 **معلومات الجهاز:**
• الجهاز: ${user.device?.brand || 'غير محدد'} ${user.device?.type || ''}
• المتصفح: ${user.browser?.name || 'غير محدد'}
• نظام التشغيل: ${user.device?.os?.name || 'غير محدد'}

📍 **الموقع:** ${user.location?.country || 'غير محدد'}, ${user.location?.city || 'غير محدد'}
⏰ **الوقت:** ${new Date().toLocaleString('en-US')}

${priority === 'urgent' ? '🚨 **تنبيه عاجل:** باقة عالية القيمة!' : ''}

#package_selection #user${user.userNumber} #${packageName.replace(/\s+/g, '_')} #${priority}`;
    }

    // 💳 رسالة صفحة الدفع
    formatPaymentPageMessage(user, packageType, priority = 'urgent') {
        const userData = this.getUserData();
        const priorityEmoji = this.priorities[priority] || '';

        return `${this.emojis.paymentPage || '💳'} ${priorityEmoji} **وصول لصفحة الدفع**

👤 **المستخدم:** ${userData.name} (#${user.userNumber})
📧 **الإيميل:** ${userData.email}

💰 **تفاصيل الدفع:**
• الباقة: ${packageType}
• الصفحة: ${window.location.pathname}
• الحالة: جاهز للدفع
• مدة الجلسة: ${this.formatDuration(Date.now() - user.sessionStart)}

📱 **معلومات الجهاز:**
• الجهاز: ${user.device?.brand || 'غير محدد'} ${user.device?.model || ''}
• المتصفح: ${user.browser?.name || 'غير محدد'} ${user.browser?.version || ''}
• نظام التشغيل: ${user.device?.os?.name || 'غير محدد'}

🌐 **معلومات الشبكة:**
• نوع الاتصال: ${user.network?.type || 'غير محدد'}
• سرعة التحميل: ${user.network?.downlink || 'غير محدد'}

📍 **الموقع:** ${user.location?.country || 'غير محدد'}, ${user.location?.city || 'غير محدد'}
⏰ **الوقت:** ${new Date().toLocaleString('en-US')}

🚨 **تنبيه عاجل:** المستخدم في صفحة الدفع - احتمالية شراء عالية جداً!

#payment_page #user${user.userNumber} #${packageType.replace(/\s+/g, '_')} #urgent`;
    }

    // 🎉 رسالة محاولة الشراء
    formatPurchaseAttemptMessage(user, purchaseData, priority = 'urgent') {
        const userData = this.getUserData();
        const priorityEmoji = this.priorities[priority] || '';

        return `${this.emojis.purchase || '🎉'} ${priorityEmoji} **محاولة شراء جديدة!**

👤 **المستخدم:** ${userData.name} (#${user.userNumber})
📧 **الإيميل:** ${userData.email}

💰 **تفاصيل الشراء:**
• الباقة: ${purchaseData.package || 'غير محدد'}
• المبلغ: ${purchaseData.amount || 'غير محدد'}
• طريقة الدفع: ${purchaseData.paymentMethod || 'غير محدد'}
• العملة: ${purchaseData.currency || 'USD'}

📊 **إحصائيات الجلسة:**
• مدة الجلسة: ${this.formatDuration(Date.now() - user.sessionStart)}
• الصفحات المزارة: ${user.pagesVisited?.length || 1}
• الإجراءات المنفذة: ${user.actions?.length || 0}

📱 **معلومات الجهاز:**
• الجهاز: ${user.device?.brand || 'غير محدد'} ${user.device?.model || ''}
• المتصفح: ${user.browser?.name || 'غير محدد'}
• الموقع: ${user.location?.country || 'غير محدد'}, ${user.location?.city || 'غير محدد'}

⏰ **وقت الشراء:** ${new Date().toLocaleString('en-US')}

🔥 **حالة عاجلة جداً:** عملية شراء قيد التنفيذ الآن!

#purchase_attempt #user${user.userNumber} #urgent #revenue`;
    }

    // 🚪 رسالة الخروج من الموقع
    formatExitMessage(user, exitType, sessionDuration, priority = 'medium') {
        const userData = this.getUserData();
        const exitConfig = this.config.exitTypes?.[exitType] || {};
        const exitEmoji = exitConfig.emoji || '🚪';

        return `${exitEmoji} **${exitConfig.name || 'خروج'} - مستخدم #${user.userNumber}**

👤 **المستخدم:** ${userData.name}
📧 **الإيميل:** ${userData.email}

⏱️ **إحصائيات الجلسة:**
• مدة الزيارة: ${this.formatDuration(sessionDuration)}
• الصفحات المزارة: ${user.pagesVisited?.length || 1}
• الإجراءات المنفذة: ${user.actions?.length || 0}

📄 **الصفحات المزارة:**
${user.pagesVisited?.map(page => `• ${page}`).join('\n') || '• الصفحة الرئيسية'}

📊 **آخر نشاط:**
${user.actions?.slice(-3).map(action => 
    `• ${action.type}: ${action.data ? JSON.stringify(action.data).substring(0, 50) : 'N/A'}`
).join('\n') || '• لا يوجد نشاط مسجل'}

📱 **الجهاز:** ${user.device?.brand || 'غير محدد'} ${user.device?.type || ''}
📍 **الموقع:** ${user.location?.country || 'غير محدد'}

⏰ **وقت الخروج:** ${new Date().toLocaleString('en-US')}

#exit #user${user.userNumber} #${exitType}`;
    }

    // 🧭 رسالة التنقل بين الصفحات
    formatNavigationMessage(user, from, to, priority = 'low') {
        const userData = this.getUserData();

        return `${this.emojis.navigation || '🧭'} **انتقال بين الصفحات - مستخدم #${user.userNumber}**

👤 **المستخدم:** ${userData.name}

📄 **التنقل:**
• من: ${from}
• إلى: ${to}

📊 **إحصائيات:**
• إجمالي الصفحات: ${user.pagesVisited?.length || 1}
• وقت الجلسة: ${this.formatDuration(Date.now() - user.sessionStart)}

⏰ **الوقت:** ${new Date().toLocaleString('en-US')}

#navigation #user${user.userNumber}`;
    }

    // 🎯 رسالة التفاعل المهم
    formatInteractionMessage(user, actionName, element, priority = 'medium') {
        const userData = this.getUserData();
        const priorityEmoji = this.priorities[priority] || '';

        return `${this.emojis.interaction || '🎯'} ${priorityEmoji} **تفاعل جديد - مستخدم #${user.userNumber}**

👤 **المستخدم:** ${userData.name}

⚡ **التفاعل:**
• النوع: ${actionName}
• العنصر: ${element.tagName || 'غير محدد'}
• الصفحة: ${window.location.pathname}

📊 **سياق الجلسة:**
• وقت الجلسة: ${this.formatDuration(Date.now() - user.sessionStart)}
• الإجراءات السابقة: ${user.actions?.length || 0}

⏰ **الوقت:** ${new Date().toLocaleString('en-US')}

#interaction #user${user.userNumber} #${actionName.replace(/\s+/g, '_')}`;
    }

    // 🎨 دوال مساعدة
    formatDuration(ms) {
        const seconds = Math.floor(ms / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);

        if (hours > 0) {
            return `${hours}س ${minutes % 60}د ${seconds % 60}ث`;
        } else if (minutes > 0) {
            return `${minutes}د ${seconds % 60}ث`;
        } else {
            return `${seconds}ث`;
        }
    }

    getUserData() {
        const userData = JSON.parse(localStorage.getItem('user') || '{}');
        const userSettings = JSON.parse(localStorage.getItem('userSettings') || '{}');
        
        return {
            name: userData.name || (userSettings.firstName + ' ' + userSettings.lastName).trim() || 'غير مسجل',
            email: userData.email || userSettings.email || 'غير مسجل'
        };
    }
}

// تصدير للاستخدام العام
if (typeof window !== 'undefined') {
    window.NotificationManager = NotificationManager;
    window.MessageFormatter = MessageFormatter;
}

// تهيئة تلقائية
document.addEventListener('DOMContentLoaded', () => {
    if (!window.notificationManager) {
        window.notificationManager = new NotificationManager();
        window.messageFormatter = new MessageFormatter();
        console.log('✅ تم تفعيل مدير الإشعارات المتقدم');
    }
});