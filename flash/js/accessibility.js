// Accessibility Improvements

document.addEventListener('DOMContentLoaded', function() {
    // Add skip to content link
    const skipLink = document.createElement('a');
    skipLink.href = '#main-content';
    skipLink.className = 'skip-link';
    skipLink.textContent = 'Skip to main content';
    document.body.insertBefore(skipLink, document.body.firstChild);
    
    // Add main content ID to the first main section
    const mainContent = document.querySelector('section');
    if (mainContent) {
        mainContent.id = 'main-content';
        mainContent.setAttribute('role', 'main');
    }
    
    // Add appropriate ARIA attributes
    function addAriaAttributes() {
        // Navigation
        const nav = document.querySelector('nav');
        if (nav) {
            nav.setAttribute('role', 'navigation');
            nav.setAttribute('aria-label', 'Main Navigation');
        }
        
        // Header
        const header = document.querySelector('header');
        if (header) {
            header.setAttribute('role', 'banner');
        }
        
        // Footer
        const footer = document.querySelector('footer');
        if (footer) {
            footer.setAttribute('role', 'contentinfo');
        }
        
        // Buttons without text
        document.querySelectorAll('button:not([aria-label])').forEach(button => {
            if (!button.textContent.trim()) {
                const icon = button.querySelector('i');
                if (icon && icon.className) {
                    let iconName = '';
                    if (icon.className.includes('fa-bars')) iconName = 'Menu';
                    else if (icon.className.includes('fa-times')) iconName = 'Close';
                    else if (icon.className.includes('fa-chevron')) iconName = 'Toggle';
                    
                    if (iconName) {
                        button.setAttribute('aria-label', iconName);
                    }
                }
            }
        });
        
        // Form inputs
        document.querySelectorAll('input, select, textarea').forEach(input => {
            const id = input.id;
            if (id) {
                const label = document.querySelector(`label[for="${id}"]`);
                if (!label) {
                    input.setAttribute('aria-label', id.replace(/-/g, ' '));
                }
            }
        });
        
        // Images
        document.querySelectorAll('img:not([alt])').forEach(img => {
            img.alt = img.src.split('/').pop().split('.')[0].replace(/-/g, ' ');
        });
        
        // FAQ items
        document.querySelectorAll('.faq-question').forEach((question, index) => {
            const answer = question.nextElementSibling;
            const id = `faq-answer-${index}`;
            
            question.setAttribute('aria-expanded', question.parentElement.classList.contains('active') ? 'true' : 'false');
            question.setAttribute('aria-controls', id);
            
            if (answer) {
                answer.id = id;
                answer.setAttribute('role', 'region');
                answer.setAttribute('aria-labelledby', `faq-question-${index}`);
            }
            
            question.addEventListener('click', function() {
                const expanded = this.getAttribute('aria-expanded') === 'true';
                this.setAttribute('aria-expanded', !expanded);
            });
        });
    }
    
    // Add keyboard navigation for interactive elements
    function enhanceKeyboardNavigation() {
        // Make div buttons keyboard accessible
        document.querySelectorAll('div[onclick], div[class*="btn"], div[class*="button"]').forEach(div => {
            if (!div.getAttribute('tabindex')) {
                div.setAttribute('tabindex', '0');
                div.setAttribute('role', 'button');
                
                div.addEventListener('keydown', function(e) {
                    if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        this.click();
                    }
                });
            }
        });
        
        // Enhance tab navigation for custom components
        document.querySelectorAll('.testimonial-slide, .package-card, .faq-item').forEach(item => {
            if (!item.getAttribute('tabindex')) {
                item.setAttribute('tabindex', '0');
            }
        });
    }
    
    // Initialize accessibility improvements
    addAriaAttributes();
    enhanceKeyboardNavigation();
    
    // Listen for dynamic content changes
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.addedNodes && mutation.addedNodes.length > 0) {
                addAriaAttributes();
                enhanceKeyboardNavigation();
            }
        });
    });
    
    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
});