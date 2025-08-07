// Profile Icon Fix - Simple and Direct Solution
(function() {
    'use strict';
    
    // Wait for DOM to be ready
    function ready(fn) {
        if (document.readyState !== 'loading') {
            fn();
        } else {
            document.addEventListener('DOMContentLoaded', fn);
        }
    }
    
    // Main fix function
    function fixProfileIcon() {
        console.log('🔧 Fixing profile icon...');
        
        // Find the profile icon element
        const profileIcon = document.querySelector('.pro-nav-icon');
        
        if (!profileIcon) {
            console.error('❌ Profile icon not found!');
            return;
        }
        
        console.log('✅ Profile icon found:', profileIcon);
        
        // Remove any existing event listeners
        const newProfileIcon = profileIcon.cloneNode(true);
        profileIcon.parentNode.replaceChild(newProfileIcon, profileIcon);
        
        // Add new click event listener
        newProfileIcon.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            console.log('🖱️ Profile icon clicked!');
            
            // Check user login status
            const userData = JSON.parse(localStorage.getItem('user') || '{}');
            
            if (userData.email || userData.isLoggedIn) {
                console.log('👤 User is logged in, redirecting to profile...');
                window.location.href = 'pages/profile.html';
            } else {
                console.log('🔐 User not logged in, redirecting to register...');
                window.location.href = 'pages/register.html';
            }
        });
        
        // Add hover effects
        newProfileIcon.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px) scale(1.05)';
            this.style.transition = 'all 0.3s ease';
        });
        
        newProfileIcon.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
        
        // Ensure the icon is clickable
        newProfileIcon.style.cursor = 'pointer';
        newProfileIcon.style.pointerEvents = 'auto';
        newProfileIcon.style.zIndex = '9999';
        
        console.log('✅ Profile icon fixed successfully!');
    }
    
    // Update icon based on login status
    function updateIconAppearance() {
        const userData = JSON.parse(localStorage.getItem('user') || '{}');
        const profileIcon = document.querySelector('.profile-icon i');
        
        if (profileIcon) {
            if (userData.email || userData.isLoggedIn) {
                profileIcon.className = 'fas fa-user-circle';
            } else {
                profileIcon.className = 'fas fa-user-plus';
            }
        }
    }
    
    // Initialize when DOM is ready
    ready(function() {
        console.log('🚀 Profile icon fix initializing...');
        
        // Fix immediately
        fixProfileIcon();
        updateIconAppearance();
        
        // Fix again after a short delay to ensure all scripts have loaded
        setTimeout(function() {
            fixProfileIcon();
            updateIconAppearance();
        }, 1000);
        
        // Fix again after page is fully loaded
        setTimeout(function() {
            fixProfileIcon();
            updateIconAppearance();
        }, 3000);
        
        // Listen for storage changes
        window.addEventListener('storage', function(e) {
            if (e.key === 'user') {
                updateIconAppearance();
            }
        });
    });
    
    // Make the function globally available as backup
    window.handleProfileAccess = function() {
        console.log('🔄 Global handleProfileAccess called');
        const userData = JSON.parse(localStorage.getItem('user') || '{}');
        
        if (userData.email || userData.isLoggedIn) {
            window.location.href = 'pages/profile.html';
        } else {
            window.location.href = 'pages/register.html';
        }
    };
    
    console.log('📦 Profile icon fix script loaded');
})();