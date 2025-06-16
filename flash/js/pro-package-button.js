// وظيفة زر الباقة الاحترافية
document.addEventListener('DOMContentLoaded', function() {
    const proPackageButton = document.getElementById('pro-package-redirect-btn');
    
    if (proPackageButton) {
        proPackageButton.addEventListener('click', function() {
            localStorage.setItem('selectedPackage', JSON.stringify({
                name: "الباقة الاحترافية",
                amount: "2,500 USDT-FLASH",
                price: "$200",
                class: "package-pro"
            }));
            
            this.innerHTML = '<i class="fas fa-spinner fa-spin ml-2"></i> جاري المعالجة...';
            this.disabled = true;
            
            setTimeout(() => {
                window.location.href = 'payment.html';
            }, 1000);
        });
    }
});