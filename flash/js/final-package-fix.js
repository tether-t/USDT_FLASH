// Final Package Fix - الحل النهائي

function goToPackage(type) {
    const userData = JSON.parse(localStorage.getItem('user') || '{}');
    if (!userData.email) {
        if (confirm('You must register first to access payment pages. Do you want to register now?')) {
            window.location.href = 'pages/register.html';
        }
        return;
    }
    
    if (type === 'pro') {
        window.location.href = 'pages/payment-pro.html';
    } else if (type === 'enterprise') {
        window.location.href = 'pages/payment-enterprise.html';
    } else {
        window.location.href = 'pages/payment-basic.html';
    }
}

document.addEventListener('DOMContentLoaded', function() {
    setTimeout(() => {
        // Only handle package-related buttons, not all buttons
        const packageButtons = document.querySelectorAll('.package-card button, .tether-action-button, .package-btn, [onclick*="payment"]');
        
        packageButtons.forEach(btn => {
            // Skip if it's not a package button
            if (btn.onclick && btn.onclick.toString().includes('support.html')) return;
            if (btn.onclick && btn.onclick.toString().includes('live-transactions.html')) return;
            if (btn.onclick && btn.onclick.toString().includes('profile.html')) return;
            if (btn.classList.contains('login-button') || btn.classList.contains('register-button')) return;
            
            const card = btn.closest('.package-card') || btn.closest('.tether-package');
            if (!card) return;
            
            const text = card.textContent;
            let type = 'basic';
            
            if (text.includes('359') || text.includes('3,500') || text.includes('Pro')) {
                type = 'pro';
            } else if (text.includes('599') || text.includes('10,000') || text.includes('Professional')) {
                type = 'enterprise';
            }
            
            // Remove existing onclick
            btn.onclick = null;
            btn.removeAttribute('onclick');
            
            // Add new click handler
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                goToPackage(type);
            });
        });
    }, 2000);
});
