/* ===== تفاعلات الهيرو الاحترافية ===== */

class EnterpriseHeroSystem {
    constructor() {
        this.counters = [];
        this.init();
    }
    
    init() {
        document.addEventListener('DOMContentLoaded', () => {
            this.initCounters();
            this.initInteractions();
            this.startLiveUpdates();
            console.log('🏢 Enterprise Hero System Loaded');
        });
    }
    
    initCounters() {
        const counters = document.querySelectorAll('.counter');
        
        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-target'));
            const duration = 2000; // 2 seconds
            const increment = target / (duration / 16); // 60fps
            let current = 0;
            
            const updateCounter = () => {
                if (current < target) {
                    current += increment;
                    if (current > target) current = target;
                    
                    // Format numbers
                    if (target >= 1000000) {
                        counter.textContent = (current / 1000000).toFixed(1) + 'M';
                    } else if (target >= 1000) {
                        counter.textContent = (current / 1000).toFixed(0) + 'K';
                    } else {
                        counter.textContent = Math.floor(current).toLocaleString();
                    }
                    
                    requestAnimationFrame(updateCounter);
                }
            };
            
            // Start counter when visible
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        updateCounter();
                        observer.unobserve(entry.target);
                    }
                });
            });
            
            observer.observe(counter);
        });
    }
    
    initInteractions() {
        // Stat cards hover effects
        const statCards = document.querySelectorAll('.stat-card');
        statCards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                this.createHoverEffect(card);
            });
        });
        
        // Platform items interactions
        const platformItems = document.querySelectorAll('.platform-item');
        platformItems.forEach(item => {
            item.addEventListener('click', () => {
                this.showPlatformInfo(item);
            });
        });
        
        // CTA button enhancements
        const ctaButtons = document.querySelectorAll('.cta-primary, .cta-secondary');
        ctaButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                this.createClickEffect(e);
            });
        });
    }
    
    createHoverEffect(element) {
        const rect = element.getBoundingClientRect();
        const effect = document.createElement('div');
        
        effect.style.cssText = `
            position: fixed;
            left: ${rect.left - 5}px;
            top: ${rect.top - 5}px;
            width: ${rect.width + 10}px;
            height: ${rect.height + 10}px;
            background: radial-gradient(circle, rgba(16, 185, 129, 0.2) 0%, transparent 70%);
            border-radius: 20px;
            pointer-events: none;
            z-index: -1;
            animation: hoverGlow 0.3s ease-out forwards;
        `;
        
        document.body.appendChild(effect);
        
        setTimeout(() => {
            effect.remove();
        }, 300);
    }
    
    showPlatformInfo(item) {
        const platformName = item.querySelector('.platform-name').textContent;
        
        // Create info tooltip
        const tooltip = document.createElement('div');
        tooltip.className = 'platform-tooltip';
        tooltip.innerHTML = `
            <div class="tooltip-content">
                <h4>${platformName}</h4>
                <p>Supported Platform</p>
                <div class="tooltip-status">
                    <div class="status-dot"></div>
                    <span>Active</span>
                </div>
            </div>
        `;
        
        tooltip.style.cssText = `
            position: fixed;
            background: rgba(0, 0, 0, 0.9);
            color: white;
            padding: 1rem;
            border-radius: 12px;
            font-size: 0.875rem;
            z-index: 1000;
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.1);
            animation: tooltipFadeIn 0.2s ease-out;
        `;
        
        const rect = item.getBoundingClientRect();
        tooltip.style.left = (rect.left + rect.width / 2 - 75) + 'px';
        tooltip.style.top = (rect.top - 80) + 'px';
        
        document.body.appendChild(tooltip);
        
        setTimeout(() => {
            tooltip.remove();
        }, 2000);
    }
    
    createClickEffect(e) {
        const ripple = document.createElement('div');
        const rect = e.target.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        
        ripple.style.cssText = `
            position: absolute;
            left: ${e.clientX - rect.left - size / 2}px;
            top: ${e.clientY - rect.top - size / 2}px;
            width: ${size}px;
            height: ${size}px;
            background: radial-gradient(circle, rgba(255, 255, 255, 0.3) 0%, transparent 70%);
            border-radius: 50%;
            pointer-events: none;
            animation: rippleEffect 0.6s ease-out;
        `;
        
        e.target.style.position = 'relative';
        e.target.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    }
    
    startLiveUpdates() {
        // Update live statistics periodically
        setInterval(() => {
            this.updateLiveStats();
        }, 5000);
        
        // Animate price chart
        this.animatePriceChart();
    }
    
    updateLiveStats() {
        const volumeCounter = document.querySelector('[data-target="2100000"]');
        const usersCounter = document.querySelector('[data-target="47523"]');
        
        if (volumeCounter) {
            const currentVolume = parseFloat(volumeCounter.textContent.replace('M', '')) * 1000000;
            const newVolume = currentVolume + Math.random() * 50000;
            volumeCounter.textContent = (newVolume / 1000000).toFixed(1) + 'M';
        }
        
        if (usersCounter) {
            const currentUsers = parseInt(usersCounter.textContent.replace('K', '')) * 1000;
            const newUsers = currentUsers + Math.floor(Math.random() * 10);
            usersCounter.textContent = (newUsers / 1000).toFixed(0) + 'K';
        }
    }
    
    animatePriceChart() {
        const chart = document.querySelector('.price-chart');
        if (!chart) return;
        
        // Create animated price line
        const priceLine = document.createElement('div');
        priceLine.style.cssText = `
            position: absolute;
            bottom: 20px;
            left: 0;
            right: 0;
            height: 2px;
            background: linear-gradient(90deg, 
                transparent 0%, 
                #10b981 20%, 
                #3b82f6 50%, 
                #8b5cf6 80%, 
                transparent 100%);
            animation: chartPulse 3s ease-in-out infinite;
        `;
        
        chart.appendChild(priceLine);
        
        // Add price points
        for (let i = 0; i < 5; i++) {
            setTimeout(() => {
                this.addPricePoint(chart);
            }, i * 600);
        }
    }
    
    addPricePoint(chart) {
        const point = document.createElement('div');
        const x = Math.random() * 80 + 10; // 10% to 90%
        const y = Math.random() * 60 + 20; // 20% to 80%
        
        point.style.cssText = `
            position: absolute;
            left: ${x}%;
            top: ${y}%;
            width: 6px;
            height: 6px;
            background: #10b981;
            border-radius: 50%;
            animation: pointPulse 2s ease-in-out infinite;
            box-shadow: 0 0 10px rgba(16, 185, 129, 0.5);
        `;
        
        chart.appendChild(point);
        
        setTimeout(() => {
            point.remove();
        }, 4000);
    }
}

// Additional CSS animations
const enterpriseStyles = `
    @keyframes hoverGlow {
        0% { opacity: 0; transform: scale(0.95); }
        100% { opacity: 1; transform: scale(1); }
    }
    
    @keyframes tooltipFadeIn {
        0% { opacity: 0; transform: translateY(10px); }
        100% { opacity: 1; transform: translateY(0); }
    }
    
    @keyframes rippleEffect {
        0% { opacity: 0.6; transform: scale(0); }
        100% { opacity: 0; transform: scale(2); }
    }
    
    @keyframes chartPulse {
        0%, 100% { opacity: 0.6; transform: scaleY(1); }
        50% { opacity: 1; transform: scaleY(1.2); }
    }
    
    @keyframes pointPulse {
        0%, 100% { opacity: 0.8; transform: scale(1); }
        50% { opacity: 1; transform: scale(1.5); }
    }
    
    .platform-tooltip .tooltip-content h4 {
        margin: 0 0 0.25rem 0;
        font-weight: 700;
        color: #10b981;
    }
    
    .platform-tooltip .tooltip-content p {
        margin: 0 0 0.5rem 0;
        opacity: 0.8;
        font-size: 0.75rem;
    }
    
    .tooltip-status {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        font-size: 0.75rem;
    }
    
    .status-dot {
        width: 6px;
        height: 6px;
        background: #10b981;
        border-radius: 50%;
        animation: pulse 2s infinite;
    }
`;

// Add styles to page
const styleSheet = document.createElement('style');
styleSheet.textContent = enterpriseStyles;
document.head.appendChild(styleSheet);

// Initialize system
const enterpriseHero = new EnterpriseHeroSystem();

// Export for global use
window.EnterpriseHeroSystem = EnterpriseHeroSystem;
window.enterpriseHero = enterpriseHero;

console.log('🚀 Enterprise Hero Interactions Loaded!');