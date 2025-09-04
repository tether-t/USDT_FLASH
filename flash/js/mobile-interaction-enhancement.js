/* 🚀 USDT-FLASH Mobile Interaction Enhancement */
/* تحسين التفاعل على الهواتف المحمولة */

(function() {
    'use strict';
    
    // التحقق من أن الجهاز هو هاتف محمول
    const isMobile = window.innerWidth <= 768;
    const isTouch = 'ontouchstart' in window;
    
    if (!isMobile) return;
    
    console.log('🚀 Mobile Interaction Enhancement Loaded');
    
    // ===== MOBILE OPTIMIZATION FUNCTIONS =====
    
    // تحسين الأداء للهواتف المحمولة
    function optimizePerformance() {
        // تقليل عدد العناصر المتحركة
        const animations = document.querySelectorAll('[class*="animate"]');
        animations.forEach(el => {
            el.style.animationDuration = '0.3s';
        });
        
        // تحسين الصور للهواتف المحمولة
        const images = document.querySelectorAll('img');
        images.forEach(img => {
            if (!img.loading) {
                img.loading = 'lazy';
            }
            img.style.imageRendering = '-webkit-optimize-contrast';
        });
        
        // تحسين الخطوط
        document.body.style.webkitFontSmoothing = 'antialiased';
        document.body.style.mozOsxFontSmoothing = 'grayscale';
    }
    
    // تحسين اللمس والتفاعل
    function enhanceTouchInteraction() {
        // إضافة تأثيرات اللمس للأزرار
        const buttons = document.querySelectorAll('button, .btn, a[role="button"], .package-card, .platform-item');
        
        buttons.forEach(button => {
            // منع التكبير عند النقر المزدوج
            button.addEventListener('touchend', function(e) {
                e.preventDefault();
                this.click();
            }, { passive: false });
            
            // إضافة تأثير اللمس
            button.addEventListener('touchstart', function() {
                this.style.transform = 'scale(0.98)';
                this.style.transition = 'transform 0.1s ease';
            }, { passive: true });
            
            button.addEventListener('touchend', function() {
                setTimeout(() => {
                    this.style.transform = '';
                }, 100);
            }, { passive: true });
            
            // إضافة تأثير الضغط
            button.addEventListener('touchstart', function() {
                this.classList.add('touch-active');
            }, { passive: true });
            
            button.addEventListener('touchend', function() {
                setTimeout(() => {
                    this.classList.remove('touch-active');
                }, 150);
            }, { passive: true });
        });
    }
    
    // تحسين القائمة المحمولة
    function enhanceMobileMenu() {
        const mobileMenuBtn = document.getElementById('mobileMenuBtn');
        const mobileMenu = document.getElementById('mobileMenu');
        
        if (!mobileMenuBtn || !mobileMenu) return;
        
        // تحسين فتح وإغلاق القائمة
        mobileMenuBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const isOpen = mobileMenu.classList.contains('opacity-100');
            
            if (isOpen) {
                closeMobileMenu();
            } else {
                openMobileMenu();
            }
        });
        
        // إغلاق القائمة عند النقر خارجها
        document.addEventListener('click', function(e) {
            if (!mobileMenu.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
                closeMobileMenu();
            }
        });
        
        // إغلاق القائمة عند النقر على رابط
        const menuLinks = mobileMenu.querySelectorAll('button');
        menuLinks.forEach(link => {
            link.addEventListener('click', function() {
                setTimeout(closeMobileMenu, 300);
            });
        });
        
        function openMobileMenu() {
            mobileMenu.classList.remove('opacity-0', 'invisible', 'scale-95');
            mobileMenu.classList.add('opacity-100', 'visible', 'scale-100');
            mobileMenuBtn.querySelector('i').classList.replace('fa-bars', 'fa-times');
            
            // منع التمرير في الخلفية
            document.body.style.overflow = 'hidden';
        }
        
        function closeMobileMenu() {
            mobileMenu.classList.add('opacity-0', 'invisible', 'scale-95');
            mobileMenu.classList.remove('opacity-100', 'visible', 'scale-100');
            mobileMenuBtn.querySelector('i').classList.replace('fa-times', 'fa-bars');
            
            // السماح بالتمرير مرة أخرى
            document.body.style.overflow = '';
        }
    }
    
    // تحسين التمرير السلس
    function enhanceSmoothScrolling() {
        // تحسين التمرير للروابط الداخلية
        const anchorLinks = document.querySelectorAll('a[href^="#"]');
        
        anchorLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href').substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    const headerHeight = document.querySelector('header').offsetHeight;
                    const targetPosition = targetElement.offsetTop - headerHeight - 20;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
        
        // تحسين التمرير العام
        let ticking = false;
        
        function updateScrollPosition() {
            const scrolled = window.pageYOffset;
            const header = document.querySelector('header');
            
            if (header) {
                if (scrolled > 50) {
                    header.style.background = 'linear-gradient(135deg, rgba(38, 161, 123, 0.98) 0%, rgba(26, 132, 98, 0.98) 100%)';
                    header.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.4)';
                } else {
                    header.style.background = 'linear-gradient(135deg, rgba(38, 161, 123, 0.95) 0%, rgba(26, 132, 98, 0.95) 100%)';
                    header.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.3)';
                }
            }
            
            ticking = false;
        }
        
        window.addEventListener('scroll', function() {
            if (!ticking) {
                requestAnimationFrame(updateScrollPosition);
                ticking = true;
            }
        }, { passive: true });
    }
    
    // تحسين النماذج للهواتف المحمولة
    function enhanceMobileForms() {
        const inputs = document.querySelectorAll('input, select, textarea');
        
        inputs.forEach(input => {
            // منع التكبير عند التركيز على الحقول
            input.addEventListener('focus', function() {
                if (this.type !== 'file') {
                    const viewport = document.querySelector('meta[name="viewport"]');
                    if (viewport) {
                        viewport.setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no');
                    }
                }
            });
            
            input.addEventListener('blur', function() {
                const viewport = document.querySelector('meta[name="viewport"]');
                if (viewport) {
                    viewport.setAttribute('content', 'width=device-width, initial-scale=1.0');
                }
            });
            
            // تحسين تجربة الكتابة
            if (input.type === 'email') {
                input.setAttribute('inputmode', 'email');
            } else if (input.type === 'tel') {
                input.setAttribute('inputmode', 'tel');
            } else if (input.type === 'number') {
                input.setAttribute('inputmode', 'numeric');
            }
        });
    }
    
    // تحسين الصور والوسائط
    function enhanceMediaElements() {
        // تحسين تحميل الصور
        const images = document.querySelectorAll('img');
        
        images.forEach(img => {
            // إضافة placeholder أثناء التحميل
            if (!img.complete) {
                img.style.backgroundColor = '#f3f4f6';
                img.style.minHeight = '100px';
            }
            
            img.addEventListener('load', function() {
                this.style.backgroundColor = '';
                this.style.minHeight = '';
                this.classList.add('loaded');
            });
            
            img.addEventListener('error', function() {
                this.style.backgroundColor = '#fee2e2';
                this.style.color = '#dc2626';
                this.alt = 'Image failed to load';
            });
        });
        
        // تحسين الفيديوهات للهواتف المحمولة
        const videos = document.querySelectorAll('video');
        videos.forEach(video => {
            video.setAttribute('playsinline', '');
            video.setAttribute('webkit-playsinline', '');
        });
    }
    
    // تحسين نظام الدردشة للهواتف المحمولة
    function enhanceMobileChat() {
        const chatIcon = document.querySelector('.chat-icon');
        const chatWindow = document.querySelector('.chat-window');
        
        if (!chatIcon || !chatWindow) return;
        
        // تحسين فتح وإغلاق نافذة الدردشة
        chatIcon.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const isOpen = chatWindow.classList.contains('active');
            
            if (isOpen) {
                closeChatWindow();
            } else {
                openChatWindow();
            }
        });
        
        // إغلاق نافذة الدردشة عند النقر خارجها
        document.addEventListener('click', function(e) {
            if (!chatWindow.contains(e.target) && !chatIcon.contains(e.target)) {
                closeChatWindow();
            }
        });
        
        function openChatWindow() {
            chatWindow.classList.add('active');
            chatIcon.style.transform = 'scale(0.9)';
            
            // تحسين موضع النافذة للشاشات الصغيرة
            if (window.innerWidth < 400) {
                chatWindow.style.width = 'calc(100vw - 20px)';
                chatWindow.style.right = '10px';
            }
        }
        
        function closeChatWindow() {
            chatWindow.classList.remove('active');
            chatIcon.style.transform = '';
        }
        
        // تحسين حجم نافذة الدردشة حسب الشاشة
        function adjustChatWindowSize() {
            if (window.innerWidth < 400) {
                chatWindow.style.width = 'calc(100vw - 20px)';
                chatWindow.style.right = '10px';
                chatWindow.style.maxWidth = 'none';
            } else {
                chatWindow.style.width = '';
                chatWindow.style.right = '20px';
                chatWindow.style.maxWidth = '350px';
            }
        }
        
        window.addEventListener('resize', adjustChatWindowSize);
        adjustChatWindowSize();
    }
    
    // تحسين الأداء العام
    function optimizeGeneralPerformance() {
        // تأخير تحميل العناصر غير المهمة
        const deferredElements = document.querySelectorAll('[data-defer]');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const element = entry.target;
                    const src = element.dataset.defer;
                    
                    if (src) {
                        element.src = src;
                        element.removeAttribute('data-defer');
                    }
                    
                    observer.unobserve(element);
                }
            });
        }, {
            rootMargin: '50px'
        });
        
        deferredElements.forEach(el => observer.observe(el));
        
        // تحسين الرسوم المتحركة
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
        
        if (prefersReducedMotion.matches) {
            const style = document.createElement('style');
            style.textContent = `
                *, *::before, *::after {
                    animation-duration: 0.01ms !important;
                    animation-iteration-count: 1 !important;
                    transition-duration: 0.01ms !important;
                }
            `;
            document.head.appendChild(style);
        }
    }
    
    // إضافة أنماط CSS للتفاعل المحسن
    function addMobileStyles() {
        const style = document.createElement('style');
        style.textContent = `
            @media (max-width: 768px) {
                .touch-active {
                    background-color: rgba(16, 185, 129, 0.1) !important;
                    transform: scale(0.98) !important;
                }
                
                .loaded {
                    opacity: 1 !important;
                    transition: opacity 0.3s ease !important;
                }
                
                /* تحسين التمرير */
                html {
                    scroll-behavior: smooth !important;
                    -webkit-overflow-scrolling: touch !important;
                }
                
                /* تحسين اللمس */
                * {
                    -webkit-tap-highlight-color: rgba(16, 185, 129, 0.1) !important;
                    -webkit-touch-callout: none !important;
                }
                
                /* تحسين النصوص */
                body {
                    -webkit-font-smoothing: antialiased !important;
                    -moz-osx-font-smoothing: grayscale !important;
                    text-rendering: optimizeLegibility !important;
                }
                
                /* تحسين الأزرار */
                button, .btn, a[role="button"] {
                    touch-action: manipulation !important;
                    user-select: none !important;
                }
                
                /* تحسين النماذج */
                input, select, textarea {
                    -webkit-appearance: none !important;
                    -moz-appearance: none !important;
                    appearance: none !important;
                }
                
                /* تحسين الصور */
                img {
                    image-rendering: -webkit-optimize-contrast !important;
                    image-rendering: crisp-edges !important;
                }
                
                /* تحسين الفيديو */
                video {
                    object-fit: cover !important;
                }
                
                /* منع التكبير غير المرغوب فيه */
                input[type="text"],
                input[type="email"],
                input[type="password"],
                input[type="tel"],
                input[type="number"],
                select,
                textarea {
                    font-size: 16px !important;
                }
                
                /* تحسين التمرير الأفقي */
                .horizontal-scroll {
                    -webkit-overflow-scrolling: touch !important;
                    scrollbar-width: none !important;
                    -ms-overflow-style: none !important;
                }
                
                .horizontal-scroll::-webkit-scrollbar {
                    display: none !important;
                }
                
                /* تحسين الظلال للأداء */
                .shadow-lg,
                .shadow-xl,
                .shadow-2xl {
                    will-change: transform !important;
                }
                
                /* تحسين الخلفيات المتدرجة */
                .bg-gradient-to-r,
                .bg-gradient-to-br {
                    background-attachment: scroll !important;
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    // تحسين معالجة الأخطاء
    function enhanceErrorHandling() {
        // معالجة أخطاء الصور
        document.addEventListener('error', function(e) {
            if (e.target.tagName === 'IMG') {
                e.target.style.display = 'none';
                console.warn('Image failed to load:', e.target.src);
            }
        }, true);
        
        // معالجة أخطاء JavaScript
        window.addEventListener('error', function(e) {
            console.error('JavaScript error:', e.error);
        });
        
        // معالجة الوعود المرفوضة
        window.addEventListener('unhandledrejection', function(e) {
            console.error('Unhandled promise rejection:', e.reason);
        });
    }
    
    // تحسين إمكانية الوصول
    function enhanceAccessibility() {
        // إضافة تسميات للعناصر التفاعلية
        const interactiveElements = document.querySelectorAll('button, a, input, select, textarea');
        
        interactiveElements.forEach(element => {
            if (!element.getAttribute('aria-label') && !element.textContent.trim()) {
                const type = element.tagName.toLowerCase();
                element.setAttribute('aria-label', `${type} element`);
            }
        });
        
        // تحسين التنقل بالكيبورد
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Tab') {
                document.body.classList.add('keyboard-navigation');
            }
        });
        
        document.addEventListener('mousedown', function() {
            document.body.classList.remove('keyboard-navigation');
        });
        
        // إضافة أنماط التركيز المحسنة
        const focusStyle = document.createElement('style');
        focusStyle.textContent = `
            .keyboard-navigation *:focus {
                outline: 2px solid #10b981 !important;
                outline-offset: 2px !important;
            }
        `;
        document.head.appendChild(focusStyle);
    }
    
    // تحسين الاستجابة للاتجاه
    function enhanceOrientationHandling() {
        function handleOrientationChange() {
            // إعادة حساب الأبعاد عند تغيير الاتجاه
            setTimeout(() => {
                const chatWindow = document.querySelector('.chat-window');
                if (chatWindow) {
                    if (window.innerWidth < 400) {
                        chatWindow.style.width = 'calc(100vw - 20px)';
                    } else {
                        chatWindow.style.width = '';
                        chatWindow.style.maxWidth = '350px';
                    }
                }
                
                // إعادة حساب ارتفاع العناصر
                const heroSection = document.querySelector('section[role="main"]');
                if (heroSection) {
                    heroSection.style.minHeight = `calc(100vh - ${document.querySelector('header').offsetHeight}px)`;
                }
            }, 100);
        }
        
        window.addEventListener('orientationchange', handleOrientationChange);
        window.addEventListener('resize', handleOrientationChange);
    }
    
    // ===== INITIALIZATION =====
    
    function initializeMobileEnhancements() {
        console.log('🚀 Initializing Mobile Enhancements...');
        
        try {
            optimizePerformance();
            enhanceTouchInteraction();
            enhanceMobileMenu();
            enhanceSmoothScrolling();
            enhanceMobileForms();
            enhanceMediaElements();
            enhanceMobileChat();
            optimizeGeneralPerformance();
            addMobileStyles();
            enhanceErrorHandling();
            enhanceAccessibility();
            enhanceOrientationHandling();
            
            console.log('✅ Mobile Enhancements Initialized Successfully');
        } catch (error) {
            console.error('❌ Error initializing mobile enhancements:', error);
        }
    }
    
    // تشغيل التحسينات عند تحميل الصفحة
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initializeMobileEnhancements);
    } else {
        initializeMobileEnhancements();
    }
    
    // إعادة تشغيل بعض التحسينات عند تحميل النافذة بالكامل
    window.addEventListener('load', function() {
        setTimeout(() => {
            enhanceMediaElements();
            optimizeGeneralPerformance();
        }, 1000);
    });
    
    // تصدير الوظائف للاستخدام الخارجي
    window.MobileEnhancements = {
        optimizePerformance,
        enhanceTouchInteraction,
        enhanceMobileMenu,
        enhanceSmoothScrolling,
        enhanceMobileForms,
        enhanceMediaElements,
        enhanceMobileChat
    };
    
})();