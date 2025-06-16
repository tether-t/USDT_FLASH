 // وظائف الباقات المتاحة

document.addEventListener('DOMContentLoaded', function() {
    // الحصول على العناصر
    const cardsViewBtn = document.getElementById('cards-view-btn');
    const tableViewBtn = document.getElementById('table-view-btn');
    const packagesCards = document.getElementById('packages-cards');
    const packagesTable = document.getElementById('packages-table');
    
    // إضافة تأثيرات مستقبلية للأرقام
    const priceElements = document.querySelectorAll('.package-card .text-4xl');
    priceElements.forEach(el => {
        el.setAttribute('data-text', el.textContent);
    });
    
    // تبديل طريقة العرض
    if (cardsViewBtn && tableViewBtn) {
        cardsViewBtn.addEventListener('click', function() {
            packagesCards.classList.remove('hidden');
            packagesTable.classList.add('hidden');
            cardsViewBtn.classList.add('active');
            tableViewBtn.classList.remove('active');
        });
        
        tableViewBtn.addEventListener('click', function() {
            packagesCards.classList.add('hidden');
            packagesTable.classList.remove('hidden');
            cardsViewBtn.classList.remove('active');
            tableViewBtn.classList.add('active');
            
            // تأثير ظهور تدريجي للجدول
            packagesTable.style.opacity = '0';
            setTimeout(function() {
                packagesTable.style.transition = 'opacity 0.5s ease';
                packagesTable.style.opacity = '1';
            }, 50);
        });
    }
    
    // تأثيرات حركية للأيقونات
    const packageIcons = document.querySelectorAll('.package-icon');
    packageIcons.forEach(icon => {
        // تأثير عشوائي للأيقونات عند تحميل الصفحة
        setTimeout(() => {
            icon.style.transform = 'scale(1.2) rotate(10deg)';
            setTimeout(() => {
                icon.style.transform = 'scale(1) rotate(0deg)';
            }, 300);
        }, Math.random() * 1000);
        
        // إضافة وهج للأيقونات
        const iconColor = window.getComputedStyle(icon).color;
        icon.style.filter = `drop-shadow(0 0 5px ${iconColor})`;
    });
    
    // تأثير تلوين الميزات عند التمرير
    const packageFeatures = document.querySelectorAll('.package-feature');
    packageFeatures.forEach(feature => {
        feature.addEventListener('mouseenter', function() {
            this.style.backgroundColor = 'rgba(16, 185, 129, 0.05)';
            this.style.borderRadius = '4px';
            this.style.padding = '2px 4px';
        });
        
        feature.addEventListener('mouseleave', function() {
            this.style.backgroundColor = 'transparent';
            this.style.padding = '2px 4px';
        });
    });
    
    // تأثير تمييز الصف في جدول المقارنة
    const tableRows = document.querySelectorAll('.comparison-table tbody tr');
    tableRows.forEach(row => {
        row.addEventListener('mouseenter', function() {
            this.style.backgroundColor = 'rgba(16, 185, 129, 0.05)';
        });
        
        row.addEventListener('mouseleave', function() {
            this.style.backgroundColor = '';
        });
    });
    
    // إضافة وظائف لأزرار الباقات
    const packageButtons = document.querySelectorAll('.package-btn, .comparison-table button');
    packageButtons.forEach(button => {
        button.addEventListener('click', function() {
            // حفظ مرجع للزر
            const btn = this;
            const originalText = btn.innerHTML;
            
            // تحديد معلومات الباقة
            let packageName, packageAmount, packagePrice, packageClass;
            
            // تحديد الباقة بناءً على الزر المضغوط
            if (btn.id === 'basic-package-btn' || btn.closest('td')?.previousElementSibling?.textContent === 'Basic Package') {
                packageName = "Basic Package";
                packageAmount = "499 USDT-FLASH";
                packagePrice = "$29.99";
                packageClass = "package-basic";
            } else if (btn.id === 'pro-package-btn' || btn.closest('td')?.previousElementSibling?.textContent === 'Pro Package') {
                packageName = "Pro Package";
                packageAmount = "2,500 USDT-FLASH";
                packagePrice = "$99.99";
                packageClass = "package-pro";
            } else if (btn.id === 'enterprise-package-btn' || btn.closest('td')?.previousElementSibling?.textContent === 'Enterprise Package') {
                packageName = "Enterprise Package";
                packageAmount = "10,000 USDT-FLASH";
                packagePrice = "$199";
                packageClass = "package-enterprise";
            }
            
            // حفظ معلومات الباقة في التخزين المحلي
            localStorage.setItem('selectedPackage', JSON.stringify({
                name: packageName,
                amount: packageAmount,
                price: packagePrice,
                class: packageClass
            }));
            
            // تغيير نص الزر وإضافة أيقونة تحميل
            btn.innerHTML = '<i class="fas fa-spinner fa-spin ml-2"></i> Processing...';
            btn.disabled = true;
            
            // التحقق مما إذا كان المستخدم زائرًا أو غير مسجل
            const userData = localStorage.getItem('user');
            const isLoggedIn = userData ? JSON.parse(userData).isLoggedIn : false;
            const isGuest = userData ? JSON.parse(userData).isGuest : false;
            
            // محاكاة معالجة الطلب
            setTimeout(() => {
                btn.innerHTML = '<i class="fas fa-check ml-2"></i> Selected!';
                btn.classList.add('selected-package');
                
                // إذا كان المستخدم زائرًا أو غير مسجل، توجيهه إلى صفحة التسجيل
                if (!isLoggedIn || isGuest) {
                    // حفظ معلومات الباقة وتوجيه المستخدم إلى صفحة التسجيل
                    localStorage.setItem('redirectAfterRegister', 'pages/payment.html');
                    setTimeout(() => {
                        window.location.href = 'pages/register.html';
                    }, 1000);
                } else {
                    // توجيه المستخدم المسجل إلى صفحة الدفع مباشرة
                    setTimeout(() => {
                        window.location.href = 'pages/payment.html';
                    }, 1000);
                }
            }, 1500);
        });
    });
});

// إضافة عداد تنازلي للحزمة الأساسية
function startBasicCountdown() {
    const countdownElement = document.getElementById('basic-countdown-timer');
    if (!countdownElement) return;
    
    const spans = countdownElement.querySelectorAll('span');
    if (spans.length < 3) return;
    
    let hours = 23;
    let minutes = 59;
    let seconds = 59;
    
    function updateCountdown() {
        spans[0].textContent = hours.toString().padStart(2, '0');
        spans[1].textContent = minutes.toString().padStart(2, '0');  
        spans[2].textContent = seconds.toString().padStart(2, '0');
        
        if (seconds > 0) {
            seconds--;
        } else if (minutes > 0) {
            minutes--;
            seconds = 59;
        } else if (hours > 0) {
            hours--;
            minutes = 59;
            seconds = 59;
        } else {
            // إعادة تعيين العداد عند الانتهاء
            hours = 23;
            minutes = 59;
            seconds = 59;
        }
    }
    
    setInterval(updateCountdown, 1000);
}

// بدء العداد التنازلي عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', startBasicCountdown);

// إضافة تأثيرات مستقبلية
document.addEventListener('DOMContentLoaded', function() {
    // تأثير حركة ثلاثية الأبعاد للبطاقات
    const packageCards = document.querySelectorAll('.package-card');
    
    packageCards.forEach(card => {
        card.addEventListener('mousemove', function(e) {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
        });
        
        card.addEventListener('mouseleave', function() {
            card.style.transform = '';
        });
    });
    
    // تأثير تحميل متدرج للبطاقات
    setTimeout(() => {
        packageCards.forEach((card, index) => {
            setTimeout(() => {
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
                card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, 50);
            }, index * 150);
        });
    }, 300);
});