// Header Icons Fix - Direct Navigation
(function() {
    'use strict';
    
    function fixHeaderIcons() {
        console.log('🔧 Fixing header icons...');
        
        // Profile Icon
        const profileIcon = document.querySelector('.pro-nav-icon');
        if (profileIcon) {
            profileIcon.onclick = function(e) {
                e.preventDefault();
                const userData = JSON.parse(localStorage.getItem('user') || '{}');
                if (userData.email || userData.isLoggedIn) {
                    window.location.href = 'pages/profile.html';
                } else {
                    window.location.href = 'pages/register.html';
                }
            };
        }
        
        // Live Transactions Icon
        const liveIcon = document.querySelector('.pro-nav-icon:nth-child(2)');
        if (liveIcon) {
            liveIcon.onclick = function(e) {
                e.preventDefault();
                window.location.href = 'pages/live-transactions.html';
            };
        }
        
        // Support Icon
        const supportIcon = document.querySelector('.pro-nav-icon:nth-child(3)');
        if (supportIcon) {
            supportIcon.onclick = function(e) {
                e.preventDefault();
                window.location.href = 'pages/support.html';
            };
        }
        
        // Notifications Icon
        const notificationsIcon = document.querySelector('.pro-nav-icon:nth-child(4)');
        if (notificationsIcon) {
            notificationsIcon.onclick = function(e) {
                e.preventDefault();
                window.location.href = 'pages/notifications.html';
            };
        }
        
        console.log('✅ Header icons fixed!');
    }
    
    // Fix on load
    document.addEventListener('DOMContentLoaded', fixHeaderIcons);
    setTimeout(fixHeaderIcons, 1000);
})();