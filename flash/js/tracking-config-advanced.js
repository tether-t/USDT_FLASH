// ⚙️ إعدادات نظام التتبع المتقدم
const TrackingConfig = {
    // 🤖 إعدادات بوت التيليجرام
    telegram: {
        botToken: '7285756328:AAFHLQU8e72LO2U_IAhNrR99cttRBkT6CEU',
        chatId: '2126771039',
        parseMode: 'Markdown',
        disableWebPagePreview: true
    },

    // 📊 إعدادات التتبع
    tracking: {
        enabled: true,
        trackNewUsers: true,
        trackReturningUsers: true,
        trackPageNavigation: true,
        trackPackageSelection: true,
        trackPurchaseAttempts: true,
        trackPageExit: true,
        trackImportantInteractions: true,
        trackTimeSpent: true,
        trackInactivity: true
    },

    // ⏱️ إعدادات التوقيت
    timing: {
        inactivityTimeout: 5 * 60 * 1000, // 5 دقائق
        blurTimeout: 30 * 1000, // 30 ثانية
        timeSpentInterval: 30 * 1000, // 30 ثانية
        sessionUpdateInterval: 60 * 1000 // دقيقة واحدة
    },

    // 📦 إعدادات الباقات
    packages: {
        basic: {
            name: 'الباقة التجريبية',
            price: '$50',
            selectors: ['#basic-package-btn', '.basic-package', '[data-package="basic"]'],
            priority: 'low'
        },
        pro: {
            name: 'الباقة الأساسية',
            price: '$150',
            selectors: ['#pro-package-btn', '.pro-package', '[data-package="pro"]'],
            priority: 'medium'
        },
        premium: {
            name: 'الباقة المتقدمة',
            price: '$300',
            selectors: ['#premium-package-btn', '.premium-package', '[data-package="premium"]'],
            priority: 'high'
        },
        enterprise: {
            name: 'الباقة الاحترافية',
            price: '$500',
            selectors: ['#enterprise-package-btn', '.enterprise-package', '[data-package="enterprise"]'],
            priority: 'high'
        },
        elite: {
            name: 'الباقة النخبة',
            price: '$1000',
            selectors: ['#elite-package-btn', '.elite-package', '[data-package="elite"]'],
            priority: 'urgent'
        }
    },

    // 💳 إعدادات صفحات الدفع
    paymentPages: [
        '/payment',
        '/payment-basic',
        '/payment-pro',
        '/payment-premium',
        '/payment-enterprise',
        '/payment-elite',
        '/pages/payment',
        '/checkout'
    ],

    // 🎯 إعدادات التفاعلات المهمة
    interactions: {
        login: {
            name: 'تسجيل الدخول',
            selectors: ['.login-btn', '#login-button', '[data-action="login"]'],
            priority: 'high'
        },
        register: {
            name: 'إنشاء حساب',
            selectors: ['.register-btn', '#register-button', '[data-action="register"]'],
            priority: 'high'
        },
        contact: {
            name: 'اتصل بنا',
            selectors: ['.contact-btn', '#contact-button', '[data-action="contact"]'],
            priority: 'medium'
        },
        support: {
            name: 'الدعم الفني',
            selectors: ['.support-btn', '#support-button', '[data-action="support"]'],
            priority: 'high'
        },
        download: {
            name: 'تحميل التطبيق',
            selectors: ['.download-btn', '.app-download', '[data-action="download"]'],
            priority: 'medium'
        },
        wallet: {
            name: 'ربط المحفظة',
            selectors: ['.wallet-connect', '#wallet-button', '[data-action="wallet"]'],
            priority: 'urgent'
        }
    },

    // 🚪 إعدادات أنواع الخروج
    exitTypes: {
        window_close: {
            name: '🚪 إغلاق النافذة',
            emoji: '🚪',
            priority: 'medium'
        },
        focus_lost: {
            name: '👁️ فقدان التركيز',
            emoji: '👁️',
            priority: 'low'
        },
        inactivity: {
            name: '😴 عدم النشاط',
            emoji: '😴',
            priority: 'low'
        },
        navigation: {
            name: '🧭 الانتقال لموقع آخر',
            emoji: '🧭',
            priority: 'medium'
        }
    },

    // 🎨 إعدادات الرسائل
    messages: {
        emojis: {
            newUser: '🆕',
            returningUser: '🔄',
            packageSelection: '📦',
            paymentPage: '💳',
            purchase: '🎉',
            exit: '🚪',
            navigation: '🧭',
            interaction: '🎯',
            urgent: '🚨',
            success: '✅',
            warning: '⚠️',
            error: '❌'
        },
        priorities: {
            low: '',
            medium: '⚡',
            high: '🔥',
            urgent: '🚨'
        }
    },

    // 📱 إعدادات كشف الأجهزة
    deviceDetection: {
        brands: {
            'Apple': /iphone|ipad|ipod|macintosh|mac os x/i,
            'Samsung': /samsung|sm-|gt-|galaxy/i,
            'Huawei': /huawei|honor|hma-|lya-|ana-|pot-|vog-|ela-|mar-|yal-/i,
            'Xiaomi': /xiaomi|mi |redmi|poco/i,
            'OnePlus': /oneplus|one plus/i,
            'Oppo': /oppo|cph|pbam|pbem/i,
            'Vivo': /vivo|v\\d{4}/i,
            'LG': /lg|nexus [45]/i,
            'Sony': /sony|xperia/i,
            'Google': /pixel|nexus/i
        },
        types: {
            'Smart TV': /smart.?tv|tizen|webos|roku|chromecast/i,
            'Gaming Console': /playstation|xbox|nintendo/i,
            'Tablet': /tablet|ipad|kindle|silk|gt-p|sm-t|nexus (?:7|9|10)|xoom/i,
            'Mobile': /mobile|phone|iphone|ipod|android|blackberry|opera.mini|windows.ce|palm|smartphone|iemobile/i,
            'Desktop': /windows nt|macintosh|linux|x11/i
        }
    },

    // 🌐 إعدادات كشف المتصفحات
    browserDetection: {
        'Chrome': { pattern: /Chrome\/(\d+)/, engine: 'Blink' },
        'Firefox': { pattern: /Firefox\/(\d+)/, engine: 'Gecko' },
        'Safari': { pattern: /Safari\/(\d+)/, engine: 'WebKit' },
        'Edge': { pattern: /Edge\/(\d+)/, engine: 'EdgeHTML' },
        'Opera': { pattern: /Opera\/(\d+)/, engine: 'Blink' },
        'Samsung Browser': { pattern: /SamsungBrowser\/(\d+)/, engine: 'Blink' }
    },

    // 💾 إعدادات التخزين
    storage: {
        userDataKey: 'flash_advanced_tracking',
        sessionDataKey: 'flash_session_data',
        configKey: 'flash_tracking_config',
        maxStorageSize: 5 * 1024 * 1024, // 5MB
        cleanupInterval: 24 * 60 * 60 * 1000 // 24 ساعة
    },

    // 🔒 إعدادات الأمان
    security: {
        enableFingerprinting: true,
        enableLocationTracking: true,
        enablePerformanceTracking: true,
        enableBatteryTracking: false, // معطل لأسباب الخصوصية
        maxRetries: 3,
        requestTimeout: 10000 // 10 ثواني
    },

    // 📊 إعدادات التحليلات
    analytics: {
        enableSessionAnalytics: true,
        enableConversionTracking: true,
        enableHeatmapData: false,
        enableScrollTracking: false,
        enableClickTracking: true,
        enableFormTracking: true
    },

    // 🌍 إعدادات التوطين
    localization: {
        defaultLanguage: 'ar',
        dateFormat: 'ar-SA',
        timeZone: 'Asia/Riyadh',
        currency: 'USD',
        supportedLanguages: ['ar', 'en']
    },

    // 🚀 إعدادات الأداء
    performance: {
        enableLazyLoading: true,
        enableCaching: true,
        enableCompression: false,
        maxConcurrentRequests: 3,
        requestDelay: 1000, // ثانية واحدة بين الطلبات
        enableBatching: true,
        batchSize: 5
    },

    // 🔧 إعدادات التطوير
    development: {
        enableDebugMode: false,
        enableConsoleLogging: true,
        enableErrorReporting: true,
        enablePerformanceMonitoring: true,
        testMode: false
    }
};

// 🛠️ دوال مساعدة للتكوين
const ConfigHelper = {
    // الحصول على إعداد معين
    get(path, defaultValue = null) {
        const keys = path.split('.');
        let current = TrackingConfig;
        
        for (const key of keys) {
            if (current && typeof current === 'object' && key in current) {
                current = current[key];
            } else {
                return defaultValue;
            }
        }
        
        return current;
    },

    // تحديث إعداد معين
    set(path, value) {
        const keys = path.split('.');
        const lastKey = keys.pop();
        let current = TrackingConfig;
        
        for (const key of keys) {
            if (!(key in current)) {
                current[key] = {};
            }
            current = current[key];
        }
        
        current[lastKey] = value;
    },

    // التحقق من تفعيل ميزة معينة
    isEnabled(feature) {
        return this.get(`tracking.${feature}`, false);
    },

    // الحصول على إعدادات الباقة
    getPackageConfig(packageType) {
        return this.get(`packages.${packageType}`, null);
    },

    // الحصول على إعدادات التفاعل
    getInteractionConfig(interactionType) {
        return this.get(`interactions.${interactionType}`, null);
    },

    // التحقق من صفحة الدفع
    isPaymentPage(path) {
        const paymentPages = this.get('paymentPages', []);
        return paymentPages.some(page => path.includes(page));
    },

    // الحصول على أولوية الرسالة
    getMessagePriority(priority) {
        return this.get(`messages.priorities.${priority}`, '');
    },

    // الحصول على رمز تعبيري
    getEmoji(type) {
        return this.get(`messages.emojis.${type}`, '');
    },

    // حفظ التكوين في التخزين المحلي
    save() {
        try {
            localStorage.setItem(this.get('storage.configKey'), JSON.stringify(TrackingConfig));
            return true;
        } catch (e) {
            console.error('فشل في حفظ التكوين:', e);
            return false;
        }
    },

    // تحميل التكوين من التخزين المحلي
    load() {
        try {
            const stored = localStorage.getItem(this.get('storage.configKey'));
            if (stored) {
                const config = JSON.parse(stored);
                Object.assign(TrackingConfig, config);
                return true;
            }
        } catch (e) {
            console.error('فشل في تحميل التكوين:', e);
        }
        return false;
    },

    // إعادة تعيين التكوين للقيم الافتراضية
    reset() {
        // يمكن إضافة منطق إعادة التعيين هنا
        console.log('تم إعادة تعيين التكوين للقيم الافتراضية');
    },

    // التحقق من صحة التكوين
    validate() {
        const required = [
            'telegram.botToken',
            'telegram.chatId',
            'storage.userDataKey',
            'storage.sessionDataKey'
        ];

        for (const path of required) {
            if (!this.get(path)) {
                console.error(`إعداد مطلوب مفقود: ${path}`);
                return false;
            }
        }

        return true;
    }
};

// تصدير التكوين للاستخدام العام
if (typeof window !== 'undefined') {
    window.TrackingConfig = TrackingConfig;
    window.ConfigHelper = ConfigHelper;
}

// تحميل التكوين المحفوظ عند بدء التشغيل
document.addEventListener('DOMContentLoaded', () => {
    ConfigHelper.load();
    
    if (ConfigHelper.get('development.enableConsoleLogging')) {
        console.log('✅ تم تحميل تكوين نظام التتبع المتقدم');
    }
});