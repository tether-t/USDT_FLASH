// تأثيرات تفاعلية متقدمة للهيدر

document.addEventListener('DOMContentLoaded', function() {
    initializeHeaderEffects();
});

function initializeHeaderEffects() {
    // إضافة تأثيرات التمرير
    addScrollEffects();
    
    // إضافة تأثيرات الماوس
    addMouseEffects();
    
    // إضافة تأثيرات الشعار
    addLogoEffects();
    
    // إضافة تأثيرات القائمة المنسدلة
    addMenuEffects();
    
    // إضافة تأثيرات الإشعارات
    addNotificationEffects();
    
    console.log('✨ Header Interactive Effects Initialized');
}

// تأثيرات التمرير المتقدمة
function addScrollEffects() {
    const header = document.querySelector('header');
    let lastScrollY = window.scrollY;
    let ticking = false;
    
    function updateHeader() {
        const scrollY = window.scrollY;
        const scrollDirection = scrollY > lastScrollY ? 'down' : 'up';
        
        // تأثير الشفافية والضبابية
        if (scrollY > 50) {
            header.classList.add('header-scrolled');
            header.style.transform = 'translateY(0)';
        } else {
            header.classList.remove('header-scrolled');
        }
        
        // إخفاء/إظهار الهيدر حسب اتجاه التمرير
        if (scrollY > 100) {
            if (scrollDirection === 'down' && scrollY > lastScrollY + 10) {
                header.style.transform = 'translateY(-100%)';
            } else if (scrollDirection === 'up') {
                header.style.transform = 'translateY(0)';
            }
        }
        
        // تأثير المنظور
        const parallaxOffset = scrollY * 0.5;
        const headerBg = header.querySelector('::before');
        if (headerBg) {
            header.style.setProperty('--parallax-offset', `${parallaxOffset}px`);
        }
        
        lastScrollY = scrollY;
        ticking = false;
    }
    
    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateHeader);
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', requestTick, { passive: true });
}

// تأثيرات الماوس التفاعلية
function addMouseEffects() {
    const header = document.querySelector('header');
    
    // تأثير تتبع الماوس
    header.addEventListener('mousemove', function(e) {
        const rect = header.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        
        // تحديث موقع تأثير الإضاءة
        header.style.setProperty('--mouse-x', `${x}%`);
        header.style.setProperty('--mouse-y', `${y}%`);
        
        // إضافة تأثير الإضاءة المتحركة
        const lightEffect = document.createElement('div');
        lightEffect.className = 'mouse-light-effect';
        lightEffect.style.cssText = `
            position: absolute;
            left: ${e.clientX - rect.left}px;
            top: ${e.clientY - rect.top}px;
            width: 100px;
            height: 100px;
            background: radial-gradient(circle, rgba(52, 211, 153, 0.3) 0%, transparent 70%);
            border-radius: 50%;
            pointer-events: none;
            transform: translate(-50%, -50%);
            animation: mouseLightFade 1s ease-out forwards;
            z-index: 5;
        `;
        
        header.appendChild(lightEffect);
        
        // إزالة التأثير بعد انتهاء الأنيميشن
        setTimeout(() => {
            if (lightEffect.parentNode) {
                lightEffect.remove();
            }
        }, 1000);
    });
    
    // تأثير الخروج من الهيدر
    header.addEventListener('mouseleave', function() {
        header.style.removeProperty('--mouse-x');
        header.style.removeProperty('--mouse-y');
    });
}

// تأثيرات الشعار المتقدمة
function addLogoEffects() {
    const logo = document.querySelector('header h1');
    if (!logo) return;
    
    // إضافة النص للتأثير
    logo.setAttribute('data-text', logo.textContent);
    
    // تأثير النقر على الشعار
    logo.addEventListener('click', function() {
        // تأثير الانفجار
        createLogoExplosion(logo);
        
        // تأثير الاهتزاز
        logo.style.animation = 'none';
        setTimeout(() => {
            logo.style.animation = 'logoShake 0.5s ease-in-out, textShimmer 3s ease-in-out infinite';
        }, 10);
    });
    
    // تأثير الهوفر المتقدم
    logo.addEventListener('mouseenter', function() {
        logo.style.animationDuration = '1s';
        logo.style.filter = 'drop-shadow(0 0 20px rgba(38, 161, 123, 0.8))';
    });
    
    logo.addEventListener('mouseleave', function() {
        logo.style.animationDuration = '3s';
        logo.style.filter = 'drop-shadow(0 0 10px rgba(38, 161, 123, 0.5))';
    });
}

// إنشاء تأثير انفجار الشعار
function createLogoExplosion(logo) {
    const rect = logo.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    // إنشاء جسيمات الانفجار
    for (let i = 0; i < 12; i++) {
        const particle = document.createElement('div');
        const angle = (i / 12) * Math.PI * 2;
        const velocity = 100 + Math.random() * 50;
        const size = 4 + Math.random() * 6;
        
        particle.style.cssText = `
            position: fixed;
            left: ${centerX}px;
            top: ${centerY}px;
            width: ${size}px;
            height: ${size}px;
            background: linear-gradient(45deg, #26a17b, #34d399);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            animation: particleExplode 1s ease-out forwards;
        `;
        
        particle.style.setProperty('--angle', angle);
        particle.style.setProperty('--velocity', velocity);
        
        document.body.appendChild(particle);
        
        // إزالة الجسيم بعد انتهاء الأنيميشن
        setTimeout(() => {
            if (particle.parentNode) {
                particle.remove();
            }
        }, 1000);
    }
}

// تأثيرات القائمة المنسدلة المتقدمة
function addMenuEffects() {
    const menuBtn = document.getElementById('mobileMenuBtn');
    const menu = document.getElementById('mobileMenu');
    
    if (!menuBtn || !menu) return;
    
    // تأثير فتح القائمة
    menuBtn.addEventListener('click', function() {
        const isOpen = !menu.classList.contains('opacity-0');
        
        if (!isOpen) {
            // تأثير الفتح المتدرج
            menu.style.transform = 'scale(0.8) rotateX(-10deg)';
            menu.style.opacity = '0';
            
            setTimeout(() => {
                menu.style.transition = 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
                menu.style.transform = 'scale(1) rotateX(0deg)';
                menu.style.opacity = '1';
            }, 10);
            
            // تأثير ظهور العناصر بالتتابع
            const menuItems = menu.querySelectorAll('button');
            menuItems.forEach((item, index) => {
                item.style.opacity = '0';
                item.style.transform = 'translateX(-20px)';
                
                setTimeout(() => {
                    item.style.transition = 'all 0.3s ease';
                    item.style.opacity = '1';
                    item.style.transform = 'translateX(0)';
                }, 100 + (index * 50));
            });
        }
    });
    
    // تأثيرات عناصر القائمة
    const menuItems = menu.querySelectorAll('button');
    menuItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            // تأثير الموجة
            createRippleEffect(item);
            
            // تأثير الإضاءة
            item.style.boxShadow = '0 8px 25px rgba(38, 161, 123, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.1)';
        });
        
        item.addEventListener('mouseleave', function() {
            item.style.boxShadow = '';
        });
    });
}

// إنشاء تأثير الموجة
function createRippleEffect(element) {
    const ripple = document.createElement('div');
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    
    ripple.style.cssText = `
        position: absolute;
        left: 50%;
        top: 50%;
        width: ${size}px;
        height: ${size}px;
        background: radial-gradient(circle, rgba(52, 211, 153, 0.4) 0%, transparent 70%);
        border-radius: 50%;
        transform: translate(-50%, -50%) scale(0);
        animation: rippleExpand 0.6s ease-out;
        pointer-events: none;
        z-index: 1;
    `;
    
    element.style.position = 'relative';
    element.appendChild(ripple);
    
    setTimeout(() => {
        if (ripple.parentNode) {
            ripple.remove();
        }
    }, 600);
}

// تأثيرات الإشعارات المتقدمة
function addNotificationEffects() {
    const notifications = document.querySelectorAll('header .bg-red-500');
    
    notifications.forEach(notification => {
        // تأثير النبض المتقدم
        notification.addEventListener('mouseenter', function() {
            notification.style.animation = 'notificationHover 0.3s ease-in-out';
        });
        
        notification.addEventListener('mouseleave', function() {
            notification.style.animation = 'notificationPulse 2s ease-in-out infinite';
        });
        
        // تأثير التحديث التلقائي للرقم
        setInterval(() => {
            const currentNumber = parseInt(notification.textContent);
            if (Math.random() < 0.1) { // 10% احتمال
                const newNumber = Math.max(1, currentNumber + (Math.random() > 0.5 ? 1 : -1));
                
                // تأثير تغيير الرقم
                notification.style.transform = 'scale(1.2)';
                notification.style.background = 'linear-gradient(45deg, #f59e0b, #ef4444)';
                
                setTimeout(() => {
                    notification.textContent = newNumber;
                    notification.style.transform = 'scale(1)';
                    notification.style.background = 'linear-gradient(45deg, #ef4444, #dc2626)';
                }, 150);
            }
        }, 10000); // كل 10 ثواني
    });
}

// إضافة الأنيميشنات المخصصة
function addCustomAnimations() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes logoShake {
            0%, 100% { transform: translateX(0); }
            25% { transform: translateX(-5px) rotate(-1deg); }
            75% { transform: translateX(5px) rotate(1deg); }
        }
        
        @keyframes particleExplode {
            0% {
                transform: translate(-50%, -50%) scale(1);
                opacity: 1;
            }
            100% {
                transform: translate(
                    calc(-50% + cos(var(--angle)) * var(--velocity) * 1px),
                    calc(-50% + sin(var(--angle)) * var(--velocity) * 1px)
                ) scale(0);
                opacity: 0;
            }
        }
        
        @keyframes rippleExpand {
            0% {
                transform: translate(-50%, -50%) scale(0);
                opacity: 1;
            }
            100% {
                transform: translate(-50%, -50%) scale(1);
                opacity: 0;
            }
        }
        
        @keyframes notificationHover {
            0% { transform: scale(1); }
            50% { transform: scale(1.15); }
            100% { transform: scale(1.1); }
        }
        
        @keyframes mouseLightFade {
            0% {
                opacity: 1;
                transform: translate(-50%, -50%) scale(0);
            }
            50% {
                opacity: 0.8;
                transform: translate(-50%, -50%) scale(1);
            }
            100% {
                opacity: 0;
                transform: translate(-50%, -50%) scale(1.5);
            }
        }
    `;
    
    document.head.appendChild(style);
}

// تهيئة الأنيميشنات عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', function() {
    addCustomAnimations();
});

// تأثيرات الأداء المحسنة
function optimizePerformance() {
    // استخدام Intersection Observer للتأثيرات
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('header-visible');
            }
        });
    });
    
    const header = document.querySelector('header');
    if (header) {
        observer.observe(header);
    }
    
    // تحسين الأداء للأنيميشنات
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (prefersReducedMotion.matches) {
        document.documentElement.style.setProperty('--animation-duration', '0s');
    }
}

// تهيئة تحسينات الأداء
document.addEventListener('DOMContentLoaded', optimizePerformance);

// تصدير الوظائف للاستخدام الخارجي
window.HeaderEffects = {
    init: initializeHeaderEffects,
    addScrollEffects,
    addMouseEffects,
    addLogoEffects,
    createRippleEffect
};