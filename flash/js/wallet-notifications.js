// 🚨 Live Wallet Transfer Notifications System
// Real-time notifications for wallet transfers

document.addEventListener('DOMContentLoaded', function() {
    
    // 💰 Major wallet transfer transactions - Global Multi-Language Names
    const majorWalletTransfers = [
        // Enterprise Packages (10,000 USDT)
        { buyerName: 'Ahmed K.', amount: 10000, country: 'UAE', walletType: 'Binance', avatar: 'A', package: 'Enterprise' },
        { buyerName: 'Omar H.', amount: 10000, country: 'Qatar', walletType: 'Bybit', avatar: 'O', package: 'Enterprise' },
        { buyerName: 'Mohammed R.', amount: 10000, country: 'Egypt', walletType: 'Binance', avatar: 'M', package: 'Enterprise' },
        { buyerName: 'John S.', amount: 10000, country: 'USA', walletType: 'Trust Wallet', avatar: 'J', package: 'Enterprise' },
        { buyerName: 'Hans M.', amount: 10000, country: 'Germany', walletType: 'MetaMask', avatar: 'H', package: 'Enterprise' },
        { buyerName: 'Marie D.', amount: 10000, country: 'France', walletType: 'Binance', avatar: 'M', package: 'Enterprise' },
        { buyerName: 'Arjun M.', amount: 10000, country: 'India', walletType: 'Bybit', avatar: 'A', package: 'Enterprise' },
        { buyerName: 'Sarah C.', amount: 10000, country: 'Israel', walletType: 'Trust Wallet', avatar: 'S', package: 'Enterprise' },
        { buyerName: 'Diego L.', amount: 10000, country: 'Spain', walletType: 'MetaMask', avatar: 'D', package: 'Enterprise' },
        { buyerName: 'Dimitri S.', amount: 10000, country: 'Russia', walletType: 'Binance', avatar: 'D', package: 'Enterprise' },
        { buyerName: 'Ming Z.', amount: 10000, country: 'China', walletType: 'Bybit', avatar: 'M', package: 'Enterprise' },
        { buyerName: 'Hiroshi M.', amount: 10000, country: 'Japan', walletType: 'Trust Wallet', avatar: 'H', package: 'Enterprise' },
        { buyerName: 'Jessica W.', amount: 10000, country: 'USA', walletType: 'MetaMask', avatar: 'J', package: 'Enterprise' },
        { buyerName: 'Jennifer H.', amount: 10000, country: 'Canada', walletType: 'Binance', avatar: 'J', package: 'Enterprise' },
        { buyerName: 'Olivia M.', amount: 10000, country: 'Australia', walletType: 'Trust Wallet', avatar: 'O', package: 'Enterprise' },
        
        // Pro Packages (2,500 USDT)
        { buyerName: 'Sarah M.', amount: 2500, country: 'Saudi Arabia', walletType: 'Trust Wallet', avatar: 'S', package: 'Pro' },
        { buyerName: 'Fatima A.', amount: 2500, country: 'Kuwait', walletType: 'MetaMask', avatar: 'F', package: 'Pro' },
        { buyerName: 'Fahad N.', amount: 2500, country: 'Saudi Arabia', walletType: 'Binance', avatar: 'F', package: 'Pro' },
        { buyerName: 'Layla T.', amount: 2500, country: 'Jordan', walletType: 'Bybit', avatar: 'L', package: 'Pro' },
        { buyerName: 'Rachid M.', amount: 2500, country: 'Morocco', walletType: 'Trust Wallet', avatar: 'R', package: 'Pro' },
        { buyerName: 'Rajesh K.', amount: 2500, country: 'India', walletType: 'MetaMask', avatar: 'R', package: 'Pro' },
        { buyerName: 'Deepika R.', amount: 2500, country: 'India', walletType: 'Binance', avatar: 'D', package: 'Pro' },
        { buyerName: 'David L.', amount: 2500, country: 'Israel', walletType: 'Bybit', avatar: 'D', package: 'Pro' },
        { buyerName: 'Michal K.', amount: 2500, country: 'Israel', walletType: 'Trust Wallet', avatar: 'M', package: 'Pro' },
        { buyerName: 'Pierre L.', amount: 2500, country: 'France', walletType: 'MetaMask', avatar: 'P', package: 'Pro' },
        { buyerName: 'Sophie M.', amount: 2500, country: 'France', walletType: 'Binance', avatar: 'S', package: 'Pro' },
        { buyerName: 'Michael R.', amount: 2500, country: 'USA', walletType: 'Bybit', avatar: 'M', package: 'Pro' },
        { buyerName: 'Ingrid S.', amount: 2500, country: 'Germany', walletType: 'Trust Wallet', avatar: 'I', package: 'Pro' },
        { buyerName: 'Greta W.', amount: 2500, country: 'Germany', walletType: 'MetaMask', avatar: 'G', package: 'Pro' },
        { buyerName: 'Carlos R.', amount: 2500, country: 'Spain', walletType: 'Binance', avatar: 'C', package: 'Pro' },
        { buyerName: 'Vladimir P.', amount: 2500, country: 'Russia', walletType: 'Bybit', avatar: 'V', package: 'Pro' },
        { buyerName: 'Wei L.', amount: 2500, country: 'China', walletType: 'Trust Wallet', avatar: 'W', package: 'Pro' },
        { buyerName: 'Takeshi Y.', amount: 2500, country: 'Japan', walletType: 'MetaMask', avatar: 'T', package: 'Pro' },
        { buyerName: 'Jin W.', amount: 2500, country: 'South Korea', walletType: 'Binance', avatar: 'J', package: 'Pro' },
        { buyerName: 'James B.', amount: 2500, country: 'UK', walletType: 'Bybit', avatar: 'J', package: 'Pro' },
        { buyerName: 'Jackson P.', amount: 2500, country: 'Australia', walletType: 'Trust Wallet', avatar: 'J', package: 'Pro' },
        { buyerName: 'Giulia F.', amount: 2500, country: 'Italy', walletType: 'MetaMask', avatar: 'G', package: 'Pro' },
        { buyerName: 'Carlos S.', amount: 2500, country: 'Brazil', walletType: 'Binance', avatar: 'C', package: 'Pro' },
        
        // Arabic Names - Major Transactions (الأسماء العربية - المعاملات الكبيرة)
        // Enterprise Packages (10,000 USDT)
        { buyerName: 'أحمد العلي', amount: 10000, country: 'Saudi Arabia', walletType: 'Binance', avatar: 'أ', package: 'Enterprise' },
        { buyerName: 'خالد النصار', amount: 10000, country: 'Kuwait', walletType: 'Bybit', avatar: 'خ', package: 'Enterprise' },
        { buyerName: 'إبراهيم الخوري', amount: 10000, country: 'Lebanon', walletType: 'MetaMask', avatar: 'إ', package: 'Enterprise' },
        { buyerName: 'سلطان العتيبي', amount: 10000, country: 'Qatar', walletType: 'Trust Wallet', avatar: 'س', package: 'Enterprise' },
        { buyerName: 'طارق الحريري', amount: 10000, country: 'Lebanon', walletType: 'Binance', avatar: 'ط', package: 'Enterprise' },
        { buyerName: 'جاسم الثاني', amount: 10000, country: 'Qatar', walletType: 'Bybit', avatar: 'ج', package: 'Enterprise' },
        { buyerName: 'خديجة القطرية', amount: 10000, country: 'Qatar', walletType: 'MetaMask', avatar: 'خ', package: 'Enterprise' },
        { buyerName: 'سارة اللبنانية', amount: 10000, country: 'Lebanon', walletType: 'Trust Wallet', avatar: 'س', package: 'Enterprise' },
        { buyerName: 'رقية القطرية', amount: 10000, country: 'Qatar', walletType: 'Binance', avatar: 'ر', package: 'Enterprise' },
        { buyerName: 'ياسمين اللبنانية', amount: 10000, country: 'Lebanon', walletType: 'Bybit', avatar: 'ي', package: 'Enterprise' },
        { buyerName: 'منى القطرية', amount: 10000, country: 'Qatar', walletType: 'MetaMask', avatar: 'م', package: 'Enterprise' },
        
        // Pro Packages (2,500 USDT)
        { buyerName: 'محمد الشامي', amount: 2500, country: 'UAE', walletType: 'Trust Wallet', avatar: 'م', package: 'Pro' },
        { buyerName: 'عبدالله محمد', amount: 2500, country: 'Egypt', walletType: 'Binance', avatar: 'ع', package: 'Pro' },
        { buyerName: 'عبدالرحمن بن علي', amount: 2500, country: 'Morocco', walletType: 'Bybit', avatar: 'ع', package: 'Pro' },
        { buyerName: 'ناصر القحطاني', amount: 2500, country: 'Saudi Arabia', walletType: 'MetaMask', avatar: 'ن', package: 'Pro' },
        { buyerName: 'حسام الدين', amount: 2500, country: 'Egypt', walletType: 'Trust Wallet', avatar: 'ح', package: 'Pro' },
        { buyerName: 'رشيد المغربي', amount: 2500, country: 'Morocco', walletType: 'Binance', avatar: 'ر', package: 'Pro' },
        { buyerName: 'عادل الغامدي', amount: 2500, country: 'Saudi Arabia', walletType: 'Bybit', avatar: 'ع', package: 'Pro' },
        { buyerName: 'فاطمة الزهراء', amount: 2500, country: 'Saudi Arabia', walletType: 'MetaMask', avatar: 'ف', package: 'Pro' },
        { buyerName: 'زينب الصباح', amount: 2500, country: 'Kuwait', walletType: 'Trust Wallet', avatar: 'ز', package: 'Pro' },
        { buyerName: 'نور الدين', amount: 2500, country: 'Jordan', walletType: 'Binance', avatar: 'ن', package: 'Pro' },
        { buyerName: 'أميرة الإماراتية', amount: 2500, country: 'UAE', walletType: 'Bybit', avatar: 'أ', package: 'Pro' },
        { buyerName: 'حفصة الكويتية', amount: 2500, country: 'Kuwait', walletType: 'MetaMask', avatar: 'ح', package: 'Pro' },
        { buyerName: 'دعاء الأردنية', amount: 2500, country: 'Jordan', walletType: 'Trust Wallet', avatar: 'د', package: 'Pro' },
        { buyerName: 'شيماء الإماراتية', amount: 2500, country: 'UAE', walletType: 'Binance', avatar: 'ش', package: 'Pro' },
        { buyerName: 'إيمان الكويتية', amount: 2500, country: 'Kuwait', walletType: 'Bybit', avatar: 'إ', package: 'Pro' }
    ];

    // 🔔 Create wallet transfer notification
    function createWalletNotification(transfer) {
        // إشعار النظام المحمول إذا كان الجهاز هاتف
        if (window.addMobileTransfer && window.innerWidth <= 768) {
            window.addMobileTransfer(transfer);
        }
        const notification = document.createElement('div');
        notification.className = 'wallet-notification';
        notification.innerHTML = `
            <div class="notification-content">
                <div class="notification-header">
                    <div class="notification-icon">
                        <i class="fas fa-wallet"></i>
                    </div>
                    <div class="notification-title">
                        <span class="title-text">Wallet Transfer Completed</span>
                        <span class="live-badge">LIVE</span>
                    </div>
                    <button class="close-notification" onclick="closeWalletNotification(this)">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                
                <div class="notification-body">
                    <div class="user-info">
                        <div class="user-avatar">${transfer.avatar}</div>
                        <div class="user-details">
                            <div class="user-name" ${transfer.buyerName.match(/[\u0600-\u06FF]/) ? 'lang="ar"' : ''}>${transfer.buyerName}</div>
                            <div class="user-location">📍 ${transfer.country}</div>
                        </div>
                    </div>
                    
                    <div class="transfer-details">
                        <div class="amount-info">
                            <span class="amount-label">Amount Purchased:</span>
                            <span class="amount-value">${transfer.amount.toLocaleString()} USDT</span>
                        </div>
                        <div class="wallet-info">
                            <span class="wallet-label">Transferred to:</span>
                            <div class="wallet-display">
                                <span class="wallet-name-notification">${transfer.walletType}</span>
                                <div class="notification-wallet-logo ${transfer.walletType.toLowerCase().replace(' wallet', '').replace(' ', '')}"></div>
                            </div>
                        </div>
                        <div class="package-info-notification">
                            <span class="package-label">Package:</span>
                            <span class="package-badge package-${transfer.package.toLowerCase()}">${transfer.package}</span>
                        </div>
                        <div class="time-info">
                            <i class="fas fa-clock"></i>
                            <span>${transfer.timeAgo}</span>
                        </div>
                    </div>
                </div>
            </div>
        `;

        // Add styles
        const notificationStyles = `
            <style>
            .wallet-notification {
                position: fixed;
                top: 20px;
                left: 20px;
                width: 380px;
                background: white;
                border-radius: 16px;
                box-shadow: 0 20px 60px rgba(0,0,0,0.15);
                border: 2px solid #10b981;
                z-index: 9999;
                transform: translateX(-100%);
                opacity: 0;
                transition: all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
                overflow: hidden;
            }

            .wallet-notification.show {
                transform: translateX(0);
                opacity: 1;
            }

            .notification-content {
                padding: 0;
            }

            .notification-header {
                background: linear-gradient(135deg, #10b981 0%, #047857 100%);
                padding: 12px 16px;
                display: flex;
                align-items: center;
                gap: 10px;
                color: white;
            }

            .notification-icon i {
                font-size: 20px;
                color: white;
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
                color: white;
                cursor: pointer;
                font-size: 16px;
                padding: 4px;
                border-radius: 4px;
                transition: background 0.2s ease;
            }

            .close-notification:hover {
                background: rgba(255, 255, 255, 0.2);
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
                background: linear-gradient(135deg, #10b981 0%, #047857 100%);
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                color: white;
                font-size: 16px;
                font-weight: 600;
                border: 2px solid #fff;
                box-shadow: 0 2px 8px rgba(16, 185, 129, 0.3);
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

            .transfer-details {
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

            .wallet-display {
                display: flex;
                align-items: center;
                gap: 8px;
            }

            .wallet-name-notification {
                font-size: 12px;
                color: #374151;
                background: #e5e7eb;
                padding: 2px 8px;
                border-radius: 6px;
                font-weight: 600;
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
                text-transform: uppercase;
                letter-spacing: 0.5px;
            }

            .package-badge.package-basic {
                background: linear-gradient(135deg, #3b82f6, #1e40af);
            }

            .package-badge.package-pro {
                background: linear-gradient(135deg, #10b981, #047857);
            }

            .package-badge.package-enterprise {
                background: linear-gradient(135deg, #7c3aed, #5b21b6);
            }

            /* إخفاء على الشاشات الصغيرة */
            @media (max-width: 768px) {
                .wallet-notification {
                    left: 10px;
                    right: 10px;
                    width: auto;
                    top: 10px;
                }
            }
            </style>
        `;

        // Add styles if not exists
        if (!document.querySelector('#wallet-notification-styles')) {
            const styleElement = document.createElement('style');
            styleElement.id = 'wallet-notification-styles';
            styleElement.innerHTML = notificationStyles;
            document.head.appendChild(styleElement);
        }

        document.body.appendChild(notification);

        // Show notification
        setTimeout(() => {
            notification.classList.add('show');
        }, 100);

        // Auto hide after 6 seconds
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                notification.remove();
            }, 500);
        }, 6000);
    }

    // 🔒 Close notification
    window.closeWalletNotification = function(button) {
        const notification = button.closest('.wallet-notification');
        if (notification) {
            notification.classList.remove('show');
            setTimeout(() => {
                notification.remove();
            }, 500);
        }
    };

    // 🎯 Show random wallet notification
    function showRandomWalletNotification() {
        const transfer = majorWalletTransfers[Math.floor(Math.random() * majorWalletTransfers.length)];
        
        // Customize time
        const times = ['2 minutes ago', '3 minutes ago', '5 minutes ago', '7 minutes ago', '4 minutes ago'];
        transfer.timeAgo = times[Math.floor(Math.random() * times.length)];
        
        createWalletNotification(transfer);
    }

    // 🚀 Initialize wallet notifications system
    function initializeWalletNotifications() {
        // First notification after 12 seconds
        setTimeout(() => {
            showRandomWalletNotification();
        }, 12000);

        // Periodic notifications every 40-70 seconds
        setInterval(() => {
            if (Math.random() > 0.3) { // 70% chance
                showRandomWalletNotification();
                
                // إشعار النظام المحمول أيضاً
                if (window.addMobileTransfer && window.innerWidth <= 768) {
                    window.addMobileTransfer();
                }
            }
        }, Math.random() * 30000 + 40000);
    }

    // Start system
    setTimeout(initializeWalletNotifications, 7000);
    
    // تصدير البيانات للنظام المحمول
    window.walletTransfersData = majorWalletTransfers;
});