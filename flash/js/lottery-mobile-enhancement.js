/* 🎰 Lottery Mobile Enhancement */
/* تحسين التفاعل في صفحة اليانصيب للهواتف المحمولة */

(function() {
    'use strict';
    
    // التحقق من أن الجهاز هو هاتف محمول
    const isMobile = window.innerWidth <= 768;
    
    if (!isMobile) return;
    
    console.log('🎰 Lottery Mobile Enhancement Loaded');
    
    // تحسين خلفية الهيدر والهيرو
    function optimizeBackgroundImages() {
        const headerImg = document.querySelector('header .absolute.inset-0 img');
        const heroImg = document.querySelector('section.relative.py-16 .absolute.inset-0 img');
        
        if (headerImg) {
            // تحسين صورة الهيدر للهواتف
            headerImg.style.objectFit = 'cover';
            headerImg.style.objectPosition = 'center';
            headerImg.style.filter = 'brightness(0.7) contrast(1.1)';
            headerImg.style.transform = 'scale(1.05)';
        }
        
        if (heroImg) {
            // تحسين صورة الهيرو للهواتف
            heroImg.style.objectFit = 'cover';
            heroImg.style.objectPosition = 'center';
            heroImg.style.filter = 'brightness(0.6) contrast(1.2)';
            heroImg.style.transform = 'scale(1.05)';
        }
    }
    
    // تحسين التأثيرات البصرية
    function enhanceVisualEffects() {
        // تحسين تأثير الزجاج
        const glassElements = document.querySelectorAll('.backdrop-blur-xl, .bg-white\\/10');
        glassElements.forEach(element => {
            element.style.backdropFilter = 'blur(15px)';
            element.style.webkitBackdropFilter = 'blur(15px)';
            element.style.background = 'rgba(255, 255, 255, 0.12)';
            element.style.border = '1px solid rgba(255, 255, 255, 0.25)';
            element.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.3)';
        });
        
        // تحسين الشارات
        const badges = document.querySelectorAll('.security-badge');
        badges.forEach(badge => {
            badge.style.boxShadow = '0 4px 15px rgba(16, 185, 129, 0.4)';
            badge.style.border = '1px solid rgba(255, 255, 255, 0.3)';
        });
    }
    
    // تحسين النصوص للقراءة على الهواتف
    function enhanceTextReadability() {
        // تحسين عناوين الهيدر
        const headerTitle = document.querySelector('header h1');
        if (headerTitle) {
            headerTitle.style.textShadow = '0 2px 8px rgba(0, 0, 0, 0.7)';
            headerTitle.style.fontWeight = '900';
        }
        
        // تحسين عنوان الهيرو
        const heroTitle = document.querySelector('section.relative.py-16 h2');
        if (heroTitle) {
            heroTitle.style.textShadow = '0 3px 12px rgba(0, 0, 0, 0.8)';
            heroTitle.style.fontWeight = '900';
            heroTitle.style.letterSpacing = '-0.5px';
        }
        
        // تحسين النصوص الوصفية
        const descriptions = document.querySelectorAll('section.relative.py-16 .space-y-4 p');
        descriptions.forEach(p => {
            p.style.textShadow = '0 1px 4px rgba(0, 0, 0, 0.7)';
            p.style.lineHeight = '1.6';
        });
    }
    
    // تحسين الأرقام والإحصائيات
    function enhanceStats() {
        const statNumbers = document.querySelectorAll('.text-3xl, .text-2xl, .text-lg');
        statNumbers.forEach(stat => {
            if (stat.textContent.match(/\d/)) {
                stat.style.textShadow = '0 2px 8px rgba(0, 0, 0, 0.7)';
                stat.style.fontWeight = '900';
                stat.style.letterSpacing = '-0.5px';
            }
        });
        
        // تحسين عرض البيتكوين
        const bitcoinElements = document.querySelectorAll('.bitcoin-glow');
        bitcoinElements.forEach(element => {
            element.style.filter = 'drop-shadow(0 0 20px rgba(247, 147, 26, 0.6))';
            element.style.textShadow = '0 2px 8px rgba(0, 0, 0, 0.7)';
        });
    }
    
    // تحسين التفاعل باللمس
    function enhanceTouchInteraction() {
        // تحسين الأزرار والعناصر التفاعلية
        const interactiveElements = document.querySelectorAll('button, .security-badge, .bg-white\\/10');
        
        interactiveElements.forEach(element => {
            element.style.touchAction = 'manipulation';
            element.style.webkitTapHighlightColor = 'rgba(255, 255, 255, 0.1)';
            
            // إضافة تأثير اللمس
            element.addEventListener('touchstart', function() {
                this.style.transform = 'scale(0.98)';
                this.style.transition = 'transform 0.1s ease';
            }, { passive: true });
            
            element.addEventListener('touchend', function() {
                setTimeout(() => {
                    this.style.transform = '';
                }, 100);
            }, { passive: true });
        });
    }
    
    // تحسين الرسوم المتحركة للهواتف
    function optimizeAnimations() {
        // تحسين الرسوم المتحركة العائمة
        const floatingElements = document.querySelectorAll('.floating-animation');
        floatingElements.forEach(element => {
            element.style.animationDuration = '4s';
            element.style.animationTimingFunction = 'ease-in-out';
        });
        
        // تحسين النبضات
        const pulseElements = document.querySelectorAll('.animate-pulse, .pulse-glow');
        pulseElements.forEach(element => {
            element.style.animationDuration = '2s';
            element.style.animationTimingFunction = 'ease-in-out';
        });
        
        // تقليل الحركة للمستخدمين الذين يفضلون ذلك
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            const allAnimated = document.querySelectorAll('[class*="animate"], .floating-animation, .pulse-glow');
            allAnimated.forEach(element => {
                element.style.animation = 'none';
                element.style.transition = 'none';
            });
        }
    }
    
    // تحسين الاستجابة للاتجاه
    function handleOrientationChange() {
        const updateLayout = () => {
            const isLandscape = window.innerWidth > window.innerHeight;
            const header = document.querySelector('header');
            const heroSection = document.querySelector('section.relative.py-16');
            
            if (isLandscape) {
                // تحسين للوضع الأفقي
                if (header) {
                    header.style.minHeight = '200px';
                }
                if (heroSection) {
                    heroSection.style.minHeight = '300px';
                    heroSection.style.padding = '25px 0';
                }
            } else {
                // تحسين للوضع العمودي
                if (header) {
                    header.style.minHeight = '300px';
                }
                if (heroSection) {
                    heroSection.style.minHeight = '400px';
                    heroSection.style.padding = '40px 0';
                }
            }
            
            // إعادة تحسين الصور
            optimizeBackgroundImages();
        };
        
        window.addEventListener('orientationchange', () => {
            setTimeout(updateLayout, 100);
        });
        
        window.addEventListener('resize', updateLayout);
    }
    
    // تحسين الأداء للهواتف
    function optimizePerformance() {
        // تحسين الصور
        const images = document.querySelectorAll('img');
        images.forEach(img => {
            img.style.imageRendering = '-webkit-optimize-contrast';
            img.style.imageRendering = 'crisp-edges';
            
            // تحميل تدريجي
            if (!img.complete) {
                img.style.opacity = '0';
                img.style.transition = 'opacity 0.3s ease';
                
                img.addEventListener('load', function() {
                    this.style.opacity = '1';
                });
            }
        });
        
        // تحسين العناصر المتحركة
        const animatedElements = document.querySelectorAll('[class*="animate"], .floating-animation');
        animatedElements.forEach(element => {
            element.style.willChange = 'transform';
            element.style.transform = 'translateZ(0)';
        });
        
        // تحسين الخلفيات المتدرجة
        const gradients = document.querySelectorAll('[class*="gradient"]');
        gradients.forEach(element => {
            element.style.backgroundAttachment = 'scroll';
        });
    }
    
    // تحسين إمكانية الوصول
    function enhanceAccessibility() {
        // إضافة تسميات للعناصر التفاعلية
        const badges = document.querySelectorAll('.security-badge');
        badges.forEach(badge => {
            if (!badge.getAttribute('aria-label')) {
                badge.setAttribute('aria-label', 'Security verification badge');
            }
        });
        
        // تحسين التباين للنصوص
        const textElements = document.querySelectorAll('h1, h2, h3, p, span');
        textElements.forEach(element => {
            const computedStyle = window.getComputedStyle(element);
            const color = computedStyle.color;
            
            if (color.includes('rgba') && color.includes('0.')) {
                // تحسين النصوص الشفافة
                element.style.textShadow = '0 1px 3px rgba(0, 0, 0, 0.8)';
            }
        });
    }
    
    // تحسين معالجة الأخطاء
    function enhanceErrorHandling() {
        // معالجة أخطاء الصور
        const images = document.querySelectorAll('img');
        images.forEach(img => {
            img.addEventListener('error', function() {
                this.style.display = 'none';
                console.warn('Image failed to load:', this.src);
            });
        });
        
        // معالجة أخطاء الخلفيات
        const backgroundElements = document.querySelectorAll('[style*="background-image"]');
        backgroundElements.forEach(element => {
            const bgImage = element.style.backgroundImage;
            if (bgImage && bgImage.includes('url(')) {
                const img = new Image();
                img.onerror = function() {
                    element.style.backgroundImage = 'none';
                    element.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
                };
                img.src = bgImage.match(/url\(['"]?([^'"]+)['"]?\)/)[1];
            }
        });
    }
    
    // تحسين التمرير السلس
    function enhanceSmoothScrolling() {
        // تحسين التمرير العام
        document.documentElement.style.scrollBehavior = 'smooth';
        document.documentElement.style.webkitOverflowScrolling = 'touch';
        
        // تحسين الأداء أثناء التمرير
        let ticking = false;
        
        function updateScrollEffects() {
            const scrolled = window.pageYOffset;
            const header = document.querySelector('header');
            
            if (header && scrolled > 50) {
                header.style.transform = 'translateY(-5px)';
                header.style.boxShadow = '0 10px 40px rgba(0, 0, 0, 0.5)';
            } else if (header) {
                header.style.transform = '';
                header.style.boxShadow = '';
            }
            
            ticking = false;
        }
        
        window.addEventListener('scroll', function() {
            if (!ticking) {
                requestAnimationFrame(updateScrollEffects);
                ticking = true;
            }
        }, { passive: true });
    }
    
    // ===== INITIALIZATION =====
    
    function initializeLotteryMobileEnhancements() {
        console.log('🎰 Initializing Lottery Mobile Enhancements...');
        
        try {
            // تشغيل التحسينات بالتسلسل
            setTimeout(optimizeBackgroundImages, 100);
            setTimeout(enhanceVisualEffects, 200);
            setTimeout(enhanceTextReadability, 300);
            setTimeout(enhanceStats, 400);
            setTimeout(enhanceTouchInteraction, 500);
            setTimeout(optimizeAnimations, 600);
            setTimeout(handleOrientationChange, 700);
            setTimeout(optimizePerformance, 800);
            setTimeout(enhanceAccessibility, 900);
            setTimeout(enhanceErrorHandling, 1000);
            setTimeout(enhanceSmoothScrolling, 1100);
            
            console.log('✅ Lottery Mobile Enhancements Initialized Successfully');
        } catch (error) {
            console.error('❌ Error initializing lottery mobile enhancements:', error);
        }
    }
    
    // تشغيل التحسينات عند تحميل الصفحة
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initializeLotteryMobileEnhancements);
    } else {
        initializeLotteryMobileEnhancements();
    }
    
    // إعادة تشغيل بعض التحسينات عند تحميل النافذة بالكامل
    window.addEventListener('load', function() {
        setTimeout(() => {
            optimizeBackgroundImages();
            enhanceVisualEffects();
            optimizePerformance();
        }, 1000);
    });
    
    // تصدير الوظائف للاستخدام الخارجي
    window.LotteryMobileEnhancements = {
        optimizeBackgroundImages,
        enhanceVisualEffects,
        enhanceTextReadability,
        enhanceStats,
        enhanceTouchInteraction,
        optimizeAnimations,
        handleOrientationChange,
        optimizePerformance,
        enhanceAccessibility
    };
    
})();