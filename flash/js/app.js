// تهيئة التطبيق
document.addEventListener('DOMContentLoaded', function() {
    console.log('تم تحميل التطبيق بنجاح');
    
    // التحقق من وجود المستخدم
    checkUserAuth();
    
    // تفعيل روابط التذييل
    setupFooterLinks();
    
    // إزالة الأزرار المكررة في التذييل
    removeDuplicateFooterButtons();
    
    // إزالة الأزرار المكررة في الهيدر
    removeDuplicateHeaderButtons();
});

// التحقق من تسجيل دخول المستخدم
function checkUserAuth() {
    // سيتم تنفيذ هذه الوظيفة من ملف auth.js
    console.log('جاري التحقق من حالة تسجيل الدخول...');
}

// تفعيل روابط التذييل
function setupFooterLinks() {
    // التأكد من أن الروابط تعمل بشكل صحيح وتفتح الصفحات المناسبة
    const footerLinks = document.querySelectorAll('footer a[href]');
    
    footerLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // إذا كان الرابط يشير إلى صفحة أخرى (وليس رابط داخلي)
            if (href && !href.startsWith('#') && href !== 'javascript:void(0)') {
                // السماح للمتصفح بالانتقال إلى الصفحة المطلوبة
                console.log(`الانتقال إلى: ${href}`);
                // لا نمنع السلوك الافتراضي هنا لنسمح بالانتقال
            }
        });
    });
}

// تفعيل زر الاشتراك في النشرة الإخبارية
document.addEventListener('DOMContentLoaded', function() {
    const newsletterForm = document.querySelector('footer form');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const emailInput = this.querySelector('input[type="email"]');
            
            if (emailInput && emailInput.value) {
                // هنا يمكن إضافة كود للتحقق من صحة البريد الإلكتروني
                alert('شكراً لاشتراكك في النشرة الإخبارية!');
                emailInput.value = '';
            } else {
                alert('يرجى إدخال بريد إلكتروني صحيح');
            }
        });
    }
});

// إزالة الأزرار المكررة في التذييل
function removeDuplicateFooterButtons() {
    // إزالة أي أزرار مكررة قد تكون أضيفت إلى التذييل
    const footerButtons = document.querySelectorAll('footer .login-button, footer .register-button, footer .guest-button');
    footerButtons.forEach(button => {
        if (button.closest('footer')) {
            button.remove();
        }
    });
    
    // التأكد من أن أزرار القائمة المحمولة منسقة بشكل صحيح وغير مرئية في التذييل
    const mobileButtons = document.querySelectorAll('.mobile-only-buttons');
    mobileButtons.forEach(buttonGroup => {
        if (buttonGroup.closest('footer')) {
            buttonGroup.remove();
        }
    });
}

// إزالة الأزرار المكررة في الهيدر
function removeDuplicateHeaderButtons() {
    // الحصول على عنصر الهيدر
    const header = document.querySelector('header');
    if (!header) return;
    
    // البحث عن جميع أزرار تسجيل الدخول والتسجيل والضيف في الهيدر
    const loginButtons = header.querySelectorAll('.login-button');
    const registerButtons = header.querySelectorAll('.register-button');
    const guestButtons = header.querySelectorAll('.guest-button');
    
    // الاحتفاظ فقط بالمثيل الأول من كل نوع زر
    if (loginButtons.length > 1) {
        for (let i = 1; i < loginButtons.length; i++) {
            loginButtons[i].remove();
        }
    }
    
    if (registerButtons.length > 1) {
        for (let i = 1; i < registerButtons.length; i++) {
            registerButtons[i].remove();
        }
    }
    
    if (guestButtons.length > 1) {
        for (let i = 1; i < guestButtons.length; i++) {
            guestButtons[i].remove();
        }
    }
    
    // إزالة أي قوائم محمولة مكررة في الهيدر
    const mobileMenus = header.querySelectorAll('#mobile-menu');
    if (mobileMenus.length > 1) {
        for (let i = 1; i < mobileMenus.length; i++) {
            mobileMenus[i].remove();
        }
    }
}