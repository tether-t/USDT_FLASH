// 🔒 حماية تحميل الملفات من GitHub فقط
(function() {
    // كشف إذا كان المستخدم يحاول الوصول للمستودع
    if (window.location.hostname.includes('github.com') || 
        document.referrer.includes('github.com') ||
        navigator.userAgent.includes('git')) {
        
        const password = prompt('🔒 كلمة السر مطلوبة لتحميل الملفات:');
        
        if (password !== '234956002') {
            alert('❌ غير مصرح لك بتحميل الملفات');
            window.location.href = 'about:blank';
        }
    }
})();