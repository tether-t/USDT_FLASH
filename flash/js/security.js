// 🔐 نظام تشفير البيانات الحساسة
class DataSecurity {
    // تشفير بسيط للبيانات
    static encrypt(data) {
        return btoa(encodeURIComponent(data));
    }
    
    // فك التشفير
    static decrypt(encryptedData) {
        return decodeURIComponent(atob(encryptedData));
    }
    
    // حماية المعرفات الحساسة
    static protectSensitiveData() {
        // إخفاء معلومات المطور
        console.clear();
        
        // منع فحص العناصر (حماية أساسية)
        document.addEventListener('keydown', function(e) {
            if (e.key === 'F12' || 
                (e.ctrlKey && e.shiftKey && e.key === 'I') ||
                (e.ctrlKey && e.shiftKey && e.key === 'C') ||
                (e.ctrlKey && e.key === 'u')) {
                e.preventDefault();
                return false;
            }
        });
        
        // منع النقر بالزر الأيمن
        document.addEventListener('contextmenu', e => e.preventDefault());
    }
}

// تفعيل الحماية عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', () => {
    DataSecurity.protectSensitiveData();
});