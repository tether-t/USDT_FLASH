// Unified Cleanup JavaScript - Combined from multiple removal JS files

document.addEventListener('DOMContentLoaded', function() {
    // Main function to remove all unwanted elements
    function cleanupElements() {
        // Remove mobile-buttons-container elements
        document.querySelectorAll('.mobile-buttons-container, [class*="mobile-buttons-container"]').forEach(el => {
            el.remove();
        });
        
        // Remove btn-effect class from elements
        document.querySelectorAll('.btn-effect, [class*="btn-effect"]').forEach(el => {
            el.classList.remove('btn-effect');
            // Remove any animation or transition styles
            el.style.animation = 'none';
            el.style.transition = 'none';
            el.style.transform = 'none';
        });
        
        // Remove mobile menu buttons
        document.querySelectorAll('.mobile-login-button, .mobile-register-button, .mobile-guest-button, .mobile-only-buttons').forEach(el => {
            el.remove();
        });
        
        // Remove language selection buttons
        document.querySelectorAll('.language-select-btn, [data-lang]').forEach(el => {
            if (el.closest('[role="group"][aria-label="Select comment language"]')) {
                el.remove();
            }
        });
        
        // Remove language selection container
        document.querySelectorAll('[role="group"][aria-label="Select comment language"]').forEach(el => {
            el.remove();
        });
        
        // Remove duplicate mobile menus
        const mobileMenus = document.querySelectorAll('#mobile-menu');
        if (mobileMenus.length > 1) {
            for (let i = 1; i < mobileMenus.length; i++) {
                mobileMenus[i].remove();
            }
        }
        
        // Footer-specific cleanup
        const footer = document.querySelector('footer');
        if (footer) {
            // Remove any login/register buttons in footer
            const footerButtons = footer.querySelectorAll('.login-button, .register-button, .guest-button');
            footerButtons.forEach(button => button.remove());
            
            // Remove any mobile menu clones in footer
            const footerMobileMenus = footer.querySelectorAll('.mobile-menu, .mobile-only-buttons');
            footerMobileMenus.forEach(menu => menu.remove());
            
            // Remove any other potential duplicates in footer
            const userMenus = footer.querySelectorAll('.user-menu, [id^="mobile-menu"]');
            userMenus.forEach(menu => menu.remove());
            
            // Remove chat icons in footer
            const footerChatIcons = footer.querySelectorAll('.chat-icon');
            footerChatIcons.forEach(icon => {
                icon.remove();
            });
            
            // Remove contact link in footer
            const contactLinks = footer.querySelectorAll('a[href="contact.html"]');
            contactLinks.forEach(link => {
                const listItem = link.closest('li');
                if (listItem) {
                    listItem.remove();
                } else {
                    link.remove();
                }
            });
        }
        
        // Fix chat icon positioning
        const allChatIcons = document.querySelectorAll('.chat-icon');
        allChatIcons.forEach(icon => {
            // Skip icons that are already properly positioned
            if (icon.style.position === 'fixed') return;
            
            // Reposition to fixed position
            icon.style.position = 'fixed';
            icon.style.bottom = '20px';
            icon.style.right = '20px';
            icon.style.zIndex = '1000';
            
            // Check for RTL
            const htmlDir = document.documentElement.dir || 'ltr';
            if (htmlDir === 'rtl') {
                icon.style.left = '20px';
                icon.style.right = 'auto';
            }
        });
        
        // Hide chat icon on payment pages
        if (window.location.pathname.includes('payment') || 
            document.body.classList.contains('payment') || 
            document.body.id.includes('payment')) {
            document.querySelectorAll('.chat-icon').forEach(icon => {
                icon.style.display = 'none';
            });
        }
    }
    
    // Run immediately
    cleanupElements();
    
    // Also run after a short delay to catch any dynamically added elements
    setTimeout(cleanupElements, 500);
    
    // Monitor for changes in the DOM and clean up elements if they appear
    const observer = new MutationObserver(function(mutations) {
        cleanupElements();
    });
    
    // Start observing the document body for changes
    observer.observe(document.body, { 
        childList: true,
        subtree: true 
    });
});