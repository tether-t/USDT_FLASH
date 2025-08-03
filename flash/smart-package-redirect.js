// Smart Package Redirect System
document.addEventListener('DOMContentLoaded', function() {
    
    // Override all package buttons
    setTimeout(() => {
        const buttons = document.querySelectorAll('button, .tether-action-button, .package-btn, [onclick*="payment"]');
        
        buttons.forEach(button => {
            const text = button.textContent || button.innerText || '';
            const parent = button.closest('.package-card') || button.parentElement;
            const parentText = parent ? (parent.textContent || parent.innerText || '') : '';
            
            let targetUrl = 'pages/payment-basic.html';
            
            // Detect Pro Package (359 USDT, 3500 USDT)
            if (text.includes('359') || parentText.includes('359') || 
                text.includes('3,500') || parentText.includes('3,500') ||
                text.includes('3500') || parentText.includes('3500') ||
                parentText.includes('Pro') || parentText.includes('PRO')) {
                targetUrl = 'pages/payment-pro.html';
            }
            // Detect Enterprise Package (599 USDT, 10000 USDT)
            else if (text.includes('599') || parentText.includes('599') || 
                     text.includes('10,000') || parentText.includes('10,000') ||
                     text.includes('10000') || parentText.includes('10000') ||
                     parentText.includes('Professional') || parentText.includes('Enterprise')) {
                targetUrl = 'pages/payment-enterprise.html';
            }
            
            // Remove existing onclick
            button.onclick = null;
            button.removeAttribute('onclick');
            
            // Add new click handler
            button.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                
                const userData = JSON.parse(localStorage.getItem('user') || '{}');
                if (!userData.email) {
                    if (confirm('You must register first. Register now?')) {
                        window.location.href = 'pages/register.html';
                    }
                    return;
                }
                
                window.location.href = targetUrl;
            });
        });
    }, 1000);
});
