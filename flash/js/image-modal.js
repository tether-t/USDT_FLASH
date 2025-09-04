// نافذة عرض الصورة
document.addEventListener('DOMContentLoaded', function() {
    // إنشاء النافذة المنبثقة
    const modal = document.createElement('div');
    modal.id = 'imageModal';
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 10000;
        opacity: 1;
    `;
    
    // محتوى النافذة
    modal.innerHTML = `
        <div style="position: relative; width: 95vw; height: 95vh; display: flex; justify-content: center; align-items: center;">
            <img src="img/Generated Image September 03, 2025 - 7_07PM.jpeg" 
                 style="max-width: 100%; max-height: 100%; object-fit: contain; border-radius: 10px; box-shadow: 0 10px 30px rgba(0,0,0,0.5);" 
                 alt="Welcome Image">
            <button onclick="closeModal()" 
                    style="position: absolute; top: 10px; right: 10px; 
                           background: #ff4444; color: white; border: none; 
                           border-radius: 50%; width: 40px; height: 40px; 
                           font-size: 20px; cursor: pointer; font-weight: bold;">×</button>
        </div>
    `;
    
    // إضافة النافذة للصفحة
    document.body.appendChild(modal);
    
    // إغلاق النافذة عند الضغط على الخلفية
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });
    
    // إغلاق تلقائي بعد 10 ثواني
    setTimeout(closeModal, 10000);
});

// وظيفة إغلاق النافذة
function closeModal() {
    const modal = document.getElementById('imageModal');
    if (modal) {
        modal.style.opacity = '0';
        setTimeout(() => {
            modal.remove();
        }, 300);
    }
}

// إغلاق بمفتاح Escape
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeModal();
    }
});