// Button Protection System - نظام حماية الأزرار

(function() {
    'use strict';
    
    // Protected button selectors
    const PROTECTED_SELECTORS = [
        // Support buttons
        '[onclick*="support.html"]',
        '[href*="support.html"]',
        '.support-btn',
        '[title*="Support"]',
        '[title*="Technical Support"]',
        
        // Live transactions buttons
        '[onclick*="live-transactions"]',
        '[href*="live-transactions"]',
        '.live-transactions-btn',
        '[title*="Live Transactions"]',
        
        // Profile buttons
        '[onclick*="profile.html"]',
        '[href*="profile.html"]',
        '.profile-btn',
        '[title*="Profile"]',
        
        // Authentication buttons
        '.login-button',
        '.register-button',
        '.guest-button',
        '.logout-button',
        '[href*="login.html"]',
        '[href*="register.html"]',
        
        // Navigation buttons
        '[href="../index.html"]',
        '[href="index.html"]',
        '[onclick*="index.html"]',
        
        // Header buttons
        'header button',
        '.tether-button:not(.package-card .tether-button)'
    ];
    
    // Function to check if button is protected
    function isProtectedButton(button) {
        return PROTECTED_SELECTORS.some(selector => {
            try {
                return button.matches(selector);
            } catch (e) {
                return false;
            }
        });
    }
    
    // Function to protect buttons
    function protectButtons() {
        const protectedButtons = [];
        
        PROTECTED_SELECTORS.forEach(selector => {
            try {
                document.querySelectorAll(selector).forEach(btn => {
                    if (!protectedButtons.includes(btn)) {
                        protectedButtons.push(btn);
                        // Mark as protected
                        btn.setAttribute('data-protected', 'true');
                    }
                });
            } catch (e) {
                console.warn('Invalid selector:', selector);
            }
        });
        
        console.log('🛡️ Protected buttons:', protectedButtons.length);
        return protectedButtons;
    }
    
    // Initialize protection
    function initializeProtection() {
        console.log('🛡️ Initializing Button Protection System...');
        protectButtons();
        
        // Monitor for new buttons
        const observer = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                if (mutation.type === 'childList') {
                    mutation.addedNodes.forEach(function(node) {
                        if (node.nodeType === 1) {
                            if (node.tagName === 'BUTTON') {
                                if (isProtectedButton(node)) {
                                    node.setAttribute('data-protected', 'true');
                                }
                            } else {
                                node.querySelectorAll('button').forEach(btn => {
                                    if (isProtectedButton(btn)) {
                                        btn.setAttribute('data-protected', 'true');
                                    }
                                });
                            }
                        }
                    });
                }
            });
        });
        
        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
        
        console.log('✅ Button Protection System activated');
    }
    
    // Run when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initializeProtection);
    } else {
        initializeProtection();
    }
    
})();