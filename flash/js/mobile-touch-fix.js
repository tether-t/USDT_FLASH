// 📱 إصلاح اللمس للهواتف
document.addEventListener('DOMContentLoaded', function() {
    // إصلاح أيقونات الهيدر الثانوي
    const secondaryIcons = document.querySelectorAll('.secondary-icon');
    secondaryIcons.forEach(icon => {
        icon.addEventListener('touchstart', function() {
            this.style.transform = 'scale(0.95)';
        });
        
        icon.addEventListener('touchend', function() {
            this.style.transform = 'scale(1)';
        });
        
        // التأكد من عمل النقر
        icon.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const onclick = this.getAttribute('onclick');
            if (onclick) {
                eval(onclick);
            }
        });
    });
    
    // إصلاح أزرار المصادقة
    const authButtons = document.querySelectorAll('.auth-section a');
    authButtons.forEach(button => {
        button.addEventListener('touchstart', function() {
            this.style.transform = 'scale(0.95)';
        });
        
        button.addEventListener('touchend', function() {
            this.style.transform = 'scale(1)';
        });
    });
});