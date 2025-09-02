// 🚫 منع تحميل الملفات - معطل للسماح بالتصفح العادي
class DownloadProtection {
    constructor() {
        // تم تعطيل النظام - password-protection.js يتولى الحماية
        console.log('Download protection disabled - normal browsing allowed');
    }
}

// تشغيل النظام المعطل
new DownloadProtection();