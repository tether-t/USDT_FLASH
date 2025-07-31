// نظام الإشعارات المتطور
class NotificationSystem {
    constructor() {
        this.notifications = [];
        this.unreadCount = 0;
        this.lastCheck = localStorage.getItem('lastNotificationCheck') || new Date().toISOString();
        this.init();
    }

    init() {
        this.createNotificationIcon();
        this.loadNotifications();
        this.startPeriodicCheck();
    }

    createNotificationIcon() {
        // إنشاء أيقونة الإشعارات
        const notificationIcon = document.createElement('div');
        notificationIcon.className = 'notifications-icon';
        notificationIcon.innerHTML = `
            <div class="notifications-btn" onclick="notificationSystem.openNewsPage()">
                <i class="fas fa-bell"></i>
                <span class="notification-badge" id="notification-count" style="display: none;">0</span>
            </div>
        `;

        document.body.appendChild(notificationIcon);
    }

    loadNotifications() {
        // محاكاة تحميل الإشعارات من الخادم
        const mockNotifications = [
            {
                id: 1,
                title: "تحديث جديد متاح",
                message: "تم إطلاق تحديث جديد لتحسين الأمان والأداء",
                timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // منذ ساعتين
                read: false,
                type: "update"
            },
            {
                id: 2,
                title: "عرض خاص محدود",
                message: "احصل على خصم 15% على جميع الباقات لفترة محدودة",
                timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(), // منذ 6 ساعات
                read: false,
                type: "offer"
            },
            {
                id: 3,
                title: "تحديث أمني مهم",
                message: "تم تطبيق تحديثات أمنية جديدة لحماية حسابك",
                timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(), // منذ 12 ساعة
                read: false,
                type: "security"
            }
        ];

        // فلترة الإشعارات الجديدة
        const lastCheck = new Date(this.lastCheck);
        const newNotifications = mockNotifications.filter(notification => 
            new Date(notification.timestamp) > lastCheck
        );

        this.notifications = newNotifications;
        this.unreadCount = newNotifications.filter(n => !n.read).length;
        this.updateBadge();
    }

    updateBadge() {
        const badge = document.getElementById('notification-count');
        if (badge) {
            if (this.unreadCount > 0) {
                badge.textContent = this.unreadCount > 99 ? '99+' : this.unreadCount;
                badge.style.display = 'flex';
            } else {
                badge.style.display = 'none';
            }
        }
    }

    openNewsPage() {
        // تحديث وقت آخر فحص
        this.lastCheck = new Date().toISOString();
        localStorage.setItem('lastNotificationCheck', this.lastCheck);
        
        // إعادة تعيين العداد
        this.unreadCount = 0;
        this.updateBadge();
        
        // فتح صفحة الأخبار
        window.open('pages/company-news.html', '_blank');
    }

    startPeriodicCheck() {
        // فحص الإشعارات كل 30 دقيقة
        setInterval(() => {
            this.loadNotifications();
        }, 30 * 60 * 1000);

        // فحص يومي للأخبار الجديدة
        setInterval(() => {
            this.checkForDailyNews();
        }, 24 * 60 * 60 * 1000);
    }

    checkForDailyNews() {
        // محاكاة فحص الأخبار الجديدة
        const hasNewNews = Math.random() > 0.3; // 70% احتمال وجود أخبار جديدة
        
        if (hasNewNews) {
            this.addNotification({
                id: Date.now(),
                title: "أخبار جديدة متاحة",
                message: "تم نشر أخبار ومنشورات جديدة من الشركة",
                timestamp: new Date().toISOString(),
                read: false,
                type: "news"
            });
        }
    }

    addNotification(notification) {
        this.notifications.unshift(notification);
        if (!notification.read) {
            this.unreadCount++;
        }
        this.updateBadge();
        
        // إظهار إشعار منبثق
        this.showPopupNotification(notification);
    }

    showPopupNotification(notification) {
        // إنشاء إشعار منبثق
        const popup = document.createElement('div');
        popup.className = 'notification-popup';
        popup.style.cssText = `
            position: fixed;
            top: 100px;
            left: 20px;
            background: linear-gradient(135deg, rgba(15, 15, 35, 0.95), rgba(25, 25, 45, 0.95));
            color: white;
            padding: 20px;
            border-radius: 15px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.2);
            max-width: 350px;
            z-index: 10000;
            transform: translateX(-100%);
            transition: transform 0.5s ease;
        `;

        popup.innerHTML = `
            <div style="display: flex; align-items: center; margin-bottom: 10px;">
                <i class="fas fa-bell" style="color: #26a17b; margin-left: 10px;"></i>
                <strong>${notification.title}</strong>
                <button onclick="this.parentElement.parentElement.remove()" style="margin-right: auto; background: none; border: none; color: white; font-size: 18px; cursor: pointer;">×</button>
            </div>
            <p style="margin: 0; opacity: 0.9; line-height: 1.4;">${notification.message}</p>
            <button onclick="notificationSystem.openNewsPage(); this.parentElement.remove();" style="
                margin-top: 15px;
                background: linear-gradient(135deg, #26a17b, #00d4ff);
                color: white;
                border: none;
                padding: 8px 16px;
                border-radius: 8px;
                cursor: pointer;
                font-size: 14px;
                transition: all 0.3s ease;
            ">عرض التفاصيل</button>
        `;

        document.body.appendChild(popup);

        // إظهار الإشعار
        setTimeout(() => {
            popup.style.transform = 'translateX(0)';
        }, 100);

        // إخفاء الإشعار تلقائياً بعد 8 ثوان
        setTimeout(() => {
            popup.style.transform = 'translateX(-100%)';
            setTimeout(() => {
                if (popup.parentElement) {
                    popup.remove();
                }
            }, 500);
        }, 8000);
    }

    // إضافة الأنماط المطلوبة
    addStyles() {
        const style = document.createElement('style');
        style.textContent = `
            .notification-popup button:hover {
                background: linear-gradient(135deg, #1a7a5e, #0099cc) !important;
                transform: translateY(-1px);
            }
        `;
        document.head.appendChild(style);
    }
}

// تهيئة نظام الإشعارات
let notificationSystem;

document.addEventListener('DOMContentLoaded', function() {
    // إضافة CSS للإشعارات
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'css/notifications-icon.css';
    document.head.appendChild(link);

    // تهيئة النظام بعد تحميل CSS
    setTimeout(() => {
        notificationSystem = new NotificationSystem();
        notificationSystem.addStyles();
    }, 500);
});

// تصدير للاستخدام العام
window.notificationSystem = notificationSystem;