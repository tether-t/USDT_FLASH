// 🚨 نظام إشعارات معاملات Binance
// Binance Transaction Notifications System

document.addEventListener('DOMContentLoaded', function() {
    
    // 💰 معاملات Binance بقيم الباقات المعروضة على الموقع
    const largeBinanceTransactions = [
        {
            userName: 'Ahmed K.',
            amount: 10000,
            country: 'UAE',
            walletAddress: '0x742d...a8f4',
            timeAgo: '2 minutes ago',
            avatar: 'A',
            package: 'Enterprise'
        },
        {
            userName: 'Sarah M.',
            amount: 2500,
            country: 'Saudi Arabia',
            walletAddress: '0x1a4c...7b29',
            timeAgo: '5 minutes ago',
            avatar: 'S',
            package: 'Pro'
        },
        {
            userName: 'Omar H.',
            amount: 10000,
            country: 'Qatar',
            walletAddress: '0x8f3e...4c15',
            timeAgo: '3 minutes ago',
            avatar: 'O',
            package: 'Enterprise'
        },
        {
            userName: 'Fatima A.',
            amount: 2500,
            country: 'Kuwait',
            walletAddress: '0x6d2a...9e87',
            timeAgo: '7 minutes ago',
            avatar: 'F',
            package: 'Pro'
        },
        {
            userName: 'Mohammed R.',
            amount: 10000,
            country: 'Egypt',
            walletAddress: '0x4b8c...3f62',
            timeAgo: '4 minutes ago',
            avatar: 'M',
            package: 'Enterprise'
        },
        {
            userName: 'Layla T.',
            amount: 2500,
            country: 'Jordan',
            walletAddress: '0x9a1f...8d34',
            timeAgo: '6 minutes ago',
            avatar: 'L',
            package: 'Pro'
        },
        {
            userName: 'John S.',
            amount: 10000,
            country: 'USA',
            walletAddress: '0x3d5a...6b18',
            timeAgo: '8 minutes ago',
            avatar: 'J',
            package: 'Enterprise'
        },
        {
            userName: 'Maria G.',
            amount: 2500,
            country: 'Spain',
            walletAddress: '0x8e2f...4c92',
            timeAgo: '3 minutes ago',
            avatar: 'M',
            package: 'Pro'
        }
    ];

    // 🔔 إنشاء إشعار معاملة
    function createBinanceNotification(transaction) {
        const notification = document.createElement('div');
        notification.className = 'binance-notification';
        notification.innerHTML = `
            <div class="notification-content">
                <div class="notification-header">
                    <div class="notification-icon">
                        <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEyIDI0QzE4LjYyNzQgMjQgMjQgMTguNjI3NCAyNCA5VjE1QzI0IDIxLjYyNzQgMTguNjI3NCAyNyAxMiAyN0M1LjM3MjU5IDI3IDAgMjEuNjI3NCAwIDE1VjlDMCA2LjM3MjU5IDIuMzcyNTkgNCAxMiA0QzE4LjYyNzQgNCAyNCA5LjM3MjU5IDI0IDlWMTVDMjQgMTguNjI3NCAxOC42Mjc0IDI0IDEyIDI0WiIgZmlsbD0iI0YzQkE0QyIvPgo8L3N2Zz4K" alt="Binance">
                    </div>
                    <div class="notification-title">
                        <span class="title-text">Binance Transfer Completed</span>
                        <span class="live-badge">LIVE</span>
                    </div>
                    <button class="close-notification" onclick="closeBinanceNotification(this)">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                
                <div class="notification-body">
                    <div class="user-info">
                        <div class="user-avatar">${transaction.avatar}</div>
                        <div class="user-details">
                            <div class="user-name">${transaction.userName}</div>
                            <div class="user-location">📍 ${transaction.country}</div>
                        </div>
                    </div>
                    
                    <div class="transaction-details">
                        <div class="amount-info">
                            <span class="amount-label">Amount Transferred:</span>
                            <span class="amount-value">${transaction.amount.toLocaleString()} USDT</span>
                        </div>
                        <div class="wallet-info">
                            <span class="wallet-label">To Binance Wallet:</span>
                            <span class="wallet-address">${transaction.walletAddress}</span>
                        </div>
                        <div class="package-info-notification">
                            <span class="package-label">Package:</span>
                            <span class="package-badge">${transaction.package}</span>
                        </div>
                        <div class="time-info">
                            <i class="fas fa-clock"></i>
                            <span>${transaction.timeAgo}</span>
                        </div>
                    </div>
                </div>
            </div>
        `;

        // إضافة الأنماط
        const notificationStyles = `
            <style>
            .binance-notification {
                position: fixed;
                top: 20px;
                left: 20px;
                width: 380px;
                background: white;
                border-radius: 16px;
                box-shadow: 0 20px 60px rgba(0,0,0,0.15);
                border: 2px solid #F0B90B;
                z-index: 9999;
                transform: translateX(-100%);
                opacity: 0;
                transition: all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
                overflow: hidden;
            }

            .binance-notification.show {
                transform: translateX(0);
                opacity: 1;
            }

            .notification-content {
                padding: 0;
            }

            .notification-header {
                background: linear-gradient(135deg, #F0B90B 0%, #F3BA4C 100%);
                padding: 12px 16px;
                display: flex;
                align-items: center;
                gap: 10px;
                color: #1E1E1E;
            }

            .notification-icon img {
                width: 24px;
                height: 24px;
            }

            .notification-title {
                flex: 1;
                display: flex;
                align-items: center;
                gap: 8px;
            }

            .title-text {
                font-weight: 600;
                font-size: 14px;
            }

            .live-badge {
                background: #ef4444;
                color: white;
                font-size: 10px;
                font-weight: 600;
                padding: 2px 6px;
                border-radius: 10px;
                animation: pulse 2s infinite;
            }

            @keyframes pulse {
                0%, 100% { opacity: 1; }
                50% { opacity: 0.7; }
            }

            .close-notification {
                background: none;
                border: none;
                color: #1E1E1E;
                cursor: pointer;
                font-size: 16px;
                padding: 4px;
                border-radius: 4px;
                transition: background 0.2s ease;
            }

            .close-notification:hover {
                background: rgba(30, 30, 30, 0.1);
            }

            .notification-body {
                padding: 16px;
            }

            .user-info {
                display: flex;
                align-items: center;
                gap: 12px;
                margin-bottom: 16px;
            }

            .user-avatar {
                width: 40px;
                height: 40px;
                background: linear-gradient(135deg, #F0B90B 0%, #F3BA4C 100%);
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                color: #1E1E1E;
                font-size: 16px;
                font-weight: 600;
                border: 2px solid #fff;
                box-shadow: 0 2px 8px rgba(240, 185, 11, 0.3);
            }

            .user-details {
                flex: 1;
            }

            .user-name {
                font-weight: 600;
                color: #1f2937;
                font-size: 15px;
                margin-bottom: 2px;
            }

            .user-location {
                color: #6b7280;
                font-size: 12px;
            }

            .transaction-details {
                background: #f9fafb;
                padding: 12px;
                border-radius: 8px;
                border: 1px solid #e5e7eb;
            }

            .amount-info, .wallet-info, .package-info-notification, .time-info {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 8px;
            }

            .time-info {
                margin-bottom: 0;
                justify-content: flex-start;
                gap: 6px;
            }

            .amount-label, .wallet-label, .package-label {
                font-size: 12px;
                color: #6b7280;
            }

            .amount-value {
                font-weight: 700;
                color: #059669;
                font-size: 14px;
            }

            .wallet-address {
                font-family: monospace;
                font-size: 12px;
                color: #374151;
                background: #e5e7eb;
                padding: 2px 6px;
                border-radius: 4px;
            }

            .time-info {
                font-size: 11px;
                color: #9ca3af;
            }

            .time-info i {
                color: #6b7280;
            }

            .package-badge {
                font-size: 11px;
                font-weight: 600;
                padding: 2px 8px;
                border-radius: 12px;
                color: white;
                background: linear-gradient(135deg, #10b981, #059669);
            }

            /* إخفاء على الشاشات الصغيرة */
            @media (max-width: 768px) {
                .binance-notification {
                    left: 10px;
                    right: 10px;
                    width: auto;
                    top: 10px;
                }
            }
            </style>
        `;

        // إضافة الأنماط إذا لم تكن موجودة
        if (!document.querySelector('#binance-notification-styles')) {
            const styleElement = document.createElement('style');
            styleElement.id = 'binance-notification-styles';
            styleElement.innerHTML = notificationStyles;
            document.head.appendChild(styleElement);
        }

        document.body.appendChild(notification);

        // عرض الإشعار
        setTimeout(() => {
            notification.classList.add('show');
        }, 100);

        // إخفاء تلقائي بعد 6 ثوان
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                notification.remove();
            }, 500);
        }, 6000);
    }

    // 🔒 إغلاق الإشعار
    window.closeBinanceNotification = function(button) {
        const notification = button.closest('.binance-notification');
        if (notification) {
            notification.classList.remove('show');
            setTimeout(() => {
                notification.remove();
            }, 500);
        }
    };

    // 🎯 عرض إشعار عشوائي
    function showRandomBinanceNotification() {
        const transaction = largeBinanceTransactions[Math.floor(Math.random() * largeBinanceTransactions.length)];
        
        // تخصيص الوقت
        const times = ['2 minutes ago', '3 minutes ago', '5 minutes ago', '7 minutes ago', '4 minutes ago'];
        transaction.timeAgo = times[Math.floor(Math.random() * times.length)];
        
        // الحفاظ على المبلغ الأصلي للباقة
        
        createBinanceNotification(transaction);
    }

    // 🚀 تشغيل نظام الإشعارات
    function initializeBinanceNotifications() {
        // إشعار أول بعد 8 ثوان
        setTimeout(() => {
            showRandomBinanceNotification();
        }, 8000);

        // إشعارات دورية كل 30-60 ثانية
        setInterval(() => {
            if (Math.random() > 0.4) { // 60% احتمال
                showRandomBinanceNotification();
            }
        }, Math.random() * 30000 + 30000);
    }

    // بدء النظام
    setTimeout(initializeBinanceNotifications, 5000);
});
