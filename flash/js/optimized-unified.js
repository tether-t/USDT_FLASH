/* ملف JavaScript موحد ومحسن لتحسين الأداء */

// تحسين الأداء - تأجيل التنفيذ حتى تحميل DOM
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

// تهيئة التطبيق الرئيسية
function initializeApp() {
    // تهيئة العناصر الأساسية فقط
    initializeHeader();
    initializePackages();
    initializeTestimonials();
    initializeUserSystem();
    
    // تأجيل العناصر غير الأساسية
    setTimeout(() => {
        initializeAnimations();
        initializeTracking();
    }, 1000);
}

// تهيئة الهيدر
function initializeHeader() {
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    const mobileMenu = document.getElementById('mobileMenu');
    
    if (mobileToggle && mobileMenu) {
        mobileToggle.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
    }
}

// تهيئة الباقات بتقنيات علم النفس المتطورة
function initializePackages() {
    const packagesContainer = document.getElementById('packages-cards');
    if (!packagesContainer) return;
    
    const packages = [
        {
            name: 'Starter',
            originalPrice: '$299',
            price: '$199',
            amount: '2,500 USDT-FLASH',
            savings: '33%',
            features: ['⚡ Instant Delivery', '🛡️ Bank Security', '📞 24/7 Support'],
            url: 'pages/payment-basic.html',
            color: 'emerald',
            urgency: '47 left today',
            social: '2,847 purchased'
        },
        {
            name: 'Professional',
            originalPrice: '$499',
            price: '$299',
            amount: '5,000 USDT-FLASH',
            savings: '40%',
            features: ['🚀 Priority Processing', '💎 VIP Support', '🎁 Bonus 500 FLASH'],
            url: 'pages/payment-pro.html',
            color: 'blue',
            popular: true,
            urgency: '23 left today',
            social: '4,921 purchased',
            badge: 'BEST VALUE'
        },
        {
            name: 'Enterprise',
            originalPrice: '$699',
            price: '$399',
            amount: '10,000 USDT-FLASH',
            savings: '43%',
            features: ['👑 Exclusive Access', '🔥 Maximum Limits', '💰 Bonus 1,500 FLASH'],
            url: 'pages/payment-enterprise.html',
            color: 'purple',
            urgency: '12 left today',
            social: '1,634 purchased',
            badge: 'LIMITED'
        }
    ];
    
    packagesContainer.innerHTML = packages.map((pkg, index) => `
        <div class="psychology-package-card ${pkg.color}" onclick="handlePackageClick('${pkg.url}')" data-package="${index}">
            ${pkg.popular ? '<div class="popular-ribbon"><span>MOST POPULAR</span></div>' : ''}
            ${pkg.badge ? `<div class="urgency-badge ${pkg.badge === 'LIMITED' ? 'limited' : 'value'}">${pkg.badge}</div>` : ''}
            
            <div class="package-header">
                <div class="package-icon">
                    ${index === 0 ? '🚀' : index === 1 ? '💎' : '👑'}
                </div>
                <h3 class="package-title">${pkg.name}</h3>
                <div class="savings-indicator">SAVE ${pkg.savings}</div>
            </div>
            
            <div class="price-section">
                <div class="original-price">$${pkg.originalPrice.replace('$', '')}</div>
                <div class="current-price">${pkg.price}</div>
                <div class="price-note">Limited Time Only</div>
            </div>
            
            <div class="amount-display">
                <span class="amount-number">${pkg.amount.split(' ')[0]}</span>
                <span class="amount-currency">USDT-FLASH</span>
            </div>
            
            <div class="social-proof">
                <div class="purchased-count">
                    <i class="fas fa-users"></i>
                    <span>${pkg.social}</span>
                </div>
                <div class="urgency-count">
                    <i class="fas fa-fire"></i>
                    <span>${pkg.urgency}</span>
                </div>
            </div>
            
            <ul class="features-list">
                ${pkg.features.map(feature => `<li class="feature-item">${feature}</li>`).join('')}
            </ul>
            
            <div class="package-footer">
                <button class="psychology-btn">
                    <span class="btn-text">CLAIM NOW</span>
                    <span class="btn-arrow">→</span>
                </button>
                <div class="guarantee-text">
                    <i class="fas fa-shield-check"></i>
                    30-Day Money Back Guarantee
                </div>
            </div>
            
            <div class="scarcity-bar">
                <div class="scarcity-fill" style="width: ${100 - (parseInt(pkg.urgency.split(' ')[0]) * 2)}%"></div>
            </div>
        </div>
    `).join('');
    
    // إضافة تأثيرات نفسية متقدمة
    setTimeout(() => {
        addPsychologyEffects();
        startUrgencyCountdown();
        addHoverEffects();
    }, 500);
}

// معالجة النقر على الباقات مع تأثيرات نفسية
function handlePackageClick(url) {
    const userData = JSON.parse(localStorage.getItem('user') || '{}');
    if (!userData.email) {
        showRegistrationModal();
        return;
    }
    
    // تأثير نفسي: إظهار رسالة التحفيز
    showMotivationMessage();
    setTimeout(() => {
        window.location.href = url;
    }, 1000);
}

// إضافة تأثيرات علم النفس المتقدمة
function addPsychologyEffects() {
    const cards = document.querySelectorAll('.psychology-package-card');
    
    cards.forEach((card, index) => {
        // تأثير التركيز البصري
        card.addEventListener('mouseenter', () => {
            cards.forEach(c => c.classList.add('dimmed'));
            card.classList.remove('dimmed');
            card.classList.add('focused');
        });
        
        card.addEventListener('mouseleave', () => {
            cards.forEach(c => {
                c.classList.remove('dimmed', 'focused');
            });
        });
        
        // تأثير الضغط النفسي
        card.addEventListener('click', () => {
            card.classList.add('selected-pulse');
            setTimeout(() => card.classList.remove('selected-pulse'), 600);
        });
    });
}

// عداد الإلحاح التنازلي
function startUrgencyCountdown() {
    const urgencyElements = document.querySelectorAll('.urgency-count span');
    
    urgencyElements.forEach(element => {
        let count = parseInt(element.textContent.split(' ')[0]);
        
        setInterval(() => {
            if (Math.random() < 0.1 && count > 5) {
                count--;
                element.textContent = `${count} left today`;
                
                // تأثير بصري عند النقصان
                element.parentElement.classList.add('urgency-flash');
                setTimeout(() => {
                    element.parentElement.classList.remove('urgency-flash');
                }, 500);
            }
        }, 30000);
    });
}

// تأثيرات التمرير المتقدمة
function addHoverEffects() {
    const cards = document.querySelectorAll('.psychology-package-card');
    
    cards.forEach(card => {
        const btn = card.querySelector('.psychology-btn');
        
        card.addEventListener('mouseenter', () => {
            btn.style.transform = 'scale(1.05)';
            btn.style.boxShadow = '0 10px 30px rgba(0,0,0,0.3)';
        });
        
        card.addEventListener('mouseleave', () => {
            btn.style.transform = 'scale(1)';
            btn.style.boxShadow = '0 5px 15px rgba(0,0,0,0.2)';
        });
    });
}

// رسالة التحفيز النفسي
function showMotivationMessage() {
    const modal = document.createElement('div');
    modal.className = 'motivation-modal';
    modal.innerHTML = `
        <div class="motivation-content">
            <div class="motivation-icon">🚀</div>
            <h3>Excellent Choice!</h3>
            <p>You're about to join thousands of successful traders</p>
            <div class="loading-bar"><div class="loading-fill"></div></div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    setTimeout(() => {
        modal.remove();
    }, 1000);
}

// نافذة التسجيل المحفزة
function showRegistrationModal() {
    const modal = document.createElement('div');
    modal.className = 'registration-modal';
    modal.innerHTML = `
        <div class="modal-overlay" onclick="this.parentElement.remove()"></div>
        <div class="modal-content">
            <div class="modal-header">
                <h3>🎯 Don't Miss This Opportunity!</h3>
                <button onclick="this.closest('.registration-modal').remove()" class="close-btn">×</button>
            </div>
            <div class="modal-body">
                <div class="urgency-message">
                    <i class="fas fa-clock"></i>
                    <span>Limited time offer expires soon!</span>
                </div>
                <p>Join <strong>89,000+</strong> successful traders who trust USDT-FLASH</p>
                <div class="benefits-list">
                    <div class="benefit">✅ Instant access after registration</div>
                    <div class="benefit">✅ 30-day money-back guarantee</div>
                    <div class="benefit">✅ 24/7 premium support</div>
                </div>
            </div>
            <div class="modal-footer">
                <button onclick="window.location.href='pages/register.html'" class="register-now-btn">
                    REGISTER NOW & SAVE
                </button>
                <div class="security-note">
                    <i class="fas fa-shield-alt"></i>
                    Secure registration - takes 30 seconds
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
}

// تهيئة الشهادات
function initializeTestimonials() {
    const testimonials = document.querySelectorAll('.testimonial-slide');
    if (testimonials.length === 0) return;
    
    let currentIndex = 0;
    
    function showTestimonial(index) {
        testimonials.forEach((slide, i) => {
            slide.classList.toggle('active', i === index);
        });
    }
    
    function nextTestimonial() {
        currentIndex = (currentIndex + 1) % testimonials.length;
        showTestimonial(currentIndex);
    }
    
    // عرض أول شهادة
    showTestimonial(0);
    
    // تغيير تلقائي كل 5 ثوان
    setInterval(nextTestimonial, 5000);
    
    // أزرار التحكم
    const prevBtn = document.getElementById('prev-testimonial');
    const nextBtn = document.getElementById('next-testimonial');
    
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            currentIndex = currentIndex === 0 ? testimonials.length - 1 : currentIndex - 1;
            showTestimonial(currentIndex);
        });
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', nextTestimonial);
    }
}

// نظام المستخدم
function initializeUserSystem() {
    updateUserInfo();
    loadReferralData();
}

// تحديث معلومات المستخدم
function updateUserInfo() {
    const userData = JSON.parse(localStorage.getItem('user') || '{}');
    const userInfo = document.getElementById('user-info');
    
    if (userInfo && userData.name) {
        userInfo.innerHTML = `
            <div class="flex items-center">
                <div class="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center mr-2">
                    <span class="text-white text-sm font-bold">${userData.name.charAt(0)}</span>
                </div>
                <span class="text-white font-medium">${userData.name}</span>
            </div>
        `;
    }
}

// تحميل بيانات الإحالة
function loadReferralData() {
    const userData = JSON.parse(localStorage.getItem('user') || '{}');
    const referralData = JSON.parse(localStorage.getItem('referralData') || '{}');
    
    if (!referralData.code && userData.email) {
        const name = (userData.firstName || userData.name || 'USER').toUpperCase();
        const timestamp = Date.now().toString().slice(-4);
        referralData.code = `${name.slice(0, 3)}${timestamp}`;
        referralData.totalReferrals = 0;
        referralData.successfulReferrals = 0;
        referralData.referralBalance = 0;
        localStorage.setItem('referralData', JSON.stringify(referralData));
    }
    
    // تحديث عناصر الصفحة
    const elements = {
        'home-referralCode': referralData.code || 'REGISTER FIRST',
        'home-totalReferrals': referralData.totalReferrals || 0,
        'home-successfulReferrals': referralData.successfulReferrals || 0,
        'home-referralBalance': referralData.referralBalance || 0
    };
    
    Object.entries(elements).forEach(([id, value]) => {
        const element = document.getElementById(id);
        if (element) element.textContent = value;
    });
}

// تهيئة الرسوم المتحركة (مؤجلة)
function initializeAnimations() {
    // عداد الأرقام
    const counters = document.querySelectorAll('.counter');
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        const increment = target / 100;
        let current = 0;
        
        const updateCounter = () => {
            if (current < target) {
                current += increment;
                counter.textContent = Math.ceil(current);
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target;
            }
        };
        
        // بدء العداد عند ظهور العنصر
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    updateCounter();
                    observer.unobserve(entry.target);
                }
            });
        });
        
        observer.observe(counter);
    });
}

// نظام التتبع (مؤجل)
function initializeTracking() {
    // تتبع بسيط للإحصائيات
    const stats = {
        pageViews: parseInt(localStorage.getItem('pageViews') || '0') + 1,
        lastVisit: new Date().toISOString()
    };
    
    localStorage.setItem('pageViews', stats.pageViews.toString());
    localStorage.setItem('lastVisit', stats.lastVisit);
}

// معالجة الوصول للملف الشخصي
function handleProfileAccess() {
    const userData = JSON.parse(localStorage.getItem('user') || '{}');
    
    if (userData.email || userData.isLoggedIn) {
        window.location.href = 'pages/profile.html';
    } else {
        window.location.href = 'pages/register.html';
    }
}

// معالجة الوصول للوحة الإحالة
function handleQuantumPanelAccess() {
    const userData = JSON.parse(localStorage.getItem('user') || '{}');
    
    if (userData.email) {
        window.location.href = 'pages/profile.html#referral';
    } else {
        if (confirm('You must register first to access the advanced referral system. Do you want to register now?')) {
            window.location.href = 'pages/register.html';
        }
    }
}

// نظام الدردشة المبسط
function initializeChat() {
    const chatToggle = document.getElementById('chat-toggle');
    const chatWindow = document.getElementById('chat-window');
    const chatClose = document.getElementById('chat-close');
    
    if (chatToggle && chatWindow) {
        chatToggle.addEventListener('click', () => {
            chatWindow.classList.toggle('hidden');
        });
    }
    
    if (chatClose && chatWindow) {
        chatClose.addEventListener('click', () => {
            chatWindow.classList.add('hidden');
        });
    }
}

// تحسين الأداء - تأجيل تحميل الصور
function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// تحسين الأداء - تقليل استخدام الذاكرة
function optimizeMemory() {
    // تنظيف المتغيرات غير المستخدمة
    if (window.gc) {
        window.gc();
    }
    
    // إزالة event listeners غير المستخدمة
    const unusedElements = document.querySelectorAll('[data-cleanup]');
    unusedElements.forEach(element => {
        element.removeEventListener('click', () => {});
    });
}

// تشغيل التحسينات عند تحميل الصفحة
window.addEventListener('load', () => {
    setTimeout(() => {
        lazyLoadImages();
        optimizeMemory();
        initializeChat();
    }, 2000);
});

// إتاحة الوظائف عالمياً
window.handleProfileAccess = handleProfileAccess;
window.handleQuantumPanelAccess = handleQuantumPanelAccess;
window.handlePackageClick = handlePackageClick;
window.addPsychologyEffects = addPsychologyEffects;
window.startUrgencyCountdown = startUrgencyCountdown;
window.showMotivationMessage = showMotivationMessage;
window.showRegistrationModal = showRegistrationModal;

// تحسين الأداء - تحميل الصور
function optimizeImages() {
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
        if (!img.hasAttribute('loading')) {
            img.setAttribute('loading', 'lazy');
        }
        
        img.addEventListener('error', function() {
            this.style.display = 'none';
        });
    });
}

// تحسين الأداء - تقليل DOM manipulations
function batchDOMUpdates(updates) {
    requestAnimationFrame(() => {
        updates.forEach(update => update());
    });
}

// تحسين الأداء - debounce للأحداث
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// تحسين الأداء - منع التحميل المتكرر
if (window.optimizedUnifiedLoaded) {
    console.log('Optimized script already loaded');
} else {
    window.optimizedUnifiedLoaded = true;
    
    // تشغيل تحسينات الصور
    setTimeout(optimizeImages, 500);
    
    console.log('Optimized unified script loaded successfully');
}
// وظيفة الإشعارات
function toggleNotifications() {
    alert('الإشعارات:\n• 3 رسائل جديدة\n• 2 طلبات دعم\n• تحديث جديد متاح\n• عرض خاص ينتهي قريباً\n• معاملة جديدة مكتملة');
}

// تحديث عدد الإشعارات بشكل ديناميكي
function updateNotificationCounts() {
    const badges = document.querySelectorAll('.notification-badge:not(.live-badge)');
    badges.forEach(badge => {
        if (!badge.classList.contains('live-badge')) {
            const currentCount = parseInt(badge.textContent) || 0;
            if (Math.random() < 0.1) { // 10% احتمال للتحديث
                const newCount = Math.max(0, currentCount + (Math.random() < 0.5 ? -1 : 1));
                badge.textContent = newCount;
                if (newCount > 0) {
                    badge.style.display = 'flex';
                } else {
                    badge.style.display = 'none';
                }
            }
        }
    });
}

// تشغيل التحديث كل 30 ثانية
setInterval(updateNotificationCounts, 30000);