 // وظائف الباقات المتاحة

document.addEventListener('DOMContentLoaded', function() {
    // --- ELEMENTS --- 
    const cardsViewBtn = document.getElementById('cards-view-btn');
    const tableViewBtn = document.getElementById('table-view-btn');
    const packagesCardsContainer = document.getElementById('packages-cards');
    const packagesTable = document.getElementById('packages-table');
    const priceElements = document.querySelectorAll('.package-card .text-4xl');
    const packageIcons = document.querySelectorAll('.package-icon');
    const packageFeatures = document.querySelectorAll('.package-feature');
    const tableRows = document.querySelectorAll('.comparison-table tbody tr');
    const packageButtons = document.querySelectorAll('.package-btn, .comparison-table button');
    const allPackageCards = document.querySelectorAll('.package-card');

    // --- FUNCTIONS --- 

    // Function to start the countdown timer
    function startBasicCountdown() {
        const countdownElement = document.getElementById('basic-countdown-timer');
        if (!countdownElement) {
            console.error('Countdown timer element with id "basic-countdown-timer" not found.');
            return;
        }

        const spans = countdownElement.querySelectorAll('span');
        if (spans.length < 3) return;

        let hours = 23, minutes = 59, seconds = 59;

        function updateCountdown() {
            spans[0].textContent = hours.toString().padStart(2, '0');
            spans[1].textContent = minutes.toString().padStart(2, '0');
            spans[2].textContent = seconds.toString().padStart(2, '0');

            if (seconds > 0) seconds--;
            else if (minutes > 0) { minutes--; seconds = 59; }
            else if (hours > 0) { hours--; minutes = 59; seconds = 59; }
            else { hours = 23; minutes = 59; seconds = 59; } // Reset timer
        }
        setInterval(updateCountdown, 1000);
    }

    // Function to start Black Friday countdown timer (2 days from now)
    function startBlackFridayCountdown() {
        const daysSpan = document.getElementById('bf-days');
        const hoursSpan = document.getElementById('bf-hours');
        const minutesSpan = document.getElementById('bf-minutes');
        const secondsSpan = document.getElementById('bf-seconds');
        
        if (!daysSpan || !hoursSpan || !minutesSpan || !secondsSpan) {
            console.error('Black Friday countdown elements not found.');
            return;
        }

        // Initialize countdown values (2 days)
        let days = 2;
        let hours = 0;
        let minutes = 0;
        let seconds = 0;
        
        function updateBlackFridayCountdown() {
            // Update display
            daysSpan.textContent = days.toString().padStart(2, '0');
            hoursSpan.textContent = hours.toString().padStart(2, '0');
            minutesSpan.textContent = minutes.toString().padStart(2, '0');
            secondsSpan.textContent = seconds.toString().padStart(2, '0');
            
            // Countdown logic
            if (seconds > 0) { seconds--; }
            else if (minutes > 0) { minutes--; seconds = 59; }
            else if (hours > 0) { hours--; minutes = 59; seconds = 59; }
            else if (days > 0) { days--; hours = 23; minutes = 59; seconds = 59; }
            else { 
                // Reset to 2 days when expired
                days = 2; hours = 0; minutes = 0; seconds = 0;
            }
        }
        
        // Update immediately and then every second
        updateBlackFridayCountdown();
        setInterval(updateBlackFridayCountdown, 1000);
    }

    // --- INITIALIZATIONS & EVENT LISTENERS --- 

    // Start the countdown timer
    startBasicCountdown();
    
    // Start Black Friday countdown
    startBlackFridayCountdown();
    
    // Add attention-grabbing effect on page load
    setTimeout(() => {
        const blackFridayCard = document.querySelector('.black-friday-special');
        if (blackFridayCard) {
            // Flash effect to grab attention
            blackFridayCard.style.animation = 'none';
            blackFridayCard.style.transform = 'scale(1.15)';
            blackFridayCard.style.boxShadow = '0 0 60px rgba(38, 161, 123, 0.8), 0 20px 50px rgba(0, 0, 0, 0.3)';
            blackFridayCard.style.borderColor = '#00FF88';
            
            setTimeout(() => {
                blackFridayCard.style.animation = 'black-friday-glow 3s ease-in-out infinite alternate';
                blackFridayCard.style.transform = 'scale(1.08)';
                blackFridayCard.style.boxShadow = '0 0 30px rgba(38, 161, 123, 0.5), 0 12px 40px rgba(0, 0, 0, 0.2)';
                blackFridayCard.style.borderColor = '#26A17B';
                blackFridayCard.style.transition = 'all 0.8s ease';
            }, 1000);
        }
    }, 1500);

    // Initialize futuristic text effect
    priceElements.forEach(el => el.setAttribute('data-text', el.textContent));

    // View switcher logic
    if (cardsViewBtn && tableViewBtn) {
        cardsViewBtn.addEventListener('click', () => {
            packagesCardsContainer.classList.remove('hidden');
            packagesTable.classList.add('hidden');
            cardsViewBtn.classList.add('active');
            tableViewBtn.classList.remove('active');
        });

        tableViewBtn.addEventListener('click', () => {
            packagesCardsContainer.classList.add('hidden');
            packagesTable.classList.remove('hidden');
            cardsViewBtn.classList.remove('active');
            tableViewBtn.classList.add('active');
            packagesTable.style.opacity = '0';
            setTimeout(() => {
                packagesTable.style.transition = 'opacity 0.5s ease';
                packagesTable.style.opacity = '1';
            }, 50);
        });
    }

    // Icon animations and effects
    packageIcons.forEach(icon => {
        setTimeout(() => {
            icon.style.transform = 'scale(1.2) rotate(10deg)';
            setTimeout(() => { icon.style.transform = 'scale(1) rotate(0deg)'; }, 300);
        }, Math.random() * 1000);
        const iconColor = window.getComputedStyle(icon).color;
        icon.style.filter = `drop-shadow(0 0 5px ${iconColor})`;
    });

    // Feature hover effect
    packageFeatures.forEach(feature => {
        feature.addEventListener('mouseenter', function() {
            this.style.backgroundColor = 'rgba(16, 185, 129, 0.05)';
            this.style.borderRadius = '4px';
            this.style.padding = '2px 4px';
        });
        feature.addEventListener('mouseleave', function() {
            this.style.backgroundColor = 'transparent';
        });
    });

    // Table row hover effect
    tableRows.forEach(row => {
        row.addEventListener('mouseenter', function() { this.style.backgroundColor = 'rgba(16, 185, 129, 0.05)'; });
        row.addEventListener('mouseleave', function() { this.style.backgroundColor = ''; });
    });

    // تعطيل الباقات - جميع الباقات مقفلة (باستثناء Black Friday)
    packageButtons.forEach(button => {
        // تخطي زر Black Friday
        if (button.id === 'black-friday-btn') {
            return;
        }
        // تعطيل الأزرار
        button.disabled = true;
        button.style.pointerEvents = 'none';
        button.style.cursor = 'not-allowed';
        
        // تغيير نص الأزرار
        const buttonText = button.querySelector('span');
        if (buttonText) {
            buttonText.textContent = 'Locked 🔒';
        }
        
        // إضافة event listener للتنبيه عند المحاولة
        button.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            // إظهار رسالة تنبيه
            if (window.confirm('🔒 هذه الباقة مقفلة حالياً. هل تريد التواصل معنا لمزيد من المعلومات؟')) {
                window.location.href = 'pages/contact.html';
            }
            
            return false;
        });
    });

    // تعطيل التأثيرات ثلاثية الأبعاد للباقات المقفلة (باستثناء Black Friday)
    allPackageCards.forEach(card => {
        // تخطي عرض Black Friday
        if (card.classList.contains('black-friday-special')) {
            return;
        }
        // إزالة التفاعل مع الماوس
        card.style.pointerEvents = 'none';
        card.style.cursor = 'not-allowed';
        
        // إضافة فئة CSS للباقات المقفلة
        card.classList.add('locked-package');
        
        // إزالة أي شارات أو مؤشرات موجودة
        const badges = card.querySelectorAll('.verified-badge, .best-value-badge, .limited-offer-badge, .recommended-badge, .popular-badge');
        badges.forEach(badge => {
            badge.style.display = 'none';
        });
        
        // إضافة أيقونة القفل
        const lockIcon = document.createElement('div');
        lockIcon.className = 'lock-icon';
        lockIcon.innerHTML = '';
        lockIcon.title = 'هذه الباقة مقفلة حالياً';
        lockIcon.style.cssText = `
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            font-size: 3rem;
            z-index: 20;
            opacity: 0.8;
        `;
        card.style.position = 'relative';
        card.appendChild(lockIcon);
        
        // تعتيم البطاقة
        card.style.opacity = '0.7';
        card.style.filter = 'grayscale(70%) blur(1px)';
        
        // إضافة طبقة شفافة فوق البطاقة لمنع التفاعل
        const overlay = document.createElement('div');
        overlay.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.1);
            z-index: 15;
            border-radius: 0.75rem;
        `;
        card.appendChild(overlay);
        
        // عدم السماح بأي تأثيرات تفاعلية
        card.addEventListener('mousemove', function(e) {
            e.preventDefault();
            return false;
        });
        
        card.addEventListener('mouseleave', function(e) {
            e.preventDefault();
            return false;
        });
    });

    // تأثير تحميل متدرج للبطاقات
    setTimeout(() => {
        allPackageCards.forEach((card, index) => {
            setTimeout(() => {
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
                card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, 50);
            }, index * 150);
        });
    }, 300);

    // Function to handle Black Friday selection
    function handleBlackFridaySelection(element) {
        let packageDetails = {
            name: "Black Friday Special Deal",
            amount: "200 USDT-FLASH",
            price: "$15 USDT",
            originalPrice: "$200",
            savings: "92%",
            class: "package-black-friday"
        };

        localStorage.setItem('selectedPackage', JSON.stringify(packageDetails));

        // Add visual feedback
        const card = document.querySelector('.black-friday-special');
        const btn = document.getElementById('black-friday-btn');
        
        if (card) {
            // Immediate click feedback
            card.style.transform = 'scale(1.05) translateY(-5px)';
            card.style.transition = 'all 0.1s ease';
            
            setTimeout(() => {
                card.style.transform = 'scale(1.18) translateY(-18px)';
                card.style.boxShadow = '0 0 70px rgba(38, 161, 123, 1), 0 30px 60px rgba(0, 0, 0, 0.4)';
                card.style.borderColor = '#00FF88';
                card.style.transition = 'all 0.3s ease';
                
                // Add success ripple effect
                const ripple = document.createElement('div');
                ripple.style.cssText = `
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    width: 0;
                    height: 0;
                    border-radius: 50%;
                    background: rgba(38, 161, 123, 0.3);
                    transform: translate(-50%, -50%);
                    animation: ripple-expand 0.6s ease-out;
                    pointer-events: none;
                    z-index: 1000;
                `;
                card.appendChild(ripple);
                
                setTimeout(() => {
                    if (ripple.parentNode) {
                        ripple.parentNode.removeChild(ripple);
                    }
                }, 600);
            }, 100);
        }
        
        if (btn) {
            btn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i> 🔥 Processing Black Friday Deal...';
            btn.disabled = true;
            btn.style.background = 'linear-gradient(45deg, #FFD700, #FFA500)';
            btn.style.color = '#000000';
        }

        const userData = JSON.parse(localStorage.getItem('user') || '{}');
        const isLoggedIn = userData.isLoggedIn || false;
        const isGuest = userData.isGuest || false;

        setTimeout(() => {
            if (btn) {
                btn.innerHTML = '<i class="fas fa-check mr-2"></i> 🔥 BLACK FRIDAY DEAL SELECTED!';
                btn.style.background = 'linear-gradient(45deg, #00FF00, #32CD32)';
                btn.style.color = '#000000';
                btn.style.boxShadow = '0 0 30px rgba(0, 255, 0, 0.8)';
            }
            
            const redirectUrl = (!isLoggedIn || isGuest) ? 'pages/register.html' : 'pages/payment.html';
            if (!isLoggedIn || isGuest) {
                localStorage.setItem('redirectAfterRegister', 'pages/payment.html');
            }
            setTimeout(() => { 
                window.location.href = redirectUrl; 
            }, 800);
        }, 1200);
    }

    // Black Friday card click handler (entire card clickable)
    const blackFridayCard = document.querySelector('.black-friday-special');
    if (blackFridayCard) {
        blackFridayCard.addEventListener('click', function(e) {
            // Prevent double execution if button is clicked
            if (e.target.id === 'black-friday-btn' || e.target.closest('#black-friday-btn')) {
                return;
            }
            handleBlackFridaySelection(this);
        });
        
        // Add hover effect
        blackFridayCard.addEventListener('mouseenter', function() {
            this.style.cursor = 'pointer';
        });
    }

    // Black Friday button handler
    const blackFridayBtn = document.getElementById('black-friday-btn');
    if (blackFridayBtn) {
        blackFridayBtn.addEventListener('click', function(e) {
            e.stopPropagation(); // Prevent card click event
            handleBlackFridaySelection(this);
        });
    }
});