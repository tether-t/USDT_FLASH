// Advanced Psychological Triggers for USDT FLASH Trial
class PsychologicalTriggers {
    constructor() {
        this.init();
    }

    init() {
        this.startUrgencyTimer();
        this.showScarcityAlerts();
        this.displaySocialProof();
        this.addExitIntentPopup();
        this.trackUserBehavior();
    }

    // Urgency Timer
    startUrgencyTimer() {
        const timerElement = document.getElementById('urgency-timer');
        if (!timerElement) return;

        let timeLeft = 23 * 3600 + 47 * 60 + 12; // 23:47:12

        setInterval(() => {
            const hours = Math.floor(timeLeft / 3600);
            const minutes = Math.floor((timeLeft % 3600) / 60);
            const seconds = timeLeft % 60;

            timerElement.innerHTML = `
                <span class="text-red-600 font-bold animate-pulse">
                    ⏰ Offer expires in ${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}
                </span>
            `;

            timeLeft--;
            if (timeLeft < 0) timeLeft = 23 * 3600 + 47 * 60 + 12;
        }, 1000);
    }

    // Scarcity Alerts
    showScarcityAlerts() {
        const spots = Math.floor(Math.random() * 20) + 30; // 30-50 spots
        
        setInterval(() => {
            this.showNotification(`🚨 Only ${spots} spots remaining today!`, 'warning');
        }, 45000);

        setInterval(() => {
            const viewers = Math.floor(Math.random() * 500) + 2000;
            this.showNotification(`👥 ${viewers} people viewing this offer now`, 'info');
        }, 60000);
    }

    // Social Proof
    displaySocialProof() {
        const testimonials = [
            "Ahmed M. just earned $1,247 in 2 hours! 🎉",
            "Sarah K. withdrew $3,890 successfully! ✅",
            "Mohamed A. joined and made $567 instantly! 💰",
            "Fatima H. recommends this to everyone! ⭐",
            "Omar S. says: 'Best investment ever!' 🚀"
        ];

        setInterval(() => {
            const randomTestimonial = testimonials[Math.floor(Math.random() * testimonials.length)];
            this.showNotification(randomTestimonial, 'success');
        }, 30000);
    }

    // Exit Intent Popup
    addExitIntentPopup() {
        let exitShown = false;
        
        document.addEventListener('mouseleave', (e) => {
            if (e.clientY <= 0 && !exitShown) {
                exitShown = true;
                this.showExitPopup();
            }
        });
    }

    showExitPopup() {
        const popup = document.createElement('div');
        popup.className = 'fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center';
        popup.innerHTML = `
            <div class="bg-white rounded-2xl p-8 max-w-md mx-4 text-center animate-bounce">
                <h3 class="text-2xl font-bold text-red-600 mb-4">🚨 WAIT! Don't Miss Out!</h3>
                <p class="text-gray-700 mb-4">You're about to miss the <strong>87% discount</strong>!</p>
                <p class="text-lg font-bold text-green-600 mb-6">🎁 SPECIAL: Get it for just $29 (instead of $39)</p>
                <div class="flex gap-3">
                    <button onclick="this.parentElement.parentElement.parentElement.remove()" 
                            class="flex-1 bg-red-600 text-white py-3 px-6 rounded-lg font-bold hover:bg-red-700">
                        🔥 CLAIM $29 OFFER
                    </button>
                    <button onclick="this.parentElement.parentElement.parentElement.remove()" 
                            class="flex-1 bg-gray-300 text-gray-700 py-3 px-6 rounded-lg">
                        No Thanks
                    </button>
                </div>
            </div>
        `;
        document.body.appendChild(popup);
    }

    // Notification System
    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        const colors = {
            success: 'bg-green-500',
            warning: 'bg-orange-500',
            info: 'bg-blue-500'
        };

        notification.className = `fixed top-4 right-4 ${colors[type]} text-white px-6 py-3 rounded-lg shadow-lg z-40 animate-slide-in`;
        notification.innerHTML = message;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.remove();
        }, 5000);
    }

    // User Behavior Tracking
    trackUserBehavior() {
        let scrollDepth = 0;
        let timeOnPage = 0;
        
        // Track scroll depth
        window.addEventListener('scroll', () => {
            const currentScroll = Math.round((window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100);
            if (currentScroll > scrollDepth) {
                scrollDepth = currentScroll;
                
                // Show urgency at 50% scroll
                if (scrollDepth >= 50 && !localStorage.getItem('urgency_shown')) {
                    localStorage.setItem('urgency_shown', 'true');
                    this.showNotification('⚡ Limited time: Price increases in 24 hours!', 'warning');
                }
            }
        });

        // Track time on page
        setInterval(() => {
            timeOnPage++;
            
            // Show FOMO after 2 minutes
            if (timeOnPage === 120) {
                this.showNotification('💸 Don\'t wait too long - spots are filling fast!', 'warning');
            }
            
            // Show final push after 5 minutes
            if (timeOnPage === 300) {
                this.showNotification('🚨 FINAL WARNING: Only few hours left at this price!', 'warning');
            }
        }, 1000);
    }
}

// Auto-initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new PsychologicalTriggers();
});

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slide-in {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    .animate-slide-in { animation: slide-in 0.3s ease-out; }
    
    .animate-pulse {
        animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
    }
    
    @keyframes pulse {
        0%, 100% { opacity: 1; }
        50% { opacity: .5; }
    }
`;
document.head.appendChild(style);