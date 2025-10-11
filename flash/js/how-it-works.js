// Advanced Holographic Effects System
class HolographicSystem {
    constructor() {
        this.canvas = document.getElementById('hologramCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.connections = [];
        this.mousePos = { x: 0, y: 0 };
        
        this.init();
        this.createParticles();
        this.animate();
        this.bindEvents();
    }

    init() {
        this.resizeCanvas();
        window.addEventListener('resize', () => this.resizeCanvas());
        document.addEventListener('mousemove', (e) => {
            this.mousePos.x = e.clientX;
            this.mousePos.y = e.clientY;
        });
    }

    resizeCanvas() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    createParticles() {
        const particleCount = Math.min(150, Math.floor(window.innerWidth / 10));
        
        for (let i = 0; i < particleCount; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                size: Math.random() * 3 + 1,
                opacity: Math.random() * 0.8 + 0.2,
                hue: Math.random() * 60 + 180, // Cyan to blue range
                pulse: Math.random() * Math.PI * 2
            });
        }
    }

    updateParticles() {
        this.particles.forEach(particle => {
            // Update position
            particle.x += particle.vx;
            particle.y += particle.vy;

            // Boundary wrapping
            if (particle.x < 0) particle.x = this.canvas.width;
            if (particle.x > this.canvas.width) particle.x = 0;
            if (particle.y < 0) particle.y = this.canvas.height;
            if (particle.y > this.canvas.height) particle.y = 0;

            // Mouse interaction
            const dx = this.mousePos.x - particle.x;
            const dy = this.mousePos.y - particle.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 100) {
                const force = (100 - distance) / 100;
                particle.vx += (dx / distance) * force * 0.01;
                particle.vy += (dy / distance) * force * 0.01;
            }

            // Pulse effect
            particle.pulse += 0.02;
            particle.opacity = 0.3 + Math.sin(particle.pulse) * 0.3;

            // Velocity damping
            particle.vx *= 0.99;
            particle.vy *= 0.99;
        });
    }

    drawConnections() {
        this.ctx.strokeStyle = 'rgba(0, 255, 255, 0.1)';
        this.ctx.lineWidth = 1;

        for (let i = 0; i < this.particles.length; i++) {
            for (let j = i + 1; j < this.particles.length; j++) {
                const dx = this.particles[i].x - this.particles[j].x;
                const dy = this.particles[i].y - this.particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < 120) {
                    const opacity = (120 - distance) / 120 * 0.3;
                    this.ctx.strokeStyle = `rgba(0, 255, 255, ${opacity})`;
                    this.ctx.beginPath();
                    this.ctx.moveTo(this.particles[i].x, this.particles[i].y);
                    this.ctx.lineTo(this.particles[j].x, this.particles[j].y);
                    this.ctx.stroke();
                }
            }
        }
    }

    drawParticles() {
        this.particles.forEach(particle => {
            this.ctx.save();
            this.ctx.globalAlpha = particle.opacity;
            
            // Outer glow
            this.ctx.shadowColor = `hsl(${particle.hue}, 100%, 50%)`;
            this.ctx.shadowBlur = 10;
            
            // Particle core
            this.ctx.fillStyle = `hsl(${particle.hue}, 100%, 70%)`;
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            this.ctx.fill();
            
            this.ctx.restore();
        });
    }

    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.updateParticles();
        this.drawConnections();
        this.drawParticles();
        
        requestAnimationFrame(() => this.animate());
    }

    bindEvents() {
        // Add quantum effects on scroll
        window.addEventListener('scroll', () => {
            const scrollPercent = window.scrollY / (document.body.scrollHeight - window.innerHeight);
            this.particles.forEach(particle => {
                particle.hue = 180 + scrollPercent * 60; // Shift from cyan to magenta
            });
        });
    }
}

// Quantum Step Animation System
class QuantumStepAnimator {
    constructor() {
        this.steps = document.querySelectorAll('.step-hologram');
        this.observerOptions = {
            threshold: 0.3,
            rootMargin: '0px 0px -100px 0px'
        };
        
        this.init();
    }

    init() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.activateStep(entry.target);
                }
            });
        }, this.observerOptions);

        this.steps.forEach(step => observer.observe(step));
    }

    activateStep(step) {
        step.style.animation = 'quantumActivate 0.8s ease-out forwards';
        
        // Add energy burst effect
        const energyBurst = document.createElement('div');
        energyBurst.className = 'energy-burst';
        energyBurst.style.cssText = `
            position: absolute;
            top: 50%;
            left: 50%;
            width: 100px;
            height: 100px;
            border: 2px solid #00ffff;
            border-radius: 50%;
            transform: translate(-50%, -50%) scale(0);
            animation: energyBurstAnim 1s ease-out forwards;
            pointer-events: none;
        `;
        
        step.appendChild(energyBurst);
        
        setTimeout(() => energyBurst.remove(), 1000);
    }
}

// Holographic Text Effects
class HolographicTextEffects {
    constructor() {
        this.textElements = document.querySelectorAll('.quantum-heading, .holographic-title h1');
        this.init();
    }

    init() {
        this.textElements.forEach(element => {
            element.addEventListener('mouseenter', () => this.glitchEffect(element));
        });
    }

    glitchEffect(element) {
        const originalText = element.textContent;
        const glitchChars = '!@#$%^&*()_+-=[]{}|;:,.<>?';
        let iterations = 0;
        
        const glitchInterval = setInterval(() => {
            element.textContent = originalText
                .split('')
                .map((char, index) => {
                    if (index < iterations) return originalText[index];
                    return glitchChars[Math.floor(Math.random() * glitchChars.length)];
                })
                .join('');
            
            iterations += 1/3;
            
            if (iterations >= originalText.length) {
                clearInterval(glitchInterval);
                element.textContent = originalText;
            }
        }, 30);
    }
}

// Quantum Button Effects
class QuantumButtonEffects {
    constructor() {
        this.buttons = document.querySelectorAll('.quantum-button');
        this.init();
    }

    init() {
        this.buttons.forEach(button => {
            button.addEventListener('click', (e) => this.quantumRipple(e));
            button.addEventListener('mouseenter', () => this.energyCharge(button));
        });
    }

    quantumRipple(e) {
        const button = e.currentTarget;
        const rect = button.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const ripple = document.createElement('div');
        ripple.style.cssText = `
            position: absolute;
            top: ${y}px;
            left: ${x}px;
            width: 0;
            height: 0;
            border-radius: 50%;
            background: radial-gradient(circle, rgba(255,255,255,0.8) 0%, transparent 70%);
            transform: translate(-50%, -50%);
            animation: quantumRippleAnim 0.6s ease-out forwards;
            pointer-events: none;
        `;
        
        button.appendChild(ripple);
        setTimeout(() => ripple.remove(), 600);
    }

    energyCharge(button) {
        button.style.animation = 'energyCharge 0.3s ease-out forwards';
        setTimeout(() => {
            button.style.animation = '';
        }, 300);
    }
}

// Parallax Scroll Effects
class QuantumParallax {
    constructor() {
        this.elements = document.querySelectorAll('.quantum-card, .step-hologram');
        this.init();
    }

    init() {
        window.addEventListener('scroll', () => this.updateParallax());
    }

    updateParallax() {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        this.elements.forEach((element, index) => {
            const speed = (index + 1) * 0.1;
            element.style.transform = `translateY(${rate * speed}px)`;
        });
    }
}

// Add dynamic CSS animations
const dynamicStyles = document.createElement('style');
dynamicStyles.textContent = `
    @keyframes quantumActivate {
        0% { transform: translateY(50px) scale(0.8); opacity: 0; }
        50% { transform: translateY(-10px) scale(1.05); }
        100% { transform: translateY(0) scale(1); opacity: 1; }
    }
    
    @keyframes energyBurstAnim {
        0% { transform: translate(-50%, -50%) scale(0); opacity: 1; }
        100% { transform: translate(-50%, -50%) scale(3); opacity: 0; }
    }
    
    @keyframes quantumRippleAnim {
        0% { width: 0; height: 0; opacity: 1; }
        100% { width: 300px; height: 300px; opacity: 0; }
    }
    
    @keyframes energyCharge {
        0% { box-shadow: 0 0 20px rgba(0, 255, 255, 0.5); }
        100% { box-shadow: 0 0 40px rgba(0, 255, 255, 1), inset 0 0 20px rgba(255, 255, 255, 0.2); }
    }
`;
document.head.appendChild(dynamicStyles);

// Initialize all systems when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new HolographicSystem();
    new QuantumStepAnimator();
    new HolographicTextEffects();
    new QuantumButtonEffects();
    new QuantumParallax();
    
    // Add loading completion effect
    setTimeout(() => {
        document.body.style.opacity = '1';
        document.body.style.transform = 'translateY(0)';
    }, 100);
});

// Set initial loading state
document.body.style.cssText += `
    opacity: 0;
    transform: translateY(20px);
    transition: all 0.8s ease-out;
`;