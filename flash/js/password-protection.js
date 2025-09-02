// 🔐 نظام حماية الملفات بكلمة سر
class FileProtection {
    constructor() {
        this.password = '234956002'; // غير كلمة السر هنا
        this.isAuthenticated = false;
        this.init();
    }
    
    init() {
        // السماح بالتصفح العادي - فقط حماية التحميل
        this.protectDownloads();
    }
    
    protectDownloads() {
        // حماية عند محاولة التحميل فقط
        document.addEventListener('keydown', (e) => {
            // منع Ctrl+S (حفظ الصفحة)
            if (e.ctrlKey && e.key === 's') {
                e.preventDefault();
                this.showPasswordPrompt('حفظ الصفحة');
                return false;
            }
        });
        
        // حماية النقر بالزر الأيمن للحفظ
        document.addEventListener('contextmenu', (e) => {
            e.preventDefault();
            this.showPasswordPrompt('حفظ المحتوى');
            return false;
        });
    }
    
    showPasswordPrompt(action) {
        const password = prompt(`🔒 كلمة السر مطلوبة لـ ${action}:`);
        
        if (password === this.password) {
            alert('✅ تم التحقق بنجاح!');
            return true;
        } else if (password !== null) {
            alert('❌ كلمة سر خاطئة!');
        }
        return false;
    }
    

}

// تشغيل النظام
const fileProtection = new FileProtection();