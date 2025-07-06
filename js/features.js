// وظائف قسم المميزات

document.addEventListener('DOMContentLoaded', function() {
    // تهيئة تأثيرات الظهور عند التمرير
    initScrollAnimations();
    
    // تهيئة عدادات الأرقام
    initCounters();
    
    // تهيئة الأسئلة الشائعة
    initFAQs();
    
    // تهيئة أزرار "اعرف المزيد"
    initMoreButtons();
});

// تهيئة تأثيرات الظهور عند التمرير
function initScrollAnimations() {
    const featureCards = document.querySelectorAll('.feature-card');
    const comparisonContainer = document.querySelector('.comparison-container');
    
    // دالة للتحقق من ظهور العنصر في نطاق الرؤية
    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.8 &&
            rect.bottom >= 0
        );
    }
    
    // دالة لتحديث حالة العناصر عند التمرير
    function checkVisibility() {
        featureCards.forEach(card => {
            if (isElementInViewport(card)) {
                card.classList.add('show');
            }
        });
        
        if (comparisonContainer && isElementInViewport(comparisonContainer)) {
            comparisonContainer.classList.add('show');
        }
    }
    
    // تحديث حالة العناصر عند تحميل الصفحة
    checkVisibility();
    
    // تحديث حالة العناصر عند التمرير
    window.addEventListener('scroll', checkVisibility);
}

// تهيئة عدادات الأرقام
function initCounters() {
    const counters = document.querySelectorAll('.counter');
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        const duration = 2000; // مدة العد بالمللي ثانية
        const step = Math.ceil(target / (duration / 30)); // خطوة العد (30 إطار في الثانية)
        let current = 0;
        
        function updateCounter() {
            current += step;
            if (current >= target) {
                counter.textContent = target.toLocaleString();
                counter.classList.add('count-animation');
            } else {
                counter.textContent = current.toLocaleString();
                requestAnimationFrame(updateCounter);
            }
        }
        
        // بدء العد عندما يظهر العنصر في نطاق الرؤية
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                updateCounter();
                observer.disconnect();
            }
        }, { threshold: 0.5 });
        
        observer.observe(counter);
    });
}

// تهيئة الأسئلة الشائعة
function initFAQs() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            // إغلاق جميع الأسئلة الأخرى
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                }
            });
            
            // تبديل حالة السؤال الحالي
            item.classList.toggle('active');
        });
    });
}

// تهيئة أزرار "اعرف المزيد"
function initMoreButtons() {
    const moreButtons = document.querySelectorAll('.feature-more');
    
    moreButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            const featureCard = this.closest('.feature-card');
            const featureId = featureCard.getAttribute('data-feature');
            
            // إظهار المعلومات الإضافية
            const expandedInfo = document.getElementById(`${featureId}-expanded`);
            if (expandedInfo) {
                if (expandedInfo.style.display === 'none' || !expandedInfo.style.display) {
                    expandedInfo.style.display = 'block';
                    this.innerHTML = '<i class="fas fa-chevron-up ml-1"></i> عرض أقل';
                } else {
                    expandedInfo.style.display = 'none';
                    this.innerHTML = '<i class="fas fa-chevron-down ml-1"></i> اعرف المزيد';
                }
            }
        });
    });
}