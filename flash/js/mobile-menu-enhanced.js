// نظام محسن للقائمة المنسدلة على الهواتف
(function() {
    'use strict';
    
    let isMenuOpen = false;
    let menuButton = null;
    let mobileMenu = null;
    
    // تهيئة القائمة المنسدلة
    function initEnhancedMobileMenu() {
        // البحث عن العناصر
        menuButton = document.getElementById('mobileMenuBtn');
        mobileMenu = document.getElementById('mobileMenu');
        
        if (!menuButton || !mobileMenu) {
            console.log('Mobile menu elements not found, retrying in 500ms...');
            setTimeout(initEnhancedMobileMenu, 500);
            return;
        }
        
        console.log('Enhanced mobile menu initializing...');
        
        // إعداد الزر
        setupMenuButton();
        
        // إعداد القائمة
        setupMobileMenu();
        
        // إعداد الأحداث
        setupEventListeners();
        
        console.log('Enhanced mobile menu initialized successfully');
    }
    
    // إعداد زر القائمة
    function setupMenuButton() {
        // إضافة خصائص اللمس
        menuButton.style.touchAction = 'manipulation';
        menuButton.style.userSelect = 'none';
        menuButton.style.webkitUserSelect = 'none';
        menuButton.style.webkitTapHighlightColor = 'transparent';
        
        // التأكد من الرؤية
        menuButton.style.position = 'relative';
        menuButton.style.zIndex = '99999';
        menuButton.style.cursor = 'pointer';
        
        // إضافة تأثيرات بصرية
        menuButton.addEventListener('touchstart', function() {
            this.style.transform = 'scale(0.95)';
        });
        
        menuButton.addEventListener('touchend', function() {
            this.style.transform = 'scale(1)';
        });
    }
    
    // إعداد القائمة المنسدلة
    function setupMobileMenu() {
        // التأكد من الموضع الصحيح
        mobileMenu.style.position = 'absolute';
        mobileMenu.style.zIndex = '99998';
        
        // إعداد الحالة الأولية
        if (!mobileMenu.classList.contains('opacity-0')) {
            mobileMenu.classList.add('opacity-0', 'invisible', 'scale-95');
        }
        
        // إضافة تأثيرات الانتقال
        mobileMenu.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
    }
    
    // إعداد مستمعي الأحداث
    function setupEventListeners() {
        // النقر على الزر
        menuButton.addEventListener('click', handleMenuToggle);
        menuButton.addEventListener('touchstart', handleMenuToggle);
        
        // النقر خارج القائمة
        document.addEventListener('click', handleOutsideClick);
        document.addEventListener('touchstart', handleOutsideClick);
        
        // مفتاح الهروب
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && isMenuOpen) {
                closeMenu();
            }
        });
        
        // تغيير حجم الشاشة
        window.addEventListener('resize', function() {
            if (window.innerWidth > 768 && isMenuOpen) {
                closeMenu();
            }
        });
        
        // إعداد روابط القائمة
        const menuLinks = mobileMenu.querySelectorAll('button');
        menuLinks.forEach(link => {
            link.addEventListener('click', function() {
                setTimeout(closeMenu, 150);
            });
        });
    }
    
    // التبديل بين فتح وإغلاق القائمة
    function handleMenuToggle(e) {
        e.preventDefault();
        e.stopPropagation();
        
        if (isMenuOpen) {
            closeMenu();
        } else {
            openMenu();
        }
    }
    
    // فتح القائمة
    function openMenu() {
        if (isMenuOpen) return;
        
        isMenuOpen = true;
        
        // تحديث الأيقونة
        const icon = menuButton.querySelector('i');
        if (icon) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        }
        
        // إظهار القائمة
        mobileMenu.classList.remove('opacity-0', 'invisible', 'scale-95');
        mobileMenu.classList.add('opacity-100', 'visible', 'scale-100');
        
        // منع التمرير
        document.body.style.overflow = 'hidden';
        
        console.log('Mobile menu opened');
    }
    
    // إغلاق القائمة
    function closeMenu() {
        if (!isMenuOpen) return;
        
        isMenuOpen = false;
        
        // تحديث الأيقونة
        const icon = menuButton.querySelector('i');
        if (icon) {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
        
        // إخفاء القائمة
        mobileMenu.classList.remove('opacity-100', 'visible', 'scale-100');
        mobileMenu.classList.add('opacity-0', 'invisible', 'scale-95');
        
        // السماح بالتمرير
        document.body.style.overflow = '';
        
        console.log('Mobile menu closed');
    }
    
    // التعامل مع النقر خارج القائمة
    function handleOutsideClick(e) {
        if (!isMenuOpen) return;
        
        if (!menuButton.contains(e.target) && !mobileMenu.contains(e.target)) {
            closeMenu();
        }
    }
    
    // وظيفة عامة للتبديل (للاستخدام الخارجي)
    window.toggleMobileMenu = function() {
        if (isMenuOpen) {
            closeMenu();
        } else {
            openMenu();
        }
    };
    
    // وظائف عامة للتحكم
    window.openMobileMenu = openMenu;
    window.closeMobileMenu = closeMenu;
    
    // بدء التهيئة
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initEnhancedMobileMenu);
    } else {
        initEnhancedMobileMenu();
    }
    
    // إعادة التهيئة عند الحاجة
    window.addEventListener('load', function() {
        setTimeout(initEnhancedMobileMenu, 1000);
    });
    
})();

// إصلاح إضافي للتأكد من عمل القائمة على جميع الأجهزة
document.addEventListener('DOMContentLoaded', function() {
    // التحقق من وجود العناصر كل ثانية لأول 10 ثوان
    let checkCount = 0;
    const maxChecks = 10;
    
    const checkInterval = setInterval(function() {
        const btn = document.getElementById('mobileMenuBtn');
        const menu = document.getElementById('mobileMenu');
        
        if (btn && menu) {
            // التأكد من أن الزر يعمل
            if (!btn.onclick && !btn.hasAttribute('data-enhanced')) {
                btn.setAttribute('data-enhanced', 'true');
                
                btn.addEventListener('click', function(e) {
                    e.preventDefault();
                    e.stopPropagation();
                    
                    const isOpen = menu.classList.contains('opacity-100');
                    
                    if (isOpen) {
                        menu.classList.remove('opacity-100', 'visible', 'scale-100');
                        menu.classList.add('opacity-0', 'invisible', 'scale-95');
                        this.querySelector('i').classList.replace('fa-times', 'fa-bars');
                    } else {
                        menu.classList.remove('opacity-0', 'invisible', 'scale-95');
                        menu.classList.add('opacity-100', 'visible', 'scale-100');
                        this.querySelector('i').classList.replace('fa-bars', 'fa-times');
                    }
                });
                
                console.log('Mobile menu button enhanced successfully');
            }
            
            clearInterval(checkInterval);
        }
        
        checkCount++;
        if (checkCount >= maxChecks) {
            clearInterval(checkInterval);
        }
    }, 1000);
});