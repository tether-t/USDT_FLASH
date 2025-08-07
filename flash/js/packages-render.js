// Dynamic Package Rendering Functions
function renderPackageCard(packageType, packageData) {
    const pkg = packageData[packageType];
    
    // Holographic Popular Badge
    const popularBadge = pkg.mostPopular ? `
        <div class="absolute -top-4 left-1/2 transform -translate-x-1/2 z-30">
            <div class="holographic-badge relative">
                <div class="badge-glow absolute inset-0 bg-gradient-to-r from-red-500 to-orange-500 rounded-full blur-md opacity-60 animate-pulse"></div>
                <div class="relative z-10 bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 text-white px-6 py-2 rounded-full font-bold text-xs shadow-2xl border border-white/20 backdrop-blur-sm">
                    <span class="flex items-center">
                        <div class="w-2 h-2 bg-white rounded-full mr-2 animate-ping"></div>
                        ${pkg.badge}
                        <div class="w-2 h-2 bg-white rounded-full ml-2 animate-ping"></div>
                    </span>
                </div>
            </div>
        </div>
    ` : '';
    
    // Quantum Price Display
    const priceDisplay = pkg.originalPrice ? `
        <div class="text-sm line-through text-red-400 opacity-60 mb-1">${pkg.originalPrice}</div>
        <div class="text-3xl font-bold bg-gradient-to-r from-${pkg.color.primary} to-${pkg.color.secondary || pkg.color.primary} bg-clip-text text-transparent">
            ${pkg.price}
        </div>
    ` : `
        <div class="text-3xl font-bold bg-gradient-to-r from-${pkg.color.primary} to-${pkg.color.secondary || pkg.color.primary} bg-clip-text text-transparent">
            ${pkg.price}
        </div>
    `;
    
    // Futuristic Features List
    const featuresGrid = `
        <div class="neural-features-grid space-y-2">
            ${pkg.features.slice(0, 3).map((feature, index) => `
                <div class="feature-node relative p-3 bg-gradient-to-r from-${pkg.color.primary}/5 to-transparent border-l-2 border-${pkg.color.primary}/30 hover:border-${pkg.color.primary} transition-all duration-300">
                    <div class="feature-indicator absolute left-0 top-1/2 w-1 h-4 bg-${pkg.color.primary} transform -translate-y-1/2 animate-pulse"></div>
                    <span class="text-sm font-medium ml-4 text-gray-700">${feature}</span>
                </div>
            `).join('')}
        </div>
    `;
    
    // Package Details
    const packageDetails = `
        <div class="p-4 bg-gray-50 text-sm">
            <div class="mb-2"><strong>What's Included:</strong></div>
            ${pkg.features.map(feature => `<div>• ${feature}</div>`).join('')}
        </div>
    `;
    
    // Quantum Bonus Section
    const bonusSection = pkg.bonus ? `
        <div class="quantum-bonus mt-4 relative p-3 bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-500/30 rounded-lg backdrop-blur-sm cursor-pointer hover:border-yellow-500/60 transition-all" onclick="toggleBonus(this)">
            <div class="bonus-glow absolute inset-0 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-lg opacity-0 hover:opacity-100 transition-opacity"></div>
            <div class="relative z-10 text-center">
                <div class="font-bold text-orange-700 mb-1 flex items-center justify-center">
                    <div class="w-2 h-2 bg-yellow-500 rounded-full mr-2 animate-pulse"></div>
                    ${pkg.bonus.title}
                    <i class="fas fa-chevron-down ml-2 transition-transform"></i>
                </div>
                <div class="bonus-details hidden">
                    ${pkg.bonus.items.map(item => `<div class="text-xs text-orange-600 flex items-center justify-center mt-1"><div class="w-1 h-1 bg-orange-500 rounded-full mr-2"></div>${item}</div>`).join('')}
                </div>
            </div>
        </div>
    ` : '';
    
    return `
        <div class="futuristic-package-card relative overflow-hidden group" data-package="${packageType}">
            <!-- Holographic Background -->
            <div class="holographic-bg absolute inset-0 opacity-30"></div>
            <div class="neural-network absolute inset-0 opacity-20"></div>
            <div class="quantum-particles absolute inset-0"></div>
            <div class="energy-field absolute inset-0"></div>
            <div class="cyber-grid absolute inset-0 opacity-10"></div>
            
            <!-- Floating Badge -->
            ${popularBadge}
            
            <!-- Hologram Header -->
            <div class="hologram-header relative z-20 p-6 text-center">
                <!-- Site Logo Watermark -->
                <div class="absolute top-2 right-2 opacity-20">
                    <img src="img/usdt_cryptocurrencies_icon_188337.png" alt="USDT-FLASH" class="w-8 h-8 animate-pulse">
                </div>
                
                <div class="package-hologram relative mb-4">
                    <!-- Quantum Rings -->
                    <div class="hologram-ring absolute -inset-4 rounded-full border-2 border-${pkg.color.primary} opacity-30 animate-spin" style="animation-duration: 8s;"></div>
                    <div class="hologram-ring absolute -inset-2 rounded-full border border-${pkg.color.primary} opacity-40 animate-spin" style="animation-duration: 6s; animation-direction: reverse;"></div>
                    <div class="hologram-ring absolute inset-0 rounded-full border-2 border-${pkg.color.primary} opacity-60 animate-pulse"></div>
                    
                    <!-- Futuristic Icon Container -->
                    <div class="hologram-core relative z-10 w-20 h-20 mx-auto bg-gradient-to-br from-${pkg.color.primary} via-white to-${pkg.color.secondary || pkg.color.primary} rounded-full flex items-center justify-center shadow-2xl border-4 border-white/30">
                        <!-- Inner Glow -->
                        <div class="absolute inset-2 bg-gradient-to-br from-${pkg.color.primary}/20 to-transparent rounded-full animate-pulse"></div>
                        
                        <!-- 3D Icon Effect -->
                        <div class="relative z-10 transform hover:scale-110 transition-transform duration-300">
                            <div class="absolute inset-0 bg-white/20 rounded-full blur-sm"></div>
                            <i class="${pkg.icon} text-white text-3xl drop-shadow-lg relative z-10" style="text-shadow: 0 0 20px rgba(255,255,255,0.8), 0 0 40px ${pkg.color.primary === 'blue' ? '#3b82f6' : pkg.color.primary === 'green' ? '#10b981' : '#8b5cf6'};"></i>
                        </div>
                        
                        <!-- Particle Effects -->
                        <div class="absolute inset-0 rounded-full">
                            <div class="absolute top-1 left-3 w-1 h-1 bg-white rounded-full animate-ping" style="animation-delay: 0s;"></div>
                            <div class="absolute top-3 right-2 w-1 h-1 bg-white rounded-full animate-ping" style="animation-delay: 0.5s;"></div>
                            <div class="absolute bottom-2 left-2 w-1 h-1 bg-white rounded-full animate-ping" style="animation-delay: 1s;"></div>
                            <div class="absolute bottom-1 right-3 w-1 h-1 bg-white rounded-full animate-ping" style="animation-delay: 1.5s;"></div>
                        </div>
                    </div>
                    
                    <!-- Multi-layer Glow Effects -->
                    <div class="hologram-glow absolute inset-0 bg-${pkg.color.primary} rounded-full opacity-30 blur-2xl animate-pulse"></div>
                    <div class="hologram-glow absolute inset-2 bg-white rounded-full opacity-10 blur-xl animate-pulse" style="animation-delay: 0.5s;"></div>
                </div>
                
                <div class="package-title relative">
                    <!-- Holographic Title -->
                    <div class="relative">
                        <h3 class="text-2xl font-bold bg-gradient-to-r from-${pkg.color.primary} via-white to-${pkg.color.secondary || pkg.color.primary} bg-clip-text text-transparent mb-2 relative z-10">${pkg.name}</h3>
                        <div class="absolute inset-0 text-2xl font-bold text-${pkg.color.primary} opacity-20 blur-sm">${pkg.name}</div>
                    </div>
                    
                    <!-- Advanced Cyber Line -->
                    <div class="relative mb-4">
                        <div class="cyber-line h-px bg-gradient-to-r from-transparent via-${pkg.color.primary} to-transparent"></div>
                        <div class="absolute left-1/2 top-0 w-2 h-2 bg-${pkg.color.primary} rounded-full transform -translate-x-1/2 -translate-y-1/2 animate-pulse"></div>
                        <div class="absolute left-1/4 top-0 w-1 h-1 bg-${pkg.color.primary} rounded-full transform -translate-x-1/2 -translate-y-1/2 animate-ping" style="animation-delay: 0.5s;"></div>
                        <div class="absolute right-1/4 top-0 w-1 h-1 bg-${pkg.color.primary} rounded-full transform translate-x-1/2 -translate-y-1/2 animate-ping" style="animation-delay: 1s;"></div>
                    </div>
                </div>
            </div>
            
            <!-- Quantum Price Display -->
            <div class="quantum-price-display relative z-20 text-center mb-6">
                <div class="price-hologram relative inline-block">
                    <div class="price-glow absolute inset-0 bg-${pkg.color.primary} opacity-20 blur-lg rounded-full"></div>
                    <div class="relative z-10 px-6 py-3 bg-black/20 backdrop-blur-sm border border-${pkg.color.primary}/30 rounded-full">
                        ${priceDisplay}
                        <div class="text-xs text-${pkg.color.primary} mt-1 font-medium">⚡ ${pkg.delivery}</div>
                    </div>
                </div>
            </div>
            
            <!-- Neural Features Grid -->
            <div class="neural-features relative z-20 px-6 mb-6">
                <div class="features-matrix space-y-3">
                    ${pkg.features.slice(0, 3).map((feature, index) => `
                        <div class="feature-node relative p-3 bg-black/10 backdrop-blur-sm border border-${pkg.color.primary}/20 rounded-lg hover:border-${pkg.color.primary}/50 transition-all duration-300 group">
                            <div class="feature-pulse absolute left-2 top-1/2 w-2 h-2 bg-${pkg.color.primary} rounded-full animate-pulse"></div>
                            <div class="feature-line absolute left-4 top-1/2 w-4 h-px bg-gradient-to-r from-${pkg.color.primary} to-transparent"></div>
                            <span class="text-sm font-medium ml-8 text-gray-700 group-hover:text-${pkg.color.primary} transition-colors">${feature}</span>
                        </div>
                    `).join('')}
                </div>
            </div>
            
            <!-- Quantum Action Button -->
            <div class="quantum-action relative z-20 px-6 pb-6">
                <button class="quantum-btn w-full relative overflow-hidden bg-gradient-to-r ${pkg.button.class} text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl group" onclick="testButtonClick('${packageType}')">
                    <div class="quantum-ripple absolute inset-0 bg-white/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <div class="quantum-particles-btn absolute inset-0 opacity-0 group-hover:opacity-100"></div>
                    <span class="relative z-10 flex items-center justify-center">
                        <i class="${pkg.icon} mr-2 animate-pulse"></i>
                        ${pkg.button.text}
                        <div class="ml-2 w-2 h-2 bg-white rounded-full animate-ping"></div>
                    </span>
                </button>
            </div>
            
            <!-- Cyber Border -->
            <div class="cyber-border absolute inset-0 rounded-xl border-2 border-transparent bg-gradient-to-r from-${pkg.color.primary}/20 via-transparent to-${pkg.color.primary}/20 p-px">
                <div class="w-full h-full bg-white/80 backdrop-blur-sm rounded-xl"></div>
            </div>
        </div>
        
        <style>
        .futuristic-package-card {
            background: linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.7) 100%);
            backdrop-filter: blur(20px);
            border-radius: 16px;
            box-shadow: 0 25px 50px rgba(0,0,0,0.1), 0 0 0 1px rgba(255,255,255,0.2);
            transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .futuristic-package-card:hover {
            transform: translateY(-10px) rotateX(5deg);
            box-shadow: 0 35px 70px rgba(0,0,0,0.15), 0 0 0 1px rgba(255,255,255,0.3);
        }
        
        .holographic-bg {
            background: linear-gradient(45deg, #ff006e, #8338ec, #3a86ff, #06ffa5, #ffbe0b);
            background-size: 400% 400%;
            animation: holographicShift 8s ease-in-out infinite;
        }
        
        .neural-network {
            background-image: radial-gradient(circle at 25% 25%, rgba(59, 130, 246, 0.1) 0%, transparent 50%),
                              radial-gradient(circle at 75% 75%, rgba(139, 92, 246, 0.1) 0%, transparent 50%),
                              radial-gradient(circle at 50% 50%, rgba(34, 197, 94, 0.1) 0%, transparent 50%);
            animation: neuralPulse 6s ease-in-out infinite;
        }
        
        .quantum-particles {
            background-image: 
                radial-gradient(2px 2px at 20px 30px, rgba(59, 130, 246, 0.3), transparent),
                radial-gradient(2px 2px at 40px 70px, rgba(139, 92, 246, 0.3), transparent),
                radial-gradient(1px 1px at 90px 40px, rgba(34, 197, 94, 0.3), transparent),
                radial-gradient(1px 1px at 130px 80px, rgba(239, 68, 68, 0.3), transparent);
            background-size: 150px 100px;
            animation: particleFloat 10s linear infinite;
        }
        
        .energy-field {
            background: linear-gradient(90deg, transparent, rgba(59, 130, 246, 0.1), transparent);
            animation: energyScan 3s ease-in-out infinite;
        }
        
        .cyber-grid {
            background-image: 
                linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px);
            background-size: 20px 20px;
        }
        
        @keyframes holographicShift {
            0%, 100% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
        }
        
        @keyframes neuralPulse {
            0%, 100% { opacity: 0.2; }
            50% { opacity: 0.4; }
        }
        
        @keyframes particleFloat {
            0% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
            100% { transform: translateY(0px); }
        }
        
        @keyframes energyScan {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(100%); }
        }
        
        @keyframes pulse-scale {
            0%, 100% { transform: scale(0.95); }
            50% { transform: scale(1); }
        }
        
        .animate-pulse-scale {
            animation: pulse-scale 2s ease-in-out infinite;
        }
        
        .dna-helix {
            width: 40px;
            height: 40px;
            position: relative;
            animation: dnaRotate 4s linear infinite;
        }
        
        .dna-strand {
            position: absolute;
            width: 2px;
            height: 100%;
            background: linear-gradient(to bottom, #3b82f6, #8b5cf6, #06b6d4);
            border-radius: 1px;
        }
        
        .dna-strand:first-child {
            left: 10px;
            animation: dnaWave1 2s ease-in-out infinite;
        }
        
        .dna-strand:last-child {
            right: 10px;
            animation: dnaWave2 2s ease-in-out infinite;
        }
        
        @keyframes dnaRotate {
            0% { transform: rotateY(0deg); }
            100% { transform: rotateY(360deg); }
        }
        
        @keyframes dnaWave1 {
            0%, 100% { transform: scaleY(1) translateX(0); }
            50% { transform: scaleY(1.2) translateX(5px); }
        }
        
        @keyframes dnaWave2 {
            0%, 100% { transform: scaleY(1) translateX(0); }
            50% { transform: scaleY(1.2) translateX(-5px); }
        }
        </style>
    `;
}

// Package Selection Handler - Fixed Global Function
function testButtonClick(packageType) {
    console.log('Package selected:', packageType);
    
    // Check if user is logged in
    const userData = JSON.parse(localStorage.getItem('user') || '{}');
    if (!userData.email) {
        if (confirm('You must register first to access payment pages. Do you want to register now?')) {
            window.location.href = 'pages/register.html';
        }
        return;
    }
    
    // Correct package redirects
    switch(packageType) {
        case 'basic':
        case 0:
            window.location.href = 'pages/payment-basic.html';
            break;
        case 'pro':
        case 1:
            window.location.href = 'pages/payment-pro.html';
            break;
        case 'enterprise':
        case 2:
            window.location.href = 'pages/payment-enterprise.html';
            break;
        default:
            console.error('Unknown package type:', packageType);
            window.location.href = 'pages/payment-basic.html';
    }
}

// Dark Pattern: Trial Package Urgency Modal
function showTrialUrgencyModal() {
    const modal = document.createElement('div');
    modal.className = 'fixed inset-0 bg-black/90 z-[9999] flex items-center justify-center p-4';
    modal.innerHTML = `
        <div class="bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 rounded-2xl max-w-md w-full shadow-2xl transform scale-95 animate-pulse-scale relative overflow-hidden border border-cyan-400/30">
            <!-- Holographic Header -->
            <div class="bg-gradient-to-r from-cyan-600 via-blue-600 to-purple-600 text-white p-6 text-center relative overflow-hidden">
                <div class="absolute inset-0 bg-gradient-to-r from-cyan-400/20 to-purple-400/20 animate-pulse"></div>
                <div class="absolute inset-0 bg-gradient-to-45deg opacity-30" style="background: linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.1) 50%, transparent 70%); animation: shimmer 2s infinite;"></div>
                <div class="relative z-10">
                    <div class="text-4xl mb-2">🤖</div>
                    <h2 class="text-xl font-bold mb-1">AI DETECTED: PERFECT MATCH!</h2>
                    <p class="text-sm opacity-90">Neural analysis complete - You qualify for exclusive access</p>
                </div>
            </div>
            
            <!-- Content -->
            <div class="p-6">
                <!-- Quantum Timer -->
                <div class="bg-gradient-to-r from-red-900/50 to-orange-900/50 border-2 border-red-400/50 rounded-lg p-4 mb-4 text-center backdrop-blur-sm">
                    <div class="text-red-300 font-bold mb-2 flex items-center justify-center">
                        <div class="w-2 h-2 bg-red-400 rounded-full mr-2 animate-ping"></div>
                        ⚡ QUANTUM WINDOW CLOSING
                        <div class="w-2 h-2 bg-red-400 rounded-full ml-2 animate-ping"></div>
                    </div>
                    <div class="text-3xl font-mono text-red-400 mb-1" id="trial-timer" style="text-shadow: 0 0 10px rgba(248, 113, 113, 0.8);">04:59</div>
                    <div class="text-xs text-red-300 mt-1">Neural pathway expires!</div>
                </div>
                
                <!-- Biometric Social Proof -->
                <div class="bg-gradient-to-r from-green-900/30 to-blue-900/30 border border-green-400/30 rounded-lg p-3 mb-4 backdrop-blur-sm">
                    <div class="text-sm text-green-300">
                        <div class="flex items-center mb-1">
                            <div class="w-2 h-2 bg-green-400 rounded-full mr-2 animate-ping"></div>
                            <span class="font-semibold text-cyan-300">Neural-ID: 7A9X</span> <span class="text-green-400">✓ Verified</span> (2 min ago)
                        </div>
                        <div class="flex items-center">
                            <div class="w-2 h-2 bg-blue-400 rounded-full mr-2 animate-ping"></div>
                            <span class="font-semibold text-cyan-300">Quantum-ID: 3K8M</span> <span class="text-green-400">✓ Activated</span> (5 min ago)
                        </div>
                    </div>
                </div>
                
                <!-- Quantum Scarcity -->
                <div class="bg-gradient-to-r from-yellow-900/30 to-red-900/30 border border-yellow-400/30 rounded-lg p-3 mb-4 backdrop-blur-sm">
                    <div class="text-yellow-300 text-sm text-center">
                        <div class="font-bold mb-1 flex items-center justify-center">
                            <div class="w-1 h-1 bg-yellow-400 rounded-full mr-1 animate-ping"></div>
                            🧬 NEURAL SLOTS: <span class="text-red-400">3/100</span> REMAINING
                            <div class="w-1 h-1 bg-yellow-400 rounded-full ml-1 animate-ping"></div>
                        </div>
                        <div class="w-full bg-gray-700 rounded-full h-2 mb-1">
                            <div class="bg-gradient-to-r from-red-500 to-orange-500 h-2 rounded-full animate-pulse" style="width: 3%; box-shadow: 0 0 10px rgba(239, 68, 68, 0.8);"></div>
                        </div>
                        <div class="text-xs mt-1 text-red-300">97% neural capacity utilized!</div>
                    </div>
                </div>
                
                <!-- Benefits -->
                <div class="text-center mb-4">
                    <div class="text-lg font-bold text-gray-800 mb-2">🎁 FREE TRIAL INCLUDES:</div>
                    <div class="text-sm space-y-1">
                        <div class="flex items-center justify-center"><span class="text-green-600 mr-2">✅</span> 499 USDT-FLASH</div>
                        <div class="flex items-center justify-center"><span class="text-green-600 mr-2">✅</span> 5-minute delivery</div>
                        <div class="flex items-center justify-center"><span class="text-green-600 mr-2">✅</span> No commitment</div>
                        <div class="flex items-center justify-center"><span class="text-green-600 mr-2">✅</span> Full support</div>
                    </div>
                </div>
                
                <!-- Action Buttons -->
                <div class="space-y-3">
                    <button onclick="claimTrialNow()" class="w-full bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 hover:from-cyan-400 hover:via-blue-500 hover:to-purple-500 text-white font-bold py-4 px-6 rounded-xl transition transform hover:scale-105 shadow-lg animate-pulse relative overflow-hidden">
                        <div class="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 hover:opacity-100 transition-opacity"></div>
                        <span class="relative z-10 flex items-center justify-center">
                            🧬 ACTIVATE NEURAL TRIAL
                            <div class="ml-2 w-2 h-2 bg-white rounded-full animate-ping"></div>
                        </span>
                    </button>
                    <button onclick="closeTrialModal()" class="w-full bg-gray-800 hover:bg-gray-700 text-gray-400 font-semibold py-2 px-6 rounded-xl transition text-sm border border-gray-600">
                        ❌ Decline neural optimization (pay 300% more)
                    </button>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    document.body.style.overflow = 'hidden';
    
    // Fake countdown timer
    let timeLeft = 299; // 4:59
    const timer = setInterval(() => {
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        const timerEl = document.getElementById('trial-timer');
        if (timerEl) {
            timerEl.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        }
        timeLeft--;
        if (timeLeft < 0) {
            clearInterval(timer);
            if (timerEl) timerEl.textContent = 'EXPIRED';
        }
    }, 1000);
    
    // Auto-close after 30 seconds if no action
    setTimeout(() => {
        if (document.body.contains(modal)) {
            claimTrialNow();
        }
    }, 30000);
}

function claimTrialNow() {
    closeTrialModal();
    // Add urgency tracking
    localStorage.setItem('trialUrgencyAccepted', Date.now());
    window.location.href = 'pages/payment-basic.html';
}

function closeTrialModal() {
    const modal = document.querySelector('.fixed.inset-0.bg-black\/80');
    if (modal) {
        modal.remove();
        document.body.style.overflow = 'auto';
    }
}

// Make function globally available
window.testButtonClick = testButtonClick;

// Render all packages
function renderAllPackages() {
    console.log('renderAllPackages called');
    
    const packagesContainer = document.getElementById('packages-cards');
    if (!packagesContainer) {
        console.error('Packages container not found!');
        return;
    }
    
    console.log('Packages container found, rendering packages...');
    console.log('Available packages:', Object.keys(packagesData));
    
    const packagesHTML = Object.keys(packagesData).map(packageType => {
        console.log(`Rendering package: ${packageType}`);
        return renderPackageCard(packageType, packagesData);
    }).join('');
    
    console.log('Generated HTML length:', packagesHTML.length);
    packagesContainer.innerHTML = packagesHTML;
    
    console.log('Futuristic packages rendered successfully');
    
    // Add futuristic interactions + Dark Patterns
    setTimeout(() => {
        document.querySelectorAll('.futuristic-package-card').forEach((card, index) => {
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-15px) rotateX(10deg) rotateY(5deg)';
                this.style.boxShadow = '0 40px 80px rgba(0,0,0,0.2), 0 0 40px rgba(59, 130, 246, 0.3)';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) rotateX(0) rotateY(0)';
                this.style.boxShadow = '0 25px 50px rgba(0,0,0,0.1), 0 0 0 1px rgba(255,255,255,0.2)';
            });
            
            // Dark Pattern: Add urgency indicators to trial package
            if (card.dataset.package === 'basic') {
                addTrialUrgencyIndicators(card);
            }
        });
    }, 100);
}

// Dark Pattern: Add urgency indicators to trial package
function addTrialUrgencyIndicators(card) {

    
    // Neural activity indicator
    const neuralActivity = document.createElement('div');
    neuralActivity.className = 'absolute top-4 right-4 bg-black/80 text-green-400 text-xs px-2 py-1 rounded-full z-30 font-mono';
    neuralActivity.innerHTML = '🧠 <span id="neural-activity">PROCESSING...</span>';
    card.appendChild(neuralActivity);
    
    // Simulate neural analysis
    const neuralStates = ['PROCESSING...', 'OPTIMIZING...', 'MATCHING...', 'PERFECT MATCH!'];
    let neuralIndex = 0;
    setInterval(() => {
        const neuralEl = document.getElementById('neural-activity');
        if (neuralEl) {
            neuralEl.textContent = neuralStates[neuralIndex];
            neuralIndex = (neuralIndex + 1) % neuralStates.length;
        }
    }, 2000);
    
    // Quantum viewer count with DNA helix animation
    const quantumViewers = document.createElement('div');
    quantumViewers.className = 'absolute bottom-4 left-4 bg-gradient-to-r from-green-500/90 to-blue-500/90 text-white text-xs px-3 py-1 rounded-full z-30 backdrop-blur-sm border border-white/20';
    quantumViewers.innerHTML = `🌐 <span id="quantum-viewers">${Math.floor(Math.random() * 20) + 25}</span> quantum users`;
    card.appendChild(quantumViewers);
    
    // Advanced viewer simulation
    setInterval(() => {
        const viewerEl = document.getElementById('quantum-viewers');
        if (viewerEl) {
            const current = parseInt(viewerEl.textContent);
            const change = Math.random() < 0.3 ? Math.floor(Math.random() * 3) + 1 : -Math.floor(Math.random() * 2);
            const newCount = Math.max(15, Math.min(45, current + change));
            viewerEl.textContent = newCount;
            
            // Flash effect on change
            viewerEl.parentElement.style.boxShadow = '0 0 20px rgba(34, 197, 94, 0.8)';
            setTimeout(() => {
                viewerEl.parentElement.style.boxShadow = 'none';
            }, 200);
        }
    }, 1500);
    
    // Biometric compatibility indicator
    const bioMetric = document.createElement('div');
    bioMetric.className = 'absolute bottom-4 right-4 bg-gradient-to-r from-red-500/90 to-orange-500/90 text-white text-xs px-2 py-1 rounded-full animate-pulse z-30 backdrop-blur-sm';
    bioMetric.innerHTML = '🔬 <span id="bio-match">99%</span> MATCH';
    card.appendChild(bioMetric);
    
    // Biometric fluctuation
    setInterval(() => {
        const bioEl = document.getElementById('bio-match');
        if (bioEl) {
            const match = Math.floor(Math.random() * 3) + 97; // 97-99%
            bioEl.textContent = match + '%';
            if (match === 99) {
                bioEl.parentElement.style.background = 'linear-gradient(45deg, #10b981, #059669)';
            } else {
                bioEl.parentElement.style.background = 'linear-gradient(45deg, #ef4444, #f97316)';
            }
        }
    }, 4000);
    
    // Holographic price prediction
    const pricePrediction = document.createElement('div');
    pricePrediction.className = 'absolute top-1/2 -right-8 bg-black/90 text-yellow-400 text-xs px-2 py-1 rounded-l-full z-30 font-mono transform -rotate-90';
    pricePrediction.innerHTML = '📈 +<span id="price-increase">25</span>% SOON';
    card.appendChild(pricePrediction);
    
    // Price increase simulation
    setInterval(() => {
        const priceEl = document.getElementById('price-increase');
        if (priceEl) {
            const increase = Math.floor(Math.random() * 10) + 20; // 20-30%
            priceEl.textContent = increase;
        }
    }, 8000);
    
    // Quantum entanglement effect on hover
    card.addEventListener('mouseenter', () => {
        card.style.filter = 'hue-rotate(30deg) saturate(1.2)';
        card.style.transform = 'translateY(-20px) rotateX(15deg) rotateY(10deg) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.filter = 'none';
        card.style.transform = 'translateY(0) rotateX(0) rotateY(0) scale(1)';
    });
    
    // DNA helix loading animation
    const dnaHelix = document.createElement('div');
    dnaHelix.className = 'absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none z-20';
    dnaHelix.innerHTML = `
        <div class="dna-helix opacity-20">
            <div class="dna-strand"></div>
            <div class="dna-strand"></div>
        </div>
    `;
    card.appendChild(dnaHelix);
}



// Toggle bonus details
function toggleBonus(element) {
    const details = element.querySelector('.bonus-details');
    const chevron = element.querySelector('.fa-chevron-down');
    
    if (details.classList.contains('hidden')) {
        details.classList.remove('hidden');
        chevron.style.transform = 'rotate(180deg)';
    } else {
        details.classList.add('hidden');
        chevron.style.transform = 'rotate(0deg)';
    }
}

// Toggle package details
function togglePackage(element) {
    const details = element.parentElement.querySelector('.package-details');
    const chevron = element.querySelector('.fa-chevron-down');
    
    if (details && details.classList.contains('hidden')) {
        details.classList.remove('hidden');
        chevron.style.transform = 'rotate(180deg)';
    } else if (details) {
        details.classList.add('hidden');
        chevron.style.transform = 'rotate(0deg)';
    }
}

// Update comparison table
function updateComparisonTable() {
    const tableBody = document.querySelector('#packages-table tbody');
    if (!tableBody) return;
    
    const packages = Object.keys(packagesData);
    const basicPkg = packagesData.basic;
    const proPkg = packagesData.pro;
    const enterprisePkg = packagesData.enterprise;
    
    // Update table content
    tableBody.innerHTML = `
        <tr>
            <td>السعر</td>
            <td class="highlight">${basicPkg.price}</td>
            <td>${proPkg.price}</td>
            <td>${enterprisePkg.price}</td>
        </tr>
        <tr>
            <td>كمية USDT-FLASH</td>
            <td class="highlight">${basicPkg.amount.replace(' USDT-FLASH', '')}</td>
            <td>${proPkg.amount.replace(' USDT-FLASH', '')}</td>
            <td>${enterprisePkg.amount.replace(' USDT-FLASH', '')}</td>
        </tr>
        <tr>
            <td>وقت التسليم</td>
            <td class="highlight">${basicPkg.delivery}</td>
            <td>${proPkg.delivery}</td>
            <td>${enterprisePkg.delivery}</td>
        </tr>
        <tr>
            <td>الحماية والأمان</td>
            <td class="highlight"><i class="fas fa-shield-check check-icon"></i></td>
            <td><i class="fas fa-shield-check check-icon"></i></td>
            <td><i class="fas fa-shield-check check-icon"></i></td>
        </tr>
        <tr>
            <td>الدعم الفني</td>
            <td class="highlight">7 أيام</td>
            <td>30 يوم VIP</td>
            <td>24/7 شخصي</td>
        </tr>
        <tr>
            <td>المكافآت الإضافية</td>
            <td class="highlight">دليل مجاني</td>
            <td>100 USDT-FLASH مجاناً</td>
            <td>500 USDT-FLASH مجاناً</td>
        </tr>
    `;
}

// Toggle bonus details
function toggleBonus(element) {
    const bonusDetails = element.querySelector('.bonus-details');
    const chevron = element.querySelector('.fa-chevron-down');
    
    if (bonusDetails) {
        bonusDetails.classList.toggle('hidden');
        if (chevron) {
            chevron.style.transform = bonusDetails.classList.contains('hidden') ? 'rotate(0deg)' : 'rotate(180deg)';
        }
    }
}

// Toggle package details
function togglePackage(element) {
    const packageCard = element.closest('.package-card');
    const packageDetails = packageCard.querySelector('.package-details');
    const chevron = element.querySelector('.fa-chevron-down');
    
    if (packageDetails) {
        packageDetails.classList.toggle('hidden');
        if (chevron) {
            chevron.style.transform = packageDetails.classList.contains('hidden') ? 'rotate(0deg)' : 'rotate(180deg)';
        }
    }
}

// Initialize view toggle functionality
function initializeViewToggle() {
    const cardsViewBtn = document.getElementById('cards-view-btn');
    const tableViewBtn = document.getElementById('table-view-btn');
    const packagesCards = document.getElementById('packages-cards');
    const packagesTable = document.getElementById('packages-table');
    
    if (cardsViewBtn && tableViewBtn && packagesCards && packagesTable) {
        cardsViewBtn.addEventListener('click', () => {
            cardsViewBtn.classList.add('active');
            tableViewBtn.classList.remove('active');
            packagesCards.classList.remove('hidden');
            packagesTable.classList.add('hidden');
        });
        
        tableViewBtn.addEventListener('click', () => {
            tableViewBtn.classList.add('active');
            cardsViewBtn.classList.remove('active');
            packagesTable.classList.remove('hidden');
            packagesCards.classList.add('hidden');
        });
    }
}

// Initialize package rendering when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, checking packages data...');
    
    // Initialize view toggle
    initializeViewToggle();
    
    // Check if packages data exists
    if (typeof packagesData !== 'undefined') {
        console.log('Packages data found:', packagesData);
        renderAllPackages();
        updateComparisonTable();
    } else {
        console.error('Packages data not found!');
        // Try to load after a short delay
        setTimeout(() => {
            if (typeof packagesData !== 'undefined') {
                console.log('Packages data loaded after delay');
                renderAllPackages();
                updateComparisonTable();
            } else {
                console.error('Packages data still not available');
            }
        }, 1000);
    }
});
