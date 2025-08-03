// Simple Package Selector - حل بسيط ومباشر

window.selectPackage = function(packageType) {
    localStorage.setItem('selectedPackageType', packageType);
    
    // Check if user is logged in
    const userData = JSON.parse(localStorage.getItem('user') || '{}');
    if (!userData.email) {
        if (confirm('You must register first to access payment pages. Do you want to register now?')) {
            window.location.href = 'pages/register.html';
        }
        return;
    }
    
    if (packageType === 'basic') {
        window.location.href = 'pages/payment-basic.html';
    } else if (packageType === 'pro') {
        window.location.href = 'pages/payment-pro.html';
    } else if (packageType === 'enterprise') {
        window.location.href = 'pages/payment-enterprise.html';
    }
};

// Override all existing package selection
document.addEventListener('DOMContentLoaded', function() {
    // Find and fix all package buttons
    setTimeout(() => {
        const buttons = document.querySelectorAll('button, .package-btn, [onclick*="package"]');
        buttons.forEach(btn => {
            const card = btn.closest('.package-card, .comparison-table td');
            if (!card) return;
            
            let type = 'basic';
            const text = card.textContent;
            
            if (text.includes('179') || text.includes('1,500') || text.includes('🔥') || text.includes('359') || text.includes('3,500')) {
                type = 'pro';
            } else if (text.includes('499') || text.includes('5,000') || text.includes('👑') || text.includes('599') || text.includes('10,000')) {
                type = 'enterprise';
            }
            
            btn.onclick = (e) => {
                e.preventDefault();
                e.stopPropagation();
                selectPackage(type);
            };
        });
    }, 1000);
});
