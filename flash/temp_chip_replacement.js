// Script to replace all chip divs with image
document.addEventListener('DOMContentLoaded', function() {
    // Find all chip divs and replace with image
    const chipDivs = document.querySelectorAll('div[class*="w-12 h-8 bg-gradient-to-br from-yellow-400"]');
    chipDivs.forEach(chipDiv => {
        const img = document.createElement('img');
        img.src = 'img/شريحة.png';
        img.alt = 'Chip';
        img.className = 'w-12 h-8 object-cover rounded-sm shadow-lg';
        chipDiv.parentNode.replaceChild(img, chipDiv);
    });
});