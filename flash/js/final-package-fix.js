// Final Package Fix - الحل النهائي

function goToPackage(type) {
    if (type === 'pro') {
        window.location.href = 'pages/pro-package.html';
    } else if (type === 'enterprise') {
        window.location.href = 'pages/enterprise-package.html';
    } else {
        window.location.href = 'pages/payment-basic.html';
    }
}

document.addEventListener('DOMContentLoaded', function() {
    setTimeout(() => {
        // Find all package cards and buttons
        const cards = document.querySelectorAll('.package-card');
        const buttons = document.querySelectorAll('button');
        
        cards.forEach(card => {
            const text = card.textContent;
            let type = 'basic';
            
            if (text.includes('179') || text.includes('🔥') || text.includes('Basic Package')) {
                type = 'pro';
            } else if (text.includes('499') || text.includes('👑') || text.includes('Professional')) {
                type = 'enterprise';
            }
            
            // Make entire card clickable
            card.style.cursor = 'pointer';
            card.onclick = () => goToPackage(type);
            
            // Also handle buttons inside
            const btn = card.querySelector('button');
            if (btn) {
                btn.onclick = (e) => {
                    e.stopPropagation();
                    goToPackage(type);
                };
            }
        });
        
        // Handle table buttons
        buttons.forEach(btn => {
            const cell = btn.closest('td');
            if (cell) {
                const table = btn.closest('table');
                if (table) {
                    const cells = Array.from(table.querySelectorAll('td'));
                    const index = cells.indexOf(cell);
                    
                    let type = 'basic';
                    if (index >= 2 && index <= 4) type = 'pro';
                    else if (index >= 5) type = 'enterprise';
                    
                    btn.onclick = () => goToPackage(type);
                }
            }
        });
    }, 1000);
});