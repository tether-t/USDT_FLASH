// Payment page functions

document.addEventListener('DOMContentLoaded', function() {
    // Retrieve selected package information from local storage
    const selectedPackage = localStorage.getItem('selectedPackage');
    let packageName, packageAmount, packagePrice, packageClass;
    
    // Set package information based on selection
    if (selectedPackage) {
        const packageData = JSON.parse(selectedPackage);
        packageName = packageData.name;
        packageAmount = packageData.amount;
        packagePrice = packageData.price;
        packageClass = packageData.class;
    } else {
        // Default values if no package was selected
        packageName = "Pro Package";
        packageAmount = "2,500 USDT-FLASH";
        packagePrice = "$99.99";
        packageClass = "package-pro";
    }
    
    // Update UI with package information
    document.getElementById('package-name').innerHTML = `Package: <span class="font-semibold text-gray-800">${packageName}</span>`;
    document.getElementById('package-amount').innerHTML = `Amount: <span class="font-semibold text-gray-800">${packageAmount}</span>`;
    document.getElementById('package-price').textContent = packagePrice;
    // Update payment info message with correct amount
    const amountToSend = document.getElementById('amount-to-send');
    if (amountToSend) {
        amountToSend.textContent = packagePrice.replace('$', '') + ' USDT';
    }
    
    // Add package class to main elements
    document.querySelector('.payment-card').classList.add(packageClass);
    
    // Initialize payment methods
    initPaymentMethods();
    
    // Initialize wallet address copy button
    initCopyWalletAddress();
    
    // Initialize payment form
    initPaymentForm();
    
    // Update steps status
    updateSteps(1);
});

// Initialize payment methods - simplified for a single payment method
function initPaymentMethods() {
    // No need to toggle between payment methods as there is only one
    document.getElementById('usdt-payment').classList.add('active');
}

// Initialize wallet address copy button
function initCopyWalletAddress() {
    const copyBtn = document.querySelector('.copy-btn');
    const walletAddress = document.querySelector('.wallet-address-text');
    const copySuccess = document.querySelector('.copy-success');
    
    if (copyBtn && walletAddress) {
        copyBtn.addEventListener('click', function() {
            // Copy text to clipboard
            navigator.clipboard.writeText(walletAddress.textContent).then(() => {
                // Show success message
                copySuccess.classList.add('show');
                
                // Hide message after two seconds
                setTimeout(() => {
                    copySuccess.classList.remove('show');
                }, 2000);
            });
        });
    }
}

// Initialize payment form
function initPaymentForm() {
    const paymentForm = document.getElementById('paymentForm');
    
    if (paymentForm) {
        paymentForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const transactionId = document.getElementById('transaction-id').value;
            
            if (!transactionId) {
                alert('Please enter transaction ID');
                return;
            }
            
            // Change button state
            const submitBtn = document.querySelector('.submit-btn');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin ml-2"></i> Verifying...';
            submitBtn.disabled = true;
            
            // Simulate verification process
            setTimeout(() => {
                submitBtn.innerHTML = '<i class="fas fa-check ml-2"></i> Confirmed!';
                submitBtn.classList.add('bg-green-600');
                
                // Update steps status
                updateSteps(2);
                
                // Check if this is the $50 package
                const packagePrice = document.getElementById('package-price').textContent;
                if (packagePrice === '$50') {
                    // Save special status for $50 package
                    localStorage.setItem('paymentStatus', 'unavailable');
                } else {
                    // Save normal completed status
                    localStorage.setItem('paymentStatus', 'completed');
                }
                
                // Navigate to the next page after a short delay
                setTimeout(() => {
                    window.location.href = 'account-info.html';
                }, 1500);
            }, 2000);
        });
        
        // Add event listener for continue without payment button
        const continueBtn = document.querySelector('.continue-btn');
        if (continueBtn) {
            continueBtn.addEventListener('click', function() {
                // Save payment status in local storage
                localStorage.setItem('paymentStatus', 'pending');
                
                // Update steps status
                updateSteps(3);
                
                // Change button state
                this.innerHTML = 'Redirecting...';
                this.disabled = true;
                
                // Navigate to the next page after a short delay
                setTimeout(() => {
                    window.location.href = 'account-info.html';
                }, 1000);
            });
        }
    }
}

// Update steps status
function updateSteps(currentStep) {
    const steps = document.querySelectorAll('.payment-step');
    
    steps.forEach((step, index) => {
        const stepNumber = index + 1;
        
        if (stepNumber < currentStep) {
            step.classList.add('completed');
            step.classList.remove('active');
            step.querySelector('.step-number').innerHTML = '<i class="fas fa-check"></i>';
        } else if (stepNumber === currentStep) {
            step.classList.add('active');
            step.classList.remove('completed');
        } else {
            step.classList.remove('active', 'completed');
        }
    });
}
