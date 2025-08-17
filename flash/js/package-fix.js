// Package Selection Fix - إصلاح اختيار الباقات

// Override package selection functions
function selectPackageFixed(packageType) {
    console.log('Selecting package:', packageType);
    
    // Get package data directly
    const packageData = packagesData[packageType];
    
    // Store with clear package type
    const selectedPackage = {
        ...packageData,
        packageType: packageType
    };
    
    localStorage.setItem('selectedPackage', JSON.stringify(selectedPackage));
    console.log('Stored package:', selectedPackage);
    
    // Redirect to payment
    window.location.href = 'pages/payment-basic.html';
}

// Fix existing package buttons
document.addEventListener('DOMContentLoaded', function() {
    // Find all package buttons and fix them
    const packageButtons = document.querySelectorAll('.package-btn, button[onclick*="package"]');
    
    packageButtons.forEach((button, index) => {
        // Determine package type based on button position or content
        let packageType = 'basic';
        
        const card = button.closest('.package-card');
        if (card) {
            const title = card.querySelector('h3')?.textContent || '';
            const price = card.querySelector('.text-4xl')?.textContent || '';
            
            if (title.includes('Trial') || title.includes('💎') || price.includes('99')) {
                packageType = 'basic';
            } else if (title.includes('Basic') || title.includes('🔥') || price.includes('179')) {
                packageType = 'pro';
            } else if (title.includes('Professional') || title.includes('👑') || price.includes('499')) {
                packageType = 'enterprise';
            }
        }
        
        // Replace click handler
        button.onclick = function(e) {
            e.preventDefault();
            selectPackageFixed(packageType);
        };
    });
});
