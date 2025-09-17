// ⚡ تسريع استجابة الهيدر للضغط
document.addEventListener('DOMContentLoaded', function() {
    // تسريع أيقونات الهيدر الثانوي
    const secondaryIcons = document.querySelectorAll('.secondary-icon');
    secondaryIcons.forEach(icon => {
        icon.addEventListener('touchstart', function(e) {
            this.style.transform = 'scale(0.9)';
            this.style.transition = 'transform 0.05s ease';
        }, { passive: true });
        
        icon.addEventListener('touchend', function(e) {
            this.style.transform = 'scale(1)';
            this.style.transition = 'transform 0.1s ease';
        }, { passive: true });
        
        icon.addEventListener('mousedown', function(e) {
            this.style.transform = 'scale(0.9)';
            this.style.transition = 'transform 0.05s ease';
        });
        
        icon.addEventListener('mouseup', function(e) {
            this.style.transform = 'scale(1)';
            this.style.transition = 'transform 0.1s ease';
        });
    });
    
    // تسريع أزرار الهيدر الأول
    const authButtons = document.querySelectorAll('.auth-section a');
    authButtons.forEach(button => {
        button.addEventListener('touchstart', function(e) {
            this.style.transform = 'scale(0.95)';
            this.style.transition = 'transform 0.05s ease';
        }, { passive: true });
        
        button.addEventListener('touchend', function(e) {
            this.style.transform = 'scale(1)';
            this.style.transition = 'transform 0.1s ease';
        }, { passive: true });
        
        button.addEventListener('mousedown', function(e) {
            this.style.transform = 'scale(0.95)';
            this.style.transition = 'transform 0.05s ease';
        });
        
        button.addEventListener('mouseup', function(e) {
            this.style.transform = 'scale(1)';
            this.style.transition = 'transform 0.1s ease';
        });
    });
});