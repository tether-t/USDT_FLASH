// 🔔 نظام الإشعارات المتطور
document.addEventListener('DOMContentLoaded', function() {
    
    let notificationsOpen = false;
    let liveTransferInterval;
    
    // بيانات المعاملات المباشرة
    const liveTransfers = [
        { name: 'Ahmed K.', amount: '10,000', wallet: 'Binance', country: 'UAE' },
        { name: 'Sarah M.', amount: '2,500', wallet: 'Trust Wallet', country: 'Saudi Arabia' },
        { name: 'محمد الشامي', amount: '2,500', wallet: 'MetaMask', country: 'UAE' },
        { name: 'Omar H.', amount: '10,000', wallet: 'Bybit', country: 'Qatar' },
        { name: 'فاطمة الزهراء', amount: '2,500', wallet: 'Binance', country: 'Saudi Arabia' },
        { name: 'John D.', amount: '499', wallet: 'Trust Wallet', country: 'USA' },
        { name: 'أحمد العلي', amount: '10,000', wallet: 'Binance', country: 'Saudi Arabia' }
    ];
    
    // فتح/إغلاق الإشعارات
    window.toggleNotifications = function() {
        const dropdown = document.getElementById('notifications-dropdown');
        const badge = document.querySelector('.notification-badge');
        
        if (notificationsOpen) {
            dropdown.classList.add('hidden');
            notificationsOpen = false;
            clearInterval(liveTransferInterval);
        } else {
            dropdown.classList.remove('hidden');
            notificationsOpen = true;
            startLiveTransferUpdates();
            
            // إخفاء العداد عند فتح الإشعارات
            badge.style.display = 'none';
        }
    };
    
    // تحديث المعاملات المباشرة كل 10 ثوان
    function startLiveTransferUpdates() {
        updateLiveTransfer(); // تحديث فوري
        
        liveTransferInterval = setInterval(() => {
            updateLiveTransfer();
        }, 10000); // كل 10 ثوان
    }
    
    // تحديث نص المعاملة المباشرة
    function updateLiveTransfer() {
        const textElement = document.getElementById('live-transfer-text');
        const timeElement = document.getElementById('live-transfer-time');
        
        if (textElement && timeElement) {
            const randomTransfer = liveTransfers[Math.floor(Math.random() * liveTransfers.length)];
            
            textElement.textContent = `${randomTransfer.name} just transferred ${randomTransfer.amount} USDT to ${randomTransfer.wallet} wallet`;
            timeElement.textContent = 'Just now';
            
            // تأثير بصري للتحديث
            textElement.style.animation = 'none';
            setTimeout(() => {
                textElement.style.animation = 'fadeIn 0.5s ease';
            }, 10);
        }
    }
    
    // مسح جميع الإشعارات
    window.clearNotifications = function() {
        const badge = document.querySelector('.notification-badge');
        const dropdown = document.getElementById('notifications-dropdown');
        
        badge.textContent = '0';
        badge.style.display = 'none';
        dropdown.classList.add('hidden');
        notificationsOpen = false;
        clearInterval(liveTransferInterval);
        
        // إظهار رسالة تأكيد
        showToast('All notifications marked as read!');
    };
    
    // إغلاق الإشعارات عند النقر خارجها
    document.addEventListener('click', function(e) {
        const notificationBell = document.querySelector('.notification-bell');
        const dropdown = document.getElementById('notifications-dropdown');
        
        if (notificationsOpen && !notificationBell.contains(e.target)) {
            dropdown.classList.add('hidden');
            notificationsOpen = false;
            clearInterval(liveTransferInterval);
        }
    });
    
    // رسالة توست للتأكيد
    function showToast(message) {
        const toast = document.createElement('div');
        toast.className = 'fixed top-20 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg z-50 transform translate-x-full transition-transform duration-300';
        toast.textContent = message;
        
        document.body.appendChild(toast);
        
        setTimeout(() => {
            toast.classList.remove('translate-x-full');
        }, 100);
        
        setTimeout(() => {
            toast.classList.add('translate-x-full');
            setTimeout(() => {
                toast.remove();
            }, 300);
        }, 3000);
    }
    
    // تحسين للهواتف المحمولة
    function optimizeForMobile() {
        const dropdown = document.getElementById('notifications-dropdown');
        
        if (window.innerWidth <= 768) {
            dropdown.classList.add('mobile-notifications');
            
            // إضافة CSS للهواتف
            const mobileStyles = `
                <style>
                .mobile-notifications {
                    position: fixed !important;
                    top: 60px !important;
                    left: 10px !important;
                    right: 10px !important;
                    width: auto !important;
                    max-height: 70vh !important;
                    z-index: 9999 !important;
                }
                
                @media (max-width: 768px) {
                    .notification-item {
                        padding: 12px !important;
                    }
                    
                    .notification-item h4 {
                        font-size: 14px !important;
                    }
                    
                    .notification-item p {
                        font-size: 12px !important;
                    }
                }
                
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(-10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                </style>
            `;
            
            if (!document.querySelector('#mobile-notifications-styles')) {
                const styleElement = document.createElement('style');
                styleElement.id = 'mobile-notifications-styles';
                styleElement.innerHTML = mobileStyles;
                document.head.appendChild(styleElement);
            }
        }
    }
    
    // تطبيق التحسينات عند تحميل الصفحة وتغيير حجم الشاشة
    optimizeForMobile();
    window.addEventListener('resize', optimizeForMobile);
    
    console.log('🔔 Notifications system initialized');
});