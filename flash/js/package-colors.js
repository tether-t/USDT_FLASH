// Package Colors Updater - Enhanced for Tether Packages
document.addEventListener('DOMContentLoaded', function() {
    function applyPackageColors() {
        const allButtons = document.querySelectorAll('button, .tether-action-button, .package-btn, .btn');
        
        allButtons.forEach(button => {
            const card = button.closest('.package-card');
            const text = card ? card.textContent : button.textContent;
            
            // Basic Package - Green (120$ / Trial / 4500 USDT)
            if (text.includes('120') || text.includes('4500') || text.includes('Trial')) {
                button.style.setProperty('background', 'linear-gradient(45deg, #10b981, #059669)', 'important');
                button.style.setProperty('border-color', '#10b981', 'important');
                button.style.setProperty('color', 'white', 'important');
                button.style.setProperty('box-shadow', '0 4px 15px rgba(16, 185, 129, 0.3)', 'important');
            }
            // Pro Package - Blue (149$ / Basic / 3,500 USDT)
            else if (text.includes('149') || text.includes('3,500') || text.includes('Basic')) {
                button.style.setProperty('background', 'linear-gradient(45deg, #3b82f6, #2563eb)', 'important');
                button.style.setProperty('border-color', '#3b82f6', 'important');
                button.style.setProperty('color', 'white', 'important');
                button.style.setProperty('box-shadow', '0 4px 15px rgba(59, 130, 246, 0.3)', 'important');
            }
            // Enterprise Package - Purple (399$ / Professional / 10,000 USDT)
            else if (text.includes('399') || text.includes('10,000') || text.includes('Professional')) {
                button.style.setProperty('background', 'linear-gradient(45deg, #7c3aed, #5b21b6)', 'important');
                button.style.setProperty('border-color', '#7c3aed', 'important');
                button.style.setProperty('color', 'white', 'important');
                button.style.setProperty('box-shadow', '0 4px 15px rgba(124, 58, 237, 0.3)', 'important');
            }
        });
    }
    
    // Apply colors multiple times to ensure they stick
    setTimeout(applyPackageColors, 500);
    setTimeout(applyPackageColors, 1500);
    setTimeout(applyPackageColors, 3000);
    setTimeout(applyPackageColors, 5000);
});

// Enhanced color application with better detection
function forceApplyPackageColors() {
    const packageCards = document.querySelectorAll('.package-card');
    
    packageCards.forEach(card => {
        const cardText = card.textContent;
        const buttons = card.querySelectorAll('button, .tether-action-button, .package-btn');
        
        buttons.forEach(button => {
            // Basic Package - Green
            if (cardText.includes('120') || cardText.includes('Trial') || cardText.includes('4500')) {
                button.style.setProperty('background', 'linear-gradient(45deg, #10b981, #059669)', 'important');
                button.style.setProperty('border-color', '#10b981', 'important');
                button.style.setProperty('color', 'white', 'important');
                button.style.setProperty('box-shadow', '0 4px 15px rgba(16, 185, 129, 0.3)', 'important');
                
                // Add hover effect
                button.addEventListener('mouseenter', function() {
                    this.style.setProperty('background', 'linear-gradient(45deg, #059669, #047857)', 'important');
                    this.style.setProperty('box-shadow', '0 6px 20px rgba(16, 185, 129, 0.4)', 'important');
                });
                
                button.addEventListener('mouseleave', function() {
                    this.style.setProperty('background', 'linear-gradient(45deg, #10b981, #059669)', 'important');
                    this.style.setProperty('box-shadow', '0 4px 15px rgba(16, 185, 129, 0.3)', 'important');
                });
            }
            // Pro Package - Blue
            else if (cardText.includes('149') || cardText.includes('Basic') || cardText.includes('3,500')) {
                button.style.setProperty('background', 'linear-gradient(45deg, #3b82f6, #2563eb)', 'important');
                button.style.setProperty('border-color', '#3b82f6', 'important');
                button.style.setProperty('color', 'white', 'important');
                button.style.setProperty('box-shadow', '0 4px 15px rgba(59, 130, 246, 0.3)', 'important');
                
                // Add hover effect
                button.addEventListener('mouseenter', function() {
                    this.style.setProperty('background', 'linear-gradient(45deg, #2563eb, #1d4ed8)', 'important');
                    this.style.setProperty('box-shadow', '0 6px 20px rgba(59, 130, 246, 0.4)', 'important');
                });
                
                button.addEventListener('mouseleave', function() {
                    this.style.setProperty('background', 'linear-gradient(45deg, #3b82f6, #2563eb)', 'important');
                    this.style.setProperty('box-shadow', '0 4px 15px rgba(59, 130, 246, 0.3)', 'important');
                });
            }
            // Enterprise Package - Purple
            else if (cardText.includes('399') || cardText.includes('Professional') || cardText.includes('10,000')) {
                button.style.setProperty('background', 'linear-gradient(45deg, #7c3aed, #5b21b6)', 'important');
                button.style.setProperty('border-color', '#7c3aed', 'important');
                button.style.setProperty('color', 'white', 'important');
                button.style.setProperty('box-shadow', '0 4px 15px rgba(124, 58, 237, 0.3)', 'important');
                
                // Add hover effect
                button.addEventListener('mouseenter', function() {
                    this.style.setProperty('background', 'linear-gradient(45deg, #5b21b6, #4c1d95)', 'important');
                    this.style.setProperty('box-shadow', '0 6px 20px rgba(124, 58, 237, 0.4)', 'important');
                });
                
                button.addEventListener('mouseleave', function() {
                    this.style.setProperty('background', 'linear-gradient(45deg, #7c3aed, #5b21b6)', 'important');
                    this.style.setProperty('box-shadow', '0 4px 15px rgba(124, 58, 237, 0.3)', 'important');
                });
            }
        });
    });
}

// Apply colors when packages are loaded with enhanced detection
setInterval(() => {
    const packageCards = document.querySelectorAll('.package-card');
    if (packageCards.length > 0) {
        forceApplyPackageColors();
    }
}, 2000);

// Observer to watch for new package cards
const observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
        if (mutation.type === 'childList') {
            const addedNodes = Array.from(mutation.addedNodes);
            const hasPackageCard = addedNodes.some(node => 
                node.nodeType === 1 && 
                (node.classList.contains('package-card') || node.querySelector('.package-card'))
            );
            
            if (hasPackageCard) {
                setTimeout(forceApplyPackageColors, 100);
            }
        }
    });
});

// Start observing
if (document.body) {
    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
}

// Make function globally available
window.forceApplyPackageColors = forceApplyPackageColors;
