// 🎯 هيدر ثانوي للأيقونات فقط
(function() {
    'use strict';
    
    // إنشاء الهيدر الثانوي
    function createSecondaryHeader() {
        const secondaryHeader = document.createElement('div');
        secondaryHeader.className = 'secondary-header';
        secondaryHeader.innerHTML = `
            <div class="secondary-header-container">
                <div class="secondary-icons-section">
                    <div class="secondary-icon" onclick="handleProfileAccess()">
                        <div class="secondary-icon-wrapper secondary-profile-icon">
                            <i class="fas fa-user-circle"></i>
                        </div>
                        <div class="secondary-badge secondary-badge-profile">NEW</div>
                    </div>
                    
                    <div class="secondary-icon" onclick="window.location.href='pages/live-transactions.html'">
                        <div class="secondary-icon-wrapper secondary-live-icon">
                            <i class="fas fa-chart-line"></i>
                        </div>
                        <div class="secondary-badge secondary-badge-live">LIVE</div>
                    </div>
                    
                    <div class="secondary-icon" onclick="window.location.href='pages/support.html'">
                        <div class="secondary-icon-wrapper secondary-support-icon">
                            <i class="fas fa-headset"></i>
                        </div>
                        <div class="secondary-badge secondary-badge-support">24/7</div>
                    </div>
                    
                    <div class="secondary-icon" onclick="handleNotifications()">
                        <div class="secondary-icon-wrapper secondary-notifications-icon">
                            <i class="fas fa-bell"></i>
                        </div>
                        <div class="secondary-badge secondary-badge-notifications">3</div>
                    </div>
                </div>
            </div>
        `;
        
        document.body.insertBefore(secondaryHeader, document.body.firstChild);
    }
    
    // وظيفة معالجة الإشعارات
    window.handleNotifications = function() {
        if (typeof advancedNotifications !== 'undefined' && advancedNotifications.openNewsPage) {
            advancedNotifications.openNewsPage();
        } else {
            window.location.href = 'pages/notifications.html';
        }
    };
    
    // إنشاء الهيدر عند تحميل الصفحة
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', createSecondaryHeader);
    } else {
        createSecondaryHeader();
    }
})();