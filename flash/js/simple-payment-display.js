// Simple Payment Display - عرض بسيط لتفاصيل الدفع

document.addEventListener('DOMContentLoaded', function() {
    const packageType = localStorage.getItem('selectedPackageType') || 'basic';
    const pkg = packagesData[packageType];
    
    if (!pkg) return;
    
    const summaryDiv = document.getElementById('package-summary');
    if (!summaryDiv) return;
    
    const color = pkg.color;
    const priceDisplay = pkg.originalPrice ? 
        `<div class="text-lg line-through text-red-500">${pkg.originalPrice}</div>
         <div class="text-4xl font-bold">${pkg.price}</div>` :
        `<div class="text-4xl font-bold">${pkg.price}</div>`;
    
    summaryDiv.innerHTML = `
        <div class="text-center mb-6">
            <i class="${pkg.icon} text-4xl text-${color.primary} mb-3"></i>
            ${pkg.mostPopular ? `<div class="bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-bold mb-2">${pkg.badge}</div>` : ''}
            <h3 class="text-2xl font-bold text-${color.primary} mb-2">${pkg.name}</h3>
            <p class="text-gray-600 mb-2">${pkg.subtitle}</p>
            ${priceDisplay}
            <div class="text-lg text-gray-600">${pkg.amount} • ${pkg.delivery}</div>
        </div>
        <div class="grid md:grid-cols-2 gap-6">
            <div>
                <h4 class="font-bold text-lg mb-3 text-${color.primary}">المميزات:</h4>
                <ul class="space-y-2">
                    ${pkg.features.map(f => `<li class="flex items-center"><i class="fas fa-check text-green-500 mr-2"></i>${f}</li>`).join('')}
                </ul>
            </div>
            <div class="bg-${color.bg} p-4 rounded-lg border border-${color.border}">
                <h4 class="font-bold text-lg mb-3 text-${color.primary}">مبلغ الدفع:</h4>
                <div class="text-center">
                    <div class="text-3xl font-bold text-${color.primary} mb-2">${pkg.usdtAmount} USDT</div>
                    <div class="text-sm text-gray-600">أرسل بالضبط ${pkg.usdtAmount} USDT</div>
                </div>
            </div>
        </div>
    `;
});
