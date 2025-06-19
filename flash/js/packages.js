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

    // --- INITIALIZATIONS & EVENT LISTENERS --- 

    // Start the countdown timer
    startBasicCountdown();

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

    // Package button click logic
    packageButtons.forEach(button => {
        button.addEventListener('click', function() {
            const btn = this;
            let packageDetails = {};

            if (btn.id === 'basic-package-btn' || btn.closest('td')?.previousElementSibling?.textContent === 'Basic Package') {
                packageDetails = { name: "Basic Package", amount: "499 USDT-FLASH", price: "$29.99", class: "package-basic" };
            } else if (btn.id === 'pro-package-btn' || btn.closest('td')?.previousElementSibling?.textContent === 'Pro Package') {
                packageDetails = { name: "Pro Package", amount: "2,500 USDT-FLASH", price: "$99.99", class: "package-pro" };
            } else if (btn.id === 'enterprise-package-btn' || btn.closest('td')?.previousElementSibling?.textContent === 'Enterprise Package') {
                packageDetails = { name: "Enterprise Package", amount: "10,000 USDT-FLASH", price: "$199", class: "package-enterprise" };
            }

            localStorage.setItem('selectedPackage', JSON.stringify(packageDetails));

            btn.innerHTML = '<i class="fas fa-spinner fa-spin ml-2"></i> Processing...';
            btn.disabled = true;

            const userData = JSON.parse(localStorage.getItem('user') || '{}');
            const isLoggedIn = userData.isLoggedIn || false;
            const isGuest = userData.isGuest || false;

            setTimeout(() => {
                btn.innerHTML = '<i class="fas fa-check ml-2"></i> Selected!';
                btn.classList.add('selected-package');
                const redirectUrl = (!isLoggedIn || isGuest) ? 'pages/register.html' : 'pages/payment.html';
                if (!isLoggedIn || isGuest) {
                    localStorage.setItem('redirectAfterRegister', 'pages/payment.html');
                }
                setTimeout(() => { window.location.href = redirectUrl; }, 1000);
            }, 1500);
        });
    });

    // 3D card effect
    allPackageCards.forEach(card => {
        card.addEventListener('mousemove', function(e) {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const rotateX = (y / rect.height - 0.5) * -20;
            const rotateY = (x / rect.width - 0.5) * 20;
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
        });
        card.addEventListener('mouseleave', function() {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
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
});