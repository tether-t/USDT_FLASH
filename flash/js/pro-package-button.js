// وظيفة زر الباقة الاحترافية المحسنة مع علم النفس الرقمي
// Enhanced Pro Package Button with Digital Psychology

document.addEventListener('DOMContentLoaded', function() {
    const proPackageButton = document.getElementById('pro-package-redirect-btn');
    
    if (proPackageButton) {
        // تحسين الزر بصرياً
        enhanceProButton(proPackageButton);
        
        proPackageButton.addEventListener('click', function(e) {
            e.preventDefault();
            
            // تطبيق مبادئ علم النفس الرقمي
            applyPsychologicalEffects(this);
            
            // حفظ البيانات مع معلومات إضافية
            localStorage.setItem('selectedPackage', JSON.stringify({
                name: "الباقة الاحترافية",
                amount: "2,500 USDT-FLASH",
                price: "$200",
                class: "package-pro",
                bonusIncluded: "100 USDT-FLASH مجاناً",
                selectedAt: new Date().toISOString(),
                userInteractionScore: calculateInteractionScore()
            }));
            
            // تأثير التحميل المحسن
            showEnhancedLoadingState(this);
            
            // إظهار رسالة تأكيد نفسي
            showConfirmationMessage();
            
            setTimeout(() => {
                window.location.href = 'payment.html';
            }, 1500);
        });
        
        // إضافة مؤثرات تفاعلية
        addInteractiveEffects(proPackageButton);
    }
});

// تحسين الزر بصرياً
function enhanceProButton(button) {
    button.classList.add('smart-cta-button', 'tether-cta-button');
    button.style.position = 'relative';
    button.style.overflow = 'hidden';
    
    // إضافة أيقونة متقدمة
    if (!button.querySelector('.fas')) {
        const icon = document.createElement('i');
        icon.className = 'fas fa-crown mr-2';
        button.insertBefore(icon, button.firstChild);
    }
    
    // إضافة شارة الحصرية
    const exclusiveBadge = document.createElement('span');
    exclusiveBadge.className = 'absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full font-bold animate-pulse';
    exclusiveBadge.textContent = 'حصري';
    button.appendChild(exclusiveBadge);
}

// تطبيق التأثيرات النفسية
function applyPsychologicalEffects(button) {
    // مبدأ الالتزام - إظهار أن المستخدم اتخذ قراراً
    button.style.background = 'linear-gradient(135deg, #059669 0%, #047857 100%)';
    button.style.transform = 'scale(0.95)';
    
    // تأثير صوتي (إذا كان متاحاً)
    playSuccessSound();
    
    // تحديث النص بثقة
    button.innerHTML = '<i class="fas fa-check-circle mr-2"></i> تم الاختيار بنجاح!';
    
    setTimeout(() => {
        button.style.transform = 'scale(1)';
    }, 200);
}

// حساب نقاط التفاعل
function calculateInteractionScore() {
    const pageTime = (Date.now() - performance.timing.navigationStart) / 1000;
    const scrollDepth = Math.max(0, window.pageYOffset / (document.body.scrollHeight - window.innerHeight)) * 100;
    
    let score = 0;
    if (pageTime > 30) score += 10; // قضى وقتاً كافياً
    if (scrollDepth > 50) score += 10; // تصفح كمية كافية
    if (localStorage.getItem('userReturned')) score += 20; // زائر عائد
    
    return Math.min(100, score + Math.floor(Math.random() * 30));
}

// إظهار حالة التحميل المحسنة
function showEnhancedLoadingState(button) {
    const loadingStates = [
        '<i class="fas fa-shield-check mr-2 animate-spin"></i> التحقق من الأمان...',
        '<i class="fas fa-sync-alt mr-2 animate-spin"></i> تأمين المعاملة...',
        '<i class="fas fa-rocket mr-2 animate-pulse"></i> تحضير الطلب...'
    ];
    
    let currentState = 0;
    const updateState = () => {
        if (currentState < loadingStates.length) {
            button.innerHTML = loadingStates[currentState];
            currentState++;
            setTimeout(updateState, 500);
        }
    };
    
    updateState();
}

// إظهار رسالة التأكيد النفسي
function showConfirmationMessage() {
    const message = document.createElement('div');
    message.className = 'fixed top-4 left-1/2 transform -translate-x-1/2 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg z-50 transition-all duration-300';
    message.innerHTML = `
        <div class="flex items-center">
            <i class="fas fa-check-circle mr-2"></i>
            <span>اختيار ممتاز! جاري تحضير الباقة الاحترافية...</span>
        </div>
    `;
    
    document.body.appendChild(message);
    
    // تحريك الظهور
    setTimeout(() => {
        message.style.transform = 'translate(-50%, 0)';
    }, 100);
    
    // إزالة الرسالة
    setTimeout(() => {
        message.style.transform = 'translate(-50%, -100px)';
        message.style.opacity = '0';
        setTimeout(() => message.remove(), 300);
    }, 2000);
}

// إضافة تأثيرات تفاعلية
function addInteractiveEffects(button) {
    // تأثير الهوفر المحسن
    button.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-2px) scale(1.05)';
        this.style.boxShadow = '0 10px 30px rgba(26, 132, 98, 0.4)';
        
        // إضافة تأثير ضوئي
        const lightEffect = document.createElement('div');
        lightEffect.className = 'absolute inset-0 bg-white opacity-10 rounded-lg';
        lightEffect.style.background = 'linear-gradient(45deg, transparent, rgba(255,255,255,0.2), transparent)';
        lightEffect.style.animation = 'shimmer 1s infinite';
        this.appendChild(lightEffect);
        
        setTimeout(() => lightEffect.remove(), 1000);
    });
    
    button.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
        this.style.boxShadow = '0 8px 30px rgba(26, 132, 98, 0.3)';
    });
    
    // تأثير النقر
    button.addEventListener('mousedown', function() {
        this.style.transform = 'translateY(-2px) scale(1.02)';
    });
    
    // تتبع التفاعل للتحليل النفسي
    let hoverCount = 0;
    button.addEventListener('mouseenter', () => {
        hoverCount++;
        if (hoverCount > 3) {
            // المستخدم مهتم - إظهار عرض إضافي
            showInterestBoost(button);
        }
    });
}

// إظهار تحفيز الاهتمام
function showInterestBoost(button) {
    const boost = document.createElement('div');
    boost.className = 'absolute -top-8 left-1/2 transform -translate-x-1/2 bg-yellow-400 text-black px-3 py-1 rounded-full text-xs font-bold animate-bounce';
    boost.textContent = '+ مكافأة إضافية 50 USDT!';
    
    button.appendChild(boost);
    
    setTimeout(() => {
        boost.style.animation = 'fadeOut 0.5s';
        setTimeout(() => boost.remove(), 500);
    }, 3000);
}

// تشغيل الصوت (إذا كان متاحاً)
function playSuccessSound() {
    try {
        const audio = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSlx0fDamEELEWq+6OWjUQwMUrDh8bVrIAU2jdjz2n0vBTFx0+PmnFsWElyx5/OmcCcESorW8dpjGQc6ktv01oQzBSl+y/LadSsFLIHO8diJOQgZZrjs4KBODApc2+DnwnUiBC12yO7fkEUKEWvA5eimeTEEKYPU8ddnGgQ7k9j010o5Axh+zehBAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSlx0fDamEELEWq+6OWjUQwMUrDh8bVrIAU2jdjz2n0vBTFx0+PmnFsWElyx5/OmcCcESorW8dpjGQc6ktv01oQzBSl+y/LadSsFLIHO8diJOQgZZrjs4KBODApc2+DnwnUiBC12yO7fkEUKEWvA5eimeTEEKYPU8ddnGgQ=');
        audio.play().catch(() => {}); // تجاهل الأخطاء إذا لم يُسمح بالصوت
    } catch (e) {
        // تجاهل أخطاء الصوت
    }
}

// إضافة الأنماط CSS المطلوبة
const style = document.createElement('style');
style.textContent = `
    @keyframes shimmer {
        0% { transform: translateX(-100%); }
        100% { transform: translateX(100%); }
    }
    
    @keyframes fadeOut {
        0% { opacity: 1; transform: translate(-50%, 0) scale(1); }
        100% { opacity: 0; transform: translate(-50%, -10px) scale(0.9); }
    }
    
    .smart-cta-button {
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        will-change: transform, box-shadow;
    }
    
    .smart-cta-button:focus {
        outline: none;
        box-shadow: 0 0 0 3px rgba(26, 132, 98, 0.3);
    }
`;

document.head.appendChild(style);