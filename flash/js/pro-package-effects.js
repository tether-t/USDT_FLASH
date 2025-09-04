// تأثيرات خاصة لباقة Pro لجعلها أكثر جاذبية

// تنفيذ الكود فور تحميل الصفحة
(function() {
    // التأكد من تنفيذ الكود بعد تحميل DOM بالكامل
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initializeEffects);
    } else {
        // إذا كان DOM قد تم تحميله بالفعل
        initializeEffects();
    }
    
    // وظيفة تهيئة جميع التأثيرات
    function initializeEffects() {
        console.log('Initializing Pro Package effects...');
        
        // Remove countdown timer initialization
        
        // إضافة تأثيرات حركية إضافية
        addProPackageEffects();
        
        // إضافة تأثير النقر على زر الباقة
        enhanceProButton();
    }
})();

// وظيفة العداد التنازلي
function startCountdown() {
    console.log('Starting countdown function...');
    
    // البحث عن عنصر العداد التنازلي
    const countdownTimer = document.querySelector('.countdown-timer');
    if (!countdownTimer) {
        console.error('Countdown timer element not found!');
        return;
    }
    
    console.log('Countdown timer element found:', countdownTimer);
    
    // البحث عن عناصر الساعات والدقائق والثواني
    const spans = countdownTimer.querySelectorAll('span');
    if (spans.length < 3) {
        console.error('Not enough span elements found in countdown timer!');
        return;
    }
    
    const hoursElement = spans[0];
    const minutesElement = spans[1];
    const secondsElement = spans[2];
    
    console.log('Hour, minute, second elements found');
    
    // تعيين وقت انتهاء العرض (24 ساعة من الآن أو استخدام القيمة المخزنة)
    let endTime;
    try {
        const savedEndTime = localStorage.getItem('proPackageEndTime');
        
        if (savedEndTime) {
            // استخدام الوقت المخزن إذا كان موجودًا
            endTime = new Date(parseInt(savedEndTime));
            console.log('Using saved end time:', endTime);
            
            // التحقق مما إذا كان الوقت المخزن قد انتهى بالفعل
            const now = new Date();
            if (endTime <= now) {
                console.log('Saved end time has passed, setting new end time');
                // إذا انتهى الوقت، قم بتعيين وقت جديد (24 ساعة من الآن)
                endTime = new Date(now.getTime() + 24 * 60 * 60 * 1000);
                localStorage.setItem('proPackageEndTime', endTime.getTime().toString());
            }
        } else {
            // إذا لم يكن هناك وقت مخزن، قم بتعيين وقت جديد (24 ساعة من الآن)
            const now = new Date();
            endTime = new Date(now.getTime() + 24 * 60 * 60 * 1000);
            console.log('Setting new end time:', endTime);
            localStorage.setItem('proPackageEndTime', endTime.getTime().toString());
        }
    } catch (error) {
        console.error('Error with localStorage:', error);
        // في حالة حدوث خطأ، استخدم وقت افتراضي
        const now = new Date();
        endTime = new Date(now.getTime() + 24 * 60 * 60 * 1000);
    }
    
    // إضافة تأثير بصري عند بدء العداد
    countdownTimer.classList.add('countdown-started');
    setTimeout(() => {
        countdownTimer.classList.remove('countdown-started');
    }, 1500);
    
    // تحديث العداد كل ثانية
    function updateCountdown() {
        try {
            const currentTime = new Date();
            const diff = endTime - currentTime;
            
            if (diff <= 0) {
                // إعادة تعيين العداد عند انتهاء الوقت
                const newEndTime = new Date(currentTime.getTime() + 24 * 60 * 60 * 1000);
                endTime = newEndTime;
                localStorage.setItem('proPackageEndTime', endTime.getTime().toString());
                console.log('Timer reset, new end time:', endTime);
            }
            
            const hours = Math.floor(diff / (1000 * 60 * 60));
            const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((diff % (1000 * 60)) / 1000);
            
            // تحديث النص مباشرة أولاً للتأكد من عمل العداد
            hoursElement.textContent = hours.toString().padStart(2, '0');
            minutesElement.textContent = minutes.toString().padStart(2, '0');
            secondsElement.textContent = seconds.toString().padStart(2, '0');
            
            // تأثير وميض عند تغير الثواني
            secondsElement.classList.add('flash');
            setTimeout(() => {
                secondsElement.classList.remove('flash');
            }, 500);
            
            // تأثير وميض عند تغير الدقائق
            if (seconds === 0) {
                minutesElement.classList.add('flash');
                setTimeout(() => {
                    minutesElement.classList.remove('flash');
                }, 500);
            }
            
            // تأثير وميض عند تغير الساعات
            if (seconds === 0 && minutes === 0) {
                hoursElement.classList.add('flash');
                setTimeout(() => {
                    hoursElement.classList.remove('flash');
                }, 500);
                
                // تأثير إضافي عند تغير الساعة
                countdownTimer.classList.add('hour-changed');
                setTimeout(() => {
                    countdownTimer.classList.remove('hour-changed');
                }, 1000);
            }
            
            // إذا كان الوقت المتبقي أقل من ساعة، أضف تأثير الإلحاح
            if (hours === 0 && minutes < 30) {
                countdownTimer.classList.add('urgent');
            } else {
                countdownTimer.classList.remove('urgent');
            }
        } catch (error) {
            console.error('Error updating countdown:', error);
        }
    }
    
    // تحديث العداد فورًا
    updateCountdown();
    console.log('Initial countdown update complete');
    
    // تحديث العداد كل ثانية
    const intervalId = setInterval(updateCountdown, 1000);
    console.log('Countdown interval set with ID:', intervalId);
    
    // تخزين معرف الفاصل الزمني للتنظيف لاحقًا إذا لزم الأمر
    window.countdownIntervalId = intervalId;
    
    // إضافة معلومات التصحيح للتحقق من عمل العداد
    console.log('Countdown function initialized successfully');
}

// وظيفة إضافة تأثيرات حركية إضافية
function addProPackageEffects() {
    const proPackage = document.querySelector('.pro-package-highlight');
    if (!proPackage) return;
    
    // إضافة تأثير نبض للباقة كل فترة
    setInterval(() => {
        proPackage.classList.add('pulse-effect');
        setTimeout(() => {
            proPackage.classList.remove('pulse-effect');
        }, 1000);
    }, 10000);
    
    // إضافة تأثير توهج للميزة الحصرية
    const exclusiveBonus = proPackage.querySelector('.exclusive-bonus');
    if (exclusiveBonus) {
        setInterval(() => {
            exclusiveBonus.classList.add('glow-effect');
            setTimeout(() => {
                exclusiveBonus.classList.remove('glow-effect');
            }, 1500);
        }, 5000);
    }
    
    // إضافة تأثير حركة للشارات
    const badges = proPackage.querySelectorAll('.best-value-badge');
    badges.forEach(badge => {
        badge.addEventListener('mouseover', function() {
            this.style.transform = 'scale(1.1)';
        });
        
        badge.addEventListener('mouseout', function() {
            this.style.transform = '';
        });
    });
}

// وظيفة تحسين زر الباقة
function enhanceProButton() {
    const proButton = document.getElementById('pro-package-btn');
    if (!proButton) return;
    
    proButton.addEventListener('mouseover', function() {
        this.innerHTML = '<i class="fas fa-bolt"></i> <span>Get Pro Now!</span>';
    });
    
    proButton.addEventListener('mouseout', function() {
        this.innerHTML = '<i class="fas fa-shopping-cart"></i> <span>Choose Package</span>';
    });
    
    // إضافة تأثير نقر خاص
    proButton.addEventListener('click', function() {
        // إضافة تأثير انفجار عند النقر
        const explosion = document.createElement('div');
        explosion.className = 'click-explosion';
        this.appendChild(explosion);
        
        setTimeout(() => {
            explosion.remove();
        }, 1000);
    });
}

// إضافة CSS للتأثيرات الإضافية
document.addEventListener('DOMContentLoaded', function() {
    const style = document.createElement('style');
    style.textContent = `
        .flash {
            animation: flash-animation 0.5s;
        }
        
        @keyframes flash-animation {
            0% { opacity: 1; }
            50% { opacity: 0.5; }
            100% { opacity: 1; }
        }
        
        .pulse-effect {
            animation: package-pulse 1s;
        }
        
        @keyframes package-pulse {
            0% { transform: scale(1.05); }
            50% { transform: scale(1.08); }
            100% { transform: scale(1.05); }
        }
        
        .glow-effect {
            animation: bonus-glow 1.5s;
        }
        
        @keyframes bonus-glow {
            0% { box-shadow: 0 0 5px rgba(16, 185, 129, 0.3); }
            50% { box-shadow: 0 0 20px rgba(16, 185, 129, 0.6); }
            100% { box-shadow: 0 0 5px rgba(16, 185, 129, 0.3); }
        }
        
        .click-explosion {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 0;
            height: 0;
            border-radius: 50%;
            background: radial-gradient(circle, rgba(255, 255, 255, 0.8) 0%, rgba(255, 255, 255, 0) 70%);
            animation: explosion 1s forwards;
            pointer-events: none;
        }
        
        @keyframes explosion {
            0% { width: 0; height: 0; opacity: 1; }
            100% { width: 300px; height: 300px; opacity: 0; }
        }
    `;
    
    document.head.appendChild(style);
});
