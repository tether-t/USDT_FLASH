// Script to hide chat icon on payment pages
document.addEventListener('DOMContentLoaded', function() {
    // Check if current page is a payment page
    const isPaymentPage = window.location.pathname.includes('payment') || 
                          window.location.pathname.includes('checkout') ||
                          document.title.toLowerCase().includes('payment') ||
                          document.title.toLowerCase().includes('checkout');
    
    if (isPaymentPage) {
        // Find and hide chat icons
        const chatIcons = document.querySelectorAll('.chat-icon');
        chatIcons.forEach(icon => {
            icon.style.display = 'none';
        });
    }
});