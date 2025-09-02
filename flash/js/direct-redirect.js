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
                let url = 'pages/payment-basic.html';
                
                if (cardText.includes('179') || cardText.includes('1,500') || cardText.includes('🔥') || cardText.includes('359') || cardText.includes('3,500')) {
                    url = 'pages/payment-pro.html';
                } else if (cardText.includes('499') || cardText.includes('5,000') || cardText.includes('👑') || cardText.includes('599') || cardText.includes('10,000')) {
                    url = 'pages/payment-enterprise.html';
                }
                
                // Remove all existing handlers
                el.onclick = null;
                el.removeAttribute('onclick');
                
                // Add new handler
                el.addEventListener('click', function(e) {
                    e.preventDefault();
                    e.stopPropagation();
                    
                    // Check if user is logged in
                    const userData = JSON.parse(localStorage.getItem('user') || '{}');
                    if (!userData.email) {
                        if (confirm('You must register first to access payment pages. Do you want to register now?')) {
                            window.location.href = 'pages/register.html';
                        }
                        return;
                    }
                    
                    window.location.href = url;
                }, true);
            }
        });
    }, 3000);
});
