// تكامل متقدم مع Tether + المحرك النفسي
// Advanced Tether Integration + Psychological Engine

class TetherIntegration {
    constructor() {
        this.priceHistory = [];
        this.lastPrice = 1.0000;
        this.init();
    }

    init() {
        console.log('🔗 Tether Integration & Psychological Engine Started');
        this.setupPriceUpdates();
        this.enhancePackageCards();
        this.setupVerificationLinks();
        this.createTetherBranding();
        this.setupLiveStatistics();
        this.implementTrustSignals();
    }

    // ===== تحديثات السعر المتقدمة =====
    setupPriceUpdates() {
        this.updateUSDTPrice();
        
        // تحديث السعر كل 15-45 ثانية (عشوائي لتبدو طبيعية)
        setInterval(() => {
            this.updateUSDTPrice();
        }, 15000 + Math.random() * 30000);
    }

    updateUSDTPrice() {
        const priceElement = document.querySelector('.security-bar .font-bold');
        if (priceElement) {
            // محاكاة تغيرات طبيعية في السعر
            const basePrice = 1.0000;
            const variation = (Math.random() * 0.0008) - 0.0004; // تغير أصغر وأكثر واقعية
            const newPrice = Math.max(0.9995, Math.min(1.0005, basePrice + variation));
            const price = newPrice.toFixed(4);
            
            // حفظ السعر في التاريخ
            this.priceHistory.push({
                price: parseFloat(price),
                timestamp: new Date(),
                change: parseFloat(price) - this.lastPrice
            });
            
            // الاحتفاظ بآخر 50 سعر فقط
            if (this.priceHistory.length > 50) {
                this.priceHistory.shift();
            }
            
            // تحديث العرض مع تأثير انتقال
            this.animatePriceChange(priceElement, price);
            
            // إضافة مؤشر الاتجاه
            this.addPriceTrend(priceElement, parseFloat(price) - this.lastPrice);
            
            this.lastPrice = parseFloat(price);
        }
    }

    animatePriceChange(element, newPrice) {
        element.style.transition = 'all 0.3s ease';
        element.style.transform = 'scale(1.05)';
        element.textContent = `$${newPrice} USD`;
        
        setTimeout(() => {
            element.style.transform = 'scale(1)';
        }, 300);
    }

    addPriceTrend(element, change) {
        // إزالة الأيقونة السابقة
        const existingTrend = element.querySelector('.price-trend');
        if (existingTrend) {
            existingTrend.remove();
        }
        
        if (Math.abs(change) > 0.0001) {
            const trendIcon = document.createElement('span');
            trendIcon.className = 'price-trend ml-1 text-xs';
            
            if (change > 0) {
                trendIcon.innerHTML = '<i class="fas fa-arrow-up text-green-400"></i>';
                element.classList.add('text-green-400');
                element.classList.remove('text-red-400');
            } else {
                trendIcon.innerHTML = '<i class="fas fa-arrow-down text-red-400"></i>';
                element.classList.add('text-red-400');
                element.classList.remove('text-green-400');
            }
            
            element.appendChild(trendIcon);
            
            // إزالة اللون بعد 3 ثوانٍ
            setTimeout(() => {
                element.classList.remove('text-green-400', 'text-red-400');
            }, 3000);
        }
    }

    // ===== تحسين بطاقات الباقات =====
    enhancePackageCards() {
        const packageCards = document.querySelectorAll('.package-card, .option-card');
        
        packageCards.forEach((card, index) => {
            // إضافة شارة Tether
            this.addTetherBadge(card);
            
            // إضافة مؤشر الشعبية
            this.addPopularityIndicator(card, index);
            
            // إضافة عداد الأمان
            this.addSecurityCounter(card);
            
            // تحسين التفاعل
            this.enhanceCardInteraction(card);
        });
    }

    addTetherBadge(card) {
        const tetherBadge = document.createElement('div');
        tetherBadge.className = 'absolute top-2 right-2 tether-seal text-xs';
        tetherBadge.innerHTML = 'Tether Verified';
        
        card.style.position = 'relative';
        card.appendChild(tetherBadge);
    }

    addPopularityIndicator(card, index) {
        // إضافة مؤشر الشعبية بناءً على فهرس البطاقة
        const popularityLevels = ['🔥 الأكثر شعبية', '⭐ خيار ممتاز', '💎 قيمة رائعة'];
        const level = popularityLevels[index % popularityLevels.length];
        
        const popularityBadge = document.createElement('div');

        popularityBadge.textContent = level;
        
        card.appendChild(popularityBadge);
    }

    addSecurityCounter(card) {
        const securityCounter = document.createElement('div');
        securityCounter.className = 'mt-4 p-3 bg-green-50 border border-green-200 rounded-lg';
        securityCounter.innerHTML = `
            <div class="flex items-center justify-between">
                <div class="flex items-center">
                    <i class="fas fa-shield-check text-green-600 mr-2"></i>
                    <span class="font-semibold text-green-800">محمي بواسطة Tether</span>
                </div>
                <div class="text-green-600 font-bold">
                    <span class="security-count">0</span> معاملة آمنة اليوم
                </div>
            </div>
        `;
        
        card.appendChild(securityCounter);
        
        // تحريك العداد
        this.animateSecurityCounter(securityCounter.querySelector('.security-count'));
    }

    animateSecurityCounter(element) {
        const targetCount = Math.floor(Math.random() * 50) + 20; // 20-70 معاملة
        let currentCount = 0;
        
        const increment = () => {
            currentCount++;
            element.textContent = currentCount;
            
            if (currentCount < targetCount) {
                setTimeout(increment, 50);
            }
        };
        
        setTimeout(increment, Math.random() * 2000); // بدء عشوائي
    }

    enhanceCardInteraction(card) {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-5px) scale(1.02)';
            card.style.boxShadow = '0 15px 40px rgba(38, 161, 123, 0.2)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
            card.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        });
    }

    // ===== روابط التحقق المحسنة =====
    setupVerificationLinks() {
        const verifyLinks = document.querySelectorAll('a[href*="tether.to"], .verification-link');
        
        verifyLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                this.showVerificationPopup();
            });
        });
    }

    showVerificationPopup() {
        const popup = document.createElement('div');
        popup.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
        popup.innerHTML = `
            <div class="bg-white rounded-xl p-8 max-w-md mx-4 transform scale-95 opacity-0 transition-all duration-300">
                <div class="text-center">
                    <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <i class="fas fa-shield-alt text-green-600 text-2xl"></i>
                    </div>
                    <h3 class="text-2xl font-bold text-gray-800 mb-4">التحقق من Tether</h3>
                    <p class="text-gray-600 mb-6">سيتم توجيهك إلى صفحة الشفافية الرسمية لـ Tether للتحقق من صحة المعاملات.</p>
                    <div class="space-y-3">
                        <button class="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors" onclick="window.open('https://tether.to/en/transparency', '_blank'); this.closest('.fixed').remove();">
                            <i class="fas fa-external-link-alt mr-2"></i>
                            انتقل إلى صفحة التحقق
                        </button>
                        <button class="w-full text-gray-500 hover:text-gray-700 transition-colors" onclick="this.closest('.fixed').remove();">
                            إغلاق
                        </button>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(popup);
        
        setTimeout(() => {
            popup.querySelector('.bg-white').classList.remove('scale-95', 'opacity-0');
        }, 100);
    }

    // ===== إنشاء العلامة التجارية المحسنة =====
    createTetherBranding() {
        // إضافة بانر الشراكة الرسمية
        this.addOfficialPartnershipBanner();
        
        // تحسين الشعار
        this.enhanceLogo();
        
        // إضافة خاتم التحقق
        this.addVerificationSeal();
    }

    addOfficialPartnershipBanner() {
        const banner = document.createElement('div');
        banner.className = 'official-partnership-banner';
        banner.innerHTML = `
            <div class="container mx-auto px-4">
                <div class="partnership-text">
                    <i class="fas fa-certificate mr-2"></i>
                    <span>Official Tether Partner - 100% Secure and Guaranteed Transactions</span>
                    <i class="fas fa-shield-check ml-2"></i>
                </div>
            </div>
        `;
        
        // إدراج البانر في أعلى الصفحة
        document.body.insertBefore(banner, document.body.firstChild);
        
        // إضافة إمكانية الإغلاق
        banner.addEventListener('click', () => {
            banner.style.transform = 'translateY(-100%)';
            setTimeout(() => banner.remove(), 300);
        });
    }

    enhanceLogo() {
        const logoContainer = document.querySelector('.tether-logo-container');
        if (logoContainer) {
            logoContainer.classList.add('tether-logo-enhanced');
            
            // إضافة تأثير التوهج
            const glowEffect = document.createElement('div');
            glowEffect.className = 'absolute inset-0 rounded-full bg-green-400 opacity-20 animate-ping';
            logoContainer.style.position = 'relative';
            logoContainer.appendChild(glowEffect);
        }
    }

    addVerificationSeal() {
        const seal = document.createElement('div');
        seal.className = 'fixed bottom-4 right-4 z-40 tether-certification p-4 rounded-lg shadow-lg';
        seal.innerHTML = `
            <div class="flex items-center text-sm">
                <i class="fas fa-certificate mr-2"></i>

            </div>
        `;
        
        document.body.appendChild(seal);
        
        // إخفاء الخاتم بعد 10 ثوانٍ
        setTimeout(() => {
            seal.style.transform = 'translateX(100%)';
            setTimeout(() => seal.remove(), 300);
        }, 10000);
    }

    // ===== الإحصائيات المباشرة =====
    setupLiveStatistics() {
        this.updateLiveStats();
        
        // تحديث الإحصائيات كل دقيقة
        setInterval(() => {
            this.updateLiveStats();
        }, 60000);
    }

    updateLiveStats() {
        // تحديث عدد المستخدمين النشطين
        const liveUsersElement = document.getElementById('liveUsersCount');
        if (liveUsersElement) {
            const baseUsers = 200;
            const variation = Math.floor(Math.random() * 100) + 50; // 50-150 تغيير
            const newCount = baseUsers + variation;
            
            this.animateNumber(liveUsersElement, parseInt(liveUsersElement.textContent) || baseUsers, newCount);
        }
        
        // تحديث إحصائيات الثقة
        this.updateTrustStats();
    }

    updateTrustStats() {
        const stats = [
            { element: '[data-stat="totalUsers"]', base: 15000, variation: 50 },
            { element: '[data-stat="satisfaction"]', base: 98.5, variation: 0.3, decimals: 1 },
            { element: '[data-stat="uptime"]', base: 99.8, variation: 0.2, decimals: 1 }
        ];
        
        stats.forEach(stat => {
            const element = document.querySelector(stat.element);
            if (element) {
                const currentValue = parseFloat(element.textContent.replace(/[^\d.]/g, ''));
                const newValue = stat.base + (Math.random() * stat.variation * 2 - stat.variation);
                
                if (stat.decimals) {
                    this.animateNumber(element, currentValue, newValue, stat.decimals);
                } else {
                    this.animateNumber(element, currentValue, Math.floor(newValue));
                }
            }
        });
    }

    animateNumber(element, start, end, decimals = 0) {
        const duration = 1000;
        const startTime = performance.now();
        const change = end - start;
        
        const animate = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            const current = start + (change * this.easeOutQuart(progress));
            
            if (decimals > 0) {
                element.textContent = current.toFixed(decimals) + (element.textContent.includes('%') ? '%' : '');
            } else {
                element.textContent = Math.floor(current).toLocaleString();
            }
            
            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };
        
        requestAnimationFrame(animate);
    }

    easeOutQuart(t) {
        return 1 - (--t) * t * t * t;
    }

    // ===== إشارات الثقة =====
    implementTrustSignals() {
        this.createSecurityBadges();
        this.addSSLIndicator();
    }

    createSecurityBadges() {
        const badges = [
            { icon: 'fas fa-shield-alt', text: 'SSL 256-bit', color: 'green' },
            { icon: 'fas fa-lock', text: 'Encrypted', color: 'blue' },
            { icon: 'fas fa-certificate', text: 'Verified', color: 'purple' },
            { icon: 'fas fa-user-shield', text: 'Protected', color: 'orange' }
        ];
        
        const container = document.createElement('div');
        container.className = 'trust-badge-container';
        
        badges.forEach(badge => {
            const badgeElement = document.createElement('div');
            badgeElement.className = `trust-badge border-${badge.color}-500 text-${badge.color}-600 hover:bg-${badge.color}-500`;
            badgeElement.innerHTML = `
                <i class="${badge.icon}"></i>
                <span>${badge.text}</span>
            `;
            container.appendChild(badgeElement);
        });
        
        // إدراج الشارات في المكان المناسب
        const targetSection = document.querySelector('.security-assurance');
        if (targetSection) {
            targetSection.appendChild(container);
        }
    }

    addSSLIndicator() {
        const sslIndicator = document.createElement('div');
        sslIndicator.className = 'fixed top-20 left-4 bg-green-600 text-white px-3 py-1 rounded-full text-xs font-bold z-30';
        sslIndicator.innerHTML = `
            <i class="fas fa-lock mr-1"></i>
            SSL Secured
        `;
        
        document.body.appendChild(sslIndicator);
        
        // إخفاء المؤشر بعد 8 ثوانٍ
        setTimeout(() => {
            sslIndicator.style.transform = 'translateX(-100%)';
            setTimeout(() => sslIndicator.remove(), 300);
        }, 8000);
    }


}

// تشغيل التكامل مع Tether
document.addEventListener('DOMContentLoaded', () => {
    window.tetherIntegration = new TetherIntegration();
});

// دالة لتحديث السعر من خارج الكلاس (للاستخدام في أماكن أخرى)
window.updateTetherPrice = function(newPrice) {
    if (window.tetherIntegration) {
        window.tetherIntegration.lastPrice = newPrice;
        window.tetherIntegration.updateUSDTPrice();
    }
};

// دالة لإظهار نافذة التحقق
window.showTetherVerification = function() {
    if (window.tetherIntegration) {
        window.tetherIntegration.showVerificationPopup();
    }
};