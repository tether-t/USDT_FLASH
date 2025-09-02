// محسن الصور لتحسين الأداء
document.addEventListener('DOMContentLoaded', function() {
    optimizeImages();
});

function optimizeImages() {
    // تحويل جميع الصور إلى lazy loading
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
        // إضافة lazy loading
        if (!img.hasAttribute('loading')) {
            img.setAttribute('loading', 'lazy');
        }
        
        // إضافة placeholder أثناء التحميل
        if (!img.complete) {
            img.style.backgroundColor = '#f3f4f6';
            img.style.minHeight = '50px';
        }
        
        // معالجة أخطاء التحميل
        img.addEventListener('error', function() {
            this.style.display = 'none';
            console.warn('Failed to load image:', this.src);
        });
        
        // إزالة placeholder بعد التحميل
        img.addEventListener('load', function() {
            this.style.backgroundColor = 'transparent';
        });
    });
    
    // ضغط الصور الكبيرة
    compressLargeImages();
}

function compressLargeImages() {
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
        img.addEventListener('load', function() {
            if (this.naturalWidth > 800 || this.naturalHeight > 600) {
                // تقليل جودة الصور الكبيرة
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');
                
                const maxWidth = 800;
                const maxHeight = 600;
                
                let { width, height } = this;
                
                if (width > height) {
                    if (width > maxWidth) {
                        height = (height * maxWidth) / width;
                        width = maxWidth;
                    }
                } else {
                    if (height > maxHeight) {
                        width = (width * maxHeight) / height;
                        height = maxHeight;
                    }
                }
                
                canvas.width = width;
                canvas.height = height;
                
                ctx.drawImage(this, 0, 0, width, height);
                
                // استبدال الصورة بالنسخة المضغوطة
                const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.8);
                this.src = compressedDataUrl;
            }
        });
    });
}

// تحسين أداء الصور في الخلفية
function optimizeBackgroundImages() {
    const elementsWithBg = document.querySelectorAll('[style*="background-image"]');
    
    elementsWithBg.forEach(element => {
        const style = element.style.backgroundImage;
        if (style && style.includes('url(')) {
            // تأجيل تحميل صور الخلفية
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        // تحميل صورة الخلفية عند الحاجة
                        observer.unobserve(entry.target);
                    }
                });
            });
            
            observer.observe(element);
        }
    });
}

// تشغيل التحسينات
window.addEventListener('load', () => {
    setTimeout(optimizeBackgroundImages, 1000);
});