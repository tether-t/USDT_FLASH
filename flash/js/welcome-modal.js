// Welcome Modal Script - Simple Version
window.addEventListener('load', function() {
    // Create modal HTML
    const modalHTML = `
        <div id="welcomeModal" class="welcome-modal" style="display: flex;">
            <div class="welcome-modal-content">
                <button class="welcome-modal-close" onclick="closeWelcomeModal()">
                    ×
                </button>
                <img src="img/Generated Image September 03, 2025 - 7_07PM.jpeg" 
                     alt="Welcome" 
                     class="welcome-modal-image"
                     style="max-width: 800px; max-height: 600px;">
            </div>
        </div>
    `;
    
    // Add modal to body
    document.body.insertAdjacentHTML('afterbegin', modalHTML);
    
    // Auto-close after 8 seconds
    setTimeout(closeWelcomeModal, 8000);
});

// Close modal function
function closeWelcomeModal() {
    const modal = document.getElementById('welcomeModal');
    if (modal) {
        modal.style.display = 'none';
        modal.remove();
    }
}

// Close on click outside
setTimeout(() => {
    const modal = document.getElementById('welcomeModal');
    if (modal) {
        modal.onclick = function(e) {
            if (e.target === modal) closeWelcomeModal();
        };
    }
}, 1000);