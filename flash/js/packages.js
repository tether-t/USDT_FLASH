// وظائف الباقات المتاحة

document.addEventListener('DOMContentLoaded', function() {
    // الحصول على العناصر
    const cardsViewBtn = document.getElementById('cards-view-btn');
    const tableViewBtn = document.getElementById('table-view-btn');
    const packagesCards = document.getElementById('packages-cards');
    const packagesTable = document.getElementById('packages-table');
    
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
                packageAmount = "250 USDT-FLASH";
                packagePrice = "$50";
                packageClass = "package-basic";
            } else if (btn.id === 'pro-package-btn' || btn.closest('td')?.previousElementSibling?.textContent === 'Pro Package') {
                packageName = "Pro Package";
                packageAmount = "2,500 USDT-FLASH";
                packagePrice = "$200";
                packageClass = "package-pro";
            } else {
                packageName = "Enterprise Package";
                packageAmount = "10,000 USDT-FLASH";
                packagePrice = "$500";
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