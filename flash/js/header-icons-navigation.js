// Header Icons Navigation - Simple Fix
document.addEventListener('DOMContentLoaded', function() {
    
    // Get all header icons
    const headerIcons = document.querySelectorAll('.pro-nav-icon');
    
    if (headerIcons.length >= 4) {
        // Profile Icon (1st)
        headerIcons[0].onclick = function(e) {
            e.preventDefault();
            const userData = JSON.parse(localStorage.getItem('user') || '{}');
            if (userData.email || userData.isLoggedIn) {
                window.location.href = 'pages/profile.html';
            } else {
                window.location.href = 'pages/register.html';
            }
        };
        
        // Live Transactions Icon (2nd)
        headerIcons[1].onclick = function(e) {
            e.preventDefault();
            window.location.href = 'pages/live-transactions.html';
        };
        
        // Support Icon (3rd)
        headerIcons[2].onclick = function(e) {
            e.preventDefault();
            window.location.href = 'pages/support.html';
        };
        
        // Notifications Icon (4th)
        headerIcons[3].onclick = function(e) {
            e.preventDefault();
            window.location.href = 'pages/notifications.html';
        };
        
        // Make all icons clickable
        headerIcons.forEach(icon => {
            icon.style.cursor = 'pointer';
            icon.style.pointerEvents = 'auto';
        });
    }
});

// Global functions for backup
window.handleProfileAccess = function() {
    const userData = JSON.parse(localStorage.getItem('user') || '{}');
    if (userData.email || userData.isLoggedIn) {
        window.location.href = 'pages/profile.html';
    } else {
        window.location.href = 'pages/register.html';
    }
};