// Mobile Menu Functionality
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.getElementById('mobile-menu-toggle');
    const sideMenu = document.querySelector('.side-menu');
    const closeMenu = document.querySelector('.close-menu');
    
    // Check if elements exist before adding event listeners
    if (menuToggle && sideMenu) {
        menuToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            sideMenu.classList.add('open');
            document.body.style.overflow = 'hidden';
        });
    }
    
    if (closeMenu && sideMenu) {
        closeMenu.addEventListener('click', function() {
            sideMenu.classList.remove('open');
            document.body.style.overflow = '';
        });
    }
    
    // Close menu when clicking outside
    if (sideMenu) {
        sideMenu.addEventListener('click', function(e) {
            if (e.target === sideMenu) {
                sideMenu.classList.remove('open');
                document.body.style.overflow = '';
            }
        });
    }
    
    // Close menu on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && sideMenu && sideMenu.classList.contains('open')) {
            sideMenu.classList.remove('open');
            document.body.style.overflow = '';
        }
    });
});

// Handle window resize
window.addEventListener('resize', function() {
    const sideMenu = document.querySelector('.side-menu');
    if (sideMenu && window.innerWidth > 768) {
        sideMenu.classList.remove('open');
        document.body.style.overflow = '';
    }
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
