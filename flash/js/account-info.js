document.addEventListener('DOMContentLoaded', function() {
    const accountForm = document.getElementById('accountForm');
    const paymentModal = document.getElementById('paymentModal');
    const paymentWarningModal = document.getElementById('paymentWarningModal');
    const closeModal = document.getElementById('closeModal');
    const closeWarningModal = document.getElementById('closeWarningModal');
    const goToPayment = document.getElementById('goToPayment');
    const supportBtnWarning = document.getElementById('supportBtnWarning');
    
    // Check if this is a $50 package payment
    const paymentStatus = localStorage.getItem('paymentStatus');
    
    // Add event listeners for the warning modal
    if (closeWarningModal) {
        closeWarningModal.addEventListener('click', function() {
            paymentWarningModal.classList.add('hidden');
        });
    }
    
    if (goToPayment) {
        goToPayment.addEventListener('click', function() {
            window.location.href = 'payment.html';
        });
    }
    
    if (supportBtnWarning) {
        supportBtnWarning.addEventListener('click', function() {
            // Redirect to support page with query parameter
            window.location.href = 'support.html?from=payment';
        });
    }
    
    // Add event listener for the support button in the success modal
    const supportBtn = document.getElementById('supportBtn');
    if (supportBtn) {
        supportBtn.addEventListener('click', function() {
            // Redirect to support page with query parameter
            window.location.href = 'support.html?from=payment';
        });
    }
    
    // Handle form submission
    if (accountForm) {
        accountForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Check payment status
            console.log('[DEBUG] paymentStatus:', paymentStatus);
            
            if (typeof paymentStatus === 'undefined' || paymentStatus === null || paymentStatus !== 'paid') {
                // Show payment warning modal
                if (paymentWarningModal) {
                    paymentWarningModal.classList.remove('hidden');
                } else {
                    alert('Payment is required before completing this process.');
                }
                return;
            }
            
            // If payment is completed, show success modal
            if (paymentModal) {
                paymentModal.classList.remove('hidden');
            }
        });
    }
    
    // Close modal event
    if (closeModal) {
        closeModal.addEventListener('click', function() {
            if (paymentModal) {
                paymentModal.classList.add('hidden');
            }
        });
    }
});