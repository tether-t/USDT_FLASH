// 🚀 Quantum Package Cards - Revolutionary Interactive System
document.addEventListener('DOMContentLoaded', function() {
    
    // Initialize Quantum Effects
    initQuantumEffects();
    
    // Quantum Mouse Tracking
    initQuantumMouseTracking();
    
    // Neural Network Connections
    initNeuralConnections();
    
    // Holographic Price Updates
    initHolographicPrices();
    
    console.log('🚀 Quantum Package System Activated');
});

// Initialize Quantum Effects
function initQuantumEffects() {
    const packageCards = document.querySelectorAll('.package-card');
    
    packageCards.forEach((card, index) => {
        // Add quantum particles
        createQuantumParticles(card);
        
        // Add energy field
        createEnergyField(card);
        
        // Add holographic overlay
        createHolographicOverlay(card);
        
        // Staggered animation delay
        card.style.animationDelay = `${index * 0.2}s`;
    });
}

// Create Quantum Particles
function createQuantumParticles(card) {
    const particleCount = 15;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'quantum-particle';
        particle.style.cssText = `
            position: absolute;
            width: 2px;
            height: 2px;
            background: radial-gradient(circle, #3b82f6, transparent);
            border-radius: 50%;
            pointer-events: none;
            opacity: 0;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: quantumFloat ${3 + Math.random() * 4}s ease-in-out infinite;
            animation-delay: ${Math.random() * 2}s;
        `;
        
        card.appendChild(particle);
    }
    
    // Show particles on hover
    card.addEventListener('mouseenter', () => {
        card.querySelectorAll('.quantum-particle').forEach(particle => {
            particle.style.opacity = '0.8';
        });
    });
    
    card.addEventListener('mouseleave', () => {
        card.querySelectorAll('.quantum-particle').forEach(particle => {
            particle.style.opacity = '0';
        });
    });
}

// Create Energy Field
function createEnergyField(card) {
    const energyField = document.createElement('div');
    energyField.className = 'energy-field';
    energyField.style.cssText = `
        position: absolute;
        top: -10px;
        left: -10px;
        right: -10px;
        bottom: -10px;
        border: 1px solid transparent;
        border-radius: inherit;
        background: linear-gradient(45deg, #3b82f6, #10b981, #ef4444, #3b82f6);
        background-size: 400% 400%;
        animation: energyFlow 4s ease-in-out infinite;
        opacity: 0;
        transition: opacity 0.3s ease;
        pointer-events: none;
        z-index: -1;
    `;
    
    card.appendChild(energyField);
    
    card.addEventListener('mouseenter', () => {
        energyField.style.opacity = '0.3';
    });
    
    card.addEventListener('mouseleave', () => {
        energyField.style.opacity = '0';
    });
}

// Create Holographic Overlay
function createHolographicOverlay(card) {
    const overlay = document.createElement('div');
    overlay.className = 'holographic-overlay';
    overlay.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: linear-gradient(45deg, 
            rgba(255, 0, 128, 0.1) 0%,
            rgba(0, 255, 255, 0.1) 25%,
            rgba(255, 255, 0, 0.1) 50%,
            rgba(128, 0, 255, 0.1) 75%,
            rgba(255, 0, 128, 0.1) 100%);
        background-size: 200% 200%;
        animation: holographicShift 6s ease-in-out infinite;
        opacity: 0;
        transition: opacity 0.5s ease;
        pointer-events: none;
        mix-blend-mode: overlay;
    `;
    
    card.appendChild(overlay);
    
    card.addEventListener('mouseenter', () => {
        overlay.style.opacity = '1';
    });
    
    card.addEventListener('mouseleave', () => {
        overlay.style.opacity = '0';
    });
}

// Quantum Mouse Tracking
function initQuantumMouseTracking() {
    const packageCards = document.querySelectorAll('.package-card');
    
    packageCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            card.style.transform = `
                perspective(1000px) 
                rotateX(${rotateX}deg) 
                rotateY(${rotateY}deg) 
                translateZ(20px)
                scale(1.02)
            `;
            
            // Create mouse trail effect
            createMouseTrail(x + rect.left, y + rect.top);
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px) scale(1)';
        });
    });
}

// Create Mouse Trail
function createMouseTrail(x, y) {
    const trail = document.createElement('div');
    trail.style.cssText = `
        position: fixed;
        left: ${x}px;
        top: ${y}px;
        width: 6px;
        height: 6px;
        background: radial-gradient(circle, #3b82f6, transparent);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        animation: trailFade 1s ease-out forwards;
    `;
    
    document.body.appendChild(trail);
    
    setTimeout(() => {
        trail.remove();
    }, 1000);
}

// Neural Network Connections
function initNeuralConnections() {
    const container = document.querySelector('.packages-container');
    const cards = container.querySelectorAll('.package-card');
    
    // Create connection lines between cards
    cards.forEach((card, index) => {
        if (index < cards.length - 1) {
            const connection = document.createElement('div');
            connection.className = 'neural-connection';
            connection.style.cssText = `
                position: absolute;
                top: 50%;
                left: 100%;
                width: 50px;
                height: 2px;
                background: linear-gradient(90deg, #3b82f6, transparent);
                opacity: 0;
                transition: opacity 0.5s ease;
                pointer-events: none;
                z-index: 1;
            `;
            
            card.style.position = 'relative';
            card.appendChild(connection);
        }
    });
    
    // Activate connections on container hover
    container.addEventListener('mouseenter', () => {
        container.querySelectorAll('.neural-connection').forEach(conn => {
            conn.style.opacity = '0.6';
            conn.style.animation = 'neuralPulse 2s ease-in-out infinite';
        });
    });
    
    container.addEventListener('mouseleave', () => {
        container.querySelectorAll('.neural-connection').forEach(conn => {
            conn.style.opacity = '0';
            conn.style.animation = 'none';
        });
    });
}

// Holographic Price Updates
function initHolographicPrices() {
    const priceElements = document.querySelectorAll('.price-morph');
    
    priceElements.forEach(price => {
        price.addEventListener('mouseenter', () => {
            // Create holographic price effect
            const originalText = price.textContent;
            let counter = 0;
            
            const interval = setInterval(() => {
                const randomPrice = '$' + (Math.random() * 1000).toFixed(2);
                price.textContent = randomPrice;
                counter++;
                
                if (counter > 10) {
                    clearInterval(interval);
                    price.textContent = originalText;
                }
            }, 50);
        });
    });
}

// Add CSS animations
const quantumStyles = `
    <style>
    @keyframes quantumFloat {
        0%, 100% { transform: translateY(0px) rotate(0deg); opacity: 0.8; }
        50% { transform: translateY(-20px) rotate(180deg); opacity: 0.3; }
    }
    
    @keyframes energyFlow {
        0%, 100% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
    }
    
    @keyframes holographicShift {
        0%, 100% { background-position: 0% 0%; }
        50% { background-position: 100% 100%; }
    }
    
    @keyframes trailFade {
        0% { opacity: 1; transform: scale(1); }
        100% { opacity: 0; transform: scale(0); }
    }
    
    @keyframes neuralPulse {
        0%, 100% { opacity: 0.6; }
        50% { opacity: 1; }
    }
    
    .packages-container {
        position: relative;
    }
    
    .package-card {
        transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    }
    </style>
`;

document.head.insertAdjacentHTML('beforeend', quantumStyles);
