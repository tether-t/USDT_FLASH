// Mobile Menu Functionality

document.addEventListener('DOMContentLoaded', function() {
    // Check if mobile menu already exists
    if (document.getElementById('mobile-menu')) {
        return; // Don't create another mobile menu
    }
    
    // Get menu button and create mobile menu
    const menuButton = document.querySelector('.md\\:hidden');
    
    if (!menuButton) return;
    
    // Create mobile menu container
    const mobileMenu = document.createElement('div');
    mobileMenu.className = 'mobile-menu';
    mobileMenu.id = 'mobile-menu';
    
    // Create close button
    const closeButton = document.createElement('span');
    closeButton.className = 'close-menu';
    closeButton.innerHTML = '<i class="fas fa-times"></i>';
    mobileMenu.appendChild(closeButton);
    
    // Clone navigation links
    const navLinks = document.querySelector('nav');
    if (navLinks) {
        const navLinksClone = navLinks.cloneNode(true);
        mobileMenu.appendChild(navLinksClone);
    }
    
    // Add mobile menu to header, not body (to prevent it from appearing in footer)
    const header = document.querySelector('header');
    if (header) {
        header.appendChild(mobileMenu);
    } else {
        document.body.appendChild(mobileMenu);
    }
    
    // Toggle mobile menu
    menuButton.addEventListener('click', function() {
        mobileMenu.classList.add('active');
    });
    
    // Close mobile menu
    closeButton.addEventListener('click', function() {
        mobileMenu.classList.remove('active');
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!mobileMenu.contains(event.target) && event.target !== menuButton) {
            mobileMenu.classList.remove('active');
        }
    });
    
    // Handle window resize
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            mobileMenu.classList.remove('active');
        }
    });
});

// Add viewport meta tag if not present
document.addEventListener('DOMContentLoaded', function() {
    let viewportMeta = document.querySelector('meta[name="viewport"]');
    
    if (!viewportMeta) {
        viewportMeta = document.createElement('meta');
        viewportMeta.name = 'viewport';
        viewportMeta.content = 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no';
        document.head.appendChild(viewportMeta);
    }
});