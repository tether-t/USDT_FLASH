// Script to hide footer on all pages except the home page (index.html)
document.addEventListener('DOMContentLoaded', function() {
    // Check if this is not the home page
    const isHomePage = window.location.pathname.endsWith('index.html') || 
                       window.location.pathname === '/' || 
                       window.location.pathname.endsWith('/');
    
    // Add CSS file to hide footer if not already added
    if (!document.querySelector('link[href="hide-footer-except-home.css"]')) {
        const footerStyles = document.createElement('link');
        footerStyles.rel = 'stylesheet';
        footerStyles.href = 'hide-footer-except-home.css';
        document.head.appendChild(footerStyles);
    }
    
    // Add or remove home-page class based on current page
    if (isHomePage) {
        document.body.classList.add('home-page');
    } else {
        document.body.classList.remove('home-page');
    }
});