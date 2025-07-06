// Direct Package Redirect - توجيه مباشر للباقات

document.addEventListener('DOMContentLoaded', function() {
    // Wait and override everything
    setTimeout(() => {
        // Find all clickable elements
        const elements = document.querySelectorAll('*');
        
        elements.forEach(el => {
            const text = el.textContent || '';
            const isClickable = el.tagName === 'BUTTON' || el.tagName === 'A' || el.onclick || el.style.cursor === 'pointer';
            
            if (isClickable && (text.includes('Choose') || text.includes('Select') || text.includes('اختر'))) {
                const card = el.closest('.package-card, td');
                if (!card) return;
                
                const cardText = card.textContent;
                let url = 'pages/payment.html';
                
                if (cardText.includes('179') || cardText.includes('1,500') || cardText.includes('🔥')) {
                    url = 'pages/pro-package.html';
                } else if (cardText.includes('499') || cardText.includes('5,000') || cardText.includes('👑')) {
                    url = 'pages/enterprise-package.html';
                }
                
                // Remove all existing handlers
                el.onclick = null;
                el.removeAttribute('onclick');
                
                // Add new handler
                el.addEventListener('click', function(e) {
                    e.preventDefault();
                    e.stopPropagation();
                    window.location.href = url;
                }, true);
            }
        });
    }, 3000);
});