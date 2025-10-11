/* ===== نظام التأثيرات الصوتية والبصرية المتقدمة للهيرو ===== */

class AudioVisualEffectsSystem {
    constructor() {
        this.audioContext = null;
        this.isAudioEnabled = false;
        this.visualEffects = [];
        this.soundEffects = {};
        
        this.init();
    }
    
    init() {
        document.addEventListener('DOMContentLoaded', () => {
            this.setupAudioContext();
            this.createSoundEffects();
            this.setupVisualEffects();
            this.bindInteractionEvents();
            
            console.log('🎵 Audio Visual Effects System Initialized');
        });
    }
    
    setupAudioContext() {
        try {
            // إنشاء AudioContext للتأثيرات الصوتية
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
            this.isAudioEnabled = true;
        } catch (error) {
            console.warn('Audio not supported:', error);
            this.isAudioEnabled = false;
        }
    }
    
    createSoundEffects() {
        if (!this.isAudioEnabled) return;
        
        // إنشاء أصوات اصطناعية للتفاعل
        this.soundEffects = {
            hover: this.createTone(800, 0.1, 'sine'),
            click: this.createTone(1200, 0.2, 'square'),
            success: this.createChord([523.25, 659.25, 783.99], 0.5), // C-E-G
            notification: this.createTone(440, 0.3, 'triangle'),
            ambient: this.createAmbientSound()
        };
    }
    
    createTone(frequency, duration, waveType = 'sine') {
        return () => {
            if (!this.audioContext) return;
            
            const oscillator = this.audioContext.createOscillator();
            const gainNode = this.audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(this.audioContext.destination);
            
            oscillator.frequency.setValueAtTime(frequency, this.audioContext.currentTime);
            oscillator.type = waveType;
            
            gainNode.gain.setValueAtTime(0, this.audioContext.currentTime);
            gainNode.gain.linearRampToValueAtTime(0.1, this.audioContext.currentTime + 0.01);
            gainNode.gain.exponentialRampToValueAtTime(0.001, this.audioContext.currentTime + duration);
            
            oscillator.start(this.audioContext.currentTime);
            oscillator.stop(this.audioContext.currentTime + duration);
        };
    }
    
    createChord(frequencies, duration) {
        return () => {
            if (!this.audioContext) return;
            
            frequencies.forEach((freq, index) => {
                setTimeout(() => {
                    this.createTone(freq, duration, 'sine')();
                }, index * 50);
            });
        };
    }
    
    createAmbientSound() {
        return () => {
            if (!this.audioContext) return;
            
            // إنشاء صوت محيطي هادئ
            const oscillator = this.audioContext.createOscillator();
            const gainNode = this.audioContext.createGain();
            const filter = this.audioContext.createBiquadFilter();
            
            oscillator.connect(filter);
            filter.connect(gainNode);
            gainNode.connect(this.audioContext.destination);
            
            oscillator.frequency.setValueAtTime(60, this.audioContext.currentTime);
            oscillator.type = 'sawtooth';
            
            filter.type = 'lowpass';
            filter.frequency.setValueAtTime(200, this.audioContext.currentTime);
            
            gainNode.gain.setValueAtTime(0.02, this.audioContext.currentTime);
            
            oscillator.start();
            
            // إيقاف الصوت بعد 30 ثانية
            setTimeout(() => {
                gainNode.gain.exponentialRampToValueAtTime(0.001, this.audioContext.currentTime + 2);
                oscillator.stop(this.audioContext.currentTime + 2);
            }, 30000);
        };
    }
    
    setupVisualEffects() {
        this.createParticleTrails();
        this.setupColorPulse();
        this.createEnergyWaves();
        this.setupGlitchEffects();
    }
    
    createParticleTrails() {
        const heroSection = document.getElementById('main-content');
        if (!heroSection) return;
        
        // إنشاء مسارات الجسيمات التفاعلية
        document.addEventListener('mousemove', (e) => {
            if (Math.random() < 0.1) { // 10% احتمال
                this.createTrailParticle(e.clientX, e.clientY);
            }
        });
    }
    
    createTrailParticle(x, y) {
        const particle = document.createElement('div');
        particle.className = 'trail-particle';
        
        const size = Math.random() * 4 + 2;
        const hue = Math.random() * 60 + 120; // ألوان خضراء-زرقاء
        const life = Math.random() * 2 + 1;
        
        particle.style.cssText = `
            position: fixed;
            left: ${x}px;
            top: ${y}px;
            width: ${size}px;
            height: ${size}px;
            background: radial-gradient(circle, hsl(${hue}, 70%, 60%) 0%, transparent 70%);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            animation: trailFade ${life}s ease-out forwards;
        `;
        
        document.body.appendChild(particle);
        
        // إزالة الجسيم بعد انتهاء الأنيميشن
        setTimeout(() => {
            particle.remove();
        }, life * 1000);
    }
    
    setupColorPulse() {
        const heroSection = document.getElementById('main-content');
        if (!heroSection) return;
        
        // تأثير نبضات الألوان المتزامنة
        setInterval(() => {
            const hue = Math.random() * 360;
            const saturation = 50 + Math.random() * 30;
            const lightness = 40 + Math.random() * 20;
            
            heroSection.style.filter = `hue-rotate(${hue}deg) saturate(${saturation}%) brightness(${lightness + 60}%)`;
            
            setTimeout(() => {
                heroSection.style.filter = '';
            }, 500);
        }, 10000); // كل 10 ثوان
    }
    
    createEnergyWaves() {
        const heroSection = document.getElementById('main-content');
        if (!heroSection) return;
        
        // إنشاء موجات الطاقة
        setInterval(() => {
            this.createEnergyWave();
        }, 5000);
    }
    
    createEnergyWave() {
        const heroSection = document.getElementById('main-content');
        if (!heroSection) return;
        
        const wave = document.createElement('div');
        wave.className = 'energy-wave';
        
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;
        
        wave.style.cssText = `
            position: fixed;
            left: ${centerX}px;
            top: ${centerY}px;
            width: 0;
            height: 0;
            border: 2px solid rgba(38, 161, 123, 0.6);
            border-radius: 50%;
            pointer-events: none;
            z-index: 5;
            animation: energyExpand 3s ease-out forwards;
        `;
        
        document.body.appendChild(wave);
        
        // إزالة الموجة بعد انتهاء الأنيميشن
        setTimeout(() => {
            wave.remove();
        }, 3000);
    }
    
    setupGlitchEffects() {
        const textElements = document.querySelectorAll('#main-content h1, #main-content h2');
        
        textElements.forEach(element => {
            // تأثير الخلل العشوائي
            setInterval(() => {
                if (Math.random() < 0.05) { // 5% احتمال
                    this.applyGlitchEffect(element);
                }
            }, 1000);
        });
    }
    
    applyGlitchEffect(element) {
        const originalText = element.textContent;
        const glitchChars = '!@#$%^&*()_+-=[]{}|;:,.<>?';
        
        // تطبيق تأثير الخلل
        let glitchedText = '';
        for (let i = 0; i < originalText.length; i++) {
            if (Math.random() < 0.1) {
                glitchedText += glitchChars[Math.floor(Math.random() * glitchChars.length)];
            } else {
                glitchedText += originalText[i];
            }
        }
        
        element.textContent = glitchedText;
        element.style.textShadow = '2px 0 #ff0000, -2px 0 #00ffff';
        
        // إعادة النص الأصلي بعد فترة قصيرة
        setTimeout(() => {
            element.textContent = originalText;
            element.style.textShadow = '';
        }, 100);
    }
    
    bindInteractionEvents() {
        // ربط الأصوات بالتفاعلات
        document.addEventListener('click', (e) => {
            if (e.target.matches('button, a, .interactive-3d')) {
                this.playSound('click');
                this.createClickBurst(e.clientX, e.clientY);
            }
        });
        
        document.addEventListener('mouseover', (e) => {
            if (e.target.matches('button, a, .hero-card-3d')) {
                this.playSound('hover');
                this.createHoverGlow(e.target);
            }
        });
        
        // تأثيرات التمرير
        window.addEventListener('scroll', () => {
            this.updateScrollEffects();
        });
        
        // تأثيرات لوحة المفاتيح
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                this.playSound('success');
            }
        });
    }
    
    playSound(soundName) {
        if (this.isAudioEnabled && this.soundEffects[soundName]) {
            try {
                this.soundEffects[soundName]();
            } catch (error) {
                console.warn('Could not play sound:', error);
            }
        }
    }
    
    createClickBurst(x, y) {
        // إنشاء انفجار من الجسيمات عند النقر
        for (let i = 0; i < 8; i++) {
            setTimeout(() => {
                const particle = document.createElement('div');
                particle.className = 'click-burst-particle';
                
                const angle = (i / 8) * Math.PI * 2;
                const velocity = 50 + Math.random() * 30;
                const size = Math.random() * 6 + 3;
                
                particle.style.cssText = `
                    position: fixed;
                    left: ${x}px;
                    top: ${y}px;
                    width: ${size}px;
                    height: ${size}px;
                    background: radial-gradient(circle, rgba(38, 161, 123, 0.8) 0%, transparent 70%);
                    border-radius: 50%;
                    pointer-events: none;
                    z-index: 9999;
                    animation: burstParticle 0.8s ease-out forwards;
                    --angle: ${angle}rad;
                    --velocity: ${velocity}px;
                `;
                
                document.body.appendChild(particle);
                
                setTimeout(() => {
                    particle.remove();
                }, 800);
            }, i * 20);
        }
    }
    
    createHoverGlow(element) {
        // إنشاء توهج عند التمرير
        const glow = document.createElement('div');
        glow.className = 'hover-glow-effect';
        
        const rect = element.getBoundingClientRect();
        
        glow.style.cssText = `
            position: fixed;
            left: ${rect.left - 10}px;
            top: ${rect.top - 10}px;
            width: ${rect.width + 20}px;
            height: ${rect.height + 20}px;
            background: radial-gradient(circle, rgba(38, 161, 123, 0.3) 0%, transparent 70%);
            border-radius: inherit;
            pointer-events: none;
            z-index: -1;
            animation: glowPulse 0.5s ease-out forwards;
        `;
        
        document.body.appendChild(glow);
        
        setTimeout(() => {
            glow.remove();
        }, 500);
    }
    
    updateScrollEffects() {
        const scrollY = window.scrollY;
        const heroSection = document.getElementById('main-content');
        if (!heroSection) return;
        
        // تأثيرات التمرير المتقدمة
        const scrollProgress = Math.min(scrollY / window.innerHeight, 1);
        
        // تغيير الألوان مع التمرير
        const hue = scrollProgress * 60; // من 0 إلى 60 درجة
        heroSection.style.filter = `hue-rotate(${hue}deg)`;
        
        // تأثير الزوم مع التمرير
        const scale = 1 + scrollProgress * 0.1;
        heroSection.style.transform = `scale(${scale})`;
    }
    
    enableAmbientMode() {
        // تشغيل الوضع المحيطي
        if (this.isAudioEnabled) {
            this.playSound('ambient');
        }
        
        // تأثيرات بصرية محيطية
        this.startAmbientVisuals();
    }
    
    startAmbientVisuals() {
        const heroSection = document.getElementById('main-content');
        if (!heroSection) return;
        
        // إنشاء جسيمات محيطية
        setInterval(() => {
            for (let i = 0; i < 3; i++) {
                setTimeout(() => {
                    this.createAmbientParticle();
                }, i * 200);
            }
        }, 2000);
    }
    
    createAmbientParticle() {
        const particle = document.createElement('div');
        particle.className = 'ambient-particle';
        
        const x = Math.random() * window.innerWidth;
        const y = window.innerHeight + 50;
        const size = Math.random() * 3 + 1;
        const duration = Math.random() * 10 + 5;
        
        particle.style.cssText = `
            position: fixed;
            left: ${x}px;
            top: ${y}px;
            width: ${size}px;
            height: ${size}px;
            background: radial-gradient(circle, rgba(38, 161, 123, 0.4) 0%, transparent 70%);
            border-radius: 50%;
            pointer-events: none;
            z-index: 2;
            animation: ambientFloat ${duration}s linear forwards;
        `;
        
        document.body.appendChild(particle);
        
        setTimeout(() => {
            particle.remove();
        }, duration * 1000);
    }
    
    destroy() {
        // تنظيف الموارد
        if (this.audioContext) {
            this.audioContext.close();
        }
        
        // إزالة العناصر المضافة
        document.querySelectorAll('.trail-particle, .energy-wave, .click-burst-particle, .hover-glow-effect, .ambient-particle').forEach(el => {
            el.remove();
        });
        
        console.log('🎵 Audio Visual Effects System Destroyed');
    }
}

// إضافة الأنماط المطلوبة
const audioVisualStyles = `
    @keyframes trailFade {
        0% {
            opacity: 1;
            transform: scale(1);
        }
        100% {
            opacity: 0;
            transform: scale(0.5);
        }
    }
    
    @keyframes energyExpand {
        0% {
            width: 0;
            height: 0;
            margin: 0;
            opacity: 0.8;
        }
        100% {
            width: 400px;
            height: 400px;
            margin: -200px 0 0 -200px;
            opacity: 0;
        }
    }
    
    @keyframes burstParticle {
        0% {
            opacity: 1;
            transform: translate(0, 0) scale(1);
        }
        100% {
            opacity: 0;
            transform: translate(
                calc(cos(var(--angle)) * var(--velocity)),
                calc(sin(var(--angle)) * var(--velocity))
            ) scale(0.5);
        }
    }
    
    @keyframes glowPulse {
        0% {
            opacity: 0;
            transform: scale(0.8);
        }
        50% {
            opacity: 1;
            transform: scale(1.1);
        }
        100% {
            opacity: 0;
            transform: scale(1);
        }
    }
    
    @keyframes ambientFloat {
        0% {
            opacity: 0;
            transform: translateY(0) rotate(0deg);
        }
        10% {
            opacity: 1;
        }
        90% {
            opacity: 1;
        }
        100% {
            opacity: 0;
            transform: translateY(-100vh) rotate(360deg);
        }
    }
`;

// إضافة الأنماط إلى الصفحة
const audioVisualStyleSheet = document.createElement('style');
audioVisualStyleSheet.textContent = audioVisualStyles;
document.head.appendChild(audioVisualStyleSheet);

// تهيئة النظام
const audioVisualSystem = new AudioVisualEffectsSystem();

// تصدير للاستخدام العام
window.AudioVisualEffectsSystem = AudioVisualEffectsSystem;
window.audioVisualSystem = audioVisualSystem;

// تشغيل الوضع المحيطي بعد 3 ثوان
setTimeout(() => {
    audioVisualSystem.enableAmbientMode();
}, 3000);

console.log('🎨🎵 Advanced Audio Visual Effects System Loaded!');