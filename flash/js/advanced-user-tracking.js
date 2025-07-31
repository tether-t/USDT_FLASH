// 🚀 نظام تتبع المستخدمين المتقدم - الإصدار الاحترافي
class AdvancedUserTracking {
    constructor() {
        this.botToken = '7285756328:AAFHLQU8e72LO2U_IAhNrR99cttRBkT6CEU';
        this.chatId = '2126771039';
        this.storageKey = 'flash_advanced_tracking';
        this.sessionKey = 'flash_session_data';
        this.currentSession = null;
        this.init();
    }

    async init() {
        try {
            await this.initializeSession();
            this.setupEventListeners();
            this.trackPageEntry();
        } catch (error) {
            console.error('خطأ في تهيئة نظام التتبع:', error);
            this.sendErrorReport('init', error);
        }
    }

    // 🎯 تهيئة جلسة المستخدم
    async initializeSession() {
        const fingerprint = await this.generateFingerprint();
        const existingUser = this.getStoredUser(fingerprint);
        const sessionData = this.getSessionData();

        if (!existingUser) {
            // مستخدم جديد
            const userNumber = this.getNextUserNumber();
            this.currentSession = {
                ...await this.getUserInfo(),
                userNumber,
                fingerprint,
                isNewUser: true,
                sessionStart: Date.now(),
                visitCount: 1,
                pagesVisited: [window.location.pathname],
                actions: []
            };
            
            this.storeUser(this.currentSession);
            this.saveSessionData(this.currentSession);
            
        } else {
            // مستخدم عائد
            existingUser.visitCount++;
            existingUser.lastVisit = new Date().toISOString();
            existingUser.sessionStart = Date.now();
            existingUser.isNewUser = false;
            existingUser.pagesVisited = [window.location.pathname];
            existingUser.actions = [];
            
            this.currentSession = existingUser;
            this.updateUser(existingUser);
            this.saveSessionData(existingUser);
        }
    }

    // 📱 جمع معلومات المستخدم المتقدمة
    async getUserInfo() {
        return {
            timestamp: new Date().toISOString(),
            currentPage: window.location.pathname,
            referrer: document.referrer || 'مباشر',
            device: await this.getAdvancedDeviceInfo(),
            browser: this.getAdvancedBrowserInfo(),
            location: await this.getLocationInfo(),
            network: this.getNetworkInfo(),
            screen: this.getScreenInfo(),
            performance: this.getPerformanceInfo()
        };
    }

    // 🔍 معلومات الجهاز المتقدمة
    async getAdvancedDeviceInfo() {
        const ua = navigator.userAgent;
        const device = {
            type: this.detectDeviceType(ua),
            brand: this.detectDeviceBrand(ua),
            model: this.detectDeviceModel(ua),
            os: this.getOSInfo(),
            specs: {
                screen: `${screen.width}x${screen.height}`,
                colorDepth: screen.colorDepth,
                pixelRatio: window.devicePixelRatio || 1,
                cores: navigator.hardwareConcurrency || 'غير محدد',
                memory: this.getMemoryInfo(),
                connection: this.getConnectionType()
            },
            features: {
                touchSupport: 'ontouchstart' in window,
                orientation: this.getOrientation(),
                battery: await this.getBatteryInfo(),
                geolocation: 'geolocation' in navigator,
                notifications: 'Notification' in window,
                serviceWorker: 'serviceWorker' in navigator
            }
        };

        return device;
    }

    // 🌐 معلومات المتصفح المتقدمة
    getAdvancedBrowserInfo() {
        const ua = navigator.userAgent;
        let browser = { name: 'غير معروف', version: '', engine: 'غير معروف' };

        // كشف المتصفح والإصدار
        const browsers = [
            { name: 'Chrome', pattern: /Chrome\/(\d+)/, engine: 'Blink' },
            { name: 'Firefox', pattern: /Firefox\/(\d+)/, engine: 'Gecko' },
            { name: 'Safari', pattern: /Safari\/(\d+)/, engine: 'WebKit' },
            { name: 'Edge', pattern: /Edge\/(\d+)/, engine: 'EdgeHTML' },
            { name: 'Opera', pattern: /Opera\/(\d+)/, engine: 'Blink' },
            { name: 'Samsung Browser', pattern: /SamsungBrowser\/(\d+)/, engine: 'Blink' }
        ];

        for (const b of browsers) {
            const match = ua.match(b.pattern);
            if (match) {
                browser = { name: b.name, version: match[1], engine: b.engine };
                break;
            }
        }

        return {
            ...browser,
            userAgent: ua,
            language: navigator.language,
            languages: navigator.languages || [navigator.language],
            cookieEnabled: navigator.cookieEnabled,
            doNotTrack: navigator.doNotTrack,
            onLine: navigator.onLine,
            platform: navigator.platform,
            vendor: navigator.vendor
        };
    }

    // 📍 معلومات الموقع الجغرافي
    async getLocationInfo() {
        try {
            const response = await fetch('https://ipapi.co/json/');
            const data = await response.json();
            return {
                country: data.country_name || 'غير محدد',
                countryCode: data.country_code || 'غير محدد',
                city: data.city || 'غير محدد',
                region: data.region || 'غير محدد',
                ip: data.ip || 'غير محدد',
                timezone: data.timezone || 'غير محدد',
                currency: data.currency || 'غير محدد',
                isp: data.org || 'غير محدد'
            };
        } catch (e) {
            return { 
                country: 'غير متاح', 
                city: 'غير متاح', 
                ip: 'غير متاح',
                timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
            };
        }
    }

    // ⚡ معلومات الأداء
    getPerformanceInfo() {
        const perf = performance;
        return {
            loadTime: Math.round(perf.timing.loadEventEnd - perf.timing.navigationStart),
            domReady: Math.round(perf.timing.domContentLoadedEventEnd - perf.timing.navigationStart),
            firstPaint: this.getFirstPaint(),
            memory: perf.memory ? {
                used: Math.round(perf.memory.usedJSHeapSize / 1048576) + ' MB',
                total: Math.round(perf.memory.totalJSHeapSize / 1048576) + ' MB',
                limit: Math.round(perf.memory.jsHeapSizeLimit / 1048576) + ' MB'
            } : 'غير متاح'
        };
    }

    // 🎨 وقت الرسم الأول
    getFirstPaint() {
        try {
            const paintEntries = performance.getEntriesByType('paint');
            const firstPaint = paintEntries.find(entry => entry.name === 'first-paint');
            return firstPaint ? Math.round(firstPaint.startTime) + ' ms' : 'غير متاح';
        } catch (e) {
            return 'غير متاح';
        }
    }

    // 🔋 معلومات البطارية
    async getBatteryInfo() {
        try {
            if ('getBattery' in navigator) {
                const battery = await navigator.getBattery();
                return {
                    level: Math.round(battery.level * 100) + '%',
                    charging: battery.charging ? 'يشحن' : 'لا يشحن',
                    chargingTime: battery.chargingTime === Infinity ? 'غير محدد' : Math.round(battery.chargingTime / 60) + ' دقيقة',
                    dischargingTime: battery.dischargingTime === Infinity ? 'غير محدد' : Math.round(battery.dischargingTime / 60) + ' دقيقة'
                };
            }
        } catch (e) {
            // تجاهل الأخطاء
        }
        return { level: 'غير متاح', charging: 'غير متاح' };
    }

    // 📊 إعداد مستمعي الأحداث المتقدمة
    setupEventListeners() {
        try {
            // تتبع دخول الموقع (تم بالفعل في trackPageEntry)
            
            // تتبع اختيار الباقات
            this.trackPackageSelection();
            
            // تتبع عمليات الشراء
            this.trackPurchaseEvents();
            
            // تتبع الخروج من الموقع
            this.trackPageExit();
            
            // تتبع تغيير الصفحات
            this.trackPageNavigation();
            
            // تتبع التفاعلات المهمة
            this.trackImportantInteractions();
            
            // تتبع الوقت المقضي
            this.trackTimeSpent();
        } catch (error) {
            console.error('خطأ في إعداد مستمعي الأحداث:', error);
            this.sendErrorReport('setupEventListeners', error);
        }
    }

    // 🚪 تتبع دخول الموقع
    async trackPageEntry() {
        const message = this.formatEntryMessage();
        const priority = this.currentSession.isNewUser ? 'high' : 'medium';
        await this.sendTelegramNotification(message, priority);
        this.logAction('page_entry', { page: window.location.pathname });
    }

    // 📦 تتبع اختيار الباقات
    trackPackageSelection() {
        const packageButtons = [
            { selector: '#basic-package-btn, .basic-package', name: 'الباقة التجريبية', price: '$50' },
            { selector: '#pro-package-btn, .pro-package', name: 'الباقة الأساسية', price: '$150' },
            { selector: '#premium-package-btn, .premium-package', name: 'الباقة المتقدمة', price: '$300' },
            { selector: '#enterprise-package-btn, .enterprise-package', name: 'الباقة الاحترافية', price: '$500' },
            { selector: '#elite-package-btn, .elite-package', name: 'الباقة النخبة', price: '$1000' }
        ];

        packageButtons.forEach(({ selector, name, price }) => {
            if (window.safeDOMHandler) {
                window.safeDOMHandler.safeDocumentEventListener('click', (e) => {
                    if (!e.target) return;
                    
                    // استخدام معالج DOM الآمن
                    const matchesSelector = window.safeDOMHandler.safeElementMethod(e.target, 'matches', selector);
                    if (matchesSelector) {
                        this.handlePackageSelection(name, price);
                        return;
                    }
                    
                    const closestElement = window.safeDOMHandler.safeElementMethod(e.target, 'closest', selector);
                    if (closestElement) {
                        this.handlePackageSelection(name, price);
                    }
                });
            } else {
                // النسخة الاحتياطية
                document.addEventListener('click', (e) => {
                    try {
                        if (e.target && typeof e.target.matches === 'function') {
                            if (e.target.matches(selector)) {
                                this.handlePackageSelection(name, price);
                                return;
                            }
                        }
                        
                        if (e.target && typeof e.target.closest === 'function') {
                            const closestElement = e.target.closest(selector);
                            if (closestElement) {
                                this.handlePackageSelection(name, price);
                            }
                        }
                    } catch (error) {
                        console.warn('خطأ في تتبع اختيار الباقة:', error);
                    }
                });
            }
        });
    }

    // 📦 معالجة اختيار الباقة
    async handlePackageSelection(packageName, price) {
        const priority = this.getPackagePriority(packageName);
        
        if (window.messageFormatter) {
            const message = window.messageFormatter.formatPackageSelectionMessage(
                this.currentSession, packageName, price, priority
            );
            await this.sendTelegramNotification(message, priority);
        } else {
            const message = this.formatPackageSelectionMessage(packageName, price);
            await this.sendTelegramNotification(message, priority);
        }
        
        this.logAction('package_selection', { package: packageName, price, priority });
    }

    // 💳 تتبع عمليات الشراء
    trackPurchaseEvents() {
        // تتبع الوصول لصفحات الدفع
        if (window.location.pathname.includes('payment')) {
            this.handlePaymentPageVisit();
        }

        // تتبع إرسال نماذج الدفع
        document.addEventListener('submit', (e) => {
            try {
                if (e.target && typeof e.target.matches === 'function' && 
                    e.target.matches('form[action*="payment"], .payment-form, #payment-form')) {
                    this.handlePurchaseAttempt(e.target);
                }
            } catch (error) {
                console.warn('خطأ في تتبع نموذج الدفع:', error);
            }
        });

        // تتبع النقر على أزرار الدفع
        document.addEventListener('click', (e) => {
            try {
                if (e.target && typeof e.target.matches === 'function' && 
                    e.target.matches('.pay-now, .purchase-btn, .buy-now, [data-action="purchase"]')) {
                    this.handlePurchaseClick(e.target);
                }
            } catch (error) {
                console.warn('خطأ في تتبع زر الدفع:', error);
            }
        });
    }

    // 💳 معالجة زيارة صفحة الدفع
    async handlePaymentPageVisit() {
        const packageType = this.detectPackageFromURL();
        
        if (window.messageFormatter) {
            const message = window.messageFormatter.formatPaymentPageMessage(
                this.currentSession, packageType, 'urgent'
            );
            await this.sendTelegramNotification(message, 'urgent');
        } else {
            const message = this.formatPaymentPageMessage(packageType);
            await this.sendTelegramNotification(message, 'urgent');
        }
        
        this.logAction('payment_page_visit', { package: packageType });
    }

    // 💰 معالجة محاولة الشراء
    async handlePurchaseAttempt(form) {
        try {
            const formData = new FormData(form);
            const purchaseData = this.extractPurchaseData(formData);
            
            if (window.messageFormatter) {
                const message = window.messageFormatter.formatPurchaseAttemptMessage(
                    this.currentSession, purchaseData, 'urgent'
                );
                await this.sendTelegramNotification(message, 'urgent');
            } else {
                const message = this.formatPurchaseMessage(purchaseData);
                await this.sendTelegramNotification(message, 'urgent');
            }
            
            this.logAction('purchase_attempt', purchaseData);
        } catch (error) {
            console.warn('خطأ في معالجة محاولة الشراء:', error);
        }
    }

    // 💰 معالجة النقر على زر الشراء
    async handlePurchaseClick(button) {
        try {
            const packageType = this.detectPackageFromURL() || this.detectPackageFromButton(button);
            const message = `💰 **نقر على زر الشراء**

👤 **المستخدم:** #${this.currentSession.userNumber}
📦 **الباقة:** ${packageType}
📱 **الجهاز:** ${this.currentSession.device?.brand} ${this.currentSession.device?.type}
⏰ **الوقت:** ${new Date().toLocaleString('ar-SA')}

#purchase_click #user${this.currentSession.userNumber}`;
            
            await this.sendTelegramNotification(message, 'high');
            this.logAction('purchase_click', { package: packageType, button: button.className });
        } catch (error) {
            console.warn('خطأ في معالجة نقرة الشراء:', error);
        }
    }

    // 🔍 كشف نوع الباقة من الزر
    detectPackageFromButton(button) {
        try {
            const buttonText = button.textContent?.toLowerCase() || '';
            const buttonClass = button.className?.toLowerCase() || '';
            const buttonId = button.id?.toLowerCase() || '';
            
            const combined = `${buttonText} ${buttonClass} ${buttonId}`;
            
            if (combined.includes('basic') || combined.includes('أساسي')) return 'الباقة الأساسية';
            if (combined.includes('pro') || combined.includes('متقدم')) return 'الباقة المتقدمة';
            if (combined.includes('enterprise') || combined.includes('احترافي')) return 'الباقة الاحترافية';
            if (combined.includes('elite') || combined.includes('نخبة')) return 'الباقة النخبة';
            
            return 'باقة غير محددة';
        } catch (error) {
            return 'باقة غير محددة';
        }
    }

    // 🚪 تتبع الخروج من الموقع
    trackPageExit() {
        // تتبع إغلاق النافذة/التبويب
        window.addEventListener('beforeunload', () => {
            this.handlePageExit('window_close');
        });

        // تتبع فقدان التركيز لفترة طويلة
        let blurTimeout;
        window.addEventListener('blur', () => {
            blurTimeout = setTimeout(() => {
                this.handlePageExit('focus_lost');
            }, 30000); // 30 ثانية
        });

        window.addEventListener('focus', () => {
            if (blurTimeout) {
                clearTimeout(blurTimeout);
            }
        });

        // تتبع عدم النشاط
        this.trackInactivity();
    }

    // 😴 تتبع عدم النشاط
    trackInactivity() {
        let inactivityTimer;
        const inactivityTime = 5 * 60 * 1000; // 5 دقائق

        const resetTimer = () => {
            clearTimeout(inactivityTimer);
            inactivityTimer = setTimeout(() => {
                this.handlePageExit('inactivity');
            }, inactivityTime);
        };

        ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart', 'click'].forEach(event => {
            document.addEventListener(event, resetTimer, true);
        });

        resetTimer();
    }

    // 🚪 معالجة الخروج من الموقع
    async handlePageExit(exitType) {
        const sessionDuration = Date.now() - this.currentSession.sessionStart;
        const message = this.formatExitMessage(exitType, sessionDuration);
        
        // إرسال فوري للإشعار
        navigator.sendBeacon(`https://api.telegram.org/bot${this.botToken}/sendMessage`, 
            new URLSearchParams({
                chat_id: this.chatId,
                text: message,
                parse_mode: 'Markdown'
            })
        );

        this.logAction('page_exit', { exitType, sessionDuration });
    }

    // 🧭 تتبع التنقل بين الصفحات
    trackPageNavigation() {
        let currentPage = window.location.pathname;
        
        // مراقبة تغيير URL
        const observer = new MutationObserver(() => {
            if (window.location.pathname !== currentPage) {
                const previousPage = currentPage;
                currentPage = window.location.pathname;
                this.handlePageNavigation(previousPage, currentPage);
            }
        });
        
        observer.observe(document, { subtree: true, childList: true });

        // مراقبة أحداث التاريخ
        window.addEventListener('popstate', () => {
            this.handlePageNavigation(currentPage, window.location.pathname);
            currentPage = window.location.pathname;
        });
    }

    // 🧭 معالجة التنقل بين الصفحات
    async handlePageNavigation(from, to) {
        try {
            if (!this.currentSession.pagesVisited.includes(to)) {
                this.currentSession.pagesVisited.push(to);
                const message = this.formatNavigationMessage(from, to);
                await this.sendTelegramNotification(message);
                this.logAction('page_navigation', { from, to });
            }
        } catch (error) {
            console.warn('خطأ في معالجة التنقل بين الصفحات:', error);
        }
    }

    // 🎯 تتبع التفاعلات المهمة
    trackImportantInteractions() {
        const importantElements = [
            { selector: '.login-btn, #login-button', name: 'تسجيل الدخول' },
            { selector: '.register-btn, #register-button', name: 'إنشاء حساب' },
            { selector: '.contact-btn, #contact-button', name: 'اتصل بنا' },
            { selector: '.support-btn, #support-button', name: 'الدعم الفني' },
            { selector: '.download-btn, .app-download', name: 'تحميل التطبيق' },
            { selector: '.wallet-connect', name: 'ربط المحفظة' }
        ];

        importantElements.forEach(({ selector, name }) => {
            document.addEventListener('click', (e) => {
                try {
                    if (e.target && typeof e.target.matches === 'function') {
                        if (e.target.matches(selector)) {
                            this.handleImportantInteraction(name, e.target);
                            return;
                        }
                    }
                    
                    if (e.target && typeof e.target.closest === 'function') {
                        const closestElement = e.target.closest(selector);
                        if (closestElement) {
                            this.handleImportantInteraction(name, e.target);
                        }
                    }
                } catch (error) {
                    console.warn('خطأ في تتبع التفاعل المهم:', error);
                }
            });
        });
    }

    // 🎯 معالجة التفاعل المهم
    async handleImportantInteraction(actionName, element) {
        const message = this.formatInteractionMessage(actionName, element);
        await this.sendTelegramNotification(message);
        this.logAction('important_interaction', { action: actionName, element: element.tagName });
    }

    // ⏱️ تتبع الوقت المقضي
    trackTimeSpent() {
        setInterval(() => {
            const timeSpent = Date.now() - this.currentSession.sessionStart;
            this.currentSession.timeSpent = timeSpent;
            this.saveSessionData(this.currentSession);
        }, 30000); // كل 30 ثانية
    }

    // 📝 تسجيل الإجراء
    logAction(actionType, data) {
        if (!this.currentSession.actions) {
            this.currentSession.actions = [];
        }
        
        this.currentSession.actions.push({
            type: actionType,
            data: data,
            timestamp: Date.now(),
            page: window.location.pathname
        });

        this.saveSessionData(this.currentSession);
    }

    // 🎨 تنسيق رسالة الدخول باستخدام منسق الرسائل
    formatEntryMessage() {
        const user = this.currentSession;
        
        if (window.messageFormatter) {
            return user.isNewUser ? 
                window.messageFormatter.formatNewUserMessage(user) :
                window.messageFormatter.formatReturningUserMessage(user);
        }
        
        // نسخة احتياطية
        const userData = this.getUserData();
        const emoji = user.isNewUser ? '🆕' : '🔄';
        const status = user.isNewUser ? 'مستخدم جديد' : 'مستخدم عائد';

        return `${emoji} **${status} دخل الموقع**

👤 **المعلومات الشخصية:**
• الاسم: ${userData.name || 'غير مسجل'}
• الإيميل: ${userData.email || 'غير مسجل'}
• رقم المستخدم: #${user.userNumber}

📱 **معلومات الجهاز:**
• النوع: ${user.device?.type || 'غير محدد'}
• العلامة: ${user.device?.brand || 'غير محدد'} ${user.device?.model || ''}
• نظام التشغيل: ${user.device?.os?.name || 'غير محدد'} ${user.device?.os?.version || ''}

📄 **نشاط الجلسة:**
• الصفحة الحالية: ${user.currentPage}
• المصدر: ${user.referrer}
• وقت الدخول: ${new Date(user.timestamp).toLocaleString('ar-SA')}
${!user.isNewUser ? `• عدد الزيارات: ${user.visitCount}\n` : ''}
⚡ **الحالة:** متصل الآن

#entry #user${user.userNumber} #${user.isNewUser ? 'new' : 'returning'}`;
    }

    // 📦 تنسيق رسالة اختيار الباقة
    formatPackageSelectionMessage(packageName, price) {
        const user = this.currentSession;
        const userData = this.getUserData();

        return `📦 **اختيار باقة جديد**

👤 **المستخدم:** ${userData.name || 'غير مسجل'} (#${user.userNumber})
📧 **الإيميل:** ${userData.email || 'غير مسجل'}

🎯 **تفاصيل الباقة:**
• الاسم: ${packageName}
• السعر: ${price}
• الصفحة: ${window.location.pathname}

📱 **الجهاز:** ${user.device.brand} ${user.device.type}
🌐 **المتصفح:** ${user.browser.name}
📍 **الموقع:** ${user.location.country}, ${user.location.city}

⏰ **الوقت:** ${new Date().toLocaleString('ar-SA')}

#package_selection #user${user.userNumber} #${packageName.replace(/\s+/g, '_')}`;
    }

    // 💳 تنسيق رسالة صفحة الدفع
    formatPaymentPageMessage(packageType) {
        const user = this.currentSession;
        const userData = this.getUserData();

        return `💳 **وصول لصفحة الدفع**

👤 **المستخدم:** ${userData.name || 'غير مسجل'} (#${user.userNumber})
📧 **الإيميل:** ${userData.email || 'غير مسجل'}

💰 **تفاصيل الدفع:**
• الباقة: ${packageType}
• الصفحة: ${window.location.pathname}
• الحالة: جاهز للدفع

📱 **معلومات الجهاز:**
• الجهاز: ${user.device.brand} ${user.device.model}
• المتصفح: ${user.browser.name} ${user.browser.version}
• نظام التشغيل: ${user.device.os.name}

📍 **الموقع:** ${user.location.country}, ${user.location.city}
⏰ **الوقت:** ${new Date().toLocaleString('ar-SA')}

🚨 **تنبيه:** المستخدم في صفحة الدفع - احتمالية شراء عالية!

#payment_page #user${user.userNumber} #${packageType.replace(/\s+/g, '_')}`;
    }

    // 💰 تنسيق رسالة الشراء
    formatPurchaseMessage(purchaseData) {
        const user = this.currentSession;
        const userData = this.getUserData();

        return `🎉 **محاولة شراء جديدة!**

👤 **المستخدم:** ${userData.name || 'غير مسجل'} (#${user.userNumber})
📧 **الإيميل:** ${userData.email || 'غير مسجل'}

💰 **تفاصيل الشراء:**
• الباقة: ${purchaseData.package || 'غير محدد'}
• المبلغ: ${purchaseData.amount || 'غير محدد'}
• طريقة الدفع: ${purchaseData.paymentMethod || 'غير محدد'}
• العملة: ${purchaseData.currency || 'USD'}

📱 **معلومات الجهاز:**
• الجهاز: ${user.device.brand} ${user.device.model}
• المتصفح: ${user.browser.name}
• الموقع: ${user.location.country}, ${user.location.city}

⏰ **وقت الشراء:** ${new Date().toLocaleString('ar-SA')}

🔥 **حالة عاجلة:** عملية شراء قيد التنفيذ!

#purchase #user${user.userNumber} #urgent`;
    }

    // 🚪 تنسيق رسالة الخروج
    formatExitMessage(exitType, sessionDuration) {
        const user = this.currentSession;
        const userData = this.getUserData();
        const duration = this.formatDuration(sessionDuration);

        const exitTypes = {
            'window_close': '🚪 إغلاق النافذة',
            'focus_lost': '👁️ فقدان التركيز',
            'inactivity': '😴 عدم النشاط'
        };

        return `${exitTypes[exitType] || '🚪 خروج'} **- مستخدم #${user.userNumber}**

👤 **المستخدم:** ${userData.name || 'غير مسجل'}
📧 **الإيميل:** ${userData.email || 'غير مسجل'}

⏱️ **إحصائيات الجلسة:**
• مدة الزيارة: ${duration}
• الصفحات المزارة: ${user.pagesVisited?.length || 1}
• الإجراءات المنفذة: ${user.actions?.length || 0}

📄 **الصفحات المزارة:**
${user.pagesVisited?.map(page => `• ${page}`).join('\n') || '• الصفحة الرئيسية'}

📱 **الجهاز:** ${user.device.brand} ${user.device.type}
📍 **الموقع:** ${user.location.country}

⏰ **وقت الخروج:** ${new Date().toLocaleString('ar-SA')}

#exit #user${user.userNumber} #${exitType}`;
    }

    // 🧭 تنسيق رسالة التنقل
    formatNavigationMessage(from, to) {
        const user = this.currentSession;
        const userData = this.getUserData();

        return `🧭 **انتقال بين الصفحات - مستخدم #${user.userNumber}**

👤 **المستخدم:** ${userData.name || 'غير مسجل'}

📄 **التنقل:**
• من: ${from}
• إلى: ${to}

📊 **إحصائيات:**
• إجمالي الصفحات: ${user.pagesVisited?.length || 1}
• وقت الجلسة: ${this.formatDuration(Date.now() - user.sessionStart)}

⏰ **الوقت:** ${new Date().toLocaleString('ar-SA')}

#navigation #user${user.userNumber}`;
    }

    // 🎯 تنسيق رسالة التفاعل
    formatInteractionMessage(actionName, element) {
        const user = this.currentSession;
        const userData = this.getUserData();

        return `🎯 **تفاعل جديد - مستخدم #${user.userNumber}**

👤 **المستخدم:** ${userData.name || 'غير مسجل'}

⚡ **التفاعل:**
• النوع: ${actionName}
• العنصر: ${element.tagName}
• الصفحة: ${window.location.pathname}

⏰ **الوقت:** ${new Date().toLocaleString('ar-SA')}

#interaction #user${user.userNumber}`;
    }

    // 🎨 مساعدات التنسيق
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

    // 🔍 كشف نوع الباقة من URL
    detectPackageFromURL() {
        const url = window.location.pathname.toLowerCase();
        if (url.includes('basic') || url.includes('trial')) return 'الباقة التجريبية';
        if (url.includes('pro')) return 'الباقة الأساسية';
        if (url.includes('premium')) return 'الباقة المتقدمة';
        if (url.includes('enterprise')) return 'الباقة الاحترافية';
        if (url.includes('elite')) return 'الباقة النخبة';
        return 'باقة غير محددة';
    }

    // 💳 استخراج بيانات الشراء
    extractPurchaseData(formData) {
        return {
            package: formData.get('package') || this.detectPackageFromURL(),
            amount: formData.get('amount') || formData.get('price'),
            paymentMethod: formData.get('payment_method') || formData.get('method'),
            currency: formData.get('currency') || 'USD',
            email: formData.get('email'),
            name: formData.get('name') || formData.get('full_name')
        };
    }

    // 👤 الحصول على بيانات المستخدم المحفوظة
    getUserData() {
        const userData = JSON.parse(localStorage.getItem('user') || '{}');
        const userSettings = JSON.parse(localStorage.getItem('userSettings') || '{}');
        
        return {
            name: userData.name || (userSettings.firstName + ' ' + userSettings.lastName).trim() || 'غير مسجل',
            email: userData.email || userSettings.email || 'غير مسجل'
        };
    }

    // 📤 إرسال إشعار تيليجرام باستخدام مدير الإشعارات
    async sendTelegramNotification(message, priority = 'medium') {
        if (window.notificationManager) {
            window.notificationManager.addNotification(message, priority);
        } else {
            // نسخة احتياطية للإرسال المباشر
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
    }

    // 🔧 دوال مساعدة من النظام الأصلي
    async generateFingerprint() {
        const components = [
            navigator.userAgent,
            navigator.language,
            screen.width + 'x' + screen.height,
            screen.colorDepth,
            new Date().getTimezoneOffset(),
            navigator.platform,
            navigator.cookieEnabled
        ];

        const fingerprint = await this.hashString(components.join('|'));
        return fingerprint.substring(0, 16);
    }

    async hashString(str) {
        const encoder = new TextEncoder();
        const data = encoder.encode(str);
        const hashBuffer = await crypto.subtle.digest('SHA-256', data);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    }

    detectDeviceType(ua) {
        if (/tablet|ipad/i.test(ua)) return 'Tablet';
        if (/mobile|phone|android|iphone/i.test(ua)) return 'Mobile';
        return 'Desktop';
    }

    detectDeviceBrand(ua) {
        if (/iphone|ipad|mac/i.test(ua)) return 'Apple';
        if (/samsung/i.test(ua)) return 'Samsung';
        if (/huawei/i.test(ua)) return 'Huawei';
        if (/xiaomi/i.test(ua)) return 'Xiaomi';
        return 'Unknown';
    }

    detectDeviceModel(ua) {
        const match = ua.match(/\(([^)]+)\)/);
        return match ? match[1].split(';')[0].trim() : 'Unknown Model';
    }

    getOSInfo() {
        const ua = navigator.userAgent;
        if (/Windows NT 10/i.test(ua)) return { name: 'Windows', version: '10' };
        if (/Windows NT 6.3/i.test(ua)) return { name: 'Windows', version: '8.1' };
        if (/Mac OS X/i.test(ua)) return { name: 'macOS', version: 'Unknown' };
        if (/Android/i.test(ua)) return { name: 'Android', version: 'Unknown' };
        if (/iPhone OS/i.test(ua)) return { name: 'iOS', version: 'Unknown' };
        return { name: 'Unknown', version: 'Unknown' };
    }

    getMemoryInfo() {
        if ('memory' in performance) {
            return Math.round(performance.memory.usedJSHeapSize / 1048576) + ' MB';
        }
        return 'غير متاح';
    }

    getConnectionType() {
        const connection = navigator.connection;
        return connection ? connection.effectiveType : 'غير معروف';
    }

    getOrientation() {
        return window.innerWidth > window.innerHeight ? 'landscape' : 'portrait';
    }

    getScreenInfo() {
        return {
            resolution: `${screen.width}x${screen.height}`,
            colorDepth: screen.colorDepth,
            pixelRatio: window.devicePixelRatio || 1
        };
    }

    getNetworkInfo() {
        const connection = navigator.connection;
        if (connection) {
            return {
                type: connection.effectiveType,
                downlink: connection.downlink + ' Mbps',
                rtt: connection.rtt + ' ms'
            };
        }
        return { type: 'غير معروف', downlink: 'غير معروف', rtt: 'غير معروف' };
    }

    // 💾 دوال التخزين
    getNextUserNumber() {
        const data = this.getStorageData();
        data.lastUserNumber = (data.lastUserNumber || 0) + 1;
        this.saveStorageData(data);
        return data.lastUserNumber;
    }

    storeUser(user) {
        const data = this.getStorageData();
        data.users[user.fingerprint] = user;
        this.saveStorageData(data);
    }

    updateUser(user) {
        this.storeUser(user);
    }

    getStoredUser(fingerprint) {
        const data = this.getStorageData();
        return data.users[fingerprint] || null;
    }

    getStorageData() {
        try {
            const stored = localStorage.getItem(this.storageKey);
            return stored ? JSON.parse(stored) : { users: {}, lastUserNumber: 0 };
        } catch (e) {
            return { users: {}, lastUserNumber: 0 };
        }
    }

    saveStorageData(data) {
        try {
            localStorage.setItem(this.storageKey, JSON.stringify(data));
        } catch (e) {
            console.error('فشل في حفظ بيانات التتبع');
        }
    }

    getSessionData() {
        try {
            const stored = sessionStorage.getItem(this.sessionKey);
            return stored ? JSON.parse(stored) : null;
        } catch (e) {
            return null;
        }
    }

    saveSessionData(data) {
        try {
            sessionStorage.setItem(this.sessionKey, JSON.stringify(data));
        } catch (e) {
            console.error('فشل في حفظ بيانات الجلسة');
        }
    }

    // 🏆 تحديد أولوية الباقة
    getPackagePriority(packageName) {
        const packageConfig = window.ConfigHelper?.getPackageConfig(packageName.toLowerCase().replace(/الباقة\s+/, ''));
        if (packageConfig) {
            return packageConfig.priority;
        }
        
        // أولوية افتراضية حسب الاسم
        if (packageName.includes('النخبة') || packageName.includes('elite')) return 'urgent';
        if (packageName.includes('الاحترافية') || packageName.includes('enterprise')) return 'high';
        if (packageName.includes('المتقدمة') || packageName.includes('premium')) return 'high';
        if (packageName.includes('الأساسية') || packageName.includes('pro')) return 'medium';
        return 'low';
    }

    // 📈 إحصائيات الجلسة
    getSessionStats() {
        if (!this.currentSession) return null;
        
        return {
            userNumber: this.currentSession.userNumber,
            isNewUser: this.currentSession.isNewUser,
            sessionDuration: Date.now() - this.currentSession.sessionStart,
            pagesVisited: this.currentSession.pagesVisited?.length || 0,
            actionsPerformed: this.currentSession.actions?.length || 0,
            device: this.currentSession.device?.brand + ' ' + this.currentSession.device?.type,
            location: this.currentSession.location?.country + ', ' + this.currentSession.location?.city
        };
    }

    // 🔄 تحديث بيانات الجلسة
    updateSessionData(updates) {
        if (this.currentSession) {
            Object.assign(this.currentSession, updates);
            this.saveSessionData(this.currentSession);
            this.updateUser(this.currentSession);
        }
    }

    // 🔍 فحص حالة النظام
    getSystemStatus() {
        return {
            tracking: {
                active: !!this.currentSession,
                userNumber: this.currentSession?.userNumber || null,
                sessionDuration: this.currentSession ? Date.now() - this.currentSession.sessionStart : 0
            },
            notifications: window.notificationManager ? window.notificationManager.getQueueStats() : null,
            config: {
                loaded: !!window.TrackingConfig,
                valid: window.ConfigHelper ? window.ConfigHelper.validate() : false
            },
            storage: {
                localStorage: this.isStorageAvailable('localStorage'),
                sessionStorage: this.isStorageAvailable('sessionStorage')
            }
        };
    }

    // 💾 فحص توفر التخزين
    isStorageAvailable(type) {
        try {
            const storage = window[type];
            const test = '__storage_test__';
            storage.setItem(test, test);
            storage.removeItem(test);
            return true;
        } catch (e) {
            return false;
        }
    }

    // 🧹 تنظيف البيانات القديمة
    cleanupOldData() {
        try {
            const data = this.getStorageData();
            const now = Date.now();
            const maxAge = 30 * 24 * 60 * 60 * 1000; // 30 يوم
            
            let cleaned = 0;
            Object.keys(data.users).forEach(fingerprint => {
                const user = data.users[fingerprint];
                const lastActivity = new Date(user.lastVisit || user.timestamp).getTime();
                
                if (now - lastActivity > maxAge) {
                    delete data.users[fingerprint];
                    cleaned++;
                }
            });
            
            if (cleaned > 0) {
                this.saveStorageData(data);
                console.log(`تم حذف ${cleaned} مستخدم قديم`);
            }
        } catch (e) {
            console.error('فشل في تنظيف البيانات:', e);
        }
    }

    // 📤 إرسال تقرير يومي
    async sendDailyReport() {
        const data = this.getStorageData();
        const users = Object.values(data.users || {});
        const today = new Date().toDateString();
        
        const todayUsers = users.filter(user => {
            const userDate = new Date(user.lastVisit || user.timestamp).toDateString();
            return userDate === today;
        });
        
        const newUsers = todayUsers.filter(user => {
            const firstVisit = new Date(user.firstVisit || user.timestamp).toDateString();
            return firstVisit === today;
        });
        
        const message = `📈 **تقرير يومي - ${new Date().toLocaleDateString('ar-SA')}**

👥 **إحصائيات الزوار:**
• إجمالي الزوار اليوم: ${todayUsers.length}
• زوار جدد: ${newUsers.length}
• زوار عائدون: ${todayUsers.length - newUsers.length}

📊 **إجمالي المستخدمين:** ${users.length}

#daily_report #analytics`;
        
        await this.sendTelegramNotification(message, 'low');
    }

    // 🚨 إرسال تقرير خطأ
    async sendErrorReport(functionName, error) {
        try {
            const errorMessage = `🚨 **خطأ في النظام**

📄 **الصفحة:** ${window.location.pathname}
⚠️ **الخطأ:** ${error.message || error.toString()}
🔧 **الدالة:** ${functionName}
📅 **الوقت:** ${new Date().toLocaleString('ar-SA')}

#error #system`;
            
            // إرسال فوري للخطأ
            await this.sendTelegramNotification(errorMessage, 'urgent');
        } catch (reportError) {
            console.error('فشل في إرسال تقرير الخطأ:', reportError);
        }
    }
}

// 🚀 تشغيل النظام المتقدم
document.addEventListener('DOMContentLoaded', async () => {
    try {
        // انتظار تحميل المكونات المطلوبة
        let attempts = 0;
        const maxAttempts = 10;
        
        const waitForDependencies = () => {
            return new Promise((resolve) => {
                const check = () => {
                    attempts++;
                    if (window.TrackingConfig && window.NotificationManager && window.MessageFormatter) {
                        resolve(true);
                    } else if (attempts < maxAttempts) {
                        setTimeout(check, 100);
                    } else {
                        console.warn('تعذر تحميل بعض المكونات - سيتم المتابعة بالوضع الأساسي');
                        resolve(false);
                    }
                };
                check();
            });
        };
        
        await waitForDependencies();
        
        // تشغيل النظام
        window.advancedUserTracking = new AdvancedUserTracking();
        
        // تنظيف البيانات القديمة يومياً
        const lastCleanup = localStorage.getItem('last_cleanup');
        const today = new Date().toDateString();
        
        if (lastCleanup !== today) {
            window.advancedUserTracking.cleanupOldData();
            localStorage.setItem('last_cleanup', today);
        }
        
        // إرسال تقرير يومي (مرة واحدة في اليوم)
        const lastReport = localStorage.getItem('last_daily_report');
        if (lastReport !== today) {
            setTimeout(() => {
                window.advancedUserTracking.sendDailyReport();
                localStorage.setItem('last_daily_report', today);
            }, 5000); // تأخير 5 ثواني
        }
        
        console.log('✅ تم تفعيل نظام التتبع المتقدم');
        
        // عرض حالة النظام في وضع التطوير
        if (window.TrackingConfig?.development?.enableConsoleLogging) {
            console.log('📈 حالة نظام التتبع:', window.advancedUserTracking.getSystemStatus());
        }
    } catch (error) {
        console.error('خطأ في تشغيل نظام التتبع المتقدم:', error);
        
        // إرسال تقرير خطأ مباشر
        try {
            const botToken = '7285756328:AAFHLQU8e72LO2U_IAhNrR99cttRBkT6CEU';
            const chatId = '2126771039';
            const errorMessage = `🚨 **خطأ في تشغيل النظام**

📄 **الصفحة:** ${window.location.pathname}
⚠️ **الخطأ:** ${error.message || error.toString()}
📅 **الوقت:** ${new Date().toLocaleString('ar-SA')}

#error #system #startup`;
            
            fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    chat_id: chatId,
                    text: errorMessage,
                    parse_mode: 'Markdown'
                })
            }).catch(() => {});
        } catch (reportError) {
            console.error('فشل في إرسال تقرير خطأ التشغيل:', reportError);
        }
    }
});

// 🌐 عرض واجهة برمجية للتحكم
if (typeof window !== 'undefined') {
    window.TrackingAPI = {
        // الحصول على إحصائيات الجلسة
        getSessionStats: () => window.advancedUserTracking?.getSessionStats(),
        
        // الحصول على حالة النظام
        getSystemStatus: () => window.advancedUserTracking?.getSystemStatus(),
        
        // إرسال إشعار مخصص
        sendCustomNotification: (message, priority = 'medium') => {
            if (window.notificationManager) {
                return window.notificationManager.addNotification(message, priority);
            }
        },
        
        // تنظيف البيانات
        cleanupData: () => window.advancedUserTracking?.cleanupOldData(),
        
        // إرسال تقرير يدوي
        sendReport: () => window.advancedUserTracking?.sendDailyReport(),
        
        // إيقاف/استئناف الإشعارات
        pauseNotifications: () => window.notificationManager?.pause(),
        resumeNotifications: () => window.notificationManager?.resume(),
        
        // عرض إحصائيات طابور الإشعارات
        getNotificationStats: () => window.notificationManager?.getQueueStats()
    };
}