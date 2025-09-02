// 🔐 تشفير الملفات المهمة
class FileEncryption {
    constructor() {
        this.key = 'FLASH-SECRET-2024';
    }
    
    // تشفير النص
    encrypt(text) {
        let result = '';
        for (let i = 0; i < text.length; i++) {
            result += String.fromCharCode(
                text.charCodeAt(i) ^ this.key.charCodeAt(i % this.key.length)
            );
        }
        return btoa(result);
    }
    
    // فك التشفير
    decrypt(encryptedText) {
        const decoded = atob(encryptedText);
        let result = '';
        for (let i = 0; i < decoded.length; i++) {
            result += String.fromCharCode(
                decoded.charCodeAt(i) ^ this.key.charCodeAt(i % this.key.length)
            );
        }
        return result;
    }
    
    // حماية البيانات الحساسة
    protectSensitiveData() {
        // إخفاء معلومات الاتصال الحقيقية
        const realContact = {
            email: 'admin@usdtflash.com',
            phone: '+1-555-0123',
            telegram: '@usdtflash_support'
        };
        
        // تشفير وحفظ
        const encrypted = this.encrypt(JSON.stringify(realContact));
        localStorage.setItem('contact_info', encrypted);
        
        // عرض معلومات وهمية للعامة
        return {
            email: 'contact@example.com',
            phone: '+1-XXX-XXX-XXXX',
            telegram: '@example_support'
        };
    }
    
    // استرجاع البيانات الحقيقية (للمصرح لهم فقط)
    getRealContact(password) {
        if (password !== 'ADMIN2024') return null;
        
        const encrypted = localStorage.getItem('contact_info');
        if (!encrypted) return null;
        
        try {
            return JSON.parse(this.decrypt(encrypted));
        } catch (e) {
            return null;
        }
    }
}

// تشغيل النظام
const fileEncryption = new FileEncryption();

// حماية البيانات عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', () => {
    fileEncryption.protectSensitiveData();
});