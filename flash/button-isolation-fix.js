// Advanced Button Isolation Fix - حل متقدم لعزل الأزرار

(function() {
    'use strict';
    
    // Store original onclick handlers
    const originalHandlers = new Map();
    
    // Function to preserve specific button handlers
    function preserveButtonHandlers() {
        // Support buttons
        document.querySelectorAll('[onclick*="support.html"], .support-btn, [title*="Support"]').forEach(btn => {
            if (btn.onclick) {
                originalHandlers.set(btn, btn.onclick);
            }
        });
        
        // Live transactions buttons
        document.querySelectorAll('[onclick*="live-transactions"], .live-transactions-btn, [title*="Live Transactions"]').forEach(btn => {
            if (btn.onclick) {
                originalHandlers.set(btn, btn.onclick);
            }
        });
        
        // Profile buttons
        document.querySelectorAll('[onclick*="profile.html"], .profile-btn, [title*="Profile"]').forEach(btn => {
            if (btn.onclick) {
                originalHandlers.set(btn, btn.onclick);
            }
        });
        
        // Login/Register buttons
        document.querySelectorAll('.login-button, .register-button, .guest-button, [href*="login"], [href*="register"]').forEach(btn => {
            if (btn.onclick) {
                originalHandlers.set(btn, btn.onclick);
            }
        });
        
        // Home buttons
        document.querySelectorAll('[href="../index.html"], [href="index.html"], [onclick*="index.html"]').forEach(btn => {
            if (btn.onclick) {
                originalHandlers.set(btn, btn.onclick);
            }
        });
    }
    
    // Function to restore preserved handlers
    function restorePreservedHandlers() {
        originalHandlers.forEach((handler, btn) => {
            if (btn && btn.parentNode) {
                btn.onclick = handler;
            }
        });
    }
    
    // Function to handle package buttons only
    function handlePackageButtons() {
        // Clear all package-related onclick handlers first
        document.querySelectorAll('button, .tether-action-button').forEach(btn => {
            // Skip if it's a preserved button
            if (originalHandlers.has(btn)) return;
            
            // Skip specific button types
            if (btn.classList.contains('login-button') || 
                btn.classList.contains('register-button') ||
                btn.classList.contains('guest-button') ||
                btn.classList.contains('live-transactions-btn') ||
                btn.title?.includes('Support') ||
                btn.title?.includes('Live Transactions') ||
                btn.title?.includes('Profile') ||
                btn.onclick?.toString().includes('support.html') ||
                btn.onclick?.toString().includes('live-transactions') ||
                btn.onclick?.toString().includes('profile.html')) {
                return;
            }
            
            // Only handle buttons inside package containers
            const packageContainer = btn.closest('.package-card, .tether-package, .packages-container');
            if (!packageContainer) return;
            
            // Determine package type
            const containerText = packageContainer.textContent;
            let packageType = 'basic';
            
            if (containerText.includes('$359') || containerText.includes('3,500') || containerText.includes('Pro')) {
                packageType = 'pro';
            } else if (containerText.includes('$599') || containerText.includes('10,000') || containerText.includes('Professional')) {
                packageType = 'enterprise';
            }
            
            // Remove existing handlers
            btn.onclick = null;
            btn.removeAttribute('onclick');
            
            // Add new handler
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                
                // Check login
                const userData = JSON.parse(localStorage.getItem('user') || '{}');
                if (!userData.email) {
                    if (confirm('You must register first to access payment pages. Do you want to register now?')) {
                        window.location.href = 'pages/register.html';
                    }
                    return;
                }
                
                // Redirect to correct payment page
                const paymentUrls = {
                    'basic': 'pages/payment-basic.html',
                    'pro': 'pages/payment-pro.html',
                    'enterprise': 'pages/payment-enterprise.html'
                };
                
                window.location.href = paymentUrls[packageType];
            });
        });
    }
    
    // Main initialization function
    function initializeButtonFix() {
        console.log('🔧 Initializing Advanced Button Isolation Fix...');
        
        // Step 1: Preserve important button handlers
        preserveButtonHandlers();
        
        // Step 2: Handle package buttons
        handlePackageButtons();
        
        // Step 3: Restore preserved handlers
        restorePreservedHandlers();
        
        console.log('✅ Button isolation fix completed');
        console.log('📊 Preserved handlers:', originalHandlers.size);
    }
    
    // Run fix when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            setTimeout(initializeButtonFix, 1000);
        });
    } else {
        setTimeout(initializeButtonFix, 1000);
    }
    
    // Re-run fix when new content is added
    const observer = new MutationObserver(function(mutations) {
        let shouldRerun = false;
        mutations.forEach(function(mutation) {
            if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
                mutation.addedNodes.forEach(function(node) {
                    if (node.nodeType === 1 && (node.tagName === 'BUTTON' || node.querySelector('button'))) {
                        shouldRerun = true;
                    }
                });
            }
        });
        
        if (shouldRerun) {
            setTimeout(initializeButtonFix, 500);
        }
    });
    
    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
    
})();
