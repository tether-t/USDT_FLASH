// ملف تقنيات الإقناع النفسي والـ UX النفسي
// Psychological UX and Persuasion Techniques

document.addEventListener('DOMContentLoaded', function() {
    console.log('🧠 Psychological UX loaded');
    
    // 1. تفعيل العدادات المتحركة (Animated Counters)
    animateCounters();
    
    // 2. تفعيل تنبيهات الشراء المباشرة
    startPurchaseNotifications();
    
    // 3. تفعيل مؤشر النشاط المباشر
    startLiveActivity();
    
    // 4. تفعيل تأثيرات الأزرار النفسية
    enhanceButtons();
    
    // 5. تفعيل تتبع سلوك المستخدم
    trackUserBehavior();
});

// دالة تحريك العدادات
function animateCounters() {
    const counters = document.querySelectorAll('.counter');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-target'));
                const duration = 2000; // مدة الأنيميشين
                const step = target / (duration / 16); // 60 FPS
                let current = 0;
                
                const updateCounter = () => {
                    current += step;
                    if (current < target) {
                        counter.textContent = Math.floor(current).toLocaleString();
                        requestAnimationFrame(updateCounter);
                    } else {
                        counter.textContent = target.toLocaleString();
                    }
                };
                
                updateCounter();
                observer.unobserve(counter);
            }
        });
    });
    
    counters.forEach(counter => observer.observe(counter));
}

// دالة تنبيهات الشراء المباشرة
function startPurchaseNotifications() {
    const names = [
        'Ahmed M.', 'Sara K.', 'Omar T.', 'Fatima A.', 'Hassan R.',
        'Lila B.', 'Youssef H.', 'Nour S.', 'Karim F.', 'Maya Z.',
        'John D.', 'Emma W.', 'Alex P.', 'Sofia R.', 'Mike C.'
    ];
    
    const packages = ['Basic Package', 'Pro Package', 'Enterprise Package'];
    const times = ['just now', '1 minute ago', '2 minutes ago', '3 minutes ago', '5 minutes ago'];
    
    let notificationIndex = 0;
    
    function showNotification() {
        const notification = document.getElementById('purchase-notification');
        const buyerName = document.getElementById('buyer-name');
        const purchaseDetails = document.getElementById('purchase-details');
        const purchaseTime = document.getElementById('purchase-time');
        
        // اختيار بيانات عشوائية
        const randomName = names[Math.floor(Math.random() * names.length)];
        const randomPackage = packages[Math.floor(Math.random() * packages.length)];
        const randomTime = times[Math.floor(Math.random() * times.length)];
        
        // تحديث المحتوى
        buyerName.textContent = randomName;
        purchaseDetails.textContent = `purchased ${randomPackage}`;
        purchaseTime.textContent = randomTime;
        
        // إظهار التنبيه
        notification.style.transform = 'translateX(0)';
        
        // إخفاء التنبيه بعد 4 ثواني
        setTimeout(() => {
            notification.style.transform = 'translateX(-120%)';
        }, 4000);
        
        notificationIndex++;
    }
    
    // إظهار التنبيه الأول بعد 3 ثواني
    setTimeout(showNotification, 3000);
    
    // إظهار تنبيهات منتظمة كل 15-25 ثانية
    setInterval(() => {
        const randomInterval = Math.random() * 10000 + 15000; // بين 15-25 ثانية
        setTimeout(showNotification, Math.random() * 5000); // تأخير عشوائي
    }, 20000);
}

// دالة مؤشر النشاط المباشر
function startLiveActivity() {
    const liveActivity = document.getElementById('live-activity');
    
    setInterval(() => {
        const currentCount = parseInt(liveActivity.textContent);
        const newCount = Math.max(1, currentCount + (Math.random() > 0.5 ? 1 : -1));
        liveActivity.textContent = Math.min(12, newCount); // حد أقصى 12
    }, 30000); // كل 30 ثانية
    
    // تحديث عدد المشاهدين للباقات
    updatePackageViewers();
}

// دالة تحديث عدد مشاهدي الباقات
function updatePackageViewers() {
    const viewers = {
        'basic-viewers': { min: 15, max: 35, current: 23 },
        'pro-viewers': { min: 80, max: 95, current: 89 }
    };
    
    setInterval(() => {
        Object.keys(viewers).forEach(id => {
            const element = document.getElementById(id);
            if (element) {
                const viewer = viewers[id];
                const change = Math.random() > 0.5 ? 1 : -1;
                viewer.current = Math.max(viewer.min, Math.min(viewer.max, viewer.current + change));
                
                if (id === 'pro-viewers') {
                    element.textContent = viewer.current;
                } else {
                    element.textContent = viewer.current;
                }
            }
        });
    }, 45000); // كل 45 ثانية
}

// دالة تحسين الأزرار نفسياً
function enhanceButtons() {
    const buttons = document.querySelectorAll('.package-btn, .tether-button');
    
    buttons.forEach(button => {
        // تأثير الضغط النفسي
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
            this.style.boxShadow = '0 8px 25px rgba(38, 161, 123, 0.3)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 4px 15px rgba(38, 161, 123, 0.2)';
        });
        
        // تأثير النقر
        button.addEventListener('mousedown', function() {
            this.style.transform = 'translateY(1px) scale(0.98)';
        });
        
        button.addEventListener('mouseup', function() {
            this.style.transform = 'translateY(-2px) scale(1)';
        });
    });
}

// دالة تتبع سلوك المستخدم (للأخلاقيات - لا نحفظ بيانات شخصية)
function trackUserBehavior() {
    let scrollDepth = 0;
    let timeOnPage = Date.now();
    let packageViews = {};
    
    // تتبع عمق التصفح
    window.addEventListener('scroll', () => {
        const currentScroll = Math.round((window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100);
        scrollDepth = Math.max(scrollDepth, currentScroll);
    });
    
    // تتبع مشاهدة الباقات
    const packageCards = document.querySelectorAll('.package-card');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const packageName = entry.target.querySelector('h3')?.textContent || 'Unknown';
                packageViews[packageName] = (packageViews[packageName] || 0) + 1;
            }
        });
    }, { threshold: 0.5 });
    
    packageCards.forEach(card => observer.observe(card));
    
    // إحصائيات بسيطة للتحسين (بدون حفظ بيانات شخصية)
    window.addEventListener('beforeunload', () => {
        const sessionData = {
            timeOnPage: Math.round((Date.now() - timeOnPage) / 1000),
            scrollDepth: scrollDepth,
            packageViews: packageViews,
            timestamp: new Date().toISOString()
        };
        
        console.log('📊 Session Analytics (Local Only):', sessionData);
        // يمكن إرسال هذه البيانات لتحسين UX (بدون معلومات شخصية)
    });
}

// دالة إخفاء تنبيه الشراء
function hidePurchaseNotification() {
    const notification = document.getElementById('purchase-notification');
    notification.style.transform = 'translateX(-120%)';
}

// دالة إضافة تأثيرات الثقة
function addTrustSignals() {
    // إضافة أيقونات الأمان للمدخلات الحساسة
    const sensitiveInputs = document.querySelectorAll('input[type="password"], input[type="email"]');
    
    sensitiveInputs.forEach(input => {
        const container = input.parentElement;
        const trustIcon = document.createElement('div');
        trustIcon.className = 'absolute right-3 top-1/2 transform -translate-y-1/2 text-green-500';
        trustIcon.innerHTML = '<i class="fas fa-shield-alt text-sm"></i>';
        
        if (container.style.position !== 'relative') {
            container.style.position = 'relative';
        }
        
        container.appendChild(trustIcon);
    });
}

// تحسين تجربة النماذج نفسياً
function enhanceForms() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        const inputs = form.querySelectorAll('input, select, textarea');
        let completedFields = 0;
        
        // شريط التقدم النفسي
        const progressBar = document.createElement('div');
        progressBar.className = 'w-full bg-gray-200 rounded-full h-2 mb-4';
        progressBar.innerHTML = '<div class="bg-green-600 h-2 rounded-full transition-all duration-300" style="width: 0%"></div>';
        
        form.insertBefore(progressBar, form.firstChild);
        
        inputs.forEach(input => {
            input.addEventListener('input', () => {
                const filledInputs = Array.from(inputs).filter(inp => inp.value.trim() !== '').length;
                const progress = (filledInputs / inputs.length) * 100;
                
                progressBar.querySelector('div').style.width = progress + '%';
                
                if (progress === 100) {
                    progressBar.querySelector('div').classList.add('bg-green-500');
                }
            });
        });
    });
}

// تفعيل جميع التحسينات عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(() => {
        addTrustSignals();
        enhanceForms();
    }, 1000);
});