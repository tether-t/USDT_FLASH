// Package Detection and Dynamic Payment Page Configuration
function detectPackageFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    const packageType = urlParams.get('package') || 'basic';
    
    // Add special handling for trial package
    if (packageType.toLowerCase() === 'trial') {
        return 'trial';
    }
    
    return packageType;
}

function getPackageConfig(packageType) {
    // Get data from packages-data.js if available
    if (typeof packagesData !== 'undefined') {
        // Only use packages-data.js for actual package types
        if (packageType === 'basic' || packageType === 'pro' || packageType === 'enterprise') {
            const pkg = packagesData[packageType] || packagesData.basic;
            return {
                name: pkg.name,
                price: pkg.price,
                amount: pkg.amount,
                usdtPrice: pkg.price.replace('$', '') + ' USDT',
                color: pkg.color.gradient,
                icon: pkg.icon,
                description: pkg.subtitle,
                features: pkg.features.slice(0, 4)
            };
        }
    }
    
    // Fallback configs including trial package
    const configs = {
        basic: {
            name: 'USDT FLASH Trial',
            price: '$75',
            amount: '4000 USDT FLASH',
            usdtPrice: '75 USDT',
            color: 'from-green-500 to-green-700',
            icon: 'fas fa-shield-alt',
            description: 'Tether Limited Official',
            features: ['Instant delivery', 'Basic support', 'Secure transactions']
        },
        trial: {
            name: 'USDT FLASH Trial',
            price: '$75',
            amount: '4000 USDT FLASH',
            usdtPrice: '75 USDT',
            color: 'from-green-500 to-green-700',
            icon: 'fas fa-shield-alt',
            description: 'Tether Limited Official',
            features: ['Instant delivery', 'Basic support', 'Secure transactions']
        },
        pro: {
            name: 'USDT FLASH Basic',
            price: '$149',
            amount: '3,500 USDT FLASH',
            usdtPrice: '149 USDT',
            color: 'from-blue-500 to-blue-700',
            icon: 'fas fa-star',
            description: 'Recommended by Tether',
            features: ['Priority delivery', '24/7 support', 'Advanced features', 'Bonus rewards']
        },
        enterprise: {
            name: 'USDT FLASH Professional',
            price: '$399',
            amount: '10,000 USDT FLASH',
            usdtPrice: '399 USDT',
            color: 'from-purple-500 to-purple-700',
            icon: 'fas fa-building',
            description: 'Tether Institutional Grade',
            features: ['Instant delivery', 'VIP support', 'Premium features', 'Maximum rewards']
        }
    };
    
    return configs[packageType] || configs.basic;
}

function updatePaymentPage() {
    const packageType = detectPackageFromURL();
    const config = getPackageConfig(packageType);
    
    // Update page title
    document.title = `USDT-FLASH - Payment - ${config.name}`;
    
    // Update header
    const headerTitle = document.querySelector('h1');
    if (headerTitle) {
        headerTitle.innerHTML = `<i class="${config.icon} mr-3"></i>Complete Your ${config.name} Purchase`;
    }
    
    // Update payment card
    const paymentCard = document.querySelector('.payment-card');
    if (paymentCard) {
        paymentCard.style.background = `linear-gradient(135deg, white 0%, rgba(255,255,255,0.9) 100%)`;
        paymentCard.style.borderImage = `linear-gradient(135deg, ${config.color.replace('from-', '').replace(' to-', ', ')}) 1`;
    }
    
    // Update payment title
    const paymentTitle = document.querySelector('.payment-card h2');
    if (paymentTitle) {
        paymentTitle.innerHTML = `<i class="${config.icon} mr-3"></i>${config.name} Payment`;
    }
    
    // Add package info section
    const form = document.getElementById('paymentForm');
    if (form) {
        const packageInfo = document.createElement('div');
        packageInfo.className = 'mb-8 p-6 rounded-lg bg-gradient-to-r ' + config.color + ' text-white';
        packageInfo.innerHTML = `
            <div class="text-center">
                <i class="${config.icon} text-4xl mb-3"></i>
                <h3 class="text-2xl font-bold mb-2">${config.name}</h3>
                <p class="text-lg opacity-90 mb-3">${config.description}</p>
                <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div class="text-center bg-white/20 p-4 rounded-lg">
                        <div class="text-2xl font-bold">${config.price}</div>
                        <div class="text-sm opacity-80">USD Price</div>
                    </div>
                    <div class="text-center bg-white/20 p-4 rounded-lg">
                        <div class="text-2xl font-bold">${config.usdtPrice}</div>
                        <div class="text-sm opacity-80">USDT Price</div>
                    </div>
                    <div class="text-center bg-white/20 p-4 rounded-lg">
                        <div class="text-2xl font-bold">${config.amount}</div>
                        <div class="text-sm opacity-80">You Receive</div>
                    </div>
                </div>
                <div class="flex flex-wrap justify-center gap-2">
                    ${config.features.map(feature => `
                        <span class="bg-white/20 px-3 py-1 rounded-full text-sm">
                            <i class="fas fa-check mr-1"></i>${feature}
                        </span>
                    `).join('')}
                </div>
            </div>
        `;
        form.insertBefore(packageInfo, form.firstChild);
    }
    
    // Update buttons with package colors
    const buttons = document.querySelectorAll('.tether-button');
    buttons.forEach(button => {
        button.style.background = `linear-gradient(135deg, ${config.color.replace('from-', '').replace(' to-', ', ')})`;
    });
    
    // Update payment instructions with package amount
    const paymentInstructions = document.querySelector('.simple-border');
    if (paymentInstructions) {
        const amountText = paymentInstructions.querySelector('strong');
        if (amountText) {
            amountText.textContent = config.usdtPrice;
        }
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', updatePaymentPage);
