/**
 * Advanced Psychological UX Effects for Maximum Conversion
 * تقنيات علم النفس المتقدمة لزيادة معدلات التحويل إلى أقصى حد
 */

class AdvancedPsychologyUX {
    constructor() {
        this.exitIntentShown = false;
        this.mouseLeft = false;
        this.isActive = true;
        this.sessionData = this.initSessionData();
        
        this.init();
    }
    
    // Initialize session data
    initSessionData() {
        const existing = JSON.parse(localStorage.getItem('psychologySession') || '{}');
        const defaults = {
            visitCount: 0,
            lastVisit: Date.now(),
            cartAbandonments: 0,
            timeOnSite: 0,
            scrollDepth: 0,
            packageViews: {basic: 0, pro: 0, enterprise: 0}
        };
        
        const session = {...defaults, ...existing};
        session.visitCount++;
        localStorage.setItem('psychologySession', JSON.stringify(session));
        
        return session;
    }
    
    // Main initialization
    init() {
        this.initScrollTracking();
        this.initTimeTracking();
        this.initHeatmapSimulation();
        this.initPersonalizationEngine();
        this.initABTestingEffects();
        this.initMicroInteractions();
        this.initCognitiveBiasEffects();
    }
    
    // Track user scroll behavior for personalization
    initScrollTracking() {
        let maxScroll = 0;
        
        window.addEventListener('scroll', () => {
            const scrollPercent = Math.round((window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100);
            
            if (scrollPercent > maxScroll) {
                maxScroll = scrollPercent;
                this.sessionData.scrollDepth = maxScroll;
                
                // Trigger different effects based on scroll depth
                if (scrollPercent > 25 && !this.sessionData.triggeredScrollEffects?.quarter) {
                    this.triggerScrollEffect('quarter');
                }
                if (scrollPercent > 50 && !this.sessionData.triggeredScrollEffects?.half) {
                    this.triggerScrollEffect('half');
                }
                if (scrollPercent > 75 && !this.sessionData.triggeredScrollEffects?.threequarters) {
                    this.triggerScrollEffect('threequarters');
                }
            }
        });
    }
    
    // Track time on site for behavior analysis
    initTimeTracking() {
        const startTime = Date.now();
        
        setInterval(() => {
            this.sessionData.timeOnSite = Math.floor((Date.now() - startTime) / 1000);
            
            // Trigger time-based effects
            if (this.sessionData.timeOnSite > 30 && !this.sessionData.triggeredTimeEffects?.engaged) {
                this.triggerEngagementEffect();
            }
            
            if (this.sessionData.timeOnSite > 120 && !this.sessionData.triggeredTimeEffects?.committed) {
                this.triggerCommitmentEffect();
            }
        }, 5000);
    }
    
    // Simulate heatmap data for optimization
    initHeatmapSimulation() {
        const elements = document.querySelectorAll('.package-btn, .package-card, a[href*="pricing"]');
        
        elements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                this.trackHeatmapInteraction(element);
            });
            
            element.addEventListener('click', () => {
                this.trackHeatmapClick(element);
            });
        });
    }
    
    // Personalization based on user behavior
    initPersonalizationEngine() {
        const returning = this.sessionData.visitCount > 1;
        const highEngagement = this.sessionData.timeOnSite > 60;
        const cartAbandoner = this.sessionData.cartAbandonments > 0;
        
        if (returning) {
            this.showReturningUserMessage();
        }
        
        if (cartAbandoner) {
            this.showCartRecoveryIncentive();
        }
        
        if (highEngagement) {
            this.showEngagementReward();
        }
    }
    
    // A/B Testing Effects
    initABTestingEffects() {
        const variant = Math.random() < 0.5 ? 'A' : 'B';
        
        if (variant === 'B') {
            // Test aggressive urgency
            this.applyAggressiveUrgency();
        }
        
        // Store variant for analytics
        this.sessionData.abVariant = variant;
    }
    
    // Micro-interactions for better UX
    initMicroInteractions() {
        // Button hover effects
        document.querySelectorAll('.package-btn').forEach(btn => {
            btn.addEventListener('mouseenter', () => {
                this.addButtonMicroInteraction(btn);
            });
        });
        
        // Price change animations
        document.querySelectorAll('.text-4xl').forEach(price => {
            this.addPriceMicroInteraction(price);
        });
    }
    
    // Apply cognitive bias effects
    initCognitiveBiasEffects() {
        // Authority bias
        this.showAuthorityIndicators();
        
        // Social proof amplification
        this.amplifySocketialProof();
        
        // Anchoring bias
        this.enhanceAnchoring();
        
        // Loss aversion
        this.amplifyLossAversion();
    }
    
    // Scroll-based triggers
    triggerScrollEffect(level) {
        if (!this.sessionData.triggeredScrollEffects) {
            this.sessionData.triggeredScrollEffects = {};
        }
        
        this.sessionData.triggeredScrollEffects[level] = true;
        
        switch(level) {
            case 'quarter':
                this.showProgressIncentive();
                break;
            case 'half':
                this.showSocialProofNotification();
                break;
            case 'threequarters':
                this.showUrgencyReminder();
                break;
        }
    }
    
    // Engagement-based effects
    triggerEngagementEffect() {
        if (!this.sessionData.triggeredTimeEffects) {
            this.sessionData.triggeredTimeEffects = {};
        }
        
        this.sessionData.triggeredTimeEffects.engaged = true;
        this.showEngagedUserBonus();
    }
    
    triggerCommitmentEffect() {
        this.sessionData.triggeredTimeEffects.committed = true;
        this.showCommitmentReward();
    }
    
    // Show different messages based on user type
    showReturningUserMessage() {
        const message = document.createElement('div');
        message.className = 'fixed top-20 right-4 bg-blue-500 text-white p-3 rounded-lg shadow-lg z-50 transition-all';
        message.innerHTML = `
            <div class="flex items-center">
                <i class="fas fa-user-clock mr-2"></i>
                <span class="text-sm font-semibold">Welcome back! Your last visit: ${this.formatLastVisit()}</span>
            </div>
        `;
        
        document.body.appendChild(message);
        
        setTimeout(() => {
            message.style.transform = 'translateX(120%)';
            setTimeout(() => message.remove(), 500);
        }, 5000);
    }
    
    // Cart recovery for abandoners
    showCartRecoveryIncentive() {
        setTimeout(() => {
            const incentive = document.createElement('div');
            incentive.className = 'fixed bottom-20 right-4 bg-red-500 text-white p-4 rounded-lg shadow-xl z-50 max-w-sm';
            incentive.innerHTML = `
                <div class="flex items-center justify-between">
                    <div>
                        <div class="font-bold">Don't leave empty-handed!</div>
                        <div class="text-sm">Complete your purchase and get 10% OFF</div>
                        <button onclick="this.parentElement.parentElement.parentElement.remove()" class="bg-white text-red-500 px-3 py-1 rounded mt-2 text-sm font-bold">
                            CLAIM DISCOUNT
                        </button>
                    </div>
                    <button onclick="this.parentElement.parentElement.remove()" class="text-white hover:text-gray-300">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
            `;
            
            document.body.appendChild(incentive);
        }, 3000);
    }
    
    // Progress-based incentive
    showProgressIncentive() {
        const notification = document.createElement('div');
        notification.className = 'fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-yellow-400 text-black p-4 rounded-lg shadow-xl z-50 text-center';
        notification.innerHTML = `
            <div class="font-bold text-lg">🎯 You're getting closer!</div>
            <div class="text-sm">25% of users who scroll this far make a purchase</div>
            <div class="mt-2">
                <div class="bg-yellow-600 h-2 rounded-full">
                    <div class="bg-green-500 h-2 rounded-full w-1/4"></div>
                </div>
            </div>
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.opacity = '0';
            setTimeout(() => notification.remove(), 500);
        }, 3000);
    }
    
    // Enhanced social proof
    amplifySocketialProof() {
        // Add dynamic testimonials
        const testimonials = [
            {name: "Ahmed K.", text: "Received my USDT-FLASH in 5 minutes!", rating: 5},
            {name: "Sarah M.", text: "Best service ever, highly recommended!", rating: 5},
            {name: "Omar R.", text: "Professional support and instant delivery", rating: 5}
        ];
        
        setInterval(() => {
            if (Math.random() < 0.3) {
                this.showFloatingTestimonial(testimonials[Math.floor(Math.random() * testimonials.length)]);
            }
        }, 25000);
    }
    
    // Show floating testimonial
    showFloatingTestimonial(testimonial) {
        const element = document.createElement('div');
        element.className = 'fixed bottom-4 right-4 bg-white border border-gray-200 rounded-lg shadow-lg p-3 max-w-xs z-50 transform translate-x-full transition-transform duration-500';
        element.innerHTML = `
            <div class="flex items-start">
                <div class="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                    ${testimonial.name.charAt(0)}
                </div>
                <div class="ml-3 flex-1">
                    <div class="font-semibold text-sm">${testimonial.name}</div>
                    <div class="text-xs text-gray-600 mb-1">${testimonial.text}</div>
                    <div class="text-yellow-500 text-xs">
                        ${'★'.repeat(testimonial.rating)}
                    </div>
                </div>
            </div>
            <button onclick="this.parentElement.remove()" class="absolute top-1 right-1 text-gray-400 hover:text-gray-600">
                <i class="fas fa-times text-xs"></i>
            </button>
        `;
        
        document.body.appendChild(element);
        
        // Animate in
        setTimeout(() => {
            element.style.transform = 'translateX(0)';
        }, 100);
        
        // Animate out
        setTimeout(() => {
            element.style.transform = 'translateX(120%)';
            setTimeout(() => element.remove(), 500);
        }, 6000);
    }
    
    // Utility functions
    formatLastVisit() {
        const diff = Date.now() - this.sessionData.lastVisit;
        const hours = Math.floor(diff / (1000 * 60 * 60));
        
        if (hours < 24) {
            return `${hours} hours ago`;
        } else {
            const days = Math.floor(hours / 24);
            return `${days} days ago`;
        }
    }
    
    trackHeatmapInteraction(element) {
        // Track element interactions for optimization
        const id = element.id || element.className;
        console.log(`Heatmap: Hover on ${id}`);
    }
    
    trackHeatmapClick(element) {
        const id = element.id || element.className;
        console.log(`Heatmap: Click on ${id}`);
    }
    
    // Enhanced button interactions
    addButtonMicroInteraction(btn) {
        btn.style.transform = 'translateY(-2px)';
        btn.style.boxShadow = '0 8px 25px rgba(0,0,0,0.2)';
        
        btn.addEventListener('mouseleave', () => {
            btn.style.transform = 'translateY(0)';
            btn.style.boxShadow = '0 4px 15px rgba(0,0,0,0.1)';
        }, {once: true});
    }
    
    // Price micro-interactions
    addPriceMicroInteraction(price) {
        price.addEventListener('mouseenter', () => {
            price.style.color = '#059669';
            price.style.transform = 'scale(1.1)';
        });
        
        price.addEventListener('mouseleave', () => {
            price.style.color = '';
            price.style.transform = 'scale(1)';
        });
    }
    
    // Save session data periodically
    saveSessionData() {
        localStorage.setItem('psychologySession', JSON.stringify(this.sessionData));
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new AdvancedPsychologyUX();
});

// Save data before page unload
window.addEventListener('beforeunload', () => {
    if (window.psychologyUX) {
        window.psychologyUX.saveSessionData();
    }
});
