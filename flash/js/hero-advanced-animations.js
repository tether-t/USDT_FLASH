/* ===== نظام الأنيميشن المتقدم للهيرو ===== */

class HeroAnimationSystem {
    constructor() {
        this.particles = [];
        this.mousePosition = { x: 0, y: 0 };
        this.isInitialized = false;
        this.animationFrameId = null;
        
        this.init();
    }
    
    init() {
        if (this.isInitialized) return;
        
        document.addEventListener('DOMContentLoaded', () => {
            this.setupHeroAnimations();
            this.createParticleSystem();
            this.setupInteractiveEffects();
            this.startAnimationLoop();
            this.isInitialized = true;
            
            console.log('🎨 Hero Animation System Initialized');
        });
    }
    
    setupHeroAnimations() {
        const heroSection = document.getElementById('main-content');
        if (!heroSection) return;
        
        // إضافة الكلاسات للأنيميشن
        this.addAnimationClasses();
        
        // إنشاء عناصر الخلفية التفاعلية
        this.createInteractiveBackground();
        
        // إنشاء أشعة الضوء
        this.createLightBeams();
        
        // تطبيق تأثيرات النصوص
        this.enhanceTextElements();
        
        // تحسين الأزرار
        this.enhanceButtons();
    }
    
    addAnimationClasses() {
        // إضافة كلاسات للعناصر الموجودة
        const title = document.querySelector('#main-content h2');
        if (title) {
            title.classList.add('hero-title');
        }
        
        const subtitle = document.querySelector('#main-content p');
        if (subtitle) {
            subtitle.classList.add('hero-subtitle');
        }
        
        const logo = document.querySelector('#main-content img[alt*="USDT"]');
        if (logo) {
            logo.classList.add('hero-logo');
        }
        
        const buttons = document.querySelectorAll('#main-content a[class*="bg-gradient"]');
        buttons.forEach(btn => {
            btn.classList.add('hero-cta-button');
        });
        
        const statsCards = document.querySelectorAll('#main-content .bg-gradient-to-br');
        statsCards.forEach(card => {
            card.classList.add('hero-stats-card');
        });
    }
    
    createInteractiveBackground() {
        const heroSection = document.getElementById('main-content');
        if (!heroSection) return;
        
        // إنشاء عناصر الخلفية التفاعلية
        for (let i = 0; i < 4; i++) {
            const bgElement = document.createElement('div');
            bgElement.className = 'interactive-bg';
            heroSection.appendChild(bgElement);
        }
    }
    
    createLightBeams() {
        const heroSection = document.getElementById('main-content');
        if (!heroSection) return;
        
        // إنشاء أشعة الضوء المتحركة
        for (let i = 0; i < 3; i++) {
            const lightBeam = document.createElement('div');
            lightBeam.className = 'light-beam';
            heroSection.appendChild(lightBeam);
        }
    }
    
    createParticleSystem() {
        const heroSection = document.getElementById('main-content');
        if (!heroSection) return;
        
        // إنشاء جسيمات ديناميكية
        for (let i = 0; i < 12; i++) {
            this.createParticle();
        }
        
        // إنشاء أيقونات عائمة
        this.createFloatingIcons();
    }
    
    createParticle() {
        const heroSection = document.getElementById('main-content');
        if (!heroSection) return;
        
        const particle = document.createElement('div');
        particle.className = 'dynamic-particle';
        
        // خصائص عشوائية للجسيم
        const size = Math.random() * 6 + 2;
        const x = Math.random() * window.innerWidth;
        const y = Math.random() * window.innerHeight;
        const opacity = Math.random() * 0.7 + 0.3;
        const hue = Math.random() * 60 + 120; // ألوان خضراء-زرقاء
        
        particle.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            background: radial-gradient(circle, hsl(${hue}, 70%, 60%) 0%, transparent 70%);
            border-radius: 50%;
            opacity: ${opacity};
            pointer-events: none;
            z-index: 3;
            animation: floatingParticles ${8 + Math.random() * 4}s ease-in-out infinite;
            animation-delay: ${Math.random() * 5}s;
        `;
        
        heroSection.appendChild(particle);
        this.particles.push({
            element: particle,
            x: x,
            y: y,
            vx: (Math.random() - 0.5) * 2,
            vy: (Math.random() - 0.5) * 2,
            size: size
        });
    }
    
    createFloatingIcons() {
        const heroSection = document.getElementById('main-content');
        if (!heroSection) return;
        
        const platforms = [
            { img: 'img/Binance Web3.jpeg', name: 'Binance' },
            { img: 'img/Trust_Wallet_2023_b-stacked.webp', name: 'Trust Wallet' },
            { img: 'img/BYBIT.jpg', name: 'Bybit' },
            { img: 'img/META MASK.png', name: 'MetaMask' },
            { img: 'img/OKX_Logo.svg', name: 'OKX' },
            { img: 'img/usdt_cryptocurrencies_icon_188337.png', name: 'USDT' },
            { img: 'Coin/pepe.jpg', name: 'PEPE' },
            { img: 'Coin/Dogecoin_Logo.png', name: 'DOGE' },
            { img: 'Coin/Shiba.png', name: 'SHIBA' }
        ];
        
        platforms.forEach((platform, index) => {
            const iconElement = document.createElement('div');
            iconElement.className = 'floating-icon';
            
            const img = document.createElement('img');
            img.src = platform.img;
            img.alt = platform.name;
            img.style.cssText = 'width: 100%; height: 100%; object-fit: contain; border-radius: 50%;';
            iconElement.appendChild(img);
            
            const x = Math.random() * (window.innerWidth - 60);
            const y = Math.random() * (window.innerHeight - 60);
            
            iconElement.style.cssText = `
                position: absolute;
                left: ${x}px;
                top: ${y}px;
                width: ${30 + Math.random() * 20}px;
                height: ${30 + Math.random() * 20}px;
                z-index: 3;
                animation-delay: ${index * 0.3}s;
                user-select: none;
                pointer-events: none;
                border-radius: 50%;
                box-shadow: 0 4px 15px rgba(38, 161, 123, 0.3);
            `;
            
            heroSection.appendChild(iconElement);
        });
    }
    
    setupInteractiveEffects() {
        const heroSection = document.getElementById('main-content');
        if (!heroSection) return;
        
        // تتبع حركة الماوس
        document.addEventListener('mousemove', (e) => {
            this.mousePosition.x = e.clientX;
            this.mousePosition.y = e.clientY;
            
            this.updateParallaxEffect(e);
            this.updateMouseFollower(e);
        });
        
        // تأثيرات النقر
        heroSection.addEventListener('click', (e) => {
            this.createClickRipple(e);
        });
        
        // تأثيرات التمرير
        window.addEventListener('scroll', () => {
            this.updateScrollEffects();
        });
        
        // تأثيرات تغيير حجم النافذة
        window.addEventListener('resize', () => {
            this.handleResize();
        });
    }
    
    updateParallaxEffect(e) {
        const heroSection = document.getElementById('main-content');
        if (!heroSection) return;
        
        const rect = heroSection.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width;
        const y = (e.clientY - rect.top) / rect.height;
        
        // تحريك العناصر بناءً على موقع الماوس
        const interactiveBgs = document.querySelectorAll('.interactive-bg');
        interactiveBgs.forEach((bg, index) => {
            const moveX = (x - 0.5) * (20 + index * 5);
            const moveY = (y - 0.5) * (20 + index * 5);
            
            bg.style.transform = `translate(${moveX}px, ${moveY}px) scale(${1 + (x + y) * 0.1})`;
        });
        
        // تحريك الجسيمات
        this.particles.forEach((particle, index) => {
            const moveX = (x - 0.5) * (10 + index % 3 * 5);
            const moveY = (y - 0.5) * (10 + index % 3 * 5);
            
            particle.element.style.transform = `translate(${moveX}px, ${moveY}px)`;
        });
    }
    
    updateMouseFollower(e) {
        // إنشاء متتبع الماوس إذا لم يكن موجوداً
        let follower = document.getElementById('mouse-follower');
        if (!follower) {
            follower = document.createElement('div');
            follower.id = 'mouse-follower';
            follower.style.cssText = `
                position: fixed;
                width: 20px;
                height: 20px;
                background: radial-gradient(circle, rgba(38, 161, 123, 0.6) 0%, transparent 70%);
                border-radius: 50%;
                pointer-events: none;
                z-index: 9999;
                transition: transform 0.1s ease;
            `;
            document.body.appendChild(follower);
        }
        
        follower.style.left = (e.clientX - 10) + 'px';
        follower.style.top = (e.clientY - 10) + 'px';
    }
    
    createClickRipple(e) {
        const ripple = document.createElement('div');
        ripple.className = 'click-ripple';
        
        const x = e.clientX;
        const y = e.clientY;
        
        ripple.style.cssText = `
            position: fixed;
            left: ${x}px;
            top: ${y}px;
            width: 0;
            height: 0;
            background: radial-gradient(circle, rgba(38, 161, 123, 0.6) 0%, transparent 70%);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9998;
            animation: rippleExpand 0.6s ease-out forwards;
        `;
        
        document.body.appendChild(ripple);
        
        // إزالة التأثير بعد انتهاء الأنيميشن
        setTimeout(() => {
            ripple.remove();
        }, 600);
    }
    
    updateScrollEffects() {
        const heroSection = document.getElementById('main-content');
        if (!heroSection) return;
        
        const scrollY = window.scrollY;
        const heroHeight = heroSection.offsetHeight;
        const scrollProgress = Math.min(scrollY / heroHeight, 1);
        
        // تأثير البارالاكس للخلفية
        heroSection.style.transform = `translateY(${scrollY * 0.5}px)`;
        
        // تأثير التلاشي التدريجي
        heroSection.style.opacity = 1 - scrollProgress * 0.3;
        
        // تحريك الجسيمات مع التمرير
        this.particles.forEach((particle, index) => {
            const moveY = scrollY * (0.1 + (index % 3) * 0.05);
            particle.element.style.transform += ` translateY(${moveY}px)`;
        });
    }
    
    enhanceTextElements() {
        // تحسين النصوص بتأثيرات متقدمة
        const titles = document.querySelectorAll('#main-content h1, #main-content h2');
        titles.forEach(title => {
            title.classList.add('hologram-effect');
            
            // إضافة تأثير الكتابة التدريجية
            this.typewriterEffect(title);
        });
    }
    
    typewriterEffect(element) {
        const text = element.textContent;
        element.textContent = '';
        element.style.borderRight = '2px solid rgba(38, 161, 123, 0.8)';
        
        let index = 0;
        const timer = setInterval(() => {
            element.textContent += text[index];
            index++;
            
            if (index >= text.length) {
                clearInterval(timer);
                element.style.borderRight = 'none';
            }
        }, 100);
    }
    
    enhanceButtons() {
        const buttons = document.querySelectorAll('#main-content button, #main-content a[class*="bg-"]');
        
        buttons.forEach(button => {
            button.classList.add('hero-interactive-element');
            
            // تأثيرات التمرير المتقدمة
            button.addEventListener('mouseenter', () => {
                this.createButtonAura(button);
            });
            
            button.addEventListener('mouseleave', () => {
                this.removeButtonAura(button);
            });
        });
    }
    
    createButtonAura(button) {
        const aura = document.createElement('div');
        aura.className = 'button-aura';
        aura.style.cssText = `
            position: absolute;
            top: -10px;
            left: -10px;
            right: -10px;
            bottom: -10px;
            background: radial-gradient(circle, rgba(38, 161, 123, 0.3) 0%, transparent 70%);
            border-radius: inherit;
            z-index: -1;
            animation: pulseGlow 1s ease-in-out infinite;
        `;
        
        button.style.position = 'relative';
        button.appendChild(aura);
    }
    
    removeButtonAura(button) {
        const aura = button.querySelector('.button-aura');
        if (aura) {
            aura.remove();
        }
    }
    
    startAnimationLoop() {
        const animate = () => {
            this.updateParticles();
            this.animationFrameId = requestAnimationFrame(animate);
        };
        
        animate();
        
        // إضافة شعارات جديدة كل 10 ثوان
        setInterval(() => {
            this.addRandomPlatformIcon();
        }, 10000);
    }
    
    addRandomPlatformIcon() {
        const heroSection = document.getElementById('main-content');
        if (!heroSection) return;
        
        const additionalPlatforms = [
            'img/BYBIT.jpg',
            'img/OKX_Logo.svg', 
            'img/unnamed.webp',
            'cryptologos/ethereum-eth-logo.png',
            'cryptologos/binance-coin-bnb-logo.png'
        ];
        
        const randomPlatform = additionalPlatforms[Math.floor(Math.random() * additionalPlatforms.length)];
        
        const iconElement = document.createElement('div');
        iconElement.className = 'floating-icon temp-icon';
        
        const img = document.createElement('img');
        img.src = randomPlatform;
        img.style.cssText = 'width: 100%; height: 100%; object-fit: contain; border-radius: 50%;';
        iconElement.appendChild(img);
        
        const x = Math.random() * (window.innerWidth - 50);
        const y = Math.random() * (window.innerHeight - 50);
        
        iconElement.style.cssText = `
            position: absolute;
            left: ${x}px;
            top: ${y}px;
            width: 35px;
            height: 35px;
            z-index: 3;
            user-select: none;
            pointer-events: none;
            border-radius: 50%;
            box-shadow: 0 4px 15px rgba(38, 161, 123, 0.4);
            animation: floatingParticles 8s ease-in-out infinite;
            opacity: 0.8;
        `;
        
        heroSection.appendChild(iconElement);
        
        // إزالة الأيقونة بعد 15 ثانية
        setTimeout(() => {
            iconElement.remove();
        }, 15000);
    }
    
    updateParticles() {
        this.particles.forEach(particle => {
            // تحديث موقع الجسيمات
            particle.x += particle.vx;
            particle.y += particle.vy;
            
            // إعادة تدوير الجسيمات عند الخروج من الشاشة
            if (particle.x < -50) particle.x = window.innerWidth + 50;
            if (particle.x > window.innerWidth + 50) particle.x = -50;
            if (particle.y < -50) particle.y = window.innerHeight + 50;
            if (particle.y > window.innerHeight + 50) particle.y = -50;
            
            // تطبيق الموقع الجديد
            particle.element.style.left = particle.x + 'px';
            particle.element.style.top = particle.y + 'px';
        });
    }
    
    handleResize() {
        // إعادة تنظيم العناصر عند تغيير حجم النافذة
        this.particles.forEach(particle => {
            particle.x = Math.random() * window.innerWidth;
            particle.y = Math.random() * window.innerHeight;
        });
    }
    
    destroy() {
        // تنظيف الموارد
        if (this.animationFrameId) {
            cancelAnimationFrame(this.animationFrameId);
        }
        
        // إزالة العناصر المضافة
        document.querySelectorAll('.dynamic-particle, .floating-icon, .temp-icon, .interactive-bg, .light-beam').forEach(el => {
            el.remove();
        });
        
        const follower = document.getElementById('mouse-follower');
        if (follower) follower.remove();
        
        this.isInitialized = false;
        console.log('🎨 Hero Animation System Destroyed');
    }
}

// إضافة الأنيميشن المخصص للـ CSS
const additionalStyles = `
    @keyframes rippleExpand {
        0% {
            width: 0;
            height: 0;
            opacity: 0.8;
        }
        100% {
            width: 200px;
            height: 200px;
            margin: -100px 0 0 -100px;
            opacity: 0;
        }
    }
    
    .dynamic-particle {
        filter: blur(0.5px);
        mix-blend-mode: screen;
    }
    
    .hero-interactive-element {
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }
    
    .hero-interactive-element:hover {
        filter: brightness(1.1) saturate(1.2);
    }
`;

// إضافة الأنماط إلى الصفحة
const styleSheet = document.createElement('style');
styleSheet.textContent = additionalStyles;
document.head.appendChild(styleSheet);

// تهيئة النظام
const heroAnimationSystem = new HeroAnimationSystem();

// تصدير للاستخدام العام
window.HeroAnimationSystem = HeroAnimationSystem;
window.heroAnimationSystem = heroAnimationSystem;

// تنظيف عند إغلاق الصفحة
window.addEventListener('beforeunload', () => {
    heroAnimationSystem.destroy();
});

console.log('🚀 Advanced Hero Animation System Loaded Successfully!');