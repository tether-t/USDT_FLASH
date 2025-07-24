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
            const userData = JSON.parse(localStorage.getItem('user') || '{}');
            if (!userData.email) {
                window.location.href = 'register.html';
            } else {
                window.location.href = 'payment-basic.html';
            }
        });
    }
    
    if (supportBtnWarning) {
        supportBtnWarning.addEventListener('click', function() {
            // Open chat support instead
            const chatIcon = document.getElementById('chat-icon');
            if (chatIcon) {
                chatIcon.click();
            } else {
                alert('الدعم الفني متاح عبر الدردشة المباشرة');
            }
        });
    }
    
    // Add event listener for the support button in the success modal
    const supportBtn = document.getElementById('supportBtn');
    if (supportBtn) {
        supportBtn.addEventListener('click', function() {
            // Open chat support instead
            const chatIcon = document.getElementById('chat-icon');
            if (chatIcon) {
                chatIcon.click();
            } else {
                alert('الدعم الفني متاح عبر الدردشة المباشرة');
            }
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

// وظائف إدارة الحساب

window.validateMemeCoinSale = function(coinType) {
    const user = JSON.parse(localStorage.getItem('user'));
    
    if (!user || !user.purchaseHistory) {
        console.error('لا توجد بيانات شراء لمستخدم');
        return false;
    }
    
    // البحث عن آخر عملية شراء للعملة المطلوبة
    const lastPurchase = user.purchaseHistory
        .filter(purchase => purchase.coin === coinType)
        .sort((a, b) => new Date(b.date) - new Date(a.date))[0];
        
    if (!lastPurchase) {
        console.error(`لا توجد عمليات شراء لعملة ${coinType}`);
        return false;
    }
    
    // حساب الزمن منذ الشراء
    const purchaseDate = new Date(lastPurchase.date);
    const now = new Date();
    const diffHours = Math.abs(now - purchaseDate) / (1000 * 60 * 60);
    
    if (diffHours < 24) {
        // إظهار رسالة خطأ للمستخدم
        const errorMessage = document.getElementById('meme-coin-sale-error');
        if (errorMessage) {
            errorMessage.textContent = `يجب الانتظار لمدة 24 ساعة قبل بيع عملة ${coinType}.
                يمكنك البيع بعد: ${purchaseDate.toLocaleString()}`;
            errorMessage.classList.remove('hidden');
        }
        
        console.error(`محاولة بيع مبكرة لعملة ${coinType}. يجب الانتظار ${Math.ceil(24 - diffHours)} ساعة متبقية`);
        return false;
    }
    
    return true;
};
