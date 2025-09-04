function toggleBonus(element) {
    const details = element.querySelector('.bonus-details');
    const icon = element.querySelector('.fa-chevron-down');
    
    if (details.classList.contains('hidden')) {
        details.classList.remove('hidden');
        icon.style.transform = 'rotate(180deg)';
    } else {
        details.classList.add('hidden');
        icon.style.transform = 'rotate(0deg)';
    }
}

function togglePackage(element) {
    const packageCard = element.closest('.package-card');
    const details = packageCard.querySelector('.package-details');
    const icon = element.querySelector('.fa-chevron-down');
    const text = element.querySelector('span');
    
    if (details.classList.contains('hidden')) {
        details.classList.remove('hidden');
        icon.style.transform = 'rotate(180deg)';
        text.textContent = 'Hide Details';
    } else {
        details.classList.add('hidden');
        icon.style.transform = 'rotate(0deg)';
        text.textContent = 'View Details';
    }
}
