/* 🌐 Language Toggle Functionality */
/* وظائف تبديل اللغة */

// حالة اللغة الحالية
let currentLanguage = localStorage.getItem('siteLanguage') || 'en';

// أعلام اللغات
const languageFlags = {
    en: '🇺🇸',
    ar: '🇸🇦', 
    ru: '🇷🇺',
    hi: '🇮🇳',
    fr: '🇫🇷'
};

// النصوص متعددة اللغات
const translations = {
    en: {
        // Header
        'site-title': 'USDT-FLASH | Authorized Tether USDT Distributor',
        'verified': 'Verified',
        'secure': 'Secure', 
        'premium': 'Premium',
        'support': 'Technical Support',
        'live-transactions': 'Live Transactions',
        'visa-cards': 'Visa Cards',
        'profile': 'Profile',
        'login': 'Login',
        'register': 'Register',
        'guest': 'Guest',
        
        // Hero Section
        'hero-title': 'Premium USDT-FLASH Services',
        'hero-subtitle': 'Your trusted partner for secure USDT-FLASH transactions. We provide instant delivery, competitive rates, and enterprise-grade security with 24/7 professional support.',
        'get-started': 'Get Started Now',
        'learn-more': 'Learn More',
        
        // Features
        'bank-security': 'Bank-Grade Security',
        'ssl-protection': 'SSL + Multi-layer Protection',
        'instant-delivery': 'Instant Delivery',
        'delivery-guarantee': '5-15 minutes guarantee',
        'support-247': '24/7 Support',
        'professional-assistance': 'Professional assistance',
        'licensed-verified': 'Licensed & Verified',
        'compliant-service': 'Fully compliant service',
        
        // Company Info
        'why-choose': 'Why Choose USDT-FLASH?',
        'company-description': 'We are a leading provider of USDT-FLASH services, committed to delivering excellence, security, and reliability in every transaction.',
        'our-mission': 'Our Mission',
        'mission-text': 'To provide secure, fast, and reliable USDT-FLASH services that empower our clients to achieve their financial goals.',
        'our-vision': 'Our Vision',
        'vision-text': 'To be the most trusted and preferred USDT-FLASH service provider globally, setting industry standards for quality and security.',
        'our-values': 'Our Values',
        'values-text': 'Integrity, transparency, customer-first approach, and continuous innovation drive everything we do.',
        
        // Pricing
        'choose-package': 'Choose Your USDT-FLASH Package',
        'package-description': 'Select the perfect package for your needs with competitive pricing, instant delivery, and professional support.',
        
        // How it works
        'how-it-works': 'How It Works',
        'step1-title': 'Create Your Account',
        'step1-desc': 'Register in minutes using just your email. Complete verification for higher limits.',
        'step2-title': 'Choose Amount',
        'step2-desc': 'Select how many digital dollars you want to purchase from our competitive pricing plans.',
        'step3-title': 'Complete Payment',
        'step3-desc': 'Pay securely via credit card, bank transfer, or cryptocurrency. All transactions are encrypted.',
        'step4-title': 'Receive USDT-FLASH',
        'step4-desc': 'Your digital dollars will be available in your account immediately after payment confirmation.',
        
        // Footer
        'company-footer': 'Professional Cryptocurrency Solutions',
        'footer-description': 'Your trusted partner for secure USDT-FLASH transactions since 2019. We provide enterprise-grade security, instant delivery, and 24/7 professional support to over 47,000+ satisfied customers worldwide.',
        'supported-platforms': 'Supported Platforms',
        'contact-info': 'Contact Information',
        'site-policies': 'Site Policies',
        'privacy-policy': 'Privacy Policy',
        'terms-service': 'Terms of Service',
        'aml-policy': 'Anti-Money Laundering Policy',
        'about-arabic': 'About Us (Arabic)',
        'about-english': 'About Us (English)',
        
        // Notifications
        'language-changed': 'Language changed to English',
        'welcome-message': 'Welcome to USDT-FLASH!',
        
        // Menu
        'menu-title': 'Menu',
        'language-section': 'Language',
        'navigation-section': 'Navigation',
        'account-section': 'Account'
    },
    ru: {
        'site-title': 'USDT-FLASH | Авторизованный дистрибьютор Tether USDT',
        'hero-title': 'Премиум услуги USDT-FLASH',
        'hero-subtitle': 'Ваш надёжный партнёр для безопасных транзакций USDT-FLASH.',
        'get-started': 'Начать сейчас',
        'language-changed': 'Язык изменён на русский',
        'menu-title': 'Меню',
        'language-section': 'Язык',
        'navigation-section': 'Навигация',
        'account-section': 'Аккаунт'
    },
    hi: {
        'site-title': 'USDT-FLASH | अधिकृत Tether USDT वितरक',
        'hero-title': 'प्रीमियम USDT-FLASH सेवाएं',
        'hero-subtitle': 'सुरक्षित USDT-FLASH लेनदेन के लिए आपका भरोसेमंद साझीदार।',
        'get-started': 'अभी शुरू करें',
        'language-changed': 'भाषा हिंदी में बदल दी गई',
        'menu-title': 'मेनू',
        'language-section': 'भाषा',
        'navigation-section': 'नेविगेशन',
        'account-section': 'खाता'
    },
    fr: {
        'site-title': 'USDT-FLASH | Distributeur Tether USDT Autorisé',
        'hero-title': 'Services USDT-FLASH Premium',
        'hero-subtitle': 'Votre partenaire de confiance pour des transactions USDT-FLASH sécurisées.',
        'get-started': 'Commencer Maintenant',
        'language-changed': 'Langue changée en français',
        'menu-title': 'Menu',
        'language-section': 'Langue',
        'navigation-section': 'Navigation',
        'account-section': 'Compte'
    },
    ar: {
        // Header
        'site-title': 'USDT-FLASH | موزع تيثر USDT المعتمد',
        'verified': 'موثق',
        'secure': 'آمن',
        'premium': 'مميز',
        'support': 'الدعم الفني',
        'live-transactions': 'المعاملات المباشرة',
        'visa-cards': 'بطاقات فيزا',
        'profile': 'الملف الشخصي',
        'login': 'تسجيل الدخول',
        'register': 'إنشاء حساب',
        'guest': 'زائر',
        
        // Hero Section
        'hero-title': 'خدمات USDT-FLASH المتميزة',
        'hero-subtitle': 'شريكك الموثوق لمعاملات USDT-FLASH الآمنة. نوفر التسليم الفوري والأسعار التنافسية والأمان على مستوى المؤسسات مع الدعم المهني على مدار الساعة.',
        'get-started': 'ابدأ الآن',
        'learn-more': 'اعرف المزيد',
        
        // Features
        'bank-security': 'أمان على مستوى البنوك',
        'ssl-protection': 'SSL + حماية متعددة الطبقات',
        'instant-delivery': 'تسليم فوري',
        'delivery-guarantee': 'ضمان 5-15 دقيقة',
        'support-247': 'دعم 24/7',
        'professional-assistance': 'مساعدة مهنية',
        'licensed-verified': 'مرخص وموثق',
        'compliant-service': 'خدمة متوافقة بالكامل',
        
        // Company Info
        'why-choose': 'لماذا تختار USDT-FLASH؟',
        'company-description': 'نحن مزود رائد لخدمات USDT-FLASH، ملتزمون بتقديم التميز والأمان والموثوقية في كل معاملة.',
        'our-mission': 'مهمتنا',
        'mission-text': 'تقديم خدمات USDT-FLASH آمنة وسريعة وموثوقة تمكن عملاءنا من تحقيق أهدافهم المالية.',
        'our-vision': 'رؤيتنا',
        'vision-text': 'أن نكون مزود خدمات USDT-FLASH الأكثر ثقة وتفضيلاً عالمياً، ووضع معايير الصناعة للجودة والأمان.',
        'our-values': 'قيمنا',
        'values-text': 'النزاهة والشفافية ونهج العميل أولاً والابتكار المستمر يقود كل ما نقوم به.',
        
        // Pricing
        'choose-package': 'اختر باقة USDT-FLASH الخاصة بك',
        'package-description': 'اختر الباقة المثالية لاحتياجاتك بأسعار تنافسية وتسليم فوري ودعم مهني.',
        
        // How it works
        'how-it-works': 'كيف يعمل',
        'step1-title': 'أنشئ حسابك',
        'step1-desc': 'سجل في دقائق باستخدام بريدك الإلكتروني فقط. أكمل التحقق للحصول على حدود أعلى.',
        'step2-title': 'اختر المبلغ',
        'step2-desc': 'اختر كم من الدولارات الرقمية تريد شراءها من خطط الأسعار التنافسية لدينا.',
        'step3-title': 'أكمل الدفع',
        'step3-desc': 'ادفع بأمان عبر بطاقة الائتمان أو التحويل المصرفي أو العملة المشفرة. جميع المعاملات مشفرة.',
        'step4-title': 'استلم USDT-FLASH',
        'step4-desc': 'ستكون دولاراتك الرقمية متاحة في حسابك فوراً بعد تأكيد الدفع.',
        
        // Additional content
        'satisfied-customers': 'عميل راضٍ',
        'successful-transactions': 'معاملة ناجحة',
        'customer-rating': 'تقييم العملاء',
        'active-users': 'مستخدم نشط',
        'platforms-supporting': 'المنصات التي تدعم USDT Flash',
        'platforms-description': 'يمكنك إرسال واستقبال USDT Flash من خلال المنصات التالية، بالإضافة إلى جميع المنصات اللامركزية (DeFi):',
        'testimonials-title': 'آراء العملاء',
        'testimonials-subtitle': 'تعليقات من عملائنا الكرام',
        'add-comment': 'أضف تعليقك',
        'features-title': 'لماذا تختار USDT-FLASH؟',
        'features-subtitle': 'نقدم أفضل الحلول المالية الرقمية بميزات فريدة تجعلنا الخيار الأمثل لتداول USDT بثقة وأمان',
        
        // USDT Flash Instructions
        'flash-notice-title': '🔔 إشعار مهم – اطلق قوتك التجارية مع USDT FLASH',
        'flash-notice-desc': '<b>USDT FLASH</b> هو رصيد رقمي ذكي وآمن يعمل ضمن بيئة Web3 ويبقى صالحاً لمدة <b>365 يوماً</b> من لحظة استلامه.<br>هو مصمم ليمنحك وصولاً سريعاً ومرناً إلى منصات التداول العالمية — بأمان وسهولة.',
        'where-store-title': '✅ أين يمكنك تخزين USDT FLASH؟',
        'where-store-desc': 'يمكنك تخزينه بأمان في محافظ Web3 مثل:<br><b>MetaMask، Trust Wallet، Binance، أو Bybit</b>',
        'how-works-title': '🚀 كيف يعمل USDT FLASH؟',
        'work-step1': 'استلم USDT FLASH في محفظتك',
        'work-step2': 'حوله إلى عملة ميم مثل <b>PEPE، DOGE، أو SHIBA</b>',
        'work-step3': 'احتفظ بعملة الميم في محفظتك لمدة <b>24 ساعة</b> على الأقل',
        'work-step4': 'بعد ذلك، يمكنك بيعها واستلام USDT حقيقي يمكن تداوله وسحبه بحرية',
        'fee-notice-title': '💸 ملاحظة مهمة حول رسوم 25%:',
        'fee-notice-desc': 'عندما تبيع عملات الميم بعد التحويل من USDT FLASH، ستحصل على USDT حقيقي، لكن <b>سيتم خصم 25% من المبلغ النهائي كرسوم خدمة</b>.<br>✅ هذه الرسوم مبنية على اتفاقية رسمية بين منصتنا والبورصات الشريكة التي تدعم USDT FLASH.',
        'rules-title': '⚠️ لتجنب فقدان رصيدك، اتبع هذه القواعد:',
        'rule1': 'لا تبع USDT FLASH مباشرة قبل تحويله إلى عملة ميم',
        'rule2': 'لا ترسل USDT FLASH باستخدام اسم مستخدم أو ID — استخدم دائماً عنوان محفظة Web3 كامل',
        'rule3': 'لا تخزن USDT FLASH في منصات غير مدعومة — استخدم فقط محافظ Web3 أو المنصات الشريكة الرسمية',
        'rule4': 'بعد التحويل إلى عملة ميم، انتظر 24 ساعة قبل البيع لضمان التفعيل الكامل',
        'trust-title': '💬 لماذا يثق الآلاف في USDT FLASH:',
        'trust1': '🔒 آمن ومتوافق بالكامل مع Web3',
        'trust2': '💸 يتحول بسهولة إلى USDT حقيقي قابل للتداول',
        'trust3': '🌍 يمكن استخدام الأرباح في أي بورصة رئيسية: Binance، Bybit، OKX، والمزيد',
        'trust4': '🛡️ نظام شفاف — لا حيل، لا التباس',
        'act-now-title': '🎯 اتخذ إجراء الآن – كلما بدأت مبكراً، زادت أرباحك!',
        'act-now-desc': '📲 احصل على USDT FLASH وابدأ رحلتك التجارية بثقة واستراتيجية ذكية وربح حقيقي.',
        
        // Footer
        'company-footer': 'حلول العملات المشفرة المهنية',
        'footer-description': 'شريكك الموثوق لمعاملات USDT-FLASH الآمنة منذ 2019. نوفر أماناً على مستوى المؤسسات وتسليماً فورياً ودعماً مهنياً على مدار الساعة لأكثر من 47,000+ عميل راضٍ حول العالم.',
        'supported-platforms': 'المنصات المدعومة',
        'contact-info': 'معلومات الاتصال',
        'site-policies': 'سياسات الموقع',
        'privacy-policy': 'سياسة الخصوصية',
        'terms-service': 'شروط الخدمة',
        'aml-policy': 'سياسة مكافحة غسيل الأموال',
        'about-arabic': 'من نحن (عربي)',
        'about-english': 'من نحن (إنجليزي)',
        
        // Notifications
        'language-changed': 'تم تغيير اللغة إلى العربية',
        'welcome-message': 'مرحباً بك في USDT-FLASH!',
        
        // Menu
        'menu-title': 'القائمة',
        'language-section': 'اللغة',
        'navigation-section': 'التنقل',
        'account-section': 'الحساب'
    }
};

// تطبيق اللغة عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', function() {
    applyLanguage(currentLanguage);
    updateLanguageIndicator();
});

// فتح/إغلاق قائمة اللغات
function toggleLanguageDropdown() {
    const menu = document.getElementById('language-menu');
    menu.classList.toggle('show');
}

// تغيير اللغة
function changeLanguage(language) {
    document.body.classList.add('language-switching');
    
    setTimeout(() => {
        applyLanguage(language);
        currentLanguage = language;
        localStorage.setItem('siteLanguage', language);
        updateCurrentFlag();
        showLanguageNotification(language);
        document.body.classList.remove('language-switching');
        document.getElementById('language-menu').classList.remove('show');
    }, 300);
}

// تحديث علم اللغة الحالية
function updateCurrentFlag() {
    const flagElement = document.getElementById('current-flag');
    if (flagElement) {
        flagElement.textContent = languageFlags[currentLanguage];
    }
}

// إغلاق القائمة عند النقر خارجها
document.addEventListener('click', function(e) {
    if (!e.target.closest('.language-dropdown')) {
        document.getElementById('language-menu').classList.remove('show');
    }
});

// تطبيق اللغة على العناصر
function applyLanguage(language) {
    const isArabic = language === 'ar';
    
    // تطبيق اتجاه النص
    document.documentElement.dir = isArabic ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
    
    // تطبيق الكلاس للوضع العربي
    if (isArabic) {
        document.body.classList.add('rtl-mode');
        document.body.classList.add('arabic-font');
    } else {
        document.body.classList.remove('rtl-mode');
        document.body.classList.remove('arabic-font');
    }
    
    // تحديث النصوص
    updateTexts(language);
    
    // تحديث الأيقونات والخطوط
    updateIconsAndFonts(isArabic);
    
    // تحديث عنوان الصفحة
    document.title = translations[language]['site-title'];
    
    // تحديث meta description
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
        metaDesc.content = isArabic ? 
            'USDT-FLASH - موزع تيثر USDT المعتمد. مرخص من شركة Tether Operations Limited للمعاملات الآمنة.' :
            'USDT-FLASH - Authorized Tether USDT Distributor. Licensed by Tether Operations Limited for secure USDT transactions.';
    }
}

// تحديث النصوص في الصفحة
function updateTexts(language) {
    const texts = translations[language];
    
    // تحديث النصوص بناءً على data-translate
    document.querySelectorAll('[data-translate]').forEach(element => {
        const key = element.getAttribute('data-translate');
        if (texts[key]) {
            element.textContent = texts[key];
        }
    });
    
    // تحديث النصوص المحددة يدوياً
    updateSpecificTexts(language);
}

// تحديث نصوص محددة
function updateSpecificTexts(language) {
    const isArabic = language === 'ar';
    
    // تحديث نصوص الهيدر
    const logoTitle = document.querySelector('.logo-title');
    if (logoTitle) {
        logoTitle.textContent = 'USDT-FLASH';
    }
    
    // تحديث نصوص الأزرار
    const loginBtn = document.querySelector('.login-button');
    if (loginBtn) {
        loginBtn.textContent = isArabic ? 'تسجيل الدخول' : 'Login';
    }
    
    const registerBtn = document.querySelector('.register');
    if (registerBtn) {
        registerBtn.textContent = isArabic ? 'إنشاء حساب' : 'Register';
    }
    
    // تحديث نصوص Hero Section
    const heroTitle = document.querySelector('h2');
    if (heroTitle && heroTitle.textContent.includes('Premium USDT-FLASH')) {
        heroTitle.textContent = isArabic ? 'خدمات USDT-FLASH المتميزة' : 'Premium USDT-FLASH Services';
    }
    
    // تحديث نصوص الأزرار الرئيسية
    const getStartedBtns = document.querySelectorAll('a[href="#pricing"]');
    getStartedBtns.forEach(btn => {
        if (btn.textContent.includes('Get Started')) {
            btn.innerHTML = isArabic ? 
                '<i class="fas fa-rocket mr-2"></i>ابدأ الآن' : 
                '<i class="fas fa-rocket mr-2"></i>Get Started Now';
        }
    });
    
    const learnMoreBtns = document.querySelectorAll('a[href="#features"]');
    learnMoreBtns.forEach(btn => {
        if (btn.textContent.includes('Learn More')) {
            btn.innerHTML = isArabic ? 
                '<i class="fas fa-info-circle mr-2"></i>اعرف المزيد' : 
                '<i class="fas fa-info-circle mr-2"></i>Learn More';
        }
    });
}

// تحديث مؤشر اللغة
function updateLanguageIndicator() {
    updateCurrentFlag();
}

// إظهار إشعار تغيير اللغة
function showLanguageNotification(language) {
    const isArabic = language === 'ar';
    const message = translations[language]['language-changed'];
    
    // إنشاء الإشعار
    const notification = document.createElement('div');
    notification.className = `language-notification ${isArabic ? 'rtl' : ''}`;
    notification.innerHTML = `
        <div class="flex items-center">
            <div class="flag-icon ${language}"></div>
            <span>${message}</span>
            <i class="fas fa-check-circle ml-2"></i>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // إظهار الإشعار
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    // إخفاء الإشعار
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            if (notification.parentElement) {
                notification.remove();
            }
        }, 300);
    }, 3000);
}

// حفظ تفضيل اللغة عند تغيير الصفحة
window.addEventListener('beforeunload', function() {
    localStorage.setItem('siteLanguage', currentLanguage);
});

// تطبيق اللغة على الصفحات الفرعية
function applyLanguageToSubpages() {
    const language = localStorage.getItem('siteLanguage') || 'en';
    const isArabic = language === 'ar';
    
    // تطبيق على جميع الصفحات
    document.documentElement.dir = isArabic ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
    
    if (isArabic) {
        document.body.classList.add('rtl-mode');
    }
}

// تحديث الأيقونات والخطوط للعربية
function updateIconsAndFonts(isArabic) {
    // تحديث الأيقونات للاتجاه العربي
    const icons = document.querySelectorAll('.fas, .far, .fab');
    icons.forEach(icon => {
        if (isArabic) {
            icon.style.marginLeft = '8px';
            icon.style.marginRight = '0';
        } else {
            icon.style.marginLeft = '0';
            icon.style.marginRight = '8px';
        }
    });
    
    // تحديث الخطوط
    if (isArabic) {
        document.documentElement.style.setProperty('--main-font', "'Cairo', 'Tajawal', sans-serif");
    } else {
        document.documentElement.style.setProperty('--main-font', "'Inter', 'Segoe UI', sans-serif");
    }
}

// تصدير الوظائف للاستخدام العام
window.toggleLanguage = toggleLanguage;
window.applyLanguageToSubpages = applyLanguageToSubpages;

// تطبيق اللغة تلقائياً عند تحميل أي صفحة
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', applyLanguageToSubpages);
} else {
    applyLanguageToSubpages();
}
