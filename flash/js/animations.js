// Smooth animations and scroll effects

document.addEventListener('DOMContentLoaded', function() {
    // Animate elements when they come into view
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.animate-on-scroll');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 50) {
                element.classList.add('visible');
            }
        });
        
        // Staggered animations
        const staggerItems = document.querySelectorAll('.stagger-item:not(.visible)');
        staggerItems.forEach(item => {
            const itemPosition = item.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (itemPosition < windowHeight - 50) {
                item.classList.add('visible');
            }
        });
    };
    
    // Add animation classes to elements
    function setupAnimations() {
        // Add animation classes to sections
        document.querySelectorAll('section').forEach(section => {
            section.classList.add('animate-on-scroll');
        });
        
        // Add staggered animation to list items
        document.querySelectorAll('.package-feature, .comparison-item, .faq-item').forEach(item => {
            item.classList.add('stagger-item');
        });
        
        // Add button effects
        document.querySelectorAll('button, .btn').forEach(button => {
            button.classList.add('btn-effect');
        });
    }
    
    // Initialize animations
    setupAnimations();
    
    // Run on scroll
    window.addEventListener('scroll', animateOnScroll);
    
    // Run once on load
    animateOnScroll();
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Check if smooth scroll is supported
                if ('scrollBehavior' in document.documentElement.style) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                } else {
                    // Fallback for browsers that don't support smooth scrolling
                    const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
});