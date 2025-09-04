// Update Package Icons Script
document.addEventListener('DOMContentLoaded', function() {
    console.log('Updating package icons...');
    
    // Update icons for packages
    const packageCards = document.querySelectorAll('.package-card');
    
    packageCards.forEach((card, index) => {
        const iconElement = card.querySelector('.fas');
        const titleElement = card.querySelector('h3');
        
        if (iconElement && titleElement) {
            const title = titleElement.textContent.trim();
            
            // Update icons based on new package names
            if (title.includes('Trial')) {
                // Trial Package - Flask icon
                iconElement.className = 'fas fa-flask text-white text-2xl';
            } else if (title.includes('Basic')) {
                // Basic Package - Layer group icon
                iconElement.className = 'fas fa-layer-group text-white text-2xl';
            } else if (title.includes('Professional')) {
                // Professional Package - Crown icon
                iconElement.className = 'fas fa-crown text-white text-2xl';
            }
        }
    });
    
    // Update any other icon references
    const allIcons = document.querySelectorAll('.fas.fa-rocket, .fas.fa-gem, .fas.fa-fire, .fas.fa-star');
    allIcons.forEach(icon => {
        const card = icon.closest('.package-card');
        if (card) {
            const cardIndex = Array.from(document.querySelectorAll('.package-card')).indexOf(card);
            
            switch(cardIndex) {
                case 0:
                    icon.className = 'fas fa-flask text-white text-2xl';
                    break;
                case 1:
                    icon.className = 'fas fa-layer-group text-white text-2xl';
                    break;
                case 2:
                    icon.className = 'fas fa-crown text-white text-2xl';
                    break;
            }
        }
    });
    
    console.log('Package icons updated successfully!');
});

// Function to manually update icons if needed
function updatePackageIcons() {
    const iconMappings = {
        0: 'fa-flask',      // Trial Package
        1: 'fa-layer-group', // Basic Package  
        2: 'fa-crown'       // Professional Package
    };
    
    document.querySelectorAll('.package-card').forEach((card, index) => {
        const icon = card.querySelector('.fas');
        if (icon && iconMappings[index]) {
            icon.className = `fas ${iconMappings[index]} text-white text-2xl`;
        }
    });
}

// Export function for global use
window.updatePackageIcons = updatePackageIcons;