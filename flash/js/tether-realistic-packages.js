// Tether Official Package Renderer - Realistic Edition
function renderTetherPackageCard(packageType, packageData) {
    const pkg = packageData[packageType];
    
    // Determine package class based on type
    const packageClass = packageType === 'pro' ? 'professional' : 
                        packageType === 'enterprise' ? 'enterprise' : '';
    
    return `
        <div class="tether-package ${packageClass}" data-package="${packageType}">
            <!-- Official Tether Badge -->
            <div class="tether-official-badge">
                ${pkg.verification.badge}
            </div>
            
            <!-- Delivery Time Badge -->
            <div class="tether-delivery-badge">
                ${pkg.delivery}
            </div>
            
            <!-- Package Header -->
            <div class="tether-package-header">
                <div class="tether-package-title">${pkg.name}</div>
                <div class="tether-package-subtitle">${pkg.subtitle}</div>
                
                <!-- Price Display -->
                <div class="tether-price-container">
                    ${pkg.originalPrice ? `<div class="tether-price-original">${pkg.originalPrice}</div>` : ''}
                    <div class="tether-price-main">${pkg.price}</div>
                    <div class="tether-usdt-amount">${pkg.amount}</div>
                </div>
            </div>
            
            <!-- Verification Section -->
            <div class="tether-verification">
                <div class="tether-verification-badge">${pkg.verification.badge}</div>
                <div class="tether-license-info">
                    ${pkg.verification.license}<br>
                    ${pkg.verification.compliance}
                </div>
            </div>
            
            <!-- Action Button -->
            <button class="tether-action-button" onclick="selectTetherPackage('${packageType}')">
                ${pkg.button.text}
            </button>
        </div>
    `;
}

// Package Selection Handler
function selectTetherPackage(packageType) {
    // Check if user is logged in
    const userData = JSON.parse(localStorage.getItem('user') || '{}');
    if (!userData.email) {
        if (confirm('You must register first to access payment pages. Do you want to register now?')) {
            window.location.href = 'pages/register.html';
        }
        return;
    }
    
    // Store selected package
    localStorage.setItem('selectedPackage', packageType);
    
    // Add selection animation
    const selectedCard = document.querySelector(`[data-package="${packageType}"]`);
    if (selectedCard) {
        selectedCard.style.transform = 'scale(1.05)';
        selectedCard.style.boxShadow = '0 20px 40px rgba(38, 161, 123, 0.4)';
        
        setTimeout(() => {
            selectedCard.style.transform = '';
            selectedCard.style.boxShadow = '';
        }, 300);
    }
    
    // Redirect to correct payment page based on package type
    let paymentUrl = 'pages/payment-basic.html';
    if (packageType === 'pro') {
        paymentUrl = 'pages/payment-pro.html';
    } else if (packageType === 'enterprise') {
        paymentUrl = 'pages/payment-enterprise.html';
    }
    
    window.location.href = paymentUrl;
}

// Render All Tether Packages
function renderAllTetherPackages() {
    console.log('Rendering Tether Official Packages...');
    
    const packagesContainer = document.getElementById('packages-cards');
    if (!packagesContainer) {
        console.error('Packages container not found!');
        return;
    }
    
    // Generate packages HTML
    const packagesHTML = Object.keys(packagesData).map(packageType => {
        return renderTetherPackageCard(packageType, packagesData);
    }).join('');
    
    // Insert packages
    packagesContainer.innerHTML = `
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            ${packagesHTML}
        </div>
    `;
    
    console.log('Tether packages rendered successfully');
    
    // Add hover effects
    setTimeout(() => {
        document.querySelectorAll('.tether-package').forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-10px)';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0)';
            });
        });
    }, 100);
}

// Update comparison table with Tether branding
function updateTetherComparisonTable() {
    const tableBody = document.querySelector('#packages-table tbody');
    if (!tableBody) return;
    
    const basicPkg = packagesData.basic;
    const proPkg = packagesData.pro;
    const enterprisePkg = packagesData.enterprise;
    
    tableBody.innerHTML = `
        <tr>
            <td class="font-semibold">Package Name</td>
            <td class="text-center">${basicPkg.name}</td>
            <td class="text-center bg-blue-50 font-bold">${proPkg.name}</td>
            <td class="text-center">${enterprisePkg.name}</td>
        </tr>
        <tr>
            <td class="font-semibold">Price</td>
            <td class="text-center">${basicPkg.price}</td>
            <td class="text-center bg-blue-50 font-bold text-blue-600">${proPkg.price}</td>
            <td class="text-center">${enterprisePkg.price}</td>
        </tr>
        <tr>
            <td class="font-semibold">USDT Amount</td>
            <td class="text-center">${basicPkg.amount}</td>
            <td class="text-center bg-blue-50 font-bold">${proPkg.amount}</td>
            <td class="text-center">${enterprisePkg.amount}</td>
        </tr>
        <tr>
            <td class="font-semibold">Delivery Time</td>
            <td class="text-center">${basicPkg.delivery}</td>
            <td class="text-center bg-blue-50 font-bold text-green-600">${proPkg.delivery}</td>
            <td class="text-center">${enterprisePkg.delivery}</td>
        </tr>
        <tr>
            <td class="font-semibold">Verification Level</td>
            <td class="text-center">${basicPkg.verification.compliance}</td>
            <td class="text-center bg-blue-50 font-bold">${proPkg.verification.compliance}</td>
            <td class="text-center">${enterprisePkg.verification.compliance}</td>
        </tr>
        <tr>
            <td class="font-semibold">Support</td>
            <td class="text-center">24/7 Technical</td>
            <td class="text-center bg-blue-50 font-bold">VIP Priority</td>
            <td class="text-center">Personal Manager</td>
        </tr>
        <tr>
            <td class="font-semibold">Bonus Included</td>
            <td class="text-center">Setup Guide</td>
            <td class="text-center bg-blue-50 font-bold text-green-600">500 USDT Bonus</td>
            <td class="text-center">2,000 USDT Bonus</td>
        </tr>
    `;
}

// Initialize Tether packages when DOM loads
document.addEventListener('DOMContentLoaded', function() {
    console.log('Initializing Tether Official Packages...');
    
    // Check if packages data exists
    if (typeof packagesData !== 'undefined') {
        renderAllTetherPackages();
        updateTetherComparisonTable();
    } else {
        // Wait for packages data to load
        setTimeout(() => {
            if (typeof packagesData !== 'undefined') {
                renderAllTetherPackages();
                updateTetherComparisonTable();
            }
        }, 1000);
    }
});

// Make functions globally available
window.selectTetherPackage = selectTetherPackage;
window.renderAllTetherPackages = renderAllTetherPackages;
