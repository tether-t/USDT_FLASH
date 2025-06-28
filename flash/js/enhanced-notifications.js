// نظام الإشعارات المحسن والذكي
// Enhanced Smart Notification System

class EnhancedNotificationSystem {
    constructor() {
        this.notifications = [];
        this.container = null;
        this.settings = {
            maxNotifications: 3,
            defaultDuration: 5000,
            animationDuration: 300,
            position: 'top-right', // top-right, top-left, bottom-right, bottom-left, center
            stackDirection: 'down', // up, down
            enableSound: true,
            enablePersistence: true
        };
        this.init();
    }

    init() {
        this.createNotificationContainer();
        this.createNotificationStyles();
        this.setupEventListeners();
        console.log('🔔 Enhanced Notification System Initialized');
    }

    // إنشاء حاوية الإشعارات المحسنة
    createNotificationContainer() {
        this.container = document.createElement('div');
        this.container.id = 'enhanced-notification-container';
        this.container.className = `notification-container ${this.settings.position}`;
        document.body.appendChild(this.container);
    }

    // إنشاء أنماط CSS للإشعارات
    createNotificationStyles() {
        const style = document.createElement('style');
        style.textContent = `
            /* حاوية الإشعارات الرئيسية */
            .notification-container {
                position: fixed;
                z-index: 10000;
                pointer-events: none;
                max-width: 400px;
                width: auto;
            }
            
            /* مواضع الحاوية */
            .notification-container.top-right {
                top: 20px;
                right: 20px;
            }
            
            .notification-container.top-left {
                top: 20px;
                left: 20px;
            }
            
            .notification-container.bottom-right {
                bottom: 20px;
                right: 20px;
            }
            
            .notification-container.bottom-left {
                bottom: 20px;
                left: 20px;
            }
            
            .notification-container.center {
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
            }

            /* الإشعار الأساسي */
            .enhanced-notification {
                background: white;
                border-radius: 12px;
                box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);
                margin-bottom: 12px;
                overflow: hidden;
                pointer-events: all;
                position: relative;
                transform: translateX(400px);
                transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                min-width: 320px;
                max-width: 400px;
                backdrop-filter: blur(10px);
                border: 1px solid rgba(255, 255, 255, 0.2);
            }

            .enhanced-notification.show {
                transform: translateX(0);
            }

            .enhanced-notification.hide {
                transform: translateX(400px);
                opacity: 0;
            }

            /* أنواع الإشعارات */
            .enhanced-notification.success {
                border-left: 4px solid #10B981;
                background: linear-gradient(135deg, #ECFDF5 0%, #F0FDF4 100%);
            }

            .enhanced-notification.error {
                border-left: 4px solid #EF4444;
                background: linear-gradient(135deg, #FEF2F2 0%, #FEF2F2 100%);
            }

            .enhanced-notification.warning {
                border-left: 4px solid #F59E0B;
                background: linear-gradient(135deg, #FFFBEB 0%, #FEF3C7 100%);
            }

            .enhanced-notification.info {
                border-left: 4px solid #3B82F6;
                background: linear-gradient(135deg, #EFF6FF 0%, #DBEAFE 100%);
            }

            .enhanced-notification.promotion {
                border-left: 4px solid #8B5CF6;
                background: linear-gradient(135deg, #F3E8FF 0%, #EDE9FE 100%);
            }

            .enhanced-notification.live-activity {
                border-left: 4px solid #26A17B;
                background: linear-gradient(135deg, #F0FDF4 0%, #ECFDF5 100%);
                animation: subtle-pulse 2s infinite;
            }

            /* محتوى الإشعار */
            .notification-content {
                padding: 16px 20px;
                display: flex;
                align-items: flex-start;
                gap: 12px;
            }

            .notification-icon {
                flex-shrink: 0;
                width: 32px;
                height: 32px;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 16px;
                color: white;
                margin-top: 2px;
            }

            .notification-icon.success {
                background: #10B981;
            }

            .notification-icon.error {
                background: #EF4444;
            }

            .notification-icon.warning {
                background: #F59E0B;
            }

            .notification-icon.info {
                background: #3B82F6;
            }

            .notification-icon.promotion {
                background: #8B5CF6;
            }

            .notification-icon.live-activity {
                background: #26A17B;
                animation: icon-pulse 1.5s infinite;
            }

            .notification-body {
                flex: 1;
                min-width: 0;
            }

            .notification-title {
                font-weight: 600;
                font-size: 14px;
                line-height: 1.4;
                margin-bottom: 4px;
                color: #1F2937;
            }

            .notification-message {
                font-size: 13px;
                line-height: 1.4;
                color: #6B7280;
                margin: 0;
            }

            .notification-meta {
                font-size: 11px;
                color: #9CA3AF;
                margin-top: 6px;
                display: flex;
                align-items: center;
                gap: 8px;
            }

            /* أزرار التحكم */
            .notification-actions {
                display: flex;
                gap: 8px;
                margin-top: 10px;
            }

            .notification-action {
                padding: 6px 12px;
                border: none;
                border-radius: 6px;
                font-size: 12px;
                font-weight: 500;
                cursor: pointer;
                transition: all 0.2s ease;
            }

            .notification-action.primary {
                background: #26A17B;
                color: white;
            }

            .notification-action.primary:hover {
                background: #1A8462;
            }

            .notification-action.secondary {
                background: #F3F4F6;
                color: #374151;
            }

            .notification-action.secondary:hover {
                background: #E5E7EB;
            }

            /* زر الإغلاق */
            .notification-close {
                position: absolute;
                top: 8px;
                right: 8px;
                width: 24px;
                height: 24px;
                border: none;
                background: none;
                cursor: pointer;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                color: #9CA3AF;
                font-size: 14px;
                transition: all 0.2s ease;
            }

            .notification-close:hover {
                background: rgba(0, 0, 0, 0.1);
                color: #374151;
            }

            /* شريط التقدم */
            .notification-progress {
                position: absolute;
                bottom: 0;
                left: 0;
                height: 3px;
                background: rgba(0, 0, 0, 0.1);
                transition: width linear;
            }

            .notification-progress.success {
                background: #10B981;
            }

            .notification-progress.error {
                background: #EF4444;
            }

            .notification-progress.warning {
                background: #F59E0B;
            }

            .notification-progress.info {
                background: #3B82F6;
            }

            .notification-progress.promotion {
                background: #8B5CF6;
            }

            .notification-progress.live-activity {
                background: #26A17B;
            }

            /* الحركات المتقدمة */
            @keyframes subtle-pulse {
                0%, 100% { 
                    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);
                }
                50% { 
                    box-shadow: 0 8px 32px rgba(38, 161, 123, 0.2);
                }
            }

            @keyframes icon-pulse {
                0%, 100% { 
                    transform: scale(1);
                }
                50% { 
                    transform: scale(1.1);
                }
            }

            /* تأثيرات الهوفر */
            .enhanced-notification:hover {
                transform: translateX(-5px) scale(1.02);
                box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
            }

            /* تصميم متجاوب */
            @media (max-width: 768px) {
                .notification-container {
                    max-width: calc(100vw - 40px);
                    left: 20px !important;
                    right: 20px !important;
                }
                
                .enhanced-notification {
                    min-width: auto;
                    max-width: none;
                }
                
                .notification-content {
                    padding: 14px 16px;
                }
            }

            /* تأثيرات خاصة للإشعارات المهمة */
            .enhanced-notification.urgent {
                animation: urgent-shake 0.5s ease-in-out 3;
                border: 2px solid #EF4444;
            }

            @keyframes urgent-shake {
                0%, 100% { transform: translateX(0); }
                25% { transform: translateX(-5px); }
                75% { transform: translateX(5px); }
            }

            .enhanced-notification.celebration {
                background: linear-gradient(135deg, #FEF3C7 0%, #FDE68A 50%, #F59E0B 100%);
                animation: celebration-bounce 0.6s ease-out;
            }

            @keyframes celebration-bounce {
                0% { transform: translateY(-20px) scale(0.8); }
                50% { transform: translateY(-10px) scale(1.05); }
                100% { transform: translateY(0) scale(1); }
            }
        `;
        
        document.head.appendChild(style);
    }

    // إعداد مستمعي الأحداث
    setupEventListeners() {
        // مراقبة تغيير حجم النافذة
        window.addEventListener('resize', () => {
            this.adjustForMobile();
        });

        // مراقبة النقر خارج الإشعارات
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.enhanced-notification')) {
                // يمكن إضافة منطق إضافي هنا
            }
        });
    }

    // إنشاء إشعار جديد
    show(options = {}) {
        const notification = {
            id: this.generateId(),
            type: options.type || 'info',
            title: options.title || '',
            message: options.message || '',
            duration: options.duration || this.settings.defaultDuration,
            persistent: options.persistent || false,
            actions: options.actions || [],
            onShow: options.onShow || null,
            onHide: options.onHide || null,
            onClick: options.onClick || null,
            urgent: options.urgent || false,
            celebration: options.celebration || false,
            meta: options.meta || null
        };

        this.notifications.push(notification);
        this.render(notification);
        this.manageStack();

        if (this.settings.enableSound) {
            this.playNotificationSound(notification.type);
        }

        return notification.id;
    }

    // رسم الإشعار
    render(notification) {
        const element = document.createElement('div');
        element.className = `enhanced-notification ${notification.type}`;
        element.dataset.id = notification.id;

        if (notification.urgent) {
            element.classList.add('urgent');
        }

        if (notification.celebration) {
            element.classList.add('celebration');
        }

        // أيقونة الإشعار
        const iconMap = {
            success: 'fas fa-check',
            error: 'fas fa-times',
            warning: 'fas fa-exclamation-triangle',
            info: 'fas fa-info',
            promotion: 'fas fa-gift',
            'live-activity': 'fas fa-users'
        };

        // بناء المحتوى
        let content = `
            <div class="notification-content">
                <div class="notification-icon ${notification.type}">
                    <i class="${iconMap[notification.type] || 'fas fa-bell'}"></i>
                </div>
                <div class="notification-body">
                    ${notification.title ? `<div class="notification-title">${notification.title}</div>` : ''}
                    <div class="notification-message">${notification.message}</div>
                    ${notification.meta ? `<div class="notification-meta">
                        <i class="fas fa-clock"></i>
                        <span>${notification.meta}</span>
                    </div>` : ''}
                    ${this.renderActions(notification.actions)}
                </div>
                <button class="notification-close" onclick="notificationSystem.hide('${notification.id}')">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        `;

        // إضافة شريط التقدم إذا لم يكن الإشعار دائماً
        if (!notification.persistent && notification.duration > 0) {
            content += `<div class="notification-progress ${notification.type}"></div>`;
        }

        element.innerHTML = content;

        // إضافة مستمع النقر
        if (notification.onClick) {
            element.addEventListener('click', (e) => {
                if (!e.target.closest('.notification-close') && !e.target.closest('.notification-action')) {
                    notification.onClick(notification);
                }
            });
        }

        // إدراج الإشعار
        this.container.appendChild(element);

        // تحريك الظهور
        setTimeout(() => {
            element.classList.add('show');
        }, 50);

        // تشغيل callback الإظهار
        if (notification.onShow) {
            notification.onShow(notification);
        }

        // إعداد الإخفاء التلقائي
        if (!notification.persistent && notification.duration > 0) {
            this.setupAutoHide(notification);
        }
    }

    // رسم أزرار الإشعار
    renderActions(actions) {
        if (!actions || actions.length === 0) return '';

        const actionsHtml = actions.map(action => `
            <button class="notification-action ${action.type || 'secondary'}" 
                    onclick="${action.handler || ''}">
                ${action.icon ? `<i class="${action.icon}"></i> ` : ''}
                ${action.text}
            </button>
        `).join('');

        return `<div class="notification-actions">${actionsHtml}</div>`;
    }

    // إعداد الإخفاء التلقائي مع شريط التقدم
    setupAutoHide(notification) {
        const element = this.container.querySelector(`[data-id="${notification.id}"]`);
        const progressBar = element.querySelector('.notification-progress');
        
        if (progressBar) {
            progressBar.style.width = '100%';
            progressBar.style.transition = `width ${notification.duration}ms linear`;
            
            setTimeout(() => {
                progressBar.style.width = '0%';
            }, 50);
        }

        setTimeout(() => {
            this.hide(notification.id);
        }, notification.duration);
    }

    // إخفاء إشعار
    hide(notificationId) {
        const element = this.container.querySelector(`[data-id="${notificationId}"]`);
        const notification = this.notifications.find(n => n.id === notificationId);

        if (element) {
            element.classList.add('hide');
            
            setTimeout(() => {
                element.remove();
            }, this.settings.animationDuration);
        }

        // إزالة من المصفوفة
        this.notifications = this.notifications.filter(n => n.id !== notificationId);

        // تشغيل callback الإخفاء
        if (notification && notification.onHide) {
            notification.onHide(notification);
        }
    }

    // إدارة تراكم الإشعارات
    manageStack() {
        if (this.notifications.length > this.settings.maxNotifications) {
            const oldestId = this.notifications[0].id;
            this.hide(oldestId);
        }
    }

    // تشغيل أصوات الإشعارات
    playNotificationSound(type) {
        try {
            const frequencies = {
                success: [800, 1000],
                error: [400, 300],
                warning: [600, 700],
                info: [900, 800],
                promotion: [1200, 1000, 800],
                'live-activity': [700, 900]
            };

            const freq = frequencies[type] || [800];
            this.playBeep(freq);
        } catch (e) {
            // تجاهل أخطاء الصوت
        }
    }

    // تشغيل صوت beep
    playBeep(frequencies) {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        
        frequencies.forEach((freq, index) => {
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            oscillator.frequency.value = freq;
            oscillator.type = 'sine';
            
            gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
            
            oscillator.start(audioContext.currentTime + index * 0.1);
            oscillator.stop(audioContext.currentTime + index * 0.1 + 0.1);
        });
    }

    // توليد معرف فريد
    generateId() {
        return 'notification_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    }

    // تعديل للأجهزة المحمولة
    adjustForMobile() {
        if (window.innerWidth <= 768) {
            this.container.className = 'notification-container top-center';
        } else {
            this.container.className = `notification-container ${this.settings.position}`;
        }
    }

    // إشعارات سريعة مع إعدادات مسبقة
    success(message, options = {}) {
        return this.show({
            type: 'success',
            title: options.title || 'نجح!',
            message,
            ...options
        });
    }

    error(message, options = {}) {
        return this.show({
            type: 'error',
            title: options.title || 'خطأ!',
            message,
            urgent: true,
            ...options
        });
    }

    warning(message, options = {}) {
        return this.show({
            type: 'warning',
            title: options.title || 'تحذير!',
            message,
            ...options
        });
    }

    info(message, options = {}) {
        return this.show({
            type: 'info',
            title: options.title || 'معلومة',
            message,
            ...options
        });
    }

    promotion(message, options = {}) {
        return this.show({
            type: 'promotion',
            title: options.title || 'عرض خاص!',
            message,
            celebration: true,
            ...options
        });
    }

    liveActivity(message, options = {}) {
        return this.show({
            type: 'live-activity',
            title: options.title || 'نشاط مباشر',
            message,
            meta: options.meta || 'الآن',
            ...options
        });
    }

    // مسح جميع الإشعارات
    clearAll() {
        this.notifications.forEach(notification => {
            this.hide(notification.id);
        });
    }

    // إعداد الأذونات
    updateSettings(newSettings) {
        this.settings = { ...this.settings, ...newSettings };
        this.container.className = `notification-container ${this.settings.position}`;
    }
}

// إنشاء النظام العام
const notificationSystem = new EnhancedNotificationSystem();

// دوال مساعدة سريعة
window.showNotification = (message, type = 'info', options = {}) => {
    return notificationSystem.show({
        type,
        message,
        ...options
    });
};

window.showSuccess = (message, options = {}) => notificationSystem.success(message, options);
window.showError = (message, options = {}) => notificationSystem.error(message, options);
window.showWarning = (message, options = {}) => notificationSystem.warning(message, options);
window.showInfo = (message, options = {}) => notificationSystem.info(message, options);
window.showPromotion = (message, options = {}) => notificationSystem.promotion(message, options);
window.showLiveActivity = (message, options = {}) => notificationSystem.liveActivity(message, options);

// تصدير النظام
if (typeof module !== 'undefined' && module.exports) {
    module.exports = EnhancedNotificationSystem;
}

// تشغيل تلقائي للإشعارات التجريبية
document.addEventListener('DOMContentLoaded', () => {
    console.log('🔔 Enhanced Notification System Ready');
    
    // إشعار ترحيب
    setTimeout(() => {
        notificationSystem.success('مرحباً بك في USDT-FLASH! نظام الإشعارات المحسن جاهز.', {
            title: 'مرحباً بك!',
            duration: 4000
        });
    }, 2000);

    // إشعار نشاط مباشر
    setTimeout(() => {
        notificationSystem.liveActivity('أحمد م. اشترى للتو 500 USDT-FLASH', {
            meta: '30 ثانية مضت',
            duration: 6000
        });
    }, 8000);

    // إشعار عرض خاص
    setTimeout(() => {
        notificationSystem.promotion('احصل على خصم 25% على الباقة الاحترافية!', {
            title: '🎉 عرض حصري',
            actions: [
                {
                    text: 'استفد الآن',
                    type: 'primary',
                    handler: 'window.location.href="#packages"'
                },
                {
                    text: 'لاحقاً',
                    type: 'secondary',
                    handler: 'notificationSystem.hide(this.closest(".enhanced-notification").dataset.id)'
                }
            ],
            duration: 8000
        });
    }, 15000);
});