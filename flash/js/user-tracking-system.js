// نظام تتبع المستخدمين المتقدم مع بوت التيليجرام
class UserTrackingSystem {
    constructor() {
        this.botToken = '7285756328:AAFHLQU8e72LO2U_IAhNrR99cttRBkT6CEU';
        this.chatId = '2126771039';
        this.storageKey = 'flash_user_tracking';
        this.init();
    }

    init() {
        this.trackUser();
        this.setupEventListeners();
    }

    // تتبع المستخدم وتخصيص رقم فريد
    async trackUser() {
        const userInfo = await this.getUserInfo();
        const existingUser = this.getStoredUser(userInfo.fingerprint);
        
        if (!existingUser) {
            // مستخدم جديد - تخصيص رقم
            const userNumber = this.getNextUserNumber();
            const newUser = {
                ...userInfo,
                userNumber,
                firstVisit: new Date().toISOString(),
                visitCount: 1
            };
            
            this.storeUser(newUser);
            this.sendNewUserNotification(newUser);
        } else {
            // مستخدم عائد - تحديث المعلومات
            existingUser.visitCount++;
            existingUser.lastVisit = new Date().toISOString();
            existingUser.currentPage = window.location.pathname;
            
            this.updateUser(existingUser);
            this.sendReturningUserNotification(existingUser);
        }
    }

    // جمع معلومات المستخدم الشاملة
    async getUserInfo() {
        const fingerprint = await this.generateFingerprint();
        
        return {
            fingerprint,
            timestamp: new Date().toISOString(),
            currentPage: window.location.pathname,
            referrer: document.referrer || 'مباشر',
            device: this.getDeviceInfo(),
            browser: this.getBrowserInfo(),
            os: this.getOSInfo(),
            screen: this.getScreenInfo(),
            network: await this.getNetworkInfo(),
            location: await this.getLocationInfo()
        };
    }

    // إنشاء بصمة فريدة للمستخدم
    async generateFingerprint() {
        const components = [
            navigator.userAgent,
            navigator.language,
            screen.width + 'x' + screen.height,
            screen.colorDepth,
            new Date().getTimezoneOffset(),
            navigator.platform,
            navigator.cookieEnabled,
            navigator.doNotTrack,
            this.getCanvasFingerprint()
        ];

        const fingerprint = await this.hashString(components.join('|'));
        return fingerprint.substring(0, 16);
    }

    // إنشاء بصمة Canvas
    getCanvasFingerprint() {
        try {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            ctx.textBaseline = 'top';
            ctx.font = '14px Arial';
            ctx.fillText('Flash USDT Fingerprint', 2, 2);
            return canvas.toDataURL();
        } catch (e) {
            return 'canvas_not_supported';
        }
    }

    // تشفير النص
    async hashString(str) {
        const encoder = new TextEncoder();
        const data = encoder.encode(str);
        const hashBuffer = await crypto.subtle.digest('SHA-256', data);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    }

    // تحديد نوع الجهاز بدقة
    getDeviceInfo() {
        const ua = navigator.userAgent;
        let deviceType = 'Desktop';
        let deviceModel = 'غير محدد';
        let deviceBrand = 'غير محدد';

        // تحديد نوع الجهاز
        if (/tablet|ipad|playbook|silk/i.test(ua)) {
            deviceType = 'Tablet';
        } else if (/mobile|iphone|ipod|android|blackberry|opera|mini|windows\sce|palm|smartphone|iemobile/i.test(ua)) {
            deviceType = 'Mobile';
        }

        // تحديد العلامة التجارية والموديل
        if (/iPhone/i.test(ua)) {
            deviceBrand = 'Apple';
            const match = ua.match(/iPhone OS (\d+_\d+)/);
            deviceModel = match ? `iPhone (iOS ${match[1].replace('_', '.')})` : 'iPhone';
        } else if (/iPad/i.test(ua)) {
            deviceBrand = 'Apple';
            deviceModel = 'iPad';
        } else if (/Android/i.test(ua)) {
            deviceBrand = 'Android';
            const match = ua.match(/Android (\d+\.?\d*)/);
            deviceModel = match ? `Android ${match[1]}` : 'Android';
            
            // تحديد العلامة التجارية للأندرويد
            if (/Samsung/i.test(ua)) deviceBrand = 'Samsung';
            else if (/Huawei/i.test(ua)) deviceBrand = 'Huawei';
            else if (/Xiaomi/i.test(ua)) deviceBrand = 'Xiaomi';
            else if (/OnePlus/i.test(ua)) deviceBrand = 'OnePlus';
            else if (/LG/i.test(ua)) deviceBrand = 'LG';
        }

        return {
            type: deviceType,
            brand: deviceBrand,
            model: deviceModel,
            touchSupport: 'ontouchstart' in window
        };
    }

    // معلومات المتصفح المحسنة
    getBrowserInfo() {
        const ua = navigator.userAgent;
        let browser = 'غير معروف';
        let version = '';

        const browsers = [
            { name: 'Chrome', pattern: /Chrome\/(\d+)/ },
            { name: 'Firefox', pattern: /Firefox\/(\d+)/ },
            { name: 'Safari', pattern: /Safari\/(\d+)/ },
            { name: 'Edge', pattern: /Edge\/(\d+)/ },
            { name: 'Opera', pattern: /Opera\/(\d+)/ },
            { name: 'Samsung Browser', pattern: /SamsungBrowser\/(\d+)/ }
        ];

        for (const b of browsers) {
            const match = ua.match(b.pattern);
            if (match) {
                browser = b.name;
                version = match[1];
                break;
            }
        }

        return {
            name: browser,
            version: version,
            userAgent: ua,
            language: navigator.language,
            cookieEnabled: navigator.cookieEnabled
        };
    }

    // معلومات نظام التشغيل المحسنة
    getOSInfo() {
        const ua = navigator.userAgent;
        let os = 'غير معروف';
        let version = '';

        const systems = [
            { name: 'Windows 11', pattern: /Windows NT 10\.0.*Win64.*x64/ },
            { name: 'Windows 10', pattern: /Windows NT 10\.0/ },
            { name: 'Windows 8.1', pattern: /Windows NT 6\.3/ },
            { name: 'Windows 8', pattern: /Windows NT 6\.2/ },
            { name: 'Windows 7', pattern: /Windows NT 6\.1/ },
            { name: 'macOS', pattern: /Mac OS X (\d+_\d+)/ },
            { name: 'iOS', pattern: /iPhone OS (\d+_\d+)/ },
            { name: 'Android', pattern: /Android (\d+\.?\d*)/ },
            { name: 'Linux', pattern: /Linux/ }
        ];

        for (const sys of systems) {
            const match = ua.match(sys.pattern);
            if (match) {
                os = sys.name;
                version = match[1] ? match[1].replace('_', '.') : '';
                break;
            }
        }

        return {
            name: os,
            version: version,
            platform: navigator.platform,
            architecture: navigator.userAgent.includes('x64') ? '64-bit' : '32-bit'
        };
    }

    // معلومات الشاشة
    getScreenInfo() {
        return {
            resolution: `${screen.width}x${screen.height}`,
            availableResolution: `${screen.availWidth}x${screen.availHeight}`,
            colorDepth: screen.colorDepth,
            pixelDepth: screen.pixelDepth,
            orientation: screen.orientation ? screen.orientation.type : 'غير محدد'
        };
    }

    // معلومات الشبكة
    async getNetworkInfo() {
        try {
            const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
            if (connection) {
                return {
                    effectiveType: connection.effectiveType || 'غير محدد',
                    downlink: connection.downlink || 'غير محدد',
                    rtt: connection.rtt || 'غير محدد'
                };
            }
        } catch (e) {
            // تجاهل الأخطاء
        }
        return { effectiveType: 'غير متاح', downlink: 'غير متاح', rtt: 'غير متاح' };
    }

    // معلومات الموقع (اختيارية)
    async getLocationInfo() {
        try {
            const response = await fetch('https://ipapi.co/json/');
            const data = await response.json();
            return {
                country: data.country_name || 'غير محدد',
                city: data.city || 'غير محدد',
                ip: data.ip || 'غير محدد'
            };
        } catch (e) {
            return { country: 'غير متاح', city: 'غير متاح', ip: 'غير متاح' };
        }
    }

    // الحصول على الرقم التالي للمستخدم
    getNextUserNumber() {
        const data = this.getStorageData();
        data.lastUserNumber = (data.lastUserNumber || 0) + 1;
        this.saveStorageData(data);
        return data.lastUserNumber;
    }

    // حفظ بيانات المستخدم
    storeUser(user) {
        const data = this.getStorageData();
        data.users[user.fingerprint] = user;
        this.saveStorageData(data);
    }

    // تحديث بيانات المستخدم
    updateUser(user) {
        this.storeUser(user);
    }

    // الحصول على مستخدم محفوظ
    getStoredUser(fingerprint) {
        const data = this.getStorageData();
        return data.users[fingerprint] || null;
    }

    // الحصول على بيانات التخزين
    getStorageData() {
        try {
            const stored = localStorage.getItem(this.storageKey);
            return stored ? JSON.parse(stored) : { users: {}, lastUserNumber: 0 };
        } catch (e) {
            return { users: {}, lastUserNumber: 0 };
        }
    }

    // حفظ بيانات التخزين
    saveStorageData(data) {
        try {
            localStorage.setItem(this.storageKey, JSON.stringify(data));
        } catch (e) {
            console.error('فشل في حفظ بيانات التتبع');
        }
    }

    // إرسال إشعار مستخدم جديد مع التصنيف
    sendNewUserNotification(user) {
        const message = this.formatCategorizedMessage(user, 'new');
        this.sendTelegramMessage(message);
    }

    // إرسال إشعار مستخدم عائد مع التصنيف
    sendReturningUserNotification(user) {
        const message = this.formatCategorizedMessage(user, 'returning');
        this.sendTelegramMessage(message);
    }

    // تنسيق رسالة مصنفة حسب نوع الصفحة
    formatCategorizedMessage(user, type) {
        const currentPage = user.currentPage || '';
        let category = 'browse';
        let emoji = '🌐';
        let categoryName = 'تصفح الموقع';
        
        if (currentPage.includes('payment')) {
            category = 'payment';
            emoji = '💳';
            categoryName = 'صفحة الدفع';
        } else if (currentPage.includes('support')) {
            category = 'support';
            emoji = '🛠️';
            categoryName = 'الدعم الفني';
        }

        const typeEmoji = type === 'new' ? '🆕' : '🔄';
        const typeText = type === 'new' ? 'مستخدم جديد' : 'مستخدم عائد';

        return `${typeEmoji} *${typeText} - ${categoryName}*

🆔 مستخدم #${user.userNumber}
📄 الصفحة: ${currentPage}
📱 الجهاز: ${user.device?.brand || 'غير محدد'} ${user.device?.model || ''}
🌐 المتصفح: ${user.browser?.name || 'غير محدد'}
⏰ الوقت: ${new Date(user.lastVisit || user.timestamp).toLocaleString('ar-SA')}
${type === 'returning' ? `🔢 عدد الزيارات: ${user.visitCount}
` : ''}📍 الموقع: ${user.location?.country || 'غير محدد'}

#${category} #user${user.userNumber} #${type}`;
    }



    // إرسال رسالة تيليجرام
    async sendTelegramMessage(message) {
        try {
            const url = `https://api.telegram.org/bot${this.botToken}/sendMessage`;
            const response = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    chat_id: this.chatId,
                    text: message,
                    parse_mode: 'Markdown'
                })
            });

            if (!response.ok) {
                console.error('فشل في إرسال الإشعار إلى تيليجرام');
            }
        } catch (error) {
            console.error('خطأ في إرسال الإشعار:', error);
        }
    }

    // إعداد مستمعي الأحداث
    setupEventListeners() {
        // تتبع النقرات على الأزرار المهمة
        this.trackButtonClicks();
        
        // تتبع تغيير الصفحات
        this.trackPageChanges();
        
        // تتبع الوقت المقضي
        this.trackTimeSpent();
    }

    // تتبع النقرات على الأزرار
    trackButtonClicks() {
        const buttons = [
            { selector: '.login-button', name: 'تسجيل الدخول' },
            { selector: '.register-button', name: 'التسجيل' },
            { selector: '#basic-package-btn', name: 'الباقة التجريبية' },
            { selector: '#pro-package-btn', name: 'الباقة الأساسية' },
            { selector: '#enterprise-package-btn', name: 'الباقة الاحترافية' }
        ];

        buttons.forEach(({ selector, name }) => {
            document.querySelectorAll(selector).forEach(btn => {
                btn.addEventListener('click', () => {
                    this.trackAction('button_click', name);
                });
            });
        });
    }

    // تتبع تغيير الصفحات
    trackPageChanges() {
        let currentPage = window.location.pathname;
        
        // مراقبة تغيير URL
        const observer = new MutationObserver(() => {
            if (window.location.pathname !== currentPage) {
                currentPage = window.location.pathname;
                this.trackAction('page_change', currentPage);
            }
        });
        
        observer.observe(document, { subtree: true, childList: true });
    }

    // تتبع الوقت المقضي
    trackTimeSpent() {
        const startTime = Date.now();
        
        window.addEventListener('beforeunload', () => {
            const timeSpent = Math.round((Date.now() - startTime) / 1000);
            this.trackAction('time_spent', `${timeSpent} ثانية`);
        });
    }

    // تتبع إجراء معين
    async trackAction(actionType, actionData) {
        const user = await this.getCurrentUser();
        if (user) {
            const message = `🎯 *إجراء جديد - مستخدم #${user.userNumber}*

⚡ *النوع:* ${actionType}
📝 *التفاصيل:* ${actionData}
📅 *الوقت:* ${new Date().toLocaleString('ar-SA')}
📄 *الصفحة:* ${window.location.pathname}`;

            this.sendTelegramMessage(message);
        }
    }

    // الحصول على المستخدم الحالي
    async getCurrentUser() {
        const fingerprint = await this.generateFingerprint();
        return this.getStoredUser(fingerprint);
    }
}

// تشغيل النظام عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', () => {
    new UserTrackingSystem();
});