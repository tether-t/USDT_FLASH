// Payment Package Handler - معالج تفاصيل الباقات في صفحة الدفع

class PaymentPackageHandler {
    constructor() {
        this.packageData = packagesData;
        this.selectedPackage = null;
        this.init();
    }

    init() {
        this.loadSelectedPackage();
        this.displayPackageDetails();
        this.updatePaymentForm();
    }

    loadSelectedPackage() {
        const urlParams = new URLSearchParams(window.location.search);
        const storedPackage = JSON.parse(localStorage.getItem('selectedPackage') || 'null');
        
        console.log('Stored Package:', storedPackage);
        
        if (storedPackage && storedPackage.packageType) {
            this.selectedPackage = this.packageData[storedPackage.packageType];
            console.log('Using packageType:', storedPackage.packageType);
        } else if (storedPackage && storedPackage.name) {
            // تحديد نوع الباقة من الاسم
            this.selectedPackage = this.determinePackageFromName(storedPackage.name);
            console.log('Determined from name:', storedPackage.name);
        } else {
            // الافتراضي
            const packageType = urlParams.get('package') || 'basic';
            this.selectedPackage = this.packageData[packageType];
            console.log('Using default:', packageType);
        }
        
        console.log('Final selected package:', this.selectedPackage);
    }

    determinePackageFromName(name) {
        if (name.includes('Trial') || name.includes('💎')) {
            return this.packageData.basic;
        } else if (name.includes('Basic') || name.includes('🔥') || name.includes('Most Popular')) {
            return this.packageData.pro;
        } else if (name.includes('Professional') || name.includes('👑') || name.includes('Enterprise')) {
            return this.packageData.enterprise;
        }
        return this.packageData.basic;
    }

    displayPackageDetails() {
        const summaryDiv = document.getElementById('package-summary');
        if (!summaryDiv || !this.selectedPackage) return;

        const pkg = this.selectedPackage;
        const color = pkg.color;

        // بناء عرض السعر
        const priceDisplay = pkg.originalPrice ? 
            `<div class="text-lg line-through text-red-500 opacity-75">${pkg.originalPrice}</div>
             <div class="text-4xl font-bold text-gray-800 mb-2">${pkg.price}</div>` :
            `<div class="text-4xl font-bold text-gray-800 mb-2">${pkg.price}</div>`;

        // شارة "الأكثر شعبية"
        const popularBadge = pkg.mostPopular ? 
            `<div class="inline-block bg-gradient-to-r from-orange-400 to-red-500 text-white px-3 py-1 rounded-full text-sm font-bold mb-2 animate-pulse">
                ${pkg.badge || '🔥 Most Popular'}
            </div>` : '';

        summaryDiv.innerHTML = `
            <div class="text-center mb-6">
                <i class="${pkg.icon} text-4xl text-${color.primary} mb-3"></i>
                ${popularBadge}
                <h3 class="text-2xl font-bold text-${color.primary} mb-2">${pkg.name}</h3>
                <p class="text-sm text-gray-600 mb-2">${pkg.subtitle}</p>
                ${priceDisplay}
                <div class="text-lg text-gray-600">${pkg.amount} • Delivery: ${pkg.delivery}</div>
            </div>
            <div class="grid md:grid-cols-2 gap-6">
                <div>
                    <h4 class="font-bold text-lg mb-3 text-${color.primary}">What's Included:</h4>
                    <ul class="space-y-2">
                        ${pkg.features.map(feature => 
                            `<li class="flex items-center">
                                <i class="fas fa-check text-${color.primary.replace('600', '500')} mr-2"></i>
                                ${feature}
                            </li>`
                        ).join('')}
                    </ul>
                    ${pkg.bonus ? `
                    <div class="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                        <h5 class="font-bold text-yellow-800 mb-2">${pkg.bonus.title}</h5>
                        <ul class="text-sm text-yellow-700">
                            ${pkg.bonus.items.map(item => `<li>• ${item}</li>`).join('')}
                        </ul>
                    </div>` : ''}
                </div>
                <div class="bg-${color.bg} p-4 rounded-lg border border-${color.border}">
                    <h4 class="font-bold text-lg mb-3 text-${color.primary}">Payment Amount:</h4>
                    <div class="text-center">
                        <div class="text-3xl font-bold text-${color.primary} mb-2">${pkg.usdtAmount} USDT</div>
                        <div class="text-sm text-gray-600">Send exactly ${pkg.usdtAmount} USDT (TRC20)</div>
                        <div class="text-xs text-gray-500 mt-1">Equivalent to ${pkg.price}</div>
                    </div>
                    <div class="mt-4 text-center">
                        <div class="inline-flex items-center px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                            <i class="fas fa-shield-alt mr-1"></i>
                            Secure Payment
                        </div>
                    </div>
                </div>
            </div>
        `;

        this.updateCardStyling(color);
    }

    updateCardStyling(color) {
        // تحديث ألوان بطاقة التفاصيل
        const summaryCard = document.getElementById('package-summary');
        if (summaryCard) {
            summaryCard.style.borderColor = this.getColorValue(color.primary);
            summaryCard.style.background = `linear-gradient(135deg, white 0%, ${this.getBgColorValue(color.bg)} 100%)`;
        }

        // تحديث ألوان نموذج الدفع
        const paymentCards = document.querySelectorAll('.payment-card');
        if (paymentCards[1]) {
            paymentCards[1].style.borderColor = this.getColorValue(color.primary);
        }
    }

    getColorValue(colorClass) {
        const colorMap = {
            'blue-600': '#2563eb',
            'green-600': '#16a34a',
            'purple-600': '#9333ea'
        };
        return colorMap[colorClass] || '#26A17B';
    }

    getBgColorValue(bgClass) {
        const bgMap = {
            'blue-50': '#eff6ff',
            'green-50': '#f0fdf4',
            'purple-50': '#faf5ff'
        };
        return bgMap[bgClass] || '#f0fdf4';
    }

    updatePaymentForm() {
        // تحديث مبلغ الدفع في النموذج
        if (this.selectedPackage) {
            const amountElements = document.querySelectorAll('[data-payment-amount]');
            amountElements.forEach(el => {
                el.textContent = `${this.selectedPackage.usdtAmount} USDT`;
            });
        }
    }
}

// تشغيل المعالج عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', function() {
    if (typeof packagesData !== 'undefined') {
        new PaymentPackageHandler();
    }
});
