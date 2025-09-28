// إصلاح القائمة المنسدلة للهيدر على الهواتف
(function() {
    'use strict';
    
    // التأكد من تحميل DOM
    function initMobileMenu() {
        const mobileMenuBtn = document.getElementById('mobileMenuBtn');
        const mobileMenu = document.getElementById('mobileMenu');
        
        if (!mobileMenuBtn || !mobileMenu) {
            console.log('Mobile menu elements not found, retrying...');
            setTimeout(initMobileMenu, 100);
            return;
        }
        
        console.log('Mobile menu elements found, initializing...');
        
        // إزالة أي event listeners موجودة
        const newBtn = mobileMenuBtn.cloneNode(true);
        mobileMenuBtn.parentNode.replaceChild(newBtn, mobileMenuBtn);
        
        // إضافة event listener جديد
        newBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            console.log('Mobile menu button clicked');
            
            const menu = document.getElementById('mobileMenu');
            const isOpen = menu.classList.contains('opacity-100');
            
            if (isOpen) {
                // إغلاق القائمة
                menu.classList.remove('opacity-100', 'visible', 'scale-100');
                menu.classList.add('opacity-0', 'invisible', 'scale-95');
                newBtn.querySelector('i').classList.replace('fa-times', 'fa-bars');
                console.log('Menu closed');
            } else {
                // فتح القائمة
                menu.classList.remove('opacity-0', 'invisible', 'scale-95');
                menu.classList.add('opacity-100', 'visible', 'scale-100');
                newBtn.querySelector('i').classList.replace('fa-bars', 'fa-times');
                console.log('Menu opened');
            }
        });
        
        // إضافة touch events للهواتف
        newBtn.addEventListener('touchstart', function(e) {
            e.preventDefault();
            this.click();
        });
        
        // إغلاق القائمة عند الضغط خارجها
        document.addEventListener('click', function(e) {
            const menu = document.getElementById('mobileMenu');
            const btn = document.getElementById('mobileMenuBtn');
            
            if (menu && btn && !btn.contains(e.target) && !menu.contains(e.target)) {
                menu.classList.add('opacity-0', 'invisible', 'scale-95');
                menu.classList.remove('opacity-100', 'visible', 'scale-100');
                const icon = btn.querySelector('i');
                if (icon) {
                    icon.classList.replace('fa-times', 'fa-bars');
                }
            }
        });
        
        // إغلاق القائمة عند الضغط على أي رابط داخلها
        const menuLinks = mobileMenu.querySelectorAll('button');
        menuLinks.forEach(link => {
            link.addEventListener('click', function() {
                const menu = document.getElementById('mobileMenu');
                const btn = document.getElementById('mobileMenuBtn');
                
                setTimeout(() => {
                    menu.classList.add('opacity-0', 'invisible', 'scale-95');
                    menu.classList.remove('opacity-100', 'visible', 'scale-100');
                    const icon = btn.querySelector('i');
                    if (icon) {
                        icon.classList.replace('fa-times', 'fa-bars');
                    }
                }, 100);
            });
        });
        
        // تحسين الأداء للهواتف
        newBtn.style.touchAction = 'manipulation';
        newBtn.style.userSelect = 'none';
        newBtn.style.webkitTapHighlightColor = 'transparent';
        
        console.log('Mobile menu initialized successfully');
    }
    
    // بدء التهيئة
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initMobileMenu);
    } else {
        initMobileMenu();
    }
    
    // إعادة التهيئة عند تغيير حجم الشاشة
    window.addEventListener('resize', function() {
        if (window.innerWidth <= 768) {
            setTimeout(initMobileMenu, 100);
        }
    });
    
})();

// إصلاح إضافي للتأكد من عمل القائمة
window.toggleMobileMenu = function() {
    const menu = document.getElementById('mobileMenu');
    const btn = document.getElementById('mobileMenuBtn');
    
    if (!menu || !btn) return;
    
    const isOpen = menu.classList.contains('opacity-100');
    
    if (isOpen) {
        menu.classList.remove('opacity-100', 'visible', 'scale-100');
        menu.classList.add('opacity-0', 'invisible', 'scale-95');
        btn.querySelector('i').classList.replace('fa-times', 'fa-bars');
    } else {
        menu.classList.remove('opacity-0', 'invisible', 'scale-95');
        menu.classList.add('opacity-100', 'visible', 'scale-100');
        btn.querySelector('i').classList.replace('fa-bars', 'fa-times');
    }
};