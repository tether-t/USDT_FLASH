// تأثيرات تفاعلية لهوية Tether

document.addEventListener('DOMContentLoaded', function() {
    
    // إضافة تأثيرات الحركة عند التمرير
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('tether-fade-in-up');
            }
        });
    }, observerOptions);

    // مراقبة العناصر للرسوم المتحركة
    const animatedElements = document.querySelectorAll('.package-card, .tether-card-effect, .step-item');
    animatedElements.forEach(el => observer.observe(el));

    // تأثير النقر على الأزرار
    const tetherButtons = document.querySelectorAll('.tether-button-effect, .bg-green-500, .bg-green-600');
    tetherButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            // إنشاء تأثير الموجة
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('tether-ripple');
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });

    // تحديث العدادات بألوان Tether
    const counters = document.querySelectorAll('.counter');
    counters.forEach(counter => {
        counter.style.color = '#26A17B';
        counter.style.fontWeight = '800';
        counter.style.textShadow = '0 2px 4px rgba(38, 161, 123, 0.2)';
    });

    // تأثير التمرير على البطاقات
    const cards = document.querySelectorAll('.package-card, .tether-card-effect');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
            this.style.boxShadow = '0 15px 35px rgba(38, 161, 123, 0.2)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '';
        });
    });

    // تأثير النبض على الشارات
    const badges = document.querySelectorAll('.badge-verified, .badge-secure, .badge-premium');
    badges.forEach(badge => {
        setInterval(() => {
            badge.style.transform = 'scale(1.05)';
            setTimeout(() => {
                badge.style.transform = 'scale(1)';
            }, 200);
        }, 3000);
    });

    // تأثير الإضاءة على الشعار
    const logos = document.querySelectorAll('img[alt*="USDT"], img[alt*="Tether"]');
    logos.forEach(logo => {
        logo.addEventListener('mouseenter', function() {
            this.style.filter = 'drop-shadow(0 0 20px rgba(38, 161, 123, 0.8))';
        });
        
        logo.addEventListener('mouseleave', function() {
            this.style.filter = 'drop-shadow(0 2px 8px rgba(255, 255, 255, 0.3))';
        });
    });

    // تحديث ألوان الروابط
    const tetherLinks = document.querySelectorAll('a[href*="tether"], .tether-link');
    tetherLinks.forEach(link => {
        link.style.color = '#26A17B';
        link.style.fontWeight = '600';
        
        link.addEventListener('mouseenter', function() {
            this.style.color = '#1A8462';
            this.style.textShadow = '0 1px 3px rgba(38, 161, 123, 0.3)';
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.color = '#26A17B';
            this.style.textShadow = 'none';
        });
    });

    // تأثير الجسيمات المتحركة
    function createParticle() {
        const particle = document.createElement('div');
        particle.className = 'tether-particle';
        particle.style.cssText = `
            position: fixed;
            width: 4px;
            height: 4px;
            background: rgba(38, 161, 123, 0.6);
            border-radius: 50%;
            pointer-events: none;
            z-index: 1000;
            animation: tether-float 4s ease-in-out infinite;
        `;
        
        particle.style.left = Math.random() * window.innerWidth + 'px';
        particle.style.top = window.innerHeight + 'px';
        
        document.body.appendChild(particle);
        
        setTimeout(() => {
            particle.remove();
        }, 4000);
    }

    // إنشاء جسيمات بشكل دوري
    setInterval(createParticle, 5000);

    // تأثير التمرير السلس للروابط الداخلية
    const internalLinks = document.querySelectorAll('a[href^="#"]');
    internalLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // تحديث ألوان العناصر التفاعلية
    function updateTetherColors() {
        // تحديث الأيقونات
        const icons = document.querySelectorAll('.fas.text-green-500, .fas.text-green-600, .fas.text-green-400');
        icons.forEach(icon => {
            icon.style.color = '#26A17B';
            icon.style.filter = 'drop-shadow(0 1px 3px rgba(38, 161, 123, 0.3))';
        });

        // تحديث النصوص الخضراء
        const greenTexts = document.querySelectorAll('.text-green-400, .text-green-500, .text-green-600, .text-green-700');
        greenTexts.forEach(text => {
            text.style.color = '#26A17B';
        });

        // تحديث الخلفيات الخضراء
        const greenBgs = document.querySelectorAll('.bg-green-50, .bg-green-100');
        greenBgs.forEach(bg => {
            bg.style.background = 'linear-gradient(135deg, rgba(38, 161, 123, 0.05), rgba(0, 212, 170, 0.05))';
        });
    }

    // تطبيق التحديثات
    updateTetherColors();

    // تأثير النبض على العناصر المهمة
    const importantElements = document.querySelectorAll('.tether-badge, .security-pulse, .live-status');
    importantElements.forEach(element => {
        element.style.animation = 'tether-pulse 2s ease-in-out infinite';
    });

    console.log('🚀 Tether effects loaded successfully!');
});

// إضافة CSS للتأثيرات الديناميكية
const style = document.createElement('style');
style.textContent = `
    .tether-ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: tether-ripple-effect 0.6s linear;
        pointer-events: none;
    }

    @keyframes tether-ripple-effect {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }

    .tether-particle {
        animation: tether-particle-float 4s ease-in-out forwards;
    }

    @keyframes tether-particle-float {
        0% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
        }
        100% {
            transform: translateY(-100vh) rotate(360deg);
            opacity: 0;
        }
    }

    .tether-fade-in-up {
        animation: tether-fade-in-up 0.8s ease-out forwards;
    }

    @keyframes tether-fade-in-up {
        0% {
            opacity: 0;
            transform: translateY(30px);
        }
        100% {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;

document.head.appendChild(style);
