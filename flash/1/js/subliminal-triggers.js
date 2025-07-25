// Subliminal Psychology Triggers
document.addEventListener('DOMContentLoaded', function() {
    
    // Subliminal Word Injection
    const subliminalWords = ['SUCCESS', 'WEALTH', 'PROFIT', 'WIN', 'RICH', 'MONEY', 'GOLD'];
    let wordIndex = 0;
    
    setInterval(() => {
        const word = subliminalWords[wordIndex % subliminalWords.length];
        const flash = document.createElement('div');
        flash.textContent = word;
        flash.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            color: rgba(16, 185, 129, 0.02);
            font-size: 1px;
            pointer-events: none;
            z-index: 9999;
        `;
        document.body.appendChild(flash);
        setTimeout(() => flash.remove(), 50);
        wordIndex++;
    }, 3000);
    
    // Subconscious Click Encouragement
    document.querySelectorAll('.package-card').forEach((card, index) => {
        card.addEventListener('mouseenter', () => {
            const encouragement = ['DO IT', 'YES', 'NOW', 'PERFECT'][index % 4];
            card.setAttribute('data-subliminal', encouragement);
        });
    });
    
    // Urgency Counter
    let urgencyLevel = 0;
    setInterval(() => {
        urgencyLevel++;
        if (urgencyLevel > 10) {
            document.querySelectorAll('.package-card').forEach(card => {
                card.style.animation = 'urgencyPulse 1s ease-in-out infinite';
            });
        }
    }, 5000);
    
    // Scarcity Timer
    const scarcityMessages = [
        '⚠️ Only 3 left today',
        '🔥 High demand detected',
        '⏰ Limited time offer',
        '💎 Exclusive opportunity'
    ];
    
    let messageIndex = 0;
    setInterval(() => {
        const message = scarcityMessages[messageIndex % scarcityMessages.length];
        const notification = document.createElement('div');
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: rgba(239, 68, 68, 0.9);
            color: white;
            padding: 8px 12px;
            border-radius: 5px;
            font-size: 12px;
            z-index: 9999;
            animation: slideIn 0.5s ease-out;
        `;
        document.body.appendChild(notification);
        setTimeout(() => notification.remove(), 3000);
        messageIndex++;
    }, 15000);
    
    console.log('🧠 Subliminal Psychology System Activated');
});

// Add CSS for animations
const subliminalStyles = `
<style>
@keyframes slideIn {
    from { transform: translateX(100%); opacity: 0; }
    to { transform: translateX(0); opacity: 1; }
}
</style>
`;
document.head.insertAdjacentHTML('beforeend', subliminalStyles);