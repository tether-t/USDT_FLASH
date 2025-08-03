// تأثيرات مستقبلية للصفحة الرئيسية

document.addEventListener('DOMContentLoaded', function() {
    // تأثير الخلفية المتحركة
    const heroSection = document.getElementById('main-content');
    if (heroSection) {
        window.addEventListener('mousemove', function(e) {
            const mouseX = e.clientX / window.innerWidth;
            const mouseY = e.clientY / window.innerHeight;
            
            heroSection.style.backgroundPosition = `${mouseX * 10}% ${mouseY * 10}%`;
        });
    }
    
    // تأثير الزجاج للعناصر
    const glassElements = document.querySelectorAll('.glass-effect');
    glassElements.forEach(element => {
        element.addEventListener('mousemove', function(e) {
            const rect = element.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            element.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(255, 255, 255, 0.15), rgba(255, 255, 255, 0.05))`;
        });
        
        element.addEventListener('mouseleave', function() {
            element.style.background = 'rgba(255, 255, 255, 0.1)';
        });
    });
    
    // تأثير الأمان المتحرك
    const securityBar = document.querySelector('.security-bar');
    if (securityBar) {
        setInterval(() => {
            securityBar.classList.add('pulse');
            setTimeout(() => {
                securityBar.classList.remove('pulse');
            }, 1000);
        }, 5000);
    }
    
    // تأثير الدولار المتوهج
    const dollarIcon = document.querySelector('.dollar-icon');
    if (dollarIcon) {
        setInterval(() => {
            dollarIcon.style.filter = 'drop-shadow(0 0 20px rgba(38, 161, 123, 0.9))';
            setTimeout(() => {
                dollarIcon.style.filter = 'drop-shadow(0 0 15px rgba(38, 161, 123, 0.7))';
            }, 1000);
        }, 3000);
    }
    
    // تأثير الشعار المتحرك
    const logo = document.querySelector('header img');
    if (logo) {
        logo.addEventListener('mouseover', function() {
            this.style.transform = 'rotate(360deg) scale(1.1)';
            this.style.transition = 'transform 0.5s ease';
        });
        
        logo.addEventListener('mouseleave', function() {
            this.style.transform = 'rotate(0) scale(1)';
        });
    }
    
    // تأثير الأزرار المستقبلية
    const futuristicButtons = document.querySelectorAll('.futuristic-button');
    futuristicButtons.forEach(button => {
        button.addEventListener('mouseover', function() {
            this.style.boxShadow = '0 0 15px rgba(38, 161, 123, 0.7)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.boxShadow = '';
        });
    });
});
