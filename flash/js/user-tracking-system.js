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

    // تحديد نوع الجهاز بدقة متطورة
    getDeviceInfo() {
        const ua = navigator.userAgent;
        const platform = navigator.platform;
        const vendor = navigator.vendor;
        
        let deviceType = this.detectDeviceType(ua);
        let deviceBrand = this.detectDeviceBrand(ua, vendor);
        let deviceModel = this.detectDeviceModel(ua, deviceBrand);
        let deviceSpecs = this.getDeviceSpecs();
        
        return {
            type: deviceType,
            brand: deviceBrand,
            model: deviceModel,
            fullName: `${deviceBrand} ${deviceModel}`,
            specs: deviceSpecs,
            platform: platform,
            vendor: vendor,
            touchSupport: 'ontouchstart' in window,
            orientation: this.getOrientation(),
            battery: this.getBatteryInfo(),
            memory: this.getMemoryInfo(),
            connection: this.getConnectionType()
        };
    }
    
    // كشف نوع الجهاز بدقة
    detectDeviceType(ua) {
        const patterns = {
            'Smart TV': /smart.?tv|tizen|webos|roku|chromecast/i,
            'Gaming Console': /playstation|xbox|nintendo/i,
            'Tablet': /tablet|ipad|kindle|silk|gt-p|sm-t|nexus (?:7|9|10)|xoom/i,
            'Mobile': /mobile|phone|iphone|ipod|android|blackberry|opera.mini|windows.ce|palm|smartphone|iemobile/i,
            'Desktop': /windows nt|macintosh|linux|x11/i
        };
        
        for (const [type, pattern] of Object.entries(patterns)) {
            if (pattern.test(ua)) return type;
        }
        return 'Unknown';
    }
    
    // كشف علامة الجهاز بدقة عالية
    detectDeviceBrand(ua, vendor) {
        const brands = {
            'Apple': /iphone|ipad|ipod|macintosh|mac os x/i,
            'Samsung': /samsung|sm-|gt-|galaxy/i,
            'Huawei': /huawei|honor|hma-|lya-|ana-|pot-|vog-|ela-|mar-|yal-/i,
            'Xiaomi': /xiaomi|mi |redmi|poco/i,
            'OnePlus': /oneplus|one plus/i,
            'Oppo': /oppo|cph|pbam|pbem/i,
            'Vivo': /vivo|v\d{4}/i,
            'LG': /lg|nexus [45]/i,
            'Sony': /sony|xperia/i,
            'HTC': /htc|desire|sensation/i,
            'Motorola': /motorola|moto|xt\d{4}/i,
            'Nokia': /nokia|lumia/i,
            'Google': /pixel|nexus/i,
            'Realme': /realme|rmx/i,
            'Asus': /asus|zenfone/i,
            'Lenovo': /lenovo|tb-/i,
            'Microsoft': /windows phone|lumia/i,
            'BlackBerry': /blackberry|bb\d{2}/i
        };
        
        // فحص vendor أولاً
        if (vendor && vendor.includes('Apple')) return 'Apple';
        if (vendor && vendor.includes('Google')) return 'Google';
        
        for (const [brand, pattern] of Object.entries(brands)) {
            if (pattern.test(ua)) return brand;
        }
        return 'Unknown';
    }
    
    // كشف موديل الجهاز بتفصيل دقيق
    detectDeviceModel(ua, brand) {
        const models = {
            'Apple': {
                'iPhone 15 Pro Max': /iphone16,2/i,
                'iPhone 15 Pro': /iphone16,1/i,
                'iPhone 15 Plus': /iphone15,5/i,
                'iPhone 15': /iphone15,4/i,
                'iPhone 14 Pro Max': /iphone15,3/i,
                'iPhone 14 Pro': /iphone15,2/i,
                'iPhone 14 Plus': /iphone14,8/i,
                'iPhone 14': /iphone14,7/i,
                'iPhone 13 Pro Max': /iphone14,3/i,
                'iPhone 13 Pro': /iphone14,2/i,
                'iPhone 13': /iphone14,5/i,
                'iPhone 12 Pro Max': /iphone13,4/i,
                'iPhone 12 Pro': /iphone13,3/i,
                'iPhone 12': /iphone13,2/i,
                'iPad Pro 12.9': /ipad13,/i,
                'iPad Pro 11': /ipad14,/i,
                'iPad Air': /ipad13,/i,
                'iPad': /ipad/i,
                'iPhone': /iphone/i
            },
            'Samsung': {
                'Galaxy S24 Ultra': /sm-s928/i,
                'Galaxy S24+': /sm-s926/i,
                'Galaxy S24': /sm-s921/i,
                'Galaxy S23 Ultra': /sm-s918/i,
                'Galaxy S23+': /sm-s916/i,
                'Galaxy S23': /sm-s911/i,
                'Galaxy Note 20': /sm-n98/i,
                'Galaxy A54': /sm-a546/i,
                'Galaxy A34': /sm-a346/i,
                'Galaxy Tab S9': /sm-x91/i
            },
            'Huawei': {
                'P60 Pro': /ana-/i,
                'Mate 60 Pro': /bla-/i,
                'Nova 11': /jln-/i
            },
            'Xiaomi': {
                'Mi 13 Ultra': /2304fpn2dg/i,
                'Mi 13 Pro': /2210132c/i,
                'Redmi Note 12': /22101316g/i,
                'POCO F5': /23013pc75g/i
            }
        };
        
        if (models[brand]) {
            for (const [model, pattern] of Object.entries(models[brand])) {
                if (pattern.test(ua)) return model;
            }
        }
        
        // محاولة استخراج الموديل من UA
        const modelMatch = ua.match(/([a-z0-9\-_]+)\s*build/i) || 
                          ua.match(/(sm-[a-z0-9]+)/i) ||
                          ua.match(/(gt-[a-z0-9]+)/i);
        
        return modelMatch ? modelMatch[1] : 'Unknown Model';
    }
    
    // مواصفات الجهاز
    getDeviceSpecs() {
        return {
            screen: `${screen.width}x${screen.height}`,
            colorDepth: screen.colorDepth,
            pixelRatio: window.devicePixelRatio || 1,
            cores: navigator.hardwareConcurrency || 'Unknown',
            maxTouchPoints: navigator.maxTouchPoints || 0,
            languages: navigator.languages || [navigator.language]
        };
    }
    
    // اتجاه الشاشة
    getOrientation() {
        if (screen.orientation) {
            return screen.orientation.type;
        }
        return window.innerWidth > window.innerHeight ? 'landscape' : 'portrait';
    }
    
    // معلومات البطارية
    getBatteryInfo() {
        if ('getBattery' in navigator) {
            navigator.getBattery().then(battery => {
                return {
                    level: Math.round(battery.level * 100) + '%',
                    charging: battery.charging
                };
            });
        }
        return { level: 'Unknown', charging: 'Unknown' };
    }
    
    // معلومات الذاكرة
    getMemoryInfo() {
        if ('memory' in performance) {
            return {
                deviceMemory: performance.memory.deviceMemory + ' GB',
                usedJSHeapSize: Math.round(performance.memory.usedJSHeapSize / 1048576) + ' MB'
            };
        }
        return { deviceMemory: 'Unknown', usedJSHeapSize: 'Unknown' };
    }
    
    // نوع الاتصال
    getConnectionType() {
        const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
        if (connection) {
            return {
                type: connection.effectiveType || 'Unknown',
                downlink: connection.downlink + ' Mbps' || 'Unknown',
                rtt: connection.rtt + ' ms' || 'Unknown'
            };
        }
        return { type: 'Unknown', downlink: 'Unknown', rtt: 'Unknown' };
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

        // جلب بيانات التسجيل
        const userData = JSON.parse(localStorage.getItem('user') || '{}');
        const userSettings = JSON.parse(localStorage.getItem('userSettings') || '{}');
        const userName = userData.name || (userSettings.firstName + ' ' + userSettings.lastName).trim() || 'غير مسجل';
        const userEmail = userData.email || 'غير مسجل';

        return `${typeEmoji} *${typeText} - ${categoryName}*

👤 **الاسم:** ${userName}
📧 **الإيميل:** ${userEmail}
🆔 مستخدم #${user.userNumber}

📱 **تفاصيل الجهاز:**
• النوع: ${user.device?.type || 'غير محدد'}
• العلامة: ${user.device?.brand || 'غير محدد'}
• الموديل: ${user.device?.model || 'غير محدد'}
• الشاشة: ${user.device?.specs?.screen || 'غير محدد'}
• المعالجات: ${user.device?.specs?.cores || 'غير محدد'} نواة
• الاتجاه: ${user.device?.orientation || 'غير محدد'}

🌐 **معلومات المتصفح:**
• الاسم: ${user.browser?.name || 'غير محدد'}
• الإصدار: ${user.browser?.version || 'غير محدد'}
• اللغة: ${user.browser?.language || 'غير محدد'}

📄 الصفحة: ${currentPage}
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

    // تتبع تغيير الصفحات (مرة واحدة فقط)
    trackPageChanges() {
        const visitedPages = new Set();
        let currentPage = window.location.pathname;
        
        // إضافة الصفحة الحالية
        if (!visitedPages.has(currentPage)) {
            visitedPages.add(currentPage);
        }
        
        // مراقبة تغيير URL
        const observer = new MutationObserver(() => {
            if (window.location.pathname !== currentPage) {
                currentPage = window.location.pathname;
                
                // إرسال إشعار فقط إذا لم تتم زيارة الصفحة من قبل
                if (!visitedPages.has(currentPage)) {
                    visitedPages.add(currentPage);
                    this.trackAction('page_visit', currentPage);
                }
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
        const userData = JSON.parse(localStorage.getItem('user') || '{}');
        const userSettings = JSON.parse(localStorage.getItem('userSettings') || '{}');
        const userName = userData.name || (userSettings.firstName + ' ' + userSettings.lastName).trim() || 'غير مسجل';
        const userEmail = userData.email || 'غير مسجل';
        
        if (user && actionType === 'page_visit') {
            const message = `📄 *صفحة جديدة - مستخدم #${user.userNumber}*

👤 **الاسم:** ${userName}
📧 **الإيميل:** ${userEmail}
🌐 *الصفحة:* ${actionData}
📅 *الوقت:* ${new Date().toLocaleString('ar-SA')}`;

            this.sendTelegramMessage(message);
        } else if (user && actionType !== 'page_visit') {
            const message = `🎯 *إجراء جديد - مستخدم #${user.userNumber}*

👤 **الاسم:** ${userName}
📧 **الإيميل:** ${userEmail}
⚡ *النوع:* ${actionType}
📝 *التفاصيل:* ${actionData}
📅 *الوقت:* ${new Date().toLocaleString('ar-SA')}`;

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