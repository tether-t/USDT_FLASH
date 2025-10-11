// Packages UI Enhancer - تحسين واجهة الباقات

document.addEventListener('DOMContentLoaded', function() {
    setTimeout(() => {
        enhancePackageCards();
    }, 1000);
});

function enhancePackageCards() {
    const cards = document.querySelectorAll('.package-card');
    
    cards.forEach((card, index) => {
        const text = card.textContent;
        let packageType = 'basic';
        
        // Determine package type
        if (text.includes('179') || text.includes('🔥')) {
            packageType = 'pro';
        } else if (text.includes('499') || text.includes('👑')) {
            packageType = 'enterprise';
        }
        
        // Add package class
        card.classList.add(`package-${packageType}`);
        
        // Update package names with enhanced styling
        const title = card.querySelector('h3');
        if (title) {
            if (packageType === 'basic') {
                title.innerHTML = '<i class="fas fa-rocket"></i> Quick Start';
                title.style.color = '#3b82f6';
            } else if (packageType === 'pro') {
                title.innerHTML = '<i class="fas fa-fire"></i> Pro Trader';
                title.style.color = '#10b981';
            } else if (packageType === 'enterprise') {
                title.innerHTML = '<i class="fas fa-crown"></i> Elite Business';
                title.style.color = '#8b5cf6';
            }
            title.style.display = 'flex';
            title.style.alignItems = 'center';
            title.style.justifyContent = 'center';
            title.style.gap = '0.5rem';
        }
        
        // Remove all subtitle paragraphs
        const subtitles = card.querySelectorAll('p');
        subtitles.forEach(p => {
            const text = p.textContent.trim();
            if (text.includes('Perfect for First-Time Users') || 
                text.includes('Most Popular Choice') || 
                text.includes('For High-Volume Traders') ||
                text.includes('Save') ||
                text.includes('باقة') ||
                text.length < 50) {
                p.remove();
            }
        });
        
        // Add most popular badge for pro package
        if (packageType === 'pro' && !card.querySelector('.most-popular-badge')) {
            const badge = document.createElement('div');
            badge.className = 'most-popular-badge';
            badge.textContent = 'Most Popular';
            card.style.position = 'relative';
            card.appendChild(badge);
        }
        
        // Enhance features list
        const features = card.querySelectorAll('li');
        features.forEach(feature => {
            if (!feature.querySelector('i')) {
                const icon = document.createElement('i');
                icon.className = 'fas fa-check';
                feature.insertBefore(icon, feature.firstChild);
            }
        });
        
        // Clean up Arabic text and meaningless phrases
        const textNodes = getTextNodes(card);
        textNodes.forEach(node => {
            let text = node.textContent;
            
            // Remove Arabic text
            text = text.replace(/[\u0600-\u06FF\u0750-\u077F]/g, '');
            
            // Remove meaningless phrases
            text = text.replace(/Perfect for Beginners/g, 'Ideal for New Users');
            text = text.replace(/Most Popular - Save 40%/g, 'Best Value - 40% Off');
            text = text.replace(/For Professionals & Companies/g, 'Enterprise Solution');
            
            // Clean up extra spaces
            text = text.replace(/\s+/g, ' ').trim();
            
            if (text !== node.textContent) {
                node.textContent = text;
            }
        });
    });
}

function getTextNodes(element) {
    const textNodes = [];
    const walker = document.createTreeWalker(
        element,
        NodeFilter.SHOW_TEXT,
        null,
        false
    );
    
    let node;
    while (node = walker.nextNode()) {
        if (node.textContent.trim()) {
            textNodes.push(node);
        }
    }
    
    return textNodes;
}
