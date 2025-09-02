// تحسينات إضافية لنظام الإشعارات
class NotificationEnhancements {
    constructor() {
        this.soundEnabled = localStorage.getItem('notificationSound') !== 'false';
        this.vibrationEnabled = localStorage.getItem('notificationVibration') !== 'false';
        this.init();
    }

    init() {
        this.createSoundEffects();
        this.setupKeyboardShortcuts();
        this.addContextMenu();
        this.setupAnalytics();
    }

    createSoundEffects() {
        // إنشاء أصوات الإشعارات
        this.sounds = {
            newNotification: this.createBeep(800, 0.1, 'sine'),
            update: this.createBeep(600, 0.15, 'square'),
            success: this.createBeep(1000, 0.2, 'triangle')
        };
    }

    createBeep(frequency, duration, type = 'sine') {
        return () => {
            if (!this.soundEnabled) return;
            
            try {
                const audioContext = new (window.AudioContext || window.webkitAudioContext)();
                const oscillator = audioContext.createOscillator();
                const gainNode = audioContext.createGain();
                
                oscillator.connect(gainNode);
                gainNode.connect(audioContext.destination);
                
                oscillator.frequency.value = frequency;
                oscillator.type = type;
                
                gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
                gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration);
                
                oscillator.start(audioContext.currentTime);
                oscillator.stop(audioContext.currentTime + duration);
            } catch (error) {
                console.log('Audio not supported');
            }
        };
    }

    playNotificationSound(type = 'newNotification') {
        if (this.sounds[type]) {
            this.sounds[type]();
        }
    }

    vibrate(pattern = [200, 100, 200]) {
        if (this.vibrationEnabled && 'vibrate' in navigator) {
            navigator.vibrate(pattern);
        }
    }

    setupKeyboardShortcuts() {
        document.addEventListener('keydown', (e) => {
            // Ctrl/Cmd + Shift + N لفتح الإشعارات
            if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'N') {
                e.preventDefault();
                if (window.advancedNotifications) {
                    window.advancedNotifications.openNewsPage();
                }
            }
            
            // Ctrl/Cmd + Shift + R لتحديث الإشعارات
            if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'R') {
                e.preventDefault();
                if (window.advancedNotifications) {
                    window.advancedNotifications.checkForNewContent();
                    this.showQuickMessage('تم تحديث الإشعارات');
                }
            }
        });
    }

    addContextMenu() {
        // إضافة قائمة السياق لأيقونة الإشعارات في الهيدر
        setTimeout(() => {
            const notificationIcon = document.querySelector('.icon-item:has(.fa-bell)');
            if (notificationIcon) {
                notificationIcon.addEventListener('contextmenu', (e) => {
                    e.preventDefault();
                    this.showContextMenu(e.clientX, e.clientY);
                });
            }
        }, 1000);
    }

    showContextMenu(x, y) {
        // إزالة القائمة الموجودة
        const existingMenu = document.querySelector('.notification-context-menu');
        if (existingMenu) {
            existingMenu.remove();
        }

        const menu = document.createElement('div');
        menu.className = 'notification-context-menu';
        menu.style.cssText = `
            position: fixed;
            top: ${y}px;
            left: ${x}px;
            background: linear-gradient(135deg, rgba(15, 15, 35, 0.98), rgba(25, 25, 45, 0.95));
            backdrop-filter: blur(20px);
            border: 1px solid rgba(255, 255, 255, 0.2);
            border-radius: 12px;
            padding: 8px 0;
            min-width: 200px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4);
            z-index: 10003;
            color: white;
            font-size: 14px;
        `;

        const menuItems = [
            {
                icon: 'fas fa-newspaper',
                text: 'فتح صفحة الأخبار',
                action: () => {
                    if (window.advancedNotifications) {
                        window.advancedNotifications.openNewsPage();
                    }
                }
            },
            {
                icon: 'fas fa-sync-alt',
                text: 'تحديث الإشعارات',
                action: () => {
                    if (window.advancedNotifications) {
                        window.advancedNotifications.checkForNewContent();
                        this.showQuickMessage('جاري التحديث...');
                    }
                }
            },
            {
                icon: this.soundEnabled ? 'fas fa-volume-up' : 'fas fa-volume-mute',
                text: this.soundEnabled ? 'إيقاف الأصوات' : 'تشغيل الأصوات',
                action: () => {
                    this.soundEnabled = !this.soundEnabled;
                    localStorage.setItem('notificationSound', this.soundEnabled.toString());
                    this.showQuickMessage(this.soundEnabled ? 'تم تشغيل الأصوات' : 'تم إيقاف الأصوات');
                }
            },
            {
                icon: this.vibrationEnabled ? 'fas fa-mobile-alt' : 'fas fa-mobile',
                text: this.vibrationEnabled ? 'إيقاف الاهتزاز' : 'تشغيل الاهتزاز',
                action: () => {
                    this.vibrationEnabled = !this.vibrationEnabled;
                    localStorage.setItem('notificationVibration', this.vibrationEnabled.toString());
                    this.showQuickMessage(this.vibrationEnabled ? 'تم تشغيل الاهتزاز' : 'تم إيقاف الاهتزاز');
                }
            },
            {
                icon: 'fas fa-cog',
                text: 'إعدادات الإشعارات',
                action: () => {
                    this.showSettingsModal();
                }
            }
        ];

        menuItems.forEach(item => {
            const menuItem = document.createElement('div');
            menuItem.style.cssText = `
                padding: 12px 16px;
                cursor: pointer;
                transition: background-color 0.2s ease;
                display: flex;
                align-items: center;
                gap: 12px;
            `;
            
            menuItem.innerHTML = `
                <i class="${item.icon}" style="width: 16px;"></i>
                <span>${item.text}</span>
            `;
            
            menuItem.addEventListener('mouseenter', () => {
                menuItem.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
            });
            
            menuItem.addEventListener('mouseleave', () => {
                menuItem.style.backgroundColor = 'transparent';
            });
            
            menuItem.addEventListener('click', () => {
                item.action();
                menu.remove();
            });
            
            menu.appendChild(menuItem);
        });

        document.body.appendChild(menu);

        // إغلاق القائمة عند النقر خارجها
        setTimeout(() => {
            document.addEventListener('click', function closeMenu() {
                menu.remove();
                document.removeEventListener('click', closeMenu);
            });
        }, 100);
    }

    showSettingsModal() {
        const modal = document.createElement('div');
        modal.className = 'notification-settings-modal';
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.8);
            backdrop-filter: blur(10px);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10004;
        `;

        const modalContent = document.createElement('div');
        modalContent.style.cssText = `
            background: linear-gradient(135deg, rgba(15, 15, 35, 0.98), rgba(25, 25, 45, 0.95));
            border: 1px solid rgba(255, 255, 255, 0.2);
            border-radius: 20px;
            padding: 30px;
            max-width: 500px;
            width: 90%;
            color: white;
        `;

        modalContent.innerHTML = `
            <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 25px;">
                <h3 style="margin: 0; font-size: 1.5rem; font-weight: 700;">إعدادات الإشعارات</h3>
                <button onclick="this.closest('.notification-settings-modal').remove()" style="
                    background: none;
                    border: none;
                    color: white;
                    font-size: 24px;
                    cursor: pointer;
                    padding: 5px;
                    border-radius: 50%;
                    transition: background-color 0.2s ease;
                " onmouseover="this.style.backgroundColor='rgba(255,255,255,0.1)'" onmouseout="this.style.backgroundColor='transparent'">×</button>
            </div>
            
            <div style="space-y: 20px;">
                <div style="margin-bottom: 20px;">
                    <label style="display: flex; align-items: center; gap: 12px; cursor: pointer;">
                        <input type="checkbox" ${this.soundEnabled ? 'checked' : ''} onchange="notificationEnhancements.toggleSound(this.checked)" style="
                            width: 18px;
                            height: 18px;
                            accent-color: #26a17b;
                        ">
                        <i class="fas fa-volume-up" style="width: 20px; color: #26a17b;"></i>
                        <span>تشغيل أصوات الإشعارات</span>
                    </label>
                </div>
                
                <div style="margin-bottom: 20px;">
                    <label style="display: flex; align-items: center; gap: 12px; cursor: pointer;">
                        <input type="checkbox" ${this.vibrationEnabled ? 'checked' : ''} onchange="notificationEnhancements.toggleVibration(this.checked)" style="
                            width: 18px;
                            height: 18px;
                            accent-color: #26a17b;
                        ">
                        <i class="fas fa-mobile-alt" style="width: 20px; color: #26a17b;"></i>
                        <span>تشغيل الاهتزاز (الهواتف المحمولة)</span>
                    </label>
                </div>
                
                <div style="margin-bottom: 20px;">
                    <label style="display: block; margin-bottom: 8px;">
                        <i class="fas fa-clock" style="margin-left: 8px; color: #26a17b;"></i>
                        فترة التحديث (بالساعات):
                    </label>
                    <select onchange="notificationEnhancements.setUpdateInterval(this.value)" style="
                        width: 100%;
                        padding: 10px;
                        border-radius: 8px;
                        border: 1px solid rgba(255, 255, 255, 0.2);
                        background: rgba(255, 255, 255, 0.1);
                        color: white;
                        font-size: 14px;
                    ">
                        <option value="1">كل ساعة</option>
                        <option value="6">كل 6 ساعات</option>
                        <option value="12">كل 12 ساعة</option>
                        <option value="24" selected>كل 24 ساعة</option>
                    </select>
                </div>
                
                <div style="margin-bottom: 25px;">
                    <button onclick="notificationEnhancements.testNotification()" style="
                        width: 100%;
                        padding: 12px;
                        background: linear-gradient(135deg, #26a17b, #00d4ff);
                        border: none;
                        border-radius: 10px;
                        color: white;
                        font-weight: 600;
                        cursor: pointer;
                        transition: all 0.3s ease;
                    " onmouseover="this.style.transform='translateY(-2px)'" onmouseout="this.style.transform='translateY(0)'">
                        <i class="fas fa-test-tube" style="margin-left: 8px;"></i>
                        اختبار الإشعار
                    </button>
                </div>
                
                <div style="text-align: center; font-size: 0.9rem; color: rgba(255, 255, 255, 0.7);">
                    <i class="fas fa-info-circle" style="margin-left: 5px;"></i>
                    يتم حفظ الإعدادات تلقائياً
                </div>
            </div>
        `;

        modal.appendChild(modalContent);
        document.body.appendChild(modal);

        // إغلاق النافذة عند النقر خارج المحتوى
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.remove();
            }
        });
    }

    toggleSound(enabled) {
        this.soundEnabled = enabled;
        localStorage.setItem('notificationSound', enabled.toString());
        if (enabled) {
            this.playNotificationSound('success');
        }
    }

    toggleVibration(enabled) {
        this.vibrationEnabled = enabled;
        localStorage.setItem('notificationVibration', enabled.toString());
        if (enabled) {
            this.vibrate([100, 50, 100]);
        }
    }

    setUpdateInterval(hours) {
        localStorage.setItem('notificationUpdateInterval', hours);
        this.showQuickMessage(`تم تعيين التحديث كل ${hours} ساعة`);
    }

    testNotification() {
        this.playNotificationSound('newNotification');
        this.vibrate([200, 100, 200]);
        
        if (window.advancedNotifications) {
            const testNotification = {
                id: 'test_' + Date.now(),
                title: '🧪 إشعار تجريبي',
                message: 'هذا إشعار تجريبي للتأكد من عمل النظام بشكل صحيح.',
                timestamp: new Date().toISOString(),
                type: 'test',
                read: false,
                source: 'نظام الاختبار'
            };
            
            window.advancedNotifications.showNotificationPopup(testNotification);
        }
        
        this.showQuickMessage('تم إرسال إشعار تجريبي');
    }

    showQuickMessage(message) {
        const quickMsg = document.createElement('div');
        quickMsg.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: linear-gradient(135deg, #26a17b, #00d4ff);
            color: white;
            padding: 12px 20px;
            border-radius: 10px;
            font-weight: 600;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
            z-index: 10005;
            transform: translateX(100%);
            transition: transform 0.3s ease;
        `;
        quickMsg.textContent = message;
        
        document.body.appendChild(quickMsg);
        
        setTimeout(() => {
            quickMsg.style.transform = 'translateX(0)';
        }, 100);
        
        setTimeout(() => {
            quickMsg.style.transform = 'translateX(100%)';
            setTimeout(() => quickMsg.remove(), 300);
        }, 2500);
    }

    setupAnalytics() {
        // تتبع استخدام الإشعارات
        this.analytics = {
            notificationsViewed: parseInt(localStorage.getItem('notificationsViewed') || '0'),
            newsPageVisits: parseInt(localStorage.getItem('newsPageVisits') || '0'),
            lastAnalyticsReset: localStorage.getItem('lastAnalyticsReset') || new Date().toISOString()
        };
        
        // إعادة تعيين الإحصائيات شهرياً
        const lastReset = new Date(this.analytics.lastAnalyticsReset);
        const monthAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
        
        if (lastReset < monthAgo) {
            this.resetAnalytics();
        }
    }

    trackNotificationView() {
        this.analytics.notificationsViewed++;
        localStorage.setItem('notificationsViewed', this.analytics.notificationsViewed.toString());
    }

    trackNewsPageVisit() {
        this.analytics.newsPageVisits++;
        localStorage.setItem('newsPageVisits', this.analytics.newsPageVisits.toString());
    }

    resetAnalytics() {
        this.analytics = {
            notificationsViewed: 0,
            newsPageVisits: 0,
            lastAnalyticsReset: new Date().toISOString()
        };
        
        localStorage.setItem('notificationsViewed', '0');
        localStorage.setItem('newsPageVisits', '0');
        localStorage.setItem('lastAnalyticsReset', this.analytics.lastAnalyticsReset);
    }

    getAnalytics() {
        return this.analytics;
    }
}

// تهيئة التحسينات
let notificationEnhancements;

document.addEventListener('DOMContentLoaded', function() {
    setTimeout(() => {
        notificationEnhancements = new NotificationEnhancements();
        window.notificationEnhancements = notificationEnhancements;
        
        console.log('🎛️ Notification Enhancements Loaded');
    }, 1500);
});

// تصدير للاستخدام العام
if (typeof module !== 'undefined' && module.exports) {
    module.exports = NotificationEnhancements;
}
