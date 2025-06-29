 // وظائف الباقات المتاحة

document.addEventListener('DOMContentLoaded', function() {
    console.log('Packages.js loaded successfully!');
    
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
    
    console.log('Package buttons found:', packageButtons.length);
    console.log('Package cards found:', allPackageCards.length);

    // --- FUNCTIONS --- 

    // Function to handle package selection
    function handlePackageSelection(button) {
        console.log('handlePackageSelection called for button:', button);
        const packageCard = button.closest('.package-card');
        if (!packageCard) {
            console.error('Package card not found');
            return;
        }
        console.log('Package card found:', packageCard);
        
        // Get package details
        let packageDetails = {};
        
        // Determine package type based on button ID or card content
        const packageTitle = packageCard.querySelector('h3');
        const packagePrice = packageCard.querySelector('.text-4xl');
        const packageAmount = packageCard.querySelector('.text-gray-500');
        
        if (packageTitle && packagePrice && packageAmount) {
            const title = packageTitle.textContent.trim();
            const price = packagePrice.textContent.trim();
            const amount = packageAmount.textContent.trim();
            
            packageDetails = {
                name: title,
                price: price,
                amount: amount,
                class: `package-${title.toLowerCase().replace(/\s+/g, '-')}`
            };
            
            // Set specific details based on package type
            if (title.includes('Basic')) {
                packageDetails = {
                    name: "Basic Package",
                    amount: "499 USDT-FLASH",
                    price: "$29.99",
                    class: "package-basic"
                };
            } else if (title.includes('Pro')) {
                packageDetails = {
                    name: "Pro Package",
                    amount: "2500 USDT-FLASH",
                    price: "$99.99",
                    class: "package-pro"
                };
            } else if (title.includes('Enterprise')) {
                packageDetails = {
                    name: "Enterprise Package",
                    amount: "10,000 USDT-FLASH",
                    price: "$199",
                    class: "package-enterprise"
                };
            }
            
            console.log('Package details:', packageDetails);
        }
        
        // Store package details
        localStorage.setItem('selectedPackage', JSON.stringify(packageDetails));
        
        // Add visual feedback
        if (packageCard) {
            packageCard.style.transform = 'scale(1.05)';
            packageCard.style.transition = 'all 0.3s ease';
            packageCard.style.boxShadow = '0 0 30px rgba(38, 161, 123, 0.6)';
        }
        
        if (button) {
            button.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i> Processing...';
            button.disabled = true;
            button.style.background = 'linear-gradient(45deg, #FFD700, #FFA500)';
            button.style.color = '#000000';
        }
        
        // Check user authentication
        const userData = JSON.parse(localStorage.getItem('user') || '{}');
        const isLoggedIn = userData.isLoggedIn || false;
        const isGuest = userData.isGuest || false;
        
        setTimeout(() => {
            if (button) {
                button.innerHTML = '<i class="fas fa-check mr-2"></i> Package Selected!';
                button.style.background = 'linear-gradient(45deg, #00FF00, #32CD32)';
                button.style.color = '#000000';
            }
            
            // Redirect based on authentication status
            const redirectUrl = (!isLoggedIn || isGuest) ? 'pages/register.html' : 'pages/payment.html';
            if (!isLoggedIn || isGuest) {
                localStorage.setItem('redirectAfterRegister', 'pages/payment.html');
            }
            
            setTimeout(() => {
                window.location.href = redirectUrl;
            }, 800);
        }, 1200);
    }
    
    // Function to handle table package selection
    function handleTablePackageSelection(button) {
        // Determine which column the button is in
        const tableCell = button.closest('td');
        const tableRow = button.closest('tr');
        const table = button.closest('table');
        
        if (!tableCell || !table) return;
        
        // Get column index to determine package type
        const cellIndex = Array.from(tableRow.children).indexOf(tableCell);
        
        let packageDetails = {};
        
        // Set package details based on column index
        switch(cellIndex) {
            case 1: // Basic Package
                packageDetails = {
                    name: "Basic Package",
                    amount: "499 USDT-FLASH",
                    price: "$29.99",
                    class: "package-basic"
                };
                break;
            case 2: // Pro Package
                packageDetails = {
                    name: "Pro Package", 
                    amount: "2500 USDT-FLASH",
                    price: "$99.99",
                    class: "package-pro"
                };
                break;
            case 3: // Enterprise Package
                packageDetails = {
                    name: "Enterprise Package",
                    amount: "10,000 USDT-FLASH", 
                    price: "$199",
                    class: "package-enterprise"
                };
                break;
            default:
                return;
        }
        
        // Store package details
        localStorage.setItem('selectedPackage', JSON.stringify(packageDetails));
        
        // Add visual feedback
        if (button) {
            button.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i> Processing...';
            button.disabled = true;
            button.style.background = 'linear-gradient(45deg, #FFD700, #FFA500)';
            button.style.color = '#000000';
        }
        
        // Check user authentication
        const userData = JSON.parse(localStorage.getItem('user') || '{}');
        const isLoggedIn = userData.isLoggedIn || false;
        const isGuest = userData.isGuest || false;
        
        setTimeout(() => {
            if (button) {
                button.innerHTML = '<i class="fas fa-check mr-2"></i> Package Selected!';
                button.style.background = 'linear-gradient(45deg, #00FF00, #32CD32)';
                button.style.color = '#000000';
            }
            
            // Redirect based on authentication status
            const redirectUrl = (!isLoggedIn || isGuest) ? 'pages/register.html' : 'pages/payment.html';
            if (!isLoggedIn || isGuest) {
                localStorage.setItem('redirectAfterRegister', 'pages/payment.html');
            }
            
            setTimeout(() => {
                window.location.href = redirectUrl;
            }, 800);
        }, 1200);
    }





    // --- INITIALIZATIONS & EVENT LISTENERS --- 


    


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

    // Package button functionality
    packageButtons.forEach((button, index) => {
        console.log(`Setting up button ${index + 1}:`, button);
        
        // Re-enable all buttons
        button.disabled = false;
        button.style.pointerEvents = 'auto';
        button.style.cursor = 'pointer';
        
        // Restore original button text
        const buttonText = button.querySelector('span');
        if (buttonText && buttonText.textContent.includes('Locked')) {
            buttonText.textContent = 'Choose Package';
        }
        
        // Add click event listener for package selection
        button.addEventListener('click', function(e) {
            console.log('=== BUTTON CLICKED ===');
            console.log('Button:', this);
            console.log('Button ID:', this.id);
            console.log('Button text:', this.textContent);
            
            e.preventDefault();
            e.stopPropagation();
            
            // Simple test - show alert first
            alert('Button clicked! Button ID: ' + (this.id || 'No ID'));
            
            // Check if this is a table button (different handling for table buttons)
            if (this.closest('.comparison-table')) {
                console.log('Table button clicked');
                handleTablePackageSelection(this);
            } else {
                console.log('Card button clicked');
                handlePackageSelection(this);
            }
        });
        
        // Also add a test with direct onclick
        button.onclick = function(e) {
            console.log('onclick triggered for:', this);
        };
    });

    // Re-enable all package cards
    allPackageCards.forEach(card => {
        // Re-enable mouse interactions
        card.style.pointerEvents = 'auto';
        card.style.cursor = 'pointer';
        
        // Remove locked class if present
        card.classList.remove('locked-package');
        
        // Remove lock icon if exists
        const lockIcon = card.querySelector('.lock-icon');
        if (lockIcon) {
            lockIcon.remove();
        }
        
        // Remove lock message if exists
        const lockMessage = card.querySelector('.lock-message');
        if (lockMessage) {
            lockMessage.remove();
        }
        
        // Add click event listener for entire card
        card.addEventListener('click', function(e) {
            // Don't trigger if the button itself was clicked
            if (e.target.closest('.package-btn')) {
                return;
            }
            
            // Find the button within this card and trigger its click
            const button = this.querySelector('.package-btn');
            if (button) {
                handlePackageSelection(button);
            }
        });
        
        // Add hover effect
        card.addEventListener('mouseenter', function() {
            this.style.cursor = 'pointer';
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