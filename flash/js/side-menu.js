/* 📱 Side Menu Functionality */
/* وظائف القائمة الجانبية */

// فتح/إغلاق القائمة الجانبية
function toggleSideMenu() {
    const sideMenu = document.getElementById('side-menu');
    const overlay = document.getElementById('menu-overlay');
    const securityBadge = document.getElementById('security-badge');
    const isMobile = window.innerWidth <= 768;
    
    if (sideMenu.classList.contains('open')) {
        // إغلاق القائمة
        sideMenu.classList.remove('open');
        // overlay.classList.remove('show');
        
        if (isMobile) {
            preventBackgroundScroll(false);
        } else {
            document.body.style.overflow = 'auto';
        }
        
        // إخفاء شارة الأمان
        if (securityBadge) {
            securityBadge.style.display = 'none';
        }
    } else {
        // فتح القائمة
        sideMenu.classList.add('open');
        // overlay.classList.add('show');
        
        if (isMobile) {
            preventBackgroundScroll(true);
        } else {
            document.body.style.overflow = 'hidden';
        }
        
        // إظهار شارة الأمان بعد تأخير قصير
        if (securityBadge) {
            setTimeout(() => {
                securityBadge.style.display = 'flex';
            }, isMobile ? 300 : 500);
        }
        
        // إضافة تأثير صوتي (اختياري)
        playSecuritySound();
    }
}

// تشغيل صوت الأمان (اختياري)
function playSecuritySound() {
    // يمكن إضافة صوت تأكيد هنا إذا رغبت
    console.log('🔒 TETHER Security Mode Activated');
}

// تغيير اللغة من القائمة الجانبية
function changeLanguage(language) {
    document.body.classList.add('language-switching');
    
    setTimeout(() => {
        applyLanguage(language);
        currentLanguage = language;
        localStorage.setItem('siteLanguage', language);
        showLanguageNotification(language);
        document.body.classList.remove('language-switching');
        
        // إغلاق القائمة بعد تغيير اللغة
        toggleSideMenu();
    }, 300);
}

// إغلاق القائمة عند الضغط على Escape
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        const sideMenu = document.getElementById('side-menu');
        if (sideMenu.classList.contains('open')) {
            toggleSideMenu();
        }
    }
});

// منع إغلاق القائمة عند النقر داخلها
document.getElementById('side-menu').addEventListener('click', function(e) {
    e.stopPropagation();
});

// إضافة تأثيرات بصرية عند فتح القائمة
function addVisualEffects() {
    const sideMenu = document.getElementById('side-menu');
    if (!sideMenu) return;
    
    // إضافة تأثير الظهور التدريجي للعناصر
    const elements = sideMenu.querySelectorAll('.tether-security-section, .official-links, .license-info, .menu-section');
    elements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateX(20px)';
        element.style.transition = 'all 0.5s ease';
        
        setTimeout(() => {
            element.style.opacity = '1';
            element.style.transform = 'translateX(0)';
        }, (index + 1) * 200);
    });
}

// إضافة مؤشر الحالة المباشرة
function addLiveStatusIndicator() {
    const badge = document.querySelector('.tether-official-badge');
    if (badge) {
        const statusDot = document.createElement('div');
        statusDot.style.cssText = `
            width: 8px;
            height: 8px;
            background: #10b981;
            border-radius: 50%;
            margin-left: 8px;
            animation: pulse 2s infinite;
            box-shadow: 0 0 10px #10b981;
        `;
        badge.appendChild(statusDot);
    }
}

// تحديث معلومات الترخيص بشكل ديناميكي
function updateLicenseInfo() {
    const licenseNumber = document.querySelector('.license-number');
    if (licenseNumber) {
        const currentYear = new Date().getFullYear();
        const randomId = Math.floor(Math.random() * 999) + 1;
        licenseNumber.textContent = `TOL-${currentYear}-USDT-FLASH-${randomId.toString().padStart(3, '0')}`;
    }
}

// إضافة عداد المستخدمين النشطين
function addActiveUsersCounter() {
    const securitySection = document.querySelector('.tether-security-section');
    if (securitySection) {
        const counter = document.createElement('div');
        const isMobile = window.innerWidth <= 768;
        
        counter.style.cssText = `
            text-align: center;
            margin-top: ${isMobile ? '8px' : '10px'};
            padding: ${isMobile ? '6px' : '8px'};
            background: rgba(255, 255, 255, 0.1);
            border-radius: ${isMobile ? '6px' : '8px'};
            border: 1px solid rgba(38, 161, 123, 0.3);
        `;
        
        const activeUsers = Math.floor(Math.random() * 500) + 1200;
        const fontSize1 = isMobile ? '10px' : '12px';
        const fontSize2 = isMobile ? '12px' : '14px';
        
        counter.innerHTML = `
            <div style="color: #26a17b; font-size: ${fontSize1}; font-weight: 700; margin-bottom: 4px;">
                <i class="fas fa-users"></i> ACTIVE NOW
            </div>
            <div style="color: #e2e8f0; font-size: ${fontSize2}; font-weight: 800; font-family: monospace;">
                ${activeUsers.toLocaleString()} USERS
            </div>
        `;
        
        securitySection.appendChild(counter);
        
        // تحديث العدد كل 30 ثانية
        setInterval(() => {
            const newCount = Math.floor(Math.random() * 500) + 1200;
            const countElement = counter.querySelector('div:last-child');
            if (countElement) {
                countElement.textContent = `${newCount.toLocaleString()} USERS`;
            }
        }, 30000);
    }
}

// تحسين للهاتف المحمول
function optimizeForMobile() {
    const isMobile = window.innerWidth <= 768;
    
    if (isMobile) {
        // تحسين اللمس للهاتف المحمول
        const touchElements = document.querySelectorAll('.nav-option, .language-option, .auth-option, .official-link');
        touchElements.forEach(element => {
            element.style.minHeight = '44px'; // حد أدنى للمس
            element.style.display = 'flex';
            element.style.alignItems = 'center';
        });
        
        // تحسين المسافات للشاشات الصغيرة
        const sections = document.querySelectorAll('.menu-section');
        sections.forEach(section => {
            section.style.marginBottom = '20px';
        });
    }
}

// منع التمرير في الخلفية عند فتح القائمة على الهاتف
function preventBackgroundScroll(prevent) {
    if (window.innerWidth <= 768) {
        if (prevent) {
            document.body.style.position = 'fixed';
            document.body.style.top = `-${window.scrollY}px`;
            document.body.style.width = '100%';
        } else {
            const scrollY = document.body.style.top;
            document.body.style.position = '';
            document.body.style.top = '';
            document.body.style.width = '';
            window.scrollTo(0, parseInt(scrollY || '0') * -1);
        }
    }
}

// تشغيل جميع التحسينات عند فتح القائمة
document.addEventListener('DOMContentLoaded', function() {
    const sideMenu = document.getElementById('side-menu');
    if (sideMenu) {
        const observer = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                    if (sideMenu.classList.contains('open')) {
                        setTimeout(() => {
                            addVisualEffects();
                            addLiveStatusIndicator();
                            updateLicenseInfo();
                            addActiveUsersCounter();
                            optimizeForMobile();
                        }, 100);
                        preventBackgroundScroll(true);
                    } else {
                        preventBackgroundScroll(false);
                    }
                }
            });
        });
        
        observer.observe(sideMenu, {
            attributes: true,
            attributeFilter: ['class']
        });
    }
    
    // تحسين عند تغيير حجم الشاشة
    window.addEventListener('resize', optimizeForMobile);
});

// تصدير الوظائف
window.toggleSideMenu = toggleSideMenu;
window.changeLanguage = changeLanguage;
