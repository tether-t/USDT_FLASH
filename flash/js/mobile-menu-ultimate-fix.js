// الحل النهائي لمشكلة القائمة المنسدلة على الهواتف
(function() {
    'use strict';
    
    // متغيرات عامة
    let menuInitialized = false;
    let touchStartY = 0;
    let touchStartX = 0;
    
    // تهيئة شاملة للقائمة
    function ultimateMobileMenuFix() {
        if (menuInitialized) return;
        
        console.log('🔧 Starting ultimate mobile menu fix...');
        
        // البحث عن العناصر مع محاولات متعددة
        findAndFixMenuElements();
        
        // إضافة CSS ديناميكي
        addDynamicCSS();
        
        // إعداد أحداث اللمس المتقدمة
        setupAdvancedTouchEvents();
        
        // مراقبة التغييرات في DOM
        observeDOMChanges();
        
        menuInitialized = true;
        console.log('✅ Ultimate mobile menu fix completed');
    }
    
    // البحث عن العناصر وإصلاحها
    function findAndFixMenuElements() {
        const attempts = 5;
        let currentAttempt = 0;
        
        function attemptFix() {
            const btn = document.getElementById('mobileMenuBtn');
            const menu = document.getElementById('mobileMenu');
            
            if (btn && menu) {
                console.log('📱 Mobile menu elements found, applying fixes...');
                applyUltimateFixes(btn, menu);
                return true;
            }
            
            currentAttempt++;
            if (currentAttempt < attempts) {
                console.log(`🔍 Attempt ${currentAttempt}/${attempts} - Elements not found, retrying...`);
                setTimeout(attemptFix, 200 * currentAttempt);
            } else {
                console.warn('⚠️ Mobile menu elements not found after all attempts');
            }
            
            return false;
        }
        
        attemptFix();
    }
    
    // تطبيق الإصلاحات النهائية
    function applyUltimateFixes(btn, menu) {
        // إصلاح الزر
        fixMenuButton(btn);
        
        // إصلاح القائمة
        fixMobileMenu(menu);
        
        // إضافة أحداث متقدمة
        addAdvancedEventListeners(btn, menu);
        
        // إضافة وظائف مساعدة
        addHelperFunctions(btn, menu);
    }
    
    // إصلاح زر القائمة
    function fixMenuButton(btn) {
        // خصائص أساسية
        const buttonStyles = {
            position: 'relative',
            zIndex: '99999',
            cursor: 'pointer',
            touchAction: 'manipulation',
            userSelect: 'none',
            webkitUserSelect: 'none',
            webkitTapHighlightColor: 'transparent',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            minWidth: '48px',
            minHeight: '48px',
            borderRadius: '12px',
            transition: 'all 0.2s ease'
        };
        
        Object.assign(btn.style, buttonStyles);
        
        // إضافة خصائص إضافية
        btn.setAttribute('role', 'button');
        btn.setAttribute('aria-label', 'Toggle mobile menu');
        btn.setAttribute('aria-expanded', 'false');
        
        console.log('🔘 Menu button fixed');
    }
    
    // إصلاح القائمة المنسدلة
    function fixMobileMenu(menu) {
        // خصائص أساسية
        const menuStyles = {
            position: 'absolute',
            top: 'calc(100% + 12px)',
            left: '0',
            right: 'auto',
            width: '280px',
            maxWidth: 'calc(100vw - 32px)',
            zIndex: '99998',
            transformOrigin: 'top left',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            overflow: 'hidden',
            borderRadius: '16px',
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5), 0 8px 32px rgba(0, 0, 0, 0.3)',
            backdropFilter: 'blur(20px)',
            webkitBackdropFilter: 'blur(20px)'
        };
        
        Object.assign(menu.style, menuStyles);
        
        // التأكد من الحالة الأولية
        if (!menu.classList.contains('opacity-0')) {
            menu.classList.add('opacity-0', 'invisible', 'scale-95');
        }
        
        console.log('📋 Mobile menu fixed');
    }
    
    // إضافة أحداث متقدمة
    function addAdvancedEventListeners(btn, menu) {
        // إزالة أي أحداث موجودة
        const newBtn = btn.cloneNode(true);
        btn.parentNode.replaceChild(newBtn, btn);
        
        // أحداث النقر
        newBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            toggleMenu(newBtn, menu);
        });
        
        // أحداث اللمس
        newBtn.addEventListener('touchstart', function(e) {
            e.preventDefault();
            touchStartX = e.touches[0].clientX;
            touchStartY = e.touches[0].clientY;
            this.style.transform = 'scale(0.95)';
        });
        
        newBtn.addEventListener('touchend', function(e) {
            e.preventDefault();
            this.style.transform = 'scale(1)';
            
            // التحقق من أن اللمس لم يتحرك كثيراً
            const touch = e.changedTouches[0];
            const deltaX = Math.abs(touch.clientX - touchStartX);
            const deltaY = Math.abs(touch.clientY - touchStartY);
            
            if (deltaX < 10 && deltaY < 10) {
                toggleMenu(newBtn, menu);
            }
        });
        
        // أحداث لوحة المفاتيح
        newBtn.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggleMenu(newBtn, menu);
            }
        });
        
        // النقر خارج القائمة
        document.addEventListener('click', function(e) {
            if (!newBtn.contains(e.target) && !menu.contains(e.target)) {
                closeMenu(newBtn, menu);
            }
        });
        
        // مفتاح الهروب
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                closeMenu(newBtn, menu);
            }
        });
        
        console.log('🎯 Advanced event listeners added');
    }
    
    // وظائف مساعدة
    function addHelperFunctions(btn, menu) {
        // وظيفة التبديل
        window.toggleMobileMenu = function() {
            toggleMenu(btn, menu);
        };
        
        // وظيفة الفتح
        window.openMobileMenu = function() {
            openMenu(btn, menu);
        };
        
        // وظيفة الإغلاق
        window.closeMobileMenu = function() {
            closeMenu(btn, menu);
        };
    }
    
    // تبديل حالة القائمة
    function toggleMenu(btn, menu) {
        const isOpen = menu.classList.contains('opacity-100');
        
        if (isOpen) {
            closeMenu(btn, menu);
        } else {
            openMenu(btn, menu);
        }
    }
    
    // فتح القائمة
    function openMenu(btn, menu) {
        // تحديث الأيقونة
        const icon = btn.querySelector('i');
        if (icon) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        }
        
        // إظهار القائمة
        menu.classList.remove('opacity-0', 'invisible', 'scale-95');
        menu.classList.add('opacity-100', 'visible', 'scale-100');
        
        // تحديث خصائص الوصول
        btn.setAttribute('aria-expanded', 'true');
        
        // منع التمرير
        document.body.style.overflow = 'hidden';
        
        console.log('📂 Menu opened');
    }
    
    // إغلاق القائمة
    function closeMenu(btn, menu) {
        // تحديث الأيقونة
        const icon = btn.querySelector('i');
        if (icon) {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
        
        // إخفاء القائمة
        menu.classList.remove('opacity-100', 'visible', 'scale-100');
        menu.classList.add('opacity-0', 'invisible', 'scale-95');
        
        // تحديث خصائص الوصول
        btn.setAttribute('aria-expanded', 'false');
        
        // السماح بالتمرير
        document.body.style.overflow = '';
        
        console.log('📁 Menu closed');
    }
    
    // إضافة CSS ديناميكي
    function addDynamicCSS() {
        const style = document.createElement('style');
        style.id = 'ultimate-mobile-menu-css';
        
        style.textContent = `
            @media screen and (max-width: 768px) {
                #mobileMenuBtn {
                    -webkit-tap-highlight-color: transparent !important;
                    tap-highlight-color: transparent !important;
                    outline: none !important;
                }
                
                #mobileMenuBtn:active {
                    background-color: rgba(255, 255, 255, 0.2) !important;
                }
                
                #mobileMenu {
                    pointer-events: auto !important;
                }
                
                #mobileMenu.opacity-0 {
                    pointer-events: none !important;
                }
                
                #mobileMenu button {
                    -webkit-tap-highlight-color: transparent !important;
                    tap-highlight-color: transparent !important;
                }
            }
        `;
        
        if (!document.getElementById('ultimate-mobile-menu-css')) {
            document.head.appendChild(style);
        }
    }
    
    // إعداد أحداث اللمس المتقدمة
    function setupAdvancedTouchEvents() {
        // منع السلوك الافتراضي للمس على الأزرار
        document.addEventListener('touchstart', function(e) {
            if (e.target.closest('#mobileMenuBtn')) {
                e.preventDefault();
            }
        }, { passive: false });
        
        // تحسين الاستجابة للمس
        document.addEventListener('touchmove', function(e) {
            if (e.target.closest('#mobileMenu')) {
                e.stopPropagation();
            }
        });
    }
    
    // مراقبة التغييرات في DOM
    function observeDOMChanges() {
        const observer = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                if (mutation.type === 'childList') {
                    // إعادة تهيئة إذا تم إضافة عناصر جديدة
                    const btn = document.getElementById('mobileMenuBtn');
                    const menu = document.getElementById('mobileMenu');
                    
                    if (btn && menu && !btn.hasAttribute('data-ultimate-fixed')) {
                        btn.setAttribute('data-ultimate-fixed', 'true');
                        setTimeout(() => applyUltimateFixes(btn, menu), 100);
                    }
                }
            });
        });
        
        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    }
    
    // بدء التهيئة
    function init() {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', ultimateMobileMenuFix);
        } else {
            ultimateMobileMenuFix();
        }
        
        // تهيئة إضافية بعد تحميل الصفحة
        window.addEventListener('load', function() {
            setTimeout(ultimateMobileMenuFix, 500);
        });
        
        // إعادة التهيئة عند تغيير حجم الشاشة
        window.addEventListener('resize', function() {
            if (window.innerWidth <= 768) {
                setTimeout(ultimateMobileMenuFix, 100);
            }
        });
    }
    
    // بدء التشغيل
    init();
    
    console.log('🚀 Ultimate mobile menu fix script loaded');
    
})();