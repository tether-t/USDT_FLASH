// 🔍 Arabic Name Detection & Enhancement Script
// كاشف ومحسن الأسماء العربية

document.addEventListener('DOMContentLoaded', function() {
    
    // 🔍 دالة للتحقق من النص العربي
    function isArabicText(text) {
        const arabicRegex = /[\u0600-\u06FF]/;
        return arabicRegex.test(text);
    }

    // 🎨 دالة تحسين عرض الأسماء العربية
    function enhanceArabicNames() {
        // البحث عن جميع أسماء المشترين
        const buyerNames = document.querySelectorAll('.buyer-name, .user-name');
        
        buyerNames.forEach(nameElement => {
            const nameText = nameElement.textContent;
            
            if (isArabicText(nameText)) {
                // إضافة خصائص اللغة العربية
                nameElement.setAttribute('lang', 'ar');
                nameElement.setAttribute('dir', 'rtl');
                
                // إضافة فئة CSS خاصة
                nameElement.classList.add('arabic-name');
                
                // تحسين التنسيق
                nameElement.style.fontFamily = 'Cairo, Tajawal, sans-serif';
                nameElement.style.fontWeight = '600';
                nameElement.style.textAlign = 'right';
                nameElement.style.direction = 'rtl';
            }
        });

        // تحسين الصور الرمزية للأسماء العربية
        const avatars = document.querySelectorAll('.user-avatar');
        
        avatars.forEach(avatar => {
            const avatarText = avatar.textContent;
            
            if (isArabicText(avatarText)) {
                avatar.style.fontFamily = 'Cairo, Tajawal, sans-serif';
                avatar.style.fontWeight = '700';
                avatar.style.fontSize = '16px';
            }
        });
    }

    // 🔄 تشغيل التحصين كل 3 ثوان
    setInterval(enhanceArabicNames, 3000);
    
    // ✨ تشغيل فوري
    setTimeout(enhanceArabicNames, 1000);

    // 🎯 مراقب التغييرات في DOM
    const observer = new MutationObserver(function(mutations) {
        let shouldEnhance = false;
        
        mutations.forEach(function(mutation) {
            if (mutation.type === 'childList') {
                mutation.addedNodes.forEach(function(node) {
                    if (node.nodeType === 1) { // Element node
                        if (node.classList && 
                            (node.classList.contains('activity-item') || 
                             node.classList.contains('wallet-notification'))) {
                            shouldEnhance = true;
                        }
                    }
                });
            }
        });
        
        if (shouldEnhance) {
            setTimeout(enhanceArabicNames, 500);
        }
    });

    // بدء مراقبة التغييرات
    observer.observe(document.body, {
        childList: true,
        subtree: true
    });

    // 🎨 إضافة أنماط إضافية للأسماء العربية
    const arabicStyles = `
        <style>
        .arabic-name {
            background: linear-gradient(90deg, transparent, rgba(16, 185, 129, 0.05), transparent) !important;
            padding: 2px 4px !important;
            border-radius: 4px !important;
            transition: all 0.3s ease !important;
        }

        .arabic-name:hover {
            background: linear-gradient(90deg, rgba(16, 185, 129, 0.1), rgba(16, 185, 129, 0.05), rgba(16, 185, 129, 0.1)) !important;
            transform: translateX(2px) !important;
        }

        .activity-item:hover .arabic-name {
            color: #059669 !important;
            text-shadow: 0 1px 2px rgba(5, 150, 105, 0.2) !important;
        }

        /* تحسين النصوص العربية في الإشعارات */
        .notification-content .arabic-name {
            color: #1f2937 !important;
            font-weight: 600 !important;
        }

        /* تحسين الحروف الأولى العربية */
        .user-avatar:has-arabic {
            background: linear-gradient(135deg, #059669 0%, #047857 100%) !important;
            border: 2px solid rgba(5, 150, 105, 0.3) !important;
            box-shadow: 0 0 10px rgba(5, 150, 105, 0.3) !important;
        }

        /* تأثيرات خاصة للمعاملات العربية */
        .activity-item:has(.arabic-name) {
            border-left-color: #059669 !important;
            background: linear-gradient(90deg, rgba(5, 150, 105, 0.02) 0%, transparent 50%) !important;
        }

        .activity-item:has(.arabic-name):hover {
            background: linear-gradient(90deg, rgba(5, 150, 105, 0.05) 0%, rgba(5, 150, 105, 0.02) 100%) !important;
            transform: translateX(-2px) !important;
            box-shadow: 0 4px 12px rgba(5, 150, 105, 0.15) !important;
        }

        /* تحسين النصوص المختلطة */
        .mixed-content .arabic-name {
            display: inline-block !important;
            margin: 0 2px !important;
        }

        /* تحسين عرض البيانات */
        .transaction-header:has(.arabic-name) {
            flex-direction: row-reverse !important;
        }

        .transaction-header:has(.arabic-name) .transaction-amount {
            margin-left: 0 !important;
            margin-right: 8px !important;
        }
        </style>
    `;

    document.head.insertAdjacentHTML('beforeend', arabicStyles);
});
