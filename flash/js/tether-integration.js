// تكامل مع Tether

document.addEventListener('DOMContentLoaded', function() {
    // محاكاة جلب سعر USDT من API
    function updateUSDTPrice() {
        // في الواقع، يمكنك استخدام API حقيقي لجلب سعر USDT
        const priceElement = document.querySelector('.security-bar .font-bold');
        if (priceElement) {
            // محاكاة تغيرات طفيفة في السعر
            const basePrice = 1.00;
            const variation = (Math.random() * 0.002) - 0.001;
            const price = (basePrice + variation).toFixed(4);
            priceElement.textContent = `$${price} USD`;
            
            // إضافة لون أخضر أو أحمر بناءً على التغير
            if (parseFloat(price) >= 1.00) {
                priceElement.classList.add('text-green-400');
                priceElement.classList.remove('text-red-400');
            } else {
                priceElement.classList.add('text-red-400');
                priceElement.classList.remove('text-green-400');
            }
        }
    }
    
    // تحديث السعر كل 30 ثانية
    updateUSDTPrice();
    setInterval(updateUSDTPrice, 30000);
    

    
    // إضافة رابط التحقق من Tether
    const verifyLinks = document.querySelectorAll('a[href="https://tether.to/en/transparency"]');
    verifyLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            // عرض نافذة منبثقة للتحقق
            alert('Redirecting to Tether Transparency page to verify this transaction.');
            window.open('https://tether.to/en/transparency', '_blank');
        });
    });
});
