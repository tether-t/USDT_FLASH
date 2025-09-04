// نظام النافذة المنبثقة للصورة الترحيبية
document.addEventListener('DOMContentLoaded', function() {
    // إنشاء النافذة المنبثقة
    createWelcomeImageModal();
    
    // عرض النافذة بعد تحميل الصفحة بثانية واحدة
    setTimeout(() => {
        showWelcomeImageModal();
    }, 1000);
});

function createWelcomeImageModal() {
    // إنشاء عنصر النافذة المنبثقة
    const modal = document.createElement('div');
    modal.id = 'welcomeImageModal';
    modal.className = 'welcome-image-modal';
    
    modal.innerHTML = `
        <div class="welcome-image-content">
            <button class="welcome-image-close" onclick="closeWelcomeImageModal()">
                <i class="fas fa-times"></i>
            </button>
            <img src="img/Generated Image September 03, 2025 - 7_07PM.jpeg" alt="مرحباً بكم في USDT-FLASH" />
        </div>
    `;
    
    // إضافة النافذة إلى الصفحة
    document.body.appendChild(modal);
    
    // إضافة مستمع للنقر خارج النافذة لإغلاقها
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeWelcomeImageModal();
        }
    });
    
    // إضافة مستمع لمفتاح Escape
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeWelcomeImageModal();
        }
    });
}

function showWelcomeImageModal() {
    const modal = document.getElementById('welcomeImageModal');
    if (modal) {
        modal.classList.add('show');
        
        // منع التمرير في الخلفية
        document.body.style.overflow = 'hidden';
        
        // تسجيل أن النافذة تم عرضها
        // sessionStorage.setItem('welcomeImageShown', 'true');
    }
}

function closeWelcomeImageModal() {
    const modal = document.getElementById('welcomeImageModal');
    if (modal) {
        modal.classList.remove('show');
        
        // السماح بالتمرير مرة أخرى
        document.body.style.overflow = '';
        
        // إزالة النافذة من DOM بعد انتهاء الانتقال
        setTimeout(() => {
            if (modal.parentNode) {
                modal.parentNode.removeChild(modal);
            }
        }, 300);
    }
}