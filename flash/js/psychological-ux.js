// ===========================================
// علم الإقناع الرقمي والـ UX النفسي المتقدم
// Psychological UX & Digital Persuasion Engine
// ===========================================

class PsychologicalUX {
    constructor() {
        this.init();
        this.setupEventListeners();
        this.startPsychologicalTimers();
    }

    init() {
        console.log('🧠 Psychological UX Engine Initialized');
        this.createLiveActivityIndicators();
        this.setupScarcityTimers();
        this.implementSocialProof();
        this.setupMicroInteractions();
        this.createTrustIndicators();
    }

    // ===== 1. مؤشرات النشاط المباشر (Live Activity) =====
    createLiveActivityIndicators() {
        const activities = [
            { name: 'أحمد م.', action: 'اشترى 500 USDT-FLASH', time: '2 دقائق', location: 'الرياض' },
            { name: 'فاطمة ع.', action: 'اشترت 1000 USDT-FLASH', time: '5 دقائق', location: 'دبي' },
            { name: 'محمد ك.', action: 'اشترى 250 USDT-FLASH', time: '8 دقائق', location: 'الكويت' },
            { name: 'سارة ب.', action: 'اشترت 750 USDT-FLASH', time: '12 دقيقة', location: 'الدوحة' },
            { name: 'عبدالله ر.', action: 'اشترى 300 USDT-FLASH', time: '15 دقيقة', location: 'البحرين' }
        ];

        this.showLiveActivity(activities);
    }

    showLiveActivity(activities) {
        const container = document.createElement('div');
        container.className = 'fixed bottom-4 left-4 z-50 space-y-2';
        container.id = 'liveActivityContainer';

        document.body.appendChild(container);

        // عرض النشاطات بشكل عشوائي
        setInterval(() => {
            if (Math.random() > 0.3) { // 70% احتمالية الظهور
                const activity = activities[Math.floor(Math.random() * activities.length)];
                this.displayActivityNotification(activity, container);
            }
        }, 15000 + Math.random() * 20000); // كل 15-35 ثانية
    }

    displayActivityNotification(activity, container) {
        const notification = document.createElement('div');
        notification.className = 'bg-white border border-green-200 rounded-lg shadow-lg p-3 max-w-sm transform translate-x-[-100%] opacity-0 transition-all duration-500';
        
        notification.innerHTML = `
            <div class="flex items-center space-x-3">
                <div class="flex-shrink-0">
                    <div class="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                        <i class="fas fa-user text-white text-xs"></i>
                    </div>
                </div>
                <div class="flex-1 min-w-0">
                    <p class="text-sm font-medium text-gray-900">${activity.name}</p>
                    <p class="text-xs text-gray-500">${activity.action}</p>
                    <p class="text-xs text-gray-400">${activity.time} - ${activity.location}</p>
                </div>
                <div class="flex-shrink-0">
                    <div class="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                </div>
            </div>
        `;

        container.appendChild(notification);

        // تحريك الظهور
        setTimeout(() => {
            notification.classList.remove('translate-x-[-100%]', 'opacity-0');
        }, 100);

        // إزالة الإشعار بعد 8 ثواني
        setTimeout(() => {
            notification.classList.add('translate-x-[-100%]', 'opacity-0');
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 500);
        }, 8000);
    }

    // ===== 2. مؤقتات الندرة والإلحاح (Scarcity Timers) =====
    setupScarcityTimers() {
        const timerElements = document.querySelectorAll('.scarcity-timer');
        
        timerElements.forEach(timer => {
            const endTime = new Date().getTime() + (24 * 60 * 60 * 1000); // 24 ساعة
            this.startCountdown(timer, endTime);
        });

        // إضافة مؤقت للعروض الخاصة
        this.createLimitedTimeOffer();
    }

    startCountdown(element, endTime) {
        const countdown = setInterval(() => {
            const now = new Date().getTime();
            const distance = endTime - now;

            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            if (distance < 0) {
                clearInterval(countdown);
                element.innerHTML = "⏰ انتهت المدة!";
                return;
            }

            element.innerHTML = `
                <div class="flex items-center justify-center space-x-4">
                    <div class="text-center">
                        <div class="text-2xl font-bold">${hours.toString().padStart(2, '0')}</div>
                        <div class="text-xs">ساعة</div>
                    </div>
                    <div class="text-xl">:</div>
                    <div class="text-center">
                        <div class="text-2xl font-bold">${minutes.toString().padStart(2, '0')}</div>
                        <div class="text-xs">دقيقة</div>
                    </div>
                    <div class="text-xl">:</div>
                    <div class="text-center">
                        <div class="text-2xl font-bold">${seconds.toString().padStart(2, '0')}</div>
                        <div class="text-xs">ثانية</div>
                    </div>
                </div>
            `;
        }, 1000);
    }

    createLimitedTimeOffer() {
        const offer = document.createElement('div');
        offer.className = 'fixed top-0 left-0 right-0 bg-red-600 text-white text-center py-2 z-50 transform -translate-y-full transition-transform duration-500';
        offer.innerHTML = `
            <div class="container mx-auto px-4">
                <span class="text-sm font-bold">🔥 عرض محدود: خصم 25% على جميع الباقات!</span>
                <span class="ml-4 text-xs">ينتهي خلال: <span id="topTimerDisplay">23:59:59</span></span>
                <button class="ml-4 text-xs underline hover:no-underline" onclick="this.parentElement.parentElement.remove()">×</button>
            </div>
        `;

        document.body.appendChild(offer);

        // إظهار البانر بعد 5 ثواني
        setTimeout(() => {
            offer.classList.remove('-translate-y-full');
        }, 5000);
    }

    // ===== 3. تنفيذ الدليل الاجتماعي (Social Proof) =====
    implementSocialProof() {
        this.createReviewsCarousel();
        this.showStatistics();
        this.displayTrustBadges();
    }

    createReviewsCarousel() {
        const reviews = [
            {
                name: 'أحمد محمد',
                rating: 5,
                comment: 'خدمة ممتازة وسريعة جداً. استلمت USDT-FLASH في أقل من دقيقة!',
                verified: true,
                date: '2024-01-15'
            },
            {
                name: 'فاطمة العلي',
                rating: 5,
                comment: 'أفضل موقع للتداول الآمن. الأسعار عادلة والدعم رائع.',
                verified: true,
                date: '2024-01-14'
            },
            {
                name: 'محمد الكويتي',
                rating: 5,
                comment: 'تجربة رائعة ومأمونة 100%. أنصح الجميع بالتعامل معهم.',
                verified: true,
                date: '2024-01-13'
            }
        ];

        const reviewsContainer = document.querySelector('.reviews-container');
        if (reviewsContainer) {
            this.populateReviews(reviewsContainer, reviews);
        }
    }

    populateReviews(container, reviews) {
        container.innerHTML = reviews.map(review => `
            <div class="customer-testimonial">
                <div class="flex items-center mb-3">
                    <div class="testimonial-avatar">${review.name.charAt(0)}</div>
                    <div>
                        <h4 class="font-semibold">${review.name}</h4>
                        <div class="flex items-center">
                            ${'★'.repeat(review.rating)}
                            ${review.verified ? '<i class="fas fa-check-circle text-green-500 ml-2"></i>' : ''}
                        </div>
                    </div>
                </div>
                <p class="text-gray-600 mb-2">"${review.comment}"</p>
                <span class="text-sm text-gray-400">${review.date}</span>
            </div>
        `).join('');
    }

    showStatistics() {
        const stats = {
            totalUsers: 15847,
            totalTransactions: 892156,
            satisfaction: 98.7,
            uptime: 99.9
        };

        this.animateNumbers(stats);
    }

    animateNumbers(stats) {
        Object.keys(stats).forEach(key => {
            const element = document.querySelector(`[data-stat="${key}"]`);
            if (element) {
                this.countUp(element, 0, stats[key], 2000);
            }
        });
    }

    countUp(element, start, end, duration) {
        const startTime = performance.now();
        const range = end - start;

        const animate = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            const current = start + (range * this.easeOutQuart(progress));
            
            if (typeof end === 'number' && end > 1000) {
                element.textContent = Math.floor(current).toLocaleString();
            } else {
                element.textContent = current.toFixed(1);
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

    displayTrustBadges() {
        const badges = [
            { icon: 'fas fa-shield-alt', text: 'حماية SSL 256-bit' },
            { icon: 'fas fa-check-circle', text: 'معتمد من Tether' },
            { icon: 'fas fa-lock', text: 'مشفر بالكامل' },
            { icon: 'fas fa-users', text: '+15,000 عميل' }
        ];

        const container = document.querySelector('.trust-indicators');
        if (container) {
            container.innerHTML = badges.map(badge => `
                <div class="trust-indicator">
                    <i class="${badge.icon}"></i>
                    <span>${badge.text}</span>
                </div>
            `).join('');
        }
    }

    // ===== 4. تحسينات التفاعل الدقيق (Micro-interactions) =====
    setupMicroInteractions() {
        // تأثيرات الأزرار
        document.querySelectorAll('.smart-cta-button').forEach(button => {
            button.addEventListener('mouseenter', () => {
                button.style.transform = 'translateY(-2px) scale(1.02)';
            });

            button.addEventListener('mouseleave', () => {
                button.style.transform = 'translateY(0) scale(1)';
            });

            button.addEventListener('click', (e) => {
                this.createRippleEffect(e);
            });
        });

        // تأثيرات البطاقات
        document.querySelectorAll('.option-card').forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-5px)';
            });

            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0)';
            });
        });
    }

    createRippleEffect(e) {
        const button = e.currentTarget;
        const rect = button.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const ripple = document.createElement('span');
        ripple.className = 'ripple-effect';
        ripple.style.cssText = `
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.6);
            transform: scale(0);
            animation: ripple 0.6s linear;
            left: ${x}px;
            top: ${y}px;
            width: 20px;
            height: 20px;
            margin-left: -10px;
            margin-top: -10px;
        `;

        button.appendChild(ripple);

        setTimeout(() => {
            ripple.remove();
        }, 600);
    }

    // ===== 5. مؤقتات الضغط النفسي =====
    startPsychologicalTimers() {
        // مؤقت الخصم المحدود
        setTimeout(() => {
            this.showDiscountPopup();
        }, 30000); // بعد 30 ثانية

        // مؤقت مغادرة الصفحة
        this.setupExitIntentPopup();

        // مؤقت التفاعل
        this.trackUserEngagement();
    }

    showDiscountPopup() {
        if (localStorage.getItem('discountShown')) return;

        const popup = document.createElement('div');
        popup.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
        popup.innerHTML = `
            <div class="bg-white rounded-xl p-8 max-w-md mx-4 transform scale-95 opacity-0 transition-all duration-300">
                <div class="text-center">
                    <div class="text-6xl mb-4">🎉</div>
                    <h3 class="text-2xl font-bold text-gray-800 mb-4">عرض خاص لك!</h3>
                    <p class="text-gray-600 mb-6">احصل على خصم 15% إضافي على طلبك الأول</p>
                    <div class="space-y-3">
                        <button class="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors" onclick="this.closest('.fixed').remove(); localStorage.setItem('discountShown', 'true');">
                            احصل على الخصم الآن
                        </button>
                        <button class="w-full text-gray-500 hover:text-gray-700 transition-colors" onclick="this.closest('.fixed').remove(); localStorage.setItem('discountShown', 'true');">
                            لا شكراً
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

    setupExitIntentPopup() {
        let exitIntentShown = false;

        document.addEventListener('mouseleave', (e) => {
            if (e.clientY <= 0 && !exitIntentShown) {
                exitIntentShown = true;
                this.showExitIntentPopup();
            }
        });
    }

    showExitIntentPopup() {
        const popup = document.createElement('div');
        popup.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
        popup.innerHTML = `
            <div class="bg-white rounded-xl p-8 max-w-lg mx-4">
                <div class="text-center">
                    <div class="text-6xl mb-4">⏰</div>
                    <h3 class="text-2xl font-bold text-gray-800 mb-4">انتظر! لا تفوت الفرصة</h3>
                    <p class="text-gray-600 mb-6">احصل على <span class="font-bold text-green-600">200 USDT-FLASH مجاناً</span> مع أول طلب لك</p>
                    <div class="space-y-3">
                        <button class="w-full bg-red-600 text-white py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors" onclick="this.closest('.fixed').remove();">
                            احصل على العرض الآن
                        </button>
                        <button class="w-full text-gray-500 hover:text-gray-700 transition-colors" onclick="this.closest('.fixed').remove();">
                            إغلاق
                        </button>
                    </div>
                </div>
            </div>
        `;

        document.body.appendChild(popup);
    }

    trackUserEngagement() {
        let engagementScore = 0;
        let lastActivity = Date.now();

        // تتبع التمرير
        window.addEventListener('scroll', () => {
            engagementScore += 1;
            lastActivity = Date.now();
        });

        // تتبع النقرات
        document.addEventListener('click', () => {
            engagementScore += 2;
            lastActivity = Date.now();
        });

        // تتبع الحركة
        document.addEventListener('mousemove', () => {
            engagementScore += 0.1;
            lastActivity = Date.now();
        });

        // إظهار عروض مخصصة بناءً على التفاعل
        setInterval(() => {
            const inactiveTime = Date.now() - lastActivity;
            
            if (inactiveTime > 60000 && engagementScore > 10) { // دقيقة واحدة من عدم النشاط
                this.showReEngagementMessage();
            }
        }, 30000);
    }

    showReEngagementMessage() {
        const message = document.createElement('div');
        message.className = 'fixed bottom-4 right-4 bg-blue-600 text-white p-4 rounded-lg shadow-lg z-50 transform translate-x-full transition-transform duration-500';
        message.innerHTML = `
            <div class="flex items-center space-x-3">
                <i class="fas fa-hand-point-right text-2xl"></i>
                <div>
                    <h4 class="font-semibold">هل تحتاج مساعدة؟</h4>
                    <p class="text-sm">فريق الدعم متاح للمساعدة</p>
                </div>
                <button class="ml-4 text-white hover:text-gray-300" onclick="this.parentElement.parentElement.remove()">×</button>
            </div>
        `;

        document.body.appendChild(message);

        setTimeout(() => {
            message.classList.remove('translate-x-full');
        }, 100);

        setTimeout(() => {
            if (message.parentNode) {
                message.classList.add('translate-x-full');
                setTimeout(() => {
                    message.remove();
                }, 500);
            }
        }, 10000);
    }

    // ===== 6. تحسينات إضافية =====
    createTrustIndicators() {
        const indicators = [
            { icon: 'fas fa-shield-alt', text: 'حماية متقدمة', color: 'green' },
            { icon: 'fas fa-clock', text: 'معالجة فورية', color: 'blue' },
            { icon: 'fas fa-users', text: '15,000+ عميل راضي', color: 'purple' },
            { icon: 'fas fa-award', text: 'معتمد رسمياً', color: 'gold' }
        ];

        // إنشاء شريط المؤشرات
        const trustBar = document.createElement('div');
        trustBar.className = 'bg-gray-50 py-4 border-t border-b border-gray-200';
        trustBar.innerHTML = `
            <div class="container mx-auto px-4">
                <div class="flex items-center justify-center space-x-8 text-sm">
                    ${indicators.map(indicator => `
                        <div class="flex items-center space-x-2">
                            <i class="${indicator.icon} text-${indicator.color}-500"></i>
                            <span class="text-gray-700">${indicator.text}</span>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;

        // إدراج الشريط في أعلى الصفحة
        const header = document.querySelector('header');
        if (header && header.nextSibling) {
            header.parentNode.insertBefore(trustBar, header.nextSibling);
        }
    }

    setupEventListeners() {
        // إضافة مستمعي الأحداث للتأثيرات النفسية
        document.addEventListener('DOMContentLoaded', () => {
            this.enhanceFormFields();
            this.setupProgressIndicators();
        });
    }

    enhanceFormFields() {
        const formFields = document.querySelectorAll('input, textarea, select');
        
        formFields.forEach(field => {
            // تحسين التركيز
            field.addEventListener('focus', () => {
                field.parentElement.classList.add('field-focused');
            });

            field.addEventListener('blur', () => {
                field.parentElement.classList.remove('field-focused');
            });

            // تحسين التحقق
            field.addEventListener('input', () => {
                this.validateField(field);
            });
        });
    }

    validateField(field) {
        const isValid = field.checkValidity();
        const feedback = field.parentElement.querySelector('.validation-feedback');
        
        if (isValid) {
            field.classList.remove('invalid');
            field.classList.add('valid');
            if (feedback) feedback.textContent = '✓ صحيح';
        } else {
            field.classList.remove('valid');
            field.classList.add('invalid');
            if (feedback) feedback.textContent = '✗ يرجى التحقق من البيانات';
        }
    }

    setupProgressIndicators() {
        const steps = document.querySelectorAll('.progress-step');
        
        steps.forEach((step, index) => {
            if (index === 0) {
                step.classList.add('current');
            }
        });
    }
}

// تشغيل محرك علم النفس الرقمي
document.addEventListener('DOMContentLoaded', () => {
    window.psychologicalUX = new PsychologicalUX();
});

// إضافة أنماط CSS للتحريك
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .field-focused {
        transform: scale(1.02);
        transition: transform 0.2s ease;
    }
    
    .valid {
        border-color: #10B981 !important;
        box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.1) !important;
    }
    
    .invalid {
        border-color: #EF4444 !important;
        box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1) !important;
    }
`;

document.head.appendChild(style);

// ===== تكامل نظام الإشعارات المحسن =====
// Integration with Enhanced Notification System

// دالة مساعدة لإظهار الإشعارات مع النظام المحسن
window.showPsychologicalNotification = function(message, type = 'info', options = {}) {
    // استخدام النظام المحسن إذا كان متاحاً
    if (typeof notificationSystem !== 'undefined') {
        return notificationSystem.show({
            type: type,
            message: message,
            title: options.title,
            duration: options.duration || 5000,
            actions: options.actions,
            urgent: options.urgent,
            celebration: options.celebration,
            meta: options.meta,
            ...options
        });
    }

    // نظام احتياطي بسيط
    return showBasicNotification(message, type, options);
};

// نظام الإشعارات الاحتياطي
function showBasicNotification(message, type, options = {}) {
    const notification = document.createElement('div');
    notification.className = `notification-popup show notification-${type} psychological-notification`;
    
    // أيقونات الإشعارات
    const icons = {
        success: 'fas fa-check-circle text-green-500',
        error: 'fas fa-times-circle text-red-500',
        warning: 'fas fa-exclamation-triangle text-yellow-500',
        info: 'fas fa-info-circle text-blue-500',
        promotion: 'fas fa-gift text-purple-500',
        'live-activity': 'fas fa-users text-green-600'
    };

    notification.innerHTML = `
        <div class="flex items-start p-4">
            <div class="flex-shrink-0">
                <i class="${icons[type] || icons.info} text-xl"></i>
            </div>
            <div class="ml-3 w-0 flex-1">
                ${options.title ? `<h4 class="font-semibold text-gray-900 mb-1">${options.title}</h4>` : ''}
                <p class="text-sm text-gray-700">${message}</p>
                ${options.meta ? `<p class="text-xs text-gray-500 mt-1">${options.meta}</p>` : ''}
                ${options.actions ? renderNotificationActions(options.actions) : ''}
            </div>
            <div class="ml-4 flex-shrink-0">
                <button class="notification-close-btn" onclick="this.closest('.notification-popup').remove()">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        </div>
    `;

    // إضافة تأثيرات خاصة
    if (options.urgent) {
        notification.classList.add('notification-urgent');
    }
    
    if (options.celebration) {
        notification.classList.add('notification-celebration');
    }

    document.body.appendChild(notification);

    // إزالة تلقائياً
    const duration = options.duration || 5000;
    setTimeout(() => {
        if (notification.parentElement) {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        }
    }, duration);

    return notification;
}

// رسم أزرار الإشعارات
function renderNotificationActions(actions) {
    if (!actions || actions.length === 0) return '';
    
    const actionsHtml = actions.map(action => `
        <button class="inline-flex items-center px-3 py-1 mt-2 mr-2 text-xs font-medium rounded-md ${
            action.type === 'primary' ? 'bg-green-600 text-white hover:bg-green-700' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
        }" onclick="${action.handler}">
            ${action.icon ? `<i class="${action.icon} mr-1"></i>` : ''}
            ${action.text}
        </button>
    `).join('');
    
    return `<div class="mt-2">${actionsHtml}</div>`;
}

// دوال سريعة للأنواع المختلفة
window.showSuccessNotification = (message, options = {}) => 
    showPsychologicalNotification(message, 'success', { title: 'نجح!', ...options });

window.showErrorNotification = (message, options = {}) => 
    showPsychologicalNotification(message, 'error', { title: 'خطأ!', urgent: true, ...options });

window.showWarningNotification = (message, options = {}) => 
    showPsychologicalNotification(message, 'warning', { title: 'تحذير!', ...options });

window.showInfoNotification = (message, options = {}) => 
    showPsychologicalNotification(message, 'info', { title: 'معلومة', ...options });

window.showPromotionNotification = (message, options = {}) => 
    showPsychologicalNotification(message, 'promotion', { title: 'عرض خاص!', celebration: true, ...options });

window.showLiveActivityNotification = (message, options = {}) => 
    showPsychologicalNotification(message, 'live-activity', { title: 'نشاط مباشر', ...options });

// تحسين المحرك النفسي مع الإشعارات
if (typeof window.psychologicalUX !== 'undefined') {
    const originalUX = window.psychologicalUX;
    
    // إضافة وظائف الإشعارات للمحرك النفسي
    window.psychologicalUX.showNotification = showPsychologicalNotification;
    window.psychologicalUX.showSuccess = window.showSuccessNotification;
    window.psychologicalUX.showError = window.showErrorNotification;
    window.psychologicalUX.showWarning = window.showWarningNotification;
    window.psychologicalUX.showInfo = window.showInfoNotification;
    window.psychologicalUX.showPromotion = window.showPromotionNotification;
    window.psychologicalUX.showLiveActivity = window.showLiveActivityNotification;
}