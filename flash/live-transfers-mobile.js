// 🔴 Live Wallet Transfers - Mobile Floating System
// نظام الأيقونة العائمة للمعاملات المباشرة على الهواتف

document.addEventListener('DOMContentLoaded', function() {
    
    // التحقق من أن الجهاز هاتف محمول
    function isMobileDevice() {
        return window.innerWidth <= 768;
    }
    
    // إنشاء الأيقونة العائمة
    function createMobileTransfersIcon() {
        if (!isMobileDevice()) return;
        
        const icon = document.createElement('div');
        icon.className = 'live-transfers-mobile-icon';
        icon.innerHTML = `
            <i class="fas fa-exchange-alt"></i>
            <div class="transfers-count-badge">0</div>
        `;
        
        // إضافة مستمع النقر
        icon.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            toggleTransfersPopup();
        });
        
        document.body.appendChild(icon);
        return icon;
    }
    
    // إنشاء النافذة المنبثقة
    function createTransfersPopup() {
        if (!isMobileDevice()) return;
        
        const overlay = document.createElement('div');
        overlay.className = 'popup-overlay';
        overlay.addEventListener('click', closeTransfersPopup);
        
        const popup = document.createElement('div');
        popup.className = 'live-transfers-popup';
        popup.innerHTML = `
            <div class="popup-header">
                <div class="refresh-indicator">
                    <i class="fas fa-sync-alt"></i>
                </div>
                <div class="popup-title">
                    <h3>
                        <i class="fas fa-wallet"></i>
                        Live Transfers
                        <span class="live-indicator">LIVE</span>
                    </h3>
                </div>
                <button class="close-popup" onclick="closeTransfersPopup()">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="transfers-content" id="transfers-list">
                <div class="empty-transfers">
                    <i class="fas fa-exchange-alt"></i>
                    <h4>Loading Live Transfers...</h4>
                    <p>Please wait while we fetch the latest wallet transfers</p>
                </div>
            </div>
        `;
        
        document.body.appendChild(overlay);
        document.body.appendChild(popup);
        
        return { overlay, popup };
    }
    
    // الحصول على بيانات المعاملات من النظام الرئيسي
    function getTransfersData() {
        // استخدام البيانات من wallet-notifications.js إذا كانت متوفرة
        if (window.walletTransfersData) {
            return window.walletTransfersData;
        }
        
        // بيانات احتياطية
        return [
            { buyerName: 'Ahmed K.', amount: 10000, country: 'UAE', walletType: 'Binance', avatar: 'A', package: 'Enterprise' },
            { buyerName: 'Omar H.', amount: 10000, country: 'Qatar', walletType: 'Bybit', avatar: 'O', package: 'Enterprise' },
            { buyerName: 'أحمد العلي', amount: 10000, country: 'Saudi Arabia', walletType: 'Binance', avatar: 'أ', package: 'Enterprise' },
            { buyerName: 'Sarah M.', amount: 2500, country: 'Saudi Arabia', walletType: 'Trust Wallet', avatar: 'S', package: 'Pro' },
            { buyerName: 'محمد الشامي', amount: 2500, country: 'UAE', walletType: 'Trust Wallet', avatar: 'م', package: 'Pro' },
            { buyerName: 'John D.', amount: 499, country: 'USA', walletType: 'Binance', avatar: 'J', package: 'Basic' },
            { buyerName: 'علي الأحمد', amount: 499, country: 'Jordan', walletType: 'MetaMask', avatar: 'ع', package: 'Basic' }
        ];
    }
    
    // متغيرات النظام
    let mobileIcon = null;
    let transfersPopup = null;
    let popupOverlay = null;
    let isPopupOpen = false;
    let transfersCount = 0;
    let displayedTransfers = [];
    
    // تهيئة النظام
    function initializeMobileTransfers() {
        if (!isMobileDevice()) return;
        
        mobileIcon = createMobileTransfersIcon();
        const popupElements = createTransfersPopup();
        
        if (popupElements) {
            popupOverlay = popupElements.overlay;
            transfersPopup = popupElements.popup;
            console.log('Popup elements created successfully');
        } else {
            console.error('Failed to create popup elements');
        }
        
        // بدء عرض المعاملات
        startTransfersSimulation();
        
        console.log('🔴 Mobile Live Transfers System Initialized');
        
        // إضافة تأثير الموجة
        addRippleEffect();
        
        // إضافة مستمع للنقر المطول لإعادة تعيين العداد
        if (mobileIcon) {
            let longPressTimer;
            
            mobileIcon.addEventListener('touchstart', function(e) {
                longPressTimer = setTimeout(() => {
                    // إعادة تعيين العداد عند النقر المطول
                    transfersCount = 0;
                    updateTransfersCount();
                    
                    // إظهار رسالة تأكيد
                    const badge = document.querySelector('.transfers-count-badge');
                    if (badge) {
                        badge.textContent = '✓';
                        badge.style.background = '#10b981';
                        
                        setTimeout(() => {
                            badge.textContent = '0';
                            badge.style.background = '#f59e0b';
                        }, 1000);
                    }
                    
                    // تأثير اهتزاز
                    if (navigator.vibrate) {
                        navigator.vibrate(200);
                    }
                }, 2000);
            });
            
            mobileIcon.addEventListener('touchend', function() {
                clearTimeout(longPressTimer);
            });
            
            mobileIcon.addEventListener('touchcancel', function() {
                clearTimeout(longPressTimer);
            });
        }
    }
    
    // فتح/إغلاق النافذة المنبثقة
    window.toggleTransfersPopup = function() {
        console.log('Toggle popup clicked, isPopupOpen:', isPopupOpen);
        if (isPopupOpen) {
            closeTransfersPopup();
        } else {
            openTransfersPopup();
        }
    };
    
    // فتح النافذة المنبثقة
    window.openTransfersPopup = function() {
        console.log('Opening popup, elements exist:', !!transfersPopup, !!popupOverlay);
        if (!transfersPopup || !popupOverlay) {
            console.error('Popup elements not found!');
            return;
        }
        
        isPopupOpen = true;
        popupOverlay.classList.add('show');
        transfersPopup.classList.add('show');
        document.body.style.overflow = 'hidden';
        
        // إغلاق القائمة المحمولة
        const menu = document.getElementById('mobile-menu');
        if (menu) {
            menu.classList.add('hidden');
        }
        
        // تحديث المحتوى
        updateTransfersList();
        console.log('Popup opened successfully');
    };
    
    // إغلاق النافذة المنبثقة
    window.closeTransfersPopup = function() {
        if (!transfersPopup || !popupOverlay) return;
        
        isPopupOpen = false;
        popupOverlay.classList.remove('show');
        transfersPopup.classList.remove('show');
        document.body.style.overflow = 'auto';
    };
    
    // تحديث قائمة المعاملات
    function updateTransfersList() {
        const transfersList = document.getElementById('transfers-list');
        if (!transfersList) return;
        
        if (displayedTransfers.length === 0) {
            transfersList.innerHTML = `
                <div class="empty-transfers">
                    <i class="fas fa-exchange-alt"></i>
                    <h4>No Recent Transfers</h4>
                    <p>Live transfers will appear here as they happen</p>
                </div>
            `;
            return;
        }
        
        // عرض آخر 10 معاملات
        const recentTransfers = displayedTransfers.slice(-10).reverse();
        
        transfersList.innerHTML = recentTransfers.map((transfer, index) => {
            const isRecent = transfer.timeAgo && (transfer.timeAgo.includes('Just now') || transfer.timeAgo.includes('1 min'));
            const itemClass = `transfer-item ${transfer.package.toLowerCase()} ${index === 0 ? 'new' : ''} ${isRecent ? 'highlight' : ''}`;
            
            return `
            <div class="${itemClass}">
                <div class="transfer-avatar ${transfer.package.toLowerCase()}">
                    ${transfer.avatar}
                </div>
                <div class="transfer-details">
                    <div class="transfer-user" ${transfer.buyerName.match(/[\u0600-\u06FF]/) ? 'lang="ar"' : ''}>
                        ${transfer.buyerName}
                    </div>
                    <div class="transfer-info">
                        <span>📍 ${transfer.country}</span>
                        <span>•</span>
                        <span>${transfer.walletType}</span>
                        <span class="package-badge-mobile ${transfer.package.toLowerCase()}">
                            ${transfer.package}
                        </span>
                    </div>
                    <div class="transfer-amount" ${transfer.buyerName.match(/[\u0600-\u06FF]/) ? 'lang="ar"' : ''}>
                        ${transfer.amount.toLocaleString()} USDT
                    </div>
                    <div class="transfer-time ${isRecent ? 'recent' : ''}">
                        <i class="fas fa-clock"></i>
                        ${transfer.timeAgo}
                    </div>
                </div>
            </div>
            `;
        }).join('');
    }
    
    // إضافة معاملة جديدة
    function addNewTransfer(specificTransfer = null) {
        const transfersData = getTransfersData();
        const randomTransfer = specificTransfer || transfersData[Math.floor(Math.random() * transfersData.length)];
        
        // إضافة وقت عشوائي إذا لم يكن موجود
        if (!randomTransfer.timeAgo) {
            const times = ['Just now', '1 min ago', '2 min ago', '3 min ago', '4 min ago'];
            randomTransfer.timeAgo = times[Math.floor(Math.random() * times.length)];
        }
        
        // إضافة المعاملة للقائمة
        displayedTransfers.push({...randomTransfer});
        transfersCount++;
        
        // تحديث العداد
        updateTransfersCount();
        
        // تحديث القائمة إذا كانت مفتوحة
        if (isPopupOpen) {
            updateTransfersList();
        }
        
        // إبقاء آخر 50 معاملة فقط
        if (displayedTransfers.length > 50) {
            displayedTransfers = displayedTransfers.slice(-50);
        }
        
        console.log('📱 New mobile transfer added:', randomTransfer.buyerName, randomTransfer.amount);
    }
    
    // تصدير الدالة للاستخدام من النظام الرئيسي
    window.addMobileTransfer = addNewTransfer;
    
    // تحديث عداد المعاملات
    function updateTransfersCount() {
        const badge = document.querySelector('.transfers-count-badge');
        if (badge) {
            // عرض العدد بحد أقصى 99+
            const displayCount = transfersCount > 99 ? '99+' : transfersCount.toString();
            badge.textContent = displayCount;
            
            // إضافة تأثير الاهتزاز
            badge.style.animation = 'none';
            setTimeout(() => {
                badge.style.animation = 'bounce 2s infinite';
            }, 10);
        }
    }
    
    // بدء محاكاة المعاملات (فقط إذا لم يكن النظام الرئيسي يعمل)
    function startTransfersSimulation() {
        // التحقق من وجود النظام الرئيسي
        if (window.walletTransfersData) {
            console.log('📱 Mobile transfers will sync with main system');
            return; // النظام الرئيسي سيتولى إضافة المعاملات
        }
        
        console.log('📱 Starting independent mobile transfers simulation');
        
        // معاملة أولى بعد 5 ثوان
        setTimeout(() => {
            addNewTransfer();
        }, 5000);
        
        // معاملات دورية كل 15-45 ثانية
        setInterval(() => {
            if (Math.random() > 0.3) { // 70% احتمال
                addNewTransfer();
            }
        }, Math.random() * 30000 + 15000);
    }
    
    // التعامل مع تغيير حجم الشاشة
    window.addEventListener('resize', function() {
        if (!isMobileDevice() && mobileIcon) {
            // إخفاء العناصر على الشاشات الكبيرة
            mobileIcon.style.display = 'none';
            if (transfersPopup) transfersPopup.style.display = 'none';
            if (popupOverlay) popupOverlay.style.display = 'none';
            closeTransfersPopup();
        } else if (isMobileDevice() && mobileIcon) {
            // إظهار العناصر على الشاشات الصغيرة
            mobileIcon.style.display = 'flex';
            if (transfersPopup) transfersPopup.style.display = 'block';
            if (popupOverlay) popupOverlay.style.display = 'block';
        }
    });
    
    // تهيئة النظام
    setTimeout(initializeMobileTransfers, 2000);
    
    // دالة فتح القائمة المحمولة
    window.toggleMobileMenu = function() {
        const menu = document.getElementById('mobile-menu');
        if (menu) {
            menu.classList.toggle('hidden');
        }
    };
    
    // إغلاق القائمة عند النقر خارجها
    document.addEventListener('click', function(e) {
        const menu = document.getElementById('mobile-menu');
        const button = e.target.closest('button[aria-label="Toggle menu"]');
        
        if (menu && !menu.contains(e.target) && !button) {
            menu.classList.add('hidden');
        }
    });
    
    // إضافة مستمع للتحقق من حالة الشبكة
    window.addEventListener('online', function() {
        console.log('📱 Mobile transfers: Network connected');
        if (mobileIcon) {
            const connectionDot = document.querySelector('.connection-dot');
            if (connectionDot) {
                connectionDot.style.background = '#10b981';
            }
        }
    });
    
    window.addEventListener('offline', function() {
        console.log('📱 Mobile transfers: Network disconnected');
        if (mobileIcon) {
            const connectionDot = document.querySelector('.connection-dot');
            if (connectionDot) {
                connectionDot.style.background = '#ef4444';
            }
        }
    });
    
    // إضافة بعض المعاملات الأولية للاختبار
    setTimeout(() => {
        if (isMobileDevice()) {
            // إضافة 3 معاملات أولية
            for (let i = 0; i < 3; i++) {
                setTimeout(() => {
                    addNewTransfer();
                }, i * 2000);
            }
        }
    }, 8000);
    
    // إضافة مستمع لتحديث الوقت كل دقيقة
    setInterval(() => {
        if (displayedTransfers.length > 0 && isPopupOpen) {
            // تحديث أوقات المعاملات
            displayedTransfers.forEach(transfer => {
                if (transfer.timeAgo === 'Just now') {
                    transfer.timeAgo = '1 min ago';
                } else if (transfer.timeAgo === '1 min ago') {
                    transfer.timeAgo = '2 min ago';
                } else if (transfer.timeAgo === '2 min ago') {
                    transfer.timeAgo = '3 min ago';
                }
            });
            
            updateTransfersList();
        }
    }, 60000); // كل دقيقة
    
    // إضافة مؤشر تحديث الأيقونة عند وصول معاملة جديدة
    function animateIconOnNewTransfer() {
        if (mobileIcon) {
            // إضافة تأثير الدوران
            mobileIcon.classList.add('updating');
            
            setTimeout(() => {
                mobileIcon.classList.remove('updating');
            }, 1000);
            
            // إضافة تأثير المقياس
            mobileIcon.style.transform = 'scale(1.15)';
            setTimeout(() => {
                mobileIcon.style.transform = 'scale(1)';
            }, 200);
        }
    }
    
    // إضافة تأثير الموجة عند النقر
    function addRippleEffect() {
        if (mobileIcon) {
            mobileIcon.addEventListener('click', function() {
                this.classList.add('ripple');
                setTimeout(() => {
                    this.classList.remove('ripple');
                }, 600);
            });
        }
    }
    
    // تحديث دالة إضافة المعاملة لتشمل الأنيميشن
    const originalAddTransfer = addNewTransfer;
    addNewTransfer = function(specificTransfer = null) {
        originalAddTransfer(specificTransfer);
        animateIconOnNewTransfer();
        
        // إضافة اهتزاز خفيف للهاتف
        if (navigator.vibrate) {
            navigator.vibrate(50);
        }
    };
});
