// نظام الإشعارات المتقدم مع تكامل X (Twitter)
class AdvancedNotificationSystem {
    constructor() {
        this.apiEndpoint = 'https://api.twitter.com/2/users/by/username/Tether_to/tweets'; // مثال
        this.notifications = this.loadFromStorage();
        this.settings = this.loadSettings();
        this.isInitialized = false;
        this.init();
    }

    init() {
        if (this.isInitialized) return;
        
        this.createNotificationIcon();
        this.setupEventListeners();
        this.startPeriodicUpdates();
        this.checkForNewContent();
        this.isInitialized = true;
        
        console.log('🔔 Advanced Notification System Initialized');
    }

    createNotificationIcon() {
        // الأيقونة موجودة في الهيدر بالفعل
        this.updateBadge();
    }

    loadFromStorage() {
        try {
            const stored = localStorage.getItem('companyNotifications');
            return stored ? JSON.parse(stored) : [];
        } catch (error) {
            console.error('Error loading notifications:', error);
            return [];
        }
    }

    saveToStorage() {
        try {
            localStorage.setItem('companyNotifications', JSON.stringify(this.notifications));
            localStorage.setItem('lastNotificationUpdate', new Date().toISOString());
        } catch (error) {
            console.error('Error saving notifications:', error);
        }
    }

    loadSettings() {
        try {
            const stored = localStorage.getItem('notificationSettings');
            return stored ? JSON.parse(stored) : {
                enabled: true,
                showPopups: true,
                checkInterval: 24, // ساعات
                lastCheck: new Date().toISOString()
            };
        } catch (error) {
            return {
                enabled: true,
                showPopups: true,
                checkInterval: 24,
                lastCheck: new Date().toISOString()
            };
        }
    }

    saveSettings() {
        try {
            localStorage.setItem('notificationSettings', JSON.stringify(this.settings));
        } catch (error) {
            console.error('Error saving settings:', error);
        }
    }

    async checkForNewContent() {
        if (!this.settings.enabled) return;

        try {
            // محاكاة فحص المحتوى الجديد
            const newPosts = await this.fetchLatestPosts();
            const lastCheck = new Date(this.settings.lastCheck);
            
            const newNotifications = newPosts.filter(post => 
                new Date(post.created_at) > lastCheck
            );

            if (newNotifications.length > 0) {
                this.addNewNotifications(newNotifications);
                this.settings.lastCheck = new Date().toISOString();
                this.saveSettings();
            }

        } catch (error) {
            console.error('Error checking for new content:', error);
        }
    }

    async fetchLatestPosts() {
        // محاكاة استدعاء API - في التطبيق الحقيقي ستحتاج لخادم وسيط
        return new Promise((resolve) => {
            setTimeout(() => {
                const mockPosts = [
                    {
                        id: 'tweet_' + Date.now(),
                        text: 'إعلان مهم: تم إطلاق تحديث جديد لشبكة Tether يتضمن تحسينات أمنية متقدمة وزيادة في سرعة المعاملات.',
                        created_at: new Date(Date.now() - Math.random() * 12 * 60 * 60 * 1000).toISOString(),
                        author: 'Tether_to',
                        url: 'https://x.com/Tether_to/status/' + Math.random().toString(36).substr(2, 9),
                        type: 'announcement'
                    },
                    {
                        id: 'tweet_' + (Date.now() + 1),
                        text: 'تقرير الشفافية الشهري متاح الآن. يمكنكم الاطلاع على تفاصيل الاحتياطيات والأصول المدعومة لعملة USDT.',
                        created_at: new Date(Date.now() - Math.random() * 6 * 60 * 60 * 1000).toISOString(),
                        author: 'Tether_to',
                        url: 'https://x.com/Tether_to/status/' + Math.random().toString(36).substr(2, 9),
                        type: 'report'
                    },
                    {
                        id: 'tweet_' + (Date.now() + 2),
                        text: 'شراكة جديدة مع منصات التداول الرائدة لتوسيع نطاق استخدام USDT وتحسين السيولة في الأسواق العالمية.',
                        created_at: new Date(Date.now() - Math.random() * 3 * 60 * 60 * 1000).toISOString(),
                        author: 'Tether_to',
                        url: 'https://x.com/Tether_to/status/' + Math.random().toString(36).substr(2, 9),
                        type: 'partnership'
                    }
                ];

                // فلترة المنشورات الجديدة فقط
                const recentPosts = mockPosts.filter(post => {
                    const postTime = new Date(post.created_at);
                    const dayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
                    return postTime > dayAgo;
                });

                resolve(recentPosts);
            }, 1000);
        });
    }

    addNewNotifications(posts) {
        posts.forEach(post => {
            const notification = {
                id: post.id,
                title: this.getNotificationTitle(post.type),
                message: this.truncateText(post.text, 100),
                fullText: post.text,
                timestamp: post.created_at,
                url: post.url,
                type: post.type,
                read: false,
                source: 'X (Twitter)'
            };

            // تجنب التكرار
            if (!this.notifications.find(n => n.id === notification.id)) {
                this.notifications.unshift(notification);
                
                if (this.settings.showPopups) {
                    this.showNotificationPopup(notification);
                }
            }
        });

        this.saveToStorage();
        this.updateBadge();
    }

    getNotificationTitle(type) {
        const titles = {
            'announcement': '📢 إعلان مهم من Tether',
            'report': '📊 تقرير جديد متاح',
            'partnership': '🤝 شراكة جديدة',
            'update': '🔄 تحديث النظام',
            'security': '🔒 تحديث أمني',
            'default': '📰 خبر جديد من Tether'
        };
        return titles[type] || titles.default;
    }

    truncateText(text, maxLength) {
        if (text.length <= maxLength) return text;
        return text.substring(0, maxLength) + '...';
    }

    updateBadge() {
        const badge = document.getElementById('header-notification-count');
        if (!badge) return;

        const unreadCount = this.notifications.filter(n => !n.read).length;
        
        if (unreadCount > 0) {
            badge.textContent = unreadCount > 99 ? '99+' : unreadCount;
            badge.style.display = 'flex';
        } else {
            badge.style.display = 'none';
        }
    }

    showNotificationPopup(notification) {
        const popup = document.createElement('div');
        popup.className = 'advanced-notification-popup';
        popup.innerHTML = `
            <div class="popup-header">
                <div class="popup-icon">
                    <i class="fas fa-bell"></i>
                </div>
                <div class="popup-title">${notification.title}</div>
                <button class="popup-close" onclick="this.parentElement.parentElement.remove()">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="popup-content">
                <p>${notification.message}</p>
                <div class="popup-meta">
                    <span class="popup-time">${this.formatTime(notification.timestamp)}</span>
                    <span class="popup-source">${notification.source}</span>
                </div>
            </div>
            <div class="popup-actions">
                <button class="popup-btn primary" onclick="advancedNotifications.openNewsPage(); this.parentElement.parentElement.remove();">
                    <i class="fas fa-external-link-alt"></i>
                    عرض التفاصيل
                </button>
                <button class="popup-btn secondary" onclick="this.parentElement.parentElement.remove();">
                    إغلاق
                </button>
            </div>
        `;

        // إضافة الأنماط
        popup.style.cssText = `
            position: fixed;
            top: 100px;
            left: 20px;
            width: 380px;
            background: linear-gradient(135deg, rgba(15, 15, 35, 0.98), rgba(25, 25, 45, 0.95));
            backdrop-filter: blur(20px);
            border: 1px solid rgba(255, 255, 255, 0.2);
            border-radius: 20px;
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
            color: white;
            z-index: 10001;
            transform: translateX(-100%);
            transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
            overflow: hidden;
        `;

        document.body.appendChild(popup);

        // إظهار الإشعار
        setTimeout(() => {
            popup.style.transform = 'translateX(0)';
        }, 100);

        // إخفاء تلقائي بعد 10 ثوان
        setTimeout(() => {
            if (popup.parentElement) {
                popup.style.transform = 'translateX(-100%)';
                setTimeout(() => popup.remove(), 500);
            }
        }, 10000);
    }

    formatTime(timestamp) {
        const date = new Date(timestamp);
        const now = new Date();
        const diff = now - date;
        
        const minutes = Math.floor(diff / 60000);
        const hours = Math.floor(diff / 3600000);
        const days = Math.floor(diff / 86400000);
        
        if (minutes < 60) return `منذ ${minutes} دقيقة`;
        if (hours < 24) return `منذ ${hours} ساعة`;
        return `منذ ${days} يوم`;
    }

    handleIconClick() {
        // تحديد جميع الإشعارات كمقروءة
        this.notifications.forEach(n => n.read = true);
        this.saveToStorage();
        this.updateBadge();
        
        // فتح صفحة الأخبار
        this.openNewsPage();
    }

    openNewsPage() {
        // تحديث إعدادات آخر فحص
        this.settings.lastCheck = new Date().toISOString();
        this.saveSettings();
        
        // فتح الصفحة
        window.open('pages/company-news.html', '_blank');
    }

    setupEventListeners() {
        // مراقبة تغييرات الصفحة
        document.addEventListener('visibilitychange', () => {
            if (!document.hidden) {
                this.checkForNewContent();
            }
        });

        // مراقبة الاتصال بالإنترنت
        window.addEventListener('online', () => {
            this.checkForNewContent();
        });
    }

    startPeriodicUpdates() {
        // فحص كل ساعة
        setInterval(() => {
            this.checkForNewContent();
        }, 60 * 60 * 1000);

        // فحص يومي مكثف
        setInterval(() => {
            this.performDailyUpdate();
        }, 24 * 60 * 60 * 1000);
    }

    async performDailyUpdate() {
        console.log('🔄 Performing daily notification update...');
        
        try {
            await this.checkForNewContent();
            
            // تنظيف الإشعارات القديمة (أكثر من 30 يوم)
            const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
            this.notifications = this.notifications.filter(n => 
                new Date(n.timestamp) > thirtyDaysAgo
            );
            
            this.saveToStorage();
            console.log('✅ Daily update completed');
            
        } catch (error) {
            console.error('❌ Daily update failed:', error);
        }
    }

    // إضافة الأنماط المطلوبة
    addAdvancedStyles() {
        if (document.getElementById('advanced-notification-styles')) return;

        const style = document.createElement('style');
        style.id = 'advanced-notification-styles';
        style.textContent = `
            .notifications-btn.has-notifications {
                animation: notificationPulse 2s infinite;
            }

            @keyframes notificationPulse {
                0%, 100% { transform: scale(1); }
                50% { transform: scale(1.05); }
            }

            .advanced-notification-popup .popup-header {
                display: flex;
                align-items: center;
                padding: 20px 20px 15px;
                border-bottom: 1px solid rgba(255, 255, 255, 0.1);
            }

            .advanced-notification-popup .popup-icon {
                width: 40px;
                height: 40px;
                background: linear-gradient(135deg, #26a17b, #00d4ff);
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                margin-left: 15px;
            }

            .advanced-notification-popup .popup-title {
                flex: 1;
                font-weight: 700;
                font-size: 1.1rem;
            }

            .advanced-notification-popup .popup-close {
                background: none;
                border: none;
                color: rgba(255, 255, 255, 0.7);
                font-size: 18px;
                cursor: pointer;
                padding: 5px;
                border-radius: 50%;
                transition: all 0.3s ease;
            }

            .advanced-notification-popup .popup-close:hover {
                background: rgba(255, 255, 255, 0.1);
                color: white;
            }

            .advanced-notification-popup .popup-content {
                padding: 20px;
            }

            .advanced-notification-popup .popup-content p {
                margin: 0 0 15px 0;
                line-height: 1.6;
                color: rgba(255, 255, 255, 0.9);
            }

            .advanced-notification-popup .popup-meta {
                display: flex;
                justify-content: space-between;
                font-size: 0.85rem;
                color: rgba(255, 255, 255, 0.6);
            }

            .advanced-notification-popup .popup-actions {
                padding: 15px 20px 20px;
                display: flex;
                gap: 10px;
            }

            .advanced-notification-popup .popup-btn {
                padding: 10px 20px;
                border: none;
                border-radius: 10px;
                cursor: pointer;
                font-weight: 600;
                transition: all 0.3s ease;
                display: flex;
                align-items: center;
                gap: 8px;
            }

            .advanced-notification-popup .popup-btn.primary {
                background: linear-gradient(135deg, #26a17b, #00d4ff);
                color: white;
                flex: 1;
            }

            .advanced-notification-popup .popup-btn.secondary {
                background: rgba(255, 255, 255, 0.1);
                color: rgba(255, 255, 255, 0.8);
                border: 1px solid rgba(255, 255, 255, 0.2);
            }

            .advanced-notification-popup .popup-btn:hover {
                transform: translateY(-2px);
            }

            .advanced-notification-popup .popup-btn.primary:hover {
                background: linear-gradient(135deg, #1a7a5e, #0099cc);
            }

            .advanced-notification-popup .popup-btn.secondary:hover {
                background: rgba(255, 255, 255, 0.2);
            }

            .notification-tooltip {
                position: absolute;
                bottom: -40px;
                left: 50%;
                transform: translateX(-50%);
                background: rgba(0, 0, 0, 0.9);
                color: white;
                padding: 8px 12px;
                border-radius: 8px;
                font-size: 12px;
                white-space: nowrap;
                opacity: 0;
                visibility: hidden;
                transition: all 0.3s ease;
                z-index: 10002;
            }

            .notifications-icon:hover .notification-tooltip {
                opacity: 1;
                visibility: visible;
            }

            @media (max-width: 768px) {
                .advanced-notification-popup {
                    left: 10px !important;
                    right: 10px !important;
                    width: auto !important;
                }
            }
        `;

        document.head.appendChild(style);
    }
}

// تهيئة النظام المتقدم
let advancedNotifications;

document.addEventListener('DOMContentLoaded', function() {
    // تأخير التهيئة للتأكد من تحميل جميع الموارد
    setTimeout(() => {
        advancedNotifications = new AdvancedNotificationSystem();
        advancedNotifications.addAdvancedStyles();
        
        // جعل النظام متاح عالمياً
        window.advancedNotifications = advancedNotifications;
        
        console.log('🚀 Advanced Notification System Ready');
    }, 1000);
});

// تصدير للاستخدام في ملفات أخرى
if (typeof module !== 'undefined' && module.exports) {
    module.exports = AdvancedNotificationSystem;
}